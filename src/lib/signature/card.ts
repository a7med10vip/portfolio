/* Shared geometry and the codec that packs a person into an image URL.

   Both cards are drawn at 600x200 and shipped a little smaller. 7/8 is chosen
   so that every cut in brands.ts — all of which fall on multiples of 8 — stays
   a whole number of pixels once scaled: the slices tile exactly, with no seam
   and no row scaled differently from its neighbour. Change this and the cuts
   together, or not at all. */

import { type Brand, type SliceDef, getBrand } from "./brands";

export const CARD = { width: 600, height: 200, radius: 14, retina: 2 } as const;

export const DISPLAY = 7 / 8;

/** A card measurement in the pixels the signature actually ships at. */
export function px(value: number) {
  return Math.round(value * DISPLAY);
}

export function sliceDef(brand: Brand, key: string): SliceDef | undefined {
  return brand.slices.find((s) => s.key === key);
}

/** Size of one slice in the pixels it ships at. Taken as the gap between its
    scaled edges rather than by scaling the width, so neighbouring slices always
    meet exactly. */
export function sliceSize(brand: Brand, key: string) {
  const def = sliceDef(brand, key);
  if (!def) throw new Error(`unknown slice: ${brand.key}/${key}`);
  return {
    width: px(def.x + def.w) - px(def.x),
    height: px(def.y + def.h) - px(def.y),
  };
}

export type Person = {
  brand: string;
  name: string;
  title: string;
  phone: string;
  email: string;
};

export const FIELD_MAX = 90;

/* ---- payload codec -------------------------------------------------------
   The person travels inside the image URL, so a card needs no storage: the
   same input always addresses the same image, which lets the CDN cache it and
   keeps mail clients pointing at something stable. */

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text: string) {
  const padded = text.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

export function encodePerson(person: Person): string {
  const packed = JSON.stringify({
    b: person.brand,
    n: person.name,
    t: person.title,
    p: person.phone,
    e: person.email,
  });
  return toBase64Url(new TextEncoder().encode(packed));
}

export function decodePerson(token: string | null): { person: Person; brand: Brand } | null {
  if (!token) return null;
  try {
    const raw = JSON.parse(new TextDecoder().decode(fromBase64Url(token)));
    const brand = getBrand(String(raw.b ?? ""));
    if (!brand) return null;

    const person: Person = {
      brand: brand.key,
      name: String(raw.n ?? ""),
      title: String(raw.t ?? ""),
      phone: String(raw.p ?? ""),
      email: String(raw.e ?? ""),
    };
    for (const [key, value] of Object.entries(person)) {
      if (key === "brand") continue;
      // Control characters would end up as .notdef boxes in the render.
      if (!value || value.length > FIELD_MAX || /[\x00-\x1f\x7f]/.test(value)) return null;
    }
    return { person, brand };
  } catch {
    return null;
  }
}
