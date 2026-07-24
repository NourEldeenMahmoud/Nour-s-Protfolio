import type { LearnApplication } from "./types";

export const applications: LearnApplication[] = [
  {
    id: "app-discord",
    slug: "discord",
    name: "Discord",
    category: "Communication",
    summary: "Communication platform for project collaboration and community engagement.",
    description:
      "Discord is used for real-time communication with development communities, project collaboration, and staying updated with technology discussions. It supports voice, text, and screen sharing for remote teamwork.",
    usedFor: [
      "Communicating with development communities",
      "Collaborating on projects with remote teammates",
      "Participating in technology discussions and Q&A",
      "Screen sharing for code reviews and pair programming",
    ],
    workflowUses: [
      "Real-time team communication during development",
      "Community engagement and knowledge sharing",
    ],
    relatedSkillIds: ["skill-engineering-practice"],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    tags: ["communication", "chat", "community", "discord"],
  },
  {
    id: "app-steam",
    slug: "steam",
    name: "Steam",
    category: "Gaming Platform",
    summary: "Gaming platform and distribution service for PC gaming.",
    description:
      "Steam is the primary platform for PC gaming, providing game distribution, community features, and game development tools. It supports indie game discovery, early access titles, and the Steam Workshop for modding.",
    usedFor: [
      "Playing and testing PC games",
      "Discovering indie games for design inspiration",
      "Accessing game development tools and resources",
    ],
    workflowUses: [
      "Gaming and entertainment",
      "Research for game design patterns",
    ],
    relatedSkillIds: [],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    tags: ["gaming", "platform", "steam", "indie"],
  },
  {
    id: "app-bitwarden",
    slug: "bitwarden",
    name: "Bitwarden",
    category: "Security",
    summary: "Open-source password manager for secure credential storage.",
    description:
      "Bitwarden manages passwords, secure notes, and authentication tokens across all development accounts. It provides browser integration, cross-device sync, and two-factor authentication support for keeping credentials secure.",
    usedFor: [
      "Managing passwords for development accounts",
      "Storing secure notes and API keys safely",
      "Auto-filling credentials in browsers and apps",
      "Generating strong, unique passwords for new accounts",
    ],
    workflowUses: [
      "Secure credential management across projects",
      "Two-factor authentication for critical accounts",
    ],
    relatedSkillIds: ["skill-engineering-practice"],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    tags: ["security", "password", "vault", "bitwarden"],
  },
  {
    id: "app-vscode",
    slug: "vscode",
    name: "Visual Studio Code",
    shortName: "VS Code",
    category: "Code Editor",
    summary: "Primary code editor for all development work across .NET, TypeScript, and scripting.",
    description:
      "VS Code is the main development environment used across all of Nour's projects. It provides IntelliSense, integrated debugging, terminal access, Git integration, and a large extension ecosystem. Extensions like the C# Dev Kit, ESLint, and Prettier keep the workflow consistent.",
    usedFor: [
      "Writing and debugging C#, TypeScript, and Dart code",
      "Running tests and viewing results inline",
      "Managing Git branches, commits, and diffs",
      "Terminal commands for builds, scripts, and tooling",
      "Editing configuration files, documentation, and markdown",
    ],
    workflowUses: [
      "Code review and refactoring",
      "Debugging backend APIs and frontend components",
      "Running automated test suites",
    ],
    relatedSkillIds: ["skill-dotnet-backend", "skill-fullstack", "skill-engineering-practice"],
    relatedFileIds: ["knowledge-dotnet", "knowledge-web"],
    relatedProjectSlugs: ["bookify", "cinemaverse", "buildsense", "blood-bank-desktop"],
    tags: ["editor", "ide", "development", "vscode"],
  },
  {
    id: "app-obsidian",
    slug: "obsidian",
    name: "Obsidian",
    category: "Knowledge Management",
    summary: "Note-taking and knowledge organization tool used to maintain structured learning vaults.",
    description:
      "Obsidian is used to maintain a personal knowledge vault where technical summaries, course notes, and workflow documentation are organized with wikilinks and tags. It supports the Course Material to Obsidian workflow and serves as the local authoring environment before content is published to MET Summaries.",
    usedFor: [
      "Writing and organizing technical summaries",
      "Linking related notes with wikilinks",
      "Maintaining the MET Summaries workflow source files",
      "Structuring learning notes by domain",
    ],
    workflowUses: [
      "Course Material to Obsidian Summaries workflow",
      "Reviewing Summary Quality workflow",
    ],
    relatedSkillIds: ["skill-engineering-practice"],
    relatedFileIds: ["workflow-course-to-obsidian", "workflow-review-quality", "knowledge-met"],
    relatedProjectSlugs: [],
    tags: ["notes", "knowledge", "vault", "markdown", "obsidian"],
  },
  {
    id: "app-postman",
    slug: "postman",
    name: "Postman",
    category: "API Testing",
    summary: "API testing and request exploration tool for backend development.",
    description:
      "Postman is used to inspect, test, and validate HTTP endpoints during backend and full-stack development. It provides a visual interface for constructing requests, examining responses, managing environment variables, and documenting API contracts. It is especially useful for testing secured endpoints with JWT tokens.",
    usedFor: [
      "Testing REST API endpoints during development",
      "Validating authentication flows with JWT tokens",
      "Inspecting response bodies, status codes, and headers",
      "Documenting and sharing API collections",
    ],
    workflowUses: [
      "Validating secured API endpoints",
      "Testing role-based access control",
    ],
    relatedSkillIds: ["skill-dotnet-backend"],
    relatedFileIds: ["knowledge-rest", "knowledge-secured"],
    relatedProjectSlugs: ["cinemaverse", "blood-bank-mobile"],
    tags: ["api", "testing", "rest", "http", "postman"],
  },
  {
    id: "app-ssms",
    slug: "ssms",
    name: "SQL Server Management Studio",
    shortName: "SSMS",
    category: "Database Management",
    summary: "Database management tool for SQL Server used across .NET backend projects.",
    description:
      "SSMS is used to manage, query, and inspect SQL Server databases directly. It provides the GUI for creating tables, running queries, inspecting execution plans, and managing stored procedures. It is the primary database tool for projects that use SQL Server as the persistence layer.",
    usedFor: [
      "Writing and testing SQL queries",
      "Inspecting database schemas and table structures",
      "Managing migrations and seed data",
      "Debugging query performance with execution plans",
    ],
    relatedSkillIds: ["skill-dotnet-backend"],
    relatedFileIds: ["knowledge-efcore", "knowledge-dotnet"],
    relatedProjectSlugs: ["bookify", "blood-bank-desktop"],
    tags: ["database", "sql", "sqlserver", "ssms", "queries"],
  },
  {
    id: "app-mongodb-compass",
    slug: "mongodb-compass",
    name: "MongoDB Compass",
    category: "Database Management",
    summary: "GUI for MongoDB used to explore and inspect document-based data.",
    description:
      "MongoDB Compass provides a visual interface for exploring collections, running queries, and inspecting documents in MongoDB databases. It is used with BuildSense where MongoDB is the primary data store for the Express API layer.",
    usedFor: [
      "Exploring document collections and schemas",
      "Running and debugging aggregation pipelines",
      "Inspecting index usage and query performance",
    ],
    relatedSkillIds: ["skill-fullstack"],
    relatedFileIds: ["knowledge-javascript"],
    relatedProjectSlugs: ["buildsense"],
    tags: ["database", "mongodb", "nosql", "compass"],
  },
  {
    id: "app-unity",
    slug: "unity",
    name: "Unity",
    category: "3D Engine",
    summary: "Game engine and 3D environment used for interactive scene prototyping.",
    description:
      "Unity is used for 3D scene prototyping and interactive environment work, particularly for the portfolio room concept. It provides the real-time rendering, lighting, and camera tools needed to explore spatial compositions before committing to a final implementation.",
    usedFor: [
      "Prototyping 3D room scenes and lighting setups",
      "Testing camera angles and spatial compositions",
      "Exploring real-time rendering for interactive portfolios",
    ],
    relatedSkillIds: [],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    tags: ["3d", "engine", "unity", "prototyping"],
  },
  {
    id: "app-blender",
    slug: "blender",
    name: "Blender",
    category: "3D Content Creation",
    summary: "Open-source 3D modeling and rendering tool for visual asset creation.",
    description:
      "Blender is used for 3D modeling, material setup, and rendering experiments. It supports the visual prototyping workflow for portfolio scene assets, environmental renders, and material exploration. The PolyHaven and Sketchfab integrations provide ready-made assets for scene building.",
    usedFor: [
      "3D modeling and material setup for scene assets",
      "Rendering preview images of spatial compositions",
      "Importing and arranging third-party 3D models",
    ],
    relatedSkillIds: [],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    tags: ["3d", "modeling", "blender", "rendering"],
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
      app.tags.some((t) => t.toLowerCase().includes(lower)),
  );
}
