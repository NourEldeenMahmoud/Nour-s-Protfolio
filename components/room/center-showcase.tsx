"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/routing";
import { getProject } from "@/content/portfolio";
import {
  buildMediaItems,
  categories,
  type CategoryId,
  type MediaItem,
} from "@/content/project-showcase";
import styles from "./center-showcase.module.css";

export type ShowcaseCopy = {
  categoriesLabel: string;
  previousProject: string;
  nextProject: string;
  previousMedia: string;
  nextMedia: string;
  mediaSlides: string;
  projectCount: string;
  viewDetails: string;
  mediaUnavailable: string;
  emptyState: string;
};

type SlideDirection = "next" | "prev";

/**
 * Resolves the localized project count string.
 * Falls back to "X of Y" plain text if pattern contains no placeholders.
 */
function resolveProjectCount(
  pattern: string,
  current: number,
  total: number,
): string {
  return pattern
    .replace("{current}", String(current))
    .replace("{total}", String(total));
}

/** Stable panel ID shared by all category tabs. */
const PANEL_ID = "showcase-panel";

export function CenterShowcase({
  locale,
  copy,
  activeCategoryId: controlledCategoryId,
  onCategoryChange,
}: {
  locale: Locale;
  copy: ShowcaseCopy;
  /** Controlled category — if provided, overrides internal state. */
  activeCategoryId?: CategoryId;
  /** Called when the user selects a different category tab. */
  onCategoryChange?: (id: CategoryId) => void;
}) {
  const [internalCategoryId, setInternalCategoryId] =
    useState<CategoryId>("web");
  const activeCategoryId = controlledCategoryId ?? internalCategoryId;
  const [projectIndex, setProjectIndex] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [slideDir, setSlideDir] = useState<SlideDirection>("next");
  const liveRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  /* ── Derived state ── */

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === activeCategoryId)!,
    [activeCategoryId],
  );

  const projects = useMemo(
    () =>
      activeCategory.projectSlugs
        .map((slug) => getProject(slug))
        .filter(Boolean) as NonNullable<ReturnType<typeof getProject>>[],
    [activeCategory],
  );

  const currentProject = projects[projectIndex] ?? null;

  const mediaItems: MediaItem[] = useMemo(() => {
    if (!currentProject) return [];
    return buildMediaItems(currentProject);
  }, [currentProject]);

  const currentMedia = mediaItems[mediaIndex] ?? null;

  const hasProjects = projects.length > 0;
  const hasMultipleProjects = projects.length > 1;
  const hasMultipleMedia = mediaItems.length > 1;

  /* ── Media failure tracking ── */

  const [failedMediaKeys, setFailedMediaKeys] = useState<Set<string>>(
    () => new Set(),
  );

  const mediaKey = `${currentProject?.slug ?? ""}:${mediaIndex}`;
  const isCurrentMediaFailed = failedMediaKeys.has(mediaKey);

  const markMediaFailed = useCallback((key: string) => {
    setFailedMediaKeys((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);

  /* ── Category switch ── */

  const switchCategory = useCallback(
    (id: CategoryId) => {
      if (id === activeCategoryId) return;
      setSlideDir("next");
      onCategoryChange?.(id);
      if (!controlledCategoryId) {
        setInternalCategoryId(id);
      }
      setProjectIndex(0);
      setMediaIndex(0);
    },
    [activeCategoryId, controlledCategoryId, onCategoryChange],
  );

  /* ── Project navigation ── */

  const goToProject = useCallback(
    (dir: SlideDirection) => {
      if (!hasMultipleProjects) return;
      setSlideDir(dir);
      setMediaIndex(0);
      setProjectIndex((prev) => {
        if (dir === "next") return (prev + 1) % projects.length;
        return (prev - 1 + projects.length) % projects.length;
      });
    },
    [hasMultipleProjects, projects.length],
  );

  /* ── Media navigation ── */

  const goToMedia = useCallback(
    (dir: SlideDirection) => {
      if (!hasMultipleMedia) return;
      setSlideDir(dir);
      setMediaIndex((prev) => {
        if (dir === "next") return (prev + 1) % mediaItems.length;
        return (prev - 1 + mediaItems.length) % mediaItems.length;
      });
    },
    [hasMultipleMedia, mediaItems.length],
  );

  /* ── Keyboard for category tabs (tablist pattern) ── */

  const tablistRef = useRef<HTMLDivElement>(null);

  const isRtl = locale === "ar";

  function handleTabKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const tabs =
      tablistRef.current?.querySelectorAll<HTMLElement>('[role="tab"]');
    if (!tabs) return;
    const count = tabs.length;

    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      // LTR: Right moves forward. RTL: Right (visual) moves to previous logical.
      const forward = event.key === "ArrowRight" ? !isRtl : isRtl;
      nextIndex = forward ? (index + 1) % count : (index - 1 + count) % count;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = count - 1;
    } else {
      return;
    }
    event.preventDefault();
    tabs[nextIndex]?.focus();
    tabs[nextIndex]?.click();
  }

  /* ── RTL arrow icon mapping ── */

  const prevArrow = isRtl ? "\u25B6" : "\u25C0";
  const nextArrow = isRtl ? "\u25C0" : "\u25B6";

  /* ── GSAP screen transition ── */

  useLayoutEffect(() => {
    if (!screenRef.current) return;

    let cancelled = false;
    void import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      contextRef.current = gsap.context(() => {
        const prefersReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        if (prefersReduced) return;

        const slideX = slideDir === "next" ? 18 : -18;
        gsap.fromTo(
          screenRef.current!,
          { autoAlpha: 0.3, x: slideX },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.36,
            ease: "power3.out",
            overwrite: true,
          },
        );
      });
    });

    return () => {
      cancelled = true;
      contextRef.current?.revert();
      contextRef.current = null;
    };
  }, [activeCategoryId, projectIndex, mediaIndex, slideDir]);

  /* ── Detail route ── */

  const detailHref = currentProject
    ? `/${locale}/projects/${currentProject.slug}`
    : undefined;

  return (
    <div className={styles.showcase} data-testid="center-showcase">
      {/* Category tabs — aligned over the five physical pedestals */}
      <div
        ref={tablistRef}
        className={styles.tabs}
        role="tablist"
        aria-label={copy.categoriesLabel}
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeCategoryId;
          return (
            <button
              key={cat.id}
              role="tab"
              id={`tab-${cat.id}`}
              aria-selected={isActive}
              aria-controls={PANEL_ID}
              tabIndex={isActive ? 0 : -1}
              className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
              onClick={() => switchCategory(cat.id)}
              onKeyDown={(e) => {
                const idx = categories.findIndex((c) => c.id === cat.id);
                handleTabKeyDown(e, idx);
              }}
            >
              <span className={styles.tabLabel}>{cat.label[locale]}</span>
            </button>
          );
        })}
      </div>

      {/* Screen area — content panel */}
      <div
        ref={screenRef}
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={`tab-${activeCategoryId}`}
        className={styles.screen}
        data-testid="showcase-screen"
      >
        {hasProjects && currentProject ? (
          <>
            {/* Category badge — compact kicker linked to active tab */}
            <div
              className={styles.categoryBadge}
              id={`badge-${activeCategoryId}`}
              aria-hidden="true"
            >
              {activeCategory.label[locale]}
            </div>

            {/* Media */}
            <div className={styles.mediaArea}>
              {isCurrentMediaFailed ? (
                <div className={styles.mediaFallback}>
                  <span className={styles.mediaFallbackText}>
                    {copy.mediaUnavailable}
                  </span>
                </div>
              ) : currentMedia?.type === "image" ? (
                <Image
                  key={mediaKey}
                  className={styles.mediaImage}
                  src={currentMedia.src}
                  alt={currentMedia.alt[locale]}
                  fill
                  sizes="(max-width: 780px) 100vw, 47vw"
                  priority
                  onError={() => markMediaFailed(mediaKey)}
                />
              ) : /* Video: required by user specification for future video media. */
              currentMedia?.type === "video" ? (
                <video
                  key={mediaKey}
                  className={styles.mediaVideo}
                  src={currentMedia.src}
                  poster={currentMedia.poster}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={currentMedia.alt[locale]}
                  onError={() => markMediaFailed(mediaKey)}
                />
              ) : (
                <div className={styles.mediaFallback} aria-hidden="true" />
              )}

              {/* Media dots */}
              {hasMultipleMedia && (
                <div
                  className={styles.mediaDots}
                  role="group"
                  aria-label={copy.mediaSlides}
                >
                  {mediaItems.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`${styles.dot} ${i === mediaIndex ? styles.dotActive : ""}`}
                      aria-label={`${i + 1}`}
                      aria-current={i === mediaIndex ? "true" : undefined}
                      onClick={() => {
                        setSlideDir(i > mediaIndex ? "next" : "prev");
                        setMediaIndex(i);
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Media arrows (inside screen) */}
              {hasMultipleMedia && (
                <>
                  <button
                    type="button"
                    className={`${styles.screenArrow} ${styles.screenArrowPrev}`}
                    aria-label={copy.previousMedia}
                    onClick={() => goToMedia("prev")}
                  >
                    {prevArrow}
                  </button>
                  <button
                    type="button"
                    className={`${styles.screenArrow} ${styles.screenArrowNext}`}
                    aria-label={copy.nextMedia}
                    onClick={() => goToMedia("next")}
                  >
                    {nextArrow}
                  </button>
                </>
              )}
            </div>

            {/* Info bar at bottom of screen */}
            <div className={styles.infoBar}>
              <div className={styles.infoText}>
                <h3 className={styles.projectTitle}>{currentProject.title}</h3>
                <p className={styles.projectSummary}>
                  {currentProject.summary[locale]}
                </p>
                <ul className={styles.tags} aria-label="Stack">
                  {currentProject.stack.slice(0, 3).map((t) => (
                    <li key={t} className={styles.tag}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              {detailHref && (
                <Link href={detailHref} className={styles.detailsLink}>
                  {copy.viewDetails}
                </Link>
              )}
            </div>

            {/* Mobile project navigation — visible only on small viewports */}
            {hasMultipleProjects && (
              <div className={styles.mobileProjectNav}>
                <button
                  type="button"
                  className={styles.mobileProjectBtn}
                  aria-label={copy.previousProject}
                  onClick={() => goToProject("prev")}
                >
                  <span aria-hidden="true">{prevArrow}</span>
                </button>
                <p className={styles.mobileProjectCounter}>
                  {resolveProjectCount(
                    copy.projectCount,
                    projectIndex + 1,
                    projects.length,
                  )}
                </p>
                <button
                  type="button"
                  className={styles.mobileProjectBtn}
                  aria-label={copy.nextProject}
                  onClick={() => goToProject("next")}
                >
                  <span aria-hidden="true">{nextArrow}</span>
                </button>
              </div>
            )}

            {/* Desktop project counter (inside screen, bottom-right) */}
            {hasMultipleProjects && (
              <p className={styles.projectCounterDesktop}>
                {resolveProjectCount(
                  copy.projectCount,
                  projectIndex + 1,
                  projects.length,
                )}
              </p>
            )}
          </>
        ) : (
          /* Empty state for Game/Bots */
          <div className={styles.emptyState}>
            <p className={styles.emptyCategory}>
              {activeCategory.label[locale]}
            </p>
            <p className={styles.emptyMessage}>
              {activeCategory.emptyCopy?.[locale] ?? copy.emptyState}
            </p>
          </div>
        )}
      </div>

      {/* Project navigation arrows — aligned over physical circular arrow housings
          The housings are baked into the Blender render and do not move for RTL.
          Direction symbols and labels flip for RTL, but position percentages stay
          fixed to match the rendered geometry. */}
      {hasMultipleProjects && (
        <>
          <button
            type="button"
            className={`${styles.projectArrow} ${styles.projectArrowPrev}`}
            aria-label={copy.previousProject}
            onClick={() => goToProject("prev")}
          >
            <span aria-hidden="true">{prevArrow}</span>
          </button>
          <button
            type="button"
            className={`${styles.projectArrow} ${styles.projectArrowNext}`}
            aria-label={copy.nextProject}
            onClick={() => goToProject("next")}
          >
            <span aria-hidden="true">{nextArrow}</span>
          </button>
        </>
      )}

      {/* Live region for screen reader status */}
      <div
        ref={liveRef}
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {currentProject
          ? `${activeCategory.label[locale]}: ${currentProject.title}`
          : activeCategory.label[locale]}
      </div>
    </div>
  );
}
