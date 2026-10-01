import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Disc3, Sparkles } from 'lucide-react';

export const AudioDronePlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.35);
  const [currentTone, setCurrentTone] = useState<string>('Wax LP Drone (110Hz)');
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const startSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Warm Analog Drone (Fundamental + Sub + 5th Harmonic)
      const freqs = [110, 55, 164.81, 220]; // A2, A1, E3, A3
      const oscs: OscillatorNode[] = [];

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = i === 1 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        // Gentle micro-detuning for analog vinyl warmth
        osc.detune.setValueAtTime((i - 1.5) * 4, ctx.currentTime);

        const oscGainVal = i === 0 ? 0.35 : i === 1 ? 0.4 : 0.15;
        gain.gain.setValueAtTime(oscGainVal, ctx.currentTime);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        oscs.push(osc);
      });
      oscNodesRef.current = oscs;

      // 2. Vinyl LP Surface Noise / Microgroove Warmth (Simulated Crackle & Hiss)
      const bufferSize = ctx.sampleRate * 3;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Subtle pink-ish noise with occasional soft crackle
        const white = Math.random() * 2 - 1;
        const crackle = Math.random() > 0.998 ? (Math.random() * 0.4) : 0;
        output[i] = white * 0.015 + crackle;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      // Lowpass filter for vinyl warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, ctx.currentTime);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noise.start();
      noiseNodeRef.current = noise;

      setIsPlaying(true);
    } catch (err) {
      console.warn('Audio synthesis failed to initialize:', err);
    }
  };

  const stopSound = () => {
    try {
      if (audioCtxRef.current) {
        oscNodesRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        });
        oscNodesRef.current = [];

        if (noiseNodeRef.current) {
          try {
            noiseNodeRef.current.stop();
            noiseNodeRef.current.disconnect();
          } catch {
            // ignore
          }
        }
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    } catch (err) {
      console.warn('Error stopping audio:', err);
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  return (
    <div
      id="drone-player-dock"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-[#0E131F]/90 backdrop-blur-md border border-neutral-800/80 rounded-full px-4 py-2.5 shadow-2xl shadow-black/80 transition-all hover:border-neutral-700"
    >
      <button
        id="toggle-audio-drone-btn"
        onClick={toggleSound}
        className={`flex items-center gap-2.5 text-xs tracking-wide font-medium transition-colors ${
          isPlaying ? 'text-blue-400' : 'text-neutral-400 hover:text-white'
        }`}
        title={isPlaying ? 'Pause ambient vinyl drone' : 'Play ambient wax LP drone sound'}
      >
        <Disc3
          className={`w-4 h-4 ${isPlaying ? 'animate-spin text-blue-400' : 'text-neutral-500'}`}
          style={{ animationDuration: '4s' }}
        />
        <span className="hidden sm:inline">
          {isPlaying ? 'Playing Ambient Drone' : 'Auditory Wax Preview'}
        </span>
      </button>

      {isPlaying && (
        <div className="flex items-center gap-2 pl-2 border-l border-neutral-800">
          <Volume2 className="w-3.5 h-3.5 text-neutral-400" />
          <input
            type="range"
            min="0"
            max="0.8"
            step="0.02"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Ambient volume"
            className="w-16 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-400"
          />
        </div>
      )}
    </div>
  );
};
