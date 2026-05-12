import React from 'react';
import { motion } from 'framer-motion';

export const Badge = ({ icon, text, color = 'bg-blue-500' }) => {
  return (
    <motion.div
      className={`flex items-center gap-2 px-3 py-1 rounded-full ${color} text-white text-xs font-bold shadow-md`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
    >
      <span className="text-sm">{icon}</span>
      <span>{text}</span>
    </motion.div>
  );
};

export const Toast = ({ message, icon = '✨', duration = 3000, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <motion.div
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md border-2 border-white/40 rounded-full px-6 py-3 shadow-lg flex items-center gap-3"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-gray-800 font-semibold">{message}</span>
    </motion.div>
  );
};

export const AchievementPopup = ({ title, description, icon, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl border-4 border-white px-8 py-6 text-center">
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {icon}
        </motion.div>
        <h3 className="text-white font-bold text-2xl mb-2">{title}</h3>
        <p className="text-white/90 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};
