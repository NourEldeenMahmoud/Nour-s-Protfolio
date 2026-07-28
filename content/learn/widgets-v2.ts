import type { WidgetV2 } from "./types";

export const widgetsV2: WidgetV2[] = [
  {
    id: "hero",
    kind: "hero",
    title: "Nour Eldeen Mahmoud",
    content:
      "A personal digital workspace for tools, technical knowledge, AI workflows, and continuous learning.",
    subtitle: ".NET-focused Software Engineer",
    avatarFallback: "NE",
    accentColor: "#0078d4",
    capsules: [
      { label: "Core", value: ".NET Backend" },
      { label: "Range", value: "Full-Stack Systems" },
    ],
    featureItems: [
      { label: "Summaries" },
      { label: "Certifications" },
      { label: "Technical Skills" },
    ],
    footer: "Learn \u00B7 Build \u00B7 Validate",
    openFolderId: "about",
    openFileId: "about-profile",
  },
  {
    id: "featured",
    kind: "featured",
    title: "Featured",
    content: "Highlights from the Learn workspace.",
    items: [
      {
        id: "essential-apps",
        title: "Essential Apps",
        description:
          "The five tools at the center of Nour's AI-assisted development and knowledge workflow.",
        variant: "note",
        openFolderId: "apps",
      },
      {
        id: "ai-systems",
        title: "AI Skills & Agents",
        description:
          "Reusable capabilities, specialized agents, and human-reviewed development workflows.",
        variant: "workflow",
        openFolderId: "workflows",
        openFileId: "ai-skills-overview",
      },
      {
        id: "obsidian-vault",
        title: "Obsidian Vault",
        description:
          "An extended PARA system for capturing, connecting, reviewing, and retrieving knowledge.",
        variant: "learning",
        openFolderId: "obsidian-vault",
        openFileId: "obsidian-vault-overview",
      },
    ],
  },
];
