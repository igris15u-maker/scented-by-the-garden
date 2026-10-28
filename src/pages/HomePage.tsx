import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Droplets, Leaf, Award, HeartHandshake } from 'lucide-react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { SignatureScroll } from '../components/SignatureScroll';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { IngredientsSection } from '../components/IngredientsSection';
import { Newsletter } from '../components/Newsletter';
import { QuickViewModal } from '../components/QuickViewModal';
import { PRODUCTS, FRAGRANCE_FAMILIES } from '../data/products';
import { FAQ_ITEMS } from '../data/faq';
import { Product } from '../types/product';

export const HomePage: React.FC = () => {
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const filteredProducts = selectedFamily === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.family === selectedFamily);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Brand Value Proposition Banner */}
      <div className="bg-[#20382D] text-[#F7F3EB] border-b border-[#B69A68]/20 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Leaf className="w-5 h-5 text-[#B69A68]" />
            <span className="font-serif text-base text-[#F7F3EB]">Botanical Essences</span>
            <span className="text-[10px] text-[#A6AD98] uppercase tracking-wider">Unadulterated Harvests</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Droplets className="w-5 h-5 text-[#B69A68]" />
            <span className="font-serif text-base text-[#F7F3EB]">24% Pure Oil</span>
            <span className="text-[10px] text-[#A6AD98] uppercase tracking-wider">Extended 10h+ Sillage</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Award className="w-5 h-5 text-[#B69A68]" />
            <span className="font-serif text-base text-[#F7F3EB]">Artisanal Formulary</span>
            <span className="text-[10px] text-[#A6AD98] uppercase tracking-wider">Small-Batch Cured</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <HeartHandshake className="w-5 h-5 text-[#B69A68]" />
            <span className="font-serif text-base text-[#F7F3EB]">Complimentary Samples</span>
            <span className="text-[10px] text-[#A6AD98] uppercase tracking-wider">2ml Vial with Every Flacon</span>
          </div>
        </div>
      </div>

      {/* 3. Featured Collection Section */}
      <section className="py-20 lg:py-28 bg-[#F7F3EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Formulary</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#20382D] font-light tracking-tight">
              The Botanical Collection
            </h2>
            <p className="text-sm sm:text-base text-[#20231F]/75 mt-3 leading-relaxed font-light">
              Six signature formulations inspired by living sanctuaries. Each bottle is blended by master perfumers to capture distinct emotional landscapes.
            </p>

            {/* Fragrance Family Filter Tabs */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {FRAGRANCE_FAMILIES.map((fam) => (
                <button
                  key={fam}
                  onClick={() => setSelectedFamily(fam)}
                  className={`text-xs px-4 py-2 uppercase tracking-wider transition-all duration-200 ${
                    selectedFamily === fam
                      ? 'bg-[#20382D] text-[#F7F3EB] shadow-sm font-medium'
                      : 'bg-white/80 border border-[#A6AD98]/30 text-[#20231F] hover:border-[#B69A68] hover:text-[#20382D]'
                  }`}
                >
                  {fam}
                </button>
              ))}
            </div>
          </div>

          {/* 3-Column Desktop Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-14 text-center">
            <Link
              to="/collection"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#20382D] text-[#F7F3EB] hover:bg-[#B69A68] hover:text-[#20231F] text-xs uppercase tracking-[0.25em] font-medium transition-all shadow-md group"
            >
              <span>Explore All Fragrances & Sets</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Signature Perspective Scroll Section */}
      <SignatureScroll />

      {/* 5. Why Choose Scented by the Garden */}
      <WhyChooseUs />

      {/* 6. Botanical Ingredients Section */}
      <IngredientsSection />

      {/* 7. Client Reflections / Transparent Sample Reviews */}
      <section className="py-20 bg-[#20382D] text-[#F7F3EB] border-t border-[#B69A68]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68] block mb-2">
              Client Chronicles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F3EB] font-light">
              Illustrative Patron Reflections
            </h2>
            <div className="mt-2 inline-block px-3 py-1 bg-[#15251E] border border-[#B69A68]/40 text-[11px] font-mono text-[#D9C398] uppercase tracking-wider">
              Sample Demonstration Data • Replace with verified customer reviews upon launch
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#15251E] p-8 border border-[#B69A68]/30 space-y-4 flex flex-col justify-between">
              <p className="font-serif text-lg text-[#F7F3EB]/95 italic leading-relaxed">
                “Forest Bloom transported me directly to a misty Himalayan forest at sunrise. The damp cedarwood and crisp fern notes have incredible depth without being heavy.”
              </p>
              <div>
                <span className="block font-serif text-sm text-[#B69A68]">Ananya S. — New Delhi</span>
                <span className="text-[10px] uppercase tracking-widest text-[#A6AD98]">Sample Review • Forest Bloom</span>
              </div>
            </div>

            <div className="bg-[#15251E] p-8 border border-[#B69A68]/30 space-y-4 flex flex-col justify-between">
              <p className="font-serif text-lg text-[#F7F3EB]/95 italic leading-relaxed">
                “Sandalwood Serenity is pure meditative calm. I wear it daily to executive meetings and intimate dinners alike. The iris and coconut milk balance the sacred Mysore wood impeccably.”
              </p>
              <div>
                <span className="block font-serif text-sm text-[#B69A68]">Vikram R. — Bengaluru</span>
                <span className="text-[10px] uppercase tracking-widest text-[#A6AD98]">Sample Review • Sandalwood Serenity</span>
              </div>
            </div>

            <div className="bg-[#15251E] p-8 border border-[#B69A68]/30 space-y-4 flex flex-col justify-between">
              <p className="font-serif text-lg text-[#F7F3EB]/95 italic leading-relaxed">
                “The presentation box alone felt like an unboxing at a Parisian boutique. Jasmine Whisper is radiant and long-lasting; you can immediately discern the high botanical oil grade.”
              </p>
              <div>
                <span className="block font-serif text-sm text-[#B69A68]">Meera K. — Mumbai</span>
                <span className="text-[10px] uppercase tracking-widest text-[#A6AD98]">Sample Review • Jasmine Whisper</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Refined FAQ Accordion */}
      <section className="py-20 bg-[#F7F3EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68] block mb-2">
              Concierge Inquiries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#20382D] font-light">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#20231F]/70 mt-2 font-light">
              Explore guidance on olfactory concentration, shipping safeguards, and testing protocols.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.slice(0, 4).map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-[#A6AD98]/30 bg-white overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg sm:text-xl text-[#20382D]">
                      {faq.question}
                    </span>
                    <span className="text-lg font-light text-[#B69A68] shrink-0">
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-[#20231F]/75 leading-relaxed font-light border-t border-[#A6AD98]/15 pt-3 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="text-xs uppercase tracking-wider text-[#20382D] hover:text-[#B69A68] underline underline-offset-4 font-medium"
            >
              View Full FAQ & Care Guide
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Newsletter Section */}
      <Newsletter />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
