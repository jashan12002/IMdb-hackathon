import React, { useState, useEffect, useRef } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const searchRef = useRef(null);
  
  const categories = ['All', 'Movies', 'TV Shows', 'Celebs', 'Companies'];
 
  const suggestions = [
    { id: 1, title: "The Shawshank Redemption", type: "movie", year: 1994, badge: "Top 250" },
    { id: 2, title: "The Godfather", type: "movie", year: 1972, badge: "Classic" },
    { id: 3, title: "Interstellar", type: "movie", year: 2014 },
    
  ];
  
  
  const popularSearches = [
    "thunderbolts",
    "the four seasons",
    "sinners",
    
  ];
  
  const filteredSuggestions = searchQuery.trim() !== '' 
    ? suggestions.filter(suggestion => {
        const matchesQuery = suggestion.title.toLowerCase().includes(searchQuery.toLowerCase());
        if (activeCategory === 'All') return matchesQuery;
        if (activeCategory === 'Movies') return matchesQuery && suggestion.type === 'movie';
        if (activeCategory === 'TV Shows') return matchesQuery && suggestion.type === 'tv';
        if (activeCategory === 'Celebs') return matchesQuery && suggestion.type === 'person';
        if (activeCategory === 'Companies') return matchesQuery && suggestion.type === 'company';
        return false;
      }).slice(0, 6)
    : [];
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  useEffect(() => {
    if (searchQuery) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);
 
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery} in category: ${activeCategory}`);
    setShowDropdown(false);
    setIsExpanded(false);
  };
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setShowDropdown(false);
    console.log(`Selected: ${suggestion.title}`);
  };
  
  const handlePopularSearchClick = (search) => {
    setSearchQuery(search);
    handleSearch({ preventDefault: () => {} });
  };
  
  
  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
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

  const toggleSearchExpansion = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setShowDropdown(false);
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto relative" ref={searchRef}>

      <button 
        type="button"
        onClick={toggleSearchExpansion}
        className={`md:hidden flex items-center justify-center p-2 text-white ${isExpanded ? 'hidden' : 'block'}`}
        aria-label="Open search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

  
      {isExpanded && (
        <div className="fixed inset-0 bg-black z-50 md:hidden">
          <div className="px-4 py-3 flex items-center justify-between border-b border-gray-800">
            <button
              type="button"
              onClick={toggleSearchExpansion}
              className="text-white p-2"
              aria-label="Close search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="flex-1 mx-3">
              <input
                type="text"
                placeholder="Search IMDb"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                onFocus={() => {
                  setShowDropdown(false);
                }}
                className="w-full bg-[#1f1f1f] h-10 px-4 rounded-full border-none outline-none text-white placeholder-gray-500"
                autoFocus
              />
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="bg-[#f5c518] text-black p-2 rounded-full"
              aria-label="Submit search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          
          <div className="p-4">
            <h2 className="text-[#f5c518] font-bold text-lg mb-4">POPULAR SEARCHES</h2>
            <div className="space-y-4">
              {popularSearches.map((search, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 border-b border-gray-800 pb-4 cursor-pointer"
                  onClick={() => handlePopularSearchClick(search)}
                >
                  <div className="w-6 h-6 rounded-full bg-[#1f1f1f] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                  <span className="text-white text-lg">{search}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

     
      <form 
        onSubmit={handleSearch}
        className={`w-full flex items-center bg-[#1f1f1f] rounded-full overflow-hidden border-2 border-gray-800 focus-within:border-[#f5c518] transition-all duration-300 ${isExpanded ? 'hidden' : 'hidden md:flex'}`}
      >
        <div className="relative">
          <button
            type="button"
            className="h-10 px-3 flex items-center text-sm text-white hover:text-[#f5c518] transition-colors whitespace-nowrap"
            onClick={() => setShowDropdown(prev => !prev)}
          >
            <span>{activeCategory}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
              <path d="M7 10l5 5 5-5z"></path>
            </svg>
          </button>
         
          {showDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-[#1f1f1f] border border-gray-800 rounded-lg overflow-hidden z-50 shadow-lg min-w-[120px] animate-scaleIn">
              {categories.map((category, index) => (
                <button
                  key={index}
                  type="button"
                  className={`block w-full text-left px-4 py-2 text-sm whitespace-nowrap transition-colors
                    ${activeCategory === category ? 'bg-gray-800 text-[#f5c518]' : 'text-white hover:bg-gray-800'}`}
                  onClick={() => {
                    handleCategoryChange(category);
                    setShowDropdown(false);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
       
        <div className="h-5 w-px bg-gray-700"></div>
        
        <div className="flex-1 flex items-center">
          <input
            type="text"
            placeholder="Search IMDb"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value.trim() !== '') {
                setShowDropdown(true);
              }
            }}
            onFocus={() => {
              if (searchQuery.trim() !== '') {
                setShowDropdown(true);
              }
            }}
            className="flex-1 h-10 px-3 bg-transparent border-none outline-none text-white placeholder-gray-500"
          />
          
          {searchQuery && (
            <button
              type="button"
              className="px-2 text-gray-500 hover:text-white transition-colors"
              onClick={() => {
                setSearchQuery('');
                setShowDropdown(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          
          <button
            type="submit"
            className="h-10 px-4 bg-[#f5c518] text-black font-medium hover:bg-[#daae15] transition-colors rounded-r-full flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span className="ml-1 hidden sm:inline">Search</span>
          </button>
        </div>
      </form>
      
      {showDropdown && (searchQuery.trim() !== '') && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#1f1f1f] border border-gray-800 rounded-lg shadow-lg overflow-hidden z-50 max-h-[400px] overflow-y-auto animate-scaleIn">
          {isTyping ? (
            <div className="flex items-center justify-center py-4">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-[#f5c518] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="h-2 w-2 bg-[#f5c518] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="h-2 w-2 bg-[#f5c518] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          ) : filteredSuggestions.length > 0 ? (
            <div>
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  className="px-4 py-3 hover:bg-gray-800 cursor-pointer border-b border-gray-800 last:border-b-0 transition-colors animate-fadeIn"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-center">
                    <span className="text-[#f5c518] mr-3 text-lg">
                      {suggestion.type === 'movie' ? '🎬' : 
                       suggestion.type === 'tv' ? '📺' : 
                       suggestion.type === 'person' ? '👤' : '🏢'}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">
                          {highlightText(suggestion.title, searchQuery)}
                        </span>
                        {suggestion.year && (
                          <span className="text-gray-400 text-sm">{suggestion.year}</span>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-gray-400 text-xs">
                          {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
                        </span>
                        {suggestion.badge && (
                          <span className="ml-2 px-1.5 py-0.5 bg-[#f5c518]/20 text-[#f5c518] text-xs rounded">
                            {suggestion.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <a 
                href="#" 
                className="block px-4 py-2 text-center text-[#f5c518] hover:underline text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  handleSearch(e);
                }}
              >
                See all results for "{searchQuery}"
              </a>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-400">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 