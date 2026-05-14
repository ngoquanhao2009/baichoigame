import React from 'react';

export const GamepadIcon = ({ className = 'w-12 h-12' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="1" y="6" width="22" height="12" rx="3" fill="url(#g)" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
    <circle cx="8.5" cy="11.5" r="1" fill="white" />
    <circle cx="11.5" cy="11.5" r="1" fill="white" />
    <path d="M16 10.5h.01" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M15 13.5h4" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0" stopColor="#60a5fa" />
        <stop offset="1" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
  </svg>
);

export default GamepadIcon;
