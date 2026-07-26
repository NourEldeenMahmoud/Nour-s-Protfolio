"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/routing";
import { projects, type Project } from "@/content/portfolio";
import styles from "./project-experience.module.css";

const copy = {
  en: {
    returnToRoom: "Return to Project Room",
    allProjects: "All case studies",
    contribution: "Contribution",
    timeline: "Timeline",
    notPublished: "Not published",
    platform: "Platform",
    technologies: "Technologies",
    problemContext: "Problem & Context",
    solutionContribution: "Solution & Contribution",
    keyFeatures: "Key Features",
    devProcess: "Development Process",
    processNote:
      "A verified step-by-step development process has not been published for this project.",
    technicalImplementation: "Technical Implementation",
    gallery: "Gallery",
    evidence: "Evidence & Outcomes",
    honestBoundaries: "Honest Boundaries",
    repository: "Open Repository",
    demo: "Open Verified Demo",
    previousProject: "Previous project",
    nextProject: "Next project",
    finalReturn: "Return to Project Room",
  },
  ar: {
    returnToRoom: "العودة إلى غرفة المشاريع",
    allProjects: "كل دراسات الحالة",
    contribution: "المساهمة",
    timeline: "الجدول الزمني",
    notPublished: "غير منشور",
    platform: "المنصة",
    technologies: "التقنيات",
    problemContext: "المشكلة والسياق",
    solutionContribution: "الحل والمساهمة",
    keyFeatures: "الخصائص الرئيسية",
    devProcess: "عملية التطوير",
    processNote: "لم يُنشر خطوات عملية التطوير المؤكدة لهذا المشروع.",
    technicalImplementation: "التنفيذ التقني",
    gallery: "المعرض",
    evidence: "الأدلة والنتائج",
    honestBoundaries: "الحدود الصريحة",
    repository: "افتح المستودع",
    demo: "افتح النسخة المؤكدة",
    previousProject: "المشروع السابق",
    nextProject: "المشروع التالي",
    finalReturn: "العودة إلى غرفة المشاريع",
  },
} as const;

/** Derive category label from project-showcase mapping. */
function getCategoryLabel(slug: string, locale: Locale): string | null {
  const categoryMap: Record<string, { en: string; ar: string }> = {
    buildsense: { en: "Web", ar: "ويب" },
    bookify: { en: "Web", ar: "ويب" },
    cinemaverse: { en: "Web", ar: "ويب" },
    "blood-bank-desktop": { en: "Desktop", ar: "مكتبي" },
    "blood-bank-mobile": { en: "Mobile", ar: "موبايل" },
    dvld: { en: "Desktop", ar: "مكتبي" },
  };
  return categoryMap[slug]?.[locale] ?? null;
}

export function ProjectExperience({
  locale,
  project,
}: {
  locale: Locale;
  project: Project;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const c = copy[locale];

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const prevProject =
    projects[(projectIndex - 1 + projects.length) % projects.length] ??
    projects[projects.length - 1];
  const nextProject =
    projects[(projectIndex + 1) % projects.length] ?? projects[0];

  const category = getCategoryLabel(project.slug, locale);

  /* ── GSAP entrance motion ── */
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    void import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      const ctx = gsap.context(() => {
        const sections = containerRef.current!.querySelectorAll<HTMLElement>(
          `.${styles.animateIn}`,
        );
        gsap.from(sections, {
          y: 30,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        });
      }, containerRef);

      return () => ctx.revert();
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main ref={containerRef} className={styles.experience}>
      {/* ── Sticky Navigation ── */}
      <header className={styles.header}>
        <nav className={styles.headerNav} aria-label="Navigation">
          <Link
            href={`/${locale}?focus=exploration`}
            className={styles.roomLink}
          >
            {c.returnToRoom}
          </Link>
          <Link href={`/${locale}/watch`} className={styles.watchLink}>
            {c.allProjects}
          </Link>
        </nav>
      </header>

      {/* ── Cinematic Hero ── */}
      <section className={styles.hero} aria-labelledby="project-title">
        <div className={styles.heroMedia}>
          <Image
            src={project.image}
            alt={project.imageAlt[locale]}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 60vw"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} aria-hidden="true" />
        </div>
        <div className={styles.heroCopy}>
          {category && <span className={styles.kicker}>{category}</span>}
          <h1 id="project-title">{project.title}</h1>
          <p className={styles.heroSummary}>{project.summary[locale]}</p>
          <ul className={styles.stackList} aria-label={c.technologies}>
            {project.stack.map((tech) => (
              <li key={tech} className={styles.stackItem}>
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Facts Rail ── */}
      <section
        className={`${styles.factsRail} ${styles.animateIn}`}
        aria-label="Project facts"
      >
        <div className={styles.fact}>
          <span className={styles.factLabel}>{c.contribution}</span>
          <span className={styles.factValue}>
            {project.contribution[locale].split(".")[0]}
          </span>
        </div>
        <div className={styles.factDivider} aria-hidden="true" />
        <div className={styles.fact}>
          <span className={styles.factLabel}>{c.timeline}</span>
          <span className={`${styles.factValue} ${styles.factMuted}`}>
            {c.notPublished}
          </span>
        </div>
        {category && (
          <>
            <div className={styles.factDivider} aria-hidden="true" />
            <div className={styles.fact}>
              <span className={styles.factLabel}>{c.platform}</span>
              <span className={styles.factValue}>{category}</span>
            </div>
          </>
        )}
      </section>

      {/* ── Problem & Context ── */}
      <section className={`${styles.section} ${styles.animateIn}`}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionIndex}>01</span>
          <h2>{c.problemContext}</h2>
          <p>{project.context[locale]}</p>
        </div>
      </section>

      {/* ── Solution & Contribution ── */}
      <section className={`${styles.section} ${styles.animateIn}`}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionIndex}>02</span>
          <h2>{c.solutionContribution}</h2>
          <p>{project.contribution[locale]}</p>
        </div>
      </section>

      {/* ── Key Features (conditional) ── */}
      {project.highlights && project.highlights.length > 0 && (
        <section className={`${styles.section} ${styles.animateIn}`}>
          <div className={styles.sectionInner}>
            <span className={styles.sectionIndex}>03</span>
            <h2>{c.keyFeatures}</h2>
            <ul className={styles.highlightsList}>
              {project.highlights.map((item, index) => (
                <li key={index}>
                  <span className={styles.highlightIndex}>0{index + 1}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Development Process ── */}
      <section className={`${styles.section} ${styles.animateIn}`}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionIndex}>
            {project.highlights ? "04" : "03"}
          </span>
          <h2>{c.devProcess}</h2>
          <p className={styles.processNote}>{c.processNote}</p>
        </div>
      </section>

      {/* ── Technical Implementation ── */}
      <section className={`${styles.section} ${styles.animateIn}`}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionIndex}>
            {project.highlights ? "05" : "04"}
          </span>
          <h2>{c.technicalImplementation}</h2>
          <p>{project.engineering[locale]}</p>
        </div>
      </section>

      {/* ── Gallery ── */}
      {project.gallery && project.gallery.length > 0 && (
        <section
          className={`${styles.gallery} ${styles.animateIn}`}
          aria-labelledby="gallery-heading"
        >
          <h2 id="gallery-heading" className={styles.galleryTitle}>
            {c.gallery}
          </h2>
          <div className={styles.galleryGrid}>
            {project.gallery.map((item, index) => (
              <figure key={index} className={styles.galleryItem}>
                <Image
                  src={item.src}
                  alt={item.alt[locale]}
                  fill
                  sizes="(max-width: 900px) 100vw, 45vw"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ── Evidence & Outcomes ── */}
      <section className={`${styles.section} ${styles.animateIn}`}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionIndex}>
            {project.highlights ? "06" : "05"}
          </span>
          <h2>{c.evidence}</h2>
          <p>{project.evidence[locale]}</p>
        </div>
      </section>

      {/* ── Honest Boundaries ── */}
      <section
        className={`${styles.section} ${styles.boundary} ${styles.animateIn}`}
      >
        <div className={styles.sectionInner}>
          <span className={styles.sectionIndex}>
            {project.highlights ? "07" : "06"}
          </span>
          <h2>{c.honestBoundaries}</h2>
          <p>{project.limitation[locale]}</p>
        </div>
      </section>

      {/* ── Actions ── */}
      <section
        className={`${styles.actions} ${styles.animateIn}`}
        aria-label="Actions"
      >
        <a
          className={styles.actionBtn}
          href={project.repository}
          target="_blank"
          rel="noreferrer"
        >
          {c.repository} <span aria-hidden="true">&#x2197;</span>
        </a>
        {project.demo && (
          <a
            className={styles.actionBtn}
            href={project.demo}
            target="_blank"
            rel="noreferrer"
          >
            {c.demo} <span aria-hidden="true">&#x2197;</span>
          </a>
        )}
      </section>

      {/* ── Previous / Next Project ── */}
      <nav
        className={`${styles.projectNav} ${styles.animateIn}`}
        aria-label="Project navigation"
      >
        {prevProject && (
          <Link
            href={`/${locale}/projects/${prevProject.slug}`}
            className={styles.projectNavLink}
          >
            <span className={styles.projectNavLabel}>{c.previousProject}</span>
            <span className={styles.projectNavTitle}>
              {prevProject.shortTitle}
            </span>
          </Link>
        )}
        {nextProject && (
          <Link
            href={`/${locale}/projects/${nextProject.slug}`}
            className={`${styles.projectNavLink} ${styles.projectNavLinkNext}`}
          >
            <span className={styles.projectNavLabel}>{c.nextProject}</span>
            <span className={styles.projectNavTitle}>
              {nextProject.shortTitle}
            </span>
          </Link>
        )}
      </nav>

      {/* ── Final Return ── */}
      <footer className={styles.footer}>
        <Link
          href={`/${locale}?focus=exploration`}
          className={styles.finalReturn}
        >
          {c.finalReturn}
        </Link>
      </footer>
    </main>
  );
}
