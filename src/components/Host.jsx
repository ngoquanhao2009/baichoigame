import React from 'react';
import { motion } from 'framer-motion';

export const Host = ({ phrase }) => {
  return (
    <div className="flex items-center gap-4 justify-center">
      <motion.div
        className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl shadow-2xl"
        animate={{ rotate: [0, 6, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        👴
      </motion.div>
      <div className="text-center">
        <div className="text-white font-bold">Ông Hô</div>
        <div className="text-sm text-white/70">{phrase || '...'}</div>
      </div>
    </div>
  );
};

export default Host;
