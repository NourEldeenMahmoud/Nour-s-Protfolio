"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./learn.module.css";

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  separator?: boolean;
}

interface DesktopContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onSelect: (id: string) => void;
  onClose: () => void;
  itemLabel?: string;
}

export function DesktopContextMenu({
  x,
  y,
  items,
  onSelect,
  onClose,
  itemLabel,
}: DesktopContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const [pos, setPos] = useState({ x, y });

  const nonSepItems = items.filter((i) => !i.separator);

  const clampToViewport = useCallback(() => {
    const el = menuRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let nx = x;
    let ny = y;
    if (nx + rect.width > vw - 4) nx = Math.max(4, vw - rect.width - 4);
    if (ny + rect.height > vh - 4) ny = Math.max(4, vh - rect.height - 4);
    if (nx < 4) nx = 4;
    if (ny < 4) ny = 4;
    setPos({ x: nx, y: ny });
  }, [x, y]);

  useEffect(() => {
    clampToViewport();
  }, [clampToViewport]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusIndex((i) => (i + 1) % nonSepItems.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusIndex((i) => (i - 1 + nonSepItems.length) % nonSepItems.length);
      }
      if (e.key === "Home") {
        e.preventDefault();
        setFocusIndex(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        setFocusIndex(nonSepItems.length - 1);
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const item = nonSepItems[focusIndex];
        if (item) onSelect(item.id);
      }
    }
    function handleResize() {
      onClose();
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", handleResize);
    };
  }, [onClose, onSelect, focusIndex, nonSepItems]);

  useEffect(() => {
    menuRef.current?.focus();
  }, []);

  // Move DOM focus to the active menuitem when focusIndex changes (roving tabindex)
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[role='menuitem']");
    const active = items[focusIndex];
    if (active) active.focus();
  }, [focusIndex]);

  return (
    <div
      ref={menuRef}
      className={styles.contextMenu}
      style={{ left: pos.x, top: pos.y }}
      role="menu"
      aria-label={itemLabel ? `${itemLabel} context menu` : "Desktop context menu"}
      tabIndex={-1}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {items.map((item) =>
        item.separator ? (
          <div key={`sep-${item.id}`} className={styles.contextMenuSep} role="separator" />
        ) : (
          <button
            key={item.id}
            className={styles.contextMenuItem}
            type="button"
            role="menuitem"
            tabIndex={focusIndex === nonSepItems.indexOf(item) ? 0 : -1}
            onMouseEnter={() => setFocusIndex(nonSepItems.indexOf(item))}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item.id);
            }}
          >
            {item.icon && <span className={styles.contextMenuIcon}>{item.icon}</span>}
            {item.label}
          </button>
        ),
      )}
    </div>
  );
}
