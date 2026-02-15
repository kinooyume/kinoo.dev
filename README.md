# kinoo.dev

![kinoo.dev](public/og.jpg)

Personal portfolio & freelance website.

[![Astro](https://img.shields.io/badge/Astro-5.17-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.9-2C4F7C?logo=solid&logoColor=white)](https://www.solidjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Anime.js](https://img.shields.io/badge/Anime.js-4.3-FF4B4B?logo=data:image/svg+xml;base64,&logoColor=white)](https://animejs.com)

[Live Website](https://kinoo.dev) · [Design System](https://kinoo.dev/design-system)


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


## Commands

| Command | Action |
|---------|--------|
| `bun run dev` | Dev server at localhost:4321 |
| `bun run build` | Production build to `dist/` |
| `bun run preview` | Preview build |
| `bun run lint` | ESLint |
| `bun run lint:fix` | Fix lint issues |
| `bunx astro check` | Type check |


## About

My portfolio site, built with Astro + SolidJS. Static generation, animations with Anime.js, and a design system for component documentation.


## Features

- Static site with Astro islands
- Animations (Anime.js)
- Design system with live component docs
- Responsive
- Form validation with Modular Forms
- SEO + sitemap


## Event Bus

The site relies on animations while keeping components isolated. To decouple what triggers an animation from what actually animates, there's a one-shot event bus (`src/lib/eventBus.ts`).

Components import `on` and `emit` from a shared instance (`src/lib/emitter.ts`). Events use namespaced names like `reveal:section:experiences`. Each event fires once; late listeners are called immediately, so render order doesn't matter.


## Tech Stack

**Core**: Astro, TypeScript, SolidJS

**UI**: Anime.js, Blaze Slider, Solid Toast

**Dev**: Bun, ESLint, Prettier, Lefthook, Cocogitto

Optional: Nix flake for reproducible dev environment


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


## License

MIT
