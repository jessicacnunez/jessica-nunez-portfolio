# Jessica Nunez — Content Design Portfolio

A 3-page site. Plain HTML/CSS/vanilla JS, no build step, no framework — open any `.html` file in a browser or a live-server extension.

## Pages
- `index.html` — home: hero, selected-work teaser, "how I work", wall art, contact
- `portfolio.html` — case-study index, gated behind a client-side password prompt (see Portfolio password gate below); links out to individual case studies
- `case-study-meta.html` — full case study for the Meta role, covering 4 projects (value taxonomy, attribution products, performance goals/KPI expression, Meta Account content). Re-checks the same password gate on its own so a direct link can't skip it
- `case-study-bcbsm.html` — full case study for the Blue Cross Blue Shield of Michigan role, covering 3 projects (careers page redesign, GM health plan microsite, content automation for 60+ plan pages). Same independent password gate
- `resume.html` — web reconstruction of the resume PDF, styled to match the site

All pages share the same top-right nav (Home / Portfolio / LinkedIn / Resume), duplicated inline in each file — there's no shared header/CSS file, so a nav or style change has to be made everywhere it appears.

## Files
- `assets/jessica.jpg` — portrait
- `assets/floral-print.jpg` — hand-painted floral print (wall art)
- `assets/embroidery-poppy.jpg` — embroidered poppy detail (wall art)
- `assets/jessica-nunez-resume.pdf` — downloadable resume, linked from `resume.html`

## Design tokens

**Color**
| Role | Hex | Used for |
|---|---|---|
| Cream (ground) | `#F5EEDF` | page background |
| Ink (primary text) | `#26202B` | headings, body text |
| Rust (accent) | `#C1401E` | flower mark, nav hover, CTA link |
| Gold | `#C98A26` | work-index numerals |
| Plum | `#6E3159` | "How I work" band background |
| Gold tint | `#F0C878` | headings on the plum band |
| Sage (supporting text) | `#4A5A38` | captions, meta lines, footer |

**Type**
- Display: **Fraunces** (variable, opsz+wght+ital axes) — headlines, section titles, nav links
- Body/UI: **Space Grotesk** — paragraph text, labels, dates

Both loaded from Google Fonts in `<head>`.

## Layout notes
- Sticky top-right nav bar (`.topnav`) on all pages; content is wrapped in `.page{max-width:1400px}` so lines don't over-stretch on wide screens.
- The homepage headline is composed from four stacked `<div>`s (not one flex row) — the italic lines use negative `margin-top` to tuck under the roman lines above them; this only works as literal stacked blocks, not a flex/grid pattern.
- The "What's on my walls" section uses a deliberate full-bleed break: the floral image's right margin is negative (`margin-right: -72px`, i.e. equal and opposite to the section's own padding) so it touches the true right edge of the viewport instead of stopping at the content column. The poppy image is `position: absolute`, layered on top with a box-shadow. On mobile (`≤860px`) this collapses back to a static stacked layout — see `.wall-bleed` / `.wall-detail` overrides in the media query.
- The portrait in the hero has a negative `margin-top` so it overlaps slightly into the headline block rather than sitting in its own row — intentional, not a bug.

## Portfolio password gate
`portfolio.html` hides its content behind a password prompt implemented in a small inline `<script>` — it's a soft deterrent, not real security (the password is visible to anyone who views page source). The password is set in a `PASSWORD` constant near the bottom of `portfolio.html`; change it there directly. Once entered correctly, `sessionStorage` skips the prompt for the rest of that browser tab session.

## Known placeholders
"Where the writing started" (early career / journalism) is still just a mention on `index.html`/`portfolio.html`, not a case study. Meta and BCBSM case studies are both done.
