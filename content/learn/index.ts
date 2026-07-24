import type { Locale } from "@/i18n/routing";
import { learnNodes } from "./tree";
import type { LearnNode } from "./types";

export type { LearnNode, Breadcrumb, FileKind, LearnNodeType, LearnSection, LearnApplication, Widget } from "./types";
export { getNodePath, getChildNodes, searchNodes } from "./types";
export { applications, applicationMap, searchApplications } from "./applications";
export { widgets } from "./widgets";

export const learnNodeMap = new Map<string, LearnNode>(
  learnNodes.map((node) => [node.id, node]),
);

export const rootDesktopIds = [
  "this-pc",
  "start-here",
  "knowledge",
  "about",
  "workflows",
  "skills",
  "lab",
  "apps",
] as const;

export type DesktopFolderId = (typeof rootDesktopIds)[number];

export const desktopFolders: LearnNode[] = rootDesktopIds
  .map((id) => learnNodeMap.get(id))
  .filter((n): n is LearnNode => !!n);

export const navItems: Array<{ id: string; name: Record<Locale, string> }> = [
  { id: "__desktop__", name: { en: "Desktop", ar: "سطح المكتب" } },
  ...desktopFolders.map((f) => ({ id: f.id, name: f.name })),
  { id: "__thispc__", name: { en: "This PC", ar: "هذا الكمبيوتر" } },
  { id: "__return__", name: { en: "Return to Room", ar: "العودة إلى الغرفة" } },
];

export function getRootFolderId(): string {
  return "this-pc";
}

export function isDesktopFolderId(id: string): boolean {
  return rootDesktopIds.includes(id as DesktopFolderId);
}
