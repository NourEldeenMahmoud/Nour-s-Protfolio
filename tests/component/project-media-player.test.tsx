import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ProjectMediaPlayer,
  type ProjectMediaPlayerCopy,
} from "@/components/room/project-media-player";
import { projects, type Project } from "@/content/portfolio";

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
  repository: "Repository",
  currentScene: "Scene",
  mediaCount: "{current} of {total} scenes",
  mediaUnavailable: "Media unavailable",
};

const videoProject: Project = {
  ...projects[0]!,
  media: [
    {
      id: "demo-video",
      type: "video",
      src: "/projects/demo.mp4",
      poster: "/projects/buildsense.webp",
      alt: {
        en: "BuildSense product walkthrough",
        ar: "جولة في مشروع BuildSense",
      },
      duration: 8,
    },
    {
      id: "closing-image",
      type: "image",
      src: "/projects/buildsense.webp",
      alt: {
        en: "BuildSense closing scene",
        ar: "المشهد الختامي لمشروع BuildSense",
      },
      duration: 5,
    },
  ],
};

function renderVideoPlayer() {
  return render(
    <ProjectMediaPlayer
      project={videoProject}
      locale="en"
      categoryLabel="Web"
      copy={copy}
      detailHref="/en/projects/buildsense"
      projectCount={1}
      projectPosition={1}
    />,
  );
}

describe("ProjectMediaPlayer video playback", () => {
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
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
  });

  it("uses native video metadata and time updates in the shared timeline", () => {
    renderVideoPlayer();

    const video = screen.getByLabelText("BuildSense product walkthrough");
    expect(video).toHaveAttribute("src", "/projects/demo.mp4");
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video).toHaveProperty("muted", true);
    expect(video).toHaveProperty("playsInline", true);

    Object.defineProperty(video, "duration", { configurable: true, value: 7 });
    fireEvent.loadedMetadata(video);
    expect(screen.getByRole("slider", { name: copy.timeline })).toHaveAttribute(
      "max",
      "12",
    );

    Object.defineProperty(video, "currentTime", {
      configurable: true,
      value: 3,
    });
    fireEvent.timeUpdate(video);
    expect(screen.getByRole("slider", { name: copy.timeline })).toHaveValue(
      "3",
    );
    expect(screen.getByText("0:03 / 0:12")).toBeInTheDocument();
  });

  it("pauses while the document is hidden and resumes when it becomes visible", () => {
    const play = vi.mocked(HTMLMediaElement.prototype.play);
    const pause = vi.mocked(HTMLMediaElement.prototype.pause);
    renderVideoPlayer();
    play.mockClear();
    pause.mockClear();

    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    fireEvent(document, new Event("visibilitychange"));
    expect(pause).toHaveBeenCalledOnce();

    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
    fireEvent(document, new Event("visibilitychange"));
    expect(play).toHaveBeenCalledOnce();
  });
});
