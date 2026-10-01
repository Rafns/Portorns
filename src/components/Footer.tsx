import React, { useState } from 'react';
import { SectionId } from '../types';
import { profileData } from '../data/portfolioData';
import { Mail, Linkedin, Github, ArrowUpRight, Check, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate?: (section: SectionId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative z-10 w-full overflow-hidden pt-12 sm:pt-16 pb-12 px-6 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Columns: Newsletter & Navigation Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-12">
          {/* Left Column: Newsletter Subscription */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display text-base sm:text-lg font-semibold text-[#FFFFFF] tracking-tight flex items-center gap-2">
              <span>Newsletter</span>
              <Sparkles className="w-3.5 h-3.5 text-[#F2EAD3]" />
            </h3>
            <p className="font-sans text-sm text-[#F2EAD3]/80 leading-relaxed max-w-sm">
              We'd love to share our latest research on intelligent systems, neural audio models, and thoughtful digital experiences with you.
            </p>

            {/* Form Input */}
            <form onSubmit={handleSubscribe} className="pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-md">
                <div className="relative flex-1">
                  <input
                    type="email"
                    id="newsletter-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-[#F2EAD3]/70 transition-all font-mono"
                  />
                </div>
                <button
                  type="submit"
                  id="newsletter-subscribe-btn"
                  className="px-5 py-2.5 rounded-xl bg-[#F2EAD3] text-[#0A0A0A] hover:bg-white active:scale-95 text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 shadow-sm font-mono"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Subscribed</span>
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-400 mt-2 font-mono">
                  Thank you! Welcome to the orbit.
                </p>
              )}
            </form>
          </div>

          {/* Right Columns: Three Link Columns & Socials */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {/* Column 1: Navigation */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-sm text-neutral-400">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('beranda')}
                    className="hover:text-white transition-colors duration-150 cursor-pointer text-left"
                  >
                    Beranda
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('about')}
                    className="hover:text-white transition-colors duration-150 cursor-pointer text-left"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('proyek')}
                    className="hover:text-white transition-colors duration-150 cursor-pointer text-left"
                  >
                    Projects
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('contact')}
                    className="hover:text-white transition-colors duration-150 cursor-pointer text-left"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Research & Focus */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#F2EAD3]/70">
                Focus
              </h4>
              <ul className="space-y-2.5 text-sm font-sans text-[#F2EAD3]/80">
                <li>
                  <span className="hover:text-white transition-colors duration-150 cursor-default">
                    Neural Audio
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors duration-150 cursor-default">
                    Multi-Agent AI
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors duration-150 cursor-default">
                    Bioacoustics ML
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors duration-150 cursor-default">
                    Design Systems
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 3: Connect & Social Icons */}
            <div className="space-y-3.5 col-span-2 sm:col-span-1">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#F2EAD3]/70">
                Connect
              </h4>
              <ul className="space-y-2.5 text-sm font-sans text-[#F2EAD3]/80">
                <li>
                  <a
                    href={`mailto:${profileData.email}`}
                    className="hover:text-white transition-colors duration-150"
                  >
                    Direct Mail
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/rafael-nandana-s-814257314"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-150 inline-flex items-center gap-1"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 text-[#F2EAD3]/50" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Rafns"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-150 inline-flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3 text-[#F2EAD3]/50" />
                  </a>
                </li>
              </ul>

              {/* Social Icon Pills */}
              <div className="pt-3 flex items-center gap-2.5">
                <a
                  href={`mailto:${profileData.email}`}
                  aria-label="Send Email"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/[0.08] flex items-center justify-center text-[#F2EAD3]/80 hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rafael-nandana-s-814257314"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/[0.08] flex items-center justify-center text-[#F2EAD3]/80 hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/Rafns"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/[0.08] flex items-center justify-center text-[#F2EAD3]/80 hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F2EAD3]/50 font-mono tracking-wide">
          <p>© {new Date().getFullYear()} {profileData.name}. All rights reserved.</p>
          <p className="text-[#F2EAD3]/40">
            Jakarta, Indonesia • Intelligent Systems & Thoughtful Experiences
          </p>
        </div>
      </div>
    </footer>
  );
};

