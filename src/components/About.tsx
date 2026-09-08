import React from 'react';
import { CheckCircle2, Flame, Shield, Users, Compass, Dumbbell } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';

export const About: React.FC = () => {
  const pillars = [
    'Strength',
    'Endurance',
    'Mobility',
    'Conditioning',
    'Fitness',
    'Confidence'
  ];

  const cardIcons = [Dumbbell, Shield, Users, Flame];

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-24 bg-[#070709] relative overflow-hidden">
      {/* Subtle lighting accents */}
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Cinematic Visual & Facility Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              {/* Gym Image */}
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
                alt="Unique Fitness gym interior Kengeri"
                className="w-full h-[450px] sm:h-[540px] object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 contrast-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Dark luxury gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-black/30" />

              {/* Floating Floating Info Card */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel p-5 rounded-2xl border border-white/15">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider block">Unisex Fitness Hub</span>
                    <h3 className="text-lg font-black text-white mt-0.5">Unique Fitness Kengeri</h3>
                    <p className="text-xs text-zinc-300 mt-1">Harsha Layout Main Road • Bengaluru</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#ccff00] text-black font-black flex items-center justify-center text-lg">
                    4.8★
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Accent Badge */}
            <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 bg-[#ccff00] text-black font-extrabold text-xs px-4 py-2 rounded-xl shadow-xl shadow-[#ccff00]/20 uppercase tracking-wider">
              <span>ESTABLISHED IN KENGERI</span>
            </div>
          </div>

          {/* Right Column: Narrative & 4 Feature Cards */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Header */}
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#ccff00] block mb-2">
                About Unique Fitness
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                MORE THAN A GYM. <br />
                <span className="text-gradient-lime">A PLACE TO TRANSFORM.</span>
              </h2>
              <p className="mt-4 text-base text-zinc-300 leading-relaxed font-normal">
                Unique Fitness in Kengeri is thoughtfully designed for individuals who demand more from their workouts. We provide the equipment, science-backed guidance, and inspiring environment you need to build:
              </p>

              {/* 6 Target Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-5">
                {pillars.map((pillar) => (
                  <div 
                    key={pillar}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900/80 border border-white/5 text-xs font-semibold text-zinc-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BUSINESS_CONFIG.aboutFeatures.map((feat, idx) => {
                const IconComponent = cardIcons[idx % cardIcons.length];
                return (
                  <div 
                    key={feat.title}
                    className="glass-panel p-5 rounded-2xl border border-white/10 glass-panel-hover transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center mb-3 group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                      <IconComponent className="w-5 h-5 text-[#ccff00] group-hover:text-black transition-colors" />
                    </div>
                    <h3 className="text-base font-extrabold text-white tracking-wide uppercase">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Consultation Prompt */}
            <div className="pt-2">
              <button
                id="btn-about-book-consult"
                onClick={handleScrollToContact}
                className="py-3.5 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider border border-white/15 hover:border-[#ccff00]/40 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Book a Free Consultation</span>
                <span className="text-[#ccff00]">→</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
