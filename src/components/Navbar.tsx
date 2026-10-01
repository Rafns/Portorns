import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { Sun } from 'lucide-react';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Items exactly as in Gambar 1: Home, About, Experience, Projects, Contacts
  const navItems: { id: SectionId; label: string }[] = [
    { id: 'beranda', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'proyek', label: 'Projects' },
    { id: 'contact', label: 'Contacts' },
  ];

  const handleItemClick = (id: SectionId) => {
    onNavigate(id);
  };

  return (
    <header
      id="main-navigation"
      className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300"
    >
      {/* Floating White Pill Capsule matching Gambar 1 */}
      <div
        className={`pointer-events-auto relative rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border border-neutral-200/90 shadow-2xl shadow-black/25 py-2.5 px-6 sm:px-8'
            : 'bg-white/95 backdrop-blur-lg border border-neutral-200/80 shadow-xl shadow-black/15 py-2.5 sm:py-3 px-6 sm:px-8'
        } flex items-center justify-between gap-5 sm:gap-8 md:gap-12 max-w-2xl w-auto`}
      >
        {/* Left: Brand Monogram "Rafns." */}
        <button
          onClick={() => handleItemClick('beranda')}
          className="text-sm sm:text-base font-extrabold tracking-tight text-neutral-950 select-none cursor-pointer focus:outline-none shrink-0 hover:opacity-80 transition-opacity"
          aria-label="Rafns."
        >
          Rafns.
        </button>

        {/* Center: Navigation Links (Home, About, Experience, Projects, Contacts) */}
        <nav
          id="nav-menu-items"
          className="flex items-center gap-4 sm:gap-6 md:gap-7"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`text-xs sm:text-sm tracking-normal transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? 'text-neutral-950 font-bold'
                    : 'text-neutral-500 hover:text-neutral-900 font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Sun / Theme Icon */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            className="p-1 rounded-full text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer focus:outline-none"
            aria-label="Theme indicator"
            title="Theme indicator"
          >
            <Sun className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
