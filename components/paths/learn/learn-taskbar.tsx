"use client";

import type { Locale } from "@/i18n/routing";
import type { WindowState } from "./use-learn-windows";
import { useTime } from "./use-learn-windows";
import { SearchIcon } from "./learn-icons";
import styles from "./learn.module.css";

interface LearnTaskbarProps {
  locale: Locale;
  windows: WindowState[];
  activeWindowId: string | null;
  onFocusWindow: (id: string) => void;
  onOpenStart: () => void;
  onStartOpen: boolean;
  onOpenSearch: () => void;
  onReturnToRoom: () => void;
  onSwitchLocale: () => void;
  copy: {
    start: string;
    search: string;
    fileExplorer: string;
    returnToRoom: string;
    language: string;
  };
}

export function LearnTaskbar({
  locale,
  windows,
  activeWindowId,
  onFocusWindow,
  onOpenStart,
  onStartOpen,
  onOpenSearch,
  onReturnToRoom,
  onSwitchLocale,
  copy,
}: LearnTaskbarProps) {
  const { hours, minutes, date, mounted } = useTime();

  return (
    <div className={styles.taskbar} role="toolbar" aria-label="Taskbar">
      <button
        className={styles.taskbarStart}
        type="button"
        aria-label={copy.start}
        aria-expanded={onStartOpen}
        onClick={onOpenStart}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 12V6.75l9-1.25L21 6.75V12l-9-1.25L3 12zM3 13l9 1.25L21 13v5.25l-9-1.25L3 18.25V13z" />
        </svg>
      </button>

      <button
        className={styles.taskbarSearch}
        type="button"
        aria-label={copy.search}
        onClick={onOpenSearch}
      >
        <SearchIcon />
      </button>

      <button
        className={styles.taskbarApp}
        type="button"
        aria-current={windows.some((w) => w.type === "explorer") ? "true" : undefined}
        onClick={() => {
          const explorer = windows.find((w) => w.type === "explorer");
          if (explorer) onFocusWindow(explorer.id);
        }}
      >
        <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M6 12C6 9.79 7.79 8 10 8H18L22 12H38C40.21 12 42 13.79 42 16V36C42 38.21 40.21 40 38 40H10C7.79 40 6 38.21 6 36V12Z" fill="#FFB900" />
          <path d="M6 16H42V36C42 38.21 40.21 40 38 40H10C7.79 40 6 38.21 6 36V16Z" fill="#E6A700" />
        </svg>
      </button>

      <div className={styles.taskbarApps}>
        {windows
          .filter((w) => w.type === "document")
          .map((w) => (
            <button
              key={w.id}
              className={styles.taskbarApp}
              type="button"
              aria-current={w.id === activeWindowId ? "true" : undefined}
              onClick={() => onFocusWindow(w.id)}
            >
              <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M10 6H28L34 12H38C40.21 12 42 13.79 42 16V38C42 40.21 40.21 42 38 42H10C7.79 42 6 40.21 6 38V10C6 7.79 7.79 6 10 6Z" fill="#4A90D9" />
                <path d="M6 16H42V38C42 40.21 40.21 42 38 42H10C7.79 42 6 40.21 6 38V16Z" fill="#4A90D9" />
                <rect x="14" y="24" width="20" height="2" rx="1" fill="white" opacity="0.4" />
                <rect x="14" y="29" width="14" height="2" rx="1" fill="white" opacity="0.4" />
              </svg>
            </button>
          ))}
      </div>

      <button
        className={styles.taskbarReturn}
        type="button"
        aria-label={copy.returnToRoom}
        onClick={onReturnToRoom}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>

      <div className={styles.taskbarRight}>
        <button
          className={styles.taskbarLang}
          type="button"
          aria-label={copy.language}
          onClick={onSwitchLocale}
        >
          {locale === "en" ? "عربي" : "EN"}
        </button>
        {mounted && (
          <div className={styles.taskbarTime}>
            <span>{hours} {minutes}</span>
            <span style={{ fontSize: "0.68rem", opacity: 0.7 }}>{date}</span>
          </div>
        )}
      </div>
    </div>
  );
}
