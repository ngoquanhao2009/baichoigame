import React from 'react';
import { motion } from 'framer-motion';
import Confetti from './Confetti';
import CoinBurst from './CoinBurst';
import { useNavigate } from 'react-router-dom';

export const ResultModal = ({ winner, coins, xp }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" />
      <motion.div initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }} className="relative bg-gray-900 rounded-3xl p-6 z-10 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-2">Người thắng: {winner.name}</h2>
        <p className="text-white/80 mb-4">Nhận: <strong className="text-yellow-300">{coins} coins</strong> • XP +{xp}</p>
        <div className="flex gap-3">
          <button onClick={() => navigate('/game')} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-700 text-white font-bold">Quay Lobby</button>
          <button onClick={() => navigate('/game/play/demo')} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold">Chơi lại</button>
        </div>
      </motion.div>
      <Confetti />
      <CoinBurst />
    </div>
  );
};

export default ResultModal;
