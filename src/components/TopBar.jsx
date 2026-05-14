import React from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../hooks/useSound';

export const TopBar = () => {
  const { playHoverSound } = useSound();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-40 px-4 py-3 md:px-6 md:py-4 overflow-hidden"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Premium glassmorphism shell */}
      <motion.div
        className="absolute inset-0 rounded-b-3xl bg-white/6 backdrop-blur-3xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        animate={{ opacity: 0.98 }}
      />

      {/* Soft reflected light sweep */}
      <motion.div
        className="absolute -top-8 -left-1/3 h-24 w-2/3 rounded-full bg-gradient-to-r from-white/0 via-white/35 to-white/0 blur-xl pointer-events-none"
        animate={{ x: ['-30%', '140%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Inner sheen for frosted-glass depth */}
      <div className="absolute inset-x-6 top-1 h-px bg-white/50 rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto flex items-center justify-between">
        {/* Left section - Avatar and Level */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Avatar */}
          <motion.div
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-3 border-white/50 shadow-lg flex items-center justify-center cursor-pointer hover:shadow-glow transition-shadow"
            whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(147, 112, 219, 0.8)' }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={playHoverSound}
          >
            <span className="text-white text-lg md:text-xl font-bold">👤</span>
          </motion.div>

          {/* Level and XP Bar */}
          <div className="hidden sm:block">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-bold text-sm md:text-base drop-shadow">Lv. 12</span>
              <motion.span 
                className="px-2 py-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400 text-yellow-900 text-xs font-bold rounded-full shadow-md"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                +250 XP
              </motion.span>
            </div>
            <div className="w-24 md:w-32 h-3 bg-white/20 rounded-full border-2 border-white/40 overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 rounded-full shadow-lg"
                style={{ width: '65%' }}
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Center - Coin and Points */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Coins */}
          <motion.div
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-400/30 to-yellow-300/20 px-3 md:px-4 py-2 rounded-full border-2 border-yellow-400/50 cursor-pointer shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.08 }}
            onHoverStart={playHoverSound}
          >
            <motion.span 
              className="text-xl md:text-2xl"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              💰
            </motion.span>
            <span className="text-yellow-100 font-bold text-sm md:text-base drop-shadow">2,815</span>
            <motion.button
              className="ml-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-yellow-900 font-bold rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs md:text-sm shadow-md"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.85 }}
              onHoverStart={playHoverSound}
            >
              +
            </motion.button>
          </motion.div>
        </div>

        {/* Right section - Menu icons */}
        <div className="flex items-center gap-2 md:gap-3">
          {[
            { icon: '💬', label: 'Chat', color: 'from-blue-500 to-cyan-500' },
            { icon: '👥', label: 'Bạn bè', color: 'from-green-500 to-emerald-500' },
            { icon: '🎁', label: 'Quà', color: 'from-pink-500 to-rose-500' },
            { icon: '☰', label: 'Menu', color: 'from-purple-500 to-indigo-500' },
          ].map((item, idx) => (
            <motion.button
              key={idx}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${item.color} shadow-lg text-white flex items-center justify-center text-lg md:text-xl border-2 border-white/40 font-semibold`}
              whileHover={{
                scale: 1.2,
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.8)',
              }}
              whileTap={{ scale: 0.9 }}
              onHoverStart={playHoverSound}
            >
              {item.icon}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Level badge on small screens */}
      <div className="sm:hidden relative mt-2 text-center">
        <motion.span 
          className="text-white/80 text-xs drop-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Lv. 12 • XP: 2,500/5,000
        </motion.span>
      </div>
    </motion.div>
  );
};
