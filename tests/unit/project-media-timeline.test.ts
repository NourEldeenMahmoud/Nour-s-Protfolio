import { describe, expect, it } from "vitest";
import type { ProjectMedia } from "@/content/portfolio";
import {
  buildMediaTimeline,
  clampTimelineTime,
  formatPlaybackTime,
  locateTimelineTime,
} from "@/components/room/project-media-timeline";

const media = (
  id: string,
  type: "image" | "video",
  duration?: number,
): ProjectMedia => ({
  id,
  type,
  src: `/${id}`,
  alt: { en: id, ar: id },
  duration,
});

describe("project media timeline", () => {
  it("builds one continuous timeline from image and video durations", () => {
    const timeline = buildMediaTimeline([
      media("hero", "image", 5),
      media("demo", "video", 12),
      media("detail", "image", 4),
    ]);

    expect(timeline).toEqual([
      { index: 0, start: 0, end: 5, duration: 5 },
      { index: 1, start: 5, end: 17, duration: 12 },
      { index: 2, start: 17, end: 21, duration: 4 },
    ]);
  });

  it("uses loaded video duration overrides without changing image timing", () => {
    const timeline = buildMediaTimeline(
      [media("hero", "image", 5), media("demo", "video", 10)],
      { demo: 18.5 },
    );

    expect(timeline[1]).toEqual({
      index: 1,
      start: 5,
      end: 23.5,
      duration: 18.5,
    });
  });

  it("maps global scrub time to the correct item and internal progress", () => {
    const timeline = buildMediaTimeline([
      media("one", "image", 5),
      media("two", "image", 4),
    ]);

    expect(locateTimelineTime(7, timeline)).toEqual({
      index: 1,
      itemTime: 2,
      itemProgress: 0.5,
    });
  });

  it("clamps invalid seeks and formats elapsed time", () => {
    expect(clampTimelineTime(-4, 12)).toBe(0);
    expect(clampTimelineTime(20, 12)).toBe(12);
    expect(formatPlaybackTime(65.9)).toBe("1:05");
  });
});
