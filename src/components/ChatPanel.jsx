import React, { useEffect, useState } from 'react';
import { on } from '../utils/EventBus';

// Lịch sử hô — ghi lại mỗi lần Anh Hiệu hô và kết quả đánh trúng/hụt.
// Lắng nghe EventBus thay vì chat giả lập.

const HOST_NAME = 'Anh Hiệu';

export const ChatPanel = ({ roomId }) => {
  const [entries, setEntries] = useState([
    { id: 0, type: 'system', text: 'Sân Bài đã sẵn sàng — chờ Anh Hiệu hô!', time: Date.now() }
  ]);

  useEffect(() => {
    const unAnnounce = on('announce', ({ phrase, chant, card }) => {
      setEntries(prev => [{
        id: Date.now() + Math.random(),
        type: 'host',
        phrase,
        chant: chant || null,
        cardName: (card && card.name) || phrase,
        time: Date.now()
      }, ...prev].slice(0, 40));
    });

    const unResult = on('play:result', ({ playerIdx, card, success, hostPhrase }) => {
      const who = playerIdx === 0 ? 'Bạn' : `AI ${playerIdx}`;
      setEntries(prev => [{
        id: Date.now() + Math.random() + 1,
        type: 'result',
        who,
        success,
        playedCard: card ? card.v : null,
        hostPhrase,
        time: Date.now()
      }, ...prev].slice(0, 40));
    });

    const unWin = on('match:win', ({ playerIdx }) => {
      const who = playerIdx === 0 ? 'Bạn' : `AI ${playerIdx}`;
      setEntries(prev => [{
        id: Date.now() + Math.random() + 2,
        type: 'win',
        who,
        time: Date.now()
      }, ...prev].slice(0, 40));
    });

    return () => { unAnnounce(); unResult(); unWin(); };
  }, []);

  const fmtTime = (t) => {
    const d = new Date(t);
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
  };

  return (
    <div className="w-64 bg-white/6 rounded-lg p-3 text-white text-sm">
      <div className="font-bold mb-2 flex items-center gap-2">
        <span>📜</span> Lịch sử hô
      </div>
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {entries.map(e => {
          if (e.type === 'system') {
            return (
              <div key={e.id} className="text-xs text-white/50 italic">
                {e.text}
              </div>
            );
          }
          if (e.type === 'host') {
            const firstLine = e.chant ? String(e.chant).split(/\n|\\n/)[0] : null;
            return (
              <div key={e.id} className="text-xs bg-yellow-400/10 border-l-2 border-yellow-400/70 pl-2 py-1.5 rounded-r">
                <div className="text-yellow-300 font-semibold flex items-center justify-between">
                  <span>🎤 {HOST_NAME}</span>
                  <span className="text-white/40 text-[10px]">{fmtTime(e.time)}</span>
                </div>
                {firstLine && <div className="text-white/70 italic mt-0.5 line-clamp-2">{firstLine}...</div>}
                <div className="text-white/90 mt-1">🎴 <span className="font-bold">{e.cardName}</span></div>
              </div>
            );
          }
          if (e.type === 'result') {
            const hit = e.success;
            return (
              <div key={e.id} className={`text-xs pl-2 py-1 border-l-2 ${hit ? 'border-green-400/70 bg-green-400/10' : 'border-red-400/70 bg-red-400/10'} rounded-r`}>
                <div className="flex items-center justify-between">
                  <span className={hit ? 'text-green-300 font-semibold' : 'text-red-300 font-semibold'}>
                    {hit ? '✓ Trúng rồi!' : '✗ Hụt mất tiêu!'}
                  </span>
                  <span className="text-white/40 text-[10px]">{fmtTime(e.time)}</span>
                </div>
                <div className="text-white/60 mt-0.5">{e.who} đánh {e.playedCard || '?'} {hit ? '' : `(hô: ${e.hostPhrase || '?'})`}</div>
              </div>
            );
          }
          if (e.type === 'win') {
            return (
              <div key={e.id} className="text-xs bg-yellow-500/20 border border-yellow-400/50 rounded px-2 py-1.5">
                <div className="text-yellow-200 font-bold">🏆 {e.who} chiến thắng ván!</div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ChatPanel;
