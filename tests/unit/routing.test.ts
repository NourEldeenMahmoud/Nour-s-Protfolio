import { describe, expect, it } from "vitest";
import { isLocale } from "@/i18n/routing";

describe("locale routing", () => {
  it("accepts only the published locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ar")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });
});
