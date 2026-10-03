import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileText,
  Github,
  MonitorPlay,
  Share2,
  CheckCircle2,
  Lightbulb,
  UserCheck,
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onPlaySoundSample?: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onPlaySoundSample,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project?.id]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  // Resolve gallery images
  const galleryImages: string[] =
    project.images && project.images.length > 0
      ? project.images
      : project.imageUrl
      ? [project.imageUrl]
      : [];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (galleryImages.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (galleryImages.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const getLinkIcon = (type?: string, label?: string) => {
    const text = (label || '').toLowerCase();
    if (type === 'paper' || text.includes('paper') || text.includes('research')) {
      return <FileText className="w-4 h-4 text-amber-400/90 shrink-0" />;
    }
    if (type === 'github' || text.includes('github') || text.includes('code')) {
      return <Github className="w-4 h-4 text-neutral-300 shrink-0" />;
    }
    if (
      type === 'presentation' ||
      text.includes('presentation') ||
      text.includes('canva') ||
      text.includes('demo') ||
      text.includes('figma') ||
      text.includes('prototype')
    ) {
      return <MonitorPlay className="w-4 h-4 text-emerald-400/90 shrink-0" />;
    }
    return <ExternalLink className="w-4 h-4 text-[#38BDF8] shrink-0" />;
  };

  // Fallback data if some fields are missing
  const roleText = project.role || 'ML Coder & ML Researcher';
  const clientText = project.client || 'Academic Research & Course Project';
  const dateText = project.date || project.year;

  const defaultLinks = project.links && project.links.length > 0
    ? project.links
    : [
        { label: 'GitHub Repository', url: project.githubUrl || 'https://github.com/nandana-sambodo', icon: 'github' as const },
        { label: 'Live Demonstration', url: project.demoUrl || '#', icon: 'presentation' as const },
      ];

  const aboutParagraphs = project.aboutParagraphs && project.aboutParagraphs.length > 0
    ? project.aboutParagraphs
    : [
        project.description,
        project.longDescription,
      ];

  const roleContributions = project.roleContributions && project.roleContributions.length > 0
    ? project.roleContributions
    : [
        'System Architecture & Pipeline Coding: Formulated the end-to-end data pipeline, feature engineering protocols, and predictive modeling harnesses in Python.',
        'Data Validation & Leakage Prevention: Enforced strict validation splits and normalization routines to guarantee high reliability and avoid metric distortion.',
        'Algorithm Benchmarking: Systematically compared multiple statistical and machine learning algorithms to isolate optimal performance tradeoffs.',
      ];

  const whatILearned = project.whatILearned && project.whatILearned.length > 0
    ? project.whatILearned
    : [
        'Architectural Rigor: Designing machine learning pipelines where validation partitions strictly encapsulate all data normalization and feature selection stages.',
        'Methodological Integrity: Avoiding common data-leakage pitfalls that yield falsely optimistic performance on complex multidimensional datasets.',
        'Bridging Theory & Code: Translating formal mathematical formulations into clean, modular, and maintainable software implementations.',
      ];

  return (
    <div
      id="project-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#090D14] border border-white/[0.08] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] text-neutral-200 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Top Close Button */}
        <button
          id="modal-close-btn"
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 text-neutral-400 hover:text-white rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center transition-all cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ========================================================== */}
        {/* TOP SECTION: 2 COLUMNS (IMAGE GALLERY & METADATA/RESOURCES) */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Gallery Preview with Navigation & Pagination */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[#05070B] flex items-center justify-center group shadow-inner">
              {galleryImages.length > 0 ? (
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={`${project.title} slide ${currentImageIndex + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-2 sm:p-3 transition-opacity duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-600 text-sm font-mono">
                  No preview image available
                </div>
              )}

              {/* Prev Button (if multiple images) */}
              {galleryImages.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 hover:bg-black border border-white/15 text-white flex items-center justify-center transition-all shadow-lg active:scale-95 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Next Button (if multiple images) */}
              {galleryImages.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 hover:bg-black border border-white/15 text-white flex items-center justify-center transition-all shadow-lg active:scale-95 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Pagination Controls & Counter */}
            <div className="flex items-center justify-between mt-3.5 px-1">
              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      idx === currentImageIndex
                        ? 'w-6 h-2 bg-[#F2EAD3]'
                        : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Counter Display (matching 03 / 08 Images style) */}
              <div className="text-xs font-mono text-neutral-400">
                <span className="font-bold text-white">
                  {String(currentImageIndex + 1).padStart(2, '0')}
                </span>{' '}
                /{' '}
                <span>
                  {String(Math.max(galleryImages.length, 1)).padStart(2, '0')}
                </span>{' '}
                <span className="text-neutral-500 uppercase tracking-wider text-[11px]">
                  Images
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Role, Client, Date, Links & Resources, Technologies */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Metadata Rows (Role, Client, Date) */}
            <div className="space-y-3 mb-6 sm:mb-8 pr-10">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-sm font-semibold text-neutral-400">
                  Role:
                </span>
                <span className="text-sm sm:text-base text-neutral-200 font-medium">
                  {roleText}
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-sm font-semibold text-neutral-400">
                  Client:
                </span>
                <span className="text-sm sm:text-base text-neutral-200 font-medium">
                  {clientText}
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-sm font-semibold text-neutral-400">
                  Date:
                </span>
                <span className="text-sm sm:text-base text-neutral-200 font-medium">
                  {dateText}
                </span>
              </div>
            </div>

            {/* Split Grid for Links & Resources & Technologies */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-4 border-t border-white/[0.06]">
              {/* Links & Resources */}
              <div className="sm:col-span-6 flex flex-col">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-3 block">
                  LINKS & RESOURCES
                </span>
                <div className="flex flex-col gap-2.5">
                  {defaultLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-neutral-200 hover:text-white transition-all duration-200 text-xs font-mono shadow-sm active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {getLinkIcon(link.icon, link.label)}
                        <span className="truncate font-medium">{link.label}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="sm:col-span-6 flex flex-col">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-3 block">
                  TECHNOLOGIES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg text-xs font-mono text-neutral-300 bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Divider Line */}
        <hr className="border-white/[0.08] my-8 sm:my-10" />

        {/* ========================================================== */}
        {/* BOTTOM SECTION: ABOUT THE PROJECT, ROLE, WHAT I LEARNED   */}
        {/* ========================================================== */}
        <div className="space-y-10">
          {/* 1. About the Project */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-4">
              About the Project
            </h3>
            <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
              {aboutParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* 2. Role (Added as requested) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.015] border border-white/[0.06]">
            <div className="flex items-center gap-2.5 mb-3.5">
              <UserCheck className="w-4 h-4 text-[#F2EAD3]" />
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Role & Contributions
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
              {roleContributions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2EAD3] mt-2 shrink-0 opacity-80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. What I Learned (Added as requested) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.015] border border-white/[0.06]">
            <div className="flex items-center gap-2.5 mb-3.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                What I Learned
              </h4>
            </div>
            <div className={`grid grid-cols-1 ${whatILearned.length > 1 ? 'md:grid-cols-2' : ''} gap-4`}>
              {whatILearned.map((learning, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3.5 text-xs sm:text-sm text-neutral-300 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{learning}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
