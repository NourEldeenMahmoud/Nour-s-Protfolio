import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DesktopContextMenu } from "@/components/paths/learn/desktop-context-menu";
import { DocumentViewer } from "@/components/paths/learn/document-viewer";
import type { ContextMenuItem } from "@/components/paths/learn/desktop-context-menu";
import {
  copyTextToSystemClipboard,
  buildDocumentPlainText,
} from "@/components/paths/learn/copy-text";
import type { LearnNode } from "@/content/learn";

/* ─── DesktopContextMenu: two-panel sort-by flyout ─── */

const sortParentItems: ContextMenuItem[] = [
  {
    id: "sort-by",
    label: "Sort By",
    submenu: [
      { id: "sort-name", label: "Name", checked: false },
      { id: "sort-item-type", label: "Type", checked: false },
      { id: "sort-default", label: "Default", checked: true },
    ],
  },
];

describe("DesktopContextMenu two-panel flyout", () => {
  it("renders parent and child menus simultaneously on onSubmenuOpen", async () => {
    const user = userEvent.setup();
    const onSubmenuOpen = vi.fn();

    const { rerender } = render(
      <>
        <DesktopContextMenu
          x={100}
          y={100}
          items={sortParentItems}
          onSelect={vi.fn()}
          onClose={vi.fn()}
          onSubmenuOpen={onSubmenuOpen}
        />
      </>,
    );

    const sortButton = screen.getByRole("menuitem", { name: /Sort By/ });
    await user.hover(sortButton);

    expect(onSubmenuOpen).toHaveBeenCalledWith(
      "sort-by",
      expect.any(Number),
      expect.any(Number),
    );

    // Simulate parent + child rendering (child opens via callback)
    const childItems: ContextMenuItem[] = [
      { id: "sort-name", label: "Name", checked: false },
      { id: "sort-item-type", label: "Type", checked: false },
      { id: "sort-default", label: "Default", checked: true },
    ];

    rerender(
      <>
        <DesktopContextMenu
          x={100}
          y={100}
          items={sortParentItems}
          onSelect={vi.fn()}
          onClose={vi.fn()}
          onSubmenuOpen={onSubmenuOpen}
          expandedId="sort-by"
        />
        <DesktopContextMenu
          x={200}
          y={100}
          items={childItems}
          onSelect={vi.fn()}
          onClose={vi.fn()}
          childMenuRef={
            { current: null } as React.RefObject<HTMLDivElement | null>
          }
        />
      </>,
    );

    // Both panels render simultaneously
    expect(screen.getAllByRole("menu")).toHaveLength(2);
    expect(
      screen.getByRole("menuitem", { name: /Sort By/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Type" })).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /Default/ }),
    ).toBeInTheDocument();
  });

  it("parent Sort By item has aria-haspopup and aria-expanded when child open", () => {
    render(
      <>
        <DesktopContextMenu
          x={100}
          y={100}
          items={sortParentItems}
          onSelect={vi.fn()}
          onClose={vi.fn()}
          expandedId="sort-by"
        />
      </>,
    );

    const sortButton = screen.getByRole("menuitem", { name: /Sort By/ });
    expect(sortButton).toHaveAttribute("aria-haspopup", "menu");
    expect(sortButton).toHaveAttribute("aria-expanded", "true");
  });

  it("parent Sort By item has aria-expanded=false when child closed", () => {
    render(
      <DesktopContextMenu
        x={100}
        y={100}
        items={sortParentItems}
        onSelect={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    const sortButton = screen.getByRole("menuitem", { name: /Sort By/ });
    expect(sortButton).toHaveAttribute("aria-haspopup", "menu");
    expect(sortButton).not.toHaveAttribute("aria-expanded", "true");
  });

  it("clicking a child sort option calls onSelect and not onSubmenuOpen", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <DesktopContextMenu
        x={100}
        y={100}
        items={[
          { id: "sort-name", label: "Name", checked: false },
          { id: "sort-default", label: "Default", checked: true },
        ]}
        onSelect={onSelect}
        onClose={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("menuitem", { name: "Name" }));
    expect(onSelect).toHaveBeenCalledWith("sort-name");
  });

  it("child panel onClose fires when Escape pressed inside child", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <DesktopContextMenu
        x={100}
        y={100}
        items={[
          { id: "sort-name", label: "Name", checked: false },
          { id: "sort-default", label: "Default", checked: true },
        ]}
        onSelect={vi.fn()}
        onClose={onClose}
      />,
    );

    const nameItem = screen.getByRole("menuitem", { name: "Name" });
    nameItem.focus();
    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalled();
  });

  it("calls onSelect for non-submenu items via click", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <DesktopContextMenu
        x={100}
        y={100}
        items={[{ id: "refresh", label: "Refresh" }]}
        onSelect={onSelect}
        onClose={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("menuitem", { name: "Refresh" }));
    expect(onSelect).toHaveBeenCalledWith("refresh");
  });

  it("falls through to onSelect when onSubmenuOpen is not provided", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <DesktopContextMenu
        x={100}
        y={100}
        items={sortParentItems}
        onSelect={onSelect}
        onClose={vi.fn()}
      />,
    );

    const sortButton = screen.getByRole("menuitem", { name: /Sort By/ });
    await user.click(sortButton);
    expect(onSelect).toHaveBeenCalledWith("sort-by");
  });

  it("renders submenu items with checkmarks when checked", () => {
    const submenuItems: ContextMenuItem[] = [
      { id: "sort-name", label: "Name", checked: true },
      { id: "sort-item-type", label: "Type", checked: false },
      { id: "sort-default", label: "Default", checked: false },
    ];

    render(
      <DesktopContextMenu
        x={100}
        y={100}
        items={submenuItems}
        onSelect={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByRole("menuitem", { name: /Name/ })).toBeInTheDocument();
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("child panel renders hover bridge", () => {
    render(
      <DesktopContextMenu
        x={100}
        y={100}
        items={[{ id: "sort-name", label: "Name", checked: false }]}
        onSelect={vi.fn()}
        onClose={vi.fn()}
        childMenuRef={
          { current: null } as React.RefObject<HTMLDivElement | null>
        }
      />,
    );

    const menu = screen.getByRole("menu");
    expect(
      menu.querySelector("[class*='contextMenuHoverBridge']"),
    ).toBeTruthy();
  });

  it("onChildMouseEnter and onChildMouseLeave are called on child panel", async () => {
    const onEnter = vi.fn();
    const onLeave = vi.fn();
    const user = userEvent.setup();

    render(
      <DesktopContextMenu
        x={100}
        y={100}
        items={[{ id: "sort-name", label: "Name", checked: false }]}
        onSelect={vi.fn()}
        onClose={vi.fn()}
        childMenuRef={
          { current: null } as React.RefObject<HTMLDivElement | null>
        }
        onChildMouseEnter={onEnter}
        onChildMouseLeave={onLeave}
      />,
    );

    const menu = screen.getByRole("menu");
    await user.hover(menu);
    expect(onEnter).toHaveBeenCalled();
    await user.unhover(menu);
    expect(onLeave).toHaveBeenCalled();
  });
});

/* ─── buildDocumentPlainText ─── */

describe("buildDocumentPlainText", () => {
  const node: LearnNode = {
    id: "test-doc",
    name: { en: "My Document", ar: "مستندي" },
    type: "file",
    kind: "document",
    summary: { en: "This is the summary.", ar: "هذا ملخص" },
    sections: [
      {
        heading: { en: "Section One", ar: "القسم الأول" },
        content: { en: "First section body.", ar: "نص القسم الأول" },
      },
      {
        heading: { en: "List Section", ar: "قسم القوائم" },
        content: { en: "Items below:", ar: "العناصر أدناه:" },
        kind: "list",
        items: [
          { en: "Alpha", ar: "ألف" },
          { en: "Beta", ar: "بータ" },
        ],
      },
      {
        heading: { en: "Steps Section", ar: "قسم الخطوات" },
        content: { en: "Follow these:", ar: "اتبع هذه:" },
        kind: "steps",
        items: [
          { en: "First step", ar: "الخطوة الأولى" },
          { en: "Second step", ar: "الخطوة الثانية" },
        ],
      },
      {
        heading: { en: "Note", ar: "ملاحظة" },
        content: { en: "Important callout.", ar: "ملاحظة هامة" },
        kind: "callout",
      },
    ],
    tags: ["typescript", "testing"],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    public: true,
    parentId: "knowledge",
    children: [],
  };

  it("includes the document title", () => {
    const text = buildDocumentPlainText(node, "en");
    expect(text).toMatch(/^My Document/);
  });

  it("includes the summary", () => {
    const text = buildDocumentPlainText(node, "en");
    expect(text).toContain("This is the summary.");
  });

  it("preserves section headings", () => {
    const text = buildDocumentPlainText(node, "en");
    expect(text).toContain("Section One");
    expect(text).toContain("List Section");
    expect(text).toContain("Steps Section");
  });

  it("preserves list items with bullet prefix", () => {
    const text = buildDocumentPlainText(node, "en");
    expect(text).toContain("• Alpha");
    expect(text).toContain("• Beta");
  });

  it("preserves step items with numbered prefix", () => {
    const text = buildDocumentPlainText(node, "en");
    expect(text).toContain("1. First step");
    expect(text).toContain("2. Second step");
  });

  it("preserves callout with > prefix", () => {
    const text = buildDocumentPlainText(node, "en");
    expect(text).toContain("> Important callout.");
  });

  it("does not duplicate callout content as plain text", () => {
    const text = buildDocumentPlainText(node, "en");
    const occurrences = text.split("Important callout.").length - 1;
    expect(occurrences).toBe(1);
  });

  it("includes tags at the end", () => {
    const text = buildDocumentPlainText(node, "en");
    expect(text).toContain("Tags: typescript, testing");
  });

  it("preserves line breaks between sections", () => {
    const text = buildDocumentPlainText(node, "en");
    expect(text).toContain("\n\n");
  });

  it("works in Arabic locale", () => {
    const text = buildDocumentPlainText(node, "ar");
    expect(text).toMatch(/^مستندي/);
    expect(text).toContain("ألف");
    expect(text).toContain("بータ");
  });

  it("handles node with no sections", () => {
    const minimal: LearnNode = {
      ...node,
      sections: [],
      tags: [],
    };
    const text = buildDocumentPlainText(minimal, "en");
    expect(text).toBe("My Document\n\nThis is the summary.");
  });
});

/* ─── DocumentViewer: Copy Link feedback ─── */

vi.mock("@/content/learn", () => ({
  learnNodeMap: new Map([
    [
      "test-doc",
      {
        id: "test-doc",
        name: { en: "Test Doc", ar: "مستند اختبار" },
        summary: { en: "Summary", ar: "ملخص" },
        sections: [],
        tags: [],
        relatedProjectSlugs: [],
        relatedFileIds: [],
        parentId: "knowledge",
        children: [],
        type: "file",
        public: true,
      },
    ],
    [
      "resource-clean-code-guard",
      {
        id: "resource-clean-code-guard",
        name: { en: "Clean Code Guard", ar: "حارس نظافة الكود" },
        summary: { en: "Source-backed skill", ar: "مهارة مدعومة بالمصدر" },
        sections: [],
        tags: ["skill"],
        relatedProjectSlugs: [],
        relatedFileIds: [],
        parentId: "ai-skills-folder",
        children: [],
        type: "file",
        kind: "skill",
        presentation: "resource",
        downloadName: "clean-code-guard.zip",
        downloadUrl: "/learn/downloads/ai/skills/clean-code-guard.zip",
        public: true,
      },
    ],
  ]),
  getNodePath: () => [
    { id: "this-pc", name: { en: "This PC", ar: "هذا الكمبيوتر" } },
  ],
  applicationMap: new Map(),
}));

vi.mock("@/content/portfolio", () => ({
  getProject: () => null,
}));

vi.mock("@/components/paths/learn/copy-text", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@/components/paths/learn/copy-text")>();
  return {
    ...actual,
    copyTextToSystemClipboard: vi.fn(),
  };
});

const docCopy = {
  copyLink: "Copy Link",
  copied: "Copied!",
  copyFailed: "Copy failed",
  openProject: "Open project",
  relatedFiles: "Related files",
  relatedProjects: "Related projects",
  limitations: "Limitations",
};

describe("DocumentViewer Copy Link feedback", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows copied text on clipboard success", async () => {
    vi.mocked(copyTextToSystemClipboard).mockResolvedValue(true);

    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <DocumentViewer
        locale="en"
        fileId="test-doc"
        onOpenFile={vi.fn()}
        copy={docCopy}
      />,
    );

    const button = screen.getByRole("button", { name: "Copy Link" });
    await user.click(button);

    expect(button).toHaveTextContent("Copied!");

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(button).toHaveTextContent("Copy Link");
  });

  it("shows copy failed text on clipboard failure", async () => {
    vi.mocked(copyTextToSystemClipboard).mockResolvedValue(false);

    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <DocumentViewer
        locale="en"
        fileId="test-doc"
        onOpenFile={vi.fn()}
        copy={docCopy}
      />,
    );

    const button = screen.getByRole("button", { name: "Copy Link" });
    await user.click(button);

    expect(button).toHaveTextContent("Copy failed");

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(button).toHaveTextContent("Copy Link");
  });

  it("offers every document as a download", () => {
    render(
      <DocumentViewer
        locale="en"
        fileId="test-doc"
        onOpenFile={vi.fn()}
        copy={docCopy}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Download file" }),
    ).toBeInTheDocument();
  });

  it("links configured AI resources to their source package", () => {
    render(
      <DocumentViewer
        locale="en"
        fileId="resource-clean-code-guard"
        onOpenFile={vi.fn()}
        copy={docCopy}
      />,
    );

    expect(
      screen.getByRole("link", { name: "Download source file" }),
    ).toHaveAttribute(
      "href",
      "/learn/downloads/ai/skills/clean-code-guard.zip",
    );
  });
});
