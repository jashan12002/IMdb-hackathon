import React, { useEffect, useState } from 'react';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './Swiper.css';
import AddToWatchlistButton from '../WatchlistButton/WatchlistButton';

const MainVideoCard = ({ thumbnail, title, subtitle, duration, likes, dislikes }) => {
    return (
        <div className="relative group cursor-pointer">
            <img src={thumbnail} alt={title} className="w-full h-[400px] md:h-[600px] object-cover rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          
            <div className="absolute top-4 right-4">
                <AddToWatchlistButton />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#f5c518] flex items-center justify-center group-hover:bg-[#f5c518]/80 transition-colors">
                        <svg width="24" height="24" md:width="32" md:height="32" viewBox="0 0 24 24" fill="black">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                    <span className="ml-4 text-lg md:text-2xl text-white">{duration}</span>
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-white mb-2">{title}</h2>
                <p className="text-base md:text-lg text-[#ffffffb3] mb-4">{subtitle}</p>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <svg width="20" height="20" md:width="24" md:height="24" viewBox="0 0 24 24" fill="#ffffff99">
                            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                        </svg>
                        <span className="text-[#ffffff99] text-base md:text-lg">{likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg width="20" height="20" md:width="24" md:height="24" viewBox="0 0 24 24" fill="#ffffff99" className="rotate-180">
                            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                        </svg>
                        <span className="text-[#ffffff99] text-base md:text-lg">{dislikes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UpNextCard = ({ thumbnail, duration, title, subtitle, likes, dislikes }) => {
    return (
        <div className="flex gap-4 items-start mb-4 cursor-pointer group">
            <div className="relative w-[100px] h-[120px] ">
                <img src={thumbnail} alt={title} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="flex-1">
                <div className='flex items-center gap-2'>
                <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" className="ipc-icon ipc-icon--play-circle-outline-large-inline ipc-icon--inline sc-ed60be29-15 nSwIG editorial-play-icon reactions" viewBox="0 0 24 24" fill="white" role="presentation">
                    <path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z" />
                    <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z" />
                </svg>
                <div className="text-gray-400 text-md">
                    {duration}
                </div>
                </div>

                <h3 className="text-[15px] font-medium text-white group-hover:text-[#99c3ff]">{title}</h3>
                <p className="text-[13px] text-[#ffffffb3] mt-1">{subtitle}</p>
                <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff99">
                            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                        </svg>
                        <span className="text-[#ffffff99] text-sm">{likes}</span>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

const Swiper = () => {
    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
     
        window.addEventListener('resize', checkIfMobile);
       
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const mainVideos = [
        {
            thumbnail: "https://jashan12002.github.io/IMdb-hackathon/src/assets/swiper-pic1.jpg",
            duration: "3:38",
            title: "'Another Simple Favor' Stars Dish on Italian Glamour",
            subtitle: "Watch the Interview",
            likes: "41",
            dislikes: "18"
        }
    ];

    const upNextVideos = [
        {
            thumbnail: "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UX280_CR0,0,280,414_.jpg",
            duration: "2:00",
            title: "'Sorry, Baby'",
            subtitle: "Watch the Trailer",
            likes: "31",
            dislikes: "16"
        },
        {
            thumbnail: "https://m.media-amazon.com/images/M/MV5BOGE4NzU1YTAtNzA3Mi00ZTA2LTg2YmYtMDJmMThiMjlkYjg2XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_QL75_UX280_CR0,0,280,414_.jpg",
            duration: "2:27",
            title: "Can Ahsoka Tano Redeem Anakin Skywalker?",
            subtitle: "Rosario Dawson Teases 'Ahsoka' Season 2",
            likes: "23",
            dislikes: "14"
        },
        {
            thumbnail: "https://jashan12002.github.io/IMdb-hackathon/src/assets/pic-2.jpg",
            duration: "3:23",
            title: "How Ryan Coogler Conjured Magic While Making 'Sinners'",
            subtitle: "Watch the Interview",
            likes: "328",
            dislikes: "79"
        }
    ];

    return (
        <div className="flex flex-col md:flex-row">
           
            <div className="w-full md:flex-1 relative group">
                <SwiperComponent
                    modules={[Navigation]}
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = navigationPrevRef.current;
                        swiper.params.navigation.nextEl = navigationNextRef.current;
                    }}
                    className="relative"
                >
                    {mainVideos.map((video, index) => (
                        <SwiperSlide key={index}>
                            <MainVideoCard {...video} />
                        </SwiperSlide>
                    ))}
                </SwiperComponent>

                <button
                    ref={navigationPrevRef}
                    className="absolute left-0 top-0 bottom-0 w-[50px] md:w-[80px] bg-gradient-to-r from-[#0000004d] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-start pl-4"
                >
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg bg-[#1f1f1f] bg-opacity-60 flex items-center justify-center">
                        <svg width="16" height="16" md:width="24" md:height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                    </div>
                </button>
                <button
                    ref={navigationNextRef}
                    className="absolute right-0 top-0 bottom-0 w-[50px] md:w-[80px] bg-gradient-to-l from-[#0000004d] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-end pr-4"
                >
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg bg-[#1f1f1f] bg-opacity-60 flex items-center justify-center">
                        <svg width="16" height="16" md:width="24" md:height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        </svg>
                    </div>
                </button>
            </div>

            {!isMobile && (
                <div className="hidden md:block w-[400px] p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[#f5c518] text-xl font-medium">Up next</h2>
                    </div>
                    <div className="space-y-4">
                        {upNextVideos.map((video, index) => (
                            <UpNextCard key={index} {...video} />
                        ))}
                    </div>
                    <a href="#" className="text-white hover:text-[#99c3ff] text-lg font-extrabold flex items-center gap-2">
                        Browse trailers <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="ipc-icon ipc-icon--chevron-right chevron-right" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"></path></svg></span>
                    </a>
                </div>
            )}
        </div>
    );
};

export default Swiper;
