const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-6 border-t border-neutral-200">
      <div className="container-app">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-neutral-600 text-sm">
              {currentYear} Project by Rushi Katabathuni, KMCE'27
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://www.linkedin.com/in/rushikatabathuni/"
              className="text-neutral-600 hover:text-primary-700 text-sm transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/rushikatabathuni" 
              className="text-neutral-600 hover:text-primary-700 text-sm transition-colors"
            >
              Github
            </a>
            <a  
              className="text-neutral-600 hover:text-primary-700 text-sm transition-colors"
            >
              GMail: katabathunichanti@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;