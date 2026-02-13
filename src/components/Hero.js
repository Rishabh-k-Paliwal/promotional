import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import './Hero.css';

const Hero = ({ eventDate, eventDay }) => {
  const glowRef = useRef(null);
  const titleRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // GSAP animations for glow effect
    gsap.to(glowRef.current, {
      scale: 1.3,
      opacity: 0.8,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Title animation
    gsap.fromTo(titleRef.current,
      { scale: 0.5, opacity: 0, rotationY: 180 },
      { scale: 1, opacity: 1, rotationY: 0, duration: 2, ease: 'back.out(1.7)' }
    );

    // Autoplay music when component mounts
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(e => {
          console.log('Autoplay prevented, user interaction needed:', e);
          setIsPlaying(false);
        });
      }
    };

    // Try to play after a short delay
    const timer = setTimeout(playAudio, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}></div>
      <div className="hero-overlay"></div>
      
      <div className="divine-glow" ref={glowRef}></div>
      
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {/* Hare Krishna Mahamantra with Peacock Feather */}
        <motion.div 
          className="sanskrit-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.5 }}
        >
          <div className="peacock-feather-left">
            <svg viewBox="0 0 100 150" className="feather-svg">
              <defs>
                <linearGradient id="featherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#4169E1', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#00CED1', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#32CD32', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {/* Feather stem */}
              <path d="M 50 10 Q 48 80 45 140" stroke="#8B4513" strokeWidth="2" fill="none"/>
              {/* Feather eye */}
              <ellipse cx="50" cy="30" rx="20" ry="25" fill="url(#featherGradient)" opacity="0.8"/>
              <ellipse cx="50" cy="30" rx="12" ry="15" fill="#4169E1" opacity="0.9"/>
              <ellipse cx="50" cy="30" rx="6" ry="8" fill="#000080"/>
              <ellipse cx="52" cy="28" rx="2" ry="3" fill="#FFD700"/>
              {/* Feather barbs */}
              <path d="M 30 35 Q 40 40 50 45" stroke="url(#featherGradient)" strokeWidth="1" fill="none" opacity="0.6"/>
              <path d="M 70 35 Q 60 40 50 45" stroke="url(#featherGradient)" strokeWidth="1" fill="none" opacity="0.6"/>
              <path d="M 25 45 Q 37 50 50 55" stroke="url(#featherGradient)" strokeWidth="1" fill="none" opacity="0.5"/>
              <path d="M 75 45 Q 63 50 50 55" stroke="url(#featherGradient)" strokeWidth="1" fill="none" opacity="0.5"/>
            </svg>
          </div>

          <motion.div 
            className="sanskrit-text"
          >
            <div className="sanskrit-line">हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे</div>
            <div className="sanskrit-line">हरे राम हरे राम राम राम हरे हरे</div>
          </motion.div>

          <div className="peacock-feather-right">
            <svg viewBox="0 0 100 150" className="feather-svg">
              <defs>
                <linearGradient id="featherGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#32CD32', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#00CED1', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#4169E1', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {/* Feather stem */}
              <path d="M 50 10 Q 52 80 55 140" stroke="#8B4513" strokeWidth="2" fill="none"/>
              {/* Feather eye */}
              <ellipse cx="50" cy="30" rx="20" ry="25" fill="url(#featherGradient2)" opacity="0.8"/>
              <ellipse cx="50" cy="30" rx="12" ry="15" fill="#4169E1" opacity="0.9"/>
              <ellipse cx="50" cy="30" rx="6" ry="8" fill="#000080"/>
              <ellipse cx="48" cy="28" rx="2" ry="3" fill="#FFD700"/>
              {/* Feather barbs */}
              <path d="M 30 35 Q 40 40 50 45" stroke="url(#featherGradient2)" strokeWidth="1" fill="none" opacity="0.6"/>
              <path d="M 70 35 Q 60 40 50 45" stroke="url(#featherGradient2)" strokeWidth="1" fill="none" opacity="0.6"/>
              <path d="M 25 45 Q 37 50 50 55" stroke="url(#featherGradient2)" strokeWidth="1" fill="none" opacity="0.5"/>
              <path d="M 75 45 Q 63 50 50 55" stroke="url(#featherGradient2)" strokeWidth="1" fill="none" opacity="0.5"/>
            </svg>
          </div>
        </motion.div>

        <motion.h1 
          ref={titleRef}
          className="hero-title"
        >
          दिव्य होली महोत्सव
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          श्री कृष्ण के साथ दिव्य रंगों का उत्सव
        </motion.p>
        
        <motion.div 
          className="event-info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="info-item">
            <span className="info-label">दिनांक:</span>
            <span className="info-value">{eventDate}</span>
          </div>
          <span className="info-separator">|</span>
          <div className="info-item">
            <span className="info-label">दिन:</span>
            <span className="info-value">{eventDay}</span>
          </div>
          <span className="info-separator">|</span>
          <div className="info-item">
            <span className="info-label">स्थान:</span>
            <span className="info-value">उदयनिवास</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Music Control on Hero */}
      <motion.div 
        className="hero-music-control"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.button
          className="music-button"
          onClick={toggleMusic}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="45" height="55" viewBox="0 0 100 150" fill="none">
            <defs>
              <linearGradient id="musicFeatherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#4169E1', stopOpacity: 1 }} />
                <stop offset="30%" style={{ stopColor: '#00CED1', stopOpacity: 1 }} />
                <stop offset="60%" style={{ stopColor: '#32CD32', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
              </linearGradient>
              <radialGradient id="eyeGradient" cx="50%" cy="50%">
                <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                <stop offset="30%" style={{ stopColor: '#00CED1', stopOpacity: 1 }} />
                <stop offset="60%" style={{ stopColor: '#4169E1', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#000080', stopOpacity: 1 }} />
              </radialGradient>
            </defs>
            {/* Feather stem */}
            <path d="M 50 20 Q 48 80 45 140" stroke="#8B4513" strokeWidth="3" fill="none"/>
            
            {/* Outer feather barbs - left side */}
            <path d="M 20 50 Q 35 45 50 50" stroke="url(#musicFeatherGradient)" strokeWidth="2" fill="none" opacity="0.8"/>
            <path d="M 15 60 Q 32 55 50 60" stroke="url(#musicFeatherGradient)" strokeWidth="2" fill="none" opacity="0.7"/>
            <path d="M 18 70 Q 34 65 50 70" stroke="url(#musicFeatherGradient)" strokeWidth="1.5" fill="none" opacity="0.6"/>
            <path d="M 22 80 Q 36 75 50 80" stroke="url(#musicFeatherGradient)" strokeWidth="1.5" fill="none" opacity="0.5"/>
            
            {/* Outer feather barbs - right side */}
            <path d="M 80 50 Q 65 45 50 50" stroke="url(#musicFeatherGradient)" strokeWidth="2" fill="none" opacity="0.8"/>
            <path d="M 85 60 Q 68 55 50 60" stroke="url(#musicFeatherGradient)" strokeWidth="2" fill="none" opacity="0.7"/>
            <path d="M 82 70 Q 66 65 50 70" stroke="url(#musicFeatherGradient)" strokeWidth="1.5" fill="none" opacity="0.6"/>
            <path d="M 78 80 Q 64 75 50 80" stroke="url(#musicFeatherGradient)" strokeWidth="1.5" fill="none" opacity="0.5"/>
            
            {/* Feather eye - multiple layers for depth */}
            <ellipse cx="50" cy="35" rx="24" ry="30" fill="url(#musicFeatherGradient)" opacity="0.9"/>
            <ellipse cx="50" cy="35" rx="18" ry="22" fill="url(#eyeGradient)" opacity="0.95"/>
            <ellipse cx="50" cy="35" rx="12" ry="15" fill="#4169E1" opacity="0.9"/>
            <ellipse cx="50" cy="35" rx="7" ry="9" fill="#000080"/>
            <ellipse cx="52" cy="33" rx="3" ry="4" fill="#FFD700"/>
            <ellipse cx="53" cy="32" rx="1.5" ry="2" fill="#FFF"/>
            
            {/* Inner feather details */}
            <path d="M 28 42 Q 39 38 50 42" stroke="#00CED1" strokeWidth="1" fill="none" opacity="0.6"/>
            <path d="M 72 42 Q 61 38 50 42" stroke="#00CED1" strokeWidth="1" fill="none" opacity="0.6"/>
            
            {isPlaying && (
              <>
                {/* Pause bars when playing */}
                <rect x="42" y="30" width="4" height="10" fill="#fff" opacity="0.9"/>
                <rect x="54" y="30" width="4" height="10" fill="#fff" opacity="0.9"/>
              </>
            )}
          </svg>
        </motion.button>
        <p className="music-label">Switch on Audio</p>
      </motion.div>

      <audio ref={audioRef} loop autoPlay>
        <source src="/audio/mahamantra.mp3" type="audio/mpeg" />
      </audio>

      {/* Lotus Flower Petals Rain */}
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          className="lotus-petal"
          style={{
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: -100, opacity: 0, rotate: 0 }}
          animate={{ 
            y: window.innerHeight + 100, 
            opacity: [0, 0.9, 0.9, 0],
            rotate: 360,
            x: [0, Math.random() * 60 - 30, Math.random() * 60 - 30, 0]
          }}
          transition={{ 
            duration: Math.random() * 6 + 10, 
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: 'linear'
          }}
        />
      ))}
    </section>
  );
};

export default Hero;
