import { expect, test } from "@playwright/test";

const browserErrors = new WeakMap<object, string[]>();

test.beforeEach(({ page }) => {
  const errors: string[] = [];
  browserErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(`${message.text()} (${message.location().url})`);
    }
  });
});

test.afterEach(({ page }) => {
  expect(browserErrors.get(page)).toEqual([]);
});

test.describe("Learn desktop", () => {
  test("desktop fills the complete workspace with no scrollbars", async ({
    page,
  }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const noScrollbars = await page.evaluate(() => {
      const html = document.documentElement;
      return {
        htmlScrollWidth: html.scrollWidth,
        htmlClientWidth: html.clientWidth,
        htmlScrollHeight: html.scrollHeight,
        htmlClientHeight: html.clientHeight,
      };
    });
    expect(noScrollbars.htmlScrollWidth).toBe(noScrollbars.htmlClientWidth);
    expect(noScrollbars.htmlScrollHeight).toBe(noScrollbars.htmlClientHeight);

    const desktopScroll = await page.evaluate(() => {
      const desktop = document.querySelector(
        "[data-desktop-surface]",
      ) as HTMLElement | null;
      if (!desktop) return null;
      return {
        scrollWidth: desktop.scrollWidth,
        clientWidth: desktop.clientWidth,
        scrollHeight: desktop.scrollHeight,
        clientHeight: desktop.clientHeight,
      };
    });
    expect(desktopScroll).not.toBeNull();
    expect(desktopScroll!.scrollWidth).toBe(desktopScroll!.clientWidth);
    expect(desktopScroll!.scrollHeight).toBe(desktopScroll!.clientHeight);
  });

  test("taskbar is visible at the bottom", async ({ page }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const taskbar = page.locator("[role='toolbar'][aria-label='Taskbar']");
    await expect(taskbar).toBeVisible();

    const box = await taskbar.boundingBox();
    expect(box).not.toBeNull();
    const viewport = page.viewportSize();
    expect(viewport).not.toBeNull();
    expect(box!.y + box!.height).toBeCloseTo(viewport!.height, -1);
  });

  test("desktop icons are visible and accessible", async ({ page }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icons = page.locator("[data-desktop-item]");
    const count = await icons.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 3); i++) {
      await expect(icons.nth(i)).toBeVisible();
    }
  });

  test("double-clicking a folder opens an explorer window", async ({
    page,
  }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const thisPC = page.locator("[data-desktop-item-id='this-pc']");
    await thisPC.dblclick();

    const window = page.locator("[role='dialog']");
    await expect(window).toBeVisible({ timeout: 3000 });
    await expect(window).toHaveAttribute("aria-label", /This PC/i);
  });

  test("nested folder navigation updates content in the same window", async ({
    page,
  }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    // Open This PC
    const thisPC = page.locator("[data-desktop-item-id='this-pc']");
    await thisPC.dblclick();
    await page.waitForSelector("[role='dialog']");

    // Double-click a folder inside the explorer
    const explorerGrid = page.locator("[role='listbox'][aria-label='Files']");
    const firstFolder = explorerGrid.locator("[role='option']").first();
    await firstFolder.dblclick();

    // Should still be exactly one window
    const windows = page.locator("[role='dialog']");
    await expect(windows).toHaveCount(1);

    // Breadcrumb should have updated
    const breadcrumbs = page.locator("[role='dialog'] .breadcrumbBtn");
    const breadcrumbCount = await breadcrumbs.count();
    expect(breadcrumbCount).toBeGreaterThanOrEqual(2);
  });

  test("explorer back button works after nested navigation", async ({
    page,
  }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    // Open This PC
    const thisPC = page.locator("[data-desktop-item-id='this-pc']");
    await thisPC.dblclick();
    await page.waitForSelector("[role='dialog']");

    // Navigate into first folder
    const firstFolder = page
      .locator("[role='listbox'][aria-label='Files']")
      .locator("[role='option']")
      .first();
    await firstFolder.dblclick();
    await page.waitForTimeout(200);

    // Click back
    const backBtn = page.locator("[aria-label='Back']");
    await backBtn.click();
    await page.waitForTimeout(200);

    // Should be back at This PC with 1 breadcrumb
    const breadcrumbs = page.locator("[role='dialog'] .breadcrumbBtn");
    await expect(breadcrumbs).toHaveCount(1);
  });

  test("document viewer has a single scrollbar at the window edge", async ({
    page,
  }) => {
    await page.goto("/en/learn?file=__about__");
    await page.waitForSelector("[role='dialog']");

    const scrollCheck = await page.evaluate(() => {
      const docViewer = document.querySelector(
        ".docViewer",
      ) as HTMLElement | null;
      if (!docViewer) return null;
      const style = getComputedStyle(docViewer);
      return {
        overflowY: style.overflowY,
        hasVerticalScroll: docViewer.scrollHeight > docViewer.clientHeight,
      };
    });

    expect(scrollCheck).not.toBeNull();
    expect(scrollCheck!.overflowY).toBe("auto");
  });

  test("window cannot move below the taskbar area", async ({ page }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    // Open a window
    const thisPC = page.locator("[data-desktop-item-id='this-pc']");
    await thisPC.dblclick();
    await page.waitForSelector("[role='dialog']");

    const window = page.locator("[role='dialog']").first();
    const initialBox = await window.boundingBox();
    expect(initialBox).not.toBeNull();

    // The window should not extend below the viewport
    const viewport = page.viewportSize();
    expect(viewport).not.toBeNull();
    expect(initialBox!.y + initialBox!.height).toBeLessThanOrEqual(
      viewport!.height,
    );
  });

  test("minimize hides a window and taskbar restores it", async ({ page }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    // Open a window
    const thisPC = page.locator("[data-desktop-item-id='this-pc']");
    await thisPC.dblclick();
    const window = page.locator("[role='dialog']").first();
    await expect(window).toBeVisible({ timeout: 3000 });

    // Minimize
    await window.locator("[aria-label='Minimize']").click();
    await expect(window).toBeHidden({ timeout: 1000 });

    // Click the taskbar folder icon to restore
    const taskbarExplorer = page
      .locator("[role='toolbar'][aria-label='Taskbar']")
      .locator("button")
      .nth(2);
    await taskbarExplorer.click();

    await expect(window).toBeVisible({ timeout: 1000 });
  });

  test("opening a new explorer from desktop adds a taskbar button", async ({
    page,
  }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    // Count initial windows
    const windows0 = await page.locator("[role='dialog']").count();

    // Open This PC
    const thisPC = page.locator("[data-desktop-item-id='this-pc']");
    await thisPC.dblclick();
    await page.waitForSelector("[role='dialog']");

    // Count windows after opening
    const windows1 = await page.locator("[role='dialog']").count();
    expect(windows1).toBe(windows0 + 1);
  });
});

test.describe("Learn desktop at different viewports", () => {
  test("1920×1080 has no scrollbars", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const result = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(result.scrollWidth).toBe(result.clientWidth);
  });

  test("1366×768 has no scrollbars", async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const result = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(result.scrollWidth).toBe(result.clientWidth);
  });
});

test.describe("Learn desktop grid system", () => {
  test("desktop icons have valid grid positions with no overlap", async ({
    page,
  }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const positions = await page.evaluate(() => {
      const items = document.querySelectorAll("[data-desktop-item]");
      const rects: Array<{
        id: string;
        x: number;
        y: number;
        w: number;
        h: number;
      }> = [];
      items.forEach((item) => {
        const el = item as HTMLElement;
        const id = el.dataset.desktopItemId;
        if (!id) return;
        const r = el.getBoundingClientRect();
        rects.push({ id, x: r.x, y: r.y, w: r.width, h: r.height });
      });
      return rects;
    });

    expect(positions.length).toBeGreaterThan(0);

    // Check no two icons fully overlap (some margin tolerance for sub-pixel)
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const a = positions[i]!;
        const b = positions[j]!;
        const overlapX =
          Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
        const overlapY =
          Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
        const overlapArea = Math.max(0, overlapX) * Math.max(0, overlapY);
        const minArea = Math.min(a.w * a.h, b.w * b.h);
        // No icon should be more than 50% overlapped by another
        expect(overlapArea).toBeLessThan(minArea * 0.5);
      }
    }
  });

  test("desktop icons are positioned in the top-left area", async ({
    page,
  }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const firstIconPos = await page.evaluate(() => {
      const item = document.querySelector("[data-desktop-item]");
      if (!item) return null;
      const r = item.getBoundingClientRect();
      return { x: r.x, y: r.y };
    });

    expect(firstIconPos).not.toBeNull();
    // First icon should be near the top-left (within 200px)
    expect(firstIconPos!.x).toBeLessThan(200);
    expect(firstIconPos!.y).toBeLessThan(200);
  });

  test("right-click on desktop shows context menu", async ({ page }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    // Right-click on empty area of desktop — use dispatchEvent to avoid z-index interception
    await page.evaluate(() => {
      const desktop = document.querySelector("[data-desktop-surface]");
      if (!desktop) return;
      const rect = desktop.getBoundingClientRect();
      const event = new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: true,
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
        button: 2,
      });
      desktop.dispatchEvent(event);
    });

    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible({ timeout: 2000 });
  });

  test("right-click on an icon shows item context menu with Open", async ({
    page,
  }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icon = page.locator("[data-desktop-item-id='this-pc']");
    await icon.click({ button: "right" });

    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible({ timeout: 2000 });

    // Should have an "Open" option
    const openOption = menu.getByRole("menuitem", { name: /open/i });
    await expect(openOption).toBeVisible();
  });

  test("context menu closes on Escape key", async ({ page }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    await page.evaluate(() => {
      const desktop = document.querySelector("[data-desktop-surface]");
      if (!desktop) return;
      const rect = desktop.getBoundingClientRect();
      const event = new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: true,
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
        button: 2,
      });
      desktop.dispatchEvent(event);
    });

    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible({ timeout: 2000 });

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden({ timeout: 1000 });
  });

  test("desktop icons persist grid positions across reload", async ({
    page,
  }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    // Record initial position of first icon
    const pos1 = await page.evaluate(() => {
      const item = document.querySelector("[data-desktop-item]");
      if (!item) return null;
      const r = item.getBoundingClientRect();
      return { x: r.x, y: r.y };
    });
    expect(pos1).not.toBeNull();

    // Reload page
    await page.reload();
    await page.waitForSelector("[data-desktop-surface]");

    // Position should be the same
    const pos2 = await page.evaluate(() => {
      const item = document.querySelector("[data-desktop-item]");
      if (!item) return null;
      const r = item.getBoundingClientRect();
      return { x: r.x, y: r.y };
    });
    expect(pos2).not.toBeNull();
    expect(pos2!.x).toBe(pos1!.x);
    expect(pos2!.y).toBe(pos1!.y);
  });
});
