import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Layers, ChevronRight } from 'lucide-react';

export interface VideoTheme {
  id: string;
  name: string;
  label: string;
  url: string;
  description: string;
}

export const AESTHETIC_VIDEO_THEMES: VideoTheme[] = [
  {
    id: 'neural-flow',
    name: 'Neural Flow',
    label: 'Deep Neural Waves',
    url: '/assets/aistudio/neural-flow.mp4',
    description: 'Dark cybernetic synaptic terrain with luminous ripples',
  },
  {
    id: 'orbital-cosmos',
    name: 'Orbital Cosmos',
    label: 'Cosmic Horizon',
    url: '/assets/aistudio/orbital-cosmos.mp4',
    description: 'Celestial planetary arc leading seamlessly into the starry sky',
  },
  {
    id: 'liquid-nox',
    name: 'Liquid Nox',
    label: 'Iridescent Fluid',
    url: '/assets/aistudio/liquid-nox.mp4',
    description: 'Hypnotic dark fluid surface with subtle specular reflections',
  },
  {
    id: 'biotech-ai',
    name: 'Bio-Tech AI',
    label: 'Computing Matrix',
    url: '/assets/aistudio/biotech-ai.mp4',
    description: 'Futuristic algorithmic lattice with intelligent motion',
  },
];

export const BoomerangVideoBg: React.FC = () => {
  const [activeThemeId, setActiveThemeId] = useState<string>(
    AESTHETIC_VIDEO_THEMES[0].id
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadedThemes, setLoadedThemes] = useState<Record<string, boolean>>({
    'neural-flow': false,
  });

  const activeTheme =
    AESTHETIC_VIDEO_THEMES.find((t) => t.id === activeThemeId) ||
    AESTHETIC_VIDEO_THEMES[0];

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    // Play the active video immediately
    const vid = videoRefs.current[activeThemeId];
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch((err) => {
        console.warn('Auto-play caught by browser policy:', err);
      });
    }
  }, [activeThemeId]);

  return (
    <div
      id="aesthetic-hero-video-container"
      className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none"
    >
      {/* 1. Multi-theme video loop layer with crossfading */}
      {AESTHETIC_VIDEO_THEMES.map((theme) => {
        const isActive = theme.id === activeThemeId;
        return (
          <video
            key={theme.id}
            ref={(el) => {
              videoRefs.current[theme.id] = el;
            }}
            src={theme.url}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => {
              setLoadedThemes((prev) => ({ ...prev, [theme.id]: true }));
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-85 scale-[1.04]' : 'opacity-0 scale-100'
            }`}
            style={{
              willChange: 'opacity, transform',
              transition: 'opacity 1s ease-in-out, transform 8s ease-out',
            }}
          />
        );
      })}

      {/* 2. Premium Cinematic Dark Vignette & Atmospheric Radial Shading */}
      {/* Keeps "AI Researcher" text & buttons crisp, high-contrast, and effortlessly legible */}
      <div className="absolute inset-0 bg-[#080B11]/50 backdrop-brightness-[0.8] transition-all" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080B11] via-transparent to-[#080B11]/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080B11]/80 via-transparent to-[#080B11]" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#080B11]/30 to-[#080B11]/90" />

      {/* 3. Interactive Aesthetic Theme Switcher Pill (Interactive pointer events enabled) */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-auto hidden sm:block">
        <div className="relative">
          {/* Main Trigger Pill */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F19]/85 hover:bg-[#131A2B] border border-neutral-700/80 hover:border-cyan-500/50 text-neutral-300 hover:text-white text-xs font-mono tracking-wide transition-all shadow-lg backdrop-blur-md cursor-pointer active:scale-95"
            title="Ganti Tema Video Background"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-wider text-neutral-400">Theme:</span>
            <span className="font-semibold text-white">{activeTheme.name}</span>
            <Layers className="w-3 h-3 text-neutral-500 ml-0.5" />
          </button>

          {/* Theme Dropdown Selection Panel */}
          {isMenuOpen && (
            <>
              {/* Backdrop closer */}
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsMenuOpen(false)}
              />

              <div className="absolute right-0 bottom-full mb-2 w-64 rounded-xl bg-[#090D17]/95 border border-neutral-700/90 shadow-2xl backdrop-blur-xl p-2 z-40 space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="px-2.5 py-1.5 border-b border-neutral-800 text-[10px] uppercase font-mono tracking-wider text-neutral-400 flex items-center justify-between">
                  <span>Pilih Video Background</span>
                  <span className="text-[9px] text-cyan-400 font-semibold">4 Aesthetic Loops</span>
                </div>

                {AESTHETIC_VIDEO_THEMES.map((theme) => {
                  const isSelected = theme.id === activeThemeId;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => {
                        setActiveThemeId(theme.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-all flex flex-col gap-0.5 cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-950/60 border border-cyan-500/40 text-white'
                          : 'hover:bg-neutral-800/70 text-neutral-300 hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1.5">
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          )}
                          {theme.name}
                        </span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 ${
                            isSelected ? 'text-cyan-400' : 'text-neutral-600'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-neutral-400 font-sans line-clamp-1">
                        {theme.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
