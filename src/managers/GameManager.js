import RNGManager from './RNGManager';
import AIManager from './AIManager';
import { emit } from '../utils/EventBus';
import AnimationManager from './AnimationManager';
import AudioManager from './AudioManager';
import cards from '../data/cards.json';

const state = {
  seed: null,
  deck: [],
  hands: [],
  announced: new Set(),
  players: 4,
  handSize: 9,
  currentPhrase: null,
  currentChant: null,
  currentCard: null,
};

// Build phrase list from cards.json (single source of truth)
const PHRASES = (cards || []).map(c => c.name).filter(Boolean);

function findCardByName(name) {
  if (!name) return null;
  return (cards || []).find(c => c.name === name) || null;
}

function pickChant(card) {
  if (!card || !Array.isArray(card.chants) || card.chants.length === 0) return null;
  return card.chants[Math.floor(Math.random() * card.chants.length)];
}

export function createMatch({ players = 4, handSize = 9, seed = null } = {}) {
  state.seed = seed || RNGManager.cryptoSeed();
  state.players = players;
  state.handSize = handSize;
  const deck = [];
  PHRASES.forEach((p) => {
    for (let i = 0; i < 6; i++) deck.push({ id: `${p}-${i}-${Math.random().toString(36).slice(2,6)}`, v: p });
  });
  const weights = {};
  PHRASES.forEach((p) => { weights[p] = 1; });

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
    if ((max - min) <= 6 || attempts >= 8) break;
  } while (attempts < 10);

  state.hands = handsLocal;
  state.announced = new Set();
  state.currentPhrase = null;
  state.currentChant = null;
  state.currentCard = null;
  emit('match:dealt', { hands: state.hands, seed: state.seed });
  AnimationManager.playDealSequence({ duration: 1200 });
  AudioManager.playClick();
  return state;
}

export function announceRandom() {
  const remaining = state.deck.filter(c => !state.announced.has(c.v));
  if (remaining.length === 0) return null;
  const pick = remaining[Math.floor(Math.random() * remaining.length)];
  state.announced.add(pick.v);
  state.currentPhrase = pick.v;

  const card = findCardByName(pick.v);
  const chant = pickChant(card);
  state.currentChant = chant;
  state.currentCard = card;

  emit('announce', { phrase: pick.v, chant, card });

  if (card && card.voice) {
    AudioManager.playHostVoice(card.voice);
  } else {
    const fallbackKey = `/audio/host_${String(pick.v).toLowerCase().replace(/\s+/g,'_')}.mp3`;
    AudioManager.playHostVoice(fallbackKey);
  }

  AIManager.handleAnnounce({ hands: state.hands, hostPhrase: pick.v, aiPlayCallback: playCard });
  return { phrase: pick.v, chant, card };
}

export function playCard(playerIdx, cardId) {
  const hand = state.hands[playerIdx];
  if (!hand) return;
  const card = hand.find(c => c.id === cardId);
  if (!card) return;
  state.hands[playerIdx] = hand.filter(c => c.id !== cardId);
  const success = card.v === state.currentPhrase;
  emit('hand:played', { playerIdx, card, hands: state.hands, success });
  emit('play:result', { playerIdx, card, success, hostPhrase: state.currentPhrase, chant: state.currentChant });
  if (state.hands[playerIdx].length === 0) {
    emit('match:win', { playerIdx });
    AnimationManager.playWinnerSequence({ playerIdx });
    AudioManager.playSuccess();
  }
}

export function getState() { return state; }

export default { createMatch, announceRandom, playCard, getState };
