import { chromium, devices } from "playwright";

const TARGETS = process.argv.slice(2);
const b = await chromium.launch();

for (const url of TARGETS) {
  for (const [label, opts] of [["desktop", { viewport: { width: 1440, height: 900 } }],
                                ["mobile", devices["iPhone 13"]]]) {
    const ctx = await b.newContext(opts);
    const p = await ctx.newPage();
    let bytes = 0, reqs = 0, errs = [], bad = [];
    const byType = {};
    p.on("response", async r => {
      reqs++;
      const t = r.request().resourceType();
      try { const len = (await r.body()).length; bytes += len; byType[t] = (byType[t] || 0) + len; } catch {}
      if (r.status() >= 400) bad.push(`${r.status()} ${r.url().slice(0, 80)}`);
    });
    p.on("pageerror", e => errs.push(e.message.slice(0, 70)));
    p.on("console", m => { if (m.type() === "error") errs.push(m.text().slice(0, 70)); });

    const t0 = Date.now();
    await p.goto(url, { waitUntil: "load", timeout: 90000 }).catch(e => errs.push("GOTO " + e.message.slice(0,50)));
    const loadMs = Date.now() - t0;
    await p.waitForTimeout(2500);

    const m = await p.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0] || {};
      const lcp = performance.getEntriesByType("largest-contentful-paint").pop();
      const imgs = [...document.images];
      return {
        ttfb: Math.round(nav.responseStart || 0),
        domContentLoaded: Math.round(nav.domContentLoadedEventEnd || 0),
        lcp: lcp ? Math.round(lcp.startTime) : null,
        overflow: document.documentElement.scrollWidth > window.innerWidth + 2
          ? `${document.documentElement.scrollWidth}px in ${window.innerWidth}px` : "none",
        images: imgs.length,
        imagesNoAlt: imgs.filter(i => !i.alt || !i.alt.trim()).length,
        imagesNoDims: imgs.filter(i => !i.getAttribute("width") || !i.getAttribute("height")).length,
        oversized: imgs.filter(i => i.naturalWidth > i.clientWidth * 2 && i.clientWidth > 0).length,
        lazyImages: imgs.filter(i => i.loading === "lazy").length,
        h1: document.querySelectorAll("h1").length,
        forms: document.querySelectorAll("form").length,
        smallTapTargets: [...document.querySelectorAll("a,button")].filter(e => {
          const r = e.getBoundingClientRect(); return r.width > 0 && (r.width < 44 || r.height < 44);
        }).length,
        smallestFont: Math.min(...[...document.querySelectorAll("p,span,li,a,td")].slice(0,400)
          .map(e => parseFloat(getComputedStyle(e).fontSize)).filter(n => n > 0)),
      };
    }).catch(() => ({}));

    console.log(`\n── ${url}  [${label}]`);
    console.log(`   load ${loadMs}ms · TTFB ${m.ttfb}ms · DCL ${m.domContentLoaded}ms · LCP ${m.lcp ?? "n/a"}ms`);
    console.log(`   ${reqs} requests · ${(bytes/1024).toFixed(0)} KB total`);
    console.log(`   weight: ${Object.entries(byType).sort((a,c)=>c[1]-a[1]).slice(0,5).map(([k,v])=>`${k} ${(v/1024).toFixed(0)}KB`).join(" · ")}`);
    console.log(`   images ${m.images} (no alt ${m.imagesNoAlt} · no dimensions ${m.imagesNoDims} · oversized ${m.oversized} · lazy ${m.lazyImages})`);
    console.log(`   h1 count ${m.h1} · forms ${m.forms} · smallest font ${m.smallestFont}px · tap targets under 44px: ${m.smallTapTargets}`);
    console.log(`   horizontal overflow: ${m.overflow}`);
    if (bad.length) console.log(`   broken: ${[...new Set(bad)].slice(0,5).join(" | ")}`);
    if (errs.length) console.log(`   errors: ${[...new Set(errs)].slice(0,3).join(" | ")}`);
    await ctx.close();
  }
}
await b.close();
