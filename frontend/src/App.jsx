import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import EditorPage from './pages/EditorPage';
import Footer from './components/Footer';
import { ImageProvider } from './context/ImageContext';
import ErrorAlert from './components/ErrorAlert';  // Import ErrorAlert here
import './App.css';

function App() {
  return (
    <Router>
      <ImageProvider>
        <div className="flex flex-col min-h-screen bg-neutral-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="/editor" element={<EditorPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <ErrorAlert />  {/* Add ErrorAlert here */}
        </div>
      </ImageProvider>
    </Router>
  );
}

export default App;
