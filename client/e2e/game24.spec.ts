import { expect, test, type Page } from "playwright/test";

async function openGame(page: Page, mode = "zen") {
  await page.goto("/games/24?deal=6,6,6,6&seed=1");
  // Remove presentation animations so assertions concern game behavior.
  await page.addStyleTag({ content: "*, *::before, *::after { animation: none !important; transition: none !important; }" });
  await page.getByTestId(`mode-${mode}`).click();
}

test("reveal shortcuts preserve focused Help, checkbox and Menu controls", async ({ page }) => {
  await openGame(page);
  await page.keyboard.press("a");
  await page.getByTestId("nav-help").focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("help")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("reveal")).toBeVisible();
  const toggle = page.getByTestId("toggle-solutions");
  await toggle.focus();
  await page.keyboard.press("Space");
  await expect(toggle).not.toBeChecked();
  await page.getByRole("button", { name: "← Menu", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("mode-zen")).toBeVisible();
});

test("Help contains focus, blocks covered controls and restores its trigger", async ({ page }) => {
  await openGame(page);
  const help = page.getByTestId("help");
  const trigger = page.getByTestId("nav-help");
  await trigger.click();
  await expect(help.getByRole("button", { name: "Close" })).toBeFocused();
  for (let i = 0; i < 12; i++) await page.keyboard.press("Tab");
  await expect(help.getByRole("button", { name: "Close" })).toBeFocused();
  await page.keyboard.press("a");
  await page.keyboard.press("n");
  await expect(page.getByTestId("stat-solved")).toHaveText("0");
  await expect(page.getByTestId("reveal")).not.toBeVisible();
  await page.keyboard.press("Enter");
  await expect(help).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("game shortcuts and native Next activation still work between puzzles", async ({ page }) => {
  await openGame(page);
  await page.keyboard.press("a");
  await expect(page.getByTestId("next")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("reveal")).not.toBeVisible();
  await expect(page.getByTestId("stat-solved")).toHaveText("1");
  await page.keyboard.press("n");
  await expect(page.getByTestId("reveal-headline")).toHaveText("No points");
  await page.keyboard.press("Space");
  await expect(page.getByTestId("reveal")).not.toBeVisible();
});

test("Help pauses and resumes the remaining solution countdown", async ({ page }) => {
  await page.clock.install();
  await openGame(page, "clock");
  await page.keyboard.press("a");
  // 6,6,6,6 has two solutions, so its reveal lasts six seconds.
  await page.clock.runFor(2000);
  await page.getByTestId("nav-help").click();
  const timeLeft = await page.getByTestId("stat-time").textContent();
  await page.clock.runFor(20_000);
  await expect(page.getByTestId("reveal")).toBeVisible();
  await expect(page.getByTestId("stat-time")).toHaveText(timeLeft!);
  await page.keyboard.press("Escape");
  await page.clock.runFor(2000);
  await expect(page.getByTestId("reveal")).toBeVisible();
  await page.clock.runFor(2500);
  await expect(page.getByTestId("reveal")).not.toBeVisible();
});

test("Help also pauses auto-advance when solutions are disabled", async ({ page }) => {
  const time = new Date("2026-10-22T12:00:00Z");
  await page.clock.install({ time });
  await page.clock.pauseAt(time);
  await openGame(page, "clock");
  await page.getByTestId("toggle-solutions").uncheck();
  await page.keyboard.press("Tab");
  // Focus the board rather than leaving the shortcut on the checkbox.
  await page.getByTestId("tile-0").focus();
  await page.keyboard.press("a");
  await page.getByTestId("nav-help").click();
  await page.clock.runFor(20_000);
  await expect(page.getByTestId("reveal")).toBeVisible();
  await expect(page.getByTestId("stat-time")).toHaveText("2:10");
  await page.keyboard.press("Escape");
  await page.clock.runFor(700);
  await expect(page.getByTestId("reveal")).not.toBeVisible();
});

test("mobile players can change and persist the solutions setting", async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 851 });
  await openGame(page);
  const toggle = page.getByTestId("toggle-solutions");
  await expect(toggle).toBeVisible();
  await toggle.uncheck();
  await page.reload();
  await page.getByTestId("mode-zen").click();
  await expect(toggle).not.toBeChecked();
  await toggle.check();
  await expect(toggle).toBeChecked();
});

test("navigation drawer shortcuts neither play nor undo the board", async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 851 });
  await openGame(page);
  await page.getByTestId("tile-0").click();
  await page.getByTestId("op-+").click();
  await page.getByTestId("tile-1").click();
  await page.getByRole("button", { name: "Toggle menu" }).click();
  await page.keyboard.press("a");
  await page.keyboard.press("n");
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("status")).toHaveText("6 + 6 = 12");
  await expect(page.getByTestId("stat-solved")).toHaveText("0");
  await expect(page.getByTestId("reveal")).not.toBeVisible();
});

for (const action of ["solve", "skip", "done"] as const) {
  test(`${action} accounts for the partial interval before changing phase`, async ({ page }) => {
    const time = new Date("2026-10-22T12:00:00Z");
    await page.clock.install({ time });
    await page.clock.pauseAt(time);
    await openGame(page, "clock");
    await page.clock.runFor(90);
    if (action === "solve") await page.keyboard.press("a");
    else await page.getByTestId(action).click();
    if (action !== "done") {
      await page.getByTestId("next").click();
      await page.getByTestId("done").click();
    }
    await expect(page.getByTestId("final-score")).toHaveText(action === "solve" ? "149" : action === "skip" ? "99" : "119");
    if (action === "solve") await expect(page.getByTestId("history")).toContainText("0.1s");
  });
}
