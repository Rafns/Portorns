import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, FileText, ArrowUpRight, ChevronDown } from 'lucide-react';

const TRIPTYCH_IMAGE_URL = '/assets/monochrome_highway_trees.jpg';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onLearnMore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLearnMore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Entrance animation state (stagger trigger)
  const [isLoaded, setIsLoaded] = useState(false);

  // Mouse parallax state (-1 to 1)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Trigger stagger entrance on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  // Scroll listener for subtle vertical parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse move listener for smooth 3D parallax depth
  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const animateParallax = () => {
      // Smooth lerp damping for luxury weight
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMouseOffset({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Procedural living atmospheric fog/mist & slow topographic lines canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    window.addEventListener('resize', resize);

    // Fog puff particle clusters that drift across the hills
    const fogPuffs = Array.from({ length: 9 }).map((_, i) => ({
      x: (i / 9) * 1200,
      y: 180 + Math.sin(i * 1.5) * 90,
      radius: 180 + (i % 4) * 60,
      speed: 0.18 + (i % 3) * 0.12,
      opacity: 0.045 + (i % 3) * 0.025,
      driftY: (i % 2 === 0 ? 1 : -1) * 0.06,
    }));

    const render = () => {
      time += 0.007;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw slow volumetric mountain fog drifting across the landscape
      fogPuffs.forEach((fog) => {
        fog.x += fog.speed;
        if (fog.x - fog.radius > width) {
          fog.x = -fog.radius;
        }

        const currentY = fog.y + Math.sin(time + fog.x * 0.002) * 25;
        const grad = ctx.createRadialGradient(
          fog.x,
          currentY,
          fog.radius * 0.1,
          fog.x,
          currentY,
          fog.radius
        );
        grad.addColorStop(0, `rgba(240, 242, 248, ${fog.opacity * 1.1})`);
        grad.addColorStop(0.5, `rgba(220, 224, 230, ${fog.opacity * 0.5})`);
        grad.addColorStop(1, 'rgba(200, 205, 215, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(fog.x, currentY, fog.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw organic topographic contour curves that gently undulate across the ridges
      ctx.lineWidth = 1.1;
      const contourLinesCount = 4;
      for (let c = 0; c < contourLinesCount; c++) {
        const baseY = height * 0.45 + c * (height * 0.1);
        const alpha = 0.035 + Math.sin(time * 0.8 + c) * 0.015;
        ctx.strokeStyle = `rgba(240, 245, 255, ${Math.max(0.01, alpha)})`;
        ctx.beginPath();

        for (let x = 0; x <= width; x += 15) {
          const wave1 = Math.sin(x * 0.003 + time * 0.5 + c * 0.8) * 18;
          const wave2 = Math.cos(x * 0.006 - time * 0.3 + c) * 10;
          const y = baseY + wave1 + wave2;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const slashPattern =
    '////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////';

  return (
    <section
      id="beranda"
      ref={containerRef}
      className="relative z-10 min-h-screen w-full bg-black text-white flex flex-col justify-center pt-24 sm:pt-28 pb-8 px-3 sm:px-6 md:px-8 select-none overflow-hidden"
    >
      {/* Main Triptych Canvas (3 Panels with continuous panoramic living landscape) */}
      <div className="relative w-full h-[72vh] sm:h-[78vh] md:h-[82vh] rounded-md overflow-hidden border-2 sm:border-4 border-black bg-[#0A0A0A] shadow-2xl">
        {/* Dynamic Landscape Layer with mouse & scroll parallax */}
        <div
          className="absolute -inset-4 sm:-inset-6 z-0 transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `translate3d(${mouseOffset.x * -16}px, ${
              mouseOffset.y * -12 + scrollY * 0.12
            }px, 0) scale(1.08)`,
          }}
        >
          {/* Panoramic Monochrome Highway Road Landscape */}
          <img
            src={TRIPTYCH_IMAGE_URL}
            alt="Cinematic monochrome highway stretching into the distance through tree canopy"
            className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.08]"
          />

          {/* Living Atmospheric Canvas (Moving Mist/Fog & Topographic Contours) */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-90"
          />

          {/* User Requested Bottom Gradient Overlay: linear-gradient(to top, rgba(0,0,0,.65), transparent 50%) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.45) 24%, rgba(0, 0, 0, 0.15) 38%, transparent 55%)',
            }}
          />

          {/* Subtle top atmosphere shade for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* 3-Column Triptych Grid Overlay with Staggered Entrance Animation */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-4 divide-black h-full pointer-events-none">
          {/* Panel 1 (Staggered Delay 1) */}
          <div
            className={`relative h-full p-5 sm:p-7 md:p-8 flex flex-col justify-end transition-all duration-1000 ease-out ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '120ms' }}
          >
            {/* Bottom Left: Microcopy with enhanced contrast */}
            <div
              className="transition-transform duration-300 ease-out will-change-transform"
              style={{
                transform: `translate3d(${mouseOffset.x * 6}px, ${
                  mouseOffset.y * 4
                }px, 0)`,
              }}
            >
              <p className="font-sans font-bold text-xs sm:text-[13px] text-[#F2EAD3] leading-snug tracking-tight max-w-[220px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                Crafting experiences
                <br />
                that elevate, engage,
                <br />
                and resonate.
              </p>
            </div>
          </div>

          {/* Panel 2 (Staggered Delay 2) */}
          <div
            className={`relative h-full p-5 sm:p-7 md:p-8 flex flex-col justify-end transition-all duration-1000 ease-out ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {/* Bottom Left: Microcopy with enhanced contrast */}
            <div
              className="transition-transform duration-300 ease-out will-change-transform"
              style={{
                transform: `translate3d(${mouseOffset.x * 6}px, ${
                  mouseOffset.y * 4
                }px, 0)`,
              }}
            >
              <p className="font-sans font-bold text-xs sm:text-[13px] text-[#F2EAD3] leading-snug tracking-tight max-w-[240px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                bridging the space between
                <br />
                bold concepts and digital
                <br />
                reality.
              </p>
            </div>
          </div>

          {/* Panel 3 (Staggered Delay 3) */}
          <div
            className={`relative h-full p-5 sm:p-7 md:p-8 flex flex-col justify-end transition-all duration-1000 ease-out ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '480ms' }}
          >
            {/* Bottom Right / Panel 3: Quick Connect & Direct Resume */}
            <div
              className="pointer-events-auto transition-transform duration-300 ease-out will-change-transform flex flex-col gap-2.5"
              style={{
                transform: `translate3d(${mouseOffset.x * 6}px, ${
                  mouseOffset.y * 4
                }px, 0)`,
              }}
            >
              <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#F2EAD3]/75 uppercase font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                Quick Connect & Resume
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {/* Direct Resume Button */}
                <a
                  href="https://drive.google.com/file/d/1kV8vszzS_x0X5hERGjaIGIO7S-VXMtN_/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Direct Resume PDF"
                  className="group inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F2EAD3] hover:bg-white text-[#0A0A0A] font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/Rafns"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/60 hover:bg-[#F2EAD3] border border-white/15 hover:border-[#F2EAD3] text-neutral-300 hover:text-black backdrop-blur-md transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
                >
                  <Github className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:scale-110" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/rafael-nandana-s-814257314"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/60 hover:bg-[#F2EAD3] border border-white/15 hover:border-[#F2EAD3] text-neutral-300 hover:text-black backdrop-blur-md transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
                >
                  <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:scale-110" />
                </a>

                {/* Email */}
                <a
                  href="mailto:nandana.sambodo@gmail.com"
                  aria-label="Send Email"
                  className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/60 hover:bg-[#F2EAD3] border border-white/15 hover:border-[#F2EAD3] text-neutral-300 hover:text-black backdrop-blur-md transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
                >
                  <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:scale-110" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Giant Centered Typography across all 3 panels: "HI I'M RAFA" with Luxury Reveal from Bottom */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-2 sm:px-6 overflow-hidden">
          <motion.div
            className="will-change-transform z-10"
            animate={{
              x: mouseOffset.x * 14,
              y: mouseOffset.y * 10,
              rotateX: -mouseOffset.y * 3,
              rotateY: mouseOffset.x * 4,
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{ perspective: 1000 }}
          >
            {/* Fixed Spacing & Letter-spacing: Clean gap separation between HI, I'M, and RAFA */}
            <h1
              id="hero-title"
              className="font-display flex items-center justify-center gap-3 sm:gap-6 md:gap-8 lg:gap-11 font-black text-[#FFFFFF] drop-shadow-[0_16px_50px_rgba(0,0,0,0.85)] select-none text-center leading-none whitespace-nowrap text-4xl sm:text-6xl md:text-8xl lg:text-[8.4rem] xl:text-[9.5rem]"
              style={{
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}
            >
              {/* Word 1: HI */}
              <span className="inline-flex overflow-hidden py-1">
                {['H', 'I'].map((char, index) => (
                  <motion.span
                    key={`hi-${index}`}
                    initial={{ y: '130%', opacity: 0, rotateX: 55, filter: 'blur(10px)' }}
                    animate={
                      isLoaded
                        ? { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)' }
                        : { y: '130%', opacity: 0, rotateX: 55, filter: 'blur(10px)' }
                    }
                    transition={{
                      duration: 0.95,
                      delay: 0.35 + index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{
                      y: -10,
                      scale: 1.06,
                      color: '#F2EAD3',
                      textShadow: '0 0 30px rgba(242, 234, 211, 0.7)',
                      transition: { type: 'spring', stiffness: 450, damping: 14 },
                    }}
                    className="inline-block pointer-events-auto cursor-default transition-colors duration-200"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              {/* Word 2: I'M */}
              <span className="inline-flex overflow-hidden py-1">
                {['I', "'", 'M'].map((char, index) => (
                  <motion.span
                    key={`im-${index}`}
                    initial={{ y: '130%', opacity: 0, rotateX: 55, filter: 'blur(10px)' }}
                    animate={
                      isLoaded
                        ? { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)' }
                        : { y: '130%', opacity: 0, rotateX: 55, filter: 'blur(10px)' }
                    }
                    transition={{
                      duration: 0.95,
                      delay: 0.52 + index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{
                      y: -10,
                      scale: 1.06,
                      color: '#F2EAD3',
                      textShadow: '0 0 30px rgba(242, 234, 211, 0.7)',
                      transition: { type: 'spring', stiffness: 450, damping: 14 },
                    }}
                    className="inline-block pointer-events-auto cursor-default transition-colors duration-200"
                    style={{ letterSpacing: char === "'" ? '0.01em' : '-0.02em' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              {/* Word 3: RAFA */}
              <span className="inline-flex overflow-hidden py-1">
                {['R', 'A', 'F', 'A'].map((char, index) => (
                  <motion.span
                    key={`rafa-${index}`}
                    initial={{ y: '130%', opacity: 0, rotateX: 55, filter: 'blur(10px)' }}
                    animate={
                      isLoaded
                        ? { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)' }
                        : { y: '130%', opacity: 0, rotateX: 55, filter: 'blur(10px)' }
                    }
                    transition={{
                      duration: 0.95,
                      delay: 0.78 + index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{
                      y: -10,
                      scale: 1.06,
                      color: '#F2EAD3',
                      textShadow: '0 0 35px rgba(242, 234, 211, 0.8)',
                      transition: { type: 'spring', stiffness: 450, damping: 14 },
                    }}
                    className="inline-block pointer-events-auto cursor-default transition-colors duration-200"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Professional Subtitle Role */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={
                isLoaded
                  ? { y: 0, opacity: 1 }
                  : { y: 20, opacity: 0 }
              }
              transition={{
                duration: 0.85,
                delay: 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-3 sm:mt-5 flex items-center justify-center gap-2 sm:gap-3 pointer-events-auto"
            >
              <span className="hidden sm:inline-block h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#F2EAD3]/50" />
              <span className="font-mono text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.22em] sm:tracking-[0.28em] text-[#F2EAD3] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                AI Engineer & Data · Intelligent Systems
              </span>
              <span className="hidden sm:inline-block h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#F2EAD3]/50" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Architectural Hatch Pattern Stripe & Scroll Indicator (Point 2) */}
      <div className="w-full flex items-center justify-between pt-3 pb-1 text-neutral-500 font-mono text-[11px] sm:text-xs select-none">
        <div className="hidden sm:block opacity-40 overflow-hidden truncate max-w-[30%]">
          {slashPattern}
        </div>

        {/* Scroll Cue Action */}
        <button
          type="button"
          onClick={onLearnMore}
          className="mx-auto inline-flex items-center gap-2 text-[#F2EAD3]/85 hover:text-white px-4 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#F2EAD3]/40 transition-all duration-300 cursor-pointer group shadow-lg"
        >
          <span className="tracking-[0.2em] uppercase font-mono text-[10px] sm:text-[11px] font-medium">
            Scroll to explore
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#F2EAD3] group-hover:translate-y-0.5 transition-transform animate-bounce" />
        </button>

        <div className="hidden sm:block opacity-40 overflow-hidden truncate max-w-[30%]">
          {slashPattern}
        </div>
      </div>
    </section>
  );
};
