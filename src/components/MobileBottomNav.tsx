import React from 'react';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { getDirectWhatsAppUrl, openWhatsAppDirect } from '../utils/whatsappHelper';

export const MobileBottomNav: React.FC = () => {
  const handleJoinClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsAppDirect();
  };

  return (
    <aside 
      aria-label="Mobile quick actions"
      className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#070709]/95 backdrop-blur-xl border-t border-white/10 p-2.5 px-4 shadow-2xl"
    >
      <div className="grid grid-cols-3 gap-2">
        {/* CALL */}
        <a
          id="mobile-btn-call"
          href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
          className="h-12 rounded-xl bg-zinc-900 border border-white/10 text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 active:bg-zinc-800 transition-colors"
        >
          <Phone className="w-4 h-4 text-[#ccff00]" />
          <span>CALL</span>
        </a>

        {/* WHATSAPP */}
        <a
          id="mobile-btn-whatsapp"
          href={getDirectWhatsAppUrl()}
          onClick={handleWhatsAppClick}
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-bold text-xs uppercase flex items-center justify-center gap-1.5 active:bg-[#25D366]/30 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WHATSAPP</span>
        </a>

        {/* JOIN NOW */}
        <button
          id="mobile-btn-join"
          onClick={handleJoinClick}
          className="h-12 rounded-xl bg-[#ccff00] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-lg shadow-[#ccff00]/25 active:scale-95 transition-transform"
        >
          <span>JOIN NOW</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
