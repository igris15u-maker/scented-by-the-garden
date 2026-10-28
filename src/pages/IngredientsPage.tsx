import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, MapPin, Droplets, Compass } from 'lucide-react';
import { BOTANICAL_INGREDIENTS } from '../data/ingredients';

export const IngredientsPage: React.FC = () => {
  return (
    <div className="bg-[#F7F3EB] min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#20382D] text-[#F7F3EB] py-16 sm:py-24 border-b border-[#B69A68]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Botanical Atlas</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#F7F3EB] font-light tracking-tight">
            Our Botanical Ingredients
          </h1>
          <p className="text-sm sm:text-base text-[#A6AD98] max-w-xl mx-auto font-light leading-relaxed">
            The foundation of exceptional perfumery lies in raw botanical purity. Discover the geographic provenance, scent character, and extraction rituals of our sacred flora.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BOTANICAL_INGREDIENTS.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#A6AD98]/30 flex flex-col justify-between overflow-hidden shadow-xs hover:border-[#B69A68] transition-all"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-[#ECE5D8]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-widest text-[#F7F3EB] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#B69A68]" /> {item.region}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#20382D]">
                      {item.name}
                    </h3>
                    <p className="text-xs italic font-serif text-[#A6AD98]">
                      {item.latinName}
                    </p>
                  </div>

                  <p className="text-xs text-[#20231F]/80 leading-relaxed font-light">
                    {item.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#A6AD98]/20 text-xs">
                    <div>
                      <span className="text-[#A6AD98] block uppercase text-[10px] tracking-wider font-mono">
                        Scent Profile:
                      </span>
                      <span className="text-[#20382D] font-medium">{item.scentProfile}</span>
                    </div>

                    <div>
                      <span className="text-[#A6AD98] block uppercase text-[10px] tracking-wider font-mono">
                        Extraction Method:
                      </span>
                      <span className="text-[#20231F]/80">{item.extractionMethod}</span>
                    </div>

                    <div>
                      <span className="text-[#A6AD98] block uppercase text-[10px] tracking-wider font-mono">
                        Key Presence In:
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {item.foundIn.map((fragrance) => (
                          <span
                            key={fragrance}
                            className="text-[10px] bg-[#ECE5D8] px-2 py-0.5 text-[#20382D] font-medium"
                          >
                            {fragrance}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/collection"
                  className="w-full py-2.5 bg-[#FCFAF6] border border-[#20382D]/20 hover:border-[#20382D] hover:bg-[#20382D] hover:text-[#F7F3EB] text-xs uppercase tracking-wider text-[#20382D] transition-colors flex items-center justify-center gap-1.5 font-medium"
                >
                  <span>Explore Fragrances</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Botanical Philosophy Quote Box */}
        <div className="p-10 bg-[#20382D] text-[#F7F3EB] border border-[#B69A68]/40 text-center space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#B69A68]">
            Ethical Stewardship
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#F7F3EB] font-light max-w-2xl mx-auto">
            “To distill a flower is to preserve its living song without silencing the garden.”
          </h3>
          <p className="text-xs text-[#A6AD98] max-w-lg mx-auto leading-relaxed">
            We partner with certified generational growers who safeguard ancient flora through regenerative harvesting cycles.
          </p>
        </div>
      </div>
    </div>
  );
};
