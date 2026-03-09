# 👑 Supen Spa — Premium Wellness Sanctuary

**Status:** ✅ PRODUCTION READY (v4.0)
**Last Update:** March 10, 2026
**Architecture:** Dark Purple & Maroon Luxury Glassmorphism | Mobile-First UI
**Live:** Cloudflare Pages + Firebase Hosting

---

## 💎 Project Philosophy
Supen Spa is a luxury wellness website built for an elite private clientele in Bandra, Mumbai. The architecture follows a **Strict Clean Root** philosophy — all production files live inside `website/`, all configuration and tooling lives inside `Config/`, and all docs/reports live inside `Docs/`. The root stays clean.

---

## 📁 Full Repository Structure (v4.0)

```text
SupenSpa/
├── 📄 README.md                    → Project overview, structure & changelog
├── 📄 .gitignore                   → Version control exclusions
│
├── 📁 Config/                      → ALL configuration & tooling (not for deployment)
│   ├── 📄 package.json             → Dev server (live-server, port 8080)
│   ├── 📄 package-lock.json        → Locked dependency tree
│   ├── 📄 firebase.json            → Firebase Hosting config (public=website, cleanUrls, 404)
│   └── 📄 server.log               → Local dev server log
│
├── 📁 Docs/                        → Audit reports, deep scans, project history
│   └── *.md / *.txt                → Audit logs, change records
│
└── 📁 website/                     → ★ THE PRODUCTION BUILD (deploy this folder)
    │
    ├── 📄 index.html               → Homepage: Hero Carousel, Rituals Grid, Testimonials, CTA
    ├── 📄 about.html               → Our Story, Philosophy, Team & Values
    ├── 📄 services.html            → Rituals Menu — full overview with pricing & booking
    ├── 📄 gallery.html             → Cinematic Gallery: marquee photos + video
    ├── 📄 pricing.html             → Pricing, Membership Packages (50% OFF highlighted)
    ├── 📄 contact.html             → Contact page with map, cards & social links
    ├── 📄 book-now.html            → Reservation System (WhatsApp-integrated)
    ├── 📄 privacy.html             → Client Confidentiality & Privacy Policy
    ├── 📄 404.html                 → Custom 404 error page (branded, auto-redirects home)
    │
    ├── 📁 services/                → 17 Individual Ritual Deep-Dive Pages
    │   ├── signature.html          → Elite Signature Ritual (120 min, ₹9,999)
    │   ├── aromatherapy.html       → Aroma Massage
    │   ├── swedish.html            → Swedish Massage
    │   ├── deep-tissue.html        → Deep Tissue Massage
    │   ├── balinese.html           → Balinese Massage
    │   ├── hot-stone.html          → Hot Stone Therapy Massage
    │   ├── bamboo-therapy.html     → Bamboo Therapy Massage
    │   ├── thai-massage.html       → Thai-Dry Massage
    │   ├── thai-balm.html          → Thai Balm Massage
    │   ├── ayurvedic-potli.html    → Ayurvedic Potli Massage
    │   ├── ayurvedic-shirodhara.html → Ayurvedic Shirodhara Massage
    │   ├── candle-massage.html     → Candle Massage
    │   ├── body-scrub.html         → Body Scrub Massage
    │   ├── aroma-with-scrub.html   → Aroma with Scrub Massage
    │   ├── four-hand.html          → Four Hand Massage
    │   ├── foot-massage.html       → Foot Massage
    │   └── couples.html            → Couple Massage
    │
    ├── 📁 assets/
    │   ├── 📁 css/
    │   │   ├── styles.css          → Master stylesheet (5,877 lines)
    │   │   └── responsive.css      → Mobile-first responsive overrides
    │   ├── 📁 js/
    │   │   └── script.js           → Interactivity: navbar scroll, carousel, modals, animations
    │   └── 📁 images/
    │       ├── 📁 Banner/          → Hero carousel images (Banners-1 to 5.jpeg)
    │       ├── 📁 Massage/         → Individual service images (17 ritual photos)
    │       ├── 📁 Posters/         → Elite Signature promotional posters
    │       └── Supen-Spa-Logo.png  → Official brand logo
    │
    ├── 📄 _redirects               → Cloudflare Pages 404 routing rule
    ├── 📄 .htaccess                → Apache server 404 error page mapping
    ├── 📄 sitemap.xml              → SEO sitemap for Google indexing
    ├── 📄 robots.txt               → Search engine crawler rules
    ├── 📄 footer_template.txt      → Shared footer HTML reference template
    └── 📄 header_template.txt      → Shared header/navbar HTML reference template
```

---

## 🎨 Design System — Dark Purple & Maroon Theme (v4.0)

> **Theme Name:** Dark Purple & Maroon Luxury Glassmorphism
> Previous: Midnight Purple Glassmorphism (v3.0) → Now evolved to a richer, warmer palette.

### Color Palette

| Variable | Hex | Usage |
|---|---|---|
| `--color-dark-royal` | `#160514` | Deepest background base |
| `--color-midnight` | `#2A0A1F` | Mid-depth background |
| `--color-royal-purple` | `#3D0D2B` | Surface/card backgrounds |
| `--color-deep-indigo` | `#5C1040` | Elevated elements |
| `--color-maroon` | `#8B0035` | Accent, borders, glows |
| `--color-magenta` | `#C2185B` | Secondary accent, hover glows |
| `--color-gold` | `#FFD700` | Primary gold — prices, icons, CTAs |
| `--color-gold-light` | `#FFDF40` | Hover/shimmer gold |
| `--color-lavender` | `#D4A0C0` | Body text highlights |
| `--color-text-body` | `#E8C8D8` | Main body text |
| `--color-text-light` | `#B88FA0` | Muted secondary text |

### Gradients & Backgrounds

- **Body bg:** `linear-gradient(135deg, #160514 → #2A0A1F → #3D0D2B → #160514)` — fixed attachment
- **Bokeh orbs:** Radial maroon/magenta floating clouds (fixed, `body::before`)
- **Navbar (scrolled):** `linear-gradient(135deg, rgba(22,5,20,0.97) → rgba(42,10,31,0.96) → rgba(61,13,43,0.97))` + blur(28px)
- **Mega menu dropdown:** Same dark purple-maroon gradient + `border-top: rgba(139,0,53,0.45)`
- **Footer:** `linear-gradient(180deg, rgba(13,3,10,0.99) → rgba(8,1,6,1))` — deepest maroon-black
- **Card bg:** `rgba(42, 10, 31, 0.65)` with `backdrop-filter: blur(15px)`

### Typography

| Font | Weights | Usage |
|---|---|---|
| `Outfit` | 300–700 | Headings, prices, display text |
| `Poppins` | 300–800 | Body, nav, buttons |

### Glow & Shadow System

- `--glow-gold`: `0 0 20px rgba(255,215,0,0.45), 0 0 40px rgba(255,215,0,0.20)`
- `--glow-magenta`: `0 0 20px rgba(194,24,91,0.50)`
- `--shadow-lg`: `0 24px 60px rgba(0,0,0,0.70)`

---

## 💳 Membership Pricing (Updated v4.0 — 50% OFF)

| Package | Original | **Discounted** | Valid |
|---|---|---|---|
| 🥈 Silver Ritual | ~~₹49,999~~ | **₹24,999** | 3 Months |
| 🥇 Gold Signature | ~~₹99,999~~ | **₹49,999** | 6 Months |
| 👑 Royal Infinite | ~~₹1,99,999~~ | **₹99,999** | 12 Months |

Each card shows: animated 🔥 50% OFF red badge + strikethrough original + bold discounted price.

**Elite Signature Ritual (Single Session):** ~~₹20,000~~ → **₹9,999** (50% OFF)

---

## 🌐 Hosting & Deployment

| Platform | Config File | 404 Routing |
|---|---|---|
| **Cloudflare Pages** | `website/_redirects` | `/* /404.html 404` |
| **Firebase Hosting** | `Config/firebase.json` | `"rewrites": [{ "source": "**", "destination": "/404.html" }]` |
| **Apache / cPanel** | `website/.htaccess` | `ErrorDocument 404 /404.html` |

> **Deploy:** Upload the `website/` folder only. Firebase: `firebase deploy` from project root with `Config/firebase.json`.

---

## 🚫 Custom 404 Page (`website/404.html`)

- Full Dark Purple + Maroon standalone theme (no external CSS dependency)
- Animated gradient **"404"** number with gold → maroon glow shift
- Floating particles + bokeh orb background
- Headline: *"This Ritual Doesn't Exist"*
- **Return Home** (gold CTA) + **Contact Us** (maroon outline) buttons
- Quick links: Rituals · Pricing · Gallery · About
- **10-second auto-redirect countdown** to homepage
- Logo with gold pulse animation

---

## 📱 Key Features & Components

### Navigation
- **Fixed glassmorphism navbar** — transparent on hero, maroon-purple gradient when scrolled
- **Full-page mega menu** — 4-column grid with service images, Dark Purple + Maroon backdrop
- **Mobile hamburger** — full-screen overlay menu
- **Active state** highlighting on current page nav link

### Pages & Sections
- **Hero carousel** — 5-slide auto-rotating banner with gold overlay (index, pricing, about etc.)
- **Scroll-reveal animations** — elements fade+slide in on viewport entry
- **WhatsApp floating button** — bottom-right, links to `wa.me/919819893901`
- **Gold dividers** — decorative separators throughout

### Footer — Private Sanctuary Section
All contact info is now **fully clickable** across every page:
- 📱 WhatsApp: `wa.me/919819893901` (opens WhatsApp chat)
- 📞 Phone: `tel:+919819893912` (opens dialer)
- ✉️ Email: `mailto:info@supenspa.com`

---

## 🔒 Security

- **Content Security Policy (CSP)** — `default-src 'self'` with whitelisted CDN sources
- **Subresource Integrity (SRI)** — hashes on Font Awesome CDN link
- **X-Frame-Options: SAMEORIGIN** — set via Firebase/Cloudflare headers
- **X-Content-Type-Options: nosniff** — prevents MIME sniffing

---

## 🏗️ Changelog

### v4.0 — March 10, 2026
- 🎨 **Theme overhaul** → Dark Purple + Maroon Luxury palette (`#160514`, `#2A0A1F`, `#3D0D2B`, `#8B0035`)
- 💰 **Pricing update** → 50% OFF on all memberships with bold discount highlight + strikethrough
- 🚫 **404 page** → Beautiful branded error page with auto-redirect countdown
- 🌐 **Multi-host routing** → Cloudflare Pages (`_redirects`), Firebase (`firebase.json`), Apache (`.htaccess`)
- 📱 **Footer links** → WhatsApp + phone numbers are now clickable across all 25 pages
- 🗂️ **Repo cleanup** → `firebase.json` moved to `Config/`, `netlify.toml` removed

### v3.0 — March 8–9, 2026
- Premium visual overhaul (Midnight Purple Glassmorphism)
- 17 individual service ritual pages added
- Full-page mega menu with service images
- Hero carousel (5 slides) on all major pages
- Image optimization (sharp pipeline)
- Contact page card alignment fix
- Signature Ritual price updated to ₹9,999 (50% OFF from ₹20,000)

### v2.0 — Earlier 2026
- CSP + SRI security implementation
- JSON-LD structured data for Local Business SEO
- Open Graph tags for social sharing

### v1.0 — Initial Launch
- Basic HTML/CSS spa website

---

## 📞 Sanctuary Contact Details

| Channel | Details |
|---|---|
| **WhatsApp / Booking** | +91 98198 93901 |
| **Phone** | +91 98198 93912 |
| **Email** | info@supenspa.com |
| **Hours** | 10:00 AM – 8:00 PM Daily |
| **Location** | 1st Floor, Link Corner Mall, 33rd "Teresa" Rd, Off Link Road, Beside Starbucks Coffee, Bandra West, Mumbai 400050 |

---

**© 2026 Supen Spa Wellness Sanctuary. All Rights Reserved.**
*Built with ❤️ by [ViViD Code Studio](https://vividcodestudio.web.app), a dev unit of [ViViD Global Services](https://vividglobal.in)*
