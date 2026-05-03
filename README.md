# NITT Merch Store

> Wear the Legacy — NIT Tiruchirappalli, Est. 1964

A static storefront for official NITT merchandise. No build step required.

## Deploy on Netlify

1. Push this folder to a GitHub repository
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Select your repo
4. Build command: *(leave empty)*
5. Publish directory: `.`
6. Click **Deploy site**

Done. Your store is live in ~30 seconds.

## Project Structure

```
nitt-merch/
├── index.html       # Main page — nav, hero, products, cart, footer
├── app.js           # Renders product grid, wires up cart & animations
├── cart.js          # Cart state, add/remove/qty logic, toast notifications
├── products.js      # Product catalogue — edit here to add/change items
├── styles.css       # Custom styles, animations, forest/cart overlay fixes
├── netlify.toml     # Netlify config — JS MIME type & security headers
└── README.md
```

## Adding a New Product

Edit `products.js` and add an entry to the array:

```js
{
  id: 'unique-kebab-id',
  name: "'Product Name'",
  tagline: 'One-liner description.',
  price: 999,                        // in INR (paise not required)
  color: 'Color Label',
  material: 'Material description',
  image: 'https://your-image-url.com/photo.jpg',
  badge: 'New',                      // Bestseller | New | Limited | Welcome Kit
  accent: 'maroon',                  // maroon | midnight | totem | forest
  description: "Full product description shown on the card."
}
```

Available accents: `maroon` (#5C1E2E), `midnight` (#1B2A4E), `totem` (#A6242E), `forest` (#2D6A4F)

## Tech Stack

- Vanilla JS (ES Modules) — no bundler needed
- Tailwind CSS (CDN)
- GSAP + ScrollTrigger for animations
- Lucide icons
- Google Fonts — Cormorant Garamond + Inter
