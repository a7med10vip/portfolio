/* Server-side rendering of a signature card.

   A card is its brand's plate — the artwork, logo, divider and contact icons —
   with the person's lines painted on at the coordinates in brands.ts. Text is
   converted to vector paths with opentype rather than rendered as SVG <text>,
   so the output does not depend on any font being installed wherever this runs,
   and the advances come straight from the font metrics.

   Assets live beside this file and are pulled into the serverless bundle by
   outputFileTracingIncludes in next.config.ts. */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { type Font, type Path as OutlinePath, parse as parseFont } from "opentype.js";
import sharp from "sharp";

import { type Brand, type FontKey, type LineKey } from "./brands";
import { CARD, type Person, sliceDef } from "./card";

/** Plates are 4x the 600x200pt artwork; text is composited at that scale and
    the result is resized down, which supersamples the glyph edges. */
const SCALE = 4;

const ASSETS = path.join(process.cwd(), "src", "lib", "signature", "assets");

const FONT_FILES: Record<FontKey, string> = {
  "poppins-bold": "Poppins-Bold.ttf",
  "poppins-medium": "Poppins-Medium.ttf",
  "poppins-regular": "Poppins-Regular.ttf",
  bebas: "BebasNeue-Regular.ttf",
};

const fonts = new Map<FontKey, Promise<Font>>();
const plates = new Map<string, Promise<Buffer>>();

function loadFont(key: FontKey) {
  if (!fonts.has(key)) {
    fonts.set(
      key,
      readFile(path.join(ASSETS, FONT_FILES[key])).then((buf) =>
        parseFont(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer)
      )
    );
  }
  return fonts.get(key)!;
}

function loadPlate(brand: Brand) {
  if (!plates.has(brand.key)) {
    plates.set(brand.key, readFile(path.join(ASSETS, brand.plate)));
  }
  return plates.get(brand.key)!;
}

/** Every line the card paints, in draw order. */
function cardLines(brand: Brand, person: Person): Array<[LineKey, string]> {
  return [
    ["name", brand.uppercaseName ? person.name.toUpperCase() : person.name],
    ["title", person.title],
    ["phone", person.phone],
    ["email", person.email],
    ["website", brand.websiteLabel],
  ];
}

/** Characters the card's fonts can't draw — Arabic, say, which would come out
    as empty boxes. Better to refuse than to render something broken. */
export async function unsupportedCharacters(brand: Brand, person: Person) {
  const missing = new Set<string>();
  for (const [key, text] of cardLines(brand, person)) {
    const font = await loadFont(brand.lines[key].font);
    for (const char of text) {
      if (font.charToGlyphIndex(char) === 0) missing.add(char);
    }
  }
  return [...missing];
}

/** Serialise a glyph outline ourselves.

    opentype's own toPathData writes "NaN" for coordinates that land on values
    like 422.00000000000006, and an SVG parser abandons the rest of a path the
    moment it hits one — so a name or a phone number would silently lose its
    tail, or a glyph in the middle. The commands themselves are sound; only the
    printing was not. */
function pathData(path: OutlinePath, decimals = 2) {
  const n = (value: number) => String(Number(value.toFixed(decimals)));
  let out = "";
  for (const c of path.commands) {
    switch (c.type) {
      case "M":
        out += `M${n(c.x!)} ${n(c.y!)}`;
        break;
      case "L":
        out += `L${n(c.x!)} ${n(c.y!)}`;
        break;
      case "Q":
        out += `Q${n(c.x1!)} ${n(c.y1!)} ${n(c.x!)} ${n(c.y!)}`;
        break;
      case "C":
        out += `C${n(c.x1!)} ${n(c.y1!)} ${n(c.x2!)} ${n(c.y2!)} ${n(c.x!)} ${n(c.y!)}`;
        break;
      case "Z":
        out += "Z";
        break;
    }
  }
  return out;
}

/** One line of text as an SVG path, shrunk if it would overrun its limit. */
async function linePaths(brand: Brand, key: LineKey, text: string) {
  const spec = brand.lines[key];
  const font = await loadFont(spec.font);
  const available = spec.rightLimit - spec.x;

  let size = spec.size;
  const width = font.getAdvanceWidth(text, size, { kerning: false });
  if (width > available) size *= available / width;

  const d = pathData(
    font.getPath(text, spec.x * SCALE, spec.baseline * SCALE, size * SCALE, { kerning: false })
  );
  return d ? `<path d="${d}" fill="${spec.ink ?? brand.ink}"/>` : "";
}

/** One social mark, scaled by its measured ink box so all of them read the same
    size, and centred on the row's pitch. */
function socialPath(brand: Brand, index: number) {
  const row = brand.socialRow!;
  const icon = brand.socials[index];
  const [x0, y0, x1, y1] = icon.box;
  const scale = ((row.size * icon.optical) / (y1 - y0)) * SCALE;
  const centreX = row.iconLeft + row.size / 2 + index * row.pitch;
  const tx = centreX * SCALE - (x0 + (x1 - x0) / 2) * scale;
  const ty = row.centreY * SCALE - (y0 + (y1 - y0) / 2) * scale;

  return (
    `<path d="${icon.path}" fill="${brand.ink}" ` +
    `transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(5)})"/>`
  );
}

/** The whole 2x card, corners already cut into the alpha. */
async function buildCard(brand: Brand, person: Person) {
  const plate = await loadPlate(brand);
  const lines = await Promise.all(
    cardLines(brand, person).map(([key, text]) => linePaths(brand, key, text))
  );
  const marks = brand.socialRow ? brand.socials.map((_, i) => socialPath(brand, i)) : [];

  const w = CARD.width * SCALE;
  const h = CARD.height * SCALE;
  const overlay = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${lines.join("")}${marks.join("")}</svg>`
  );

  // Two passes on purpose: sharp resizes before it composites within a single
  // pipeline, which would shrink the plate out from under the 4x text layer.
  const composited = await sharp(plate)
    .composite([{ input: overlay, top: 0, left: 0 }])
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

/* A card's slices are separate requests; keeping the finished card around
   briefly means they share one composite instead of redoing it each time. */
const cache = new Map<string, Promise<Buffer>>();
const CACHE_MAX = 32;

function cardFor(token: string, brand: Brand, person: Person) {
  const hit = cache.get(token);
  if (hit) return hit;

  const pending = buildCard(brand, person);
  cache.set(token, pending);
  if (cache.size > CACHE_MAX) cache.delete(cache.keys().next().value!);
  pending.catch(() => cache.delete(token));
  return pending;
}

export async function renderSlice(token: string, brand: Brand, person: Person, slice: string) {
  const def = sliceDef(brand, slice);
  if (!def) throw new Error(`unknown slice: ${brand.key}/${slice}`);

  const card = await cardFor(token, brand, person);
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
