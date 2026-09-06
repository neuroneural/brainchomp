import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { gunzipSync } from "node:zlib";
import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const page = await browser.newPage({
  viewport: { width: 1600, height: 1050 },
  acceptDownloads: true,
});
const errors = [];
page.on("pageerror", (e) => {
  errors.push(e.message);
  console.error("PAGE ERROR", e.message);
});
try {
  await page.goto("http://127.0.0.1:5178/");
  await page.waitForFunction(
    () => document.querySelector("#modelSelect")?.options.length > 1,
    null,
    { timeout: 60000 },
  );
  const initialCanvas = await page.locator("#gl1").boundingBox();
  assert.ok(initialCanvas.width > 100 && initialCanvas.height > 100,
    "MRI canvas must have a visible size before entering Sculpt");
  await page.screenshot({path:"/tmp/brainchomp-initial-view.png"});
  console.log("APP LOADED", initialCanvas);
  await page.locator("#modelRunButton").click();
  await page.waitForFunction(
    () => !document.querySelector("#sculptBtn").disabled,
    null,
    { timeout: 240000 },
  );
  console.log("INFERENCE FINISHED");
  await page.locator("#sculptBtn").click();
  await page.waitForFunction(
    () =>
      document.querySelector(".sculpt-status")?.textContent.startsWith("Ready"),
    null,
    { timeout: 60000 },
  );
  console.log(
    "SCULPT",
    await page.locator("#sculpt-panel").evaluate((el) => ({ ...el.dataset })),
  );
  const b = await page.locator(".sculpt-surface").boundingBox();
  const x = b.x + b.width / 2,
    y = b.y + b.height / 2;
  await page.mouse.move(x, y);
  await page.screenshot({ path: "/tmp/brainchomp-sculpt-real-before.png" });
  await page.mouse.down();
  await page.mouse.move(x, y - 35, { steps: 12 });
  await page.mouse.up();
  await page.waitForFunction(
    () => !document.querySelector('[data-action="done"]').disabled,
  );
  console.log(
    "GRAB",
    await page.locator(".sculpt-status").innerText(),
    "worker ms",
    await page.locator("#sculpt-panel").getAttribute("data-worker-ms"),
    "total ms",
    await page.locator("#sculpt-panel").getAttribute("data-preview-ms"),
  );
  await page.screenshot({ path: "/tmp/brainchomp-sculpt-real-after.png" });
  console.log(
    "UNDO ENABLED",
    await page.locator('[data-action="undo"]').isEnabled(),
  );
  assert.equal(
    await page.locator('[data-action="undo"]').isEnabled(),
    true,
    "grab must be accepted",
  );
  if (await page.locator('[data-action="undo"]').isEnabled()) {
    await page.locator('[data-action="undo"]').click();
    await page.waitForFunction(
      () => !document.querySelector('[data-action="done"]').disabled,
    );
    await page.locator('[data-action="redo"]').click();
    await page.waitForFunction(
      () => !document.querySelector('[data-action="done"]').disabled,
    );
  }
  assert.deepEqual(errors, []);
  await page.locator('[data-action="done"]').click();
  const restoredCanvas = await page.locator("#gl1").boundingBox();
  assert.ok(restoredCanvas.width > 100 && restoredCanvas.height > 100,
    "MRI canvas must retain a visible size after leaving Sculpt");
  async function download(title) {
    await page.locator("#saveBtn").click();
    const pending = page.waitForEvent("download");
    await page.locator(".save-opt").filter({ hasText: title }).click();
    const file = await pending;
    const raw = await readFile(await file.path());
    return raw[0] === 31 && raw[1] === 139 ? gunzipSync(raw) : raw;
  }
  const mask = await download("Brain mask"),
    brain = await download("Skull-stripped brain"),
    input = await download("Input volume");
  const view = (buffer) =>
    new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  function pixels(buffer) {
    const v = view(buffer),
      little = v.getInt32(0, true) === 348,
      offset = v.getFloat32(108, little),
      type = v.getInt16(70, little);
    const access = {
      2: ["getUint8", 1],
      4: ["getInt16", 2],
      8: ["getInt32", 4],
      16: ["getFloat32", 4],
      64: ["getFloat64", 8],
      512: ["getUint16", 2],
    }[type];
    assert.ok(access, `supported datatype ${type}`);
    return {
      length: (buffer.length - offset) / access[1],
      at: (i) => v[access[0]](offset + i * access[1], little),
    };
  }
  const m = pixels(mask),
    brainPixels = pixels(brain),
    i = pixels(input);
  assert.equal(m.length, i.length);
  assert.equal(brainPixels.length, i.length);
  let mismatches = 0;
  for (let j = 0; j < m.length; j++)
    if (brainPixels.at(j) !== i.at(j) * m.at(j)) mismatches++;
  assert.equal(
    mismatches,
    0,
    "exported brain must equal input times corrected mask",
  );
  console.log("EXPORT PARITY", m.length, "voxels,", mismatches, "mismatches");
  console.log(
    "METRICS",
    await page.locator("#sculpt-panel").evaluate((el) => ({ ...el.dataset })),
  );
  console.log("ERRORS", errors);
} finally {
  await browser.close();
}
