import React from 'react';
import { profileData } from '../data/portfolioData';

const PORTRAIT_URL = '/assets/rafael_nandana_portrait.jpg';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-[90vh] flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-20 sm:py-28"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Main 2-column layout matching reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clean Portrait Card with user uploaded photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              id="about-portrait-card"
              className="relative w-full max-w-sm sm:max-w-md rounded-3xl overflow-hidden bg-[#111115] border border-neutral-800 shadow-2xl shadow-black/80 group"
            >
              {/* Portrait Container - Clean & Pristine */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0A0A0E] flex items-center justify-center">
                <img
                  src={PORTRAIT_URL}
                  alt={profileData.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Personal Details Glass Panel */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="rounded-3xl bg-[#111115] border border-neutral-800 p-6 sm:p-10 shadow-2xl shadow-black/60">
              
              {/* Top Section: Replaced with Gambar 2 content */}
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
