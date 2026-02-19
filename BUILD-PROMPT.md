# Droz Technologies Website — Image Integration & Polish Build

## Context
You are working on the Droz Technologies website at `~/Droz-Technologies/`. This is a Swiss Typography + Editorial design aesthetic website for a Toronto-based technology company with 3 divisions: Digital Marketing, Predictive Maintenance, and Custom Software/AI.

## Design System
- **Fonts**: Instrument Serif (headings), Outfit (body)
- **Colors**: bg #faf9f6, accent #c23d2a, text #1a1a1a, muted #6b6b6b, border #e0ddd6
- **Style**: Light background, editorial magazine aesthetic, NO dark mode, NO Tailwind, NO AI clichés
- **Reference**: Real enterprise sites — Rockwell, ABB, Honeywell, Augury, Linear

## Your Mission

### Phase 1: Image Placeholders & Structure
Read `IMAGE-PROMPTS.md` for the complete image prompt guide (35+ images across all pages).

For each page, add properly structured `<img>` tags with:
- Semantic `alt` text describing what the image should show
- `loading="lazy"` for all non-hero images
- Proper aspect ratio containers (prevent CLS)
- CSS `object-fit: cover` for hero images
- WebP format with JPG fallback using `<picture>` elements
- Placeholder styling: warm cream (#f3f1ec) background with subtle border (#e0ddd6)

The image `src` should point to `./assets/images/{page-name}/{image-name}.webp` structure.

### Phase 2: Create Image Asset Directory Structure
Create the directory structure:
```
assets/images/
  homepage/
  digital-marketing/
  predictive-maintenance/
  custom-software/
  ai-systems/
  droz-connect/
  case-studies/
  about/
  booking/
  services/
    vibrational/
    laser/
    ultrasound/
    dynamic/
    generator/
  marketing/
    smb/
    midmarket/
    solutions/
    agency/
    consulting/
```

### Phase 3: CSS Image Styles
Add these styles to each page's CSS:

```css
/* Image containers */
.img-hero {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    border-radius: 2px;
}

.img-section {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    border-radius: 2px;
}

.img-card {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 2px;
}

.img-placeholder {
    background: var(--bg-warm, #f3f1ec);
    border: 1px dashed var(--border, #e0ddd6);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-light, #999);
    font-size: 14px;
    font-family: 'Outfit', sans-serif;
}
```

### Phase 4: Page-by-Page Integration
Go through EVERY HTML page and:
1. Add hero image where appropriate
2. Add section images that break up text walls
3. Add card images for service/industry cards
4. Ensure responsive behavior (images scale on mobile)
5. Add proper `srcset` for retina displays where appropriate

### Phase 5: Quality Audit
- Run through each page ensuring consistent image treatment
- Verify no broken image references
- Check mobile responsiveness of image containers
- Ensure placeholder styling looks good even without actual images
- Verify lazy loading is applied correctly
- Check that aspect ratios prevent layout shift

### Phase 6: Git Commit
Stage and commit all changes with message: "feat: add image placeholders and structure for all pages"

## Agent Team Assignments
Use these subagents for the work:

1. **frontend-developer** — HTML structure, picture elements, responsive images
2. **ui-designer** — Image placement decisions, visual hierarchy
3. **performance-engineer** — Lazy loading, CLS prevention, WebP optimization
4. **qa-expert** — Cross-page consistency audit
5. **documentation-engineer** — Update README with image workflow

## Files to Modify
All `.html` files in `~/Droz-Technologies/`:
- index.html (homepage)
- Digital Marketing.html
- predictive.html
- custom.html, webandmobile.html
- ai-systems.html, aipowered.html
- droz-connect.html
- case.html
- whyus.html
- booking.html
- vibrational.html, laser.html, ultrasound.html, dynamic.html
- pme.html, generator.html
- smb.html, midmarket.html, solutions.html
- agency.html, consulting.html
- digital-revenue.html, physical-revenue.html, intelligent-revenue.html

## Important
- DO NOT change the existing design system (fonts, colors, layout)
- DO NOT add any JavaScript frameworks or build tools
- KEEP plain HTML + CSS — this is a static site
- Images are PLACEHOLDERS — Ricardo will generate the actual images with AI
- The placeholders should look intentional and professional, not broken
