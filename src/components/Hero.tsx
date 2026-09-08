import React from 'react';
import { ArrowRight, Star, ChevronDown, Dumbbell, Compass, ShieldCheck } from 'lucide-react';
import { Hero3DCanvas } from '../3d/Hero3DCanvas';
import { BUSINESS_CONFIG } from '../data/businessConfig';

export const Hero: React.FC = () => {
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between bg-[#070709] overflow-hidden"
    >
      {/* Cinematic Ambient Background Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#ccff00]/6 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-zinc-700/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-7">
            
            {/* Trust Indicator Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/90 border border-white/10 shadow-lg">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <div className="h-3.5 w-px bg-white/20" />
              <span className="text-xs sm:text-sm font-semibold text-zinc-200">
                <span className="text-white font-bold">{BUSINESS_CONFIG.ratingStats.ratingValue} Rated</span> • {BUSINESS_CONFIG.ratingStats.reviewCountDisplay} Customer Reviews • {BUSINESS_CONFIG.location.area}, Bengaluru
              </span>
            </div>

            {/* Supporting Headline */}
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] font-extrabold text-[#ccff00]">
              Train Hard. Move Better. Become Unstoppable.
            </p>

            {/* Main Primary Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white uppercase tracking-tight leading-[1.05]">
              BUILD YOUR <br />
              <span className="text-gradient-lime">STRONGER</span> SELF.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-normal">
              Premium fitness, strength training, CrossFit and personal guidance in Kengeri, Bengaluru. A high-energy unisex fitness centre engineered for sustainable physical transformation.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <button
                id="btn-hero-primary-cta"
                onClick={() => handleScrollToSection('contact')}
                className="py-4 px-8 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-sm uppercase tracking-wider shadow-xl shadow-[#ccff00]/25 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>START YOUR FITNESS JOURNEY</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                id="btn-hero-secondary-cta"
                onClick={() => handleScrollToSection('about')}
                className="py-4 px-8 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-white font-bold text-sm uppercase tracking-wider border border-white/10 hover:border-white/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-zinc-400" />
                <span>EXPLORE THE GYM</span>
              </button>
            </div>

            {/* Quick Location & Safety Tag */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
                Certified Trainers & Technique First
              </span>
              <span className="text-zinc-600">•</span>
              <span>Opp. Sub Registrar Office, Kengeri</span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Backdrop glow plate */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ccff00]/10 via-transparent to-transparent rounded-full blur-3xl" />
            
            <div className="w-full relative z-10">
              <Hero3DCanvas />
            </div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center mt-6 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        onClick={() => handleScrollToSection('stats')}
      >
        <span className="text-[11px] uppercase tracking-widest font-semibold mb-1">Scroll to Explore</span>
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 bg-[#ccff00] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
