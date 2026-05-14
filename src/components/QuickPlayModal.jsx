import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const QuickPlayModal = ({ onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + Math.random() * 30 : 100));
    }, 800);

    return () => clearInterval(interval);
  }, []);

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
        <div className="text-center">
          <motion.div
            className="text-6xl mb-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🔍
          </motion.div>
          
          <h2 className="text-white font-bold text-2xl mb-2">Tìm Kiếm Trận Đấu</h2>
          <p className="text-white/60 mb-6">Đang khớp với người chơi khác...</p>

          <div className="mb-6">
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-white/60 text-sm mt-2">{Math.round(progress)}%</p>
          </div>

          <motion.button
            onClick={onClose}
            className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hủy
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
