'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface TalkingAvatarProps {
  imageUrl: string;
  isSpeaking: boolean;
  className?: string;
}

const TalkingAvatar: React.FC<TalkingAvatarProps> = ({
  isSpeaking,
  imageUrl,
  className = '',
}) => {
  const imageControls = useAnimation();

  useEffect(() => {
    if (isSpeaking) {
      imageControls.start({
        scale: [1, 1.03, 0.98, 1.02, 1],
        rotate: [0, 1, -1, 0.5, 0],
        transition: {
          duration: 0.8,
          repeat: Infinity,
          ease: 'linear',
        },
      });
    } else {
      imageControls.start({
        scale: 1,
        rotate: 0,
        transition: {
          duration: 0.5,
        },
      });
    }
  }, [isSpeaking, imageControls]);

  return (
    <div
      className={`relative flex items-center justify-center w-full max-w-[320px] lg:max-w-[400px] aspect-square mx-auto ${className}`}
    >
      {/* Background Aurora Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-blue-500/20 to-teal-500/20 blur-[80px] rounded-full scale-150 animate-pulse-slow"></div>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full h-full rounded-full p-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] overflow-hidden group"
      >
        <motion.div
          animate={imageControls}
          className="relative w-full h-full rounded-full overflow-hidden bg-white/5"
        >
          <img
            src={imageUrl}
            alt="Prateek Mishra"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://ui-avatars.com/api/?name=Prateek+Mishra&size=400&background=random';
            }}
          />

          {/* Holographic scanning line */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-20 w-full z-20 pointer-events-none animate-[scan_3s_linear_infinite] opacity-50"></div>

          {/* Glassmorphism inner shadow */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] pointer-events-none z-30"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TalkingAvatar;