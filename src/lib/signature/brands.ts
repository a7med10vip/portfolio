/* The two signature cards, described rather than coded.

   Both are 600x200pt artworks with per-person text painted on at coordinates
   taken from the source PDFs. Everything that differs between them — where the
   text sits, which way round the logo and the text columns are, what is
   clickable — lives here, so the renderer and the markup builder stay generic.

   Contact lines are set against their icons rather than against the artwork's
   own text positions: both files space their contact lines further apart than
   the icons beside them, so the text drifted lower on each row. Each baseline
   below puts the cap-height centre of the text on the centre of its icon. */

import { SOCIAL_GLYPHS, type SocialGlyph } from "./social";

export type FontKey = "poppins-bold" | "poppins-medium" | "poppins-regular" | "bebas";

export type LineKey = "name" | "title" | "phone" | "email" | "website";

export type LineSpec = {
  font: FontKey;
  size: number;
  x: number;
  baseline: number;
  /** where the line has to stop; longer text scales down to fit */
  rightLimit: number;
  /** overrides the card's ink colour */
  ink?: string;
};

export type SliceDef = { key: string; x: number; y: number; w: number; h: number };

/** What a cell of the card points at, if anything. */
export type CellLink =
  | { kind: "website" }
  | { kind: "tel" }
  | { kind: "email" }
  | { kind: "url"; href: string; label: string };

export type CardCell = { slice: string; link?: CellLink };
/** A card is columns of rows of cells — the shape a mail client renders alike. */
export type CardColumn = { width: number; rows: CardCell[][] };

export type Brand = {
  key: string;
  label: string;
  /** shown in the picker */
  tagline: string;
  plate: string;
  ink: string;
  website: string;
  websiteLabel: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  /** Bebas draws caps from any input, so only Poppins names need forcing */
  uppercaseName: boolean;
  lines: Record<LineKey, LineSpec>;
  slices: SliceDef[];
  layout: CardColumn[];
  socials: Array<SocialGlyph & { href: string }>;
  /** where the social marks are drawn, when there are any */
  socialRow?: {
    centreY: number;
    size: number;
    iconLeft: number;
    pitch: number;
  };
};

/** Poppins cap height, 697/1000 em — used to centre a line on its icon. */
const CAP = 0.697;
const contactBaseline = (iconCentreY: number, size: number) => iconCentreY + (CAP * size) / 2;

/* ---------------------------------------------------------------- emotion --
   Logo left, text right. Icon centres measured off the artwork at 112.375,
   127.625 and 142.75 — 15.19pt apart, which is also where the social row goes. */

const EMOTION_SOCIAL = { centreY: 158, size: 9, iconLeft: 246.5, pitch: 16 };
const EMOTION_CONTACT_X = 261.85;
const emotionCell = (i: number) => 240 + i * 16;

const emotion: Brand = {
  key: "emotion",
  label: "Emotion Group",
  tagline: "Let Your Brand Talk",
  plate: "emotion-plate.png",
  ink: "#F8F9FC",
  website: "https://emotiongrp.com",
  websiteLabel: "emotiongrp.com",
  emailPlaceholder: "you@emotiongrp.com",
  phonePlaceholder: "+20 10 12345678",
  uppercaseName: true,
  lines: {
    name: { font: "poppins-bold", size: 48, x: 246.6772, baseline: 69.9746, rightLimit: 580 },
    title: { font: "poppins-medium", size: 12, x: 246.6777, baseline: 91.377, rightLimit: 585 },
    phone: { font: "poppins-medium", size: 8, x: EMOTION_CONTACT_X, baseline: contactBaseline(112.375, 8), rightLimit: 585 },
    email: { font: "poppins-medium", size: 8, x: EMOTION_CONTACT_X, baseline: contactBaseline(127.625, 8), rightLimit: 585 },
    website: { font: "poppins-medium", size: 8, x: EMOTION_CONTACT_X, baseline: contactBaseline(142.75, 8), rightLimit: 585 },
  },
  socialRow: EMOTION_SOCIAL,
  socials: [
    { ...SOCIAL_GLYPHS.instagram, href: "https://www.instagram.com/emotion_mena/" },
    { ...SOCIAL_GLYPHS.linkedin, href: "https://www.linkedin.com/company/emotionmena/" },
    { ...SOCIAL_GLYPHS.x, href: "https://x.com/EmotionMena" },
    { ...SOCIAL_GLYPHS.facebook, href: "https://www.facebook.com/EmotionMENA" },
  ],
  slices: [
    { key: "left", x: 0, y: 0, w: 232, h: 200 },
    { key: "r1", x: 232, y: 0, w: 368, h: 104 },
    { key: "r2", x: 232, y: 104, w: 368, h: 16 },
    { key: "r3", x: 232, y: 120, w: 368, h: 16 },
    { key: "r4", x: 232, y: 136, w: 368, h: 16 },
    { key: "s0", x: 232, y: 152, w: 8, h: 16 },
    ...[0, 1, 2, 3].map((i) => ({ key: `s${i + 1}`, x: emotionCell(i), y: 152, w: 16, h: 16 })),
    { key: "s5", x: emotionCell(4), y: 152, w: 600 - emotionCell(4), h: 16 },
    { key: "r6", x: 232, y: 168, w: 368, h: 32 },
  ],
  layout: [
    { width: 232, rows: [[{ slice: "left", link: { kind: "website" } }]] },
    {
      width: 368,
      rows: [
        [{ slice: "r1", link: { kind: "website" } }],
        [{ slice: "r2", link: { kind: "tel" } }],
        [{ slice: "r3", link: { kind: "email" } }],
        [{ slice: "r4", link: { kind: "website" } }],
        [
          { slice: "s0" },
          { slice: "s1", link: { kind: "url", href: "https://www.instagram.com/emotion_mena/", label: "Instagram" } },
          { slice: "s2", link: { kind: "url", href: "https://www.linkedin.com/company/emotionmena/", label: "LinkedIn" } },
          { slice: "s3", link: { kind: "url", href: "https://x.com/EmotionMena", label: "X" } },
          { slice: "s4", link: { kind: "url", href: "https://www.facebook.com/EmotionMENA", label: "Facebook" } },
          { slice: "s5" },
        ],
        [{ slice: "r6" }],
      ],
    },
  ],
};

/* ----------------------------------------------------------------- vertex --
   Mirrored: text left, logo right. The name is Bebas Neue and pure white, the
   rest Poppins Regular. Icon centres measured at 138.125, 156.875 and 175.75. */

const VERTEX_CONTACT_X = 39.6;

const vertex: Brand = {
  key: "vertex",
  label: "Vertex Integra",
  tagline: "Engineering & integration",
  plate: "vertex-plate.png",
  ink: "#F8F9FD",
  website: "https://www.vertex-integra.com",
  websiteLabel: "www.vertex-integra.com",
  emailPlaceholder: "you@vertex-integra.com",
  phonePlaceholder: "00966 500000000",
  uppercaseName: false,
  lines: {
    name: { font: "bebas", size: 48, x: 24.7241, baseline: 85.5576, rightLimit: 380, ink: "#FFFFFF" },
    title: { font: "poppins-regular", size: 14, x: 26.374, baseline: 107.745, rightLimit: 380 },
    phone: { font: "poppins-regular", size: 10, x: VERTEX_CONTACT_X, baseline: contactBaseline(138.125, 10), rightLimit: 380 },
    email: { font: "poppins-regular", size: 10, x: VERTEX_CONTACT_X, baseline: contactBaseline(156.875, 10), rightLimit: 380 },
    website: { font: "poppins-regular", size: 10, x: VERTEX_CONTACT_X, baseline: contactBaseline(175.75, 10), rightLimit: 380 },
  },
  socials: [],
  slices: [
    { key: "r1", x: 0, y: 0, w: 320, h: 128 },
    { key: "r2", x: 0, y: 128, w: 320, h: 16 },
    { key: "r3", x: 0, y: 144, w: 320, h: 24 },
    { key: "r4", x: 0, y: 168, w: 320, h: 16 },
    { key: "r5", x: 0, y: 184, w: 320, h: 16 },
    { key: "right", x: 320, y: 0, w: 280, h: 200 },
  ],
  layout: [
    {
      width: 320,
      rows: [
        [{ slice: "r1", link: { kind: "website" } }],
        [{ slice: "r2", link: { kind: "tel" } }],
        [{ slice: "r3", link: { kind: "email" } }],
        [{ slice: "r4", link: { kind: "website" } }],
        [{ slice: "r5" }],
      ],
    },
    { width: 280, rows: [[{ slice: "right", link: { kind: "website" } }]] },
  ],
};

export const BRANDS: Record<string, Brand> = { emotion, vertex };
export const BRAND_KEYS = Object.keys(BRANDS);

export function getBrand(key: string | null | undefined): Brand | null {
  return (key && BRANDS[key]) || null;
}
