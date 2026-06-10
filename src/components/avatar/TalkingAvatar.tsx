'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

import { VideoStatus } from './VideoControls';

interface TalkingAvatarProps {
  imageUrl: string;
  videoStatus: VideoStatus;
  isMuted: boolean;
  onVideoStatusChange: (status: VideoStatus) => void;
  className?: string;
}

const TalkingAvatar: React.FC<TalkingAvatarProps> = ({
  videoStatus,
  isMuted,
  onVideoStatusChange,
  imageUrl,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<{ id: number; size: number; x: number; y: number; z: number; duration: number; delay: number }[]>([]);

  const isSpeaking = videoStatus === 'playing';

  useEffect(() => {
    if (videoStatus === 'playing' && videoRef.current) {
      videoRef.current.play().catch(() => onVideoStatusChange('error'));
    } else if (videoRef.current) {
      videoRef.current.pause();
      if (videoStatus === 'ended') {
        videoRef.current.currentTime = 0;
      }
    }
  }, [videoStatus, onVideoStatusChange]);

  const handleVideoEnded = () => onVideoStatusChange('ended');
  const handleVideoError = () => onVideoStatusChange('error');

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth inertia
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  // Map motion values to subtle rotation degrees (Max 5deg as requested)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Generate 50 3D Particles on mount
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1.5, // 1.5px to 4.5px
      x: Math.random() * 140 - 20, // -20% to 120%
      y: Math.random() * 140 - 20,
      z: Math.random() * 100 + 40, // 40px to 140px in Z-space
      duration: Math.random() * 5 + 4, // 4s to 9s (slower movement)
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div 
      className={`relative flex items-center justify-center w-full max-w-[320px] lg:max-w-[400px] aspect-square mx-auto perspective-[1200px] ${className}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Root Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Layer 1: Background Aurora Glow */}
        <motion.div 
          style={{ z: -100 }}
          animate={{ 
            scale: isSpeaking ? [1.2, 1.3, 1.2] : [1, 1.05, 1],
            opacity: isSpeaking ? 0.7 : 0.3,
          }}
          transition={{ duration: isSpeaking ? 2 : 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-purple-700/60 via-blue-500/60 to-cyan-400/60 blur-[90px] rounded-full pointer-events-none"
        />

        {/* Layer 2: Outer Orbit Ring */}
        <motion.div 
          style={{ rotateX: 75, rotateY: -10, z: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: isSpeaking ? 6 : 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[140%] h-[140%] rounded-full border-[1px] border-blue-500/30 border-t-cyan-400/70 border-b-purple-500/70"
        />

        {/* Layer 3: Inner Orbit Ring */}
        <motion.div 
          style={{ rotateX: 65, rotateY: 15, z: 15 }}
          animate={{ rotate: -360 }}
          transition={{ duration: isSpeaking ? 4 : 18, repeat: Infinity, ease: "linear" }}
          className="absolute w-[115%] h-[115%] rounded-full border-[1px] border-transparent border-r-cyan-300/50 border-l-purple-400/40"
          initial={false}
        />

        {/* Layer 5: Glass Card Base (Z=0) */}
        <div 
          className="absolute inset-0 rounded-full p-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.4)] overflow-hidden"
          style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}
        >
          {/* Layer 4: Profile Image Container popping out */}
          <div 
            className="relative w-full h-full rounded-full overflow-hidden bg-black/60 border border-white/10"
            style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} 
          >
            {/* Video Resume Layer */}
            <motion.video
              ref={videoRef}
              animate={{ opacity: isSpeaking ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              src="/videos/test-resume.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              muted={isMuted}
              playsInline
              preload="metadata"
              onEnded={handleVideoEnded}
              onError={handleVideoError}
            />

            {/* Avatar Image Overlay (Crossfades out when video plays) */}
            <motion.img
              src={imageUrl}
              alt="Prateek Mishra"
              animate={{
                opacity: isSpeaking ? 0 : 1,
                scale: isSpeaking ? [1.02, 1.05, 1.02] : 1,
              }}
              transition={{
                opacity: { duration: 0.5, ease: "easeInOut" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Audio Reactive Color Shift */}
            <AnimatePresence>
              {isSpeaking && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 mix-blend-overlay z-10"
                />
              )}
            </AnimatePresence>

            {/* Glass Edge Highlights & Inner Shadows */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(255,255,255,0.2)] pointer-events-none z-20"></div>
            <div className="absolute inset-0 rounded-full shadow-[inset_0_4px_10px_rgba(255,255,255,0.4)] pointer-events-none z-20"></div>
            
            {/* Dynamic Glass Reflection (Mouse Tracking) */}
            <motion.div 
              className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay opacity-60 z-30 transition-opacity duration-300"
              style={{
                background: useTransform(() => `radial-gradient(circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, rgba(255,255,255,0.8) 0%, transparent 60%)`),
                opacity: isHovered ? 1 : 0
              }}
            />

            {/* Premium Shine Sweep (Every 8 seconds) */}
            <motion.div
              className="absolute inset-0 z-40 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.3) 50%, transparent 80%)' }}
              initial={{ x: '-150%', skewX: -20 }}
              animate={{ x: '150%' }}
              transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 8 }}
            />
          </div>
        </div>

        {/* Layer 6: Floating Parallax Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cyan-200"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              z: p.z,
              boxShadow: '0 0 12px rgba(103, 232, 249, 0.9)',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: isSpeaking ? [0.2, 0.9, 0.2] : [0.1, 0.5, 0.1],
              scale: isSpeaking ? [1, 1.5, 1] : 1,
            }}
            transition={{
              y: { duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay },
              opacity: { duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay },
              scale: { duration: 0.8, repeat: Infinity, repeatType: "mirror" }
            }}
          />
        ))}

        {/* Audio Reactive Waveform */}
        <AnimatePresence>
          {isSpeaking && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{ z: 60 }}
              className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex items-end gap-1.5 h-8"
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div 
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-cyan-500 to-purple-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                  animate={{ height: ['20%', '100%', '30%'] }}
                  transition={{ 
                    duration: Math.random() * 0.4 + 0.3, 
                    repeat: Infinity, 
                    repeatType: 'reverse',
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};

export default TalkingAvatar;