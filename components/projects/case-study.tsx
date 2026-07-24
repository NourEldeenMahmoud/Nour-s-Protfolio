"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import type { Locale } from "@/i18n/routing";
import { projects, type Project } from "@/content/portfolio";
import styles from "./case-study.module.css";

const copy = {
  en: {
    eyebrow: "CONFIDENTIAL // ENGINEERING DOSSIER",
    back: "All case studies",
    room: "Return to room",
    context: "Context & Domain",
    contribution: "Core Contribution",
    engineering: "Engineering Architecture",
    evidence: "Available Evidence & Proof",
    limitation: "Honest Boundary & Trade-offs",
    stack: "Built With",
    repository: "Open Repository",
    demo: "Open Verified Demo",
    next: "Next Dossier",
    refNo: "CASE FILE #0",
    stamp: "VERIFIED ARCHITECTURE",
  },
  ar: {
    eyebrow: "ملف هندسي // سري وموثق",
    back: "كل دراسات الحالة",
    room: "العودة إلى الغرفة",
    context: "السياق والمجال",
    contribution: "المساهمة الرئيسية",
    engineering: "المعمارية الهندسية",
    evidence: "الأدلة والبراعة المتاحة",
    limitation: "الحدود الصريحة والتوازنات",
    stack: "التقنيات المستخدمة",
    repository: "افتح المستودع",
    demo: "افتح النسخة المؤكدة",
    next: "الملف التالي",
    refNo: "ملف رقم #0",
    stamp: "معمارية مؤكدة",
  },
} as const;

export function CaseStudy({
  locale,
  project,
}: {
  locale: Locale;
  project: Project;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const c = copy[locale];
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject =
    projects[(projectIndex + 1) % projects.length] ?? projects[0];

  useEffect(() => {
    if (!containerRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(`.${styles.header}`, {
        y: -40,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          `.${styles.heroDossier}`,
          {
            y: 45,
            rotation: -2.2,
            opacity: 0,
            duration: 0.85,
          },
          "-=0.25"
        )
        .from(
          `.${styles.stampMark}`,
          {
            scale: 1.8,
            rotation: 25,
            opacity: 0,
            duration: 0.45,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .from(
          `.${styles.techBadge}`,
          {
            y: 12,
            scale: 0.8,
            opacity: 0,
            stagger: 0.04,
            duration: 0.35,
          },
          "-=0.3"
        )
        .from(
          `.${styles.factCard}`,
          {
            y: 35,
            rotation: (i) => (i % 2 === 0 ? -2.5 : 2.5),
            opacity: 0,
            stagger: 0.14,
            duration: 0.6,
          },
          "-=0.35"
        )
        .from(
          `.${styles.paperSheet}:not(.${styles.factCard})`,
          {
            y: 35,
            rotation: (i) => (i % 2 === 0 ? 2 : -2),
            opacity: 0,
            stagger: 0.12,
            duration: 0.6,
          },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className={styles.caseStudy}>
      {/* Wood frame top nav bar */}
      <header className={styles.header}>
        <div className={styles.headerNav}>
          <Link href={`/${locale}/watch`}>← {c.back}</Link>
          <Link href={`/${locale}`} className={styles.roomBtn}>
            {c.room}
          </Link>
        </div>
        <div className={styles.dossierBadge}>
          {c.refNo}
          {projectIndex + 1}
        </div>
      </header>

      {/* Main Hero Dossier Sheet */}
      <section className={styles.heroSection}>
        <article className={styles.heroDossier}>
          <div className={styles.pushPinRed} aria-hidden="true" />
          <div className={styles.paperClip} aria-hidden="true" />
          <div className={styles.stampMark}>{c.stamp}</div>

          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h1>{project.title}</h1>
            <p className={styles.summary}>{project.summary[locale]}</p>
            <div className={styles.stackWrapper}>
              <span className={styles.stackLabel}>{c.stack}:</span>
              <ul className={styles.stackList} aria-label={c.stack}>
                {project.stack.map((item) => (
                  <li key={item} className={styles.techBadge}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <figure className={styles.photoFrame}>
            <div className={styles.photoTapeTL} aria-hidden="true" />
            <div className={styles.photoTapeTR} aria-hidden="true" />
            <Image
              src={project.image}
              alt={project.imageAlt[locale]}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 55vw"
            />
          </figure>
        </article>
      </section>

      {/* Pinned Fact Cards (Context & Contribution) */}
      <section className={styles.factGrid}>
        <article className={`${styles.factCard} ${styles.paperSheet}`}>
          <div className={styles.brassPin} aria-hidden="true" />
          <span className={styles.sheetIndex}>01 / CONTEXT & DOMAIN</span>
          <h2>{c.context}</h2>
          <p>{project.context[locale]}</p>
        </article>
        <article className={`${styles.factCard} ${styles.paperSheet}`}>
          <div className={styles.brassPin} aria-hidden="true" />
          <span className={styles.sheetIndex}>02 / CORE CONTRIBUTION</span>
          <h2>{c.contribution}</h2>
          <p>{project.contribution[locale]}</p>
        </article>
      </section>

      {/* Engineering System & Proof Dossier Cards */}
      <section className={styles.narrative}>
        <article className={styles.paperSheet}>
          <div className={styles.pushPinRed} aria-hidden="true" />
          <span className={styles.sheetIndex}>03 / SYSTEM ARCHITECTURE</span>
          <h2>{c.engineering}</h2>
          <p>{project.engineering[locale]}</p>
        </article>

        <article className={styles.paperSheet}>
          <div className={styles.brassPin} aria-hidden="true" />
          <span className={styles.sheetIndex}>04 / PROOF & EVIDENCE</span>
          <h2>{c.evidence}</h2>
          <p>{project.evidence[locale]}</p>
        </article>

        {/* Dark contrasting boundary card */}
        <aside className={`${styles.paperSheet} ${styles.boundaryCard}`}>
          <div className={styles.goldPin} aria-hidden="true" />
          <span className={styles.sheetIndex}>05 / HONEST BOUNDARY</span>
          <h2>{c.limitation}</h2>
          <p>{project.limitation[locale]}</p>
        </aside>
      </section>

      {/* Action Links Hub */}
      <section className={styles.actions}>
        <a
          className={styles.actionBtn}
          href={project.repository}
          target="_blank"
          rel="noreferrer"
        >
          {c.repository} <span aria-hidden="true">↗</span>
        </a>
        {project.demo && (
          <a
            className={styles.actionBtn}
            href={project.demo}
            target="_blank"
            rel="noreferrer"
          >
            {c.demo} <span aria-hidden="true">↗</span>
          </a>
        )}
      </section>

      {/* Next Project Pin Banner */}
      {nextProject && (
        <Link
          className={styles.nextProject}
          href={`/${locale}/projects/${nextProject.slug}`}
        >
          <div className={styles.nextCopy}>
            <span>{c.next}</span>
            <strong>{nextProject.shortTitle}</strong>
          </div>
          <span className={styles.nextArrow} aria-hidden="true">
            →
          </span>
        </Link>
      )}
    </main>
  );
}


