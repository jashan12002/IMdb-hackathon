import React, { useState, useEffect, useRef } from 'react';

const suggestions = [
  { id: 1, title: "The Shawshank Redemption", type: "movie", year: 1994 },
  { id: 2, title: "The Godfather", type: "movie", year: 1972 },
  { id: 3, title: "The Dark Knight", type: "movie", year: 2008 },
  { id: 4, title: "Breaking Bad", type: "tv", year: 2008 },
  { id: 5, title: "Stranger Things", type: "tv", year: 2016 },
  { id: 6, title: "Tom Hanks", type: "person" },
  { id: 7, title: "Leonardo DiCaprio", type: "person" },
];

const ExpandableSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const searchRef = useRef(null);
  const suggestionRef = useRef(null);
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        suggestionRef.current && 
        !suggestionRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchValue.trim() === '') {
      setFilteredSuggestions([]);
      return;
    }
    
    const filtered = suggestions.filter(suggestion => 
      suggestion.title.toLowerCase().includes(searchValue.toLowerCase())
    ).slice(0, 5);
    
    setFilteredSuggestions(filtered);

    setIsTyping(true);
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 500);
    
    return () => clearTimeout(typingTimeout);
  }, [searchValue]);
  
  const handleFocus = () => {
    setIsExpanded(true);
  };
  
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  
  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion.title);
    setIsExpanded(false);
    setFilteredSuggestions([]);
  };

  const renderHighlightedText = (text, highlight) => {
    if (!highlight.trim()) return text;
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-[#f5c518]/30 text-[#f5c518] font-bold">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };
  
  return (
    <div className="relative" ref={searchRef}>
      <div 
        className={`flex items-center transition-all duration-300 ease-in-out bg-[#1f1f1f] rounded-full overflow-hidden border-2 
        ${isExpanded ? 'border-[#f5c518]' : 'border-transparent'} 
        ${isExpanded ? 'w-64' : 'w-10'} h-10`}
      >
        <button 
          onClick={() => !isExpanded && setIsExpanded(true)} 
          className={`flex items-center justify-center ${isExpanded ? 'w-10' : 'w-full'} h-full text-gray-400 hover:text-[#f5c518] transition-colors`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        
        <input
          type="text"
          placeholder="Search IMDb"
          value={searchValue}
          onChange={handleChange}
          onFocus={handleFocus}
          className={`bg-transparent border-none focus:outline-none text-white placeholder-gray-500 transition-all 
          ${isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'} px-1`}
        />
        
        {isExpanded && searchValue && (
          <button 
            onClick={() => setSearchValue('')}
            className="w-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
 
      {isExpanded && filteredSuggestions.length > 0 && (
        <div 
          ref={suggestionRef}
          className="absolute top-full left-0 right-0 mt-1 bg-[#1f1f1f] border border-gray-800 rounded-md shadow-lg overflow-hidden z-50 transform origin-top transition-all duration-200"
          style={{ animation: 'scaleIn 0.15s ease-out forwards' }}
        >
          <div className="p-2">
            {isTyping ? (
              <div className="flex items-center justify-center py-2">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-[#f5c518] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="h-2 w-2 bg-[#f5c518] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="h-2 w-2 bg-[#f5c518] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            ) : (
              filteredSuggestions.map((suggestion, index) => (
                <div 
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-2 hover:bg-gray-800 cursor-pointer transition-colors rounded"
                  style={{ animation: `fadeInUp 0.2s ${index * 0.05}s both` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-[#f5c518] mr-2">
                        {suggestion.type === 'movie' ? '🎬' : suggestion.type === 'tv' ? '📺' : '👤'}
                      </span>
                      <span className="text-white">
                        {renderHighlightedText(suggestion.title, searchValue)}
                      </span>
                    </div>
                    {suggestion.year && (
                      <span className="text-gray-500 text-xs">{suggestion.year}</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableSearch; 