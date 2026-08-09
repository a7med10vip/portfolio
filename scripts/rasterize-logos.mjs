/**
 * Rasterise every logo SVG to a transparent PNG.
 *
 * python-pptx can only embed raster images, so the .pptx build needs a PNG for
 * each mark. Chromium does the rendering, which means the PNG is exactly what the
 * browser shows on the web deck — same picture in both outputs.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const DIR = path.resolve("public/taajeer/logos");
const HEIGHT = 320; // render tall enough that a 60px slot is never soft

const svgs = fs.readdirSync(DIR).filter((f) => f.endsWith(".svg") && !f.startsWith("._"));
if (!svgs.length) {
  console.log("no svgs to rasterise");
  process.exit(0);
}

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });

for (const f of svgs) {
  const svg = fs.readFileSync(path.join(DIR, f), "utf8");
  const m = svg.match(/viewBox\s*=\s*"([\d.\-\s]+)"/i);
  let ratio = 3;
  if (m) {
    const [, , vw, vh] = m[1].trim().split(/[\s,]+/).map(Number);
    if (vw && vh) ratio = vw / vh;
  }
  const h = HEIGHT;
  const w = Math.max(32, Math.round(h * ratio));

  await page.setViewportSize({ width: w, height: h });
  await page.setContent(
    `<style>html,body{margin:0;background:transparent}svg{width:${w}px;height:${h}px;display:block}</style>${svg}`,
  );
  await page.waitForTimeout(120);
  const out = path.join(DIR, f.replace(/\.svg$/, ".png"));
  await page.screenshot({ path: out, omitBackground: true });
  console.log(`${f}  ->  ${path.basename(out)}  ${w}x${h}`);
}

await browser.close();
