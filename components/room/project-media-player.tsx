"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import {
  getProjectPreviewMedia,
  type Project,
  type ProjectMedia,
} from "@/content/portfolio";
import type { Locale } from "@/i18n/routing";
import {
  buildMediaTimeline,
  clampTimelineTime,
  formatPlaybackTime,
  locateTimelineTime,
} from "./project-media-timeline";
import styles from "./project-media-player.module.css";

export type ProjectMediaPlayerCopy = {
  play: string;
  pause: string;
  timeline: string;
  elapsed: string;
  previousMedia: string;
  nextMedia: string;
  previousProject: string;
  nextProject: string;
  viewProject: string;
  repository: string;
  currentScene: string;
  mediaCount: string;
  mediaUnavailable: string;
};

type Direction = "next" | "prev";

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  const path = direction === "left" ? "M15 4l-8 8 8 8" : "M9 4l8 8-8 8";
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      data-direction={direction}
    >
      <path d={path} />
    </svg>
  );
}

function PlayIcon({ paused }: { paused: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {paused ? (
        <path d="m8 5 11 7-11 7V5Z" />
      ) : (
        <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
      )}
    </svg>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function mediaTransform(
  index: number,
  progress: number,
  reducedMotion: boolean,
) {
  if (reducedMotion) return "scale(1)";
  const paths: Array<[number, number, number, number]> = [
    [-1.1, -0.5, 1.1, 0.5],
    [1.2, -0.4, -0.8, 0.6],
    [-0.4, 0.9, 0.7, -0.7],
    [0.8, 0.6, -1, -0.4],
  ];
  const [fromX, fromY, toX, toY] = paths[index % paths.length]!;
  const x = fromX + (toX - fromX) * progress;
  const y = fromY + (toY - fromY) * progress;
  const scale = 1.025 + progress * 0.035;
  return `translate3d(${x}%, ${y}%, 0) scale(${scale})`;
}

function ImageSequenceFrame({
  media,
  locale,
  index,
  progress,
  reducedMotion,
  onError,
}: {
  media: ProjectMedia;
  locale: Locale;
  index: number;
  progress: number;
  reducedMotion: boolean;
  onError: () => void;
}) {
  const portrait =
    media.orientation === "portrait" || media.device === "mobile";
  return (
    <div
      className={`${styles.imageFrame} ${portrait ? styles.imageFramePortrait : ""}`}
      data-transition={
        reducedMotion ? "fade" : (media.transition ?? "crossfade")
      }
    >
      <Image
        className={styles.mediaImage}
        src={media.src}
        alt={media.alt[locale]}
        fill
        sizes="(max-width: 780px) 100vw, 50vw"
        priority={index === 0}
        style={{
          objectPosition: media.focalPosition ?? "50% 50%",
          transform: mediaTransform(index, progress, reducedMotion),
        }}
        onError={onError}
      />
    </div>
  );
}

export function ProjectMediaPlayer({
  project,
  locale,
  categoryLabel,
  copy,
  detailHref,
  projectCount,
  projectPosition,
  previousProjectTitle,
  nextProjectTitle,
  onPreviousProject,
  onNextProject,
}: {
  project: Project;
  locale: Locale;
  categoryLabel: string;
  copy: ProjectMediaPlayerCopy;
  detailHref: string;
  projectCount: number;
  projectPosition: number;
  previousProjectTitle?: string;
  nextProjectTitle?: string;
  onPreviousProject?: () => void;
  onNextProject?: () => void;
}) {
  const playlist = useMemo(() => getProjectPreviewMedia(project), [project]);
  const [durationOverrides, setDurationOverrides] = useState<
    Record<string, number>
  >({});
  const segments = useMemo(
    () => buildMediaTimeline(playlist, durationOverrides),
    [durationOverrides, playlist],
  );
  const totalDuration = segments.at(-1)?.end ?? 0;
  const [timelineTime, setTimelineTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [bufferedTime, setBufferedTime] = useState(0);
  const [failedMedia, setFailedMedia] = useState<Set<string>>(() => new Set());
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const pendingVideoTimeRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const position = locateTimelineTime(timelineTime, segments);
  const currentMedia = playlist[position.index] ?? null;
  const currentSegment = segments[position.index];
  const nextMedia = playlist[(position.index + 1) % playlist.length];
  const isRtl = locale === "ar";
  const canAdvance =
    isPlaying && !isInteracting && isIntersecting && documentVisible;
  const progress = totalDuration > 0 ? (timelineTime / totalDuration) * 100 : 0;
  const bufferedProgress =
    totalDuration > 0 ? (bufferedTime / totalDuration) * 100 : 0;

  useEffect(() => {
    const onVisibilityChange = () => setDocumentVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (!playerRef.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setIsIntersecting(
          Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.2),
        ),
      { threshold: [0, 0.2] },
    );
    observer.observe(playerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      !canAdvance ||
      !currentMedia ||
      currentMedia.type === "video" ||
      totalDuration <= 0
    )
      return;

    let frame = 0;
    let previous: number | null = null;
    let accumulated = 0;
    const tick = (now: number) => {
      if (previous === null) {
        previous = now;
        frame = requestAnimationFrame(tick);
        return;
      }
      if (now <= previous) return;
      accumulated += (now - previous) / 1000;
      previous = now;
      if (accumulated >= 1 / 30) {
        const delta = accumulated;
        accumulated = 0;
        setTimelineTime((time) => {
          const next = time + delta;
          return next >= totalDuration ? 0 : next;
        });
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [canAdvance, currentMedia, totalDuration]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || currentMedia?.type !== "video") return;
    if (pendingVideoTimeRef.current !== null) {
      video.currentTime = pendingVideoTimeRef.current;
      pendingVideoTimeRef.current = null;
    }
    if (canAdvance) {
      void Promise.resolve(video.play()).catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [canAdvance, currentMedia]);

  const seekTo = useCallback(
    (requestedTime: number) => {
      const nextTime = clampTimelineTime(requestedTime, totalDuration);
      const nextPosition = locateTimelineTime(nextTime, segments);
      pendingVideoTimeRef.current = nextPosition.itemTime;
      setTimelineTime(
        nextTime === totalDuration && totalDuration > 0 ? 0 : nextTime,
      );
    },
    [segments, totalDuration],
  );

  const goToMedia = useCallback(
    (direction: Direction) => {
      if (segments.length <= 1) return;
      const previousIndex =
        (position.index - 1 + segments.length) % segments.length;
      const nextIndex = (position.index + 1) % segments.length;
      const targetIndex =
        direction === "prev" && position.itemTime <= 1
          ? previousIndex
          : direction === "prev"
            ? position.index
            : nextIndex;
      seekTo(segments[targetIndex]!.start);
    },
    [position.index, position.itemTime, seekTo, segments],
  );

  function handlePlayerKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === " ") {
      event.preventDefault();
      setIsPlaying((playing) => !playing);
      return;
    }
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const forward = event.key === "ArrowRight" ? !isRtl : isRtl;
    (forward ? onNextProject : onPreviousProject)?.();
  }

  function handleSwipeStart(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") return;
    swipeStartRef.current = { x: event.clientX, y: event.clientY };
  }

  function handleSwipeEnd(event: PointerEvent<HTMLDivElement>) {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < 54 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    const forward = deltaX < 0 ? !isRtl : isRtl;
    (forward ? onNextProject : onPreviousProject)?.();
  }

  function markMediaFailed(id: string) {
    setFailedMedia((failed) => new Set(failed).add(id));
  }

  function handleVideoMetadata() {
    const video = videoRef.current;
    if (!video || !currentMedia || !Number.isFinite(video.duration)) return;
    setDurationOverrides((durations) => ({
      ...durations,
      [currentMedia.id]: video.duration,
    }));
  }

  function handleVideoProgress() {
    const video = videoRef.current;
    if (!video || !currentSegment || video.buffered.length === 0) return;
    const bufferedEnd = video.buffered.end(video.buffered.length - 1);
    setBufferedTime(
      currentSegment.start + Math.min(bufferedEnd, currentSegment.duration),
    );
  }

  const sceneLabel =
    currentMedia?.caption?.[locale] ?? currentMedia?.alt[locale] ?? "";
  const mediaCount = copy.mediaCount
    .replace("{current}", String(position.index + 1))
    .replace("{total}", String(playlist.length));
  const projectCounter = `${projectPosition} / ${projectCount}`;
  const prevDirection = isRtl ? "right" : "left";
  const nextDirection = isRtl ? "left" : "right";
  const timelineStyle = {
    "--timeline-progress": `${progress}%`,
    "--timeline-buffered": `${Math.max(bufferedProgress, progress)}%`,
  } as CSSProperties;

  return (
    <div
      ref={playerRef}
      className={styles.player}
      data-playing={canAdvance ? "true" : "false"}
      data-project={project.slug}
      tabIndex={0}
      aria-label={project.title}
      onKeyDown={handlePlayerKeyDown}
    >
      <header className={styles.topBar}>
        <div className={styles.identity}>
          <span className={styles.wordmark} aria-hidden="true">
            {project.shortTitle}
          </span>
          <span className={styles.identityRule} aria-hidden="true" />
          <span className={styles.category}>{categoryLabel}</span>
          <span className={styles.scene} title={sceneLabel}>
            <span>{copy.currentScene}</span>
            {sceneLabel}
          </span>
        </div>
        <nav className={styles.topActions} aria-label={project.title}>
          <a
            className={styles.repositoryLink}
            href={project.repository}
            target="_blank"
            rel="noreferrer"
          >
            {copy.repository}
          </a>
          <Link className={styles.topProjectLink} href={detailHref}>
            {copy.viewProject}
            <ArrowIcon direction={nextDirection} />
          </Link>
        </nav>
      </header>

      <div
        className={styles.stage}
        onPointerDown={handleSwipeStart}
        onPointerUp={handleSwipeEnd}
        onPointerCancel={() => (swipeStartRef.current = null)}
      >
        {currentMedia && !failedMedia.has(currentMedia.id) ? (
          currentMedia.type === "image" ? (
            <ImageSequenceFrame
              key={currentMedia.id}
              media={currentMedia}
              locale={locale}
              index={position.index}
              progress={position.itemProgress}
              reducedMotion={reducedMotion}
              onError={() => markMediaFailed(currentMedia.id)}
            />
          ) : (
            <video
              key={currentMedia.id}
              ref={videoRef}
              className={styles.mediaVideo}
              src={currentMedia.src}
              poster={currentMedia.poster}
              muted
              playsInline
              preload="metadata"
              aria-label={currentMedia.alt[locale]}
              onLoadedMetadata={handleVideoMetadata}
              onTimeUpdate={(event) => {
                if (!currentSegment) return;
                setTimelineTime(
                  currentSegment.start + event.currentTarget.currentTime,
                );
              }}
              onProgress={handleVideoProgress}
              onEnded={() => goToMedia("next")}
              onError={() => markMediaFailed(currentMedia.id)}
            />
          )
        ) : (
          <div className={styles.mediaFallback}>{copy.mediaUnavailable}</div>
        )}

        {nextMedia?.type === "image" && nextMedia.id !== currentMedia?.id && (
          <Image
            className={styles.preloadImage}
            src={nextMedia.src}
            alt=""
            width={16}
            height={9}
            aria-hidden="true"
          />
        )}
        <div className={styles.stageShade} aria-hidden="true" />

        {onPreviousProject && onNextProject && (
          <>
            <button
              type="button"
              className={`${styles.projectNav} ${styles.projectNavPrev}`}
              aria-label={`${copy.previousProject}: ${previousProjectTitle ?? ""}`}
              data-project-arrow="desktop"
              onClick={onPreviousProject}
            >
              <ArrowIcon direction={prevDirection} />
              <span>{previousProjectTitle}</span>
            </button>
            <button
              type="button"
              className={`${styles.projectNav} ${styles.projectNavNext}`}
              aria-label={`${copy.nextProject}: ${nextProjectTitle ?? ""}`}
              data-project-arrow="desktop"
              onClick={onNextProject}
            >
              <span>{nextProjectTitle}</span>
              <ArrowIcon direction={nextDirection} />
            </button>
          </>
        )}
      </div>

      <section className={styles.controlDeck} aria-label={project.title}>
        <div className={styles.projectMeta}>
          <div className={styles.titleRow}>
            <span className={styles.projectOrdinal}>{projectCounter}</span>
            <h3>{project.title}</h3>
          </div>
          <p>{project.summary[locale]}</p>
          <ul aria-label="Stack">
            {project.stack.slice(0, 4).map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>

        <div className={styles.transport}>
          <div className={styles.transportRow}>
            <div className={styles.transportButtons}>
              <button
                type="button"
                className={styles.iconButton}
                aria-label={isPlaying ? copy.pause : copy.play}
                onClick={() => setIsPlaying((playing) => !playing)}
              >
                <PlayIcon paused={!isPlaying} />
              </button>
              {playlist.length > 1 && (
                <>
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label={copy.previousMedia}
                    onClick={() => goToMedia("prev")}
                  >
                    <ArrowIcon direction={prevDirection} />
                  </button>
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label={copy.nextMedia}
                    onClick={() => goToMedia("next")}
                  >
                    <ArrowIcon direction={nextDirection} />
                  </button>
                </>
              )}
            </div>
            <span className={styles.timeReadout}>
              <span className="sr-only">{copy.elapsed}: </span>
              {formatPlaybackTime(timelineTime)} /{" "}
              {formatPlaybackTime(totalDuration)}
            </span>
            <span className={styles.mediaCount}>{mediaCount}</span>
          </div>

          <div className={styles.timeline} style={timelineStyle}>
            <div className={styles.timelineTrack} aria-hidden="true">
              <span className={styles.timelineBuffered} />
              <span className={styles.timelineProgress} />
              {segments.slice(1).map((segment) => (
                <span
                  key={segment.index}
                  className={styles.timelineBoundary}
                  style={{
                    insetInlineStart: `${(segment.start / totalDuration) * 100}%`,
                  }}
                />
              ))}
            </div>
            <input
              className={styles.timelineInput}
              type="range"
              min={0}
              max={Math.max(totalDuration, 0.1)}
              step={0.05}
              value={timelineTime}
              aria-label={copy.timeline}
              aria-valuetext={`${formatPlaybackTime(timelineTime)} / ${formatPlaybackTime(totalDuration)}`}
              onChange={(event) => seekTo(event.currentTarget.valueAsNumber)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowLeft" && event.key !== "ArrowRight")
                  return;
                event.preventDefault();
                const forward = event.key === "ArrowRight" ? !isRtl : isRtl;
                seekTo(timelineTime + (forward ? 5 : -5));
              }}
              onPointerDown={() => setIsInteracting(true)}
              onPointerUp={() => setIsInteracting(false)}
              onPointerCancel={() => setIsInteracting(false)}
              onBlur={() => setIsInteracting(false)}
              onPointerMove={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                const ratio = Math.min(
                  Math.max((event.clientX - bounds.left) / bounds.width, 0),
                  1,
                );
                setHoverTime((isRtl ? 1 - ratio : ratio) * totalDuration);
              }}
              onPointerLeave={() => setHoverTime(null)}
            />
            {hoverTime !== null && (
              <span
                className={styles.timelinePreview}
                style={{
                  insetInlineStart: `${(hoverTime / totalDuration) * 100}%`,
                }}
                aria-hidden="true"
              >
                {formatPlaybackTime(hoverTime)}
              </span>
            )}
          </div>
        </div>

        <Link className={styles.primaryAction} href={detailHref}>
          <span>{copy.viewProject}</span>
          <ArrowIcon direction={nextDirection} />
        </Link>
      </section>

      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {`${project.title}: ${sceneLabel}, ${mediaCount}`}
      </div>
    </div>
  );
}
