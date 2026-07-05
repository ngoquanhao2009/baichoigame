import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Host "sân khấu" — mô phỏng MC hô Bài Chòi truyền thống:
// Phase 1: Anh Hiệu hô câu ca dao (chant) — chữ xuất hiện từng dòng
// Phase 2: Sau ~4 giây mới lật quân bài (cardName)
// Không bao giờ gọi thẳng tên quân bài trước khi hô xong.

const HOST_NAME = 'Anh Hiệu';
const CHANT_DURATION = 4000; // ms chant hiển thị trước khi lật quân

export const Host = ({ phrase, chant, cardName }) => {
  // phase: 'idle' | 'chanting' | 'revealed'
  const [phase, setPhase] = useState('idle');
  const [visibleLines, setVisibleLines] = useState([]);

  // Split chant into lines for typewriter effect
  const lines = React.useMemo(() => {
    if (!chant) return [];
    return String(chant).split(/\n|\\n/).map(s => s.trim()).filter(Boolean);
  }, [chant]);

  useEffect(() => {
    if (!phrase && !chant) {
      setPhase('idle');
      setVisibleLines([]);
      return;
    }
    // Start chant phase
    setPhase('chanting');
    setVisibleLines([]);

    // Reveal lines one by one
    let lineTimers = [];
    lines.forEach((_, idx) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, idx]);
      }, 400 + idx * 700);
      lineTimers.push(t);
    });

    // After chant duration, reveal card
    const revealTimer = setTimeout(() => {
      setPhase('revealed');
    }, CHANT_DURATION);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(revealTimer);
    };
  }, [phrase, chant]);

  const displayName = cardName || phrase;

  return (
    <div className="flex flex-col items-center justify-center w-full select-none">
      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-white/50 py-8"
          >
            <div className="text-2xl mb-1">🎭 {HOST_NAME}</div>
            <div className="text-sm">Đang chờ hô...</div>
          </motion.div>
        )}

        {phase === 'chanting' && (
          <motion.div
            key="chanting"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center w-full max-w-xl"
          >
            <div className="text-lg font-bold text-yellow-300 mb-2">🎭 {HOST_NAME}</div>
            <div className="mx-auto mb-3 h-px w-40 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
            <div className="min-h-[5rem] space-y-1 px-4">
              {lines.map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={visibleLines.includes(idx) ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.4 }}
                  className="text-white/90 italic text-base md:text-lg leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-3 text-sm text-yellow-200/80"
            >
              🔊 Đang hô...
            </motion.div>
            <div className="mt-2 flex items-center justify-center gap-1.5">
              {[0,1,2,3,4].map(i => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-yellow-400/70"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'revealed' && (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-center w-full"
          >
            <div className="text-lg font-bold text-yellow-300 mb-2">🎭 {HOST_NAME}</div>
            <div className="mx-auto mb-3 h-px w-40 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
            {chant && (
              <div className="mb-3 px-4 space-y-1">
                {lines.map((line, idx) => (
                  <p key={idx} className="text-white/60 italic text-sm leading-relaxed">{line}</p>
                ))}
              </div>
            )}
            <motion.div
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-gradient-to-br from-yellow-400 to-orange-500 text-gray-900 rounded-2xl px-8 py-4 shadow-2xl"
            >
              <div className="text-xs uppercase tracking-wider opacity-70 mb-1">🎴 Lật quân bài</div>
              <div className="text-3xl font-extrabold">{displayName}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Host;
