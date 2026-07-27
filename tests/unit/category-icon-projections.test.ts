import { describe, expect, it } from "vitest";
import {
  sourceToViewport,
  screenYToWorldY,
  HERO_ANCHORS,
  EXPLORE_ANCHORS,
  CATEGORY_IDS,
  SOURCE_WIDTH,
  SOURCE_HEIGHT,
  type Anchor,
} from "@/components/room/category-icon-projections";

describe("category-icon-projections", () => {
  /* ── sourceToViewport ── */

  describe("sourceToViewport", () => {
    it("maps a bottom-based anchor to the correct viewport position under same-aspect viewport", () => {
      const anchor: Anchor = { cx: 0.5, by: 0.6, h: 0.1 };
      const vpW = 1920;
      const vpH = 1235; // ≈ 1920 / 1.5556
      const result = sourceToViewport(anchor, vpW, vpH);

      expect(result.px).toBeCloseTo(vpW / 2, 0);
      // pb = offsetY + by * renderedH, where offsetY ≈ 0 and renderedH ≈ vpH
      expect(result.pb).toBeCloseTo(0.6 * vpH, 0);
      expect(result.ph).toBeCloseTo(0.1 * vpH, 0);
    });

    it("produces bottom-anchored pixel coordinates under a wider viewport (landscape crop)", () => {
      const anchor: Anchor = { cx: 0.5, by: 0.6, h: 0.1 };
      const vpW = 1920;
      const vpH = 1080;

      const result = sourceToViewport(anchor, vpW, vpH);

      // Scale = max(1920/4200, 1080/2700) = 0.45714
      const scale = vpW / SOURCE_WIDTH;
      const renderedH = SOURCE_HEIGHT * scale;
      const offsetY = (vpH - renderedH) / 2;

      expect(result.px).toBeCloseTo(vpW / 2, 0);
      expect(result.pb).toBeCloseTo(offsetY + 0.6 * renderedH, 0);
      expect(result.ph).toBeCloseTo(0.1 * renderedH, 0);
    });

    it("produces bottom-anchored pixel coordinates under a taller viewport (portrait crop)", () => {
      const anchor: Anchor = { cx: 0.5, by: 0.6, h: 0.1 };
      const vpW = 600;
      const vpH = 1200;

      const result = sourceToViewport(anchor, vpW, vpH);

      // Scale = max(600/4200, 1200/2700) = 0.44444
      const scale = vpH / SOURCE_HEIGHT;
      const renderedW = SOURCE_WIDTH * scale;
      const offsetX = (vpW - renderedW) / 2;

      expect(result.px).toBeCloseTo(offsetX + 0.5 * renderedW, 0);
      expect(result.pb).toBeCloseTo(0.6 * vpH, 0);
      expect(result.ph).toBeCloseTo(0.1 * vpH, 0);
    });

    it("correctly positions off-center bottom-based anchors", () => {
      const anchor: Anchor = { cx: 0.25, by: 0.8, h: 0.05 };
      const vpW = 1920;
      const vpH = 1080;

      const result = sourceToViewport(anchor, vpW, vpH);

      const scale = vpW / SOURCE_WIDTH;
      const renderedH = SOURCE_HEIGHT * scale;
      const offsetY = (vpH - renderedH) / 2;

      expect(result.px).toBeCloseTo(0.25 * vpW, 0);
      expect(result.pb).toBeCloseTo(offsetY + 0.8 * renderedH, 0);
      expect(result.ph).toBeCloseTo(0.05 * renderedH, 0);
    });

    it("pb is always below cy would be (by > by - h/2)", () => {
      for (const id of CATEGORY_IDS) {
        const hero = HERO_ANCHORS[id];
        const result = sourceToViewport(hero, 1920, 1080);
        // pb is the bottom of the model; pb - ph is the top
        // pb should be greater than the midpoint (pb - ph/2)
        expect(result.pb).toBeGreaterThan(result.pb - result.ph);
      }
    });
  });

  /* ── screenYToWorldY ── */

  describe("screenYToWorldY", () => {
    it("maps screen Y = 0 (top) to world Y = viewportHeight", () => {
      expect(screenYToWorldY(0, 1080)).toBe(1080);
    });

    it("maps screen Y = viewportHeight (bottom) to world Y = 0", () => {
      expect(screenYToWorldY(1080, 1080)).toBe(0);
    });

    it("maps screen Y = viewportHeight/2 (center) to world Y = viewportHeight/2", () => {
      expect(screenYToWorldY(540, 1080)).toBe(540);
    });

    it("increasing screenY decreases worldY", () => {
      const vpH = 1080;
      expect(screenYToWorldY(100, vpH)).toBeGreaterThan(screenYToWorldY(200, vpH));
      expect(screenYToWorldY(200, vpH)).toBeGreaterThan(screenYToWorldY(800, vpH));
    });

    it("subtracting positive hover lift from screenY produces a larger (upward) worldY", () => {
      const vpH = 1080;
      const baseScreenY = 600;
      const hoverLift = 8;
      const withoutLift = screenYToWorldY(baseScreenY, vpH);
      const withLift = screenYToWorldY(baseScreenY - hoverLift, vpH);
      // Subtracting lift from screenY means the icon appears higher on screen,
      // which in Y-up world space is a larger worldY value
      expect(withLift).toBeGreaterThan(withoutLift);
      expect(withLift - withoutLift).toBeCloseTo(hoverLift);
    });

    it("works with 1366×768 viewport", () => {
      expect(screenYToWorldY(0, 768)).toBe(768);
      expect(screenYToWorldY(768, 768)).toBe(0);
    });

    it("works with a tall viewport (1440 height)", () => {
      const vpH = 1440;
      expect(screenYToWorldY(0, vpH)).toBe(vpH);
      expect(screenYToWorldY(vpH, vpH)).toBe(0);
    });

    it("works just above the 780px mobile breakpoint", () => {
      const vpH = 781;
      expect(screenYToWorldY(0, vpH)).toBe(vpH);
      expect(screenYToWorldY(vpH, vpH)).toBe(0);
    });
  });

  /* ── HERO_ANCHORS sanity ── */

  describe("HERO_ANCHORS", () => {
    it("has entries for all five categories", () => {
      expect(CATEGORY_IDS).toHaveLength(5);
      for (const id of CATEGORY_IDS) {
        expect(HERO_ANCHORS[id]).toBeDefined();
        expect(HERO_ANCHORS[id].cx).toBeGreaterThan(0);
        expect(HERO_ANCHORS[id].cx).toBeLessThan(1);
        expect(HERO_ANCHORS[id].by).toBeGreaterThan(0);
        expect(HERO_ANCHORS[id].by).toBeLessThan(1);
        expect(HERO_ANCHORS[id].h).toBeGreaterThan(0);
      }
    });

    it("hero anchors are horizontally spread across the middle", () => {
      const cxs = CATEGORY_IDS.map((id) => HERO_ANCHORS[id].cx);
      for (let i = 1; i < cxs.length; i++) {
        expect(cxs[i]!).toBeGreaterThan(cxs[i - 1]!);
      }
    });

    it("hero anchors have similar bottom Y positions (all near pedestal row)", () => {
      const bys = CATEGORY_IDS.map((id) => HERO_ANCHORS[id].by);
      const minBy = Math.min(...bys);
      const maxBy = Math.max(...bys);
      // All within 0.008 of each other (bottom anchors differ slightly)
      expect(maxBy - minBy).toBeLessThan(0.008);
    });
  });

  /* ── EXPLORE_ANCHORS sanity ── */

  describe("EXPLORE_ANCHORS", () => {
    it("has entries for all five categories", () => {
      for (const id of CATEGORY_IDS) {
        expect(EXPLORE_ANCHORS[id]).toBeDefined();
        expect(EXPLORE_ANCHORS[id].h).toBeGreaterThan(0);
      }
    });

    it("explore anchors are horizontally spread", () => {
      const cxs = CATEGORY_IDS.map((id) => EXPLORE_ANCHORS[id].cx);
      for (let i = 1; i < cxs.length; i++) {
        expect(cxs[i]!).toBeGreaterThan(cxs[i - 1]!);
      }
    });

    it("explore anchors are lower (larger by) than hero anchors", () => {
      for (const id of CATEGORY_IDS) {
        expect(EXPLORE_ANCHORS[id].by).toBeGreaterThan(
          HERO_ANCHORS[id].by,
        );
      }
    });

    it("explore anchors are larger (bigger height) than hero anchors", () => {
      for (const id of CATEGORY_IDS) {
        expect(EXPLORE_ANCHORS[id].h).toBeGreaterThan(HERO_ANCHORS[id].h);
      }
    });
  });

  /* ── Integration: full viewport projection ── */

  describe("integration: hero→explore projection at 1920×1080", () => {
    const vpW = 1920;
    const vpH = 1080;

    it("produces distinct bottom positions for each category in both states", () => {
      for (const id of CATEGORY_IDS) {
        const hero = sourceToViewport(HERO_ANCHORS[id], vpW, vpH);
        const explore = sourceToViewport(EXPLORE_ANCHORS[id], vpW, vpH);

        // Explore bottom should be lower (larger pb) than hero bottom
        expect(explore.pb).toBeGreaterThan(hero.pb);
        // Explore should be larger
        expect(explore.ph).toBeGreaterThan(hero.ph);
        // Both should be within viewport
        expect(hero.px).toBeGreaterThan(0);
        expect(hero.px).toBeLessThan(vpW);
        expect(explore.px).toBeGreaterThan(0);
        expect(explore.px).toBeLessThan(vpW);
      }
    });

    it("web icon in hero state is left of center", () => {
      const hero = sourceToViewport(HERO_ANCHORS.web, vpW, vpH);
      expect(hero.px).toBeLessThan(vpW / 2);
    });

    it("desktop icon in hero state is near center", () => {
      const hero = sourceToViewport(HERO_ANCHORS.desktop, vpW, vpH);
      expect(hero.px).toBeCloseTo(vpW / 2, -1);
    });

    it("summaries icon in hero state is right of center", () => {
      const hero = sourceToViewport(HERO_ANCHORS.summaries, vpW, vpH);
      expect(hero.px).toBeGreaterThan(vpW / 2);
    });

    it("model top (pb - ph) is above pb for all hero icons", () => {
      for (const id of CATEGORY_IDS) {
        const hero = sourceToViewport(HERO_ANCHORS[id], vpW, vpH);
        // pb - ph should be less than pb (top is above bottom in screen coords)
        expect(hero.pb - hero.ph).toBeLessThan(hero.pb);
        // Top should still be within viewport
        expect(hero.pb - hero.ph).toBeGreaterThan(0);
      }
    });
  });
});
