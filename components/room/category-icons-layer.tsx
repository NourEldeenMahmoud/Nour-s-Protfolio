"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CategoryId } from "@/content/project-showcase";
import {
  CATEGORY_IDS,
  EXPLORE_ANCHORS,
  HERO_ANCHORS,
  sourceToViewport,
  type ViewportAnchor,
} from "./category-icon-projections";
import styles from "./category-icons-layer.module.css";

/* ── Capability detection ── */

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function shouldUseFallback(): boolean {
  if (typeof window === "undefined") return false; // don't decide on server
  // prefers-reduced-motion does NOT select SVG fallback — canvas renders static
  if (window.innerWidth < 780) return true;
  const conn = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  if (conn?.saveData) return true;
  if (!hasWebGL()) return true;
  return false;
}

function detectReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ── SVG fallback sprite paths ── */

const FALLBACK_SVG_PATHS: Record<CategoryId, string> = {
  web: "/models/showcase-icons/fallback/web.svg",
  "game-development": "/models/showcase-icons/fallback/game-development.svg",
  desktop: "/models/showcase-icons/fallback/desktop.svg",
  "mobile-applications":
    "/models/showcase-icons/fallback/mobile-applications.svg",
  bots: "/models/showcase-icons/fallback/bots.svg",
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

/* ── Props ── */

export type CategoryIconsLayerProps = {
  activeCategoryId: CategoryId;
  focusedArea: string | null;
  isIdle: boolean;
  isIntro: boolean;
  onCategoryClick?: (id: CategoryId) => void;
  onCategoryHover?: (id: CategoryId | null) => void;
  hoveredCategoryId?: CategoryId | null;
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
  focusedArea,
  isIdle,
  isIntro,
  onCategoryClick,
  onCategoryHover,
  hoveredCategoryId,
}: CategoryIconsLayerProps) {
  const [capability, setCapability] = useState<CapabilityState>("pending");
  const [canvasFailed, setCanvasFailed] = useState(false);
  const [viewportSize, setViewportSize] = useState({ w: 0, h: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  /* ── Viewport measurement ── */
  useEffect(() => {
    function measure() {
      setViewportSize({ w: window.innerWidth, h: window.innerHeight });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* ── One-time capability decision + reduced-motion detection after mount ── */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time mount detection
    setCapability(shouldUseFallback() ? "fallback" : "canvas");
    setReducedMotion(detectReducedMotion());
  }, []);

  /* ── Compute viewport anchors for both states ── */
  const heroAnchors = useMemo(() => {
    if (!viewportSize.w || !viewportSize.h) return null;
    const result = {} as Record<CategoryId, ViewportAnchor>;
    for (const id of CATEGORY_IDS) {
      result[id] = sourceToViewport(
        HERO_ANCHORS[id],
        viewportSize.w,
        viewportSize.h,
      );
    }
    return result;
  }, [viewportSize]);

  const exploreAnchors = useMemo(() => {
    if (!viewportSize.w || !viewportSize.h) return null;
    const result = {} as Record<CategoryId, ViewportAnchor>;
    for (const id of CATEGORY_IDS) {
      result[id] = sourceToViewport(
        EXPLORE_ANCHORS[id],
        viewportSize.w,
        viewportSize.h,
      );
    }
    return result;
  }, [viewportSize]);

  /* ── Visibility ── */
  const visible = !isIntro && (isIdle || focusedArea === "exploration");
  const opacity = visible ? 1 : 0;

  /* ── Focus target: 0 = hero, 1 = explore ── */
  const focusTarget: 0 | 1 = focusedArea === "exploration" ? 1 : 0;

  /* ── Canvas error → fallback ── */
  const handleCanvasError = useCallback(() => {
    setCanvasFailed(true);
  }, []);

  const effectiveFallback =
    capability === "fallback" || (capability === "canvas" && canvasFailed);

  /* ── Canvas error boundary fallback content ── */
  const canvasFallback = useMemo(
    () => <CanvasFallbackContent onCanvasError={handleCanvasError} />,
    [handleCanvasError],
  );

  if (!heroAnchors || !exploreAnchors) return null;

  return (
    <div
      className={styles.layer}
      aria-hidden="true"
      style={{
        opacity,
        transition: "opacity 600ms ease",
      }}
    >
      {effectiveFallback ? (
        <div className={styles.fallbackContainer}>
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
        <div className={styles.canvasContainer}>
          <CanvasErrorBoundary fallback={canvasFallback}>
            <CategoryIconsCanvas
              viewportWidth={viewportSize.w}
              viewportHeight={viewportSize.h}
              heroAnchors={heroAnchors}
              exploreAnchors={exploreAnchors}
              focusTarget={focusTarget}
              activeCategoryId={activeCategoryId}
              hoveredCategoryId={hoveredCategoryId}
              reducedMotion={reducedMotion}
            />
          </CanvasErrorBoundary>
        </div>
      ) : null}

      {/* DOM hit targets for idle-room pointer interaction */}
      {isIdle && !focusedArea && heroAnchors && (
        <div className={styles.hitTargets}>
          {CATEGORY_IDS.map((id) => {
            const anchor = heroAnchors[id];
            return (
              <button
                key={id}
                type="button"
                className={styles.hitTarget}
                aria-hidden="true"
                tabIndex={-1}
                style={{
                  left: `${anchor.px}px`,
                  top: `${anchor.pb - anchor.ph}px`,
                  width: `${anchor.ph}px`,
                  height: `${anchor.ph}px`,
                }}
                onClick={() => onCategoryClick?.(id)}
                onMouseEnter={() => onCategoryHover?.(id)}
                onMouseLeave={() => onCategoryHover?.(null)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Fallback content rendered when error boundary catches ── */

function CanvasFallbackContent({
  onCanvasError,
}: {
  onCanvasError: () => void;
}) {
  useEffect(() => {
    onCanvasError();
  }, [onCanvasError]);
  return null;
}
