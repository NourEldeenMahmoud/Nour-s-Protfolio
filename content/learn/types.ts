import type { Locale } from "@/i18n/routing";
import type { ProjectSlug } from "@/content/portfolio";

export type FileKind =
  "document" | "workflow" | "skill" | "collection" | "folder";

export type LearnNodeType = "folder" | "file";

export interface LearnNode {
  id: string;
  name: Record<Locale, string>;
  type: LearnNodeType;
  kind: FileKind;
  summary: Record<Locale, string>;
  sections?: LearnSection[];
  media?: LearnMediaItem[];
  presentation?:
    | "profile"
    | "skills"
    | "resource"
    | "summary"
    | "vault-structure"
    | "vault-preview";
  links?: LearnLink[];
  downloadName?: string;
  downloadUrl?: string;
  tags: string[];
  relatedFileIds: string[];
  relatedProjectSlugs: ProjectSlug[];
  public: boolean;
  parentId: string | null;
  children: string[];
}

export interface LearnLink {
  label: Record<Locale, string>;
  href: string;
  kind: "email" | "github" | "linkedin" | "website" | "repository";
}

export interface LearnMediaItem {
  src: string;
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
}

export interface LearnSection {
  heading: Record<Locale, string>;
  content: Record<Locale, string>;
  kind?: "text" | "list" | "code" | "callout" | "steps";
  items?: Record<Locale, string>[];
}

export interface Breadcrumb {
  id: string;
  name: Record<Locale, string>;
}

export function getNodePath(
  nodeId: string,
  nodes: Map<string, LearnNode>,
): Breadcrumb[] {
  const path: Breadcrumb[] = [];
  let current = nodes.get(nodeId);
  while (current) {
    path.unshift({ id: current.id, name: current.name });
    current = current.parentId ? nodes.get(current.parentId) : undefined;
  }
  return path;
}

export function getChildNodes(
  parentId: string,
  nodes: Map<string, LearnNode>,
): LearnNode[] {
  const parent = nodes.get(parentId);
  if (!parent) return [];
  return parent.children
    .map((id) => nodes.get(id))
    .filter((n): n is LearnNode => !!n);
}

export function searchNodes(
  query: string,
  nodes: Map<string, LearnNode>,
  locale: Locale,
): LearnNode[] {
  const lower = query.toLowerCase();
  const results: LearnNode[] = [];
  for (const node of nodes.values()) {
    if (!node.public) continue;
    const nameMatch = node.name[locale].toLowerCase().includes(lower);
    const summaryMatch = node.summary[locale].toLowerCase().includes(lower);
    const tagMatch = node.tags.some((t) => t.toLowerCase().includes(lower));
    const sectionMatch =
      node.sections?.some(
        (s) =>
          s.heading[locale].toLowerCase().includes(lower) ||
          s.content[locale].toLowerCase().includes(lower),
      ) ?? false;
    if (nameMatch || summaryMatch || tagMatch || sectionMatch) {
      results.push(node);
    }
  }
  return results;
}

export interface LearnApplication {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  category: string;
  summary: string;
  description: string;
  usedFor: string[];
  workflowUses?: string[];
  relatedSkillIds: string[];
  relatedFileIds: string[];
  relatedProjectSlugs: ProjectSlug[];
  tags: string[];
}

export interface WidgetBase {
  id: string;
  title: string;
  content: string;
  openFolderId?: string;
  openFileId?: string;
}

export interface HeroWidget extends WidgetBase {
  kind: "hero";
  subtitle: string;
  avatarSrc?: string;
  avatarFallback: string;
  accentColor?: string;
  capsules: Array<{ label: string; value: string }>;
  featureItems: Array<{ label: string; icon?: string }>;
  footer: string;
  downloadCvUrl?: string;
  downloadCvLabel?: string;
}

export interface FeaturedItem {
  id: string;
  title: string;
  description: string;
  variant: "note" | "workflow" | "learning";
  openFolderId?: string;
  openFileId?: string;
  stepCount?: number;
}

export interface FeaturedWidget extends WidgetBase {
  kind: "featured";
  items: FeaturedItem[];
}

export type WidgetV2 = HeroWidget | FeaturedWidget;
