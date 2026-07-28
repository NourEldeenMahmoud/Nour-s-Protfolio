import { render, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CategoryIconsLayer } from "@/components/room/category-icons-layer";
import { MotionProvider } from "@/components/providers/motion-provider";

/* ── Mocks ── */

// Mock next/dynamic to render children synchronously in tests
vi.mock("next/dynamic", () => ({
  default: () => {
    // Return a stub component that renders nothing (avoids R3F in jsdom)
    return function DynamicStub({ children }: { children?: React.ReactNode }) {
      return children ?? <div data-testid="dynamic-canvas-stub" />;
    };
  },
}));

// Mock matchMedia for capability detection
function setupMatchMedia(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)" ? matches : false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

describe("CategoryIconsLayer", () => {
  beforeEach(() => {
    setupMatchMedia(false);
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1920,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1080,
    });
    // Mock WebGL
    HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
      getExtension: vi.fn(),
    })) as unknown as typeof HTMLCanvasElement.prototype.getContext;
  });

  afterEach(() => {
    delete document.documentElement.dataset.motion;
    vi.restoreAllMocks();
  });

  it("renders nothing when viewport size is not yet measured (width=0)", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 0,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 0,
    });

    const { container } = render(
      <CategoryIconsLayer
        activeCategoryId="web"
        focusedArea={null}
        isIdle={false}
        isIntro={true}
      />,
    );

    expect(
      container.querySelector("[data-testid='category-icons-layer']"),
    ).not.toBeInTheDocument();
  });

  it("does not render the layer when viewport is zero-sized (SSR-like)", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 0,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 0,
    });

    const { container } = render(
      <CategoryIconsLayer
        activeCategoryId="web"
        focusedArea={null}
        isIdle={true}
        isIntro={false}
      />,
    );

    // Zero viewport → no anchors computed → no layer
    expect(
      container.querySelector("[data-testid='category-icons-layer']"),
    ).not.toBeInTheDocument();
  });

  it("renders an accessible layer while keeping the Canvas decorative", async () => {
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1080,
    });

    await act(async () => {
      render(
        <CategoryIconsLayer
          activeCategoryId="web"
          focusedArea={null}
          isIdle={true}
          isIntro={false}
        />,
      );
    });

    const layer = document.querySelector(
      "[data-testid='category-icons-layer']",
    );
    expect(layer).toBeInTheDocument();
    expect(layer).not.toHaveAttribute("aria-hidden");
    expect(layer?.querySelector("[aria-hidden='true']")).toBeInTheDocument();
  });

  it("enters canvas mode on capable desktop without SVG flash", async () => {
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1080,
    });

    await act(async () => {
      render(
        <CategoryIconsLayer
          activeCategoryId="web"
          focusedArea={null}
          isIdle={true}
          isIntro={false}
        />,
      );
    });

    // Should NOT have fallback images
    const imgs = document.querySelectorAll("img[loading='lazy']");
    expect(imgs.length).toBe(0);
  });

  it("enters canvas mode (not SVG) when prefers-reduced-motion is active", async () => {
    document.documentElement.dataset.motion = "reduced";
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1080,
    });

    await act(async () => {
      render(
        <MotionProvider>
          <CategoryIconsLayer
            activeCategoryId="web"
            focusedArea={null}
            isIdle={true}
            isIntro={false}
          />
        </MotionProvider>,
      );
    });

    // Canvas mode — no SVG fallback images
    const imgs = document.querySelectorAll("img[loading='lazy']");
    expect(imgs.length).toBe(0);
    const layer = document.querySelector(
      "[data-testid='category-icons-layer']",
    );
    expect(layer).toBeInTheDocument();
  });

  it("uses static SVG fallback on narrow viewport (< 780px)", async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 800,
    });

    await act(async () => {
      render(
        <CategoryIconsLayer
          activeCategoryId="web"
          focusedArea={null}
          isIdle={true}
          isIntro={false}
        />,
      );
    });

    const imgs = document.querySelectorAll("img[loading='lazy']");
    expect(imgs.length).toBe(5);
  });

  it("uses static SVG fallback when WebGL is unavailable", async () => {
    HTMLCanvasElement.prototype.getContext = vi.fn(
      () => null,
    ) as unknown as typeof HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1080,
    });

    await act(async () => {
      render(
        <CategoryIconsLayer
          activeCategoryId="web"
          focusedArea={null}
          isIdle={true}
          isIntro={false}
        />,
      );
    });

    const imgs = document.querySelectorAll("img[loading='lazy']");
    expect(imgs.length).toBe(5);
  });

  it("allows undefined deviceMemory (does not treat it as failure)", async () => {
    // navigator.connection is undefined — should still enter canvas mode
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1080,
    });

    await act(async () => {
      render(
        <CategoryIconsLayer
          activeCategoryId="web"
          focusedArea={null}
          isIdle={true}
          isIntro={false}
        />,
      );
    });

    const imgs = document.querySelectorAll("img[loading='lazy']");
    expect(imgs.length).toBe(0);
  });

  it("has opacity 0 when in intro state", async () => {
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1080,
    });

    const { container } = await act(async () => {
      return render(
        <CategoryIconsLayer
          activeCategoryId="web"
          focusedArea={null}
          isIdle={false}
          isIntro={true}
        />,
      );
    });

    const layer = container.querySelector(
      "[data-testid='category-icons-layer']",
    );
    expect(layer).toHaveStyle({ opacity: "0" });
  });

  it("has opacity 1 when idle", async () => {
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1080,
    });

    const { container } = await act(async () => {
      return render(
        <CategoryIconsLayer
          activeCategoryId="web"
          focusedArea={null}
          isIdle={true}
          isIntro={false}
        />,
      );
    });

    const layer = container.querySelector(
      "[data-testid='category-icons-layer']",
    );
    expect(layer).toHaveStyle({ opacity: "1" });
  });

  it("renders DOM hit targets in idle mode when no area is focused", async () => {
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1080,
    });

    await act(async () => {
      render(
        <CategoryIconsLayer
          activeCategoryId="web"
          focusedArea={null}
          isIdle={true}
          isIntro={false}
        />,
      );
    });

    const hitTargets = document.querySelectorAll("button[class*='hitTarget']");
    expect(hitTargets.length).toBe(5);
    hitTargets.forEach((target) => {
      expect((target as HTMLButtonElement).tabIndex).toBe(0);
      expect(target).toHaveAccessibleName();
    });
  });

  it.each(["projects", "lab"])(
    "unmounts the icon layer when the %s area is focused",
    async (focusedArea) => {
      Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 1080,
      });

      await act(async () => {
        render(
          <CategoryIconsLayer
            activeCategoryId="web"
            focusedArea={focusedArea}
            isIdle={true}
            isIntro={false}
          />,
        );
      });

      expect(
        document.querySelector("[data-testid='category-icons-layer']"),
      ).not.toBeInTheDocument();
    },
  );

  it("hides DOM hit targets during intro", async () => {
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1080,
    });

    await act(async () => {
      render(
        <CategoryIconsLayer
          activeCategoryId="web"
          focusedArea={null}
          isIdle={false}
          isIntro={true}
        />,
      );
    });

    const hitTargets = document.querySelectorAll("button[class*='hitTarget']");
    expect(hitTargets.length).toBe(0);
  });

  it("uses bottom-anchored fallback positioning (top = pb - size)", async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 800,
    });

    await act(async () => {
      render(
        <CategoryIconsLayer
          activeCategoryId="web"
          focusedArea={null}
          isIdle={true}
          isIntro={false}
        />,
      );
    });

    const fallbackIcons = document.querySelectorAll("[class*='fallbackIcon']");
    expect(fallbackIcons.length).toBe(5);
    // Each fallback icon should have an explicit top style (pb - size)
    fallbackIcons.forEach((icon) => {
      const style = (icon as HTMLElement).style;
      expect(style.top).toBeTruthy();
      expect(style.left).toBeTruthy();
    });
  });
});
