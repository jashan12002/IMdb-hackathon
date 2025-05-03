import React, { useState, useEffect } from 'react';

const WatchlistButton = ({ movieId, initialState = false }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(initialState);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);
  
  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    setIsAnimating(true);
    
    console.log(`${isInWatchlist ? 'Removing from' : 'Adding to'} watchlist: ${movieId}`);
  };
  
  const Confetti = () => {
    const confettiCount = 20;
    const colors = ['#f5c518', '#ffffff', '#f5c518', '#daa520'];
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(confettiCount)].map((_, i) => {
          const size = Math.random() * 8 + 5;
          const left = Math.random() * 100;
          const animDuration = Math.random() * 1 + 1;
          const delay = Math.random() * 0.5;
          
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                left: `${left}%`,
                top: '50%',
                opacity: 0,
                animation: `confetti ${animDuration}s ease-out ${delay}s forwards`,
              }}
            />
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="relative">
      <button
        onClick={toggleWatchlist}
        className={`relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 transform
        ${isInWatchlist 
          ? 'bg-[#f5c518] text-black hover:bg-[#daa520]' 
          : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
        }
        ${isAnimating ? (isInWatchlist ? 'scale-110' : 'scale-90') : 'scale-100'}
        `}
      >
        <span className={`transform transition-transform duration-300 ${isAnimating ? (isInWatchlist ? 'rotate-[360deg]' : 'rotate-[-360deg]') : ''}`}>
          {isInWatchlist ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          )}
        </span>
        <span>
          {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
        </span>
      </button>
      
      {isAnimating && (
        <div 
          className="absolute inset-0 rounded-full pointer-events-none" 
          style={{
            background: 'radial-gradient(circle, transparent 10%, rgba(245, 197, 24, 0.2) 10%, rgba(245, 197, 24, 0) 80%)',
            animation: 'ripple 0.8s ease-out',
          }}
        />
      )}
      
      {isAnimating && isInWatchlist && <Confetti />}
      
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0.5);
            opacity: 0.3;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
        
        @keyframes confetti {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 100 + 50}px, ${-Math.random() * 100 - 50}px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default WatchlistButton; 