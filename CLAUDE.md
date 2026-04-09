# Droz Technologies V2

## 1. Tech Stack & Architecture
- **Framework**: Next.js 14 App Router, React 18, TypeScript
- **Styling**: Tailwind CSS v4, inline styles for components
- **Animation**: framer-motion 12, GSAP 3.14, React Three Fiber 8
- **Fonts**: Instrument Serif (italic headings), Outfit (sans body, weights 300-700)
- **Palette**: Monochrome #0a0a0a base, white at various opacities
- **i18n**: EN/FR/ES via `lib/i18n.ts` + `lib/LocaleContext.tsx`
- **Pages**: 11 routes (homepage + 5 divisions + about/solutions/contact/careers/privacy)
- **Dev server**: port 3737

## 2. Project Conventions & Style Guide

### Design Rules — NEVER VIOLATE
- **No AI feel**: Never use leverage, streamline, empower, robust, seamless, cutting-edge, holistic, synergy. Use specific numbers ($2.1M, 340 hours, 90 days) and editorial voice.
- **Asymmetric layouts**: Never equal-width columns everywhere. Break symmetry deliberately.
- **PAS narrative**: Problem → Agitation → Solution on every page. Features come LAST.
- **Division independence**: Each of the 5 divisions is a STANDALONE business. PM is not Software. Software is not Construction. Never bleed one division's language into another's page. 90% standalone excellence, 10% subtle "and we have sister divisions" connector.
- **"Only We" positioning**: The cross-division capability is a BONUS differentiator, not the primary pitch. Lead with each division's own expertise. The "all five work together" angle is mentioned once per page, subtly, near the end.
- **Primary CTA**: "Talk to an Engineer" — never "Contact Sales" or "Get Started"
- **Images over empty space**: Always use `/public/images/divisions/` photos and `/public/images/logos/`
- **3D as backgrounds**: Full-section backgrounds (position absolute), never standalone blocks.
- **No NoiseOverlay**: The canvas grain effect was removed permanently.
- **ScrollVelocityText**: baseVelocity NEVER exceeds |0.3|. Default is -0.2.

### Division Accent Colors
| Division | Full | Background (0.03) | Border (0.12) |
|----------|------|-------------------|---------------|
| PM | #3B82A0 | rgba(59,130,160,0.03) | rgba(59,130,160,0.12) |
| Software | #6366A0 | rgba(99,102,160,0.03) | rgba(99,102,160,0.12) |
| Construction | #A08B3B | rgba(160,139,59,0.03) | rgba(160,139,59,0.12) |
| Manufacturing | #7C8B3B | rgba(124,139,59,0.03) | rgba(124,139,59,0.12) |
| AI | #A03B6E | rgba(160,59,110,0.03) | rgba(160,59,110,0.12) |

## 3. Component Architecture
```
components/
  animations/     — 20 reusable animation components (barrel export in index.ts)
  3d/             — R3F scenes (always dynamic import, ssr: false)
  shared/         — Footer, PageHero, ColorBar
  CursorSpotlight, Navbar, HeroScroller, PageContent, HeroTextPanel, Providers
```

## 4. Testing & Error Patterns
- `<lineSegments>` not `<line>` in R3F (SVG type conflict)
- CounterSpring: use prefix/suffix props, keep target number small (2.1 not 2100000)
- Client logos: use LogoMarquee component, not ScrollVelocityText with text
- Build must pass (`npx next build`) before declaring any work done
- `prefers-reduced-motion` supported in globals.css

## 5. Git Workflow
- Branch: master (working), main (production)
- Commit with descriptive messages, no --no-verify
- Never force push to main

## 6. Worktrees
- When creating a git worktree, add its directory to `.gitignore`
- Copy any `.env` files from the main repo into the worktree

## 7. Slash Commands
- `/review` — Run design quality review on current page
- `/build-check` — Verify build passes and bundle sizes

## 8. MCP Servers
- **magic** (21st.dev) — Use `mcp__magic__21st_magic_component_inspiration` for premium UI component patterns. Always adapt to our inline-style + monochrome palette, don't use Tailwind class-based patterns directly.

## 9. Workflow Best Practices
- Start complex tasks in plan mode, invest in the plan
- Use parallel agents (3-5) for independent work
- After every correction, update THIS file so mistakes aren't repeated
- Use subagents to keep main context clean
- Use `mcp__magic__21st_magic_component_inspiration` before building new section types
