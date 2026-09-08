import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { getDirectWhatsAppUrl, openWhatsAppDirect } from '../utils/whatsappHelper';

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const directUrl = getDirectWhatsAppUrl();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsAppDirect();
  };

  return (
    <div className="fixed bottom-20 sm:bottom-8 right-5 sm:right-8 z-40 flex items-center gap-3">
      {/* Tooltip on Hover */}
      <div 
        className={`hidden sm:block px-3.5 py-1.5 rounded-full bg-black/90 text-white text-xs font-bold border border-white/15 shadow-xl transition-all duration-200 pointer-events-none whitespace-nowrap ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        Chat directly on WhatsApp (70192 01669)
      </div>

      {/* Floating Button */}
      <a
        id="btn-floating-whatsapp"
        href={directUrl}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300 relative group cursor-pointer"
        aria-label="Chat directly on WhatsApp with Unique Fitness at +91 70192 01669"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        
        {/* Radar ping ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
      </a>
    </div>
  );
};
