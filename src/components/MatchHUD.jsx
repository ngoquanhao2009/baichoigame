import React from 'react';

export const MatchHUD = ({ hostName = 'Người hô', phrase = '', round = 1, timer = null }) => {
  return (
    <div className="w-full flex items-center justify-between text-white mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-bold">{hostName[0]}</div>
        <div>
          <div className="text-sm">{hostName}</div>
          <div className="text-xs text-white/70">Vòng {round}</div>
        </div>
      </div>

      <div className="text-center">
        <div className="text-xl font-bold">{phrase}</div>
        {timer !== null && <div className="text-sm text-white/70">{timer}s</div>}
      </div>

      <div className="text-right">
        <div className="text-sm">Status</div>
        <div className="text-xs text-white/70">{Math.floor(Math.random()*1000)} online</div>
      </div>
    </div>
  );
};

export default MatchHUD;
