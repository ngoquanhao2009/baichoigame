import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Background } from './components/Background';
import { TopBar } from './components/TopBar';
import { MenuSection } from './components/MenuSection';
import { BottomBar } from './components/BottomBar';
import { AudioToggle } from './components/AudioToggle';
import { Toast } from './components/Notifications';
import { GameLobby } from './components/GameLobby';
import { GameProvider } from './store/gameStore';
import LobbyPage from './pages/LobbyPage';
import RoomPage from './pages/RoomPage';
import GameplayPage from './pages/GameplayPage';
import ResultPage from './pages/ResultPage';
import './App.css';

function MainMenu() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const playStartSound = async () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.frequency.value = 600;
        oscillator.type = 'sine';

        gain.gain.setValueAtTime(0.2, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (e) {
        // Silently fail if audio not available
      }
    };

    playStartSound();
    
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen bg-gray-900 overflow-hidden">
      <Background />
      <TopBar />
      <MenuSection />
      <BottomBar />
      <AudioToggle />

      {showWelcome && (
        <Toast
          message="Chào mừng đến với Bài Chòi!"
          icon="👋"
          duration={3000}
          onClose={() => setShowWelcome(false)}
        />
      )}

      <div className="absolute inset-0 pointer-events-none" />
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <Router basename="/baichoigame/">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game" element={<LobbyPage />} />
          <Route path="/game/lobby" element={<LobbyPage />} />
          <Route path="/game/room/:id" element={<RoomPage />} />
          <Route path="/game/play/:id" element={<GameplayPage />} />
          <Route path="/game/result" element={<ResultPage />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
