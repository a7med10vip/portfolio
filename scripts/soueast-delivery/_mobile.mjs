import { chromium } from "playwright";
import fs from "node:fs";
const OUT = "/private/tmp/claude-501/-Users-ahmedali-portifolio/9e3cfd18-751c-4e92-8d85-57099fa60161/scratchpad/self";
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch();
const calm = process.argv.includes("--calm");
const ctx = await b.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
  reducedMotion: calm ? "reduce" : "no-preference",
});
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", e => errs.push(e.message.slice(0,120)));
await p.goto("http://localhost:3000/soueast-delivery", { waitUntil: "networkidle", timeout: 120000 });
await p.waitForTimeout(3000);
const over = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1
  ? `${document.documentElement.scrollWidth} > ${window.innerWidth}` : "none");
console.log("horizontal overflow:", over, "| errors:", errs.join(";") || "none");
for (const y of process.argv.slice(2).filter(a => !a.startsWith("--")).map(Number)) {
  await p.evaluate(v => scrollTo(0, v), y);
  await p.waitForTimeout(1400);
  await p.screenshot({ path: `${OUT}/m${calm ? "-calm" : ""}-${y}.png` });
}
await b.close();
