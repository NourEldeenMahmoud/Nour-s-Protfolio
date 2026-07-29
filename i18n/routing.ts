export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeCookieName = "portfolio-locale";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function resolvePreferredLocale(
  persistedLocale?: string,
  acceptLanguage?: string | null,
): Locale {
  if (persistedLocale && isLocale(persistedLocale)) return persistedLocale;
  if (!acceptLanguage) return defaultLocale;

  const preferences = acceptLanguage
    .split(",")
    .map((entry) => {
      const [tag = "", quality = "q=1"] = entry.trim().split(";");
      return {
        locale: tag.toLowerCase().split("-")[0] ?? "",
        quality: Number(quality.replace("q=", "")) || 0,
      };
    })
    .sort((left, right) => right.quality - left.quality);

  const preferredLocale = preferences.find(({ locale }) =>
    isLocale(locale),
  )?.locale;
  return preferredLocale && isLocale(preferredLocale)
    ? preferredLocale
    : defaultLocale;
}
