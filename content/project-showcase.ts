import type { Locale } from "@/i18n/routing";

export type CategoryId =
  "web" | "game-development" | "desktop" | "mobile-applications" | "summaries";

export type ShowcaseCategory = {
  id: CategoryId;
  label: Record<Locale, string>;
  /** Project slugs from portfolio.ts — order determines display order */
  projectSlugs: string[];
  /** Truthful unavailable-state copy for categories with no published case study */
  emptyCopy?: Record<Locale, string>;
};

export const categories: ShowcaseCategory[] = [
  {
    id: "web",
    label: { en: "Web", ar: "ويب" },
    projectSlugs: [
      "buildsense",
      "cinemaverse",
      "bookify",
      "frontend-mini-projects",
    ],
  },
  {
    id: "game-development",
    label: { en: "Game Dev", ar: "تطوير ألعاب" },
    projectSlugs: [
      "how-to-train-your-ai",
      "sharp-shooter",
      "royal-run",
      "galaxy-strike",
      "rocket-boost",
    ],
  },
  {
    id: "desktop",
    label: { en: "Desktop", ar: "مكتبي" },
    projectSlugs: ["blood-bank-desktop", "dvld"],
  },
  {
    id: "mobile-applications",
    label: { en: "Mobile", ar: "موبايل" },
    projectSlugs: ["blood-bank-mobile"],
  },
  {
    id: "summaries",
    label: { en: "Summaries", ar: "ملخصات" },
    projectSlugs: ["met-summaries"],
  },
];
