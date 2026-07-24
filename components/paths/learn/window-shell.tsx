"use client";

import { useCallback, useRef } from "react";
import type { ReactNode } from "react";
import type { WindowState } from "./use-learn-windows";
import { WindowIcon } from "./learn-icons";
import styles from "./learn.module.css";

interface WindowShellProps {
  window: WindowState;
  active: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove?: (x: number, y: number) => void;
  onResize?: (w: number, h: number) => void;
  children: ReactNode;
}

export function WindowShell({
  window: win,
  active,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
  children,
}: WindowShellProps) {
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; origW: number; origH: number } | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (win.maximized || !onMove) return;
      e.preventDefault();
      dragRef.current = { startX: e.clientX, startY: e.clientY, origX: win.position.x, origY: win.position.y };
      onFocus();

      function onMouseMove(ev: MouseEvent) {
        if (!dragRef.current) return;
        const dx = ev.clientX - dragRef.current.startX;
        const dy = ev.clientY - dragRef.current.startY;
        const vw = window.innerWidth / 100;
        const vh = window.innerHeight / 100;
        onMove!(
          Math.max(0, dragRef.current.origX + dx / vw),
          Math.max(0, dragRef.current.origY + dy / vh),
        );
      }
      function onMouseUp() {
        dragRef.current = null;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [win.maximized, win.position.x, win.position.y, onFocus, onMove],
  );

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (win.maximized || !onResize) return;
      e.preventDefault();
      e.stopPropagation();
      resizeRef.current = { startX: e.clientX, startY: e.clientY, origW: win.size.width, origH: win.size.height };

      function onMouseMove(ev: MouseEvent) {
        if (!resizeRef.current) return;
        const vw = window.innerWidth / 100;
        const vh = window.innerHeight / 100;
        const newW = Math.max(30, resizeRef.current.origW + (ev.clientX - resizeRef.current.startX) / vw);
        const newH = Math.max(15, resizeRef.current.origH + (ev.clientY - resizeRef.current.startY) / vh);
        onResize!(newW, newH);
      }
      function onMouseUp() {
        resizeRef.current = null;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [win.maximized, win.size.width, win.size.height, onResize],
  );

  return (
    <div
      className={styles.window}
      role="dialog"
      aria-label={win.title}
      aria-modal={win.maximized}
      data-maximized={win.maximized}
      data-active={active}
      tabIndex={-1}
      onFocus={onFocus}
      onClick={onFocus}
      style={
        win.maximized
          ? undefined
          : {
              left: `${win.position.x}vw`,
              top: `${win.position.y}vh`,
              width: `${win.size.width}vw`,
              height: `${win.size.height}vh`,
              zIndex: win.zIndex,
            }
      }
    >
      <div
        className={styles.windowHeader}
        data-draggable="true"
        onDoubleClick={() => onMaximize()}
        onMouseDown={handleMouseDown}
      >
        <span className={styles.windowTitle}>{win.title}</span>
        <div className={styles.windowControls}>
          <button
            className={styles.windowControlBtn}
            type="button"
            aria-label="Minimize"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
          >
            <WindowIcon action="minimize" />
          </button>
          <button
            className={styles.windowControlBtn}
            type="button"
            aria-label={win.maximized ? "Restore" : "Maximize"}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
          >
            <WindowIcon action={win.maximized ? "restore" : "maximize"} />
          </button>
          <button
            className={styles.windowControlBtn}
            data-action="close"
            type="button"
            aria-label="Close"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <WindowIcon action="close" />
          </button>
        </div>
      </div>
      <div className={styles.windowBody}>{children}</div>
      {!win.maximized && onResize && (
        <div className={styles.windowResizeHandle} onMouseDown={handleResizeMouseDown} />
      )}
    </div>
  );
}
