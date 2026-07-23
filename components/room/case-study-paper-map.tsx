import { getProject, type Project, type ProjectSlug } from "@/content/portfolio";
import type { Locale } from "@/i18n/routing";
import styles from "./case-study-paper-map.module.css";

const papers: Array<{
  slug: ProjectSlug;
  x: number;
  y: number;
  width: number;
  height: number;
  clipPoints: string;
}> = [
  {
    slug: "buildsense",
    x: 1270,
    y: 430,
    width: 620,
    height: 730,
    clipPoints: "1280,430 1860,430 1850,1135 1265,1115",
  },
  {
    slug: "bookify",
    x: 2030,
    y: 420,
    width: 450,
    height: 600,
    clipPoints: "2045,420 2470,425 2460,1015 2040,1000",
  },
  {
    slug: "blood-bank-mobile",
    x: 2500,
    y: 430,
    width: 430,
    height: 610,
    clipPoints: "2515,430 2925,425 2920,1035 2510,1020",
  },
  {
    slug: "dvld",
    x: 1230,
    y: 1150,
    width: 390,
    height: 490,
    clipPoints: "1240,1150 1610,1160 1605,1640 1235,1625",
  },
  {
    slug: "blood-bank-desktop",
    x: 1820,
    y: 1200,
    width: 390,
    height: 500,
    clipPoints: "1830,1200 2200,1205 2195,1690 1825,1680",
  },
  {
    slug: "cinemaverse",
    x: 2430,
    y: 1170,
    width: 390,
    height: 500,
    clipPoints: "2440,1170 2810,1180 2805,1675 2435,1660",
  },
];

const copy = {
  en: { label: "Case-study papers", action: "Open case study" },
  ar: { label: "أوراق دراسات الحالة", action: "افتح دراسة الحالة" },
} as const;

const paperStill = "/engineering-room-hire-straight.webp";

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
      <defs>
        {papers.map((paper) => (
          <clipPath key={paper.slug} id={`paper-clip-${paper.slug}`}>
            <polygon points={paper.clipPoints} />
          </clipPath>
        ))}
      </defs>
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
            <g
              className={styles.paperPreview}
              clipPath={`url(#paper-clip-${paper.slug})`}
              style={{
                transformOrigin: `${((paper.x + paper.width / 2) / 4200) * 100}% ${((paper.y + paper.height / 2) / 2700) * 100}%`,
              }}
              aria-hidden="true"
            >
              <image
                href={paperStill}
                x="0"
                y="0"
                width="4200"
                height="2700"
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
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
