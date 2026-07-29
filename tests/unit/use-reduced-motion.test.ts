import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  MotionContext,
  MotionProvider,
} from "@/components/providers/motion-provider";

/* ── useReducedMotion hook ── */

describe("useReducedMotion hook", () => {
  it("returns the boolean provided by MotionContext", () => {
    const { result } = renderHook(() => useReducedMotion(), {
      wrapper: ({ children }) =>
        createElement(MotionContext.Provider, { value: true }, children),
    });
    expect(result.current).toBe(true);
  });

  it("returns false when context value is false", () => {
    const { result } = renderHook(() => useReducedMotion(), {
      wrapper: ({ children }) =>
        createElement(MotionContext.Provider, { value: false }, children),
    });
    expect(result.current).toBe(false);
  });

  it("does not read window, matchMedia, localStorage, or URL params", () => {
    const getItemSpy = vi.spyOn(Storage.prototype, "getItem");

    renderHook(() => useReducedMotion(), {
      wrapper: ({ children }) =>
        createElement(MotionContext.Provider, { value: false }, children),
    });

    expect(getItemSpy).not.toHaveBeenCalledWith("portfolio-reduced-motion");
    getItemSpy.mockRestore();
  });
});

/* ── MotionProvider hydration safety ── */

describe("MotionProvider hydration safety", () => {
  const originalEnv = process.env.NODE_ENV;

  function setEnv(val: string) {
    (process.env as Record<string, string>).NODE_ENV = val;
  }

  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState({}, "", "/");
    delete document.documentElement.dataset.motion;
  });

  afterEach(() => {
    setEnv(originalEnv);
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    window.localStorage.clear();
    delete document.documentElement.dataset.motion;
  });

  it("resolves to true in production when matchMedia prefers reduced", async () => {
    setEnv("production");
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
    document.documentElement.dataset.motion = "full";

    const { result } = renderHook(() => useReducedMotion(), {
      wrapper: MotionProvider,
    });

    expect(result.current).toBe(true);
    expect(document.documentElement.dataset.motion).toBe("reduced");
  });

  it("resolves to false in production when matchMedia does not prefer reduced", async () => {
    setEnv("production");
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
    document.documentElement.dataset.motion = "full";

    const { result } = renderHook(() => useReducedMotion(), {
      wrapper: MotionProvider,
    });

    expect(result.current).toBe(false);
    expect(document.documentElement.dataset.motion).toBe("full");
  });

  it("stays false in development without manual override", async () => {
    setEnv("development");
    document.documentElement.dataset.motion = "full";

    const { result } = renderHook(() => useReducedMotion(), {
      wrapper: MotionProvider,
    });

    expect(result.current).toBe(false);
    expect(document.documentElement.dataset.motion).toBe("full");
  });

  it("ignores OS prefers-reduced-motion in development", async () => {
    setEnv("development");
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation(() => ({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
    document.documentElement.dataset.motion = "full";

    const { result } = renderHook(() => useReducedMotion(), {
      wrapper: MotionProvider,
    });

    expect(result.current).toBe(false);
    expect(document.documentElement.dataset.motion).toBe("full");
  });

  it("activates reduced motion via URL override in development", async () => {
    setEnv("development");
    window.history.replaceState({}, "", "/?reducedMotion=1");
    document.documentElement.dataset.motion = "full";

    const { result } = renderHook(() => useReducedMotion(), {
      wrapper: MotionProvider,
    });

    expect(result.current).toBe(true);
    expect(document.documentElement.dataset.motion).toBe("reduced");
  });

  it("activates reduced motion via localStorage override in development", async () => {
    setEnv("development");
    window.localStorage.setItem("portfolio-reduced-motion", "true");
    document.documentElement.dataset.motion = "full";

    const { result } = renderHook(() => useReducedMotion(), {
      wrapper: MotionProvider,
    });

    expect(result.current).toBe(true);
    expect(document.documentElement.dataset.motion).toBe("reduced");
  });

  it("activates reduced motion via URL override in production", async () => {
    setEnv("production");
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
    window.history.replaceState({}, "", "/?reducedMotion=1");
    document.documentElement.dataset.motion = "full";

    const { result } = renderHook(() => useReducedMotion(), {
      wrapper: MotionProvider,
    });

    expect(result.current).toBe(true);
    expect(document.documentElement.dataset.motion).toBe("reduced");
  });

  it("activates reduced motion via localStorage override in production", async () => {
    setEnv("production");
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
    window.localStorage.setItem("portfolio-reduced-motion", "true");
    document.documentElement.dataset.motion = "full";

    const { result } = renderHook(() => useReducedMotion(), {
      wrapper: MotionProvider,
    });

    expect(result.current).toBe(true);
    expect(document.documentElement.dataset.motion).toBe("reduced");
  });

  it("subscribes to matchMedia changes in production", async () => {
    setEnv("production");
    document.documentElement.dataset.motion = "full";
    const changeListeners: Array<() => void> = [];
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: vi.fn().mockImplementation((_event, cb) => {
          changeListeners.push(cb as () => void);
        }),
        removeEventListener: vi.fn(),
      })),
    );

    renderHook(() => useReducedMotion(), {
      wrapper: MotionProvider,
    });

    expect(changeListeners).toHaveLength(1);
    vi.unstubAllGlobals();
  });

  it("does not subscribe to matchMedia in development", async () => {
    setEnv("development");
    document.documentElement.dataset.motion = "full";
    const addEventCalls: string[] = [];
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: vi.fn().mockImplementation((event) => {
          addEventCalls.push(event);
        }),
        removeEventListener: vi.fn(),
      })),
    );

    renderHook(() => useReducedMotion(), {
      wrapper: MotionProvider,
    });

    expect(addEventCalls).toHaveLength(0);
    vi.unstubAllGlobals();
  });
});

/* ── CSS audit ── */

describe("CSS audit", () => {
  it("motion.css uses data-motion selector, not @media prefers-reduced-motion", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const motionCss = fs.readFileSync(
      path.resolve("styles/motion.css"),
      "utf-8",
    );

    expect(motionCss).toContain('html[data-motion="reduced"]');
    expect(motionCss).not.toContain("@media");
    expect(motionCss).not.toContain("prefers-reduced-motion");
  });
});

/* ── Hydration safety (static analysis) ── */

describe("Hydration safety", () => {
  it('layout.tsx renders data-motion="full" with suppressHydrationWarning', async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const layout = fs.readFileSync(
      path.resolve("app/[locale]/layout.tsx"),
      "utf-8",
    );

    expect(layout).toContain('data-motion="full"');
    expect(layout).toContain("suppressHydrationWarning");
  });

  it("layout.tsx omits blocking script in development", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const layout = fs.readFileSync(
      path.resolve("app/[locale]/layout.tsx"),
      "utf-8",
    );

    expect(layout).toContain(
      'const isProduction = process.env.NODE_ENV === "production"',
    );
    expect(layout).toContain("{isProduction && (");
  });

  it("production script uses safe variable scope", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const layout = fs.readFileSync(
      path.resolve("app/[locale]/layout.tsx"),
      "utf-8",
    );

    expect(layout).toMatch(/var root=document\.documentElement;try\{/);
  });

  it("MotionProvider initializes with useState(false), not DOM read", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const provider = fs.readFileSync(
      path.resolve("components/providers/motion-provider.tsx"),
      "utf-8",
    );

    expect(provider).toContain("useState(false)");
    expect(provider).not.toMatch(/useState\(\(\)\s*=>\s*\{[^}]*document/);
  });

  it("MotionProvider uses useLayoutEffect for post-hydration sync", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const provider = fs.readFileSync(
      path.resolve("components/providers/motion-provider.tsx"),
      "utf-8",
    );

    expect(provider).toContain("useLayoutEffect");
  });
});

/* ── Component isolation ── */

describe("Component isolation", () => {
  it("no component source file directly reads prefers-reduced-motion", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");

    const componentFiles = [
      "components/room/room-experience.tsx",
      "components/room/center-showcase.tsx",
      "components/room/project-media-player.tsx",
      "components/room/category-icons-layer.tsx",
      "components/projects/project-experience.tsx",
      "components/case-studies/case-study-experience.tsx",
      "components/paths/learn/learn-widgets.tsx",
      "components/paths/learn/widget-featured.tsx",
    ];

    for (const file of componentFiles) {
      const content = fs.readFileSync(path.resolve(file), "utf-8");
      if (content.includes("useReducedMotion")) {
        expect(content).not.toContain("matchMedia.*prefers-reduced-motion");
      }
    }
  });

  it("useReducedMotion hook source has no matchMedia or localStorage", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const hook = fs.readFileSync(
      path.resolve("hooks/use-reduced-motion.ts"),
      "utf-8",
    );

    expect(hook).not.toContain("matchMedia");
    expect(hook).not.toContain("localStorage");
    expect(hook).not.toContain("URLSearchParams");
    expect(hook).not.toContain("window");
  });
});
