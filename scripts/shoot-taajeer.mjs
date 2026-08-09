import { chromium } from "playwright";
import fs from "fs";

const OUT = process.argv[2] || "/private/tmp/claude-501/-Volumes-PortableSSD-portifolio/9ebf5ca1-474c-4ee2-a378-ca4acc32f5f4/scratchpad/shots";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/taajeer/export", { waitUntil: "networkidle", timeout: 90000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(2500);

const n = await page.locator("[data-slide]").count();
console.log("slides:", n);
for (let k = 1; k <= n; k++) {
  const el = page.locator(`#slide-${k}`);
  const id = await el.getAttribute("data-slide");
  await el.screenshot({ path: `${OUT}/${String(k).padStart(2, "0")}-${id}.png` });
  console.log("shot", k, id);
}
await browser.close();
