import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const experiences = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/experiences" }),
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    href: z.string(),
    label: z.string(),
    location: z.string().optional(),
    date: z.string().optional(),
    logo: z.string(),
    tags: z.array(z.string()).default([]),
    gridArea: z.string(),
    order: z.number(),
  }),
});

const formations = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/formations" }),
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    href: z.string(),
    label: z.string(),
    location: z.string().optional(),
    date: z.string().optional(),
    logo: z.string(),
    tags: z.array(z.string()).default([]),
    gridArea: z.string(),
    order: z.number(),
  }),
});

const realisations = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/realisations" }),
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    logo: z.string(),
    tags: z.array(z.string()).default([]),
    links: z
      .array(z.object({ text: z.string(), href: z.string() }))
      .default([]),
    pictures: z.array(z.string()).default([]),
    gridArea: z.string(),
    order: z.number(),
    reverse: z.boolean().default(false),
    vertical: z.boolean().default(false),
  }),
});

export const collections = {
  articles,
  experiences,
  formations,
  realisations,
};
