/**
 * Taajeer deck — design tokens.
 *
 * Canvas is 1920×1080 px, which maps exactly onto the source deck's 20in × 11.25in
 * PowerPoint page at 96 px/inch. So 1 px = 9525 EMU and 1 px = 0.75 pt, and every
 * number here survives the trip into PowerPoint without rounding.
 *
 * Two typefaces, both shipped with Office so the client never sees a font
 * substitution: Cambria carries the display, Calibri carries everything else.
 */

export const W = 1920;
export const H = 1080;

export const MX = 112;
export const CW = W - MX * 2; // 1696

/* ── Neutral spine ───────────────────────────────────────────── */
export const C = {
  ink: "#0E1117",
  body: "#4C5563",
  muted: "#8D96A3",
  faint: "#B9C0C9",
  rule: "#E6E9ED",
  wash: "#F6F8FA",
  white: "#FFFFFF",
  /** the dark ground used by section dividers and the odd hero */
  dark: "#0E1117",
  darkCard: "#181D25",
  darkRule: "#232A34",
  darkBody: "#98A5B2",
} as const;

/* ── Brand accents — each sampled from the brand's own logo ───── */
export const BRAND = {
  /** Taajeer Group — the parent frame: cover, dividers, footers. */
  taajeer: { key: "taajeer", name: "Taajeer Group", ink: "#003C60", tint: "#EAF1F6", edge: "#C2D6E3" },

  /** Bestune — the logo is monochrome chrome, so it is coded by material
   *  (cool steel) rather than hue. Deliberately the only achromatic brand. */
  bestune: { key: "bestune", name: "Bestune", ink: "#1F242B", tint: "#EEF1F4", edge: "#CDD3DA" },

  /** 212 — its real forest green, on bone/sand for heritage and terrain. */
  b212: { key: "b212", name: "212", ink: "#00543C", tint: "#EAF2EE", edge: "#BFD6CB" },

  /** Motor Souq — its real retail blue, with the logo's cyan as a second note. */
  souq: { key: "souq", name: "Motor Souq", ink: "#0C6CB4", tint: "#E9F2FA", edge: "#B4D2EA", alt: "#18B4B4" },
} as const;

export type BrandKey = keyof typeof BRAND;
export type Brand = (typeof BRAND)[BrandKey];

/** The three portfolio brands, in the order the deck always presents them. */
export const THREE: Brand[] = [BRAND.bestune, BRAND.b212, BRAND.souq];

/** Icon-colour key per brand — the icon PNGs are baked one per colour. */
export const ICON_KEY: Record<string, string> = {
  bestune: "bestune",
  b212: "b212",
  souq: "souq",
  taajeer: "taajeer",
};

/* ── Sentiment ───────────────────────────────────────────────── */
export const S = {
  pos: "#16785A",
  neg: "#B23A2E",
  neu: "#8D96A3",
  posTint: "#EAF3EF",
  negTint: "#FAEFED",
  neuTint: "#F1F3F5",
} as const;

/* ── Type scale (px) ─────────────────────────────────────────── */
export const T = {
  mega: 260,
  display: 92,
  h1: 62,
  h2: 46,
  h3: 32,
  h4: 25,
  lead: 24,
  body: 18,
  small: 16,
  micro: 14,
  label: 13,
  tiny: 11.5,
  statXL: 88,
  stat: 58,
} as const;

export const CAPS_LS = 1.7;

export const FOOTER = "emotion®  ×  Taajeer Group";
