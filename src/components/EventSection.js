import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import './EventSection.css';

const EventSection = ({ event, index, onVisible }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false
  });

  const contentRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    if (inView) {
      onVisible();
      
      // GSAP Timeline for complex animations
      const tl = gsap.timeline();
      
      tl.fromTo(contentRef.current,
        { 
          scale: 0.5, 
          opacity: 0 
        },
        { 
          scale: 1, 
          opacity: 1,
          duration: 1.2,
          ease: 'back.out(1.4)'
        }
      );

      // Number pulse
      gsap.to(numberRef.current, {
        scale: 1.2,
        opacity: 0.9,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }
  }, [inView, onVisible]);

  const getAnimationVariant = () => {
    return {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { 
        scale: 1, 
        opacity: 1,
        transition: { 
          type: 'spring', 
          stiffness: 100, 
          damping: 20,
          duration: 1 
        }
      }
    };
  };

  return (
    <section 
      ref={ref} 
      className={`event-section event-${event.id}`}
      style={{ 
        backgroundImage: `url(${event.image})`
      }}
    >
      
      <motion.div 
        ref={contentRef}
        className="event-content"
        variants={getAnimationVariant()}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >

        
        <motion.div 
          ref={numberRef}
          className="event-number"
          style={{ color: event.color }}
        >
          {event.number}
        </motion.div>
        
        <motion.h2 
          className="event-title"
          animate={inView ? {
            textShadow: [
              `0 0 20px ${event.color}, 0 0 40px ${event.color}`,
              `0 0 40px ${event.color}, 0 0 80px ${event.color}`,
              `0 0 20px ${event.color}, 0 0 40px ${event.color}`
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {event.title}
        </motion.h2>
        
        <motion.p 
          className="event-description"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {event.description}
        </motion.p>

        <motion.div 
          className="event-details"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <div className="detail-item">
            <span className="detail-label">समय:</span>
            <span className="detail-value">{event.time}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Lotus Petals Rain for all events */}
      {inView && (
        <>
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="lotus-petal-event"
              style={{
                left: `${Math.random() * 100}%`,
              }}
              initial={{ y: -100, opacity: 0, rotate: 0 }}
              animate={{ 
                y: window.innerHeight + 100, 
                opacity: [0, 0.8, 0.8, 0],
                rotate: 360,
                x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25, 0]
              }}
              transition={{ 
                duration: Math.random() * 6 + 10, 
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear'
              }}
            />
          ))}
        </>
      )}
    </section>
  );
};

export default EventSection;
