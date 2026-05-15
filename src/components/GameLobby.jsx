import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MOCK_ROOMS, RANK_TIERS, PLAYER_STATS } from '../gamedata/mockRooms';
import { useGameStore } from '../store/gameStore';
import { TopBar } from './TopBar';
import { RoomCard } from './RoomCard';
import { QuickPlayModal } from './QuickPlayModal';
import { CreateRoomModal } from './CreateRoomModal';
import { JoinRoomPanel } from './JoinRoomPanel';
import { RankedModeScreen } from './RankedModeScreen';

export const GameLobby = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState(null);
  const { state, addRoom, updateRoom } = useGameStore();
  const player = state.player;
  const rooms = state.rooms || MOCK_ROOMS;

  const handleBackClick = () => {
    navigate('/');
  };

  const handleCreateRoom = (roomData) => {
    const newRoom = {
      id: `BAICHOI-${Math.random().toString().slice(2, 6)}`,
      name: roomData.name,
      players: 1,
      maxPlayers: roomData.maxPlayers,
      bet: roomData.bet,
      status: 'waiting',
      owner: PLAYER_STATS.name,
      isPublic: roomData.isPublic,
      participants: [
        {
          id: player.id,
          name: player.name,
          ready: false,
          coin: player.coin,
          isOwner: true,
        }
      ],
    };
    addRoom(newRoom);
    setActiveMode(null);
    // Navigate to the created room
    navigate(`/game/room/${newRoom.id}`);
  };

  const handleJoinRoom = (roomId) => {
    if (!roomId) return;
    const code = String(roomId).trim();
    // try exact match first
    let room = rooms.find(r => r.id === code);
    // try with prefix
    if (!room && !code.startsWith('BAICHOI-')) {
      room = rooms.find(r => r.id === `BAICHOI-${code}` || r.id.includes(code));
    }
    // try contains match
    if (!room) {
      room = rooms.find(r => r.id.includes(code) || (r.name && r.name.toLowerCase().includes(code.toLowerCase())));
    }
    if (room && room.status !== 'full') {
      // If already present, just navigate
      const already = (room.participants||[]).some(p => p.id === player.id);
      if (!already) {
        const newParticipant = {
          id: player.id,
          name: player.name,
          ready: false,
          coin: player.coin,
          isOwner: false,
        };
        updateRoom(roomId, { participants: [...(room.participants||[]), newParticipant], players: (room.players||1) + 1 });
      }
      setActiveMode(null);
      navigate(`/game/room/${roomId}`);
    }
    else {
      alert('Không tìm thấy phòng hợp lệ hoặc phòng đã đầy. Vui lòng kiểm tra mã phòng.');
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 overflow-hidden">
      {/* Animated background with hội an vibe */}
      <motion.div
        className="fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-red-900/10 to-orange-900/20" />
        
        {/* Floating lanterns */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 rounded-full border-2 border-yellow-400/30 flex items-center justify-center"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 3}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="text-2xl">🏮</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative z-10">
        {/* Custom top bar for game */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-40 px-4 py-3 md:px-6 md:py-4 h-20 flex items-center"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 rounded-b-2xl bg-gradient-to-r from-white/20 via-white/12 to-white/20 backdrop-blur-xl border-b border-white/40" />
          
          <div className="relative max-w-7xl mx-auto w-full flex items-center justify-between">
            <motion.button
              onClick={handleBackClick}
              className="flex items-center gap-2 text-white font-bold hover:text-yellow-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ← Quay lại
            </motion.button>

            <h1 className="text-white font-bold text-2xl">⚔️ Bài Chòi</h1>

            <div className="flex items-center gap-3 text-white font-semibold text-sm">
              <span>💰 {PLAYER_STATS.coin}</span>
              <span>Lv.{PLAYER_STATS.level}</span>
            </div>
          </div>
        </motion.div>

        {/* Main content area */}
        <div className="pt-24 pb-20 px-4 h-screen overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-2">
                Chào mừng tới Sân Bài
              </h2>
              <p className="text-white/70 text-lg">Chọn một cách để bắt đầu chơi</p>
            </div>

            {/* Mode selection grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Quick Play */}
              <motion.button
                onClick={() => setActiveMode('quickplay')}
                className="group relative h-32 rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700" />
                <div className="absolute inset-0 group-hover:opacity-100 opacity-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-opacity duration-300" />
                
                <div className="relative h-full flex flex-col items-center justify-center gap-2 text-white">
                  <span className="text-4xl">⚡</span>
                  <span className="font-bold text-lg">Chơi Nhanh</span>
                  <span className="text-xs opacity-80">Khớp với người chơi</span>
                </div>
              </motion.button>

              {/* Create Room */}
              <motion.button
                onClick={() => setActiveMode('createroom')}
                className="group relative h-32 rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700" />
                <div className="absolute inset-0 group-hover:opacity-100 opacity-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-opacity duration-300" />
                
                <div className="relative h-full flex flex-col items-center justify-center gap-2 text-white">
                  <span className="text-4xl">🏠</span>
                  <span className="font-bold text-lg">Tạo Phòng</span>
                  <span className="text-xs opacity-80">Mời bạn bè</span>
                </div>
              </motion.button>

              {/* Join Room */}
              <motion.button
                onClick={() => setActiveMode('joinroom')}
                className="group relative h-32 rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700" />
                <div className="absolute inset-0 group-hover:opacity-100 opacity-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-opacity duration-300" />
                
                <div className="relative h-full flex flex-col items-center justify-center gap-2 text-white">
                  <span className="text-4xl">🔑</span>
                  <span className="font-bold text-lg">Vào Phòng</span>
                  <span className="text-xs opacity-80">Nhập mã phòng</span>
                </div>
              </motion.button>

              {/* Ranked */}
              <motion.button
                onClick={() => setActiveMode('ranked')}
                className="group relative h-32 rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-yellow-600 to-orange-600" />
                <div className="absolute inset-0 group-hover:opacity-100 opacity-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-opacity duration-300" />
                
                <div className="relative h-full flex flex-col items-center justify-center gap-2 text-white">
                  <span className="text-4xl">🏆</span>
                  <span className="font-bold text-lg">Đấu Hạng</span>
                  <span className="text-xs opacity-80">Xếp hạng toàn cầu</span>
                </div>
              </motion.button>
            </div>

            {/* Room list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-white font-bold text-xl mb-4">Phòng Công Khai</h3>
              <div className="space-y-3 mb-8">
                {rooms.filter(r => r.isPublic).map((room, idx) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onJoin={() => handleJoinRoom(room.id)}
                    delay={idx * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      {activeMode === 'quickplay' && (
        <QuickPlayModal onClose={() => setActiveMode(null)} />
      )}

      {activeMode === 'createroom' && (
        <CreateRoomModal
          onClose={() => setActiveMode(null)}
          onCreate={handleCreateRoom}
        />
      )}

      {activeMode === 'joinroom' && (
        <JoinRoomPanel onClose={() => setActiveMode(null)} onJoin={handleJoinRoom} />
      )}

      {activeMode === 'ranked' && (
        <RankedModeScreen onClose={() => setActiveMode(null)} />
      )}
    </div>
  );
};
