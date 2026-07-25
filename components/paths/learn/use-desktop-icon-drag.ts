"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  DesktopIconGridPositions,
  DesktopIconGridPosition,
} from "./use-desktop-icon-positions";
import {
  ICON_CELL_WIDTH,
  ICON_CELL_HEIGHT,
  gridToPixel,
  pixelToGrid,
  getMaxGridDimensions,
  buildOccupancyMap,
  findNearestAvailableCell,
} from "./use-desktop-icon-positions";

const DRAG_THRESHOLD = 5;

export interface UseDesktopIconDragOptions {
  customPositions: DesktopIconGridPositions;
  defaultPositions: Map<string, DesktopIconGridPosition>;
  allItemIds: string[];
  setGridPosition: (id: string, col: number, row: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export function useDesktopIconDrag({
  customPositions,
  defaultPositions,
  allItemIds,
  setGridPosition,
  onDragStart,
  onDragEnd,
}: UseDesktopIconDragOptions) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [previewCell, setPreviewCell] = useState<DesktopIconGridPosition | null>(null);

  const stateRef = useRef<{
    pointerId: number;
    itemId: string;
    startPointerX: number;
    startPointerY: number;
    startIconX: number;
    startIconY: number;
    prevGridPos: DesktopIconGridPosition | null;
    hasPassedThreshold: boolean;
    desktopRect: DOMRect;
    rafId: number;
  } | null>(null);

  const finishDrag = useCallback(
    (save: boolean) => {
      const s = stateRef.current;
      if (!s) return;
      if (s.rafId) cancelAnimationFrame(s.rafId);

      if (save && previewCell) {
        setGridPosition(s.itemId, previewCell.column, previewCell.row);
      } else if (s.prevGridPos) {
        const el = document.querySelector(
          `[data-desktop-item-id="${s.itemId}"]`,
        );
        if (el) {
          const { x, y } = gridToPixel(s.prevGridPos.column, s.prevGridPos.row);
          (el as HTMLElement).style.left = `${x}px`;
          (el as HTMLElement).style.top = `${y}px`;
        }
      }

      stateRef.current = null;
      setDraggingId(null);
      setPreviewCell(null);
      onDragEnd?.();
    },
    [previewCell, setGridPosition, onDragEnd],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, itemId: string) => {
      if (e.button !== 0) return;
      if (e.pointerType === "touch" || e.pointerType === "pen") return;

      const target = e.target as HTMLElement;
      const desktopEl = target.closest("[data-desktop-surface]") as HTMLElement;
      if (!desktopEl) return;

      const desktopRect = desktopEl.getBoundingClientRect();
      const pos = customPositions[itemId] ?? defaultPositions.get(itemId);

      let startIconX: number;
      let startIconY: number;

      if (pos) {
        const pixel = gridToPixel(pos.column, pos.row);
        startIconX = pixel.x;
        startIconY = pixel.y;
      } else {
        const iconEl = target.closest("[data-desktop-item]") as HTMLElement;
        if (!iconEl) return;
        const iconRect = iconEl.getBoundingClientRect();
        startIconX = iconRect.left - desktopRect.left;
        startIconY = iconRect.top - desktopRect.top;
      }

      stateRef.current = {
        pointerId: e.pointerId,
        itemId,
        startPointerX: e.clientX,
        startPointerY: e.clientY,
        startIconX,
        startIconY,
        prevGridPos: pos ?? null,
        hasPassedThreshold: false,
        desktopRect,
        rafId: 0,
      };
    },
    [customPositions, defaultPositions],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const s = stateRef.current;
      if (!s || e.pointerId !== s.pointerId) return;

      const dx = e.clientX - s.startPointerX;
      const dy = e.clientY - s.startPointerY;

      if (!s.hasPassedThreshold) {
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
        s.hasPassedThreshold = true;
        const desktopEl = e.currentTarget as HTMLElement;
        if (desktopEl) desktopEl.setPointerCapture(e.pointerId);
        setDraggingId(s.itemId);
        onDragStart?.();
      }

      const newX = s.startIconX + dx;
      const newY = s.startIconY + dy;

      const maxX = s.desktopRect.width - ICON_CELL_WIDTH;
      const maxY = s.desktopRect.height - ICON_CELL_HEIGHT;
      const clampedX = Math.max(0, Math.min(newX, maxX));
      const clampedY = Math.max(0, Math.min(newY, maxY));

      const { maxCols, maxRows } = getMaxGridDimensions(
        s.desktopRect.width,
        s.desktopRect.height,
      );

      const hoverGrid = pixelToGrid(clampedX, clampedY);
      const occ = buildOccupancyMap(allItemIds, customPositions, defaultPositions, s.itemId);
      const snapped = findNearestAvailableCell(
        hoverGrid.column,
        hoverGrid.row,
        maxCols,
        maxRows,
        occ,
      );

      if (s.rafId) cancelAnimationFrame(s.rafId);
      s.rafId = requestAnimationFrame(() => {
        const el = document.querySelector(
          `[data-desktop-item-id="${s.itemId}"]`,
        );
        if (el) {
          (el as HTMLElement).style.left = `${clampedX}px`;
          (el as HTMLElement).style.top = `${clampedY}px`;
        }
      });

      setPreviewCell(snapped);
    },
    [allItemIds, customPositions, defaultPositions, onDragStart],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      const s = stateRef.current;
      if (!s || e.pointerId !== s.pointerId) return;

      if (!s.hasPassedThreshold) {
        stateRef.current = null;
        return;
      }

      finishDrag(true);
    },
    [finishDrag],
  );

  const handlePointerCancel = useCallback(
    (e: React.PointerEvent) => {
      const s = stateRef.current;
      if (!s || e.pointerId !== s.pointerId) return;
      finishDrag(false);
    },
    [finishDrag],
  );

  const getIconStyle = useCallback(
    (
      id: string,
      fallbackCol: number,
      fallbackRow: number,
    ): React.CSSProperties => {
      const pos = customPositions[id] ?? defaultPositions.get(id);
      const col = pos ? pos.column : fallbackCol;
      const row = pos ? pos.row : fallbackRow;
      const { x, y } = gridToPixel(col, row);
      return {
        position: "absolute",
        left: x,
        top: y,
      };
    },
    [customPositions, defaultPositions],
  );

  useEffect(() => {
    return () => {
      const s = stateRef.current;
      if (s) {
        if (s.rafId) cancelAnimationFrame(s.rafId);
        stateRef.current = null;
      }
    };
  }, []);

  return {
    draggingId,
    previewCell,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    getIconStyle,
  };
}
