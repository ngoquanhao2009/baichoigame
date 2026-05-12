import React from 'react';
import { motion } from 'framer-motion';

export const BottomBar = () => {
  const playHoverSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const now = audioContext.currentTime;
      
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.setValueAtTime(550, now);
      osc.frequency.exponentialRampToValueAtTime(650, now + 0.1);
      osc.type = 'sine';
      
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {
      // Silently fail
    }
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 md:px-6 md:py-4"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Glassmorphism background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-white/15 via-white/10 to-white/15 backdrop-blur-xl border-t border-white/30 rounded-t-3xl"
        animate={{
          opacity: [0.8, 0.9, 0.8],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - Profile Button */}
        <motion.button
          className="flex items-center gap-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-white shadow-lg border-2 border-white/40 transition-shadow"
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)',
          }}
          whileTap={{ scale: 0.92 }}
          onHoverStart={playHoverSound}
        >
          <motion.span 
            className="text-lg md:text-xl"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            👤
          </motion.span>
          <span className="hidden sm:inline">Hồ Sơ</span>
        </motion.button>

        {/* Center - Stats */}
        <motion.div 
          className="hidden md:flex items-center gap-6 text-white font-bold text-sm drop-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full border border-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="text-2xl"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ⭐
            </motion.span>
            <span>Sao: 245</span>
          </motion.div>
          <div className="w-px h-6 bg-white/40" />
          <motion.div 
            className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full border border-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="text-2xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏆
            </motion.span>
            <span>Top: #42</span>
          </motion.div>
        </motion.div>

        {/* Right - Rewards Button */}
        <motion.button
          className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 hover:from-yellow-500 hover:via-yellow-600 hover:to-orange-500 px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-yellow-900 shadow-lg border-2 border-white/40 transition-shadow"
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 30px rgba(251, 191, 36, 0.8)',
          }}
          whileTap={{ scale: 0.92 }}
          onHoverStart={playHoverSound}
        >
          <motion.span 
            className="text-lg md:text-xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🎁
          </motion.span>
          <span className="hidden sm:inline">Quà Tặng</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
