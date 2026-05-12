import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Background = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles for animation
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1e90ff 0%, #00d4ff 25%, #00ffaa 50%, #ffd700 75%, #ff6b6b 100%)',
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Sky blur overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/40 via-transparent to-transparent backdrop-blur-sm" />
        
        {/* Island silhouette */}
        <svg
          className="absolute bottom-0 w-full h-1/2 opacity-80"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
        >
          {/* Mountain background */}
          <path
            d="M 0 400 Q 150 200, 300 300 T 600 250 T 900 350 L 1200 300 L 1200 600 L 0 600 Z"
            fill="rgba(34, 139, 34, 0.4)"
            opacity="0.6"
          />
          
          {/* Beach/sand */}
          <path
            d="M 0 480 Q 300 470, 600 480 T 1200 470 L 1200 600 L 0 600 Z"
            fill="rgba(255, 200, 87, 0.8)"
          />

          {/* Tropical trees */}
          <circle cx="100" cy="420" r="15" fill="rgba(34, 139, 34, 0.9)" />
          <path d="M 100 420 L 90 450 L 110 450 Z" fill="rgba(34, 139, 34, 0.9)" />
          
          <circle cx="1100" cy="420" r="15" fill="rgba(34, 139, 34, 0.9)" />
          <path d="M 1100 420 L 1090 450 L 1110 450 Z" fill="rgba(34, 139, 34, 0.9)" />
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
              y: [0, -200, 0],
              opacity: [particle.opacity, particle.opacity * 0.7, particle.opacity],
              x: [0, Math.random() * 20 - 10, 0],
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
