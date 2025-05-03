import React, { useState, useEffect } from 'react'
import Navbar from './components/Header/Navbar'
import Hero from './components/Hero/Hero'
import Swiper from './components/Swiper/Swiper'
import Featured from './components/Featured/Featured'
import PopularCelbs from './components/PopularCelbs/PopularCelbs'
import Footer from './components/Footer/Footer'
import BackToTop from './components/BackToTop/BackToTop'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import { MovieRowSkeleton } from './components/Skeleton/Skeleton'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const contentElements = document.querySelectorAll('.card, .section, .container');
    contentElements.forEach(el => {
      el.setAttribute('data-theme-bg', 'dark');
    });
    
    document.querySelectorAll('.bg-white').forEach(el => {
      el.setAttribute('data-theme-bg', 'light');
    });
    
    document.querySelectorAll('.bg-gray-900, .bg-gray-800').forEach(el => {
      el.setAttribute('data-theme-bg', 'dark');
    });

    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);
  
  return (
    <div className='bg-theme-dark min-h-screen' data-theme-bg="dark">
      <Navbar />
      
      <Hero />
      
      {isLoading ? (
        <div className="py-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-white px-4 mb-4">Featured Movies</h2>
            <MovieRowSkeleton />
          </div>
        </div>
      ) : (
        <Swiper />
      )}
      
      <Featured />
      <PopularCelbs />
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
