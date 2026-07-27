import { describe, expect, it } from "vitest";
import {
  getProject,
  getProjectDetailMedia,
  getProjectPreviewMedia,
  projects,
} from "@/content/portfolio";
import { caseStudySlugs, hasCaseStudy } from "@/content/case-studies";

describe("project media helpers & case study bounds", () => {
  it("getProjectPreviewMedia returns video item for video-backed projects", () => {
    const buildsense = getProject("buildsense")!;
    const previewMedia = getProjectPreviewMedia(buildsense);

    expect(previewMedia.length).toBeGreaterThan(0);
    expect(previewMedia[0]!.type).toBe("video");
    expect(previewMedia[0]!.src).toBe("/projects/buildsense/preview/preview.mp4");
  });

  it("getProjectPreviewMedia returns images for image-only projects", () => {
    const metSummaries = getProject("met-summaries")!;
    const previewMedia = getProjectPreviewMedia(metSummaries);

    expect(previewMedia.length).toBeGreaterThan(0);
    expect(previewMedia.every((m) => m.type === "image")).toBe(true);
  });

  it("getProjectDetailMedia filters out videos and returns image playlist", () => {
    const buildsense = getProject("buildsense")!;
    const detailMedia = getProjectDetailMedia(buildsense);

    expect(detailMedia.every((m) => m.type === "image")).toBe(true);
    expect(detailMedia.length).toBeGreaterThan(0);
  });

  it("hasCaseStudy correctly identifies projects with verified case studies", () => {
    expect(hasCaseStudy("buildsense")).toBe(true);
    expect(hasCaseStudy("bookify")).toBe(true);
    expect(hasCaseStudy("cinemaverse")).toBe(true);
    expect(hasCaseStudy("blood-bank-desktop")).toBe(true);
    expect(hasCaseStudy("blood-bank-mobile")).toBe(true);
    expect(hasCaseStudy("dvld")).toBe(true);

    // Non-case-study projects
    expect(hasCaseStudy("how-to-train-your-ai")).toBe(false);
    expect(hasCaseStudy("sharp-shooter")).toBe(false);
    expect(hasCaseStudy("royal-run")).toBe(false);
    expect(hasCaseStudy("galaxy-strike")).toBe(false);
    expect(hasCaseStudy("rocket-boost")).toBe(false);
    expect(hasCaseStudy("frontend-mini-projects")).toBe(false);
    expect(hasCaseStudy("met-summaries")).toBe(false);
  });

  it("caseStudySlugs lists exactly 6 verified projects", () => {
    expect(caseStudySlugs).toHaveLength(6);
  });

  it("every project has valid kind and non-empty stack and metadata", () => {
    for (const project of projects) {
      expect(["product", "game", "collection"]).toContain(project.kind);
      expect(project.stack.length).toBeGreaterThan(0);
      expect(project.summary.en.length).toBeGreaterThan(0);
      expect(project.summary.ar.length).toBeGreaterThan(0);
      expect(project.context.en.length).toBeGreaterThan(0);
      expect(project.context.ar.length).toBeGreaterThan(0);
    }
  });
});
