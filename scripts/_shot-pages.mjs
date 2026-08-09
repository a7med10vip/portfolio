import { chromium } from "playwright";
import fs from "fs";

const OUT = "/private/tmp/claude-501/-Volumes-PortableSSD-portifolio/9ebf5ca1-474c-4ee2-a378-ca4acc32f5f4/scratchpad/pages";
fs.mkdirSync(OUT, { recursive: true });

const routes = process.argv.slice(2);
const browser = await chromium.launch();

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  try {
    await page.goto(`http://localhost:3000/${route}`, { waitUntil: "networkidle", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2500);
    // dismiss any onboarding tour / overlay
    for (const t of ["Skip", "Close", "Got it", "×"]) {
      const b = page.getByText(t, { exact: true }).first();
      try { if (await b.isVisible({ timeout: 400 })) await b.click({ timeout: 800 }); } catch {}
    }
    await page.waitForTimeout(1200);
    // scroll through so lazy/scroll-triggered content paints
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1500);
    const name = route.replace(/\//g, "-");
    await page.screenshot({ path: `${OUT}/${name}-top.png` });
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2.2));
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${OUT}/${name}-mid.png` });
    console.log("shot", route);
  } catch (e) {
    console.log("FAIL", route, e.message.split("\n")[0]);
  }
  await page.close();
}
await browser.close();
