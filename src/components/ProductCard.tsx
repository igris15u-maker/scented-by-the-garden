import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFavorited = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    if (added) {
      showToast('wishlist', 'Saved to Wishlist', `${product.name} has been added to your favorites.`);
    } else {
      showToast('info', 'Removed from Wishlist', `${product.name} was removed from your favorites.`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.defaultVolume, 1);
    showToast('cart', 'Added to Bag', `${product.name} (${product.defaultVolume}) added to your fragrance bag.`);
  };

  return (
    <div className="group relative flex flex-col bg-white border border-[#A6AD98]/20 hover:border-[#B69A68]/60 transition-all duration-300 hover:shadow-xl">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.isBestSeller && (
          <span className="bg-[#20382D] text-[#F7F3EB] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-semibold shadow-xs">
            Bestseller
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-[#B69A68] text-[#20231F] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-semibold shadow-xs">
            New Formula
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-xs ${
          isFavorited
            ? 'bg-[#20382D] text-[#B69A68] shadow-md'
            : 'bg-white/80 text-[#20231F] hover:bg-[#20382D] hover:text-[#B69A68]'
        }`}
      >
        <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#B69A68]' : ''}`} />
      </button>

      {/* Image Container */}
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-4/5 bg-[#ECE5D8] overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Subtle Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <div className="absolute bottom-3 inset-x-3 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="w-full py-2 bg-white/95 text-[#20382D] text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#20382D] hover:text-[#F7F3EB] transition-colors flex items-center justify-center gap-1.5 shadow-md"
            >
              <Eye className="w-3.5 h-3.5" />
              Quick View
            </button>
          </div>
        )}
      </Link>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Family & Volume */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#B69A68]">
            <span>{product.family}</span>
            <span className="text-[#A6AD98]">{product.defaultVolume}</span>
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.id}`} className="block mt-1.5">
            <h3 className="font-serif text-xl sm:text-2xl text-[#20382D] group-hover:text-[#B69A68] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Fragrance Notes Highlights */}
          <p className="text-xs text-[#20231F]/70 mt-1 line-clamp-1">
            <span className="text-[#A6AD98]">Notes:</span> {product.notes.top[0]}, {product.notes.heart[0]}, {product.notes.base[0]}
          </p>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex text-[#B69A68]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-[#B69A68] text-[#B69A68]'
                      : 'text-[#A6AD98]/50'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-[#A6AD98]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Pricing and Add to Bag */}
        <div className="pt-3 border-t border-[#A6AD98]/20 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-serif font-bold text-[#20382D]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#A6AD98] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="px-3.5 py-2 bg-[#20382D] text-[#F7F3EB] hover:bg-[#B69A68] hover:text-[#20231F] text-[11px] uppercase tracking-[0.15em] font-medium transition-colors flex items-center gap-1.5 shadow-xs"
            aria-label={`Add ${product.name} to bag`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
