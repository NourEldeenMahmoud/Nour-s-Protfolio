import { getProject, type Project, type ProjectSlug } from "@/content/portfolio";
import type { Locale } from "@/i18n/routing";
import styles from "./case-study-paper-map.module.css";

const papers: Array<{
  slug: ProjectSlug;
  x: number;
  y: number;
  width: number;
  height: number;
}> = [
  { slug: "buildsense", x: 1270, y: 430, width: 620, height: 730 },
  { slug: "bookify", x: 2030, y: 420, width: 450, height: 600 },
  { slug: "blood-bank-mobile", x: 2500, y: 430, width: 430, height: 610 },
  { slug: "dvld", x: 1230, y: 1150, width: 390, height: 490 },
  { slug: "blood-bank-desktop", x: 1820, y: 1200, width: 390, height: 500 },
  { slug: "cinemaverse", x: 2430, y: 1170, width: 390, height: 500 },
];

const copy = {
  en: { label: "Case-study papers", action: "Open case study" },
  ar: { label: "أوراق دراسات الحالة", action: "افتح دراسة الحالة" },
} as const;

export function CaseStudyPaperMap({
  active,
  locale,
  onOpen,
}: {
  active: boolean;
  locale: Locale;
  onOpen: (project: Project) => void;
}) {
  return (
    <svg
      className={`${styles.map} ${active ? styles.active : ""}`}
      viewBox="0 0 4200 2700"
      preserveAspectRatio="xMidYMid slice"
      aria-label={copy[locale].label}
      aria-hidden={!active}
    >
      {papers.map((paper) => {
        const project = getProject(paper.slug);
        if (!project) return null;
        return (
          <a
            key={paper.slug}
            className={styles.paper}
            href={`/${locale}/projects/${paper.slug}`}
            aria-label={`${copy[locale].action}: ${project.title}`}
            tabIndex={active ? 0 : -1}
            onClick={(event) => {
              event.preventDefault();
              onOpen(project);
            }}
          >
            <rect
              className={styles.paperSurface}
              x={paper.x}
              y={paper.y}
              width={paper.width}
              height={paper.height}
              rx="20"
            />
            <g className={styles.paperLabel}>
              <rect
                x={paper.x + 26}
                y={paper.y + paper.height - 94}
                width={paper.width - 52}
                height="62"
                rx="8"
              />
              <text
                x={paper.x + paper.width / 2}
                y={paper.y + paper.height - 53}
                textAnchor="middle"
              >
                {project.shortTitle}
              </text>
            </g>
          </a>
        );
      })}
    </svg>
  );
}
