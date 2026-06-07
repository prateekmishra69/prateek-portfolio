import { useState, useEffect, useCallback, useRef } from 'react';

export const useTTS = (text: string) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Force cancel any ghost audio instantly when module loads
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.pause();
      window.speechSynthesis.cancel();
    }

    // Load mute preference
    const storedMute = localStorage.getItem('audioMuted') === 'true';
    setIsMuted(storedMute);

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferredVoices = ['Microsoft Ryan', 'Google UK English Male', 'Microsoft David', 'Google US English'];
      
      let selectedVoice = null;
      for (const pref of preferredVoices) {
        selectedVoice = voices.find(v => v.name.includes(pref));
        if (selectedVoice) break;
      }
      
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
      }
      setVoice(selectedVoice || null);
    };

    const handleUnload = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.pause();
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleUnload();
      }
    };

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
      window.addEventListener('beforeunload', handleUnload);
      window.addEventListener('pagehide', handleUnload);
      window.addEventListener('unload', handleUnload);
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    // React Component Unmount Cleanup
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeunload', handleUnload);
        window.removeEventListener('pagehide', handleUnload);
        window.removeEventListener('unload', handleUnload);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (window.speechSynthesis) {
          window.speechSynthesis.pause();
          window.speechSynthesis.cancel();
        }
      }
    };
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newVal = !prev;
      localStorage.setItem('audioMuted', String(newVal));
      if (newVal && typeof window !== 'undefined' && window.speechSynthesis) {
        // Stop current speech immediately
        window.speechSynthesis.pause();
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
      }
      return newVal;
    });
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.pause();
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, []);

  const play = useCallback((options?: { onBlocked?: () => void, onSuccess?: () => void }) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    // SINGLE INSTANCE MODE: Cancel anything currently playing
    window.speechSynthesis.pause();
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    
    // Prevent future speech if muted
    if (isMuted) {
      if (options?.onSuccess) options.onSuccess();
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    let started = false;

    utterance.onstart = () => {
      started = true;
      setIsSpeaking(true);
      setIsPaused(false);
      if (options?.onSuccess) options.onSuccess();
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    utterance.onerror = (e) => {
      // Ignore interruption errors caused by our manual cancels
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        setIsSpeaking(false);
        setIsPaused(false);
      }
    };
    
    utterance.onpause = () => setIsPaused(true);
    utterance.onresume = () => {
      setIsPaused(false);
      setIsSpeaking(true);
    };

    window.speechSynthesis.speak(utterance);

    // Detect browser autoplay block
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!started && window.speechSynthesis.pending) {
        window.speechSynthesis.pause();
        window.speechSynthesis.cancel();
        if (options?.onBlocked) options.onBlocked();
      }
    }, 250);
  }, [text, voice, isMuted]);

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (isMuted) return;
      window.speechSynthesis.resume();
    }
  }, [isMuted]);

  return { play, pause, resume, stop, isSpeaking, isPaused, isMuted, toggleMute };
};
