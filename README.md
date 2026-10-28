# Scented by the Garden — Premium Botanical Perfume E-Commerce

> *"Nature, Bottled with Elegance."*

A luxury botanical fragrance house e-commerce platform crafted with editorial typography, classic color palettes, spatial 3D scroll experiences, and a complete shopping experience.

---

## 🌿 Brand Identity & Philosophy

- **Brand Name**: Scented by the Garden
- **Tagline**: Nature, Bottled with Elegance
- **Brand Positioning**: A premium botanical fragrance house combining natural inspiration, refined perfumery, understated luxury, and contemporary craftsmanship.
- **Personality**: Classic, timeless, sophisticated, natural, refined, trustworthy, minimalist, and modern.

---

## 🎨 Design System & Color Palette

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Deep Forest Green** | `#20382D` | Primary brand canvas, headers, buttons, luxury boxes |
| **Dark Charcoal** | `#20231F` | Deep editorial typography and sharp contrasts |
| **Warm Ivory** | `#F7F3EB` | Base background and soft paper textures |
| **Muted Sage** | `#A6AD98` | Borders, secondary captions, subtle accents |
| **Champagne Gold** | `#B69A68` | Metallic accents, badges, star ratings, highlight strokes |
| **Pure White** | `#FFFFFF` | Card surfaces and flacon image stages |

### Typography
- **Headlines & Editorial Titles**: *Cormorant Garamond* & *Playfair Display* (Editorial serifs)
- **Navigation, Buttons, & Body**: *Inter* (Clean, legible geometric sans-serif)

---

## 🌸 The Signature Formulations

The website features six original sample botanical creations:

1. **Forest Bloom** (`₹2,499` / `50 ml` & `₹3,899` / `100 ml`)
   - *Family*: Fresh Woody / Green Floral
   - *Notes*: Wild Bergamot, Morning Mist Accord, Crushed Fern Leaf / Cyclamen, Pine Needles / Himalayan Cedar, Damp Oakmoss.
2. **Jasmine Whisper** (`₹2,199` / `50 ml` & `₹3,499` / `100 ml`)
   - *Family*: Floral Soliflore / White Floral
   - *Notes*: Calabrian Neroli, Green Stems / Madurai Sambac Jasmine, Royal Tuberose / Golden Ambergris, Silk Musk.
3. **Rosewood Essence** (`₹2,799` / `50 ml` & `₹4,199` / `100 ml`)
   - *Family*: Amber Woody / Warm Floral
   - *Notes*: Madagascar Pink Pepper, Spiced Mandarin / Crimson Damask Rose, Turkish Rose / Aged Rosewood, Smoked Vanilla.
4. **Sandalwood Serenity** (`₹2,999` / `50 ml` & `₹4,599` / `100 ml`)
   - *Family*: Sandalwood / Clean Warmth
   - *Notes*: Green Cardamom, Ambrette Seed / Florentine Orris Root, Violet Leaf / Aged Mysore Sandalwood, Cashmere Musk.
5. **Citrus Garden** (`₹1,899` / `50 ml` & `₹2,999` / `100 ml`)
   - *Family*: Citrus Botanical / Sparkling Fresh
   - *Notes*: Sicilian Blood Orange, Calabrian Bergamot / Lemon Verbena Leaves, Orange Blossom / Haitian Vetiver Roots.
6. **Lavender Dusk** (`₹1,999` / `50 ml` & `₹3,199` / `100 ml`)
   - *Family*: Herbal Aromatic / Relaxing Evening
   - *Notes*: Provencal High Lavender, Roman Chamomile / Clary Sage Infusion, Iris Butter / Toasted Tonka Bean, Silver Oakmoss.

---

## ⚡ Core Features & User Journey

### 1. Sticky Editorial Header & Navigation
- Responsive header with brand wordmark and collection links.
- Subtly compresses when scrolling past 40px without jarring layout shifts.
- Live search modal with instant note & fragrance family autocomplete.
- Wishlist icon with badge count.
- Shopping bag button with live count and slide-over cart drawer.
- Accessible mobile navigation drawer with backdrop blur.

### 2. Cinematic Golden-Hour Hero
- Rich visual composition inspired by botanical garden sunlight.
- High-contrast forest green gradient overlays ensuring maximum text readability.
- Clear primary ("Explore the Collection") and secondary ("Discover Our Story") call-to-actions.

### 3. The Perspective Atelier (Signature Scroll)
- Spatial 3D depth arrangement of the six signature bottles.
- Active bottle steps into the foreground with scale, sharpness, and full olfactory accords.
- Background flacons soften with blur and depth perspective.
- Interactive prev/next scrubber and dot indicator.

### 4. Interactive Collection & Filtering
- Filter by Fragrance Family (All, Fresh Woody, Floral, Amber Woody, Sandalwood, Citrus Botanical, Herbal Aromatic).
- Maximum price slider (₹1,800 to ₹3,500).
- In-stock only filter toggle.
- Real-time search query filtering.
- Multi-criteria sorting: Featured, Price (Low to High), Price (High to Low), Rating, and Alphabetical.

### 5. Flacon Quick-View & Dedicated Product Page
- Multi-angle gallery with thumbnail switching.
- Flacon volume selector (50 ml vs 100 ml) with live price recalculation.
- Quantity selector and instant bag additions.
- Olfactory pyramid tabbed breakdown: Top Notes, Heart Notes, Base Notes, Story, Wearing Ritual, and Delivery.
- Related fragrances recommendation section.

### 6. Full Shopping Bag & Checkout Flow
- LocalStorage persistence across page reloads.
- Quantity adjustment (+ / -) and item removal.
- Free shipping progress bar (Complimentary shipping above ₹1,999).
- Promo code engine (`GARDEN10` for 10% discount, `BOTANICAL15` for 15% VIP discount).
- Multi-step checkout with comprehensive input validation.
- Simulated payment options (Instant UPI, Cash on Delivery, Test Card).
- Generated order confirmation page (`SBG-XXXXXX`) with printable invoice receipt.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4 with custom color tokens & Cormorant Garamond typography
- **Icons**: Lucide React + custom inline luxury SVGs
- **State Management**: React Context (`CartContext`, `WishlistContext`, `ToastContext`)
- **Persistence**: Browser `localStorage` for bag and wishlist, `sessionStorage` for demo order session

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+` or `v20+` (Tested on Node `v24.20.0`)
- npm `v9+` or `v11+`

### Installation & Run

```bash
# 1. Navigate to the project directory
cd D:\scented-by-the-garden

# 2. Install dependencies (if not already installed)
npm install

# 3. Start development server
npm run dev

# 4. Open http://127.0.0.1:5173/ in your browser
```

### Production Build

```bash
# Compile TypeScript and bundle with Vite
npm run build

# Preview the production build locally
npm run preview
```

---

## 📁 Project Directory Structure

```
D:\scented-by-the-garden\
├── public/
│   └── favicon.svg                  # Brand monogram favicon (SG in Champagne Gold)
├── src/
│   ├── types/
│   │   └── product.ts               # Product, Cart, and Order TypeScript definitions
│   ├── data/
│   │   ├── products.ts              # 6 Original sample botanical perfumes
│   │   ├── ingredients.ts           # Botanical sourcing and ingredient profiles
│   │   └── faq.ts                   # Categorized customer care & FAQ items
│   ├── context/
│   │   ├── CartContext.tsx          # Bag management, totals, free shipping, promo codes
│   │   ├── WishlistContext.tsx      # Saved fragrances state with localStorage
│   │   └── ToastContext.tsx         # Toast notification system
│   ├── components/
│   │   ├── Header.tsx               # Sticky header with compact scroll behavior
│   │   ├── MobileNav.tsx            # Slide-out drawer with accessible controls
│   │   ├── SearchModal.tsx          # Real-time search by name, notes, and mood
│   │   ├── CartDrawer.tsx           # Slide-over shopping bag panel
│   │   ├── ProductCard.tsx          # Reusable product card with quick-actions
│   │   ├── QuickViewModal.tsx       # Rapid fragrance inspector modal
│   │   ├── Hero.tsx                 # Cinematic golden-hour landing hero
│   │   ├── SignatureScroll.tsx      # Spatial perspective 3D bottle atelier
│   │   ├── WhyChooseUs.tsx          # 4 Brand pillars with orbital flacon stage
│   │   ├── IngredientsSection.tsx   # "Rooted in Nature. Refined by Craft."
│   │   ├── Newsletter.tsx           # Demonstration newsletter subscription
│   │   └── Footer.tsx               # Editorial footer with atelier concierge links
│   ├── pages/
│   │   ├── HomePage.tsx             # Curated landing page
│   │   ├── CollectionPage.tsx       # Complete catalog with search, filters, sorting
│   │   ├── ProductDetailPage.tsx    # Olfactory rituals, galleries, and volume selection
│   │   ├── CartPage.tsx             # Full dedicated cart overview
│   │   ├── CheckoutPage.tsx         # Delivery form with validation & demo payment
│   │   ├── OrderConfirmationPage.tsx# Simulated order confirmation with printable invoice
│   │   ├── AboutPage.tsx            # The Maison philosophy and maceration craft
│   │   ├── IngredientsPage.tsx      # Detailed botanical sourcing atlas
│   │   ├── ContactPage.tsx          # Atelier concierge contact and appointment form
│   │   ├── FAQPage.tsx              # Searchable FAQ accordion
│   │   └── WishlistPage.tsx         # Personal wishlist with move-to-bag capability
│   ├── App.tsx                      # Route declarations & ScrollToTop behavior
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Tailwind CSS v4 setup and typography themes
├── index.html                       # SEO title, meta tags, OpenGraph, Google Fonts
├── tsconfig.app.json                # TypeScript application configuration
├── vite.config.ts                   # Vite configuration with Tailwind CSS plugin
└── package.json                     # Project manifest and scripts
```

---

## 🔒 Demonstration Store Notice
*Scented by the Garden* is an architectural demonstration e-commerce project designed to showcase luxury branding, editorial UI/UX, and performant frontend engineering. No actual payments are captured and no live orders are dispatched.
