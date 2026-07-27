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
  repository: "Repository",
  currentScene: "Scene",
  mediaUnavailable: "Media unavailable",
  emptyState: "No published case study currently available.",
};

/** Return a desktop project arrow button (inside the screen panel, disambiguated by data-project-arrow). */
function getDesktopProjectArrow(name: string) {
  const panel = screen.getByRole("tabpanel");
  return within(panel)
    .getAllByRole("button")
    .find(
      (element) =>
        element.getAttribute("data-project-arrow") === "desktop" &&
        element.getAttribute("aria-label")?.startsWith(name),
    )!;
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

  it("cycles through projects within a category", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    expect(
      screen.getByRole("heading", { name: "BuildSense" }),
    ).toBeInTheDocument();

    // Use desktop arrow to navigate
    await user.click(getDesktopProjectArrow("Next project"));
    expect(
      screen.getByRole("heading", { name: "CinemaVerse" }),
    ).toBeInTheDocument();

    await user.click(getDesktopProjectArrow("Next project"));
    expect(
      screen.getByRole("heading", { name: "Bookify Hotel Reservation System" }),
    ).toBeInTheDocument();

    await user.click(getDesktopProjectArrow("Next project"));
    expect(
      screen.getByRole("heading", { name: "Frontend Mini Projects" }),
    ).toBeInTheDocument();

    // Wraps around
    await user.click(getDesktopProjectArrow("Next project"));
    expect(
      screen.getByRole("heading", { name: "BuildSense" }),
    ).toBeInTheDocument();
  });

  it("navigates backward through projects", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    await user.click(getDesktopProjectArrow("Previous project"));
    expect(
      screen.getByRole("heading", { name: "Frontend Mini Projects" }),
    ).toBeInTheDocument();
  });

  it("does not show project arrows for a single-project category", async () => {
    const user = userEvent.setup();
    render(<CenterShowcase locale="en" copy={copy} />);

    await user.click(screen.getByRole("tab", { name: "Mobile" }));

    expect(
      screen.queryByRole("button", { name: "Previous project" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Next project" }),
    ).not.toBeInTheDocument();
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
    expect(screen.getByText("2 of 6 scenes")).toBeInTheDocument();
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

    await user.click(getDesktopProjectArrow("Next project"));
    expect(
      screen.getByRole("heading", { name: "CinemaVerse" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Desktop" }));
    expect(
      screen.getByRole("heading", { name: "Blood Bank Management System" }),
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

    await user.click(getDesktopProjectArrow("Next project"));

    expect(
      screen.getByRole("slider", { name: "Project playback timeline" }),
    ).toHaveValue("0");
  });

  it("localizes content for Arabic", () => {
    const arCopy: ShowcaseCopy = {
      ...copy,
      categoriesLabel: "فئات المشاريع",
      viewProject: "استكشف المشروع",
      previousProject: "المشروع السابق",
      nextProject: "المشروع التالي",
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
  });

  /* ── Arrow SVG and direction tests ── */

  it("project buttons contain SVGs and no Unicode triangle text", () => {
    render(<CenterShowcase locale="en" copy={copy} />);

    const prevBtn = getDesktopProjectArrow("Previous project");
    const nextBtn = getDesktopProjectArrow("Next project");

    // Both buttons must contain SVG elements
    expect(prevBtn.querySelector("svg")).toBeInTheDocument();
    expect(nextBtn.querySelector("svg")).toBeInTheDocument();

    // No Unicode triangles should remain in button text
    expect(prevBtn.textContent).not.toMatch(/[◀▶◁▷►▿▴◂]/);
    expect(nextBtn.textContent).not.toMatch(/[◀▶◁▷►▿▴◂]/);
  });

  it("English project directions: prev=left, next=right via data-direction", () => {
    render(<CenterShowcase locale="en" copy={copy} />);

    const prevBtn = getDesktopProjectArrow("Previous project");
    const nextBtn = getDesktopProjectArrow("Next project");

    const prevSvg = prevBtn.querySelector("svg");
    const nextSvg = nextBtn.querySelector("svg");

    expect(prevSvg).toHaveAttribute("data-direction", "left");
    expect(nextSvg).toHaveAttribute("data-direction", "right");
  });

  it("Arabic project directions: prev=right, next=left via data-direction", () => {
    const arCopy: ShowcaseCopy = {
      ...copy,
      previousProject: "المشروع السابق",
      nextProject: "المشروع التالي",
    };

    render(<CenterShowcase locale="ar" copy={arCopy} />);

    const prevBtn = getDesktopProjectArrow("المشروع السابق");
    const nextBtn = getDesktopProjectArrow("المشروع التالي");

    const prevSvg = prevBtn.querySelector("svg");
    const nextSvg = nextBtn.querySelector("svg");

    expect(prevSvg).toHaveAttribute("data-direction", "right");
    expect(nextSvg).toHaveAttribute("data-direction", "left");
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

    await user.click(getDesktopProjectArrow("Next project"));
    expect(getDesktopProjectCounter()).toHaveTextContent("2 / 4");
  });

  it("desktop project arrows are inside role=tabpanel", () => {
    render(<CenterShowcase locale="en" copy={copy} />);

    const panel = screen.getByRole("tabpanel");
    const prevBtn = getDesktopProjectArrow("Previous project");
    const nextBtn = getDesktopProjectArrow("Next project");

    expect(panel).toContainElement(prevBtn);
    expect(panel).toContainElement(nextBtn);
    expect(prevBtn).toHaveAttribute("data-project-arrow", "desktop");
    expect(nextBtn).toHaveAttribute("data-project-arrow", "desktop");
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
    const mediaEl = container.querySelector("video, img")!;
    fireEvent.error(mediaEl);

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
