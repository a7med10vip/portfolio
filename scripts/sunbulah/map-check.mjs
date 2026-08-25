import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3000/sunbulah", { waitUntil: "networkidle", timeout: 150000 });
await p.evaluate(() => document.getElementById("s03").scrollIntoView({ block: "center" }));
await p.waitForTimeout(1600);
const count = () => p.evaluate(() => ({
  chips: document.querySelectorAll("[id='s03'] section button").length,
  groups: [...document.querySelectorAll("[id='s03'] section")].length,
  summary: document.querySelector("[id='s03'] p.ar-body")?.textContent.trim(),
}));
console.log("all:", JSON.stringify(await count()));
for (const label of ["معطّلة", "غير موجودة", "غير مرتبطة"]) {
  await p.click(`[id='s03'] button:has-text("${label}")`);
  await p.waitForTimeout(700);
  console.log(label + ":", JSON.stringify(await count()));
}
await b.close();
