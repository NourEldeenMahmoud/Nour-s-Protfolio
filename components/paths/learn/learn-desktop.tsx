"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/routing";
import { desktopFolders, applications, type LearnNode, type LearnApplication } from "@/content/learn";
import { DesktopIcon, AppIcon } from "./learn-icons";
import { useDesktopSelectionMarquee } from "./use-desktop-selection-marquee";
import {
  useDesktopIconGridPositions,
  computeDefaultPositions,
  getMaxGridDimensions,
  resolveDesktopLayout,
  gridToPixel,
  ICON_CELL_WIDTH,
  ICON_CELL_HEIGHT,
} from "./use-desktop-icon-positions";
import type { DesktopSortMode } from "./use-desktop-icon-positions";
import {
  sortItemsByName,
  sortItemsByType,
} from "./use-desktop-icon-positions";
import { useDesktopIconDrag, type DropUpdates } from "./use-desktop-icon-drag";
import type { ContextMenuTarget } from "./use-context-menu";
import styles from "./learn.module.css";

interface LearnDesktopProps {
  locale: Locale;
  onOpenFolder: (id: string, name: string) => void;
  onOpenApp?: (appId: string, name: string) => void;
  onContextMenu?: (x: number, y: number, target: ContextMenuTarget) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  sortMode?: DesktopSortMode;
  onSortChange?: (mode: DesktopSortMode) => void;
}

export function LearnDesktop({
  locale,
  onOpenFolder,
  onOpenApp,
  onContextMenu,
  onDragStart,
  onDragEnd,
  sortMode = "default",
}: LearnDesktopProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const desktopRef = useRef<HTMLDivElement>(null);
  const { positions: customPositions, replacePositions } =
    useDesktopIconGridPositions();
  const [workspaceSize, setWorkspaceSize] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });

  const allItemIds = useMemo(() => {
    const folderIds = desktopFolders.map((f) => f.id);
    const appIds = applications.map((a) => a.id);
    return [...folderIds, ...appIds];
  }, []);

  const getLabel = useCallback(
    (id: string) => {
      const folder = desktopFolders.find((f) => f.id === id);
      if (folder) return folder.name[locale] ?? id;
      const app = applications.find((a) => a.id === id);
      return app?.name ?? id;
    },
    [locale],
  );

  const isFolder = useCallback(
    (id: string) => desktopFolders.some((f) => f.id === id),
    [],
  );

  const { maxCols, maxRows } = useMemo(
    () =>
      workspaceSize.w > 0
        ? getMaxGridDimensions(workspaceSize.w, workspaceSize.h)
        : { maxCols: 8, maxRows: 10 },
    [workspaceSize.w, workspaceSize.h],
  );

  const defaultPositions = useMemo(
    () => computeDefaultPositions(allItemIds, maxCols),
    [allItemIds, maxCols],
  );

  const layout = useMemo(() => {
    if (sortMode === "default") {
      return resolveDesktopLayout(allItemIds, customPositions, defaultPositions, maxCols, maxRows);
    }
    let sortedPositions = customPositions;
    if (sortMode === "name") {
      sortedPositions = sortItemsByName(allItemIds, maxCols, maxRows, getLabel);
    } else if (sortMode === "item-type") {
      sortedPositions = sortItemsByType(allItemIds, maxCols, maxRows, getLabel, isFolder);
    } else if (sortMode === "custom") {
      sortedPositions = customPositions;
    }
    return resolveDesktopLayout(allItemIds, sortedPositions, defaultPositions, maxCols, maxRows);
  }, [allItemIds, customPositions, defaultPositions, maxCols, maxRows, sortMode, getLabel, isFolder]);

  const getOccupancy = useCallback(
    (excludeId: string | null) =>
      new Map(
        Array.from(layout.items.entries())
          .filter(([id]) => id !== excludeId)
          .map(([, item]) => [`${item.col},${item.row}`, item.id]),
      ),
    [layout.items],
  );

  useEffect(() => {
    const el = desktopRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setWorkspaceSize({
          w: entry.contentRect.width,
          h: entry.contentRect.height,
        });
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSelectionChange = useCallback((ids: Set<string>) => {
    setSelectedIds(ids);
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const {
    marquee,
    handlePointerDown: marqueePointerDown,
    handlePointerMove: marqueePointerMove,
    handlePointerUp: marqueePointerUp,
    handlePointerCancel: marqueePointerCancel,
    handleClickEmpty,
  } = useDesktopSelectionMarquee({
    selectedIds,
    onSelectionChange: handleSelectionChange,
    onClearSelection: handleClearSelection,
  });

  const handleDrop = useCallback(
    (updates: DropUpdates) => {
      const next = { ...customPositions };
      for (const [id, pos] of Object.entries(updates)) {
        next[id] = pos;
      }
      replacePositions(next, "custom");
    },
    [customPositions, replacePositions],
  );

  const {
    draggingId,
    previewCell,
    swapPreview,
    consumeSuppressedActivation,
    handlePointerDown: dragPointerDown,
    handlePointerMove: dragPointerMove,
    handlePointerUp: dragPointerUp,
    handlePointerCancel: dragPointerCancel,
    getIconStyle,
  } = useDesktopIconDrag({
    getOccupancy,
    maxCols,
    maxRows,
    onDrop: handleDrop,
    onDragStart,
    onDragEnd,
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

  const handleDesktopContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest("[data-desktop-item]")) return;
      if (!(e.target instanceof HTMLElement && e.target.closest("[data-desktop-surface]"))) return;
      e.preventDefault();
      onContextMenu?.(e.clientX, e.clientY, { type: "desktop" });
    },
    [onContextMenu],
  );

  const handleItemContextMenu = useCallback(
    (e: React.MouseEvent, target: ContextMenuTarget) => {
      e.preventDefault();
      e.stopPropagation();
      onContextMenu?.(e.clientX, e.clientY, target);
    },
    [onContextMenu],
  );

  const handleIconPointerDown = useCallback(
    (e: React.PointerEvent, itemId: string) => {
      const layoutItem = layout.items.get(itemId);
      if (!layoutItem) return;
      dragPointerDown(e, itemId, layoutItem.x, layoutItem.y);
    },
    [layout.items, dragPointerDown],
  );

  const handleDesktopPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-desktop-item]")) return;
      marqueePointerDown(e);
    },
    [marqueePointerDown],
  );

  const handleDesktopPointerMove = useCallback(
    (e: React.PointerEvent) => {
      dragPointerMove(e);
      marqueePointerMove(e);
    },
    [dragPointerMove, marqueePointerMove],
  );

  const handleDesktopPointerUp = useCallback(
    (e: React.PointerEvent) => {
      dragPointerUp(e);
      marqueePointerUp(e);
    },
    [dragPointerUp, marqueePointerUp],
  );

  const handleDesktopPointerCancel = useCallback(
    (e: React.PointerEvent) => {
      dragPointerCancel(e);
      marqueePointerCancel(e);
    },
    [dragPointerCancel, marqueePointerCancel],
  );

  const previewStyle = useMemo(() => {
    if (!previewCell) return null;
    const { x, y } = gridToPixel(previewCell.column, previewCell.row);
    return { left: x, top: y, width: ICON_CELL_WIDTH, height: ICON_CELL_HEIGHT };
  }, [previewCell]);

  const swapPreviewStyle = useMemo(() => {
    if (!swapPreview) return null;
    const { x, y } = gridToPixel(swapPreview.cell.column, swapPreview.cell.row);
    return {
      left: x,
      top: y,
      width: ICON_CELL_WIDTH,
      height: ICON_CELL_HEIGHT,
      opacity: 0.5,
    };
  }, [swapPreview]);

  return (
    <div
      ref={desktopRef}
      className={styles.desktop}
      data-desktop-surface
      onPointerDown={handleDesktopPointerDown}
      onPointerMove={handleDesktopPointerMove}
      onPointerUp={handleDesktopPointerUp}
      onPointerCancel={handleDesktopPointerCancel}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClickEmpty();
      }}
      onContextMenu={handleDesktopContextMenu}
      role="grid"
      aria-label="Desktop"
    >
      <div className={`${styles.desktopIconsLayer} ${sortMode !== "custom" ? styles.desktopIconsRefreshing : ""}`}>
        {draggingId && previewStyle && (
          <div
            className={styles.gridPreview}
            style={{
              left: previewStyle.left,
              top: previewStyle.top,
              width: previewStyle.width,
              height: previewStyle.height,
            }}
            aria-hidden="true"
          />
        )}
        {draggingId && swapPreviewStyle && (
          <div
            className={styles.gridPreview}
            style={{
              left: swapPreviewStyle.left,
              top: swapPreviewStyle.top,
              width: swapPreviewStyle.width,
              height: swapPreviewStyle.height,
              opacity: swapPreviewStyle.opacity,
            }}
            aria-hidden="true"
          />
        )}

        {allItemIds.map((id) => {
          const folder = desktopFolders.find((f) => f.id === id);
          const app = !folder ? applications.find((a) => a.id === id) : null;
          if (!folder && !app) return null;

          const layoutItem = layout.items.get(id);
          const pixelX = layoutItem?.x ?? 0;
          const pixelY = layoutItem?.y ?? 0;
          const style = getIconStyle(id, pixelX, pixelY);
          const isDragging = draggingId === id;
          const label = folder ? folder.name[locale] : app?.name ?? "";

          return (
            <button
              key={id}
              className={`${styles.desktopIcon} ${isDragging ? styles.desktopIconDragging : ""}`}
              type="button"
              role="gridcell"
              data-desktop-item
              data-desktop-item-id={id}
              data-selected={selectedIds.has(id)}
              aria-selected={selectedIds.has(id)}
              aria-label={label}
              style={style}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              onPointerDown={(e) => handleIconPointerDown(e, id)}
              onClick={(e) => {
                if (consumeSuppressedActivation()) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                if (!draggingId) {
                  handleSelect(id, e.ctrlKey || e.metaKey);
                }
              }}
              onDoubleClick={(e) => {
                if (consumeSuppressedActivation()) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                if (folder) handleOpenFolder(folder);
                else if (app) handleOpenApp(app);
              }}
              onKeyDown={(e) =>
                handleKeyDown(e, () => {
                  if (folder) handleOpenFolder(folder);
                  else if (app) handleOpenApp(app);
                })
              }
              onContextMenu={(e) => {
                handleSelect(id, false);
                handleItemContextMenu(e, {
                  type: folder ? "folder" : "app",
                  id,
                });
              }}
            >
              <span className={styles.desktopIconImage}>
                {folder ? (
                  <DesktopIcon kind={id === "this-pc" ? "pc" : "folder"} />
                ) : (
                  <AppIcon app={app!} />
                )}
              </span>
              <span className={styles.desktopIconLabel}>{label}</span>
            </button>
          );
        })}
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
