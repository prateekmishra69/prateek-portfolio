import { useState, useEffect, useCallback, useRef } from 'react';

export const useTTS = (text: string) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 6. Page refresh / Tab close cleanup
    const handleUnload = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Initial cleanup
      window.addEventListener('beforeunload', handleUnload);
      window.addEventListener('pagehide', handleUnload);
      window.addEventListener('unload', handleUnload);
    }
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.removeEventListener('beforeunload', handleUnload);
        window.removeEventListener('pagehide', handleUnload);
        window.removeEventListener('unload', handleUnload);
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    // 3. Mute/Unmute state
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
    
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // 3. Mute/Unmute Toggle
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newVal = !prev;
      localStorage.setItem('audioMuted', String(newVal));
      if (newVal && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      return newVal;
    });
  }, []);

  // 2. Stop Button
  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // 1. & 4. Play and Multiple Instances
  const play = useCallback((options?: { onBlocked?: () => void, onSuccess?: () => void }) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    // Prevent overlapping speech by cancelling active speech first
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    
    if (isMuted) {
      if (options?.onSuccess) options.onSuccess();
      return;
    }
    
    // Create NEW SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    let started = false;

    utterance.onstart = () => {
      started = true;
      setIsSpeaking(true);
      if (options?.onSuccess) options.onSuccess();
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
         setIsSpeaking(false);
      }
    };

    // Delay start slightly to ensure cancel finishes
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 50);

    // Detect blocked autoplay
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!started && window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        if (options?.onBlocked) options.onBlocked();
      }
    }, 300);
  }, [text, voice, isMuted]);

  return { play, stop, isSpeaking, isMuted, toggleMute };
};
