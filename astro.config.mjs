import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import sitemap from '@astrojs/sitemap';

// import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://kinoo.dev",
  integrations: [solidJs(), sitemap()]
});
