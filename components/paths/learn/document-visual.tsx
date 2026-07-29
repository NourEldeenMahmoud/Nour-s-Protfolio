import type { Locale } from "@/i18n/routing";
import type { LearnNode } from "@/content/learn";
import type { ComponentType } from "react";
import Image from "next/image";
import styles from "./learn.module.css";

interface DocumentVisualProps {
  node: LearnNode;
  locale: Locale;
}

const skillGroups = {
  en: [".NET", "Angular", "SQL", "Flutter", "Unity", "Quality"],
  ar: [".NET", "Angular", "SQL", "Flutter", "Unity", "الجودة"],
};

function ProfileVisual({ locale }: DocumentVisualProps) {
  return (
    <div className={styles.profileVisual} aria-hidden="true">
      <div className={styles.profilePortraitFrame}>
        <Image
          className={styles.profilePortrait}
          src="/profile/nour-eldeen.webp"
          alt=""
          width={1200}
          height={1600}
          sizes="92px"
          draggable={false}
        />
      </div>
      <div className={styles.profileVisualCopy}>
        <span>
          {locale === "ar" ? "التركيز المهني" : "PROFESSIONAL CENTER"}
        </span>
        <strong>.NET BACKEND</strong>
        <small>
          {locale === "ar"
            ? "نطاق فل ستاك ومتعدد المنصات"
            : "Full-stack · cross-platform range"}
        </small>
      </div>
      <div className={styles.profileSignal} />
    </div>
  );
}

function SkillsVisual({ locale }: DocumentVisualProps) {
  return (
    <div
      className={styles.skillsVisual}
      aria-label={locale === "ar" ? "خريطة المهارات" : "Skill map"}
    >
      <div className={styles.skillsCore}>
        <span>CORE</span>
        <strong>.NET</strong>
      </div>
      {skillGroups[locale].map((skill, index) => (
        <span key={skill} className={styles.skillsOrbitItem} data-index={index}>
          {skill}
        </span>
      ))}
    </div>
  );
}

function ResourceVisual({ node }: DocumentVisualProps) {
  return (
    <div className={styles.resourceVisual} aria-hidden="true">
      <span className={styles.resourcePrompt}>&gt;_</span>
      <div>
        <span>
          {node.kind === "skill" ? "CONFIGURED SKILL" : "CONFIGURED DEFINITION"}
        </span>
        <strong>{node.name.en}</strong>
      </div>
      <code>{node.downloadName}</code>
    </div>
  );
}

function SummaryVisual({ locale }: DocumentVisualProps) {
  return (
    <div className={styles.summaryVisual} aria-hidden="true">
      <span className={styles.summaryVisualIndex}>04</span>
      <div>
        <strong>
          {locale === "ar" ? "فهارس مواد مترابطة" : "CONNECTED SUBJECT INDEXES"}
        </strong>
        <span>GIS · GRAPHICS · NETWORKS · PROLOG</span>
      </div>
    </div>
  );
}

function VaultStructureVisual({ locale }: DocumentVisualProps) {
  return (
    <div
      className={styles.vaultTreeVisual}
      aria-label={
        locale === "ar" ? "هيكل الخزانة الآمن" : "Safe vault structure"
      }
    >
      <div className={styles.vaultTreeRoot}>VAULT</div>
      {[
        "00 INDEX",
        "01 PROJECTS",
        "02 AREAS",
        "03 RESOURCES",
        "04 ARCHIVE",
        "05 EXTRAS",
        "06 AGENT",
      ].map((folder, index) => (
        <div
          key={folder}
          className={styles.vaultTreeBranch}
          data-private={index === 6 ? "true" : undefined}
        >
          <span>{String(index).padStart(2, "0")}</span>
          <strong>{folder.replace(/^\d+\s/, "")}</strong>
          {index === 6 && <small>{locale === "ar" ? "خاص" : "PRIVATE"}</small>}
        </div>
      ))}
    </div>
  );
}

function VaultPreviewVisual({ locale }: DocumentVisualProps) {
  return (
    <figure className={styles.vaultPreviewVisual}>
      <div className={styles.vaultPreviewRail} aria-hidden="true">
        <span>◈</span>
        <span>⌕</span>
        <span>⌘</span>
        <span>◇</span>
      </div>
      <div className={styles.vaultPreviewMain}>
        <div className={styles.vaultPreviewHeader}>
          <span>00 TASK DASHBOARD.canvas</span>
          <i />
        </div>
        <div className={styles.vaultPreviewColumns}>
          {["ACTIVE PROJECTS", "LEARNING QUEUE", "KNOWLEDGE REVIEW"].map(
            (column, index) => (
              <section key={column}>
                <span>0{index + 1}</span>
                <strong>{column}</strong>
                <i />
                <i />
                <i />
              </section>
            ),
          )}
        </div>
      </div>
      <figcaption>
        {locale === "ar"
          ? "إعادة بناء آمنة للخصوصية من إعدادات Canvas والسمة الفعلية؛ لا تظهر مهام أو ملاحظات خاصة."
          : "Privacy-safe reconstruction from the real theme and Canvas configuration; no private tasks or notes are shown."}
      </figcaption>
    </figure>
  );
}

const visualRegistry: Record<
  NonNullable<LearnNode["presentation"]>,
  ComponentType<DocumentVisualProps>
> = {
  profile: ProfileVisual,
  skills: SkillsVisual,
  resource: ResourceVisual,
  summary: SummaryVisual,
  "vault-structure": VaultStructureVisual,
  "vault-preview": VaultPreviewVisual,
};

export function DocumentVisual({ node, locale }: DocumentVisualProps) {
  if (!node.presentation) return null;
  const Component = visualRegistry[node.presentation];
  return <Component node={node} locale={locale} />;
}
