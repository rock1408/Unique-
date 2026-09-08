import React, { useRef } from 'react';
import { 
  Award, Dumbbell, Users, Shield, UserCheck, Flame, HeartPulse, Sparkles, CheckCircle,
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';

export const WhyChooseUs: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const iconMap: Record<string, React.ElementType> = {
    Award,
    Dumbbell,
    Users,
    Shield,
    UserCheck,
    Flame,
    HeartPulse,
    Sparkles,
    CheckCircle
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="why-us" className="py-24 bg-[#09090c] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#ccff00] block mb-2">
              The Unique Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              WHY UNIQUE <span className="text-[#ccff00]">FITNESS?</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 font-medium hidden sm:inline">
              Scroll to explore benefits
            </span>
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full bg-zinc-900 border border-white/10 hover:border-[#ccff00] text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full bg-zinc-900 border border-white/10 hover:border-[#ccff00] text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Benefits Track */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory focus:outline-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {BUSINESS_CONFIG.whyChooseBenefits.map((benefit, idx) => {
            const IconComponent = iconMap[benefit.icon] || Dumbbell;
            return (
              <div
                key={benefit.title}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 glass-panel-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center group-hover:bg-[#ccff00] transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-[#ccff00] group-hover:text-black transition-colors duration-300" />
                    </div>
                    <span className="text-xs font-black text-zinc-500 font-mono">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-zinc-500 group-hover:text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                  <span>Verified Feature</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
