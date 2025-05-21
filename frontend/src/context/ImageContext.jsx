import { createContext, useState, useContext, useEffect } from 'react';

// Backend API URL
const API_URL = 'http://localhost:5000/api';

const ImageContext = createContext();

export const useImageContext = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  // Try to load originalImage from localStorage initially
  const [originalImage, setOriginalImage] = useState(() => {
    return localStorage.getItem('originalImage') || null;
  });

  const [editedImage, setEditedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync originalImage changes to localStorage
  useEffect(() => {
    if (originalImage) {
      localStorage.setItem('originalImage', originalImage);
    } else {
      localStorage.removeItem('originalImage');
    }
  }, [originalImage]);

  const resetState = () => {
    setOriginalImage(null);
    setEditedImage(null);
    setAnalysis(null);
    setError(null);
    localStorage.removeItem('originalImage');  // clear localStorage on reset
  };

  const analyzeImage = async (imageFile) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze image');
      }

      const data = await response.json();

      setAnalysis(data);
      setOriginalImage(URL.createObjectURL(imageFile));
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing the image');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const reanalyzeImage = async (imageFile) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to reanalyze image');
      }

      const data = await response.json();

      setAnalysis(data);
    } catch (err) {
      setError(err.message || 'An error occurred while reanalyzing the image');
      console.error('Reanalysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageContext.Provider
      value={{
        originalImage,
        setOriginalImage,
        editedImage,
        setEditedImage,
        analysis,
        setAnalysis,
        isLoading,
        setIsLoading,
        error,
        setError,
        analyzeImage,
        reanalyzeImage,
        resetState,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
