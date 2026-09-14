import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const works = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/works" }),
  schema: z.object({
    name: z.string(),
    subtitle: z.string().optional(),
    date: z.string().regex(/^\d{4}-\d{2}$/),
    desc: z.array(z.string()).default([]),
    preview: z.string().optional(),
    directLink: z.string().optional(),
    archive: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    sources: z.record(z.string()).default({}),
    collage: z
      .array(z.object({ src: z.string(), caption: z.string() }))
      .default([]),
  }),
});

export const collections = { works };
