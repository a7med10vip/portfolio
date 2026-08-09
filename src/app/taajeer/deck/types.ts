/**
 * The slide spec.
 *
 * Three primitives — rect, text, image — because those are the only things a
 * browser and PowerPoint can both draw *identically*. Cards, charts, icon chips,
 * timelines and tables are all composed from them, so the web deck and the
 * exported .pptx are the same picture and the .pptx stays fully editable.
 *
 * Everything expressible here has a native PowerPoint equivalent:
 *   rect   → autoshape (rect / roundRect), solid fill, line, outer shadow
 *   text   → textbox, Calibri + Cambria, exact point line-spacing and tracking
 *   image  → picture, optionally cropped to a roundRect
 * Nothing else is allowed in — no CSS blur, no masks, no SVG paths, no webfonts
 * beyond the two that ship with Office.
 */

/** Font family. 's' = Calibri (sans), 'c' = Cambria (serif display). */
export type FF = "s" | "c";
/** Weight. 'l' = Light (Calibri only), 'r' = Regular, 'b' = Bold. */
export type FW = "l" | "r" | "b";
export type Align = "l" | "c" | "r";
export type VAlign = "t" | "m" | "b";

/** An inline span — lets one text box mix colour, weight and italic. */
export type Run = {
  t: string;
  b?: boolean;
  i?: boolean;
  c?: string;
  /** switch family mid-line, e.g. a serif word inside a sans headline */
  ff?: FF;
};

export type Rect = {
  k: "r";
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
  line?: string;
  /** stroke width in px, default 1 */
  lw?: number;
  /** corner radius in px; >= min(w,h)/2 renders a pill */
  rad?: number;
  /** soft outer shadow — the one thing that lifts a card off the page */
  shadow?: boolean;
};

export type Text = {
  k: "t";
  x: number;
  y: number;
  w: number;
  h: number;
  /** plain string, or runs for mixed styling. \n is a hard break. */
  s: string | Run[];
  fs: number;
  ff?: FF;
  fw?: FW;
  /** italic the whole box */
  it?: boolean;
  c: string;
  al?: Align;
  va?: VAlign;
  /** line height in px — exported as exact point spacing, so web == pptx */
  lh?: number;
  /** letter spacing in px */
  ls?: number;
  caps?: boolean;
  nowrap?: boolean;
};

export type Img = {
  k: "i";
  x: number;
  y: number;
  w: number;
  h: number;
  src: string;
  /** 'contain' letterboxes (default), 'cover' fills and crops */
  fit?: "contain" | "cover";
  /** horizontal anchor when fit=contain */
  al?: Align;
  /** corner radius in px — PowerPoint crops the picture to a roundRect */
  rad?: number;
};

export type El = Rect | Text | Img;

export type Slide = {
  id: string;
  n?: number;
  bg?: string;
  /** label in the deck's own navigator */
  nav: string;
  /** which chapter this belongs to, for the navigator */
  chapter?: string;
  els: El[];
};

/* ── constructors ── */

export const r = (x: number, y: number, w: number, h: number, o: Omit<Rect, "k" | "x" | "y" | "w" | "h"> = {}): Rect =>
  ({ k: "r", x, y, w, h, ...o });

export const t = (
  x: number,
  y: number,
  w: number,
  h: number,
  s: string | Run[],
  o: Omit<Text, "k" | "x" | "y" | "w" | "h" | "s" | "fs" | "c"> & { fs: number; c: string },
): Text => ({ k: "t", x, y, w, h, s, ...o });

export const i = (x: number, y: number, w: number, h: number, src: string, o: Omit<Img, "k" | "x" | "y" | "w" | "h" | "src"> = {}): Img =>
  ({ k: "i", x, y, w, h, src, ...o });
