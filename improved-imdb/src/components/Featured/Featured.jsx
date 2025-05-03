import React from 'react'

const ListCard = ({ image, title, type }) => {
  return (
    <div className="relative group cursor-pointer rounded-xl overflow-hidden">
      <img src={image} alt={title} className="w-full h-[280px] object-cover" />
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="ipc-icon" viewBox="0 0 24 24" fill="white" role="presentation">
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M4 10h12v2H4zm0-4h12v2H4zm0 8h8v2H4zm10 0v6l5-3z"></path>
        </svg>
        <span className="text-white text-lg font-medium">List</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute top-4 left-4">
        <h3 className="text-white text-xl font-bold">{type}</h3>
      </div>
    </div>
  )
}

const SponsoredCard = ({ image, title }) => {
  return (
    <div className="relative group cursor-pointer rounded-xl overflow-hidden">
      <img src={image} alt={title} className="w-full h-[280px] object-cover" />
      <div className="absolute top-4 left-4">
        <img src="https://akamaividz2.zee5.com/image/upload/resources/0-9-aajtak/channel_web/zee5newlogo_1440" alt="ZEE5" className="h-6" />
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-1">
        <span className="text-white/80 text-sm">Sponsored</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </div>
      <div className="absolute bottom-16 left-4">
        <span className="text-white/80 text-sm">A ZEE5 ORIGINAL FILM</span>
      </div>
      <div className="absolute bottom-4 left-4">
        <h3 className="text-white text-2xl font-bold">{title}</h3>
      </div>
    </div>
  )
}

const Featured = () => {
  return (
    <div className="px-4 py-6 mt-10">
      <h1 className="text-[#f5c518] text-4xl font-bold mb-6">Featured today</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <ListCard 
          image="https://m.media-amazon.com/images/M/MV5BNDJkYzY3MzMtMGFhYi00MmQ4LWJkNTgtZGNiZWZmMTMxNzdlXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg"
          title="Shruti Mahajan's List"
          type=""
        />
        
        <ListCard 
          image="https://jashan12002.github.io/IMdb-hackathon/src/assets/pic-2.jpg"
          title="Hansal Mehta's List"
          type="Favourite Indian Female Actors"
        />
        
        <SponsoredCard 
          image="https://m.media-amazon.com/images/I/51E72gmk8WL.jpg"
          title=""
        />
      </div>
    </div>
  )
}

export default Featured
