const enabled = true;

function safePlay(src, volume = 1) {
  try {
    if (!enabled || !src) return;
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(() => {});
  } catch (e) {}
}

export function playClick() { safePlay('/audio/click.mp3', 0.6); }
export function playSuccess() { safePlay('/audio/success.mp3', 0.9); }
export function playHostVoice(src) { safePlay(src, 1); }

export default { playClick, playSuccess, playHostVoice };
