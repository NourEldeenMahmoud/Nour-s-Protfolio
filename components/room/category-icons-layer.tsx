"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Locale } from "@/i18n/routing";
import type { CategoryId } from "@/content/project-showcase";
import { categories } from "@/content/project-showcase";
import {
  CATEGORY_IDS,
  EXPLORE_ANCHORS,
  HERO_ANCHORS,
  sourceToViewport,
  type ViewportAnchor,
} from "./category-icon-projections";
import {
  CATEGORY_ICONS_DIAGNOSTICS_ENABLED,
  resolveCategoryIconsFallbackReason,
  resolveCategoryIconsMotionPolicy,
} from "./category-icons-policy";
import styles from "./category-icons-layer.module.css";

/* ── Capability detection ── */

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return !!context;
  } catch {
    return false;
  }
}

/* ── SVG fallback sprite paths ── */

const FALLBACK_SVG_PATHS: Record<CategoryId, string> = {
  web: "/models/showcase-icons/fallback/web.svg",
  "game-development": "/models/showcase-icons/fallback/game-development.svg",
  desktop: "/models/showcase-icons/fallback/desktop.svg",
  "mobile-applications":
    "/models/showcase-icons/fallback/mobile-applications.svg",
  summaries: "/models/showcase-icons/fallback/summaries.svg",
};

/* ── Lazy Canvas + Error Boundary ── */

const CategoryIconsCanvas = dynamic(
  () => import("./category-icons-canvas").then((m) => m.default),
  { ssr: false },
);

const CanvasErrorBoundary = dynamic(
  () => import("./category-icons-canvas").then((m) => m.CanvasErrorBoundary),
  { ssr: false },
);

/* ── Three-state capability ── */

type CapabilityState = "pending" | "canvas" | "fallback";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/* ── Props ── */

export type CategoryIconsLayerProps = {
  activeCategoryId: CategoryId;
  locale?: Locale;
  focusedArea: string | null;
  isIdle: boolean;
  isIntro: boolean;
  onCategoryClick?: (id: CategoryId) => void;
  onCategoryHover?: (id: CategoryId | null) => void;
  hoveredCategoryId?: CategoryId | null;
  focusedCategoryId?: CategoryId | null;
  eventSourceRef?: React.RefObject<HTMLElement | null>;
};

/**
 * Transparent overlay that renders five category-icon GLBs in 3D space,
 * aligned to the Blender hero/explore camera projections.
 *
 * Three-state capability: renders nothing while "pending",
 * then switches to "canvas" or "fallback" based on explicit checks.
 * Falls back to static SVGs only for mobile, save-data, WebGL-unavailable,
 * or real Canvas/GLB load failures. Reduced-motion still mounts the canvas
 * but disables all GSAP animations (static snap instead of tween).
 */
export function CategoryIconsLayer({
  activeCategoryId,
  locale = "en",
  focusedArea,
  isIdle,
  isIntro,
  onCategoryClick,
  onCategoryHover,
  hoveredCategoryId,
  focusedCategoryId,
  eventSourceRef,
}: CategoryIconsLayerProps) {
  const reducedMotion = useReducedMotion();
  const [capability, setCapability] = useState<CapabilityState>("pending");
  const [viewportSize, setViewportSize] = useState({ w: 0, h: 0 });
  const [compactIconScale, setCompactIconScale] = useState(1);
  const [motionPolicy, setMotionPolicy] = useState(() =>
    resolveCategoryIconsMotionPolicy(reducedMotion),
  );

  /* ── Viewport measurement ── */
  useEffect(() => {
    function measure() {
      setViewportSize({ w: window.innerWidth, h: window.innerHeight });
      const isPortraitPhone = window.matchMedia(
        "(hover: none) and (pointer: coarse) and (max-width: 600px) and (orientation: portrait)",
      ).matches;
      const isLandscapePhone = window.matchMedia(
        "(hover: none) and (pointer: coarse) and (orientation: landscape) and (max-height: 600px)",
      ).matches;
      setCompactIconScale(isPortraitPhone ? 0.62 : isLandscapePhone ? 0.72 : 1);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* ── Centralized capability and motion policy resolution after mount ── */
  useEffect(() => {
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const reason = resolveCategoryIconsFallbackReason({
      viewportWidth: window.innerWidth,
      saveData: connection?.saveData === true,
      webGLAvailable: hasWebGL(),
    });

    const resolved = resolveCategoryIconsMotionPolicy(reducedMotion);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time mount detection
    setMotionPolicy(resolved);

    if (CATEGORY_ICONS_DIAGNOSTICS_ENABLED) {
      console.info("[CategoryIcons] motion policy", {
        effectiveReducedMotion: resolved.effectiveReducedMotion,
        renderingMode: reason ? "SVG fallback" : "Canvas",
        fallbackReason: reason,
        animationMode: resolved.effectiveReducedMotion ? "static" : "full",
      });
    }

    setCapability(reason ? "fallback" : "canvas");
  }, [reducedMotion]);

  /* ── Compute viewport anchors for both states ── */
  const heroAnchors = useMemo(() => {
    if (!viewportSize.w || !viewportSize.h) return null;
    const result = {} as Record<CategoryId, ViewportAnchor>;
    for (const id of CATEGORY_IDS) {
      const anchor = sourceToViewport(
        HERO_ANCHORS[id],
        viewportSize.w,
        viewportSize.h,
      );
      result[id] = { ...anchor, ph: anchor.ph * compactIconScale };
    }
    return result;
  }, [compactIconScale, viewportSize]);

  const exploreAnchors = useMemo(() => {
    if (!viewportSize.w || !viewportSize.h) return null;
    const result = {} as Record<CategoryId, ViewportAnchor>;
    for (const id of CATEGORY_IDS) {
      const anchor = sourceToViewport(
        EXPLORE_ANCHORS[id],
        viewportSize.w,
        viewportSize.h,
      );
      result[id] = { ...anchor, ph: anchor.ph * compactIconScale };
    }
    return result;
  }, [compactIconScale, viewportSize]);

  /* ── Visibility ── */
  const isIconView = focusedArea === null || focusedArea === "exploration";
  const visible = !isIntro && isIdle;
  const opacity = visible ? 1 : 0;

  /* ── Focus target: 0 = hero, 1 = explore ── */
  const focusTarget: 0 | 1 = focusedArea === "exploration" ? 1 : 0;

  /* ── Canvas error → fallback ── */
  const handleCanvasError = useCallback((error: Error) => {
    setCapability("fallback");
    if (CATEGORY_ICONS_DIAGNOSTICS_ENABLED) {
      console.warn("[CategoryIcons] SVG fallback: canvas-failure", error);
    }
  }, []);

  const effectiveFallback = capability === "fallback";

  if (!heroAnchors || !exploreAnchors || !isIconView) return null;

  return (
    <div
      className={styles.layer}
      data-testid="category-icons-layer"
      style={{
        opacity,
        transition: "opacity 600ms ease",
      }}
    >
      {effectiveFallback ? (
        <div className={styles.fallbackContainer} aria-hidden="true">
          {CATEGORY_IDS.map((id) => {
            const anchor =
              focusedArea === "exploration"
                ? exploreAnchors[id]
                : heroAnchors[id];
            const size = anchor.ph;
            return (
              <div
                key={id}
                className={styles.fallbackIcon}
                style={{
                  left: `${anchor.px}px`,
                  top: `${anchor.pb - size}px`,
                  width: `${size}px`,
                  height: `${size}px`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- decorative fallback */}
                <img
                  src={FALLBACK_SVG_PATHS[id]}
                  alt=""
                  width={size}
                  height={size}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      ) : capability === "canvas" ? (
        <div className={styles.canvasContainer} aria-hidden="true">
          <CanvasErrorBoundary fallback={null} onError={handleCanvasError}>
            <CategoryIconsCanvas
              viewportWidth={viewportSize.w}
              viewportHeight={viewportSize.h}
              heroAnchors={heroAnchors}
              exploreAnchors={exploreAnchors}
              focusTarget={focusTarget}
              activeCategoryId={activeCategoryId}
              hoveredCategoryId={hoveredCategoryId}
              focusedCategoryId={focusedCategoryId}
              eventSourceRef={eventSourceRef}
              onCategoryClick={onCategoryClick}
              onCategoryHover={onCategoryHover}
              reducedMotion={motionPolicy.effectiveReducedMotion}
            />
          </CanvasErrorBoundary>
        </div>
      ) : null}

      {/* DOM hit targets for idle-room pointer interaction */}
      {isIdle && !focusedArea && heroAnchors && (
        <div className={styles.hitTargets}>
          {CATEGORY_IDS.map((id) => {
            const anchor = heroAnchors[id];
            const hitWidth = Math.max(44, anchor.ph * 1.35);
            const hitHeight = Math.max(44, anchor.ph * 1.25);
            return (
              <button
                key={id}
                type="button"
                className={styles.hitTarget}
                data-category-icon-control="true"
                aria-label={
                  categories.find((cat) => cat.id === id)!.label[locale]
                }
                style={{
                  left: `${anchor.px - hitWidth / 2}px`,
                  top: `${anchor.pb - hitHeight}px`,
                  width: `${hitWidth}px`,
                  height: `${hitHeight}px`,
                }}
                onClick={() => onCategoryClick?.(id)}
                onMouseEnter={() => onCategoryHover?.(id)}
                onMouseLeave={() => onCategoryHover?.(null)}
                onFocus={() => onCategoryHover?.(id)}
                onBlur={() => onCategoryHover?.(null)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
