import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export const JoinRoomPanel = ({ onClose, onJoin }) => {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const { state } = useGameStore();
  const rooms = state.rooms || [];

  const suggestions = useMemo(() => {
    const q = roomCode.trim().toLowerCase();
    if (!q) return rooms.slice(0,5);
    return rooms.filter(r => r.id.toLowerCase().includes(q) || (r.name && r.name.toLowerCase().includes(q))).slice(0,5);
  }, [roomCode, rooms]);

  const handlePadClick = (digit) => {
    if (roomCode.length < 12) {
      setRoomCode(roomCode + digit);
      setError('');
    }
  };

  const handleBackspace = () => {
    setRoomCode(roomCode.slice(0, -1));
    setError('');
  };

  const handleJoin = () => {
    if (roomCode.length === 0) {
      setError('Vui lòng nhập mã phòng');
      return;
    }
    if (onJoin) onJoin(roomCode);
    onClose();
  };

  const handleClear = () => {
    setRoomCode('');
    setError('');
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
        <h2 className="text-white font-bold text-2xl mb-2">Vào Phòng</h2>
        <p className="text-white/60 text-sm mb-6">Nhập mã phòng để tham gia</p>

        {/* Display room code */}
        <div className="bg-gray-800 rounded-lg px-4 py-4 mb-6 border border-white/20 text-center">
          <p className="text-white font-mono text-2xl tracking-widest min-h-10">
            {roomCode || '___________'}
          </p>
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        </div>

        {/* Game-style keypad */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B'].map(key => (
            <motion.button
              key={key}
              onClick={() => handlePadClick(key)}
              className="py-3 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
            >
              {key}
            </motion.button>
          ))}
        </div>

        {/* Control buttons */}
        <div className="flex gap-2 mb-6">
          <motion.button
            onClick={handleBackspace}
            className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ←
          </motion.button>
          <motion.button
            onClick={handleClear}
            className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            C
          </motion.button>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <motion.button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hủy
          </motion.button>

          <motion.button
            onClick={handleJoin}
            className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-bold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tham Gia
          </motion.button>
        </div>

        <div className="mt-6">
          <h3 className="text-white font-semibold mb-2">Gợi ý phòng</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {suggestions.length === 0 && <div className="text-white/60 text-sm">Không có gợi ý</div>}
            {suggestions.map(r => (
              <div key={r.id} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                <div>
                  <div className="text-sm text-white font-semibold">{r.name}</div>
                  <div className="text-xs text-white/60">{r.id} • {r.players}/{r.maxPlayers}</div>
                </div>
                <motion.button onClick={() => { if (onJoin) onJoin(r.id); onClose(); }} className="px-3 py-1 rounded bg-green-500 text-white text-sm">Tham gia</motion.button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
