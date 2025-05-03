import React from 'react'

const CelebrityCard = ({ rank, name, image, change, changeValue }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer">
      <div className="relative mb-3">
        <img 
          src={image} 
          alt={name} 
          className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] rounded-full object-cover border-2 border-transparent hover:border-white transition-all"
        />
      </div>
      <div className="flex items-center justify-center gap-1 mb-1">
        <span className="text-white text-lg font-medium">{rank}</span>
        <span className={`flex items-center text-sm ${change === 'up' ? 'text-green-500' : change === 'down' ? 'text-red-500' : 'text-white'}`}>
          {change === 'up' && (
            <svg className="mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14l5-5 5 5z"/>
            </svg>
          )}
          {change === 'down' && (
            <svg className="mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          )}
          {changeValue}
        </span>
      </div>
      <h3 className="text-white text-center font-medium text-sm md:text-base">{name}</h3>
    </div>
  )
}

const PopularCelbs = () => {
  return (
    <div className="px-4 md:px-8 py-10 bg-black">
      <div className="flex items-center mb-8">
        <div className="w-1 h-8 bg-[#f5c518] mr-3"></div>
        <h2 className="text-white text-2xl md:text-3xl font-bold flex items-center">
          Most popular celebrities
          <div className="ml-2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" md:width="28" md:height="28" viewBox="0 0 24 24" fill="white">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </div>
        </h2>
      </div>
      
      <div className="flex justify-between px-4 md:px-8 mb-6">
        <div className="text-[#f5c518] font-bold text-xs md:text-sm tracking-wider">TOP RISING</div>
        <div className="text-[#f5c518] font-bold text-xs md:text-sm tracking-wider">BY RANKING</div>
      </div>
      
      <div className="relative overflow-scroll no-scrollbar">
        <div className="flex gap-4 md:gap-8 overflow-x-auto px-2 md:px-4 pb-4 no-scrollbar w-[175%] md:w-[100%]">
          <CelebrityCard 
            rank="10"
            name="Sophie Nyweide"
            image="https://jashan12002.github.io/IMdb-hackathon/src/assets/popular.jpg"
            change="up"
            changeValue="34,688"
          />
          <CelebrityCard 
            rank="16"
            name="Joseph Zada"
            image="https://jashan12002.github.io/IMdb-hackathon/src/assets/popular-2.jpg"
            changeValue="19,277"
          />
          <CelebrityCard 
            rank="1"
            name="Kaitlyn Dever"
            image="https://m.media-amazon.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_.jpg"
            change="up"
            changeValue="1"
          />
          <CelebrityCard 
            rank="2"
            name="Isabela Merced"
            image="https://jashan12002.github.io/IMdb-hackathon/src/assets/popular-3.jpg"
            change="down"
            changeValue="1"
          />
          <CelebrityCard 
            rank="3"
            name="Pedro Pascal"
            image="https://jashan12002.github.io/IMdb-hackathon/src/assets/popular-2.jpg"
            change="up"
            changeValue="5"
          />
          <CelebrityCard 
            rank="4"
            name="Minka Kelly"
            image="https://jashan12002.github.io/IMdb-hackathon/src/assets/popular.jpg"
            change="up"
            changeValue="3"
          />
        </div>
        
        <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-2 md:w-12 md:h-12 rounded-full bg-black/40 flex items-center justify-center shadow-xl hover:bg-black/60 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" md:width="28" md:height="28" viewBox="0 0 24 24" fill="white">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default PopularCelbs
