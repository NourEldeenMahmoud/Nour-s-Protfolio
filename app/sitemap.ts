import type { MetadataRoute } from "next";
import { caseStudySlugs } from "@/content/case-studies";
import { projectSlugs } from "@/content/portfolio";
import { locales, type Locale } from "@/i18n/routing";
import { getLocalizedUrl } from "@/lib/seo";

const publicPaths = [
  "",
  "/learn",
  ...projectSlugs.map((slug) => `/projects/${slug}`),
  ...caseStudySlugs.map((slug) => `/case-studies/${slug}`),
];

function createEntry(
  locale: Locale,
  path: string,
): MetadataRoute.Sitemap[number] {
  return {
    url: getLocalizedUrl(locale, path).toString(),
    alternates: {
      languages: {
        en: getLocalizedUrl("en", path).toString(),
        ar: getLocalizedUrl("ar", path).toString(),
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.flatMap((path) =>
    locales.map((locale) => createEntry(locale, path)),
  );
}
