"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getCaseStudy } from "@/content/case-studies";
import { getProjectMedia, type Project } from "@/content/portfolio";
import type { Locale } from "@/i18n/routing";
import styles from "./case-study-modal.module.css";

const copy = {
  en: {
    eyebrow: "Pinboard / Project overview",
    close: "Close project overview",
    file: "Project file",
    problem: "Problem statement",
    projectType: "Project type",
    workingMode: "Role / working model",
    technologies: "Core technologies",
    repository: "Repository",
    demo: "Live demo",
    details: "Project Details",
    preview: "Project preview",
    previous: "Previous project image",
    next: "Next project image",
    imageStatus: "Project image",
  },
  ar: {
    eyebrow: "لوحة المشاريع / نظرة عامة",
    close: "إغلاق نظرة المشروع",
    file: "ملف المشروع",
    problem: "بيان المشكلة",
    projectType: "نوع المشروع",
    workingMode: "الدور / أسلوب العمل",
    technologies: "التقنيات الأساسية",
    repository: "المستودع",
    demo: "النسخة المنشورة",
    details: "تفاصيل المشروع",
    preview: "معاينة المشروع",
    previous: "صورة المشروع السابقة",
    next: "صورة المشروع التالية",
    imageStatus: "صورة المشروع",
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
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const labels = copy[locale];
  const study = getCaseStudy(project.slug)!;
  const media = getProjectMedia(project)
    .filter((mediaItem) => mediaItem.type === "image")
    .slice(0, 4);
  const activeMedia = media[activeMediaIndex]!;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
  }, []);

  function showMedia(offset: number) {
    setActiveMediaIndex(
      (current) => (current + offset + media.length) % media.length,
    );
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="project-overview-title"
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
          <p>{labels.eyebrow}</p>
          <span className={styles.fileNumber}>
            {labels.file} / {project.slug.toUpperCase()}
          </span>
          <button
            type="button"
            aria-label={labels.close}
            autoFocus
            onClick={() => dialogRef.current?.close()}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className={styles.overview}>
          <section className={styles.mediaStage} aria-label={labels.preview}>
            <figure>
              <Image
                key={activeMedia.id}
                src={activeMedia.src}
                alt={activeMedia.alt[locale]}
                fill
                preload={activeMediaIndex === 0}
                sizes="(max-width: 760px) 94vw, 60vw"
              />
              <figcaption>
                <span>
                  {labels.imageStatus} {activeMediaIndex + 1} / {media.length}
                </span>
                {activeMedia.caption?.[locale] ?? activeMedia.alt[locale]}
              </figcaption>
            </figure>

            {media.length > 1 && (
              <div className={styles.mediaControls}>
                <button
                  type="button"
                  aria-label={labels.previous}
                  onClick={() => showMedia(-1)}
                >
                  <span aria-hidden="true">{locale === "ar" ? "→" : "←"}</span>
                </button>
                <div className={styles.mediaIndex} aria-hidden="true">
                  {media.map((mediaItem, index) => (
                    <span
                      key={mediaItem.id}
                      data-active={index === activeMediaIndex || undefined}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  aria-label={labels.next}
                  onClick={() => showMedia(1)}
                >
                  <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
                </button>
              </div>
            )}
          </section>

          <section className={styles.projectOverview}>
            <div className={styles.actions}>
              <Link
                className={styles.primaryAction}
                href={`/${locale}/case-studies/${project.slug}`}
              >
                {labels.details}
                <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
              </Link>
              <div className={styles.secondaryActions}>
                <a href={project.repository} target="_blank" rel="noreferrer">
                  {labels.repository} <span aria-hidden="true">↗</span>
                </a>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    {labels.demo} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>

            <p className={styles.kicker}>{labels.file}</p>
            <h2 id="project-overview-title">{project.title}</h2>
            <p className={styles.summary}>{project.summary[locale]}</p>

            <aside className={styles.problem}>
              <span>{labels.problem}</span>
              <p>{study.problem[locale]}</p>
            </aside>

            <dl className={styles.projectFacts}>
              <div>
                <dt>{labels.projectType}</dt>
                <dd>{study.projectType[locale]}</dd>
              </div>
              <div>
                <dt>{labels.workingMode}</dt>
                <dd>{study.teamContext[locale]}</dd>
              </div>
            </dl>

            <div className={styles.technologies}>
              <h3>{labels.technologies}</h3>
              <ul aria-label={labels.technologies}>
                {project.stack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </article>
    </dialog>
  );
}
