"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import {
  getProjectDetailMedia,
  getProjectHeroMedia,
  projects,
  type Project,
  type ProjectMedia,
} from "@/content/portfolio";
import { hasCaseStudy } from "@/content/case-studies";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Locale } from "@/i18n/routing";
import styles from "./project-experience.module.css";

const copy = {
  en: {
    back: "Back to Explore",
    repository: "View repository",
    demo: "Open live product",
    caseStudy: "View Technical Case Study",
    category: "Product world",
    role: "Nour's role",
    context: "Project context",
    stack: "Built with",
    overview: "Overview",
    experience: "Experience",
    highlights: "Highlights",
    work: "My Work",
    gallery: "Gallery",
    behind: "Behind the Product",
    storyEyebrow: "The product, at a glance",
    storyTitle: "A useful product, experienced as a complete journey.",
    experienceEyebrow: "Explore the product",
    experienceTitle: "Move through the experience",
    experienceHint: "Choose a view",
    featureEyebrow: "Product highlights",
    featureTitle: "The moments that make it substantial",
    contributionEyebrow: "Nour's contribution",
    contributionTitle: "Work connected to the product you can see",
    teamNote:
      "The verified project context and ownership boundaries are preserved.",
    galleryEyebrow: "Project archive",
    galleryTitle: "Inspect the product up close",
    galleryDescription: "Open any view for a focused, full-screen inspection.",
    allMedia: "All views",
    mediaGroups: { overview: "Overview", product: "Product" },
    view: "Open media viewer",
    previousMedia: "Previous media",
    nextMedia: "Next media",
    closeViewer: "Close media viewer",
    item: "View",
    technicalTitle: "How the product is put together",
    technicalIntro:
      "Optional technical context, translated into the product decisions it supports.",
    engineering: "How it works",
    evidence: "Available evidence",
    boundaries: "What is not claimed",
    endingEyebrow: "End of project world",
    endingTitle: "One product. A complete, inspectable body of work.",
    return: "Return to Explore",
    previousProject: "Previous project",
    nextProject: "Next project",
    navLabel: "Project exploration zones",
    mediaStatus: "Showing media",
  },
  ar: {
    back: "العودة إلى الاستكشاف",
    repository: "عرض المستودع",
    demo: "فتح المنتج المنشور",
    caseStudy: "عرض دراسة الحالة التقنية",
    category: "عالم المنتج",
    role: "دور نور",
    context: "سياق المشروع",
    stack: "بُني باستخدام",
    overview: "نظرة عامة",
    experience: "التجربة",
    highlights: "أبرز المزايا",
    work: "عملي",
    gallery: "المعرض",
    behind: "خلف المنتج",
    storyEyebrow: "المنتج في لمحة",
    storyTitle: "منتج مفيد يظهر كتجربة متكاملة.",
    experienceEyebrow: "استكشف المنتج",
    experienceTitle: "تنقّل داخل التجربة",
    experienceHint: "اختر مشهداً",
    featureEyebrow: "أبرز لحظات المنتج",
    featureTitle: "التفاصيل التي تمنح المنتج قيمته",
    contributionEyebrow: "مساهمة نور",
    contributionTitle: "عمل مرتبط مباشرة بالمنتج الذي تراه",
    teamNote: "يحتفظ العرض بسياق المشروع وحدود الملكية المؤكدة.",
    galleryEyebrow: "أرشيف المشروع",
    galleryTitle: "تفقّد المنتج عن قرب",
    galleryDescription: "افتح أي مشهد لمعاينته بوضوح وفي مساحة كاملة.",
    allMedia: "كل المشاهد",
    mediaGroups: { overview: "نظرة عامة", product: "المنتج" },
    view: "فتح عارض الوسائط",
    previousMedia: "الوسائط السابقة",
    nextMedia: "الوسائط التالية",
    closeViewer: "إغلاق عارض الوسائط",
    item: "مشهد",
    technicalTitle: "كيف يعمل المنتج من الداخل",
    technicalIntro: "سياق تقني اختياري يشرح القرارات من خلال أثرها على المنتج.",
    engineering: "كيف يعمل",
    evidence: "الأدلة المتاحة",
    boundaries: "ما لا يدّعيه المشروع",
    endingEyebrow: "نهاية عالم المشروع",
    endingTitle: "منتج واحد، وعمل متكامل يمكن استكشافه.",
    return: "العودة إلى الاستكشاف",
    previousProject: "المشروع السابق",
    nextProject: "المشروع التالي",
    navLabel: "مناطق استكشاف المشروع",
    mediaStatus: "الوسائط المعروضة",
  },
} as const;

const categoryMap: Record<string, Record<Locale, string>> = {
  buildsense: { en: "Web product", ar: "منتج ويب" },
  bookify: { en: "Hotel reservation", ar: "حجز الفنادق" },
  cinemaverse: { en: "Cinema booking", ar: "حجز السينما" },
  "frontend-mini-projects": { en: "Landing pages collection", ar: "مجموعة صفحات هبوط" },
  "how-to-train-your-ai": { en: "Unity narrative game", ar: "لعبة Unity سردية" },
  "sharp-shooter": { en: "Unity FPS game", ar: "لعبة تصويب Unity" },
  "royal-run": { en: "Unity endless runner", ar: "لعبة ركض لانهائي Unity" },
  "galaxy-strike": { en: "Unity space shooter", ar: "لعبة إطلاق نار فضائية Unity" },
  "rocket-boost": { en: "Unity physics platformer", ar: "لعبة منصات فيزياء Unity" },
  "blood-bank-desktop": { en: "Desktop operations", ar: "عمليات مكتبية" },
  dvld: { en: "Desktop system", ar: "نظام مكتبي" },
  "blood-bank-mobile": { en: "Mobile experience", ar: "تجربة موبايل" },
  "met-summaries": { en: "Academic notes collection", ar: "مجموعة ملاحظات أكاديمية" },
};

function getKindCopy(kind: "product" | "game" | "collection", locale: Locale) {
  if (locale === "ar") {
    switch (kind) {
      case "game":
        return {
          category: "عالم اللعبة",
          storyEyebrow: "اللعبة بلمحة",
          storyTitle: "لعبة تفاعلية ممتعة تظهر كتجربة متكاملة.",
          experienceEyebrow: "استكشف التجربة",
          featureEyebrow: "أبرز أساليب اللعب",
          behind: "خلف كواليس اللعبة",
          technicalTitle: "كيف بُنيت اللعبة من الداخل",
          endingEyebrow: "نهاية عالم اللعبة",
          endingTitle: "لعبة واحدة، وعالم متكامل يمكن استكشافه.",
          mediaGroups: { overview: "نظرة عامة", product: "طريقة اللعب" },
        };
      case "collection":
        return {
          category: "مجموعة معرفية",
          storyEyebrow: "المجموعة بلمحة",
          storyTitle: "مجموعة منظمة كمرجع تفاعلي متكامل.",
          experienceEyebrow: "استكشف المجموعة",
          featureEyebrow: "المواضيع وأبرز النقاط",
          behind: "خلف كواليس المجموعة",
          technicalTitle: "كيف هُيكلت المجموعة من الداخل",
          endingEyebrow: "نهاية المجموعة",
          endingTitle: "مجموعة واحدة، ومرجع متكامل يمكن استكشافه.",
          mediaGroups: { overview: "نظرة عامة", product: "المحتوى" },
        };
      case "product":
      default:
        return {
          category: "عالم المنتج",
          storyEyebrow: "المنتج بلمحة",
          storyTitle: "منتج مفيد يظهر كتجربة متكاملة.",
          experienceEyebrow: "استكشف المنتج",
          featureEyebrow: "أبرز مزايا المنتج",
          behind: "خلف كواليس المنتج",
          technicalTitle: "كيف يعمل المنتج من الداخل",
          endingEyebrow: "نهاية عالم المشروع",
          endingTitle: "منتج واحد، وعمل متكامل يمكن استكشافه.",
          mediaGroups: { overview: "نظرة عامة", product: "المنتج" },
        };
    }
  }

  switch (kind) {
    case "game":
      return {
        category: "Game world",
        storyEyebrow: "The game, at a glance",
        storyTitle: "An interactive game, experienced as a complete journey.",
        experienceEyebrow: "Explore the experience",
        featureEyebrow: "Gameplay highlights",
        behind: "Behind the game",
        technicalTitle: "How the game is put together",
        endingEyebrow: "End of game world",
        endingTitle: "One game. A complete, inspectable experience.",
        mediaGroups: { overview: "Overview", product: "Gameplay" },
      };
    case "collection":
      return {
        category: "Knowledge collection",
        storyEyebrow: "The collection, at a glance",
        storyTitle: "A structured collection, presented as an interactive reference.",
        experienceEyebrow: "Explore the collection",
        featureEyebrow: "Subjects and highlights",
        behind: "Behind the collection",
        technicalTitle: "How the collection is structured",
        endingEyebrow: "End of collection",
        endingTitle: "One collection. A complete, inspectable reference.",
        mediaGroups: { overview: "Overview", product: "Collection" },
      };
    case "product":
    default:
      return {
        category: "Product world",
        storyEyebrow: "The product, at a glance",
        storyTitle: "A useful product, experienced as a complete journey.",
        experienceEyebrow: "Explore the product",
        featureEyebrow: "Product highlights",
        behind: "Behind the product",
        technicalTitle: "How the product is put together",
        endingEyebrow: "End of project world",
        endingTitle: "One product. A complete, inspectable body of work.",
        mediaGroups: { overview: "Overview", product: "Product" },
      };
  }
}

function ProjectVisual({
  media,
  locale,
  priority = false,
  sizes = "100vw",
}: {
  media: ProjectMedia;
  locale: Locale;
  priority?: boolean;
  sizes?: string;
}) {
  const reducedMotion = useReducedMotion();
  const style = { objectPosition: media.focalPosition } as CSSProperties;

  if (media.type === "video") {
    return (
      <video
        className={styles.visualAsset}
        controls
        muted
        playsInline
        preload="metadata"
        poster={media.poster}
        aria-label={media.alt[locale]}
      >
        <source src={media.src} />
      </video>
    );
  }

  const source = reducedMotion && media.poster ? media.poster : media.src;
  const animated = media.src.toLowerCase().endsWith(".gif");

  const image = (
    <Image
      src={source}
      alt={media.alt[locale]}
      fill
      priority={priority}
      loading={priority ? undefined : "lazy"}
      sizes={sizes}
      unoptimized={animated}
      className={styles.visualAsset}
      style={style}
    />
  );

  if (!animated || !media.poster) return image;

  return (
    <picture>
      <source media="(prefers-reduced-motion: reduce)" srcSet={media.poster} />
      {image}
    </picture>
  );
}

export function ProjectExperience({
  locale,
  project,
}: {
  locale: Locale;
  project: Project;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerStart = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const media = getProjectDetailMedia(project);
  const [activeSection, setActiveSection] = useState("overview");
  const [activeExperience, setActiveExperience] = useState(0);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [activeGroup, setActiveGroup] = useState("all");
  const baseCopy = copy[locale];
  const kindCopy = getKindCopy(project.kind, locale);
  const c = { ...baseCopy, ...kindCopy };
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previous =
    projects[(projectIndex - 1 + projects.length) % projects.length]!;
  const next = projects[(projectIndex + 1) % projects.length]!;
  const heroMedia = getProjectHeroMedia(project);
  const activeMedia = media[activeExperience]!;
  const contributionMedia = media[Math.min(1, media.length - 1)]!;
  const supportingMedia = media
    .filter((mediaItem) => mediaItem.id !== heroMedia.id)
    .slice(0, 2);
  const mediaGroups = Array.from(
    new Set(media.map((mediaItem) => mediaItem.group).filter(Boolean)),
  ) as string[];
  const galleryMedia =
    activeGroup === "all"
      ? media
      : media.filter((mediaItem) => mediaItem.group === activeGroup);
  const sections = [
    ["overview", c.overview],
    ["experience", c.experience],
    ["highlights", c.highlights],
    ["work", c.work],
    ["gallery", c.gallery],
    ["behind", c.behind],
  ] as const;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion || process.env.NODE_ENV === "test") return;
    let context: { revert: () => void } | undefined;
    let cancelled = false;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || process.env.NODE_ENV === "test") return;
        gsap.registerPlugin(ScrollTrigger);
        context = gsap.context(() => {
          gsap.fromTo(
            `.${styles.scrollProgressBar}`,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.15,
              },
            },
          );

          root
            .querySelectorAll<HTMLElement>("[data-reveal]")
            .forEach((element) => {
              gsap.from(element, {
                y: 76,
                autoAlpha: 0,
                filter: "blur(8px)",
                clipPath: "inset(0 0 14% 0)",
                duration: 1.05,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 86%",
                  once: true,
                },
              });
            });

          root
            .querySelectorAll<HTMLElement>(`.${styles.highlightScene}`)
            .forEach((scene, index) => {
              const mediaElement = scene.querySelector(
                `.${styles.highlightMedia}`,
              );
              const copyElement = scene.querySelector(
                `.${styles.highlightCopy}`,
              );
              const direction = index % 2 === 0 ? -1 : 1;
              gsap.from(mediaElement, {
                x: direction * 110,
                clipPath:
                  direction < 0 ? "inset(0 0 0 22%)" : "inset(0 22% 0 0)",
                duration: 1.15,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: scene,
                  start: "top 82%",
                  once: true,
                },
              });
              gsap.from(copyElement, {
                x: direction * -54,
                autoAlpha: 0,
                duration: 0.9,
                delay: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: scene,
                  start: "top 82%",
                  once: true,
                },
              });
            });

          gsap.from(`.${styles.gallerySlide}`, {
            y: 90,
            autoAlpha: 0,
            stagger: 0.12,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: `.${styles.galleryRail}`,
              start: "top 84%",
              once: true,
            },
          });
        }, root);
      },
    );

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -62%", threshold: [0.01, 0.2, 0.5] },
    );
    root
      .querySelectorAll("section[id]")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (viewerIndex === null) {
      if (dialog?.open) dialog.close();
      return;
    }
    if (dialog && !dialog.open) dialog.showModal();
  }, [viewerIndex]);

  const showMedia = (index: number) =>
    setViewerIndex((index + media.length) % media.length);
  const handleViewerKey = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight")
      showMedia((viewerIndex ?? 0) + (locale === "ar" ? -1 : 1));
    if (event.key === "ArrowLeft")
      showMedia((viewerIndex ?? 0) + (locale === "ar" ? 1 : -1));
  };
  const handleTilt = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--tilt-x", `${-y * 2.2}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${x * 2.8}deg`);
    event.currentTarget.style.setProperty("--light-x", `${(x + 0.5) * 100}%`);
  };

  return (
    <main ref={rootRef} className={styles.experience}>
      <div className={styles.scrollProgress} aria-hidden="true">
        <span className={styles.scrollProgressBar} />
      </div>
      <div className={styles.ambientLight} aria-hidden="true" />

      <section
        id="overview"
        className={styles.hero}
        aria-labelledby="project-title"
      >
        <div className={styles.heroTopbar}>
          <Link
            href={`/${locale}?focus=exploration`}
            className={styles.backLink}
          >
            <span aria-hidden="true">{locale === "ar" ? "→" : "←"}</span>{" "}
            {c.back}
          </Link>
          <span>{categoryMap[project.slug]?.[locale] ?? c.category}</span>
        </div>

        <div className={styles.heroComposition}>
          <div
            className={styles.monitorAperture}
            data-device={heroMedia.device}
            onPointerMove={handleTilt}
            onPointerLeave={(event) => {
              event.currentTarget.style.removeProperty("--tilt-x");
              event.currentTarget.style.removeProperty("--tilt-y");
            }}
          >
            <div className={styles.monitorChrome} aria-hidden="true">
              <span />
              <span />
            </div>
            <div className={styles.heroVisual}>
              <ProjectVisual
                media={heroMedia}
                locale={locale}
                priority
                sizes="(max-width: 800px) 94vw, 76vw"
              />
            </div>
            <div className={styles.screenReflection} aria-hidden="true" />
          </div>

          {supportingMedia.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={styles.supportingFrame}
              data-position={index}
              onClick={() => showMedia(index + 1)}
              aria-label={`${c.view}: ${item.alt[locale]}`}
            >
              <ProjectVisual
                media={item}
                locale={locale}
                sizes="(max-width: 800px) 38vw, 22vw"
              />
            </button>
          ))}

          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              {categoryMap[project.slug]?.[locale]}
            </p>
            <h1 id="project-title">{project.title}</h1>
            <p className={styles.heroSummary}>{project.summary[locale]}</p>
            <div className={styles.heroFacts}>
              <div>
                <span>{c.context}</span>
                <p>{project.context[locale]}</p>
              </div>
              <div>
                <span>{c.role}</span>
                <p>{project.contribution[locale]}</p>
              </div>
            </div>
            <div className={styles.heroActions}>
              <a href={project.repository} target="_blank" rel="noreferrer">
                {c.repository} <span aria-hidden="true">↗</span>
              </a>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer">
                  {c.demo} <span aria-hidden="true">↗</span>
                </a>
              )}
              {hasCaseStudy(project.slug) && (
                <Link href={`/${locale}/case-studies/${project.slug}`}>
                  {c.caseStudy}{" "}
                  <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <nav className={styles.zoneNav} aria-label={c.navLabel}>
        <div className={styles.zoneNavInner}>
          {sections.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? "location" : undefined}
            >
              <span aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section
        className={styles.story}
        data-reveal
        aria-labelledby="story-title"
      >
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{c.storyEyebrow}</p>
          <h2 id="story-title">{c.storyTitle}</h2>
        </div>
        <p className={styles.storyLead}>{project.summary[locale]}</p>
        <div className={styles.storyLine} aria-hidden="true">
          <span />
        </div>
        <p className={styles.storyContext}>{project.context[locale]}</p>
      </section>

      <section
        id="experience"
        className={styles.productExplorer}
        aria-labelledby="experience-title"
      >
        <div className={styles.explorerHeading} data-reveal>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{c.experienceEyebrow}</p>
            <h2 id="experience-title">{c.experienceTitle}</h2>
          </div>
          <span>{c.experienceHint}</span>
        </div>
        <div className={styles.explorerLayout}>
          <div
            className={styles.experienceTabs}
            role="tablist"
            aria-label={c.experienceTitle}
          >
            {media.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`experience-tab-${index}`}
                aria-selected={activeExperience === index}
                aria-controls="experience-panel"
                tabIndex={activeExperience === index ? 0 : -1}
                onClick={() => setActiveExperience(index)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft")
                    return;
                  event.preventDefault();
                  const direction = event.key === "ArrowRight" ? 1 : -1;
                  const target =
                    (index + direction + media.length) % media.length;
                  setActiveExperience(target);
                  document.getElementById(`experience-tab-${target}`)?.focus();
                }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.caption?.[locale] ?? item.alt[locale]}</strong>
              </button>
            ))}
          </div>
          <div
            id="experience-panel"
            role="tabpanel"
            aria-labelledby={`experience-tab-${activeExperience}`}
            className={styles.experienceStage}
            data-device={activeMedia.device}
            onClick={() => showMedia(activeExperience)}
          >
            <div className={styles.stageMedia} key={activeMedia.id}>
              <ProjectVisual
                media={activeMedia}
                locale={locale}
                sizes="(max-width: 900px) 94vw, 72vw"
              />
            </div>
            <div className={styles.stageCaption}>
              <span>
                {String(activeExperience + 1).padStart(2, "0")} /{" "}
                {String(media.length).padStart(2, "0")}
              </span>
              <p>{activeMedia.caption?.[locale] ?? project.summary[locale]}</p>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showMedia(activeExperience);
                }}
              >
                {c.view} <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {project.highlights?.length ? (
        <section
          id="highlights"
          className={styles.highlights}
          aria-labelledby="highlights-title"
        >
          <div className={styles.sectionHeading} data-reveal>
            <p className={styles.eyebrow}>{c.featureEyebrow}</p>
            <h2 id="highlights-title">{c.featureTitle}</h2>
          </div>
          <div className={styles.highlightScenes}>
            {project.highlights.map((highlight, index) => {
              const item = media[index % media.length]!;
              return (
                <article
                  key={highlight}
                  className={styles.highlightScene}
                  data-layout={index % 2}
                  data-reveal
                >
                  <button
                    type="button"
                    className={styles.highlightMedia}
                    onClick={() => showMedia(index % media.length)}
                    aria-label={`${c.view}: ${item.alt[locale]}`}
                  >
                    <span>
                      <ProjectVisual
                        media={item}
                        locale={locale}
                        sizes="(max-width: 900px) 94vw, 62vw"
                      />
                    </span>
                    <i aria-hidden="true">↗</i>
                  </button>
                  <div className={styles.highlightCopy}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.caption?.[locale] ?? item.alt[locale]}</h3>
                    <p>
                      {locale === "ar"
                        ? [
                            project.summary.ar,
                            project.context.ar,
                            project.evidence.ar,
                            project.engineering.ar,
                          ][index]
                        : highlight}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      <section
        id="work"
        className={styles.contribution}
        aria-labelledby="contribution-title"
      >
        <div className={styles.contributionCopy} data-reveal>
          <p className={styles.eyebrow}>{c.contributionEyebrow}</p>
          <h2 id="contribution-title">{c.contributionTitle}</h2>
          <p>{project.contribution[locale]}</p>
          <small>{c.teamNote}</small>
        </div>
        <button
          type="button"
          className={styles.contributionMedia}
          onClick={() => showMedia(Math.min(1, media.length - 1))}
          aria-label={`${c.view}: ${contributionMedia.alt[locale]}`}
          data-reveal
        >
          <ProjectVisual
            media={contributionMedia}
            locale={locale}
            sizes="(max-width: 900px) 94vw, 54vw"
          />
          <span>
            {c.view} <i aria-hidden="true">↗</i>
          </span>
        </button>
      </section>

      <section
        id="gallery"
        className={styles.gallery}
        aria-labelledby="gallery-title"
      >
        <div className={styles.galleryHeader} data-reveal>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{c.galleryEyebrow}</p>
            <h2 id="gallery-title">{c.galleryTitle}</h2>
          </div>
          <p>{c.galleryDescription}</p>
        </div>
        {mediaGroups.length > 1 && (
          <div className={styles.galleryFilters} aria-label={c.galleryTitle}>
            {["all", ...mediaGroups].map((group) => (
              <button
                key={group}
                type="button"
                aria-pressed={activeGroup === group}
                onClick={() => setActiveGroup(group)}
              >
                {group === "all"
                  ? c.allMedia
                  : (c.mediaGroups[group as keyof typeof c.mediaGroups] ??
                    group)}
              </button>
            ))}
          </div>
        )}
        <div className={styles.galleryRail} aria-label={c.galleryTitle}>
          {galleryMedia.map((item) => {
            const index = media.findIndex(
              (mediaItem) => mediaItem.id === item.id,
            );
            return (
              <button
                key={item.id}
                type="button"
                className={styles.gallerySlide}
                data-orientation={item.orientation}
                onClick={() => showMedia(index)}
                aria-label={`${c.item} ${index + 1}: ${item.alt[locale]}`}
              >
                <span className={styles.galleryImage}>
                  <ProjectVisual
                    media={item}
                    locale={locale}
                    sizes="(max-width: 700px) 82vw, 64vw"
                  />
                </span>
                <span className={styles.galleryMeta}>
                  <b>
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(media.length).padStart(2, "0")}
                  </b>
                  <span>{item.caption?.[locale] ?? item.alt[locale]}</span>
                  <i aria-hidden="true">↗</i>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        id="behind"
        className={styles.technical}
        aria-labelledby="technical-title"
      >
        <div className={styles.technicalIntro} data-reveal>
          <p className={styles.eyebrow}>{c.behind}</p>
          <h2 id="technical-title">{c.technicalTitle}</h2>
          <p>{c.technicalIntro}</p>
        </div>
        <details className={styles.technicalDetails} data-reveal>
          <summary>
            {c.engineering}
            <span aria-hidden="true">+</span>
          </summary>
          <div className={styles.technicalBody}>
            <p>{project.engineering[locale]}</p>
            <ul aria-label={c.stack}>
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </details>
        <details className={styles.technicalDetails} data-reveal>
          <summary>
            {c.evidence}
            <span aria-hidden="true">+</span>
          </summary>
          <div className={styles.technicalBody}>
            <p>{project.evidence[locale]}</p>
          </div>
        </details>
        <details className={styles.technicalDetails} data-reveal>
          <summary>
            {c.boundaries}
            <span aria-hidden="true">+</span>
          </summary>
          <div className={styles.technicalBody}>
            <p>{project.limitation[locale]}</p>
          </div>
        </details>
      </section>

      <section className={styles.ending} aria-labelledby="ending-title">
        <div className={styles.endingMedia} aria-hidden="true">
          {media.slice(0, 3).map((item, index) => (
            <span key={item.id} data-ending-position={index}>
              <ProjectVisual media={item} locale={locale} sizes="40vw" />
            </span>
          ))}
        </div>
        <div className={styles.endingCopy} data-reveal>
          <p className={styles.eyebrow}>{c.endingEyebrow}</p>
          <h2 id="ending-title">{c.endingTitle}</h2>
          <p>{project.summary[locale]}</p>
          <ul aria-label={c.stack}>
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <div className={styles.endingActions}>
            <a href={project.repository} target="_blank" rel="noreferrer">
              {c.repository} <span aria-hidden="true">↗</span>
            </a>
            {hasCaseStudy(project.slug) && (
              <Link href={`/${locale}/case-studies/${project.slug}`}>
                {c.caseStudy}{" "}
                <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
              </Link>
            )}
            <Link href={`/${locale}?focus=exploration`}>
              {c.return}{" "}
              <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
            </Link>
          </div>
        </div>
      </section>

      <nav className={styles.projectNav} aria-label="Project navigation">
        <Link href={`/${locale}/projects/${previous.slug}`}>
          <span>{c.previousProject}</span>
          <strong>{previous.shortTitle}</strong>
        </Link>
        <Link href={`/${locale}/projects/${next.slug}`}>
          <span>{c.nextProject}</span>
          <strong>{next.shortTitle}</strong>
        </Link>
      </nav>

      <dialog
        ref={dialogRef}
        className={styles.viewer}
        aria-label={c.galleryTitle}
        onClose={() => setViewerIndex(null)}
        onCancel={() => setViewerIndex(null)}
        onKeyDown={handleViewerKey}
        onPointerDown={(event) => {
          pointerStart.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (pointerStart.current === null || viewerIndex === null) return;
          const distance = event.clientX - pointerStart.current;
          if (Math.abs(distance) > 55)
            showMedia(viewerIndex + (distance < 0 ? 1 : -1));
          pointerStart.current = null;
        }}
      >
        {viewerIndex !== null && (
          <div className={styles.viewerInner}>
            <div className={styles.viewerTopbar}>
              <span aria-live="polite">
                {c.mediaStatus} {viewerIndex + 1} / {media.length}
              </span>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label={c.closeViewer}
              >
                ×
              </button>
            </div>
            <div className={styles.viewerMedia}>
              <ProjectVisual
                media={media[viewerIndex]!}
                locale={locale}
                sizes="96vw"
              />
            </div>
            <div className={styles.viewerFooter}>
              <button
                type="button"
                onClick={() => showMedia(viewerIndex - 1)}
                aria-label={c.previousMedia}
              >
                {locale === "ar" ? "→" : "←"}
              </button>
              <p>
                {media[viewerIndex]!.caption?.[locale] ??
                  media[viewerIndex]!.alt[locale]}
              </p>
              <button
                type="button"
                onClick={() => showMedia(viewerIndex + 1)}
                aria-label={c.nextMedia}
              >
                {locale === "ar" ? "←" : "→"}
              </button>
            </div>
          </div>
        )}
      </dialog>
    </main>
  );
}
