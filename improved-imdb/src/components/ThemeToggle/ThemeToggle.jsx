import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'theme-styles';
    style.textContent = `
      :root {
        --bg-primary: #121212;
        --bg-secondary: #1f1f1f;
        --text-primary: #ffffff;
        --text-secondary: #e0e0e0;
        --border-color: #333333;
        --accent-color: #f5c518;
      }
      
      [data-theme="light"] {
        --bg-primary: #f5f5f5;
        --bg-secondary: #ffffff;
        --text-primary: #121212;
        --text-secondary: #333333;
        --border-color: #e0e0e0;
        --accent-color: #f5c518;
      }
      
      .theme-transition {
        transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;
      }
      
      @keyframes rotateIcon {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.2); }
        100% { transform: rotate(360deg) scale(1); }
      }
      
      .rotate-icon {
        animation: rotateIcon 0.6s ease-in-out;
      }
      
      body, html {
        transition: background-color 0.5s ease, color 0.5s ease;
      }
      
      body {
        background-color: var(--bg-primary);
        color: var(--text-primary);
      }
      
      .bg-theme-light {
        background-color: var(--bg-primary) !important;
      }
      
      .bg-theme-dark {
        background-color: var(--bg-primary) !important;
      }
      
      .bg-card-light {
        background-color: var(--bg-secondary) !important;
      }
      
      .bg-card-dark {
        background-color: var(--bg-secondary) !important;
      }
      
      .text-theme-light {
        color: var(--text-primary) !important;
      }
      
      .text-theme-dark {
        color: var(--text-primary) !important;
      }
      
      .border-theme {
        border-color: var(--border-color) !important;
      }
    `;
    document.head.appendChild(style);
    
    applyTheme(isDarkMode);
    
    return () => {
      const styleElement = document.getElementById('theme-styles');
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);
  
  const toggleTheme = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      setIsDarkMode(!isDarkMode);
      applyTheme(!isDarkMode);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }, 100);
  };
  
  const applyTheme = (dark) => {
    document.body.classList.add('theme-transition');
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    
    if (dark) {
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#ffffff';
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      
      document.body.setAttribute('data-theme', 'dark');
      
      document.querySelectorAll('[data-theme-bg]').forEach(el => {
        el.setAttribute('data-theme-bg', 'dark');
      });
      
      document.querySelectorAll('.bg-theme-light').forEach(el => {
        el.classList.remove('bg-theme-light');
        el.classList.add('bg-theme-dark');
      });
      
      document.querySelectorAll('.bg-card-light').forEach(el => {
        el.classList.remove('bg-card-light');
        el.classList.add('bg-card-dark');
      });
      
      document.querySelectorAll('.text-theme-light').forEach(el => {
        el.classList.remove('text-theme-light');
        el.classList.add('text-theme-dark');
      });
      
      document.querySelectorAll('.border-gray-300').forEach(el => {
        el.classList.remove('border-gray-300');
        el.classList.add('border-gray-800');
      });
      
      document.querySelectorAll('.text-black').forEach(el => {
        if (!el.closest('.bg-yellow-500') && !el.closest('[class*="bg-[#f5c518]"]')) {
          el.classList.remove('text-black');
          el.classList.add('text-white');
        }
      });
    } else {
      document.body.style.backgroundColor = '#f5f5f5';
      document.body.style.color = '#121212';
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      
      document.body.setAttribute('data-theme', 'light');
      
      document.querySelectorAll('[data-theme-bg]').forEach(el => {
        el.setAttribute('data-theme-bg', 'light');
      });
      
      document.querySelectorAll('.bg-theme-dark').forEach(el => {
        el.classList.remove('bg-theme-dark');
        el.classList.add('bg-theme-light');
      });
      
      document.querySelectorAll('.bg-card-dark').forEach(el => {
        el.classList.remove('bg-card-dark');
        el.classList.add('bg-card-light');
      });
      
      document.querySelectorAll('.text-theme-dark').forEach(el => {
        el.classList.remove('text-theme-dark');
        el.classList.add('text-theme-light');
      });
      
      document.querySelectorAll('.border-gray-800').forEach(el => {
        el.classList.remove('border-gray-800');
        el.classList.add('border-gray-300');
      });
      
      document.querySelectorAll('.text-white').forEach(el => {
        if (!el.closest('nav') && !el.closest('.bg-gray-900') && !el.closest('.bg-gray-800')) {
          el.classList.remove('text-white');
          el.classList.add('text-black');
        }
      });
    }
    
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 500);
  };
  
  return (
    <div className="relative hidden">
      <button
        onClick={toggleTheme}
        className={`fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-full w-10 h-10 md:w-12 md:h-12 shadow-lg transition-all duration-300 
        ${isDarkMode ? 'bg-gray-800 text-[#f5c518]' : 'bg-white text-[#121212] border border-gray-300'} 
        hover:shadow-xl hover:scale-110`}
      >
        <div className={isAnimating ? 'rotate-icon' : ''}>
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" md:width="24" md:height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" md:width="24" md:height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle; 