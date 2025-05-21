import { useNavigate } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';
import { motion } from 'framer-motion';

const AnalysisResults = () => {
  const { analysis, originalImage } = useImageContext();
  const navigate = useNavigate();
  
  if (!analysis || !originalImage) {
    navigate('/');
    return null;
  }

  const getScoreClass = (score) => {
    if (score >= 8) return 'high';
    if (score >= 5) return 'medium';
    return 'low';
  };

  const getScoreDescription = (score) => {
    if (score >= 8) return 'Excellent';
    if (score >= 5) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <div className="image-container aspect-video bg-neutral-100 rounded-lg overflow-hidden">
              <img 
                src={originalImage} 
                alt="Original artwork" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className={`score-badge ${getScoreClass(analysis.score)} text-xl font-bold py-1 px-3 rounded-full`}>
                {analysis.score}/10
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">
                {getScoreDescription(analysis.score)}
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-neutral-800 mb-2">Feedback</h4>
                <ul className="space-y-2">
                  {analysis.feedback.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start space-x-2"
                    >
                      <svg className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-neutral-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-neutral-800 mb-2">Suggestion for Improvement</h4>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-accent-50 border border-accent-200 rounded-lg p-3 text-neutral-800"
                >
                  <div className="flex items-start space-x-2">
                    <svg className="h-5 w-5 text-accent-600 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{analysis.improvement}</span>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="pt-4">
              <button 
                onClick={() => navigate('/editor')}
                className="btn-primary w-full"
              >
                Edit Image
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalysisResults;