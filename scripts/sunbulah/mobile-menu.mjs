import { chromium, devices } from "playwright";
const b = await chromium.launch();
const p = await (await b.newContext(devices["iPhone 13"])).newPage();
const errs = [];
p.on("pageerror", e => errs.push(e.message.slice(0, 70)));
await p.goto("http://localhost:3000/sunbulah", { waitUntil: "networkidle", timeout: 150000 });
await p.waitForTimeout(2200);
const bar = await p.evaluate(() => {
  const b = document.querySelector(".lg\\:hidden button");
  return b ? { label: b.textContent.trim().slice(0, 40), h: Math.round(b.getBoundingClientRect().height) } : "MISSING";
});
console.log("bar:", JSON.stringify(bar));
await p.click(".lg\\:hidden button");
await p.waitForTimeout(700);
const menu = await p.evaluate(() => {
  const overlay = [...document.querySelectorAll("div")].find(d => d.className.includes("fixed inset-0") && d.querySelector("nav"));
  const items = overlay ? [...overlay.querySelectorAll("button")] : [];
  return { items: items.length, small: items.filter(e => e.getBoundingClientRect().height < 44).length,
           first: items[0]?.textContent.trim().slice(0, 30) };
});
console.log("menu:", JSON.stringify(menu));
await p.locator(".fixed.inset-0 nav button").nth(7).click();
await p.waitForTimeout(1600);
console.log("jumped to:", await p.evaluate(() => { const y = window.scrollY; const s = [...document.querySelectorAll("section[id^='s']")].find(x => Math.abs(x.getBoundingClientRect().top) < 120); return s?.id + " @ " + Math.round(y); }));
console.log("menu closed:", await p.evaluate(() => !document.querySelector(".fixed.inset-0 nav")));
console.log("errors:", errs.join(" | ") || "none");
await b.close();
