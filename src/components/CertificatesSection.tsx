import React from 'react';
import { certificatesData } from '../data/certificateData';
import {
  Award,
  Calendar,
  ExternalLink,
} from 'lucide-react';

export const CertificatesSection: React.FC = () => {
  return (
    <section
      id="certifications"
      className="relative px-4 sm:px-8 lg:px-14 py-24 sm:py-32 bg-transparent text-white overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3">
            Certifications
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 font-normal tracking-wide max-w-xl leading-relaxed">
            Verified certifications in cloud intelligence, AI services, and systems programming.
          </p>
        </div>

        {/* Certificate Stack Container — Blended seamlessly with dark background */}
        <div className="relative rounded-2xl bg-white/[0.015] border border-white/[0.07] hover:border-white/[0.12] transition-colors duration-300 shadow-[0_16px_45px_rgba(0,0,0,0.7)] overflow-hidden">
          {certificatesData.map((cert, index) => {
            const isLast = index === certificatesData.length - 1;

            return (
              <a
                key={cert.id}
                id={`cert-item-${cert.id}`}
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open ${cert.title}`}
                className={`group relative p-6 sm:p-8 transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 block hover:bg-white/[0.03] active:scale-[0.998] ${
                  !isLast ? 'border-b border-white/[0.06]' : ''
                }`}
              >
                {/* Left Active/Accent Indicator Line on Hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white opacity-0 group-hover:opacity-100 shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300" />

                {/* Left: Category Pill Tag with White Text */}
                <div className="md:w-36 shrink-0">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[10px] font-mono font-medium tracking-wider uppercase border border-neutral-700/80 text-white bg-neutral-900/60 group-hover:border-neutral-500 transition-colors">
                    {cert.category}
                  </span>
                </div>

                {/* Center: Title & Metadata — Crisp White & Original Typography */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-white transition-colors">
                      {cert.title}
                    </h3>
                  </div>

                  {/* Metadata Row: Issuer & Date with Crisp White Font */}
                  <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs font-mono">
                    {/* Issuer */}
                    <div className="flex items-center gap-1.5 text-white">
                      <Award className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="tracking-wide uppercase font-medium">{cert.issuer}</span>
                    </div>

                    <span className="text-neutral-500 hidden sm:inline">•</span>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-white">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="font-medium">{cert.date}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Circular External Link Action Button */}
                <div className="shrink-0 flex items-center justify-end">
                  <div
                    aria-label={`Open ${cert.title}`}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-neutral-700/80 bg-neutral-900/80 group-hover:border-neutral-500 group-hover:bg-neutral-800/90 text-neutral-300 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
