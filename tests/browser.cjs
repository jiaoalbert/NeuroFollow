// Optional integration test: requires a separately available Playwright and Chromium.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const cases = require("./cases.cjs");
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:3000");
    assert.equal(await page.locator(".card").count(), 12);
    for (const [id, values] of Object.entries(cases)) {
      await page.locator(`.card[data-topic="${id}"]`).click();
      assert.equal(await page.locator("select").first().inputValue(), "");
      for (const [key, value] of Object.entries(values)) {
        const field = page.locator(`[name="${key}"]`);
        if ((await field.evaluate((e) => e.tagName)) === "SELECT")
          await field.selectOption(String(value));
        else await field.fill(String(value));
      }
      await page.locator(".primary").click();
      await page.locator(".recommendation-section").first().waitFor();
      assert.equal(
        await page.locator(".recommendation-section").count(),
        3,
        id,
      );
      assert.ok(await page.locator(".branch-sources a").count(), id);
      if (id === "pineal") {
        await page
          .getByRole("button", { name: "Sources ↗", exact: true })
          .click();
        await page.locator(".verification.verified").waitFor();
        await page
          .getByRole("button", { name: "Recommendation", exact: true })
          .click();
        assert.equal(await page.locator('[name="size"]').inputValue(), "11");
        assert.match(
          await page.locator(".result").innerText(),
          /No further imaging evaluation/,
        );
        await page.locator('[name="size"]').fill("15");
        assert.equal(
          await page.locator(".result").count(),
          0,
          "stale result must clear",
        );
        await page.locator(".primary").click();
        assert.match(await page.locator(".result").innerText(), /6–12 months/);
        await page.locator('[name="structure"]').selectOption("nonsimple");
        await page.locator('[name="size"]').fill("9");
        await page.locator('[name="modality"]').selectOption("CT");
        await page.locator(".primary").click();
        assert.match(
          await page.locator(".result").innerText(),
          /No further imaging evaluation/,
        );
        await page.locator('[name="modality"]').selectOption("MRI");
        await page.locator(".primary").click();
        assert.match(await page.locator(".result").innerText(), /6 months/);
      }
      await page.locator("#close").click();
    }
    await page.locator('.card[data-topic="aneurysm"]').click();
    await page.locator("#reset-case").click();
    await page.locator('[name="emergency"]').selectOption("yes");
    await page
      .getByRole("heading", { name: "Urgent clinical assessment" })
      .waitFor();
    await page.locator("#close").click();
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    await page.locator('.card[data-topic="pineal"]').click();
    assert.equal(await page.locator('[name="size"]').inputValue(), "9");
    assert.equal(
      await page.evaluate(
        () =>
          document.querySelector("dialog").scrollWidth >
          document.querySelector("dialog").clientWidth,
      ),
      false,
    );
    await page.screenshot({
      path: "/tmp/neurofollow-updated-mobile.png",
      fullPage: true,
    });
    await page.locator("#close").click();
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.screenshot({
      path: "/tmp/neurofollow-updated-desktop.png",
      fullPage: true,
    });
    assert.deepEqual(errors, []);
    console.log(
      "Browser checks passed: all 12 tailored forms, complete results/citations, tab preservation, input invalidation, MRI/CT branching, immediate acute alert, mobile layout.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
