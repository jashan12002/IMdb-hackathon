import React, { useEffect, useState } from 'react'

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [animationActive, setAnimationActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (visible) {

      const timer = setTimeout(() => {
        setAnimationActive(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimationActive(false);
    }
  }, [visible]);

  useEffect(() => {

    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounceIn {
        0% { opacity: 0; transform: scale(0.3) translate3d(0, 20px, 0); }
        50% { opacity: 0.9; transform: scale(1.1); }
        80% { opacity: 1; transform: scale(0.89); }
        100% { opacity: 1; transform: scale(1) translate3d(0, 0, 0); }
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      @keyframes arrowBounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-5px); }
        60% { transform: translateY(-2px); }
      }
      
      .back-to-top-btn {
        animation: ${animationActive ? 'bounceIn 0.8s forwards' : 'none'};
        opacity: ${animationActive ? '1' : '0'};
        transform: ${animationActive ? 'scale(1)' : 'scale(0.3) translate3d(0, 20px, 0)'};
        transition: background-color 0.3s, box-shadow 0.3s;
      }
      
      .back-to-top-btn:hover {
        animation: pulse 1.5s infinite ease-in-out;
      }
      
      .arrow-icon {
        animation: arrowBounce 2s infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [animationActive]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <div className='flex justify-center'>
      <button 
        onClick={scrollToTop}
        className="back-to-top-btn fixed top-8 z-50 flex items-center justify-center gap-1 bg-gradient-to-r from-[#ffffff] to-[#ffffff]/90 text-black px-6 py-2 rounded-full shadow-lg hover:shadow-[0_0_15px_rgba(245,197,24,0.5)]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="arrow-icon ipc-icon ipc-icon--expand-less ipc-icon--inline ipc-chip__pre-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation">
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M11.29 8.71L6.7 13.3a.996.996 0 1 0 1.41 1.41L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0z"></path>
        </svg>
        <span className="font-medium">Back to top</span>
      </button>
    </div>
  );
};

export default BackToTop; 