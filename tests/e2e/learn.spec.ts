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

  test("desktop context menu includes Sort By submenu", async ({ page }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    await page.locator("[data-desktop-surface]").click({ button: "right", position: { x: 400, y: 400 } });
    await expect(page.locator("[role='menu']")).toBeVisible({ timeout: 2000 });

    const sortBy = page.locator("[role='menuitem']", { hasText: "Sort by" });
    await expect(sortBy).toBeVisible();
    await expect(sortBy).toHaveAttribute("data-has-submenu", "");
  });

  test("right-click context menu appears at pointer position", async ({ page }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    await page.locator("[data-desktop-surface]").click({ button: "right", position: { x: 200, y: 300 } });
    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible({ timeout: 2000 });

    const box = await menu.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeCloseTo(200, -1);
    expect(box!.y).toBeCloseTo(300, -1);
  });

  test("desktop refresh clears stale positions", async ({ page }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const iconCount = await page.locator("[data-desktop-item]").count();
    expect(iconCount).toBeGreaterThan(0);
  });

  test("desktop icon space key selects without opening", async ({ page }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icon = page.locator("[data-desktop-item-id='this-pc']");
    await icon.focus();
    await page.keyboard.press("Space");

    await expect(icon).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("[role='dialog']")).toHaveCount(0);
  });

  test("desktop icon enter key opens folder", async ({ page }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icon = page.locator("[data-desktop-item-id='this-pc']");
    await icon.focus();
    await page.keyboard.press("Enter");

    await expect(page.locator("[role='dialog']")).toBeVisible({ timeout: 3000 });
  });

  test("file explorer space key selects file without opening", async ({ page }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const thisPC = page.locator("[data-desktop-item-id='this-pc']");
    await thisPC.dblclick();
    await expect(page.locator("[role='dialog']")).toBeVisible({ timeout: 3000 });

    const fileItem = page.locator("[role='option']").first();
    if (await fileItem.count() > 0) {
      await fileItem.click();
      await expect(fileItem).toHaveAttribute("aria-selected", "true");
    }
  });

  test("content viewer context menu uses pointer coordinates", async ({ page }) => {
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const aboutIcon = page.locator("[data-desktop-item-id='about']");
    if (await aboutIcon.count() > 0) {
      await aboutIcon.dblclick();
      await expect(page.locator("[role='dialog']")).toBeVisible({ timeout: 3000 });

      const aboutPanel = page.locator("[class*='aboutPanel']");
      if (await aboutPanel.count() > 0) {
        await aboutPanel.click({ button: "right", position: { x: 100, y: 50 } });
        await expect(page.locator("[role='menu']")).toBeVisible({ timeout: 2000 });
      }
    }
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

  test("right-click on desktop shows context menu", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const desktop = page.locator("[data-desktop-surface]");
    const desktopBox = await desktop.boundingBox();
    expect(desktopBox).not.toBeNull();

    const targetX = desktopBox!.x + desktopBox!.width / 2;
    const targetY = desktopBox!.y + desktopBox!.height / 2;

    const icons = page.locator("[data-desktop-item]");
    const count = await icons.count();
    for (let i = 0; i < count; i++) {
      const box = await icons.nth(i).boundingBox();
      if (box && targetX >= box.x && targetX <= box.x + box.width && targetY >= box.y && targetY <= box.y + box.height) {
        return;
      }
    }

    await page.mouse.click(targetX, targetY, { button: "right" });

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

    const icon = page.locator("[data-desktop-item-id='this-pc']");
    await icon.click({ button: "right" });

    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible({ timeout: 2000 });

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden({ timeout: 1000 });
  });

  test("context menu navigates with Home and End keys", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icon = page.locator("[data-desktop-item-id='this-pc']");
    await icon.click({ button: "right" });

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

test.describe("Native drag regression", () => {
  test("desktop icon button has draggable=false and blocks native dragstart", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icon = page.locator("[data-desktop-item-id='app-vscode']");
    await expect(icon).toBeVisible();

    const hasFalse = await icon.evaluate(
      (el) => (el as HTMLButtonElement).draggable === false,
    );
    expect(hasFalse).toBe(true);

    const cssBlock = await icon.evaluate((el) => {
      const img = el.querySelector("img");
      if (!img) return { pointerEvents: "none" };
      const s = window.getComputedStyle(img);
      return { pointerEvents: s.pointerEvents };
    });
    expect(cssBlock.pointerEvents).toBe("none");
  });

  test("app icon image has pointer-events none so button is the pointer target", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icon = page.locator("[data-desktop-item-id='app-vscode']");
    const imgPointerEvents = await icon.locator("img").evaluate(
      (el) => window.getComputedStyle(el).pointerEvents,
    );
    expect(imgPointerEvents).toBe("none");
  });

  test("app icon visibly follows the pointer during drag", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icon = page.locator("[data-desktop-item-id='app-vscode']");
    const box = await icon.boundingBox();
    expect(box).not.toBeNull();

    const startX = box!.x + box!.width / 2;
    const startY = box!.y + box!.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 80, startY + 120, { steps: 5 });

    await page.waitForTimeout(50);
    const midBox = await icon.boundingBox();
    expect(midBox).not.toBeNull();
    expect(midBox!.x).toBeGreaterThan(box!.x + 30);
    expect(midBox!.y).toBeGreaterThan(box!.y + 30);

    await page.mouse.up();
    await page.waitForTimeout(200);
  });

  test("dragging a folder from its SVG child works correctly", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icon = page.locator("[data-desktop-item-id='knowledge']");
    const box = await icon.boundingBox();
    expect(box).not.toBeNull();

    const imgEl = icon.locator("span").first();
    const imgBox = await imgEl.boundingBox();
    expect(imgBox).not.toBeNull();

    const startX = imgBox!.x + imgBox!.width / 2;
    const startY = imgBox!.y + imgBox!.height / 2;
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

  test("tiny drag within source cell does not move the icon", async ({
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

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 30, startY + 20, { steps: 5 });
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

    const origCol = Math.round((box!.x - padX) / (cellW + gapX));
    const origRow = Math.round((box!.y - padTop) / (cellH + gapY));
    const newCol = Math.round((newBox!.x - padX) / (cellW + gapX));
    const newRow = Math.round((newBox!.y - padTop) / (cellH + gapY));

    expect(newCol).toBe(origCol);
    expect(newRow).toBe(origRow);
  });

  test("drag to left edge keeps icon inside workspace", async ({
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

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(2, startY, { steps: 10 });
    await page.mouse.up();

    await page.waitForTimeout(200);

    const newBox = await icon.boundingBox();
    expect(newBox).not.toBeNull();
    expect(newBox!.x).toBeGreaterThanOrEqual(0);
    expect(newBox!.x + newBox!.width).toBeLessThanOrEqual(
      page.viewportSize()!.width,
    );
  });

  test("drag to bottom edge keeps icon inside workspace", async ({
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
    const viewport = page.viewportSize()!;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX, viewport.height - 5, { steps: 15 });
    await page.mouse.up();

    await page.waitForTimeout(200);

    const newBox = await icon.boundingBox();
    expect(newBox).not.toBeNull();
    expect(newBox!.y).toBeGreaterThanOrEqual(0);
    expect(newBox!.y + newBox!.height).toBeLessThanOrEqual(viewport.height);
  });
});

test.describe("Activation suppression", () => {
  test("drag does not select the item through trailing click", async ({
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

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX, startY + 150, { steps: 10 });
    await page.mouse.up();

    await page.waitForTimeout(200);

    const isSelected = await icon.evaluate(
      (el) => el.getAttribute("data-selected") === "true",
    );
    expect(isSelected).toBe(false);
  });

  test("drag does not open the item", async ({ page }, testInfo) => {
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
    await page.mouse.move(startX, startY + 150, { steps: 10 });
    await page.mouse.up();

    await page.waitForTimeout(300);

    const windows = await page.locator("[role='dialog']").count();
    expect(windows).toBe(0);
  });

  test("normal click still selects the item", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icon = page.locator("[data-desktop-item-id='this-pc']");
    await icon.click();

    const isSelected = await icon.evaluate(
      (el) => el.getAttribute("data-selected") === "true",
    );
    expect(isSelected).toBe(true);
  });

  test("normal double-click still opens the item", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icon = page.locator("[data-desktop-item-id='this-pc']");
    await icon.dblclick();

    const window = page.locator("[role='dialog']");
    await expect(window).toBeVisible({ timeout: 3000 });
  });
});

test.describe("Occupancy", () => {
  test("moving a neighboring icon does not change whether another icon is draggable", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icon1 = page.locator("[data-desktop-item-id='this-pc']");
    const icon2 = page.locator("[data-desktop-item-id='knowledge']");

    const box1 = await icon1.boundingBox();
    const box2 = await icon2.boundingBox();
    expect(box1).not.toBeNull();
    expect(box2).not.toBeNull();

    const startX2 = box2!.x + box2!.width / 2;
    const startY2 = box2!.y + box2!.height / 2;

    await page.mouse.move(startX2, startY2);
    await page.mouse.down();
    await page.mouse.move(startX2 + 200, startY2 + 100, { steps: 10 });
    await page.mouse.up();

    await page.waitForTimeout(300);

    const box1After = await icon1.boundingBox();
    expect(box1After).not.toBeNull();

    const startX1 = box1After!.x + box1After!.width / 2;
    const startY1 = box1After!.y + box1After!.height / 2;
    const originalY1 = box1After!.y;

    await page.mouse.move(startX1, startY1);
    await page.mouse.down();
    await page.mouse.move(startX1, startY1 + 150, { steps: 10 });
    await page.mouse.up();

    await page.waitForTimeout(200);

    const newBox1 = await icon1.boundingBox();
    expect(newBox1).not.toBeNull();
    expect(newBox1!.y).toBeGreaterThan(originalY1);
  });
});

test.describe("Swap on occupied target", () => {
  test("dragging icon onto occupied cell swaps positions", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icon1 = page.locator("[data-desktop-item-id='this-pc']");
    const icon2 = page.locator("[data-desktop-item-id='knowledge']");

    const box1 = await icon1.boundingBox();
    const box2 = await icon2.boundingBox();
    expect(box1).not.toBeNull();
    expect(box2).not.toBeNull();

    const startX1 = box1!.x + box1!.width / 2;
    const startY1 = box1!.y + box1!.height / 2;

    const targetX = box2!.x + box2!.width / 2;
    const targetY = box2!.y + box2!.height / 2;

    await page.mouse.move(startX1, startY1);
    await page.mouse.down();
    await page.mouse.move(targetX, targetY, { steps: 15 });
    await page.mouse.up();

    await page.waitForTimeout(300);

    const newBox1 = await icon1.boundingBox();
    const newBox2 = await icon2.boundingBox();
    expect(newBox1).not.toBeNull();
    expect(newBox2).not.toBeNull();

    const cellW = 96;
    const cellH = 108;
    const gapX = 12;
    const gapY = 12;
    const padX = 16;
    const padTop = 12;

    const col1 = Math.round((newBox1!.x - padX) / (cellW + gapX));
    const row1 = Math.round((newBox1!.y - padTop) / (cellH + gapY));
    const col2 = Math.round((newBox2!.x - padX) / (cellW + gapX));
    const row2 = Math.round((newBox2!.y - padTop) / (cellH + gapY));

    expect(col1 === col2 && row1 === row2).toBe(false);

    const overlapX = Math.min(newBox1!.x + newBox1!.width, newBox2!.x + newBox2!.width) - Math.max(newBox1!.x, newBox2!.x);
    const overlapY = Math.min(newBox1!.y + newBox1!.height, newBox2!.y + newBox2!.height) - Math.max(newBox1!.y, newBox2!.y);
    const overlapArea = Math.max(0, overlapX) * Math.max(0, overlapY);
    expect(overlapArea).toBe(0);
  });
});

test.describe("Right-click selection", () => {
  test("right-clicking a desktop icon selects it", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const icon = page.locator("[data-desktop-item-id='this-pc']");
    await icon.click({ button: "right" });

    const isSelected = await icon.evaluate(
      (el) => el.getAttribute("data-selected") === "true",
    );
    expect(isSelected).toBe(true);
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

  test("opening a nested folder navigates the same explorer window", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const thisPC = page.locator("[data-desktop-item-id='this-pc']");
    await thisPC.dblclick();
    await page.waitForSelector("[role='dialog']");

    const windows0 = await page.locator("[role='dialog']").count();

    const firstFolder = page
      .locator("[role='listbox'][aria-label='Files']")
      .locator("[role='option']")
      .first();
    await firstFolder.click({ button: "right" });

    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible({ timeout: 2000 });
    const openOption = menu.getByRole("menuitem", { name: /open/i });
    await openOption.click();

    await page.waitForTimeout(500);

    const windows1 = await page.locator("[role='dialog']").count();
    expect(windows1).toBe(windows0);
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

test.describe("App URL restoration", () => {
  test("direct ?app= URL opens the correct app window", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn?app=app-vscode");
    await page.waitForSelector("[data-desktop-surface]");

    const appWindow = page.locator("[role='dialog']");
    await expect(appWindow).toBeVisible({ timeout: 3000 });
    await expect(appWindow).toHaveAttribute("aria-label", /Visual Studio Code/i);
  });

  test("browser Back after opening app closes the app", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn?app=app-vscode");
    await page.waitForSelector("[data-desktop-surface]");

    const appWindow = page.locator("[role='dialog']");
    await expect(appWindow).toBeVisible({ timeout: 3000 });

    await page.goBack();
    await page.waitForTimeout(500);

    const windows = await page.locator("[role='dialog']").count();
    expect(windows).toBe(0);
  });
});

test.describe("File copy", () => {
  test("right-clicking a file in explorer shows Copy in context menu", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const aboutIcon = page.locator("[data-desktop-item-id='about']");
    await aboutIcon.dblclick();
    await page.waitForSelector("[role='dialog']");

    const explorer = page.locator("[role='dialog'] [role='listbox']");
    const firstItem = explorer.locator("[role='option']").first();
    await expect(firstItem).toBeVisible();

    const nodeType = await firstItem.getAttribute("data-node-type");
    expect(nodeType).toBe("file");

    await firstItem.click({ button: "right" });

    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible();

    const copyItem = menu.locator("[role='menuitem']", { hasText: "Copy" });
    await expect(copyItem).toBeVisible();
  });

  test("right-clicking a folder in explorer does NOT show Copy", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const knowledgeIcon = page.locator("[data-desktop-item-id='knowledge']");
    await knowledgeIcon.dblclick();
    await page.waitForSelector("[role='dialog']");

    const explorer = page.locator("[role='dialog'] [role='listbox']");
    const firstItem = explorer.locator("[role='option']").first();
    await expect(firstItem).toBeVisible();

    const nodeType = await firstItem.getAttribute("data-node-type");
    expect(nodeType).toBe("folder");

    await firstItem.click({ button: "right" });
    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible();
    const copyItem = menu.locator("[role='menuitem']", { hasText: "Copy" });
    await expect(copyItem).toHaveCount(0);
  });

  test("clicking Copy stores file ID in sessionStorage and shows toast", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const aboutIcon = page.locator("[data-desktop-item-id='about']");
    await aboutIcon.dblclick();
    await page.waitForSelector("[role='dialog']");

    const explorer = page.locator("[role='dialog'] [role='listbox']");
    const firstItem = explorer.locator("[role='option']").first();
    await expect(firstItem).toBeVisible();

    const fileId = await firstItem.getAttribute("data-node-id");
    expect(fileId).toBeTruthy();

    await firstItem.click({ button: "right" });
    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible();
    await menu.locator("[role='menuitem']", { hasText: "Copy" }).click();

    const toast = page.locator("[data-testid='global-toast']");
    await expect(toast).toBeVisible({ timeout: 2000 });

    const clipData = await page.evaluate(() => {
      const raw = sessionStorage.getItem("learn-clipboard");
      return raw ? JSON.parse(raw) : null;
    });
    expect(clipData).not.toBeNull();
    expect(clipData.fileId).toBe(fileId);
    expect(clipData.folderId).toBe("about");
  });

  test("file stays selected after Copy", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const aboutIcon = page.locator("[data-desktop-item-id='about']");
    await aboutIcon.dblclick();
    await page.waitForSelector("[role='dialog']");

    const explorer = page.locator("[role='dialog'] [role='listbox']");
    const firstItem = explorer.locator("[role='option']").first();
    await expect(firstItem).toBeVisible();
    await firstItem.click();

    const isSelected = await firstItem.getAttribute("aria-selected");
    expect(isSelected).toBe("true");

    await firstItem.click({ button: "right" });
    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible();
    await menu.locator("[role='menuitem']", { hasText: "Copy" }).click();

    const stillSelected = await firstItem.getAttribute("aria-selected");
    expect(stillSelected).toBe("true");
  });

  test("Ctrl+C copies the selected file", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const aboutIcon = page.locator("[data-desktop-item-id='about']");
    await aboutIcon.dblclick();
    await page.waitForSelector("[role='dialog']");

    const explorer = page.locator("[role='dialog'] [role='listbox']");
    const firstItem = explorer.locator("[role='option']").first();
    await expect(firstItem).toBeVisible();
    await firstItem.click();

    const fileId = await firstItem.getAttribute("data-node-id");
    expect(fileId).toBeTruthy();

    await page.keyboard.press("Control+c");

    const toast = page.locator("[data-testid='global-toast']");
    await expect(toast).toBeVisible({ timeout: 2000 });

    const clipData = await page.evaluate(() => {
      const raw = sessionStorage.getItem("learn-clipboard");
      return raw ? JSON.parse(raw) : null;
    });
    expect(clipData).not.toBeNull();
    expect(clipData.fileId).toBe(fileId);
  });

  test("Ctrl+C with no selection does nothing", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const aboutIcon = page.locator("[data-desktop-item-id='about']");
    await aboutIcon.dblclick();
    await page.waitForSelector("[role='dialog']");

    await page.keyboard.press("Control+c");

    const toast = page.locator("[data-testid='global-toast']");
    await expect(toast).toHaveCount(0, { timeout: 500 });

    const clipData = await page.evaluate(() => {
      const raw = sessionStorage.getItem("learn-clipboard");
      return raw ? JSON.parse(raw) : null;
    });
    expect(clipData).toBeNull();
  });
});

test.describe("Content copy and context menu quality", () => {
  test("right-click on document viewer shows Copy in context menu", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    const knowledgeIcon = page.locator("[data-desktop-item-id='knowledge']");
    await knowledgeIcon.dblclick();
    await page.waitForSelector("[role='dialog']");

    const explorer = page.locator("[role='dialog'] [role='listbox']");
    const firstItem = explorer.locator("[role='option']").first();
    await expect(firstItem).toBeVisible();

    const nodeType = await firstItem.getAttribute("data-node-type");
    if (nodeType !== "file") {
      // Navigate into a subfolder to find a file
      const folderItem = explorer.locator("[role='option'][data-node-type='folder']").first();
      if (await folderItem.isVisible()) {
        await folderItem.dblclick();
        await page.waitForTimeout(300);
      }
    }

    const fileItem = explorer.locator("[role='option'][data-node-type='file']").first();
    if (await fileItem.isVisible()) {
      await fileItem.dblclick();
      await page.waitForSelector("[role='dialog'] [data-copy-content]", { timeout: 5000 }).catch(() => {});

      const docContent = page.locator("[role='dialog'] [data-copy-content]");
      if (await docContent.isVisible()) {
        await docContent.click({ button: "right" });
        const menu = page.locator("[role='menu']");
        await expect(menu).toBeVisible();
        const copyItem = menu.locator("[role='menuitem']", { hasText: /Copy/ });
        await expect(copyItem).toBeVisible();
      }
    }
  });

  test("right-click on about panel shows Copy in context menu", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    // Open About Panel via desktop context menu
    const desktop = page.locator("[data-desktop-surface]");
    await desktop.click({ button: "right" });
    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible();
    await menu.locator("[role='menuitem']", { hasText: /About this desktop/ }).click();

    await page.waitForSelector("[role='dialog'] [data-copy-content]", { timeout: 5000 });

    const aboutContent = page.locator("[role='dialog'] [data-copy-content]");
    await expect(aboutContent).toBeVisible();

    await aboutContent.click({ button: "right" });

    const ctxMenu = page.locator("[role='menu']");
    await expect(ctxMenu).toBeVisible();

    const copyItem = ctxMenu.locator("[role='menuitem']", { hasText: /Copy/ });
    await expect(copyItem).toBeVisible();
  });

  test("right-click on app profile viewer shows Copy in context menu", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    // Open an app via Start menu or desktop icon
    const vscodeIcon = page.locator("[data-desktop-item-id='app-vscode']");
    await vscodeIcon.dblclick();

    await page.waitForSelector("[role='dialog'] [data-copy-content]", { timeout: 5000 });

    const appContent = page.locator("[role='dialog'] [data-copy-content]");
    await expect(appContent).toBeVisible();

    await appContent.click({ button: "right" });

    const ctxMenu = page.locator("[role='menu']");
    await expect(ctxMenu).toBeVisible();

    const copyItem = ctxMenu.locator("[role='menuitem']", { hasText: /Copy/ });
    await expect(copyItem).toBeVisible();
  });

  test("content Copy with no text selection is disabled", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    // Open About Panel via context menu
    const desktop = page.locator("[data-desktop-surface]");
    await desktop.click({ button: "right" });
    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible();
    await menu.locator("[role='menuitem']", { hasText: /About this desktop/ }).click();

    await page.waitForSelector("[role='dialog'] [data-copy-content]", { timeout: 5000 });

    const aboutContent = page.locator("[role='dialog'] [data-copy-content]");
    await expect(aboutContent).toBeVisible();

    await aboutContent.click({ button: "right" });

    const ctxMenu = page.locator("[role='menu']");
    await expect(ctxMenu).toBeVisible();

    const copyItem = ctxMenu.locator("[role='menuitem']", { hasText: /Copy/ });
    const isDisabled = await copyItem.getAttribute("aria-disabled");
    expect(isDisabled).toBe("true");
  });

  test("context menu closes when target window is minimized", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop-only");
    await page.goto("/en/learn");
    await page.waitForSelector("[data-desktop-surface]");

    // Open About Panel via context menu
    const desktop = page.locator("[data-desktop-surface]");
    await desktop.click({ button: "right" });
    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible();
    await menu.locator("[role='menuitem']", { hasText: /About this desktop/ }).click();

    await page.waitForSelector("[role='dialog'] [data-copy-content]", { timeout: 5000 });

    const aboutContent = page.locator("[role='dialog'] [data-copy-content]");
    await expect(aboutContent).toBeVisible();

    await aboutContent.click({ button: "right" });
    const ctxMenu = page.locator("[role='menu']");
    await expect(ctxMenu).toBeVisible();

    const minimizeBtn = page.locator("[role='dialog'] [aria-label='Minimize']");
    await minimizeBtn.click();

    await expect(ctxMenu).toHaveCount(0, { timeout: 1000 });
  });
});
