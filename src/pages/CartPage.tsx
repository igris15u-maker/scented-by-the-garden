import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { BRAND_CONFIG } from '../config/brandConfig';

export const CartPage: React.FC = () => {
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

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      showToast('success', 'Promo Code Applied', res.message);
      setPromoInput('');
    } else {
      showToast('error', 'Invalid Code', res.message);
    }
  };

  const freeShippingThreshold = BRAND_CONFIG.freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - (subtotal - discount));

  if (cart.length === 0) {
    return (
      <div className="bg-[#F7F3EB] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white border border-[#A6AD98]/30 p-10 text-center space-y-5 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#ECE5D8] flex items-center justify-center mx-auto text-[#20382D]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl text-[#20382D]">Your Fragrance Bag is Empty</h2>
          <p className="text-xs sm:text-sm text-[#20231F]/70 leading-relaxed font-light">
            You have not added any botanical perfumes to your shopping bag yet. Explore our handcrafted collection of eau de parfums and extraits.
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
        <div className="mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68] block">
            Checkout Preparation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#20382D] font-light">
            Your Fragrance Bag ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 bg-white border border-[#A6AD98]/30 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Free Shipping Tracker */}
            <div className="p-4 bg-[#FCFAF6] border border-[#B69A68]/30 text-xs">
              {amountNeededForFreeShipping === 0 ? (
                <p className="text-[#20382D] font-medium flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#20382D]" />
                  Your order qualifies for <strong>Complimentary Express Luxury Delivery</strong>!
                </p>
              ) : (
                <p className="text-[#20231F]/80">
                  Add <strong>₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more to your bag for complimentary express shipping.
                </p>
              )}
            </div>

            <div className="divide-y divide-[#A6AD98]/20">
              {cart.map((item) => (
                <div key={item.id} className="py-6 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-24 bg-[#ECE5D8] overflow-hidden shrink-0 border border-[#A6AD98]/30">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        to={`/product/${item.productId}`}
                        className="font-serif text-xl text-[#20382D] hover:text-[#B69A68] transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-[#B69A68] uppercase tracking-wider mt-0.5">
                        {item.volume} • {item.family}
                      </p>
                      <p className="text-sm font-semibold text-[#20382D] mt-1">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#A6AD98]/50 bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 text-[#20231F] hover:bg-[#ECE5D8]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#20382D]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 text-[#20231F] hover:bg-[#ECE5D8]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-serif text-base font-bold text-[#20382D] w-24 text-right">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#A6AD98] hover:text-red-700 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center text-xs">
              <Link
                to="/collection"
                className="text-[#20382D] hover:text-[#B69A68] underline underline-offset-4 uppercase tracking-wider font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4 bg-white border border-[#A6AD98]/30 p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="font-serif text-xl text-[#20382D] pb-3 border-b border-[#A6AD98]/20">
              Order Summary
            </h3>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A6AD98]" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter code (Try GARDEN10)"
                    className="w-full pl-9 pr-3 py-2 bg-[#FCFAF6] border border-[#A6AD98]/40 text-xs text-[#20231F] focus:outline-none focus:border-[#20382D]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#20382D] text-[#F7F3EB] text-xs uppercase tracking-wider hover:bg-[#B69A68] hover:text-[#20231F] transition-colors"
                >
                  Apply
                </button>
              </div>

              {promoCode && (
                <div className="flex items-center justify-between text-xs text-[#20382D] bg-[#ECE5D8] px-3 py-1.5">
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

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-[#20231F]/80 pt-2 border-t border-[#A6AD98]/20">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#20382D] font-medium">
                  <span>Promotional Discount (10%)</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-[#20382D] font-semibold">Complimentary</span>
                  ) : (
                    `₹${shipping.toLocaleString('en-IN')}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-lg font-serif font-bold text-[#20382D] pt-3 border-t border-[#A6AD98]/30">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[10px] text-[#A6AD98] text-right">
                All applicable taxes and luxury fragrance duties included
              </p>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-[#20382D] hover:bg-[#B69A68] text-[#F7F3EB] hover:text-[#20231F] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-[11px] text-[#A6AD98] space-y-1.5">
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B69A68]" />
                Encrypted demo checkout with sample confirmation
              </p>
              <p>
                Complimentary 2 ml sample vial shipped with every fragrance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
