"use client";

import { useCallback, useEffect, useRef, useState, type JSX } from "react";
import type { FeaturedWidget } from "@/content/learn";
import { WidgetCard } from "./widget-card";
import styles from "./learn.module.css";

interface WidgetFeaturedProps {
  widget: FeaturedWidget;
  onOpen: (folderId?: string, fileId?: string) => void;
}

const VARIANT_ICONS: Record<string, JSX.Element> = {
  note: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  workflow: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  learning: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
};

export function WidgetFeatured({ widget, onOpen }: WidgetFeaturedProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const items = widget.items;
  const current = items[activeIndex];

  const cycleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (isPaused) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    intervalRef.current = setInterval(cycleNext, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, cycleNext]);

  const handleOpen = useCallback(() => {
    if (current) onOpen(current.openFolderId, current.openFileId);
  }, [current, onOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleOpen();
      }
    },
    [handleOpen],
  );

  const handleDotClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleArrowClick = useCallback(
    (e: React.MouseEvent, direction: "prev" | "next") => {
      e.stopPropagation();
      if (direction === "prev") {
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
      } else {
        cycleNext();
      }
    },
    [items.length, cycleNext],
  );

  if (!current) return null;

  return (
    <WidgetCard
      variant="featured"
      role="button"
      tabIndex={0}
      aria-label={widget.title}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className={styles.widgetFeaturedHeader}>
        <span className={styles.widgetFeaturedIcon}>
          {VARIANT_ICONS[current.variant]}
        </span>
        <span className={styles.widgetFeaturedLabel}>{widget.title}</span>
      </div>

      <div className={styles.widgetFeaturedContent}>
        <h4 className={styles.widgetFeaturedTitle}>{current.title}</h4>
        <p className={styles.widgetFeaturedDescription}>{current.description}</p>
        {current.stepCount && (
          <span className={styles.widgetFeaturedStepCount}>
            {current.stepCount} steps
          </span>
        )}
      </div>

      <div className={styles.widgetFeaturedNav}>
        <div className={styles.widgetFeaturedDots}>
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.widgetFeaturedDot} ${i === activeIndex ? styles.widgetFeaturedDotActive : ""}`}
              aria-label={`Show ${item.title}`}
              onClick={(e) => { e.stopPropagation(); handleDotClick(i); }}
            />
          ))}
        </div>
        <div className={styles.widgetFeaturedArrows}>
          <button
            type="button"
            className={styles.widgetFeaturedArrow}
            aria-label="Previous item"
            onClick={(e) => handleArrowClick(e, "prev")}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.widgetFeaturedArrow}
            aria-label="Next item"
            onClick={(e) => handleArrowClick(e, "next")}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </WidgetCard>
  );
}
