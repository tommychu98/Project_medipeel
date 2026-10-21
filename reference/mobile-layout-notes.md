# Mobile layout comparison

Reference: https://tapkorea.kr/ — inspected live on 2026-10-22 at 390 × 844 using a touch-enabled browser viewport.

Observed: a 70px header, viewport-height opening film, compact product copy above a broad image, centered CTA, and asymmetric technology cards approximately 60–65% wide with vertical labels. The reference switches its product content to a column below 900px and has further phone-specific rules around 768px.

Applied in `src/styles/mobile.css` using the existing MEDIPEEL content and assets:

- 70px phone header, full-height hero, compact full-screen menu.
- Fluid 16–28px gutters, smaller body copy, centered product CTA and slider controls.
- Staggered technology cards and vertical labels on phones and tablets.
- Phone-specific care, curation, natural art, review, contact and footer spacing.
- Existing 2.35:1 brand film and reversible motion retained.
- Product/review section clipping prevents entrance translations from expanding document width.

Verified in Edge at widths 320, 390, 430, 768, 1024 and 1440: document width matches viewport width. Checked mobile menu, product next, care tab selection, brand entrance and video playback at 390px. Screenshots are local verification artifacts in ignored `reference/browser/`.
