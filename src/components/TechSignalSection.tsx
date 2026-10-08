import React, { useState, useMemo, useEffect, useRef } from 'react';
import { techStackList, TechItem } from '../data/techStackData';
import { TechIcon } from './TechIcons';
import { ArrowUpRight } from 'lucide-react';
import { TraitCardsDeck } from './TraitCardsDeck';

interface TechSignalSectionProps {
  onNavigateToProjects?: () => void;
  onNavigateToContact?: () => void;
}

const TECH_CATEGORIES = [
  { id: 'all', label: 'All Stack' },
  { id: 'Core Languages', label: 'Languages' },
  { id: 'Frontend & Frameworks', label: 'Frontend' },
  { id: 'AI & Machine Learning', label: 'AI & ML' },
  { id: 'Backend, DevOps & Tools', label: 'Backend & LLMs' },
];

// Initial fractional distribution of nodes along the paths (0 to 1) with balanced spacing
const INITIAL_OFFSETS: Record<string, number> = {
  // Tier 1 (Line 1): 3 items
  python: 0.18,
  typescript: 0.52,
  javascript: 0.86,

  // Tier 2 (Line 2): 4 items
  react: 0.12,
  nextjs: 0.38,
  tailwind: 0.64,
  fastapi: 0.90,

  // Tier 3 (Line 3): 8 items
  pytorch: 0.06,
  tensorflow: 0.19,
  scikitlearn: 0.32,
  xgboost: 0.45,
  numpy: 0.58,
  pandas: 0.71,
  huggingface: 0.84,
  opencv: 0.97,

  // Tier 4 (Line 4): 11 items
  docker: 0.05,
  postgresql: 0.14,
  mysql: 0.23,
  supabase: 0.32,
  git: 0.41,
  github: 0.50,
  figma: 0.59,
  antigravity: 0.68,
  claude: 0.77,
  chatgpt: 0.86,
  gemini: 0.95,
};

// Fallback static positions across 4 tiers
const FALLBACK_COORDINATES: Record<string, { x: number; y: number }> = {
  // Tier 1
  python: { x: 300, y: 140 },
  typescript: { x: 600, y: 175 },
  javascript: { x: 900, y: 140 },

  // Tier 2
  react: { x: 180, y: 350 },
  nextjs: { x: 460, y: 315 },
  tailwind: { x: 740, y: 350 },
  fastapi: { x: 1020, y: 315 },

  // Tier 3
  pytorch: { x: 120, y: 485 },
  tensorflow: { x: 260, y: 520 },
  scikitlearn: { x: 400, y: 485 },
  xgboost: { x: 540, y: 520 },
  numpy: { x: 680, y: 485 },
  pandas: { x: 820, y: 520 },
  huggingface: { x: 960, y: 485 },
  opencv: { x: 1090, y: 520 },

  // Tier 4
  docker: { x: 110, y: 690 },
  postgresql: { x: 210, y: 655 },
  mysql: { x: 310, y: 690 },
  supabase: { x: 410, y: 655 },
  git: { x: 510, y: 690 },
  github: { x: 610, y: 655 },
  figma: { x: 710, y: 690 },
  antigravity: { x: 810, y: 655 },
  claude: { x: 910, y: 690 },
  chatgpt: { x: 1000, y: 655 },
  gemini: { x: 1090, y: 690 },
};

// Generously spaced undulating sinusoidal wave paths (Baselines: 160, 330, 500, 670)
const WAVE_PATHS = [
  // Line 1 (Tier 1) - Baseline Y=160, Amp=35
  'M -120 160 C -50 125, 20 125, 90 160 C 160 195, 230 195, 300 160 C 370 125, 440 125, 510 160 C 580 195, 650 195, 720 160 C 790 125, 860 125, 930 160 C 1000 195, 1070 195, 1140 160 C 1210 125, 1280 125, 1350 160',

  // Line 2 (Tier 2) - Baseline Y=330, Amp=35
  'M -120 330 C -50 365, 20 365, 90 330 C 160 295, 230 295, 300 330 C 370 365, 440 365, 510 330 C 580 295, 650 295, 720 330 C 790 365, 860 365, 930 330 C 1000 295, 1070 295, 1140 330 C 1210 365, 1280 365, 1350 330',

  // Line 3 (Tier 3) - Baseline Y=500, Amp=35
  'M -120 500 C -50 465, 20 465, 90 500 C 160 535, 230 535, 300 500 C 370 465, 440 465, 510 500 C 580 535, 650 535, 720 500 C 790 465, 860 465, 930 500 C 1000 535, 1070 535, 1140 500 C 1210 465, 1280 465, 1350 500',

  // Line 4 (Tier 4) - Baseline Y=670, Amp=35
  'M -120 670 C -50 705, 20 705, 90 670 C 160 635, 230 635, 300 670 C 370 705, 440 705, 510 670 C 580 635, 650 635, 720 670 C 790 705, 860 705, 930 670 C 1000 635, 1070 635, 1140 670 C 1210 705, 1280 705, 1350 670',
];

export const TechSignalSection: React.FC<TechSignalSectionProps> = ({
  onNavigateToProjects,
}) => {
  // Default active node is Python (01)
  const [activeItem, setActiveItem] = useState<TechItem>(techStackList[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isPlaying] = useState<boolean>(true);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);

  // Path SVG references for point-at-length calculations
  const pathRef1 = useRef<SVGPathElement | null>(null);
  const pathRef2 = useRef<SVGPathElement | null>(null);
  const pathRef3 = useRef<SVGPathElement | null>(null);
  const pathRef4 = useRef<SVGPathElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Live coordinates state for all 16 items
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(
    () => FALLBACK_COORDINATES
  );

  // Keep track of accumulated progress (fraction from 0 to 1)
  const progressRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Intersection observer to only animate when section is in view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Continuous animation frame loop
  useEffect(() => {
    let animId: number;

    const pathRefs = [pathRef1, pathRef2, pathRef3, pathRef4];

    // Speed: 0.016 = gentle, steady, cinematic motion along the waves
    const SPEED = 0.016;

    const updateFrame = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const deltaSec = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      // Only advance position when playing, visible, and user is not hovering over a node/card
      const shouldMove = isPlaying && isVisibleRef.current && !hoveredNodeId && !isCardHovered;

      if (shouldMove) {
        progressRef.current = (progressRef.current + deltaSec * SPEED) % 1.0;
      }

      const currentProgress = progressRef.current;
      const newPos: Record<string, { x: number; y: number }> = {};

      let hasComputed = false;

      techStackList.forEach((item) => {
        const tierIdx = item.tier - 1;
        const pathEl = pathRefs[tierIdx]?.current;
        const initial = INITIAL_OFFSETS[item.id] ?? 0;

        // LINE 1 & 3: Move Left to Right
        // LINE 2 & 4: Move Right to Left
        let fraction = 0;
        if (item.tier === 1 || item.tier === 3) {
          fraction = (initial + currentProgress) % 1.0;
          if (fraction < 0) fraction += 1.0;
        } else {
          fraction = (initial - currentProgress) % 1.0;
          if (fraction < 0) fraction += 1.0;
        }

        if (pathEl && typeof pathEl.getPointAtLength === 'function') {
          try {
            const totalLen = pathEl.getTotalLength();
            if (totalLen > 0) {
              const pt = pathEl.getPointAtLength(fraction * totalLen);
              newPos[item.id] = { x: pt.x, y: pt.y };
              hasComputed = true;
            }
          } catch {
            // fallback
          }
        }

        if (!newPos[item.id]) {
          newPos[item.id] = FALLBACK_COORDINATES[item.id] || { x: 300, y: 200 };
        }
      });

      if (hasComputed) {
        setPositions(newPos);
      }

      animId = requestAnimationFrame(updateFrame);
    };

    animId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, hoveredNodeId, isCardHovered]);

  // Current active node coordinates
  const activeCoord = positions[activeItem.id] || FALLBACK_COORDINATES[activeItem.id] || { x: 340, y: 160 };

  // Calculate card position near the active node with boundary preservation
  const cardPos = useMemo(() => {
    const isRightHalf = activeCoord.x > 600;
    const cardWidth = 320;
    const cardHeight = 125;

    let cardX = isRightHalf ? activeCoord.x - cardWidth - 40 : activeCoord.x + 50;
    let cardY = activeCoord.y - cardHeight - 35;

    // Boundary constraints within SVG coordinate space (0 to 1200, 0 to 860)
    if (cardX < 40) cardX = 40;
    if (cardX + cardWidth > 1160) cardX = 1160 - cardWidth;
    if (cardY < 20) cardY = activeCoord.y + 60;
    if (cardY + cardHeight > 840) cardY = activeCoord.y - cardHeight - 35;

    return { x: cardX, y: cardY, width: cardWidth, height: cardHeight };
  }, [activeCoord]);

  // Edge fade calculation for smooth entrance and exit at canvas borders
  const getEdgeStyle = (x: number) => {
    if (x < -20 || x > 1220) {
      return { opacity: 0, pointerEvents: 'none' as const };
    }
    if (x < 80) {
      const op = Math.max(0, Math.min(1, (x + 20) / 100));
      return { opacity: op, pointerEvents: op > 0.4 ? ('auto' as const) : ('none' as const) };
    }
    if (x > 1120) {
      const op = Math.max(0, Math.min(1, (1220 - x) / 100));
      return { opacity: op, pointerEvents: op > 0.4 ? ('auto' as const) : ('none' as const) };
    }
    return { opacity: 1, pointerEvents: 'auto' as const };
  };

  return (
    <section
      ref={containerRef}
      id="tech-stack"
      className="relative px-4 sm:px-8 lg:px-14 py-24 sm:py-32 bg-transparent text-white overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header: Minimalist & Architectural */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            {/* Tech Stack Title */}
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFFFF] mb-3">
              Tech Stack
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-xs sm:text-sm text-[#F2EAD3]/80 font-medium tracking-wide max-w-lg leading-relaxed">
              The tools, systems and technologies categorized across AI, Web, Languages, and DevOps infrastructure.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-black/40 border border-white/[0.08] p-1.5 rounded-full text-xs font-mono font-medium self-start lg:self-auto">
            {TECH_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (cat.id !== 'all') {
                    const firstMatch = techStackList.find((item) => item.category === cat.id);
                    if (firstMatch) setActiveItem(firstMatch);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#F2EAD3] text-[#0A0A0A] font-semibold shadow-sm'
                    : 'text-[#F2EAD3]/70 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Wave Canvas Container */}
        <div className="relative w-full overflow-x-auto no-scrollbar pt-4 pb-8">
          <div className="relative w-[980px] lg:w-full min-w-[980px] mx-auto aspect-[1200/860]">
            {/* SVG Wave Canvas: Minimalist, Background-Adapted Waves */}
            <svg
              viewBox="0 0 1200 860"
              className="w-full h-full overflow-visible pointer-events-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Soft Ethereal Line Bloom (Subtle, non-neon) */}
                <filter id="subtleLineBloom" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Primary Wave Gradient: Translucent Silver/White blending into Dark Background */}
                <linearGradient id="minimalWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.02" />
                  <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.10" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.25" />
                  <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
                </linearGradient>

                {/* Ambient Shadow Trace underneath waves for subtle physical depth */}
                <linearGradient id="ambientWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#27272A" stopOpacity="0.04" />
                  <stop offset="50%" stopColor="#3F3F46" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#27272A" stopOpacity="0.04" />
                </linearGradient>
              </defs>

              {/* Faint Center Vertical Axis Line with Reference Dots */}
              <line
                x1="600"
                y1="40"
                x2="600"
                y2="800"
                stroke="#FFFFFF"
                strokeOpacity="0.06"
                strokeWidth="0.75"
                strokeDasharray="4 8"
              />
              <circle cx="600" cy="160" r="1.5" fill="#FFFFFF" fillOpacity="0.2" />
              <circle cx="600" cy="330" r="1.5" fill="#FFFFFF" fillOpacity="0.2" />
              <circle cx="600" cy="500" r="1.5" fill="#FFFFFF" fillOpacity="0.2" />
              <circle cx="600" cy="670" r="1.5" fill="#FFFFFF" fillOpacity="0.2" />

              {/* Lane Category Indicator Labels on the Left of Waves */}
              <text x="35" y="105" fill="#FFFFFF" fillOpacity="0.38" fontSize="10" fontFamily="monospace" fontWeight="600" letterSpacing="0.2em">
                CORE LANGUAGES
              </text>
              <text x="35" y="275" fill="#FFFFFF" fillOpacity="0.38" fontSize="10" fontFamily="monospace" fontWeight="600" letterSpacing="0.2em">
                FRONTEND & FRAMEWORKS
              </text>
              <text x="35" y="445" fill="#FFFFFF" fillOpacity="0.38" fontSize="10" fontFamily="monospace" fontWeight="600" letterSpacing="0.2em">
                AI & MACHINE LEARNING
              </text>
              <text x="35" y="615" fill="#FFFFFF" fillOpacity="0.38" fontSize="10" fontFamily="monospace" fontWeight="600" letterSpacing="0.2em">
                BACKEND, DEVOPS & LLMs
              </text>

              {/* Ambient Micro-dots */}
              <circle cx="280" cy="200" r="1" fill="#FFFFFF" fillOpacity="0.12" />
              <circle cx="840" cy="240" r="1" fill="#FFFFFF" fillOpacity="0.15" />
              <circle cx="150" cy="410" r="1" fill="#FFFFFF" fillOpacity="0.12" />
              <circle cx="980" cy="450" r="1" fill="#FFFFFF" fillOpacity="0.15" />
              <circle cx="340" cy="580" r="1" fill="#FFFFFF" fillOpacity="0.12" />
              <circle cx="800" cy="620" r="1" fill="#FFFFFF" fillOpacity="0.12" />

              {/* ================= LINE 1 (TIER 1) WAVE (Python, TypeScript, JavaScript) -> Moves Left to Right ================= */}
              <path
                d={WAVE_PATHS[0]}
                stroke="url(#ambientWaveGrad)"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                ref={pathRef1}
                d={WAVE_PATHS[0]}
                stroke="url(#minimalWaveGrad)"
                strokeWidth="1.3"
                filter="url(#subtleLineBloom)"
                fill="none"
              />

              {/* ================= LINE 2 (TIER 2) WAVE (React, Next.js, Tailwind, FastAPI) -> Moves Right to Left ================= */}
              <path
                d={WAVE_PATHS[1]}
                stroke="url(#ambientWaveGrad)"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                ref={pathRef2}
                d={WAVE_PATHS[1]}
                stroke="url(#minimalWaveGrad)"
                strokeWidth="1.3"
                filter="url(#subtleLineBloom)"
                fill="none"
              />

              {/* ================= LINE 3 (TIER 3) WAVE (PyTorch, TensorFlow, Scikit-Learn, XGBoost, NumPy, Pandas, Hugging Face, OpenCV) -> Moves Left to Right ================= */}
              <path
                d={WAVE_PATHS[2]}
                stroke="url(#ambientWaveGrad)"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                ref={pathRef3}
                d={WAVE_PATHS[2]}
                stroke="url(#minimalWaveGrad)"
                strokeWidth="1.3"
                filter="url(#subtleLineBloom)"
                fill="none"
              />

              {/* ================= LINE 4 (TIER 4) WAVE (Docker, Postgres, MySQL, Supabase, Git, GitHub, Figma, Antigravity, Claude, ChatGPT, Gemini) -> Moves Right to Left ================= */}
              <path
                d={WAVE_PATHS[3]}
                stroke="url(#ambientWaveGrad)"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                ref={pathRef4}
                d={WAVE_PATHS[3]}
                stroke="url(#minimalWaveGrad)"
                strokeWidth="1.3"
                filter="url(#subtleLineBloom)"
                fill="none"
              />

              {/* Minimalist Connecting Leader Line from Active Node to Floating Annotation Card */}
              <g className="transition-all duration-150">
                <line
                  x1={activeCoord.x}
                  y1={activeCoord.y}
                  x2={cardPos.x + (activeCoord.x > 600 ? cardPos.width : 0)}
                  y2={cardPos.y + cardPos.height / 2}
                  stroke="rgba(255, 255, 255, 0.22)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <circle
                  cx={(activeCoord.x + (cardPos.x + (activeCoord.x > 600 ? cardPos.width : 0))) / 2}
                  cy={(activeCoord.y + (cardPos.y + cardPos.height / 2)) / 2}
                  r="2"
                  fill="rgba(255, 255, 255, 0.45)"
                />
              </g>
            </svg>

            {/* Interactive Moving Nodes Layer */}
            {techStackList.map((item) => {
              const coord = positions[item.id] || FALLBACK_COORDINATES[item.id] || { x: 0, y: 0 };
              const isActive = activeItem.id === item.id;
              const edgeStyle = getEdgeStyle(coord.x);
              const isMatch = selectedCategory === 'all' || item.category === selectedCategory;
              const finalOpacity = isMatch ? edgeStyle.opacity : edgeStyle.opacity * 0.2;

              return (
                <div
                  key={item.id}
                  id={`tech-node-${item.id}`}
                  onClick={() => setActiveItem(item)}
                  onMouseEnter={() => {
                    setHoveredNodeId(item.id);
                    setActiveItem(item);
                  }}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20 transition-opacity duration-200"
                  style={{
                    left: `${(coord.x / 1200) * 100}%`,
                    top: `${(coord.y / 860) * 100}%`,
                    opacity: finalOpacity,
                    pointerEvents: isMatch ? edgeStyle.pointerEvents : 'none',
                  }}
                >
                  {/* Outer Subtle Aura when active */}
                  {isActive && (
                    <div className="absolute -inset-2 rounded-2xl border border-white/20 bg-white/[0.03] pointer-events-none shadow-[0_0_20px_rgba(255,255,255,0.06)]" />
                  )}

                  {/* Squircle Icon Box: Minimalist, Background Blended */}
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md ${
                      isActive
                        ? 'bg-[#151821] border border-white/50 text-white shadow-[0_8px_25px_rgba(0,0,0,0.8)] scale-110'
                        : 'bg-[#0E1017]/90 border border-white/[0.08] text-neutral-400 group-hover:border-white/25 group-hover:text-white group-hover:scale-105'
                    }`}
                  >
                    <TechIcon
                      type={item.iconType}
                      className="w-6 h-6 sm:w-6.5 sm:h-6.5"
                    />
                  </div>

                  {/* Label: Technology Name */}
                  <div className="text-center mt-2 pointer-events-none">
                    <div
                      className={`text-xs font-semibold tracking-tight transition-colors duration-200 ${
                        isActive
                          ? 'text-white font-medium'
                          : 'text-neutral-300 group-hover:text-white'
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Floating Editorial Annotation Card */}
            <div
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={() => setIsCardHovered(false)}
              className="absolute z-30 transition-all duration-300 ease-out pointer-events-auto"
              style={{
                left: `${(cardPos.x / 1200) * 100}%`,
                top: `${(cardPos.y / 860) * 100}%`,
                width: `${(cardPos.width / 1200) * 100}%`,
                minWidth: '270px',
              }}
            >
              <div className="bg-[#0D0F15]/95 backdrop-blur-xl border border-white/[0.12] rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative">
                <div className="flex items-start gap-3.5 relative z-10">
                  {/* Left Icon Squircle */}
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 text-white shadow-inner">
                    <TechIcon type={activeItem.iconType} className="w-7 h-7" />
                  </div>

                  {/* Right Content: Title, Mastery Level Badge & Description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-display text-sm sm:text-base font-bold text-[#FFFFFF] tracking-tight leading-snug">
                        {activeItem.name}
                      </h4>
                      {activeItem.proficiencyLevel && (
                        <span
                          className={`text-[9px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                            activeItem.proficiencyLevel === 'Core Stack'
                              ? 'text-[#0A0A0A] bg-[#F2EAD3]'
                              : activeItem.proficiencyLevel === 'LLM & AI Tooling'
                              ? 'text-[#F2EAD3] bg-white/[0.08] border border-[#F2EAD3]/30'
                              : 'text-neutral-400 bg-white/[0.04] border border-white/[0.06]'
                          }`}
                        >
                          {activeItem.proficiencyLevel}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-[11px] sm:text-xs text-[#F2EAD3] font-medium leading-relaxed mt-1">
                      {activeItem.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3.5 pt-3 border-t border-white/[0.06]">
                  {activeItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[9px] font-mono tracking-wider uppercase text-[#F2EAD3]/80 bg-[#F2EAD3]/[0.05] border border-[#F2EAD3]/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Stacked Trait Cards Deck (Directly below the waves) */}
        <TraitCardsDeck />

        {/* Bottom of Section: Minimalist & Understated */}
        <div className="mt-12 sm:mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          {/* Left Statement */}
          <div>
            <div className="w-6 h-[1.5px] bg-[#F2EAD3]/40 mb-3" />
            <div className="font-mono text-xs tracking-[0.18em] text-[#FFFFFF] font-bold leading-relaxed uppercase">
              DIFFERENT TOOLS.
              <br />
              ONE SYSTEM.
            </div>
            <p className="font-sans text-xs tracking-wider text-[#F2EAD3]/70 font-semibold uppercase mt-2">
              BUILT TO EXPLORE. BUILT TO SHIP.
            </p>
          </div>

          {/* Right Action Link with horizontal leading line */}
          <div className="flex items-center gap-4 self-end sm:self-auto">
            <div className="hidden sm:block w-20 h-[1px] bg-white/[0.08]" />
            <button
              type="button"
              onClick={() => {
                if (onNavigateToProjects) {
                  onNavigateToProjects();
                } else {
                  const el = document.getElementById('proyek');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-[0.15em] text-[#F2EAD3] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <span>EXPLORE THE WORK</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
