import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import mdx from "@mdx-js/rollup"
import rehypeSlugs from "rehype-slug"
import rehypeToc from "@stefanprobst/rehype-extract-toc"
import rehypeTocExport from "@stefanprobst/rehype-extract-toc/mdx"

export default defineConfig({
  assetsInclude: ["src/static/*"],
  plugins: [
    solid(),
    mdx({
      rehypePlugins: [
        rehypeSlugs,
        rehypeToc,
        [rehypeTocExport, { name: "toc" }],
      ],
      jsxImportSource: "solid-js/h",
    }),
  ],
})
