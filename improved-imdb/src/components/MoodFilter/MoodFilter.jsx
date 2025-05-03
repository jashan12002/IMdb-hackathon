import React, { useState, useEffect, useRef, useCallback } from 'react';

const moviesByMood = {
  happy: [
    { title: "La La Land", year: 2016, poster: "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_.jpg" },
    { title: "The Intouchables", year: 2011, poster: "https://m.media-amazon.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_.jpg" },
    { title: "Toy Story", year: 1995, poster: "https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg" },
    { title: "Forrest Gump", year: 1994, poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg" },
    { title: "Mamma Mia!", year: 2008, poster: "https://m.media-amazon.com/images/M/MV5BMTA2MDU0MjM0MzReQTJeQWpwZ15BbWU3MDYwNzgwNzE@._V1_.jpg" },
    { title: "Sing", year: 2016, poster: "https://m.media-amazon.com/images/M/MV5BMTYzODYzODU2Ml5BMl5BanBnXkFtZTgwNTc1MTA2NzE@._V1_.jpg" },
  ],
  sad: [
    { title: "The Shawshank Redemption", year: 1994, poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" },
    { title: "Schindler's List", year: 1993, poster: "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg" },
    { title: "The Green Mile", year: 1999, poster: "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_.jpg" },
    { title: "Titanic", year: 1997, poster: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg" },
    { title: "The Boy in the Striped Pajamas", year: 2008, poster: "https://m.media-amazon.com/images/M/MV5BMTMzMTc3MjA5NF5BMl5BanBnXkFtZTcwOTk3MDE5MQ@@._V1_.jpg" },
    { title: "Life Is Beautiful", year: 1997, poster: "https://m.media-amazon.com/images/M/MV5BYmJmM2Q4NmMtYThmNC00ZjRlLWEyZmItZTIwOTBlZDQ3NTQ1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg" },
  ],
  scared: [
    { title: "The Shining", year: 1980, poster: "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg" },
    { title: "The Exorcist", year: 1973, poster: "https://m.media-amazon.com/images/M/MV5BYjhmMGMxZDYtMTkyNy00YWVmLTgyYmUtYTU3ZjcwNTBjN2I1XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg" },
    { title: "Hereditary", year: 2018, poster: "https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzBkYzQ1YWIwZjlhXkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_.jpg" },
    { title: "A Quiet Place", year: 2018, poster: "https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ1M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_.jpg" },
    { title: "The Conjuring", year: 2013, poster: "https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_.jpg" },
    { title: "Get Out", year: 2017, poster: "https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_.jpg" },
  ],
  mindBending: [
    { title: "Inception", year: 2010, poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg" },
    { title: "Interstellar", year: 2014, poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" },
    { title: "The Matrix", year: 1999, poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg" },
    { title: "Memento", year: 2000, poster: "https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg" },
    { title: "Donnie Darko", year: 2001, poster: "https://m.media-amazon.com/images/M/MV5BZjZlZDlkYTktMmU1My00ZDBiLWFlNjEtYTBhNjVhOTM4ZjJjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" },
    { title: "Shutter Island", year: 2010, poster: "https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" },
  ],
  romantic: [
    { title: "The Notebook", year: 2004, poster: "https://m.media-amazon.com/images/M/MV5BMTk3OTM5Njg5M15BMl5BanBnXkFtZTYwMzA0ODI3._V1_.jpg" },
    { title: "Pride & Prejudice", year: 2005, poster: "https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@._V1_QL75_UX380_CR0,1,380,562_.jpg" },
    { title: "Before Sunrise", year: 1995, poster: "https://m.media-amazon.com/images/M/MV5BZDdiZTAwYzAtMDI3Ni00OTRjLTkzN2UtMGE3MDMyZmU4NTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg" },
    { title: "Eternal Sunshine of the Spotless Mind", year: 2004, poster: "https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_.jpg" },
    { title: "The Fault in Our Stars", year: 2014, poster: "https://m.media-amazon.com/images/M/MV5BMjA4NzkxNzc5Ml5BMl5BanBnXkFtZTgwNzQ3OTMxMTE@._V1_.jpg" },
    { title: "La La Land", year: 2016, poster: "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_.jpg" },
  ],
};

const MovieCard = ({ movie, index }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    if (cardRef.current) {
      const element = cardRef.current;
      element.style.animationDelay = `${index * 0.1}s`;
      element.classList.add('staggered-item');
    }
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className="group relative overflow-hidden rounded-lg transform transition-all duration-300 hover:scale-105 hover:z-10"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-70 group-hover:opacity-40 transition-opacity"></div>
      
      <img 
        src={movie.poster} 
        alt={movie.title} 
        className="w-full h-72 object-cover"
      />
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-[#f5c518]/20 to-transparent transition-opacity"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
        <div className="backdrop-blur-sm bg-black/30 rounded-lg p-3 border border-[#f5c518]/20">
          <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#f5c518] transition-colors">{movie.title}</h3>
          <div className="flex justify-between items-center">
            <p className="text-gray-300">{movie.year}</p>
            <div className="flex items-center gap-1">
              <span className="text-[#f5c518] text-sm">8.2</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#f5c518">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="bg-[#f5c518] hover:bg-[#f5c518]/90 text-black font-bold px-4 py-2 rounded-full flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"></path>
          </svg>
          Trailer
        </button>
      </div>
    </div>
  );
};


const MoodButton = ({ mood, label, onClick, index }) => {
  const buttonRef = useRef(null);
  
  useEffect(() => {
    if (buttonRef.current) {
      const element = buttonRef.current;
      element.style.animationDelay = `${index * 0.1 + 0.2}s`;
      element.style.animationName = 'scaleIn';
      element.style.animationDuration = '0.5s';
      element.style.animationFillMode = 'forwards';
    }
  }, [index]);
  
  const getGradient = () => {
    const gradients = {
      happy: "from-yellow-400 to-orange-500",
      sad: "from-blue-500 to-indigo-600",
      scared: "from-red-600 to-purple-700",
      mindBending: "from-purple-600 to-pink-500",
      romantic: "from-pink-400 to-red-500"
    };
    return gradients[mood];
  };
  
  const getMoodShadow = () => {
    const shadows = {
      happy: "0 0 15px rgba(250, 204, 21, 0.5)",
      sad: "0 0 15px rgba(96, 165, 250, 0.5)",
      scared: "0 0 15px rgba(220, 38, 38, 0.5)",
      mindBending: "0 0 15px rgba(168, 85, 247, 0.5)",
      romantic: "0 0 15px rgba(244, 114, 182, 0.5)"
    };
    return shadows[mood];
  };
  
  const getMoodShadowClass = () => {
    const shadowClasses = {
      happy: "emoji-pulse-happy",
      sad: "emoji-pulse-sad",
      scared: "emoji-pulse-scared",
      mindBending: "emoji-pulse-mind",
      romantic: "emoji-pulse-romantic"
    };
    return shadowClasses[mood];
  };
  
  return (
    <button
      ref={buttonRef}
      onClick={() => onClick(mood)}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${getGradient()} p-[2px] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/20`}
    >
      <div className="relative h-full w-full rounded-[10px] bg-[#121212] p-4 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0 bg-gradient-to-tr"
            style={{
              background: `linear-gradient(135deg, transparent, rgba(255,255,255,0.1), transparent)`,
              backgroundSize: '200% 200%',
              animation: 'gradientShift 8s ease-in-out infinite'
            }}
          ></div>
        </div>
        <span 
          className={`text-5xl mb-3 relative z-10 ${getMoodShadowClass()}`}
        >
          {label.split(' ')[0]}
        </span>
        <span className="text-white font-bold text-xl relative z-10">{label.split(' ')[1]}</span>
      </div>
    </button>
  );
};


const Sparkle = () => {
  const [position, setPosition] = useState({ top: -5, right: -5 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        top: Math.random() * 30 - 15,
        right: Math.random() * 30 - 10,
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      className="absolute" 
      style={{ 
        top: `${position.top}px`, 
        right: `${position.right}px`,
        animation: 'twinkle 1.5s infinite ease-in-out'
      }}
    >
      <span className="text-sm text-[#f5c518] drop-shadow-[0_0_3px_rgba(245,197,24,0.7)]">✨</span>
    </div>
  );
};

const MoodFilter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes twinkle {
        0% { opacity: 0; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.1); }
        100% { opacity: 0; transform: scale(0.8); }
      }
      
      @keyframes fadeSlideUp {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes floatIn {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes scaleIn {
        0% { opacity: 0; transform: scale(0.95); }
        100% { opacity: 1; transform: scale(1); }
      }
      
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .emoji-pulse-happy {
        animation: emojiPulseHappy 2s infinite alternate;
      }
      
      @keyframes emojiPulseHappy {
        0% { filter: drop-shadow(0 0 8px rgba(250, 204, 21, 0.3)); transform: translateY(0px); }
        50% { transform: translateY(-5px); }
        100% { filter: drop-shadow(0 0 15px rgba(250, 204, 21, 0.7)); transform: translateY(0px); }
      }
      
      .emoji-pulse-sad {
        animation: emojiPulseSad 2.5s infinite alternate;
      }
      
      @keyframes emojiPulseSad {
        0% { filter: drop-shadow(0 0 8px rgba(96, 165, 250, 0.3)); transform: translateY(0px); }
        50% { transform: translateY(-5px); }
        100% { filter: drop-shadow(0 0 15px rgba(96, 165, 250, 0.7)); transform: translateY(0px); }
      }
      
      .emoji-pulse-scared {
        animation: emojiPulseScared 1.8s infinite alternate;
      }
      
      @keyframes emojiPulseScared {
        0% { filter: drop-shadow(0 0 8px rgba(220, 38, 38, 0.3)); transform: translateY(0px); }
        50% { transform: translateY(-5px); }
        100% { filter: drop-shadow(0 0 15px rgba(220, 38, 38, 0.7)); transform: translateY(0px); }
      }
      
      .emoji-pulse-mind {
        animation: emojiPulseMind 3s infinite alternate;
      }
      
      @keyframes emojiPulseMind {
        0% { filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.3)); transform: translateY(0px); }
        50% { transform: translateY(-5px); }
        100% { filter: drop-shadow(0 0 18px rgba(168, 85, 247, 0.7)); transform: translateY(0px); }
      }
      
      .emoji-pulse-romantic {
        animation: emojiPulseRomantic 2.2s infinite alternate;
      }
      
      @keyframes emojiPulseRomantic {
        0% { filter: drop-shadow(0 0 8px rgba(244, 114, 182, 0.3)); transform: translateY(0px); }
        50% { transform: translateY(-5px); }
        100% { filter: drop-shadow(0 0 15px rgba(244, 114, 182, 0.7)); transform: translateY(0px); }
      }
      
      .scroll-reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }
      
      .scroll-reveal.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      .staggered-item {
        opacity: 0;
        animation: fadeSlideUp 0.5s forwards;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };
  
  const resetMoodSelection = () => {
    setSelectedMood(null);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMood(null);
  };
  
  const moodEmojis = {
    happy: "😊 Happy",
    sad: "😢 Sad",
    scared: "😨 Scared", 
    mindBending: "🤯 Mind-bending",
    romantic: "❤️ Romantic"
  };
  
  return (
    <>
      {/* Button */}
      <div className="relative">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="relative overflow-hidden flex items-center gap-2 bg-[#1a1a1a] text-white font-bold py-2 px-5 rounded-full shadow-md border-2 border-[#f5c518] transform transition-all duration-300 hover:bg-[#272727] hover:shadow-[0_0_10px_rgba(245,197,24,0.4)]"
          style={{animation: 'floatIn 0.5s ease-out'}}
        >
          <span className="text-xl mr-1">🎭</span>
          <span>Mood Filter</span>
          <Sparkle />
    
          <div className="absolute -top-1 right-14 bg-[#f5c518] text-black text-xs font-bold px-2 py-0.5 rounded-full text-[10px] tracking-wide shadow-sm">NEW</div>
        </button>
      </div>
      
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
          style={{animation: 'fadeIn 0.3s ease-out'}}
        >
          <div 
            className="relative bg-gradient-to-b from-[#121212] to-[#1a1a1a] rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-[#f5c518]/20 my-4"
            style={{animation: 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)'}}
          >
        
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f5c518] to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f5c518] to-transparent"></div>
            
          
            <div className="sticky top-0 z-20 p-6 border-b border-gray-800 flex justify-between items-center bg-black/80 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3" style={{animation: 'fadeSlideUp 0.6s forwards'}}>
                <span className="text-[#f5c518]">🎭</span>
                <span>What's your <span className="text-[#f5c518]">mood</span> today?</span>
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-[#f5c518] text-2xl h-10 w-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                style={{animation: 'fadeSlideUp 0.5s 0.2s forwards', opacity: 0}}
              >
                ✕
              </button>
            </div>
           
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-100px)] overflow-x-hidden">
              {!selectedMood ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-5">
                  {Object.entries(moodEmojis).map(([mood, label], index) => (
                    <MoodButton 
                      key={mood}
                      mood={mood}
                      label={label}
                      onClick={handleMoodSelect}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <div 
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 top-0 z-10 bg-[#121212]/80 py-2 backdrop-blur-sm"
                    style={{animation: 'fadeSlideUp 0.4s forwards'}}
                  >
                    <h3 className="text-2xl text-white font-bold flex items-center gap-2 mb-4 md:mb-0">
                      <span className="text-[#f5c518]">{moodEmojis[selectedMood].split(' ')[0]}</span>
                      <span>{moodEmojis[selectedMood].split(' ')[1]} Movies</span>
                    </h3>
                    <button
                      onClick={resetMoodSelection}
                      className="bg-[#1a1a1a] hover:bg-[#f5c518] text-white hover:text-black py-2 px-4 rounded-full transition-all duration-300 border border-[#f5c518] flex items-center gap-2 group"
                      style={{animation: 'fadeSlideUp 0.4s 0.1s forwards', opacity: 0}}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="transform rotate-180">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                      </svg>
                      <span className="font-medium">Back to Mood Select</span>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {moviesByMood[selectedMood].map((movie, index) => (
                      <MovieCard key={index} movie={movie} index={index} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MoodFilter; 