# Brew & Bloom

A complete, polished, responsive coffee-shop website built as a **UI/UX rebranding case study** inspired by Kopi Kenangan. Every brand name, product, price, store and promotion on the site is **fictional sample data** — the project is a design prototype only and is not affiliated with Kopi Kenangan or any real business.

> **Disclaimer.** This is a front-end design prototype. No orders are placed, no payments are taken, no accounts are created and no personal data is stored. The checkout form exists only to demonstrate client-side validation and a simulated confirmation flow.

## Tech stack

- Plain **HTML5** (semantic, accessible markup)
- Plain **CSS3** (custom design system: tokens, responsive grid, components)
- **Vanilla JavaScript** (ES5-compatible IIFEs, no framework, no build step)
- `localStorage` for cart persistence
- Inline SVG icon sprite (no icon font)

No npm, bundler or transpiler is required — open the files in any modern browser.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, featured drinks, brand story, testimonials |
| `menu.html` | Full menu with category filters and search |
| `product.html` | Product detail (driven by `?id=` query param) with size/quantity picker |
| `cart.html` | Cart with quantity changes, removal, clear and order summary |
| `order-summary.html` | Mock checkout form with validation and simulated confirmation |
| `promotions.html` | Sample offers with category filters and copy-code action |
| `locations.html` | Sample store locator with area filters and search |
| `about.html` | Brand story, values and (sample) timeline |

## Project structure

```
brew-and-bloom/
├── index.html, menu.html, product.html, cart.html,
│   order-summary.html, promotions.html, locations.html, about.html
├── css/
│   ├── tokens.css        # design tokens (color, type, spacing, radius, shadow)
│   ├── base.css          # reset + base typography
│   ├── layout.css        # grid, containers, responsive helpers
│   ├── components.css    # buttons, cards, forms, toast, nav, footer
│   └── pages.css         # page-specific styles
├── js/
│   ├── core.js           # DOM helpers, formatting, icons, Cart (localStorage), Toast
│   ├── data.js           # fictional PRODUCTS / PROMOTIONS / STORES / CATEGORIES
│   ├── main.js           # shared chrome: nav, footer, cart badge, global search
│   ├── menu.js           # menu filtering + search
│   ├── product.js        # product detail rendering + add to cart
│   ├── cart.js           # cart page rendering + line actions
│   ├── order-summary.js  # checkout form validation + simulated confirmation
│   ├── promotions.js     # promo filters + copy code
│   └── locations.js      # store filters + directions simulation
├── assets/               # local images (no remote dependencies)
└── README.md
```

## Features

- **Responsive layout** — mobile-first, fluid type, no horizontal overflow; works from 320px up.
- **Cart persistence** — cart is stored in `localStorage` and survives reloads; quantity changes, removal and clear are all wired.
- **Product detail** — driven by `?id=` query param; size selector updates price; quantity stepper; add to cart with toast feedback.
- **Menu** — category chips + debounced search; empty state when no matches.
- **Checkout (simulated)** — name, email, phone, address and optional notes with inline + summary validation; simulated 700ms processing then a confirmation panel with a generated reference number; cart is cleared afterwards. Clear disclaimer that nothing is transmitted.
- **Promotions** — category filters + one-click copy code (with clipboard fallback).
- **Locations** — area chips + search; simulated "Get directions" action.
- **Accessibility** — semantic landmarks, skip link, focus management, ARIA on interactive controls, reduced-motion respect.
- **Resilient images** — every `<img>` degrades to a neutral placeholder if a file is missing.

## Running locally

Any static file server works. From the project folder:

```bash
# Python 3
python3 -m http.server 8765

# or Node
npx serve .
```

Then open `http://127.0.0.1:8765/index.html`.

> Opening the HTML files directly via `file://` also works for browsing, but a local server is recommended so query params and module-style relative paths behave consistently.

## Data

All content lives in `js/data.js`:

- `PRODUCTS` — 16 items across `coffee`, `non-coffee` and `signature` categories.
- `PROMOTIONS` — 4 sample offers.
- `STORES` / `STORE_AREAS` — 6 sample locations.
- `CATEGORIES` — category metadata used by filters.

Prices are in Indonesian Rupiah and formatted with `BB.formatIDR`.

## Validation performed

- `node --check` on every JS module (all pass).
- Data integrity: all `image` paths resolve to existing files; all promo `productIds` resolve to real products.
- Link integrity: all internal `.html` links resolve.
- Selector coverage: every `data-*` hook referenced by JS exists in the markup.
- Responsive: no `100vw` overflow usage; mobile-first breakpoints.

## Credits

Design and code: Brew & Bloom case study. Brand inspiration: Kopi Kenangan (unaffiliated). All imagery is sample/placeholder photography.# brew-bloom
