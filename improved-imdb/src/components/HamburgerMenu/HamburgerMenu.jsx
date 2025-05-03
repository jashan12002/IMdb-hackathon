import React, { useState, useEffect } from 'react';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();

        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const menuItems = [
        {
            title: 'Movies',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                    <line x1="7" y1="2" x2="7" y2="22"></line>
                    <line x1="17" y1="2" x2="17" y2="22"></line>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <line x1="2" y1="7" x2="7" y2="7"></line>
                    <line x1="2" y1="17" x2="7" y2="17"></line>
                    <line x1="17" y1="17" x2="22" y2="17"></line>
                    <line x1="17" y1="7" x2="22" y2="7"></line>
                </svg>
            ),
            links: [
                { title: 'Release Calendar', url: '#' },
                { title: 'Top 250 Movies', url: '#' },
                { title: 'Most Popular Movies', url: '#' },
                { title: 'Browse Movies by Genre', url: '#' },
                { title: 'Top Box Office', url: '#' },
                { title: 'Showtimes & Tickets', url: '#' },
                { title: 'Movie News', url: '#' },
                { title: 'India Movie Spotlight', url: '#' },
            ],
            tag: '',
        },
        {
            title: 'TV Shows',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                    <polyline points="17 2 12 7 7 2"></polyline>
                </svg>
            ),
            links: [
                { title: "What's on TV & Streaming", url: '#' },
                { title: 'Top 250 TV Shows', url: '#' },
                { title: 'Most Popular TV Shows', url: '#' },
                { title: 'Browse TV Shows by Genre', url: '#' },
                { title: 'TV News', url: '#' },
            ],
            tag: '',
        },
        {
            title: 'Watch',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
            ),
            links: [
                { title: 'What to Watch', url: '#' },
                { title: 'Latest Trailers', url: '#' },
                { title: 'IMDb Originals', url: '#' },
                { title: 'IMDb Picks', url: '#' },
                { title: 'IMDb Podcasts', url: '#' },
            ],
            tag: '',
        },
        {
            title: 'Awards & Events',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
            ),
            links: [
                { title: 'Oscars', url: '#' },
                { title: 'Cannes Film Festival', url: '#' },
                { title: 'Star Wars', url: '#' },
                { title: 'Asian Pacific American Heritage Month', url: '#' },
                { title: 'Summer Watch Guide', url: '#' },
                { title: 'STARmeter Awards', url: '#' },
                { title: 'Awards Central', url: '#' },
                { title: 'Festival Central', url: '#' },
                { title: 'All Events', url: '#' },
            ],
            tag: '',
        },
        {
            title: 'Celebs',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            ),
            links: [
                { title: 'Born Today', url: '#' },
                { title: 'Most Popular Celebs', url: '#' },
                { title: 'Celebrity News', url: '#' },
            ],
            tag: '',
        },
        {
            title: 'Community',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            ),
            links: [
                { title: 'Help Center', url: '#' },
                { title: 'Contributor Zone', url: '#' },
                { title: 'Polls', url: '#' },
            ],
            tag: 'NEW',
        },
    ];

    return (
        <>

            <button
                className='flex items-center space-x-2 hover:bg-[#3e3d3db6] px-3 py-2.5 rounded-3xl transition-all duration-200'
                onClick={toggleMenu}
                aria-label="Menu"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="ipc-icon ipc-icon--menu" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"></path>
                </svg>
                <span className='text-[15px] font-medium'>Menu</span>
            </button>

            {isOpen && !isMobile && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1f1f1f] animate-slideDown">
                    <div className="container mx-auto px-4 py-6">
                        <div className='flex justify-between items-center px-4 mb-7'>

                            <svg id="home_img" class="ipc-logo cursor-pointer transform transition-transform hover:scale-105" xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32" version="1.1"><g fill="#F5C518"><rect x="0" y="0" width="100%" height="100%" rx="4"></rect></g><g transform="translate(8.000000, 7.000000)" fill="#000000" fill-rule="nonzero"><polygon points="0 18 5 18 5 0 0 0"></polygon><path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path><path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path><path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path></g></svg>
                            <div className="flex justify-end mr-9 items-center">
                                <button
                                    onClick={closeMenu}
                                    className="text-black bg-[#e2b616] rounded-full p-2 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-14">
                            {menuItems.map((category, index) => (
                                <div key={index} className="mb-8 animate-fadeInUp" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <div className="flex items-center text-[#f5c518] mb-4">
                                        <span className="mr-3">{category.icon}</span>
                                        <h3 className="text-xl font-bold">{category.title}</h3>
                                        {category.tag && (
                                            <span className="ml-2 px-1.5 py-0.5 bg-[#f5c518] text-black text-xs rounded-sm font-bold">
                                                {category.tag}
                                            </span>
                                        )}
                                    </div>
                                    <ul className="space-y-2">
                                        {category.links.map((link, linkIndex) => (
                                            <li key={linkIndex} className="animate-fadeInUp" style={{ animationDelay: `${(index * 0.05) + (linkIndex * 0.03)}s` }}>
                                                <a
                                                    href={link.url}
                                                    className="text-gray-300 hover:text-white hover:underline transition-colors text-base block py-1"
                                                    onClick={closeMenu}
                                                >
                                                    {link.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {isOpen && isMobile && (
                <>
                    <div
                        className="fixed inset-0 bg-black/70 z-40"
                        onClick={closeMenu}
                    ></div>
                    <div className="fixed top-0 bottom-0 left-0 z-50 w-[280px] bg-[#121212] overflow-y-auto animate-slideRight">
                        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                            <svg id="home_img" className="ipc-logo cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32" version="1.1">
                                <g fill="#F5C518">
                                    <rect x="0" y="0" width="100%" height="100%" rx="4"></rect>
                                </g>
                                <g transform="translate(8.000000, 7.000000)" fill="#000000" fillRule="nonzero">
                                    <polygon points="0 18 5 18 5 0 0 0"></polygon>
                                    <path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path>
                                    <path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path>
                                    <path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path>
                                </g>
                            </svg>
                            <button
                                onClick={closeMenu}
                                className="text-white hover:text-[#f5c518] p-2 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="p-4">
                            {menuItems.map((category, index) => (
                                <div key={index} className="mb-6 animate-fadeInRight" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <div className="flex items-center text-white mb-2">
                                        <span className="mr-3 text-[#f5c518]">{category.icon}</span>
                                        <h3 className="text-lg font-bold">{category.title}</h3>
                                        {category.tag && (
                                            <span className="ml-2 px-1.5 py-0.5 bg-[#f5c518] text-black text-xs rounded-sm font-bold">
                                                {category.tag}
                                            </span>
                                        )}
                                    </div>
                                    <ul className="space-y-2 pl-9 border-l border-gray-800 ml-3">
                                        {category.links.map((link, linkIndex) => (
                                            <li key={linkIndex} className="animate-fadeInRight" style={{ animationDelay: `${(index * 0.05) + (linkIndex * 0.03)}s` }}>
                                                <a
                                                    href={link.url}
                                                    className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                                                    onClick={closeMenu}
                                                >
                                                    {link.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default HamburgerMenu; 