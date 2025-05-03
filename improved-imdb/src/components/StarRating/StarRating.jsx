import React, { useState } from 'react';

const StarRating = ({ initialRating = 0, onRate, size = 'medium' }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const totalStars = 10;
  
  const handleRate = (newRating) => {
    if (newRating === rating) {
      setRating(0);
      if (onRate) onRate(0);
    } else {
      setRating(newRating);
      setIsAnimating(true);
      
      
      if (onRate) onRate(newRating);
    
      setTimeout(() => {
        setIsAnimating(false);
      }, 700);
    }
  };
  
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4';
      case 'large':
        return 'w-8 h-8';
      case 'medium':
      default:
        return 'w-6 h-6';
    }
  };
 
  const starSizeInPixels = size === 'small' ? 16 : size === 'large' ? 32 : 24;
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className="flex items-center relative"
        onMouseLeave={() => setHoverRating(0)}
      >
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;
          const isActive = hoverRating >= starValue || (!hoverRating && rating >= starValue);
          
          return (
            <div
              key={index}
              className={`inline-block relative cursor-pointer transition-transform duration-200 ${getSizeClass()}`}
              style={{ 
                transform: isAnimating && rating >= starValue ? `scale(${1 + Math.sin((index + 1) * 0.5) * 0.3})` : 'scale(1)',
                transition: `transform ${200 + index * 50}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
              }}
              onMouseEnter={() => setHoverRating(starValue)}
              onClick={() => handleRate(starValue)}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill={isActive ? '#f5c518' : 'none'} 
                stroke={isActive ? 'none' : '#6b7280'} 
                strokeWidth="1.5"
                className={`transition-all duration-300 ${isActive ? 'filter drop-shadow-[0_0_3px_rgba(245,197,24,0.5)]' : ''}`}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
              </svg>
              {isAnimating && rating >= starValue && (
                <div 
                  className="absolute inset-0 rounded-full bg-[#f5c518]/20 animate-ping"
                  style={{ animationDuration: '0.7s' }}
                />
              )}
            </div>
          );
        })}
       
        <div 
          className={`ml-2 font-bold transition-all duration-300 ${hoverRating > 0 || rating > 0 ? 'text-[#f5c518]' : 'text-gray-400'}`}
          style={{ 
            opacity: hoverRating > 0 || rating > 0 ? 1 : 0.7,
            transform: isAnimating && rating > 0 ? 'scale(1.2)' : 'scale(1)',
          }}
        >
          {hoverRating || rating || ''}
        </div>
      </div>
      
      <div 
        className="text-sm mt-1 text-center transition-opacity duration-300 overflow-hidden"
        style={{ 
          height: (hoverRating > 0 || rating > 0) ? '1.5rem' : '0',
          opacity: (hoverRating > 0 || rating > 0) ? 1 : 0,
        }}
      >
        {getDescriptionForRating(hoverRating || rating)}
      </div>
    </div>
  );
};

const getDescriptionForRating = (rating) => {
  if (rating === 0) return '';
  if (rating <= 2) return 'Awful';
  if (rating <= 4) return 'Poor';
  if (rating <= 6) return 'Fair';
  if (rating <= 8) return 'Good';
  return 'Excellent';
};

export default StarRating; 