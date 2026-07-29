"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import {
  learnNodeMap,
  applicationMap,
  desktopItems,
  applications,
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
import type { ContextMenuTarget } from "./use-context-menu";
import { useFileClipboard } from "./use-file-clipboard";
import { copyTextToSystemClipboard } from "./copy-text";
import {
  useDesktopIconGridPositions,
  getMaxGridDimensions,
  sortItemsByName,
  sortItemsByType,
  type DesktopSortMode,
} from "./use-desktop-icon-positions";
import styles from "./learn.module.css";

const WIDGETS_VISIBLE_KEY = "learn-widgets-visible";

function AboutPanel({
  windowId,
  onContextMenuRequest,
}: {
  windowId: string;
  onContextMenuRequest?: (target: ContextMenuTarget) => void;
}) {
  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const selection = window.getSelection()?.toString().trim() ?? "";
      const container = e.currentTarget.querySelector("[data-copy-content]");
      const fallback = container?.textContent?.trim().slice(0, 500) ?? "";
      onContextMenuRequest?.({
        type: "content",
        windowId,
        contentId: "about",
        contentKind: "about",
        selectedText: selection,
        fallbackText: fallback,
        x: e.clientX,
        y: e.clientY,
      });
    },
    [windowId, onContextMenuRequest],
  );

  return (
    <div className={styles.aboutPanel} onContextMenu={handleContextMenu}>
      <div data-copy-content={windowId}>
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
    menuCopy: string;
    menuRefresh: string;
    menuOpen: string;
    menuHideWidgets: string;
    menuShowWidgets: string;
    menuAbout: string;
    menuReturn: string;
    menuPaste: string;
    toastFileCopied: string;
    toastTextCopied: string;
    toastCopyFailed: string;
    menuSortBy: string;
    sortName: string;
    sortItemType: string;
    sortDefault: string;
    sortCustom: string;
    toastDesktopRefreshed: string;
  };
}

export function LearnExperience({ locale, copy }: LearnExperienceProps) {
  const router = useRouter();
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
  const [widgetsVisible, setWidgetsVisible] = useState(true);
  const [workspaceRect, setWorkspaceRect] = useState<DOMRect | null>(null);
  const [toast, setToast] = useState<{ message: string } | null>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const childMenuRef = useRef<HTMLDivElement | null>(null);
  const childMenuOpenRef = useRef(false);
  const childHoverRef = useRef(false);
  const {
    menu: contextMenu,
    openContextMenu,
    closeContextMenu,
  } = useContextMenu(childMenuOpenRef);
  const { copyFile } = useFileClipboard();
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const explorerSelectionsRef = useRef<
    Record<
      string,
      { nodeId: string; nodeType: string; folderId: string } | null
    >
  >({});
  const isApplyingPopStateRef = useRef(false);
  const {
    positions: customPositions,
    sortMode,
    replacePositions,
  } = useDesktopIconGridPositions();

  const alternateLocale = locale === "en" ? "ar" : "en";

  const showToast = useCallback((message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message });
    toastTimerRef.current = setTimeout(() => setToast(null), 2000);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

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
    try {
      sessionStorage.setItem("learn-returning", "true");
    } catch {}
    router.push(`/${locale}`);
  }, [locale, router]);

  const handleRefresh = useCallback(() => {
    const allIds = [
      ...desktopItems.map((item) => item.id),
      ...applications.map((a) => a.id),
    ];
    const validIds = new Set(allIds);
    const cleaned: Record<string, { column: number; row: number }> = {};
    for (const [id, pos] of Object.entries(customPositions)) {
      if (validIds.has(id)) cleaned[id] = pos;
    }
    replacePositions(cleaned, sortMode);
    closeContextMenu();
    showToast(copy.toastDesktopRefreshed);
  }, [
    customPositions,
    replacePositions,
    sortMode,
    closeContextMenu,
    showToast,
    copy.toastDesktopRefreshed,
  ]);

  const handleOpenAbout = useCallback(() => {
    openDocument("__about__", "About Nour\u2019s Desktop");
  }, [openDocument]);

  const handleOpenFolder = useCallback(
    (id: string, name: string) => {
      const node = learnNodeMap.get(id);
      if (!node?.public || node.type !== "folder") return;
      openExplorer(id, name);
      setStartOpen(false);
    },
    [openExplorer],
  );

  const handleOpenFile = useCallback(
    (id: string, name: string) => {
      const node = learnNodeMap.get(id);
      if (!node?.public || node.type !== "file") return;
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

  const handleSortChange = useCallback(
    (mode: DesktopSortMode) => {
      const allIds = [
        ...desktopItems.map((item) => item.id),
        ...applications.map((a) => a.id),
      ];
      const getLabel = (id: string) => {
        const node = desktopItems.find((item) => item.id === id);
        if (node) return node.name[locale] ?? id;
        const app = applications.find((a) => a.id === id);
        return app?.name ?? id;
      };
      const isFolderFn = (id: string) =>
        desktopItems.some((item) => item.id === id && item.type === "folder");

      const el = workspaceRef.current;
      if (!el) return;
      const { maxCols, maxRows } = getMaxGridDimensions(
        el.clientWidth,
        el.clientHeight,
      );

      if (mode === "name") {
        const positions = sortItemsByName(allIds, maxCols, maxRows, getLabel);
        replacePositions(positions, mode);
      } else if (mode === "item-type") {
        const positions = sortItemsByType(
          allIds,
          maxCols,
          maxRows,
          getLabel,
          isFolderFn,
        );
        replacePositions(positions, mode);
      } else if (mode === "default") {
        replacePositions({}, mode);
      }
    },
    [locale, replacePositions],
  );

  const handleSwitchLocale = useCallback(() => {
    const url = new URL(window.location.href);
    url.pathname = `/${alternateLocale}/learn`;
    window.location.href = url.toString();
  }, [alternateLocale]);

  const handleSelectionChange = useCallback(
    (
      _windowId: string | undefined,
      selection: { nodeId: string; nodeType: string; folderId: string } | null,
    ) => {
      const wid = _windowId ?? "default";
      explorerSelectionsRef.current[wid] = selection;
    },
    [],
  );

  const handleContextMenuOpen = useCallback(
    (x: number, y: number, target: ContextMenuTarget) => {
      const screenRect = desktopRef.current?.getBoundingClientRect();
      openContextMenu(
        screenRect ? x - screenRect.left : x,
        screenRect ? y - screenRect.top : y,
        target,
      );
      setStartOpen(false);
      setSearchOpen(false);
    },
    [openContextMenu],
  );

  const handleExplorerItemContextMenu = useCallback(
    (e: React.MouseEvent, target: ContextMenuTarget) => {
      handleContextMenuOpen(e.clientX, e.clientY, target);
    },
    [handleContextMenuOpen],
  );

  const handleContentContextMenuRequest = useCallback(
    (target: ContextMenuTarget) => {
      const x =
        "x" in target && target.x != null
          ? target.x
          : Math.min(
              window.innerWidth - 160,
              Math.max(10, window.innerWidth / 2),
            );
      const y =
        "y" in target && target.y != null
          ? target.y
          : Math.min(
              window.innerHeight - 100,
              Math.max(10, window.innerHeight / 2),
            );
      handleContextMenuOpen(x, y, target);
    },
    [handleContextMenuOpen],
  );

  const [childMenu, setChildMenu] = useState<{
    open: boolean;
    x: number;
    y: number;
    items: ContextMenuItem[];
  }>({ open: false, x: 0, y: 0, items: [] });

  // Sync ref with state for the escape-handler closure
  useEffect(() => {
    childMenuOpenRef.current = childMenu.open;
  });

  const handleOpenChildMenu = useCallback(
    (_parentId: string, childX: number, childY: number) => {
      const isRtl =
        document.dir === "rtl" || document.documentElement.dir === "rtl";
      const childWidth = 180;
      const screenRect = desktopRef.current?.getBoundingClientRect();
      const localX = screenRect ? childX - screenRect.left : childX;
      const localY = screenRect ? childY - screenRect.top : childY;
      const px = isRtl ? localX - childWidth : localX;
      setChildMenu({
        open: true,
        x: px,
        y: localY,
        items: [
          {
            id: "sort-name",
            label: copy.sortName,
            checked: sortMode === "name",
          },
          {
            id: "sort-item-type",
            label: copy.sortItemType,
            checked: sortMode === "item-type",
          },
          {
            id: "sort-default",
            label: copy.sortDefault,
            checked: sortMode === "default",
          },
        ],
      });
    },
    [copy.sortName, copy.sortItemType, copy.sortDefault, sortMode],
  );

  const handleCloseChildMenu = useCallback(() => {
    setChildMenu((prev) => (prev.open ? { ...prev, open: false } : prev));
    // Restore focus to Sort by parent item
    requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>("[data-submenu-parent]");
      if (el) el.focus();
    });
  }, []);

  const handleCloseAll = useCallback(() => {
    closeContextMenu();
    setChildMenu((prev) => (prev.open ? { ...prev, open: false } : prev));
    childHoverRef.current = false;
  }, [closeContextMenu]);

  const handleChildMouseEnter = useCallback(() => {
    childHoverRef.current = true;
  }, []);

  const handleChildMouseLeave = useCallback(() => {
    childHoverRef.current = false;
  }, []);

  const handleChildHoverBridgeMouseEnter = useCallback(() => {
    childHoverRef.current = true;
  }, []);

  const getContextMenuItems = useCallback(
    (target: ContextMenuTarget): ContextMenuItem[] => {
      switch (target.type) {
        case "desktop":
          return [
            { id: "refresh", label: copy.menuRefresh },
            { id: "sep-1", label: "", separator: true },
            {
              id: "sort-by",
              label: copy.menuSortBy,
              submenu: [
                {
                  id: "sort-name",
                  label: copy.sortName,
                  checked: sortMode === "name",
                },
                {
                  id: "sort-item-type",
                  label: copy.sortItemType,
                  checked: sortMode === "item-type",
                },
                {
                  id: "sort-default",
                  label: copy.sortDefault,
                  checked: sortMode === "default",
                },
              ],
            },
            {
              id: "toggle-widgets",
              label: widgetsVisible
                ? copy.menuHideWidgets
                : copy.menuShowWidgets,
            },
            { id: "about", label: copy.menuAbout },
            { id: "sep-2", label: "", separator: true },
            { id: "return", label: copy.menuReturn },
          ];
        case "file":
          return [
            { id: "open", label: copy.menuOpen },
            { id: "sep-copy", label: "", separator: true },
            { id: "copy", label: copy.menuCopy },
          ];
        case "folder":
          return [
            { id: "open", label: copy.menuOpen },
            { id: "sep-open", label: "", separator: true },
            { id: "refresh", label: copy.menuRefresh },
          ];
        case "app":
          return [];
        case "content": {
          const hasText = !!(target.selectedText || target.fallbackText);
          return [
            { id: "copy-text", label: copy.menuCopy, disabled: !hasText },
          ];
        }
        default:
          return [];
      }
    },
    [copy, widgetsVisible, sortMode],
  );

  const handleContextMenuAction = useCallback(
    (id: string) => {
      const target = contextMenu.target;
      closeContextMenu();
      switch (id) {
        case "refresh":
          handleRefresh();
          break;
        case "sort-name":
          setChildMenu((prev) => (prev.open ? { ...prev, open: false } : prev));
          handleSortChange("name");
          break;
        case "sort-item-type":
          setChildMenu((prev) => (prev.open ? { ...prev, open: false } : prev));
          handleSortChange("item-type");
          break;
        case "sort-default":
          setChildMenu((prev) => (prev.open ? { ...prev, open: false } : prev));
          handleSortChange("default");
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
        case "copy": {
          if (target.type === "file") {
            const node = learnNodeMap.get(target.id);
            if (node?.parentId) {
              copyFile(target.id, node.parentId);
              showToast(copy.toastFileCopied);
            }
          }
          break;
        }
        case "copy-text": {
          if (target.type === "content") {
            const text = target.selectedText || target.fallbackText;
            if (text) {
              copyTextToSystemClipboard(text).then((ok) => {
                showToast(ok ? copy.toastTextCopied : copy.toastCopyFailed);
              });
            } else {
              showToast(copy.toastCopyFailed);
            }
          }
          break;
        }
        case "open": {
          if (target.type === "folder") {
            if (target.explorerWindowId) {
              navigateWindow(
                target.explorerWindowId,
                target.id,
                learnNodeMap.get(target.id)?.name[locale] ?? target.id,
              );
            } else {
              const node = learnNodeMap.get(target.id);
              if (node) handleOpenFolder(target.id, node.name[locale]);
            }
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
    [
      contextMenu.target,
      closeContextMenu,
      handleRefresh,
      handleSortChange,
      toggleWidgets,
      handleOpenAbout,
      handleReturnToRoom,
      handleOpenFolder,
      handleOpenFile,
      handleOpenApp,
      locale,
      navigateWindow,
      copyFile,
      showToast,
      copy,
    ],
  );

  // Close context menu when target window is minimized or closed
  useEffect(() => {
    if (!contextMenu.open) return;
    const target = contextMenu.target;
    if (
      target.type === "content" ||
      target.type === "file" ||
      target.type === "folder"
    ) {
      const targetWindowId =
        "windowId" in target
          ? target.windowId
          : "explorerWindowId" in target
            ? target.explorerWindowId
            : undefined;
      if (targetWindowId && !windows.some((w) => w.id === targetWindowId)) {
        closeContextMenu();
      }
    }
  }, [windows, contextMenu, closeContextMenu]);

  // Sync URL → state on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const folder = params.get("folder");
    const file = params.get("file");
    const app = params.get("app");

    if (folder) {
      const node = learnNodeMap.get(folder);
      if (node?.public && node.type === "folder") {
        openExplorer(folder, node.name[locale]);
      }
    } else if (file) {
      const node = learnNodeMap.get(file);
      if (node?.public && node.type === "file") {
        openDocument(file, node.name[locale]);
      }
    } else if (app) {
      const appEntry = applicationMap.get(app);
      if (appEntry) {
        openApp(app, appEntry.name);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync state → URL using pushState
  useEffect(() => {
    if (isApplyingPopStateRef.current) return;
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
      isApplyingPopStateRef.current = true;
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
        const appEntry = applicationMap.get(appParam);
        if (appEntry) {
          openApp(appParam, appEntry.name);
        }
      } else {
        for (const w of windows) {
          closeWindow(w.id);
        }
      }
      isApplyingPopStateRef.current = false;
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [locale, openExplorer, openDocument, openApp, windows, closeWindow]);

  // Ctrl+C priority: native text > explorer file > nothing
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (contextMenu.open) {
          if (childMenuOpenRef.current) {
            handleCloseChildMenu();
          } else {
            handleCloseAll();
          }
          return;
        }
        if (searchOpen) {
          setSearchOpen(false);
        } else if (startOpen) {
          setStartOpen(false);
        }
      }
      if (e.key === "ArrowDown") {
        if (contextMenu.open && childMenuOpenRef.current) {
          handleCloseChildMenu();
        }
      }
      if (e.key === "ArrowUp") {
        if (contextMenu.open && childMenuOpenRef.current) {
          handleCloseChildMenu();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "c") {
        if (e.repeat) return;

        // Priority 1: Native input/textarea — let browser handle it
        const el = document.activeElement;
        if (
          el instanceof HTMLInputElement ||
          el instanceof HTMLTextAreaElement ||
          (el instanceof HTMLElement && el.isContentEditable)
        ) {
          return;
        }

        // Priority 2: Browser text selection
        const selection = window.getSelection()?.toString().trim();
        if (selection) {
          e.preventDefault();
          copyTextToSystemClipboard(selection).then((ok) => {
            showToast(ok ? copy.toastTextCopied : copy.toastCopyFailed);
          });
          return;
        }

        // Priority 3: Explorer file selection — active visible explorer first, then highest z-index
        const visibleExplorers = windows.filter(
          (w) => !w.minimized && w.type === "explorer",
        );
        const activeExplorer = visibleExplorers.find(
          (w) => w.id === activeWindowId,
        );
        if (activeExplorer) {
          const sel = explorerSelectionsRef.current[activeExplorer.id];
          if (sel && sel.nodeType === "file") {
            e.preventDefault();
            copyFile(sel.nodeId, sel.folderId);
            showToast(copy.toastFileCopied);
            return;
          }
        }
        const highestZExplorer = [...visibleExplorers].sort(
          (a, b) => b.zIndex - a.zIndex,
        )[0];
        if (highestZExplorer && highestZExplorer.id !== activeExplorer?.id) {
          const sel = explorerSelectionsRef.current[highestZExplorer.id];
          if (sel && sel.nodeType === "file") {
            e.preventDefault();
            copyFile(sel.nodeId, sel.folderId);
            showToast(copy.toastFileCopied);
            return;
          }
        }

        // Priority 4: Folder — do nothing
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [
    contextMenu.open,
    handleCloseChildMenu,
    handleCloseAll,
    searchOpen,
    startOpen,
    windows,
    activeWindowId,
    copyFile,
    showToast,
    copy,
  ]);

  // Clean up stale explorer selections when windows close
  useEffect(() => {
    const openWindowIds = new Set(windows.map((w) => w.id));
    for (const id of Object.keys(explorerSelectionsRef.current)) {
      if (!openWindowIds.has(id)) {
        delete explorerSelectionsRef.current[id];
      }
    }
  }, [windows]);

  useEffect(() => {
    if (!contextMenu.open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- safe: clears child menu when parent closes
      setChildMenu((prev) => (prev.open ? { ...prev, open: false } : prev));
      childHoverRef.current = false;
    }
  }, [contextMenu.open]);

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

  const baseContextMenuItems = getContextMenuItems(contextMenu.target);
  const contextMenuItems = baseContextMenuItems;

  const contextMenuItemLabel =
    contextMenu.target.type !== "desktop"
      ? (() => {
          if (contextMenu.target.type === "app") {
            const app = applicationMap.get(contextMenu.target.id);
            return app?.name;
          }
          if (contextMenu.target.type === "content") {
            return undefined;
          }
          if ("id" in contextMenu.target) {
            const node = learnNodeMap.get(contextMenu.target.id as string);
            if (node) {
              const name = node.name[locale];
              return typeof name === "string" ? name : undefined;
            }
          }
          return undefined;
        })()
      : undefined;

  return (
    <div className={styles.learn} data-locale={locale} ref={desktopRef}>
      <div className={styles.wallpaper} aria-hidden="true" />

      <div className={styles.windowsArea} data-workspace ref={workspaceRef}>
        <LearnDesktop
          locale={locale}
          onOpenFolder={handleOpenFolder}
          onOpenFile={handleOpenFile}
          onOpenApp={handleOpenApp}
          onContextMenu={handleContextMenuOpen}
          onDragStart={() => closeContextMenu()}
          sortMode={sortMode}
          onSortChange={handleSortChange}
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
                windowId={win.id}
                onOpenFile={handleOpenFile}
                onOpenFolder={(id, name) => {
                  navigateWindow(win.id, id, name);
                }}
                onReturnToRoom={handleReturnToRoom}
                onItemContextMenu={handleExplorerItemContextMenu}
                onSelectionChange={handleSelectionChange}
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
              <AboutPanel
                windowId={win.id}
                onContextMenuRequest={handleContentContextMenuRequest}
              />
            )}
            {win.type === "document" &&
              win.fileId &&
              win.fileId !== "__about__" && (
                <DocumentViewer
                  locale={locale}
                  fileId={win.fileId}
                  windowId={win.id}
                  onOpenFile={handleOpenFile}
                  onContextMenuRequest={handleContentContextMenuRequest}
                  copy={{
                    copyLink: copy.copyLink,
                    copied: copy.copied,
                    copyFailed: copy.toastCopyFailed,
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
                windowId={win.id}
                onContextMenuRequest={handleContentContextMenuRequest}
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
          onOpenFile={handleOpenFile}
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
          copy={{
            placeholder: copy.searchPlaceholder,
            noResults: copy.noResults,
          }}
        />
      )}

      {contextMenu.open && (
        <DesktopContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenuItems}
          onSelect={handleContextMenuAction}
          onClose={handleCloseAll}
          itemLabel={contextMenuItemLabel}
          expandedId={childMenu.open ? "sort-by" : undefined}
          onSubmenuOpen={handleOpenChildMenu}
          childMenuRef={childMenuRef}
        />
      )}

      {contextMenu.open && childMenu.open && (
        <DesktopContextMenu
          x={childMenu.x}
          y={childMenu.y}
          items={childMenu.items}
          onSelect={handleContextMenuAction}
          onClose={handleCloseChildMenu}
          itemLabel="Sort"
          childMenuRef={childMenuRef}
          onChildMouseEnter={handleChildMouseEnter}
          onChildMouseLeave={handleChildMouseLeave}
          onChildHoverBridgeMouseEnter={handleChildHoverBridgeMouseEnter}
        />
      )}

      {toast && (
        <div
          className={styles.globalToast}
          role="status"
          aria-live="polite"
          data-testid="global-toast"
        >
          {toast.message}
        </div>
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
