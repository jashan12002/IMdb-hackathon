import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      
      const progress = (scrollTop / documentHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', calculateScrollProgress);
    
    calculateScrollProgress();
    
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
    };
  }, []);
  
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-black/20">
      <div 
        className="h-full bg-gradient-to-r from-[#f5c518] to-[#ffae00] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%`, boxShadow: '0 0 10px rgba(245, 197, 24, 0.5)' }}
      >
        <div 
          className="absolute top-0 right-0 h-full w-4 bg-[#ffae00] rounded-full opacity-70 animate-pulse"
          style={{ display: scrollProgress > 2 ? 'block' : 'none' }}
        />
      </div>
    </div>
  );
};

export default ScrollProgress; 