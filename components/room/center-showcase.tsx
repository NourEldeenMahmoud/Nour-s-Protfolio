"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { getProject } from "@/content/portfolio";
import { categories, type CategoryId } from "@/content/project-showcase";
import type { Locale } from "@/i18n/routing";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  ProjectMediaPlayer,
  type ProjectMediaPlayerCopy,
} from "./project-media-player";
import styles from "./center-showcase.module.css";

export type ShowcaseCopy = ProjectMediaPlayerCopy & {
  categoriesLabel: string;
  projectCount: string;
  emptyState: string;
};

type SlideDirection = "next" | "prev";

const PANEL_ID = "showcase-panel";

export function CenterShowcase({
  locale,
  copy,
  activeCategoryId: controlledCategoryId,
  onCategoryChange,
  onCategoryHover,
  onCategoryFocus,
}: {
  locale: Locale;
  copy: ShowcaseCopy;
  activeCategoryId?: CategoryId;
  onCategoryChange?: (id: CategoryId) => void;
  onCategoryHover?: (id: CategoryId | null) => void;
  onCategoryFocus?: (id: CategoryId | null) => void;
}) {
  const [internalCategoryId, setInternalCategoryId] =
    useState<CategoryId>("web");
  const activeCategoryId = controlledCategoryId ?? internalCategoryId;
  const [projectIndex, setProjectIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>("next");
  const screenRef = useRef<HTMLDivElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<gsap.Context | null>(null);
  const reducedMotion = useReducedMotion();
  const isRtl = locale === "ar";

  const activeCategory = useMemo(
    () => categories.find((category) => category.id === activeCategoryId)!,
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
  const hasMultipleProjects = projects.length > 1;

  const switchCategory = useCallback(
    (id: CategoryId) => {
      if (id === activeCategoryId) return;
      setSlideDirection("next");
      onCategoryChange?.(id);
      if (!controlledCategoryId) setInternalCategoryId(id);
      setProjectIndex(0);
    },
    [activeCategoryId, controlledCategoryId, onCategoryChange],
  );

  const goToProject = useCallback(
    (direction: SlideDirection) => {
      if (!hasMultipleProjects) return;
      setSlideDirection(direction);
      setProjectIndex((index) =>
        direction === "next"
          ? (index + 1) % projects.length
          : (index - 1 + projects.length) % projects.length,
      );
    },
    [hasMultipleProjects, projects.length],
  );

  function handleTabKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const tabs =
      tablistRef.current?.querySelectorAll<HTMLElement>('[role="tab"]');
    if (!tabs) return;

    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      const forward = event.key === "ArrowRight" ? !isRtl : isRtl;
      nextIndex = forward
        ? (index + 1) % tabs.length
        : (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    tabs[nextIndex]?.focus();
    tabs[nextIndex]?.click();
  }

  useLayoutEffect(() => {
    if (!screenRef.current) return;
    let cancelled = false;

    void import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      contextRef.current = gsap.context(() => {
        if (reducedMotion)
          return;
        gsap.fromTo(
          screenRef.current!,
          { autoAlpha: 0.2, x: slideDirection === "next" ? 22 : -22 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.48,
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
  }, [activeCategoryId, projectIndex, reducedMotion, slideDirection]);

  const previousProject = hasMultipleProjects
    ? projects[(projectIndex - 1 + projects.length) % projects.length]
    : undefined;
  const nextProject = hasMultipleProjects
    ? projects[(projectIndex + 1) % projects.length]
    : undefined;

  return (
    <div className={styles.showcase} data-testid="center-showcase">
      <div
        ref={tablistRef}
        className={styles.tabs}
        role="tablist"
        aria-label={copy.categoriesLabel}
      >
        {categories.map((category, index) => {
          const isActive = category.id === activeCategoryId;
          return (
            <button
              key={category.id}
              role="tab"
              data-category-icon-control="true"
              id={`tab-${category.id}`}
              aria-selected={isActive}
              aria-controls={PANEL_ID}
              className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
              onClick={() => switchCategory(category.id)}
              onPointerEnter={() => onCategoryHover?.(category.id)}
              onPointerLeave={() => onCategoryHover?.(null)}
              onFocus={() => onCategoryFocus?.(category.id)}
              onBlur={() => onCategoryFocus?.(null)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span className={styles.tabLabel}>{category.label[locale]}</span>
            </button>
          );
        })}
      </div>

      <div
        ref={screenRef}
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={`tab-${activeCategoryId}`}
        className={styles.screen}
        data-testid="showcase-screen"
      >
        {currentProject ? (
          <ProjectMediaPlayer
            key={currentProject.slug}
            project={currentProject}
            locale={locale}
            categoryLabel={activeCategory.label[locale]}
            copy={copy}
            detailHref={`/${locale}/projects/${currentProject.slug}`}
            projectCount={projects.length}
            projectPosition={projectIndex + 1}
            previousProjectTitle={previousProject?.shortTitle}
            nextProjectTitle={nextProject?.shortTitle}
            onPreviousProject={
              hasMultipleProjects ? () => goToProject("prev") : undefined
            }
            onNextProject={
              hasMultipleProjects ? () => goToProject("next") : undefined
            }
          />
        ) : (
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
    </div>
  );
}
