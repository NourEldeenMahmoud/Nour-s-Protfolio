export type CategoryIconsFallbackReason =
  "mobile-width" | "save-data" | "webgl-unavailable" | "canvas-failure";

export type CategoryIconsMotionPolicy = {
  detectedReducedMotion: boolean;
  developmentOverrideEnabled: boolean;
  effectiveReducedMotion: boolean;
};

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const FORCE_FULL_MOTION_IN_DEV =
  process.env.NEXT_PUBLIC_FORCE_FULL_MOTION_IN_DEV === "true";

export const CATEGORY_ICONS_DIAGNOSTICS_ENABLED = IS_DEVELOPMENT;
export const CATEGORY_ICONS_DPR: [number, number] = [1, 2];
export const CATEGORY_ICONS_POWER_PREFERENCE: WebGLPowerPreference =
  IS_DEVELOPMENT ? "high-performance" : "default";

export function resolveCategoryIconsMotionPolicy(
  detectedReducedMotion: boolean,
): CategoryIconsMotionPolicy {
  const developmentOverrideEnabled = IS_DEVELOPMENT && FORCE_FULL_MOTION_IN_DEV;

  return {
    detectedReducedMotion,
    developmentOverrideEnabled,
    effectiveReducedMotion:
      detectedReducedMotion && !developmentOverrideEnabled,
  };
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
