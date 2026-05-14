import React from 'react';

export const ShopIcon = ({ className = 'w-12 h-12' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 7h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z" fill="url(#s)" stroke="rgba(255,255,255,0.75)" strokeWidth="0.8" />
    <path d="M3 7l2-3h14l2 3" stroke="white" strokeWidth="0.9" strokeLinecap="round" />
    <defs>
      <linearGradient id="s" x1="0" x2="1">
        <stop offset="0" stopColor="#f472b6" />
        <stop offset="1" stopColor="#ef4444" />
      </linearGradient>
    </defs>
  </svg>
);

export default ShopIcon;
