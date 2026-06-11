'use client';

import React from 'react';
import { Play, Pause, RotateCcw, AlertCircle, Volume2, VolumeX } from 'lucide-react';

export type VideoStatus = 'idle' | 'playing' | 'ended' | 'error';

interface VideoControlsProps {
  status: VideoStatus;
  isMuted: boolean;
  onPlayToggle: () => void;
  onMuteToggle: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({ status, isMuted, onPlayToggle, onMuteToggle }) => {
  const getButtonContent = () => {
    switch (status) {
      case 'playing':
        return (
          <>
            <Pause size={18} className="fill-current text-cyan-400" />
            <span className="text-cyan-400">Playing Resume</span>
          </>
        );
      case 'ended':
        return (
          <>
            <RotateCcw size={18} />
            <span>Replay Resume</span>
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle size={18} className="text-[#FF4D4D]" />
            <span className="text-[#FF4D4D]">Video Unavailable</span>
          </>
        );
      default:
        return (
          <>
            <Play size={18} className="fill-current" />
            <span>Video Resume</span>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col gap-2 md:gap-4 w-full items-center">
      <div className="flex flex-row items-center justify-center gap-3 w-full py-0 md:py-2 mt-4 md:mt-0">
        <button 
          suppressHydrationWarning
          onClick={onPlayToggle}
          disabled={status === 'error'}
          className="w-[240px] group relative flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all px-6 py-4 rounded-full overflow-hidden text-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] z-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center gap-2">
            {getButtonContent()}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </button>

        {/* Mute/Unmute Button snug next to it */}
        <button
          suppressHydrationWarning
          onClick={onMuteToggle}
          className="relative flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all w-12 h-12 shrink-0 rounded-full overflow-hidden text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] z-10"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={18} className="text-white/50" /> : <Volume2 size={18} className="text-white" />}
        </button>
      </div>
    </div>
  );
};

export default VideoControls;
