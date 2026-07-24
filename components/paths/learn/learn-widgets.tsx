"use client";

import { useCallback } from "react";
import type { Locale } from "@/i18n/routing";
import { widgets } from "@/content/learn";
import { LearnWidget } from "./learn-widget";
import styles from "./learn.module.css";

interface LearnWidgetsProps {
  locale: Locale;
  onOpenFolder: (id: string, name: string) => void;
  onOpenFile: (id: string, name: string) => void;
  learnNodeMap: Map<string, { name: Record<Locale, string> }>;
}

export function LearnWidgets({
  locale,
  onOpenFolder,
  onOpenFile,
  learnNodeMap,
}: LearnWidgetsProps) {
  const handleOpen = useCallback(
    (folderId?: string, fileId?: string) => {
      if (fileId) {
        const node = learnNodeMap.get(fileId);
        if (node) {
          onOpenFile(fileId, node.name[locale]);
        }
      } else if (folderId) {
        const node = learnNodeMap.get(folderId);
        if (node) {
          onOpenFolder(folderId, node.name[locale]);
        }
      }
    },
    [locale, onOpenFolder, onOpenFile, learnNodeMap],
  );

  const largeWidget = widgets.find((w) => w.layout === "large");
  const smallWidgets = widgets.filter((w) => w.layout === "small");
  const wideWidget = widgets.find((w) => w.layout === "wide");

  return (
    <div className={styles.learnWidgets} aria-label="Widgets">
      {largeWidget && (
        <LearnWidget widget={largeWidget} onOpen={handleOpen} />
      )}
      <div className={styles.learnWidgetsRow}>
        {smallWidgets.map((widget) => (
          <LearnWidget key={widget.id} widget={widget} onOpen={handleOpen} />
        ))}
      </div>
      {wideWidget && (
        <LearnWidget widget={wideWidget} onOpen={handleOpen} />
      )}
    </div>
  );
}
