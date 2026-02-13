import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './WelcomePage.css';

const WelcomePage = ({ onScrollDown }) => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    // Prevent body scroll when welcome page is visible
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    const handleWheel = (e) => {
      if (!isScrolling && e.deltaY > 0) {
        setIsScrolling(true);
        onScrollDown();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [onScrollDown, isScrolling]);

  return (
    <motion.div 
      className="welcome-page"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8 }}
    >
      <div className="welcome-content">
        <div className="circular-mantra-welcome">
          <svg viewBox="0 0 500 500" className="mantra-circle-welcome">
            <defs>
              <path
                id="circlePathWelcome"
                d="M 250, 250 m -200, 0 a 200,200 0 1,1 400,0 a 200,200 0 1,1 -400,0"
              />
            </defs>
            <text className="mantra-text-welcome">
              <textPath href="#circlePathWelcome" startOffset="0%">
                हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे हरे राम हरे राम राम राम हरे हरे ||
              </textPath>
            </text>
          </svg>
          
          {/* Shrinathji Image in Center */}
          <div className="center-image">
            <img 
              src="/images/shrinath.png" 
              alt="Shrinathji" 
              className="shrinathji-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="placeholder-text" style={{ display: 'none' }}>
              श्रीनाथजी
            </div>
          </div>
        </div>

        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ pointerEvents: 'auto' }}
        >
          <p>Scroll Down</p>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomePage;
