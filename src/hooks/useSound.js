export const useSound = () => {
  const playSound = (frequency = 600, duration = 0.3, type = 'sine') => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const now = audioContext.currentTime;
      
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.setValueAtTime(frequency, now);
      osc.type = type;
      
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
      
      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // Silently fail
    }
  };

  const playClickSound = () => playSound(700, 0.15);
  const playHoverSound = () => playSound(600, 0.1);
  const playSuccessSound = () => {
    const frequencies = [600, 800, 1000];
    frequencies.forEach((freq, idx) => {
      setTimeout(() => playSound(freq, 0.1), idx * 50);
    });
  };

  return { playSound, playClickSound, playHoverSound, playSuccessSound };
};
