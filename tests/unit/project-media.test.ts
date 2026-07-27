import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import {
  getProject,
  getProjectDetailMedia,
  getProjectPreviewMedia,
  projects,
  projectSlugs,
} from "@/content/portfolio";
import { caseStudySlugs, hasCaseStudy } from "@/content/case-studies";
import { projectMediaSets } from "@/content/project-media";

describe("project media helpers & case study bounds", () => {
  it("canonical global project order is enforced", () => {
    expect(projectSlugs).toEqual([
      "buildsense",
      "cinemaverse",
      "bookify",
      "frontend-mini-projects",
      "how-to-train-your-ai",
      "sharp-shooter",
      "royal-run",
      "galaxy-strike",
      "rocket-boost",
      "blood-bank-desktop",
      "dvld",
      "blood-bank-mobile",
      "met-summaries",
    ]);
  });

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

  it("getProjectDetailMedia returns image-only sets from projectMediaSets", () => {
    for (const project of projects) {
      const detailMedia = getProjectDetailMedia(project);
      expect(detailMedia.every((m) => m.type === "image")).toBe(true);
      expect(detailMedia.length).toBeGreaterThan(0);
    }
  });

  it("explicit projectMediaSets separates preview video from detail images", () => {
    const videoSlugs = ["buildsense", "bookify", "frontend-mini-projects", "how-to-train-your-ai", "sharp-shooter", "royal-run", "galaxy-strike", "rocket-boost", "blood-bank-desktop", "blood-bank-mobile", "dvld"] as const;

    for (const slug of videoSlugs) {
      const set = projectMediaSets[slug];
      expect(set.preview[0]?.type).toBe("video");
      expect(set.details.every((m) => m.type === "image")).toBe(true);
    }
  });

  it("hasCaseStudy correctly identifies projects with verified case studies", () => {
    expect(hasCaseStudy("buildsense")).toBe(true);
    expect(hasCaseStudy("bookify")).toBe(true);
    expect(hasCaseStudy("cinemaverse")).toBe(true);
    expect(hasCaseStudy("blood-bank-desktop")).toBe(true);
    expect(hasCaseStudy("blood-bank-mobile")).toBe(true);
    expect(hasCaseStudy("dvld")).toBe(true);

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

  it("every project hero image exists on filesystem", () => {
    const publicDir = path.join(process.cwd(), "public");
    for (const project of projects) {
      const heroPath = path.join(publicDir, project.image.replace(/^\//, ""));
      expect(fs.existsSync(heroPath)).toBe(true);
    }
  });

  it("Rocket Boost detail images exist on filesystem", () => {
    const publicDir = path.join(process.cwd(), "public");
    const rocketBoost = getProject("rocket-boost")!;
    const details = getProjectDetailMedia(rocketBoost);
    expect(details.length).toBeGreaterThanOrEqual(6);
    for (const img of details) {
      const imgPath = path.join(publicDir, img.src.replace(/^\//, ""));
      expect(fs.existsSync(imgPath)).toBe(true);
    }
  });

  it("verified repository URLs are assigned correctly", () => {
    const httyai = getProject("how-to-train-your-ai")!;
    expect(httyai.repository).toBe("https://github.com/NourEldeenMahmoud/HowToTrainYourAI-Game");

    const unityProjects = ["sharp-shooter", "royal-run", "galaxy-strike", "rocket-boost"] as const;
    for (const slug of unityProjects) {
      const p = getProject(slug)!;
      expect(p.repository).toBe("https://github.com/NourEldeenMahmoud/Unity-Projects");
    }
  });

  it("How To Train Your AI contains no ML-Agents or Python claims", () => {
    const httyai = getProject("how-to-train-your-ai")!;
    const text = JSON.stringify(httyai).toLowerCase();

    expect(text).not.toContain("ml-agents");
    expect(text).not.toContain("reinforcement");
    expect(text).not.toContain("python");
    expect(text).not.toContain("reward function");
  });

  it("Summaries GLB exists and old Bots model/references are removed", () => {
    const publicDir = path.join(process.cwd(), "public");
    const summariesGlb = path.join(publicDir, "models", "showcase-icons", "summaries.glb");
    const botsGlb = path.join(publicDir, "models", "showcase-icons", "bots.glb");

    expect(fs.existsSync(summariesGlb)).toBe(true);
    expect(fs.existsSync(botsGlb)).toBe(false);
  });
});
