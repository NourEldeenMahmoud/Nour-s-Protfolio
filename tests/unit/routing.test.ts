import { describe, expect, it } from "vitest";
import { isLocale, resolvePreferredLocale } from "@/i18n/routing";

describe("locale routing", () => {
  it("accepts only the published locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ar")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it.each([
    ["ar", "en-US,en;q=0.9", "ar"],
    [undefined, "ar-EG,ar;q=0.9,en;q=0.8", "ar"],
    [undefined, "fr-FR,fr;q=0.9,en;q=0.7", "en"],
    ["fr", "ar;q=0.4,en;q=0.8", "en"],
    [undefined, null, "en"],
  ])(
    "resolves persisted %s and accepted %s to %s",
    (persisted, accepted, expected) => {
      expect(resolvePreferredLocale(persisted, accepted)).toBe(expected);
    },
  );
});
