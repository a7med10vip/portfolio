import { chromium, devices } from "playwright";
const URL = process.env.U || "http://localhost:3000/fodi-cgm";
const b = await chromium.launch();
for (const [label, opts] of [["desktop", { viewport: { width: 1440, height: 900 } }], ["mobile", devices["iPhone 13"]]]) {
  const ctx = await b.newContext(opts);
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", e => errs.push(e.message.slice(0, 80)));
  p.on("console", m => { if (m.type() === "error" && !/_vercel/.test(m.text())) errs.push(m.text().slice(0, 80)); });
  await p.goto(URL, { waitUntil: "networkidle", timeout: 180000 });
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(async () => { const h = document.body.scrollHeight; for (let y = 0; y < h; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); } scrollTo(0, 0); });
  await p.waitForTimeout(2500);
  const r = await p.evaluate(() => {
    const t = document.body.innerText;
    return {
      sections: document.querySelectorAll("section[id^='s']").length,
      svgs: document.querySelectorAll("svg").length,
      tables: document.querySelectorAll("table").length,
      arTails: document.querySelectorAll(".ar-word-wrap").length,
      imgs: [...document.images].filter(i => i.complete && i.naturalWidth > 0).length + "/" + document.images.length,
      shadows: [...document.querySelectorAll("*")].filter(e => { const s = getComputedStyle(e).boxShadow; return s && s !== "none"; }).length,
      gradients: [...document.querySelectorAll("*")].filter(e => /linear-gradient/.test(getComputedStyle(e).backgroundImage)).length,
      diacritics: (t.match(/[ً-ْٰ]/g) || []).length,
      dashes: (t.match(/—/g) || []).length,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 2 ? "YES" : "none",
      tiny: [...document.querySelectorAll("a,button")].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.width < 44 || r.height < 44); }).length,
      height: document.body.scrollHeight,
    };
  });
  console.log("[" + label + "]", JSON.stringify(r));
  if (errs.length) console.log("  errors:", [...new Set(errs)].join(" | "));
  await ctx.close();
}
await b.close();
