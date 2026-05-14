import React from 'react';

export const BookIcon = ({ className = 'w-12 h-12' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 6.5C3 5.67 3.67 5 4.5 5h11c.83 0 1.5.67 1.5 1.5V19c0 .28-.22.5-.5.5H4.5A1.5 1.5 0 0 1 3 18V6.5z" fill="url(#b)" stroke="rgba(255,255,255,0.75)" strokeWidth="0.8" />
    <path d="M5 7.5h9" stroke="white" strokeOpacity="0.9" strokeWidth="0.9" strokeLinecap="round" />
    <defs>
      <linearGradient id="b" x1="0" x2="1">
        <stop offset="0" stopColor="#fb923c" />
        <stop offset="1" stopColor="#f97316" />
      </linearGradient>
    </defs>
  </svg>
);

export default BookIcon;
