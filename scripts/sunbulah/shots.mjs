import { chromium, devices } from "playwright";
import sharp from "sharp";
import fs from "node:fs";
const OUT = "public/sunbulah/audit";
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch();
const T = [
  ["group-home", "https://www.sunbulahgroup.com/", "desktop"],
  ["group-home", "https://www.sunbulahgroup.com/", "mobile"],
  ["group-about", "https://www.sunbulahgroup.com/aboutus/overview.html", "desktop"],
  ["group-products", "https://www.sunbulahgroup.com/products.html", "desktop"],
  ["group-careers", "https://www.sunbulahgroup.com/careers.html", "desktop"],
  ["group-arabic", "https://www.sunbulahgroup.com/arabic/", "desktop"],
  ["consumer-home", "https://www.sunbulah.com/", "desktop"],
  ["almarai-home", "https://www.almarai.com/en/", "desktop"],
];
for (const [name, url, vp] of T) {
  const ctx = await b.newContext(vp === "mobile" ? devices["iPhone 13"]
    : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  try {
    await p.goto(url, { waitUntil: "load", timeout: 60000 });
    await p.evaluate(() => document.fonts.ready);
    await p.evaluate(async () => { const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } scrollTo(0, 0); });
    await p.waitForTimeout(1500);
    const raw = await p.screenshot({ animations: "disabled" });
    const dest = `${OUT}/${name}-${vp}.webp`;
    const i = await sharp(raw).resize({ width: vp === "mobile" ? 760 : 1500 }).webp({ quality: 76 }).toFile(dest);
    console.log(`ok  ${name}-${vp}  ${i.width}x${i.height}  ${(i.size/1024)|0}KB`);
  } catch (e) { console.log(`FAIL ${name}-${vp}: ${e.message.slice(0,70)}`); }
  await ctx.close();
}
await b.close();
