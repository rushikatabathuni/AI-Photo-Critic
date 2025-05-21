import { motion } from 'framer-motion';
import ImageUpload from '../components/ImageUpload';

const HomePage = () => {
  return (
    <div className="container-app py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          Enhance Your Photo with AI Critique
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          Upload your aPhotot, receive professional like feedback, and elevate your creative vision with simple editing tools.
        </p>
      </motion.div>
      
      <ImageUpload />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="card hover:shadow-lg transition-shadow duration-300">
          <div className="text-primary-700 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-neutral-800 mb-2">
            Expert AI Analysis
          </h3>
          <p className="text-neutral-600">
            Receive an aesthetic score and personalized feedback from our advanced AI model.
          </p>
        </div>
        
        <div className="card hover:shadow-lg transition-shadow duration-300">
          <div className="text-primary-700 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-neutral-800 mb-2">
            Professional Editing
          </h3>
          <p className="text-neutral-600">
            Use our integrated image editor to adjust brightness, contrast, saturation, rotate, and more to perfect your Photo.
          </p>
        </div>
        
        <div className="card hover:shadow-lg transition-shadow duration-300">
          <div className="text-primary-700 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-neutral-800 mb-2">
            Iterative Improvement
          </h3>
          <p className="text-neutral-600">
            Submit your edited image for re-analysis to see how your changes improved your photo's aesthetic score and quality.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;