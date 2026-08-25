import { chromium } from "playwright";
const b = await chromium.launch();
// A normal visitor's browser, with certificate errors NOT ignored.
const ctx = await b.newContext({ ignoreHTTPSErrors: false });
const p = await ctx.newPage();
let outcome = "loaded";
try {
  const r = await p.goto("https://career.sunbulahgroup.com/en/", { waitUntil: "domcontentloaded", timeout: 30000 });
  outcome = `HTTP ${r?.status()}`;
} catch (e) {
  outcome = "BLOCKED: " + e.message.split("\n")[0].slice(0, 120);
}
console.log("career.sunbulahgroup.com  →", outcome);

// And the SAP one the same page also links to
const p2 = await ctx.newPage();
try {
  const r = await p2.goto("https://career23.sapsf.com/career?company=foodfinepa", { waitUntil: "domcontentloaded", timeout: 40000 });
  const title = await p2.title();
  console.log("career23.sapsf.com        → HTTP", r?.status(), "| title:", title.slice(0, 70));
} catch (e) { console.log("career23.sapsf.com        → BLOCKED:", e.message.slice(0, 80)); }
await b.close();
