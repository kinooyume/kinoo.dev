<div align="center">

# 🚀 kinoo.dev

![kinoo.dev](public/og.jpg)

**Personal portfolio & freelance website for Martin Kinoo**  
*Frontend Developer · Typescript · React · Svelte*

[![Astro](https://img.shields.io/badge/Astro-4.16-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.8-2C4F7C?style=for-the-badge&logo=solid&logoColor=white)](https://www.solidjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Bun](https://img.shields.io/badge/Bun-1.x-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh)

[🌐 Live Website](https://kinoo.dev) · [🎨 Design System](https://kinoo.dev/design-system) · [📧 Contact](https://kinoo.dev#contact)

</div>

---

## 📖 About

This is my personal portfolio and freelance website, showcasing my work as a **Frontend Developer**. Built with modern web technologies and optimized for performance, accessibility, and user experience.

---

## ✨ Features

- ⚡ **Lightning-fast** static site generation with Astro
- 🎭 **Smooth animations** using Anime.js
- 🎨 **Design System** with documented components
- 📱 **Fully responsive** design
- ♿ **Accessible** with proper ARIA labels and keyboard navigation
- 🔍 **SEO optimized** with sitemap generation
- ⚙️ **Built with Bun** for fast package management
- 🌙 **Performance optimized** with code splitting and lazy loading

---

## 🛠️ Tech Stack

### Core Framework
- **[Astro](https://astro.build)** - Static site generator with islands architecture
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript

### UI & Styling
- **[SolidJS](https://www.solidjs.com)** - Reactive UI components
- **[Anime.js](https://animejs.com)** - Animation library

### Interactive Components
- **[Blaze Slider](https://github.com/blaze-slider/blaze-slider)** - Touch-enabled image sliders
- **[Modular Forms](https://modular-forms.dev/)** - Form validation with SolidJS
- **[Solid Toast](https://github.com/ardeora/solid-toast)** - Toast notifications

### Development Tools
- **[Nix Flakes](https://nixos.wiki/wiki/Flakes)** - Reproducible dev environment
- **[direnv](https://direnv.net/)** - Auto-activate dev shell on `cd`
- **[ESLint](https://eslint.org)** - Code linting with TypeScript & accessibility rules
- **[Prettier](https://prettier.io)** - Code formatting
- **[Cocogitto](https://docs.cocogitto.io/)** - Conventional commit validation
- **[Lefthook](https://github.com/evilmartians/lefthook)** - Git hooks manager

---

## 🎨 Design System

A modular design system built with atomic design principles. Components are organized into:

- **Foundations** - Colors, typography, spacing tokens
- **Atoms** - Tag, TagLink, Button, H3Tagged
- **Molecules** - Card, Spotlight, NavBar
- **Organisms** - Sidebar, Header, FloatingContact

Each component is documented with usage examples, props tables, and live previews.

**[View the Design System →](https://kinoo.dev/design-system)**

> *Work in progress - designed to be reusable across projects.*

---

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/kinoo.dev.git
cd kinoo.dev
```

<details>
<summary><strong>With Nix (recommended)</strong></summary>

The project includes a `flake.nix` that provides all system-level dependencies (Bun, Cocogitto, Git) in a reproducible shell.

#### Install Nix

If you don't have Nix installed, use the [Determinate Nix Installer](https://github.com/DeterminateSystems/nix-installer):

```bash
curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install
```

This enables flakes and the nix command by default.

> **Note:** If you installed Nix via the [official installer](https://nixos.org/download/) instead, you need to enable experimental features manually:
>
> ```bash
> mkdir -p ~/.config/nix
> echo "experimental-features = nix-command flakes" >> ~/.config/nix/nix.conf
> ```

#### Enter the dev shell

```bash
nix develop
```

This drops you into a shell with `bun`, `cog`, and `git` available, and automatically runs `bun install`.

#### Auto-activate with direnv (optional)

The project includes an `.envrc` so [direnv](https://direnv.net/) can activate the dev shell automatically when you `cd` into the project. Hook it into your shell:

- **fish**: `echo 'direnv hook fish | source' >> ~/.config/fish/config.fish`
- **bash**: `echo 'eval "$(direnv hook bash)"' >> ~/.bashrc`
- **zsh**: `echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc`

Then allow the `.envrc`:

```bash
direnv allow
```

</details>

<details>
<summary><strong>Without Nix</strong></summary>

Install the following manually:

- **[Bun](https://bun.sh)** (latest version)
- **[Cocogitto](https://docs.cocogitto.io/)** (`cargo install cocogitto` or via your package manager)
- **Git**

Then install dependencies and git hooks:

```bash
bun install
bunx lefthook install
```

</details>

### Development

```bash
# Start the dev server at http://localhost:4321
bun run dev
```

The development server will start with:
- Hot Module Replacement (HMR)
- Live reload on file changes
- TypeScript type checking

### Code Quality

```bash
# Run linter
bun run lint

# Fix lint issues automatically
bun run lint:fix

# Type checking
bunx astro check
```

### Build & Deploy

```bash
# Build for production
bun run build

# Preview production build locally
bun run preview
```

The build output will be in the `dist/` directory, ready to deploy to any static hosting service (Vercel, Netlify, Cloudflare Pages, etc.).

---

## 🔄 CI/CD Workflow

This project uses a two-branch workflow with automated releases and deployments.

```
feature/* ──► develop ──► main
                │           │
             CI tests    Release + Deploy
```

<details>
<summary><strong>Workflow details</strong></summary>

### Workflow Steps

1. **Feature Development**
   - Create feature branches from `develop`
   - Open PRs targeting `develop`

2. **PR to `develop`** (CI)
   - Validates commit messages against [Conventional Commits](https://www.conventionalcommits.org)
   - Runs ESLint
   - Builds the project
   - Must pass before merging

3. **PR to `main`** (Release & Deploy)
   - No tests (already validated on `develop`)
   - Creates a GitHub release with auto-generated changelog
   - Deploys to Netlify

### Git Hooks

Lefthook runs the following hooks locally:

| Hook | Action |
|------|--------|
| `pre-commit` | Runs ESLint on staged files |
| `commit-msg` | Validates commit message via cocogitto |

Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org) format:

```
type(scope): description
```

Examples: `feat(ui): add dark mode`, `fix: resolve nav overflow`, `chore(ci): add commitlint`

### Required Secrets

Configure these in GitHub repository settings (Settings → Secrets → Actions):

| Secret | Description |
|--------|-------------|
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token |
| `NETLIFY_SITE_ID` | Netlify site ID |

### Versioning

Update the version in `package.json` before merging to `main` to create a new release tag.

</details>

---

## 📂 Project Structure

```text
kinoo.dev/
├── public/               # Static assets (images, fonts, etc.)
├── src/
│   ├── components/       # Reusable Astro & SolidJS components
│   │   ├── Card.astro
│   │   ├── Hero.astro
│   │   ├── Slider.tsx    # SolidJS components
│   │   ├── *.ds.astro    # Design system documentation
│   │   └── ...
│   ├── layouts/          # Page layouts
│   │   └── Layout.astro
│   ├── lib/              # Utilities and animations
│   │   ├── animations/
│   │   └── dom/
│   ├── pages/            # File-based routing
│   │   ├── index.astro
│   │   └── design-system.astro
│   ├── styles/           # CSS and design tokens
│   │   ├── *.ds.astro    # Design system documentation
│   │   └── ...
│   ├── svgs/             # SVG icons
│   └── env.d.ts
├── astro.config.mjs      # Astro configuration
├── eslint.config.js      # ESLint configuration
└── package.json
```

---

## 🧞 Available Commands

| Command | Action |
|---------|--------|
| `bun install` | Install dependencies |
| `bun run dev` | Start dev server at `localhost:4321` |
| `bun run build` | Build production site to `./dist/` |
| `bun run preview` | Preview production build locally |
| `bun run lint` | Run ESLint |
| `bun run lint:fix` | Fix ESLint issues automatically |
| `bunx astro check` | Type-check and validate Astro files |

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contact

Interested in working together? Reach out through the [contact form](https://kinoo.dev#contact) or connect with me on your preferred platform.

**Built with ❤️ using [Astro](https://astro.build) and [SolidJS](https://www.solidjs.com)**