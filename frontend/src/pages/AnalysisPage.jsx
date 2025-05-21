import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';
import AnalysisResults from '../components/AnalysisResults';

const AnalysisPage = () => {
  const { analysis, originalImage } = useImageContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!analysis || !originalImage) {
      navigate('/');
    }
  }, [analysis, originalImage, navigate]);

  return (
    <div className="container-app py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          AI Analysis Results
        </h1>
        <p className="text-neutral-600">
          Review your image's score and professional feedback
        </p>
      </div>
      
      <AnalysisResults />
    </div>
  );
};

export default AnalysisPage;