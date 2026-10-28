import React from 'react';
import { Flower2, Sparkles, Feather, ShieldCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      icon: Flower2,
      title: 'Botanical Inspiration',
      desc: 'Formulations drawn from living flora, wild highland herbs, and century-old sacred woods, capturing nature’s purest breathing moments.',
    },
    {
      icon: Sparkles,
      title: 'Thoughtfully Selected Ingredients',
      desc: 'Each raw material is chosen at peak blooming hours with strict respect for natural ecosystems, avoiding unvetted synthetics.',
    },
    {
      icon: Feather,
      title: 'Distinctive Fragrance Profiles',
      desc: 'Complex compositions that evolve seamlessly across hours, creating an intimate, memorable aura without overpowering the senses.',
    },
    {
      icon: ShieldCheck,
      title: 'Refined Craftsmanship',
      desc: 'A fusion of classical slow-maceration techniques and precision perfumery for unparalleled stability and olfactory finesse.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F3EB] text-[#20231F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68] block mb-2">
            The Botanical Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#20382D] font-light tracking-tight">
            Why Choose Scented by the Garden
          </h2>
          <p className="text-sm sm:text-base text-[#20231F]/70 mt-4 leading-relaxed font-light">
            We marry the untamed beauty of natural botanicals with timeless perfumery craft to create scents of subtle distinction.
          </p>
        </div>

        {/* Central Bottle Layout with 4 Balanced Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (2 Benefits) */}
          <div className="lg:col-span-4 space-y-10 order-2 lg:order-1 text-center lg:text-right">
            {benefits.slice(0, 2).map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="group flex flex-col lg:items-end space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#20382D] text-[#B69A68] flex items-center justify-center mx-auto lg:mr-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#20382D] font-medium">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#20231F]/75 font-sans leading-relaxed max-w-sm mx-auto lg:mr-0">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Center Column: Bottle Visual with Orbital Rings */}
          <div className="lg:col-span-4 flex justify-center order-1 lg:order-2 my-4 lg:my-0">
            <div className="relative w-64 sm:w-72 aspect-3/4 flex items-center justify-center">
              {/* Outer Orbital Rings (Desktop Animation) */}
              <div className="absolute inset-0 border border-[#B69A68]/30 rounded-full animate-spin [animation-duration:25s] pointer-events-none hidden md:block" />
              <div className="absolute -inset-4 border border-dashed border-[#20382D]/20 rounded-full animate-spin [animation-duration:40s] pointer-events-none hidden md:block" />

              {/* Perfume Bottle Image Card */}
              <div className="relative w-full h-full rounded-sm overflow-hidden border border-[#B69A68]/40 shadow-2xl bg-[#ECE5D8]">
                <img
                  src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop"
                  alt="Scented by the Garden artisanal glass perfume bottle"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#20382D]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 inset-x-4 text-center">
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#D9C398] block">
                    Distilled In Glass
                  </span>
                  <span className="font-serif text-base text-[#F7F3EB]">
                    Pure Botanical Essence
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (2 Benefits) */}
          <div className="lg:col-span-4 space-y-10 order-3 text-center lg:text-left">
            {benefits.slice(2, 4).map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="group flex flex-col lg:items-start space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#20382D] text-[#B69A68] flex items-center justify-center mx-auto lg:ml-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#20382D] font-medium">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#20231F]/75 font-sans leading-relaxed max-w-sm mx-auto lg:ml-0">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
