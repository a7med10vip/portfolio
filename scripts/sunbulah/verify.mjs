import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on("pageerror", e => errs.push(e.message.slice(0, 90)));
p.on("console", m => { if (m.type() === "error" && !/_vercel/.test(m.text())) errs.push(m.text().slice(0, 90)); });
await p.goto("http://localhost:3000/sunbulah", { waitUntil: "networkidle", timeout: 180000 });
await p.evaluate(() => document.fonts.ready);
await p.evaluate(async () => { const h = document.body.scrollHeight; for (let y = 0; y < h; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 110)); } scrollTo(0, 0); });
await p.waitForTimeout(3500);
const r = await p.evaluate(() => ({
  sections: [...document.querySelectorAll("section[id^='s']")].length,
  tables: document.querySelectorAll("table").length,
  tableRows: document.querySelectorAll("tbody tr").length,
  svgCharts: document.querySelectorAll(".recharts-surface").length,
  mapFilters: document.querySelectorAll("[id='s04'] button").length,
  mapGroups: document.querySelectorAll("[id='s04'] section").length,
  faIcons: document.querySelectorAll("svg[stroke='currentColor'],svg[fill='currentColor']").length,
  arTails: document.querySelectorAll(".ar-word-wrap").length,
  arHeadings: document.querySelectorAll(".ar-heading").length,
  accentUsed: getComputedStyle(document.querySelector("h1 span")).color,
  placeholders: [...document.querySelectorAll("div")].filter(d => /dashed/.test(getComputedStyle(d).borderStyle)).length,
  brandLogos: [...document.images].filter(i => /\/brand\/(sunbulah|alshifa|sary|walima)\.webp/.test(i.src)).length,
  monoText: [...document.querySelectorAll("*")].filter(e => /mono|Menlo|Courier/i.test(getComputedStyle(e).fontFamily)).length,
  shadows: [...document.querySelectorAll("*")].filter(e => { const b = getComputedStyle(e).boxShadow; return b && b !== "none"; }).length,
  nonWhiteSections: [...document.querySelectorAll("section")].filter(x => { const b = getComputedStyle(x).backgroundColor; return b !== "rgba(0, 0, 0, 0)" && b !== "rgb(255, 255, 255)"; }).length,
  totalIcons: document.querySelectorAll("svg.lucide").length,
  colouredCells: [...document.querySelectorAll("td,th,span")].filter(e => {
    const b = getComputedStyle(e).backgroundColor;
    return b && b !== "rgba(0, 0, 0, 0)" && b !== "rgb(255, 255, 255)";
  }).length,
  zebraRows: [...document.querySelectorAll("tbody tr")].filter(r => getComputedStyle(r).backgroundColor === "rgb(246, 251, 251)").length,
  overflow: document.documentElement.scrollWidth > window.innerWidth + 2 ? "YES" : "none",
  height: document.body.scrollHeight,
}));
console.log(JSON.stringify(r, null, 1));
console.log("errors:", errs.length ? [...new Set(errs)].join(" | ") : "none");
await b.close();
