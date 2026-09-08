import React, { useEffect, useRef, useState } from 'react';
import { Star, MessageSquare, Dumbbell, Target } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';

export const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animated counters
  const [ratingCount, setRatingCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [optionsCount, setOptionsCount] = useState(0);
  const [commitmentCount, setCommitmentCount] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);

        const duration = 1600;
        const startTime = performance.now();

        const targetRating = 4.8;
        const targetReviews = 400;
        const targetOptions = 3;
        const targetCommitment = 100;

        const updateNumbers = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          // Ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);

          setRatingCount(Number((easeOut * targetRating).toFixed(1)));
          setReviewsCount(Math.floor(easeOut * targetReviews));
          setOptionsCount(Math.floor(easeOut * targetOptions));
          setCommitmentCount(Math.floor(easeOut * targetCommitment));

          if (progress < 1) {
            requestAnimationFrame(updateNumbers);
          }
        };

        requestAnimationFrame(updateNumbers);
      }
    }, { threshold: 0.25 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const statsItems = [
    {
      id: 'stat-rating',
      icon: Star,
      value: hasAnimated ? `${ratingCount.toFixed(1)}+` : BUSINESS_CONFIG.ratingStats.ratingValue,
      label: 'Customer Rating',
      detail: 'Verified member reviews',
      highlightColor: 'text-[#ccff00]'
    },
    {
      id: 'stat-reviews',
      icon: MessageSquare,
      value: hasAnimated ? `${reviewsCount}+` : BUSINESS_CONFIG.ratingStats.reviewCountDisplay,
      label: 'Reviews',
      detail: 'High community trust',
      highlightColor: 'text-white'
    },
    {
      id: 'stat-options',
      icon: Dumbbell,
      value: hasAnimated ? `${optionsCount}` : BUSINESS_CONFIG.ratingStats.coreFitnessOptions,
      label: 'Core Fitness Options',
      detail: 'Gym, CrossFit & Cardio',
      highlightColor: 'text-[#ccff00]'
    },
    {
      id: 'stat-commitment',
      icon: Target,
      value: hasAnimated ? `${commitmentCount}%` : BUSINESS_CONFIG.ratingStats.commitment,
      label: 'Commitment to Your Progress',
      detail: 'Goal-driven coaching',
      highlightColor: 'text-emerald-400'
    }
  ];

  return (
    <section 
      id="stats" 
      ref={sectionRef}
      className="relative z-20 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl shadow-black/60 bg-gradient-to-b from-[#14141a]/95 to-[#0b0b0f]/95">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-white/10">
          {statsItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className={`flex flex-col items-center text-center p-3 sm:p-4 ${idx !== 0 ? 'lg:pl-8' : ''}`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#ccff00]" />
                </div>
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${item.highlightColor}`}>
                  {item.value}
                </div>
                <div className="text-sm font-bold text-white uppercase tracking-wider mt-2">
                  {item.label}
                </div>
                <div className="text-xs text-zinc-400 mt-1 font-medium">
                  {item.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
