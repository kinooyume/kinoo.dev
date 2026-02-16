import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: "https://kinoo.dev",
  integrations: [solidJs(), sitemap({ filter: (page) => !page.includes('articles-draft') }), mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
