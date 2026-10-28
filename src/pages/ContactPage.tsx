import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Concierge Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('error', 'Incomplete Form', 'Please fill in all required fields.');
      return;
    }

    setSubmitted(true);
    showToast('success', 'Inquiry Received', 'Our fragrance concierge will respond within 24 hours.');
  };

  return (
    <div className="bg-[#F7F3EB] min-h-screen">
      {/* Editorial Header */}
      <div className="bg-[#20382D] text-[#F7F3EB] py-16 sm:py-20 border-b border-[#B69A68]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68] block">
            Atelier Relations
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#F7F3EB] font-light tracking-tight">
            Connect with Our Fragrance Concierge
          </h1>
          <p className="text-sm sm:text-base text-[#A6AD98] max-w-lg mx-auto font-light leading-relaxed">
            Whether inquiring regarding bespoke olfactory gifting, note composition, or order advisories, our dedicated specialists are here to assist.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#A6AD98]/30 p-6 sm:p-10 shadow-xs">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#20382D] pb-3 border-b border-[#A6AD98]/20">
              Send a Private Message
            </h2>

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-[#20382D] text-[#B69A68] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#20382D]">Thank You, {formData.name}</h3>
                <p className="text-xs sm:text-sm text-[#20231F]/75 max-w-sm mx-auto leading-relaxed font-light">
                  (Demonstration Store) Your communication has been recorded. Our fragrance specialists typically reply within one business day.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'General Concierge Inquiry', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#20382D] text-[#F7F3EB] text-xs uppercase tracking-wider hover:bg-[#B69A68] hover:text-[#20231F] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#20382D] block mb-1 font-medium">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-[#FCFAF6] border border-[#A6AD98]/40 text-xs text-[#20231F] focus:outline-none focus:border-[#20382D]"
                    placeholder="e.g. Eleanor Vance"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#20382D] block mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-[#FCFAF6] border border-[#A6AD98]/40 text-xs text-[#20231F] focus:outline-none focus:border-[#20382D]"
                    placeholder="e.g. eleanor@example.com"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#20382D] block mb-1 font-medium">
                    Nature of Inquiry
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 bg-[#FCFAF6] border border-[#A6AD98]/40 text-xs text-[#20231F] focus:outline-none focus:border-[#20382D]"
                  >
                    <option value="General Concierge Inquiry">General Concierge Inquiry</option>
                    <option value="Bespoke Gifting & Corporate">Bespoke Gifting & Corporate</option>
                    <option value="Fragrance Note Consultation">Fragrance Note Consultation</option>
                    <option value="Order & Delivery Advisory">Order & Delivery Advisory</option>
                    <option value="Press & Botanical Collaborations">Press & Botanical Collaborations</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#20382D] block mb-1 font-medium">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-[#FCFAF6] border border-[#A6AD98]/40 text-xs text-[#20231F] focus:outline-none focus:border-[#20382D]"
                    placeholder="Please describe how our atelier may assist you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#20382D] hover:bg-[#B69A68] text-[#F7F3EB] hover:text-[#20231F] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Atelier Directory */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#A6AD98]/30 p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="font-serif text-2xl text-[#20382D] pb-3 border-b border-[#A6AD98]/20">
                The Mumbai Atelier
              </h3>

              <div className="space-y-4 text-xs text-[#20231F]/80 leading-relaxed">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B69A68] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#20382D] block font-serif text-sm">Location</strong>
                    The Garden Atelier, Colaba Promenade, Waterfront Quarter, Mumbai 400005, India
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#B69A68] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#20382D] block font-serif text-sm">Concierge Hours</strong>
                    Monday – Saturday: 10:00 AM – 7:30 PM IST<br />
                    Sunday: Private Appointments Only
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#B69A68] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#20382D] block font-serif text-sm">Telephone Advisory</strong>
                    +91 (0) 22 2849 5500
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#B69A68] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#20382D] block font-serif text-sm">Direct Correspondence</strong>
                    concierge@scentedbythegarden.com
                  </div>
                </div>
              </div>
            </div>

            {/* Private Consultations Card */}
            <div className="p-6 bg-[#20382D] text-[#F7F3EB] border border-[#B69A68]/30 space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#B69A68]">
                Olfactory Consultations
              </span>
              <h4 className="font-serif text-xl text-[#F7F3EB]">
                Complimentary Scent Guidance
              </h4>
              <p className="text-xs text-[#A6AD98] leading-relaxed">
                Unsure which botanical family aligns with your personal chemistry? Our certified noses will guide your selection through complimentary sample vials with every purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
