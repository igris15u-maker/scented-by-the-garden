import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Droplets,
  Layers,
  Clock,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = PRODUCTS.find((p) => p.id === id);

  // States
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedVolume, setSelectedVolume] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'notes' | 'story' | 'ritual' | 'delivery'>('notes');

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setSelectedVolume(product.defaultVolume);
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-[#F7F3EB]">
        <h2 className="font-serif text-3xl text-[#20382D]">Fragrance Not Found</h2>
        <p className="text-sm text-[#20231F]/70 mt-2 max-w-sm">
          The requested perfume formula is not currently in our archive or may have been retired.
        </p>
        <Link
          to="/collection"
          className="mt-6 px-6 py-3 bg-[#20382D] text-[#F7F3EB] text-xs uppercase tracking-widest hover:bg-[#B69A68] hover:text-[#20231F] transition-colors"
        >
          Return to Collection
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const volumeOption = product.volumeOptions.find((v) => v.size === selectedVolume);
  const currentPrice = volumeOption ? volumeOption.price : product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedVolume, quantity);
    showToast('cart', 'Added to Bag', `${quantity}x ${product.name} (${selectedVolume}) added to your bag.`);
  };

  const handleWishlist = () => {
    const added = toggleWishlist(product.id);
    if (added) {
      showToast('wishlist', 'Saved to Wishlist', `${product.name} added to your wishlist.`);
    } else {
      showToast('info', 'Removed from Wishlist', `${product.name} removed from your wishlist.`);
    }
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-[#F7F3EB] min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#A6AD98]/20 bg-[#FCFAF6] py-3 text-xs text-[#A6AD98]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2">
          <Link to="/" className="hover:text-[#20382D] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/collection" className="hover:text-[#20382D] transition-colors">
            Collection
          </Link>
          <span>/</span>
          <span className="text-[#20382D] font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-4/5 w-full bg-[#ECE5D8] border border-[#A6AD98]/30 overflow-hidden shadow-lg group">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="bg-[#20382D] text-[#F7F3EB] text-[10px] uppercase font-mono tracking-widest px-3 py-1 shadow-xs">
                  {product.family}
                </span>
                {product.isBestSeller && (
                  <span className="bg-[#B69A68] text-[#20231F] text-[10px] uppercase font-mono tracking-widest px-3 py-1 font-semibold shadow-xs">
                    Signature Choice
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails Row */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`aspect-square overflow-hidden bg-[#ECE5D8] border transition-all ${
                      selectedImage === imgUrl
                        ? 'border-[#20382D] ring-1 ring-[#20382D]'
                        : 'border-[#A6AD98]/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information, Notes & Purchase Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Rating and Reviews */}
              <div className="flex items-center gap-2 text-xs text-[#B69A68]">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#B69A68] text-[#B69A68]'
                          : 'text-[#A6AD98]/40'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium text-[#20382D]">{product.rating}</span>
                <span className="text-[#A6AD98]">({product.reviewCount} Connoisseur Reviews)</span>
              </div>

              {/* Title & Tagline */}
              <h1 className="font-serif text-3xl sm:text-5xl text-[#20382D] font-light mt-2 tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs uppercase tracking-[0.25em] text-[#B69A68] font-mono mt-1">
                {product.subtitle} • {product.family}
              </p>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#20382D]">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#A6AD98] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-[#20382D]/70 ml-2">
                  (Inclusive of luxury GST & duties)
                </span>
              </div>
            </div>

            {/* Short Tagline / Hook */}
            <p className="text-sm sm:text-base text-[#20231F]/80 leading-relaxed font-light italic">
              "{product.tagline}"
            </p>

            {/* Performance Indicators */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-white border border-[#A6AD98]/30 text-center">
              <div>
                <span className="text-[10px] text-[#A6AD98] uppercase tracking-wider block">Longevity</span>
                <span className="font-serif text-sm font-semibold text-[#20382D]">{product.longevity}</span>
              </div>
              <div className="border-x border-[#A6AD98]/20">
                <span className="text-[10px] text-[#A6AD98] uppercase tracking-wider block">Intensity</span>
                <span className="font-serif text-sm font-semibold text-[#20382D]">{product.intensity}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#A6AD98] uppercase tracking-wider block">Sillage</span>
                <span className="font-serif text-sm font-semibold text-[#20382D]">{product.sillage}</span>
              </div>
            </div>

            {/* Flacon Volume Selector */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-[#20382D] font-medium block">
                Select Flacon Volume
              </label>
              <div className="grid grid-cols-2 gap-3">
                {product.volumeOptions.map((v) => (
                  <button
                    key={v.size}
                    type="button"
                    onClick={() => setSelectedVolume(v.size)}
                    className={`py-3 px-4 border text-left flex items-center justify-between transition-all ${
                      selectedVolume === v.size
                        ? 'border-[#20382D] bg-[#20382D] text-[#F7F3EB] shadow-xs'
                        : 'border-[#A6AD98]/40 bg-white text-[#20231F] hover:border-[#B69A68]'
                    }`}
                  >
                    <div>
                      <span className="font-serif text-base block font-medium">{v.size}</span>
                      <span className="text-[10px] tracking-wider opacity-80 uppercase">
                        Travel / Vanity
                      </span>
                    </div>
                    <span className="text-sm font-bold font-mono">
                      ₹{v.price.toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="pt-2 space-y-4">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#A6AD98]/60 bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-3 text-sm text-[#20231F] hover:bg-[#ECE5D8] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-semibold text-[#20382D]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 py-3 text-sm text-[#20231F] hover:bg-[#ECE5D8] transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-[#20382D] hover:bg-[#B69A68] text-[#F7F3EB] hover:text-[#20231F] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2.5 transition-all shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Fragrance Bag</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={handleWishlist}
                  aria-label="Toggle wishlist"
                  className={`p-3.5 border transition-all ${
                    isFavorited
                      ? 'border-[#20382D] bg-[#20382D] text-[#B69A68]'
                      : 'border-[#A6AD98]/60 bg-white text-[#20231F] hover:border-[#B69A68]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#B69A68]' : ''}`} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="space-y-2 pt-2 text-xs text-[#20231F]/80">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#B69A68] shrink-0" />
                  <span>
                    Complimentary express dispatch across India on orders over ₹1,999.
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Droplets className="w-4 h-4 text-[#B69A68] shrink-0" />
                  <span>
                    Includes complimentary 2 ml sample vial to test before unsealing.
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-[#B69A68] shrink-0" />
                  <span>14-day returns on unopened, sealed flacons.</span>
                </div>
              </div>
            </div>

            {/* Olfactory Information Tabs */}
            <div className="pt-6 border-t border-[#A6AD98]/30">
              <div className="flex border-b border-[#A6AD98]/30">
                {[
                  { id: 'notes', label: 'Olfactory Pyramid' },
                  { id: 'story', label: 'The Inspiration' },
                  { id: 'ritual', label: 'Wearing Ritual' },
                  { id: 'delivery', label: 'Shipping & Box' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-2.5 px-3 sm:px-4 text-xs font-serif tracking-wider uppercase transition-colors relative ${
                      activeTab === tab.id
                        ? 'text-[#20382D] font-bold'
                        : 'text-[#A6AD98] hover:text-[#20382D]'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#20382D]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="py-5 text-xs sm:text-sm text-[#20231F]/80 leading-relaxed font-light">
                {activeTab === 'notes' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-white border border-[#A6AD98]/20 space-y-3">
                      <div>
                        <strong className="font-serif text-[#20382D] text-sm block">
                          Top Notes (Initial 15–30 Minutes):
                        </strong>
                        <span className="text-[#B69A68] font-medium">{product.notes.top.join(' • ')}</span>
                      </div>
                      <div className="pt-2 border-t border-[#A6AD98]/20">
                        <strong className="font-serif text-[#20382D] text-sm block">
                          Heart Notes (2–4 Hours):
                        </strong>
                        <span className="text-[#20382D] font-medium">{product.notes.heart.join(' • ')}</span>
                      </div>
                      <div className="pt-2 border-t border-[#A6AD98]/20">
                        <strong className="font-serif text-[#20382D] text-sm block">
                          Base Notes (6–12+ Hours):
                        </strong>
                        <span className="text-[#7A816C] font-medium">{product.notes.base.join(' • ')}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'story' && (
                  <div className="space-y-3 animate-fade-in bg-white p-5 border border-[#A6AD98]/20">
                    <p className="font-serif text-base text-[#20382D] italic">
                      "{product.story}"
                    </p>
                    <p className="mt-2 text-xs text-[#20231F]/70">
                      Crafted through meticulous botanical extractions, balancing volatile wildflowers with grounded sacred woods.
                    </p>
                  </div>
                )}

                {activeTab === 'ritual' && (
                  <div className="space-y-2 animate-fade-in bg-white p-5 border border-[#A6AD98]/20 text-xs">
                    <p>
                      <strong>Recommended Occasion:</strong> {product.occasion}
                    </p>
                    <p>
                      <strong>Application:</strong> Mist across pulse points—collarbone, inner wrists, and behind earlobes. Allow the scent to settle naturally on the skin without rubbing to preserve the delicate top note molecules.
                    </p>
                  </div>
                )}

                {activeTab === 'delivery' && (
                  <div className="space-y-2 animate-fade-in bg-white p-5 border border-[#A6AD98]/20 text-xs">
                    <p>
                      Every flacon is enveloped in our signature forest green presentation box, cushioned by recycled plant cellulose and tied with champagne grosgrain ribbon.
                    </p>
                    <p>
                      Standard dispatch takes 24–48 hours from our Mumbai atelier. Trackable delivery updates are shared via email and SMS.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Recommendation Carousel */}
        <div className="mt-20 pt-14 border-t border-[#A6AD98]/30">
          <div className="text-center mb-10">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68] block mb-1">
              Harmonious Compositions
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#20382D] font-light">
              You May Also Cherish
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
