import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ProjectExperience } from "@/components/projects/project-experience";
import { getProject, getProjectDetailMedia } from "@/content/portfolio";

vi.mock("gsap", () => ({
  gsap: {
    registerPlugin: vi.fn(),
    context: vi.fn(() => ({ revert: vi.fn() })),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: {} }));

const buildsense = getProject("buildsense")!;
const bookify = getProject("bookify")!;

class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
}

describe("ProjectExperience", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    );
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    HTMLDialogElement.prototype.showModal = vi.fn(function (
      this: HTMLDialogElement,
    ) {
      this.setAttribute("open", "");
    });
    HTMLDialogElement.prototype.close = vi.fn(function (
      this: HTMLDialogElement,
    ) {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    });
  });

  afterEach(() => vi.restoreAllMocks());

  it("presents verified product facts without unpublished filler", () => {
    render(<ProjectExperience locale="en" project={buildsense} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "BuildSense" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(buildsense.summary.en).length).toBeGreaterThan(
      0,
    );
    expect(screen.getAllByText(buildsense.context.en).length).toBeGreaterThan(
      0,
    );
    expect(
      screen.getAllByText(buildsense.contribution.en).length,
    ).toBeGreaterThan(0);
    expect(screen.queryByText("Not published")).not.toBeInTheDocument();
    expect(screen.queryByText("Development Process")).not.toBeInTheDocument();
  });

  it("exposes the visitor-friendly exploration zones", () => {
    render(<ProjectExperience locale="en" project={buildsense} />);

    const navigation = screen.getByRole("navigation", {
      name: "Project exploration zones",
    });
    for (const label of [
      "Overview",
      "Experience",
      "Highlights",
      "My Work",
      "Gallery",
      "Behind the Product",
    ]) {
      expect(navigation).toHaveTextContent(label);
    }
  });

  it("provides accessible product experience tabs backed by real media", () => {
    render(<ProjectExperience locale="en" project={buildsense} />);

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(getProjectDetailMedia(buildsense).length);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveAttribute(
      "aria-labelledby",
      tabs[0]?.id,
    );
  });

  it("opens gallery media in the keyboard-operable viewer", async () => {
    const user = userEvent.setup();
    render(<ProjectExperience locale="en" project={buildsense} />);

    await user.click(screen.getByRole("button", { name: /View 1:/ }));

    expect(
      screen.getByRole("dialog", { name: "Inspect the product up close" }),
    ).toHaveAttribute("open");
    expect(
      screen.getByRole("button", { name: "Previous media" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next media" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Close media viewer" }),
    ).toBeInTheDocument();
  });

  it("keeps technical depth optional and preserves verified evidence", () => {
    render(<ProjectExperience locale="en" project={buildsense} />);

    expect(
      screen.getByText("How it works").closest("details"),
    ).not.toHaveAttribute("open");
    expect(screen.getByText(buildsense.engineering.en)).toBeInTheDocument();
    expect(screen.getByText(buildsense.evidence.en)).toBeInTheDocument();
    expect(screen.getByText(buildsense.limitation.en)).toBeInTheDocument();
  });

  it("renders only verified external actions", () => {
    const { rerender } = render(
      <ProjectExperience locale="en" project={buildsense} />,
    );
    expect(
      screen.getAllByRole("link", { name: /View repository/ })[0],
    ).toHaveAttribute("href", buildsense.repository);
    expect(
      screen.getByRole("link", { name: /Open live product/ }),
    ).toHaveAttribute("href", buildsense.demo);

    rerender(<ProjectExperience locale="en" project={bookify} />);
    expect(
      screen.queryByRole("link", { name: /Open live product/ }),
    ).not.toBeInTheDocument();
  });

  it("keeps technical case studies separate from visual exploration", () => {
    render(<ProjectExperience locale="en" project={buildsense} />);

    for (const link of screen.getAllByRole("link", {
      name: /View Technical Case Study/,
    })) {
      expect(link).toHaveAttribute("href", "/en/case-studies/buildsense");
    }
  });

  it("retains previous, next, and Engineering Room return routes", () => {
    render(<ProjectExperience locale="en" project={buildsense} />);

    expect(
      screen.getByRole("link", { name: /Previous project/ }),
    ).toHaveAttribute("href", "/en/projects/met-summaries");
    expect(screen.getByRole("link", { name: /Next project/ })).toHaveAttribute(
      "href",
      "/en/projects/bookify",
    );
    for (const link of screen.getAllByRole("link", {
      name: /Back to Explore|Return to Explore/,
    })) {
      expect(link).toHaveAttribute("href", "/en?focus=exploration");
    }
  });

  it("localizes navigation, disclosure, and actions for Arabic", () => {
    render(<ProjectExperience locale="ar" project={bookify} />);

    expect(
      screen.getByRole("navigation", { name: "مناطق استكشاف المشروع" }),
    ).toHaveTextContent("خلف المنتج");
    expect(screen.getByText("كيف يعمل")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /العودة إلى الاستكشاف/ }).length,
    ).toBeGreaterThan(0);
    expect(screen.queryByText("غير منشور")).not.toBeInTheDocument();
  });
});
