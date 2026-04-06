# Droz Technologies v2 — Website Redesign

## Design Direction
- Monochrome / dark theme
- Framer-style scroll-triggered video backgrounds
- 5 divisions, each with a full-viewport hero section
- Videos transition seamlessly (last frame of N = first frame of N+1)

## Divisions
1. Predictive Maintenance → Video: Generator/turbine
2. Software Development → Video: Generator morphs to Google Willow chip
3. Intelligent Construction → Video: TBD
4. Industrial Manufacturing → Video: TBD
5. AI Consulting → Video: TBD

## Tech Stack
- Next.js 14 + TypeScript
- Tailwind CSS
- GSAP ScrollTrigger (scroll-driven video playback)
- Fonts: Instrument Serif (headlines) + Outfit (body)

## Video Assets
Place videos in `public/videos/`:
- `division-1-pm.mp4`
- `division-2-software.mp4`
- `division-3-construction.mp4`
- `division-4-manufacturing.mp4`
- `division-5-ai.mp4` (optional — may combine with division 4)

## Run Locally
```bash
npm run dev
# → http://localhost:3000
```
