import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import shikiDark from './src/styles/shiki-dark.json';
import shikiLight from './src/styles/shiki-light.json';

// https://astro.build/config
export default defineConfig({
  site: "https://kinoo.dev",
  prefetch: {
    defaultStrategy: "hover",
  },
  integrations: [solidJs(), sitemap({ filter: (page) => !page.includes('articles-draft') }), mdx()],
  markdown: {
    shikiConfig: {
      themes: {
        dark: shikiDark,
        light: shikiLight,
      },
      defaultColor: 'dark',
    },
  },
  vite: {
    resolve: {
      preserveSymlinks: true,
    },
  },
});
