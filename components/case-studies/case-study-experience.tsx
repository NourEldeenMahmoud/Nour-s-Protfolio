"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type {
  CaseStudy,
  CaseStudyArchitecture,
  CaseStudyDecision,
  CaseStudyEvidence,
  LocalizedCaseStudyText,
} from "@/content/case-studies";
import { projects, type Project } from "@/content/portfolio";
import type { Locale } from "@/i18n/routing";
import styles from "./case-study-experience.module.css";

const copy = {
  en: {
    archive: "Pinboard archive / Engineering case study",
    file: "Investigation file",
    back: "Back to Pinboard",
    visual: "View Visual Exploration",
    repository: "Repository",
    demo: "Verified live demo",
    type: "Project type",
    team: "Working context",
    role: "Nour's role",
    stack: "Technology",
    index: "Case study index",
    context: "Context",
    problem: "Problem",
    investigation: "Investigation",
    decisions: "Decisions",
    solution: "Solution",
    features: "Features",
    challenges: "Challenges",
    quality: "Performance & safeguards",
    contribution: "My Contribution",
    outcome: "Outcome",
    evidence: "Related Evidence",
    constraints: "Operating constraints",
    affected: "Who was affected",
    decision: "Selected approach",
    alternatives: "Rejected / constrained alternatives",
    rationale: "Why this approach",
    tradeoff: "Trade-off",
    architecture: "System architecture",
    architectureFlow: "Architecture flow",
    implementation: "Implementation note",
    response: "Engineering response",
    delivered: "What was delivered",
    boundary: "Honest boundary",
    next: "Next consideration",
    verification: "Published evidence",
    previous: "Previous case study",
    nextCase: "Next case study",
    caseNavigation: "Case study navigation",
    exhibit: "Evidence exhibit",
  },
  ar: {
    archive: "أرشيف اللوحة / دراسة حالة هندسية",
    file: "ملف التحقيق",
    back: "العودة إلى لوحة المشاريع",
    visual: "عرض الاستكشاف البصري",
    repository: "المستودع",
    demo: "النسخة المنشورة المؤكدة",
    type: "نوع المشروع",
    team: "سياق العمل",
    role: "دور نور",
    stack: "التقنيات",
    index: "فهرس دراسة الحالة",
    context: "السياق",
    problem: "المشكلة",
    investigation: "التحقيق",
    decisions: "القرارات",
    solution: "الحل",
    features: "الخصائص",
    challenges: "التحديات",
    quality: "الأداء والحماية",
    contribution: "مساهمتي",
    outcome: "النتيجة",
    evidence: "الأدلة المرتبطة",
    constraints: "قيود التشغيل",
    affected: "من تأثر بالمشكلة",
    decision: "النهج المختار",
    alternatives: "البدائل المرفوضة أو المقيدة",
    rationale: "سبب الاختيار",
    tradeoff: "المقايضة",
    architecture: "بنية النظام",
    architectureFlow: "تدفق البنية",
    implementation: "ملاحظة التنفيذ",
    response: "الاستجابة الهندسية",
    delivered: "ما تم تسليمه",
    boundary: "الحدود الصريحة",
    next: "الخطوة التالية",
    verification: "الأدلة المنشورة",
    previous: "دراسة الحالة السابقة",
    nextCase: "دراسة الحالة التالية",
    caseNavigation: "التنقل بين دراسات الحالة",
    exhibit: "دليل المشروع",
  },
} as const;

type SectionDefinition = { id: string; label: string };

function localized(value: LocalizedCaseStudyText, locale: Locale) {
  return value[locale];
}

function SectionHeading({
  number,
  eyebrow,
  title,
}: {
  number: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <header className={styles.sectionHeading}>
      <span>{number}</span>
      <div>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
    </header>
  );
}

function EvidenceAsset({
  evidence,
  locale,
  priority = false,
}: {
  evidence: CaseStudyEvidence;
  locale: Locale;
  priority?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) video.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (evidence.type === "video") {
    return (
      <video
        ref={videoRef}
        controls
        muted
        playsInline
        preload="metadata"
        poster={evidence.poster}
        aria-label={localized(evidence.alt, locale)}
      >
        <source src={evidence.src} />
      </video>
    );
  }

  return (
    <Image
      src={evidence.src}
      alt={localized(evidence.alt, locale)}
      fill
      preload={priority}
      loading={priority ? undefined : "lazy"}
      sizes={
        priority
          ? "(max-width: 800px) 92vw, 50vw"
          : "(max-width: 800px) 92vw, 36vw"
      }
    />
  );
}

function DecisionCard({
  decision,
  locale,
  labels,
}: {
  decision: CaseStudyDecision;
  locale: Locale;
  labels: (typeof copy)[Locale];
}) {
  return (
    <article className={styles.decisionCard} data-reveal>
      <span className={styles.decisionStamp}>{labels.decision}</span>
      <h3>{localized(decision.title, locale)}</h3>
      <p className={styles.decisionLead}>
        {localized(decision.decision, locale)}
      </p>
      {decision.alternatives?.length ? (
        <div className={styles.alternatives}>
          <h4>{labels.alternatives}</h4>
          <ul>
            {decision.alternatives.map((alternative) => (
              <li key={alternative.en}>{localized(alternative, locale)}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <dl>
        <div>
          <dt>{labels.rationale}</dt>
          <dd>{localized(decision.rationale, locale)}</dd>
        </div>
        <div>
          <dt>{labels.tradeoff}</dt>
          <dd>{localized(decision.tradeoff, locale)}</dd>
        </div>
      </dl>
    </article>
  );
}

function ArchitectureMap({
  architecture,
  locale,
  flowLabel,
}: {
  architecture: CaseStudyArchitecture;
  locale: Locale;
  flowLabel: string;
}) {
  const nodeLabels = new Map(
    architecture.nodes.map((node) => [node.id, localized(node.label, locale)]),
  );

  return (
    <figure className={styles.architectureMap} data-reveal>
      <figcaption>{localized(architecture.summary, locale)}</figcaption>
      <div className={styles.architectureNodes}>
        {architecture.nodes.map((node, index) => (
          <article key={node.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{localized(node.label, locale)}</h3>
            <p>{localized(node.detail, locale)}</p>
          </article>
        ))}
      </div>
      <ol className={styles.architectureLinks} aria-label={flowLabel}>
        {architecture.links.map(([from, to]) => (
          <li key={`${from}-${to}`}>
            <span>{nodeLabels.get(from)}</span>
            <i aria-hidden="true" />
            <span>{nodeLabels.get(to)}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

import { useReducedMotion } from "@/hooks/use-reduced-motion";

function buildSections(study: CaseStudy, locale: Locale): SectionDefinition[] {
  const labels = copy[locale];
  return [
    { id: "context", label: labels.context },
    { id: "problem", label: labels.problem },
    { id: "investigation", label: labels.investigation },
    ...(study.decisions?.length
      ? [{ id: "decisions", label: labels.decisions }]
      : []),
    { id: "solution", label: labels.solution },
    { id: "features", label: labels.features },
    ...(study.challenges?.length
      ? [{ id: "challenges", label: labels.challenges }]
      : []),
    ...(study.quality?.length
      ? [{ id: "quality", label: labels.quality }]
      : []),
    { id: "contribution", label: labels.contribution },
    { id: "outcome", label: labels.outcome },
    ...(study.evidence.length
      ? [{ id: "evidence", label: labels.evidence }]
      : []),
  ];
}

export function CaseStudyExperience({
  locale,
  project,
  study,
}: {
  locale: Locale;
  project: Project;
  study: CaseStudy;
}) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("context");
  const labels = copy[locale];
  const sections = useMemo(() => buildSections(study, locale), [locale, study]);
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previous =
    projects[(projectIndex - 1 + projects.length) % projects.length]!;
  const next = projects[(projectIndex + 1) % projects.length]!;
  const coverEvidence = study.evidence[0]!;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-case-section]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -62%", threshold: [0.05, 0.25, 0.5] },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion)
      return;
    let context: gsap.Context | undefined;
    let cancelled = false;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        context = gsap.context(() => {
          gsap.from("[data-cover-layer]", {
            y: 26,
            rotate: (index) => (index - 1) * 0.8,
            autoAlpha: 0,
            duration: 0.65,
            stagger: 0.07,
            ease: "power3.out",
          });
          gsap.to("[data-progress-bar]", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.2,
            },
          });
          root
            .querySelectorAll<HTMLElement>("[data-reveal]")
            .forEach((element) => {
              gsap.from(element, {
                y: 22,
                autoAlpha: 0,
                duration: 0.55,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "clamp(top 88%)",
                  once: true,
                },
              });
            });
        }, root);
      },
    );
    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [reducedMotion]);

  return (
    <main ref={rootRef} className={styles.caseStudy}>
      <div className={styles.progress} aria-hidden="true">
        <span data-progress-bar />
      </div>
      <div className={styles.roomGlow} aria-hidden="true" />

      <section className={styles.cover} aria-labelledby="case-study-title">
        <div className={styles.coverBack} data-cover-layer aria-hidden="true" />
        <div className={styles.coverPaper} data-cover-layer>
          <header className={styles.coverTopbar}>
            <Link href={`/${locale}?focus=projects`}>
              <span aria-hidden="true">{locale === "ar" ? "→" : "←"}</span>
              {labels.back}
            </Link>
            <span>{labels.archive}</span>
          </header>
          <div className={styles.coverGrid}>
            <div className={styles.coverCopy}>
              <p className={styles.fileLabel}>
                {labels.file} / {project.slug.toUpperCase()}
              </p>
              <h1 id="case-study-title">{project.title}</h1>
              <p className={styles.coverSummary}>{project.summary[locale]}</p>
              <dl className={styles.coverFacts}>
                <div>
                  <dt>{labels.type}</dt>
                  <dd>{localized(study.projectType, locale)}</dd>
                </div>
                <div>
                  <dt>{labels.team}</dt>
                  <dd>{localized(study.teamContext, locale)}</dd>
                </div>
                <div>
                  <dt>{labels.role}</dt>
                  <dd>{localized(study.role, locale)}</dd>
                </div>
              </dl>
              <ul className={styles.stack} aria-label={labels.stack}>
                {project.stack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <div className={styles.coverActions}>
                <a href={project.repository} target="_blank" rel="noreferrer">
                  {labels.repository}
                  <span aria-hidden="true">↗</span>
                </a>
                {project.demo ? (
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    {labels.demo}
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
                <Link href={`/${locale}/projects/${project.slug}`}>
                  {labels.visual}
                  <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
                </Link>
              </div>
            </div>
            <figure className={styles.coverEvidence}>
              <div className={styles.pin} aria-hidden="true" />
              <div className={styles.coverImage}>
                <EvidenceAsset
                  evidence={coverEvidence}
                  locale={locale}
                  priority
                />
              </div>
              <figcaption>
                {localized(coverEvidence.caption, locale)}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <div className={styles.investigationLayout}>
        <nav className={styles.index} aria-label={labels.index}>
          <span>{labels.file}</span>
          <ol>
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={
                    activeSection === section.id ? "location" : undefined
                  }
                >
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className={styles.dossier}>
          <section
            id="context"
            data-case-section
            className={styles.paperSection}
          >
            <SectionHeading
              number="01"
              eyebrow={labels.archive}
              title={labels.context}
            />
            <div className={styles.contextGrid} data-reveal>
              <p className={styles.lead}>{project.context[locale]}</p>
              <dl>
                <div>
                  <dt>{labels.team}</dt>
                  <dd>{localized(study.teamContext, locale)}</dd>
                </div>
                <div>
                  <dt>{labels.role}</dt>
                  <dd>{localized(study.role, locale)}</dd>
                </div>
                <div>
                  <dt>{labels.affected}</dt>
                  <dd>{localized(study.audience, locale)}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section
            id="problem"
            data-case-section
            className={`${styles.paperSection} ${styles.problemSection}`}
          >
            <SectionHeading
              number="02"
              eyebrow="PROBLEM BRIEF"
              title={labels.problem}
            />
            <blockquote data-reveal>
              {localized(study.problem, locale)}
            </blockquote>
            <div className={styles.constraints} data-reveal>
              <h3>{labels.constraints}</h3>
              <ol>
                {study.constraints.map((constraint, index) => (
                  <li key={constraint.en}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {localized(constraint, locale)}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section
            id="investigation"
            data-case-section
            className={styles.paperSection}
          >
            <SectionHeading
              number="03"
              eyebrow="EVIDENCE / REASONING"
              title={labels.investigation}
            />
            <div className={styles.notePath}>
              {study.investigation.map((point, index) => (
                <article key={point.title.en} data-reveal>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{localized(point.title, locale)}</h3>
                  <p>{localized(point.detail, locale)}</p>
                </article>
              ))}
            </div>
          </section>

          {study.decisions?.length ? (
            <section
              id="decisions"
              data-case-section
              className={styles.paperSection}
            >
              <SectionHeading
                number="04"
                eyebrow="DECISION RECORD"
                title={labels.decisions}
              />
              <div className={styles.decisionGrid}>
                {study.decisions.map((decision) => (
                  <DecisionCard
                    key={decision.title.en}
                    decision={decision}
                    locale={locale}
                    labels={labels}
                  />
                ))}
              </div>
            </section>
          ) : null}

          <section
            id="solution"
            data-case-section
            className={styles.paperSection}
          >
            <SectionHeading
              number="05"
              eyebrow="SYSTEM MAP"
              title={labels.architecture}
            />
            <ArchitectureMap
              architecture={study.architecture}
              locale={locale}
              flowLabel={labels.architectureFlow}
            />
          </section>

          <section
            id="features"
            data-case-section
            className={styles.paperSection}
          >
            <SectionHeading
              number="06"
              eyebrow="IMPLEMENTATION FILES"
              title={labels.features}
            />
            <div className={styles.featureFiles}>
              {study.features.map((feature, index) => (
                <article key={feature.title.en} data-reveal>
                  <span>F-{String(index + 1).padStart(2, "0")}</span>
                  <h3>{localized(feature.title, locale)}</h3>
                  <p>{localized(feature.detail, locale)}</p>
                  <aside>
                    <b>{labels.implementation}</b>
                    {localized(feature.implementation, locale)}
                  </aside>
                </article>
              ))}
            </div>
          </section>

          {study.challenges?.length ? (
            <section
              id="challenges"
              data-case-section
              className={`${styles.paperSection} ${styles.challengeSection}`}
            >
              <SectionHeading
                number="07"
                eyebrow="DIAGNOSTIC NOTES"
                title={labels.challenges}
              />
              <div className={styles.challengeList}>
                {study.challenges.map((challenge, index) => (
                  <article key={challenge.title.en} data-reveal>
                    <div>
                      <span>ISSUE {String(index + 1).padStart(2, "0")}</span>
                      <h3>{localized(challenge.title, locale)}</h3>
                      <p>{localized(challenge.detail, locale)}</p>
                    </div>
                    <aside>
                      <span>{labels.response}</span>
                      <p>{localized(challenge.response, locale)}</p>
                    </aside>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {study.quality?.length ? (
            <section
              id="quality"
              data-case-section
              className={styles.paperSection}
            >
              <SectionHeading
                number="08"
                eyebrow="QUALITY GATES"
                title={labels.quality}
              />
              <div className={styles.qualityGrid}>
                {study.quality.map((point) => (
                  <article key={point.title.en} data-reveal>
                    <h3>{localized(point.title, locale)}</h3>
                    <p>{localized(point.detail, locale)}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section
            id="contribution"
            data-case-section
            className={styles.paperSection}
          >
            <SectionHeading
              number="09"
              eyebrow="OWNERSHIP RECORD"
              title={labels.contribution}
            />
            <div className={styles.contributionSheet} data-reveal>
              <span className={styles.ownerStamp}>NOUR / VERIFIED SCOPE</span>
              <p>{project.contribution[locale]}</p>
              <dl>
                <div>
                  <dt>{labels.team}</dt>
                  <dd>{localized(study.teamContext, locale)}</dd>
                </div>
                <div>
                  <dt>{labels.role}</dt>
                  <dd>{localized(study.role, locale)}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section
            id="outcome"
            data-case-section
            className={styles.paperSection}
          >
            <SectionHeading
              number="10"
              eyebrow="CLOSING RECORD"
              title={labels.outcome}
            />
            <div className={styles.outcomeGrid}>
              <article data-reveal>
                <span>{labels.delivered}</span>
                <p>{localized(study.outcome, locale)}</p>
              </article>
              <article data-reveal>
                <span>{labels.verification}</span>
                <p>{project.evidence[locale]}</p>
              </article>
              <article className={styles.boundary} data-reveal>
                <span>{labels.boundary}</span>
                <p>{project.limitation[locale]}</p>
              </article>
              {study.nextStep ? (
                <article data-reveal>
                  <span>{labels.next}</span>
                  <p>{localized(study.nextStep, locale)}</p>
                </article>
              ) : null}
            </div>
          </section>

          {study.evidence.length ? (
            <section
              id="evidence"
              data-case-section
              className={styles.paperSection}
            >
              <SectionHeading
                number="11"
                eyebrow="CURATED REPOSITORY MEDIA"
                title={labels.evidence}
              />
              <div className={styles.evidenceGrid}>
                {study.evidence.map((evidence, index) => (
                  <figure
                    key={evidence.src}
                    data-kind={evidence.kind}
                    data-portrait={evidence.portrait || undefined}
                    data-reveal
                  >
                    <div className={styles.evidenceMedia}>
                      <EvidenceAsset evidence={evidence} locale={locale} />
                    </div>
                    <figcaption>
                      <span>
                        {labels.exhibit} {String(index + 1).padStart(2, "0")}
                      </span>
                      {localized(evidence.caption, locale)}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </div>

      <footer className={styles.caseFooter}>
        <nav aria-label={labels.caseNavigation}>
          <Link href={`/${locale}/case-studies/${previous.slug}`}>
            <span>{labels.previous}</span>
            <strong>{previous.shortTitle}</strong>
          </Link>
          <Link href={`/${locale}/case-studies/${next.slug}`}>
            <span>{labels.nextCase}</span>
            <strong>{next.shortTitle}</strong>
          </Link>
        </nav>
        <div>
          <Link href={`/${locale}?focus=projects`}>{labels.back}</Link>
          <Link href={`/${locale}/projects/${project.slug}`}>
            {labels.visual}
          </Link>
        </div>
      </footer>
    </main>
  );
}
