import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import mdx from "@mdx-js/rollup";
import rehypeSlugs from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeToc from "@stefanprobst/rehype-extract-toc";
import rehypeTocExport from "@stefanprobst/rehype-extract-toc/mdx";

export default defineConfig({
  assetsInclude: ["src/static/*"],
  plugins: [
    solid(),
    mdx({
      rehypePlugins: [
        rehypeSlugs,
        rehypeHighlight,
        rehypeToc,
        [rehypeTocExport, { name: "toc" }],
      ],
      jsxImportSource: "solid-js/h",
    }),
    // (() => {
    //   return {
    //     name: "ssg",
    //     transformIndexHtml: async (html, ctx) => {
    //       const { app } = await ctx.server.ssrLoadModule("/src/root.jsx")
    //       return html
    //         .replace("<!-- hydrate -->", generateHydrationScript())
    //         .replace("<!-- app -->", app)
    //     },
    //   }
    // })(),
  ],
});
