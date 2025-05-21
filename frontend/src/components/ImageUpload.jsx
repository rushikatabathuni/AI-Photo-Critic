import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';
import { motion } from 'framer-motion';

const ImageUpload = () => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { analyzeImage, isLoading } = useImageContext();
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file) => {
    // Check if file is a PNG or JPG
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (PNG or JPG)');
      return;
    }
    
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    if (!imageFile) return;
    
    try {
      await analyzeImage(imageFile);
      navigate('/analysis');
    } catch (error) {
      console.error('Error analyzing image:', error);
    }
  };

  const handleReset = () => {
    setPreviewImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div
          className={`p-6 ${dragActive ? 'bg-primary-50' : 'bg-white'} transition-colors duration-200`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">Upload Your Photo[&lt;10MB]</h2>
            <p className="text-neutral-600">
              Get AI-powered feedback and edit your image to perfection
            </p>
          </div>
          
          {!previewImage ? (
            <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              dragActive ? 'border-primary-500 bg-primary-50' : 'border-neutral-300 hover:border-primary-400'
            }`}>
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-neutral-600 mb-4">Drag & drop your image here, or</p>
              <button
                type="button"
                onClick={handleButtonClick}
                className="btn-primary"
              >
                Browse Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleChange}
                accept="image/png, image/jpeg, image/jpg"
              />
              <p className="mt-2 text-xs text-neutral-500">PNG, JPG up to 10MB</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative border rounded-lg overflow-hidden aspect-video">
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={handleReset}
                  className="btn-secondary"
                  disabled={isLoading}
                >
                  Change Image
                </button>
                
                <button 
                  onClick={handleSubmit}
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </div>
                  ) : 'Analyze Image'}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ImageUpload;