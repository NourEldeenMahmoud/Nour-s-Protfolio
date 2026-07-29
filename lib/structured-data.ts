import type { Project } from "@/content/portfolio";
import type { Locale } from "@/i18n/routing";
import { getLocalizedUrl, getSiteUrl, siteName } from "@/lib/seo";

const personId = new URL("/#person", getSiteUrl()).toString();
const websiteId = new URL("/#website", getSiteUrl()).toString();

export function createHomeStructuredData(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteName,
        alternateName: "نور الدين محمود",
        url: getLocalizedUrl(locale).toString(),
        image: new URL("/profile/nour-eldeen.webp", getSiteUrl()).toString(),
        jobTitle: locale === "ar" ? "مهندس برمجيات" : "Software Engineer",
        sameAs: [
          "https://github.com/NourEldeenMahmoud",
          "https://linkedin.com/in/nour-eldeen-eg",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: `${siteName} Portfolio`,
        url: getSiteUrl().toString(),
        inLanguage: ["en", "ar"],
        author: { "@id": personId },
      },
    ],
  };
}

function createBreadcrumbs(
  locale: Locale,
  entries: Array<{ name: string; path: string }>,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: entries.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: getLocalizedUrl(locale, path).toString(),
    })),
  };
}

export function createProjectStructuredData(project: Project, locale: Locale) {
  const path = `/projects/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      createBreadcrumbs(locale, [
        { name: siteName, path: "" },
        { name: project.title, path },
      ]),
      {
        "@type": "SoftwareSourceCode",
        name: project.title,
        description: project.summary[locale],
        url: getLocalizedUrl(locale, path).toString(),
        image: new URL(project.image, getSiteUrl()).toString(),
        codeRepository: project.repository,
        programmingLanguage: project.stack,
        creator: { "@id": personId },
        inLanguage: locale,
      },
    ],
  };
}

export function createCaseStudyStructuredData(
  project: Project,
  locale: Locale,
) {
  const path = `/case-studies/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      createBreadcrumbs(locale, [
        { name: siteName, path: "" },
        { name: project.title, path },
      ]),
      {
        "@type": "Article",
        headline:
          locale === "ar"
            ? `دراسة حالة ${project.title}`
            : `${project.title} Case Study`,
        description: project.context[locale],
        mainEntityOfPage: getLocalizedUrl(locale, path).toString(),
        image: new URL(project.image, getSiteUrl()).toString(),
        inLanguage: locale,
        author: { "@id": personId },
        about: {
          "@type": "SoftwareSourceCode",
          name: project.title,
          codeRepository: project.repository,
        },
      },
    ],
  };
}
