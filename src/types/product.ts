export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export type FragranceFamily = 
  | 'Fresh Woody' 
  | 'Floral' 
  | 'Amber Woody' 
  | 'Sandalwood' 
  | 'Citrus Botanical' 
  | 'Herbal Aromatic';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  price: number; // In INR (₹)
  originalPrice?: number;
  rating: number; // e.g. 4.9
  reviewCount: number;
  description: string;
  story: string;
  family: FragranceFamily;
  volumeOptions: { size: string; price: number }[];
  defaultVolume: string;
  notes: FragranceNotes;
  intensity: 'Subtle' | 'Moderate' | 'Intense';
  longevity: string; // e.g. "8-10 Hours"
  occasion: string; // e.g. "Evening Gala, Intimate Gatherings"
  inStock: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  image: string;
  gallery: string[];
  accentColor: string;
  sillage: 'Intimate' | 'Moderate' | 'Radiant';
}

export interface CartItem {
  id: string; // Composite key: product.id + '-' + volume
  productId: string;
  name: string;
  volume: string;
  price: number;
  quantity: number;
  image: string;
  family: string;
}

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: string;
}
