import React, { useEffect, useRef, useState } from 'react'

const noScrollbarStyles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none; 
    scrollbar-width: none;
  }
`;

const ExternalLink = ({ href, children, hasIcon = true }) => {
  return (
    <a 
      href={href} 
      className="text-white hover:text-[#99c3ff] inline-flex items-center transition-all duration-300 hover:translate-y-[-2px]" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      {children}
      {hasIcon && (
        <svg width="12" height="12" viewBox="0 0 24 24" className="ml-1 text-gray-400 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor">
          <path d="M16 10v-5l8 8-8 8v-5l-8-4z"></path>
        </svg>
      )}
    </a>
  )
}

const SocialIcon = ({ href, children }) => {
  return (
    <a 
      href={href} 
      className="hover:opacity-80 transform transition-transform duration-300 hover:scale-110 hover:rotate-[5deg]"
    >
      {children}
    </a>
  )
}

const Footer = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const footerRef = useRef(null);
  
  useEffect(() => {
  
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes glowPulse {
        0% { box-shadow: 0 0 5px rgba(245, 197, 24, 0.1); }
        50% { box-shadow: 0 0 20px rgba(245, 197, 24, 0.3); }
        100% { box-shadow: 0 0 5px rgba(245, 197, 24, 0.1); }
      }
      
      @keyframes bgShimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      
      .animated-section {
        opacity: 0;
        transform: translateY(20px);
      }
      
      .animated-section.visible {
        animation: fadeInUp 0.6s forwards;
      }
      
      .animated-button {
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      .animated-button::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: all 0.6s ease;
      }
      
      .animated-button:hover::after {
        left: 100%;
      }
      
      .social-card {
        animation: glowPulse 3s infinite alternate;
        background: linear-gradient(45deg, #121212, #1a1a1a);
      }
      
      .app-card {
        position: relative;
        overflow: hidden;
        background: linear-gradient(45deg, #121212, #1a1a1a);
      }
      
      .app-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(245, 197, 24, 0.1), transparent);
        background-size: 200% 100%;
        animation: bgShimmer 3s infinite linear;
        pointer-events: none;
      }

      ${noScrollbarStyles}
    `;
    document.head.appendChild(style);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    const animateSections = () => {
      if (!isAnimated) return;
      
      const sections = document.querySelectorAll('.animated-section');
      sections.forEach((section, index) => {
        setTimeout(() => {
          section.classList.add('visible');
        }, index * 150); 
      });
    };
    
    animateSections();
    
    return () => {
      document.head.removeChild(style);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [isAnimated]);

  return (
    <div className="bg-black text-white pt-8 pb-4" ref={footerRef}>
      <div className="px-4 md:px-8 mb-12 md:mb-20 animated-section">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Recently viewed</h2>
        <p className="text-white text-base md:text-lg">You have no recently viewed pages</p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10 md:mt-16">
          <button className="animated-button bg-[#f5c518] hover:bg-[#f5c518]/90 text-black px-5 py-2 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-[#f5c518]/20 transition-all duration-300 transform hover:scale-105">
            Sign in for more access
          </button>

          <button className="animated-button bg-[#f5c518] hover:bg-[#f5c518]/90 text-black px-5 py-2 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-[#f5c518]/20 transition-all duration-300 transform hover:scale-105">
            Get the IMDb app
          </button>
        </div>
      </div>

      <div className="flex justify-center flex-wrap gap-6 md:gap-16 px-4 md:px-8 mb-10">
     
        <div className="social-card border border-gray-800 rounded-lg p-5 md:p-8 w-full sm:w-auto md:w-[450px] md:h-[150px] animated-section">
          <h3 className="text-center text-xl md:text-2xl font-bold mb-6">Follow IMDb on social</h3>
          <div className="flex justify-center gap-6 md:gap-8 overflow-x-auto no-scrollbar">
            <SocialIcon href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" md:width="32" md:height="32" viewBox="0 0 448 512" fill="white">
                <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
              </svg>
            </SocialIcon>
            <SocialIcon href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" md:width="32" md:height="32" viewBox="0 0 448 512" fill="white">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
              </svg>
            </SocialIcon>
            <SocialIcon href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" md:width="32" md:height="32" viewBox="0 0 512 512" fill="white">
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
              </svg>
            </SocialIcon>
            <SocialIcon href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" md:width="32" md:height="32" viewBox="0 0 576 512" fill="white">
                <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
              </svg>
            </SocialIcon>
            <SocialIcon href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" md:width="32" md:height="32" viewBox="0 0 512 512" fill="white">
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
              </svg>
            </SocialIcon>
          </div>
        </div>
 
        <div className="app-card border border-gray-800 rounded-lg p-8 w-[450px] h-[150px] hidden md:flex justify-between animated-section" style={{ animationDelay: '0.2s' }}>
            <div>
                <h3 className="text-center text-2xl font-bold mb-2">Get the IMDb app</h3>
                <p className="text-center text-gray-400 mb-4">For Android and iOS</p>
            </div>
            <div className="flex justify-center">
                <img 
                    src="http://localhost:5173/src/assets/qr.png"
                    alt="QR Code"
                    className="w-20 h-20 transition-all duration-500 hover:scale-110 hover:brightness-110"
                />
            </div>
        </div>
      </div>
 
      <div className="max-w-5xl mx-auto text-center mb-8 px-4 animated-section" style={{ animationDelay: '0.4s' }}>
        <div className="flex justify-center gap-4 md:gap-6 mb-4 flex-wrap">
          <ExternalLink href="#">Help</ExternalLink>
          <ExternalLink href="#">Site Index</ExternalLink>
          <ExternalLink href="#">IMDbPro</ExternalLink>
          <ExternalLink href="#">Box Office Mojo</ExternalLink>
          <ExternalLink href="#">License IMDb Data</ExternalLink>
        </div>
        
        <div className="flex justify-center gap-4 md:gap-6 mb-8 flex-wrap">
          <ExternalLink href="#" hasIcon={false}>Press Room</ExternalLink>
          <ExternalLink href="#">Advertising</ExternalLink>
          <ExternalLink href="#">Jobs</ExternalLink>
          <ExternalLink href="#" hasIcon={false}>Conditions of Use</ExternalLink>
          <ExternalLink href="#" hasIcon={false}>Privacy Policy</ExternalLink>
          <div className="flex items-center group">
            <img 
              src="https://www.facebook.com/images/fb_icon_325x325.png" 
              alt="Your Ad Choices" 
              className="w-4 h-4 mr-1 transition-transform duration-300 group-hover:scale-110"
            />
            <a href="#" className="text-white hover:text-[#99c3ff] transition-all duration-300 hover:translate-y-[-2px]">
              Your Ads Privacy Choices
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-2 animated-section" style={{ animationDelay: '0.6s' }}>
        <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="30" viewBox="0 0 603 182" fill="white">
            <path d="M374.2 142.4c-34.8 25.8-85.1 39.6-128.4 39.6-60.9 0-115.7-22.6-157.2-60.1-3.3-3-0.3-7 3.6-4.7 45 26.4 100.5 42.2 158 42.2 38.5 0 81-8 120.1-24.7 5.9-2.5 10.9 3.9 4.9 7.7z"></path>
            <path d="M388.5 125.9c-4.4-5.7-29.3-2.7-40.4-1.4-3.4 0.4-3.9-2.6-0.9-4.8 19.8-14 52.2-10 56-5.3 3.8 4.8-1 37.8-19.8 53.6-2.9 2.5-5.6 1.2-4.4-2.1 4.2-10.5 13.6-33.9 9.5-40z"></path>
            <path d="M348.3 21.9v-13.6c0-2.1 1.5-3.4 3.4-3.4h60.4c1.9 0 3.4 1.4 3.4 3.4v11.6c0 1.9-1.6 4.4-4.5 8.4l-31.3 44.8c11.6-0.3 23.9 1.5 34.5 7.3 2.4 1.3 3 3.2 3.2 5.1v14.5c0 1.9-2.1 4.1-4.3 3-18.1-9.5-42-10.5-62 0.1-2 1.1-4.2-1.1-4.2-3v-13.8c0-2.1 0-5.6 2.1-8.8l36.2-52h-31.5c-1.9 0-3.4-1.4-3.4-3.4v0.1z"></path>
            <path d="M124.3 105.4h-18.4c-1.7-0.1-3.1-1.4-3.3-3.1v-95c0-1.9 1.5-3.3 3.4-3.3h17.2c1.7 0.1 3.1 1.4 3.3 3.1v12.4h0.3c4.5-12 13-17.6 24.5-17.6 11.6 0 18.9 5.6 24.2 17.6 4.5-12 14.8-17.6 25.8-17.6 7.8 0 16.4 3.3 21.6 10.5 5.9 8.2 4.7 19.9 4.7 30.3l0 59.2c0 1.9-1.5 3.3-3.4 3.3h-18.3c-1.8-0.1-3.2-1.6-3.2-3.3v-49.7c0-4 0.4-13.8-0.5-17.6-1.3-6.3-5.3-8.1-10.4-8.1-4.3 0-8.8 2.9-10.6 7.5-1.8 4.6-1.7 12.2-1.7 18.2v49.7c0 1.9-1.5 3.3-3.4 3.3h-18.3c-1.8-0.1-3.2-1.6-3.2-3.3v-49.7c0-10.5 1.7-25.9-11-25.9-12.8 0-12.3 15-12.3 25.9v49.7c0 1.9-1.5 3.3-3.4 3.3v0z"></path>
            <path d="M469.5 1.2c27.3 0 42 23.5 42 53.4 0 28.9-16.3 51.8-42 51.8-26.8 0-41.4-23.5-41.4-52.8-0.1-29.5 14.8-52.4 41.4-52.4zM469.5 21c-13.6 0-14.4 18.5-14.4 30 0 11.5-0.1 36.1 14.4 36.1 14.4 0 15.1-20.1 15.1-32.4 0-8.1-0.3-17.7-2.8-25.4-2.1-6.6-6.2-8.4-12.3-8.4z"></path>
            <path d="M548.2 105.4h-18.3c-1.8-0.1-3.2-1.6-3.2-3.3v-95c0.2-1.7 1.6-3 3.4-3h17c1.5 0.1 2.8 1.1 3.2 2.5v14.5h0.3c5.1-12.9 12.3-19 24.9-19 8.2 0 16.2 3 21.3 11.1 4.8 7.5 4.8 20.2 4.8 29.3v59.1c-0.2 1.6-1.6 2.8-3.3 2.8h-18.4c-1.6-0.1-2.9-1.3-3.2-2.8v-51c0-10.3 1.2-25.4-11.5-25.4-4.5 0-8.6 3-10.6 7.5-2.6 5.8-2.9 11.5-2.9 17.9v50.7c0 1.9-1.5 3.3-3.4 3.3h0.1z"></path>
            <path d="M244.7 56.3c0 7.1 0.2 13.1-3.4 19.5-2.9 5.3-7.5 8.5-12.6 8.5-7 0-11.1-5.3-11.1-13.2 0-15.5 13.9-18.3 27.1-18.3v3.5zM263.1 105c-1.2 1.1-2.9 1.2-4.2 0.4-5.9-4.9-7-7.2-10.2-11.8-9.8 10-16.7 13-29.3 13-15 0-26.6-9.3-26.6-27.7 0-14.5 7.8-24.3 19-29.1 9.6-4.3 23.1-5.1 33.4-6.3v-2.3c0-4.2 0.3-9.2-2.2-12.9-2.2-3.3-6.4-4.6-10.1-4.6-6.9 0-13 3.5-14.5 10.8-0.3 1.6-1.6 3.2-3.3 3.3l-17.8-1.9c-1.5-0.3-3.2-1.6-2.8-4 4.2-22.1 24-28.8 41.8-28.8 9.1 0 21 2.4 28.2 9.3 9.1 8.5 8.2 19.8 8.2 32.1v29.1c0 8.8 3.6 12.6 7 17.3 1.2 1.6 1.5 3.6-0.1 4.8-3.6 3-10.2 8.7-13.8 11.9l-0.5-0.5v-0.1z"></path>
            <path d="M56.4 56.3c0 7.1 0.2 13.1-3.4 19.5-2.9 5.3-7.5 8.5-12.6 8.5-7 0-11.1-5.3-11.1-13.2 0-15.5 13.9-18.3 27.1-18.3v3.5zM74.8 105c-1.2 1.1-2.9 1.2-4.2 0.4-5.9-4.9-7-7.2-10.2-11.8-9.8 10-16.7 13-29.3 13-15 0-26.6-9.3-26.6-27.7 0-14.5 7.8-24.3 19-29.1 9.6-4.3 23.1-5.1 33.4-6.3v-2.3c0-4.2 0.3-9.2-2.2-12.9-2.2-3.3-6.4-4.6-10.1-4.6-6.9 0-13 3.5-14.5 10.8-0.3 1.6-1.6 3.2-3.3 3.3l-17.8-1.9c-1.5-0.3-3.2-1.6-2.8-4 4.2-22.1 24-28.8 41.8-28.8 9.1 0 21 2.4 28.2 9.3 9.1 8.5 8.2 19.8 8.2 32.1v29.1c0 8.8 3.6 12.6 7 17.3 1.2 1.6 1.5 3.6-0.1 4.8-3.6 3-10.2 8.7-13.8 11.9l-0.5-0.5v-0.1z"></path>
          </svg>
        </a>
      </div>
      
      <div className="text-center mt-4 text-xs text-gray-500 animated-section" style={{ animationDelay: '0.8s' }}>
        <span className="block sm:inline">© 1990-2023 by IMDb.com, Inc.</span>
      </div>
    </div>
  );
};

export default Footer;
