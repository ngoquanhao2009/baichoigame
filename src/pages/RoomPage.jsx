import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JoinRoomPanel } from '../components/JoinRoomPanel';
import { CreateRoomModal } from '../components/CreateRoomModal';
import { useGameStore } from '../store/gameStore';
import WaitingRoom from '../components/WaitingRoom';

export const RoomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useGameStore();

  const room = state.rooms.find(r => r.id === id) || null;

  return (
    <div className="w-full h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <button onClick={() => navigate('/game')} className="text-white mb-4">← Quay lại</button>
        {room ? (
          <WaitingRoom roomId={room.id} />
        ) : (
          <div className="bg-gray-800 rounded-lg p-4 text-white">Phòng không tồn tại.</div>
        )}
      </div>
    </div>
  );
};

export default RoomPage;
