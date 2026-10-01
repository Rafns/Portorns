import React from 'react';

interface PageDividerMarqueeProps {
  id?: string;
  speedSec?: number;
  className?: string;
}

export const PageDividerMarquee: React.FC<PageDividerMarqueeProps> = ({
  id,
  speedSec = 34,
  className = '',
}) => {
  // Phrase items matching user prompt:
  // "Artificial Intelligence", "Data", "Computer Science"
  const items = [
    'ARTIFICIAL INTELLIGENCE',
    'DATA',
    'COMPUTER SCIENCE',
  ];

  // Repeat the 3 items enough times so that one track easily exceeds even 4K ultra-wide screens
  const blockRepeats = [0, 1, 2, 3, 4, 5, 6, 7];

  const renderTrack = (trackId: string) => (
    <div key={trackId} className="flex items-center shrink-0 whitespace-nowrap">
      {blockRepeats.map((repeatIdx) => (
        <div key={`${trackId}-block-${repeatIdx}`} className="flex items-center shrink-0">
          {items.map((text, itemIdx) => (
            <div key={`${trackId}-${repeatIdx}-${itemIdx}`} className="flex items-center shrink-0">
              <span className="text-[11px] sm:text-xs md:text-[13px] font-bold tracking-[0.24em] sm:tracking-[0.28em] uppercase text-neutral-300/90 hover:text-white transition-colors duration-200">
                {text}
              </span>

              {/* High-fidelity circular separator matching reference marquee */}
              <span
                aria-hidden="true"
                className="inline-flex items-center justify-center px-4 sm:px-6 md:px-7 text-neutral-500/80 text-[10px] sm:text-xs select-none"
              >
                ●
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div
      id={id}
      className={`relative w-full overflow-hidden border-y border-neutral-800/80 bg-[#080808] py-2.5 sm:py-3 select-none ${className}`}
      aria-label="Artificial Intelligence, Data, Computer Science marquee divider"
    >
      {/* Soft gradient edge fade overlays to smoothly blend with page background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-[#080808] via-[#080808]/85 to-transparent z-10"
      />

      {/* Continuously moving ticker track: smoothly shifts Left to Right */}
      <div
        className="animate-marquee-ltr"
        style={{ animationDuration: `${speedSec}s` }}
      >
        {renderTrack('track-1')}
        <div aria-hidden="true" className="flex items-center shrink-0">
          {renderTrack('track-2')}
        </div>
      </div>
    </div>
  );
};
