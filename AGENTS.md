# AGENTS.md — giulia

Project rules for AI coding agents. Source of truth for intent, stack, and design.

## Project Intent

`giulia` is a personal tribute site for the author's wife, Giulia. A single-page React app built on the **Nova — Next Gen Intelligence** design (Neuform template by Sourasith Phomhome). The site presents her photo archive as a feature-led dashboard: nav row, CTA hero, capability panels, nested surfaces, metric emphasis. Romantic content (photo carousel, live "days together" counter, two-year countdown) is embedded into the panels — the aesthetic is next-gen/editorial, not a generic SaaS landing.

### Anniversary Constants

- **Met:** `2024-10-28` (28 October 2024) — day zero for the "days together" telemetry.
- **Two-year mark:** `2026-10-28` (28 October 2026) — countdown target ("mission clock"). On/after this date the countdown flips to a "2 years together" milestone state.
- Both dates are ISO strings in `America/Sao_Paulo` wall-clock semantics. No timezone database; treat as local calendar dates.

## Stack

- **React 19** (`react`, `react-dom` ^19.2.8)
- **Vite 8** (^8.2.2) with `@vitejs/plugin-react` ^6.1.0 (Oxc-based)
- **TypeScript ~6.0.2** — strict configs in `tsconfig.app.json` / `tsconfig.node.json`
- **React Compiler** enabled via `babel-plugin-react-compiler` ^1.0.0 (through `@rolldown/plugin-babel`). Do NOT add `useMemo`/`useCallback`/`React.memo` purely to compensate for missing memoization — the compiler handles it. Only add them when expressing genuine semantic intent.
- **ESLint 10** with `typescript-eslint` ^8.67.0, `eslint-plugin-react-hooks` ^7.1.1, `eslint-plugin-react-refresh` ^0.5.4. Config in `eslint.config.js`.

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Lint | `npm run lint` |
| Typecheck + build | `npm run build` (runs `tsc -b && vite build`) |
| Preview build | `npm run preview` |

No test runner is configured. Verify changes with `npm run lint` and `npm run build` before declaring done.

## Design Tokens

Anchor every visual decision in these tokens. Keep background, surface, text, and border roles distinct so layouts retain the source contrast pattern.

### Colors

| Token | Value | Role |
|-------|-------|------|
| `--primary` | `#34D399` | Emerald — primary actions / CTA |
| `--secondary` | `#60A5FA` | Blue — surfaces, borders, secondary text |
| `--accent` | `#60A5FA` | Blue — accents, highlights, links |
| `--background` | `#030303` | Page background (near-black) |
| `--surface` | `#18181B` | Card / panel surface (zinc) |
| `--text-primary` | `#FFFFFF` | Primary text on dark |
| `--text-secondary` | `#A1A1AA` | Muted text on dark |
| `--border` | `#27272A` | Hairline borders |

This is a dark-mode-only design. Do not add a light theme or `prefers-color-scheme` overrides.

### Typography

| Token | Family | Use |
|-------|--------|-----|
| `--font-display` | `Geist` | Display moments, headings, the hero heading |
| `--font-body` | `Geist` | Body copy, captions, prose |
| `--font-mono` | `JetBrains Mono` | Labels, metadata, metric numbers, live timers (`label-md` 12px/600, letter-spacing 0.15em) |

Loaded via Google Fonts in `index.html`. Weights: Geist 400–600, JetBrains Mono 400–600.

### Spacing & Radius

| Token | Value |
|-------|-------|
| `--space-base` | `8px` |
| `--gap` | `16px` |
| `--card-padding` | `24px` |
| `--section-padding` | `80px` |
| `--radius-card` | `8px` |
| `--radius-control` | `8px` |
| `--radius-pill` | `9999px` |

## Motion

Preserve the source motion cues. Keep easing smooth and restrained.

- Masked reveals on scroll-into-view (`clip-path: inset()` + `IntersectionObserver`)
- Staggered entrance for panels (transition-delay by index)
- Hover lift on panels (translateY + shadow)
- Scroll-triggered transitions
- Ambient movement — subtle, performant, secondary to content

Prefer CSS animations/transitions and `IntersectionObserver` over animation libraries. The carousel auto-advance uses `setInterval` cleared on unmount and paused on hover/focus.

## Photo Convention

Photos live in `public/photos/`. A manifest at `src/photos.ts` is the single source of truth for what the carousel renders:

```ts
export interface Photo {
  src: string          // path under public/, e.g. '/photos/1.jpg'
  alt: string          // descriptive alt text
  caption?: string     // optional romantic caption shown under the slide
}

export const photos: Photo[] = [
  { src: '/photos/1.svg', alt: 'Giulia — placeholder', caption: 'Replace with your photo' },
  // ...
]
```

To add a real photo: drop the file in `public/photos/`, append an entry to `src/photos.ts`. No build step, no import wiring. Filenames are free-form — the manifest maps them.

Placeholder SVGs ship in `public/photos/` so the site works before real photos are uploaded. Replace them and update the manifest.

## Architecture

Single-page app. `src/App.tsx` composes the feature page: an ambient background layer, a nav row, a CTA hero, a grid of capability panels, and a footer.

1. **`Ambient`** — supporting background layer behind the content: drifting radial glows + faint grid (CSS), `pointer-events: none`, `aria-hidden`. Rebuilds the source's WebGL/particle atmosphere without a WebGL dependency.
2. **`NavRow`** — top navigation strip: brand (`Nova Solutions`), section links (Company, Capabilities, Help), and a `Get Started` CTA pill.
3. **`Hero`** — first viewport signal. Mono label (`Next-gen systems. Engineered for tomorrow`), Geist display heading (`Wisdom That Drives Us Onward.`), body copy, primary CTA button. Preserve the focal heading and visual density.
4. **`Carousel`** — photo archive panel: auto-advancing (5s), prev/next, dots, keyboard arrows, masked-reveal slide entrance, pauses on hover/focus. Reads from `src/photos.ts`.
5. **`DaysTogether`** — telemetry panel: large mono `days` count since `2024-10-28`, hours/minutes/seconds sub-metrics, month sparkline. Updates every second.
6. **`AnniversaryCountdown`** — mission-clock panel: countdown to `2026-10-28` with progress bar toward the mark. After the target, flips to a "2 years together" milestone state instead of going negative.
7. **`Manifest`** — Geist romantic note panel, dashboard-note style.

Components are functional, typed, composable. Follow the patterns in `.agents/skills/frontend-patterns/SKILL.md`. No state management library — local `useState`/`useEffect` only.

## Guardrails

- **Do not flatten** the design into a generic card grid. Preserve the next-gen feature hierarchy, density, and nested surfaces.
- **Do not swap the color mode.** Dark background is the design.
- **Preserve the first viewport signal** — the nav row + `Wisdom That Drives Us Onward.` heading establish the tone before any other content.
- **Keep buttons, cards, and badges aligned** to the same radius and border language (`--radius-card` for surfaces, `--radius-control` for buttons, `--radius-pill` for pills/badges).
- **Ambient effects stay supporting layers.** The source design tags WebGL/Three.js; rebuild the atmosphere with performant CSS/canvas layers behind the content — no Three.js dependency. Effects are secondary to the interface.
- **Accessibility:** carousel must be keyboard-operable (arrow keys, focus management), images must have meaningful `alt`, timers must be `aria-live="polite"` so screen readers announce updates without spamming.

## Git & Versioning

- **Never commit directly to `develop`.** Work on a branch (`feature/...`, `fix/...`, `agent/...`) and integrate via Pull Request.
- **Commit messages in English**, Conventional Commits format (`feat: ...`, `fix: ...`, `docs: ...`).
- **Bump the `VERSION` file** on every feature or change.
- **API error messages in English** (not applicable yet — no backend — but keep the rule if one is added).