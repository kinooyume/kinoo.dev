import { defaultLocale, dateLocale, isLocale, type Locale } from "./config";
import { fr } from "./fr";
import { en } from "./en";

export * from "./config";

const dicts = { fr, en };

export type Dictionary = typeof fr;

export function useTranslations(lang: Locale): Dictionary {
  return dicts[lang];
}

export function localeFromPath(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  return isLocale(segment) && segment !== defaultLocale ? segment : defaultLocale;
}

function stripLocale(pathname: string): string {
  return pathname === "/en" || pathname.startsWith("/en/")
    ? pathname.slice(3) || "/"
    : pathname;
}

export function alternatePath(pathname: string, target: Locale): string {
  const base = stripLocale(pathname);
  if (target === defaultLocale) return base;
  return base === "/" ? "/en/" : `/en${base}`;
}

export function localizePath(pathname: string, lang: Locale): string {
  return alternatePath(pathname, lang);
}

export function formatDate(date: Date, lang: Locale): string {
  return date.toLocaleDateString(dateLocale[lang], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
