import { describe, expect, it, vi } from "vitest";
import {
  getIntroEligibility,
  hasSeenIntro,
  INTRO_SEEN_KEY,
  markIntroSeen,
  persistIntroSeen,
  readIntroSeen,
} from "@/components/entry/entry-state";

describe("intro eligibility", () => {
  it.each([
    [
      {
        isEntryRoute: false,
        reducedMotion: false,
        replayRequested: false,
        seen: false,
      },
      "static",
    ],
    [
      {
        isEntryRoute: true,
        reducedMotion: true,
        replayRequested: true,
        seen: false,
      },
      "static",
    ],
    [
      {
        isEntryRoute: true,
        reducedMotion: false,
        replayRequested: false,
        seen: true,
      },
      "static",
    ],
    [
      {
        isEntryRoute: true,
        reducedMotion: false,
        replayRequested: true,
        seen: true,
      },
      "play",
    ],
    [
      {
        isEntryRoute: true,
        reducedMotion: false,
        replayRequested: false,
        seen: false,
      },
      "play",
    ],
  ] as const)("returns %s for %o", (input, expected) => {
    expect(getIntroEligibility(input)).toBe(expected);
  });

  it("reads and writes only the versioned seen key", () => {
    const storage = {
      getItem: vi.fn(() => "true"),
      setItem: vi.fn(),
    };

    expect(hasSeenIntro(storage)).toBe(true);
    markIntroSeen(storage);

    expect(storage.getItem).toHaveBeenCalledWith(INTRO_SEEN_KEY);
    expect(storage.setItem).toHaveBeenCalledWith(INTRO_SEEN_KEY, "true");
  });

  it("uses a safe static fallback when browser storage is unavailable", () => {
    const denied = new DOMException("Storage denied", "SecurityError");
    const storage = {
      getItem: vi.fn(() => {
        throw denied;
      }),
      setItem: vi.fn(() => {
        throw denied;
      }),
    };

    expect(readIntroSeen(storage)).toBe(false);
    expect(() => persistIntroSeen(storage)).not.toThrow();
  });
});
