import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS, FAQItem } from '../data/faq';

export const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Fragrance & Composition', 'Care & Storage', 'Shipping & Packaging', 'Samples & Returns'];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="bg-[#F7F3EB] min-h-screen">
      {/* Editorial Header */}
      <div className="bg-[#20382D] text-[#F7F3EB] py-16 sm:py-20 border-b border-[#B69A68]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Customer Guidance</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#F7F3EB] font-light tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-[#A6AD98] max-w-lg mx-auto font-light leading-relaxed">
            Essential insights regarding our botanical formulations, flacon preservation, sample testing rituals, and express delivery safeguards.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        {/* Search & Categories Bar */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A6AD98]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guidance by keyword (e.g. storage, return, sample, oil)..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#A6AD98]/40 text-xs text-[#20231F] focus:outline-none focus:border-[#20382D] shadow-xs"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-1.5 transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#20382D] text-[#F7F3EB] font-medium'
                    : 'bg-white border border-[#A6AD98]/30 text-[#20231F] hover:border-[#B69A68]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 bg-white text-center border border-[#A6AD98]/30 space-y-2">
              <p className="font-serif text-xl text-[#20382D]">No matching questions found</p>
              <p className="text-xs text-[#20231F]/70">
                Please contact our concierge team directly or clear your search terms.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-[#A6AD98]/30 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#B69A68] block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl text-[#20382D]">
                        {faq.question}
                      </h3>
                    </div>
                    <span className="text-xl font-light text-[#B69A68] shrink-0">
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#20231F]/80 leading-relaxed font-light border-t border-[#A6AD98]/15 pt-4 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions? */}
        <div className="p-8 bg-[#20382D] text-[#F7F3EB] border border-[#B69A68]/30 text-center space-y-4">
          <h3 className="font-serif text-2xl text-[#F7F3EB]">Require Personal Fragrance Advisory?</h3>
          <p className="text-xs text-[#A6AD98] max-w-md mx-auto leading-relaxed">
            Our atelier concierge is pleased to assist with customized olfactory advice or order guidance.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#B69A68] hover:bg-[#D9C398] text-[#20231F] text-xs uppercase tracking-[0.15em] font-semibold transition-colors"
          >
            <span>Speak with Concierge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
