import React from 'react';
import { ArrowRight, Navigation, Zap, Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { getDirectWhatsAppUrl, openWhatsAppDirect } from '../utils/whatsappHelper';

export const FinalCTA: React.FC = () => {
  const handleJoinClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-28 bg-[#09090c] overflow-hidden border-t border-white/10">
      {/* Immersive ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#ccff00]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Grid line background */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '36px 36px' 
        }} 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-black uppercase tracking-widest mb-6">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Transform Today In Kengeri</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[1.05]">
          YOUR STRONGEST <br />
          <span className="text-gradient-lime">VERSION IS WAITING.</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-xl sm:text-2xl text-zinc-300 font-bold max-w-2xl mx-auto italic">
          "Stop thinking about starting. Start."
        </p>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl mx-auto">
          Experience Olympic grade equipment, certified coaches, and an uplifting community at Unique Fitness.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="btn-final-cta-join"
            onClick={handleJoinClick}
            className="w-full sm:w-auto py-4 px-9 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-sm uppercase tracking-wider shadow-2xl shadow-[#ccff00]/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>JOIN UNIQUE FITNESS</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

          <a
            id="btn-final-cta-directions"
            href={BUSINESS_CONFIG.location.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-4 px-9 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-white font-bold text-sm uppercase tracking-wider border border-white/15 hover:border-white/30 transition-all flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4 text-[#ccff00]" />
            <span>GET DIRECTIONS</span>
          </a>
        </div>

        {/* Quick Direct Contacts */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
          <a
            href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
            className="flex items-center gap-2 hover:text-[#ccff00] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>Call: <strong className="text-white">{BUSINESS_CONFIG.contact.phoneDisplay}</strong></span>
          </a>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <a
            href={getDirectWhatsAppUrl()}
            onClick={(e) => {
              e.preventDefault();
              openWhatsAppDirect();
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp: <strong className="text-emerald-300">70192 01669</strong></span>
          </a>
        </div>

      </div>
    </section>
  );
};
