"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { DesktopIconGridPosition } from "./use-desktop-icon-positions";
import {
  pixelToGrid,
  gridToPixel,
  clampGridPosition,
} from "./use-desktop-icon-positions";

const DRAG_THRESHOLD = 5;

export type DropUpdates = Record<string, DesktopIconGridPosition>;

export interface UseDesktopIconDragOptions {
  getOccupancy: (excludeId: string | null) => Map<string, string>;
  maxCols: number;
  maxRows: number;
  onDrop: (updates: DropUpdates) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

interface DragState {
  pointerId: number;
  itemId: string;
  sourceCell: DesktopIconGridPosition;
  startPointerX: number;
  startPointerY: number;
  startIconX: number;
  startIconY: number;
  hasPassedThreshold: boolean;
  desktopRect: DOMRect;
  occupancy: Map<string, string>;
  latestCandidate: DesktopIconGridPosition | null;
  latestSwapTargetId: string | null;
}

export function useDesktopIconDrag({
  getOccupancy,
  maxCols,
  maxRows,
  onDrop,
  onDragStart,
  onDragEnd,
}: UseDesktopIconDragOptions) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ dx: number; dy: number } | null>(null);
  const [previewCell, setPreviewCell] = useState<DesktopIconGridPosition | null>(null);
  const [swapPreview, setSwapPreview] = useState<{ id: string; cell: DesktopIconGridPosition } | null>(null);

  const stateRef = useRef<DragState | null>(null);
  const suppressActivationRef = useRef(false);
  const iconRef = useRef<HTMLElement | null>(null);

  const consumeSuppressedActivation = useCallback(() => {
    if (suppressActivationRef.current) {
      suppressActivationRef.current = false;
      return true;
    }
    return false;
  }, []);

  const finishDrag = useCallback(
    (save: boolean) => {
      const s = stateRef.current;
      if (!s) return;

      if (save && s.latestCandidate) {
        const updates: DropUpdates = {
          [s.itemId]: s.latestCandidate,
        };
        if (s.latestSwapTargetId) {
          updates[s.latestSwapTargetId] = s.sourceCell;
        }
        onDrop(updates);
        suppressActivationRef.current = true;
      } else if (s.hasPassedThreshold) {
        suppressActivationRef.current = true;
      }

      try {
        if (iconRef.current && s.pointerId != null) {
          iconRef.current.releasePointerCapture(s.pointerId);
        }
      } catch {}

      iconRef.current = null;
      stateRef.current = null;
      setDraggingId(null);
      setDragOffset(null);
      setPreviewCell(null);
      setSwapPreview(null);
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

      const sourceCell = pixelToGrid(startPixelX, startPixelY);
      const occupancy = getOccupancy(itemId);

      const desktopRect = desktopEl.getBoundingClientRect();

      stateRef.current = {
        pointerId: e.pointerId,
        itemId,
        sourceCell,
        startPointerX: e.clientX,
        startPointerY: e.clientY,
        startIconX: startPixelX,
        startIconY: startPixelY,
        hasPassedThreshold: false,
        desktopRect,
        occupancy,
        latestCandidate: sourceCell,
        latestSwapTargetId: null,
      };

      iconRef.current = e.currentTarget as HTMLElement;
    },
    [getOccupancy],
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

        const capturedIcon = iconRef.current;
        if (capturedIcon) {
          try {
            capturedIcon.setPointerCapture(s.pointerId);
          } catch {}
        }

        setDraggingId(s.itemId);
        onDragStart?.();
      }

      const newX = s.startIconX + dx;
      const newY = s.startIconY + dy;

      // Phase 6: Clamp to valid grid origin range
      const minOrigin = gridToPixel(0, 0);
      const maxOrigin = gridToPixel(maxCols - 1, maxRows - 1);
      const clampedX = Math.max(minOrigin.x, Math.min(newX, maxOrigin.x));
      const clampedY = Math.max(minOrigin.y, Math.min(newY, maxOrigin.y));

      const hoverGrid = pixelToGrid(clampedX, clampedY);
      const clampedTarget = clampGridPosition(hoverGrid.column, hoverGrid.row, maxCols, maxRows);

      // Phase 5: Check for swap
      const occupantId = s.occupancy.get(`${clampedTarget.column},${clampedTarget.row}`);
      if (occupantId && occupantId !== s.itemId) {
        s.latestCandidate = clampedTarget;
        s.latestSwapTargetId = occupantId;
        setPreviewCell(clampedTarget);

        const swapCell = s.sourceCell;
        setSwapPreview({ id: occupantId, cell: swapCell });
      } else {
        s.latestCandidate = clampedTarget;
        s.latestSwapTargetId = null;
        setPreviewCell(clampedTarget);
        setSwapPreview(null);
      }

      setDragOffset({ dx: clampedX - s.startIconX, dy: clampedY - s.startIconY });
    },
    [maxCols, maxRows, onDragStart],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      const s = stateRef.current;
      if (!s || e.pointerId !== s.pointerId) return;

      if (!s.hasPassedThreshold) {
        iconRef.current = null;
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

  // Phase 7: Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stateRef.current) {
        stateRef.current = null;
        iconRef.current = null;
      }
    };
  }, []);

  // Phase 7: Window blur cancels drag
  useEffect(() => {
    function handleBlur() {
      if (stateRef.current?.hasPassedThreshold) {
        finishDrag(false);
      }
    }
    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, [finishDrag]);

  return {
    draggingId,
    previewCell,
    swapPreview,
    suppressActivationRef,
    consumeSuppressedActivation,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    getIconStyle,
  };
}
