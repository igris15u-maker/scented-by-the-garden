import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, RotateCcw, Sparkles } from 'lucide-react';
import { PRODUCTS, FRAGRANCE_FAMILIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { Product } from '../types/product';

export const CollectionPage: React.FC = () => {
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(3500);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Family filter
      if (selectedFamily !== 'All' && p.family !== selectedFamily) return false;
      // Price filter
      if (p.price > maxPrice) return false;
      // Stock filter
      if (onlyInStock && !p.inStock) return false;
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesFamily = p.family.toLowerCase().includes(query);
        const matchesNotes =
          p.notes.top.some((n) => n.toLowerCase().includes(query)) ||
          p.notes.heart.some((n) => n.toLowerCase().includes(query)) ||
          p.notes.base.some((n) => n.toLowerCase().includes(query));
        if (!matchesName && !matchesFamily && !matchesNotes) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedFamily, sortBy, maxPrice, onlyInStock, searchQuery]);

  const handleResetFilters = () => {
    setSelectedFamily('All');
    setSortBy('featured');
    setMaxPrice(3500);
    setOnlyInStock(false);
    setSearchQuery('');
  };

  return (
    <div className="bg-[#F7F3EB] min-h-screen">
      {/* Editorial Page Header */}
      <div className="bg-[#20382D] text-[#F7F3EB] py-16 sm:py-20 border-b border-[#B69A68]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fragrance Formulary</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F7F3EB] font-light tracking-tight">
            The Botanical Archive
          </h1>
          <p className="text-sm sm:text-base text-[#A6AD98] max-w-xl mx-auto font-light leading-relaxed">
            Explore handcrafted botanical extraits formulated with pure plant essences, aromatic woods, and rare blossoms.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Top Controls Bar */}
        <div className="bg-white p-4 sm:p-5 border border-[#A6AD98]/30 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xs">
          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A6AD98]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by fragrance or note (e.g. Jasmine, Cedar)..."
              className="w-full pl-9 pr-3 py-2 bg-[#FCFAF6] border border-[#A6AD98]/40 text-xs text-[#20231F] focus:outline-none focus:border-[#20382D]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#A6AD98] hover:text-[#20231F]"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 justify-between md:justify-end">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden px-3.5 py-2 border border-[#A6AD98]/50 text-xs text-[#20231F] flex items-center gap-2"
            >
              <Filter className="w-3.5 h-3.5 text-[#B69A68]" />
              <span>Filters</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#A6AD98] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FCFAF6] border border-[#A6AD98]/40 text-xs text-[#20231F] px-3 py-2 focus:outline-none focus:border-[#20382D]"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name-asc">Alphabetical: A - Z</option>
                <option value="name-desc">Alphabetical: Z - A</option>
              </select>
            </div>

            {/* Product Count */}
            <span className="text-xs text-[#A6AD98] whitespace-nowrap">
              {filteredProducts.length} Fragrances
            </span>
          </div>
        </div>

        {/* Main Content Layout (Sidebar Filters + Products Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Sidebar Filters */}
          <aside
            className={`lg:col-span-3 bg-white border border-[#A6AD98]/30 p-6 space-y-8 ${
              isMobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#A6AD98]/20">
              <h3 className="font-serif text-lg text-[#20382D] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#B69A68]" />
                Refine Selection
              </h3>
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-[#B69A68] hover:text-[#20382D] flex items-center gap-1 font-medium"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Fragrance Family Filter */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[#20382D] font-medium">
                Fragrance Family
              </h4>
              <div className="space-y-1.5">
                {FRAGRANCE_FAMILIES.map((fam) => (
                  <label
                    key={fam}
                    className="flex items-center gap-2.5 text-xs text-[#20231F]/80 cursor-pointer hover:text-[#20382D]"
                  >
                    <input
                      type="radio"
                      name="family"
                      checked={selectedFamily === fam}
                      onChange={() => setSelectedFamily(fam)}
                      className="accent-[#20382D] w-3.5 h-3.5"
                    />
                    <span>{fam}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3 pt-4 border-t border-[#A6AD98]/20">
              <div className="flex justify-between items-center text-xs">
                <h4 className="uppercase tracking-widest text-[#20382D] font-medium">
                  Maximum Price
                </h4>
                <span className="font-mono text-[#B69A68] font-semibold">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="1800"
                max="3500"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#20382D] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#A6AD98]">
                <span>₹1,800</span>
                <span>₹3,500</span>
              </div>
            </div>

            {/* In Stock Filter */}
            <div className="space-y-3 pt-4 border-t border-[#A6AD98]/20">
              <label className="flex items-center gap-2.5 text-xs text-[#20231F] cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="accent-[#20382D] w-4 h-4"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* Guarantee Note */}
            <div className="p-4 bg-[#FCFAF6] border border-[#B69A68]/30 text-[11px] text-[#20231F]/70 leading-relaxed">
              <p className="font-serif font-medium text-[#20382D] text-xs mb-1">
                The Scented Promise
              </p>
              Every bottle includes a complimentary matching 2 ml discovery vial to test before unsealing the full bottle.
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#A6AD98]/30 p-12 text-center space-y-4">
                <h4 className="font-serif text-2xl text-[#20382D]">
                  No Fragrances Match Your Criteria
                </h4>
                <p className="text-xs text-[#20231F]/70 max-w-sm mx-auto">
                  Try adjusting your price range, searching for different olfactory notes, or clearing your family filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-[#20382D] text-[#F7F3EB] text-xs uppercase tracking-wider hover:bg-[#B69A68] hover:text-[#20231F] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
