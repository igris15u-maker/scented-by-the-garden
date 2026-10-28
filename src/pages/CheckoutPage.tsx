import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowLeft, ArrowRight, AlertCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { OrderDetails } from '../types/product';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, discount, shipping, total, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    deliveryNotes: '',
    paymentMethod: 'demo-upi', // 'demo-upi' | 'demo-cod' | 'demo-card'
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="bg-[#F7F3EB] min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl text-[#20382D]">Your Bag is Empty</h2>
        <p className="text-sm text-[#20231F]/70 mt-2">
          Please add at least one fragrance to your bag before proceeding to checkout.
        </p>
        <Link
          to="/collection"
          className="mt-6 px-6 py-3 bg-[#20382D] text-[#F7F3EB] text-xs uppercase tracking-widest hover:bg-[#B69A68] hover:text-[#20231F] transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email address is required';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      errs.phone = 'Valid 10-digit phone number is required';
    }
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pincode.trim() || formData.pincode.trim().length < 6) {
      errs.pincode = 'Valid 6-digit postal PIN code is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('error', 'Incomplete Form', 'Please complete all required shipping fields.');
      return;
    }

    setIsSubmitting(true);

    // Generate Demo Order Details
    setTimeout(() => {
      const orderId = `SBG-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: OrderDetails = {
        orderId,
        createdAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}`,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        items: [...cart],
        subtotal,
        discount,
        shipping,
        total,
        paymentMethod:
          formData.paymentMethod === 'demo-upi'
            ? 'Demo Instant UPI'
            : formData.paymentMethod === 'demo-cod'
            ? 'Demo Cash on Delivery'
            : 'Demo Card Simulation',
      };

      // Store in sessionStorage for order confirmation view
      sessionStorage.setItem('scented_last_order', JSON.stringify(order));
      clearCart();
      setIsSubmitting(false);
      navigate('/order-confirmation');
    }, 900);
  };

  return (
    <div className="bg-[#F7F3EB] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#20382D] hover:text-[#B69A68] mb-6 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Fragrance Bag
        </Link>

        {/* Demo Notification Banner */}
        <div className="mb-8 p-4 bg-[#FCFAF6] border border-[#B69A68] text-xs text-[#20382D] flex items-start gap-3 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-[#B69A68] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block font-serif text-sm">
              Demonstration Checkout Environment
            </span>
            <p className="text-[#20231F]/80 mt-0.5">
              This is an interactive demonstration store. No payment will be processed and no credit card is required. Submitting will generate a simulated order confirmation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Checkout Form */}
          <div className="lg:col-span-7 bg-white border border-[#A6AD98]/30 p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#20382D] pb-4 border-b border-[#A6AD98]/20">
              Shipping & Delivery Ritual
            </h2>

            <form onSubmit={handleSubmitOrder} className="mt-6 space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#20382D] block mb-1 font-medium">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={`w-full p-2.5 bg-[#FCFAF6] border text-xs text-[#20382D] focus:outline-none focus:border-[#20382D] ${
                      errors.firstName ? 'border-red-400' : 'border-[#A6AD98]/40'
                    }`}
                    placeholder="e.g. Radhika"
                  />
                  {errors.firstName && <span className="text-[10px] text-red-500 mt-1 block">{errors.firstName}</span>}
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#20382D] block mb-1 font-medium">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={`w-full p-2.5 bg-[#FCFAF6] border text-xs text-[#20382D] focus:outline-none focus:border-[#20382D] ${
                      errors.lastName ? 'border-red-400' : 'border-[#A6AD98]/40'
                    }`}
                    placeholder="e.g. Sharma"
                  />
                  {errors.lastName && <span className="text-[10px] text-red-500 mt-1 block">{errors.lastName}</span>}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#20382D] block mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full p-2.5 bg-[#FCFAF6] border text-xs text-[#20382D] focus:outline-none focus:border-[#20382D] ${
                      errors.email ? 'border-red-400' : 'border-[#A6AD98]/40'
                    }`}
                    placeholder="For tracking & sample confirmations"
                  />
                  {errors.email && <span className="text-[10px] text-red-500 mt-1 block">{errors.email}</span>}
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#20382D] block mb-1 font-medium">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full p-2.5 bg-[#FCFAF6] border text-xs text-[#20382D] focus:outline-none focus:border-[#20382D] ${
                      errors.phone ? 'border-red-400' : 'border-[#A6AD98]/40'
                    }`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && <span className="text-[10px] text-red-500 mt-1 block">{errors.phone}</span>}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#20382D] block mb-1 font-medium">
                  Street Address & Suite *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full p-2.5 bg-[#FCFAF6] border text-xs text-[#20382D] focus:outline-none focus:border-[#20382D] ${
                    errors.address ? 'border-red-400' : 'border-[#A6AD98]/40'
                  }`}
                  placeholder="House / Flat No., Building, Street Name"
                />
                {errors.address && <span className="text-[10px] text-red-500 mt-1 block">{errors.address}</span>}
              </div>

              {/* City, State, Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#20382D] block mb-1 font-medium">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full p-2.5 bg-[#FCFAF6] border text-xs text-[#20382D] focus:outline-none focus:border-[#20382D] ${
                      errors.city ? 'border-red-400' : 'border-[#A6AD98]/40'
                    }`}
                    placeholder="e.g. Mumbai"
                  />
                  {errors.city && <span className="text-[10px] text-red-500 mt-1 block">{errors.city}</span>}
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#20382D] block mb-1 font-medium">
                    State *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full p-2.5 bg-[#FCFAF6] border border-[#A6AD98]/40 text-xs text-[#20382D] focus:outline-none focus:border-[#20382D]"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Other">Other States & UTs</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#20382D] block mb-1 font-medium">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className={`w-full p-2.5 bg-[#FCFAF6] border text-xs text-[#20382D] focus:outline-none focus:border-[#20382D] ${
                      errors.pincode ? 'border-red-400' : 'border-[#A6AD98]/40'
                    }`}
                    placeholder="e.g. 400001"
                    maxLength={6}
                  />
                  {errors.pincode && <span className="text-[10px] text-red-500 mt-1 block">{errors.pincode}</span>}
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-4 border-t border-[#A6AD98]/20 space-y-3">
                <label className="text-xs uppercase tracking-wider text-[#20382D] block font-medium">
                  Payment Simulation Option
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-[#A6AD98]/40 bg-[#FCFAF6] cursor-pointer hover:border-[#20382D]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="demo-upi"
                      checked={formData.paymentMethod === 'demo-upi'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'demo-upi' })}
                      className="accent-[#20382D]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#20382D] block">
                        Instant UPI Simulation (Google Pay / PhonePe / Paytm)
                      </span>
                      <span className="text-[11px] text-[#A6AD98]">
                        Simulated one-click demo checkout
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border border-[#A6AD98]/40 bg-[#FCFAF6] cursor-pointer hover:border-[#20382D]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="demo-cod"
                      checked={formData.paymentMethod === 'demo-cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'demo-cod' })}
                      className="accent-[#20382D]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#20382D] block">
                        Complimentary Cash on Delivery (Demo)
                      </span>
                      <span className="text-[11px] text-[#A6AD98]">
                        Pay upon unboxing the sealed botanical parcel
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#20382D] hover:bg-[#B69A68] text-[#F7F3EB] hover:text-[#20231F] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg disabled:opacity-50"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Confirming Demo Order...' : `Place Demo Order (₹${total.toLocaleString('en-IN')})`}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Review */}
          <div className="lg:col-span-5 bg-white border border-[#A6AD98]/30 p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="font-serif text-xl text-[#20382D] pb-3 border-b border-[#A6AD98]/20">
              Order Review ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
            </h3>

            <div className="divide-y divide-[#A6AD98]/20 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-3.5 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-14 object-cover bg-[#ECE5D8] border border-[#A6AD98]/30 shrink-0"
                    />
                    <div>
                      <h4 className="font-serif text-base text-[#20382D]">{item.name}</h4>
                      <p className="text-[11px] text-[#B69A68]">
                        {item.volume} • Qty {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#20382D]">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-[#A6AD98]/20 space-y-2 text-xs text-[#20231F]/80">
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
                <span>Express Insured Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-[#20382D] font-semibold">Complimentary</span>
                  ) : (
                    `₹${shipping.toLocaleString('en-IN')}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-lg font-serif font-bold text-[#20382D] pt-2 border-t border-[#A6AD98]/30">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Trust box */}
            <div className="p-4 bg-[#FCFAF6] border border-[#A6AD98]/30 text-[11px] text-[#A6AD98] space-y-1">
              <p className="font-serif text-[#20382D] text-xs font-medium">
                The Botanical Seal Guarantee
              </p>
              <p>
                Each flacon is sealed with tamper-evident wax and contains a 2 ml tester vial to experience before unsealing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
