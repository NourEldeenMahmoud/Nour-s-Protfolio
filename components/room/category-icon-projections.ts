/**
 * Pure projection helpers for mapping Blender source-normalized anchor
 * coordinates into viewport pixel positions under centered object-fit:cover.
 *
 * Anchors use BOTTOM-based Y (by) instead of center-based Y (cy).
 * The model base sits directly above the physical pedestal when scaled.
 *
 * Source renders: 4200×2700, aspect 1.5555555556.
 * All cx/by/h values are normalized (0–1) in source-image space.
 */

import type { CategoryId } from "@/content/project-showcase";

export const SOURCE_WIDTH = 4200;
export const SOURCE_HEIGHT = 2700;
export const SOURCE_ASPECT = SOURCE_WIDTH / SOURCE_HEIGHT; // 1.5555…

/** Normalized anchor in source-image space (bottom-based Y). */
export interface Anchor {
  cx: number;
  by: number;
  h: number;
}

/** Pixel-space anchor in the viewport (bottom-based Y). */
export interface ViewportAnchor {
  px: number;
  pb: number;
  ph: number;
}

/** Authoritative bottom/height anchors measured from Blender hero renders. */
export const HERO_ANCHORS: Record<CategoryId, Anchor> = {
  web: { cx: 0.385349, by: 0.551371, h: 0.046734 },
  "game-development": { cx: 0.442644, by: 0.544987, h: 0.033884 },
  desktop: { cx: 0.5, by: 0.549245, h: 0.042451 },
  "mobile-applications": { cx: 0.557356, by: 0.552542, h: 0.049089 },
  summaries: { cx: 0.61447, by: 0.547117, h: 0.038168 },
};

/** Authoritative bottom/height anchors from Blender Explore GLB focus render. */
export const EXPLORE_ANCHORS: Record<CategoryId, Anchor> = {
  web: { cx: 0.309199, by: 0.6452, h: 0.080861 },
  "game-development": { cx: 0.4046, by: 0.6452, h: 0.05811 },
  desktop: { cx: 0.5, by: 0.6452, h: 0.073282 },
  "mobile-applications": { cx: 0.5954, by: 0.6452, h: 0.084937 },
  summaries: { cx: 0.690801, by: 0.6452, h: 0.065694 },
};

/** Ordered list of all category IDs (matches tab order). */
export const CATEGORY_IDS: CategoryId[] = [
  "web",
  "game-development",
  "desktop",
  "mobile-applications",
  "summaries",
];

/**
 * Convert a CSS screen Y coordinate (0 = top) into a Three.js Y-up world
 * coordinate for the orthographic camera (top = viewportHeight, bottom = 0).
 * This inverts the CSS screen-space Y axis so geometry renders upright.
 */
export function screenYToWorldY(screenY: number, viewportHeight: number): number {
  return viewportHeight - screenY;
}

/**
 * Convert a source-normalized bottom-based anchor into viewport pixel
 * coordinates under centered object-fit:cover layout.
 *
 * Returns pb (bottom pixel Y) and ph (projected height).
 * The model base sits at pb; the model top is at pb - ph.
 */
export function sourceToViewport(
  anchor: Anchor,
  vpW: number,
  vpH: number,
): ViewportAnchor {
  const scale = Math.max(vpW / SOURCE_WIDTH, vpH / SOURCE_HEIGHT);
  const offsetX = (vpW - SOURCE_WIDTH * scale) / 2;
  const offsetY = (vpH - SOURCE_HEIGHT * scale) / 2;

  return {
    px: offsetX + anchor.cx * SOURCE_WIDTH * scale,
    pb: offsetY + anchor.by * SOURCE_HEIGHT * scale,
    ph: anchor.h * SOURCE_HEIGHT * scale,
  };
}
