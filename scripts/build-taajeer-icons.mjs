/**
 * Build the deck's icon set as PNGs.
 *
 * PowerPoint can embed a picture but not an inline SVG, and the deck's whole
 * premise is that the web page and the .pptx are the same picture. So every icon
 * is baked to a PNG once, in each colour it is used in, and both outputs point at
 * the same file.
 *
 * Source: lucide (ISC). Rendered by Chromium at 4x so a 28px chip stays crisp.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT = path.resolve("public/taajeer/icons");
fs.mkdirSync(OUT, { recursive: true });

// icon name -> which colours it is needed in
const COLOURS = {
  ink: "#11151A",
  bestune: "#1F242B",
  b212: "#00543C",
  souq: "#0C6CB4",
  taajeer: "#003C60",
  white: "#FFFFFF",
  muted: "#8D96A3",
  neg: "#B23A2E",
  pos: "#16785A",
};

const ICONS = [
  // research / method
  "search", "ear", "swords", "chart-no-axes-column", "clipboard-list", "microscope",
  // funnel / approach
  "eye", "target", "heart", "megaphone", "repeat", "rocket", "line-chart",
  // audience
  "users", "user", "baby", "briefcase", "mountain", "compass", "sparkles", "clock",
  // strategy
  "shield-check", "flag", "book-open", "lightbulb", "quote", "layers",
  // channels
  "play", "image", "message-circle", "video", "youtube", "facebook", "instagram",
  // misc
  "car", "wrench", "hand-coins", "map-pin", "phone", "trending-up", "trending-down",
  "circle-alert", "circle-check", "circle-minus", "arrow-right", "store", "tag",
];

const base = "https://unpkg.com/lucide-static@latest/icons";

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 4 });
await page.setViewportSize({ width: 48, height: 48 });

let made = 0;
const missing = [];

for (const name of ICONS) {
  let svg;
  try {
    const res = await fetch(`${base}/${name}.svg`);
    if (!res.ok) throw new Error(String(res.status));
    svg = (await res.text()).replace(/<!--[\s\S]*?-->/g, "").trim();
    if (!svg.startsWith("<svg")) throw new Error("not an svg");
  } catch (e) {
    missing.push(`${name} (${e.message})`);
    continue;
  }

  // lucide strokes with currentColor, so the colour comes from CSS
  for (const [key, hex] of Object.entries(COLOURS)) {
    await page.setContent(
      `<style>
         html,body{margin:0;background:transparent}
         svg{display:block;width:48px;height:48px;color:${hex};stroke-width:1.75}
       </style>${svg}`,
    );
    await page.screenshot({ path: path.join(OUT, `${name}-${key}.png`), omitBackground: true });
    made++;
  }
}

await browser.close();
console.log(`✓ ${made} icon pngs (${ICONS.length - missing.length} icons × ${Object.keys(COLOURS).length} colours) → ${OUT}`);
if (missing.length) {
  console.log("\n⚠ could not fetch:");
  missing.forEach((m) => console.log("   ", m));
}
