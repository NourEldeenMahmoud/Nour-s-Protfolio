"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Project } from "@/content/portfolio";
import type { Locale } from "@/i18n/routing";
import styles from "./case-study-modal.module.css";

const copy = {
  en: {
    eyebrow: "Room archive / Case study",
    close: "Close case study",
    context: "Context",
    contribution: "Contribution",
    engineering: "Engineering shape",
    evidence: "Available evidence",
    limitation: "Honest boundary",
    stack: "Technology",
    repository: "Repository",
    demo: "Verified demo",
    details: "Project Details",
    gallery: "Repository image index",
    highlights: "Repository field notes",
  },
  ar: {
    eyebrow: "أرشيف الغرفة / دراسة حالة",
    close: "إغلاق دراسة الحالة",
    context: "السياق",
    contribution: "المساهمة",
    engineering: "الشكل الهندسي",
    evidence: "الأدلة المتاحة",
    limitation: "الحدود الصريحة",
    stack: "التقنيات",
    repository: "المستودع",
    demo: "النسخة المؤكدة",
    details: "تفاصيل المشروع",
    gallery: "فهرس صور المستودع",
    highlights: "ملاحظات موثقة من المستودع",
  },
} as const;

export function CaseStudyModal({
  locale,
  project,
  onClose,
}: {
  locale: Locale;
  project: Project;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const c = copy[locale];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="case-study-modal-title"
      onCancel={(event) => {
        event.preventDefault();
        event.currentTarget.close();
      }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <article className={styles.modal}>
        <div className={styles.binding} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <header className={styles.header}>
          <p>{c.eyebrow}</p>
          <span className={styles.fileNumber}>
            FILE / {project.slug.toUpperCase()}
          </span>
          <button
            type="button"
            aria-label={c.close}
            autoFocus
            onClick={() => dialogRef.current?.close()}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span>CASE / {project.slug.toUpperCase()}</span>
            <h2 id="case-study-modal-title">{project.title}</h2>
            <p>{project.summary[locale]}</p>
            <ul aria-label={c.stack}>
              {project.stack.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            <div className={styles.heroActions}>
              <a href={project.repository} target="_blank" rel="noreferrer">
                {c.repository} <span aria-hidden="true">↗</span>
              </a>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer">
                  {c.demo} <span aria-hidden="true">↗</span>
                </a>
              )}
              <Link href={`/${locale}/case-studies/${project.slug}`}>
                {c.details}{" "}
                <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
              </Link>
            </div>
          </div>
          <div className={styles.heroMedia}>
            <figure className={styles.primaryPhoto}>
              <Image
                src={project.image}
                alt={project.imageAlt[locale]}
                fill
                sizes="(max-width: 760px) 88vw, 48vw"
              />
              <figcaption>{project.shortTitle} / PRIMARY EVIDENCE</figcaption>
            </figure>
            {project.gallery?.map((item) => (
              <figure className={styles.secondaryPhoto} key={item.src}>
                <Image
                  src={item.src}
                  alt={item.alt[locale]}
                  fill
                  sizes="(max-width: 760px) 70vw, 32vw"
                />
                <figcaption>{item.alt[locale]}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {project.highlights && (
          <section className={styles.highlights} aria-labelledby="case-highlights-title">
            <div className={styles.highlightsHeading}>
              <span>REPOSITORY / FIELD NOTES</span>
              <h3 id="case-highlights-title">{c.highlights}</h3>
            </div>
            <ul>
              {project.highlights.map((highlight, index) => (
                <li key={highlight}>
                  <span>0{index + 1}</span>
                  <p>{highlight}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className={styles.facts}>
          <article>
            <span>01</span>
            <h3>{c.context}</h3>
            <p>{project.context[locale]}</p>
          </article>
          <article>
            <span>02</span>
            <h3>{c.contribution}</h3>
            <p>{project.contribution[locale]}</p>
          </article>
          <article>
            <span>03</span>
            <h3>{c.engineering}</h3>
            <p>{project.engineering[locale]}</p>
          </article>
          <article>
            <span>04</span>
            <h3>{c.evidence}</h3>
            <p>{project.evidence[locale]}</p>
          </article>
          <aside>
            <span>05 / LIMIT</span>
            <h3>{c.limitation}</h3>
            <p>{project.limitation[locale]}</p>
          </aside>
        </section>

      </article>
    </dialog>
  );
}
