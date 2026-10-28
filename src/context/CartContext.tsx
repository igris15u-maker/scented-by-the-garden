import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types/product';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, volume?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  setExactQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
  promoCode: string;
  promoDiscountPct: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CART_STORAGE_KEY = 'scented_by_the_garden_cart_v1';
const PROMO_STORAGE_KEY = 'scented_by_the_garden_promo_v1';
const FREE_SHIPPING_THRESHOLD = 1999;
const STANDARD_SHIPPING_FEE = 150;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState<string>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [promoDiscountPct, setPromoDiscountPct] = useState<number>(() => {
    return localStorage.getItem(PROMO_STORAGE_KEY)?.toUpperCase() === 'GARDEN10' ? 0.1 : 0;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to write cart to localStorage:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(PROMO_STORAGE_KEY, promoCode);
    } catch (e) {
      console.error('Failed to write promo to localStorage:', e);
    }
  }, [promoCode]);

  const addToCart = (product: Product, volume?: string, quantity: number = 1) => {
    const chosenVolume = volume || product.defaultVolume;
    const volumeOption = product.volumeOptions.find((v) => v.size === chosenVolume);
    const price = volumeOption ? volumeOption.price : product.price;
    const itemId = `${product.id}-${chosenVolume}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          volume: chosenVolume,
          price,
          quantity,
          image: product.image,
          family: product.family,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const setExactQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'GARDEN10') {
      setPromoCode('GARDEN10');
      setPromoDiscountPct(0.1);
      return { success: true, message: 'Code GARDEN10 applied! 10% savings.' };
    }
    if (trimmed === 'BOTANICAL15') {
      setPromoCode('BOTANICAL15');
      setPromoDiscountPct(0.15);
      return { success: true, message: 'VIP code BOTANICAL15 applied! 15% savings.' };
    }
    return { success: false, message: 'Invalid or expired promotional code.' };
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoDiscountPct(0);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * promoDiscountPct);
  const discountedSubtotal = subtotal - discount;
  const shipping = subtotal === 0 || discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = discountedSubtotal + shipping;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        setExactQuantity,
        clearCart,
        subtotal,
        discount,
        shipping,
        total,
        itemCount,
        promoCode,
        promoDiscountPct,
        applyPromoCode,
        removePromoCode,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
