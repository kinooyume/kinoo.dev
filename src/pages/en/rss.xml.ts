import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { useTranslations } from "@/i18n";
import { resolveArticles } from "@/lib/articles";

export async function GET(context: APIContext) {
  const t = useTranslations("en");
  const articles = await resolveArticles("en");

  return rss({
    title: t.rss.title,
    description: t.rss.description,
    site: context.site ?? new URL("https://kinoo.dev"),
    items: articles.map((article) => ({
      title: article.entry.data.title,
      description: article.entry.data.description,
      pubDate: article.entry.data.date,
      link: article.url,
    })),
  });
}
