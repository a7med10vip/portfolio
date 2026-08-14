/* Emotion Group signature card — the geometry both the renderer and the browser
   agree on, plus the codec that packs a person into an image URL.

   Every number here is lifted from the source artwork (600x200pt), so the
   generated card lands on the same pixels the designer's PDF did. */

export const CARD = {
  width: 600,
  height: 200,
  /** vertical cut, between the divider and the text column */
  splitX: 232,
  radius: 14,
  /** cards ship at 2x */
  retina: 2,
} as const;

/* The social marks continue the contact block's rhythm: its icons sit 15.19pt
   apart, so the next row down lands at 158. Each mark is centred in its own
   cell, and the cells start at 243 so the first mark's ink lines up with the
   246.5 left edge the name, title and contact icons share. */
export const SOCIAL_ROW = {
  top: 150,
  bottom: 168,
  centreY: 158,
  /** ink height of each mark */
  size: 9,
  firstCellX: 243,
  cell: 16,
} as const;

export function socialCellX(index: number) {
  return SOCIAL_ROW.firstCellX + index * SOCIAL_ROW.cell;
}

/** A cut of the card. Each one becomes an <img>, and the ones that carry a link
    are why the card is sliced at all. */
export type SliceDef = { key: string; x: number; y: number; w: number; h: number };

const RIGHT = CARD.width - CARD.splitX;
const SOCIAL_END = socialCellX(4);

export const SLICE_DEFS: SliceDef[] = [
  { key: "left", x: 0, y: 0, w: CARD.splitX, h: CARD.height },
  { key: "r1", x: CARD.splitX, y: 0, w: RIGHT, h: 103 },
  { key: "r2", x: CARD.splitX, y: 103, w: RIGHT, h: 17 },
  { key: "r3", x: CARD.splitX, y: 120, w: RIGHT, h: 15 },
  { key: "r4", x: CARD.splitX, y: 135, w: RIGHT, h: 15 },
  // the social row, cut into one cell per mark so each can carry its own link
  { key: "s0", x: CARD.splitX, y: SOCIAL_ROW.top, w: SOCIAL_ROW.firstCellX - CARD.splitX, h: 18 },
  ...[0, 1, 2, 3].map((i) => ({
    key: `s${i + 1}`,
    x: socialCellX(i),
    y: SOCIAL_ROW.top,
    w: SOCIAL_ROW.cell,
    h: 18,
  })),
  { key: "s5", x: SOCIAL_END, y: SOCIAL_ROW.top, w: CARD.width - SOCIAL_END, h: 18 },
  { key: "r6", x: CARD.splitX, y: SOCIAL_ROW.bottom, w: RIGHT, h: CARD.height - SOCIAL_ROW.bottom },
];

export const SLICES = SLICE_DEFS.map((s) => s.key);
export type Slice = string;

export function sliceDef(key: string) {
  return SLICE_DEFS.find((s) => s.key === key);
}

/** Text colour in the artwork: 0.973 0.976 0.988 */
export const INK = "#F8F9FC";

export type LineKey = "name" | "title" | "phone" | "email" | "website";

/* The contact lines are set against their icons rather than against the
   artwork's own text positions. The source spaces the three lines 16.04pt apart
   while the icons beside them sit 15.19pt apart, so by the third row the text
   sat 2pt below its icon; it also started each line at a different x (258.50 /
   261.50 / 262.00). Here every line shares one left edge and each baseline puts
   the cap-height centre of the text on the centre of its icon. */
const ICON_CENTRES = { phone: 112.375, email: 127.625, website: 142.75 };
const CONTACT_SIZE = 8;
/** Poppins cap height, 697/1000 em. */
const CAP_HEIGHT = 0.697;
const CONTACT_X = 261.85;

const contact = (line: keyof typeof ICON_CENTRES) => ({
  weight: "medium" as const,
  size: CONTACT_SIZE,
  x: CONTACT_X,
  baseline: ICON_CENTRES[line] + (CAP_HEIGHT * CONTACT_SIZE) / 2,
  rightLimit: 585,
});

/** Name and title keep the positions the PDF's text operators gave them.
    `rightLimit` is where a line has to stop — longer text scales down rather
    than running into the wave art. */
export const LINES: Record<
  LineKey,
  { weight: "bold" | "medium"; size: number; x: number; baseline: number; rightLimit: number }
> = {
  name: { weight: "bold", size: 48, x: 246.6772, baseline: 69.9746, rightLimit: 580 },
  title: { weight: "medium", size: 12, x: 246.6777, baseline: 91.377, rightLimit: 585 },
  phone: contact("phone"),
  email: contact("email"),
  website: contact("website"),
};

/** Same on every card — the site, not the person. */
export const WEBSITE_LABEL = "emotiongrp.com";

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
  const def = sliceDef(slice);
  if (!def) throw new Error(`unknown slice: ${slice}`);
  return { width: def.w, height: def.h };
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
