import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CaseStudyExperience } from "@/components/case-studies/case-study-experience";
import { CaseStudyModal } from "@/components/room/case-study-modal";
import { CaseStudyPaperMap } from "@/components/room/case-study-paper-map";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { getProject, projectSlugs, type Project } from "@/content/portfolio";

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

  it("provides a separate verified case-study record for every published project", () => {
    expect(Object.keys(caseStudies).sort()).toEqual([...projectSlugs].sort());
    for (const slug of projectSlugs) {
      const study = getCaseStudy(slug)!;
      expect(study.projectSlug).toBe(slug);
      expect(study.problem.en).not.toHaveLength(0);
      expect(study.architecture.nodes.length).toBeGreaterThan(2);
      expect(study.evidence.length).toBeGreaterThan(0);
    }
  });

  it("presents BuildSense as a problem-first technical investigation", () => {
    const project = getProject("buildsense")!;
    render(
      <CaseStudyExperience
        locale="en"
        project={project}
        study={caseStudies.buildsense}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "BuildSense" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(caseStudies.buildsense.problem.en),
    ).toBeInTheDocument();
    expect(screen.getByText(project.contribution.en)).toBeInTheDocument();
    expect(screen.getByText(project.limitation.en)).toBeInTheDocument();

    const index = screen.getByRole("navigation", { name: "Case study index" });
    for (const label of [
      "Context",
      "Problem",
      "Investigation",
      "Decisions",
      "Solution",
      "Challenges",
      "Outcome",
    ]) {
      expect(index).toHaveTextContent(label);
    }

    expect(
      screen.getAllByRole("link", { name: /View Visual Exploration/ })[0],
    ).toHaveAttribute("href", "/en/projects/buildsense");
    expect(
      screen.getAllByRole("link", { name: /Back to Pinboard/ })[0],
    ).toHaveAttribute("href", "/en?focus=projects");
  });

  it("hides optional sections when repository evidence does not support them", () => {
    const project = getProject("dvld")!;
    render(
      <CaseStudyExperience
        locale="en"
        project={project}
        study={caseStudies.dvld}
      />,
    );

    const index = screen.getByRole("navigation", { name: "Case study index" });
    expect(within(index).queryByText("Challenges")).not.toBeInTheDocument();
    expect(
      within(index).getByText("Performance & safeguards"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Rejected / constrained alternatives"),
    ).not.toBeInTheDocument();
  });

  it("localizes the investigation system and route actions for Arabic", () => {
    const project = getProject("bookify")!;
    render(
      <CaseStudyExperience
        locale="ar"
        project={project}
        study={caseStudies.bookify}
      />,
    );

    expect(
      screen.getByRole("navigation", { name: "فهرس دراسة الحالة" }),
    ).toHaveTextContent("التحقيق");
    expect(
      screen.getAllByRole("link", { name: /العودة إلى لوحة المشاريع/ })[0],
    ).toHaveAttribute("href", "/ar?focus=projects");
    expect(
      screen.getAllByRole("link", { name: /عرض الاستكشاف البصري/ })[0],
    ).toHaveAttribute("href", "/ar/projects/bookify");
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

    await user.click(screen.getByRole("button", { name: "Close case study" }));
    expect(
      screen.queryByRole("dialog", { name: "BuildSense" }),
    ).not.toBeInTheDocument();
  });
});
