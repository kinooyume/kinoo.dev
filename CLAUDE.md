# CLAUDE.md — kinoo.dev

## Tooling
- Runtime: **Bun** — use `bun run`, `bunx` (never npm/npx)
- Build: `bun run build`
- Dev: `bun run dev`
- Lint: `bun run lint` / `bunx eslint`
- Type check: `bunx astro check --minimumSeverity error`
- Pre-commit hooks via **lefthook** — never skip with `--no-verify`

## Tech Stack
- **Astro** with **SolidJS** islands (`client:load`)
- **TypeScript** everywhere
- **anime.js** for animations
- **CSS Modules** for SolidJS components (`.module.css`)
- **Astro scoped styles** for `.astro` files — use `:global()` sparingly
- Forms: `@modular-forms/solid` + web3forms

## Git Workflow
- Work on **develop** or feature branches — never commit directly to main
- Confirm current branch before any git operation
- Conventional commits: `type(scope): message`
- Do NOT add `Co-Authored-By` to commit messages
- When squashing/rebasing, confirm target branch first

## Project Structure
```
src/
  pages/
    index.astro            — Portfolio page
    design-system.astro    — DS page (noindex)
  layouts/
    Layout.astro           — Base layout (head, header slots, drawer)
  components/
    contact/               — Contact form, floating CTA
      Contact.astro          — Contact section
      Contact.ds.astro       — DS doc
      ContactForm.tsx        — SolidJS form (client:load)
      ContactForm.module.css — CSS Modules for SolidJS
      FloatingContact.astro  — Floating CTA button
    design-system/         — DS primitives + page assembly
      sections/              — Section assemblers (one per domain group)
        index.ts             — Sidebar config (sidebarSections)
      DSBlock.astro          — Doc section wrapper (title + slot)
      DSPreview.astro        — Live preview container
      DSCode.astro           — Code snippet (inline or block)
      DSPropsTable.astro     — Props/data table (headers + rows)
      DSNote.astro           — Contextual note
      DSStructure.astro      — Hierarchy visualization (indent levels)
      DSSectionHeader.astro  — Component header (title, atomic level, framework)
      DSCategoryHeader.astro — Domain group header (title, description)
      DSLayout.astro         — DS page layout (sidebar + content)
      DSSidebar.astro        — Collapsible nav tree with scroll detection
    footer/
    header/                — Header, NavBar, HeaderLink, HeaderMenu, MobileMenu
    hero/                  — Hero, HeroInfo, HeroSubtitle
    sections/              — Page sections (Experiences, Formations, Realisations)
    shared/
      atoms/               — Tag, TagRow, IconButton, BurgerIcon, LogoBox, H3Tagged, RevealText
      molecules/           — Card/, Slider/, Spotlight
      organisms/           — Section, MobileDrawer
    sidebar/               — DS sidebar navigation
  styles/
    variables.css          — Design tokens (colors, spacing)
    global.css             — Global styles, buttons
    animations.css         — Animation utilities
    colors.ds.astro        — DS doc for color tokens
    typography.ds.astro    — DS doc for typography
    spacing.ds.astro       — DS doc for spacing
  lib/
    eventBus.ts            — One-shot event bus factory
    emitter.ts             — Shared app-level event bus instance
    animations/            — anime.js animation helpers
  svgs/                    — Raw SVG imports (?raw)
```

## Event Bus
The site relies on animations while keeping components isolated. To decouple what triggers an animation from what actually animates, there's a one-shot event bus (`src/lib/eventBus.ts`). Components import `on` and `emit` from a shared instance (`src/lib/emitter.ts`). Events use namespaced names like `reveal:section:experiences`. Each event fires once; late listeners are called immediately, so render order doesn't matter.

## Layout Slot Pattern
Layout.astro passes slots to Header:
- `slot="header-nav"` → left side (NavBar)
- `slot="header-menu"` → right side (wrapped in `.header-right`)
- `slot="head"` → extra `<head>` tags
- `slot="mobile-sidebar"` → drawer content override

## Design System

### Principles
- **Domain-grouped atomic design**: components organized by feature domain (Header, Card, Hero…), atomic level is metadata
- Atomic levels: Foundation → Atom → Molecule → Organism
- **Preview-first**: show the live component, minimal surrounding text
- **Co-located docs**: `Component.ds.astro` lives next to `Component.astro`

### DS Documentation Pattern (.ds.astro)
```astro
---
import Component from "./Component.astro";
import DSBlock from "@/components/design-system/DSBlock.astro";
import DSPreview from "@/components/design-system/DSPreview.astro";
import DSSectionHeader from "@/components/design-system/DSSectionHeader.astro";
---

<section id="component-id">
  <DSSectionHeader title="Component" atomic="Atom" framework="astro" />
  <p>One-line description.</p>

  <DSBlock title="Preview">
    <DSPreview>
      <Component prop="value" />
    </DSPreview>
    <DSCode inline>&lt;Component prop="value" /&gt;</DSCode>
  </DSBlock>
</section>
```

Key rules:
- Every doc wraps in `<section id="anchor-id">` — ID must match sidebar href
- Only import DS primitives you actually use (linter enforces no unused imports)
- SolidJS components in DS use `client:load` — disable side effects (e.g. capture-phase submit listener)

### DS Page Assembly
```
design-system.astro
  └─ DSLayout
      ├─ FoundationsSection    — Colors, Typography, Spacing
      ├─ AtomsSection          — Button, IconButton, Tag, TagRow, Link
      ├─ CardSection           — Card family + Spotlight, LogoBox, H3Tagged
      ├─ SliderSection
      ├─ SectionSection
      ├─ HeaderSection
      ├─ NavigationSection     — BurgerIcon, Sidebar
      ├─ HeroSection
      ├─ ContactSection
      ├─ FooterSection
      └─ DSComponentsSection   — DS primitives self-documentation
```

Each section assembler imports `DSCategoryHeader` + the `.ds.astro` files for its domain.

### Sidebar Config
Defined in `design-system/sections/index.ts` as `sidebarSections`:
- Type: `SidebarSection[]` with nested `SidebarGroup` / `SidebarLeaf`
- Each leaf: `{ label, href, framework? }` — framework shows astro/solid icon
- Groups: `{ label, children }` — renders as collapsible details/summary
- When adding a component to DS: add its `.ds.astro`, import in the section assembler, add sidebar entry in `index.ts`

## Colors & Design Tokens
- **Always use DS variables** from `src/styles/variables.css` — never hardcode colors
- Color scales: each color has `--{color}`, `--{color}-light`, `--{color}-lightest`, `--{color}-dark`, `--{color}-darker`, `--{color}-darkest`, `--{color}-bg` (5% opacity), `--{color}-tint` (10% opacity)
- Available scales: orange, red, green, pink, purple
- Accent tokens: `--accent-color`, `--secondary-accent-color`, `--accent-bright`, `--accent-tint` — overridden per section
- Surfaces: `--card-surface`, `--card-surface-raised`, `--card-surface-hover`
- Borders: `--border-color`, `--border-hover-color`
- If a needed color doesn't exist as a variable, add it to `variables.css` and `colors.ds.astro` rather than hardcoding

## Rules
- Never produce AI-looking output — no filler comments, no over-explained code, no unnecessary docstrings, no `---` horizontal rules. Write code that looks human-written
- Do ONLY what is asked — no extra features, loading states, error handling, or refactoring beyond scope
- Read existing code before modifying — understand patterns first
- Prefer editing existing files over creating new ones
- Keep changes minimal — three similar lines > premature abstraction
- Do not add comments, docstrings, or type annotations to unchanged code
- When asked to replicate a setup, match it exactly — do not add extras
- For CSS/animation bugs: inspect the actual cause before proposing a fix — do not guess
- **Composable approach**: prefer small, reusable components over monolithic ones. Extract shared patterns into atoms/molecules. Reuse existing components instead of duplicating markup
- **Keep DS in sync**: when creating, modifying, or removing a component, update its `.ds.astro` doc, the section assembler, and the sidebar config in `index.ts` accordingly
