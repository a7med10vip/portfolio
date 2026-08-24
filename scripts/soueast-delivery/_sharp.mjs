import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 950 }, deviceScaleFactor: 2 });
let lg = 0, sm = 0, bytes = 0;
p.on("response", async r => {
  const u = r.url();
  if (!u.includes("/showcase/")) return;
  if (u.includes("/lg/")) lg++; else sm++;
  try { bytes += (await r.body()).length; } catch {}
});
await p.goto("http://localhost:3100/soueast-delivery", { waitUntil: "load", timeout: 120000 });
await p.evaluate(() => document.getElementById("s05").scrollIntoView({ block: "center" }));
for (const t of [4000, 8000, 8000, 8000]) {
  await p.waitForTimeout(t);
  const st = await p.evaluate(() => {
    const c = document.querySelector("#s05 canvas");
    return { backing: c.width + "x" + c.height, css: Math.round(c.clientWidth) + "x" + Math.round(c.clientHeight),
             caption: document.querySelector("#s05 p:last-of-type")?.textContent?.trim().slice(0, 90) };
  });
  console.log(`sm=${sm} lg=${lg} ${(bytes/1e6).toFixed(1)}MB  canvas ${st.backing} (css ${st.css})`);
  console.log("  ", st.caption);
}
await b.close();
