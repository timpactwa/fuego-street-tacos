# Fuego Street Tacos — Online Ordering Design

**Date:** 2026-05-27
**Scope:** Add pickup + delivery ordering with simulated Stripe checkout to the Fuego demo site.

---

## Overview

Add a complete ordering flow to the Fuego Street Tacos demo: "Add to Cart" buttons on the menu page, a slide-out cart drawer, and a multi-step `/order` checkout page. Payments are simulated (no real Stripe API calls) — the UI is styled to look like a real Stripe-powered checkout.

This is a portfolio demo for Render, so the goal is to impress prospects with a realistic, polished ordering experience.

---

## Architecture

### New files
- `lib/cart-context.tsx` — React Context for cart state, wraps the app
- `components/CartDrawer.tsx` — slide-out cart panel
- `app/order/page.tsx` — multi-step checkout page

### Modified files
- `lib/menu-data.ts` — add `priceNum: number` to each item alongside existing `price: string`
- `app/layout.tsx` — wrap children with `CartProvider`, render `CartDrawer`
- `components/layout/Navbar.tsx` — add cart icon with item count badge
- `app/menu/page.tsx` — add Add/stepper controls to each menu item card

---

## Data Layer

### `menu-data.ts` changes
Each item gets a `priceNum` field (numeric, in dollars) so the cart can do math without string parsing. The existing `price` string stays for display.

```ts
{ name: 'Carne Asada', description: '...', price: '$5', priceNum: 5 }
```

### Cart state (`lib/cart-context.tsx`)

```ts
type CartItem = {
  name: string
  price: number       // numeric dollars
  quantity: number
  category: string    // 'taco' | 'plate' | 'extra' | 'drink' | 'dessert'
}

type CartContextValue = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (name: string) => void
  updateQuantity: (name: string, qty: number) => void
  clearCart: () => void
  total: number       // sum of price * quantity
  count: number       // sum of quantities
  isOpen: boolean     // drawer open state
  openCart: () => void
  closeCart: () => void
}
```

`CartProvider` is a client component. It wraps the app in `layout.tsx`. The drawer open/close state lives here so the navbar can trigger it.

---

## Menu Page

Each item card gets an interactive control in the bottom-right corner:

- **Not in cart:** An `+ Add` button (small, fuego-colored)
- **In cart:** A quantity stepper `− 2 +` replacing the button inline

The stepper's decrement button removes the item entirely when quantity reaches 0. No separate remove button needed on the card — the cart drawer handles that.

The menu page becomes a client component (`'use client'`) to consume `CartContext`.

---

## Cart Drawer (`components/CartDrawer.tsx`)

A fixed right-side panel, rendered in `layout.tsx` outside the main content.

**Behavior:**
- Slides in from the right using Framer Motion (`x: '100%'` → `x: 0`)
- Semi-transparent overlay behind it; clicking overlay closes drawer
- Rendered always in the DOM, visibility controlled by `isOpen`

**Contents (top to bottom):**
1. Header: "Your Order" + X close button
2. Scrollable item list — each row: item name, `− qty +` stepper, line total, trash icon
3. Empty state if no items ("Nothing here yet — add something from the menu")
4. Subtotal row
5. "Proceed to Checkout →" button (links to `/order`, disabled if cart empty)

---

## Navbar

Add a cart icon (shopping bag SVG or similar) to the right side of the navbar. When `count > 0`, show a small fuego-colored badge with the count. Clicking the icon calls `openCart()`.

---

## `/order` Page

Multi-step page. Step state is local (`useState`) — no URL params needed since this is a demo. A progress bar or step indicator sits at the top.

Desktop layout: steps on the left (~60% width), sticky order summary sidebar on the right (~40%).
Mobile: steps full-width, summary collapsed at top.

### Step 1 — Order Type
Two large selectable cards side by side:
- **Pickup** — "Ready in 15–20 min"
- **Delivery** — "35–45 min · $3.99 fee"

Selecting one advances to Step 2 automatically.

### Step 2 — Details

**If Pickup:**
- Dropdown or button grid of available time slots (every 15 min, within today's hours)
- Today's hours pulled from a constant (matching the contact page)
- "Continue" button advances to Step 3

**If Delivery:**
- Fields: Street address, Apartment/unit (optional), City, Zip
- $3.99 delivery fee appears in the order summary sidebar
- "Continue" button advances to Step 3

### Step 3 — Payment
Contact info + fake payment form, all in one step:

**Contact:**
- Name (text)
- Phone (tel)
- Email (email)

**Payment (Stripe-styled):**
- Card number field (formatted as `1234 5678 9012 3456`)
- Expiry (MM/YY) + CVC side by side
- Fields styled with a subtle card/input look matching Stripe Elements visual language (white bg, light border, lock icon near CTA)

"Place Order →" button. On click: 500ms loading state → advances to Step 4. No real API call.

### Step 4 — Confirmation
- Large checkmark animation
- Generated order number (e.g. `#FG-3847`)
- Summary: items ordered, order type, estimated time
- "Track your order" placeholder button (non-functional, shows this could be extended)
- Cart is cleared on reaching this step

---

## Order Summary Sidebar

Visible on desktop throughout Steps 1–3. Shows:
- Each cart item (name, qty, line total)
- Subtotal
- Delivery fee (shown as $0.00 or $3.99 depending on Step 1 selection)
- **Total**

On mobile, collapsed to a tappable "Order Summary" accordion above the step content.

---

## Constraints & Notes

- No backend, no API routes, no real Stripe keys — everything is client-side simulation
- Cart state is in-memory only (resets on page refresh) — acceptable for a demo
- The fake payment form accepts any input; no card validation beyond basic formatting
- Taco minimum-2 rule shown on the menu is informational only — not enforced in cart logic
- All new components follow the existing Fuego design system: `font-display` / `font-body`, `fuego` / `golden` / `verde` / `charcoal` / `cream` color tokens, Framer Motion for animations
