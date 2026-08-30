import { defineCollection, z } from "astro:content";
import { glob, type Loader } from "astro/loaders";

const RANK = { note: 0, draft: 1, ready: 2 };
type Status = keyof typeof RANK;

const level = process.env.CONTENT ?? "ready";
if (!(level in RANK)) {
  throw new Error(
    `CONTENT must be note, draft or ready (got "${level}")`,
  );
}
const threshold = RANK[level as Status];

function atLeastThreshold(loader: Loader): Loader {
  return {
    ...loader,
    load: async (context) => {
      await loader.load(context);
      for (const [id, entry] of context.store.entries()) {
        const status = entry.data.status as Status;
        if (RANK[status] < threshold) context.store.delete(id);
      }
    },
  };
}

const articles = defineCollection({
  loader: atLeastThreshold(
    glob({ pattern: "**/*.mdx", base: "./src/content/articles" }),
  ),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    links: z
      .array(z.object({ text: z.string(), href: z.string() }))
      .default([]),
    status: z.enum(["note", "draft", "ready"]).default("note"),
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
