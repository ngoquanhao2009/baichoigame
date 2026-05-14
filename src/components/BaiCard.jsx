import React from 'react';
import { motion } from 'framer-motion';

export const BaiCard = ({ card, onClick, disabled }) => {
  return (
    <motion.button
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => !disabled && onClick && onClick(card.id ? card.id : card)}
      className={`relative min-w-[92px] w-24 bg-gradient-to-br from-white/6 to-white/3 border border-white/12 rounded-2xl px-3 py-4 text-center transition-shadow overflow-hidden ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl'}`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="card-shine" />
      </div>

      <div className="text-2xl font-extrabold text-white drop-shadow-sm select-none">{card.v}</div>
      <div className="text-xs text-white/80 mt-1 select-none">{card.s}</div>

      <div className="absolute -left-8 -top-10 w-32 h-32 rounded-full opacity-5 bg-gradient-to-r from-yellow-400 to-pink-500 blur-2xl pointer-events-none" />
    </motion.button>
  );
};

export default BaiCard;
