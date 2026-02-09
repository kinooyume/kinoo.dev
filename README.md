# kinoo.dev

![kinoo.dev](public/og.jpg)

Personal portfolio & freelance website.

[![Astro](https://img.shields.io/badge/Astro-4.16-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.8-2C4F7C?logo=solid&logoColor=white)](https://www.solidjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

[Live Website](https://kinoo.dev) · [Design System](https://kinoo.dev/design-system)

---

## About

My portfolio site, built with Astro + SolidJS. Static generation, animations with Anime.js, and a design system for component documentation.

---

## Features

- Static site with Astro islands
- Animations (Anime.js)
- Design system with live component docs
- Responsive
- Form validation with Modular Forms
- SEO + sitemap

---

## Tech Stack

**Core**: Astro, TypeScript, SolidJS

**UI**: Anime.js, Blaze Slider, Solid Toast

**Dev**: Bun, ESLint, Prettier, Lefthook, Cocogitto

Optional: Nix flake for reproducible dev environment

---

## Design System

Contextual atomic design - components grouped by feature, shared ones in `shared/`.

```
src/components/
├── shared/
│   ├── atoms/          # Tag, Button, IconButton...
│   ├── molecules/      # Card/, Spotlight
│   └── organisms/
├── hero/
├── header/
├── realisations/
├── experiences/
├── formations/
├── contact/
└── sidebar/
```

**Principles**:
- Feature-first grouping
- Only move to `shared/` when used by 2+ features
- Related components nest together (Card/)

[View Design System →](https://kinoo.dev/design-system)

---

## Getting Started

```bash
git clone https://github.com/yourusername/kinoo.dev.git
cd kinoo.dev
```

### With Nix (recommended)

```bash
nix develop
```

Gives you bun, cog, git. Auto-runs `bun install`.

For auto-activate, use direnv:
```bash
direnv allow
```

### Without Nix

Install Bun and Cocogitto manually, then:

```bash
bun install
bunx lefthook install
```

### Dev server

```bash
bun run dev
```

Runs at http://localhost:4321

---

## Build

```bash
bun run build    # outputs to dist/
bun run preview  # preview locally
```

---

## Linting

```bash
bun run lint
bun run lint:fix
bunx astro check
```

---

## CI/CD

```
feature/* → develop → main
              │         │
           CI tests   Release + Deploy
```

PRs to `develop` run lint + build. PRs to `main` create a GitHub release and deploy to Netlify.

Commits must follow [Conventional Commits](https://www.conventionalcommits.org):
```
feat(ui): add dark mode
fix: nav overflow
```

Lefthook runs ESLint on pre-commit and validates commit messages.

**Secrets needed**: `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`

---

## Project Structure

```
src/
├── components/        # Contextual atomic design
├── layouts/
├── lib/               # Utils, animations, dom helpers
├── pages/
├── styles/            # CSS + design tokens
└── svgs/
```

---

## Commands

| Command | Action |
|---------|--------|
| `bun run dev` | Dev server |
| `bun run build` | Production build |
| `bun run preview` | Preview build |
| `bun run lint` | ESLint |
| `bun run lint:fix` | Fix lint issues |

---

## License

MIT
