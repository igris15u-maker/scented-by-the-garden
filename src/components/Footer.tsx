import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#15251E] text-[#F7F3EB] border-t border-[#B69A68]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl tracking-[0.2em] uppercase text-[#F7F3EB] block">
                Scented by the Garden
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#B69A68]">
                Nature, Bottled with Elegance
              </span>
            </Link>
            <p className="text-xs text-[#A6AD98] leading-relaxed max-w-sm font-light">
              A premium botanical fragrance house combining natural inspiration, refined perfumery, understated luxury, and contemporary craftsmanship.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-[#A6AD98]">
              {/* Instagram Icon */}
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#B69A68]/30 flex items-center justify-center hover:text-[#B69A68] hover:border-[#B69A68] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Facebook Icon */}
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-[#B69A68]/30 flex items-center justify-center hover:text-[#B69A68] hover:border-[#B69A68] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.598 0 9 1.582 9 4.615V8z"/>
                </svg>
              </a>
              {/* Twitter / X Icon */}
              <a
                href="#twitter"
                onClick={(e) => e.preventDefault()}
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-full border border-[#B69A68]/30 flex items-center justify-center hover:text-[#B69A68] hover:border-[#B69A68] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Fragrance Collection Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base tracking-widest uppercase text-[#B69A68]">
              The Collection
            </h4>
            <ul className="space-y-2 text-xs text-[#A6AD98]">
              <li>
                <Link to="/product/forest-bloom" className="hover:text-[#F7F3EB] transition-colors">
                  Forest Bloom
                </Link>
              </li>
              <li>
                <Link to="/product/jasmine-whisper" className="hover:text-[#F7F3EB] transition-colors">
                  Jasmine Whisper
                </Link>
              </li>
              <li>
                <Link to="/product/rosewood-essence" className="hover:text-[#F7F3EB] transition-colors">
                  Rosewood Essence
                </Link>
              </li>
              <li>
                <Link to="/product/sandalwood-serenity" className="hover:text-[#F7F3EB] transition-colors">
                  Sandalwood Serenity
                </Link>
              </li>
              <li>
                <Link to="/product/citrus-garden" className="hover:text-[#F7F3EB] transition-colors">
                  Citrus Garden
                </Link>
              </li>
              <li>
                <Link to="/product/lavender-dusk" className="hover:text-[#F7F3EB] transition-colors">
                  Lavender Dusk
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand & Craft */}
          <div className="space-y-3">
            <h4 className="font-serif text-base tracking-widest uppercase text-[#B69A68]">
              The Maison
            </h4>
            <ul className="space-y-2 text-xs text-[#A6AD98]">
              <li>
                <Link to="/about" className="hover:text-[#F7F3EB] transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link to="/ingredients" className="hover:text-[#F7F3EB] transition-colors">
                  Botanical Sourcing
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-[#F7F3EB] transition-colors">
                  Fragrance Families
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#F7F3EB] transition-colors">
                  Care & Olfactory FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F7F3EB] transition-colors">
                  Fragrance Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Atelier */}
          <div className="space-y-3">
            <h4 className="font-serif text-base tracking-widest uppercase text-[#B69A68]">
              Atelier Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A6AD98]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B69A68] shrink-0 mt-0.5" />
                <span>The Garden Atelier, Colaba Promenade, Mumbai, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B69A68] shrink-0" />
                <span>+91 (0) 22 2849 5500</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B69A68] shrink-0" />
                <span>concierge@scentedbythegarden.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-16 pt-8 border-t border-[#B69A68]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#A6AD98]/80">
          <div>
            <p>© {new Date().getFullYear()} Scented by the Garden. All Rights Reserved.</p>
            <p className="text-[10px] text-[#B69A68] mt-0.5">
              Demonstration luxury fragrance platform crafted for presentation.
            </p>
          </div>

          <div className="flex items-center space-x-6 text-xs">
            <Link to="/faq" className="hover:text-[#F7F3EB] transition-colors">
              Shipping & Returns
            </Link>
            <Link to="/faq" className="hover:text-[#F7F3EB] transition-colors">
              Privacy Statement
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-[#B69A68] transition-colors ml-4"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
