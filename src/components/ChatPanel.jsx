import React, { useEffect, useState } from 'react';

export const ChatPanel = ({ roomId }) => {
  const [messages, setMessages] = useState([
    { id:1, from:'System', text:'Chào mừng đến Sân Bài!', time: Date.now() }
  ]);

  useEffect(() => {
    const iv = setInterval(() => {
      setMessages(m => [{ id:Date.now(), from: ['Minh','Huyền','Quân'][Math.floor(Math.random()*3)], text: ['Haha','Nice!','Trúng rồi'][Math.floor(Math.random()*3)], time: Date.now() }, ...m].slice(0,30));
    }, 4500 + Math.random()*2000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="w-64 bg-white/6 rounded-lg p-3 text-white text-sm">
      <div className="font-bold mb-2">Chat</div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {messages.map(m => (
          <div key={m.id} className="text-xs">
            <div className="text-white/80 font-semibold">{m.from}</div>
            <div className="text-white/70">{m.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatPanel;
