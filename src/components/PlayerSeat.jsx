import React from 'react';

const PlayerSeat = ({ player, position = 'left' }) => {
  if (!player) return (
    <div className="flex flex-col items-center gap-2 opacity-60">
      <div className="w-14 h-14 rounded-full bg-white/6 flex items-center justify-center text-white/80">?</div>
      <div className="text-white/70 text-sm">Trống</div>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">{player.name[0]}</div>
      <div className="text-white font-semibold text-sm">{player.name}</div>
      <div className="text-xs text-white/70">{player.coin ?? ''} • {player.ready ? 'Sẵn sàng' : 'Chưa'}</div>
    </div>
  );
};

export default PlayerSeat;
