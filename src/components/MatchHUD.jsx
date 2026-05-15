import React from 'react';

export const MatchHUD = ({ hostName = 'Người hô', phrase = '', round = 1, timer = null }) => {
  return (
    <div className="w-full flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-gray-900">{hostName[0]}</div>
        <div className="bg-white/6 backdrop-blur rounded-lg px-3 py-2">
          <div className="text-sm text-white">{hostName}</div>
          <div className="text-xs text-white/70">Vòng {round}</div>
        </div>
      </div>

      <div className="text-center bg-gradient-to-r from-white/6 to-white/3 px-4 py-2 rounded-lg shadow-lg glass">
        <div className="text-xl font-bold text-yellow-300">{phrase}</div>
        {timer !== null && <div className="text-sm text-white/70">{timer}s</div>}
      </div>

      <div className="text-right">
        <div className="text-sm text-white/80">Status</div>
        <div className="text-xs text-white/70">{Math.floor(Math.random()*1000)} online</div>
      </div>
    </div>
  );
};

export default MatchHUD;
