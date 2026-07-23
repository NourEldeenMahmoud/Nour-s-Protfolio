export const INTRO_SEEN_KEY = "portfolio.intro.seen.v3";
export const LONG_VISIBILITY_INTERRUPTION_MS = 30_000;

export type IntroEligibilityInput = {
  isEntryRoute: boolean;
  reducedMotion: boolean;
  replayRequested: boolean;
  seen: boolean;
};

export type IntroEligibility = "play" | "static";

export function getIntroEligibility({
  isEntryRoute,
  reducedMotion,
  replayRequested,
  seen,
}: IntroEligibilityInput): IntroEligibility {
  if (!isEntryRoute || reducedMotion) return "static";
  if (replayRequested) return "play";
  return seen ? "static" : "play";
}

export function hasSeenIntro(storage: Pick<Storage, "getItem">): boolean {
  return storage.getItem(INTRO_SEEN_KEY) === "true";
}

export function markIntroSeen(storage: Pick<Storage, "setItem">): void {
  storage.setItem(INTRO_SEEN_KEY, "true");
}

function isStorageUnavailable(error: unknown): boolean {
  return (
    error instanceof DOMException &&
    (error.name === "SecurityError" || error.name === "QuotaExceededError")
  );
}

export function readIntroSeen(storage: Pick<Storage, "getItem">): boolean {
  try {
    return hasSeenIntro(storage);
  } catch (error) {
    if (isStorageUnavailable(error)) return false;
    throw error;
  }
}

export function persistIntroSeen(storage: Pick<Storage, "setItem">): void {
  try {
    markIntroSeen(storage);
  } catch (error) {
    if (!isStorageUnavailable(error)) throw error;
  }
}
