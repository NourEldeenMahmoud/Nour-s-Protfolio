import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

describe("useReducedMotion hook", () => {
  const originalEnv = process.env.NODE_ENV;

  function setEnv(val: string) {
    (process.env as Record<string, string>).NODE_ENV = val;
  }

  beforeEach(() => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
    window.localStorage.clear();
    window.history.replaceState({}, "", "/");
  });

  afterEach(() => {
    setEnv(originalEnv);
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    window.localStorage.clear();
  });

  it("development mode ignores OS Reduced Motion preference by default (returns false)", () => {
    setEnv("development");

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("development mode enables Reduced Motion when URL override ?reducedMotion=1 is present", () => {
    setEnv("development");
    window.history.replaceState({}, "", "/?reducedMotion=1");

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("development mode enables Reduced Motion when localStorage portfolio-reduced-motion is true", () => {
    setEnv("development");
    window.localStorage.setItem("portfolio-reduced-motion", "true");

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("production mode respects OS prefers-reduced-motion: reduce matchMedia setting", () => {
    setEnv("production");

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("production mode returns false when OS prefers-reduced-motion is false", () => {
    setEnv("production");
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });
});
