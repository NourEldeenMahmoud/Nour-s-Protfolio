"use client";

import { useCallback } from "react";
import type { Locale } from "@/i18n/routing";
import { applicationMap, learnNodeMap } from "@/content/learn";
import { getProject } from "@/content/portfolio";
import { buildAppPlainText } from "./copy-text";
import { downloadTextFile } from "./download-file";
import styles from "./learn.module.css";

interface AppProfileViewerProps {
  locale: Locale;
  appId: string;
  windowId?: string;
  onContextMenuRequest?: (
    target: import("./use-context-menu").ContextMenuTarget,
  ) => void;
  copy: {
    usedFor: string;
    workflowUses: string;
    relatedSkills: string;
    relatedFiles: string;
    relatedProjects: string;
    openProject: string;
  };
}

export function AppProfileViewer({
  locale,
  appId,
  windowId,
  onContextMenuRequest,
  copy,
}: AppProfileViewerProps) {
  const app = applicationMap.get(appId);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const selection = window.getSelection()?.toString().trim() ?? "";
      const fallback = app ? buildAppPlainText(app) : "";
      onContextMenuRequest?.({
        type: "content",
        windowId: windowId ?? "",
        contentId: appId,
        contentKind: "app",
        selectedText: selection,
        fallbackText: fallback,
        x: e.clientX,
        y: e.clientY,
      });
    },
    [windowId, appId, app, onContextMenuRequest],
  );

  if (!app) {
    return (
      <div className={styles.docViewer}>
        <div className={styles.docContent}>
          <p>Application not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.docViewer} onContextMenu={handleContextMenu}>
      <div className={styles.docContent} data-copy-content={windowId}>
        <div className={styles.appProfileHeader}>
          <div className={styles.appProfileBadge}>
            <span className={styles.appProfileCategory}>{app.category}</span>
          </div>
          <h2 className={styles.docTitle}>{app.name}</h2>
          <p className={styles.docSectionContent}>{app.summary}</p>
        </div>

        <div className={styles.docSection}>
          <h3 className={styles.docSectionHeading}>Description</h3>
          <p className={styles.docSectionContent}>{app.description}</p>
        </div>

        <div className={styles.docSection}>
          <h3 className={styles.docSectionHeading}>{copy.usedFor}</h3>
          <ul className={styles.docList}>
            {app.usedFor.map((use, i) => (
              <li key={i}>{use}</li>
            ))}
          </ul>
        </div>

        {app.workflowUses && app.workflowUses.length > 0 && (
          <div className={styles.docSection}>
            <h3 className={styles.docSectionHeading}>{copy.workflowUses}</h3>
            <ul className={styles.docList}>
              {app.workflowUses.map((use, i) => (
                <li key={i}>{use}</li>
              ))}
            </ul>
          </div>
        )}

        {app.relatedSkillIds.length > 0 && (
          <div className={styles.docRelated}>
            <p className={styles.docRelatedTitle}>{copy.relatedSkills}</p>
            <ul className={styles.docRelatedList}>
              {app.relatedSkillIds.map((sid) => {
                const skill = learnNodeMap.get(sid);
                if (!skill?.public) return null;
                return (
                  <li key={sid} className={styles.docRelatedTag}>
                    {skill.name[locale]}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {app.relatedFileIds.length > 0 && (
          <div className={styles.docRelated}>
            <p className={styles.docRelatedTitle}>{copy.relatedFiles}</p>
            <ul className={styles.docRelatedList}>
              {app.relatedFileIds.map((fid) => {
                const file = learnNodeMap.get(fid);
                if (!file?.public) return null;
                return (
                  <li key={fid} className={styles.docRelatedTag}>
                    {file.name[locale]}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {app.relatedProjectSlugs.length > 0 && (
          <div className={styles.docRelated}>
            <p className={styles.docRelatedTitle}>{copy.relatedProjects}</p>
            <div className={styles.docProjectLinks}>
              {app.relatedProjectSlugs.map((slug) => {
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

        {app.tags.length > 0 && (
          <div className={styles.docRelated}>
            <p className={styles.docRelatedTitle}>Tags</p>
            <ul className={styles.docRelatedList}>
              {app.tags.map((tag) => (
                <li key={tag} className={styles.docRelatedTag}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.docUtilityActions}>
          <button
            className={styles.docDownload}
            type="button"
            onClick={() =>
              downloadTextFile(`${app.slug}.md`, buildAppPlainText(app))
            }
          >
            <span aria-hidden="true">↓</span>
            {locale === "ar" ? "تنزيل الملف" : "Download file"}
          </button>
        </div>
      </div>
    </div>
  );
}
