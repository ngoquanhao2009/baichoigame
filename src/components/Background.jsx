import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Background = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const particleCount = isMobile ? 14 : 22;

    // Generate random particles for animation
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 4 + 6,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.5 + 0.3,
      drift: Math.random() * 14 - 7,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #7dd3fc 0%, #60a5fa 35%, #60a561 70%, #fbbf24 100%)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
        {/* Sky blur overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/40 via-transparent to-transparent backdrop-blur-sm" />
        
          {/* Island silhouette with soft layers */}
          <svg className="absolute bottom-0 w-full h-1/2 opacity-80 pointer-events-none" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="#083344" stopOpacity="0.18" />
                <stop offset="1" stopColor="#073b2d" stopOpacity="0.12" />
              </linearGradient>
            </defs>
            <path d="M0 380 Q200 240 420 300 T 840 250 T 1200 320 L1200 600 L0 600 Z" fill="url(#g1)" />
            <path d="M0 460 Q300 450 600 460 T1200 450 L1200 600 L0 600 Z" fill="#f7d78a" opacity="0.9" />
            <circle cx="140" cy="430" r="12" fill="#0b6b3a" opacity="0.9" />
            <circle cx="1040" cy="420" r="12" fill="#0b6b3a" opacity="0.9" />
          </svg>

        {/* Water effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-300/30 to-transparent" />
      </motion.div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-white rounded-full opacity-50"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -120, 0],
              opacity: [particle.opacity, particle.opacity * 0.7, particle.opacity],
              x: [0, particle.drift, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/20 pointer-events-none" />
    </div>
  );
};
