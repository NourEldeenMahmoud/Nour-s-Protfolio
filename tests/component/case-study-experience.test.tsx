import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CaseStudyExperience } from "@/components/case-studies/case-study-experience";
import { CaseStudyModal } from "@/components/room/case-study-modal";
import { CaseStudyPaperMap } from "@/components/room/case-study-paper-map";
import {
  caseStudies,
  caseStudySlugs,
  getCaseStudy,
  hasCaseStudy,
} from "@/content/case-studies";
import { getProject, type Project } from "@/content/portfolio";

class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
}

function PinboardFlow() {
  const [project, setProject] = useState<Project | null>(null);
  return (
    <>
      <CaseStudyPaperMap active locale="en" onOpen={setProject} />
      {project ? (
        <CaseStudyModal
          locale="en"
          project={project}
          onClose={() => setProject(null)}
        />
      ) : null}
    </>
  );
}

describe("Project Case Study", () => {
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

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("provides a separate verified case-study record for projects with case studies", () => {
    expect(Object.keys(caseStudies).sort()).toEqual([...caseStudySlugs].sort());
    for (const slug of caseStudySlugs) {
      const study = getCaseStudy(slug)!;
      expect(study.projectSlug).toBe(slug);
      expect(study.problem.en).not.toHaveLength(0);
      expect(study.investigation.length).toBeGreaterThanOrEqual(2);
      expect(study.architecture.nodes.length).toBeGreaterThan(2);
      expect(study.challenges?.length).toBeGreaterThanOrEqual(2);
      expect(study.quality?.length).toBeGreaterThanOrEqual(2);
      expect(study.evidence.length).toBeGreaterThanOrEqual(5);
      expect(hasCaseStudy(slug)).toBe(true);
    }
    expect(
      getCaseStudy("bookify")!.evidence.some((asset) =>
        asset.src.includes("database-erd"),
      ),
    ).toBe(false);
    expect(hasCaseStudy("how-to-train-your-ai")).toBe(false);
    expect(hasCaseStudy("met-summaries")).toBe(false);
  });

  it("presents BuildSense as a problem-first technical investigation", () => {
    const project = getProject("buildsense")!;
    const study = getCaseStudy("buildsense")!;
    render(<CaseStudyExperience locale="en" project={project} study={study} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "BuildSense" }),
    ).toBeInTheDocument();
    expect(screen.getByText(study.problem.en)).toBeInTheDocument();
    expect(screen.getByText(project.contribution.en)).toBeInTheDocument();
    expect(screen.getByText(project.limitation.en)).toBeInTheDocument();

    const index = screen.getByRole("navigation", { name: "Case study index" });
    const sectionLabels = [
      "Context",
      "Problem",
      "Problem Research",
      "How I Solved It",
      "System Architecture",
      "Challenges",
      "Technical Safeguards",
      "My Contribution",
      "Outcome",
      "Related Evidence",
    ];
    for (const label of sectionLabels) {
      expect(index).toHaveTextContent(label);
    }

    const indexLinks = within(index).getAllByRole("link");
    expect(indexLinks).toHaveLength(sectionLabels.length);
    indexLinks.forEach((link, indexPosition) => {
      expect(link).toHaveTextContent(
        String(indexPosition + 1).padStart(2, "0"),
      );
    });
    expect(
      screen.getByRole("img", { name: study.architecture.summary.en }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /View Visual Exploration/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /Back to Pinboard/ })[0],
    ).toHaveAttribute("href", "/en?focus=projects");
    expect(
      screen.getByRole("link", {
        name: /Previous case study\s*BBMS Mobile/,
      }),
    ).toHaveAttribute("href", "/en/case-studies/blood-bank-mobile");
    expect(
      screen.getByRole("link", { name: /Next case study\s*CinemaVerse/ }),
    ).toHaveAttribute("href", "/en/case-studies/cinemaverse");
  });

  it("presents concrete challenges and safeguards for DVLD", () => {
    const project = getProject("dvld")!;
    const study = getCaseStudy("dvld")!;
    render(<CaseStudyExperience locale="en" project={project} study={study} />);

    const index = screen.getByRole("navigation", { name: "Case study index" });
    expect(within(index).getByText("Challenges")).toBeInTheDocument();
    expect(within(index).getByText("Technical Safeguards")).toBeInTheDocument();
    expect(screen.getByText("Ordered test eligibility")).toBeInTheDocument();
    expect(screen.queryByText("Decisions")).not.toBeInTheDocument();
  });

  it("localizes the investigation system and route actions for Arabic", () => {
    const project = getProject("bookify")!;
    const study = getCaseStudy("bookify")!;
    render(<CaseStudyExperience locale="ar" project={project} study={study} />);

    expect(
      screen.getByRole("navigation", { name: "فهرس دراسة الحالة" }),
    ).toHaveTextContent("بحث المشكلة");
    expect(
      screen.getAllByRole("link", { name: /العودة إلى لوحة المشاريع/ })[0],
    ).toHaveAttribute("href", "/ar?focus=projects");
    expect(
      screen.queryByRole("link", { name: /عرض الاستكشاف البصري/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "كيف حللت المشكلة" }),
    ).toBeInTheDocument();
    expect(screen.getByText("ملخص المشكلة")).toBeInTheDocument();
  });

  it("opens the pinboard modal before routing Project Details to the case study", async () => {
    const user = userEvent.setup();
    render(<PinboardFlow />);

    const buildsensePaper = screen.getByRole("link", {
      name: "Open case study: BuildSense",
    });
    expect(buildsensePaper).toHaveAttribute(
      "href",
      "/en/case-studies/buildsense",
    );
    expect(buildsensePaper).not.toHaveAttribute(
      "href",
      "/en/projects/buildsense",
    );

    await user.click(buildsensePaper);
    expect(screen.getByRole("dialog", { name: "BuildSense" })).toHaveAttribute(
      "open",
    );
    expect(
      screen.getByRole("link", { name: /Project Details/ }),
    ).toHaveAttribute("href", "/en/case-studies/buildsense");
    const study = getCaseStudy("buildsense")!;
    expect(screen.getByText(study.problem.en)).toBeInTheDocument();
    expect(screen.getByText("Core technologies")).toBeInTheDocument();
    expect(screen.queryByText("Engineering shape")).not.toBeInTheDocument();
    expect(screen.queryByText("Available evidence")).not.toBeInTheDocument();
    expect(screen.queryByText("Honest boundary")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Repository field notes"),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Next project image" }),
    );
    expect(screen.getByText("Project image 2 / 4")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Close project overview" }),
    );
    expect(
      screen.queryByRole("dialog", { name: "BuildSense" }),
    ).not.toBeInTheDocument();
  });
});
