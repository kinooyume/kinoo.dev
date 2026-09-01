export const locales = ["fr", "en"] as const;
export const defaultLocale = "fr";

export type Locale = (typeof locales)[number];

export const htmlLang: Record<Locale, string> = {
  fr: "fr",
  en: "en",
};

export const ogLocale: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
};

export const dateLocale: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-US",
};

export function isLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale);
}
