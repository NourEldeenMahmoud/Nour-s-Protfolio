import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

// GSAP's _tick calls requestAnimationFrame recursively.
// Limit synchronous recursion depth to 1 to prevent stack overflow
// while still providing the immediate frame behavior tests expect.
let rafDepth = 0;
const RAF_MAX_DEPTH = 1;

Object.defineProperty(window, "requestAnimationFrame", {
  writable: true,
  value: (callback: FrameRequestCallback) => {
    if (rafDepth >= RAF_MAX_DEPTH) return 0;
    rafDepth++;
    try {
      callback(performance.now());
    } finally {
      rafDepth--;
    }
    return 1;
  },
});

Object.defineProperty(window, "cancelAnimationFrame", {
  writable: true,
  value: () => { /* no-op for depth-limited mock */ },
});

