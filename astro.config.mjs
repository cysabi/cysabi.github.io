// @ts-check
import { defineConfig } from "astro/config";

import solid from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";

const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const now = new Date();
const lastUpdated = `${months[now.getMonth()]}.${String(now.getDate()).padStart(2, "0")}.${now.getFullYear()}`;

// https://astro.build/config
export default defineConfig({
  site: "https://cysabi.github.io",
  integrations: [solid({ devtools: true }), mdx()],
  markdown: {
    shikiConfig: { theme: "catppuccin-mocha" },
    rehypePlugins: [rehypeSlug],
  },
  vite: {
    define: { __LAST_UPDATED__: JSON.stringify(lastUpdated) },
  },
});
