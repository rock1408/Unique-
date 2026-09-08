import React from 'react';
import { Award, ShieldCheck, ChevronRight, User } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';

export const Trainers: React.FC = () => {
  const handleConsultCoach = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="trainers" className="py-24 bg-[#070709] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#ccff00] block mb-2">
            Expert Coaching Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            TRAIN WITH PEOPLE WHO CARE ABOUT <br className="hidden sm:block" />
            <span className="text-gradient-lime">YOUR PROGRESS.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Certified fitness professionals dedicated to correct form, injury prevention, and accelerating your strength milestones.
          </p>
        </div>

        {/* Trainers Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {BUSINESS_CONFIG.trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="glass-panel rounded-3xl overflow-hidden border border-white/10 group glass-panel-hover transition-all duration-300 flex flex-col"
            >
              {/* Photo Area */}
              <div className="relative h-64 w-full overflow-hidden bg-zinc-900">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 brightness-95 contrast-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent" />
                
                {/* Experience Badge */}
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] text-[#ccff00] font-bold">
                  {trainer.experience}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-black text-white tracking-wide uppercase">
                    {trainer.name}
                  </h3>
                  <p className="text-xs text-[#ccff00] font-bold uppercase tracking-wider mt-0.5">
                    {trainer.role}
                  </p>
                  
                  <div className="mt-3 p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">Specialization</span>
                    <p className="text-xs text-zinc-300 font-medium mt-0.5">{trainer.specialization}</p>
                  </div>

                  <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
                    {trainer.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <button
                    onClick={handleConsultCoach}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#ccff00] text-zinc-200 hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Guidance</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Trainer Transparency */}
        <div className="mt-12 p-4 rounded-2xl bg-zinc-950/60 border border-white/5 text-center max-w-xl mx-auto">
          <p className="text-xs text-zinc-500">
            All coaches maintain current strength & conditioning credentials. Meet them in person on the gym floor for equipment orientation and technique guidance.
          </p>
        </div>

      </div>
    </section>
  );
};
