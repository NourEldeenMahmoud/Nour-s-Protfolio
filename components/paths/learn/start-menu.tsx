"use client";

import type { Locale } from "@/i18n/routing";
import { desktopFolders, applications } from "@/content/learn";
import { NavIcon, AppIcon } from "./learn-icons";
import styles from "./learn.module.css";

interface StartMenuProps {
  locale: Locale;
  onOpenFolder: (id: string, name: string) => void;
  onOpenApp?: (appId: string, name: string) => void;
  onClose: () => void;
  copy: { title: string };
}

export function StartMenu({ locale, onOpenFolder, onOpenApp, onClose, copy }: StartMenuProps) {
  return (
    <div className={styles.startMenu} role="menu" aria-label={copy.title}>
      <p className={styles.startMenuTitle}>{copy.title}</p>
      {desktopFolders.map((folder) => (
        <button
          key={folder.id}
          className={styles.startMenuItem}
          type="button"
          role="menuitem"
          onClick={() => {
            onOpenFolder(folder.id, folder.name[locale]);
            onClose();
          }}
        >
          <span className={styles.startMenuIcon}>
            <NavIcon id={folder.id} />
          </span>
          {folder.name[locale]}
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
