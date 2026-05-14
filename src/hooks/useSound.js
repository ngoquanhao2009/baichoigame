let sharedAudioContext = null;
let sharedMasterGain = null;
let lastHoverAt = 0;

const getAudioNodes = () => {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) {
    return null;
  }

  if (!sharedAudioContext) {
    sharedAudioContext = new AudioContextCtor();
    sharedMasterGain = sharedAudioContext.createGain();
    sharedMasterGain.gain.value = 0.25;
    sharedMasterGain.connect(sharedAudioContext.destination);
  }

  return { audioContext: sharedAudioContext, masterGain: sharedMasterGain };
};

export const useSound = () => {
  const playSound = (frequency = 600, duration = 0.3, type = 'sine', volume = 0.18) => {
    try {
      const audio = getAudioNodes();
      if (!audio) {
        return;
      }

      const { audioContext, masterGain } = audio;
      const now = audioContext.currentTime;

      if (audioContext.state === 'suspended') {
        audioContext.resume().catch(() => {});
      }

      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.connect(gain);
      gain.connect(masterGain);

      osc.frequency.setValueAtTime(frequency, now);
      osc.type = type;

      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // Silently fail
    }
  };

  const playClickSound = () => playSound(700, 0.12, 'sine', 0.16);

  const playHoverSound = () => {
    const now = Date.now();
    if (now - lastHoverAt < 120) {
      return;
    }
    lastHoverAt = now;
    playSound(600, 0.08, 'sine', 0.1);
  };

  const playSuccessSound = () => {
    const frequencies = [600, 800, 1000];
    frequencies.forEach((freq, idx) => {
      setTimeout(() => playSound(freq, 0.08, 'sine', 0.14), idx * 45);
    });
  };

  return { playSound, playClickSound, playHoverSound, playSuccessSound };
};
