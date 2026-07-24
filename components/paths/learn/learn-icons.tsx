import type { ReactElement } from "react";
import type { FileKind, LearnApplication } from "@/content/learn";

export function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M6 12C6 9.79 7.79 8 10 8H18L22 12H38C40.21 12 42 13.79 42 16V36C42 38.21 40.21 40 38 40H10C7.79 40 6 38.21 6 36V12Z" fill="#FFB900" />
      <path d="M6 16H42V36C42 38.21 40.21 40 38 40H10C7.79 40 6 38.21 6 36V16Z" fill="#E6A700" />
      <path d="M6 16H42V20H6V16Z" fill="#FFC83D" />
    </svg>
  );
}

export function FileIcon({ kind, className }: { kind: FileKind; className?: string }) {
  if (kind === "folder") {
    return <FolderIcon className={className} />;
  }
  const colorMap: Record<FileKind, { body: string; accent: string; line: string }> = {
    folder: { body: "#FFB900", accent: "#E6A700", line: "#FFC83D" },
    document: { body: "#4A90D9", accent: "#2B6CB0", line: "#5BA3E6" },
    workflow: { body: "#7C5CFC", accent: "#5B3FD9", line: "#9B82FD" },
    skill: { body: "#2EA043", accent: "#1F7A30", line: "#3BB54F" },
    collection: { body: "#E8912D", accent: "#C47A22", line: "#F0A045" },
  };
  const c = colorMap[kind] ?? colorMap.document;
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M10 6H28L34 12H38C40.21 12 42 13.79 42 16V38C42 40.21 40.21 42 38 42H10C7.79 42 6 40.21 6 38V10C6 7.79 7.79 6 10 6Z" fill={c.body} />
      <path d="M10 6H28L34 12H38C40.21 12 42 13.79 42 16V16H6V10C6 7.79 7.79 6 10 6Z" fill={c.accent} opacity="0.6" />
      <path d="M6 16H42V38C42 40.21 40.21 42 38 42H10C7.79 42 6 40.21 6 38V16Z" fill={c.body} />
      <path d="M6 16H42V20H6V16Z" fill={c.line} />
      <rect x="14" y="24" width="20" height="2" rx="1" fill="white" opacity="0.4" />
      <rect x="14" y="29" width="14" height="2" rx="1" fill="white" opacity="0.4" />
      <rect x="14" y="34" width="10" height="2" rx="1" fill="white" opacity="0.4" />
    </svg>
  );
}

export function DesktopIcon({ kind, className }: { kind: "pc" | "folder"; className?: string }) {
  if (kind === "pc") {
    return (
      <svg className={className} width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
        <rect x="6" y="10" width="44" height="28" rx="3" fill="#1B6AC9" stroke="#5BA3E6" strokeWidth="1.5" />
        <rect x="9" y="13" width="38" height="22" rx="1" fill="#0078D4" />
        <rect x="9" y="13" width="38" height="22" rx="1" fill="url(#screen-gradient)" />
        <rect x="22" y="38" width="12" height="3" rx="1" fill="#6B7280" />
        <rect x="16" y="41" width="24" height="3" rx="1.5" fill="#9CA3AF" />
        <defs>
          <linearGradient id="screen-gradient" x1="9" y1="13" x2="47" y2="35" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E90FF" stopOpacity="0.3" />
            <stop offset="1" stopColor="#005A9E" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  return <FolderIcon className={className} />;
}

export function NavIcon({ id, className }: { id: string; className?: string }) {
  if (id === "__desktop__" || id === "__thispc__" || id === "this-pc") {
    return (
      <svg className={className} width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="4" width="20" height="13" rx="2" fill="#0078D4" stroke="#5BA3E6" strokeWidth="1" />
        <rect x="3.5" y="5.5" width="17" height="10" rx="0.5" fill="#1B6AC9" />
        <rect x="8" y="17" width="8" height="1.5" rx="0.5" fill="#9CA3AF" />
        <rect x="6" y="18.5" width="12" height="1.5" rx="0.75" fill="#6B7280" />
      </svg>
    );
  }
  if (id === "__return__") {
    return (
      <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    );
  }
  const folderIcons: Record<string, ReactElement> = {
    "start-here": (
      <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0078D4" opacity="0.7" />
        <path d="M2 17L12 22L22 17" stroke="#5BA3E6" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2 12L12 17L22 12" stroke="#5BA3E6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    knowledge: (
      <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="#0078D4" aria-hidden="true">
        <path d="M4 4h6v7H4V4zM14 4h6v7h-6V4zM4 13h6v7H4v-7zM14 13h6v7h-6v-7z" opacity="0.8" />
        <path d="M4 4h6v7H4V4z" fill="#5BA3E6" />
        <path d="M14 13h6v7h-6v-7z" fill="#5BA3E6" />
      </svg>
    ),
    about: (
      <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="#0078D4" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4.42 3.58-8 8-8s8 3.58 8 8" fill="none" stroke="#0078D4" strokeWidth="2" />
      </svg>
    ),
    workflows: (
      <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    skills: (
      <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="#0078D4" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" fill="none" stroke="#0078D4" strokeWidth="1.8" />
      </svg>
    ),
    lab: (
      <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 3h6v6l5 8.5a2 2 0 01-1.7 3H5.7a2 2 0 01-1.7-3L9 9V3z" fill="#0078D4" fillOpacity="0.15" />
        <path d="M9 3h6" />
        <circle cx="10" cy="16" r="1" fill="#0078D4" />
        <circle cx="14" cy="14" r="0.8" fill="#0078D4" />
      </svg>
    ),
  };
  return folderIcons[id] ?? (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="#FFB900" aria-hidden="true">
      <path d="M4 6C4 4.9 4.9 4 6 4H10L12 6H18C19.1 6 20 6.9 20 8V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V6Z" />
    </svg>
  );
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function ChevronIcon({ direction, className }: { direction: "left" | "right" | "up"; className?: string }) {
  const paths: Record<string, string> = {
    left: "M15 18l-6-6 6-6",
    right: "M9 18l6-6-6-6",
    up: "M18 15l-6-6-6-6",
  };
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[direction]} />
    </svg>
  );
}

export function WindowIcon({ action, className }: { action: "minimize" | "maximize" | "close" | "restore"; className?: string }) {
  if (action === "close") {
    return (
      <svg className={className} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  if (action === "minimize") {
    return (
      <svg className={className} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path d="M2 7h10" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  if (action === "maximize") {
    return (
      <svg className={className} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <rect x="1.5" y="1.5" width="11" height="11" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
    );
  }
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <rect x="4" y="4" width="8.5" height="8.5" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M4 4L11.5 11.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 4V1.5h2.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

const appIconFiles: Record<string, string> = {
  "app-vscode": "/learn/apps/vscode.svg",
  "app-obsidian": "/learn/apps/obsidian.svg",
  "app-postman": "/learn/apps/postman.svg",
  "app-ssms": "/learn/apps/ssms.svg",
  "app-mongodb-compass": "/learn/apps/mongodb-compass.svg",
  "app-unity": "/learn/apps/unity.svg",
  "app-blender": "/learn/apps/blender.svg",
  "app-discord": "/learn/apps/discord.svg",
  "app-steam": "/learn/apps/steam.svg",
  "app-bitwarden": "/learn/apps/bitwarden.svg",
};

export function AppIcon({ app, className, size = 48 }: { app: LearnApplication; className?: string; size?: number }) {
  const src = appIconFiles[app.id];
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={className}
        src={src}
        alt=""
        width={size}
        height={size}
        aria-hidden="true"
        style={{ objectFit: "contain" }}
      />
    );
  }
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#0078D4" />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="system-ui">
        {app.shortName?.charAt(0) ?? app.name.charAt(0)}
      </text>
    </svg>
  );
}
