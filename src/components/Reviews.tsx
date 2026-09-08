import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle, ExternalLink } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';

export const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = BUSINESS_CONFIG.customerReviews;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const current = reviews[currentIndex];

  return (
    <section id="reviews" className="py-24 bg-[#09090c] relative overflow-hidden border-t border-white/5">
      {/* Background ambient spotlight */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#ccff00] block mb-2">
            Verified Community Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            WHAT OUR <span className="text-[#ccff00]">MEMBERS SAY.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Real feedback from members training daily at Unique Fitness, Kengeri.
          </p>
        </div>

        {/* Reviews Layout: Main Interactive Carousel + Overall Rating Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Main Review Card */}
          <div className="lg:col-span-8 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 flex flex-col justify-between relative shadow-2xl">
            <div className="absolute top-6 right-6 opacity-10 text-white pointer-events-none">
              <Quote className="w-20 h-20" />
            </div>

            <div>
              {/* Star Rating & Verified Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Review</span>
                </span>
              </div>

              {/* Quote Highlight */}
              {current.highlight && (
                <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-3">
                  "{current.highlight}"
                </h3>
              )}

              {/* Review Text */}
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed italic font-normal">
                "{current.reviewText}"
              </p>
            </div>

            {/* Author & Controls */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-sm font-extrabold text-white block">
                  — {current.author}
                </span>
                <span className="text-xs text-zinc-400">
                  Customer Review • {current.date}
                </span>
              </div>

              {/* Carousel Arrows & Dots */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button
                  id="btn-prev-review"
                  onClick={prevReview}
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 hover:border-[#ccff00] text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-1.5 px-2">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        currentIndex === i ? 'w-6 bg-[#ccff00]' : 'w-1.5 bg-zinc-700'
                      }`}
                      aria-label={`Go to review ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  id="btn-next-review"
                  onClick={nextReview}
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 hover:border-[#ccff00] text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Rating Summary Card */}
          <div className="lg:col-span-4 glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between text-center">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center mx-auto mb-4">
                <Star className="w-7 h-7 text-[#ccff00] fill-current" />
              </div>
              <div className="text-4xl sm:text-5xl font-black text-white">
                {BUSINESS_CONFIG.ratingStats.ratingValue}
              </div>
              <div className="flex justify-center text-amber-400 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs uppercase tracking-wider font-extrabold text-zinc-400">
                Based on {BUSINESS_CONFIG.ratingStats.reviewCountDisplay} Reviews
              </p>
              <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                Ranked among the premier fitness centers in Kengeri, Bengaluru.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <a
                href={BUSINESS_CONFIG.location.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>READ MORE REVIEWS</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#ccff00]" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
