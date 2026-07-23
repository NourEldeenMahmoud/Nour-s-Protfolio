import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/routing";
import { projects, type Project } from "@/content/portfolio";
import styles from "./case-study.module.css";

const copy = {
  en: {
    eyebrow: "SOFTWARE CASE STUDY",
    back: "All case studies",
    room: "Return to room",
    context: "Context",
    contribution: "Contribution",
    engineering: "Engineering shape",
    evidence: "Available evidence",
    limitation: "Honest boundary",
    stack: "Technology",
    repository: "Open repository",
    demo: "Open verified demo",
    next: "Next case study",
  },
  ar: {
    eyebrow: "دراسة حالة برمجية",
    back: "كل دراسات الحالة",
    room: "العودة إلى الغرفة",
    context: "السياق",
    contribution: "المساهمة",
    engineering: "الشكل الهندسي",
    evidence: "الأدلة المتاحة",
    limitation: "الحدود الصريحة",
    stack: "التقنيات",
    repository: "افتح المستودع",
    demo: "افتح النسخة المؤكدة",
    next: "دراسة الحالة التالية",
  },
} as const;

export function CaseStudy({
  locale,
  project,
}: {
  locale: Locale;
  project: Project;
}) {
  const c = copy[locale];
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject =
    projects[(projectIndex + 1) % projects.length] ?? projects[0];

  return (
    <main className={styles.caseStudy}>
      <header className={styles.header}>
        <Link href={`/${locale}/watch`}>← {c.back}</Link>
        <Link href={`/${locale}`}>{c.room}</Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p>{c.eyebrow}</p>
          <h1>{project.title}</h1>
          <p>{project.summary[locale]}</p>
          <ul aria-label={c.stack}>
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <figure>
          <Image
            src={project.image}
            alt={project.imageAlt[locale]}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
          />
        </figure>
      </section>

      <section className={styles.factGrid}>
        <article>
          <span>01</span>
          <h2>{c.context}</h2>
          <p>{project.context[locale]}</p>
        </article>
        <article>
          <span>02</span>
          <h2>{c.contribution}</h2>
          <p>{project.contribution[locale]}</p>
        </article>
      </section>

      <section className={styles.narrative}>
        <article>
          <p>03 / SYSTEM</p>
          <h2>{c.engineering}</h2>
          <p>{project.engineering[locale]}</p>
        </article>
        <article>
          <p>04 / PROOF</p>
          <h2>{c.evidence}</h2>
          <p>{project.evidence[locale]}</p>
        </article>
        <aside>
          <p>05 / LIMIT</p>
          <h2>{c.limitation}</h2>
          <p>{project.limitation[locale]}</p>
        </aside>
      </section>

      <section className={styles.actions}>
        <a href={project.repository} target="_blank" rel="noreferrer">
          {c.repository} <span aria-hidden="true">↗</span>
        </a>
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer">
            {c.demo} <span aria-hidden="true">↗</span>
          </a>
        )}
      </section>

      {nextProject && (
        <Link
          className={styles.nextProject}
          href={`/${locale}/projects/${nextProject.slug}`}
        >
          <span>{c.next}</span>
          <strong>{nextProject.shortTitle}</strong>
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </main>
  );
}
