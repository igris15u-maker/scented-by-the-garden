import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShoppingBag, Sparkles, Layers } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const SignatureScroll: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const total = PRODUCTS.length;
  const currentProduct = PRODUCTS[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleQuickAdd = () => {
    addToCart(currentProduct, currentProduct.defaultVolume, 1);
    showToast('cart', 'Added to Bag', `${currentProduct.name} (${currentProduct.defaultVolume}) added.`);
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-20 lg:py-28 bg-[#182B22] text-[#F7F3EB] overflow-hidden border-y border-[#B69A68]/30"
    >
      {/* Background Ambience & Soft Atmospheric Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#B69A68]/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68] mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>The Perspective Atelier</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F7F3EB] font-light tracking-tight">
            The Signature Silhouette
          </h2>
          <p className="text-sm sm:text-base text-[#A6AD98] mt-3 font-light leading-relaxed">
            Experience our six signature extraits arranged in spatial depth. Explore olfactory accords as each flacon steps into the golden light.
          </p>
        </div>

        {/* 3D Perspective Arrangement Stage */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 min-h-[460px]">
          
          {/* Spatial Bottles Gallery Display */}
          <div className="w-full lg:w-7/12 relative flex items-center justify-center h-[380px] sm:h-[460px]">
            {PRODUCTS.map((prod, index) => {
              // Calculate spatial offset relative to activeIndex
              const offset = index - activeIndex;
              const isActive = index === activeIndex;

              // Compute perspective positioning
              let transform = '';
              let zIndex = 10 - Math.abs(offset);
              let opacity = 0.35;
              let filter = 'blur(3px) brightness(0.6)';

              if (isActive) {
                transform = 'translateX(0) scale(1) translateZ(0)';
                opacity = 1;
                filter = 'none';
                zIndex = 30;
              } else if (offset === -1 || (offset === total - 1 && activeIndex === 0)) {
                // Left neighbor
                transform = 'translateX(-110px) sm:translateX(-140px) scale(0.78) rotate(-4deg)';
                opacity = 0.5;
                filter = 'blur(1.5px) brightness(0.75)';
              } else if (offset === 1 || (offset === -(total - 1) && activeIndex === total - 1)) {
                // Right neighbor
                transform = 'translateX(110px) sm:translateX(140px) scale(0.78) rotate(4deg)';
                opacity = 0.5;
                filter = 'blur(1.5px) brightness(0.75)';
              } else {
                // Far background
                const direction = offset > 0 ? 1 : -1;
                transform = `translateX(${direction * 220}px) scale(0.6) rotate(${direction * 8}deg)`;
                opacity = 0.15;
                filter = 'blur(4px) brightness(0.4)';
              }

              return (
                <div
                  key={prod.id}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    transform,
                    zIndex,
                    opacity,
                    filter,
                    transition: 'all 600ms cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                  className="absolute cursor-pointer select-none group w-48 sm:w-60 aspect-3/4 rounded-xs overflow-hidden border border-[#B69A68]/40 shadow-2xl bg-[#15251E]"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 inset-x-3 text-center">
                    <span className="font-serif text-sm sm:text-base text-[#F7F3EB] block">
                      {prod.name}
                    </span>
                    <span className="text-[10px] text-[#B69A68] tracking-widest uppercase">
                      {prod.family}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Featured Product Information Detail Panel */}
          <div className="w-full lg:w-5/12 bg-[#20382D]/90 border border-[#B69A68]/40 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#B69A68]/20 pb-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B69A68]">
                Formula 0{activeIndex + 1} of 0{total}
              </span>
              <span className="text-xs px-2.5 py-0.5 bg-[#B69A68]/20 text-[#D9C398] border border-[#B69A68]/40">
                {currentProduct.family}
              </span>
            </div>

            <div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#F7F3EB] font-light">
                {currentProduct.name}
              </h3>
              <p className="text-xs text-[#A6AD98] uppercase tracking-wider mt-1">
                {currentProduct.subtitle} • {currentProduct.defaultVolume}
              </p>
              <p className="text-sm text-[#F7F3EB]/85 font-light leading-relaxed mt-4">
                {currentProduct.description}
              </p>
            </div>

            {/* Olfactory Pyramids Accord Breakdown */}
            <div className="space-y-2 pt-2 border-t border-[#B69A68]/20 text-xs">
              <div className="flex">
                <span className="w-20 text-[#A6AD98] font-mono uppercase text-[10px]">Top Notes:</span>
                <span className="text-[#F7F3EB] flex-1">{currentProduct.notes.top.join(', ')}</span>
              </div>
              <div className="flex">
                <span className="w-20 text-[#A6AD98] font-mono uppercase text-[10px]">Heart Notes:</span>
                <span className="text-[#F7F3EB] flex-1">{currentProduct.notes.heart.join(', ')}</span>
              </div>
              <div className="flex">
                <span className="w-20 text-[#A6AD98] font-mono uppercase text-[10px]">Base Notes:</span>
                <span className="text-[#F7F3EB] flex-1">{currentProduct.notes.base.join(', ')}</span>
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-4 flex items-center justify-between border-t border-[#B69A68]/20">
              <div>
                <span className="text-xs text-[#A6AD98] block">Price</span>
                <span className="font-serif text-2xl font-bold text-[#F7F3EB]">
                  ₹{currentProduct.price.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleQuickAdd}
                  className="px-5 py-2.5 bg-[#B69A68] hover:bg-[#D9C398] text-[#20231F] text-xs uppercase tracking-[0.15em] font-semibold flex items-center gap-2 transition-colors shadow-md"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
                <Link
                  to={`/product/${currentProduct.id}`}
                  className="px-4 py-2.5 border border-[#B69A68]/60 text-[#F7F3EB] hover:bg-white/10 text-xs uppercase tracking-[0.15em] transition-colors"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel & Perspective Controls */}
        <div className="mt-12 flex items-center justify-between max-w-sm mx-auto">
          <button
            onClick={handlePrev}
            className="p-3 border border-[#B69A68]/40 hover:border-[#B69A68] hover:bg-[#B69A68]/10 text-[#F7F3EB] transition-colors"
            aria-label="Previous fragrance in perspective view"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {PRODUCTS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to ${p.name}`}
                className={`h-1.5 transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-8 bg-[#B69A68]'
                    : 'w-2 bg-[#A6AD98]/40 hover:bg-[#A6AD98]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 border border-[#B69A68]/40 hover:border-[#B69A68] hover:bg-[#B69A68]/10 text-[#F7F3EB] transition-colors"
            aria-label="Next fragrance in perspective view"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
