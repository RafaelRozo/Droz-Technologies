# Droz Technologies — droz.tech

Production website for **Droz Technologies Inc.**, an industrial intelligence company.
This repository contains the full static site, deployed to Vercel.

## Stack

Pure static **HTML / CSS / JavaScript** — no build step, no framework, no runtime.
Files are served as-is from the repository root.

- `index.html` — root redirect to the default locale (`/en/`)
- `en/`, `fr/`, `es/`, `zh/`, `hi/` — the five localized site trees
- `assets/` — images, logos, certifications, client logos, OG images
- `fonts/` — self-hosted typefaces
- `colors_and_type.css` — design tokens (colors, typography)
- `site.css` — component and layout styles
- `site.js` — navigation, mega-menu, mobile drawer, scroll-spy, locale fallback
- `analytics.js` — Google Analytics 4 + Meta Pixel
- `404.html` — custom not-found page
- `sitemap.xml`, `robots.txt` — SEO
- `vercel.json` — redirects, `cleanUrls`, `trailingSlash`
- `_redirects` — Netlify-compatible redirect rules (backup)

All internal asset references are **root-relative** (e.g. `/assets/...`, `/site.css`),
so the web server's document root must be this repository's root.

## Local preview

No tooling required — serve the folder with any static server:

```bash
python3 -m http.server 8080
# open http://localhost:8080/  (redirects to /en/)
```

## Deployment (Vercel)

The repo deploys to Vercel from the `main` branch.

- **Framework Preset:** `Other` (static — no build command)
- **Build Command:** none
- **Output Directory:** empty (serves repository root)
- **Root Directory:** `./`

Redirects, clean URLs, and trailing-slash behavior are configured in `vercel.json`.
