# 🎨 AI Art Critic & Feedback System

This is a full-stack web application that allows users to upload artwork, receive AI-generated aesthetic analysis and feedback, and optionally edit the image using controls like brightness, contrast, and saturation.

## ✨ Features

- Upload any artwork (JPG/PNG)
- AI analyzes and gives:
  - Aesthetic score (1–10)
  - Detailed textual feedback
  - Improvement suggestions
- Image editing options: brightness, contrast, saturation
- Built using **ReactJS (Vite + Tailwind)** for frontend and **FastAPI** for backend
- Aesthetic and feedback models based on `aesthetic-predictor-v2-5` and `CLIP`

## 📁 Project Structure

```
project/
├── backend/                ← FastAPI app + model code
│   ├── main.py             ← Backend entry point
│   ├── models/             ← PyTorch model weights (.pth)
│   ├── utils.py            ← Image processing and prediction functions
│
├── project/                ← Frontend React app (Vite)
│   ├── src/
│   │   ├── components/     ← Reusable components (upload, result cards, sliders)
│   │   ├── pages/          ← App pages: Upload, Analyze, Edit
│   │   ├── App.jsx         ← Main entry
│   │   └── main.jsx
│   ├── public/
│   └── index.html
├── README.md
```

## 🚀 Getting Started

### 🔧 Backend Setup (FastAPI)

1. Create virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install fastapi uvicorn pillow torch torchvision transformers
```

3. Place your model weights in `backend/models/`

4. Run the server:
```bash
uvicorn main:app --reload
```

API should be live at `http://localhost:8000`

### 💻 Frontend Setup (React)

1. Open a new terminal:
```bash
cd project
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

## 🔄 API Endpoints

| Endpoint        | Method | Description                      |
|-----------------|--------|----------------------------------|
| `/analyze`      | POST   | Upload image, get score/feedback |
| `/edit`         | POST   | Send image + edit params         |

## 🛠️ Technologies Used

- Frontend: ReactJS, Vite, TailwindCSS
- Backend: FastAPI, PIL, PyTorch
- Models: aesthetic-predictor-v2-5, OpenAI CLIP

## 📸 Sample

![upload-demo](https://your-image-link.com/upload.jpg)
> *Upload page with image preview and feedback.*

## 📜 License

MIT License

## 🙌 Credits

Built with ❤️ by [Your Name]

Inspired by open-source work in AI aesthetics and image understanding.



