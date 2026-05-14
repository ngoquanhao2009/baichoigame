import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const CreateRoomModal = ({ onClose, onCreate }) => {
  const [roomName, setRoomName] = useState('Phòng của tôi');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [bet, setBet] = useState(5000);
  const [isPublic, setIsPublic] = useState(true);

  const handleCreate = () => {
    onCreate({
      name: roomName,
      maxPlayers,
      bet,
      isPublic,
    });
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-900 rounded-3xl p-8 border border-white/20 max-w-md w-full mx-4"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-white font-bold text-2xl mb-6">Tạo Phòng Mới</h2>

        <div className="space-y-4">
          {/* Room name */}
          <div>
            <label className="text-white/80 text-sm font-semibold mb-2 block">
              Tên Phòng
            </label>
            <input
              type="text"
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
              className="w-full bg-gray-800 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-white/40 outline-none transition-colors"
              placeholder="Nhập tên phòng"
            />
          </div>

          {/* Max players */}
          <div>
            <label className="text-white/80 text-sm font-semibold mb-2 block">
              Số Người Chơi: {maxPlayers}
            </label>
            <input
              type="range"
              min="2"
              max="6"
              value={maxPlayers}
              onChange={e => setMaxPlayers(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Bet amount */}
          <div>
            <label className="text-white/80 text-sm font-semibold mb-2 block">
              Cược (Coin): {bet.toLocaleString()}
            </label>
            <select
              value={bet}
              onChange={e => setBet(parseInt(e.target.value))}
              className="w-full bg-gray-800 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-white/40 outline-none transition-colors"
            >
              <option value={1000}>1,000</option>
              <option value={5000}>5,000</option>
              <option value={10000}>10,000</option>
              <option value={50000}>50,000</option>
            </select>
          </div>

          {/* Public/Private */}
          <div className="flex items-center justify-between">
            <label className="text-white/80 text-sm font-semibold">
              Công Khai
            </label>
            <motion.button
              onClick={() => setIsPublic(!isPublic)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isPublic ? 'bg-green-500' : 'bg-gray-600'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute w-5 h-5 bg-white rounded-full top-0.5"
                animate={{ left: isPublic ? '6px' : '28px' }}
                transition={{ type: 'spring', stiffness: 500 }}
              />
            </motion.button>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <motion.button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hủy
          </motion.button>

          <motion.button
            onClick={handleCreate}
            className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tạo
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
