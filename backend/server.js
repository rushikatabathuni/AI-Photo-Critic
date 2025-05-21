const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:5173' // your React app's address
}));

// Configure file uploads with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPG and PNG image files are allowed'));
    }
  }
});

app.post('/api/analyze', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }

  const imagePath = req.file.path;
  
  runAestheticScoreModel(imagePath)
    .then(scoreResult => {
      return runClipAnalysisModel(imagePath)
        .then(clipResult => {
          const analysisResult = {
            score: scoreResult.score,
            feedback: clipResult.feedback,
            improvement: clipResult.suggestion
          };
          
          res.json(analysisResult);
        });
    })
    .catch(error => {
      console.error('Error during analysis:', error);
      res.status(500).json({ error: 'Failed to analyze image' });
    });
});

function runAestheticScoreModel(imagePath) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['models/aesthetic_score.py', imagePath]);
    
    let resultData = '';
    
    pythonProcess.stdout.on('data', (data) => {
      resultData += data.toString();
    });
    
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Aesthetic model error: ${data}`);
    });
    
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Aesthetic scoring process exited with code ${code}`));
        return;
      }
      
      try {
        console.log(resultData);
        const score = parseInt(resultData.trim());
        console.log(score)
        resolve({ score:score}); 
      } catch (error) {
        reject(new Error('Failed to parse aesthetic score result'));
      }
    });
  });
}

function runClipAnalysisModel(imagePath) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['models/clip_analysis.py', imagePath]);
    
    let resultData = '';
    
    pythonProcess.stdout.on('data', (data) => {
      resultData += data.toString();
    });
    
    pythonProcess.stderr.on('data', (data) => {
      console.error(`CLIP model error: ${data}`);
    });
    
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`CLIP analysis process exited with code ${code}`));
        return;
      }
      
      try {
        const result = JSON.parse(resultData);
        resolve({
          feedback: result.feedback || [],
          suggestion: result.suggestion || "No specific improvements suggested."
        });
      } catch (error) {
        reject(new Error('Failed to parse CLIP analysis result'));
      }
    });
  });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});