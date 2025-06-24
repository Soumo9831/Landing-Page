import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const linkVariants = {
    rest: { scale: 1, color: '#ffffff' },
    hover: {
      scale: 1.1,
      color: '#a3e635',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full px-10 py-4 flex flex-col items-center justify-center bg-[rgba(15,23,42,0.8)] border-t-2 border-transparent backdrop-blur-md shadow-lg z-50 relative overflow-hidden"
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
        .sparkle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, rgba(163, 230, 53, 0.7), transparent);
          border-radius: 50%;
          animation: sparkle 1s ease-out infinite;
        }
        .sparkle:nth-child(1) { top: 10%; left: 5%; animation-delay: 0s; }
        .sparkle:nth-child(2) { top: 20%; left: 95%; animation-delay: 0.3s; }
        .sparkle:nth-child(3) { top: 80%; left: 10%; animation-delay: 0.6s; }
        .sparkle:nth-child(4) { top: 90%; left: 90%; animation-delay: 0.9s; }
        .footer-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background: linear-gradient(45deg, #a3e635, #22d3ee);
          transition: width 0.3s ease;
        }
        .footer-link:hover::after {
          width: 100%;
        }
        .footer-link {
          position: relative;
          text-decoration: none;
          margin: 0 10px;
        }
      `}</style>

      <div className="flex items-center mb-2 relative">
        <motion.a
          href="https://www.linkedin.com/company/dkafka/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link text-base font-medium transition"
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
            padding: '4px 8px',
            textDecoration: 'none',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          LinkedIn
        </motion.a>
        <motion.p
          className="footer-link text-base font-medium transition"
          variants={linkVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          style={{
            color: '#ffffff',
            padding: '4px 8px',
            textDecoration: 'none',
            margin: '0',
          }}
        >
          Contact: 9920792384
        </motion.p>
        <div className="sparkle" style={{ top: '10%', left: '10%' }}></div>
        <div className="sparkle" style={{ top: '80%', left: '20%' }}></div>
      </div>
      <motion.p
        className="text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          color: '#a3e635',
          background: 'linear-gradient(45deg, #a3e635, #22d3ee)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
        }}
      >
        © 2025 Project-Saarthi. All rights reserved.
      </motion.p>
    </motion.footer>
  );
};

export default Footer;