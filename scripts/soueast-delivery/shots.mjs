/**
 * Captures the public Motion Motors hosts for the delivery page.
 *
 * Only the hosts that serve real content to a stranger are in here. The admin
 * dashboard and the ops back office sit behind a staff sign-in and are supplied
 * as redacted drops instead — see public/soueast-delivery/shots/drop/.
 */
import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("public/soueast-delivery/shots/live");
fs.mkdirSync(OUT, { recursive: true });

const TARGETS = [
  { host: "site", url: "https://motionmotors.me/ar", slug: "ar-home", vp: "desktop" },
  { host: "site", url: "https://motionmotors.me/ar", slug: "ar-home", vp: "mobile" },
  { host: "site", url: "https://motionmotors.me/en", slug: "en-home", vp: "desktop" },
  { host: "site", url: "https://motionmotors.me/en/models", slug: "en-models", vp: "desktop" },
  { host: "site", url: "https://motionmotors.me/en/store", slug: "en-store", vp: "desktop" },
  { host: "site", url: "https://motionmotors.me/en/store/compare", slug: "en-compare", vp: "desktop" },
  { host: "site", url: "https://motionmotors.me/en/prices", slug: "en-prices", vp: "desktop" },
  { host: "site", url: "https://motionmotors.me/en/test-drive", slug: "en-testdrive", vp: "desktop" },
  { host: "site", url: "https://motionmotors.me/en/showrooms", slug: "en-showrooms", vp: "desktop" },
  { host: "site", url: "https://motionmotors.me/en/store", slug: "en-store", vp: "mobile" },
  { host: "site", url: "https://motionmotors.me/ar/park", slug: "ar-park", vp: "mobile" },
  { host: "showroom", url: "https://showroom.motionmotors.me/en/sales", slug: "en-sales", vp: "desktop" },
  { host: "showroom", url: "https://showroom.motionmotors.me/en/sales/showcase", slug: "en-showcase", vp: "desktop" },
  { host: "ops", url: "https://motion-motors.vercel.app/ar", slug: "ar-landing", vp: "desktop" },
  { host: "ops", url: "https://motion-motors.vercel.app/ar/lead", slug: "ar-lead", vp: "mobile" },
  { host: "ops", url: "https://motion-motors.vercel.app/ar/queue", slug: "ar-queue", vp: "desktop" },
  { host: "admin", url: "https://live.motionmotors.me/login", slug: "login", vp: "desktop" },
];

const VIEWPORTS = {
  desktop: { viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2, out: 1500 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, out: 760 },
};

const browser = await chromium.launch();
const manifest = [];

for (const t of TARGETS) {
  const v = VIEWPORTS[t.vp];
  const ctx = await browser.newContext({
    viewport: v.viewport,
    deviceScaleFactor: v.deviceScaleFactor,
    isMobile: v.isMobile ?? false,
    hasTouch: v.hasTouch ?? false,
    locale: t.slug.startsWith("ar") ? "ar-SA" : "en-US",
    timezoneId: "Asia/Riyadh",
    colorScheme: "light",
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  const name = `${t.host}-${t.slug}-${t.vp}`;
  try {
    const res = await page.goto(t.url, { waitUntil: "load", timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);

    /* Scroll the whole page first: reveal-on-scroll sections do not exist in the
       DOM's painted state until they have been seen, and lazy images do not even
       request. Freezing motion before this pass captures an empty page. */
    await page.evaluate(async () => {
      const step = Math.round(innerHeight * 0.8);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 200));
      }
      scrollTo(0, 0);
    });
    await page.waitForTimeout(1000);
    await page
      .waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 15000 })
      .catch(() => {});

    /* Now freeze, and hide the floating chrome that would otherwise sit in every
       shot: the chat launcher, the WhatsApp button, the cookie bar. */
    await page.addStyleTag({
      content: `*,*::before,*::after{animation-duration:.001s!important;animation-delay:0s!important;transition-duration:.001s!important;transition-delay:0s!important}
        html{scroll-behavior:auto!important}
        [data-chat-launcher],[aria-label*="WhatsApp" i],[aria-label*="واتساب"],[data-cookie-banner]{display:none!important}`,
    });
    await page.waitForTimeout(500);

    const raw = await page.screenshot({ animations: "disabled", caret: "hide" });
    const dest = path.join(OUT, `${name}.webp`);
    const meta = await sharp(raw).resize({ width: v.out * v.deviceScaleFactor, withoutEnlargement: true })
      .resize({ width: v.out }).webp({ quality: 74 }).toFile(dest);
    manifest.push({ name, host: t.host, url: t.url, vp: t.vp, status: res?.status() ?? 0, w: meta.width, h: meta.height, bytes: meta.size });
    console.log(`ok   ${name}  ${res?.status()}  ${(meta.size / 1024) | 0}KB  ${meta.width}x${meta.height}`);
  } catch (e) {
    console.log(`FAIL ${name}  ${e.message.split("\n")[0]}`);
  }
  await ctx.close();
}

fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify({ capturedAt: new Date().toISOString(), shots: manifest }, null, 2));
await browser.close();
console.log(`\n${manifest.length}/${TARGETS.length} captured → ${OUT}`);
