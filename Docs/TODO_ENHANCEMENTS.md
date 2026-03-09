# 📝 Supen Spa — Enhancements & Fixes TODO List

Status: 🟢 **In Progress**

## Phase 1: Critical Fixes (P0)
- [x] **Create `privacy.html`**: Build a premium Privacy Policy page consistent with the new design.
- [x] **Delete 9 Obsolete Root Pages**: Remove the dead V1 versions (`balinese.html`, `swedish.html`, etc.) that conflict with `nested-pages/`.
- [x] **Secure External Links**: Add `rel="noopener noreferrer"` to all 27+ `target="_blank"` links.

## Phase 2: Security & Performance (P1)
- [x] **Security Headers**: Add Content Security Policy (CSP) meta tags to all pages.
- [x] **SRI Protection**: Add Subresource Integrity (SRI) and `crossorigin` to CDN scripts/styles.
- [x] **Image Lazy Loading**: Add `loading="lazy"` to 77+ non-hero images to boost performance.
- [x] **CSS Consolidation**: Move ~350 lines of inline `<style>` blocks into `assets/css/styles.css`.

## Phase 3: Design & SEO Polish (P2/P3)
- [x] **CSS Variable Migration**: Replace 294 hardcoded inline colors with theme variables (`var(--color-gold)`, etc.).
- [x] **SEO Essentials**: Create `sitemap.xml` and `robots.txt`.
- [x] **Social & Meta**: Add Open Graph (OG) tags for better sharing on WhatsApp/Instagram.
- [x] **Structured Data**: Add JSON-LD (Schema.org) for LocalBusiness/Spa Google rankings.
- [x] **Bundle Optimization**: Audit and clean up `styles.css` (moved inline styles and secured variables).

## Phase 4: Finalization
- [x] **Post-Optimization Audit**: Re-run the comprehensive report to verify fixes.
- [x] **README Update**: Document the full project structure and the major transformation updates.
