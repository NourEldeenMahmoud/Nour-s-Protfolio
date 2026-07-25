"use client";

import { useCallback, useLayoutEffect, useState } from "react";

const STORAGE_KEY = "learn-desktop-icon-grid-positions";

export const ICON_CELL_WIDTH = 96;
export const ICON_CELL_HEIGHT = 108;
export const ICON_GAP_X = 12;
export const ICON_GAP_Y = 12;
export const DESKTOP_PADDING_X = 16;
export const DESKTOP_PADDING_TOP = 12;

export type DesktopIconGridPosition = { column: number; row: number };
export type DesktopIconGridPositions = Record<string, DesktopIconGridPosition>;

function readPositions(): DesktopIconGridPositions {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const result: DesktopIconGridPositions = {};
      for (const [key, value] of Object.entries(parsed)) {
        if (
          value &&
          typeof value === "object" &&
          "column" in (value as Record<string, unknown>) &&
          "row" in (value as Record<string, unknown>)
        ) {
          const pos = value as { column: unknown; row: unknown };
          if (typeof pos.column === "number" && typeof pos.row === "number") {
            result[key] = { column: pos.column, row: pos.row };
          }
        }
      }
      return result;
    }
  } catch {}
  return {};
}

function writePositions(positions: DesktopIconGridPositions) {
  try {
    if (Object.keys(positions).length === 0) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
    }
  } catch {}
}

export function gridToPixel(col: number, row: number): { x: number; y: number } {
  return {
    x: DESKTOP_PADDING_X + col * (ICON_CELL_WIDTH + ICON_GAP_X),
    y: DESKTOP_PADDING_TOP + row * (ICON_CELL_HEIGHT + ICON_GAP_Y),
  };
}

export function pixelToGrid(x: number, y: number): DesktopIconGridPosition {
  return {
    column: Math.round((x - DESKTOP_PADDING_X) / (ICON_CELL_WIDTH + ICON_GAP_X)),
    row: Math.round((y - DESKTOP_PADDING_TOP) / (ICON_CELL_HEIGHT + ICON_GAP_Y)),
  };
}

export function getMaxGridDimensions(
  workspaceWidth: number,
  workspaceHeight: number,
): { maxCols: number; maxRows: number } {
  return {
    maxCols: Math.max(
      1,
      Math.floor(
        (workspaceWidth - DESKTOP_PADDING_X + ICON_GAP_X) /
          (ICON_CELL_WIDTH + ICON_GAP_X),
      ),
    ),
    maxRows: Math.max(
      1,
      Math.floor(
        (workspaceHeight - DESKTOP_PADDING_TOP + ICON_GAP_Y) /
          (ICON_CELL_HEIGHT + ICON_GAP_Y),
      ),
    ),
  };
}

export function clampGridPosition(
  col: number,
  row: number,
  maxCols: number,
  maxRows: number,
): DesktopIconGridPosition {
  return {
    column: Math.max(0, Math.min(col, maxCols - 1)),
    row: Math.max(0, Math.min(row, maxRows - 1)),
  };
}

export function buildOccupancyMap(
  allItemIds: string[],
  customPositions: DesktopIconGridPositions,
  defaultPositions: Map<string, DesktopIconGridPosition>,
  draggingId: string | null,
): Map<string, string> {
  const map = new Map<string, string>();
  for (const id of allItemIds) {
    if (id === draggingId) continue;
    const pos = customPositions[id] ?? defaultPositions.get(id);
    if (pos) {
      map.set(`${pos.column},${pos.row}`, id);
    }
  }
  return map;
}

export function isOccupied(
  col: number,
  row: number,
  occupancy: Map<string, string>,
): boolean {
  return occupancy.has(`${col},${row}`);
}

export function findNearestAvailableCell(
  col: number,
  row: number,
  maxCols: number,
  maxRows: number,
  occupancy: Map<string, string>,
): DesktopIconGridPosition {
  if (!isOccupied(col, row, occupancy)) {
    return clampGridPosition(col, row, maxCols, maxRows);
  }

  for (let radius = 1; radius < Math.max(maxCols, maxRows) * 2; radius++) {
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) continue;
        const nx = col + dx;
        const ny = row + dy;
        if (nx < 0 || nx >= maxCols || ny < 0 || ny >= maxRows) continue;
        if (!isOccupied(nx, ny, occupancy)) {
          return { column: nx, row: ny };
        }
      }
    }
  }

  return clampGridPosition(col, row, maxCols, maxRows);
}

export function computeDefaultPositions(
  itemIds: string[],
  maxCols: number,
): Map<string, DesktopIconGridPosition> {
  const map = new Map<string, DesktopIconGridPosition>();
  for (let i = 0; i < itemIds.length; i++) {
    const id = itemIds[i];
    if (!id) continue;
    map.set(id, {
      column: i % maxCols,
      row: Math.floor(i / maxCols),
    });
  }
  return map;
}

export function enforceBounds(
  customPositions: DesktopIconGridPositions,
  defaultPositions: Map<string, DesktopIconGridPosition>,
  maxCols: number,
  maxRows: number,
): DesktopIconGridPositions {
  const occupancy = new Map<string, string>();
  const result: DesktopIconGridPositions = {};

  const customIds = Object.keys(customPositions);
  const defaultIds = Array.from(defaultPositions.keys());
  const allIdSet = new Set<string>([...customIds, ...defaultIds]);
  const sortedIds = Array.from(allIdSet).sort((a, b) => {
    const aCustom = customPositions[a];
    const bCustom = customPositions[b];
    if (aCustom && !bCustom) return -1;
    if (!aCustom && bCustom) return 1;
    return 0;
  });

  for (const id of sortedIds) {
    const pos = customPositions[id] ?? defaultPositions.get(id);
    if (!pos) continue;

    const clamped = clampGridPosition(pos.column, pos.row, maxCols, maxRows);
    const finalPos = findNearestAvailableCell(
      clamped.column,
      clamped.row,
      maxCols,
      maxRows,
      occupancy,
    );

    if (customPositions[id]) {
      result[id] = finalPos;
    }
    occupancy.set(`${finalPos.column},${finalPos.row}`, id);
  }

  return result;
}

export function useDesktopIconGridPositions() {
  const [positions, setPositions] = useState<DesktopIconGridPositions>({});

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- safe: reads localStorage before paint
    setPositions(readPositions());
  }, []);

  const setPosition = useCallback((id: string, col: number, row: number) => {
    setPositions((prev) => {
      const next = { ...prev, [id]: { column: col, row: row } };
      writePositions(next);
      return next;
    });
  }, []);

  const removePosition = useCallback((id: string) => {
    setPositions((prev) => {
      const next = { ...prev };
      delete next[id];
      writePositions(next);
      return next;
    });
  }, []);

  const resetPositions = useCallback(() => {
    setPositions({});
    writePositions({});
  }, []);

  const getPosition = useCallback(
    (id: string) => positions[id] ?? null,
    [positions],
  );

  return { positions, setPosition, removePosition, resetPositions, getPosition };
}
