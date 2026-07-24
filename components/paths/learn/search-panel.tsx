"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/routing";
import { searchNodes, searchApplications } from "@/content/learn";
import { learnNodeMap } from "@/content/learn";
import { FileIcon, AppIcon, SearchIcon } from "./learn-icons";
import styles from "./learn.module.css";

interface SearchResult {
  kind: "node" | "app";
  id: string;
  name: string;
  summary: string;
  nodeKind?: string;
  appId?: string;
}

interface SearchPanelProps {
  locale: Locale;
  onOpenFile: (fileId: string, title: string) => void;
  onOpenFolder: (folderId: string, title: string) => void;
  onOpenApp?: (appId: string, name: string) => void;
  onClose: () => void;
  copy: { placeholder: string; noResults: string };
}

export function SearchPanel({
  locale,
  onOpenFile,
  onOpenFolder,
  onOpenApp,
  onClose,
  copy,
}: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const nodeResults = query.length >= 2 ? searchNodes(query, learnNodeMap, locale) : [];
  const appResults = query.length >= 2 ? searchApplications(query) : [];

  const results: SearchResult[] = [
    ...nodeResults.map((n) => ({
      kind: "node" as const,
      id: n.id,
      name: n.name[locale],
      summary: n.summary[locale],
      nodeKind: n.kind,
    })),
    ...appResults.map((a) => ({
      kind: "app" as const,
      id: a.id,
      name: a.name,
      summary: a.summary,
      appId: a.id,
    })),
  ];

  const handleSelect = useCallback(
    (result: SearchResult) => {
      if (result.kind === "app") {
        onOpenApp?.(result.id, result.name);
      } else {
        const node = learnNodeMap.get(result.id);
        if (!node) return;
        if (node.type === "folder") {
          onOpenFolder(node.id, node.name[locale]);
        } else {
          onOpenFile(node.id, node.name[locale]);
        }
      }
      onClose();
    },
    [locale, onOpenFile, onOpenFolder, onOpenApp, onClose],
  );

  return (
    <div
      className={styles.searchOverlay}
      role="dialog"
      aria-label="Search"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.searchPanel}>
        <div className={styles.searchInputWrap}>
          <SearchIcon />
          <input
            ref={inputRef}
            className={styles.searchInput}
            type="search"
            placeholder={copy.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={copy.placeholder}
          />
        </div>
        <div className={styles.searchResults}>
          {query.length >= 2 && results.length === 0 && (
            <p className={styles.searchEmpty}>{copy.noResults}</p>
          )}
          {results.map((result) => (
            <button
              key={`${result.kind}-${result.id}`}
              className={styles.searchResult}
              type="button"
              onClick={() => handleSelect(result)}
            >
              <span className={styles.searchResultIcon}>
                {result.kind === "app" ? (
                  <AppIcon
                    app={{ id: result.id, slug: result.id, name: result.name, shortName: result.name, category: "", summary: "", description: "", usedFor: [], relatedSkillIds: [], relatedFileIds: [], relatedProjectSlugs: [], tags: [] }}
                    size={20}
                  />
                ) : (
                  <FileIcon kind={(result.nodeKind as "document" | "workflow" | "skill" | "collection" | "folder") ?? "document"} />
                )}
              </span>
              <div className={styles.searchResultInfo}>
                <div className={styles.searchResultName}>
                  {result.name}
                  {result.kind === "app" && (
                    <span className={styles.searchResultBadge}>App</span>
                  )}
                </div>
                <div className={styles.searchResultSummary}>
                  {result.summary}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
