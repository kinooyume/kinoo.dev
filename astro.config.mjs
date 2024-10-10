import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";

// import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://kinoo.dev",
  integrations: [sitemap(), solidJs(), tailwind()]
});
