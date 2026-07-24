"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface WindowState {
  id: string;
  title: string;
  type: "explorer" | "document" | "app";
  folderId?: string;
  fileId?: string;
  appId?: string;
  maximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

let nextZ = 10;

export function useLearnWindows() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const focusWindow = useCallback((id: string) => {
    setActiveWindowId(id);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: ++nextZ } : w,
      ),
    );
  }, []);

  const openExplorer = useCallback(
    (folderId: string, title: string) => {
      setWindows((prev) => {
        const existing = prev.find(
          (w) => w.type === "explorer" && w.folderId === folderId,
        );
        if (existing) {
          focusWindow(existing.id);
          return prev;
        }
        const id = `explorer-${Date.now()}`;
        const offset = prev.length * 24;
        const newWin: WindowState = {
          id,
          title,
          type: "explorer",
          folderId,
          maximized: false,
          position: { x: 2.5 + offset, y: 2 + offset },
          size: { width: 52, height: 36 },
          zIndex: ++nextZ,
        };
        setActiveWindowId(id);
        return [...prev, newWin];
      });
    },
    [focusWindow],
  );

  const navigateWindow = useCallback(
    (windowId: string, folderId: string, title: string) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === windowId
            ? { ...w, folderId, title }
            : w,
        ),
      );
      focusWindow(windowId);
    },
    [focusWindow],
  );

  const openDocument = useCallback(
    (fileId: string, title: string) => {
      setWindows((prev) => {
        const existing = prev.find(
          (w) => w.type === "document" && w.fileId === fileId,
        );
        if (existing) {
          focusWindow(existing.id);
          return prev;
        }
        const id = `doc-${Date.now()}`;
        const offset = prev.length * 24;
        const newWin: WindowState = {
          id,
          title,
          type: "document",
          fileId,
          maximized: false,
          position: { x: 4 + offset, y: 3 + offset },
          size: { width: 46, height: 34 },
          zIndex: ++nextZ,
        };
        setActiveWindowId(id);
        return [...prev, newWin];
      });
    },
    [focusWindow],
  );

  const openApp = useCallback(
    (appId: string, title: string) => {
      setWindows((prev) => {
        const existing = prev.find(
          (w) => w.type === "app" && w.appId === appId,
        );
        if (existing) {
          focusWindow(existing.id);
          return prev;
        }
        const id = `app-${Date.now()}`;
        const offset = prev.length * 24;
        const newWin: WindowState = {
          id,
          title,
          type: "app",
          appId,
          maximized: false,
          position: { x: 4 + offset, y: 3 + offset },
          size: { width: 48, height: 36 },
          zIndex: ++nextZ,
        };
        setActiveWindowId(id);
        return [...prev, newWin];
      });
    },
    [focusWindow],
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveWindowId((prev) => (prev === id ? null : prev));
  }, []);

  const minimizeWindow = useCallback(() => {
    setActiveWindowId(null);
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized } : w,
      ),
    );
  }, []);

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, position: { x, y } } : w,
      ),
    );
  }, []);

  const resizeWindow = useCallback((id: string, width: number, height: number) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, size: { width, height } } : w,
      ),
    );
  }, []);

  const bringToFront = useCallback(
    (id: string) => {
      focusWindow(id);
    },
    [focusWindow],
  );

  return {
    windows,
    activeWindowId,
    openExplorer,
    navigateWindow,
    openDocument,
    openApp,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    moveWindow,
    resizeWindow,
    bringToFront,
    focusWindow,
  };
}

export function useTime() {
  const [time, setTime] = useState<{ hours: string; minutes: string; date: string }>({
    hours: "",
    minutes: "",
    date: "",
  });
  const mounted = useRef(false);

  useEffect(() => {
    function update() {
      const now = new Date();
      setTime({
        hours: now.toLocaleTimeString(undefined, { hour: "2-digit", hour12: true }),
        minutes: now.toLocaleTimeString(undefined, { minute: "2-digit" }),
        date: now.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
      });
    }
    update();
    mounted.current = true;
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return { ...time, mounted };
}
