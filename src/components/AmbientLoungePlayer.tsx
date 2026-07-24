import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Flame, Sparkles } from 'lucide-react';

export const AmbientLoungePlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<'lounge' | 'sizzle'>('lounge');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<any[]>([]);

  const startSound = (soundType: 'lounge' | 'sizzle') => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      stopSound();

      const ctx = audioCtxRef.current;
      const nodes: any[] = [];

      if (soundType === 'lounge') {
        // Soft warm jazz chord synth ambience (Fmaj9 chord soft warmth)
        const freqs = [174.61, 220.00, 261.63, 329.63, 392.00]; // F3, A3, C4, E4, G4
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          
          // Soft LFO modulation for warmth
          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.2 + idx * 0.05, ctx.currentTime);
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(0.015, ctx.currentTime);
          lfo.connect(gain.gain);
          lfo.start();

          gain.gain.setValueAtTime(0.02, ctx.currentTime);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();

          nodes.push(osc, gain, lfo, lfoGain);
        });
      } else {
        // Sizzling grill / kitchen crackle white noise synthesis
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2500, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.035, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        whiteNoise.start();

        nodes.push(whiteNoise, filter, gain);
      }

      oscillatorsRef.current = nodes;
      setIsPlaying(true);
    } catch (e) {
      console.log('Audio Context not supported or allowed without interaction', e);
    }
  };

  const stopSound = () => {
    oscillatorsRef.current.forEach(node => {
      if (node.stop) {
        try { node.stop(); } catch (e) {}
      }
      if (node.disconnect) {
        try { node.disconnect(); } catch (e) {}
      }
    });
    oscillatorsRef.current = [];
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound(mode);
    }
  };

  const changeMode = (newMode: 'lounge' | 'sizzle') => {
    setMode(newMode);
    if (isPlaying) {
      startSound(newMode);
    }
  };

  useEffect(() => {
    return () => stopSound();
  }, []);

  return (
    <div className="flex items-center gap-2 bg-[#18181B]/90 border border-stone-800 rounded-full px-3 py-1.5 shadow-md backdrop-blur-md text-xs">
      <button
        onClick={togglePlay}
        className={`flex items-center gap-1.5 font-medium px-2 py-0.5 rounded-full transition-all ${
          isPlaying
            ? 'bg-[#C8102E] text-white shadow-[0_0_12px_rgba(200,16,46,0.5)] animate-pulse'
            : 'text-stone-300 hover:text-white hover:bg-stone-800'
        }`}
        title={isPlaying ? "Mute Background Ambience" : "Play Restaurant Soundscape"}
      >
        {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-stone-400" />}
        <span className="text-[11px]">
          {isPlaying ? (mode === 'lounge' ? 'Lounge Music Playing' : 'Grill Sizzle Playing') : 'Soundscape'}
        </span>
      </button>

      {isPlaying && (
        <div className="flex items-center gap-1 border-l border-stone-700 pl-2">
          <button
            onClick={() => changeMode('lounge')}
            className={`p-1 rounded transition-colors ${
              mode === 'lounge' ? 'text-[#E5383B] bg-stone-800' : 'text-stone-400 hover:text-white'
            }`}
            title="Switch to Cafe Lounge Jazz"
          >
            <Music className="w-3 h-3" />
          </button>
          <button
            onClick={() => changeMode('sizzle')}
            className={`p-1 rounded transition-colors ${
              mode === 'sizzle' ? 'text-amber-500 bg-stone-800' : 'text-stone-400 hover:text-white'
            }`}
            title="Switch to Sizzling Kitchen Grill"
          >
            <Flame className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
