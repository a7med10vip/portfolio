import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1120, height: 700 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:3000/sunbulah", { waitUntil: "networkidle", timeout: 150000 });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(2800);
for (const y of process.argv.slice(2).map(Number)) {
  await p.evaluate(v => scrollTo(0, v), y);
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `/private/tmp/claude-501/-Users-ahmedali-portifolio/9e3cfd18-751c-4e92-8d85-57099fa60161/scratchpad/sb${y}.png` });
}
await b.close();
