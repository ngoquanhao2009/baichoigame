import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export const WaitingRoom = ({ roomId }) => {
  const navigate = useNavigate();
  const { state, updateRoom, pushHistory } = useGameStore();
  const room = state.rooms.find(r => r.id === roomId);
  const playerId = state.player && state.player.id;
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (!room) return;
    // If room has no participants, seed with owner
    if (!room.participants || room.participants.length === 0) {
      const ownerId = playerId || `p-${Math.random().toString(36).slice(2,8)}`;
      updateRoom(room.id, { participants: [{ id: ownerId, name: room.owner, ready: false, isOwner: true }] });
    }
  }, [room, updateRoom, playerId]);

  // Fake other players join over time to make it feel alive
  useEffect(() => {
    if (!room) return;
    const missing = room.maxPlayers - (room.participants ? room.participants.length : 0);
    const timers = [];
    for (let i=0;i<missing;i++) {
      const t = setTimeout(() => {
        const fake = {
          id: `ai-${Math.random().toString(36).slice(2,6)}`,
          name: ['Minh','Huyền','Quân','Trung'][Math.floor(Math.random()*4)],
          ready: Math.random() < 0.4,
          isOwner: false,
        };
        updateRoom(room.id, { participants: [...(room.participants||[]), fake] });
      }, 800 + i*900);
      timers.push(t);
    }
    return () => timers.forEach(t => clearTimeout(t));
  }, [room, updateRoom]);

  // Dev/testing: auto-mark all participants ready and start when ?autoStart=1
  useEffect(() => {
    if (!room) return;
    try {
      const params = new URLSearchParams(window.location.search);
      if (!params.get('autoStart')) return;

      // ensure at least 2 participants
      const parts = room.participants ? [...room.participants] : [];
      while (parts.length < 2) {
        parts.push({ id: `ai-${Math.random().toString(36).slice(2,6)}`, name: 'AI', ready: false, isOwner: false });
      }

      // set all to ready after a short delay to allow UI to render
      setTimeout(() => {
        const readyParts = parts.map(p => ({ ...p, ready: true }));
        updateRoom(room.id, { participants: readyParts, players: readyParts.length });
      }, 900);
    } catch (e) {}
  }, [room, updateRoom]);

  const toggleReady = () => {
    if (!room) return;
    const parts = room.participants.map(p => p.id === playerId ? { ...p, ready: !p.ready } : p);
    updateRoom(room.id, { participants: parts });
  };

  // Watch all-ready -> start countdown
  useEffect(() => {
    if (!room || !room.participants) return;
    const allReady = room.participants.length >= 2 && room.participants.every(p => p.ready);
    if (allReady && countdown === null) {
      let t = 3;
      setCountdown(t);
      const iv = setInterval(() => {
        t -= 1;
        setCountdown(t > 0 ? t : 0);
        if (t <= 0) {
          clearInterval(iv);
          // Start game
          navigate(`/game/play/${room.id}`);
        }
      }, 900);
      return () => clearInterval(iv);
    }
  }, [room, countdown, navigate]);

  if (!room) return <div className="p-6 text-white">Phòng không tìm thấy.</div>;

  const copyId = async () => {
    try { await navigator.clipboard.writeText(room.id); pushHistory({ type: 'copy-room', id: room.id, time: Date.now() }); }
    catch(e){}
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold text-2xl">{room.name}</h2>
        <div className="flex gap-2">
          <button onClick={copyId} className="px-3 py-2 rounded bg-white/10 text-sm">Copy ID</button>
          <span className="px-3 py-2 rounded bg-white/5 text-sm">{room.id}</span>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 gap-3">
          {room.participants && room.participants.map(p => (
            <div key={p.id} className="flex items-center gap-3 bg-white/5 p-3 rounded">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">{p.name[0]}</div>
              <div className="flex-1">
                <div className="text-white font-semibold">{p.name}</div>
                <div className="text-sm text-white/60">{p.ready ? 'Sẵn sàng' : 'Chưa sẵn sàng'}</div>
              </div>
              <div className="text-sm">{p.isOwner ? 'Chủ' : 'Khách'}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button onClick={toggleReady} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold">
          Toggle Ready
        </button>
        <div className="w-40 text-center">
          {countdown !== null && <div className="text-3xl font-bold text-yellow-300">{countdown > 0 ? countdown : 'GO!'}</div>}
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
