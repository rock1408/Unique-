import React, { useState } from 'react';
import { Footprints, ClipboardList, Dumbbell, TrendingUp, Trophy, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';

export const Journey: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const stepIcons = [Footprints, ClipboardList, Dumbbell, TrendingUp, Trophy];

  const handleStartJourney = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="journey" className="py-24 bg-[#09090c] relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#ccff00]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#ccff00] block mb-2">
            The Roadmap to Strength
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            YOUR FITNESS <span className="text-[#ccff00]">JOURNEY.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            A clear, proven 5-step pathway designed to take you from day one to unstoppable confidence and lifelong health.
          </p>
        </div>

        {/* Timeline Path & Interactive Cards */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-zinc-800 via-[#ccff00]/40 to-zinc-800 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {BUSINESS_CONFIG.journeySteps.map((step, idx) => {
              const IconComponent = stepIcons[idx] || Dumbbell;
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.step}
                  id={`journey-step-${step.step}`}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`glass-panel p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? 'border-[#ccff00] bg-zinc-900/95 -translate-y-2 shadow-xl shadow-[#ccff00]/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    {/* Step badge & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                        isActive ? 'bg-[#ccff00] text-black' : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className={`text-xs font-black font-mono px-2.5 py-1 rounded-full ${
                        isActive ? 'bg-[#ccff00]/20 text-[#ccff00]' : 'bg-white/5 text-zinc-400'
                      }`}>
                        STEP {step.step}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white uppercase tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs font-bold text-[#ccff00] uppercase tracking-wider mt-1">
                      {step.subtitle}
                    </p>

                    <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-bold text-zinc-500">
                    <span>Phase 0{idx + 1}</span>
                    <span className={isActive ? 'text-[#ccff00]' : ''}>●</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Callout */}
        <div className="mt-14 text-center">
          <button
            id="btn-journey-start"
            onClick={handleStartJourney}
            className="py-4 px-8 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#ccff00]/20 inline-flex items-center gap-2 hover:scale-102 transition-all cursor-pointer"
          >
            <span>Take Step 01 Today — Book Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
