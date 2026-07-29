import { describe, expect, it } from "vitest";
import { getCairoClockAngles } from "@/components/room/engineering-wall-clock";

describe("engineering wall clock", () => {
  it("maps a fixed winter instant to Cairo clock-hand angles", () => {
    const angles = getCairoClockAngles(new Date("2026-01-15T10:15:30.000Z"));

    expect(angles.hour).toBeCloseTo(7.75);
    expect(angles.minute).toBe(93);
    expect(angles.second).toBe(180);
  });
});
