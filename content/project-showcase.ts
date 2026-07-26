import type { Locale } from "@/i18n/routing";

export type CategoryId =
  "web" | "game-development" | "desktop" | "mobile-applications" | "bots";

export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt: Record<Locale, string>;
  poster?: string;
};

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
    projectSlugs: ["buildsense", "bookify", "cinemaverse"],
  },
  {
    id: "game-development",
    label: { en: "Game Dev", ar: "تطوير ألعاب" },
    projectSlugs: [],
    emptyCopy: {
      en: "No published case study currently available.",
      ar: "لا توجد دراسة حالة منشورة متاحة حالياً.",
    },
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
    id: "bots",
    label: { en: "Bots", ar: "بوتات" },
    projectSlugs: [],
    emptyCopy: {
      en: "No published case study currently available.",
      ar: "لا توجد دراسة حالة منشورة متاحة حالياً.",
    },
  },
];

/**
 * Build media items from a portfolio project's primary image + gallery.
 * Returns a non-empty array: at minimum the primary image.
 */
export function buildMediaItems(project: {
  image: string;
  imageAlt: Record<Locale, string>;
  gallery?: Array<{ src: string; alt: Record<Locale, string> }>;
}): MediaItem[] {
  const items: MediaItem[] = [
    { type: "image", src: project.image, alt: project.imageAlt },
  ];
  if (project.gallery) {
    for (const g of project.gallery) {
      items.push({ type: "image", src: g.src, alt: g.alt });
    }
  }
  return items;
}
