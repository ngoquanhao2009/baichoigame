import React from 'react';
import { useGameStore } from '../store/gameStore';
import { useNavigate } from 'react-router-dom';

export const ResultPage = () => {
  const { state } = useGameStore();
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl p-6 max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold mb-2">Kết thúc ván đấu</h2>
        <p className="text-white/80 mb-4">Coins hiện tại: <strong>{state.player.coin}</strong></p>
        <div className="flex gap-3">
          <button onClick={() => navigate('/game')} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-700 text-white font-bold">Quay Lobby</button>
          <button onClick={() => navigate('/game/play/demo')} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold">Chơi lại</button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
