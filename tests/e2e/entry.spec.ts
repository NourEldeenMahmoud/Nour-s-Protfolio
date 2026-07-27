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

test("intro can skip and moves focus", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("button", { name: "Skip intro" }).click();

  await expect(
    page.getByRole("heading", { name: "The engineering room is ready." }),
  ).toBeFocused();
  await expect(
    page.getByRole("link", { name: /Are you here to hire me/ }),
  ).toHaveAttribute("href", "/en/hire");
  await expect(
    page.getByRole("link", { name: /Are you here to learn/ }),
  ).toHaveAttribute("href", "/en/learn");
  await expect(
    page.getByRole("link", { name: /Are you here to explore my work/ }),
  ).toHaveAttribute("href", "/en/watch");
  await page.reload();
  await expect(page.getByRole("button", { name: "Skip intro" })).toBeVisible();
});

test("Replay remains skippable and does not navigate", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("button", { name: "Skip intro" }).click();
  await page.getByRole("button", { name: "Replay room intro" }).click();
  await expect(page.getByRole("button", { name: "Skip intro" })).toBeVisible();
  await page.getByRole("button", { name: "Skip intro" }).click();

  await expect(page).toHaveURL(/\/en$/);
  await expect(
    page.getByRole("heading", { name: "The engineering room is ready." }),
  ).toBeFocused();
});

test("natural completion keeps the URL and focuses the selector", async ({
  page,
}) => {
  await page.goto("/en");

  await expect(
    page.getByRole("heading", { name: "The engineering room is ready." }),
  ).toBeFocused({ timeout: 7_000 });
  await expect(page).toHaveURL(/\/en$/);
});

test("JavaScript-disabled fallback keeps all room routes", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/en");

  await expect(
    page.getByRole("link", { name: /Are you here to hire me/ }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Are you here to learn/ }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Are you here to explore my work/ }).first(),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Skip intro" })).toBeHidden();

  await context.close();
});

test("Arabic entry has RTL direction and equivalent route links", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ar");

  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(
    page.getByRole("link", { name: /هل أنت هنا لتوظيفي/ }),
  ).toHaveAttribute("href", "/ar/hire");
  await expect(
    page.getByRole("link", { name: /هل أنت هنا للتعلّم/ }),
  ).toHaveAttribute("href", "/ar/learn");
  await expect(
    page.getByRole("link", { name: /هل أنت هنا لاستكشاف أعمالي/ }),
  ).toHaveAttribute("href", "/ar/watch");
});

test("light-only intro remains available with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await expect(page.getByRole("button", { name: "Skip intro" })).toBeVisible();
});

const routeHeadings = {
  hire: /Evidence for a junior/i,
  watch: /Software built around real constraints/i,
  learn: /How the work is understood/i,
  general: /Broad range/i,
} as const;

for (const path of ["hire", "watch", "learn", "general"] as const) {
  test(`direct ${path} route bypasses the entry`, async ({ page }) => {
    await page.goto(`/en/${path}`);

    await expect(
      page.getByRole("heading", { name: routeHeadings[path] }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Skip intro" })).toHaveCount(
      0,
    );
  });
}

test("project routes are directly addressable and return to the project index", async ({
  page,
}) => {
  await page.goto("/en/projects/buildsense");
  await expect(page.getByRole("heading", { name: "BuildSense" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /All case studies/ }),
  ).toHaveAttribute("href", "/en/watch");
});

test("browser back returns from a case study to the projects path", async ({
  page,
}) => {
  await page.goto("/en/watch");
  await page.getByRole("link", { name: /Read case study: BuildSense/ }).click();
  await expect(page).toHaveURL(/projects\/buildsense/);
  await page.goBack();
  await expect(page).toHaveURL(/\/en\/watch$/);
  await expect(
    page.getByRole("heading", { name: /Software built/ }),
  ).toBeVisible();
});

test("room selection focuses a section without leaving the hub", async ({
  page,
}) => {
  await page.goto("/en");
  await page.getByRole("button", { name: "Skip intro" }).click();
  await page
    .getByRole("link", { name: /Are you here to explore my work/ })
    .click();

  await expect(page).toHaveURL(/\/en$/);
  await expect(
    page.getByRole("link", { name: /Are you here to explore my work/ }),
  ).toHaveAttribute("aria-current", "true");

  await page
    .getByRole("link", { name: /Are you here to explore my work/ })
    .click();
  await expect(
    page.getByRole("link", { name: /Are you here to explore my work/ }),
  ).not.toHaveAttribute("aria-current", "true");
});

test("failed room poster keeps static navigation available", async ({
  page,
}) => {
  await page.route("**/engineering-room-balanced-final-v2.webp", (route) =>
    route.abort(),
  );
  await page.goto("/en");

  await expect(
    page.getByRole("link", { name: /Are you here to explore my work/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Are you here to learn/ }),
  ).toBeVisible();
});
