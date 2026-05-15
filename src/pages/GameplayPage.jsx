import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { motion } from 'framer-motion';
import BaiCard from '../components/BaiCard';
import PlayerSeat from '../components/PlayerSeat';
import MatchHUD from '../components/MatchHUD';
import { useSound } from '../hooks/useSound';
import Host from '../components/Host';
import ChatPanel from '../components/ChatPanel';
import ResultModal from '../components/ResultModal';
import Confetti from '../components/Confetti';
import CoinBurst from '../components/CoinBurst';

const PHRASES = [
  'Nhứt Nọc',
  'Ông Ầm',
  'Tám Bích',
  'Ba Gà',
  'Tứ Cẳng',
  'Năm Lẻ',
  'Sáu Đôi',
  'Bảy Vui',
];

import RNGManager from '../managers/RNGManager';
import AIManager from '../managers/AIManager';
import GameManager from '../managers/GameManager';
import { on, off } from '../utils/EventBus';

const makeDeck = (seed = null) => {
  const deck = [];
  PHRASES.forEach((p) => {
    for (let i = 0; i < 6; i++) deck.push({ id: `${p}-${i}-${Math.random().toString(36).slice(2,6)}`, v: p });
  });
  // use seeded shuffle for fairness where possible
  return RNGManager.shuffleArray(deck, seed);
};

export const GameplayPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, updatePlayer, pushHistory, updateRoom, addCoins, addXp, setStreak } = useGameStore();
  const [hands, setHands] = useState([]); // index 0 = local player, others ai
  const [hostPhrase, setHostPhrase] = useState('');
  const [round, setRound] = useState(1);
  const [timer, setTimer] = useState(null);
  const intervalRef = useRef(null);
  const { playClickSound, playSuccessSound } = useSound();
  const [winner, setWinner] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [combo, setCombo] = useState(0);
  const [autoMark, setAutoMark] = useState(true);

  useEffect(() => {
    // deal
    const deck = makeDeck();
    const players = 4;
    const dealCount = 5;
    const newHands = [];
    for (let i = 0; i < players; i++) {
      newHands.push(deck.slice(i * dealCount, i * dealCount + dealCount));
    }
    setHands(newHands);
    setRound(1);
    setWinner(null);
  }, [id]);

  // dealing state for animation
  const [dealing, setDealing] = useState(false);
  useEffect(() => {
    if (hands && hands.length) {
      setDealing(true);
      const t = setTimeout(() => setDealing(false), 1200);
      return () => clearTimeout(t);
    }
  }, [hands]);

  useEffect(() => {
    // initialize match via GameManager
    const match = GameManager.createMatch({ players: 4, handSize: 5 });
    setHands(match.hands || []);

    // subscribe to events
    const unAnn = on('announce', ({ phrase }) => {
      setHostPhrase(phrase);
      setTimer(4);
      let t = 4;
      const tv = setInterval(() => {
        t -= 1;
        setTimer(t > 0 ? t : 0);
        if (t <= 0) clearInterval(tv);
      }, 1000);
    });

    const unPlayed = on('hand:played', ({ hands: newHands }) => {
      setHands(newHands);
    });

    const unResult = on('play:result', ({ playerIdx, success }) => {
      if (playerIdx === 0) {
        if (success) {
          if (typeof addCoins === 'function') addCoins(200);
          if (typeof addXp === 'function') addXp(30);
          pushHistory({ type: 'win', coins: 200, time: Date.now() });
          setCombo(c => c + 1);
          playSuccessSound();
        } else {
          setCombo(0);
        }
      }
    });

    const unWin = on('match:win', ({ playerIdx }) => {
      setWinner({ idx: playerIdx, name: playerIdx === 0 ? state.player.name : `AI ${playerIdx}` });
    });

    // start announce loop
    startHostLoop();

    return () => {
      stopHostLoop();
      unAnn(); unPlayed(); unResult(); unWin();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const startHostLoop = () => {
    stopHostLoop();
    intervalRef.current = setInterval(() => {
      GameManager.announceRandom();
    }, 4500);
    // trigger first immediately
    setTimeout(() => GameManager.announceRandom(), 600);
  };

  const stopHostLoop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const announcePhrase = () => {
    // kept for backward compatibility (unused)
  };

  const aiPlay = (playerIdx, cardId, forcedMiss = false) => {
    setHands(prev => {
      const copy = prev.map(arr => [...arr]);
      const card = copy[playerIdx].find(c => c.id === cardId);
      if (!card) return prev;
      // if forcedMiss, play a wrong card (no effect)
      copy[playerIdx] = copy[playerIdx].filter(c => c.id !== cardId);
      // check win
      if (!forcedMiss && card.v === hostPhrase) {
        // success
        if (playerIdx === 0) {
          if (typeof addCoins === 'function') addCoins(150);
          if (typeof addXp === 'function') addXp(20);
          setCombo(c => c + 1);
          playSuccessSound();
        }
      } else {
        if (playerIdx === 0) setCombo(0);
      }
      // detect winner
      if (copy[playerIdx].length === 0) {
        setWinner({ idx: playerIdx, name: playerIdx === 0 ? state.player.name : `AI ${playerIdx}` });
        stopHostLoop();
      }
      return copy;
    });
  };

  const playCard = (cardId) => {
    playClickSound();
    // delegate to GameManager
    GameManager.playCard(0, cardId);
  };

  useEffect(() => {
    if (!winner) return;
    // award winner coin bonus and navigate to result after animation
    if (winner.idx === 0) {
      // award player
      if (typeof addCoins === 'function') addCoins(500);
      if (typeof addXp === 'function') addXp(120);
      pushHistory({ type: 'round-win', coins: 500, time: Date.now() });
    }
    // show result modal
    setShowResult(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner]);

  return (
    <div className="w-full h-screen bg-gray-900 text-white p-4 flex flex-col">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => navigate('/game')} className="text-white">← Quay Lobby</button>
          <div className="text-center">
            <div className="text-sm text-white/70">Phòng: {id || 'Demo'}</div>
            <div className="text-lg font-bold">Vòng {round}</div>
          </div>
          <div>Coins: {state.player.coin}</div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-1">
            <MatchHUD hostName={"Ông Hô"} phrase={hostPhrase} round={round} timer={timer} />
            <div className="my-4">
              <Host phrase={hostPhrase} />
            </div>

            <div className="w-full md:max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <PlayerSeat player={{ name: 'AI 1', coin: 1200, ready: true }} />
                <div className="flex-1 text-center"> 
                  <div className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-500 rounded-xl shadow-lg">Bàn chơi</div>
                </div>
                <PlayerSeat player={{ name: 'AI 2', coin: 980, ready: true }} />
              </div>

              <div className="bg-gradient-to-br from-amber-900/10 to-transparent rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-white/80">Host đang hô: <strong className="text-white">{hostPhrase}</strong></div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-white/80">Auto</div>
                    <button onClick={() => setAutoMark(a => !a)} className={`px-3 py-1 rounded ${autoMark ? 'bg-green-500' : 'bg-gray-600'}`}>{autoMark ? 'ON' : 'OFF'}</button>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm text-white/80 mb-2">Bộ bài của bạn</h4>
                  <div className="flex gap-3 overflow-x-auto py-2">
                    {hands[0] && hands[0].map((c, idx) => (
                      <BaiCard key={c.id} card={c} onClick={() => playCard(c.id)} dealDelay={dealing ? idx * 0.08 : 0} />
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-sm text-white/70">AI Hands:</div>
                <div className="flex gap-4 mt-2 text-xs text-white/60">
                  <div>AI1: {hands[1] ? hands[1].length : 0} bài</div>
                  <div>AI2: {hands[2] ? hands[2].length : 0} bài</div>
                  <div>AI3: {hands[3] ? hands[3].length : 0} bài</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block w-72">
            <ChatPanel roomId={id} />
          </div>
        </div>

        {combo > 1 && (
          <div className="fixed top-28 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className="bg-yellow-400/20 text-yellow-200 px-6 py-2 rounded-full font-bold shadow-lg">Combo x{combo} — {combo >=8 ? 'Bậc thầy dân gian!' : combo >=5 ? 'Cao thủ!' : 'Hay quá!'}</div>
          </div>
        )}

        {showResult && winner && (
          <ResultModal winner={winner} coins={winner.idx===0?800:200} xp={winner.idx===0?200:40} />
        )}
      </div>
    </div>
  );
};

export default GameplayPage;
