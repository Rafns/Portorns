import React, { useState, useEffect } from 'react';
import { SectionId, Project } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { CareerSection } from './components/CareerSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TechSignalSection } from './components/TechSignalSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';
import { PageDividerMarquee } from './components/PageDividerMarquee';
import { ProjectModal } from './components/ProjectModal';
import { AudioDronePlayer } from './components/AudioDronePlayer';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('beranda');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Smooth scroll handler
  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // IntersectionObserver to sync nav active section with scroll position
  useEffect(() => {
    const sections: SectionId[] = [
      'beranda',
      'about',
      'experience',
      'proyek',
      'tech-stack',
      'certifications',
      'contact',
    ];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Audition interactive synthesizer tone for projects
  const handleAuditionSound = (project: Project) => {
    if (!project.soundSample) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = project.soundSample.type === 'drone' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(project.soundSample.frequency, ctx.currentTime);

      // Lowpass filter for smooth analog feel
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.3);
    } catch (e) {
      console.warn('Audio tone could not be played:', e);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] selection:bg-[#F2EAD3] selection:text-[#0A0A0A]">
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Screen 1: Hero / Beranda (Keeps the Boomerang video background) */}
        <HeroSection
          onExploreProjects={() => scrollToSection('proyek')}
          onLearnMore={() => scrollToSection('about')}
        />

        {/* Screen 2 onwards: Clean Deep Black Background (#0A0A0A) as requested */}
        <div className="relative bg-[#0A0A0A] text-[#FFFFFF]">
          {/* Divider 1: Hero -> About */}
          <PageDividerMarquee id="divider-hero-about" />

          {/* Screen 2: About / Rafael Nandana S. */}
          <AboutSection />

          {/* Divider 2: About -> Career */}
          <PageDividerMarquee id="divider-about-career" />

          {/* Screen 3: Career / Experience Journey */}
          <CareerSection />

          {/* Divider 3: Career -> Projects */}
          <PageDividerMarquee id="divider-career-projects" />

          {/* Screen 4: Featured Projects Section (below Experience) */}
          <ProjectsSection
            onSelectProject={(project) => setSelectedProject(project)}
            onAuditionSound={handleAuditionSound}
          />

          {/* Divider 4: Projects -> Tech Stack */}
          <PageDividerMarquee id="divider-projects-tech" />

          {/* Screen 5: Tech Signal (Continuous flowing wave / water wave stack) */}
          <TechSignalSection
            onNavigateToProjects={() => scrollToSection('proyek')}
            onNavigateToContact={() => scrollToSection('contact')}
          />

          {/* Divider 5: Tech Stack -> Certificates */}
          <PageDividerMarquee id="divider-tech-cert" />

          {/* Screen 6: Certifications & Accreditations (from reference image) */}
          <CertificatesSection />

          {/* Divider 6: Certificates -> Contact */}
          <PageDividerMarquee id="divider-cert-contact" />

          {/* Screen 7: Contact */}
          <ContactSection />

          {/* Divider 7: Contact -> Footer */}
          <PageDividerMarquee id="divider-contact-footer" />

          {/* Footer */}
          <Footer onNavigate={scrollToSection} />
        </div>
      </main>

      {/* Interactive Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPlaySoundSample={handleAuditionSound}
      />

      {/* Ambient Wax LP Sound Player Dock */}
      <AudioDronePlayer />
    </div>
  );
}
