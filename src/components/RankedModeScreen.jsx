import React from 'react';
import { motion } from 'framer-motion';
import { RANK_TIERS, PLAYER_STATS } from '../gamedata/mockRooms';

export const RankedModeScreen = ({ onClose }) => {
  const currentRankIdx = RANK_TIERS.findIndex(t => t.name === PLAYER_STATS.rank);
  const currentRank = RANK_TIERS[currentRankIdx];
  const nextRank = RANK_TIERS[currentRankIdx + 1];
  const progressToNext = nextRank
    ? ((PLAYER_STATS.rankPoints - currentRank.minPoints) / (nextRank.minPoints - currentRank.minPoints)) * 100
    : 100;

  const mockLeaderboard = [
    { rank: 1, name: 'Minh Pro', points: 6500, tier: 'Kim Cương' },
    { rank: 2, name: 'Huyền Queen', points: 6200, tier: 'Kim Cương' },
    { rank: 3, name: 'Quân Ace', points: 5800, tier: 'Kim Cương' },
    { rank: 4, name: 'Trung Star', points: 5200, tier: 'Vàng' },
    { rank: 5, name: 'Liên Fire', points: 4900, tier: 'Vàng' },
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-900 rounded-3xl p-8 border border-white/20 max-w-2xl w-full mx-4 my-8"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white font-bold text-2xl">🏆 Đấu Hạng</h2>
          <motion.button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
            whileHover={{ scale: 1.2 }}
          >
            ✕
          </motion.button>
        </div>

        {/* Player rank info */}
        <motion.div
          className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-2xl p-6 mb-6 border border-yellow-400/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/70 text-sm">Hạng Hiện Tại</p>
              <p className="text-white font-bold text-2xl flex items-center gap-2">
                <span>{currentRank.icon}</span>
                {currentRank.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-sm">Điểm Hạng</p>
              <p className="text-yellow-300 font-bold text-2xl">{PLAYER_STATS.rankPoints}</p>
            </div>
          </div>

          {nextRank && (
            <div>
              <div className="flex justify-between text-xs text-white/60 mb-2">
                <span>{currentRank.minPoints}</span>
                <span>Đến {nextRank.name}: {nextRank.minPoints}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNext}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            className="bg-gray-800 rounded-lg p-4 text-center border border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-white/60 text-sm">Thắng</p>
            <p className="text-green-400 font-bold text-xl">{PLAYER_STATS.wins}</p>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-lg p-4 text-center border border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-white/60 text-sm">Thua</p>
            <p className="text-red-400 font-bold text-xl">{PLAYER_STATS.losses}</p>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-lg p-4 text-center border border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-white/60 text-sm">Tỷ Lệ</p>
            <p className="text-blue-400 font-bold text-xl">
              {(PLAYER_STATS.wins / PLAYER_STATS.totalGames * 100).toFixed(1)}%
            </p>
          </motion.div>
        </div>

        {/* Leaderboard */}
        <div>
          <h3 className="text-white font-bold text-lg mb-3">Bảng Xếp Hạng</h3>
          <div className="space-y-2">
            {mockLeaderboard.map((player, idx) => (
              <motion.div
                key={player.rank}
                className="bg-gray-800 rounded-lg px-4 py-3 flex items-center justify-between border border-white/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-white font-bold text-lg w-6">{player.rank}</span>
                  <span className="text-2xl">{['🥇', '🥈', '🥉', '4️⃣', '5️⃣'][idx]}</span>
                  <div>
                    <p className="text-white font-semibold">{player.name}</p>
                    <p className="text-white/50 text-xs">{player.tier}</p>
                  </div>
                </div>
                <p className="text-yellow-300 font-bold">{player.points}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white font-bold transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Quay Lại
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
