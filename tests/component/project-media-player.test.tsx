import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ProjectMediaPlayer,
  type ProjectMediaPlayerCopy,
} from "@/components/room/project-media-player";
import { getProject } from "@/content/portfolio";
import { MotionProvider } from "@/components/providers/motion-provider";

const copy: ProjectMediaPlayerCopy = {
  play: "Play project film",
  pause: "Pause project film",
  timeline: "Project playback timeline",
  elapsed: "Elapsed time",
  previousMedia: "Previous scene",
  nextMedia: "Next scene",
  previousProject: "Previous project",
  nextProject: "Next project",
  viewProject: "Explore project",
  currentScene: "Scene",
  mediaCount: "{current} of {total} scenes",
  mediaUnavailable: "Media unavailable",
};

function renderBuildSensePlayer() {
  const buildsense = getProject("buildsense")!;
  return render(
    <MotionProvider>
      <ProjectMediaPlayer
        project={buildsense}
        locale="en"
        copy={copy}
        detailHref="/en/projects/buildsense"
        projectCount={1}
        projectPosition={1}
      />
    </MotionProvider>,
  );
}

describe("ProjectMediaPlayer video playback & preferences", () => {
  beforeEach(() => {
    delete document.documentElement.dataset.motion;
    document.documentElement.dataset.motion = "full";
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
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
  });

  afterEach(() => {
    delete document.documentElement.dataset.motion;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
  });

  it("uses native video metadata and time updates in the shared timeline", () => {
    renderBuildSensePlayer();

    const video = screen.getByLabelText(
      "BuildSense PC hardware discovery preview video",
    );
    expect(video).toHaveAttribute(
      "src",
      "/projects/buildsense/preview/preview.mp4",
    );
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video).toHaveProperty("muted", true);
    expect(video).toHaveProperty("playsInline", true);

    Object.defineProperty(video, "duration", { configurable: true, value: 7 });
    fireEvent.loadedMetadata(video);
    expect(screen.getByRole("slider", { name: copy.timeline })).toHaveAttribute(
      "max",
      "7",
    );

    Object.defineProperty(video, "currentTime", {
      configurable: true,
      value: 3,
    });
    fireEvent.timeUpdate(video);
    expect(screen.getByRole("slider", { name: copy.timeline })).toHaveValue(
      "3",
    );
    expect(screen.getByText("0:03 / 0:07")).toBeInTheDocument();
  });

  it("keeps project information and the primary action in edge overlays", () => {
    renderBuildSensePlayer();

    expect(
      screen.getByRole("heading", { name: "BuildSense" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "PC hardware discovery and compatibility for the Egyptian market.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Explore project/ }),
    ).toHaveAttribute("href", "/en/projects/buildsense");
    expect(
      screen.queryByRole("link", { name: "Repository" }),
    ).not.toBeInTheDocument();
  });

  it("renders poster image before video canplay", () => {
    renderBuildSensePlayer();

    const posterImg = screen.getByAltText(
      "BuildSense PC hardware discovery preview video",
    );
    expect(posterImg).toBeInTheDocument();
    expect(posterImg).toHaveAttribute(
      "src",
      expect.stringContaining("poster.webp"),
    );
  });

  it("resets currentTime and replays on single-video ended event", () => {
    renderBuildSensePlayer();

    const video = screen.getByLabelText(
      "BuildSense PC hardware discovery preview video",
    ) as HTMLVideoElement;
    Object.defineProperty(video, "currentTime", {
      configurable: true,
      writable: true,
      value: 7,
    });

    fireEvent.ended(video);
    expect(video.currentTime).toBe(0);
  });

  it("renders with reduced motion without breaking playback controls", () => {
    window.localStorage.setItem("portfolio-reduced-motion", "true");

    renderBuildSensePlayer();

    expect(
      screen.getByLabelText("BuildSense PC hardware discovery preview video"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("slider", { name: copy.timeline }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: copy.play }) ??
        screen.queryByRole("button", { name: copy.pause }),
    ).toBeInTheDocument();
  });

  it("respects Save Data mode by using preload none and disabling initial autoplay", () => {
    vi.stubGlobal("navigator", {
      connection: { saveData: true },
    });

    renderBuildSensePlayer();
    const video = screen.getByLabelText(
      "BuildSense PC hardware discovery preview video",
    );
    expect(video).toHaveAttribute("preload", "none");
    expect(screen.getByRole("button", { name: copy.play })).toBeInTheDocument();
  });
});
