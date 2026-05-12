import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const AudioToggle = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <motion.button
      className="fixed bottom-24 right-4 md:bottom-32 md:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg border-2 border-white/40 flex items-center justify-center text-white font-bold text-xl"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setSoundEnabled(!soundEnabled)}
    >
      <span>{soundEnabled ? '🔊' : '🔇'}</span>
    </motion.button>
  );
};
