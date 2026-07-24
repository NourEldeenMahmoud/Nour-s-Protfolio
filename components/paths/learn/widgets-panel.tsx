"use client";

import type { ReactElement } from "react";
import { widgets } from "@/content/learn";
import styles from "./learn.module.css";

const variantIcons: Record<string, ReactElement> = {
  identity: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.42 3.58-8 8-8s8 3.58 8 8" />
    </svg>
  ),
  learning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  note: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  workflow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  focus: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
};

export function WidgetsPanel() {
  return (
    <div className={styles.widgetsPanel} aria-label="Widgets">
      {widgets.map((widget) => (
        <div
          key={widget.id}
          className={styles.widget}
          data-variant={widget.variant}
        >
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
                  <span className={styles.widgetBullet} data-variant={widget.variant} />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
