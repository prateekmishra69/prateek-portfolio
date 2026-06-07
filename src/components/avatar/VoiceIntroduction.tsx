'use client';

import React, { useEffect, useState } from 'react';
import { useTTS } from '@/hooks/useTTS';
import { Play, Volume2, VolumeX, Square } from 'lucide-react';

interface VoiceIntroductionProps {
  onSpeakingChange: (isSpeaking: boolean) => void;
}

const introText = "Hi, I'm Prateek Mishra. I'm a Full Stack Developer, AWS Certified Cloud Practitioner, and Computer Science student at KL University. I build cloud-powered applications, AI-driven solutions, and scalable web platforms. Welcome to my portfolio.";

const VoiceIntroduction: React.FC<VoiceIntroductionProps> = ({ onSpeakingChange }) => {
  const { play, stop, isSpeaking, isMuted, toggleMute } = useTTS(introText);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  useEffect(() => {
    onSpeakingChange(isSpeaking);
  }, [isSpeaking, onSpeakingChange]);

  useEffect(() => {
    const heard = localStorage.getItem('hasHeardIntro') === 'true';
    if (heard) return;

    // Auto-play after 2 seconds
    const timer = setTimeout(() => {
      play({
        onBlocked: () => setIsBlocked(true),
        onSuccess: () => {
          localStorage.setItem('hasHeardIntro', 'true');
        }
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
      stop();
    };
  }, [play, stop]);

  const handleManualAction = () => {
    if (isSpeaking) {
      stop();
    } else {
      play({
        onSuccess: () => {
          localStorage.setItem('hasHeardIntro', 'true');
        }
      });
    }
  };

  const handleOverlayClick = () => {
    setIsBlocked(false);
    if (!isSpeaking) {
      play({
        onSuccess: () => {
          localStorage.setItem('hasHeardIntro', 'true');
        }
      });
    }
  };

  return (
    <>
      {/* Premium Fallback Overlay */}
      {isBlocked && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md cursor-pointer animate-in fade-in duration-500"
          onClick={handleOverlayClick}
        >
          <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-3xl text-center shadow-[0_0_50px_rgba(255,77,77,0.1)] flex flex-col items-center gap-6 max-w-lg mx-4 transform transition-all hover:scale-105">
             <div className="w-20 h-20 rounded-full bg-[#FF4D4D]/10 flex items-center justify-center mb-2">
               <Volume2 size={40} className="text-[#FF4D4D] animate-pulse" />
             </div>
             <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
               Click anywhere to meet Prateek
             </h3>
             <p className="text-white/50 text-lg">
               Audio experience requires interaction
             </p>
          </div>
        </div>
      )}

      {/* Hero Buttons: Meet Prateek + Mute/Unmute */}
      <div className="flex flex-col gap-4 w-full items-center">
        <div className="flex items-center gap-3 w-full max-w-[320px] justify-center">
          {/* Main Play/Stop Button */}
          <button 
            onClick={handleManualAction}
            className="flex-1 group relative flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all px-6 py-4 rounded-full overflow-hidden text-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,77,77,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isSpeaking ? (
                <>
                  <Square size={16} className="fill-current text-[#FF4D4D]" />
                  <span className="text-[#FF4D4D]">Stop</span>
                </>
              ) : (
                <>
                  <Play size={18} className="fill-current" />
                  Meet Prateek
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D4D]/0 via-[#FF4D4D]/20 to-[#FF4D4D]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="relative flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all w-14 h-14 rounded-full overflow-hidden text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,77,77,0.2)]"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={20} className="text-white/50" /> : <Volume2 size={20} className="text-white" />}
          </button>
        </div>

        {/* Waveform indicator centered below the buttons */}
        {isSpeaking && (
          <div className="flex gap-1 h-5 items-end">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div 
                key={i} 
                className="w-1.5 bg-[#FF4D4D] rounded-t-sm transition-all duration-100"
                style={{ 
                  height: `${Math.random() * 100}%`,
                  animation: `waveform ${0.3 + i * 0.1}s infinite alternate` 
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default VoiceIntroduction;
