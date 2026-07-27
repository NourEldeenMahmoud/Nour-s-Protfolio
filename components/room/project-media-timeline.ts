import type { ProjectMedia } from "@/content/portfolio";

export const DEFAULT_IMAGE_DURATION = 5;
export const DEFAULT_VIDEO_DURATION = 10;

export type TimelineSegment = {
  index: number;
  start: number;
  end: number;
  duration: number;
};

export function getMediaDuration(
  media: ProjectMedia,
  durationOverride?: number,
): number {
  const fallback =
    media.type === "image" ? DEFAULT_IMAGE_DURATION : DEFAULT_VIDEO_DURATION;
  const duration = durationOverride ?? media.duration ?? fallback;
  return Number.isFinite(duration) && duration > 0 ? duration : fallback;
}

export function buildMediaTimeline(
  playlist: ProjectMedia[],
  durationOverrides: Record<string, number> = {},
): TimelineSegment[] {
  let cursor = 0;
  return playlist.map((media, index) => {
    const duration = getMediaDuration(media, durationOverrides[media.id]);
    const segment = { index, start: cursor, end: cursor + duration, duration };
    cursor = segment.end;
    return segment;
  });
}

export function clampTimelineTime(time: number, totalDuration: number): number {
  if (!Number.isFinite(time) || totalDuration <= 0) return 0;
  return Math.min(Math.max(time, 0), totalDuration);
}

export function locateTimelineTime(
  time: number,
  segments: TimelineSegment[],
): { index: number; itemTime: number; itemProgress: number } {
  if (segments.length === 0) return { index: 0, itemTime: 0, itemProgress: 0 };

  const totalDuration = segments.at(-1)!.end;
  const clamped = clampTimelineTime(time, totalDuration);
  const segment =
    segments.find(
      ({ end }, index) => clamped < end || index === segments.length - 1,
    ) ?? segments[0]!;
  const itemTime = Math.min(
    Math.max(clamped - segment.start, 0),
    segment.duration,
  );

  return {
    index: segment.index,
    itemTime,
    itemProgress: segment.duration > 0 ? itemTime / segment.duration : 0,
  };
}

export function formatPlaybackTime(seconds: number): string {
  const safeSeconds = Math.max(
    0,
    Math.floor(Number.isFinite(seconds) ? seconds : 0),
  );
  const minutes = Math.floor(safeSeconds / 60);
  return `${minutes}:${String(safeSeconds % 60).padStart(2, "0")}`;
}
