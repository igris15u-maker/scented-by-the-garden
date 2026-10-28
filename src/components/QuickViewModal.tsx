import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, ArrowRight, Star, ShieldCheck, Sparkles } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const [selectedVolume, setSelectedVolume] = useState(product.defaultVolume);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFavorited = isInWishlist(product.id);
  const currentVolumeOption = product.volumeOptions.find((v) => v.size === selectedVolume);
  const currentPrice = currentVolumeOption ? currentVolumeOption.price : product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedVolume, quantity);
    showToast('cart', 'Added to Bag', `${quantity}x ${product.name} (${selectedVolume}) added.`);
    onClose();
  };

  const handleWishlist = () => {
    const added = toggleWishlist(product.id);
    if (added) {
      showToast('wishlist', 'Saved to Wishlist', `${product.name} added to your favorites.`);
    } else {
      showToast('info', 'Removed from Wishlist', `${product.name} removed.`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Fragrance Quick View"
    >
      <div className="relative w-full max-w-4xl bg-[#FCFAF6] border border-[#B69A68]/40 shadow-2xl overflow-hidden my-8 animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#20231F] hover:text-[#B69A68] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-auto bg-[#ECE5D8] overflow-hidden">
            {imageError ? (
              <div className="w-full h-full bg-[#1e2f26] text-[#F7F3EB] flex flex-col items-center justify-center p-8 text-center min-h-[350px]">
                <Sparkles className="w-8 h-8 text-[#B69A68] mb-3" />
                <span className="font-serif text-2xl text-[#F7F3EB]">{product.name}</span>
                <span className="text-xs text-[#A6AD98] uppercase tracking-widest mt-1">
                  {product.family}
                </span>
              </div>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center"
              />
            )}
            <div className="absolute top-4 left-4">
              <span className="bg-[#20382D] text-[#F7F3EB] text-[10px] uppercase font-mono tracking-widest px-3 py-1 shadow-sm">
                {product.family}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#B69A68]">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#B69A68] text-[#B69A68]'
                          : 'text-[#A6AD98]/50'
                      }`}
                    />
                  ))}
                </div>
                <span>({product.reviewCount} Reviews)</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#20382D] mt-2 font-light">
                {product.name}
              </h3>
              <p className="text-xs text-[#A6AD98] uppercase tracking-widest mt-1">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-serif text-2xl font-bold text-[#20382D]">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#A6AD98] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#20231F]/80 leading-relaxed font-light mt-3">
                {product.description}
              </p>

              {/* Fragrance Notes */}
              <div className="mt-4 pt-3 border-t border-[#A6AD98]/20 space-y-1 text-xs">
                <p>
                  <strong className="text-[#20382D]">Top Notes:</strong>{' '}
                  <span className="text-[#20231F]/75">{product.notes.top.join(', ')}</span>
                </p>
                <p>
                  <strong className="text-[#20382D]">Heart Notes:</strong>{' '}
                  <span className="text-[#20231F]/75">{product.notes.heart.join(', ')}</span>
                </p>
                <p>
                  <strong className="text-[#20382D]">Base Notes:</strong>{' '}
                  <span className="text-[#20231F]/75">{product.notes.base.join(', ')}</span>
                </p>
              </div>

              {/* Volume Options */}
              <div className="mt-5 space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-[#A6AD98] block">
                  Select Flacon Size
                </label>
                <div className="flex gap-2.5">
                  {product.volumeOptions.map((v) => (
                    <button
                      key={v.size}
                      type="button"
                      onClick={() => setSelectedVolume(v.size)}
                      className={`px-4 py-2 text-xs border transition-colors ${
                        selectedVolume === v.size
                          ? 'border-[#20382D] bg-[#20382D] text-[#F7F3EB]'
                          : 'border-[#A6AD98]/40 bg-white text-[#20231F] hover:border-[#B69A68]'
                      }`}
                    >
                      {v.size} — ₹{v.price.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#A6AD98]/20 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#A6AD98]/50 bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-sm text-[#20231F] hover:bg-[#ECE5D8]"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold text-[#20382D]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-sm text-[#20231F] hover:bg-[#ECE5D8]"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-[#20382D] text-[#F7F3EB] hover:bg-[#B69A68] hover:text-[#20231F] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={handleWishlist}
                  aria-label="Toggle wishlist"
                  className={`p-3 border transition-colors ${
                    isFavorited
                      ? 'border-[#20382D] bg-[#20382D] text-[#B69A68]'
                      : 'border-[#A6AD98]/50 bg-white text-[#20231F] hover:border-[#B69A68]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#B69A68]' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="text-[#20382D] hover:text-[#B69A68] underline underline-offset-4 flex items-center gap-1 font-medium"
                >
                  View Full Product Ritual & Reviews <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[10px] text-[#A6AD98] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B69A68]" /> Complies with IFRA standards
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
