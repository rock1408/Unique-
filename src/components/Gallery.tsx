import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { BUSINESS_CONFIG, GalleryItem } from '../data/businessConfig';

type CategoryFilter = 'ALL' | 'GYM' | 'EQUIPMENT' | 'TRAINING' | 'CROSSFIT' | 'COMMUNITY';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories: CategoryFilter[] = ['ALL', 'GYM', 'EQUIPMENT', 'TRAINING', 'CROSSFIT', 'COMMUNITY'];

  const filteredItems = selectedCategory === 'ALL'
    ? BUSINESS_CONFIG.galleryItems
    : BUSINESS_CONFIG.galleryItems.filter(item => item.category === selectedCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const nextLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const prevLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  // Touch swipe support for mobile lightbox
  const [touchStartX, setTouchStartX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) nextLightboxImage();
      else prevLightboxImage();
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#070709] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#ccff00] block mb-2">
              Inside Unique Fitness
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              GYM <span className="text-[#ccff00]">GALLERY.</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md">
            Tour our Olympic free-weight zones, functional CrossFit turf, and cardio setups located at Harsha Layout, Kengeri.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`btn-filter-${cat}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 cursor-pointer h-72 sm:h-80 shadow-xl"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Category Tag */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-extrabold text-[#ccff00] uppercase tracking-wider border border-white/10">
                  {item.category}
                </span>
              </div>

              {/* Bottom Caption & View Icon */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <h3 className="text-base font-black text-white uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-1 mt-0.5">
                    {item.caption}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#ccff00] group-hover:text-black transition-colors shrink-0 ml-2">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full-Screen Interactive Lightbox Viewer */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between z-10 w-full max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-400">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ccff00]/20 text-[#ccff00] text-[10px] font-bold uppercase">
                {filteredItems[lightboxIndex].category}
              </span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white border border-white/20 transition-colors cursor-pointer"
              aria-label="Close image viewer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Image with Navigation Buttons */}
          <div className="relative flex-1 flex items-center justify-center my-4">
            <button
              onClick={(e) => { e.stopPropagation(); prevLightboxImage(); }}
              className="absolute left-2 sm:left-6 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/15 transition-all cursor-pointer z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={filteredItems[lightboxIndex].imageUrl}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[75vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />

            <button
              onClick={(e) => { e.stopPropagation(); nextLightboxImage(); }}
              className="absolute right-2 sm:right-6 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/15 transition-all cursor-pointer z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="text-center max-w-xl mx-auto z-10">
            <h3 className="text-lg font-black text-white uppercase">
              {filteredItems[lightboxIndex].title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              {filteredItems[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
