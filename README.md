<div align="center">

# 🚀 kinoo.dev

![kinoo.dev](public/og.jpg)

**Personal portfolio & freelance website for Martin Kinoo**  
*Frontend Developer · Typescript · React · Svelte*

[![Astro](https://img.shields.io/badge/Astro-4.16-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.8-2C4F7C?style=for-the-badge&logo=solid&logoColor=white)](https://www.solidjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Bun](https://img.shields.io/badge/Bun-1.x-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh)

[🌐 Live Website](https://kinoo.dev) · [📧 Contact](https://kinoo.dev#contact)

</div>

---

## 📖 About

This is my personal portfolio and freelance website, showcasing my work as a **Frontend Developer**. Built with modern web technologies and optimized for performance, accessibility, and user experience.

---

## ✨ Features

- ⚡ **Lightning-fast** static site generation with Astro
- 🎭 **Smooth animations** using Anime.js
- 🎨 **Modern UI** with TailwindCSS
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
- **[TailwindCSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[SolidJS](https://www.solidjs.com)** - Reactive UI components
- **[Anime.js](https://animejs.com)** - Animation library

### Interactive Components
- **[Blaze Slider](https://github.com/blaze-slider/blaze-slider)** - Touch-enabled image sliders
- **[Modular Forms](https://modular-forms.dev/)** - Form validation with SolidJS
- **[Solid Toast](https://github.com/ardeora/solid-toast)** - Toast notifications

### Development Tools
- **[ESLint](https://eslint.org)** - Code linting with TypeScript & accessibility rules
- **[Prettier](https://prettier.io)** - Code formatting

---

## 🚀 Getting Started

### Prerequisites

- **Bun** (latest version recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kinoo.dev.git
cd kinoo.dev

# Install dependencies
bun install
```

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

## 📂 Project Structure

```text
kinoo.dev/
├── public/               # Static assets (images, fonts, etc.)
├── src/
│   ├── components/       # Reusable Astro & SolidJS components
│   │   ├── Card.astro
│   │   ├── Hero.astro
│   │   ├── Slider.tsx   # SolidJS components
│   │   └── Contact.astro
│   ├── layouts/          # Page layouts
│   │   └── Layout.astro
│   ├── pages/            # File-based routing
│   │   └── index.astro
│   ├── svgs/             # SVG icons
│   └── env.d.ts
├── astro.config.mjs      # Astro configuration
├── tailwind.config.mjs   # TailwindCSS configuration
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

© 2024-2026 Martin Kinoo. All rights reserved.

---

## 🤝 Contact

Interested in working together? Reach out through the [contact form](https://kinoo.dev#contact) or connect with me on your preferred platform.

**Built with ❤️ using [Astro](https://astro.build), [TailwindCSS](https://tailwindcss.com), and [SolidJS](https://www.solidjs.com)**