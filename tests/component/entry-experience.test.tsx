import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EntryExperience } from "@/components/entry/entry-experience";
import { INTRO_SEEN_KEY } from "@/components/entry/entry-state";

const gsapControl = vi.hoisted(() => ({
  onComplete: null as null | (() => void),
}));

vi.mock("gsap", () => {
  const timeline = {
    addLabel: vi.fn(),
    to: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    kill: vi.fn(),
  };
  timeline.addLabel.mockReturnValue(timeline);
  timeline.to.mockReturnValue(timeline);

  return {
    gsap: {
      context: (callback: () => void) => {
        callback();
        return { revert: vi.fn() };
      },
      set: vi.fn(),
      timeline: (options: { onComplete: () => void }) => {
        gsapControl.onComplete = options.onComplete;
        return timeline;
      },
      utils: {
        toArray: (selector: string) =>
          Array.from(document.querySelectorAll(selector)),
      },
    },
  };
});

const copy = {
  eyebrow: "ENGINEERING CORE / 001",
  name: "Nour Eldeen Mahmoud",
  role: ".NET-centered software engineer",
  statement: "I turn complex problems into systems.",
  selectorTitle: "Choose your path",
  selectorHint: "One core. Four paths.",
  skip: "Skip intro",
  replay: "Replay intro",
  language: "العربية",
  languageLabel: "View in Arabic",
  statusPlaying: "Introduction playing.",
  statusReady: "The path selector is ready.",
  signals: [
    "Booking",
    "Payments",
    "Hardware",
    "Healthcare",
    "Cross-platform",
    "Interactive",
  ],
  process: ["Understand", "Design", "Build", "Validate"],
  paths: {
    hire: { label: "Hire", description: "Evaluate role fit." },
    watch: { label: "Watch", description: "See the work." },
    learn: { label: "Learn", description: "Understand the process." },
    general: {
      label: "Continue to the general portfolio",
      description: "A balanced overview.",
    },
  },
};

function setReducedMotion(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      matches,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  );
}

describe("EntryExperience", () => {
  beforeEach(() => {
    setReducedMotion(false);
    gsapControl.onComplete = null;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("persists Skip, reveals all routes, and focuses the selector heading", async () => {
    const user = userEvent.setup();
    render(<EntryExperience locale="en" copy={copy} />);

    await user.click(screen.getByRole("button", { name: "Skip intro" }));

    const heading = screen.getByRole("heading", { name: "Choose your path" });
    expect(window.localStorage.getItem(INTRO_SEEN_KEY)).toBe("true");
    expect(heading).toHaveFocus();
    expect(screen.getByRole("link", { name: /Hire/ })).toHaveAttribute(
      "href",
      "/en/hire",
    );
    expect(screen.getByRole("link", { name: /Watch/ })).toHaveAttribute(
      "href",
      "/en/watch",
    );
    expect(screen.getByRole("link", { name: /Learn/ })).toHaveAttribute(
      "href",
      "/en/learn",
    );
    expect(
      screen.getByRole("link", { name: /Continue to the general portfolio/ }),
    ).toHaveAttribute("href", "/en/general");
  });

  it("keeps the seen key while Replay starts a new intro", async () => {
    window.localStorage.setItem(INTRO_SEEN_KEY, "true");
    const user = userEvent.setup();
    render(<EntryExperience locale="en" copy={copy} />);

    const replay = await screen.findByRole("button", { name: "Replay intro" });
    await user.click(replay);

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Skip intro" })).toBeVisible(),
    );
    expect(
      screen.queryByRole("button", { name: "Replay intro" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Introduction playing.",
    );
    expect(window.localStorage.getItem(INTRO_SEEN_KEY)).toBe("true");
  });

  it("resolves an intro that loads while the page is hidden", async () => {
    let hidden = true;
    let now = 0;
    vi.spyOn(document, "hidden", "get").mockImplementation(() => hidden);
    vi.spyOn(Date, "now").mockImplementation(() => now);
    render(<EntryExperience locale="en" copy={copy} />);

    await waitFor(() => expect(gsapControl.onComplete).not.toBeNull());
    hidden = false;
    now = 30_000;
    document.dispatchEvent(new Event("visibilitychange"));

    expect(
      await screen.findByRole("button", { name: "Replay intro" }),
    ).toBeVisible();
    expect(window.localStorage.getItem(INTRO_SEEN_KEY)).toBe("true");
  });

  it("renders the static selector immediately for reduced motion", async () => {
    setReducedMotion(true);
    render(<EntryExperience locale="en" copy={copy} />);

    expect(
      await screen.findByRole("button", { name: "Replay intro" }),
    ).toBeVisible();
    expect(screen.getByRole("main").getAttribute("data-entry-state")).toBe(
      "selector",
    );
    expect(screen.getByRole("navigation")).toBeVisible();
  });
});
