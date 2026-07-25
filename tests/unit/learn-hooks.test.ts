import { describe, expect, it, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useContextMenu } from "@/components/paths/learn/use-context-menu";
import {
  useDesktopIconGridPositions,
  gridToPixel,
  pixelToGrid,
  getMaxGridDimensions,
  clampGridPosition,
  buildOccupancyMap,
  isOccupied,
  findNearestAvailableCell,
  computeDefaultPositions,
  resolveDesktopLayout,
  ICON_CELL_WIDTH,
  ICON_CELL_HEIGHT,
  ICON_GAP_X,
  ICON_GAP_Y,
  DESKTOP_PADDING_X,
  DESKTOP_PADDING_TOP,
} from "@/components/paths/learn/use-desktop-icon-positions";

describe("useContextMenu", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("starts closed", () => {
    const { result } = renderHook(() => useContextMenu());
    expect(result.current.menu.open).toBe(false);
  });

  it("opens at the given coordinates with a desktop target", () => {
    const { result } = renderHook(() => useContextMenu());
    act(() => {
      result.current.openContextMenu(100, 200, { type: "desktop" });
    });
    expect(result.current.menu.open).toBe(true);
    expect(result.current.menu.x).toBe(100);
    expect(result.current.menu.y).toBe(200);
    expect(result.current.menu.target).toEqual({ type: "desktop" });
  });

  it("opens with a folder target", () => {
    const { result } = renderHook(() => useContextMenu());
    act(() => {
      result.current.openContextMenu(50, 60, { type: "folder", id: "knowledge" });
    });
    expect(result.current.menu.target).toEqual({ type: "folder", id: "knowledge" });
  });

  it("opens with a file target", () => {
    const { result } = renderHook(() => useContextMenu());
    act(() => {
      result.current.openContextMenu(10, 20, { type: "file", id: "about-profile" });
    });
    expect(result.current.menu.target).toEqual({ type: "file", id: "about-profile" });
  });

  it("opens with an app target", () => {
    const { result } = renderHook(() => useContextMenu());
    act(() => {
      result.current.openContextMenu(30, 40, { type: "app", id: "app-vscode" });
    });
    expect(result.current.menu.target).toEqual({ type: "app", id: "app-vscode" });
  });

  it("closes via closeContextMenu", () => {
    const { result } = renderHook(() => useContextMenu());
    act(() => {
      result.current.openContextMenu(100, 200, { type: "desktop" });
    });
    expect(result.current.menu.open).toBe(true);
    act(() => {
      result.current.closeContextMenu();
    });
    expect(result.current.menu.open).toBe(false);
  });

  it("closing when already closed is a no-op", () => {
    const { result } = renderHook(() => useContextMenu());
    act(() => {
      result.current.closeContextMenu();
    });
    expect(result.current.menu.open).toBe(false);
  });

  it("closing replaces target state", () => {
    const { result } = renderHook(() => useContextMenu());
    act(() => {
      result.current.openContextMenu(100, 200, { type: "folder", id: "knowledge" });
    });
    act(() => {
      result.current.closeContextMenu();
    });
    act(() => {
      result.current.openContextMenu(50, 60, { type: "app", id: "app-vscode" });
    });
    expect(result.current.menu.target).toEqual({ type: "app", id: "app-vscode" });
  });
});

describe("grid utilities", () => {
  describe("gridToPixel", () => {
    it("converts column 0, row 0 to padding offset", () => {
      const { x, y } = gridToPixel(0, 0);
      expect(x).toBe(DESKTOP_PADDING_X);
      expect(y).toBe(DESKTOP_PADDING_TOP);
    });

    it("converts column 1, row 0 correctly", () => {
      const { x } = gridToPixel(1, 0);
      expect(x).toBe(DESKTOP_PADDING_X + ICON_CELL_WIDTH + ICON_GAP_X);
    });

    it("converts column 0, row 1 correctly", () => {
      const { y } = gridToPixel(0, 1);
      expect(y).toBe(DESKTOP_PADDING_TOP + ICON_CELL_HEIGHT + ICON_GAP_Y);
    });

    it("converts column 2, row 3 correctly", () => {
      const { x, y } = gridToPixel(2, 3);
      const expectedX = DESKTOP_PADDING_X + 2 * (ICON_CELL_WIDTH + ICON_GAP_X);
      const expectedY = DESKTOP_PADDING_TOP + 3 * (ICON_CELL_HEIGHT + ICON_GAP_Y);
      expect(x).toBe(expectedX);
      expect(y).toBe(expectedY);
    });
  });

  describe("pixelToGrid", () => {
    it("converts padding origin to cell 0,0", () => {
      const cell = pixelToGrid(DESKTOP_PADDING_X, DESKTOP_PADDING_TOP);
      expect(cell).toEqual({ column: 0, row: 0 });
    });

    it("rounds to nearest cell", () => {
      const midX = DESKTOP_PADDING_X + (ICON_CELL_WIDTH + ICON_GAP_X) / 2;
      const cell = pixelToGrid(midX, DESKTOP_PADDING_TOP);
      expect(cell.column).toBe(1);
    });

    it("rounds down when before midpoint", () => {
      const beforeMid = DESKTOP_PADDING_X + (ICON_CELL_WIDTH + ICON_GAP_X) / 2 - 1;
      const cell = pixelToGrid(beforeMid, DESKTOP_PADDING_TOP);
      expect(cell.column).toBe(0);
    });
  });

  describe("getMaxGridDimensions", () => {
    it("calculates columns and rows from workspace size", () => {
      const { maxCols, maxRows } = getMaxGridDimensions(1920, 1080);
      expect(maxCols).toBeGreaterThan(0);
      expect(maxRows).toBeGreaterThan(0);
    });

    it("returns at least 1 col and 1 row", () => {
      const { maxCols, maxRows } = getMaxGridDimensions(10, 10);
      expect(maxCols).toBe(1);
      expect(maxRows).toBe(1);
    });

    it("more width means more columns", () => {
      const small = getMaxGridDimensions(800, 600);
      const large = getMaxGridDimensions(1600, 600);
      expect(large.maxCols).toBeGreaterThan(small.maxCols);
    });

    it("more height means more rows", () => {
      const small = getMaxGridDimensions(1920, 500);
      const large = getMaxGridDimensions(1920, 1000);
      expect(large.maxRows).toBeGreaterThan(small.maxRows);
    });
  });

  describe("clampGridPosition", () => {
    it("clamps negative column to 0", () => {
      expect(clampGridPosition(-1, 0, 8, 10)).toEqual({ column: 0, row: 0 });
    });

    it("clamps negative row to 0", () => {
      expect(clampGridPosition(0, -1, 8, 10)).toEqual({ column: 0, row: 0 });
    });

    it("clamps column to maxCols - 1", () => {
      expect(clampGridPosition(100, 0, 8, 10)).toEqual({ column: 7, row: 0 });
    });

    it("clamps row to maxRows - 1", () => {
      expect(clampGridPosition(0, 100, 8, 10)).toEqual({ column: 0, row: 9 });
    });

    it("returns same position when within bounds", () => {
      expect(clampGridPosition(3, 5, 8, 10)).toEqual({ column: 3, row: 5 });
    });
  });

  describe("buildOccupancyMap", () => {
    it("returns empty map when no items", () => {
      const map = buildOccupancyMap([], {}, new Map(), null);
      expect(map.size).toBe(0);
    });

    it("includes custom positions", () => {
      const custom = { a: { column: 0, row: 0 } };
      const map = buildOccupancyMap(["a"], custom, new Map(), null);
      expect(map.get("0,0")).toBe("a");
    });

    it("includes default positions", () => {
      const defaults = new Map([["a", { column: 1, row: 2 }]]);
      const map = buildOccupancyMap(["a"], {}, defaults, null);
      expect(map.get("1,2")).toBe("a");
    });

    it("custom positions override defaults", () => {
      const custom = { a: { column: 5, row: 5 } };
      const defaults = new Map([["a", { column: 1, row: 2 }]]);
      const map = buildOccupancyMap(["a"], custom, defaults, null);
      expect(map.get("5,5")).toBe("a");
      expect(map.has("1,2")).toBe(false);
    });

    it("excludes the dragging item", () => {
      const custom = { a: { column: 0, row: 0 } };
      const map = buildOccupancyMap(["a"], custom, new Map(), "a");
      expect(map.size).toBe(0);
    });
  });

  describe("isOccupied", () => {
    it("returns false for empty map", () => {
      expect(isOccupied(0, 0, new Map())).toBe(false);
    });

    it("returns true when cell is taken", () => {
      const occ = new Map([["0,0", "a"]]);
      expect(isOccupied(0, 0, occ)).toBe(true);
    });

    it("returns false for different cell", () => {
      const occ = new Map([["0,0", "a"]]);
      expect(isOccupied(1, 0, occ)).toBe(false);
    });
  });

  describe("findNearestAvailableCell", () => {
    it("returns same cell if unoccupied", () => {
      const occ = new Map<string, string>();
      expect(findNearestAvailableCell(2, 3, 8, 10, occ)).toEqual({
        column: 2,
        row: 3,
      });
    });

    it("finds neighbor when target is occupied", () => {
      const occ = new Map([["2,3", "a"]]);
      const result = findNearestAvailableCell(2, 3, 8, 10, occ);
      expect(result.column).toBeGreaterThanOrEqual(0);
      expect(result.column).toBeLessThan(8);
      expect(result.row).toBeGreaterThanOrEqual(0);
      expect(result.row).toBeLessThan(10);
      expect(isOccupied(result.column, result.row, occ)).toBe(false);
    });

    it("finds the nearest unoccupied cell", () => {
      const occ = new Map([
        ["2,3", "a"],
        ["3,3", "b"],
        ["1,3", "c"],
        ["2,4", "d"],
        ["2,2", "e"],
      ]);
      const result = findNearestAvailableCell(2, 3, 8, 10, occ);
      expect(isOccupied(result.column, result.row, occ)).toBe(false);
      const dist =
        Math.abs(result.column - 2) + Math.abs(result.row - 3);
      expect(dist).toBe(2);
    });

    it("expands rings to find available cell", () => {
      const occ = new Map<string, string>();
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          occ.set(`${c},${r}`, "x");
        }
      }
      const result = findNearestAvailableCell(1, 1, 8, 10, occ);
      expect(isOccupied(result.column, result.row, occ)).toBe(false);
    });

    it("stays within bounds", () => {
      const occ = new Map([["0,0", "a"]]);
      const result = findNearestAvailableCell(0, 0, 2, 2, occ);
      expect(result.column).toBeGreaterThanOrEqual(0);
      expect(result.column).toBeLessThan(2);
      expect(result.row).toBeGreaterThanOrEqual(0);
      expect(result.row).toBeLessThan(2);
    });
  });

  describe("computeDefaultPositions", () => {
    it("assigns sequential grid positions", () => {
      const result = computeDefaultPositions(["a", "b", "c"], 4);
      expect(result.get("a")).toEqual({ column: 0, row: 0 });
      expect(result.get("b")).toEqual({ column: 1, row: 0 });
      expect(result.get("c")).toEqual({ column: 2, row: 0 });
    });

    it("wraps to next row when columns exhausted", () => {
      const result = computeDefaultPositions(["a", "b", "c", "d", "e"], 2);
      expect(result.get("a")).toEqual({ column: 0, row: 0 });
      expect(result.get("b")).toEqual({ column: 1, row: 0 });
      expect(result.get("c")).toEqual({ column: 0, row: 1 });
      expect(result.get("d")).toEqual({ column: 1, row: 1 });
      expect(result.get("e")).toEqual({ column: 0, row: 2 });
    });

    it("handles empty list", () => {
      const result = computeDefaultPositions([], 4);
      expect(result.size).toBe(0);
    });

    it("handles single column", () => {
      const result = computeDefaultPositions(["a", "b", "c"], 1);
      expect(result.get("a")).toEqual({ column: 0, row: 0 });
      expect(result.get("b")).toEqual({ column: 0, row: 1 });
      expect(result.get("c")).toEqual({ column: 0, row: 2 });
    });
  });

  describe("resolveDesktopLayout", () => {
    it("returns empty layout for empty item list", () => {
      const layout = resolveDesktopLayout([], {}, new Map(), 8, 10);
      expect(layout.items.size).toBe(0);
      expect(layout.maxCols).toBe(8);
      expect(layout.maxRows).toBe(10);
    });

    it("places items using default positions when no custom", () => {
      const defaults = new Map([
        ["a", { column: 0, row: 0 }],
        ["b", { column: 1, row: 0 }],
      ]);
      const layout = resolveDesktopLayout(["a", "b"], {}, defaults, 8, 10);
      const a = layout.items.get("a");
      const b = layout.items.get("b");
      expect(a).toBeDefined();
      expect(b).toBeDefined();
      expect(a!.col).toBe(0);
      expect(a!.row).toBe(0);
      expect(b!.col).toBe(1);
      expect(b!.row).toBe(0);
    });

    it("custom positions take priority over defaults", () => {
      const custom = { a: { column: 5, row: 3 } };
      const defaults = new Map([["a", { column: 0, row: 0 }]]);
      const layout = resolveDesktopLayout(["a"], custom, defaults, 8, 10);
      const a = layout.items.get("a");
      expect(a).toBeDefined();
      expect(a!.col).toBe(5);
      expect(a!.row).toBe(3);
    });

    it("clamps out-of-bounds positions", () => {
      const custom = { a: { column: 100, row: 100 } };
      const layout = resolveDesktopLayout(["a"], custom, new Map(), 8, 10);
      const a = layout.items.get("a");
      expect(a).toBeDefined();
      expect(a!.col).toBeLessThan(8);
      expect(a!.row).toBeLessThan(10);
    });

    it("avoids collisions with nearest available cell", () => {
      const custom = {
        a: { column: 0, row: 0 },
        b: { column: 0, row: 0 },
      };
      const layout = resolveDesktopLayout(["a", "b"], custom, new Map(), 8, 10);
      const a = layout.items.get("a");
      const b = layout.items.get("b");
      expect(a).toBeDefined();
      expect(b).toBeDefined();
      expect(a!.col).not.toBe(b!.col);
    });

    it("skips dragging item", () => {
      const custom = {
        a: { column: 0, row: 0 },
        b: { column: 1, row: 0 },
      };
      const layout = resolveDesktopLayout(["a", "b"], custom, new Map(), 8, 10, "a");
      expect(layout.items.has("a")).toBe(false);
      expect(layout.items.has("b")).toBe(true);
    });

    it("computes correct pixel positions", () => {
      const custom = { a: { column: 2, row: 3 } };
      const layout = resolveDesktopLayout(["a"], custom, new Map(), 8, 10);
      const a = layout.items.get("a");
      expect(a).toBeDefined();
      const { x, y } = gridToPixel(2, 3);
      expect(a!.x).toBe(x);
      expect(a!.y).toBe(y);
    });

    it("handles mixed custom and default items", () => {
      const custom = { a: { column: 3, row: 2 } };
      const defaults = new Map([
        ["a", { column: 0, row: 0 }],
        ["b", { column: 1, row: 0 }],
        ["c", { column: 2, row: 0 }],
      ]);
      const layout = resolveDesktopLayout(["a", "b", "c"], custom, defaults, 8, 10);
      const a = layout.items.get("a");
      const b = layout.items.get("b");
      const c = layout.items.get("c");
      expect(a!.col).toBe(3);
      expect(a!.row).toBe(2);
      expect(b!.col).toBe(1);
      expect(b!.row).toBe(0);
      expect(c!.col).toBe(2);
      expect(c!.row).toBe(0);
    });
  });
});

describe("useDesktopIconGridPositions", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with empty positions", () => {
    const { result } = renderHook(() => useDesktopIconGridPositions());
    expect(result.current.positions).toEqual({});
  });

  it("sets and reads a grid position", () => {
    const { result } = renderHook(() => useDesktopIconGridPositions());
    act(() => {
      result.current.setPosition("knowledge", 2, 3);
    });
    expect(result.current.getPosition("knowledge")).toEqual({
      column: 2,
      row: 3,
    });
  });

  it("persists to localStorage", () => {
    const { result } = renderHook(() => useDesktopIconGridPositions());
    act(() => {
      result.current.setPosition("knowledge", 2, 3);
    });
    const stored = JSON.parse(
      localStorage.getItem("learn-desktop-icon-grid-positions") ?? "{}",
    );
    expect(stored).toEqual({ knowledge: { column: 2, row: 3 } });
  });

  it("loads from localStorage on mount", () => {
    localStorage.setItem(
      "learn-desktop-icon-grid-positions",
      JSON.stringify({ "app-vscode": { column: 5, row: 1 } }),
    );
    const { result } = renderHook(() => useDesktopIconGridPositions());
    expect(result.current.getPosition("app-vscode")).toEqual({
      column: 5,
      row: 1,
    });
  });

  it("removes a position", () => {
    const { result } = renderHook(() => useDesktopIconGridPositions());
    act(() => {
      result.current.setPosition("knowledge", 2, 3);
    });
    act(() => {
      result.current.removePosition("knowledge");
    });
    expect(result.current.getPosition("knowledge")).toBeNull();
  });

  it("resets all positions", () => {
    const { result } = renderHook(() => useDesktopIconGridPositions());
    act(() => {
      result.current.setPosition("a", 0, 0);
      result.current.setPosition("b", 1, 1);
    });
    act(() => {
      result.current.resetPositions();
    });
    expect(result.current.positions).toEqual({});
    expect(
      localStorage.getItem("learn-desktop-icon-grid-positions"),
    ).toBeNull();
  });

  it("getPosition returns null for unknown id", () => {
    const { result } = renderHook(() => useDesktopIconGridPositions());
    expect(result.current.getPosition("nonexistent")).toBeNull();
  });

  it("overwrites existing position", () => {
    const { result } = renderHook(() => useDesktopIconGridPositions());
    act(() => {
      result.current.setPosition("knowledge", 0, 0);
    });
    act(() => {
      result.current.setPosition("knowledge", 3, 4);
    });
    expect(result.current.getPosition("knowledge")).toEqual({
      column: 3,
      row: 4,
    });
  });

  it("stores multiple positions independently", () => {
    const { result } = renderHook(() => useDesktopIconGridPositions());
    act(() => {
      result.current.setPosition("a", 0, 0);
      result.current.setPosition("b", 1, 2);
      result.current.setPosition("c", 3, 4);
    });
    expect(result.current.getPosition("a")).toEqual({ column: 0, row: 0 });
    expect(result.current.getPosition("b")).toEqual({ column: 1, row: 2 });
    expect(result.current.getPosition("c")).toEqual({ column: 3, row: 4 });
  });

  it("handles corrupted localStorage gracefully", () => {
    localStorage.setItem("learn-desktop-icon-grid-positions", "NOT_JSON");
    const { result } = renderHook(() => useDesktopIconGridPositions());
    expect(result.current.positions).toEqual({});
  });

  it("handles array-shaped localStorage gracefully", () => {
    localStorage.setItem(
      "learn-desktop-icon-grid-positions",
      JSON.stringify([1, 2, 3]),
    );
    const { result } = renderHook(() => useDesktopIconGridPositions());
    expect(result.current.positions).toEqual({});
  });

  it("ignores entries with missing fields", () => {
    localStorage.setItem(
      "learn-desktop-icon-grid-positions",
      JSON.stringify({ a: { column: 1 }, b: { row: 2 }, c: { column: 3, row: 4 } }),
    );
    const { result } = renderHook(() => useDesktopIconGridPositions());
    expect(result.current.getPosition("a")).toBeNull();
    expect(result.current.getPosition("b")).toBeNull();
    expect(result.current.getPosition("c")).toEqual({ column: 3, row: 4 });
  });
});
