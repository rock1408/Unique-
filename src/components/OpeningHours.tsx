import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { getBusinessOpenStatus, BusinessStatus } from '../utils/hoursHelper';

export const OpeningHours: React.FC = () => {
  const [status, setStatus] = useState<BusinessStatus>(getBusinessOpenStatus());

  useEffect(() => {
    // Update every minute
    const interval = setInterval(() => {
      setStatus(getBusinessOpenStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 text-left">
      {/* Dynamic Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#ccff00]" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">
              GYM HOURS
            </h3>
            <p className="text-xs text-zinc-400">
              Convenient 5:00 AM early bird to late night access
            </p>
          </div>
        </div>

        {/* Live Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 self-start sm:self-auto">
          <span className={`w-2.5 h-2.5 rounded-full ${status.isOpen ? 'bg-[#ccff00] animate-pulse' : 'bg-red-500'}`} />
          <span className={`text-xs font-black uppercase tracking-wider ${status.isOpen ? 'text-[#ccff00]' : 'text-red-400'}`}>
            {status.statusText}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-xs text-zinc-400 font-medium">
            {status.statusDetail}
          </span>
        </div>
      </div>

      {/* Daily Schedule List */}
      <div className="mt-6 space-y-2.5">
        {BUSINESS_CONFIG.openingHours.schedule.map((item) => {
          const isToday = item.day.toLowerCase() === status.currentDayName.toLowerCase();
          return (
            <div
              key={item.day}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                isToday 
                  ? 'bg-[#ccff00]/10 border border-[#ccff00]/30 font-bold' 
                  : 'hover:bg-zinc-900/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                {isToday && <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />}
                <span className={`text-xs uppercase tracking-wider ${isToday ? 'text-white font-extrabold' : 'text-zinc-400'}`}>
                  {item.day} {isToday && <span className="text-[#ccff00] lowercase font-normal">(today)</span>}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono ${
                  item.isClosed 
                    ? 'text-zinc-500' 
                    : isToday ? 'text-[#ccff00] font-bold' : 'text-zinc-200'
                }`}>
                  {item.displayTime}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note */}
      <p className="mt-6 text-[11px] text-zinc-400 text-center">
        *Training floor coaches are available throughout operating hours for orientation and spotting.
      </p>
    </div>
  );
};
