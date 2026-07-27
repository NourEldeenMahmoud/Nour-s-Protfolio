"use client";

import Link from "next/link";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/portfolio";
import type { CategoryId } from "@/content/project-showcase";
import { CaseStudyModal } from "./case-study-modal";
import { CaseStudyPaperMap } from "./case-study-paper-map";
import { CenterShowcase, type ShowcaseCopy } from "./center-showcase";
import { CategoryIconsLayer } from "./category-icons-layer";
import styles from "./room.module.css";

const roomAreas = ["projects", "exploration", "lab"] as const;
const focusStills = {
  projects: "/engineering-room-hire-straight.webp",
  exploration: "/engineering-room-explore-focus-final.webp",
  lab: "/engineering-room-learn-straight.webp",
} as const;
type RoomArea = (typeof roomAreas)[number];

type RoomCopy = {
  eyebrow: string;
  name: string;
  role: string;
  introStatus: string;
  readyStatus: string;
  loading: string;
  skip: string;
  replay: string;
  returnToRoom: string;
  openComputer: string;
  language: string;
  languageLabel: string;
  instruction: string;
  areas: Record<
    RoomArea,
    {
      label: string;
      description: string;
      path: "hire" | "watch" | "general" | "learn";
    }
  >;
  showcase: ShowcaseCopy;
};

export function RoomExperience({
  locale,
  copy,
}: {
  locale: Locale;
  copy: RoomCopy;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const roomImageRef = useRef<HTMLImageElement>(null);
  const introLightsRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const pathUiRef = useRef<HTMLDivElement>(null);
  const topbarRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const contextRef = useRef<gsap.Context | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const [run, setRun] = useState(0);
  const [hoveredArea, setHoveredArea] = useState<RoomArea | null>(null);
  const [focusedArea, setFocusedArea] = useState<RoomArea | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isIdle, setIsIdle] = useState(false);
  const [status, setStatus] = useState(copy.loading);
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId>("web");
  const [hoveredCategoryId, setHoveredCategoryId] = useState<CategoryId | null>(
    null,
  );
  const [focusedCategoryId, setFocusedCategoryId] = useState<CategoryId | null>(
    null,
  );
  const activeArea = hoveredArea ?? focusedArea;

  function clearAnimation() {
    timelineRef.current?.kill();
    timelineRef.current = null;
    contextRef.current?.revert();
    contextRef.current = null;
  }

  function completeIntro({ focus = true }: { focus?: boolean } = {}) {
    clearAnimation();
    if (rootRef.current) rootRef.current.dataset.roomState = "idle";
    setIsIdle(true);
    setStatus(copy.readyStatus);
    if (focus) requestAnimationFrame(() => headingRef.current?.focus());
  }

  const completeIntroAfterEffect = useEffectEvent(completeIntro);

  const transitionToArea = useCallback(
    (nextArea: RoomArea | null) => {
      setFocusedArea(nextArea);
      setHoveredArea(null);
      setStatus(nextArea ? `${copy.areas[nextArea].label}.` : copy.readyStatus);
      if (rootRef.current) {
        rootRef.current.dataset.roomState = nextArea ? "focused" : "idle";
        const focusStills = rootRef.current.querySelectorAll<HTMLElement>(
          `.${styles.focusStill}`,
        );
        focusStills.forEach((still) => {
          const currentOpacity = getComputedStyle(still).opacity;
          const targetOpacity = still.dataset.focusStill === nextArea ? 1 : 0;
          still.getAnimations().forEach((animation) => animation.cancel());
          still.style.opacity = currentOpacity;
          const animation = still.animate(
            [{ opacity: currentOpacity }, { opacity: targetOpacity }],
            {
              duration: 1100,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            },
          );
          animation.onfinish = () => {
            still.style.opacity = String(targetOpacity);
          };
        });
      }
    },
    [copy.areas, copy.readyStatus],
  );

  useLayoutEffect(() => {
    if (!imageReady) return;

    const returning =
      sessionStorage.getItem("learn-returning") === "true" ||
      new URLSearchParams(window.location.search).get("from") === "room";
    if (returning) {
      sessionStorage.removeItem("learn-returning");
      window.history.replaceState(null, "", window.location.pathname);
      clearAnimation();
      if (rootRef.current) rootRef.current.dataset.roomState = "idle";
      // eslint-disable-next-line react-hooks/set-state-in-effect -- safe: useLayoutEffect runs before paint
      setIsIdle(true);
      setStatus(copy.readyStatus);
      return;
    }

    const focusParam =
      new URLSearchParams(window.location.search).get("focus") ?? "";
    if (focusParam && roomAreas.includes(focusParam as RoomArea)) {
      const targetArea = focusParam as RoomArea;
      window.history.replaceState(null, "", window.location.pathname);
      clearAnimation();
      if (rootRef.current) rootRef.current.dataset.roomState = "idle";
      setIsIdle(true);
      setStatus(copy.readyStatus);
      requestAnimationFrame(() => transitionToArea(targetArea));
      return;
    }

    const root = rootRef.current;
    const frame = frameRef.current;
    const roomImage = roomImageRef.current;
    const introLightsContainer = introLightsRef.current;
    const veil = veilRef.current;
    const sweep = sweepRef.current;
    const controls = controlsRef.current;
    const identity = identityRef.current;
    const pathUi = pathUiRef.current;
    const topbar = topbarRef.current;
    if (
      !root ||
      !frame ||
      !roomImage ||
      !introLightsContainer ||
      !veil ||
      !sweep ||
      !controls ||
      !identity ||
      !pathUi ||
      !topbar
    )
      return;
    const introLights = Array.from(introLightsContainer.children);
    const [projectsLight, explorationLight, labLight] = introLights;
    if (!projectsLight || !explorationLight || !labLight) return;

    let cancelled = false;
    void import("gsap")
      .then(({ gsap }) => {
        if (cancelled) return;
        contextRef.current = gsap.context(() => {
          root.dataset.roomState = "intro";
          setStatus(copy.introStatus);
          const identityOffset = Math.max(
            0,
            window.innerHeight / 2 -
              identity.getBoundingClientRect().top -
              identity.offsetHeight / 2,
          );
          gsap.set(frame, { xPercent: 0, yPercent: 0, scale: 1 });
          gsap.set(roomImage, {
            filter: "brightness(0.12) saturate(0.3) contrast(1.16)",
          });
          gsap.set(introLights, { autoAlpha: 0 });
          gsap.set(veil, { autoAlpha: 1 });
          gsap.set(sweep, { autoAlpha: 0, xPercent: -55 });
          gsap.set(controls, { autoAlpha: 1, y: 0 });
          gsap.set(identity, {
            autoAlpha: 0,
            y: identityOffset,
            scale: 0.82,
            transformOrigin: "50% 50%",
          });
          gsap.set(pathUi, { autoAlpha: 0, y: 14 });
          gsap.set(topbar, { autoAlpha: 0, y: -8 });

          timelineRef.current = gsap
            .timeline({
              defaults: { ease: "power2.inOut" },
              onComplete: () => completeIntroAfterEffect({ focus: true }),
            })
            .addLabel("identity", 0)
            .to(
              identity,
              {
                autoAlpha: 1,
                scale: 1.22,
                duration: 1,
                ease: "expo.out",
              },
              "identity+=0.2",
            )
            .to(
              identity,
              {
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "power3.inOut",
              },
              "identity+=1.45",
            )
            .addLabel("powerUp", 2.35)
            .to(veil, { autoAlpha: 0, duration: 0.85 }, "powerUp")
            .to(
              roomImage,
              {
                filter: "brightness(0.2) saturate(0.42) contrast(1.12)",
                duration: 0.9,
              },
              "powerUp",
            )
            .to(
              projectsLight,
              {
                keyframes: [
                  { autoAlpha: 0.18, duration: 0.08 },
                  { autoAlpha: 0, duration: 0.07 },
                  { autoAlpha: 0.72, duration: 0.1 },
                  { autoAlpha: 0.28, duration: 0.08 },
                  { autoAlpha: 1, duration: 0.5, ease: "power2.out" },
                ],
              },
              2.85,
            )
            .to(
              explorationLight,
              {
                keyframes: [
                  { autoAlpha: 0.25, duration: 0.07 },
                  { autoAlpha: 0.05, duration: 0.08 },
                  { autoAlpha: 0.82, duration: 0.1 },
                  { autoAlpha: 0.38, duration: 0.08 },
                  { autoAlpha: 1, duration: 0.52, ease: "power2.out" },
                ],
              },
              3.45,
            )
            .to(
              labLight,
              {
                keyframes: [
                  { autoAlpha: 0.2, duration: 0.08 },
                  { autoAlpha: 0, duration: 0.06 },
                  { autoAlpha: 0.75, duration: 0.11 },
                  { autoAlpha: 0.32, duration: 0.08 },
                  { autoAlpha: 1, duration: 0.5, ease: "power2.out" },
                ],
              },
              4.05,
            )
            .to(sweep, { autoAlpha: 0.38, xPercent: 60, duration: 1.25 }, 4.1)
            .to(sweep, { autoAlpha: 0, duration: 0.55 }, 5)
            .to(
              [topbar, pathUi],
              { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 },
              4.8,
            )
            .to({}, { duration: 0.2 });
        }, root);
      })
      .catch(() => completeIntroAfterEffect({ focus: false }));

    return () => {
      cancelled = true;
      clearAnimation();
    };
  }, [copy.introStatus, copy.readyStatus, imageReady, run, transitionToArea]);

  function replayIntro() {
    clearAnimation();
    rootRef.current
      ?.querySelectorAll<HTMLElement>(`.${styles.focusStill}`)
      .forEach((still) => {
        still.getAnimations().forEach((animation) => animation.cancel());
        still.style.opacity = "0";
      });
    setIsIdle(false);
    setHoveredArea(null);
    setFocusedArea(null);
    setRun((value) => value + 1);
  }

  /* ── Escape key exits focused area ── */
  useEffect(() => {
    if (focusedArea === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.key !== "Escape") return;
      /* Don't close the room if an open <dialog> owns Escape. */
      const dialog = document.querySelector<HTMLDialogElement>("dialog[open]");
      if (dialog) return;
      transitionToArea(null);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [focusedArea, transitionToArea]);

  function focusArea(event: MouseEvent<HTMLAnchorElement>, area: RoomArea) {
    event.preventDefault();
    if (!isIdle || focusedArea !== null) return;
    transitionToArea(area);
  }

  function handleCategoryIconClick(categoryId: CategoryId) {
    if (!isIdle) return;
    setActiveCategoryId(categoryId);
    if (focusedArea === null) transitionToArea("exploration");
  }

  function handleCategoryIconHover(categoryId: CategoryId | null) {
    setHoveredCategoryId(categoryId);
  }

  const alternateLocale = locale === "en" ? "ar" : "en";

  return (
    <main
      ref={rootRef}
      className={styles.room}
      data-room-state="loading"
      data-active-area={activeArea ?? undefined}
      data-focused-area={focusedArea ?? undefined}
    >
      <div ref={frameRef} className={styles.roomFrame} aria-hidden="true">
        <div className={styles.sceneCamera}>
          <Image
            ref={roomImageRef}
            className={styles.roomImage}
            src="/engineering-room-balanced-final-v2.webp"
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            onLoad={() => setImageReady(true)}
            onError={() => {
              setImageReady(true);
              completeIntro({ focus: false });
            }}
          />
          <Image
            className={styles.focusedRoomImage}
            src="/engineering-room-balanced-final-v2.webp"
            alt=""
            fill
            unoptimized
            sizes="100vw"
          />
          {Object.entries(focusStills).map(([area, src]) => (
            <Image
              key={area}
              className={styles.focusStill}
              data-focus-still={area}
              src={src}
              alt=""
              fill
              priority
              unoptimized
              sizes="100vw"
            />
          ))}
          <div ref={introLightsRef} className={styles.introLights}>
            {roomAreas.map((area) => (
              <span key={area} data-intro-light={area} />
            ))}
          </div>
        </div>
      </div>
      <div ref={sweepRef} className={styles.lightSweep} aria-hidden="true" />
      <div ref={veilRef} className={styles.veil} aria-hidden="true" />

      <header ref={topbarRef} className={styles.topbar}>
        <p>{copy.eyebrow}</p>
        <Link
          href={`/${alternateLocale}`}
          hrefLang={alternateLocale}
          lang={alternateLocale}
          aria-label={copy.languageLabel}
        >
          {copy.language}
        </Link>
      </header>

      <section
        ref={controlsRef}
        className={styles.controls}
        aria-labelledby="room-heading"
      >
        <div ref={identityRef} className={styles.identity}>
          <h1>{copy.name}</h1>
          <p>{copy.role}</p>
        </div>

        <div ref={pathUiRef} className={styles.pathUi}>
          <div className={styles.roomHeading}>
            <p>{copy.instruction}</p>
            <h2 id="room-heading" ref={headingRef} tabIndex={-1}>
              {copy.readyStatus}
            </h2>
          </div>

          <nav className={styles.hotspots} aria-label={copy.instruction}>
            {roomAreas.map((area, index) => {
              const areaCopy = copy.areas[area];
              const areaDisabled =
                !isIdle || (focusedArea !== null && focusedArea !== area);
              return (
                <Link
                  key={area}
                  href={`/${locale}/${areaCopy.path}`}
                  className={styles.hotspot}
                  data-area={area}
                  aria-label={`${areaCopy.label}. ${areaCopy.description}`}
                  aria-current={focusedArea === area ? "true" : undefined}
                  aria-disabled={areaDisabled}
                  tabIndex={areaDisabled ? -1 : 0}
                  onMouseEnter={() => {
                    if (!areaDisabled) {
                      setHoveredArea(area);
                    }
                  }}
                  onMouseLeave={() => setHoveredArea(null)}
                  onFocus={() => {
                    if (!areaDisabled) {
                      setHoveredArea(area);
                    }
                  }}
                  onBlur={() => setHoveredArea(null)}
                  onClick={(event) => focusArea(event, area)}
                >
                  <span className={styles.hotspotMarker}>
                    <span className={styles.hotspotIndex}>0{index + 1}</span>
                    <span className={styles.hotspotCopy}>
                      <strong>{areaCopy.label}</strong>
                      <span>{areaCopy.description}</span>
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          {focusedArea && (
            <button
              className={styles.returnToRoom}
              type="button"
              onClick={() => transitionToArea(null)}
            >
              {copy.returnToRoom}
            </button>
          )}

          {focusedArea === "lab" && (
            <Link
              href={`/${locale}/learn?from=room`}
              className={styles.openComputer}
            >
              {copy.openComputer}
            </Link>
          )}

          <button
            className={styles.replay}
            type="button"
            onClick={replayIntro}
            disabled={!isIdle}
          >
            {copy.replay}
          </button>
        </div>
      </section>

      <CaseStudyPaperMap
        active={isIdle && focusedArea === "projects"}
        locale={locale}
        onOpen={setSelectedProject}
      />

      {isIdle && focusedArea === "exploration" && (
        <CenterShowcase
          locale={locale}
          copy={copy.showcase}
          activeCategoryId={activeCategoryId}
          onCategoryChange={handleCategoryIconClick}
          onCategoryHover={handleCategoryIconHover}
          onCategoryFocus={setFocusedCategoryId}
        />
      )}

      {/* Category icon 3D overlay — below showcase (z-index 5) */}
      <CategoryIconsLayer
        activeCategoryId={activeCategoryId}
        locale={locale}
        focusedArea={focusedArea}
        isIdle={isIdle}
        isIntro={!isIdle && !focusedArea}
        onCategoryClick={handleCategoryIconClick}
        onCategoryHover={handleCategoryIconHover}
        hoveredCategoryId={hoveredCategoryId}
        focusedCategoryId={focusedCategoryId}
        eventSourceRef={rootRef}
      />

      {selectedProject && (
        <CaseStudyModal
          locale={locale}
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <button
        className={styles.skip}
        type="button"
        onClick={() => completeIntro()}
      >
        {copy.skip}
      </button>

      {!imageReady && <p className={styles.loading}>{copy.loading}</p>}
      <noscript>
        <nav className={styles.noScriptNav} aria-label={copy.instruction}>
          {roomAreas.map((area) => (
            <a key={area} href={`/${locale}/${copy.areas[area].path}`}>
              {copy.areas[area].label}
            </a>
          ))}
        </nav>
      </noscript>

      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status}
      </p>
    </main>
  );
}
