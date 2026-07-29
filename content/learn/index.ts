import type { Locale } from "@/i18n/routing";
import { learnNodes } from "./tree";
import type { LearnNode } from "./types";

export type {
  LearnNode,
  Breadcrumb,
  FileKind,
  LearnNodeType,
  LearnSection,
  LearnMediaItem,
  LearnLink,
  LearnApplication,
  WidgetBase,
  HeroWidget,
  FeaturedItem,
  FeaturedWidget,
  WidgetV2,
} from "./types";
export { certificateGallery } from "./certificates";
export { getNodePath, getChildNodes, searchNodes } from "./types";
export {
  applications,
  applicationMap,
  searchApplications,
} from "./applications";
export { widgetsV2 } from "./widgets-v2";

export const learnNodeMap = new Map<string, LearnNode>(
  learnNodes.map((node) => [node.id, node]),
);

export const rootDesktopIds = [
  "apps",
  "workflows",
  "knowledge",
  "certifications",
  "about",
  "skills",
  "obsidian-vault",
] as const;

export const desktopFolders: LearnNode[] = rootDesktopIds
  .map((id) => learnNodeMap.get(id))
  .filter((n): n is LearnNode => !!n && n.type === "folder");

export const desktopItems: LearnNode[] = rootDesktopIds
  .map((id) => learnNodeMap.get(id))
  .filter((node): node is LearnNode => !!node);

export const navItems: Array<{ id: string; name: Record<Locale, string> }> = [
  { id: "__desktop__", name: { en: "Desktop", ar: "سطح المكتب" } },
  ...desktopFolders.map((f) => ({ id: f.id, name: f.name })),
  { id: "__thispc__", name: { en: "This PC", ar: "هذا الكمبيوتر" } },
  { id: "__return__", name: { en: "Return to Room", ar: "العودة إلى الغرفة" } },
];
