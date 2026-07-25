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
import { useDesktopIconDrag } from "./use-desktop-icon-drag";
import type { ContextMenuTarget } from "./use-context-menu";
import styles from "./learn.module.css";

interface LearnDesktopProps {
  locale: Locale;
  onOpenFolder: (id: string, name: string) => void;
  onOpenApp?: (appId: string, name: string) => void;
  onContextMenu?: (x: number, y: number, target: ContextMenuTarget) => void;
  refreshKey?: number;
}

export function LearnDesktop({
  locale,
  onOpenFolder,
  onOpenApp,
  onContextMenu,
  refreshKey,
}: LearnDesktopProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const desktopRef = useRef<HTMLDivElement>(null);
  const { positions: customPositions, setPosition: setGridPosition } =
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

  // Single authoritative layout computed from custom + default + bounds
  const layout = useMemo(
    () =>
      resolveDesktopLayout(allItemIds, customPositions, defaultPositions, maxCols, maxRows),
    [allItemIds, customPositions, defaultPositions, maxCols, maxRows],
  );

  // Occupancy map for drag collision detection (excludes dragging item)
  const getOccupancy = useCallback(
    (draggingId: string | null) =>
      new Map(
        Array.from(layout.items.entries())
          .filter(([id]) => id !== draggingId)
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
    (id: string, col: number, row: number) => {
      setGridPosition(id, col, row);
    },
    [setGridPosition],
  );

  const {
    draggingId,
    previewCell,
    handlePointerDown: dragPointerDown,
    handlePointerMove: dragPointerMove,
    handlePointerUp: dragPointerUp,
    handlePointerCancel: dragPointerCancel,
    getIconStyle,
  } = useDesktopIconDrag({
    occupancy: getOccupancy(null),
    maxCols,
    maxRows,
    onDrop: handleDrop,
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
      // Accept right-click anywhere on the desktop surface that isn't an icon
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

  // Mutual exclusion: pointerdown on icon → drag only; pointerdown on empty → marquee only
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
      <div className={styles.desktopIconsLayer} key={`icons-${refreshKey}`}>
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
              onPointerDown={(e) => handleIconPointerDown(e, id)}
              onClick={(e) => {
                e.stopPropagation();
                if (!draggingId) {
                  handleSelect(id, e.ctrlKey || e.metaKey);
                }
              }}
              onDoubleClick={() => {
                if (folder) handleOpenFolder(folder);
                else if (app) handleOpenApp(app);
              }}
              onKeyDown={(e) =>
                handleKeyDown(e, () => {
                  if (folder) handleOpenFolder(folder);
                  else if (app) handleOpenApp(app);
                })
              }
              onContextMenu={(e) =>
                handleItemContextMenu(e, {
                  type: folder ? "folder" : "app",
                  id,
                })
              }
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
