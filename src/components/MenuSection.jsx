import React from 'react';
import { motion } from 'framer-motion';
import { MenuCard } from './MenuCard';
import { MENU_ITEMS, QUICK_ACTIONS } from '../constants';

export const MenuSection = () => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-20 pt-24 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-2xl px-4 md:px-0">
        {/* Main menu cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {MENU_ITEMS.map((item, idx) => (
            <MenuCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
              color={item.color}
              gradient={item.gradient}
              delay={idx * 0.15}
              path={item.path}
              external={item.external}
            />
          ))}
        </motion.div>

        {/* Additional menu items below for mobile */}
        <motion.div
          className="mt-6 md:hidden flex gap-3 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {QUICK_ACTIONS.map((item, idx) => (
            <motion.button
              key={idx}
              className={`p-3 rounded-full bg-gradient-to-br ${item.color} text-white shadow-lg border-2 border-white/40 font-semibold hover:shadow-lg transition-shadow`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              title={item.label}
            >
              <span className="text-2xl">{item.icon}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
