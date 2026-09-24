import { getCollection, type CollectionEntry } from "astro:content";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n";

type Entry = CollectionEntry<"articles">;

export type ResolvedArticle = {
  key: string;
  entry: Entry;
  contentLang: Locale;
  isFallback: boolean;
  url: string;
  /** The page serving the content in its own language. Canonical target. */
  sourceUrl: string;
  /** This entry's page in the other language. Always exists, fallback included. */
  otherUrl: string;
  /** Set only when both languages exist. hreflang target. */
  alternateUrl: string | null;
};

type Group = { key: string } & Partial<Record<Locale, Entry>>;

function splitId(id: string): { lang: Locale; key: string } | null {
  const slash = id.indexOf("/");
  if (slash === -1) return null;
  const lang = id.slice(0, slash);
  return isLocale(lang) ? { lang, key: id.slice(slash + 1) } : null;
}

function articleUrl(lang: Locale, slug: string): string {
  return `${lang === defaultLocale ? "" : `/${lang}`}/articles/${slug}`;
}

function otherLocale(lang: Locale): Locale {
  return lang === "fr" ? "en" : "fr";
}

async function groupByKey(): Promise<Group[]> {
  const byKey = new Map<string, Group>();
  for (const entry of await getCollection("articles")) {
    const parts = splitId(entry.id);
    if (!parts) continue;
    const group = byKey.get(parts.key) ?? { key: parts.key };
    group[parts.lang] = entry;
    byKey.set(parts.key, group);
  }
  return [...byKey.values()];
}

export async function resolveArticles(lang: Locale): Promise<ResolvedArticle[]> {
  const other = otherLocale(lang);
  const resolved: ResolvedArticle[] = [];

  for (const group of await groupByKey()) {
    const own = group[lang];
    const alternate = group[other];
    const entry = own ?? alternate;
    if (!entry) continue;

    const contentLang = own ? lang : other;
    const slug = entry.data.urlSlug ?? group.key;
    const otherUrl = articleUrl(
      other,
      alternate ? (alternate.data.urlSlug ?? group.key) : group.key,
    );

    resolved.push({
      key: group.key,
      entry,
      contentLang,
      isFallback: !own,
      url: articleUrl(lang, own ? slug : group.key),
      sourceUrl: articleUrl(contentLang, slug),
      otherUrl,
      alternateUrl: own && alternate ? otherUrl : null,
    });
  }

  return resolved.sort(
    (a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime(),
  );
}

/**
 * Redirects from key derived URLs to urlSlug derived ones. Without them,
 * localizing the slug of an already published article would drop its old URL.
 */
export async function articleRedirects(): Promise<
  { from: string; to: string }[]
> {
  const redirects: { from: string; to: string }[] = [];

  for (const group of await groupByKey()) {
    for (const lang of locales) {
      const slug = group[lang]?.data.urlSlug;
      if (!slug || slug === group.key) continue;
      redirects.push({
        from: articleUrl(lang, group.key),
        to: articleUrl(lang, slug),
      });
    }
  }

  return redirects;
}
