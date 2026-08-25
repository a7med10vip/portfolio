import { chromium, devices } from "playwright";
const b = await chromium.launch();
for (const [label, opts] of [["desktop", { viewport: { width: 1440, height: 900 } }],
                              ["mobile", devices["iPhone 13"]]]) {
  const ctx = await b.newContext(opts);
  const p = await ctx.newPage();
  await p.goto("http://localhost:3000/sunbulah", { waitUntil: "networkidle", timeout: 150000 });
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(async () => { const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } scrollTo(0, 0); });
  await p.waitForTimeout(2500);
  const r = await p.evaluate(() => {
    const vw = window.innerWidth;
    const all = [...document.querySelectorAll("h1,h2,h3,h4,p,li,span,pre,figcaption,article,div")];
    const clipped = all.filter(e => e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflowX === "visible"
      && e.clientWidth > 0 && e.textContent.trim().length > 4);
    const outside = all.filter(e => { const r = e.getBoundingClientRect();
      return r.width > 0 && (r.right > vw + 2 || r.left < -2); });
    const fontsLoaded = [...document.fonts].filter(f => f.status === "loaded").map(f => f.family);
    return {
      overflowX: document.documentElement.scrollWidth > vw + 2 ? document.documentElement.scrollWidth : "none",
      clipped: clipped.slice(0, 4).map(e => e.tagName + ": " + e.textContent.trim().slice(0, 40)),
      outsideViewport: outside.slice(0, 4).map(e => e.tagName + ": " + e.textContent.trim().slice(0, 32)),
      arabicFonts: [...new Set(fontsLoaded.filter(f => /Ahmed/.test(f)))],
      smallestFont: Math.min(...all.slice(0, 500).map(e => parseFloat(getComputedStyle(e).fontSize)).filter(n => n > 0)),
      tinyTapTargets: [...document.querySelectorAll("a,button")].filter(e => {
        const r = e.getBoundingClientRect(); return r.width > 0 && (r.width < 44 || r.height < 44); }).length,
      firstDirLtr: [...document.querySelectorAll(".ltr")].length,
    };
  });
  console.log(`\n[${label}] ${JSON.stringify(r, null, 1)}`);
  await ctx.close();
}
await b.close();
