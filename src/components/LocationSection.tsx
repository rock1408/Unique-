import React from 'react';
import { MapPin, Navigation, Phone, MessageCircle, Landmark, ExternalLink } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { OpeningHours } from './OpeningHours';
import { getDirectWhatsAppUrl, openWhatsAppDirect } from '../utils/whatsappHelper';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-24 bg-[#070709] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#ccff00] block mb-2">
            Visit Us in Kengeri
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            FIND YOUR WAY TO <br className="hidden sm:block" />
            <span className="text-gradient-lime">UNIQUE FITNESS.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Conveniently situated opposite the Kengeri Sub Registrar Office on Harsha Layout Main Road.
          </p>
        </div>

        {/* Location & Hours Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Card & Address Details */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6">
            
            {/* Interactive Map Embed */}
            <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-inner">
              <iframe
                title="Unique Fitness Kengeri Location Map"
                src={BUSINESS_CONFIG.location.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(100%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
              />
              
              {/* Floating Landmark Chip */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/15 text-xs text-white shadow-xl">
                <Landmark className="w-3.5 h-3.5 text-[#ccff00]" />
                <span className="font-bold">{BUSINESS_CONFIG.location.landmark}</span>
              </div>
            </div>

            {/* Address Details */}
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-[#ccff00]" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#ccff00]">
                    Official Address
                  </span>
                  <p className="text-sm sm:text-base font-bold text-white leading-relaxed mt-0.5">
                    {BUSINESS_CONFIG.location.fullAddress}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Landmark: <span className="text-zinc-200">{BUSINESS_CONFIG.location.landmark}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
                <a
                  id="btn-get-directions"
                  href={BUSINESS_CONFIG.location.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#ccff00]/20 transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4 fill-current" />
                  <span>Get Directions</span>
                </a>

                <a
                  id="btn-location-call"
                  href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
                  className="py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#ccff00]" />
                  <span>Call: {BUSINESS_CONFIG.contact.phoneDisplay}</span>
                </a>

                <a
                  id="btn-location-whatsapp"
                  href={getDirectWhatsAppUrl()}
                  onClick={(e) => {
                    e.preventDefault();
                    openWhatsAppDirect();
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Operating Hours Component */}
          <div className="lg:col-span-5">
            <OpeningHours />
          </div>

        </div>

      </div>
    </section>
  );
};
