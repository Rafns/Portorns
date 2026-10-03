import React, { useState, useRef, useEffect } from 'react';
import { journeyExperiences } from '../data/journeyData';
import { JourneyExperience } from '../types';
import {
  Building2,
  Calendar,
  GraduationCap,
  Code2,
  Cpu,
  Maximize2,
  X,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CareerSection: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<JourneyExperience | null>(null);

  // References to compute exact SVG zig-zag coordinates between the milestone nodes
  const containerRef = useRef<HTMLDivElement | null>(null);
  const node1Ref = useRef<HTMLDivElement | null>(null);
  const node2Ref = useRef<HTMLDivElement | null>(null);
  const node3Ref = useRef<HTMLDivElement | null>(null);

  const [pathData, setPathData] = useState<{
    linePath: string;
    ambientPath: string;
    mid1: { x: number; y: number };
    mid2?: { x: number; y: number } | null;
  } | null>(null);

  // Re-calculate the zig-zag line path whenever layout changes or window resizes
  useEffect(() => {
    const calculateZigZag = () => {
      if (!containerRef.current || !node1Ref.current) {
        return;
      }

      const cRect = containerRef.current.getBoundingClientRect();
      const r1 = node1Ref.current.getBoundingClientRect();

      const p1 = {
        x: r1.left - cRect.left + r1.width / 2,
        y: r1.top - cRect.top + r1.height / 2,
      };

      const topExtensionY = Math.max(0, p1.y - 70);

      if (node2Ref.current && node3Ref.current) {
        const r2 = node2Ref.current.getBoundingClientRect();
        const r3 = node3Ref.current.getBoundingClientRect();
        const p2 = {
          x: r2.left - cRect.left + r2.width / 2,
          y: r2.top - cRect.top + r2.height / 2,
        };
        const p3 = {
          x: r3.left - cRect.left + r3.width / 2,
          y: r3.top - cRect.top + r3.height / 2,
        };
        const mid1 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
        const mid2 = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2 };
        const bottomExtensionY = p3.y + 70;
        const pathStr = `M ${p1.x} ${topExtensionY} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p3.x} ${bottomExtensionY}`;

        setPathData({
          linePath: pathStr,
          ambientPath: pathStr,
          mid1,
          mid2,
        });
      } else if (node2Ref.current) {
        const r2 = node2Ref.current.getBoundingClientRect();
        const p2 = {
          x: r2.left - cRect.left + r2.width / 2,
          y: r2.top - cRect.top + r2.height / 2,
        };
        const mid1 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
        const bottomExtensionY = p2.y + 70;
        const pathStr = `M ${p1.x} ${topExtensionY} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p2.x} ${bottomExtensionY}`;

        setPathData({
          linePath: pathStr,
          ambientPath: pathStr,
          mid1,
          mid2: null,
        });
      } else {
        const bottomExtensionY = p1.y + 70;
        const pathStr = `M ${p1.x} ${topExtensionY} L ${p1.x} ${p1.y} L ${p1.x} ${bottomExtensionY}`;
        setPathData({
          linePath: pathStr,
          ambientPath: pathStr,
          mid1: p1,
          mid2: null,
        });
      }
    };

    calculateZigZag();

    // Recalculate on window resize or load
    window.addEventListener('resize', calculateZigZag);
    const timer = setTimeout(calculateZigZag, 250);

    return () => {
      window.removeEventListener('resize', calculateZigZag);
      clearTimeout(timer);
    };
  }, []);

  const getMilestoneIcon = (id: string) => {
    switch (id) {
      case 'exp-01':
        return <GraduationCap className="w-4 h-4 text-neutral-300" />;
      case 'exp-02':
        return <Code2 className="w-4 h-4 text-neutral-300" />;
      case 'exp-03':
        return <Cpu className="w-4 h-4 text-neutral-300" />;
      default:
        return <Building2 className="w-4 h-4 text-neutral-300" />;
    }
  };

  const exp1 = journeyExperiences[0];
  const exp2 = journeyExperiences[1];
  const exp3 = journeyExperiences[2];

  return (
    <section
      id="experience"
      className="relative min-h-screen bg-transparent text-white px-5 sm:px-10 lg:px-16 py-24 sm:py-32 overflow-hidden select-none"
    >
      {/* Background Topographic Wave Contours (Minimalist & Blended) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.035]">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 180 C 400 240, 800 120, 1200 220 C 1400 270, 1500 190, 1600 210"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />
          <path
            d="M 0 380 C 350 310, 700 450, 1100 370 C 1350 310, 1500 420, 1600 390"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />
          <path
            d="M 0 580 C 450 660, 900 520, 1250 610 C 1450 660, 1550 580, 1600 600"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />
          <path
            d="M 0 780 C 380 720, 850 850, 1300 760 C 1480 720, 1550 800, 1600 780"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header with Fade & Rise Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 sm:mb-20 text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">
            Experience
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 font-normal tracking-wide leading-relaxed">
            A chronological journey through academic education and technical organizations.
          </p>
        </motion.div>

        {/* ============================================================== */}
        {/* ZIG-ZAG TIMELINE CONTAINER                                      */}
        {/* ============================================================== */}
        <div ref={containerRef} className="relative w-full">
          {/* Dynamic SVG Zig-Zag Line matching background with self-drawing animation */}
          {pathData && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Minimalist Zig-Zag Gradient: Translucent Silver/White adapting to #080808 background */}
                <linearGradient id="zigZagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.04" />
                  <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.22" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.32" />
                  <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.04" />
                </linearGradient>

                {/* Subtle Ambient Shadow Line */}
                <linearGradient id="zigZagAmbientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#27272A" stopOpacity="0.05" />
                  <stop offset="50%" stopColor="#3F3F46" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#27272A" stopOpacity="0.05" />
                </linearGradient>

                {/* Soft Ethereal Bloom */}
                <filter id="zigZagBloom" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Ambient Understroke with progressive path animation */}
              <motion.path
                d={pathData.ambientPath}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                stroke="url(#zigZagAmbientGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Primary Zig-Zag Line with self-drawing reveal */}
              <motion.path
                d={pathData.linePath}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                stroke="url(#zigZagGrad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#zigZagBloom)"
                fill="none"
              />

              {/* Faint dotted accent track */}
              <motion.path
                d={pathData.linePath}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="0.8"
                strokeDasharray="4 8"
                fill="none"
              />

              {/* Subtle directional flow marker dots at mid-segments */}
              {pathData.mid1 && (
                <motion.circle
                  cx={pathData.mid1.x}
                  cy={pathData.mid1.y}
                  r="2.5"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.4 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  fill="#FFFFFF"
                />
              )}
              {pathData.mid2 && (
                <motion.circle
                  cx={pathData.mid2.x}
                  cy={pathData.mid2.y}
                  r="2.5"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.4 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ delay: 1.1, duration: 0.4 }}
                  fill="#FFFFFF"
                />
              )}
            </svg>
          )}

          {/* Grid rows creating the Zig-Zag flow: Left (01) -> Right (02) -> Left (03) */}
          <div className="flex flex-col gap-16 sm:gap-24 lg:gap-28 relative z-10">

            {/* ========================================================== */}
            {/* ROW 1: MILESTONE 01 — BINUS UNIVERSITY (LEFT SIDE)         */}
            {/* ========================================================== */}
            {exp1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Milestone Card 01 with Pop / Slide Animation */}
                <motion.div
                  initial={{ opacity: 0, x: -35, scale: 0.96 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-6 relative"
                >
                  {/* Anchor Node Ref 1 with Spring Pop */}
                  <motion.div
                    ref={node1Ref}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20, delay: 0.3 }}
                    className="absolute -top-3 -right-3 lg:top-1/2 lg:-right-6 -translate-y-1/2 z-20"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#080808] border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.08)] group-hover:border-white/40 transition-colors relative">
                      <motion.div
                        animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0.6, 0.2] }}
                        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                        className="absolute inset-0 rounded-full bg-white/10"
                      />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/90 relative z-10" />
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedExperience(exp1)}
                    className="group relative bg-[#0E1015]/80 hover:bg-[#131620] border border-white/[0.08] hover:border-white/[0.22] rounded-2xl sm:rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.85)] cursor-pointer"
                  >
                    {/* Top Bar: Number & Period */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-mono font-bold text-neutral-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-full">
                          {exp1.number}
                        </span>
                        <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 opacity-60" />
                          {exp1.year}
                        </span>
                      </div>
                      <div className="w-7 h-7 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                        {getMilestoneIcon(exp1.id)}
                      </div>
                    </div>

                    {/* Title & Role */}
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1 group-hover:text-neutral-100 transition-colors">
                      {exp1.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-medium mb-4 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 opacity-60 shrink-0" />
                      <span>{exp1.role}</span>
                    </p>

                    {/* Image Banner */}
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-neutral-950 border border-white/[0.08] flex items-center justify-center">
                      <img
                        src={exp1.imageUrl}
                        alt={exp1.imageAlt}
                        className="w-full h-full object-cover brightness-95 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3">
                        <span className="p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed mb-4">
                      {exp1.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-white/[0.06]">
                      {exp1.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono tracking-wider uppercase text-neutral-400 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Column: Architectural Context / Milestone Indicator */}
                <motion.div
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden lg:flex lg:col-span-6 flex-col justify-center pl-6"
                >
                  <div className="max-w-md">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] text-neutral-500 block mb-2">
                      01 / 03 — ACADEMIC FOUNDATION
                    </span>
                    <h4 className="text-xl font-bold tracking-tight text-white mb-2">
                      Formal Computer Science & Intelligent Systems
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Pursuing undergraduate studies at BINUS University @ Malang, establishing deep foundations in linear algebra, algorithms, discrete structures, and artificial intelligence methodology.
                    </p>
                  </div>
                </motion.div>
              </div>
            )}

            {/* ========================================================== */}
            {/* ROW 2: MILESTONE 02 — BNCC (RIGHT SIDE — ZIG)              */}
            {/* ========================================================== */}
            {exp2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Architectural Context / Milestone Indicator */}
                <motion.div
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden lg:flex lg:col-span-6 flex-col justify-center items-end text-right pr-6"
                >
                  <div className="max-w-md">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] text-neutral-500 block mb-2">
                      02 / 03 — TECHNICAL COMMUNITY & LAB
                    </span>
                    <h4 className="text-xl font-bold tracking-tight text-white mb-2">
                      Practical Engineering & Leadership
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Participating in BNCC Learning & Training to accelerate hands-on software development, peer code reviews, collaborative sprints, and developer ecosystem building.
                    </p>
                  </div>
                </motion.div>

                {/* Right Column: Milestone Card 02 with Pop / Slide Animation */}
                <motion.div
                  initial={{ opacity: 0, x: 35, scale: 0.96 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-6 relative"
                >
                  {/* Anchor Node Ref 2 with Spring Pop */}
                  <motion.div
                    ref={node2Ref}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20, delay: 0.3 }}
                    className="absolute -top-3 -left-3 lg:top-1/2 lg:-left-6 -translate-y-1/2 z-20"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#080808] border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.08)] group-hover:border-white/40 transition-colors relative">
                      <motion.div
                        animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0.6, 0.2] }}
                        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                        className="absolute inset-0 rounded-full bg-white/10"
                      />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/90 relative z-10" />
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedExperience(exp2)}
                    className="group relative bg-[#0E1015]/80 hover:bg-[#131620] border border-white/[0.08] hover:border-white/[0.22] rounded-2xl sm:rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.85)] cursor-pointer"
                  >
                    {/* Top Bar: Number & Period */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-mono font-bold text-neutral-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-full">
                          {exp2.number}
                        </span>
                        <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 opacity-60" />
                          {exp2.year}
                        </span>
                      </div>
                      <div className="w-7 h-7 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                        {getMilestoneIcon(exp2.id)}
                      </div>
                    </div>

                    {/* Title & Role */}
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1 group-hover:text-neutral-100 transition-colors">
                      {exp2.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-medium mb-4 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 opacity-60 shrink-0" />
                      <span>{exp2.role}</span>
                    </p>

                    {/* Image Banner */}
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-neutral-950 border border-white/[0.08] flex items-center justify-center">
                      <img
                        src={exp2.imageUrl}
                        alt={exp2.imageAlt}
                        className="w-full h-full object-contain bg-white p-6 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3">
                        <span className="p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed mb-4">
                      {exp2.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-white/[0.06]">
                      {exp2.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono tracking-wider uppercase text-neutral-400 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )}

            {/* ========================================================== */}
            {/* ROW 3: MILESTONE 03 — AI RESEARCHER (LEFT SIDE — ZAG)      */}
            {/* ========================================================== */}
            {exp3 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Milestone Card 03 with Pop / Slide Animation */}
                <motion.div
                  initial={{ opacity: 0, x: -35, scale: 0.96 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-6 relative"
                >
                  {/* Anchor Node Ref 3 with Spring Pop */}
                  <motion.div
                    ref={node3Ref}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20, delay: 0.3 }}
                    className="absolute -top-3 -right-3 lg:top-1/2 lg:-right-6 -translate-y-1/2 z-20"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#080808] border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.08)] group-hover:border-white/40 transition-colors relative">
                      <motion.div
                        animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0.6, 0.2] }}
                        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                        className="absolute inset-0 rounded-full bg-white/10"
                      />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/90 relative z-10" />
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedExperience(exp3)}
                    className="group relative bg-[#0E1015]/80 hover:bg-[#131620] border border-white/[0.08] hover:border-white/[0.22] rounded-2xl sm:rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.85)] cursor-pointer"
                  >
                    {/* Top Bar: Number & Period */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-mono font-bold text-neutral-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-full">
                          {exp3.number}
                        </span>
                        <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 opacity-60" />
                          {exp3.year}
                        </span>
                      </div>
                      <div className="w-7 h-7 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                        {getMilestoneIcon(exp3.id)}
                      </div>
                    </div>

                    {/* Title & Role */}
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1 group-hover:text-neutral-100 transition-colors">
                      {exp3.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-medium mb-4 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 opacity-60 shrink-0" />
                      <span>{exp3.role}</span>
                    </p>

                    {/* Image Banner */}
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-neutral-950 border border-white/[0.08] flex items-center justify-center">
                      <img
                        src={exp3.imageUrl}
                        alt={exp3.imageAlt}
                        className="w-full h-full object-cover brightness-95 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3">
                        <span className="p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed mb-4">
                      {exp3.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-white/[0.06]">
                      {exp3.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono tracking-wider uppercase text-neutral-400 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Column: Architectural Context / Milestone Indicator */}
                <motion.div
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden lg:flex lg:col-span-6 flex-col justify-center pl-6"
                >
                  <div className="max-w-md">
                    <h4 className="text-xl font-bold tracking-tight text-white mb-2">
                      Machine Learning, Deep Models & NLP
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Investigating machine learning pipelines, transformer architectures, and applied research that bridges theoretical models into impactful real-world software solutions.
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA to Projects with Smooth Rise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-24 text-center"
        >
          <a
            href="#proyek"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-all duration-300 hover:scale-105"
          >
            <span>DISCOVER RESEARCH & PROJECTS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>

      {/* Modal View for Experience Details */}
      <AnimatePresence>
        {selectedExperience && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExperience(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-[#0E1118] border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
            >
              <button
                onClick={() => setSelectedExperience(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-[11px] font-mono font-bold text-neutral-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-full">
                  {selectedExperience.number}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {selectedExperience.year}
                </span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-white mb-1">
                {selectedExperience.title}
              </h3>
              {selectedExperience.role && (
                <p className="text-sm text-neutral-400 font-medium mb-4 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 opacity-60" />
                  <span>{selectedExperience.role}</span>
                </p>
              )}

              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-neutral-950 border border-white/[0.08] flex items-center justify-center">
                <img
                  src={selectedExperience.imageUrl}
                  alt={selectedExperience.imageAlt}
                  className={`w-full h-full ${
                    selectedExperience.bgWhite
                      ? 'object-contain bg-white p-8'
                      : 'object-cover brightness-95'
                  }`}
                />
              </div>

              <p className="text-sm text-neutral-300 font-normal leading-relaxed mb-6">
                {selectedExperience.shortDescription}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.08]">
                {selectedExperience.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono tracking-wider uppercase text-neutral-300 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
