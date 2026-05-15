import RNGManager from './RNGManager';
import AIManager from './AIManager';
import { emit } from '../utils/EventBus';

const state = {
  seed: null,
  deck: [],
  hands: [],
  announced: new Set(),
  players: 4,
  handSize: 9,
  currentPhrase: null,
};

export function createMatch({ players = 4, handSize = 9, seed = null } = {}) {
  state.seed = seed || RNGManager.cryptoSeed();
  state.players = players;
  state.handSize = handSize;
  // build base deck from phrases or cards - for now use phrases from GameplayPage
  const PHRASES = [
    'Nhứt Nọc','Ông Ầm','Tám Bích','Ba Gà','Tứ Cẳng','Năm Lẻ','Sáu Đôi','Bảy Vui'
  ];
  const deck = [];
  PHRASES.forEach((p) => {
    for (let i = 0; i < 6; i++) deck.push({ id: `${p}-${i}-${Math.random().toString(36).slice(2,6)}`, v: p });
  });
  // smart distribution: avoid extreme hand strength by reshuffling a few times
  const weights = {
    'Nhứt Nọc': 1,
    'Ông Ầm': 1,
    'Tám Bích': 1,
    'Ba Gà': 1,
    'Tứ Cẳng': 1,
    'Năm Lẻ': 1,
    'Sáu Đôi': 1,
    'Bảy Vui': 1,
  };

  let attempts = 0;
  let handsLocal = [];
  do {
    state.deck = RNGManager.shuffleArray(deck, state.seed + BigInt(attempts));
    handsLocal = [];
    for (let i = 0; i < players; i++) {
      handsLocal.push(state.deck.slice(i * handSize, i * handSize + handSize));
    }
    const strengths = handsLocal.map(h => h.reduce((s, c) => s + (weights[c.v] || 1), 0));
    const max = Math.max(...strengths);
    const min = Math.min(...strengths);
    attempts++;
    // if difference too large, reshuffle (threshold 6)
    if ((max - min) <= 6 || attempts >= 8) break;
  } while (attempts < 10);

  state.hands = handsLocal;
  state.announced = new Set();
  emit('match:dealt', { hands: state.hands, seed: state.seed });
  return state;
}

export function announceRandom() {
  // pick phrase not announced yet from deck values
  const remaining = state.deck.filter(c => !state.announced.has(c.v));
  if (remaining.length === 0) return null;
  const pick = remaining[Math.floor(Math.random() * remaining.length)];
  state.announced.add(pick.v);
  state.currentPhrase = pick.v;
  emit('announce', { phrase: pick.v });
  // schedule AI via AIManager
  AIManager.handleAnnounce({ hands: state.hands, hostPhrase: pick.v, aiPlayCallback: playCard });
  return pick.v;
}

export function playCard(playerIdx, cardId) {
  const hand = state.hands[playerIdx];
  if (!hand) return;
  const card = hand.find(c => c.id === cardId);
  if (!card) return;
  // remove
  state.hands[playerIdx] = hand.filter(c => c.id !== cardId);
  const success = card.v === state.currentPhrase;
  emit('hand:played', { playerIdx, card, hands: state.hands, success });
  emit('play:result', { playerIdx, card, success });
  // check win
  if (state.hands[playerIdx].length === 0) {
    emit('match:win', { playerIdx });
  }
}

export function getState() { return state; }

export default { createMatch, announceRandom, playCard, getState };
