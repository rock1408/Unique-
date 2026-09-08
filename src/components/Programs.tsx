import React, { useState } from 'react';
import { Dumbbell, Flame, Zap, Shield, UserCheck, Activity, ChevronRight, ArrowUpRight } from 'lucide-react';
import { BUSINESS_CONFIG, ServiceProgram } from '../data/businessConfig';
import { ProgramModal } from './ProgramModal';

export const Programs: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<ServiceProgram | null>(null);

  // Icon mapping
  const iconMap: Record<string, React.ElementType> = {
    Dumbbell,
    Flame,
    Zap,
    Shield,
    UserCheck,
    Activity
  };

  const handleEnquireFromModal = (programTitle: string) => {
    setSelectedProgram(null);
    const formElement = document.getElementById('contact');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      // Pre-select training option in dropdown
      const selectEl = document.getElementById('preferred-training') as HTMLSelectElement | null;
      if (selectEl) {
        selectEl.value = programTitle;
      }
    }
  };

  return (
    <section id="programs" className="py-24 bg-[#070709] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#ccff00]/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#ccff00] block mb-2">
              Programs & Training
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              ENGINEERED FOR <br className="hidden sm:block" />
              <span className="text-gradient-lime">PEAK RESULTS.</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md font-normal leading-relaxed">
            From foundational strength to explosive CrossFit conditioning, each program is guided by experienced trainers to maximize progress safely.
          </p>
        </div>

        {/* 6 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BUSINESS_CONFIG.programs.map((program) => {
            const IconComponent = iconMap[program.iconName] || Dumbbell;
            return (
              <div
                key={program.id}
                id={`program-card-${program.id}`}
                className="group relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/60 transition-all duration-500 hover:-translate-y-2 hover:border-[#ccff00]/40 hover:shadow-2xl hover:shadow-[#ccff00]/10 flex flex-col justify-between"
              >
                {/* Background Image that reveals on hover */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover object-center brightness-40 group-hover:scale-110 group-hover:brightness-50 transition-all duration-700 opacity-60 group-hover:opacity-100"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent" />
                </div>

                {/* Top Badge & Icon */}
                <div className="relative z-10 p-6 sm:p-7 flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-950/80 border border-white/15 flex items-center justify-center group-hover:bg-[#ccff00] group-hover:border-[#ccff00] transition-colors duration-300 shadow-lg">
                    <IconComponent className="w-7 h-7 text-[#ccff00] group-hover:text-black transition-colors duration-300 group-hover:scale-110" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-zinc-300 border border-white/10">
                    {program.intensity}
                  </span>
                </div>

                {/* Body Content */}
                <div className="relative z-10 p-6 sm:p-7 pt-0 space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-[#ccff00] block mb-1">
                      {program.tagline}
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors">
                      {program.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-3">
                    {program.shortDescription}
                  </p>

                  {/* Learn More Button */}
                  <div className="pt-2">
                    <button
                      id={`btn-learn-${program.id}`}
                      onClick={() => setSelectedProgram(program)}
                      className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-[#ccff00] text-zinc-200 hover:text-black font-extrabold text-xs uppercase tracking-wider border border-white/10 hover:border-[#ccff00] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Callout */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-zinc-400">
            Unsure which program fits your current fitness baseline?
          </p>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-3 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#ccff00] hover:underline uppercase tracking-wider cursor-pointer"
          >
            <span>Book a Free Consultation with a Head Coach</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Program Detail Lightbox Modal */}
      <ProgramModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onEnquire={handleEnquireFromModal}
      />
    </section>
  );
};
