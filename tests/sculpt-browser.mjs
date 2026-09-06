import { chromium } from "playwright";
import assert from "node:assert/strict";
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
const errors = [];
page.on("pageerror", (e) => {
  errors.push(e.message);
  console.error("PAGE ERROR", e.message);
});
page.on("console", (m) => {
  if (m.type() === "error") console.error("CONSOLE", m.text());
});
try {
  for (const reflected of [false, true]) {
    await page.goto(
      "http://127.0.0.1:5178/tests/sculpt_page.html" +
        (reflected ? "?reflected" : ""),
    );
    await page.waitForFunction(() => window.fixture?.ready, null, {
      timeout: 30000,
    });
    await page.locator("#sculptBtn").click();
    await page.waitForFunction(
      () =>
        document
          .querySelector(".sculpt-status")
          ?.textContent.startsWith("Ready"),
      null,
      { timeout: 60000 },
    );
    console.log("INIT", await page.locator(".sculpt-status").innerText());
    const canvas = page.locator(".sculpt-surface"),
      b = await canvas.boundingBox(),
      x = b.x + b.width * 0.5,
      y = b.y + b.height * 0.5;
    await page.mouse.move(x, y);
    await page.screenshot({ path: "/tmp/brainchomp-sculpt-before.png" });
    const originalCrosshair = await page.evaluate(() =>
      Array.from(fixture.nv.scene.crosshairPos),
    );
    await page.mouse.down({ button: "right" });
    await page.mouse.move(x + 40, y + 10, { steps: 6 });
    await page.mouse.up({ button: "right" });
    assert.deepEqual(
      await page.evaluate(() => Array.from(fixture.nv.scene.crosshairPos)),
      originalCrosshair,
    );
    await page.locator('[data-action="reset"]').click();
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y - 42, { steps: 12 });
    await page.mouse.up();
    await page.waitForFunction(() => !fixture.editor.busy);
    console.log("EDIT", await page.locator(".sculpt-status").innerText());
    const diff = await page.evaluate(() =>
      fixture.mask.reduce((n, v, i) => n + (v !== fixture.original[i]), 0),
    );
    assert.ok(diff > 0, `expected voxels changed, got ${diff}`);
    assert.equal(
      await page.evaluate(() =>
        fixture.mask.reduce(
          (n, v, i) => n + (fixture.brain[i] !== fixture.img[i] * v),
          0,
        ),
      ),
      0,
    );
    assert.equal(
      await page.evaluate(async () => {
        // The NVImage writer accepts RAS drawing bytes and performs one
        // native-space conversion. NiiVue 0.62 saveImage converts them twice.
        const bytes = await fixture.nv.volumes[0].saveToDisk(
          "",
          fixture.nv.drawBitmap,
        );
        const voxels = bytes.subarray(352);
        return fixture.mask.reduce((n, v, i) => n + (v !== voxels[i]), 0);
      }),
      0,
      "slice drawing must export the same storage-order mask",
    );
    const previewMs = await page
      .locator("#sculpt-panel")
      .getAttribute("data-preview-ms");
    await page.screenshot({ path: "/tmp/brainchomp-sculpt-after.png" });
    await page.locator('[data-action="undo"]').click();
    await page.waitForFunction(() => !fixture.editor.busy);
    assert.equal(
      await page.evaluate(() =>
        fixture.mask.reduce((n, v, i) => n + (v !== fixture.original[i]), 0),
      ),
      0,
    );
    await page.locator('[data-action="redo"]').click();
    await page.waitForFunction(() => !fixture.editor.busy);
    assert.equal(
      await page.evaluate(() =>
        fixture.mask.reduce((n, v, i) => n + (v !== fixture.original[i]), 0),
      ),
      diff,
    );
    await page.evaluate(() => {
      fixture.accepted = fixture.mask.slice();
    });
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y + 25, { steps: 8 });
    await page.keyboard.press("Escape");
    await page.mouse.up();
    await page.waitForFunction(() => !fixture.editor.busy);
    assert.equal(
      await page.evaluate(() =>
        fixture.mask.reduce((n, v, i) => n + (v !== fixture.accepted[i]), 0),
      ),
      0,
    );
    // Topology edits must keep the RAS drawing, canonical mask, and derived
    // intensities coherent across undo/redo and cancellation.
    await page.locator('[data-mode="scoop"]').click();
    const countBefore = await page.evaluate(() =>
      fixture.mask.reduce((n, v) => n + v, 0),
    );
    await page.mouse.click(x, y);
    await page.waitForFunction(() => !fixture.editor.busy);
    const countAfter = await page.evaluate(() =>
      fixture.mask.reduce((n, v) => n + v, 0),
    );
    assert.ok(countAfter < countBefore, "scoop must remove foreground voxels");
    assert.equal(
      await page.evaluate(async () => {
        const bytes = await fixture.nv.volumes[0].saveToDisk(
          "",
          fixture.nv.drawBitmap,
        );
        return fixture.mask.reduce(
          (n, v, i) =>
            n +
            (v !== bytes[352 + i] || fixture.brain[i] !== fixture.img[i] * v),
          0,
        );
      }),
      0,
      "scoop exports and live slices must agree with the corrected mask",
    );
    await page.locator('[data-action="undo"]').click();
    await page.waitForFunction(() => !fixture.editor.busy);
    assert.equal(
      await page.evaluate(() =>
        fixture.mask.reduce((n, v, i) => n + (v !== fixture.accepted[i]), 0),
      ),
      0,
    );
    await page.locator('[data-action="redo"]').click();
    await page.waitForFunction(() => !fixture.editor.busy);
    await page.evaluate(() => {
      fixture.cut = fixture.mask.slice();
    });
    await page.mouse.move(x + 20, y);
    await page.mouse.down();
    await page.mouse.move(x + 35, y + 20, { steps: 8 });
    await page.keyboard.press("Escape");
    await page.mouse.up();
    await page.waitForFunction(() => !fixture.editor.busy);
    assert.equal(
      await page.evaluate(() =>
        fixture.mask.reduce((n, v, i) => n + (v !== fixture.cut[i]), 0),
      ),
      0,
    );
    await page.locator('[data-control="lock"]').check();
    const anchor = await page
      .locator("#sculpt-panel")
      .getAttribute("data-anchor");
    await page.mouse.move(x + 70, y + 50);
    assert.equal(
      await page.locator("#sculpt-panel").getAttribute("data-anchor"),
      anchor,
    );
    await page.locator('[aria-label="Crosshair opacity"]').fill("0");
    assert.equal(await page.locator("[data-opacity]").innerText(), "0%");
    await page.locator('[data-mode="grab"]').click();
    assert.match(
      await page.locator(".sculpt-anchor").innerText(),
      /Surface anchor/,
    );
    await page.locator('[data-control="lock"]').uncheck();
    await page.locator('[data-action="done"]').click();
    await page.locator("#sculptBtn").click();
    await page.waitForFunction(() => !fixture.editor.busy);
    assert.equal(await page.locator('[data-action="undo"]').isEnabled(), true);
    await page.locator('[data-action="focus"]').click();
    await page.setViewportSize({ width: 700, height: 950 });
    await page.screenshot({ path: "/tmp/brainchomp-sculpt-narrow.png" });
    assert.deepEqual(errors, []);
    assert.deepEqual(await page.evaluate(() => fixture.errors), []);
    console.log(
      JSON.stringify({
        reflected,
        changedVoxels: diff,
        previewMs,
        patches: await page.evaluate(() => fixture.patches),
        errors,
      }),
    );
  }
} finally {
  await browser.close();
}
