import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Compass, Leaf, Droplets, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#F7F3EB] min-h-screen">
      {/* Editorial Hero */}
      <div className="relative py-24 sm:py-32 bg-[#20382D] text-[#F7F3EB] overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1800&auto=format&fit=crop"
            alt="Botanical forest canopies at dawn"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68] block">
            Our Heritage & Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#F7F3EB] font-light tracking-tight">
            Nature, Bottled with Elegance
          </h1>
          <p className="text-sm sm:text-lg text-[#A6AD98] max-w-2xl mx-auto font-light leading-relaxed">
            {BRAND_CONFIG.name} was born from an unyielding devotion to natural botanical flora, classical alembic maceration, and the quiet sophistication of understated luxury.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        {/* Chapter 1: The Origin */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B69A68]">
              Chapter I • The Awakening
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#20382D] font-light">
              Where Wilderness Meets the Atelier
            </h2>
            <p className="text-sm text-[#20231F]/80 leading-relaxed font-light">
              In a world flooded with loud, synthetic scents engineered for immediate impact, we sought a different path. We were drawn to the quiet majesty of dawn-soaked gardens: the earthy respiration of pine needles, the fragile narcotic drift of night-blooming jasmine, and the grounding serenity of aged Mysore sandalwood.
            </p>
            <p className="text-sm text-[#20231F]/80 leading-relaxed font-light">
              Our founders—a collective of botanical preservationists and Grasse-trained perfumers—sought to create flacons that do not merely perfume the wearer, but transport them to living natural sanctuaries.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-4/3 bg-[#ECE5D8] overflow-hidden border border-[#A6AD98]/30 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=1000&auto=format&fit=crop"
                alt="Artisanal perfume blending flacons and botanicals"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Chapter 2: The Craft */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="aspect-4/3 bg-[#ECE5D8] overflow-hidden border border-[#A6AD98]/30 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop"
                alt="Perfume glass flacon with golden amber light"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B69A68]">
              Chapter II • The Method
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#20382D] font-light">
              Slow Maceration & High Concentration
            </h2>
            <p className="text-sm text-[#20231F]/80 leading-relaxed font-light">
              Every fragrance formula in our maison undergoes a minimum of 45 days of unhurried cold maceration. This patience allows complex aromatic botanical molecules to marry seamlessly, rounding sharp edges and revealing nuanced olfactory facets.
            </p>
            <p className="text-sm text-[#20231F]/80 leading-relaxed font-light">
              Formulated at 20% to 28% oil concentration, each blend achieves a radiant yet intimate sillage that evolves with your body’s unique warmth over 8 to 12 hours.
            </p>
          </div>
        </div>

        {/* Brand Pillars */}
        <div className="pt-10 border-t border-[#A6AD98]/30">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68] block mb-2">
              Our Core Tenets
            </span>
            <h3 className="font-serif text-3xl text-[#20382D]">
              Guiding Principles of Our Maison
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 border border-[#A6AD98]/30 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#20382D] text-[#B69A68] flex items-center justify-center mx-auto">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl text-[#20382D]">Botanical Integrity</h4>
              <p className="text-xs text-[#20231F]/75 leading-relaxed">
                Prioritizing botanical extracts harvested in harmony with local agrarian seasons without depleting endangered wild species.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#A6AD98]/30 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#20382D] text-[#B69A68] flex items-center justify-center mx-auto">
                <Droplets className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl text-[#20382D]">Understated Luxury</h4>
              <p className="text-xs text-[#20231F]/75 leading-relaxed">
                Refined, timeless packaging crafted with recyclable glass flacons, biodegradable batting, and forest-green presentation boxes.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#A6AD98]/30 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#20382D] text-[#B69A68] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl text-[#20382D]">Respectful Honesty</h4>
              <p className="text-xs text-[#20231F]/75 leading-relaxed">
                We believe in genuine transparent descriptions. We make no unverified therapeutic claims, simply celebrating honest perfumery craftsmanship.
              </p>
            </div>
          </div>
        </div>

        {/* CTA to Collection */}
        <div className="p-8 sm:p-12 bg-[#20382D] text-[#F7F3EB] text-center space-y-6">
          <h3 className="font-serif text-3xl sm:text-4xl text-[#F7F3EB] font-light">
            Experience the Fragrances Firsthand
          </h3>
          <p className="text-xs sm:text-sm text-[#A6AD98] max-w-md mx-auto leading-relaxed">
            Every full-sized flacon includes a matching 2 ml discovery tester vial so you can immerse yourself in the scent before opening.
          </p>
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#B69A68] hover:bg-[#D9C398] text-[#20231F] text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-md"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
