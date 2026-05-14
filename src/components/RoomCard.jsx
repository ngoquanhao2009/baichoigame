import React from 'react';
import { motion } from 'framer-motion';

export const RoomCard = ({ room, onJoin, delay = 0 }) => {
  const getStatusColor = () => {
    switch (room.status) {
      case 'playing':
        return 'from-red-500/30 to-red-600/20';
      case 'waiting':
        return 'from-yellow-500/30 to-yellow-600/20';
      case 'full':
        return 'from-gray-500/30 to-gray-600/20';
      default:
        return 'from-blue-500/30 to-blue-600/20';
    }
  };

  const getStatusLabel = () => {
    switch (room.status) {
      case 'playing':
        return '🎮 Đang chơi';
      case 'waiting':
        return '⏳ Chờ';
      case 'full':
        return '🚫 Đầy';
      default:
        return '✨ Mới';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${getStatusColor()} backdrop-blur-sm`} />
      <div className="absolute inset-0 border border-white/20 rounded-2xl group-hover:border-white/40 transition-colors" />

      <div className="relative px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-lg truncate">{room.name}</h4>
          <p className="text-white/60 text-sm">Chủ: {room.owner}</p>
        </div>

        <div className="flex items-center gap-4 ml-4 flex-shrink-0">
          <div className="text-right">
            <p className="text-white/80 text-sm">
              👥 {room.players}/{room.maxPlayers}
            </p>
            <p className="text-yellow-300 font-semibold">💰 {room.bet.toLocaleString()}</p>
          </div>

          <div className="text-right">
            <span className="inline-block bg-white/10 px-2 py-1 rounded text-white text-xs font-semibold">
              {getStatusLabel()}
            </span>
          </div>

          <motion.button
            onClick={onJoin}
            disabled={room.status === 'full'}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              room.status === 'full'
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
            }`}
            whileHover={room.status !== 'full' ? { scale: 1.05 } : {}}
            whileTap={room.status !== 'full' ? { scale: 0.95 } : {}}
          >
            Tham gia
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
