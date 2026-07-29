import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";

export const siteName = "Nour Eldeen Mahmoud";
export const defaultSiteOrigin = "http://localhost:3000";

export function getSiteUrl() {
  const vercelOrigin = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const configuredOrigin =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (vercelOrigin ? `https://${vercelOrigin}` : undefined);
  const siteUrl = new URL(configuredOrigin || defaultSiteOrigin);

  if (!["http:", "https:"].includes(siteUrl.protocol)) {
    throw new Error("NEXT_PUBLIC_SITE_URL must use http or https.");
  }

  siteUrl.pathname = "/";
  siteUrl.search = "";
  siteUrl.hash = "";
  return siteUrl;
}

export function getLocalizedUrl(locale: Locale, path = "") {
  return new URL(`/${locale}${path}`, getSiteUrl());
}

type PageMetadataInput = {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  socialKind: "portfolio" | "project" | "case-study" | "knowledge";
  type?: "website" | "article";
};

export function createPageMetadata({
  locale,
  path = "",
  title,
  description,
  socialKind,
  type = "website",
}: PageMetadataInput): Metadata {
  const canonical = getLocalizedUrl(locale, path);
  const socialImage = new URL("/api/og", getSiteUrl());
  socialImage.searchParams.set("locale", locale);
  socialImage.searchParams.set("kind", socialKind);
  socialImage.searchParams.set("title", title);
  socialImage.searchParams.set("description", description);

  return {
    title,
    description,
    authors: [{ name: siteName, url: getSiteUrl() }],
    creator: siteName,
    publisher: siteName,
    alternates: {
      canonical: canonical.toString(),
      languages: {
        en: getLocalizedUrl("en", path).toString(),
        ar: getLocalizedUrl("ar", path).toString(),
        "x-default": getLocalizedUrl("en", path).toString(),
      },
    },
    openGraph: {
      type,
      title,
      description,
      url: canonical.toString(),
      siteName,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_EG"],
      images: [
        {
          url: socialImage.toString(),
          width: 1200,
          height: 630,
          alt:
            locale === "ar"
              ? `معاينة مشاركة ${title}`
              : `${title} social preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.toString()],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
