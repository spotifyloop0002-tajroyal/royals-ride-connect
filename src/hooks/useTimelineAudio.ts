import { useRef, useCallback } from 'react';

export const useTimelineAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundBuffersRef = useRef<Map<number, AudioBuffer>>(new Map());
  const isInitializedRef = useRef(false);

  // Initialize audio context (call this on user interaction)
  const initAudio = useCallback(async () => {
    if (isInitializedRef.current) return;

    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Load actual motorcycle sound files
      const soundFiles = [
        '/sounds/bike-1.mp3',
        '/sounds/bike-2.mp3',
        '/sounds/bike-3.mp3',
        '/sounds/bike-4.mp3',
        '/sounds/bike-5.mp3',
        '/sounds/bike-6.mp3',
        '/sounds/bike-7.mp3',
        '/sounds/bike-8.mp3',
      ];

      for (let i = 0; i < soundFiles.length; i++) {
        await loadAudioFile(soundFiles[i], i);
      }

      isInitializedRef.current = true;
      console.log('Timeline audio initialized with motorcycle sounds');
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  }, []);

  // Load actual audio file
  const loadAudioFile = useCallback(async (url: string, milestoneIndex: number) => {
    if (!audioContextRef.current) return;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      soundBuffersRef.current.set(milestoneIndex, audioBuffer);
      console.log(`Loaded audio for milestone ${milestoneIndex}`);
    } catch (error) {
      console.error(`Error loading audio file for milestone ${milestoneIndex}:`, error);
    }
  }, []);

  // Play sound for a milestone
  const playMilestoneSound = useCallback((milestoneIndex: number) => {
    if (!audioContextRef.current || !soundBuffersRef.current.has(milestoneIndex)) {
      return;
    }

    try {
      const source = audioContextRef.current.createBufferSource();
      const gainNode = audioContextRef.current.createGain();
      
      source.buffer = soundBuffersRef.current.get(milestoneIndex)!;
      
      // Subtle volume (0.15 = 15% volume)
      gainNode.gain.value = 0.15;
      
      source.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      source.start(0);
      
      console.log(`Playing sound for milestone ${milestoneIndex}`);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, []);

  return {
    initAudio,
    playMilestoneSound,
  };
};
