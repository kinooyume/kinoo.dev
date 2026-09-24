import { fileURLToPath } from 'node:url';
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
  i18n: {
    locales: ["fr", "en"],
    defaultLocale: "fr",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    // Astro keeps any path starting with "_" out of routing, hence the injected route.
    {
      name: "article-redirects",
      hooks: {
        "astro:config:setup": ({ injectRoute }) => {
          injectRoute({
            pattern: "/_redirects",
            entrypoint: "./src/routes/netlifyRedirects.ts",
          });
        },
      },
    },
    solidJs(),
    sitemap({
      // This only pairs URLs that match each other bar the locale prefix, so it
      // covers / and /en/ but not articles, whose slug is localized per language.
      // Their hreflang lives in the page head, which is enough: Google treats
      // link elements and sitemap alternates as interchangeable. Do not mirror it
      // here from a second source, a contradictory pair voids the whole cluster.
      i18n: {
        defaultLocale: "fr",
        locales: { fr: "fr-FR", en: "en-US" },
      },
      filter: (page) => !page.includes("/design-system"),
    }),
    mdx(),
  ],
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
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
