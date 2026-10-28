import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SearchModal } from './SearchModal';
import { CartDrawer } from './CartDrawer';
import { MobileNav } from './MobileNav';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { itemCount, isCartOpen, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Collection', href: '/collection' },
    { label: 'Our Ingredients', href: '/ingredients' },
    { label: 'Our Story', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#20382D] text-[#F7F3EB] text-[11px] uppercase tracking-[0.25em] py-2 px-4 text-center border-b border-[#B69A68]/20 flex items-center justify-center gap-3">
        <span>Complimentary Handcrafted Gift Packaging & Shipping Across India Above ₹1,999</span>
        <span className="hidden md:inline text-[#B69A68]">•</span>
        <span className="hidden md:inline text-[#B69A68] font-medium">Use Code GARDEN10 for 10% Off</span>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#20382D]/95 backdrop-blur-md shadow-lg py-3 text-[#F7F3EB] border-b border-[#B69A68]/30'
            : 'bg-[#20382D] text-[#F7F3EB] py-5 border-b border-[#B69A68]/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="p-2 text-[#F7F3EB] hover:text-[#B69A68] transition-colors focus:outline-none focus:ring-1 focus:ring-[#B69A68]"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Brand Wordmark */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link
              to="/"
              className="inline-block group focus:outline-none"
              aria-label="Scented by the Garden Homepage"
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.22em] uppercase font-light text-[#F7F3EB] group-hover:text-[#B69A68] transition-colors">
                  Scented by the Garden
                </span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-[#A6AD98] font-sans -mt-0.5">
                  Nature, Bottled with Elegance
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] font-medium">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`relative py-1 transition-colors duration-200 hover:text-[#B69A68] ${
                    isActive ? 'text-[#B69A68]' : 'text-[#F7F3EB]/90'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B69A68] rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-[#F7F3EB] hover:text-[#B69A68] transition-colors focus:outline-none focus:ring-1 focus:ring-[#B69A68]"
              aria-label="Search Fragrances"
              title="Search fragrances and notes"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-1.5 text-[#F7F3EB] hover:text-[#B69A68] transition-colors focus:outline-none focus:ring-1 focus:ring-[#B69A68]"
              aria-label={`Wishlist (${wishlistCount} items)`}
              title="Saved fragrances"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B69A68] text-[#20231F] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-[#F7F3EB] hover:text-[#B69A68] transition-colors focus:outline-none focus:ring-1 focus:ring-[#B69A68] flex items-center gap-1.5"
              aria-label={`Shopping Bag with ${itemCount} items`}
              title="Open shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B69A68] text-[#20231F] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Modals & Drawers */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        links={navLinks}
        onOpenSearch={() => {
          setIsMobileNavOpen(false);
          setIsSearchOpen(true);
        }}
      />
    </>
  );
};
