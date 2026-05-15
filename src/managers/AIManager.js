// Simple AI manager for frontend-only simulation
// Provides scheduling for AI responses given hands and host phrase

export function handleAnnounce({ hands, hostPhrase, localIndex = 0, aiPlayCallback, options = {} }) {
  const timers = [];
  const defaults = { minDelay: 600, maxDelay: 2400, mistakeRate: 0.12 };
  const cfg = { ...defaults, ...options };

  hands.forEach((h, idx) => {
    if (idx === localIndex) return;
    const has = h.find(c => c.v === hostPhrase);
    if (has) {
      const delay = cfg.minDelay + Math.random() * (cfg.maxDelay - cfg.minDelay);
      const t = setTimeout(() => {
        aiPlayCallback(idx, has.id, false);
      }, delay);
      timers.push(t);
    } else {
      if (Math.random() < cfg.mistakeRate) {
        const randomCard = h[Math.floor(Math.random() * h.length)];
        if (randomCard) {
          const delay = cfg.minDelay + Math.random() * (cfg.maxDelay - cfg.minDelay);
          const t = setTimeout(() => {
            aiPlayCallback(idx, randomCard.id, true);
          }, delay);
          timers.push(t);
        }
      }
    }
  });

  return {
    cancel: () => timers.forEach(t => clearTimeout(t)),
  };
}

export default { handleAnnounce };
