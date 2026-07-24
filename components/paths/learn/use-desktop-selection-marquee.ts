"use client";

import { useCallback, useRef, useState } from "react";

const DRAG_THRESHOLD = 5;

export interface MarqueeState {
  isActive: boolean;
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface UseDesktopSelectionMarqueeOptions {
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
  onClearSelection: () => void;
}

export function useDesktopSelectionMarquee({
  selectedIds,
  onSelectionChange,
  onClearSelection,
}: UseDesktopSelectionMarqueeOptions) {
  const [marquee, setMarquee] = useState<MarqueeState>({
    isActive: false,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  const stateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    hasPassedThreshold: boolean;
    initialSelectedIds: Set<string>;
    ctrlOrMeta: boolean;
    shift: boolean;
    rafId: number;
    desktopRect: DOMRect;
  } | null>(null);

  const computeMarquee = useCallback(
    (startX: number, startY: number, currentX: number, currentY: number) => {
      const left = Math.min(startX, currentX);
      const top = Math.min(startY, currentY);
      const width = Math.abs(currentX - startX);
      const height = Math.abs(currentY - startY);
      return { left, top, width, height };
    },
    [],
  );

  const getIntersectingIds = useCallback(
    (
      marqueeRect: { left: number; top: number; width: number; height: number },
      desktopRect: DOMRect,
    ): Set<string> => {
      const ids = new Set<string>();
      const items = document.querySelectorAll("[data-desktop-item]");
      for (const item of items) {
        const id = item.getAttribute("data-desktop-item-id");
        if (!id) continue;
        const itemRect = item.getBoundingClientRect();
        const itemLeft = itemRect.left - desktopRect.left;
        const itemTop = itemRect.top - desktopRect.top;
        const itemRight = itemLeft + itemRect.width;
        const itemBottom = itemTop + itemRect.height;
        const intersects =
          marqueeRect.left < itemRight &&
          marqueeRect.left + marqueeRect.width > itemLeft &&
          marqueeRect.top < itemBottom &&
          marqueeRect.top + marqueeRect.height > itemTop;
        if (intersects) {
          ids.add(id);
        }
      }
      return ids;
    },
    [],
  );

  const updateSelection = useCallback(
    (intersectingIds: Set<string>, s: { ctrlOrMeta: boolean; shift: boolean; initialSelectedIds: Set<string> }) => {
      const next = new Set<string>();
      if (s.ctrlOrMeta) {
        for (const id of s.initialSelectedIds) next.add(id);
        for (const id of intersectingIds) {
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
        }
      } else if (s.shift) {
        for (const id of s.initialSelectedIds) next.add(id);
        for (const id of intersectingIds) next.add(id);
      } else {
        for (const id of intersectingIds) next.add(id);
      }
      onSelectionChange(next);
    },
    [onSelectionChange],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-desktop-surface]")) return;
      if (target.closest("[data-desktop-item]")) return;
      if (target.closest("[data-desktop-window]")) return;
      if (target.closest("[data-desktop-widget]")) return;
      if (target.closest("[data-desktop-taskbar]")) return;
      if (target.closest("[data-desktop-start]")) return;
      if (target.closest("[data-desktop-search]")) return;
      if (e.button !== 0) return;
      if (e.pointerType === "touch" || e.pointerType === "pen") return;

      const desktopEl = target.closest("[data-desktop-surface]") as HTMLElement;
      if (!desktopEl) return;
      const desktopRect = desktopEl.getBoundingClientRect();
      const startX = e.clientX - desktopRect.left;
      const startY = e.clientY - desktopRect.top;

      stateRef.current = {
        pointerId: e.pointerId,
        startX,
        startY,
        currentX: startX,
        currentY: startY,
        hasPassedThreshold: false,
        initialSelectedIds: new Set(selectedIds),
        ctrlOrMeta: e.ctrlKey || e.metaKey,
        shift: e.shiftKey,
        rafId: 0,
        desktopRect,
      };

      desktopEl.setPointerCapture(e.pointerId);
    },
    [selectedIds],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const s = stateRef.current;
      if (!s || e.pointerId !== s.pointerId) return;

      const desktopEl = (e.target as HTMLElement).closest("[data-desktop-surface]") as HTMLElement | null;
      if (!desktopEl) return;

      const currentX = e.clientX - s.desktopRect.left;
      const currentY = e.clientY - s.desktopRect.top;
      s.currentX = currentX;
      s.currentY = currentY;

      const dx = currentX - s.startX;
      const dy = currentY - s.startY;
      if (!s.hasPassedThreshold) {
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
        s.hasPassedThreshold = true;
      }

      if (s.rafId) cancelAnimationFrame(s.rafId);
      s.rafId = requestAnimationFrame(() => {
        const rect = computeMarquee(s.startX, s.startY, s.currentX, s.currentY);
        setMarquee({ isActive: true, ...rect });
        const intersecting = getIntersectingIds(rect, s.desktopRect);
        updateSelection(intersecting, s);
      });
    },
    [computeMarquee, getIntersectingIds, updateSelection],
  );

  const finishMarquee = useCallback(() => {
    const s = stateRef.current;
    if (!s) return;
    if (s.rafId) cancelAnimationFrame(s.rafId);
    stateRef.current = null;
    setMarquee((prev) => (prev.isActive ? { ...prev, isActive: false } : prev));
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      const s = stateRef.current;
      if (!s || e.pointerId !== s.pointerId) return;
      finishMarquee();
    },
    [finishMarquee],
  );

  const handlePointerCancel = useCallback(
    (e: React.PointerEvent) => {
      const s = stateRef.current;
      if (!s || e.pointerId !== s.pointerId) return;
      finishMarquee();
    },
    [finishMarquee],
  );

  const handleClickEmpty = useCallback(() => {
    onClearSelection();
  }, [onClearSelection]);

  return {
    marquee,
    selectedIds,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    handleClickEmpty,
  };
}
