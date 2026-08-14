/* Emotion Group signature card — the geometry both the renderer and the browser
   agree on, plus the codec that packs a person into an image URL.

   Every number here is lifted from the source artwork (600x200pt), so the
   generated card lands on the same pixels the designer's PDF did. */

export const CARD = {
  width: 600,
  height: 200,
  /** vertical cut, between the divider and the text column */
  splitX: 232,
  /** horizontal cuts bracketing each contact line */
  rows: [0, 103, 122, 138, 156, 200],
  radius: 14,
  /** cards ship at 2x */
  retina: 2,
} as const;

export const SLICES = ["left", "r1", "r2", "r3", "r4", "r5"] as const;
export type Slice = (typeof SLICES)[number];

/** Text colour in the artwork: 0.973 0.976 0.988 */
export const INK = "#F8F9FC";

export type LineKey = "name" | "title" | "phone" | "email";

/** Positions straight out of the PDF's text operators, on a top-left origin.
    `rightLimit` is where a line has to stop — longer text scales down rather
    than running into the wave art. */
export const LINES: Record<
  LineKey,
  { weight: "bold" | "medium"; size: number; x: number; baseline: number; rightLimit: number }
> = {
  name: { weight: "bold", size: 48, x: 246.6772, baseline: 69.9746, rightLimit: 580 },
  title: { weight: "medium", size: 12, x: 246.6777, baseline: 91.377, rightLimit: 585 },
  phone: { weight: "medium", size: 8, x: 259.6628, baseline: 115.915, rightLimit: 585 },
  email: { weight: "medium", size: 8, x: 261.4308, baseline: 131.955, rightLimit: 585 },
};

export const WEBSITE = "https://emotiongrp.com";

/** Where the slice images are served from once a signature is out in the wild.
    Pasted signatures have to point somewhere stable — not at a preview
    deployment, and not at localhost. Change this one line if the renderer moves
    to an Emotion-owned host. */
export const SIGNATURE_ORIGIN = "https://www.ahmedali.online";

export type Person = {
  name: string;
  title: string;
  phone: string;
  email: string;
};

export const FIELD_MAX = 90;

/** Size of one slice in CSS pixels. */
export function sliceSize(slice: Slice) {
  if (slice === "left") return { width: CARD.splitX, height: CARD.height };
  const row = Number(slice.slice(1));
  return {
    width: CARD.width - CARD.splitX,
    height: CARD.rows[row] - CARD.rows[row - 1],
  };
}

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
    n: person.name,
    t: person.title,
    p: person.phone,
    e: person.email,
  });
  return toBase64Url(new TextEncoder().encode(packed));
}

export function decodePerson(token: string | null): Person | null {
  if (!token) return null;
  try {
    const raw = JSON.parse(new TextDecoder().decode(fromBase64Url(token)));
    const person = {
      name: String(raw.n ?? ""),
      title: String(raw.t ?? ""),
      phone: String(raw.p ?? ""),
      email: String(raw.e ?? ""),
    };
    for (const value of Object.values(person)) {
      // Control characters would end up as .notdef boxes in the render.
      if (!value || value.length > FIELD_MAX || /[\x00-\x1f\x7f]/.test(value)) return null;
    }
    return person;
  } catch {
    return null;
  }
}
