import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on("pageerror", e => errs.push(e.message.slice(0, 90)));
p.on("console", m => { if (m.type() === "error" && !/_vercel/.test(m.text())) errs.push(m.text().slice(0, 90)); });
await p.goto("http://localhost:3000/soueast-delivery", { waitUntil: "networkidle", timeout: 120000 });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(2500);

const r = await p.evaluate(() => {
  const h1 = document.querySelector("h1");
  const heads = [...document.querySelectorAll("h2, h3, h4")].map(e => e.textContent.trim());
  const btns = [...document.querySelectorAll("#top a")].map(a => a.textContent.trim());
  const car = document.querySelector(".sd-parallax")?.getBoundingClientRect();
  const firstBtn = document.querySelector("#top a")?.getBoundingClientRect();
  return {
    h1: h1?.textContent.trim(),
    h1LineHeight: getComputedStyle(h1).lineHeight,
    h1FontSize: getComputedStyle(h1).fontSize,
    headingFont: getComputedStyle(h1).fontFamily,
    heads: heads.slice(0, 12),
    btns,
    gapCarToButtons: firstBtn && car ? Math.round(firstBtn.top - car.bottom) : null,
    shadows: [...document.querySelectorAll("*")].filter(e => {
      const s = getComputedStyle(e).boxShadow; return s && s !== "none";
    }).length,
    dashes: (document.body.innerText.match(/—/g) || []).length,
    greyText: [...document.querySelectorAll("p, li, span, td")].filter(e => {
      const o = parseFloat(getComputedStyle(e).opacity);
      return o > 0 && o < 0.95 && e.textContent.trim().length > 3;
    }).length,
    sections: [...document.querySelectorAll("section[id^='s']")].map(s => s.id),
  };
});
console.log(JSON.stringify(r, null, 1));
console.log("\nERRORS:", errs.length ? errs.join(" | ") : "none");
await b.close();
