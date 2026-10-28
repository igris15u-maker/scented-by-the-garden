import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types/product';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredProducts: Product[] = query.trim()
    ? PRODUCTS.filter((p) => {
        const inName = p.name.toLowerCase().includes(trimmed);
        const inFamily = p.family.toLowerCase().includes(trimmed);
        const inDesc = p.description.toLowerCase().includes(trimmed);
        const inNotes =
          p.notes.top.some((n) => n.toLowerCase().includes(trimmed)) ||
          p.notes.heart.some((n) => n.toLowerCase().includes(trimmed)) ||
          p.notes.base.some((n) => n.toLowerCase().includes(trimmed));
        return inName || inFamily || inDesc || inNotes;
      })
    : PRODUCTS;

  const handleSelectProduct = (productId: string) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const quickPills = ['Jasmine', 'Sandalwood', 'Rosewood', 'Lavender', 'Citrus', 'Cedar'];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-start justify-center pt-12 sm:pt-20 px-4 pb-12"
      role="dialog"
      aria-modal="true"
      aria-label="Search Fragrances"
    >
      <div className="relative w-full max-w-3xl bg-[#F7F3EB] border border-[#B69A68]/40 shadow-2xl p-6 sm:p-8 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#20231F] hover:text-[#B69A68] transition-colors"
          aria-label="Close search modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#B69A68] uppercase block">
            Botanical Discovery
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#20382D] mt-1 font-normal">
            Search Our Fragrance Archive
          </h3>
        </div>

        {/* Search Input Box */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A6AD98]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by perfume name, note (e.g. Jasmine, Cedar, Vanilla)..."
            className="w-full bg-[#FCFAF6] border border-[#A6AD98]/50 pl-12 pr-10 py-3.5 text-[#20231F] placeholder:text-[#A6AD98] font-sans text-sm focus:outline-none focus:border-[#20382D] focus:ring-1 focus:ring-[#20382D] transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#A6AD98] hover:text-[#20231F]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Search Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs text-[#20231F]/60 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#B69A68]" /> Popular Notes:
          </span>
          {quickPills.map((pill) => (
            <button
              key={pill}
              onClick={() => setQuery(pill)}
              className={`text-xs px-3 py-1 border transition-colors ${
                query.toLowerCase() === pill.toLowerCase()
                  ? 'bg-[#20382D] text-[#F7F3EB] border-[#20382D]'
                  : 'bg-white/80 border-[#A6AD98]/40 text-[#20231F] hover:border-[#B69A68] hover:text-[#20382D]'
              }`}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-[#A6AD98]/20 pr-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-serif text-xl text-[#20382D]">No botanical fragrances found</p>
              <p className="text-sm text-[#A6AD98] mt-2 max-w-sm mx-auto">
                We could not find fragrances matching "{query}". Try exploring our key notes like Bergamot, Damask Rose, or Mysore Sandalwood.
              </p>
              <button
                onClick={() => setQuery('')}
                className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#B69A68] underline underline-offset-4"
              >
                View All Fragrances
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product.id)}
                className="py-4 flex items-center gap-4 group cursor-pointer hover:bg-white/50 px-2 transition-colors"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ECE5D8] overflow-hidden shrink-0 border border-[#A6AD98]/30">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-serif text-lg sm:text-xl text-[#20382D] group-hover:text-[#B69A68] transition-colors truncate">
                      {product.name}
                    </h4>
                    <span className="text-sm font-semibold text-[#20382D] shrink-0">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-xs text-[#B69A68] uppercase tracking-wider">
                    {product.family} • {product.defaultVolume}
                  </p>
                  <p className="text-xs text-[#20231F]/70 truncate mt-1">
                    Notes: {product.notes.top.slice(0, 2).join(', ')} • {product.notes.heart[0]} • {product.notes.base[0]}
                  </p>
                </div>
                <div className="shrink-0 text-[#A6AD98] group-hover:text-[#20382D] group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
