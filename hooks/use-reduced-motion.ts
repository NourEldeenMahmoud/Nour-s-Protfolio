import { useEffect, useState } from "react";

/**
 * Shared hook for Reduced Motion accessibility preference.
 *
 * Behavior:
 * - Production: Respects OS `prefers-reduced-motion: reduce` preference (or manual override).
 * - Development: Defaults to `false` (full motion enabled for development), unless
 *   overridden manually via URL query `?reducedMotion=1` or `localStorage.setItem("portfolio-reduced-motion", "true")`.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;

    const isDevelopment = process.env.NODE_ENV === "development";
    const manualOverride =
      new URLSearchParams(window.location.search).get("reducedMotion") === "1" ||
      window.localStorage.getItem("portfolio-reduced-motion") === "true";

    if (isDevelopment && !manualOverride) {
      return false;
    }

    if (manualOverride) {
      return true;
    }

    return (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      const isDevelopment = process.env.NODE_ENV === "development";
      const manualOverride =
        new URLSearchParams(window.location.search).get("reducedMotion") === "1" ||
        window.localStorage.getItem("portfolio-reduced-motion") === "true";

      if (isDevelopment && !manualOverride) {
        setReduced(false);
        return;
      }

      if (manualOverride) {
        setReduced(true);
        return;
      }

      setReduced(query.matches);
    };

    update();

    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
