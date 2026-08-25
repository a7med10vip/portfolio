import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on("pageerror", e => errs.push(e.message.slice(0, 80)));
await p.goto("http://localhost:3000/sunbulah", { waitUntil: "networkidle", timeout: 150000 });
await p.waitForTimeout(2500);
await p.click('button[aria-label="افتح مرشد الوثيقة"]');
await p.waitForTimeout(1200);
const welcome = await p.evaluate(() => {
  const d = document.querySelector('[role=dialog], .sb-chat') || document.body;
  return {
    heading: [...d.querySelectorAll(".ar-heading")].map(e => e.textContent.trim()).slice(0, 3),
    photos: [...d.querySelectorAll("img")].map(i => i.src.split("/").pop()),
    topics: [...d.querySelectorAll(".ar-heading")].length,
    startBtn: [...d.querySelectorAll("button")].map(x => x.textContent.trim()).find(t => t.includes("ابدأ")) || "MISSING",
    hasInput: !!d.querySelector("input"),
  };
});
console.log("WELCOME:", JSON.stringify(welcome, null, 1));
await p.click("text=ابدأ المحادثة");
await p.waitForTimeout(900);
console.log("after start, input present:", await p.evaluate(() => !!document.querySelector('.sb-chat input')));
console.log("errors:", errs.join(" | ") || "none");
await b.close();
