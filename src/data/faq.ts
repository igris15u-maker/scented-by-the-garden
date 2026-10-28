export interface FAQItem {
  id: string;
  category: 'Fragrance & Composition' | 'Care & Storage' | 'Shipping & Packaging' | 'Samples & Returns';
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Fragrance & Composition',
    question: 'How do Eau de Parfum and Extrait de Parfum differ in our collection?',
    answer: 'Our fragrances are formulated at high oil concentrations (20% to 28% perfume essence). Eau de Parfum blends offer rich projection and 8–10 hours of longevity, while our Extraits (such as Jasmine Whisper) use higher botanical concentrations for an intimate, radiant sillage lasting over 12 hours.',
  },
  {
    id: 'faq-2',
    category: 'Fragrance & Composition',
    question: 'What is the natural botanical ratio in your perfumes?',
    answer: 'We craft our compositions using a high ratio of natural extracts, absolutes, and essential essences blended with safe, tested aromachemicals to preserve delicate wildflowers and ensure ethical conservation of endangered botanicals.',
  },
  {
    id: 'faq-3',
    category: 'Care & Storage',
    question: 'How should I store my perfume bottles to preserve their olfactory profile?',
    answer: 'Store your fragrance in a cool, dry place away from direct sunlight and dramatic temperature fluctuations. Our heavy-walled Italian glass protects from UV light, but keeping bottles in their original drawer or box ensures scent fidelity for up to 36 months.',
  },
  {
    id: 'faq-4',
    category: 'Shipping & Packaging',
    question: 'How are the fragrances packaged for transit?',
    answer: 'Every order arrives in our signature forest green rigid gift box tied with champagne grosgrain ribbon and cushioned with biodegradable cellulose batting. We ensure safe, leak-proof transport across all regions of India.',
  },
  {
    id: 'faq-5',
    category: 'Shipping & Packaging',
    question: 'What are the delivery timelines and shipping charges?',
    answer: 'We offer complimentary express shipping on all orders over ₹1,999. For orders below ₹1,999, a flat shipping fee of ₹150 applies. Metro orders typically arrive in 2–4 business days, while other regions take 4–6 business days.',
  },
  {
    id: 'faq-6',
    category: 'Samples & Returns',
    question: 'Can I test a fragrance before opening the full-size bottle?',
    answer: 'Yes! Every 50 ml or 100 ml bottle order comes with a matching complimentary 2 ml sample vial. We encourage you to test the sample first on skin. If the fragrance does not resonate with you, the unopened, sealed full-sized bottle may be returned within 14 days.',
  },
];
