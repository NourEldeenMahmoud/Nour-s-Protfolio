import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MotionContext } from "@/components/providers/motion-provider";
import { ProjectExperience } from "@/components/projects/project-experience";
import { getProject, getProjectDetailMedia } from "@/content/portfolio";

vi.mock("gsap", () => {
  const gsapObj = {
    registerPlugin: vi.fn(),
    context: vi.fn(() => ({ revert: vi.fn() })),
    fromTo: vi.fn(),
  };
  return {
    gsap: gsapObj,
    default: gsapObj,
  };
});

vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: {}, default: {} }));

const buildsense = getProject("buildsense")!;
const httyai = getProject("how-to-train-your-ai")!;
const metSummaries = getProject("met-summaries")!;
const sharpShooter = getProject("sharp-shooter")!;

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
  });

  it("adapts labels for product kind", () => {
    render(<ProjectExperience locale="en" project={buildsense} />);
    expect(screen.getAllByText("Behind the product").length).toBeGreaterThan(0);
    expect(screen.getByText("Explore the product")).toBeInTheDocument();
    expect(screen.getByText("Product highlights")).toBeInTheDocument();
    expect(screen.getByText("End of project world")).toBeInTheDocument();
  });

  it("adapts labels for game kind", () => {
    render(<ProjectExperience locale="en" project={httyai} />);
    expect(screen.getAllByText("Behind the game").length).toBeGreaterThan(0);
    expect(screen.getByText("Explore the experience")).toBeInTheDocument();
    expect(screen.getByText("Gameplay highlights")).toBeInTheDocument();
    expect(screen.getByText("End of game world")).toBeInTheDocument();
  });

  it("always uses the GIF source for animated hero media regardless of motion preference", () => {
    render(
      <MotionContext.Provider value>
        <ProjectExperience locale="en" project={sharpShooter} />
      </MotionContext.Provider>,
    );

    const heroImages = screen.getAllByAltText(
      "Sharp Shooter animated gameplay loop in the aim-training arena",
    );
    expect(heroImages).toHaveLength(1);
    expect(heroImages[0]).toHaveAttribute(
      "src",
      "/projects/sharp-shooter/details/hero-gameplay.gif",
    );
  });

  it("adapts labels for collection kind", () => {
    render(<ProjectExperience locale="en" project={metSummaries} />);
    expect(screen.getAllByText("Behind the collection").length).toBeGreaterThan(
      0,
    );
    expect(screen.getByText("Explore the collection")).toBeInTheDocument();
    expect(screen.getByText("Subjects and highlights")).toBeInTheDocument();
    expect(screen.getByText("End of collection")).toBeInTheDocument();
  });

  it("provides accessible product experience tabs backed by real media", () => {
    render(<ProjectExperience locale="en" project={buildsense} />);

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(getProjectDetailMedia(buildsense).length);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  });

  it("opens gallery media in the keyboard-operable viewer", async () => {
    const user = userEvent.setup();
    render(<ProjectExperience locale="en" project={buildsense} />);

    const viewButtons = screen.getAllByRole("button", {
      name: /Open media viewer/i,
    });
    await user.click(viewButtons[0]!);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const closeButton = screen.getByRole("button", {
      name: "Close media viewer",
    });
    await user.click(closeButton);
    expect(dialog).not.toHaveAttribute("open");
  });

  it("renders Case Study link in both relevant action areas for projects with case study (BuildSense)", () => {
    render(<ProjectExperience locale="en" project={buildsense} />);
    const links = screen.getAllByRole("link", {
      name: /View Technical Case Study/i,
    });
    expect(links).toHaveLength(2);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/en/case-studies/buildsense");
    }
  });

  it("does not render any Case Study link for projects without case study", () => {
    render(<ProjectExperience locale="en" project={httyai} />);
    expect(
      screen.queryByRole("link", { name: /View Technical Case Study/i }),
    ).not.toBeInTheDocument();
    expect(
      document.querySelector('a[href*="/case-studies/how-to-train-your-ai"]'),
    ).not.toBeInTheDocument();

    render(<ProjectExperience locale="en" project={metSummaries} />);
    expect(
      screen.queryByRole("link", { name: /View Technical Case Study/i }),
    ).not.toBeInTheDocument();
    expect(
      document.querySelector('a[href*="/case-studies/met-summaries"]'),
    ).not.toBeInTheDocument();
  });
});
