import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const WishlistPage: React.FC = () => {
  const { wishlistProducts, toggleWishlist, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleMoveToBag = (product: any) => {
    addToCart(product, product.defaultVolume, 1);
    showToast('cart', 'Added to Bag', `${product.name} moved to your fragrance bag.`);
  };

  const handleRemove = (productId: string, name: string) => {
    toggleWishlist(productId);
    showToast('info', 'Removed from Wishlist', `${name} was removed from your wishlist.`);
  };

  if (wishlistCount === 0) {
    return (
      <div className="bg-[#F7F3EB] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white border border-[#A6AD98]/30 p-10 text-center space-y-5 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#ECE5D8] flex items-center justify-center mx-auto text-[#20382D]">
            <Heart className="w-8 h-8 text-[#A6AD98]" />
          </div>
          <h2 className="font-serif text-3xl text-[#20382D]">Your Wishlist is Empty</h2>
          <p className="text-xs sm:text-sm text-[#20231F]/70 leading-relaxed font-light">
            You haven’t bookmarked any botanical fragrances yet. Save your favorite extraits to revisit or transfer to your bag at any moment.
          </p>
          <Link
            to="/collection"
            className="inline-block px-8 py-3.5 bg-[#20382D] text-[#F7F3EB] hover:bg-[#B69A68] hover:text-[#20231F] text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-md"
          >
            Explore The Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F3EB] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10 pb-4 border-b border-[#A6AD98]/30">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68] block">
              Curated Favorites
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#20382D] font-light mt-1">
              Your Personal Wishlist ({wishlistCount} Fragrances)
            </h1>
          </div>
          <button
            onClick={clearWishlist}
            className="text-xs text-[#A6AD98] hover:text-red-700 underline underline-offset-4 self-start sm:self-auto"
          >
            Clear Entire Wishlist
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-[#A6AD98]/30 flex flex-col justify-between overflow-hidden shadow-xs hover:border-[#B69A68] transition-all group"
            >
              <div>
                <div className="relative aspect-4/5 overflow-hidden bg-[#ECE5D8]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button
                    onClick={() => handleRemove(product.id, product.name)}
                    className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-[#20382D] text-[#20231F] hover:text-[#B69A68] rounded-full transition-colors backdrop-blur-xs"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#B69A68]">
                    <span>{product.family}</span>
                    <span className="text-[#A6AD98]">{product.defaultVolume}</span>
                  </div>

                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-serif text-2xl text-[#20382D] group-hover:text-[#B69A68] transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#20231F]/70 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <p className="font-serif text-xl font-bold text-[#20382D] pt-2">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex gap-2">
                <button
                  onClick={() => handleMoveToBag(product)}
                  className="flex-1 py-3 bg-[#20382D] hover:bg-[#B69A68] text-[#F7F3EB] hover:text-[#20231F] text-xs uppercase tracking-[0.15em] font-medium flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Move to Bag</span>
                </button>

                <Link
                  to={`/product/${product.id}`}
                  className="px-4 py-3 border border-[#A6AD98]/50 hover:border-[#20382D] text-xs uppercase tracking-wider text-[#20382D] flex items-center justify-center transition-colors"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
