import type { LearnApplication } from "./types";

export const applications: LearnApplication[] = [
  {
    id: "app-antigravity",
    slug: "antigravity",
    name: "Antigravity",
    category: "AI Coding Backup",
    summary:
      "Google AI Pro coding workspace used when primary AI tools reach their limits.",
    description:
      "Nour keeps Antigravity available through Google AI Pro as a backup coding environment when his primary AI tools run out of capacity.",
    usedFor: [
      "Continuing AI-assisted coding when primary tools are unavailable",
      "Keeping a second model ecosystem ready for development work",
    ],
    workflowUses: ["Backup AI-assisted development"],
    relatedSkillIds: ["skill-engineering-practice"],
    relatedFileIds: ["ai-skills-overview"],
    relatedProjectSlugs: [],
    tags: ["ai", "coding", "google", "backup", "antigravity"],
  },
  {
    id: "app-opencode",
    slug: "opencode",
    name: "OpenCode CLI",
    shortName: "OpenCode",
    category: "Terminal Coding Agent",
    summary: "Open-source coding agent used directly from the terminal.",
    description:
      "OpenCode understands codebase context, runs commands, edits files, reviews changes, and manages development work from natural-language instructions without leaving the terminal.",
    usedFor: [
      "Implementing scoped features and bug fixes",
      "Reviewing and refactoring code across a repository",
      "Running tests, builds, and validation commands",
      "Working with multiple model providers from one CLI",
    ],
    workflowUses: [
      "Plan, implement, review, and validate",
      "Codebase exploration and root-cause analysis",
    ],
    relatedSkillIds: ["skill-engineering-practice", "skill-fullstack"],
    relatedFileIds: ["ai-skills-overview", "ai-agents-overview"],
    relatedProjectSlugs: [],
    tags: ["ai", "cli", "coding agent", "terminal", "git", "opencode"],
  },
  {
    id: "app-obsidian",
    slug: "obsidian",
    name: "Obsidian",
    category: "Knowledge Management",
    summary:
      "Local Markdown vault for connected notes, summaries, and workflows.",
    description:
      "Obsidian keeps Nour's technical knowledge in local Markdown files organized through links, tags, frontmatter, queries, templates, and visual maps.",
    usedFor: [
      "Organizing technical summaries and course notes",
      "Connecting related ideas with wikilinks",
      "Maintaining project, area, and resource indexes",
      "Building query-driven dashboards and review workflows",
    ],
    workflowUses: [
      "Course material to structured summaries",
      "Capture, classify, connect, review, and publish",
    ],
    relatedSkillIds: ["skill-engineering-practice"],
    relatedFileIds: ["obsidian-vault-overview", "workflow-course-to-obsidian"],
    relatedProjectSlugs: [],
    tags: ["notes", "knowledge", "vault", "markdown", "obsidian"],
  },
  {
    id: "app-notebooklm",
    slug: "notebooklm",
    name: "NotebookLM",
    category: "Grounded Research",
    summary:
      "Source-grounded research notebook for understanding large document collections.",
    description:
      "NotebookLM turns documents, transcripts, web pages, and videos into a conversational research notebook whose answers cite the supplied sources.",
    usedFor: [
      "Exploring lectures and course material",
      "Comparing claims across multiple sources",
      "Following cited answers back to original material",
      "Creating focused research and learning sessions",
    ],
    workflowUses: ["Research synthesis", "Course and transcript analysis"],
    relatedSkillIds: ["skill-engineering-practice"],
    relatedFileIds: ["knowledge-met", "workflow-review-quality"],
    relatedProjectSlugs: [],
    tags: ["ai", "research", "citations", "documents", "notebooklm"],
  },
  {
    id: "app-hermes",
    slug: "hermes-agent",
    name: "Hermes Agent",
    shortName: "Hermes",
    category: "Personal AI Agent",
    summary:
      "Local agent framework with memory, schedules, skills, and tool access.",
    description:
      "Hermes Agent by Nous Research provides a customizable assistant with persistent memory, scheduled tasks, reusable skills, terminal tools, messaging integrations, and sub-agent delegation.",
    usedFor: [
      "Packaging repeatable workflows as skills",
      "Running scheduled or recurring assistant tasks",
      "Research, note-taking, and coding support",
      "Delegating complex work across specialized agents",
    ],
    workflowUses: ["Personal automation", "Multi-agent task delegation"],
    relatedSkillIds: ["skill-engineering-practice"],
    relatedFileIds: ["ai-agents-overview", "ai-skills-overview"],
    relatedProjectSlugs: [],
    tags: ["ai", "agent", "memory", "automation", "skills", "hermes"],
  },
];

export const applicationMap = new Map<string, LearnApplication>(
  applications.map((app) => [app.id, app]),
);

export function searchApplications(query: string): LearnApplication[] {
  const lower = query.toLowerCase();
  return applications.filter(
    (app) =>
      app.name.toLowerCase().includes(lower) ||
      app.category.toLowerCase().includes(lower) ||
      app.summary.toLowerCase().includes(lower) ||
      app.tags.some((tag) => tag.toLowerCase().includes(lower)),
  );
}
