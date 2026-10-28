import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BOTANICAL_INGREDIENTS } from '../data/ingredients';

export const IngredientsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#FCFAF6] border-y border-[#A6AD98]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Botanical Origins</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#20382D] font-light tracking-tight">
              Rooted in Nature. Refined by Craft.
            </h2>
            <p className="text-sm sm:text-base text-[#20231F]/75 font-light leading-relaxed max-w-2xl">
              Great perfumery begins long before distillation. We work with nature’s cyclical rhythms, selecting blossoms when their essential aromatics peak, pairing ancient flora with refined contemporary alchemy.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#20382D] text-[#20382D] hover:bg-[#20382D] hover:text-[#F7F3EB] text-xs uppercase tracking-[0.2em] font-medium transition-all"
            >
              <span>Discover Our Story</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Botanical Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BOTANICAL_INGREDIENTS.slice(0, 6).map((ingredient) => (
            <div
              key={ingredient.id}
              className="group bg-white border border-[#A6AD98]/20 hover:border-[#B69A68]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-[#ECE5D8]">
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-3 text-[10px] font-mono tracking-widest text-[#F7F3EB] uppercase">
                  {ingredient.region}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-xl text-[#20382D] group-hover:text-[#B69A68] transition-colors">
                      {ingredient.name}
                    </h3>
                  </div>
                  <p className="text-[11px] italic font-serif text-[#A6AD98]">
                    {ingredient.latinName}
                  </p>
                  <p className="text-xs text-[#20231F]/75 mt-2 line-clamp-2 leading-relaxed">
                    {ingredient.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#A6AD98]/20 flex items-center justify-between text-[11px]">
                  <span className="text-[#B69A68] font-medium">{ingredient.character}</span>
                  <Link
                    to="/ingredients"
                    className="text-[#20382D] hover:text-[#B69A68] uppercase font-mono tracking-wider transition-colors inline-flex items-center gap-1"
                  >
                    Explore <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
