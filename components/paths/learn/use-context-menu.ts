"use client";

import { useCallback, useEffect, useState } from "react";

export type ContextMenuTarget =
  | { type: "desktop" }
  | { type: "folder"; id: string }
  | { type: "file"; id: string }
  | { type: "app"; id: string };

export interface ContextMenuState {
  open: boolean;
  x: number;
  y: number;
  target: ContextMenuTarget;
}

const initialState: ContextMenuState = {
  open: false,
  x: 0,
  y: 0,
  target: { type: "desktop" },
};

export function useContextMenu() {
  const [menu, setMenu] = useState<ContextMenuState>(initialState);

  const openContextMenu = useCallback((x: number, y: number, target: ContextMenuTarget) => {
    setMenu({ open: true, x, y, target });
  }, []);

  const closeContextMenu = useCallback(() => {
    setMenu((prev) => (prev.open ? { ...prev, open: false } : prev));
  }, []);

  useEffect(() => {
    if (!menu.open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeContextMenu();
      }
    }
    function handleResize() {
      closeContextMenu();
    }
    function handleScroll() {
      closeContextMenu();
    }

    document.addEventListener("keydown", handleKey);
    window.addEventListener("resize", handleResize);
    document.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [menu.open, closeContextMenu]);

  return { menu, openContextMenu, closeContextMenu };
}
