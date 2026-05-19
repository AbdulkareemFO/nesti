# Nesti — a nest for what's coming 🌸

A bilingual (English + Arabic) baby & mother e-commerce platform. Premium curated baby essentials with a shareable wishlist where mothers-to-be save items and guests buy gifts.

**Target market:** Saudi Arabia (KSA) · **Currency:** SAR · **Languages:** English + Arabic (full RTL support)

---

## Quick Start

No build step required. Open `index.html` in a browser, or deploy to any static host.

```bash
# Local development — any static server works
npx serve .
# or
python3 -m http.server 8000
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Import in [Vercel](https://vercel.com)
3. Settings:
   - **Framework Preset:** Other
   - **Build Command:** _(leave empty)_
   - **Output Directory:** `.`
4. Deploy

## Tech Stack

| Layer | Choice |
|-------|--------|
| UI | React 18 (UMD) + ReactDOM |
| JSX | Babel Standalone (in-browser transpilation) |
| Styling | CSS custom properties + inline styles |
| Fonts | Google Fonts (Cormorant Garamond, Manrope, Amiri, Tajawal) |
| Backend | None — all state is in-memory React state |
| Images | CSS-only generative placeholders (no real photos) |

## File Structure

```
index.html              → App shell, CSS tokens, font imports, script loading
nesti-data.jsx          → Product catalog, categories, ages, genders, palettes
nesti-i18n.jsx          → EN + AR translations (200+ keys), formatPrice()
nesti-ui.jsx            → Shared components: Header, Footer, ProductCard, Modal, etc.
nesti-home.jsx          → Homepage: Hero, category grid, filters, ProductGrid
nesti-detail.jsx        → Product detail page + ShopPage (category listing)
nesti-cart.jsx          → Cart page + empty state
nesti-auth.jsx          → SignUp, Login, OTP pages + AuthPrompt modal
nesti-wishlist.jsx      → Signed-in wishlist + custom item modal + share modal
nesti-guest.jsx         → Public guest wishlist view + GuestItemCard
nesti-gift-checkout.jsx → Gift checkout flow (review → delivery → pay) + confirmation
nesti-app.jsx           → Root App component, all state, router, context providers
tweaks-panel.jsx        → Dev panel: palette, typography, hero variant toggles
```

> ⚠️ **Script loading order matters.** Files are loaded sequentially in `index.html`. Dependencies flow top-down.

## Design Tokens

Three color palettes available via `data-palette` attribute on `<html>`:

- **Petal Rose** (default) — warm blush tones
- **Sand** — earthy golden tones
- **Sage** — soft green tones

Typography switches between serif (`Cormorant Garamond` / `Amiri`) and sans-serif (`Manrope` / `Tajawal`) via the tweaks panel.

## Key Features

- **Bilingual UI** — Full English ↔ Arabic toggle with RTL layout support
- **Shareable Wishlist** — Mothers save items; guests view and buy gifts
- **Gift Checkout** — 3-step flow: review → delivery → payment
- **Auth Flow** — Sign up / login with OTP, auth-gated actions resume after login
- **Product Catalog** — Filterable by category, age, gender, brand
- **Design Tweaks** — Live palette, typography, and hero variant switching

## Currency

All prices stored in USD, displayed as SAR (×3.75). Use `formatPrice(usdPrice, lang)` for display.

## Contributing

- All user-facing strings need both EN and AR translations in `nesti-i18n.jsx`
- Use existing CSS custom properties — don't introduce new colors/fonts
- Maintain the soft, maternal brand voice
- Test RTL layout when touching any layout code
- No build tools or Node dependencies at runtime

## License

Private — All rights reserved.
