"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { DesktopIconGridPosition } from "./use-desktop-icon-positions";
import {
  ICON_CELL_WIDTH,
  ICON_CELL_HEIGHT,
  pixelToGrid,
  findNearestAvailableCell,
} from "./use-desktop-icon-positions";

const DRAG_THRESHOLD = 5;

export interface UseDesktopIconDragOptions {
  occupancy: Map<string, string>;
  maxCols: number;
  maxRows: number;
  onDrop: (id: string, col: number, row: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

interface DragState {
  pointerId: number;
  itemId: string;
  startPointerX: number;
  startPointerY: number;
  startIconX: number;
  startIconY: number;
  prevGridPos: DesktopIconGridPosition | null;
  hasPassedThreshold: boolean;
  desktopRect: DOMRect;
  /** Latest snap-to-grid candidate — read on pointerup, no stale state */
  latestCandidate: DesktopIconGridPosition | null;
}

export function useDesktopIconDrag({
  occupancy,
  maxCols,
  maxRows,
  onDrop,
  onDragStart,
  onDragEnd,
}: UseDesktopIconDragOptions) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  /** pixel offset from the icon's layout position during drag */
  const [dragOffset, setDragOffset] = useState<{ dx: number; dy: number } | null>(null);
  const [previewCell, setPreviewCell] = useState<DesktopIconGridPosition | null>(null);

  const stateRef = useRef<DragState | null>(null);

  const finishDrag = useCallback(
    (save: boolean) => {
      const s = stateRef.current;
      if (!s) return;

      if (save && s.latestCandidate) {
        onDrop(s.itemId, s.latestCandidate.column, s.latestCandidate.row);
      }

      stateRef.current = null;
      setDraggingId(null);
      setDragOffset(null);
      setPreviewCell(null);
      onDragEnd?.();
    },
    [onDrop, onDragEnd],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, itemId: string, startPixelX: number, startPixelY: number) => {
      if (e.button !== 0) return;
      if (e.pointerType === "touch" || e.pointerType === "pen") return;

      const target = e.target as HTMLElement;
      const desktopEl = target.closest("[data-desktop-surface]") as HTMLElement;
      if (!desktopEl) return;

      const desktopRect = desktopEl.getBoundingClientRect();

      stateRef.current = {
        pointerId: e.pointerId,
        itemId,
        startPointerX: e.clientX,
        startPointerY: e.clientY,
        startIconX: startPixelX,
        startIconY: startPixelY,
        prevGridPos: null,
        hasPassedThreshold: false,
        desktopRect,
        latestCandidate: null,
      };
    },
    [],
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
        s.prevGridPos = pixelToGrid(s.startIconX, s.startIconY);
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

      const hoverGrid = pixelToGrid(clampedX, clampedY);
      const snapped = findNearestAvailableCell(
        hoverGrid.column,
        hoverGrid.row,
        maxCols,
        maxRows,
        occupancy,
      );

      s.latestCandidate = snapped;

      setDragOffset({ dx: clampedX - s.startIconX, dy: clampedY - s.startIconY });
      setPreviewCell(snapped);
    },
    [maxCols, maxRows, occupancy, onDragStart],
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

  /**
   * Returns the inline style for a desktop icon.
   * During drag, the dragged item uses CSS transform (GPU composited, no layout thrash).
   * All other items use their layout pixel position with no offset.
   */
  const getIconStyle = useCallback(
    (id: string, pixelX: number, pixelY: number): React.CSSProperties => {
      if (draggingId === id && dragOffset) {
        return {
          position: "absolute",
          left: pixelX,
          top: pixelY,
          transform: `translate(${dragOffset.dx}px, ${dragOffset.dy}px)`,
        };
      }
      return {
        position: "absolute",
        left: pixelX,
        top: pixelY,
      };
    },
    [draggingId, dragOffset],
  );

  useEffect(() => {
    return () => {
      stateRef.current = null;
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
