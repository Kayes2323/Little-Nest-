# Little Nest storefront

Mobile-first fashion storefront for Little Nest (Bangladesh). Next.js 15 (App Router) + TypeScript, no UI framework.
Bangla/English, ৳ formatting, Cash on Delivery, WhatsApp ordering, data-driven categories, protected admin.

## Run

```bash
npm install
npm run dev                         # http://localhost:3000, admin at /admin (dev password: littlenest-demo)
# production
cp .env.example .env.local          # set ADMIN_PASSWORD + ADMIN_SECRET
npm run build && npm start
```

## Current content (no admin needed)

Products, photos and contact details live in **`src/data/seed.ts`**; photos are in `public/products/`. Edit that file and redeploy; the admin dashboard is optional and can be ignored.

- **Set a price / sizes:** in `seedProducts`, change `price: null` to e.g. `price: 1250`, and add `variants: sizes(["0-3M","3-6M"])`. With a price set, Add to Cart and Cash on Delivery checkout switch on for that product. Until then each product shows "Price coming soon" and orders go through WhatsApp.
- **Mark new arrivals:** set `isNew: true` (the New arrivals section appears only when at least one product has it).
- **WhatsApp / Facebook:** `seedSettings.contact` (`whatsapp: "8801604508268"`, `facebook`).
- **Reviews:** customers submit on the homepage; submissions stay hidden until approved in `/admin` → Reviews tab. No review is shown that wasn't submitted/approved.
- If a `data/runtime/store.json` exists (created by admin edits or orders), it overrides `seed.ts`; delete it to go back to the file content.

## What is real vs. placeholder

Nothing business-specific is invented. Out of the box: **no prices, no WhatsApp number, no delivery charges, no policies**.
Products without a price show "Price coming soon" and cannot be added to the cart.
The newsletter box is a **demo** (disabled, not connected).

## How to... (all in `/admin`)

| Task | Where |
|---|---|
| Replace placeholder photos | Products → Edit → *Add photo* (first = main, second = hover). Category cover: Categories → *Cover image*. Story/gallery/campaign images: Homepage |
| Add a real product | Products → *New product* (name EN/বাংলা, collections, sizes/colours/stock, photos). Delete or edit the Sample ones |
| Set prices | Product → *Price (৳)*. Empty = not for sale yet |
| Image cropping | Product → *Image ratio* and *Focal point*. Product page uses `contain`, so the full garment is never cropped |
| Hero video | Homepage → Hero → upload MP4/WebM (5–15 s, muted, ≲6 MB) + poster. Falls back to poster on error, reduced motion, or Data Saver |
| Connect WhatsApp | Shop info → WhatsApp number, digits with country code (`8801XXXXXXXXX`) |
| Delivery charges / COD | Shop info → Delivery & payment (empty = "To be confirmed") |
| Add Kids / Women / Men | Categories → activate the prepared one (or add new). Shown on the storefront only when active **and** it has a visible product |
| Campaigns | Homepage → Campaign sections (headline, text, image/video, button) |
| Orders | Orders tab; cancelling restocks tracked variants |

## Architecture

- `src/data/seed.ts` starter content · `src/lib/store.ts` persistence (JSON file `data/runtime/store.json`, uploads in `data/runtime/uploads`, served by `/uploads/[name]`).
- Prices, stock, delivery and totals are **recomputed server-side** in `/api/orders`; the browser cart is never trusted.
- Admin: password → signed HttpOnly cookie (8 h), rate-limited login, every write route re-checks it. `/admin` is disabled in production unless both env vars are set.
- Design tokens: top of `src/app/globals.css`. Copy: `src/lib/i18n.ts` (UI) and admin (content).

## Going to production — limits to know

- The default JSON-file storage needs a **persistent writable disk** (VPS, Fly/Render volume). On Vercel/serverless the filesystem is ephemeral: replace the four functions in `src/lib/store.ts` (`readStore`, `mutate`) and `src/lib/uploads.ts` with a database (e.g. Supabase Postgres + Storage). The rest of the app only uses those.
- Rate limiting is in-memory (per instance).
- Login uses one shared password; no per-user accounts or roles.
- Not implemented: online payments (bKash/Nagad/cards), email notifications, customer accounts, order tracking page, newsletter.
