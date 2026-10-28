# Scented by the Garden — Premium Botanical Perfume E-Commerce

> *"Nature, Bottled with Elegance."*

A luxury botanical fragrance house e-commerce platform built with React 19, TypeScript, Vite, Tailwind CSS v4, and React Router. Designed for immediate commercial handover and deployment.

---

## 🌟 Highlights for Buyers & Store Owners

- **Luxury Design System**: Forest green (`#20382D`), warm ivory (`#F7F3EB`), champagne gold (`#B69A68`), and muted sage with *Cormorant Garamond* editorial serif typography.
- **Unbranded Botanical Imagery**: Pristine, unbranded perfume flacons and raw botanical imagery (free from third-party corporate logos).
- **Interactive Spatial 3D Bottle Showcase**: Perspective atelier presenting the six signature formulas in optical depth.
- **Full E-Commerce State Management**: Real cart persistence across refreshes, volume-dependent pricing (50 ml vs 100 ml), dynamic promo code engine (`GARDEN10`, `BOTANICAL15`), and free-shipping progress tracker.
- **Complete Payment Methods Suite**: Razorpay Checkout SDK integration, instant UPI & QR code scanner terminal, direct credit/debit card terminal, and Cash on Delivery.
- **Admin Order Dashboard (`/admin`)**: Real-time sales metrics, customer order table, sample order generator, and CSV export.
- **One-File Brand Re-theming**: Easily re-brand the entire store by changing [`src/config/brandConfig.ts`](./src/config/brandConfig.ts).
- **Deployment-Ready**: Pre-configured for zero-config deployment to Vercel and Netlify (`vercel.json`, `netlify.toml`, `_redirects`).

---

## 📁 Key Files & Architecture

```
scented-by-the-garden/
├── src/
│   ├── config/
│   │   └── brandConfig.ts           # Central store configuration (Name, Contact, Currency, Promos)
│   ├── types/
│   │   └── product.ts               # TypeScript data models for Products, Cart, and Orders
│   ├── data/
│   │   ├── products.ts              # 6 Botanical perfume formulations
│   │   ├── ingredients.ts           # Botanical sourcing atlas
│   │   └── faq.ts                   # Customer care questions & policies
│   ├── context/
│   │   ├── CartContext.tsx          # Real shopping bag state & calculations
│   │   ├── WishlistContext.tsx      # Saved favorites with localStorage
│   │   └── ToastContext.tsx         # Notification feedback system
│   ├── utils/
│   │   └── razorpay.ts              # Razorpay checkout script & popup loader
│   ├── pages/
│   │   ├── HomePage.tsx             # Curated landing page & editorial showcase
│   │   ├── CollectionPage.tsx       # Search, family filters, price slider, and sorting
│   │   ├── ProductDetailPage.tsx    # Olfactory pyramids, flacon sizes, rituals
│   │   ├── CartPage.tsx             # Full cart overview & promo codes
│   │   ├── CheckoutPage.tsx         # Shipping form & 4-way payment suite
│   │   ├── OrderConfirmationPage.tsx# Itemized invoice receipt with print preview
│   │   ├── AdminPage.tsx            # Admin Order Dashboard with CSV export (/admin)
│   │   ├── AboutPage.tsx            # Maison philosophy & slow maceration craft
│   │   ├── IngredientsPage.tsx      # Provenance of Jasmine, Sandalwood, Rosewood, etc.
│   │   ├── ContactPage.tsx          # Concierge inquiry form & atelier details
│   │   ├── FAQPage.tsx              # Searchable care & return policy guidance
│   │   └── WishlistPage.tsx         # Personal wishlist with move-to-bag action
│   ├── components/                  # Reusable UI components
│   ├── App.tsx                      # Application router & layout
│   └── index.css                    # Tailwind CSS v4 design tokens & fonts
├── public/                          # Favicon & deployment redirects
├── vercel.json                      # Vercel SPA rewrite configuration
├── netlify.toml                     # Netlify build & rewrite configuration
├── HANDOVER.md                      # Comprehensive buyer handover documentation
└── README.md                        # Documentation overview
```

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Compile production build
npm run build
```

---

## 📖 Handover & Customization

For step-by-step instructions on customizing the brand name, connecting live Razorpay API keys, and deploying to custom domains, see the **[Buyer Handover Guide](./HANDOVER.md)**.
