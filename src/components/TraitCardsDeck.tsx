import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface TraitItem {
  id: string;
  category: string;
  title: string;
  description?: string;
  highlight?: string;
  number: string;
}

const TRAITS_DATA: TraitItem[] = [
  {
    id: 'detail-oriented',
    category: 'TRAIT',
    title: 'Detail-Oriented',
    description:
      'Meticulous in system architecture design, rigorous edge-case validation, strict type standardization, and maintaining clean, well-documented codebases.',
    highlight: 'Rigorous Precision',
    number: '01',
  },
  {
    id: 'teamwork',
    category: 'COLLABORATION',
    title: 'Teamwork & Synergy',
    description:
      'Collaborative across multidisciplinary teams alongside software engineers, designers, and stakeholders to transform technical roadmaps into high-impact products.',
    highlight: 'Unified Velocity',
    number: '02',
  },
  {
    id: 'communication',
    category: 'COMMUNICATION',
    title: 'Effective Communication',
    description:
      'Skilled at translating complex machine learning concepts, algorithmic decisions, and software architectures into clear, transparent, and actionable stakeholder insights.',
    highlight: 'Technical Clarity',
    number: '03',
  },
  {
    id: 'problem-solving',
    category: 'MINDSET',
    title: 'First-Principles Thinking',
    description:
      'Deconstructs complex challenges down to foundational logic rather than patching symptoms, engineering resilient, scalable, and mathematically sound solutions.',
    highlight: 'Root-Cause Focus',
    number: '04',
  },
  {
    id: 'adaptability',
    category: 'GROWTH',
    title: 'Adaptive Learning',
    description:
      'Rapidly masters emerging AI frameworks, state-of-the-art model architectures, and modern development paradigms in a fast-evolving technological landscape.',
    highlight: 'Rapid Agility',
    number: '05',
  },
  {
    id: 'ownership',
    category: 'WORK ETHIC',
    title: 'Radical Ownership',
    description:
      'Takes end-to-end responsibility for every line of code from initial ideation, benchmarking, and pipeline deployment to production observability.',
    highlight: 'End-to-End Care',
    number: '06',
  },
  {
    id: 'user-centric',
    category: 'PHILOSOPHY',
    title: 'User-Centric Empathy',
    description:
      'Views technology as a catalyst to empower human potential, coupling intelligent model capabilities with empathetic, transparent, and intuitive user experiences.',
    highlight: 'Human-First AI',
    number: '07',
  },
];

export const TraitCardsDeck: React.FC = () => {
  const [deck, setDeck] = useState<TraitItem[]>(TRAITS_DATA);
  const [exitVector, setExitVector] = useState<{ x: number; y: number; rotate: number }>({
    x: 400,
    y: -40,
    rotate: 20,
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef<boolean>(false);

  // Play subtle physical sound on throw
  const playSwipeTone = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // AudioContext unavailable or restricted
    }
  };

  // Cycle the top card to the back of the stack
  const cycleCard = useCallback(() => {
    setDeck((prev) => {
      if (prev.length <= 1) return prev;
      return [...prev.slice(1), prev[0]];
    });
    isTransitioningRef.current = false;
  }, []);

  // Throw card based on mouse click position relative to card center
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTransitioningRef.current || deck.length === 0) return;

    playSwipeTone();
    isTransitioningRef.current = true;

    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rawDx = e.clientX - centerX;
      const rawDy = e.clientY - centerY;
      const dist = Math.hypot(rawDx, rawDy);

      // If clicked near center, default to top-right exit vector
      const normX = dist > 8 ? rawDx / dist : 0.9;
      const normY = dist > 8 ? rawDy / dist : -0.3;

      const throwDistance = 450;
      setExitVector({
        x: normX * throwDistance,
        y: normY * throwDistance,
        rotate: normX * 26 + (normY > 0 ? 8 : -8),
      });
    } else {
      setExitVector({ x: 420, y: -40, rotate: 20 });
    }

    cycleCard();
  };

  // Handle Drag & Throw gesture in any cursor direction
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }
  ) => {
    if (isTransitioningRef.current) return;

    const { offset, velocity } = info;
    const dragDistance = Math.hypot(offset.x, offset.y);
    const speed = Math.hypot(velocity.x, velocity.y);

    if (dragDistance > 55 || speed > 350) {
      playSwipeTone();
      isTransitioningRef.current = true;

      // Project trajectory along drag and velocity vector
      const dirX = offset.x !== 0 ? offset.x : velocity.x || 1;
      const dirY = offset.y !== 0 ? offset.y : velocity.y || 0;
      const length = Math.hypot(dirX, dirY) || 1;

      const throwDistance = 500;
      const normX = dirX / length;
      const normY = dirY / length;

      setExitVector({
        x: normX * throwDistance,
        y: normY * throwDistance,
        rotate: normX * 30,
      });

      cycleCard();
    }
  };

  // Stack offsets for cards behind the top card
  const getBackgroundCardStyle = (index: number) => {
    switch (index) {
      case 1:
        return {
          y: 10,
          x: 6,
          scale: 0.97,
          rotate: 2.5,
          zIndex: 20,
          opacity: 0.9,
        };
      case 2:
        return {
          y: 20,
          x: -6,
          scale: 0.94,
          rotate: -3,
          zIndex: 10,
          opacity: 0.75,
        };
      case 3:
      default:
        return {
          y: 30,
          x: 3,
          scale: 0.91,
          rotate: 1.5,
          zIndex: 5,
          opacity: 0.5,
        };
    }
  };

  return (
    <div className="mt-14 sm:mt-20 pt-10 pb-6 relative">
      {/* Soft gradient divider blending naturally into the background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Ambient background glow to eliminate stiffness */}
      <div className="absolute inset-0 bg-radial from-white/[0.015] via-transparent to-transparent pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 max-w-5xl mx-auto relative z-10">
        {/* Left Side: Title & IT Quote */}
        <div className="flex-1 text-center lg:text-left">
          {/* Main Title */}
          <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5 leading-tight">
            My Skill
          </h3>

          {/* Kata Bijak IT / Editorial Quote */}
          <div className="relative pl-4 sm:pl-5 border-l-2 border-white/20 text-left max-w-lg mx-auto lg:mx-0">
            <p className="font-serif italic text-base sm:text-lg text-[#F2EAD3]/90 leading-relaxed font-normal">
              “First, solve the problem. Then, write the code.”
            </p>
            <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-white/[0.06]">
              <span className="font-mono text-[11px] text-[#F2EAD3]/60 tracking-wider uppercase">
                - John Johnson
              </span>
              <span className="text-[10px] font-mono text-[#F2EAD3]/40 tracking-wider">
                Drag / tap card to fling →
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: The Interactive Dynamic Directional Card Deck */}
        <div className="relative w-full max-w-[300px] sm:max-w-[330px] h-[200px] sm:h-[215px] flex items-center justify-center">
          {/* Subtle Ambient Floor Glow */}
          <div className="absolute -inset-4 bg-gradient-to-t from-sky-500/[0.04] via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Stacked Cards Pile */}
          <div className="relative w-full h-[160px] sm:h-[175px]">
            {/* Background Static Layer Cards (Index 1 to 3) */}
            {deck.slice(1, 4).map((card, idx) => {
              const bgStyle = getBackgroundCardStyle(idx + 1);
              return (
                <motion.div
                  key={card.id}
                  layout
                  animate={{
                    y: bgStyle.y,
                    x: bgStyle.x,
                    scale: bgStyle.scale,
                    rotate: bgStyle.rotate,
                    opacity: bgStyle.opacity,
                  }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  className="absolute inset-0 rounded-2xl p-5 sm:p-6 select-none bg-[#0E121A] border border-white/[0.14] shadow-[0_10px_35px_rgba(0,0,0,0.7)] flex flex-col justify-between pointer-events-none"
                  style={{ zIndex: bgStyle.zIndex }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.24em] uppercase text-[#F2EAD3]/75">
                      {card.category}
                    </span>
                    <span className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
                      {card.number}
                    </span>
                  </div>
                  <div className="relative z-10 mt-auto">
                    <h4 className="font-display text-2xl sm:text-[26px] font-bold tracking-tight text-white leading-tight">
                      {card.title}
                    </h4>
                  </div>
                </motion.div>
              );
            })}

            {/* Front Interactive Card (Index 0) with Cursor Direction Following */}
            <AnimatePresence mode="popLayout">
              {deck[0] && (
                <motion.div
                  ref={cardRef}
                  key={deck[0].id}
                  layout
                  drag
                  dragSnapToOrigin
                  dragElastic={0.65}
                  onDragEnd={handleDragEnd}
                  onClick={handleCardClick}
                  initial={{ scale: 0.96, y: 12, opacity: 0.9 }}
                  animate={{
                    scale: 1,
                    y: 0,
                    x: 0,
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    x: exitVector.x,
                    y: exitVector.y,
                    rotate: exitVector.rotate,
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] },
                  }}
                  whileDrag={{
                    scale: 1.04,
                    cursor: 'grabbing',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.95)',
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: '0 16px 40px rgba(0,0,0,0.85)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                  className="absolute inset-0 rounded-2xl p-5 sm:p-6 select-none cursor-grab active:cursor-grabbing bg-[#0E121A] border border-white/[0.16] shadow-[0_12px_35px_rgba(0,0,0,0.75)] flex flex-col justify-between z-30"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />

                  {/* Card Header: Category & Number */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.24em] uppercase text-[#F2EAD3]/75">
                      {deck[0].category}
                    </span>
                    <span className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
                      {deck[0].number}
                    </span>
                  </div>

                  {/* Card Body: Title */}
                  <div className="relative z-10 mt-auto">
                    <h4 className="font-display text-2xl sm:text-[26px] font-bold tracking-tight text-white leading-tight">
                      {deck[0].title}
                    </h4>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
