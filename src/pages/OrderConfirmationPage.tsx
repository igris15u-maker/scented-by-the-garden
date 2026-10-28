import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, ShieldCheck, Sparkles, MapPin, Mail, Phone } from 'lucide-react';
import { OrderDetails } from '../types/product';

export const OrderConfirmationPage: React.FC = () => {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = sessionStorage.getItem('scented_last_order');
    if (saved) {
      try {
        setOrder(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="bg-[#F7F3EB] min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl text-[#20382D]">No Active Order Session Found</h2>
        <p className="text-sm text-[#20231F]/70 mt-2 max-w-sm">
          You may have already completed your demo session or refreshed the browser cache.
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

  return (
    <div className="bg-[#F7F3EB] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Demonstration Disclaimer Card */}
        <div className="mb-8 p-4 bg-[#20382D] text-[#F7F3EB] border border-[#B69A68] flex items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#B69A68] shrink-0" />
            <div>
              <span className="font-serif text-base block font-medium">
                Demonstration Order Confirmation
              </span>
              <p className="text-xs text-[#A6AD98]">
                This is a simulated order confirmation. No actual funds were debited and no physical shipment will occur.
              </p>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-[#B69A68] text-[#20231F] hover:bg-[#D9C398] text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Receipt
          </button>
        </div>

        {/* Main Confirmation Paper */}
        <div className="bg-white border border-[#A6AD98]/40 p-6 sm:p-10 shadow-md space-y-8 print:border-none print:shadow-none">
          {/* Header */}
          <div className="text-center pb-8 border-b border-[#A6AD98]/20 space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#20382D] text-[#B69A68] flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68] block">
              Maison Scented by the Garden
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#20382D] font-light">
              Thank You for Your Patronage
            </h1>
            <p className="text-xs sm:text-sm text-[#20231F]/75 max-w-lg mx-auto font-light leading-relaxed">
              We have received your demo request. Your handcrafted flacons and complimentary testing vials are scheduled for curation at our atelier.
            </p>

            <div className="pt-2 inline-flex items-center gap-2 px-4 py-1.5 bg-[#FCFAF6] border border-[#B69A68]/40 text-xs font-mono">
              <span className="text-[#A6AD98]">Reference No:</span>
              <span className="font-bold text-[#20382D]">{order.orderId}</span>
              <span className="text-[#A6AD98] ml-2">Date: {order.createdAt}</span>
            </div>
          </div>

          {/* Shipping & Payment Meta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-[#FCFAF6] border border-[#A6AD98]/20 text-xs">
            <div className="space-y-1.5">
              <span className="font-serif text-sm font-semibold text-[#20382D] block mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#B69A68]" /> Delivery Destination
              </span>
              <p className="font-medium text-[#20382D]">{order.customerName}</p>
              <p className="text-[#20231F]/80">{order.address}</p>
              <p className="text-[#20231F]/80">
                {order.city}, {order.state} — {order.pincode}
              </p>
              <p className="text-[#A6AD98] pt-1">Phone: {order.phone}</p>
            </div>

            <div className="space-y-1.5">
              <span className="font-serif text-sm font-semibold text-[#20382D] block mb-2 flex items-center gap-1.5">
                <PackageCheck className="w-4 h-4 text-[#B69A68]" /> Curation Details
              </span>
              <p className="text-[#20231F]/80">
                <strong className="text-[#20382D]">Method:</strong> {order.paymentMethod}
              </p>
              <p className="text-[#20231F]/80">
                <strong className="text-[#20382D]">Notification:</strong> Updates sent to {order.email}
              </p>
              <p className="text-[#20231F]/80">
                <strong className="text-[#20382D]">Packaging:</strong> Forest Green Rigid Gift Box with Silk Ribbon
              </p>
            </div>
          </div>

          {/* Itemized Fragrance List */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#20382D] pb-2 border-b border-[#A6AD98]/20">
              Curated Fragrance Items
            </h3>
            <div className="divide-y divide-[#A6AD98]/20">
              {order.items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-16 object-cover bg-[#ECE5D8] border border-[#A6AD98]/30 shrink-0"
                    />
                    <div>
                      <h4 className="font-serif text-base text-[#20382D] font-medium">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#B69A68]">
                        {item.volume} • {item.family}
                      </p>
                      <p className="text-xs text-[#A6AD98] mt-0.5">
                        Quantity: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-base text-[#20382D]">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Breakdown */}
          <div className="pt-4 border-t border-[#A6AD98]/20 space-y-2 text-xs text-[#20231F]/80 max-w-xs ml-auto">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#20382D] font-medium">
                <span>Promotional Savings:</span>
                <span>-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Charges:</span>
              <span>
                {order.shipping === 0 ? (
                  <span className="text-[#20382D] font-medium">Complimentary</span>
                ) : (
                  `₹${order.shipping.toLocaleString('en-IN')}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-lg font-serif font-bold text-[#20382D] pt-2 border-t border-[#A6AD98]/30">
              <span>Grand Total:</span>
              <span>₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-[#A6AD98]/20 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-6 py-3 border border-[#20382D] text-[#20382D] hover:bg-[#20382D] hover:text-[#F7F3EB] text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>

            <Link
              to="/collection"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#20382D] hover:bg-[#B69A68] text-[#F7F3EB] hover:text-[#20231F] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <span>Continue Exploring Fragrances</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
