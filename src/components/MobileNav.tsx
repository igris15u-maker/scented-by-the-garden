import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Search, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
  onOpenSearch: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  links,
  onOpenSearch,
}) => {
  const location = useLocation();
  const { wishlistCount } = useWishlist();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#20382D] text-[#F7F3EB] shadow-2xl flex flex-col justify-between p-6 z-10 border-r border-[#B69A68]/30">
        <div>
          {/* Top Bar with Brand and Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-[#B69A68]/20">
            <div>
              <span className="font-serif text-lg tracking-[0.2em] uppercase text-[#F7F3EB] block">
                Scented by the Garden
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#A6AD98]">
                Nature, Bottled with Elegance
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#F7F3EB] hover:text-[#B69A68] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="w-full mt-6 py-2.5 px-4 bg-[#15251E] border border-[#B69A68]/30 text-left text-xs text-[#A6AD98] flex items-center justify-between hover:border-[#B69A68] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#B69A68]" />
              Search by name, note, or mood...
            </span>
            <span className="text-[10px] text-[#B69A68] uppercase tracking-wider">Search</span>
          </button>

          {/* Navigation Links */}
          <nav className="mt-8 flex flex-col space-y-4">
            {links.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={onClose}
                  className={`text-lg font-serif tracking-[0.15em] py-2 flex items-center justify-between border-b border-[#B69A68]/10 transition-colors ${
                    isActive ? 'text-[#B69A68] font-medium' : 'text-[#F7F3EB] hover:text-[#B69A68]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-[#B69A68]/20 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs tracking-wider uppercase">
            <Link
              to="/wishlist"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-2.5 bg-[#15251E] border border-[#B69A68]/30 hover:border-[#B69A68] text-[#F7F3EB] transition-colors"
            >
              <Heart className="w-4 h-4 text-[#B69A68]" />
              Wishlist ({wishlistCount})
            </Link>
            <Link
              to="/cart"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-2.5 bg-[#B69A68] text-[#20231F] font-semibold hover:bg-[#D9C398] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Bag ({itemCount})
            </Link>
          </div>

          <p className="text-[10px] text-[#A6AD98] text-center tracking-widest uppercase">
            Artisanal Botanical Parfumerie
          </p>
        </div>
      </div>
    </div>
  );
};
