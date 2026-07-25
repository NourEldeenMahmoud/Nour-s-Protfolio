"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/routing";
import {
  learnNodeMap,
  applicationMap,
} from "@/content/learn";
import { useLearnWindows } from "./use-learn-windows";
import { LearnDesktop } from "./learn-desktop";
import { WindowShell } from "./window-shell";
import { FileExplorer } from "./file-explorer";
import { DocumentViewer } from "./document-viewer";
import { AppProfileViewer } from "./app-profile-viewer";
import { LearnTaskbar } from "./learn-taskbar";
import { StartMenu } from "./start-menu";
import { SearchPanel } from "./search-panel";
import { LearnWidgets } from "./learn-widgets";
import { DesktopContextMenu } from "./desktop-context-menu";
import type { ContextMenuItem } from "./desktop-context-menu";
import { useContextMenu } from "./use-context-menu";
import styles from "./learn.module.css";

const WIDGETS_VISIBLE_KEY = "learn-widgets-visible";

function AboutPanel() {
  return (
    <div className={styles.aboutPanel}>
      <h2>About Nour&apos;s Desktop</h2>
      <p>
        This desktop is a visual map of the tools, knowledge, workflows, and
        engineering practices Nour uses to learn and build software.
      </p>
      <ul>
        <li>Knowledge and technical summaries</li>
        <li>Applications and development tools</li>
        <li>AI-assisted workflows</li>
        <li>Skills connected to real project evidence</li>
      </ul>
    </div>
  );
}

interface LearnExperienceProps {
  locale: Locale;
  copy: {
    returnToRoom: string;
    openComputer: string;
    start: string;
    search: string;
    searchPlaceholder: string;
    fileExplorer: string;
    desktop: string;
    emptyFolder: string;
    itemCountPattern: string;
    thisPC: string;
    copyLink: string;
    copied: string;
    openProject: string;
    relatedFiles: string;
    relatedProjects: string;
    limitations: string;
    startMenuTitle: string;
    noResults: string;
    languageLabel: string;
    usedFor: string;
    workflowUses: string;
    relatedSkills: string;
  };
}

export function LearnExperience({ locale, copy }: LearnExperienceProps) {
  const {
    windows,
    activeWindowId,
    openExplorer,
    navigateWindow,
    openDocument,
    openApp,
    closeWindow,
    minimizeWindow,
    restoreWindow,
    toggleMaximize,
    moveWindow,
    resizeWindow,
    bringToFront,
    focusWindow,
  } = useLearnWindows();

  const [startOpen, setStartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [widgetsVisible, setWidgetsVisible] = useState(true);
  const [workspaceRect, setWorkspaceRect] = useState<DOMRect | null>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const { menu: contextMenu, openContextMenu, closeContextMenu } = useContextMenu();

  const alternateLocale = locale === "en" ? "ar" : "en";

  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem(WIDGETS_VISIBLE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- safe: useLayoutEffect reads localStorage before paint
      if (stored !== null) setWidgetsVisible(stored === "true");
    } catch {}
  }, []);

  useEffect(() => {
    const el = workspaceRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setWorkspaceRect(entry.contentRect);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const toggleWidgets = useCallback(() => {
    setWidgetsVisible((v) => {
      const next = !v;
      try {
        localStorage.setItem(WIDGETS_VISIBLE_KEY, String(next));
      } catch {}
      return next;
    });
  }, []);

  const handleReturnToRoom = useCallback(() => {
    sessionStorage.setItem("learn-returning", "true");
    window.location.href = `/${locale}`;
  }, [locale]);

  const handleRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const handleOpenAbout = useCallback(() => {
    openDocument("__about__", "About Nour\u2019s Desktop");
  }, [openDocument]);

  const handleOpenFolder = useCallback(
    (id: string, name: string) => {
      openExplorer(id, name);
      setStartOpen(false);
    },
    [openExplorer],
  );

  const handleOpenFile = useCallback(
    (id: string, name: string) => {
      openDocument(id, name);
    },
    [openDocument],
  );

  const handleOpenApp = useCallback(
    (appId: string, name: string) => {
      openApp(appId, name);
      setStartOpen(false);
    },
    [openApp],
  );

  const handleSwitchLocale = useCallback(() => {
    const url = new URL(window.location.href);
    url.pathname = `/${alternateLocale}/learn`;
    window.location.href = url.toString();
  }, [alternateLocale]);

  const contextMenuItems: ContextMenuItem[] = [
    { id: "refresh", label: "Refresh" },
    { id: "sep-1", label: "", separator: true },
    {
      id: "toggle-widgets",
      label: widgetsVisible ? "Hide widgets" : "Show widgets",
    },
    { id: "about", label: "About this desktop" },
    { id: "sep-2", label: "", separator: true },
    { id: "return", label: "Return to Room" },
  ];

  const itemContextMenuItems: ContextMenuItem[] = [
    { id: "open", label: "Open" },
    { id: "sep-open", label: "", separator: true },
    { id: "refresh", label: "Refresh" },
  ];

  const handleContextMenuAction = useCallback(
    (id: string) => {
      const target = contextMenu.target;
      closeContextMenu();
      switch (id) {
        case "refresh":
          handleRefresh();
          break;
        case "toggle-widgets":
          toggleWidgets();
          break;
        case "about":
          handleOpenAbout();
          break;
        case "return":
          handleReturnToRoom();
          break;
        case "open": {
          if (target.type === "folder") {
            const node = learnNodeMap.get(target.id);
            if (node) handleOpenFolder(target.id, node.name[locale]);
          } else if (target.type === "file") {
            const node = learnNodeMap.get(target.id);
            if (node) handleOpenFile(target.id, node.name[locale]);
          } else if (target.type === "app") {
            const app = applicationMap.get(target.id);
            if (app) handleOpenApp(target.id, app.name);
          }
          break;
        }
      }
    },
    [contextMenu.target, closeContextMenu, handleRefresh, toggleWidgets, handleOpenAbout, handleReturnToRoom, handleOpenFolder, handleOpenFile, handleOpenApp, locale],
  );

  // Sync URL → state on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const folder = params.get("folder");
    const file = params.get("file");
    const app = params.get("app");

    if (folder) {
      const node = learnNodeMap.get(folder);
      if (node) {
        openExplorer(folder, node.name[locale]);
      }
    } else if (file) {
      const node = learnNodeMap.get(file);
      if (node) {
        openDocument(file, node.name[locale]);
      }
    } else if (app) {
      const node = learnNodeMap.get(app);
      if (node) {
        openDocument(app, node.name[locale]);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync state → URL using pushState
  useEffect(() => {
    const url = new URL(window.location.href);
    const explorer = windows.find((w) => w.type === "explorer" && !w.minimized);
    const doc = windows.find((w) => w.type === "document" && !w.minimized);
    const app = windows.find((w) => w.type === "app" && !w.minimized);

    const prevFolder = url.searchParams.get("folder");
    const prevFile = url.searchParams.get("file");
    const prevApp = url.searchParams.get("app");

    let nextFolder: string | null = null;
    let nextFile: string | null = null;
    let nextApp: string | null = null;

    if (doc?.fileId) {
      nextFile = doc.fileId;
    } else if (app?.appId) {
      nextApp = app.appId;
    } else if (explorer?.folderId) {
      nextFolder = explorer.folderId;
    }

    const changed =
      prevFolder !== nextFolder || prevFile !== nextFile || prevApp !== nextApp;

    if (nextFolder) {
      url.searchParams.set("folder", nextFolder);
      url.searchParams.delete("file");
      url.searchParams.delete("app");
    } else if (nextFile) {
      url.searchParams.set("file", nextFile);
      url.searchParams.delete("folder");
      url.searchParams.delete("app");
    } else if (nextApp) {
      url.searchParams.set("app", nextApp);
      url.searchParams.delete("folder");
      url.searchParams.delete("file");
    } else {
      url.searchParams.delete("folder");
      url.searchParams.delete("file");
      url.searchParams.delete("app");
    }

    if (changed) {
      window.history.pushState(null, "", url.toString());
    }
  }, [windows]);

  // Handle browser Back/Forward
  useEffect(() => {
    function handlePopState() {
      const params = new URLSearchParams(window.location.search);
      const folder = params.get("folder");
      const file = params.get("file");
      const appParam = params.get("app");

      if (folder) {
        const node = learnNodeMap.get(folder);
        if (node) {
          openExplorer(folder, node.name[locale]);
        }
      } else if (file) {
        const node = learnNodeMap.get(file);
        if (node) {
          openDocument(file, node.name[locale]);
        }
      } else if (appParam) {
        const node = learnNodeMap.get(appParam);
        if (node) {
          openApp(appParam, node.name[locale]);
        }
      }
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [locale, openExplorer, openDocument, openApp]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (contextMenu.open) {
          closeContextMenu();
          return;
        }
        if (searchOpen) {
          setSearchOpen(false);
        } else if (startOpen) {
          setStartOpen(false);
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [searchOpen, startOpen, contextMenu.open, closeContextMenu]);

  useLayoutEffect(() => {
    closeContextMenu();
  }, [startOpen, searchOpen, closeContextMenu]);

  const handleMinimize = useCallback(
    (id: string) => {
      minimizeWindow(id);
    },
    [minimizeWindow],
  );

  const handleRestore = useCallback(
    (id: string) => {
      restoreWindow(id);
    },
    [restoreWindow],
  );

  const handleContextMenuOpen = useCallback(
    (x: number, y: number, target: { type: string; id?: string }) => {
      openContextMenu(x, y, target as import("./use-context-menu").ContextMenuTarget);
      setStartOpen(false);
      setSearchOpen(false);
    },
    [openContextMenu],
  );

  const handleExplorerItemContextMenu = useCallback(
    (e: React.MouseEvent, target: import("./use-context-menu").ContextMenuTarget) => {
      handleContextMenuOpen(e.clientX, e.clientY, target);
    },
    [handleContextMenuOpen],
  );

  const contextMenuItemLabel =
    contextMenu.target.type !== "desktop"
      ? (() => {
          if (contextMenu.target.type === "app") {
            const app = applicationMap.get(contextMenu.target.id);
            return app?.name;
          }
          const node = learnNodeMap.get(contextMenu.target.id);
          if (node) {
            const name = node.name[locale];
            return typeof name === "string" ? name : undefined;
          }
          return undefined;
        })()
      : undefined;

  return (
    <div className={styles.learn} data-locale={locale}>
      <div className={styles.wallpaper} aria-hidden="true" />

      <div className={styles.windowsArea} data-workspace ref={workspaceRef}>
        <LearnDesktop
          locale={locale}
          onOpenFolder={handleOpenFolder}
          onOpenApp={handleOpenApp}
          onContextMenu={handleContextMenuOpen}
          refreshKey={refreshKey}
        />

        {widgetsVisible && (
          <LearnWidgets
            locale={locale}
            onOpenFolder={handleOpenFolder}
            onOpenFile={handleOpenFile}
            learnNodeMap={learnNodeMap}
          />
        )}

        {windows.map((win) => (
          <WindowShell
            key={win.id}
            window={win}
            active={win.id === activeWindowId}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => handleMinimize(win.id)}
            onMaximize={() => toggleMaximize(win.id)}
            onFocus={() => bringToFront(win.id)}
            onMove={(x, y) => moveWindow(win.id, x, y)}
            onResize={(w, h) => resizeWindow(win.id, w, h)}
            workspaceRect={workspaceRect}
          >
            {win.type === "explorer" && win.folderId && (
              <FileExplorer
                locale={locale}
                folderId={win.folderId}
                onOpenFile={handleOpenFile}
                onOpenFolder={(id, name) => {
                  navigateWindow(win.id, id, name);
                }}
                onReturnToRoom={handleReturnToRoom}
                onItemContextMenu={handleExplorerItemContextMenu}
                copy={{
                  returnToRoom: copy.returnToRoom,
                  searchPlaceholder: copy.searchPlaceholder,
                  emptyFolder: copy.emptyFolder,
                  itemCountPattern: copy.itemCountPattern,
                  thisPC: copy.thisPC,
                  desktop: copy.desktop,
                }}
              />
            )}
            {win.type === "document" && win.fileId === "__about__" && (
              <AboutPanel />
            )}
            {win.type === "document" && win.fileId && win.fileId !== "__about__" && (
              <DocumentViewer
                locale={locale}
                fileId={win.fileId}
                onOpenFile={handleOpenFile}
                copy={{
                  copyLink: copy.copyLink,
                  copied: copy.copied,
                  openProject: copy.openProject,
                  relatedFiles: copy.relatedFiles,
                  relatedProjects: copy.relatedProjects,
                  limitations: copy.limitations,
                }}
              />
            )}
            {win.type === "app" && win.appId && (
              <AppProfileViewer
                locale={locale}
                appId={win.appId}
                copy={{
                  usedFor: copy.usedFor,
                  workflowUses: copy.workflowUses,
                  relatedSkills: copy.relatedSkills,
                  relatedFiles: copy.relatedFiles,
                  relatedProjects: copy.relatedProjects,
                  openProject: copy.openProject,
                }}
              />
            )}
          </WindowShell>
        ))}
      </div>

      {startOpen && (
        <StartMenu
          locale={locale}
          onOpenFolder={handleOpenFolder}
          onOpenApp={handleOpenApp}
          onClose={() => setStartOpen(false)}
          copy={{ title: copy.startMenuTitle }}
        />
      )}

      {searchOpen && (
        <SearchPanel
          locale={locale}
          onOpenFile={handleOpenFile}
          onOpenFolder={handleOpenFolder}
          onOpenApp={handleOpenApp}
          onClose={() => setSearchOpen(false)}
          copy={{ placeholder: copy.searchPlaceholder, noResults: copy.noResults }}
        />
      )}

      {contextMenu.open && (
        <DesktopContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.target.type === "desktop" ? contextMenuItems : itemContextMenuItems}
          onSelect={handleContextMenuAction}
          onClose={closeContextMenu}
          itemLabel={contextMenuItemLabel}
        />
      )}

      <LearnTaskbar
        locale={locale}
        windows={windows}
        activeWindowId={activeWindowId}
        onFocusWindow={focusWindow}
        onRestoreWindow={handleRestore}
        onOpenStart={() => setStartOpen((v) => !v)}
        onStartOpen={startOpen}
        onOpenSearch={() => setSearchOpen(true)}
        onReturnToRoom={handleReturnToRoom}
        onSwitchLocale={handleSwitchLocale}
        copy={{
          start: copy.start,
          search: copy.search,
          fileExplorer: copy.fileExplorer,
          returnToRoom: copy.returnToRoom,
          language: copy.languageLabel,
        }}
      />
    </div>
  );
}
