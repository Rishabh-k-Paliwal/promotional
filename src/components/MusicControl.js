import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './MusicControl.css';

const MusicControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return undefined;
    }

    let cleaned = false;

    const tryAutoPlay = async () => {
      if (cleaned || !audio.paused) {
        return;
      }

      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        // Browser can block autoplay with sound; fallback listeners handle this.
      }
    };

    const handleFirstInteraction = () => {
      tryAutoPlay();
    };

    tryAutoPlay();
    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      cleaned = true;
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.log('Audio play failed:', error);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        className={`music-floating-button ${isPlaying ? 'playing' : ''}`}
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ duration: 0.35 }}
      >
        <svg viewBox="0 0 24 24" className="music-icon" aria-hidden="true">
          <path d="M10 17a3 3 0 1 0 2 2.83V8.83l7-1.4V14a3 3 0 1 0 2 2.83V5l-11 2.2V17z" />
        </svg>
        <span className="music-status-dot" />
      </motion.button>

      <audio ref={audioRef} loop>
        <source src="/audio/mahamantra.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
};

export default MusicControl;
