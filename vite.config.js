import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import mdx from "@mdx-js/rollup"

export default defineConfig({
  assetsInclude: ["src/static/*"],
  plugins: [solid(), mdx({ jsxImportSource: "solid-js/h" })],
})
