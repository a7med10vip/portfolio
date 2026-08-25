import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [], bad = [];
p.on("pageerror", e => errs.push(e.message.slice(0, 90)));
p.on("console", m => { if (m.type() === "error" && !/_vercel/.test(m.text())) errs.push(m.text().slice(0, 90)); });
p.on("response", r => { if (r.status() >= 400 && !/_vercel/.test(r.url())) bad.push(`${r.status()} ${r.url().slice(-52)}`); });
await p.goto("http://localhost:3000/sunbulah", { waitUntil: "networkidle", timeout: 150000 });
await p.evaluate(() => document.fonts.ready);
await p.evaluate(async () => { const h = document.body.scrollHeight; for (let y = 0; y < h; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); } scrollTo(0, 0); });
await p.waitForTimeout(3000);
const r = await p.evaluate(() => {
  const h1 = document.querySelector("h1");
  return {
    dir: document.documentElement.dir, lang: document.documentElement.lang,
    title: document.title,
    headingFont: getComputedStyle(h1).fontFamily,
    bodyFont: getComputedStyle(document.body).fontFamily,
    h1: h1?.textContent.trim(),
    sections: [...document.querySelectorAll("section[id^='s']")].map(s => s.id),
    height: document.body.scrollHeight,
    overflow: document.documentElement.scrollWidth > window.innerWidth + 2 ? `${document.documentElement.scrollWidth}` : "none",
    imgs: [...document.images].map(i => i.complete && i.naturalWidth > 0),
    findings: document.querySelectorAll("article").length,
  };
});
console.log(JSON.stringify({ ...r, imgs: `${r.imgs.filter(Boolean).length}/${r.imgs.length} loaded` }, null, 1));
console.log("broken:", bad.length ? [...new Set(bad)].join(" | ") : "none");
console.log("errors:", errs.length ? [...new Set(errs)].join(" | ") : "none");
await b.close();
