import React, { useEffect, useState, useRef } from 'react'
import heroImage from '../../assets/hero.jpg'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {

    const style = document.createElement('style');
    style.textContent = `
      @keyframes heroReveal {
        0% { 
          opacity: 0;
          transform: scale(1.05);
          filter: brightness(0.5) blur(10px);
        }
        100% { 
          opacity: 1;
          transform: scale(1);
          filter: brightness(1) blur(0px);
        }
      }
      
      @keyframes shimmerEffect {
        0% { 
          background-position: -200% center;
        }
        100% { 
          background-position: 200% center;
        }
      }
      
      .hero-container {
        position: relative;
        overflow: hidden;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        transition: all 0.5s ease;
      }
      
      .hero-container:hover {
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
        transform: translateY(-5px);
      }
      
      .hero-image {
        animation: heroReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        transform-origin: center;
        width: 100%;
        height: auto;
      }
      
      .hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      
      .hero-container:hover .hero-overlay {
        opacity: 1;
      }
      
      .shimmering-border {
        position: absolute;
        inset: 0;
        padding: 3px;
        border-radius: 15px;
        background: linear-gradient(90deg, transparent, #f5c518, transparent);
        background-size: 200% 100%;
        animation: shimmerEffect 2s infinite linear;
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      
      .hero-container:hover .shimmering-border {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    return () => {
      document.head.removeChild(style);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className='flex justify-center items-center py-8 max-w-6xl mx-auto' style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}>
      <div className='hero-container' ref={heroRef}>
        <div className="shimmering-border"></div>
        <div className="hero-overlay"></div>
        <img 
          src={heroImage} 
          alt="Hero Image" 
          className="hero-image"
        />
        <div className="absolute bottom-10 left-10 text-white z-10 opacity-0 transform translate-y-10 transition-all duration-500" 
             style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(10px)' }}>
          <h1 className="text-4xl font-bold mb-2 text-[#f5c518]"></h1>
          <p className="text-xl text-gray-200"></p>
        </div>
      </div>
    </div>
  )
}

export default Hero
