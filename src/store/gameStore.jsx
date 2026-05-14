import React, { createContext, useContext, useEffect, useState } from 'react';
import { MOCK_ROOMS, PLAYER_STATS } from '../gamedata/mockRooms';

const STORAGE_KEY = 'baichoi_game_store_v1';

const defaultState = {
  player: { ...PLAYER_STATS, xp: 0, streak: 0 },
  rooms: MOCK_ROOMS,
  settings: {
    sound: true,
  },
  history: [],
};

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // ensure player has an id
        if (!parsed.player) parsed.player = { ...defaultState.player };
        if (!parsed.player.id) parsed.player.id = `p-${Math.random().toString(36).slice(2,8)}`;
        return parsed;
      }
    } catch (e) {}
    // fresh state: ensure player id exists
    const fresh = { ...defaultState, player: { ...defaultState.player, id: `p-${Math.random().toString(36).slice(2,8)}` } };
    return fresh;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }, [state]);

  const updatePlayer = (patch) => setState(s => ({ ...s, player: { ...s.player, ...patch } }));
  const addCoins = (amount) => setState(s => ({ ...s, player: { ...s.player, coin: (s.player.coin||0) + amount } }));
  const addXp = (amount) => setState(s => ({ ...s, player: { ...s.player, xp: (s.player.xp||0) + amount } }));
  const setStreak = (val) => setState(s => ({ ...s, player: { ...s.player, streak: val } }));
  const addRoom = (room) => setState(s => ({ ...s, rooms: [room, ...s.rooms] }));
  const updateRoom = (id, patch) => setState(s => ({ ...s, rooms: s.rooms.map(r => r.id === id ? { ...r, ...patch } : r) }));
  const pushHistory = (entry) => setState(s => ({ ...s, history: [entry, ...s.history].slice(0,50) }));

  return (
    <GameContext.Provider value={{ state, updatePlayer, addRoom, updateRoom, pushHistory, addCoins, addXp, setStreak }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameStore = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameStore must be used inside GameProvider');
  return ctx;
};

export default useGameStore;
