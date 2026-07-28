export type CategoryIconsFallbackReason =
  | "mobile-width"
  | "save-data"
  | "webgl-unavailable"
  | "canvas-failure";

export type CategoryIconsMotionPolicy = {
  effectiveReducedMotion: boolean;
};

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export const CATEGORY_ICONS_DIAGNOSTICS_ENABLED = IS_DEVELOPMENT;
export const CATEGORY_ICONS_DPR: [number, number] = [1, 2];
export const CATEGORY_ICONS_POWER_PREFERENCE: WebGLPowerPreference =
  IS_DEVELOPMENT ? "high-performance" : "default";

export function resolveCategoryIconsMotionPolicy(
  effectiveReducedMotion: boolean,
): CategoryIconsMotionPolicy {
  return { effectiveReducedMotion };
}

export function resolveCategoryIconsFallbackReason({
  viewportWidth,
  saveData,
  webGLAvailable,
}: {
  viewportWidth: number;
  saveData: boolean;
  webGLAvailable: boolean;
}): CategoryIconsFallbackReason | null {
  if (viewportWidth < 780) return "mobile-width";
  if (saveData) return "save-data";
  if (!webGLAvailable) return "webgl-unavailable";
  return null;
}
