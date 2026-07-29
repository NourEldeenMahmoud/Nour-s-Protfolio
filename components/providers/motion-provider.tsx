"use client";

import {
  createContext,
  useLayoutEffect,
  useState,
} from "react";

export const MotionContext = createContext(false);

export function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const isDevelopment =
      process.env.NODE_ENV === "development";

    const params = new URLSearchParams(
      window.location.search,
    );

    const manualOverride =
      params.get("reducedMotion") === "1" ||
      window.localStorage.getItem(
        "portfolio-reduced-motion",
      ) === "true";

    if (isDevelopment) {
      const reduced = manualOverride;

      root.dataset.motion = reduced
        ? "reduced"
        : "full";

      // eslint-disable-next-line react-hooks/set-state-in-effect -- post-hydration DOM→state sync
      setReducedMotion(reduced);

      if (process.env.NODE_ENV === "development") {
        console.log(
          `[Motion] mode: ${reduced ? "reduced" : "full"}`,
        );
      }

      return;
    }

    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const resolve = () => {
      const reduced =
        manualOverride || mediaQuery.matches;

      root.dataset.motion = reduced
        ? "reduced"
        : "full";

      setReducedMotion(reduced);
    };

    resolve();

    mediaQuery.addEventListener("change", resolve);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        resolve,
      );
    };
  }, []);

  return (
    <MotionContext.Provider value={reducedMotion}>
      {children}
    </MotionContext.Provider>
  );
}
