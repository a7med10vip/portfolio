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
  treeNodes: document.querySelectorAll("[id='s03'] button").length,
  arTails: document.querySelectorAll(".ar-word-wrap").length,
  arHeadings: document.querySelectorAll(".ar-heading").length,
  accentUsed: getComputedStyle(document.querySelector("h1 span")).color,
  starIcons: [...document.querySelectorAll("svg.lucide")].filter(s => /sparkle|star/i.test(s.getAttribute("class") || "")).length,
  totalIcons: document.querySelectorAll("svg.lucide").length,
  overflow: document.documentElement.scrollWidth > window.innerWidth + 2 ? "YES" : "none",
  height: document.body.scrollHeight,
}));
console.log(JSON.stringify(r, null, 1));
console.log("errors:", errs.length ? [...new Set(errs)].join(" | ") : "none");
await b.close();
