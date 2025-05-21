import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// Helper function to create image from url
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

// Function to apply filters to canvas
const applyFilters = async (imageSrc, brightness, contrast, saturation, blur) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = image.width;
  canvas.height = image.height;

  // Draw original image
  ctx.filter = `brightness(${100 + brightness * 100}%) contrast(${100 + contrast * 100}%) saturate(${100 + saturation * 100}%) blur(${blur}px)`;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob));
    }, 'image/jpeg');
  });
};

const ImageEditorComponent = () => {
  const navigate = useNavigate();
  const { originalImage, setEditedImage, reanalyzeImage } = useImageContext();
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState('view'); // 'view', 'adjust'
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [blur, setBlur] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // Refs for debouncing adjustment changes
  const adjustmentsRef = useRef({ brightness, contrast, saturation, blur });
  const adjustmentTimerRef = useRef(null);
  
  useEffect(() => {
    if (!originalImage) {
      navigate('/');
    } else {
      setPreviewUrl(originalImage);
    }
  }, [originalImage, navigate]);
  
  // Store current adjustment values in ref for the debounced function
  useEffect(() => {
    adjustmentsRef.current = { brightness, contrast, saturation, blur };
  }, [brightness, contrast, saturation, blur]);
  
  // Apply adjustments with debounce when sliders change
  useEffect(() => {
    if (editMode === 'adjust') {
      // Clear existing timer
      if (adjustmentTimerRef.current) {
        clearTimeout(adjustmentTimerRef.current);
      }
      
      // Set new timer to apply adjustments
      adjustmentTimerRef.current = setTimeout(() => {
        const applyAdjustments = async () => {
          if (!originalImage) return;
          
          try {
            const { brightness, contrast, saturation, blur } = adjustmentsRef.current;
            const filteredImage = await applyFilters(
              originalImage,
              brightness,
              contrast,
              saturation,
              blur
            );
            setPreviewUrl(filteredImage);
          } catch (error) {
            console.error('Error applying filters:', error);
          }
        };
        
        applyAdjustments();
      }, 150); // 150ms debounce
    }
    
    // Clean up timer on unmount
    return () => {
      if (adjustmentTimerRef.current) {
        clearTimeout(adjustmentTimerRef.current);
      }
    };
  }, [brightness, contrast, saturation, blur, editMode, originalImage]);

  const resetEdits = () => {
    setBrightness(0);
    setContrast(0);
    setSaturation(0);
    setBlur(0);
    setPreviewUrl(originalImage);
  };

  const applyCurrentFilters = async () => {
    if (!originalImage) return;
    
    setIsLoading(true);
    try {
      // Apply adjustments
      const filteredImage = await applyFilters(
        originalImage, 
        brightness, 
        contrast, 
        saturation,
        blur
      );
      
      setPreviewUrl(filteredImage);
      setEditMode('view'); // Return to view mode after preview
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // First apply any pending edits
      await applyCurrentFilters();
      
      // Then process the result
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      const file = new File([blob], 'edited-image.jpg', { type: 'image/jpeg' });
      
      // Update context
      setEditedImage(previewUrl);
      
      // Process for reanalysis
      await reanalyzeImage(file);
      navigate('/analysis');
    } catch (error) {
      console.error('Error saving edited image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = 'edited-image.jpg';
    link.click();
  };
  
  const handleCancel = () => {
    navigate('/analysis');
  };

  if (!originalImage) return null;

  return (
    <div className="w-full h-[calc(100vh-150px)] flex flex-col">
      {/* Editor Controls */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                editMode === 'adjust' ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
              onClick={() => setEditMode(editMode === 'adjust' ? 'view' : 'adjust')}
            >
              Adjust
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg"
              onClick={resetEdits}
            >
              Reset
            </button>
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg"
              onClick={handleDownload}
            >
              Download
            </button>
            <button
              className="px-4 py-2 bg-accent text-white rounded-lg"
              onClick={handleSave}
            >
              Re-analyze Image
            </button>
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Adjustment Controls */}
        {editMode === 'adjust' && (
          <div className="grid grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <span className="mb-1">Brightness</span>
              <Slider
                min={-1}
                max={1}
                step={0.01}
                value={brightness}
                onChange={setBrightness}
                className="w-40"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-1">Contrast</span>
              <Slider
                min={-1}
                max={1}
                step={0.01}
                value={contrast}
                onChange={setContrast}
                className="w-40"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-1">Saturation</span>
              <Slider
                min={-1}
                max={1}
                step={0.01}
                value={saturation}
                onChange={setSaturation}
                className="w-40"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-1">Blur</span>
              <Slider
                min={0}
                max={10}
                step={0.1}
                value={blur}
                onChange={setBlur}
                className="w-40"
              />
            </div>
          </div>
        )}
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative">
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-[550px] h-auto object-contain rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-800 font-medium">Processing image...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEditorComponent;