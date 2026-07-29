import { getProject, type Project, type ProjectSlug } from "@/content/portfolio";
import type { Locale } from "@/i18n/routing";
import styles from "./case-study-paper-map.module.css";

const papers: Array<{
  slug: ProjectSlug;
  previewX: number;
  previewY: number;
  previewWidth: number;
  previewHeight: number;
  clipPoints: string;
}> = [
  {
    slug: "buildsense",
    previewX: 1313,
    previewY: 649,
    previewWidth: 574,
    previewHeight: 787,
    clipPoints: "1313.4,670.3 1856.5,649.3 1885.7,1415.3 1616,1426.9 1347.4,1434.3 1333.9,1180.9 1318.2,798.6",
  },
  {
    slug: "bookify",
    previewX: 2045,
    previewY: 638,
    previewWidth: 405,
    previewHeight: 562,
    clipPoints: "2045.1,1187.2 2047.9,1097.2 2053.6,915 2062.5,638.8 2159,641.5 2352.8,647 2448,650.7 2442.5,926.5 2439.8,1017.7 2433,1198.1 2335.3,1198.8",
  },
  {
    slug: "blood-bank-mobile",
    previewX: 2448,
    previewY: 1385,
    previewWidth: 346,
    previewHeight: 477,
    clipPoints: "2448.2,1850.3 2452.5,1618.5 2459.3,1385 2792.8,1391.1 2784.8,1703.8 2778.3,1860.1 2530.5,1855",
  },
  {
    slug: "dvld",
    previewX: 1257,
    previewY: 1347,
    previewWidth: 341,
    previewHeight: 472,
    clipPoints: "1257.9,1805.6 1260.2,1651.8 1268.5,1423.1 1273.1,1347.9 1517.1,1357.7 1596.8,1362.2 1587.4,1666.7 1583.9,1742.7 1579,1817.1 1417.6,1811.8 1336.7,1808.8",
  },
  {
    slug: "blood-bank-desktop",
    previewX: 1842,
    previewY: 1413,
    previewWidth: 344,
    previewHeight: 475,
    clipPoints: "1842.4,1420.2 2089.5,1413.4 2174.3,1413.1 2183.9,1721.4 2184.4,1877.7 2022.1,1883.5 1855.7,1886.9 1848,1654.4 1844.2,1499.1",
  },
  {
    slug: "cinemaverse",
    previewX: 2506,
    previewY: 659,
    previewWidth: 397,
    previewHeight: 556,
    clipPoints: "2506.9,663.4 2794.4,660.4 2892.9,659.4 2897.6,931.9 2901.3,1205.7 2802.7,1208.5 2610.4,1212.4 2515.6,1213.3 2510.9,1122.2 2508.6,1031.2",
  },
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
            href={`/${locale}/case-studies/${paper.slug}`}
            aria-label={`${copy[locale].action}: ${project.title}`}
            tabIndex={active ? 0 : -1}
            onClick={(event) => {
              event.preventDefault();
              onOpen(project);
            }}
          >
            <g
              className={styles.paperPreview}
              style={{
                transformOrigin: `${((paper.previewX + paper.previewWidth / 2) / 4200) * 100}% ${((paper.previewY + paper.previewHeight / 2) / 2700) * 100}%`,
              }}
              aria-hidden="true"
            >
              <image
                href={`/case-study-paper-${paper.slug}.webp`}
                x={paper.previewX}
                y={paper.previewY}
                width={paper.previewWidth}
                height={paper.previewHeight}
                preserveAspectRatio="none"
              />
              <g className={styles.paperLabel}>
                <rect
                  x={paper.previewX + 26}
                  y={paper.previewY + paper.previewHeight - 94}
                  width={paper.previewWidth - 52}
                  height="62"
                  rx="8"
                />
                <text
                  x={paper.previewX + paper.previewWidth / 2}
                  y={paper.previewY + paper.previewHeight - 53}
                  textAnchor="middle"
                >
                  {project.shortTitle}
                </text>
              </g>
            </g>
            <polygon
              className={styles.paperSurface}
              points={paper.clipPoints}
            />
          </a>
        );
      })}
    </svg>
  );
}
