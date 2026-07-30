"use client";

import {
  createContext,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export const MotionContext = createContext(false);

export type MotionPreference = "system" | "full" | "reduced";

type MotionPreferenceState = {
  preference: MotionPreference;
  setPreference: (preference: MotionPreference) => void;
};

export const MotionPreferenceContext =
  createContext<MotionPreferenceState | null>(null);

const motionPreferenceKey = "portfolio-motion-preference";
const legacyReducedMotionKey = "portfolio-reduced-motion";

function isMotionPreference(value: string | null): value is MotionPreference {
  return value === "system" || value === "full" || value === "reduced";
}

function readMotionPreference(): MotionPreference {
  try {
    const storedPreference = window.localStorage.getItem(motionPreferenceKey);
    if (isMotionPreference(storedPreference)) return storedPreference;
    if (window.localStorage.getItem(legacyReducedMotionKey) === "true") {
      return "reduced";
    }
  } catch (error) {
    if (!(error instanceof DOMException)) throw error;
  }

  return "system";
}

function storeMotionPreference(preference: MotionPreference) {
  try {
    if (preference === "system") {
      window.localStorage.removeItem(motionPreferenceKey);
    } else {
      window.localStorage.setItem(motionPreferenceKey, preference);
    }
    window.localStorage.removeItem(legacyReducedMotionKey);
  } catch (error) {
    if (!(error instanceof DOMException)) throw error;
  }
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [preference, setPreferenceState] = useState<MotionPreference>("system");
  const mediaQueryRef = useRef<MediaQueryList | null>(null);
  const forcedReducedRef = useRef(false);
  const preferenceRef = useRef<MotionPreference>("system");
  const isDevelopment = process.env.NODE_ENV === "development";

  const resolvePreference = useCallback(
    (nextPreference: MotionPreference) => {
      const systemReduced =
        !isDevelopment && (mediaQueryRef.current?.matches ?? false);
      const reduced =
        forcedReducedRef.current ||
        nextPreference === "reduced" ||
        (nextPreference === "system" && systemReduced);

      document.documentElement.dataset.motion = reduced ? "reduced" : "full";
      preferenceRef.current = nextPreference;
      setPreferenceState(nextPreference);
      setReducedMotion(reduced);
    },
    [isDevelopment],
  );

  const setPreference = useCallback(
    (nextPreference: MotionPreference) => {
      storeMotionPreference(nextPreference);
      resolvePreference(nextPreference);
    },
    [resolvePreference],
  );

  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    forcedReducedRef.current = params.get("reducedMotion") === "1";

    const initialPreference = readMotionPreference();

    if (!isDevelopment) {
      mediaQueryRef.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- post-hydration DOM→state sync
    resolvePreference(initialPreference);

    if (isDevelopment) {
      console.log(
        `[Motion] preference: ${initialPreference}; mode: ${forcedReducedRef.current || initialPreference === "reduced" ? "reduced" : "full"}`,
      );
      return;
    }

    const mediaQuery = mediaQueryRef.current;
    if (!mediaQuery) return;
    const handleSystemPreferenceChange = () => {
      resolvePreference(preferenceRef.current);
    };

    mediaQuery.addEventListener("change", handleSystemPreferenceChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemPreferenceChange);
    };
  }, [isDevelopment, resolvePreference]);

  return (
    <MotionPreferenceContext.Provider value={{ preference, setPreference }}>
      <MotionContext.Provider value={reducedMotion}>
        {children}
      </MotionContext.Provider>
    </MotionPreferenceContext.Provider>
  );
}
