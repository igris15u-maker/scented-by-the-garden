declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export interface RazorpayOptions {
  key?: string;
  amount: number; // in paise (e.g. ₹2499 -> 249900)
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
  }) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

export const openRazorpayPayment = async (
  options: Omit<RazorpayOptions, 'key'> & { customKey?: string }
): Promise<void> => {
  const isLoaded = await loadRazorpayScript();
  const key =
    options.customKey ||
    (import.meta as any).env?.VITE_RAZORPAY_KEY_ID ||
    'rzp_test_placeholder_key';

  if (!isLoaded || !window.Razorpay) {
    throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
  }

  const rzpOptions: RazorpayOptions = {
    ...options,
    key,
  };

  const rzp = new window.Razorpay(rzpOptions);
  rzp.open();
};
