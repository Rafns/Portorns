import React, { useState } from 'react';
import { profileData } from '../data/portfolioData';
import { Mail, Github, Linkedin, ArrowUpRight, ArrowRight, Check, Copy } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-16 py-24 sm:py-32 bg-transparent text-white overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Headline, Bio Text, Download Resume */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 sm:space-y-10">
            <div>
              {/* Massive Bold Headline: LET'S WORK TOGETHER */}
              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFFFF] leading-[1.05] uppercase mb-6">
                LET'S WORK <br />
                <span className="text-[#F2EAD3] underline decoration-white/20 underline-offset-8">
                  TOGETHER
                </span>
              </h2>

              {/* Description Body */}
              <p className="font-sans text-sm sm:text-base text-[#F2EAD3]/90 font-medium leading-relaxed max-w-xl">
                I am actively seeking research collaborations, industry internships, and innovative engineering challenges in Artificial Intelligence, Machine Learning, and Intelligent Software Systems.
              </p>
            </div>

            {/* Resume Download Action Button */}
            <div>
              <a
                href="https://drive.google.com/file/d/1DoH40GstAaanhfjMFm1EpzKf4gSxK7zB/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#F2EAD3] text-[#0A0A0A] font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl group cursor-pointer"
              >
                <span>DOWNLOAD RESUME</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: 3 Contact Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4 w-full">
            
            {/* Card 01: EMAIL */}
            <div
              onClick={handleCopyEmail}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCopyEmail();
                }
              }}
              className="group relative bg-[#0E1015]/80 hover:bg-[#13161F] border border-white/[0.08] hover:border-white/[0.18] rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer flex items-center justify-between shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center gap-4 min-w-0 pr-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-300 group-hover:text-white transition-colors shrink-0">
                  <Mail className="w-5 h-5 text-[#F2EAD3]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono tracking-widest text-[#F2EAD3]/70 uppercase font-semibold block mb-0.5">
                    EMAIL
                  </span>
                  <span className="text-sm sm:text-base font-mono font-medium text-white truncate block group-hover:text-[#F2EAD3] transition-colors">
                    {profileData.email}
                  </span>
                </div>
              </div>
              <div className="text-xs font-mono text-neutral-400 shrink-0">
                {copied ? (
                  <span className="text-emerald-400 font-medium inline-flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> COPIED
                  </span>
                ) : (
                  <Copy className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </div>

            {/* Card 02: GITHUB */}
            <a
              href="https://github.com/Rafns"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-[#0E1015]/80 hover:bg-[#13161F] border border-white/[0.08] hover:border-white/[0.18] rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer flex items-center justify-between shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center gap-4 min-w-0 pr-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-300 group-hover:text-white transition-colors shrink-0">
                  <Github className="w-5 h-5 text-[#F2EAD3]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono tracking-widest text-[#F2EAD3]/70 uppercase font-semibold block mb-0.5">
                    GITHUB
                  </span>
                  <span className="text-sm sm:text-base font-mono font-medium text-white truncate block group-hover:text-[#F2EAD3] transition-colors">
                    github.com/Rafns
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors shrink-0" />
            </a>

            {/* Card 03: LINKEDIN */}
            <a
              href="https://www.linkedin.com/in/rafael-nandana-s-814257314"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-[#0E1015]/80 hover:bg-[#13161F] border border-white/[0.08] hover:border-white/[0.18] rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer flex items-center justify-between shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center gap-4 min-w-0 pr-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-300 group-hover:text-white transition-colors shrink-0">
                  <Linkedin className="w-5 h-5 text-[#F2EAD3]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono tracking-widest text-[#F2EAD3]/70 uppercase font-semibold block mb-0.5">
                    LINKEDIN
                  </span>
                  <span className="text-sm sm:text-base font-mono font-medium text-white truncate block group-hover:text-[#F2EAD3] transition-colors">
                    linkedin.com/in/rafael-nandana-s-814257314
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors shrink-0" />
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};
