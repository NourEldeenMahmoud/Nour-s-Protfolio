"use client";

import { useCallback, useState } from "react";
import type { Locale } from "@/i18n/routing";
import { learnNodeMap, getNodePath } from "@/content/learn";
import { getProject } from "@/content/portfolio";
import { copyTextToSystemClipboard, buildDocumentPlainText } from "./copy-text";
import styles from "./learn.module.css";

interface DocumentViewerProps {
  locale: Locale;
  fileId: string;
  windowId?: string;
  onOpenFile: (fileId: string, title: string) => void;
  onContextMenuRequest?: (
    target: import("./use-context-menu").ContextMenuTarget,
  ) => void;
  copy: {
    copyLink: string;
    copied: string;
    copyFailed: string;
    openProject: string;
    relatedFiles: string;
    relatedProjects: string;
    limitations: string;
  };
}

export function DocumentViewer({
  locale,
  fileId,
  windowId,
  onOpenFile,
  onContextMenuRequest,
  copy,
}: DocumentViewerProps) {
  const [copyState, setCopyState] = useState<"idle" | "success" | "failed">(
    "idle",
  );
  const node = learnNodeMap.get(fileId);

  const handleCopyLink = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("file", fileId);
    copyTextToSystemClipboard(url.toString()).then((ok) => {
      setCopyState(ok ? "success" : "failed");
      setTimeout(() => setCopyState("idle"), 2000);
    });
  }, [fileId]);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const selection = window.getSelection()?.toString().trim() ?? "";
      const fallback = node ? buildDocumentPlainText(node, locale) : "";
      onContextMenuRequest?.({
        type: "content",
        windowId: windowId ?? "",
        contentId: fileId,
        contentKind: "document",
        selectedText: selection,
        fallbackText: fallback,
        x: e.clientX,
        y: e.clientY,
      });
    },
    [windowId, fileId, locale, node, onContextMenuRequest],
  );

  if (!node) {
    return (
      <div className={styles.docViewer}>
        <div className={styles.docContent}>
          <p>Document not found.</p>
        </div>
      </div>
    );
  }

  const breadcrumbPath = getNodePath(fileId, learnNodeMap);
  const pathString = breadcrumbPath.map((b) => b.name[locale]).join(" › ");

  return (
    <div className={styles.docViewer} onContextMenu={handleContextMenu}>
      <div className={styles.docContent} data-copy-content={windowId}>
        <p className={styles.docPath}>{pathString}</p>
        <h2 className={styles.docTitle}>{node.name[locale]}</h2>

        <p className={styles.docSectionContent}>{node.summary[locale]}</p>

        {node.sections?.map((section, i) => (
          <div key={i} className={styles.docSection}>
            <h3 className={styles.docSectionHeading}>
              {section.heading[locale]}
            </h3>
            <p className={styles.docSectionContent}>
              {section.content[locale]}
            </p>

            {section.kind === "list" && section.items && (
              <ul className={styles.docList}>
                {section.items.map((item, j) => (
                  <li key={j}>{item[locale]}</li>
                ))}
              </ul>
            )}

            {section.kind === "steps" && section.items && (
              <ol className={styles.docSteps}>
                {section.items.map((item, j) => (
                  <li key={j}>{item[locale]}</li>
                ))}
              </ol>
            )}

            {section.kind === "callout" && (
              <div className={styles.docCallout}>{section.content[locale]}</div>
            )}
          </div>
        ))}

        {node.tags.length > 0 && (
          <div className={styles.docRelated}>
            <p className={styles.docRelatedTitle}>
              {locale === "ar" ? "الوسوم" : "Tags"}
            </p>
            <ul className={styles.docRelatedList}>
              {node.tags.map((tag) => (
                <li key={tag} className={styles.docRelatedTag}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        )}

        {node.relatedProjectSlugs.length > 0 && (
          <div className={styles.docRelated}>
            <p className={styles.docRelatedTitle}>{copy.relatedProjects}</p>
            <div className={styles.docProjectLinks}>
              {node.relatedProjectSlugs.map((slug) => {
                const project = getProject(slug);
                if (!project) return null;
                return (
                  <a
                    key={slug}
                    className={styles.docProjectLink}
                    href={project.repository}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.shortTitle} ↗
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {node.relatedFileIds.length > 0 && (
          <div className={styles.docRelated}>
            <p className={styles.docRelatedTitle}>{copy.relatedFiles}</p>
            <ul className={styles.docRelatedList}>
              {node.relatedFileIds.map((rid) => {
                const related = learnNodeMap.get(rid);
                if (!related) return null;
                return (
                  <li key={rid}>
                    <button
                      className={styles.docRelatedTag}
                      type="button"
                      onClick={() => onOpenFile(rid, related.name[locale])}
                    >
                      {related.name[locale]}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div style={{ marginTop: "1rem" }}>
          <button
            className={styles.docCopyLink}
            type="button"
            onClick={handleCopyLink}
          >
            {copyState === "success"
              ? copy.copied
              : copyState === "failed"
                ? copy.copyFailed
                : copy.copyLink}
          </button>
        </div>
      </div>
    </div>
  );
}
