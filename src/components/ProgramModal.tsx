import React from 'react';
import { X, CheckCircle2, ChevronRight, MessageCircle } from 'lucide-react';
import { ServiceProgram, BUSINESS_CONFIG } from '../data/businessConfig';
import { getDirectWhatsAppUrl, openWhatsAppDirect } from '../utils/whatsappHelper';

interface ProgramModalProps {
  program: ServiceProgram | null;
  onClose: () => void;
  onEnquire: (programTitle: string) => void;
}

export const ProgramModal: React.FC<ProgramModalProps> = ({ program, onClose, onEnquire }) => {
  if (!program) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#0e0e12] border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image with gradient */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover object-center brightness-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-[#0e0e12]/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/15 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-black uppercase tracking-widest text-[#ccff00]">
              {program.tagline}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase mt-1">
              {program.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {program.fullDescription}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/5">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                Training Intensity
              </span>
              <span className="text-sm font-black text-white">{program.intensity}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/5">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                Recommended For
              </span>
              <span className="text-xs text-zinc-300 font-medium">{program.recommendedFor}</span>
            </div>
          </div>

          {/* Key Benefits */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">
              Key Program Features & Results
            </h4>
            <div className="space-y-2.5">
              {program.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
            <button
              id="btn-modal-enquire"
              onClick={() => onEnquire(program.title)}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#ccff00]/20 cursor-pointer"
            >
              <span>Enquire for {program.title}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <a
              href={getDirectWhatsAppUrl(`Hi Unique Fitness, I would like to know more about the ${program.title} program.`)}
              onClick={(e) => {
                e.preventDefault();
                openWhatsAppDirect(`Hi Unique Fitness, I would like to know more about the ${program.title} program.`);
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
