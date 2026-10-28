import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setStatus('success');
    setErrorMessage('');
  };

  return (
    <section className="py-20 bg-[#20382D] text-[#F7F3EB] relative overflow-hidden border-t border-[#B69A68]/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#B69A68] block mb-3">
          The Botanical Gazette
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#F7F3EB]">
          Enter the World of Scented by the Garden
        </h2>
        <p className="text-sm sm:text-base text-[#A6AD98] mt-3 max-w-xl mx-auto font-light leading-relaxed">
          Receive seasonal harvest notes, private olfactory releases, and invitations to our botanical ateliers.
        </p>

        {/* Subscription Form */}
        <div className="mt-8 max-w-md mx-auto">
          {status === 'success' ? (
            <div className="p-4 bg-[#15251E] border border-[#B69A68] text-center space-y-2 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-[#B69A68] text-[#20231F] flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <p className="font-serif text-lg text-[#F7F3EB]">Welcome to our Botanical Journal</p>
              <p className="text-xs text-[#A6AD98]">
                (Demonstration Store) Your subscription request for <span className="text-[#F7F3EB]">{email}</span> was logged successfully.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A6AD98]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3 bg-[#15251E] border border-[#B69A68]/40 text-[#F7F3EB] placeholder:text-[#A6AD98]/60 text-xs focus:outline-none focus:border-[#B69A68] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#B69A68] hover:bg-[#D9C398] text-[#20231F] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors shrink-0 shadow-md"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {status === 'error' && (
                <p className="text-xs text-red-400 text-left pl-1">{errorMessage}</p>
              )}

              <p className="text-[10px] text-[#A6AD98]/70 text-center tracking-wider">
                We respect your discretion. You may unsubscribe from our seasonal letters at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
