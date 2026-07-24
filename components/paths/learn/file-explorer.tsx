"use client";

import { useCallback, useState } from "react";
import type { Locale } from "@/i18n/routing";
import {
  type LearnNode,
  getNodePath,
  getChildNodes,
  searchNodes,
} from "@/content/learn";
import { learnNodeMap, navItems } from "@/content/learn";
import { FileIcon, NavIcon, ChevronIcon, SearchIcon } from "./learn-icons";
import styles from "./learn.module.css";

interface FileExplorerProps {
  locale: Locale;
  initialFolderId: string;
  onOpenFile: (fileId: string, title: string) => void;
  onOpenFolder: (folderId: string, title: string) => void;
  onReturnToRoom: () => void;
  copy: {
    returnToRoom: string;
    searchPlaceholder: string;
    emptyFolder: string;
    itemCountPattern: string;
    thisPC: string;
    desktop: string;
  };
}

export function FileExplorer({
  locale,
  initialFolderId,
  onOpenFile,
  onOpenFolder,
  onReturnToRoom,
  copy,
}: FileExplorerProps) {
  const [currentFolderId, setCurrentFolderId] = useState(initialFolderId);
  const [history, setHistory] = useState<string[]>([initialFolderId]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const currentFolder = learnNodeMap.get(currentFolderId);
  const children = currentFolder
    ? getChildNodes(currentFolderId, learnNodeMap)
    : [];
  const breadcrumbPath = currentFolder
    ? getNodePath(currentFolderId, learnNodeMap)
    : [];

  const searchResults =
    searchQuery.length >= 2
      ? searchNodes(searchQuery, learnNodeMap, locale)
      : [];

  const navigateTo = useCallback(
    (folderId: string) => {
      setCurrentFolderId(folderId);
      setSelectedId(null);
      setSearchQuery("");
      setHistory((prev) => {
        const newHist = prev.slice(0, historyIndex + 1);
        newHist.push(folderId);
        return newHist;
      });
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex],
  );

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentFolderId(history[newIndex]!);
      setSelectedId(null);
    }
  }, [history, historyIndex]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentFolderId(history[newIndex]!);
      setSelectedId(null);
    }
  }, [history, historyIndex]);

  const goUp = useCallback(() => {
    if (currentFolder?.parentId) {
      navigateTo(currentFolder.parentId);
    }
  }, [currentFolder, navigateTo]);

  const handleItemClick = useCallback(
    (node: LearnNode) => {
      setSelectedId(node.id);
    },
    [],
  );

  const handleItemOpen = useCallback(
    (node: LearnNode) => {
      if (node.type === "folder") {
        onOpenFolder(node.id, node.name[locale]);
      } else {
        onOpenFile(node.id, node.name[locale]);
      }
    },
    [locale, onOpenFile, onOpenFolder],
  );

  const handleItemKeyDown = useCallback(
    (e: React.KeyboardEvent, node: LearnNode) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleItemOpen(node);
      }
    },
    [handleItemOpen],
  );

  const handleNavClick = useCallback(
    (id: string) => {
      if (id === "__return__") {
        onReturnToRoom();
        return;
      }
      if (id === "__desktop__") {
        navigateTo("this-pc");
        return;
      }
      if (id === "__thispc__") {
        navigateTo("this-pc");
        return;
      }
      navigateTo(id);
    },
    [navigateTo, onReturnToRoom],
  );

  const handleBreadcrumbClick = useCallback(
    (id: string) => {
      navigateTo(id);
    },
    [navigateTo],
  );

  return (
    <div className={styles.explorer}>
      <nav className={styles.explorerNav} aria-label="Navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={styles.explorerNavItem}
            type="button"
            data-kind={item.id.startsWith("__") ? item.id : undefined}
            aria-current={item.id === currentFolderId ? "page" : undefined}
            onClick={() => handleNavClick(item.id)}
          >
            <NavIcon id={item.id} />
            {item.name[locale]}
          </button>
        ))}
      </nav>

      <div className={styles.explorerMain}>
        <div className={styles.explorerToolbar}>
          <button
            className={styles.explorerToolbarBtn}
            type="button"
            aria-label="Back"
            disabled={historyIndex === 0}
            onClick={goBack}
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            className={styles.explorerToolbarBtn}
            type="button"
            aria-label="Forward"
            disabled={historyIndex >= history.length - 1}
            onClick={goForward}
          >
            <ChevronIcon direction="right" />
          </button>
          <button
            className={styles.explorerToolbarBtn}
            type="button"
            aria-label="Up"
            disabled={!currentFolder?.parentId}
            onClick={goUp}
          >
            <ChevronIcon direction="up" />
          </button>

          <div className={styles.explorerBreadcrumbs}>
            <div className={styles.breadcrumb}>
              {breadcrumbPath.map((crumb, i) => (
                <span key={crumb.id} className={styles.breadcrumb}>
                  {i > 0 && (
                    <span className={styles.breadcrumbSep} aria-hidden="true">
                      ›
                    </span>
                  )}
                  <button
                    className={styles.breadcrumbBtn}
                    type="button"
                    onClick={() => handleBreadcrumbClick(crumb.id)}
                  >
                    {crumb.name[locale]}
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className={styles.explorerSearch}>
            <SearchIcon />
            <input
              className={styles.explorerSearchInput}
              type="search"
              placeholder={copy.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={copy.searchPlaceholder}
            />
          </div>
        </div>

        <div className={styles.explorerContent}>
          {searchQuery.length >= 2 ? (
            <div className={styles.explorerGrid} role="listbox" aria-label="Search results">
              {searchResults.length === 0 ? (
                <p className={styles.searchEmpty}>No results found.</p>
              ) : (
                searchResults.map((node) => (
                  <button
                    key={node.id}
                    className={styles.fileItem}
                    type="button"
                    role="option"
                    aria-selected={node.id === selectedId}
                    onClick={() => handleItemClick(node)}
                    onDoubleClick={() => handleItemOpen(node)}
                    onKeyDown={(e) => handleItemKeyDown(e, node)}
                  >
                    <span className={styles.fileItemIcon}>
                      <FileIcon kind={node.kind} />
                    </span>
                    <span className={styles.fileItemName}>
                      {node.name[locale]}
                    </span>
                  </button>
                ))
              )}
            </div>
          ) : children.length === 0 ? (
            <p className={styles.searchEmpty}>{copy.emptyFolder}</p>
          ) : (
            <div className={styles.explorerGrid} role="listbox" aria-label="Files">
              {children.map((node) => (
                <button
                  key={node.id}
                  className={styles.fileItem}
                  type="button"
                  role="option"
                  aria-selected={node.id === selectedId}
                  onClick={() => handleItemClick(node)}
                  onDoubleClick={() => handleItemOpen(node)}
                  onKeyDown={(e) => handleItemKeyDown(e, node)}
                >
                  <span className={styles.fileItemIcon}>
                    <FileIcon kind={node.kind} />
                  </span>
                  <span className={styles.fileItemName}>
                    {node.name[locale]}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.explorerStatus}>
          {searchQuery.length >= 2
            ? `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""}`
            : copy.itemCountPattern.replace("{{count}}", String(children.length))}
        </div>
      </div>
    </div>
  );
}
