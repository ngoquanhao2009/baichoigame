import React from 'react';
import { motion } from 'framer-motion';

export const CoinBurst = ({ count = 12 }) => {
  const coins = Array.from({ length: count }).map((_,i)=>i);
  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {coins.map(i=> (
        <motion.div key={i} initial={{ y: 0, opacity: 1 }} animate={{ y: -200, x: (Math.random()-0.5)*200, opacity: 0 }} transition={{ duration: 1, delay: i*0.03 }} className="absolute bottom-24 left-1/2">
          <div className="w-6 h-6 rounded-full bg-yellow-300 border border-yellow-400 flex items-center justify-center text-xs">💰</div>
        </motion.div>
      ))}
    </div>
  );
};

export default CoinBurst;
