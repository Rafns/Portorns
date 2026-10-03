import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { profileData } from '../data/portfolioData';

const PORTRAIT_URL = '/assets/rafael_nandana_portrait.jpg';

export const AboutSection: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Real-time 3D tilt and glare calculation based on cursor position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle, elegant degree tilt max (-10 to +10 deg)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  return (
    <section
      id="about"
      className="relative min-h-[90vh] flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-20 sm:py-28 select-none"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: 3D Interactive Holographic Portrait Card */}
          <div className="lg:col-span-5 flex justify-center perspective-[1000px]">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              animate={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
                scale: isHovered ? 1.025 : 1,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              id="about-portrait-card"
              className="relative w-full max-w-sm sm:max-w-md rounded-3xl p-1 bg-gradient-to-br from-white/[0.18] via-white/[0.05] to-transparent shadow-2xl shadow-black/90 cursor-pointer group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Portrait Container with Holographic Glare */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-[#0A0A0E] border border-white/[0.08] flex items-center justify-center">
                {/* Photo Image */}
                <img
                  src={PORTRAIT_URL}
                  alt={profileData.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.98] contrast-[1.03]"
                />

                {/* Dynamic Mouse Glare (Light reflection sheen following cursor) */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: isHovered ? 0.4 : 0,
                    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)`,
                  }}
                />

                {/* Subtle dark vignette overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio & Personal Details Glass Panel */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="rounded-3xl bg-[#111115] border border-neutral-800 p-6 sm:p-10 shadow-2xl shadow-black/60">
              
              {/* Top Section */}
              <div id="about-intro-statement" className="space-y-4">
                {/* Name Heading */}
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FFFFFF] select-none">
                  {profileData.name}
                </h2>

                {/* Core Highlighted Statement */}
                <p className="font-sans text-base sm:text-lg text-[#F2EAD3] font-medium leading-relaxed">
                  I am Undergraduate Computer Science student at BINUS University aspiring to pursue a career in{' '}
                  <span className="text-[#FFFFFF] font-bold underline decoration-[#F2EAD3] decoration-2 underline-offset-4">
                    Artificial Intelligence and Data
                  </span>
                  , with interests in Machine Learning, Deep Learning, Natural Language Processing, and applied research.
                </p>

                {/* Description Paragraph */}
                <p className="font-sans text-sm sm:text-base text-[#F2EAD3]/90 font-medium leading-relaxed">
                  Experienced in developing technology-driven projects and exploring data-driven and intelligent solutions to real-world problems. Passionate about building impactful technology and continuously learning, developing new skills, and keeping up with emerging technologies in AI and data.
                </p>
              </div>

              {/* Divider Line */}
              <div className="w-full h-px bg-white/[0.08] my-8 sm:my-10" />

              {/* Specifications / Details Grid matching Gambar 2 style */}
              <div
                id="about-specs-grid"
                className="grid grid-cols-1 sm:grid-cols-2 gap-y-7 gap-x-10"
              >
                {/* FOCUS */}
                <div id="spec-focus">
                  <span className="block text-xs font-semibold tracking-widest text-[#F2EAD3]/70 uppercase mb-1.5 font-mono">
                    Focus
                  </span>
                  <p className="text-base sm:text-lg text-[#FFFFFF] font-medium">
                    {profileData.focus || 'Artificial Intelligence & Data'}
                  </p>
                </div>

                {/* AGE / BASE */}
                <div id="spec-age-base">
                  <span className="block text-xs font-semibold tracking-widest text-[#F2EAD3]/70 uppercase mb-1.5 font-mono">
                    Age / Base
                  </span>
                  <p className="text-base sm:text-lg text-[#FFFFFF] font-medium">
                    {profileData.ageBase || '20 / Jakarta, Indonesia'}
                  </p>
                </div>

                {/* INTERESTS */}
                <div id="spec-interests">
                  <span className="block text-xs font-semibold tracking-widest text-[#F2EAD3]/70 uppercase mb-1.5 font-mono">
                    Interests
                  </span>
                  <p className="text-base sm:text-lg text-[#FFFFFF] font-medium">
                    {profileData.interests || 'AI, Sports & Gaming'}
                  </p>
                </div>

                {/* GPA */}
                <div id="spec-gpa">
                  <span className="block text-xs font-semibold tracking-widest text-[#F2EAD3]/70 uppercase mb-1.5 font-mono">
                    GPA
                  </span>
                  <p className="text-base sm:text-lg text-[#FFFFFF] font-medium font-mono">
                    {profileData.gpa || '3.89'}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
