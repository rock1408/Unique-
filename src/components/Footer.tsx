import React from 'react';
import { Phone, MessageCircle, Navigation, MapPin, Instagram, Facebook, Youtube, ArrowUp } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { getDirectWhatsAppUrl, openWhatsAppDirect } from '../utils/whatsappHelper';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Programs', href: '#programs' },
    { label: '3D Studio', href: '#experience' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="bg-[#050507] text-zinc-400 border-t border-white/10 pt-16 pb-28 sm:pb-16 text-left relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ccff00] text-black font-black text-xl flex items-center justify-center">
                UF
              </div>
              <span className="font-extrabold text-xl tracking-wider text-white uppercase">
                UNIQUE <span className="text-[#ccff00]">FITNESS</span>
              </span>
            </div>

            <p className="text-sm text-zinc-300 font-semibold italic">
              "{BUSINESS_CONFIG.tagline}"
            </p>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Premium unisex gym and strength fitness centre in Kengeri, Bengaluru. Committed to structured workouts, personal attention, and lifelong transformations.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
                className="py-2 px-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>Call {BUSINESS_CONFIG.contact.phoneDisplay}</span>
              </a>

              <a
                href={getDirectWhatsAppUrl()}
                onClick={(e) => {
                  e.preventDefault();
                  openWhatsAppDirect();
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/25 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={BUSINESS_CONFIG.location.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10"
              >
                <Navigation className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>Directions</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#ccff00] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Programs
            </h4>
            <ul className="space-y-2 text-xs">
              {BUSINESS_CONFIG.programs.map((p) => (
                <li key={p.id}>
                  <a
                    href="#programs"
                    className="hover:text-[#ccff00] transition-colors"
                  >
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address & Socials */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Location & Hours
            </h4>
            <div className="text-xs space-y-1.5">
              <p className="text-zinc-200 font-semibold">{BUSINESS_CONFIG.location.addressLine1}</p>
              <p className="text-zinc-400">{BUSINESS_CONFIG.location.landmark}</p>
              <p className="text-zinc-400">{BUSINESS_CONFIG.location.area}, {BUSINESS_CONFIG.location.city} - {BUSINESS_CONFIG.location.pincode}</p>
              <p className="text-[#ccff00] font-mono pt-2">Mon – Sat: 5:00 AM – 10:00 PM</p>
              <p className="text-[#ccff00] font-mono">Sunday: 6:00 AM – 10:00 PM (Open 7 Days)</p>
              <div className="pt-2">
                <a 
                  href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
                  className="text-white hover:text-[#ccff00] font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>{BUSINESS_CONFIG.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              {BUSINESS_CONFIG.contact.socialLinks.instagram && (
                <a
                  href={BUSINESS_CONFIG.contact.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-[#ccff00] hover:text-black border border-white/10 flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {BUSINESS_CONFIG.contact.socialLinks.facebook && (
                <a
                  href={BUSINESS_CONFIG.contact.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-[#ccff00] hover:text-black border border-white/10 flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {BUSINESS_CONFIG.contact.socialLinks.youtube && (
                <a
                  href={BUSINESS_CONFIG.contact.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-[#ccff00] hover:text-black border border-white/10 flex items-center justify-center transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Bottom copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Unique Fitness. All rights reserved. Unisex Gym in Kengeri, Bengaluru.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#ccff00] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
