/* Server-side rendering of a signature card.

   The card is the shared plate (wave art, logo, divider, contact icons, city
   line) with four lines of text painted on at the coordinates the source
   artwork used. Text is converted to vector paths with opentype rather than
   rendered as SVG <text>, so the output does not depend on any font being
   installed wherever this runs — and the advances come straight from the font
   metrics, which match the artwork's embedded subset exactly.

   Assets live beside this file and are pulled into the serverless bundle by
   outputFileTracingIncludes in next.config.ts. */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { type Font, parse as parseFont } from "opentype.js";
import sharp from "sharp";

import {
  CARD,
  INK,
  LINES,
  type LineKey,
  type Person,
  type Slice,
  SOCIAL_ROW,
  WEBSITE_LABEL,
  sliceDef,
  socialIconCentreX,
} from "./card";
import { type SocialIcon, SOCIALS } from "./social";

/** The plate is 4x the 600x200pt artwork; text is composited at that scale and
    the result is resized down, which supersamples the glyph edges. */
const SCALE = 4;

const ASSETS = path.join(process.cwd(), "src", "lib", "signature", "assets");

type Fonts = { bold: Font; medium: Font };

let fontsPromise: Promise<Fonts> | null = null;
let platePromise: Promise<Buffer> | null = null;

function loadFonts() {
  fontsPromise ??= (async () => {
    const [bold, medium] = await Promise.all([
      readFile(path.join(ASSETS, "Poppins-Bold.ttf")),
      readFile(path.join(ASSETS, "Poppins-Medium.ttf")),
    ]);
    return {
      bold: parseFont(toArrayBuffer(bold)),
      medium: parseFont(toArrayBuffer(medium)),
    };
  })();
  return fontsPromise;
}

function loadPlate() {
  platePromise ??= readFile(path.join(ASSETS, "plate.png"));
  return platePromise;
}

function toArrayBuffer(buf: Buffer) {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

/** Every line the card paints, in draw order. */
function cardLines(person: Person): Array<[LineKey, string]> {
  return [
    ["name", person.name.toUpperCase()],
    ["title", person.title],
    ["phone", person.phone],
    ["email", person.email],
    ["website", WEBSITE_LABEL],
  ];
}

/** Characters the artwork's font can't draw — Arabic, say, which would come out
    as empty boxes. Better to refuse than to render something broken. */
export async function unsupportedCharacters(person: Person) {
  const fonts = await loadFonts();
  const missing = new Set<string>();
  const lines = cardLines(person);
  for (const [key, text] of lines) {
    const font = fonts[LINES[key].weight];
    for (const char of text) {
      if (font.charToGlyphIndex(char) === 0) missing.add(char);
    }
  }
  return [...missing];
}

/** One line of text as SVG path data, shrunk if it would overrun its limit. */
function linePath(fonts: Fonts, key: LineKey, text: string) {
  const spec = LINES[key];
  const font = fonts[spec.weight];
  const available = spec.rightLimit - spec.x;

  let size = spec.size;
  const width = font.getAdvanceWidth(text, size, { kerning: false });
  if (width > available) size *= available / width;

  return font
    .getPath(text, spec.x * SCALE, spec.baseline * SCALE, size * SCALE, { kerning: false })
    .toPathData(2);
}

/** One social mark, scaled by its measured ink box so all four read the same
    size, and centred in its cell. */
function socialPath(icon: SocialIcon, index: number) {
  const [x0, y0, x1, y1] = icon.box;
  const scale = ((SOCIAL_ROW.size * icon.optical) / (y1 - y0)) * SCALE;
  const tx = socialIconCentreX(index) * SCALE - (x0 + (x1 - x0) / 2) * scale;
  const ty = SOCIAL_ROW.centreY * SCALE - (y0 + (y1 - y0) / 2) * scale;

  return (
    `<path d="${icon.path}" fill="${INK}" ` +
    `transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(5)})"/>`
  );
}

/** The whole 2x card, corners already cut into the alpha. */
async function buildCard(person: Person) {
  const [fonts, plate] = await Promise.all([loadFonts(), loadPlate()]);

  const paths = cardLines(person)
    .map(([key, text]) => `<path d="${linePath(fonts, key, text)}" fill="${INK}"/>`)
    .concat(SOCIALS.map(socialPath))
    .join("");

  const w = CARD.width * SCALE;
  const h = CARD.height * SCALE;
  const text = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${paths}</svg>`
  );

  // Two passes on purpose: sharp resizes before it composites within a single
  // pipeline, which would shrink the plate out from under the 4x text layer.
  const composited = await sharp(plate)
    .composite([{ input: text, top: 0, left: 0 }])
    .png()
    .toBuffer();

  const painted = await sharp(composited)
    .resize(CARD.width * CARD.retina, CARD.height * CARD.retina, { kernel: "lanczos3" })
    .png()
    .toBuffer();

  // Outlook ignores CSS border-radius, so the radius is cut into the alpha.
  const rw = CARD.width * CARD.retina;
  const rh = CARD.height * CARD.retina;
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${rw}" height="${rh}">` +
      `<rect width="${rw}" height="${rh}" rx="${CARD.radius * CARD.retina}" ` +
      `ry="${CARD.radius * CARD.retina}" fill="#fff"/></svg>`
  );

  return sharp(painted)
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

/* The six slices of a card are six separate requests; keeping the finished card
   around briefly means they share one composite instead of redoing it each time. */
const cache = new Map<string, Promise<Buffer>>();
const CACHE_MAX = 32;

function cardFor(key: string, person: Person) {
  const hit = cache.get(key);
  if (hit) return hit;

  const pending = buildCard(person);
  cache.set(key, pending);
  if (cache.size > CACHE_MAX) cache.delete(cache.keys().next().value!);
  pending.catch(() => cache.delete(key));
  return pending;
}

export async function renderSlice(key: string, person: Person, slice: Slice) {
  const def = sliceDef(slice);
  if (!def) throw new Error(`unknown slice: ${slice}`);

  const card = await cardFor(key, person);
  return sharp(card)
    .extract({
      left: def.x * CARD.retina,
      top: def.y * CARD.retina,
      width: def.w * CARD.retina,
      height: def.h * CARD.retina,
    })
    .png()
    .toBuffer();
}
