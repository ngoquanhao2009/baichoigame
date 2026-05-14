import React from 'react';
import { motion } from 'framer-motion';

export const Confetti = ({ count = 24 }) => {
  const pieces = Array.from({ length: count }).map((_, i) => ({ id: i, left: Math.random() * 100 }));
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -50, opacity: 1 }}
          animate={{ y: [ -50, 600 ], rotate: Math.random() * 360 }}
          transition={{ duration: 1.4 + Math.random(), ease: 'easeOut' }}
          style={{ left: `${p.left}%` }}
          className="absolute w-2 h-4 bg-yellow-300"
        />
      ))}
    </div>
  );
};

export default Confetti;
