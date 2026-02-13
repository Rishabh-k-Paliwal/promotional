import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import WelcomePage from './components/WelcomePage';
import Hero from './components/Hero';
import EventSection from './components/EventSection';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  
  const eventDate = "3 मार्च 2026";
  const eventDay = "मंगलवार";

  const handleScrollDown = () => {
    setShowWelcome(false);
    // Re-enable scrolling and reset to top
    setTimeout(() => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 100);
  };

  const events = [
    {
      id: 1,
      number: '01',
      title: 'श्री कृष्ण अभिषेक',
      description: 'भगवान श्री कृष्ण का पवित्र पंचामृत से दिव्य अभिषेक',
      time: '09:00 AM - 9:30 AM',
      image: '/images/event1.jpg',
      color: '#ff6b35'
    },
    {
      id: 2,
      number: '02',
      title: 'कीर्तन',
      description: 'हरे कृष्ण महामंत्र का मधुर और भक्तिमय सामूहिक कीर्तन',
      time: '9:30 AM - 10:00 AM',
      image: '/images/event2.jpg',
      color: '#f7931e'
    },
    {
      id: 3,
      number: '03',
      title: 'श्री कृष्ण और उनके भक्तों की कथा',
      description: 'भगवान कृष्ण की दिव्य लीलाओं और भक्तों की अद्भुत कथाएं',
      time: '10:00 AM - 10:45 AM',
      image: '/images/event3.jpg',
      color: '#ffd700'
    },
    {
      id: 4,
      number: '04',
      title: 'पुष्प होली',
      description: 'सुगंधित फूलों से खेली जाने वाली पवित्र और रंगीन होली',
      time: '10:45 AM - 11:00 AM',
      image: '/images/event4.jpg',
      color: '#ff69b4'
    },
    {
      id: 5,
      number: '05',
      title: 'आनंद का नृत्य',
      description: 'भक्ति रस में डूबकर किया जाने वाला दिव्य नृत्य और उत्सव',
      time: '10:45 PM - 11:30 PM',
      image: '/images/event5.jpg',
      color: '#da70d6'
    },
    {
      id: 6,
      number: '06',
      title: 'श्री कृष्ण प्रसादम',
      description: 'भगवान को अर्पित किया गया पवित्र और स्वादिष्ट महाप्रसाद',
      time: '12:00 PM',
      image: '/images/event6.jpg',
      color: '#ff6347'
    }
  ];

  return (
    <div className="App">
      <AnimatePresence>
        {showWelcome && <WelcomePage onScrollDown={handleScrollDown} />}
      </AnimatePresence>
      <Hero eventDate={eventDate} eventDay={eventDay} />
      {events.map((event, index) => (
        <EventSection 
          key={event.id} 
          event={event} 
          index={index}
          onVisible={() => setCurrentSection(index + 1)}
        />
      ))}
    </div>
  );
}

export default App;
