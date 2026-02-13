import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './MusicControl.css';

const MusicControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <motion.div 
        className="music-label"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isPlaying ? '⏸️ संगीत रोकें' : '🎵 संगीत चलाएं'}
      </motion.div>
      
      <motion.button
        className="music-control"
        onClick={toggleMusic}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          scale: [1, 1.15, 1],
          boxShadow: [
            '0 0 40px rgba(255, 215, 0, 1), 0 0 80px rgba(255, 107, 53, 0.6)',
            '0 0 80px rgba(255, 215, 0, 1), 0 0 160px rgba(255, 107, 53, 1)',
            '0 0 40px rgba(255, 215, 0, 1), 0 0 80px rgba(255, 107, 53, 0.6)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </motion.button>

      <audio ref={audioRef} loop>
        <source src="/audio/mahamantra.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
};

export default MusicControl;
