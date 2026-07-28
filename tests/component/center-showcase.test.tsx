import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CenterShowcase } from "@/components/room/center-showcase";
import type { ShowcaseCopy } from "@/components/room/center-showcase";

vi.mock("gsap", () => ({
  gsap: {
    context: (cb: () => void) => {
      cb();
      return { revert: vi.fn() };
    },
    fromTo: vi.fn(),
    set: vi.fn(),
  },
}));

const copy: ShowcaseCopy = {
  categoriesLabel: "Project categories",
  projectsLabel: "Projects in {category}",
  previousProject: "Previous project",
  nextProject: "Next project",
  previousMedia: "Previous image",
  nextMedia: "Next image",
  projectCount: "{current} of {total}",
  play: "Play project film",
  pause: "Pause project film",
  timeline: "Project playback timeline",
  elapsed: "Elapsed time",
  mediaCount: "{current} of {total} scenes",
  viewProject: "Explore project",
  currentScene: "Scene",
  mediaUnavailable: "Media unavailable",
  emptyState: "No published case study currently available.",
};

function getProjectButton(name: string, category = "Web") {
  return within(
    screen.getByRole("navigation", { name: `Projects in ${category}` }),
  ).getByRole("button", { name: new RegExp(name) });
}

/** Return the desktop project counter (inside the screen panel). */
function getDesktopProjectCounter() {
  const panel = screen.getByRole("tabpanel");
  return within(panel).getByText(/^\d+ \/ \d+$/);
}

describe("CenterShowcase", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    );
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the Web category tab as active by default with BuildSense content", () => {
    render(<CenterShowcase locale="en" copy={copy} />);

    const webTab = screen.getByRole("tab", { name: "Web" });
    expect(webTab).toHaveAttribute("aria-selected", "true");

    expect(
      screen.getByRole("heading", { name: "BuildSense" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "PC hardware discovery and compatibility for the Egyptian market.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("link", { name: "Explore project" })[0],
    ).toHaveAttribute("href", "/en/projects/buildsense");
  });

  it("shows stack tags (max 3) for the current project", () => {
    render(<CenterShowcase locale="en" copy={copy} />);

    expect(screen.getByText("Angular 19")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Express")).toBeInTheDocument();
    expect(screen.queryByText("MongoDB")).not.toBeInTheDocument();
  });

  it("switches category and resets project/media indices", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    await user.click(screen.getByRole("tab", { name: "Desktop" }));

    expect(screen.getByRole("tab", { name: "Desktop" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Web" })).toHaveAttribute(
      "aria-selected",
      "false",
    );

    expect(
      screen.getByRole("heading", { name: "Blood Bank Management System" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Explore project" })[0],
    ).toHaveAttribute("href", "/en/projects/blood-bank-desktop");
  });

  it("lists every project in the active category and supports direct selection", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    const projectStrip = screen.getByRole("navigation", {
      name: "Projects in Web",
    });
    expect(within(projectStrip).getAllByRole("button")).toHaveLength(4);
    for (const projectName of [
      "BuildSense",
      "CinemaVerse",
      "Bookify",
      "Frontend Mini",
    ]) {
      expect(
        within(projectStrip).getByRole("button", {
          name: new RegExp(projectName),
        }),
      ).toBeInTheDocument();
    }

    await user.click(getProjectButton("CinemaVerse"));
    expect(
      screen.getByRole("heading", { name: "CinemaVerse" }),
    ).toBeInTheDocument();

    await user.click(getProjectButton("Bookify"));
    expect(
      screen.getByRole("heading", { name: "Bookify Hotel Reservation System" }),
    ).toBeInTheDocument();

    await user.click(getProjectButton("Frontend Mini"));
    expect(
      screen.getByRole("heading", { name: "Frontend Mini Projects" }),
    ).toBeInTheDocument();
  });

  it("marks the selected project in the top strip", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    expect(getProjectButton("BuildSense")).toHaveAttribute(
      "aria-current",
      "true",
    );
    await user.click(getProjectButton("CinemaVerse"));
    expect(getProjectButton("CinemaVerse")).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(getProjectButton("BuildSense")).not.toHaveAttribute("aria-current");
  });

  it("keeps previous and next project arrows over the media", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    expect(
      screen.getByRole("button", {
        name: "Previous project: Frontend Mini",
      }),
    ).toBeInTheDocument();
    const nextProject = screen.getByRole("button", {
      name: "Next project: CinemaVerse",
    });
    expect(nextProject).toBeInTheDocument();

    await user.click(nextProject);
    expect(
      screen.getByRole("heading", { name: "CinemaVerse" }),
    ).toBeInTheDocument();
  });

  it("shows one project selector for a single-project category", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    await user.click(screen.getByRole("tab", { name: "Mobile" }));

    const projectStrip = screen.getByRole("navigation", {
      name: "Projects in Mobile",
    });
    expect(within(projectStrip).getAllByRole("button")).toHaveLength(1);
    expect(within(projectStrip).getByRole("button")).toHaveTextContent(
      "BBMS Mobile",
    );
  });

  it("replaces media dots with one continuous playback timeline", () => {
    render(<CenterShowcase locale="en" copy={copy} />);

    const timeline = screen.getByRole("slider", {
      name: "Project playback timeline",
    });
    expect(timeline).toHaveAttribute("min", "0");
    expect(timeline).toHaveAttribute("max", "35");
    expect(
      screen.queryByRole("group", { name: /media slides/i }),
    ).not.toBeInTheDocument();
  });

  it("seeks across image items using the virtual timeline", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    await user.click(screen.getByRole("tab", { name: "Summaries" }));

    await user.click(
      screen.getByRole("button", { name: "Pause project film" }),
    );
    const timeline = screen.getByRole("slider", {
      name: "Project playback timeline",
    });
    await user.click(timeline);
    timeline.focus();
    await user.keyboard("{ArrowRight}");
    expect(timeline).toHaveValue("5");
    expect(screen.getByText("2 of 5 scenes")).toBeInTheDocument();
  });

  it("shows media arrows inside screen for multi-image projects", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    await user.click(screen.getByRole("tab", { name: "Summaries" }));

    expect(
      screen.getByRole("button", { name: "Previous image" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next image" }),
    ).toBeInTheDocument();
  });

  it("shows project content for Game Development", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    await user.click(screen.getByRole("tab", { name: "Game Dev" }));

    expect(
      screen.getByRole("heading", { name: "How To Train Your AI" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Explore project" })[0],
    ).toHaveAttribute("href", "/en/projects/how-to-train-your-ai");
  });

  it("shows project content for Summaries", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    await user.click(screen.getByRole("tab", { name: "Summaries" }));

    expect(
      screen.getByRole("heading", { name: "MET Summaries" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Explore project" })[0],
    ).toHaveAttribute("href", "/en/projects/met-summaries");
  });

  it("has a tablist with correct ARIA semantics", () => {
    render(<CenterShowcase locale="en" copy={copy} />);

    const tablist = screen.getByRole("tablist", {
      name: "Project categories",
    });
    expect(tablist).toBeInTheDocument();

    const tabs = within(tablist).getAllByRole("tab");
    expect(tabs).toHaveLength(5);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveAttribute("aria-selected", "false");
  });

  it("supports keyboard navigation between tabs", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    const webTab = screen.getByRole("tab", { name: "Web" });
    webTab.focus();

    await user.keyboard("{ArrowRight}");
    const gameTab = screen.getByRole("tab", { name: "Game Dev" });
    expect(gameTab).toHaveFocus();
    expect(gameTab).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{ArrowRight}");
    const desktopTab = screen.getByRole("tab", { name: "Desktop" });
    expect(desktopTab).toHaveFocus();
  });

  it("resets project index on category switch", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    await user.click(getProjectButton("CinemaVerse"));
    expect(
      screen.getByRole("heading", { name: "CinemaVerse" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Desktop" }));
    expect(
      screen.getByRole("heading", { name: "Blood Bank Management System" }),
    ).toBeInTheDocument();
  });

  it("resets an out-of-range project index after an external category change", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <CenterShowcase activeCategoryId="web" locale="en" copy={copy} />,
    );

    await user.click(getProjectButton("Frontend Mini"));
    expect(
      screen.getByRole("heading", { name: "Frontend Mini Projects" }),
    ).toBeInTheDocument();

    rerender(
      <CenterShowcase activeCategoryId="desktop" locale="en" copy={copy} />,
    );
    expect(
      screen.getByRole("heading", { name: "Blood Bank Management System" }),
    ).toBeInTheDocument();

    rerender(
      <CenterShowcase
        activeCategoryId="mobile-applications"
        locale="en"
        copy={copy}
      />,
    );
    expect(
      screen.getByRole("heading", { name: "Blood Bank Mobile App" }),
    ).toBeInTheDocument();
  });

  it("resets media index on project change", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    await user.click(screen.getByRole("tab", { name: "Game Dev" }));

    await user.click(
      screen.getByRole("button", { name: "Pause project film" }),
    );
    const timeline = screen.getByRole("slider", {
      name: "Project playback timeline",
    });
    timeline.focus();
    await user.keyboard("{ArrowRight}");
    expect(timeline).toHaveValue("5");

    await user.click(getProjectButton("Sharp Shooter", "Game Dev"));

    expect(
      screen.getByRole("slider", { name: "Project playback timeline" }),
    ).toHaveValue("0");
  });

  it("localizes content for Arabic", () => {
    const arCopy: ShowcaseCopy = {
      ...copy,
      categoriesLabel: "فئات المشاريع",
      projectsLabel: "مشاريع فئة {category}",
      previousProject: "المشروع السابق",
      nextProject: "المشروع التالي",
      viewProject: "استكشف المشروع",
      previousMedia: "الصورة السابقة",
      nextMedia: "الصورة التالية",
      projectCount: "{current} من {total}",
      mediaUnavailable: "الوسائط غير متاحة",
      emptyState: "لا توجد دراسة حالة منشورة متاحة حالياً.",
    };

    render(<CenterShowcase locale="ar" copy={arCopy} />);

    expect(screen.getByRole("tab", { name: "ويب" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getAllByRole("link", { name: "استكشف المشروع" })[0],
    ).toHaveAttribute("href", "/ar/projects/buildsense");
    expect(
      screen.getByRole("navigation", { name: "مشاريع فئة ويب" }),
    ).toBeInTheDocument();
  });

  it("has an aria-live region for screen reader announcements", () => {
    render(<CenterShowcase locale="en" copy={copy} />);

    const liveRegion = screen.getByRole("status");
    expect(liveRegion).toHaveAttribute("aria-live", "polite");
    expect(liveRegion).toHaveTextContent(
      "BuildSense: BuildSense PC hardware discovery preview video, 1 of 1 scenes",
    );
  });

  it("shows project counter for multi-project categories", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    expect(getDesktopProjectCounter()).toHaveTextContent("1 / 4");

    await user.click(getProjectButton("CinemaVerse"));
    expect(getDesktopProjectCounter()).toHaveTextContent("2 / 4");
  });

  it("places the project selector inside the category panel", () => {
    render(<CenterShowcase locale="en" copy={copy} />);

    const panel = screen.getByRole("tabpanel");
    expect(panel).toContainElement(
      screen.getByRole("navigation", { name: "Projects in Web" }),
    );
  });

  /* ── Correction pass tests ── */

  it("all tabs share the same stable aria-controls target", () => {
    render(<CenterShowcase locale="en" copy={copy} />);

    const tabs = screen.getAllByRole("tab");
    for (const tab of tabs) {
      expect(tab).toHaveAttribute("aria-controls", "showcase-panel");
    }

    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("id", "showcase-panel");
  });

  it("panel aria-labelledby updates to active tab", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("aria-labelledby", "tab-web");

    await user.click(screen.getByRole("tab", { name: "Desktop" }));
    expect(panel).toHaveAttribute("aria-labelledby", "tab-desktop");
  });

  it("timeline exposes native slider semantics and elapsed time", () => {
    render(<CenterShowcase locale="en" copy={copy} />);

    expect(
      screen.getByRole("slider", { name: "Project playback timeline" }),
    ).toHaveAttribute("aria-valuetext", "0:00 / 0:35");
    expect(screen.getByText("0:00 / 0:35")).toBeInTheDocument();
  });

  it("shows media unavailable fallback when media fails to load", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { container } = render(<CenterShowcase locale="en" copy={copy} />);

    const { fireEvent } = await import("@testing-library/react");
    const video = container.querySelector("video");
    const poster = container.querySelector("img");
    if (video) fireEvent.error(video);
    if (poster) fireEvent.error(poster);

    expect(screen.getByText("Media unavailable")).toBeInTheDocument();
    // Title and summary should still be visible
    expect(
      screen.getByRole("heading", { name: "BuildSense" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "PC hardware discovery and compatibility for the Egyptian market.",
      ),
    ).toBeInTheDocument();
    spy.mockRestore();
  });

  it("renders RTL ArrowRight as backward navigation for tabs", async () => {
    const user = userEvent.setup();
    const arCopy: ShowcaseCopy = {
      ...copy,
    };

    render(<CenterShowcase locale="ar" copy={arCopy} />);

    const webTab = screen.getByRole("tab", { name: "ويب" });
    webTab.focus();

    // In RTL, ArrowRight should move to the previous logical tab (wraps to last)
    await user.keyboard("{ArrowRight}");
    const summariesTab = screen.getByRole("tab", { name: "ملخصات" });
    expect(summariesTab).toHaveFocus();
  });
});
