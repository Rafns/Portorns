import React, { useState, useCallback } from 'react';

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
      'Cermat dalam merancang arsitektur sistem, validasi edge-cases, ketat dalam standarisasi tipe data, serta menjaga performa kode tetap rapi dan terdokumentasi.',
    highlight: 'Rigorous Precision',
    number: '01',
  },
  {
    id: 'teamwork',
    category: 'COLLABORATION',
    title: 'Teamwork & Synergy',
    description:
      'Kolaboratif lintas disiplin bersama software engineers, desainer, dan pemangku kepentingan untuk menyelaraskan visi teknis menjadi produk bernilai nyata.',
    highlight: 'Unified Velocity',
    number: '02',
  },
  {
    id: 'communication',
    category: 'COMMUNICATION',
    title: 'Effective Communication',
    description:
      'Mampu mengartikulasikan konsep AI dan logika rekayasa perangkat lunak yang rumit menjadi penjelasan yang lugas, transparan, dan mudah dipahami.',
    highlight: 'Technical Clarity',
    number: '03',
  },
  {
    id: 'problem-solving',
    category: 'MINDSET',
    title: 'First-Principles Thinking',
    description:
      'Menganalisis akar masalah dari fondasi logika dasar daripada sekadar menambal gejala, melahirkan solusi arsitektur yang tahan uji dan skalabel.',
    highlight: 'Root-Cause Focus',
    number: '04',
  },
  {
    id: 'adaptability',
    category: 'GROWTH',
    title: 'Adaptive Learning',
    description:
      'Cepat menguasai teknologi, arsitektur deep learning, dan metodologi pengembangan baru seiring evolusi pesat lanskap industri AI global.',
    highlight: 'Rapid Agility',
    number: '05',
  },
  {
    id: 'ownership',
    category: 'WORK ETHIC',
    title: 'Radical Ownership',
    description:
      'Bertanggung jawab penuh atas setiap baris kode dari tahap konseptual, benchmarking, implementasi pipeline, hingga pemantauan di produksi.',
    highlight: 'End-to-End Care',
    number: '06',
  },
  {
    id: 'user-centric',
    category: 'PHILOSOPHY',
    title: 'User-Centric Empathy',
    description:
      'Memandang teknologi sebagai sarana memberdayakan manusia, mengintegrasikan kecerdasan mesin dengan pengalaman antarmuka yang intuitif dan bermakna.',
    highlight: 'Human-First AI',
    number: '07',
  },
];

export const TraitCardsDeck: React.FC = () => {
  const [deck, setDeck] = useState<TraitItem[]>(TRAITS_DATA);
  const [isThrowing, setIsThrowing] = useState<boolean>(false);
  const [thrownCard, setThrownCard] = useState<TraitItem | null>(null);

  // Play subtle physical swish tone on throw
  const playSwipeTone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
      // AudioContext unavailable or restricted, fallback gracefully
    }
  };

  // Throw current top card to the right
  const throwTopCard = useCallback(() => {
    if (isThrowing || deck.length === 0) return;

    playSwipeTone();
    const top = deck[0];
    setThrownCard(top);
    setIsThrowing(true);

    setTimeout(() => {
      setDeck((prev) => {
        if (prev.length <= 1) return prev;
        return [...prev.slice(1), prev[0]];
      });
      setIsThrowing(false);
      setThrownCard(null);
    }, 380);
  }, [isThrowing, deck]);

  // Stack offsets for cards in the pile (index 0 is front, index 1-3 are behind)
  const getCardStyle = (index: number) => {
    switch (index) {
      case 0:
        return {
          transform: 'translateY(0px) scale(1) rotate(0deg)',
          zIndex: 30,
          opacity: 1,
        };
      case 1:
        return {
          transform: 'translateY(10px) translateX(6px) scale(0.97) rotate(2.5deg)',
          zIndex: 20,
          opacity: 0.9,
        };
      case 2:
        return {
          transform: 'translateY(20px) translateX(-6px) scale(0.94) rotate(-3deg)',
          zIndex: 10,
          opacity: 0.75,
        };
      case 3:
      default:
        return {
          transform: 'translateY(30px) translateX(3px) scale(0.91) rotate(1.5deg)',
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
                — John Johnson
              </span>
              <span className="text-[10px] font-mono text-[#F2EAD3]/40 tracking-wider">
                Tap card to explore →
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: The Interactive Card Deck */}
        <div className="relative w-full max-w-[300px] sm:max-w-[330px] h-[200px] sm:h-[215px] flex items-center justify-center">
          {/* Subtle Ambient Floor Glow */}
          <div className="absolute -inset-4 bg-gradient-to-t from-sky-500/[0.04] via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Stacked Cards Pile (Displaying up to 4 layers) */}
          <div className="relative w-full h-[160px] sm:h-[175px]">
            {deck.slice(0, 4).map((card, index) => {
              const isTop = index === 0;
              const isCardThrowing = isTop && isThrowing;
              const style = getCardStyle(index);

              return (
                <div
                  key={card.id}
                  onClick={isTop ? throwTopCard : undefined}
                  role="button"
                  tabIndex={isTop ? 0 : -1}
                  onKeyDown={(e) => {
                    if (isTop && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      throwTopCard();
                    }
                  }}
                  className={`absolute inset-0 rounded-2xl p-5 sm:p-6 select-none transition-all ${
                    isCardThrowing
                      ? 'transition-all duration-350 ease-in translate-x-[150%] rotate-[22deg] opacity-0 pointer-events-none'
                      : isTop
                      ? 'cursor-pointer hover:shadow-[0_15px_40px_rgba(0,0,0,0.85)] hover:-translate-y-1.5 duration-300 ease-out'
                      : 'pointer-events-none duration-300 ease-out'
                  } bg-[#0E121A] border border-white/[0.14] shadow-[0_10px_35px_rgba(0,0,0,0.7)] flex flex-col justify-between`}
                  style={{
                    transform: isCardThrowing
                      ? 'translateX(160%) rotate(20deg) scale(0.95)'
                      : style.transform,
                    zIndex: style.zIndex,
                    opacity: isCardThrowing ? 0 : style.opacity,
                  }}
                >
                  {/* Subtle Card Inner Highlight Mesh */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none" />

                  {/* Card Header: Category & Counter */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.24em] uppercase text-[#F2EAD3]/75">
                      {card.category}
                    </span>

                    <span className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
                      {card.number}
                    </span>
                  </div>

                  {/* Card Body: Main Title */}
                  <div className="relative z-10 mt-auto">
                    <h4 className="font-display text-2xl sm:text-[26px] font-bold tracking-tight text-white leading-tight">
                      {card.title}
                    </h4>
                  </div>
                </div>
              );
            })}

            {/* Ghost Thrown Card (Preserves smooth physics while exiting) */}
            {isThrowing && thrownCard && (
              <div
                className="absolute inset-0 rounded-2xl p-5 sm:p-6 bg-[#0E121A] border border-white/[0.14] shadow-[0_15px_45px_rgba(0,0,0,0.9)] flex flex-col justify-between transition-all duration-380 ease-in pointer-events-none translate-x-[165%] rotate-[22deg] opacity-0 z-40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.24em] uppercase text-[#F2EAD3]/75">
                    {thrownCard.category}
                  </span>
                  <span className="font-mono text-[10px] font-semibold text-neutral-400">
                    {thrownCard.number}
                  </span>
                </div>
                <div className="mt-auto">
                  <h4 className="font-display text-2xl sm:text-[26px] font-bold text-white leading-tight">
                    {thrownCard.title}
                  </h4>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
