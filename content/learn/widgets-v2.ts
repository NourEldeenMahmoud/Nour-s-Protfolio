import type { WidgetV2 } from "./types";

export const widgetsV2: WidgetV2[] = [
  {
    id: "hero",
    kind: "hero",
    title: "Nour Eldeen Mahmoud",
    content:
      "Building backend and full-stack systems while organizing knowledge, tools, and engineering workflows.",
    subtitle: ".NET-focused Software Engineer",
    avatarFallback: "NE",
    accentColor: "#0078d4",
    capsules: [
      { label: "Core", value: ".NET Backend" },
      { label: "Range", value: "Full-Stack Systems" },
    ],
    featureItems: [
      { label: "Knowledge" },
      { label: "Workflows" },
      { label: "Tools" },
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
        id: "efcore",
        title: "EF Core",
        description:
          "Entity Framework Core patterns, data modeling, and migration practices used across .NET projects.",
        variant: "note",
        openFolderId: "knowledge-dotnet",
        openFileId: "knowledge-efcore",
      },
      {
        id: "validate-ai",
        title: "Validating AI-Generated Code",
        description:
          "The checklist used to verify AI-generated code before it enters the codebase.",
        variant: "workflow",
        openFolderId: "workflows",
        openFileId: "workflow-validating-ai-code",
        stepCount: 7,
      },
      {
        id: "currently-learning",
        title: "Currently Learning",
        description:
          "Active learning topics and experiments in the Engineering Lab.",
        variant: "learning",
        openFolderId: "lab",
        openFileId: "lab-currently",
      },
    ],
  },
];
