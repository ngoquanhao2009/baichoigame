import React, { useEffect, useState } from 'react';
import { Background } from './components/Background';
import { TopBar } from './components/TopBar';
import { MenuSection } from './components/MenuSection';
import { BottomBar } from './components/BottomBar';
import { AudioToggle } from './components/AudioToggle';
import { Toast } from './components/Notifications';
import './App.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [userName, setUserName] = useState('Bài Chòi');

  // Play sound effect on load
  useEffect(() => {
    const playStartSound = async () => {
      try {
        // Create a simple beep sound using Web Audio API
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
    
    // Show welcome message
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen bg-gray-900 overflow-hidden">
      {/* Background */}
      <Background />

      {/* Top Bar */}
      <TopBar />

      {/* Menu Section */}
      <MenuSection />

      {/* Bottom Bar */}
      <BottomBar />

      {/* Audio Toggle */}
      <AudioToggle />

      {/* Welcome Toast */}
      {showWelcome && (
        <Toast
          message="Chào mừng đến với Bái Chọi!"
          icon="👋"
          duration={3000}
          onClose={() => setShowWelcome(false)}
        />
      )}

      {/* Click sound interaction */}
      <div className="absolute inset-0 pointer-events-none" />
    </div>
  );
}

export default App;
