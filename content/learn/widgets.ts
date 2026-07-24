import type { Widget } from "./types";

export const widgets: Widget[] = [
  {
    id: "about-nour",
    title: "Nour Eldeen Mahmoud",
    content:
      "Building backend and full-stack systems while organizing knowledge, tools, and engineering workflows.",
    subtitle: ".NET-focused Software Engineer",
    variant: "identity",
    layout: "large",
    tiles: [
      { label: "Core", value: ".NET Backend" },
      { label: "Range", value: "Full-Stack & Cross-Platform" },
    ],
    footer: "Learning \u00B7 Building \u00B7 Validating",
    openFolderId: "about",
    openFileId: "about-profile",
  },
  {
    id: "featured-note",
    title: "EF Core",
    content:
      "Entity Framework Core patterns, data modeling, and migration practices used across .NET projects including Bookify and CinemaVerse.",
    variant: "note",
    layout: "small",
    actionLabel: "Open note",
    openFolderId: "knowledge-dotnet",
    openFileId: "knowledge-efcore",
  },
  {
    id: "featured-workflow",
    title: "Validating AI-Generated Code",
    content:
      "The checklist used to verify AI-generated code before it enters the codebase, ensuring it meets project standards.",
    variant: "workflow",
    layout: "small",
    actionLabel: "Open workflow",
    stepCount: 7,
    openFolderId: "workflows",
    openFileId: "workflow-validating-ai-code",
  },
  {
    id: "focus-areas",
    title: "Focus Areas",
    content: "Core engineering domains.",
    variant: "focus",
    layout: "wide",
    focusItems: [
      ".NET Backend",
      "Full-Stack Applications",
      "Knowledge Systems",
      "AI-Assisted Workflows",
    ],
    openFolderId: "skills",
  },
];
