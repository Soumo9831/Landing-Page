import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '/robot.png'; // Ensure robot.png is in the public folder

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const linkVariants = {
    rest: { scale: 1, color: '#ffffff' },
    hover: {
      scale: 1.1,
      color: '#a3e635',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    tap: { scale: 0.95 },
  };

  const logoVariants = {
    rest: { scale: 1, rotate: 0, boxShadow: '0 0 0 rgba(163, 230, 53, 0)' },
    hover: {
      scale: 1.2,
      rotate: 10,
      boxShadow: '0 0 20px rgba(163, 230, 53, 0.7)',
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const brandVariants = {
    hidden: { width: 0 },
    visible: {
      width: 'auto',
      transition: { duration: 1.5, ease: 'easeInOut' },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="w-full h-[80px] px-4 md:px-10 flex items-center justify-between bg-[rgba(15,23,42,0.8)] border-b-2 border-transparent backdrop-blur-md shadow-lg z-50 relative overflow-hidden"
      style={{ animation: 'pulseBorder 3s infinite ease-in-out' }}
    >
      {/* Sparkle Particles */}
      <style>{`
        @keyframes pulseBorder {
          0%, 100% { border-color: rgba(163, 230, 53, 0.3); }
          50% { border-color: rgba(34, 211, 238, 0.7); }
        }
        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.5); }
        }
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes blink {
          0%, 100% { border-color: transparent }
          50% { border-color: #a3e635 }
        }
        .sparkle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, rgba(163, 230, 53, 0.7), transparent);
          border-radius: 50%;
          animation: sparkle 1s ease-out infinite;
        }
        .sparkle:nth-child(1) { top: 10%; left: 5%; animation-delay: 0s; }
        .sparkle:nth-child(2) { top: 20%; left: 95%; animation-delay: 0.3s; }
        .sparkle:nth-child(3) { top: 80%; left: 10%; animation-delay: 0.6s; }
        .sparkle:nth-child(4) { top: 90%; left: 90%; animation-delay: 0.9s; }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background: linear-gradient(45deg, #a3e635, #22d3ee);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link {
          position: relative;
          text-decoration: none;
        }
        .hamburger div {
          width: 25px;
          height: 3px;
          background: linear-gradient(45deg, #a3e635, #22d3ee);
          margin: 5px 0;
          transition: all 0.3s ease;
        }
        .hamburger.open div:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }
        .hamburger.open div:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open div:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }
        @media (max-width: 768px) {
          .nav-links {
            display: ${isMenuOpen ? 'flex' : 'none'};
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(12px);
            padding: 1rem;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
            z-index: 100;
          }
          .nav-link {
            padding: 12px 0;
            font-size: 1.2rem;
            text-align: center;
          }
          .brand-text {
            font-size: 1.5rem;
          }
        }
        @media (max-width: 480px) {
          .nav-link {
            font-size: 1rem;
          }
          .brand-text {
            font-size: 1.2rem;
          }
          .logo {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>

      {/* Left: Logo + Brand Name */}
      <div className="flex items-center relative">
        <motion.img
          src={logo}
          alt="Thrillia"
          style={{ width: '70px', height: '70px', objectFit: 'contain', marginRight: '12px' }}
          variants={logoVariants}
          initial="rest"
          whileHover="hover"
          className="logo relative z-10"
        />
        <motion.span
          className="text-2xl font-bold tracking-wide font-[Inter,sans-serif] overflow-hidden whitespace-nowrap brand-text"
          style={{
            background: 'linear-gradient(45deg, #a3e635, #22d3ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            borderRight: '3px solid #a3e635',
            animation: 'typing 2s steps(8, end), blink 0.8s step-end infinite',
          }}
          variants={brandVariants}
          initial="hidden"
          animate="visible"
        >
          Project-Saarthi
        </motion.span>
        <div className="sparkle" style={{ top: '10%', left: '10%' }}></div>
        <div className="sparkle" style={{ top: '80%', left: '20%' }}></div>
      </div>

      {/* Right: Navigation Links */}
      <div className="hidden md:flex items-center text-base font-medium nav-links relative">
        {['Home', 'About Us', 'Contact'].map((link, index) => (
          <motion.a
            key={index}
            href="#"
            className="nav-link mx-4 transition"
            variants={linkVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
            }}
            style={{
              color: '#ffffff',
              padding: '8px 12px',
              textDecoration: 'none',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {link}
            <div className="sparkle" style={{ top: '15%', left: '85%' }}></div>
          </motion.a>
        ))}
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex items-center">
        <div
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="nav-links"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {['Home', 'About Us', 'Contact'].map((link, index) => (
            <motion.a
              key={index}
              href="#"
              className="nav-link py-2 transition"
              variants={linkVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={() => setIsMenuOpen(false)}
              style={{
                color: '#ffffff',
                padding: '8px 12px',
                textDecoration: 'none',
                display: 'block',
                textAlign: 'center',
              }}
            >
              {link}
            </motion.a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;