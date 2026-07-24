"use client";

import { useCallback, type ReactElement } from "react";
import type { Widget } from "@/content/learn";
import { LearnWidgetTile } from "./learn-widget-tile";
import styles from "./learn.module.css";

interface LearnWidgetProps {
  widget: Widget;
  onOpen: (folderId?: string, fileId?: string) => void;
}

const variantIcons: Record<string, ReactElement> = {
  identity: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.42 3.58-8 8-8s8 3.58 8 8" />
    </svg>
  ),
  learning: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
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
  focus: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
};

export function LearnWidget({ widget, onOpen }: LearnWidgetProps) {
  const handleClick = useCallback(() => {
    onOpen(widget.openFolderId, widget.openFileId);
  }, [onOpen, widget.openFolderId, widget.openFileId]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  const layoutClass =
    widget.layout === "large"
      ? styles.widgetLarge
      : widget.layout === "wide"
        ? styles.widgetWide
        : styles.widgetSmall;

  return (
    <div
      className={`${styles.widget} ${layoutClass}`}
      data-variant={widget.variant}
      data-layout={widget.layout}
      role="button"
      tabIndex={0}
      aria-label={widget.title}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {widget.layout === "large" ? (
        <div className={styles.widgetLargeInner}>
          <div className={styles.widgetLargeHeader}>
            <span className={styles.widgetIcon} data-variant={widget.variant}>
              {variantIcons[widget.variant ?? "identity"]}
            </span>
            <div className={styles.widgetLargeTitleGroup}>
              <h3 className={styles.widgetTitle}>{widget.title}</h3>
              {widget.subtitle && (
                <span className={styles.widgetSubtitle}>{widget.subtitle}</span>
              )}
            </div>
          </div>
          <p className={styles.widgetContent}>{widget.content}</p>
          {widget.tiles && widget.tiles.length > 0 && (
            <div className={styles.widgetTiles}>
              {widget.tiles.map((tile) => (
                <LearnWidgetTile
                  key={tile.label}
                  label={tile.label}
                  value={tile.value}
                />
              ))}
            </div>
          )}
          {widget.footer && (
            <span className={styles.widgetFooter}>{widget.footer}</span>
          )}
        </div>
      ) : (
        <>
          <div className={styles.widgetHeader}>
            <span className={styles.widgetIcon} data-variant={widget.variant}>
              {variantIcons[widget.variant ?? "identity"]}
            </span>
            <h3 className={styles.widgetTitle}>{widget.title}</h3>
          </div>
          <p className={styles.widgetContent}>{widget.content}</p>
          {widget.items && widget.items.length > 0 && (
            <ul className={styles.widgetList}>
              {widget.items.map((item, i) => (
                <li key={i} className={styles.widgetListItem}>
                  <span
                    className={styles.widgetBullet}
                    data-variant={widget.variant}
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}
          {widget.focusItems && widget.focusItems.length > 0 && (
            <div className={styles.widgetFocusChips}>
              {widget.focusItems.map((item) => (
                <span key={item} className={styles.widgetFocusChip}>
                  {item}
                </span>
              ))}
            </div>
          )}
          {widget.stepCount && (
            <span className={styles.widgetStepCount}>
              {widget.stepCount} steps
            </span>
          )}
          {widget.actionLabel && (
            <span className={styles.widgetAction}>{widget.actionLabel}</span>
          )}
        </>
      )}
    </div>
  );
}
