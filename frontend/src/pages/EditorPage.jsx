import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';
import ImageEditorComponent from '../components/ImageEditorComponent';

const EditorPage = () => {
  const { originalImage } = useImageContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!originalImage) {
      navigate('/');
    }
  }, [originalImage, navigate]);

  return (
    <div className="w-full h-full">
      <ImageEditorComponent />
    </div>
  );
};

export default EditorPage;