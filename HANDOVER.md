# Scented by the Garden — Buyer Handover & Customization Guide

Welcome to **Scented by the Garden**! This document provides complete instructions for customizing, branding, connecting payments, and deploying your luxury botanical fragrance e-commerce website.

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Quick Start & Local Development](#quick-start--local-development)
3. [Buyer Customization Guide](#buyer-customization-guide)
   - [Brand Name, Tagline & Contact Details](#1-brand-name-tagline--contact-details)
   - [Products, Prices, Formulations & Images](#2-products-prices-formulations--images)
   - [Color Palette & Theme Tokens](#3-color-palette--theme-tokens)
   - [Currency & Shipping Rules](#4-currency--shipping-rules)
4. [Connecting Payment Gateways](#connecting-payment-gateways)
   - [Razorpay (UPI, NetBanking, Cards, CRED)](#razorpay-setup)
   - [Stripe / Cashfree / PayPal](#alternative-gateways)
5. [Admin Order Dashboard](#admin-order-dashboard)
6. [Public Deployment Guide](#public-deployment-guide)
   - [Vercel Deployment (Recommended)](#vercel-deployment)
   - [Netlify Deployment](#netlify-deployment)
   - [Custom Domain Setup](#custom-domain-setup)
7. [Third-Party Assets & Licences](#third-party-assets--licences)
8. [Security & Credentials Audit](#security--credentials-audit)

---

## 🌿 Project Overview
- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 with custom luxury color palette and KaTeX/Cormorant typography
- **Routing**: React Router v7 with single-page-app redirects pre-configured
- **State & Persistence**: Real frontend shopping cart with `localStorage` persistence, promo code calculations, live stock tracking, and Admin Order Dashboard.

---

## ⚡ Quick Start & Local Development

### Prerequisites
- Node.js `v18+` or `v20+` (Tested on Node `v24.20.0`)
- npm `v9+` or `v11+`

### Commands
```bash
# 1. Install dependencies
npm install

# 2. Launch development server with hot-reload
npm run dev

# 3. Compile optimized production build
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🎨 Buyer Customization Guide

### 1. Brand Name, Tagline & Contact Details
All primary brand identity variables are centralized in one single configuration file:
👉 **[`src/config/brandConfig.ts`](file:///D:/scented-by-the-garden/src/config/brandConfig.ts)**

```typescript
export const BRAND_CONFIG = {
  name: 'Your Fragrance House',
  shortName: 'YourBrand',
  tagline: 'Your Custom Brand Tagline.',
  domain: 'https://yourdomain.com',
  currencySymbol: '₹',
  currencyCode: 'INR',
  freeShippingThreshold: 1999,
  standardShippingFee: 150,
  contact: {
    email: 'concierge@yourdomain.com',
    phone: '+91 (0) 22 0000 0000',
    address: 'Your Atelier Address',
    city: 'Mumbai',
    pincode: '400001',
    country: 'India',
    conciergeHours: 'Monday – Saturday: 10:00 AM – 7:30 PM IST',
  },
  // ...
};
```
*Changing values in this single file instantly updates the Header, Footer, Contact page, Checkout terms, and Meta tags.*

### 2. Products, Prices, Formulations & Images
Product data is located in:
👉 **[`src/data/products.ts`](file:///D:/scented-by-the-garden/src/data/products.ts)**

To update product names, descriptions, olfactory pyramids, flacon volumes, and prices:
```typescript
{
  id: 'forest-bloom',
  name: 'Forest Bloom',
  subtitle: 'Eau de Parfum',
  tagline: 'Misty pine canopies meet crushed fern...',
  price: 2499, // Base price in INR
  volumeOptions: [
    { size: '50 ml', price: 2499 },
    { size: '100 ml', price: 3899 },
  ],
  notes: {
    top: ['Wild Bergamot', 'Morning Mist', 'Crushed Fern Leaf'],
    heart: ['Wild White Cyclamen', 'Pine Needle Essence', 'Dewy Lily'],
    base: ['Himalayan Cedar', 'Damp Oakmoss', 'Earthy Vetiver'],
  },
  image: 'https://your-cdn.com/your-product.jpg',
  // ...
}
```

### 3. Color Palette & Theme Tokens
Custom luxury colors are defined in **[`src/index.css`](file:///D:/scented-by-the-garden/src/index.css)**:
- **Deep Forest Green**: `--color-forest: #20382D;`
- **Dark Charcoal**: `--color-charcoal: #20231F;`
- **Warm Ivory**: `--color-ivory: #F7F3EB;`
- **Muted Sage**: `--color-sage: #A6AD98;`
- **Champagne Gold**: `--color-gold: #B69A68;`

You can tweak any hex code here to match your brand guidelines.

---

## 💳 Connecting Payment Gateways

### Razorpay Setup (India UPI, Cards, NetBanking, Wallets)
The project includes a ready-to-use Razorpay integration in [`src/utils/razorpay.ts`](file:///D:/scented-by-the-garden/src/utils/razorpay.ts) and [`src/pages/CheckoutPage.tsx`](file:///D:/scented-by-the-garden/src/pages/CheckoutPage.tsx).

1. Sign up at [razorpay.com](https://razorpay.com) and navigate to **Settings > API Keys**.
2. Copy your **Key ID** (starts with `rzp_test_` or `rzp_live_`).
3. Create a `.env` file in the root directory:
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_live_your_actual_key_here
   ```
4. When `VITE_RAZORPAY_KEY_ID` is present, clicking **Pay with Razorpay** will trigger the official Razorpay Checkout popup for real payments!
5. When omitted or left blank, the store automatically runs in verified local test mode, allowing you or prospective buyers to test the complete order flow without charging a card.

### Alternative Gateways (Stripe, Cashfree, Shopify)
The payment handling function `finalizeOrder` in [`src/pages/CheckoutPage.tsx`](file:///D:/scented-by-the-garden/src/pages/CheckoutPage.tsx) receives the payment status and transaction ID. You can easily hook in Stripe Elements, Cashfree, or PayPal by calling `finalizeOrder` on their respective authorization callbacks.

---

## 📦 Admin Order Dashboard

Visit **`/admin`** on your website to open the private demonstration store console:
- Live KPI cards: Total Sales, Total Orders, Paid Transactions, and Pending Cash on Delivery (COD).
- Real-time order review table displaying customer contact info, itemized orders, delivery addresses, and payment references.
- **Load Sample Orders**: One-click button to populate realistic orders.
- **Export CSV**: One-click button to export order data into Excel/CSV format.
- **Clear Orders**: Reset test orders.

---

## 🚀 Public Deployment Guide

The project is pre-configured with SPA rewrite rules for instant, zero-configuration deployment to Vercel or Netlify.

### Vercel Deployment (Recommended)
1. Push your code to a private or public GitHub repository.
2. Sign in to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Click **Deploy**. Your site will be live in ~45 seconds!
   *(Pre-configured [`vercel.json`](file:///D:/scented-by-the-garden/vercel.json) ensures routes like `/collection` and `/checkout` never return 404 on page refresh).*

### Netlify Deployment
1. Import your repository on [netlify.com](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy! *(Pre-configured [`netlify.toml`](file:///D:/scented-by-the-garden/netlify.toml) and [`public/_redirects`](file:///D:/scented-by-the-garden/public/_redirects) handle routing automatically).*

---

## 📜 Third-Party Assets & Licences

All packages and assets used in this project are licensed for commercial use:

| Asset / Package | Source | License | Notes |
| :--- | :--- | :--- | :--- |
| **React 19 & React Router** | Meta / Remix | [MIT](https://opensource.org/licenses/MIT) | Free commercial use |
| **Vite & Tailwind CSS v4** | Vite / Tailwind Labs | [MIT](https://opensource.org/licenses/MIT) | Free commercial use |
| **Lucide React Icons** | Lucide Project | [ISC](https://lucide.dev/license) | Permissive open-source |
| **Editorial Photography** | Unsplash | [Unsplash License](https://unsplash.com/license) | Free commercial use; replace with brand photography when physical flacons arrive |
| **Cormorant Garamond** | Christian Schwartz | [OFL](https://scripts.sil.org/OFL) | Open Font License |
| **Playfair Display** | Claus Eggers Sørensen | [OFL](https://scripts.sil.org/OFL) | Open Font License |
| **Inter Font** | Rasmus Andersson | [OFL](https://scripts.sil.org/OFL) | Open Font License |

---

## 🔒 Security & Credentials Audit

- **Zero Credentials Exposed**: There are no private API secrets, payment secret keys, or database passwords hardcoded in this codebase.
- **Client-Safe Keys**: Only public client identifiers (like `VITE_RAZORPAY_KEY_ID`) are read via environment variables.
- **Safe Fallbacks**: If external resources or network calls are interrupted, all components have graceful fallbacks and clear error states.
