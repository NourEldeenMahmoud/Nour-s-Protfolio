import type { Locale } from "@/i18n/routing";
import type { LearnNode, LearnApplication } from "@/content/learn";

export async function copyTextToSystemClipboard(
  text: string,
): Promise<boolean> {
  if (!text) return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // clipboard API blocked or unavailable
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.cssText =
      "position:fixed;left:-9999px;top:-9999px;opacity:0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

/**
 * Build structured plain text from a LearnNode document,
 * preserving title, summary, section headings, paragraphs,
 * lists, steps, and callouts with sensible line breaks.
 */
export function buildDocumentPlainText(
  node: LearnNode,
  locale: Locale,
): string {
  const lines: string[] = [];

  lines.push(node.name[locale]);
  lines.push("");

  const summary = node.summary[locale];
  if (summary) {
    lines.push(summary);
    lines.push("");
  }

  for (const section of node.sections ?? []) {
    const heading = section.heading[locale];
    if (heading) {
      lines.push(heading);
      lines.push("");
    }

    const content = section.content[locale];
    if (content && section.kind !== "callout") {
      lines.push(content);
      lines.push("");
    }

    if (
      (section.kind === "list" || section.kind === "steps") &&
      section.items
    ) {
      for (let i = 0; i < section.items.length; i++) {
        const prefix = section.kind === "steps" ? `${i + 1}. ` : "• ";
        lines.push(`${prefix}${section.items[i]![locale]}`);
      }
      lines.push("");
    }

    if (section.kind === "callout") {
      lines.push(`> ${section.content[locale]}`);
      lines.push("");
    }

    // "code" kind uses content as-is (no special prefix needed for plain text)
  }

  if (node.tags.length > 0) {
    lines.push("Tags: " + node.tags.join(", "));
    lines.push("");
  }

  return lines.join("\n").trimEnd();
}

/**
 * Build structured plain text from a LearnApplication,
 * preserving name, category, summary, description,
 * used-for list, and workflow-uses list.
 */
export function buildAppPlainText(app: LearnApplication): string {
  const lines: string[] = [];

  lines.push(app.name);
  lines.push(`Category: ${app.category}`);
  lines.push("");

  if (app.summary) {
    lines.push(app.summary);
    lines.push("");
  }

  if (app.description) {
    lines.push(app.description);
    lines.push("");
  }

  if (app.usedFor.length > 0) {
    for (const use of app.usedFor) {
      lines.push(`• ${use}`);
    }
    lines.push("");
  }

  if (app.workflowUses && app.workflowUses.length > 0) {
    for (const use of app.workflowUses) {
      lines.push(`• ${use}`);
    }
    lines.push("");
  }

  if (app.tags.length > 0) {
    lines.push("Tags: " + app.tags.join(", "));
    lines.push("");
  }

  return lines.join("\n").trimEnd();
}
