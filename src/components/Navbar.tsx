import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, MapPin, ChevronRight, Clock } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { getBusinessOpenStatus } from '../utils/hoursHelper';
import { getDirectWhatsAppUrl, openWhatsAppDirect } from '../utils/whatsappHelper';

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [businessStatus, setBusinessStatus] = useState(getBusinessOpenStatus());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Periodically update open status every 2 minutes
    const timer = setInterval(() => {
      setBusinessStatus(getBusinessOpenStatus());
    }, 120000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Programs', href: '#programs' },
    { label: '3D Studio', href: '#experience' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Journey', href: '#journey' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJoinClick = () => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector('#contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070709]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/40'
            : 'bg-gradient-to-b from-[#070709]/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-3 group"
              id="nav-logo"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-zinc-900 to-zinc-800 border border-white/15 flex items-center justify-center font-black text-white text-xl shadow-md group-hover:border-[#ccff00]/60 transition-colors">
                <span className="text-[#ccff00]">U</span>F
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white uppercase group-hover:text-zinc-200 transition-colors flex items-center gap-1.5">
                  UNIQUE <span className="text-[#ccff00]">FITNESS</span>
                </span>
                <span className="text-[10px] text-zinc-400 font-medium tracking-widest uppercase hidden sm:block">
                  Kengeri • Bengaluru
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-[#ccff00] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#ccff00] hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Side Header Items: Status badge, Call & CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Dynamic Open Badge */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs">
                <span className={`w-2 h-2 rounded-full ${businessStatus.isOpen ? 'bg-[#ccff00] animate-pulse' : 'bg-red-500'}`} />
                <span className="text-zinc-300 font-medium">{businessStatus.statusText}</span>
              </div>

              {/* Direct Phone Call Button */}
              <a
                id="nav-call-btn"
                href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
                className="hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-[#ccff00]/40 text-white text-xs font-bold transition-all"
                title="Call Unique Fitness"
              >
                <Phone className="w-3.5 h-3.5 text-[#ccff00]" />
                <span className="tracking-wide">{BUSINESS_CONFIG.contact.phoneDisplay}</span>
              </a>

              {/* Join Now CTA */}
              <button
                id="nav-join-btn"
                onClick={handleJoinClick}
                className="px-5 py-2.5 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#ccff00]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>JOIN NOW</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-zinc-300 hover:text-white hover:border-[#ccff00]/40 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6 text-[#ccff00]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Animated Drawer */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-[#070709]/98 backdrop-blur-2xl flex flex-col pt-24 pb-8 px-6 overflow-y-auto xl:hidden"
          id="mobile-nav-drawer"
        >
          {/* Quick status banner */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${businessStatus.isOpen ? 'bg-[#ccff00]' : 'bg-red-500'}`} />
              <span className="text-xs font-bold text-white uppercase">{businessStatus.statusText}</span>
            </div>
            <span className="text-xs text-zinc-400">{businessStatus.todayScheduleDisplay}</span>
          </div>

          {/* Links list */}
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg font-bold uppercase tracking-wider text-zinc-200 hover:text-[#ccff00] p-3 rounded-xl hover:bg-white/5 transition-all flex items-center justify-between border-b border-white/5"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </a>
            ))}
          </div>

          {/* Mobile Bottom CTAs */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={handleJoinClick}
              className="w-full py-4 rounded-xl bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#ccff00]/25"
            >
              <span>JOIN NOW / BOOK TRIAL</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
                className="py-3 px-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-semibold text-xs flex flex-col items-center justify-center gap-1 active:bg-zinc-800"
              >
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Call Gym</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono font-normal">{BUSINESS_CONFIG.contact.phoneDisplay}</span>
              </a>
              <a
                href={getDirectWhatsAppUrl()}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  openWhatsAppDirect();
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/30 text-emerald-400 font-semibold text-xs flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors active:bg-emerald-950/70"
              >
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </div>
                <span className="text-[10px] text-emerald-400/80 font-mono font-normal">70192 01669</span>
              </a>
            </div>

            <p className="text-center text-xs text-zinc-500 pt-2">
              {BUSINESS_CONFIG.location.landmark}, {BUSINESS_CONFIG.location.area}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
