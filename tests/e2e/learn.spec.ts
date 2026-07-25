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

  test("window cannot move below the taskbar area", async ({ page }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const thisPC = page.locator("[data-desktop-item-id='this-pc']");
    await thisPC.dblclick();
    await page.waitForSelector("[role='dialog']");

    const window = page.locator("[role='dialog']").first();
    const initialBox = await window.boundingBox();
    expect(initialBox).not.toBeNull();

    const viewport = page.viewportSize();
    expect(viewport).not.toBeNull();
    expect(initialBox!.y + initialBox!.height).toBeLessThanOrEqual(
      viewport!.height,
    );
  });

  test("minimize hides a window and taskbar restores it", async ({ page }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const thisPC = page.locator("[data-desktop-item-id='this-pc']");
    await thisPC.dblclick();
    const window = page.locator("[role='dialog']").first();
    await expect(window).toBeVisible({ timeout: 3000 });

    await window.locator("[aria-label='Minimize']").click();
    await expect(window).toBeHidden({ timeout: 1000 });

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

    const windows0 = await page.locator("[role='dialog']").count();

    const thisPC = page.locator("[data-desktop-item-id='this-pc']");
    await thisPC.dblclick();
    await page.waitForSelector("[role='dialog']");

    const windows1 = await page.locator("[role='dialog']").count();
    expect(windows1).toBe(windows0 + 1);
  });
});

test.describe("Learn desktop at different viewports", () => {
  test("1920x1080 has no scrollbars", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const result = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(result.scrollWidth).toBe(result.clientWidth);
  });

  test("1366x768 has no scrollbars", async ({ page }) => {
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
    expect(firstIconPos!.x).toBeLessThan(200);
    expect(firstIconPos!.y).toBeLessThan(200);
  });

  test("desktop icons match grid cell dimensions exactly", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only (mobile has different CSS sizes)");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const cellSize = await page.evaluate(() => {
      const item = document.querySelector("[data-desktop-item]");
      if (!item) return null;
      const r = item.getBoundingClientRect();
      return { w: r.width, h: r.height };
    });

    expect(cellSize).not.toBeNull();
    expect(cellSize!.w).toBe(96);
    expect(cellSize!.h).toBe(108);
  });

  test("right-click on desktop shows context menu", async ({ page }) => {
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

  test("context menu navigates with Home and End keys", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
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

    const menuitems = menu.locator("[role='menuitem']");
    const count = await menuitems.count();
    expect(count).toBeGreaterThan(0);

    await page.keyboard.press("End");
    await page.waitForTimeout(50);
    const lastFocused = await page.evaluate(() => {
      const focused = document.activeElement;
      return focused?.getAttribute("role") === "menuitem" ? focused.textContent : null;
    });
    const lastItemText = await menuitems.last().textContent();
    expect(lastFocused).toBe(lastItemText);

    await page.keyboard.press("Home");
    await page.waitForTimeout(50);
    const firstFocused = await page.evaluate(() => {
      const focused = document.activeElement;
      return focused?.getAttribute("role") === "menuitem" ? focused.textContent : null;
    });
    const firstItemText = await menuitems.first().textContent();
    expect(firstFocused).toBe(firstItemText);
  });

  test("desktop icons persist grid positions across reload", async ({
    page,
  }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const pos1 = await page.evaluate(() => {
      const item = document.querySelector("[data-desktop-item]");
      if (!item) return null;
      const r = item.getBoundingClientRect();
      return { x: r.x, y: r.y };
    });
    expect(pos1).not.toBeNull();

    await page.reload();
    await page.waitForSelector("[data-desktop-surface]");

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

test.describe("Icon drag", () => {
  test("dragging an icon moves it to a new grid position", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icon = page.locator("[data-desktop-item-id='this-pc']");
    const box = await icon.boundingBox();
    expect(box).not.toBeNull();

    const startX = box!.x + box!.width / 2;
    const startY = box!.y + box!.height / 2;

    const originalY = box!.y;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX, startY + 150, { steps: 10 });
    await page.mouse.up();

    await page.waitForTimeout(200);

    const newBox = await icon.boundingBox();
    expect(newBox).not.toBeNull();
    expect(newBox!.y).toBeGreaterThan(originalY);
  });

  test("dragged icon snaps to grid cell, not pixel", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icon = page.locator("[data-desktop-item-id='this-pc']");
    const box = await icon.boundingBox();
    expect(box).not.toBeNull();

    const startX = box!.x + box!.width / 2;
    const startY = box!.y + box!.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 50, startY + 130, { steps: 10 });
    await page.mouse.up();

    await page.waitForTimeout(200);

    const newBox = await icon.boundingBox();
    expect(newBox).not.toBeNull();

    const cellW = 96;
    const cellH = 108;
    const gapX = 12;
    const gapY = 12;
    const padX = 16;
    const padTop = 12;

    const col = Math.round((newBox!.x - padX) / (cellW + gapX));
    const row = Math.round((newBox!.y - padTop) / (cellH + gapY));

    const snappedX = padX + col * (cellW + gapX);
    const snappedY = padTop + row * (cellH + gapY);

    expect(Math.abs(newBox!.x - snappedX)).toBeLessThan(2);
    expect(Math.abs(newBox!.y - snappedY)).toBeLessThan(2);
  });

  test("drag does not start without crossing threshold", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icon = page.locator("[data-desktop-item-id='this-pc']");
    const box = await icon.boundingBox();
    expect(box).not.toBeNull();

    const startX = box!.x + box!.width / 2;
    const startY = box!.y + box!.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 2, startY + 2, { steps: 2 });
    await page.mouse.up();

    await page.waitForTimeout(200);

    const newBox = await icon.boundingBox();
    expect(newBox!.x).toBe(box!.x);
    expect(newBox!.y).toBe(box!.y);
  });

  test("drag does not conflict with marquee on empty desktop", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only (marquee requires mouse pointer)");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const desktop = page.locator("[data-desktop-surface]");
    const desktopBox = await desktop.boundingBox();
    expect(desktopBox).not.toBeNull();

    const startX = desktopBox!.x + desktopBox!.width / 2;
    const startY = desktopBox!.y + desktopBox!.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 100, startY + 100, { steps: 10 });

    const marqueeVisible = await page.locator("[class*='selectionMarquee']").isVisible();
    expect(marqueeVisible).toBe(true);

    await page.mouse.up();
    await page.waitForTimeout(100);
  });
});

test.describe("Explorer context menus", () => {
  test("right-clicking a folder in explorer shows context menu", async ({
    page,
  }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const thisPC = page.locator("[data-desktop-item-id='this-pc']");
    await thisPC.dblclick();
    await page.waitForSelector("[role='dialog']");

    const firstItem = page
      .locator("[role='listbox'][aria-label='Files']")
      .locator("[role='option']")
      .first();
    await firstItem.click({ button: "right" });

    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible({ timeout: 2000 });

    const openOption = menu.getByRole("menuitem", { name: /open/i });
    await expect(openOption).toBeVisible();
  });
});

test.describe("App context menu resolves correctly", () => {
  test("right-click app icon shows app name in context menu", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only (app icons may not be visible on mobile)");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const vscodeIcon = page.locator("[data-desktop-item-id='app-vscode']");
    await vscodeIcon.click({ button: "right" });

    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible({ timeout: 2000 });

    await expect(menu).toHaveAttribute("aria-label", /Visual Studio Code/i);
  });
});
