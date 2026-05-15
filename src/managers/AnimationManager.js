import { emit } from '../utils/EventBus';

export function playDealSequence({ duration = 1200 } = {}) {
  emit('animation:deal:start');
  // simple timing: emit end after duration
  setTimeout(() => emit('animation:deal:end'), duration);
}

export function playWinnerSequence({ playerIdx } = {}) {
  emit('animation:winner:start', { playerIdx });
  setTimeout(() => emit('animation:winner:end', { playerIdx }), 1800);
}

export default { playDealSequence, playWinnerSequence };
