import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Check, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { BRAND_CONFIG } from '../config/brandConfig';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    promoCode,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const { showToast } = useToast();
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

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
      setPromoFeedback(null);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
    if (res.success) {
      showToast('success', 'Promo Code Applied', res.message);
      setPromoInput('');
    } else {
      showToast('error', 'Invalid Code', res.message);
    }
  };

  const handleProceedToCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const freeShippingThreshold = BRAND_CONFIG.freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - (subtotal - discount));
  const shippingProgressPct = Math.min(100, Math.round(((subtotal - discount) / freeShippingThreshold) * 100));

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FCFAF6] text-[#20231F] shadow-2xl flex flex-col z-10 border-l border-[#B69A68]/30">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#20382D] text-[#F7F3EB] flex items-center justify-between border-b border-[#B69A68]/30">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#B69A68]" />
            <h3 className="font-serif text-xl sm:text-2xl tracking-wider text-[#F7F3EB]">
              Your Fragrance Bag
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#F7F3EB] hover:text-[#B69A68] transition-colors"
            aria-label="Close bag"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free Shipping Bar */}
        <div className="bg-[#ECE5D8] px-5 py-3 border-b border-[#A6AD98]/30 text-xs">
          {amountNeededForFreeShipping === 0 ? (
            <p className="text-[#20382D] font-medium flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#20382D]" />
              You qualify for <strong>Complimentary Luxury Express Shipping</strong>!
            </p>
          ) : (
            <>
              <p className="text-[#20231F]/80">
                Add <strong>₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more for complimentary shipping.
              </p>
              <div className="w-full bg-[#A6AD98]/40 h-1.5 mt-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#20382D] h-full transition-all duration-300"
                  style={{ width: `${shippingProgressPct}%` }}
                />
              </div>
            </>
          )}
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 divide-y divide-[#A6AD98]/20">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#ECE5D8] flex items-center justify-center text-[#A6AD98]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl text-[#20382D]">Your bag is currently empty</h4>
              <p className="text-xs text-[#20231F]/70 max-w-xs mx-auto leading-relaxed">
                Discover our curated botanical library of artisanal extraits and eau de parfums.
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/collection');
                }}
                className="inline-block mt-4 px-6 py-3 bg-[#20382D] text-[#F7F3EB] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B69A68] hover:text-[#20231F] transition-colors"
              >
                Explore The Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                <div className="w-20 h-24 bg-[#ECE5D8] border border-[#A6AD98]/30 shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h5 className="font-serif text-lg text-[#20382D] leading-tight">
                        {item.name}
                      </h5>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#A6AD98] hover:text-red-700 transition-colors p-1"
                        aria-label={`Remove ${item.name} from bag`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#B69A68] uppercase tracking-wider mt-0.5">
                      {item.volume} • {item.family}
                    </p>
                    <p className="text-sm font-semibold text-[#20382D] mt-1">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#A6AD98]/40 bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 text-[#20231F] hover:bg-[#ECE5D8] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#20382D]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 text-[#20231F] hover:bg-[#ECE5D8] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-xs font-medium text-[#20231F]/80">
                      Subtotal: ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Area with Calculations & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 sm:p-6 bg-[#F7F3EB] border-t border-[#B69A68]/30 space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A6AD98]" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter code (Try GARDEN10)"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#A6AD98]/50 text-xs text-[#20231F] focus:outline-none focus:border-[#20382D]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#20382D] text-[#F7F3EB] text-xs uppercase tracking-wider font-medium hover:bg-[#B69A68] hover:text-[#20231F] transition-colors"
                >
                  Apply
                </button>
              </div>

              {promoCode && (
                <div className="flex items-center justify-between text-xs text-[#20382D] bg-[#ECE5D8] px-3 py-1.5 mt-2">
                  <span className="font-medium">Applied: {promoCode}</span>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-red-700 hover:underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#20231F]/80 pt-2 border-t border-[#A6AD98]/30">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#20382D] font-medium">
                  <span>Promotional Savings</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-[#20382D] font-medium">Complimentary</span>
                  ) : (
                    `₹${shipping.toLocaleString('en-IN')}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#20382D] pt-2 border-t border-[#A6AD98]/30">
                <span>Estimated Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[10px] text-[#A6AD98] text-right">
                All applicable luxury duties and GST included
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#20382D] text-[#F7F3EB] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 hover:bg-[#B69A68] hover:text-[#20231F] transition-all shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs uppercase tracking-wider text-[#20231F]/70 hover:text-[#20231F] transition-colors"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
