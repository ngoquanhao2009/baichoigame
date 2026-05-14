import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const GameTransition = ({ isActive, onComplete }) => {
  const [stage, setStage] = useState('zoom');

  useEffect(() => {
    if (!isActive) return;

    const zoomTimer = setTimeout(() => {
      setStage('fade');
    }, 400);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 800);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(completeTimer);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Zoom card effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 rounded-3xl"
        initial={{ scale: 0.3, opacity: 1 }}
        animate={{ scale: stage === 'zoom' ? 1.2 : 2 }}
        transition={{ duration: stage === 'zoom' ? 0.4 : 0.4 }}
      />

      {/* Fade to black */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 'fade' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Loading indicator */}
      <motion.div
        className="relative z-10 text-center"
        animate={{ opacity: stage === 'zoom' ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        >
          🎮
        </motion.div>
        <p className="text-white font-bold text-lg">Vào Sân Bài...</p>
      </motion.div>
    </motion.div>
  );
};
