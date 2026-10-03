# Olivia Hart — Luxury Real Estate Sales Demo

Automated Playwright-based demo showcase for the Olivia Hart luxury real estate personal brand website.

## Quick Start

1. Start the local HTTP server:
```bash
cd stitch_olivia_hart_luxury_advisory/olivia_hart_luxury_real_estate_advisor_cairo && python3 -m http.server 8080
```

2. Run the full demo showcase:
```bash
npx playwright test --project=desktop --reporter=list demo/showcase.spec.ts
```

3. View generated screenshots:
```bash
open demo/demo-output/
```

## Project Structure

```
├── code.html                          # Main website (source of truth)
├── DEMO_STORYBOARD.md                 # Video storyboard specification
├── DESIGN.md                          # Design system specification
├── playwright.config.ts               # Playwright configuration
├── demo/
│   ├── helpers/
│   │   └── demo-helpers.ts            # Reusable helper functions
│   ├── showcase.spec.ts               # Main demo specification (11 scenes)
│   └── demo-output/                   # Generated screenshots
└── package.json
```

## Demo Scenes (11 total, ~60 seconds)

1. **Opening** — Navigation and brand identity
2. **Hero Reveal** — Full hero composition with portrait hover
3. **About** — Personal brand and trust elements
4. **Services** — Three-pillar BUY/SELL/INVEST model
5. **Properties** — Four curated listings with hover effects (longest)
6. **Areas** — Four geographic markets
7. **Testimonials** — Dark-section social proof
8. **Insights** — Three article cards
9. **Social** — Instagram grid with hover overlays
10. **Responsive** — Desktop → Mobile → Desktop transition
11. **Final CTA** — Conversion moment with footer

## Verification Checklist

- ✅ All 11 scenes pass
- ✅ Desktop viewport (1440×900)
- ✅ Mobile viewport (390×844)
- ✅ Navigation links work
- ✅ Hover interactions verified
- ✅ Mobile menu opens/closes
- ✅ All screenshots generated
- ✅ No console errors
- ✅ Images loaded
- ✅ Responsive layout verified

## What Was Preserved

- Original design, typography, colors, layout
- All content unchanged
- No framework conversion
- No backend added
- Only minimal mobile navigation enhancement
- Only `data-purpose` attributes added for Playwright selectors

## What Was Added

- Mobile hamburger menu (CSS + JS)
- `data-purpose` attributes on all interactive elements
- `id` attributes on sections for Playwright selectors
- Playwright test infrastructure
- Demo helper functions
- Screenshot generation pipeline

## Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all 11 desktop demo scenes |
| `npm run test:mobile` | Run mobile demo scene |
| `npm run showcase` | Run with list reporter |
| `npm run demo` | Start server and run demo |
# olivia_hart_luxury_advisory
