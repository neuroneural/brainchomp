// tests/webgl2_gate.mjs
// ---------------------------------------------------------------------------
// Correctness gate for the native WebGL2 runner. Run it with:
//
//     node tests/webgl2_gate.mjs [chromium|firefox]
//
// It needs no dev server, no model weights and no GPU -- it serves the
// webgl2_runners/ modules over a throwaway static server and drives a real
// browser, which is the only authority on GLSL. Two gates:
//
//   1. LINK      every shipped model's programs, at its real channel/class
//                shape, must link. compileShader is not enough: linkProgram is
//                what validates the MRT and uniform layout, which is why
//                brainchopC's check-glsl links too.
//   2. NUMERICS  synthetic models with random weights, GPU against a scalar CPU
//                reference that reads the ORIGINAL tensors -- so packWeights()
//                is under test rather than sharing a formula with the thing it
//                is checking. Random weights and random non-zero input are the
//                point: brainchopC found a comparison against an all-zero
//                reference reporting "100% exact" and proving nothing.
//
// A model needing more draw buffers than the device offers is reported as a SKIP
// with the reason, not a failure. That is a real capability difference, not a
// defect: an M1 and an M4 Pro report 8, SwiftShader reports 6, and the 30/32
// channel models need 8. It is exactly what probeWebgl2() refuses on, which
// sends those models back to the tfjs path.
// ---------------------------------------------------------------------------

// @playwright/test rather than playwright: it is what brainchop-test already has
// in devDependencies, and it re-exports the same browser launchers.
import { chromium, firefox } from '@playwright/test';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const PORT = Number(process.env.BC_GATE_PORT || 8391);
const WHICH = (process.argv[2] || 'chromium').toLowerCase();

const PAGE = `<!doctype html><html><head><meta charset="utf-8"></head><body>
<script type="module">
import { runGate } from '/tests/webgl2_gate_page.js';
window.__run = runGate;
</script></body></html>`;

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript' };
const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url === '/' || url === '/index.html') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(PAGE);
    return;
  }
  const p = path.join(ROOT, url);
  if (!p.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
  fs.readFile(p, (err, buf) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'content-type': MIME[path.extname(p)] || 'application/octet-stream' });
    res.end(buf);
  });
});
await new Promise((r) => server.listen(PORT, r));

const launcher = WHICH === 'firefox' ? firefox : chromium;
const launchOpts = WHICH === 'firefox'
  ? { firefoxUserPrefs: { 'webgl.force-enabled': true } }
  : {
    args: [
      // Software rendering is fine here and arguably better: it is a SECOND
      // independent GLSL translator. brainchopC treats Chromium/ANGLE and
      // Firefox agreeing exactly as stronger evidence than either alone.
      '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
      '--ignore-gpu-blocklist', '--enable-webgl', '--disable-dev-shm-usage',
    ],
    ...(process.env.BC_CHROME_PATH ? { executablePath: process.env.BC_CHROME_PATH } : {}),
  };

const browser = await launcher.launch(launchOpts);
const page = await browser.newPage();
page.on('console', (m) => { if (m.text().startsWith('[gate]')) console.log('  ', m.text()); });
page.on('pageerror', (e) => console.log('   [pageerror]', e.message));

await page.goto(`http://localhost:${PORT}/`);
const { checks } = await page.evaluate(() => window.__run());

console.log(`\n  native WebGL2 runner gate -- ${WHICH}\n${'='.repeat(72)}`);
let fail = 0, skip = 0;
for (const r of checks) {
  if (r.skip) skip++;
  if (!r.ok) fail++;
  console.log(`  ${r.ok ? (r.skip ? 'skip ' : ' ok  ') : 'FAIL '} ${r.name}${r.detail ? ' -- ' + r.detail : ''}`);
}
console.log('='.repeat(72));
console.log(fail ? `\n  ${fail} check(s) FAILED\n` : `\n  all checks passed${skip ? ` (${skip} skipped)` : ''}\n`);

await browser.close();
server.close();
process.exit(fail ? 1 : 0);
