"use client";

import type { Locale } from "@/i18n/routing";
import { LearnExperience } from "./learn-experience";
import styles from "./learn.module.css";

interface LearnExperiencePageProps {
  locale: Locale;
  copy: {
    returnToRoom: string;
    openComputer: string;
    start: string;
    search: string;
    searchPlaceholder: string;
    fileExplorer: string;
    desktop: string;
    emptyFolder: string;
    itemCountPattern: string;
    thisPC: string;
    copyLink: string;
    copied: string;
    openProject: string;
    relatedFiles: string;
    relatedProjects: string;
    limitations: string;
    startMenuTitle: string;
    noResults: string;
    languageLabel: string;
    usedFor: string;
    workflowUses: string;
    relatedSkills: string;
    menuCopy: string;
    menuRefresh: string;
    menuOpen: string;
    menuHideWidgets: string;
    menuShowWidgets: string;
    menuAbout: string;
    menuReturn: string;
    menuPaste: string;
    toastFileCopied: string;
    toastTextCopied: string;
    toastCopyFailed: string;
    menuSortBy: string;
    sortName: string;
    sortItemType: string;
    sortDefault: string;
    sortCustom: string;
    toastDesktopRefreshed: string;
  };
}

export function LearnExperiencePage({
  locale,
  copy,
}: LearnExperiencePageProps) {
  return (
    <main className={styles.monitorStage}>
      <div className={styles.monitorFrame}>
        <span className={styles.monitorCamera} aria-hidden="true" />
        <div className={styles.monitorScreen}>
          <LearnExperience locale={locale} copy={copy} />
        </div>
      </div>
    </main>
  );
}
