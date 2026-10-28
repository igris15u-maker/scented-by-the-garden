/**
 * Scented by the Garden — Central Brand & Store Configuration
 * 
 * BUYER CUSTOMIZATION GUIDE:
 * To customize this store for your own brand, edit the values below.
 * Everything will automatically update across the header, footer, checkout,
 * meta tags, currency displays, and contact pages.
 */

export interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  domain: string;
  currencySymbol: string;
  currencyCode: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  contact: {
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    country: string;
    conciergeHours: string;
  };
  social: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  promoCodes: {
    code: string;
    discountPct: number;
    description: string;
  }[];
  demoModeNotice: string;
}

export const BRAND_CONFIG: BrandConfig = {
  name: 'Scented by the Garden',
  shortName: 'Scented',
  tagline: 'Nature, Bottled with Elegance.',
  description: 'A premium botanical fragrance house combining natural inspiration, refined perfumery, understated luxury, and contemporary craftsmanship.',
  domain: 'https://scentedbythegarden.com',
  currencySymbol: '₹',
  currencyCode: 'INR',
  freeShippingThreshold: 1999,
  standardShippingFee: 150,
  contact: {
    email: 'concierge@scentedbythegarden.com',
    phone: '+91 (0) 22 2849 5500',
    address: 'The Garden Atelier, Colaba Promenade, Waterfront Quarter',
    city: 'Mumbai',
    pincode: '400005',
    country: 'India',
    conciergeHours: 'Monday – Saturday: 10:00 AM – 7:30 PM IST',
  },
  social: {
    instagram: 'https://instagram.com/scentedbythegarden',
    facebook: 'https://facebook.com/scentedbythegarden',
    twitter: 'https://twitter.com/scentedgarden',
  },
  promoCodes: [
    { code: 'GARDEN10', discountPct: 0.1, description: '10% Welcome Savings' },
    { code: 'BOTANICAL15', discountPct: 0.15, description: '15% Connoisseur VIP Savings' },
  ],
  demoModeNotice: 'Demonstration E-Commerce Platform — Orders and transactions are simulated locally. No real charges are debited.',
};
