import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on("pageerror", e => errs.push(e.message.slice(0, 90)));
await p.goto("http://localhost:3000/soueast-delivery", { waitUntil: "networkidle", timeout: 120000 });
await p.evaluate(() => document.getElementById("s05").scrollIntoView({ block: "center" }));
await p.waitForTimeout(4000);

// how steady is the rAF cadence while the turntable is running?
const jank = await p.evaluate(() => new Promise(res => {
  const gaps = []; let last = performance.now(), n = 0;
  const step = t => { gaps.push(t - last); last = t; if (++n < 120) requestAnimationFrame(step);
    else { gaps.sort((a,b)=>a-b); res({ median: +gaps[60].toFixed(1), p95: +gaps[113].toFixed(1), worst: +gaps.at(-1).toFixed(1) }); } };
  requestAnimationFrame(step);
}));
console.log("frame gaps (ms):", jank);

const box = async () => p.evaluate(() => {
  const stage = document.querySelector("#s05 canvas").parentElement.parentElement;
  const c = document.querySelector("#s05 canvas");
  const r = stage.getBoundingClientRect(), cb = c.getBoundingClientRect();
  return { stageH: Math.round(r.height), carH: Math.round(cb.height), wheelLine: Math.round(r.bottom - cb.bottom) };
});
const rows = [];
for (const m of ["S06", "S07", "S08 DM", "S09"]) {
  await p.locator("#s05 button").filter({ hasText: m }).first().click();
  await p.waitForTimeout(2400);
  rows.push({ model: m, ...(await box()) });
}
console.table(rows);
console.log("errors:", errs.join(" | ") || "none");
await b.close();
