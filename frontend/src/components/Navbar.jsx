import { Link, useLocation } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';

const Navbar = () => {
  const location = useLocation();
  const { resetState } = useImageContext();

  const handleNewImage = () => {
    resetState();
  };

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container-app flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2" onClick={handleNewImage}>
          <span className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
            PhotoCritic
          </span>
          <span className="hidden sm:inline-block text-neutral-500 text-sm">AI-Powered Photo Analysis</span>
        </Link>
        
        <nav className="flex space-x-4">
          {location.pathname !== '/' && (
            <Link 
              to="/" 
              className="text-neutral-600 hover:text-primary-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={handleNewImage}
            >
              New Image
            </Link>
          )}
          
          <a 
            href="https://github.com/rushikatabathuni" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-neutral-600 hover:text-primary-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <span>About</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;