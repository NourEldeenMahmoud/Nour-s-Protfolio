"use client";

import { useCallback, useState } from "react";
import type { Locale } from "@/i18n/routing";
import { desktopFolders, applications, type LearnNode, type LearnApplication } from "@/content/learn";
import { DesktopIcon, AppIcon } from "./learn-icons";
import { useDesktopSelectionMarquee } from "./use-desktop-selection-marquee";
import styles from "./learn.module.css";

interface LearnDesktopProps {
  locale: Locale;
  onOpenFolder: (id: string, name: string) => void;
  onOpenApp?: (appId: string, name: string) => void;
  onDesktopContextMenu?: (x: number, y: number) => void;
  refreshKey?: number;
}

export function LearnDesktop({
  locale,
  onOpenFolder,
  onOpenApp,
  onDesktopContextMenu,
  refreshKey,
}: LearnDesktopProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSelectionChange = useCallback((ids: Set<string>) => {
    setSelectedIds(ids);
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const {
    marquee,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    handleClickEmpty,
  } = useDesktopSelectionMarquee({
    selectedIds,
    onSelectionChange: handleSelectionChange,
    onClearSelection: handleClearSelection,
  });

  const handleSelect = useCallback(
    (id: string, ctrlOrMeta: boolean) => {
      if (ctrlOrMeta) {
        setSelectedIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return next;
        });
      } else {
        setSelectedIds(new Set([id]));
      }
    },
    [],
  );

  const handleOpenFolder = useCallback(
    (node: LearnNode) => {
      onOpenFolder(node.id, node.name[locale]);
    },
    [locale, onOpenFolder],
  );

  const handleOpenApp = useCallback(
    (app: LearnApplication) => {
      onOpenApp?.(app.id, app.name);
    },
    [onOpenApp],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, action: () => void) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        action();
      }
    },
    [],
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (e.target !== e.currentTarget) return;
      e.preventDefault();
      onDesktopContextMenu?.(e.clientX, e.clientY);
    },
    [onDesktopContextMenu],
  );

  return (
    <div
      className={styles.desktop}
      data-desktop-surface
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClickEmpty();
      }}
      onContextMenu={handleContextMenu}
      role="grid"
      aria-label="Desktop"
    >
      <div className={styles.desktopFolders} key={`folders-${refreshKey}`}>
        {desktopFolders.map((node) => (
          <button
            key={node.id}
            className={styles.desktopIcon}
            type="button"
            role="gridcell"
            data-desktop-item
            data-desktop-item-id={node.id}
            data-selected={selectedIds.has(node.id)}
            aria-selected={selectedIds.has(node.id)}
            aria-label={node.name[locale]}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(node.id, e.ctrlKey || e.metaKey);
            }}
            onDoubleClick={() => handleOpenFolder(node)}
            onKeyDown={(e) => handleKeyDown(e, () => handleOpenFolder(node))}
          >
            <span className={styles.desktopIconImage}>
              <DesktopIcon kind={node.id === "this-pc" ? "pc" : "folder"} />
            </span>
            <span className={styles.desktopIconLabel}>{node.name[locale]}</span>
          </button>
        ))}
      </div>

      <div className={styles.desktopApps} key={`apps-${refreshKey}`}>
        {applications.map((app) => (
          <button
            key={app.id}
            className={styles.desktopIcon}
            type="button"
            role="gridcell"
            data-desktop-item
            data-desktop-item-id={app.id}
            data-selected={selectedIds.has(app.id)}
            aria-selected={selectedIds.has(app.id)}
            aria-label={app.name}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(app.id, e.ctrlKey || e.metaKey);
            }}
            onDoubleClick={() => handleOpenApp(app)}
            onKeyDown={(e) => handleKeyDown(e, () => handleOpenApp(app))}
          >
            <span className={styles.desktopIconImage}>
              <AppIcon app={app} />
            </span>
            <span className={styles.desktopIconLabel}>{app.shortName ?? app.name}</span>
          </button>
        ))}
      </div>

      {marquee.isActive && (
        <div
          className={styles.selectionMarquee}
          style={{
            left: marquee.left,
            top: marquee.top,
            width: marquee.width,
            height: marquee.height,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
