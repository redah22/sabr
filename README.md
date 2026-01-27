# SABR - Streetwear Brand

Modern e-commerce for an underground streetwear brand, built with Next.js.

## Quick Start (For Friends & Contributors)

### Mac/Linux
Simply run the setup script:

```bash
./setup.sh
```

This will automatically:
1. Check for Node.js
2. Install all dependencies
3. Start the local server at http://localhost:3000

### Manual Setup

If you prefer to run commands manually:

```bash
npm install
npm run dev
```

## Structure

- `/components`: UI Components (Navbar, Hero, Cart, etc.)
- `/app`: Pages and Layouts (Next.js App Router)
- `/public`: Images and Assets
- `/context`: Global State (CartContext)

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: CSS Modules
- **Payments**: Stripe (Integration ready)
