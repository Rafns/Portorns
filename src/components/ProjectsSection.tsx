import React, { useState, useRef, useEffect, useCallback } from 'react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types';
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onAuditionSound?: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  // Calculate total pages / indices based on cards visible (3 cards on lg screens)
  const updateScrollState = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate approximate active page dot (cards per view is ~3 on lg, 2 on md, 1 on mobile)
    const cardWidth = clientWidth >= 1024 ? clientWidth / 3 : clientWidth >= 768 ? clientWidth / 2 : clientWidth;
    const currentIdx = Math.round(scrollLeft / cardWidth);
    setActiveIndex(currentIdx);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  // Scroll to previous / next card
  const scrollByCard = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const { clientWidth } = sliderRef.current;
    const step = clientWidth >= 1024 ? clientWidth / 3 : clientWidth >= 768 ? clientWidth / 2 : clientWidth * 0.9;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  // Scroll to a specific card index
  const scrollToCard = (index: number) => {
    if (!sliderRef.current) return;
    const { clientWidth } = sliderRef.current;
    const step = clientWidth >= 1024 ? clientWidth / 3 : clientWidth >= 768 ? clientWidth / 2 : clientWidth;
    sliderRef.current.scrollTo({
      left: index * step,
      behavior: 'smooth',
    });
  };

  // Mouse drag handlers for fluid swipe/scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftStart.current = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag sensitivity
    sliderRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // Total dot indicators (up to projectsData.length - 2 for 3-card view, minimum 3 dots)
  const totalDots = Math.max(
    3,
    projectsData.length > 3 ? projectsData.length - 2 : projectsData.length
  );

  return (
    <section
      id="proyek"
      className="relative px-6 sm:px-12 lg:px-20 py-24 sm:py-32 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFFFF]">
              FEATURED PROJECTS
            </h2>
          </div>
        </div>

        {/* Carousel Container with Left & Right Flanking Navigation Buttons */}
        <div className="relative group/carousel">
          {/* Left Arrow Button (Flanking left side of cardbox) */}
          <button
            type="button"
            onClick={() => scrollByCard('left')}
            disabled={!canScrollLeft}
            aria-label="Previous projects"
            className={`absolute -left-3 sm:-left-5 lg:-left-7 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-xl ${
              canScrollLeft
                ? 'bg-[#0B0F19]/95 border-neutral-700 text-white hover:bg-neutral-800 hover:border-neutral-500 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.6)]'
                : 'bg-neutral-900/40 border-neutral-800/40 text-neutral-600 opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* 3-Cardbox Horizontal Slider (Can be dragged, swiped, or scrolled left/right) */}
          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-6 pt-2 select-none cursor-grab active:cursor-grabbing px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projectsData.map((project, index) => {
              const cardNumber = String(index + 1).padStart(2, '0');

              return (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  onClick={() => onSelectProject(project)}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)] shrink-0 snap-start group relative bg-[#0B0F19] hover:bg-[#0E1526] border border-neutral-800/90 hover:border-neutral-700 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_40px_rgba(2,132,199,0.14)] cursor-pointer"
                >
                  {/* Top Screenshot Container with 01 / 02 / 03 Badge */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#070A12] border-b border-neutral-800/80">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0D1322] to-[#070A12] p-6 text-center">
                        <Sparkles className="w-8 h-8 text-[#38BDF8] mb-2 opacity-60" />
                        <span className="text-sm font-semibold text-neutral-300">
                          {project.title}
                        </span>
                      </div>
                    )}

                    {/* Top Left Number Badge: 01, 02, 03 */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-black/65 backdrop-blur-md border border-white/10 text-white font-mono text-xs font-bold tracking-wider shadow-sm">
                      {cardNumber}
                    </div>

                    {/* Top Right Quick Arrow Action Button */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/55 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-[#0284C7] group-hover:border-transparent transition-all duration-300 shadow-md">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    {/* Bottom subtle shadow vignette inside image */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0B0F19] to-transparent pointer-events-none" />
                  </div>

                  {/* Bottom Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Project Title */}
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#FFFFFF] tracking-tight leading-snug group-hover:text-[#F2EAD3] transition-colors duration-200 mb-2 line-clamp-1">
                        {project.title}
                      </h3>

                      {/* Short Description */}
                      <p className="font-sans text-xs sm:text-sm text-[#F2EAD3]/80 font-medium leading-relaxed line-clamp-2 mb-5">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Bottom Row: Tags & View Project Link */}
                      <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/[0.08]">
                        {/* Compact Tech Tags */}
                        <div className="flex items-center gap-1.5 overflow-hidden">
                          {project.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#F2EAD3]/[0.05] text-[#F2EAD3]/80 border border-[#F2EAD3]/10 truncate"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* "View Project ↗" */}
                        <span className="text-xs font-mono font-medium text-[#F2EAD3] group-hover:text-white inline-flex items-center gap-1 transition-colors shrink-0">
                          <span>View Project</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#F2EAD3]/70 group-hover:text-white" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button (Flanking right side of cardbox) */}
          <button
            type="button"
            onClick={() => scrollByCard('right')}
            disabled={!canScrollRight}
            aria-label="Next projects"
            className={`absolute -right-3 sm:-right-5 lg:-right-7 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-xl ${
              canScrollRight
                ? 'bg-[#0B0F19]/95 border-neutral-700 text-white hover:bg-neutral-800 hover:border-neutral-500 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.6)]'
                : 'bg-neutral-900/40 border-neutral-800/40 text-neutral-600 opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Carousel Pagination Dots Indicator underneath cards */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalDots }).map((_, idx) => {
            const isActive =
              activeIndex === idx ||
              (idx === totalDots - 1 && activeIndex >= totalDots - 1);

            return (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 cursor-pointer rounded-full ${
                  isActive
                    ? 'w-7 h-2 bg-[#60A5FA] shadow-[0_0_10px_rgba(96,165,250,0.5)]'
                    : 'w-2 h-2 bg-neutral-700 hover:bg-neutral-500'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
