import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [isRoadmapVisible, setIsRoadmapVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [formStatus, setFormStatus] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState([false, false, false, false]);
  const roadmapRef = useRef(null);

  useEffect(() => {
    const scriptId = "dotlottie-player-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
      script.type = "module";
      script.id = scriptId;
      document.body.appendChild(script);
    }
    if (window.customElements && !window.customElements.get('dotlottie-player')) {
      customElements.whenDefined('dotlottie-player').then(() => {});
    }
  }, []);

  useEffect(() => {
    if (isRoadmapVisible && roadmapRef.current) {
      roadmapRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isRoadmapVisible]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScroll > 0 ? scrollPosition / maxScroll : 0;
      const hue = 220 + scrollFraction * 80;
      document.body.style.background = `linear-gradient(135deg, hsl(${hue}, 50%, 20%), #1a1a1a, hsl(${hue + 20}, 40%, 15%)`;
    };

    const handleMouseMove = (e) => {
      const trail = document.createElement('div');
      trail.className = 'mouse-trail';
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;
      document.body.appendChild(trail);
      setTimeout(() => trail.remove(), 500);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isModalOpen) {
          setIsModalOpen(false);
          setFormStatus(null);
          setName('');
          setMobileNumber('');
        }
        setIsPopupOpen([false, false, false, false]);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.background = '';
    };
  }, [isModalOpen]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !mobileNumber.trim()) {
      setFormStatus('error');
      return;
    }
    console.log('Form Submitted:', { name, mobileNumber });
    setFormStatus('success');
    setName('');
    setMobileNumber('');
    setTimeout(() => {
      setIsModalOpen(false);
      setFormStatus(null);
    }, 2000);
  };

  const togglePopup = (index) => {
    const newPopupState = [false, false, false, false];
    newPopupState[index] = !isPopupOpen[index];
    setIsPopupOpen(newPopupState);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', type: 'spring', stiffness: 100 } },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 10 } },
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    rest: { scale: 1, rotate: 0, boxShadow: '0 8px 30px rgba(78, 125, 20, 0.5)' },
    hover: {
      scale: 1.15,
      rotate: 2,
      boxShadow: '0 12px 40px rgba(14, 165, 233, 0.5)',
      background: 'linear-gradient(45deg, #4c1d95, #0ea5e9, #1a1a1a)',
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    tap: { scale: 0.9, rotate: -2 },
  };

  const getStartedButtonVariants = {
    rest: { scale: 1, rotate: 0, boxShadow: '0 8px 30px rgba(78, 125, 20, 0.5)' },
    hover: {
      scale: 1.15,
      rotate: 2,
      boxShadow: '0 12px 40px rgba(14, 165, 233, 0.5)',
      background: 'linear-gradient(45deg, #4c1d95, #0ea5e9, #1a1a1a)',
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    tap: { scale: 0.9, rotate: -2 },
  };

  const roadmapVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, rotate: -5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  const roadmapItemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut', type: 'spring', stiffness: 100 },
    },
  };

  const lottieVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const gradientTextStyle = {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: '600',
    display: 'inline-block',
    transition: 'all 0.4s ease',
  };

  const headlineTextStyle = {
    background: 'linear-gradient(45deg, #e0e7ff, #84cc16, #0ea5e9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 8px rgba(14, 165, 233, 0.5)',
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '2rem',
    display: 'inline-block',
    width: '100%',
    animation: 'neonGlow 2s infinite ease-in-out',
    transition: 'letter-spacing 0.3s ease',
  };

  const sampleProjectsTextStyle = {
    background: 'linear-gradient(45deg, #e0e7ff, #84cc16, #0ea5e9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 8px rgba(14, 165, 233, 0.5)',
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '2rem',
    display: 'inline-block',
    width: '100%',
    animation: 'neonGlow 2s infinite ease-in-out',
    transition: 'letter-spacing 0.3s ease',
  };

  const glassBoxStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(26, 26, 26, 0.2))',
    borderRadius: '20px',
    padding: '2.5rem',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.6)',
    minWidth: '300px',
    maxWidth: '600px',
    margin: '1rem auto',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, border 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1rem',
  };

  const popupStyle = {
    background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.8), rgba(42, 42, 58, 0.7))',
    borderRadius: '16px',
    padding: '1.5rem',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(14, 165, 233, 0.3)',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.7)',
    width: '400px',
    maxWidth: '90vw',
    height: '200px',
    position: 'relative',
    color: '#e0e7ff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    zIndex: 1001,
  };

  const sampleProjectsContainerStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(26, 26, 26, 0.2))',
    borderRadius: '20px',
    padding: '2rem',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
    maxWidth: '1400px',
    margin: '2rem auto 0',
    position: 'relative',
    overflow: 'hidden',
  };

  const roadmapSectionStyle = {
    background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.8), rgba(42, 42, 58, 0.7))',
    borderRadius: '12px',
    padding: '1.5rem',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.6)',
    width: '450px',
    height: '450px',
    maxWidth: '450px',
    margin: '0 auto',
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: '500',
    textAlign: 'left',
    position: 'relative',
    zIndex: 1,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const roadmapItemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    fontSize: '1rem',
    fontWeight: '500',
    padding: '0.8rem',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#ffffff',
    transition: 'transform 0.3s ease, background 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  };

  const roadmapIconStyle = {
    fontSize: '1.6rem',
    marginRight: '0.8rem',
    color: '#84cc16',
    transition: 'transform 0.3s ease',
  };

  const getStartedButtonStyle = {
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#ffffff',
    background: 'linear-gradient(45deg, #4c1d95, #0ea5e9, #1a1a1a)',
    border: 'none',
    borderRadius: '12px',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    boxShadow: '0 0 20px rgba(78, 125, 20, 0.5)',
    transition: 'box-shadow 0.3s ease',
  };

  const modalStyle = {
    background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.8), rgba(42, 42, 58, 0.7))',
    borderRadius: '16px',
    padding: '2rem',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 12px 50px rgba(0, 0, 0, 0.7)',
    width: '400px',
    height: '350px',
    maxWidth: '90vw',
    position: 'relative',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };

  const inputStyle = {
    background: '#1a1a1a',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '0.8rem',
    fontSize: '1rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'transparent',
    border: 'none',
    color: '#e0e7ff',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '50%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const sampleImageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const sampleCardStyle = {
    background: '#1a1a1a',
    borderRadius: '16px',
    padding: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    minWidth: '300px',
    flexShrink: 0,
  };

  const sampleCaptionStyle = {
    color: '#e0e7ff',
    fontSize: '1.1rem',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '0.75rem',
    transition: 'color 0.3s ease, transform 0.3s ease',
  };

  const features = [
    {
      emoji: '🚀',
      text: 'Instant Project Launch',
      description: 'Kickstart your ideas in seconds. Our AI scaffolds complete projects from a single prompt, saving you hours of setup time.',
    },
    {
      emoji: '🤖',
      text: 'AI-Guided Creation',
      description: 'Build smarter with AI assistance. Get real-time suggestions, code snippets, and design tips tailored to your project.',
    },
    {
      emoji: '🧠',
      text: 'Creative Control',
      description: 'You’re the visionary, AI’s the helper. Customize every detail with intuitive tools while AI handles the heavy lifting.',
    },
    {
      emoji: '🌐',
      text: 'Rapid Web & App Builds',
      description: 'Create stunning websites and apps fast. AI generates responsive designs and functional code, ready to deploy.',
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        minHeight: '200vh',
        background: 'linear-gradient(135deg, #1e3a8a, #1a1a1a, #4c1d95)',
        color: 'white',
        padding: '4rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowX: 'hidden',
        width: '100vw',
        maxWidth: '100%',
        scrollBehavior: 'smooth', // Enable smooth scrolling for the component
      }}
    >
      {/* Background Glow Effect with Parallax */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '120%',
          height: '120%',
          background: 'radial-gradient(circle at 30% 30%, rgba(78, 125, 20, 0.2), transparent 70%)',
          zIndex: 0,
          animation: 'pulse 8s infinite ease-in-out',
        }}
        animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />

      {/* Particle Sparkle Effect */}
      <style>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes blink {
          0%, 100% { border-color: transparent }
          50% { border-color: #84cc16 }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3 }
          50% { opacity: 0.6 }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(78, 125, 20, 0.5); }
          50% { box-shadow: 0 0 30px rgba(14, 165, 233, 0.6); }
        }
        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.5); }
        }
        @keyframes neonGlow {
          0%, 100% { text-shadow: 0 0 8px rgba(14, 165, 233, 0.5); }
          50% { text-shadow: 0 0 16px rgba(14, 165, 233, 0.7); }
        }
        @keyframes particleMove {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(var(--x), var(--y)); opacity: 0; }
        }
        .fancy-text:hover {
          transform: translateY(-3px);
          text-shadow: 0 0 12px rgba(224, 231, 255, 0.8);
          color: #ffffff;
        }
        .get-started-btn {
          position: relative;
          overflow: hidden;
        }
        .get-started-btn::after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(224, 231, 255, 0.4), transparent);
          top: var(--y);
          left: var(--x);
          transform: translate(-50%, -50%);
          transition: width 0.5s, height 0.5s;
        }
        .get-started-btn:hover::after {
          width: 200px;
          height: 200px;
        }
        .roadmap-section {
          background: linear-gradient(135deg, rgba(26, 26, 26, 0.8), rgba(42, 42, 58, 0.7));
          border-radius: 12px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
        }
        .roadmap-section:hover {
          transform: scale(1.03);
          box-shadow: 0 15px 50px rgba(78, 125, 20, 0.3);
        }
        .roadmap-item {
          position: relative;
          z-index: 1;
        }
        .roadmap-item::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(78, 125, 20, 0.3), transparent);
          transform: translate(-50%, -50%);
          transition: width 0.4s ease, height 0.4s ease;
          z-index: -1;
        }
        .roadmap-item:hover {
          transform: translateY(-2px);
          background: rgba(78, 125, 20, 0.1);
        }
        .roadmap-item:hover::after {
          width: 200px;
          height: 200px;
        }
        .roadmap-item:hover .roadmap-icon {
          transform: scale(1.2) translateY(-3px);
        }
        .roadmap-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.7), transparent);
          border-radius: 50%;
          pointer-events: none;
          animation: particleMove 1s ease-out forwards;
          z-index: 0;
        }
        .neon-heading {
          animation: neonGlow 2s infinite ease-in-out;
          letter-spacing: 1px;
          transition: letter-spacing 0.5s ease;
        }
        .neon-heading:hover {
          letter-spacing: 2px;
        }
        .lottie-container {
          position: relative;
          border-radius: 50%;
          padding: 15px;
          background: radial-gradient(circle, rgba(30, 58, 138, 0.2), transparent 70%);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .lottie-container:hover {
          transform: scale(1.1);
          box-shadow: 0 0 40px rgba(78, 125, 20, 0.5), 0 0 60px rgba(14, 165, 233, 0.4);
        }
        .lottie-sparkle {
          position: absolute;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.8), transparent);
          border-radius: 50%;
          animation: sparkle 0.6s ease-out;
          pointer-events: none;
        }
        .mouse-trail {
          position: fixed;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, rgba(78, 125, 20, 0.6), transparent);
          border-radius: 50%;
          pointer-events: none;
          animation: sparkle 0.5s ease-out forwards;
          z-index: 1000;
        }
        .sparkle {
          position: absolute;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.7), transparent);
          border-radius: 50%;
          animation: sparkle 1s ease-out infinite;
        }
        .sparkle:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
        .sparkle:nth-child(2) { top: 20%; left: 80%; animation-delay: 0.3s; }
        .sparkle:nth-child(3) { top: 70%; left: 20%; animation-delay: 0.6s; }
        .sparkle:nth-child(4) { top: 80%; left: 90%; animation-delay: 0.9s; }
        .get-started-final-btn {
          position: relative;
          overflow: hidden;
        }
        .get-started-final-btn::after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(224, 231, 255, 0.6), transparent);
          top: var(--y);
          left: var(--x);
          transform: translate(-50%, -50%);
          transition: width 0.5s, height 0.5s;
        }
        .get-started-final-btn:hover::after {
          width: 300px;
          height: 300px;
        }
        .get-started-final-btn .sparkle {
          width: 12px;
          height: 12px;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.7), transparent);
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content input:focus {
          border-color: #84cc16;
          box-shadow: 0 0 8px rgba(132, 204, 22, 0.5);
        }
        .close-button:hover {
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(14, 165, 233, 0.5);
        }
        .submit-button {
          position: relative;
          overflow: hidden;
        }
        .submit-button::after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(224, 231, 255, 0.5), transparent);
          top: var(--y);
          left: var(--x);
          transform: translate(-50%, -50%);
          transition: width 0.5s, height 0.5s;
        }
        .submit-button:hover::after {
          width: 200px;
          height: 200px;
        }
        .sample-projects-heading:hover {
          letter-spacing: 2px;
        }
        .sample-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 40px rgba(14, 165, 233, 0.4);
        }
        .sample-card:hover img {
          transform: scale(1.08);
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.6);
        }
        .sample-card:hover .sample-caption {
          color: #84cc16;
          transform: scale(1.05);
        }
        .sample-card .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(26, 26, 26, 0.5);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 12px;
          pointer-events: none;
        }
        .sample-card:hover .overlay {
          opacity: 1;
        }
        .sample-card .hover-sparkle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, rgba(132, 204, 22, 0.8), transparent);
          border-radius: 50%;
          animation: sparkle 0.8s ease-out;
          pointer-events: none;
        }
        .sample-projects-scroll {
          scroll-snap-type: x mandatory;
          scrollbar-width: thin;
          scrollbar-color: #84cc16 #1a1a1a;
        }
        .sample-projects-scroll::-webkit-scrollbar {
          height: 8px;
        }
        .sample-projects-scroll::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        .sample-projects-scroll::-webkit-scrollbar-thumb {
          background: #84cc16;
          border-radius: 4px;
        }
        .sample-card {
          scroll-snap-align: start;
        }
        .feature-item {
          cursor: pointer;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          position: relative;
          overflow: hidden;
        }
        .feature-item::after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(224, 231, 255, 0.4), transparent);
          top: var(--y);
          left: var(--x);
          transform: translate(-50%, -50%);
          transition: width 0.5s, height 0.5s;
        }
        .feature-item:hover::after {
          width: 200px;
          height: 200px;
        }
        @media (max-width: 640px) {
          .glass-box {
            padding: 2rem;
          }
          .headline-text {
            font-size: clamp(1.5rem, 3vw, 2rem);
          }
          .gradient-text {
            font-size: 1rem;
          }
          .popup-content {
            width: 85vw;
            height: 180px;
            padding: 1.2rem;
          }
          .roadmap-section {
            width: 90vw;
            height: 90vw;
            max-width: 350px;
            max-height: 350px;
            padding: 1.2rem;
            font-size: 0.95rem;
          }
          .roadmap-item {
            font-size: 0.9rem;
            padding: 0.6rem;
            margin-bottom: 0.8rem;
          }
          .roadmap-icon {
            font-size: 1.4rem;
            margin-right: 0.6rem;
          }
          .get-started-final-btn {
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
          }
          .modal-content {
            width: 85vw;
            height: auto;
            padding: 1.5rem;
          }
          .sample-projects-heading {
            font-size: clamp(1.5rem, 3vw, 2rem);
          }
          .sample-card {
            min-width: 280px;
          }
          .sample-image {
            height: 160px;
          }
          .sample-caption {
            font-size: 1rem;
          }
        }
      `}</style>

      {/* Typewriter Heading */}
      <motion.h1
        variants={itemVariants}
        className="neon-heading"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '800',
          textAlign: 'center',
          marginBottom: '1.5rem',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          borderRight: '4px solid #84cc16',
          width: 'fit-content',
          margin: '0 auto',
          animation: 'typing 3.5s steps(40, end), blink 0.8s step-end infinite',
          zIndex: 1,
        }}
      >
        Your AI-Driven Project Guide Awaits
      </motion.h1>

      {/* Main Content: Advertisement Box + Animation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Left: Advertisement Glass Box */}
        <motion.div
          variants={itemVariants}
          style={{ flex: '1', display: 'flex', justifyContent: 'center', minWidth: '300px' }}
        >
          <motion.div
            className="glass-box"
            style={glassBoxStyle}
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
            aria-label="Product Advertisement"
          >
            <h2
              className="headline-text"
              style={headlineTextStyle}
            >
              See What We Provide
            </h2>
            {features.map((item, index) => (
              <React.Fragment key={index}>
                <motion.button
                  className="feature-item"
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  style={getStartedButtonStyle}
                  onClick={() => togglePopup(index)}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
                  }}
                  aria-label={`Learn more about ${item.text}`}
                >
                  <span style={{ fontSize: '2rem', marginRight: '0.75rem', color: '#84cc16' }}>{item.emoji}</span>
                  <span className="gradient-text" style={gradientTextStyle}>
                    {item.text}
                  </span>
                </motion.button>
                {isPopupOpen[index] && (
                  <div
                    className="modal-overlay"
                    onClick={() => togglePopup(index)}
                    style={{ zIndex: 1001 }}
                  >
                    <motion.div
                      className="popup-content"
                      variants={popupVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={popupStyle}
                      onClick={(e) => e.stopPropagation()}
                      role="dialog"
                      aria-label={`Description for ${item.text}`}
                    >
                      <button
                        className="close-button"
                        style={closeButtonStyle}
                        onClick={() => togglePopup(index)}
                        aria-label="Close popup"
                      >
                        ×
                      </button>
                      <h3
                        style={{
                          fontSize: '1.3rem',
                          fontWeight: '600',
                          color: '#e0e7ff',
                          marginBottom: '1rem',
                        }}
                      >
                        {item.text}
                      </h3>
                      <p
                        style={{
                          fontSize: '1rem',
                          lineHeight: '1.5',
                          color: '#d1d5db',
                        }}
                      >
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Lottie Animation with Float */}
        <motion.div
          variants={itemVariants}
          animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          style={{ flex: '1', display: 'flex', justifyContent: 'center', minWidth: '300px' }}
        >
          <dotlottie-player
            src="https://lottie.host/bd98017f-3e41-4477-9a4d-809fe6b3214f/Z0uDCETc3P.lottie"
            background="transparent"
            speed="1"
            style={{
              width: 'clamp(300px, 45vw, 500px)',
              height: 'clamp(300px, 45vw, 500px)',
              transform: 'perspective(1000px) translateZ(0)',
              transition: 'transform 0.5s',
            }}
            loop
            autoplay
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'perspective(1000px) translateZ(50px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'perspective(1000px) translateZ(0)')}
          ></dotlottie-player>
        </motion.div>
      </div>

      {/* Centered Button */}
      <motion.div
        variants={itemVariants}
        style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '3rem 0 1rem', position: 'relative' }}
      >
        <motion.button
          className="get-started-btn"
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          onClick={() => setIsRoadmapVisible(!isRoadmapVisible)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
            e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
          }}
          style={getStartedButtonStyle}
        >
          Want a quick guide?? 🚖
        </motion.button>
      </motion.div>

      {/* Sample Projects Section */}
      <motion.div
        variants={itemVariants}
        style={{
          ...sampleProjectsContainerStyle,
          maxWidth: '100%',
          overflowX: 'auto',
          padding: '0 1rem',
        }}
      >
        <h2
          className="sample-projects-heading"
          style={sampleProjectsTextStyle}
        >
          Some of Our Sample Projects
        </h2>
        <div
          className="sample-projects-scroll"
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '2rem',
            overflowX: 'auto',
            padding: '0',
            scrollSnapType: 'x mandatory',
            width: '100%',
            scrollBehavior: 'smooth', // Enable smooth horizontal scrolling for samples
          }}
        >
          {[
            { src: '/Sample1.png', alt: 'To-do List project', caption: 'To-do List' },
            { src: '/Sample2.png', alt: 'Ticket Management System project', caption: 'Ticket Management System' },
            { src: '/Sample2.png', alt: 'Habit Tracker System project', caption: 'Habit Tracker System' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="sample-card"
              variants={itemVariants}
              style={sampleCardStyle}
              onMouseEnter={(e) => {
                const container = e.currentTarget;
                for (let i = 0; i < 3; i++) {
                  const sparkle = document.createElement('div');
                  sparkle.className = 'hover-sparkle';
                  sparkle.style.left = `${Math.random() * 100}%`;
                  sparkle.style.top = `${Math.random() * 100}%`;
                  container.querySelector('.overlay').appendChild(sparkle);
                  setTimeout(() => sparkle.remove(), 800);
                }
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="sample-image"
                  style={sampleImageStyle}
                  loading="lazy"
                />
                <div className="overlay">
                  <div className="sparkle" style={{ top: '15%', left: '15%' }}></div>
                  <div className="sparkle" style={{ top: '85%', left: '85%' }}></div>
                </div>
              </div>
              <p className="sample-caption" style={sampleCaptionStyle}>
                {item.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Roadmap Section and Lottie Animation */}
      {isRoadmapVisible && (
        <div
          className="flex flex-col lg:flex-row items-center justify-center w-full max-w-5xl mx-auto my-8 gap-6"
          onMouseMove={(e) => {
            const roadmap = roadmapRef.current;
            if (roadmap) {
              const rect = roadmap.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const particle = document.createElement('div');
              particle.className = 'roadmap-particle';
              particle.style.left = `${x}px`;
              particle.style.top = `${y}px`;
              particle.style.setProperty('--x', `${(Math.random() - 0.5) * 50}px`);
              particle.style.setProperty('--y', `${(Math.random() - 0.5) * 50}px`);
              roadmap.appendChild(particle);
              setTimeout(() => particle.remove(), 1000);
            }
          }}
          style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}
        >
          {/* Roadmap Section */}
          <motion.div
            ref={roadmapRef}
            className="roadmap-section flex-shrink-0"
            variants={roadmapVariants}
            initial="hidden"
            animate="visible"
            style={roadmapSectionStyle}
          >
            {/* Sparkle Particles */}
            <div className="sparkle" style={{ top: '10%', left: '10%' }}></div>
            <div className="sparkle" style={{ top: '20%', left: '80%' }}></div>
            <div className="sparkle" style={{ top: '70%', left: '20%' }}></div>
            <div className="sparkle" style={{ top: '80%', left: '90%' }}></div>

            <h3
              className="neon-heading"
              style={{
                fontSize: '1.6rem',
                fontWeight: '700',
                marginBottom: '1rem',
                textAlign: 'center',
                color: '#e0e7ff',
                textShadow: '0 0 8px rgba(14, 165, 233, 0.5)',
              }}
            >
              Roadmap to Your Project
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flexGrow: 1, overflowY: 'auto', scrollBehavior: 'smooth' }}>
              {[
                { text: 'Click Get Started', icon: '🚀' },
                { text: 'Select The way You wanna create the project', icon: '🛠️' },
                { text: 'Give the prompt', icon: '✍️' },
                { text: 'Just wait and see the magic...', icon: '✨' },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="roadmap-item"
                  variants={roadmapItemVariants}
                  style={roadmapItemStyle}
                >
                  <span className="roadmap-icon" style={roadmapIconStyle}>{step.icon}</span>
                  <span>{`${index + 1}. ${step.text}`}</span>
                </motion.div>
              ))}
            </div>
            {/* Get Started Button */}
            <motion.div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <motion.button
                className="get-started-final-btn"
                variants={getStartedButtonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={() => setIsModalOpen(true)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
                }}
                style={getStartedButtonStyle}
              >
                <div className="sparkle" style={{ top: '15%', left: '15%' }}></div>
                <div className="sparkle" style={{ top: '85%', left: '85%' }}></div>
                <div className="sparkle" style={{ top: '20%', left: '80%' }}></div>
                Get Started 🌟
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Lottie Animation */}
          <motion.div
            variants={lottieVariants}
            initial="hidden"
            animate={{ opacity: 1, scale: 1, rotate: [0, 5, 0], y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="lottie-container flex-shrink-0 w-full lg:w-auto flex justify-center items-center"
            onMouseEnter={(e) => {
              const container = e.currentTarget;
              for (let i = 0; i < 5; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'lottie-sparkle';
                sparkle.style.left = `${Math.random() * 100}%`;
                sparkle.style.top = `${Math.random() * 100}%`;
                container.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 600);
              }
            }}
            style={{ maxWidth: '300px' }}
          >
            <dotlottie-player
              src="https://lottie.host/0947a2eb-e3ef-41c1-95e3-4285fd9785b9/D4X6UajOfc.lottie"
              background="transparent"
              speed="1"
              style={{ width: '300px', height: '200px' }}
              loop
              autoplay
            ></dotlottie-player>
          </motion.div>
        </div>
      )}

      {/* Early Access Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <motion.div
            className="modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={modalStyle}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Sign Up for Early Access"
          >
            <button
              className="close-button"
              style={closeButtonStyle}
              onClick={() => {
                setIsModalOpen(false);
                setFormStatus(null);
                setName('');
                setMobileNumber('');
              }}
              aria-label="Close modal"
            >
              ×
            </button>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                textAlign: 'center',
                color: '#e0e7ff',
                marginBottom: '1rem',
              }}
            >
              Sign Up for Early Access (Beta Users)
            </h2>
            {formStatus === 'success' ? (
              <p style={{ textAlign: 'center', color: '#84cc16', fontSize: '1.1rem' }}>
                Thank you! We'll contact you soon.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
                <div>
                  <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: '#e0e7ff' }}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    style={inputStyle}
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="mobile" style={{ display: 'block', marginBottom: '0.5rem', color: '#e0e7ff' }}>
                    Mobile Number
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                    style={inputStyle}
                    aria-required="true"
                  />
                </div>
                {formStatus === 'error' && (
                  <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>
                    Please fill in all fields.
                  </p>
                )}
                <motion.button
                  className="submit-button"
                  variants={getStartedButtonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleFormSubmit}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
                  }}
                  style={getStartedButtonStyle}
                >
                  Submit
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Extra Space for Scrolling */}
      <motion.div style={{ height: '50vh' }}></motion.div>
    </motion.div>
  );
};

export default Home;