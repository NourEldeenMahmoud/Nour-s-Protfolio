"use client";

import type { Locale } from "@/i18n/routing";
import { desktopItems, applications } from "@/content/learn";
import { NavIcon, AppIcon } from "./learn-icons";
import styles from "./learn.module.css";

interface StartMenuProps {
  locale: Locale;
  onOpenFolder: (id: string, name: string) => void;
  onOpenFile: (id: string, name: string) => void;
  onOpenApp?: (appId: string, name: string) => void;
  onClose: () => void;
  copy: { title: string };
}

export function StartMenu({
  locale,
  onOpenFolder,
  onOpenFile,
  onOpenApp,
  onClose,
  copy,
}: StartMenuProps) {
  return (
    <div className={styles.startMenu} role="menu" aria-label={copy.title}>
      <p className={styles.startMenuTitle}>{copy.title}</p>
      {desktopItems.map((item) => (
        <button
          key={item.id}
          className={styles.startMenuItem}
          type="button"
          role="menuitem"
          onClick={() => {
            if (item.type === "folder") {
              onOpenFolder(item.id, item.name[locale]);
            } else {
              onOpenFile(item.id, item.name[locale]);
            }
            onClose();
          }}
        >
          <span className={styles.startMenuIcon}>
            <NavIcon id={item.id} />
          </span>
          {item.name[locale]}
        </button>
      ))}

      <div className={styles.startMenuDivider} role="separator" />

      <p className={styles.startMenuTitle}>Applications</p>
      {applications.map((app) => (
        <button
          key={app.id}
          className={styles.startMenuItem}
          type="button"
          role="menuitem"
          onClick={() => {
            onOpenApp?.(app.id, app.name);
            onClose();
          }}
        >
          <span className={styles.startMenuIcon}>
            <AppIcon app={app} size={20} />
          </span>
          {app.shortName ?? app.name}
        </button>
      ))}
    </div>
  );
}
