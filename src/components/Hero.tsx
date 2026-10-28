import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center bg-[#15251E] overflow-hidden">
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2000&auto=format&fit=crop"
          alt="Scented by the Garden botanical perfume in golden hour sunlight"
          className="w-full h-full object-cover object-center scale-102 transform duration-1000 ease-out"
        />
        {/* Editorial Gradients & Luxury Tinting */}
        <div className="absolute inset-0 bg-linear-to-r from-[#15251E]/95 via-[#20382D]/80 to-transparent lg:w-3/4" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#15251E]/30 to-[#15251E]/80" />
        {/* Soft Golden Hour Ambient Glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#B69A68]/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left max-w-2xl">
            {/* Monogram & Season Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#20382D]/80 border border-[#B69A68]/40 text-[#F7F3EB] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#B69A68]" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#B69A68]">
                Spring / Summer Botanical Harvest
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-7xl text-[#F7F3EB] font-light tracking-tight leading-[1.1]">
              Scented by the <span className="italic font-normal text-[#D9C398]">Garden</span>
            </h1>

            {/* Tagline & Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-[#F7F3EB]/90 font-sans font-light leading-relaxed max-w-xl">
              Discover fragrances inspired by nature, crafted for unforgettable moments. Rare botanical extracts, ancient woods, and blooming florals captured at peak dawn.
            </p>

            {/* Key Botanical Accords Pill Row */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs tracking-widest uppercase text-[#A6AD98] font-mono pt-1">
              <span>Sambac Jasmine</span>
              <span className="text-[#B69A68]">•</span>
              <span>Mysore Sandalwood</span>
              <span className="text-[#B69A68]">•</span>
              <span>Damask Rose</span>
              <span className="text-[#B69A68]">•</span>
              <span>Alpine Lavender</span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/collection"
                className="px-8 py-4 bg-[#B69A68] hover:bg-[#D9C398] text-[#20231F] text-xs uppercase tracking-[0.25em] font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl group"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/about"
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-[#F7F3EB] border border-[#B69A68]/60 text-xs uppercase tracking-[0.25em] font-medium flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-xs"
              >
                <Compass className="w-4 h-4 text-[#B69A68]" />
                <span>Discover Our Story</span>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-[#B69A68]/20 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block font-serif text-lg text-[#F7F3EB]">100%</span>
                <span className="text-[10px] uppercase tracking-wider text-[#A6AD98]">Artisanal Formulary</span>
              </div>
              <div>
                <span className="block font-serif text-lg text-[#F7F3EB]">24%</span>
                <span className="text-[10px] uppercase tracking-wider text-[#A6AD98]">Oil Concentration</span>
              </div>
              <div>
                <span className="block font-serif text-lg text-[#F7F3EB]">Cruelty-Free</span>
                <span className="text-[10px] uppercase tracking-wider text-[#A6AD98]">Botanical Ethos</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Visual Feature */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-72 sm:w-80 md:w-96 aspect-3/4 rounded-sm overflow-hidden border border-[#B69A68]/50 shadow-2xl p-2 bg-[#20382D]/60 backdrop-blur-md group">
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop"
                  alt="Forest Bloom signature bottle in botanical grove"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#15251E]/90 via-transparent to-transparent" />
                
                {/* Floating Botanical Badge */}
                <div className="absolute bottom-4 inset-x-4 p-4 bg-[#20382D]/90 border border-[#B69A68]/40 backdrop-blur-md">
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-lg text-[#F7F3EB]">Forest Bloom</span>
                    <span className="text-xs font-semibold text-[#B69A68]">₹2,499</span>
                  </div>
                  <p className="text-[11px] text-[#A6AD98] mt-1 line-clamp-1">
                    Himalayan cedar, crushed fern, wild cyclamen
                  </p>
                  <Link
                    to="/product/forest-bloom"
                    className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#B69A68] hover:text-[#F7F3EB] mt-2 font-medium"
                  >
                    View Fragrance <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#B69A68]" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#B69A68]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
