import React from 'react';
import { motion } from 'framer-motion';

export const MenuCard = ({ icon, title, description, color, gradient, delay = 0, path = '#', external = false, image }) => {
  const playClickSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const now = audioContext.currentTime;
      
      // Create a musical beep
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
      osc.type = 'sine';
      
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {
      // Silently fail
    }
  };

  const handleClick = () => {
    playClickSound();
    if (path && path !== '#') {
      if (external) {
        window.open(path, '_blank');
      } else {
        // For internal routes, can implement routing here
        window.location.href = path;
      }
    }
  };

  return (
    <motion.button
      className={`relative h-40 md:h-56 rounded-3xl overflow-hidden cursor-pointer transform transition-all group`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      onTap={handleClick}
    >
      {/* 3D shadow effect */}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-black/50 via-transparent to-black/50 blur-2xl -z-10 rounded-3xl"
        animate={{
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Background gradient or image */}
      <div 
        className={`absolute inset-0 ${!image ? gradient : ''} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}
        style={image ? { backgroundImage: `url('${image}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      />

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
        }}
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Color overlay */}
      <div className={`absolute inset-0 ${color} mix-blend-multiply opacity-20 group-hover:opacity-10`} />

      {/* Inner border glow */}
      <motion.div 
        className="absolute inset-0 rounded-3xl border-2 border-white/40 group-hover:border-white/80 transition-colors duration-300"
        animate={{
          boxShadow: [
            'inset 0 0 20px rgba(255, 255, 255, 0.1)',
            'inset 0 0 40px rgba(255, 255, 255, 0.2)',
            'inset 0 0 20px rgba(255, 255, 255, 0.1)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 md:px-6 z-10">
        {/* Icon with floating animation */}
        <motion.div
          className="text-5xl md:text-7xl mb-3 md:mb-4 drop-shadow-lg"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-white font-bold text-2xl md:text-4xl mb-1 md:mb-2 text-center drop-shadow-lg">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-white/90 text-xs md:text-sm text-center drop-shadow-md font-medium">
            {description}
          </p>
        )}
      </div>

      {/* Glow pulse on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{
          opacity: [0, 0.5, 0],
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.button>
  );
};
