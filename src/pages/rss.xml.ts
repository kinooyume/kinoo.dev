import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const articles = (await getCollection("articles"))
    .filter((a) => !a.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "Martin Kinoo",
    description: "Articles sur le développement front-end, l'architecture et les outils.",
    site: context.site ?? new URL("https://kinoo.dev"),
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.date,
      link: `/articles/${article.id}`,
    })),
  });
}
