# Jessica Nunez — Content Design Portfolio

A 5-page site. Plain HTML/CSS/vanilla JS, no build step, no framework — open any `.html` file directly in a browser or a live-server extension.

## Pages
- `index.html` — home: hero, selected-work teaser, "how I work", wall art, contact
- `portfolio.html` — case-study index, gated behind a client-side password prompt (see Portfolio password gate below); links out to individual case-study pages
- `case-study-meta.html` — full case study for the Meta role (4 sub-projects: value taxonomy, attribution products, performance goals/KPI expression, Meta Account content). Re-checks the same password gate independently so a direct link can't skip it
- `case-study-bcbsm.html` — full case study for the Blue Cross Blue Shield of Michigan role (3 sub-projects: careers page redesign, GM health plan microsite, content automation for 60+ plan pages). Same independent password-gate pattern
- `resume.html` — web reconstruction of the resume PDF, styled to match the site

The two case-study pages cross-link to each other ("Next case study") at the bottom, so a reader can move between them without going back through the portfolio index.

All pages share the same top-right nav (Home / Portfolio / LinkedIn / Resume) and a five-petal flower wordmark, duplicated inline in each file — there's no shared header/CSS file, so a nav or style change has to be made in every page.

## Files
- `assets/jessica.jpg` — portrait
- `assets/floral-print.jpg`, `assets/embroidery-poppy.jpg` — wall art
- `assets/jessica-nunez-resume.pdf` — downloadable resume, linked from `resume.html`
- `assets/meta-icon.png`, `assets/bcbsm-icon.png` — brand marks used on the case-study headers
- `assets/case-study-meta/*.png`, `assets/case-study-bcbsm/*.png` — case-study screenshots

## Design tokens

**Color**
| Role | Hex | Used for |
|---|---|---|
| Cream (ground) | `#F5EEDF` | page background |
| Ink (primary text) | `#26202B` | headings, body text |
| Rust (accent) | `#C1401E` | nav hover/active, links, CTA email |
| Gold | `#C98A26` | case-study accent border |
| Plum | `#6E3159` | the single full-bleed closing/contact band on `index.html` and each case-study page |
| Gold tint | `#F0C878` | headings on plum backgrounds |
| Sage (supporting text) | `#4A5A38` | captions, meta lines, footer |

**Type**
- Display: **Fraunces** (variable, opsz+wght+ital axes) — headlines, section titles, nav links
- Body/UI: **Space Grotesk** — paragraph text, labels, dates

Both loaded from Google Fonts in `<head>`.

## Layout notes
- Sticky top-right nav bar (`.topnav`) on all pages; content is wrapped in a max-width container so lines don't over-stretch on wide screens.
- `index.html`'s plum band is intentionally the only full-bleed color block on the page — the deliberate loudest/closing moment.
- Each case-study page alternates full-bleed color bands per sub-project, with a mix of split text/spotlight-card and chapter-style layouts so consecutive sections don't repeat the same rhythm.

## Portfolio password gate
`portfolio.html`, `case-study-meta.html`, and `case-study-bcbsm.html` hide their content behind a password prompt implemented in a small inline `<script>` — it's a soft deterrent, not real security (the password is visible to anyone who views page source). The password is set in a `PASSWORD` constant near the bottom of each of those three files; keep all three in sync if it changes. Once entered correctly, `sessionStorage` skips the prompt for the rest of that browser tab session.

## Known placeholders
"Where the writing started" (early career / journalism) is still just a mention on `index.html`/`portfolio.html`, not a case study. Meta and BCBSM case studies are both done.
