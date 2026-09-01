import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { useTranslations } from "@/i18n";

export async function GET(context: APIContext) {
  const articles = (await getCollection("articles"))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const t = useTranslations("fr");

  return rss({
    title: t.rss.title,
    description: t.rss.description,
    site: context.site ?? new URL("https://kinoo.dev"),
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.date,
      link: `/articles/${article.id}`,
    })),
  });
}
