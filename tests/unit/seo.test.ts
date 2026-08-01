import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import {
  createPageMetadata,
  getSiteUrl,
  personName,
  siteName,
} from "@/lib/seo";
import { createHomeStructuredData } from "@/lib/structured-data";

describe("SEO configuration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("normalizes the configured production origin", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio.example/path?q=1");
    expect(getSiteUrl().toString()).toBe("https://portfolio.example/");
  });

  it("uses Vercel's production origin when no explicit origin is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "portfolio.vercel.app");
    expect(getSiteUrl().toString()).toBe("https://portfolio.vercel.app/");
  });

  it("builds same-route canonical and language alternates", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio.example");
    const metadata = createPageMetadata({
      locale: "ar",
      path: "/projects/buildsense",
      title: "BuildSense",
      description: "وصف المشروع",
      socialKind: "project",
    });

    expect(metadata.alternates?.canonical).toBe(
      "https://portfolio.example/ar/projects/buildsense",
    );
    expect(metadata.alternates?.languages).toMatchObject({
      en: "https://portfolio.example/en/projects/buildsense",
      ar: "https://portfolio.example/ar/projects/buildsense",
      "x-default": "https://portfolio.example/en/projects/buildsense",
    });
    expect(metadata.authors).toEqual([
      { name: personName, url: new URL("https://portfolio.example/") },
    ]);
    expect(metadata.openGraph).toMatchObject({ siteName });
    expect(metadata.publisher).toBe(siteName);
  });

  it("connects the website brand aliases to the person identity", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio.example");
    const structuredData = createHomeStructuredData("en");

    expect(structuredData["@graph"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "@type": "Person",
          name: personName,
          alternateName: expect.arrayContaining([
            "نور الدين محمود",
            "Nour Eldeen Dev",
            "Noureldeen Dev",
            "NourEldeenDev",
          ]),
        }),
        expect.objectContaining({
          "@type": "WebSite",
          name: siteName,
          alternateName: [
            "Noureldeen Dev",
            "NourEldeenDev",
            "noureldeendev.me",
            `${personName} Portfolio`,
          ],
        }),
      ]),
    );
  });

  it("lists every localized public route without query-state duplicates", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio.example");
    const entries = sitemap();

    expect(entries).toHaveLength(42);
    expect(new Set(entries.map(({ url }) => url)).size).toBe(42);
    expect(entries.every(({ url }) => !url.includes("?"))).toBe(true);
    expect(entries.map(({ url }) => url)).toContain(
      "https://portfolio.example/ar/case-studies/buildsense",
    );
  });

  it("allows public crawling and advertises the sitemap", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio.example");
    expect(robots()).toMatchObject({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://portfolio.example/sitemap.xml",
      host: "https://portfolio.example",
    });
  });
});
