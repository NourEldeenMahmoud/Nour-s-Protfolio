"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./learn.module.css";

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  separator?: boolean;
  disabled?: boolean;
  checked?: boolean;
  submenu?: ContextMenuItem[];
}

interface DesktopContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onSelect: (id: string) => void;
  onClose: () => void;
  itemLabel?: string;
  onSubmenuOpen?: (parentId: string, x: number, y: number) => void;
}

export function DesktopContextMenu({
  x,
  y,
  items,
  onSelect,
  onClose,
  itemLabel,
  onSubmenuOpen,
}: DesktopContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const invokerRef = useRef<HTMLElement | null>(null);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [pos, setPos] = useState({ x, y });

  const nonSepItems = items.filter((i) => !i.separator);

  // Capture invoker on open
  useEffect(() => {
    invokerRef.current = document.activeElement as HTMLElement;
  }, []);

  // Restore focus to invoker on close
  useEffect(() => {
    return () => {
      if (invokerRef.current && typeof invokerRef.current.focus === "function") {
        invokerRef.current.focus();
      }
    };
  }, []);

  // Clamp focusIndex to valid range — avoids setState in effect for item changes
  const clampedFocusIndex = Math.min(
    Math.max(focusIndex, nonSepItems.length > 0 ? 0 : -1),
    nonSepItems.length - 1,
  );

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
        setFocusIndex((prev) => {
          let next = prev + 1;
          while (next < nonSepItems.length && nonSepItems[next]?.disabled) next++;
          return next < nonSepItems.length ? next : prev;
        });
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusIndex((prev) => {
          let next = prev - 1;
          while (next >= 0 && nonSepItems[next]?.disabled) next--;
          return next >= 0 ? next : prev;
        });
      }
      if (e.key === "Home") {
        e.preventDefault();
        const first = nonSepItems.findIndex((i) => !i.disabled);
        if (first >= 0) setFocusIndex(first);
      }
      if (e.key === "End") {
        e.preventDefault();
        for (let i = nonSepItems.length - 1; i >= 0; i--) {
          if (!nonSepItems[i]?.disabled) {
            setFocusIndex(i);
            break;
          }
        }
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const item = nonSepItems[clampedFocusIndex];
        if (item && !item.disabled) onSelect(item.id);
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
  }, [onClose, onSelect, clampedFocusIndex, nonSepItems]);

  useEffect(() => {
    menuRef.current?.focus();
  }, []);

  // Move DOM focus to the active menuitem when focusIndex changes (roving tabindex)
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[role='menuitem']");
    const active = items[clampedFocusIndex];
    if (active) active.focus();
  }, [clampedFocusIndex]);

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
            aria-disabled={item.disabled || undefined}
            data-has-submenu={item.submenu ? "" : undefined}
            tabIndex={clampedFocusIndex === nonSepItems.indexOf(item) ? 0 : -1}
            onMouseEnter={() => {
              if (!item.disabled) setFocusIndex(nonSepItems.indexOf(item));
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (!item.disabled) {
                if (item.submenu && onSubmenuOpen) {
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  onSubmenuOpen(item.id, rect.right, rect.top);
                } else {
                  onSelect(item.id);
                }
              }
            }}
          >
            {item.checked && <span className={styles.contextMenuCheck}>✓</span>}
            {item.icon && <span className={styles.contextMenuIcon}>{item.icon}</span>}
            {item.label}
            {item.submenu && <span className={styles.contextMenuChevron}>▸</span>}
          </button>
        ),
      )}
    </div>
  );
}
