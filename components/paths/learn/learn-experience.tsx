"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import type { Locale } from "@/i18n/routing";
import {
  learnNodeMap,
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
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const alternateLocale = locale === "en" ? "ar" : "en";

  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem(WIDGETS_VISIBLE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- safe: useLayoutEffect reads localStorage before paint
      if (stored !== null) setWidgetsVisible(stored === "true");
    } catch {}
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

  const handleContextMenuAction = useCallback(
    (id: string) => {
      setContextMenu(null);
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
      }
    },
    [handleRefresh, toggleWidgets, handleOpenAbout, handleReturnToRoom],
  );

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const folder = params.get("folder");
    const file = params.get("file");

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
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const url = new URL(window.location.href);
    const explorer = windows.find((w) => w.type === "explorer");
    const doc = windows.find((w) => w.type === "document");
    const app = windows.find((w) => w.type === "app");

    if (doc?.fileId) {
      url.searchParams.set("file", doc.fileId);
      url.searchParams.delete("folder");
      url.searchParams.delete("app");
    } else if (app?.appId) {
      url.searchParams.set("app", app.appId);
      url.searchParams.delete("folder");
      url.searchParams.delete("file");
    } else if (explorer?.folderId) {
      url.searchParams.set("folder", explorer.folderId);
      url.searchParams.delete("file");
      url.searchParams.delete("app");
    } else {
      url.searchParams.delete("folder");
      url.searchParams.delete("file");
      url.searchParams.delete("app");
    }

    window.history.replaceState(null, "", url.toString());
  }, [windows]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (contextMenu) {
          setContextMenu(null);
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
  }, [searchOpen, startOpen, contextMenu]);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- safe: clears transient context menu state on layout
    setContextMenu(null);
  }, [startOpen, searchOpen]);

  return (
    <div className={styles.learn} data-locale={locale}>
      <div className={styles.wallpaper} aria-hidden="true" />

      <div className={styles.windowsArea}>
        <LearnDesktop
          locale={locale}
          onOpenFolder={handleOpenFolder}
          onOpenApp={handleOpenApp}
          onDesktopContextMenu={(x, y) => {
            setContextMenu({ x, y });
            setStartOpen(false);
            setSearchOpen(false);
          }}
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
            onMinimize={() => minimizeWindow()}
            onMaximize={() => toggleMaximize(win.id)}
            onFocus={() => bringToFront(win.id)}
            onMove={(x, y) => moveWindow(win.id, x, y)}
            onResize={(w, h) => resizeWindow(win.id, w, h)}
          >
            {win.type === "explorer" && win.folderId && (
              <FileExplorer
                locale={locale}
                initialFolderId={win.folderId}
                onOpenFile={handleOpenFile}
                onOpenFolder={(id, name) => {
                  navigateWindow(win.id, id, name);
                }}
                onReturnToRoom={handleReturnToRoom}
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

      {contextMenu && (
        <DesktopContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenuItems}
          onSelect={handleContextMenuAction}
          onClose={() => setContextMenu(null)}
        />
      )}

      <LearnTaskbar
        locale={locale}
        windows={windows}
        activeWindowId={activeWindowId}
        onFocusWindow={focusWindow}
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
