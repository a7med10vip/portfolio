/**
 * The deck's design language, composed from rect / text / image.
 *
 * The look: a Cambria display line where one phrase carries the brand's colour,
 * soft-cornered cards with a tinted icon chip and a ghost numeral behind them,
 * real photography, and chapters that alternate light and dark. Every piece of it
 * is something PowerPoint draws natively, so the .pptx is the page, still editable.
 */

import { C, CAPS_LS, CW, FOOTER, H, MX, T, W, type Brand } from "./tokens";
import { El, Run, i, r, t } from "./types";

/* ── Chrome ──────────────────────────────────────────────────── */

/** The standing frame: eyebrow, agency lockup, folio. */
export function frame(kicker: string, n: number, o: { dark?: boolean; accent?: string } = {}): El[] {
  const dim = o.dark ? "#5C6B7A" : C.faint;
  return [
    ...eyebrow(MX, 62, kicker, o.accent ?? (o.dark ? "#7FA8C4" : C.muted)),
    t(MX, H - 74, 520, 18, FOOTER, { fs: T.tiny, c: dim, nowrap: true }),
    t(W - MX - 90, H - 80, 90, 26, String(n), { fs: T.small, fw: "l", c: dim, al: "r", nowrap: true }),
  ];
}

/** Eyebrow: a small colour dot, then a tracked all-caps label. */
export function eyebrow(x: number, y: number, s: string, c: string = C.muted): El[] {
  return [
    r(x, y + 5, 7, 7, { fill: c, rad: 4 }),
    t(x + 16, y, 900, 18, s, { fs: T.label, fw: "b", c, caps: true, ls: CAPS_LS, nowrap: true }),
  ];
}

/**
 * The display headline. Set in Cambria, and split so one phrase carries colour —
 * the move that gives every page a subject before a word is read.
 */
export function display(
  runs: Run[],
  y = 132,
  o: { fs?: number; x?: number; w?: number; c?: string; al?: "l" | "c" | "r" } = {},
): El {
  const fs = o.fs ?? T.h1;
  const lines = runs.map((rn) => rn.t).join("").split("\n").length;
  return t(o.x ?? MX, y, o.w ?? CW, fs * 1.18 * lines + 10, runs, {
    fs,
    ff: "c",
    c: o.c ?? C.ink,
    al: o.al,
    lh: fs * 1.12,
    ls: -fs * 0.014,
  });
}

/** The paragraph under a headline, held to a readable measure. */
export function standfirst(s: string | Run[], y: number, w = 1120, o: { c?: string; fs?: number; x?: number } = {}): El {
  const fs = o.fs ?? T.lead;
  return t(o.x ?? MX, y, w, fs * 1.5 * 3, s, { fs, fw: "l", c: o.c ?? C.body, lh: fs * 1.48 });
}

export function label(x: number, y: number, w: number, s: string, c: string = C.muted, o: { fs?: number; al?: "l" | "c" | "r" } = {}): El {
  const fs = o.fs ?? T.label;
  return t(x, y, w, fs + 6, s, { fs, fw: "b", c, caps: true, ls: CAPS_LS, al: o.al, nowrap: true });
}

export const rule = (x: number, y: number, w: number, c: string = C.rule): El => r(x, y, w, 1, { fill: c });
export const vrule = (x: number, y: number, h: number, c: string = C.rule): El => r(x, y, 1, h, { fill: c });

/* ── Cards ───────────────────────────────────────────────────── */

/**
 * The workhorse card: generous corner radius, a hairline in the brand's own edge
 * colour, and a soft shadow. Flat panels read as a Word document; this doesn't.
 */
export function softCard(
  x: number,
  y: number,
  w: number,
  h: number,
  o: { line?: string; fill?: string; rad?: number; shadow?: boolean; tab?: string } = {},
): El[] {
  const rad = o.rad ?? 18;
  const els: El[] = [
    r(x, y, w, h, {
      fill: o.fill ?? C.white,
      line: o.line ?? C.rule,
      lw: 1,
      rad,
      shadow: o.shadow ?? true,
    }),
  ];
  if (o.tab) els.push(r(x + rad, y, w - rad * 2, 3, { fill: o.tab }));
  return els;
}

/** A tinted rounded chip with a lucide icon in it. The card's colour signal. */
export function chip(x: number, y: number, icon: string, colourKey: string, o: { size?: number; bg?: string } = {}): El[] {
  const size = o.size ?? 48;
  const pad = size * 0.26;
  return [
    r(x, y, size, size, { fill: o.bg ?? C.wash, rad: size * 0.3 }),
    i(x + pad, y + pad, size - pad * 2, size - pad * 2, `/taajeer/icons/${icon}-${colourKey}.png`, { fit: "contain" }),
  ];
}

/** The oversized, barely-there numeral that sits behind a card's corner. */
export function ghost(x: number, y: number, s: string, c: string, size = 96): El {
  return t(x, y, 260, size * 1.2, s, {
    fs: size,
    ff: "c",
    fw: "b",
    c,
    al: "r",
    ls: -size * 0.03,
    nowrap: true,
  });
}

/** Small pill — LOCAL / GLOBAL / HERO / PRIORITY. */
export function pill(x: number, y: number, s: string, o: { c?: string; bg?: string; line?: string; w?: number } = {}): El[] {
  const w = o.w ?? s.length * 7.4 + 28;
  const h = 25;
  return [
    r(x, y, w, h, { fill: o.bg, line: o.line ?? (o.bg ? undefined : C.rule), lw: 1, rad: 13 }),
    t(x, y + 6, w, 14, s, { fs: T.tiny, fw: "b", c: o.c ?? C.muted, caps: true, ls: 1.2, al: "c", nowrap: true }),
  ];
}

/* ── Photography ─────────────────────────────────────────────── */

/** A photo, cropped to fill and rounded — PowerPoint crops the picture to shape. */
export const photo = (x: number, y: number, w: number, h: number, src: string, rad = 18): El =>
  i(x, y, w, h, src, { fit: "cover", rad });

/* ── Stats ───────────────────────────────────────────────────── */

/** A big numeral, an accent underline, and a tracked caption. */
export function statTile(
  x: number,
  y: number,
  w: number,
  value: string,
  cap: string,
  o: { c?: string; fs?: number; serif?: boolean } = {},
): El[] {
  const fs = o.fs ?? T.stat;
  const c = o.c ?? C.ink;
  return [
    t(x, y, w, fs * 1.14, value, { fs, ff: o.serif === false ? "s" : "c", c, ls: -fs * 0.02, lh: fs * 1.1, nowrap: true }),
    r(x, y + fs * 1.26, 34, 3, { fill: c }),
    label(x, y + fs * 1.26 + 18, w, cap, C.muted),
  ];
}

/* ── Data, drawn as rectangles ───────────────────────────────── */

export type BarDatum = { name: string; value: number; note?: string; c?: string; vlabel?: string };

/** Horizontal bars — rects, not a chart library, so PowerPoint can redraw them. */
export function barsH(
  x: number,
  y: number,
  w: number,
  data: BarDatum[],
  o: { rowH?: number; gap?: number; labelW?: number; max?: number; c?: string } = {},
): El[] {
  const rowH = o.rowH ?? 28;
  const gap = o.gap ?? 24;
  const labelW = o.labelW ?? 160;
  const trackX = x + labelW + 18;
  const trackW = w - labelW - 18 - 130;
  const max = o.max ?? Math.max(...data.map((d) => d.value));
  const els: El[] = [];

  data.forEach((d, k) => {
    const ry = y + k * (rowH + gap);
    const bw = Math.max(3, (d.value / max) * trackW);
    els.push(
      t(x, ry + rowH / 2 - 10, labelW, 20, d.name, { fs: T.small, fw: "b", c: C.ink, al: "r", nowrap: true }),
      r(trackX, ry, bw, rowH, { fill: d.c ?? o.c ?? C.ink, rad: 4 }),
      t(trackX + bw + 14, ry + rowH / 2 - 11, 200, 22, d.vlabel ?? String(d.value), {
        fs: T.small,
        fw: "b",
        c: d.c ?? o.c ?? C.ink,
        nowrap: true,
      }),
    );
  });
  return els;
}

export type StackSeg = { value: number; c: string; name?: string };

/** 100% stacked bar — the content-style mix. */
export function stackBar(x: number, y: number, w: number, h: number, segs: StackSeg[], o: { rad?: number } = {}): El[] {
  const total = segs.reduce((s, g) => s + g.value, 0);
  const els: El[] = [];
  let cx = x;
  segs.forEach((g) => {
    const sw = (g.value / total) * w;
    els.push(r(cx, y, sw, h, { fill: g.c }));
    if (sw > 44) {
      els.push(t(cx, y + h / 2 - 10, sw, 20, `${g.value}%`, { fs: T.small, fw: "b", c: C.white, al: "c", nowrap: true }));
    }
    cx += sw;
  });
  return els;
}

export function legend(x: number, y: number, items: { name: string; c: string }[], o: { gap?: number } = {}): El[] {
  const els: El[] = [];
  let cx = x;
  items.forEach((it) => {
    els.push(
      r(cx, y + 3, 11, 11, { fill: it.c, rad: 3 }),
      t(cx + 19, y, 180, 18, it.name, { fs: T.micro, c: C.body, nowrap: true }),
    );
    cx += 19 + it.name.length * 7.1 + (o.gap ?? 30);
  });
  return els;
}

/* ── Table ───────────────────────────────────────────────────── */

export function table(
  x: number,
  y: number,
  cols: { w: number; head: string; al?: "l" | "c" | "r" }[],
  rows: (string | Run[])[][],
  o: { rowH?: number; headH?: number; fs?: number } = {},
): El[] {
  const rowH = o.rowH ?? 62;
  const headH = o.headH ?? 42;
  const fs = o.fs ?? T.small;
  const totalW = cols.reduce((s, c) => s + c.w, 0);
  const els: El[] = [];

  let cx = x;
  cols.forEach((c) => {
    els.push(label(cx, y + 12, c.w, c.head, C.muted, { al: c.al }));
    cx += c.w;
  });
  els.push(r(x, y + headH, totalW, 1.5, { fill: C.ink }));

  rows.forEach((row, ri) => {
    const ry = y + headH + ri * rowH;
    cx = x;
    row.forEach((cell, ci) => {
      const col = cols[ci];
      els.push(
        t(cx, ry + rowH / 2 - fs * 0.74, col.w - 18, fs * 1.5, cell, {
          fs,
          fw: ci === 0 ? "b" : "r",
          c: ci === 0 ? C.ink : C.body,
          al: col.al,
          lh: fs * 1.4,
        }),
      );
      cx += col.w;
    });
    if (ri < rows.length - 1) els.push(r(x, ry + rowH, totalW, 1, { fill: C.rule }));
  });
  return els;
}

/* ── The takeaway ────────────────────────────────────────────── */

/** The line that carries the point of the slide. It gets colour and weight. */
export function takeaway(y: number, lead: string, rest: string, o: { c?: string; bg?: string; h?: number; icon?: string; iconKey?: string } = {}): El[] {
  const h = o.h ?? 84;
  const c = o.c ?? C.ink;
  const els: El[] = [
    r(MX, y, CW, h, { fill: o.bg ?? C.wash, rad: 14 }),
    r(MX, y + 16, 4, h - 32, { fill: c, rad: 2 }),
  ];
  const tx = MX + 32;
  els.push(
    t(tx, y + h / 2 - 15, CW - 70, 32, [{ t: lead, b: true, c }, { t: "   " + rest, c: C.body }], {
      fs: T.body,
      c: C.body,
      lh: 27,
    }),
  );
  return els;
}

/* ── Section divider ─────────────────────────────────────────── */

export function divider(num: string, name: string, accentWord: string, blurb: string, items: string[], accent: string): El[] {
  const bg = "#0E1117";
  return [
    r(0, 0, W, H, { fill: bg }),
    // the chapter number, huge and barely lit
    t(MX - 6, 168, 700, 300, num, { fs: 260, ff: "c", fw: "b", c: "#191E26", ls: -10, lh: 260, nowrap: true }),

    ...eyebrow(MX, 420, `Section ${num}`, accent),
    t(MX, 452, 1100, 130, [{ t: name + " " }, { t: accentWord, c: accent, i: true }], {
      fs: 92,
      ff: "c",
      c: "#FFFFFF",
      lh: 98,
      ls: -1.6,
    }),
    t(MX, 606, 700, 70, blurb, { fs: T.lead, fw: "l", c: "#8FA3B5", lh: 34 }),

    ...items.flatMap((s, k) => [
      r(1108, 396 + k * 62, 600, 1, { fill: "#232A34" }),
      t(1108, 396 + k * 62 + 20, 40, 24, String(k + 1).padStart(2, "0"), { fs: T.micro, fw: "b", c: accent, nowrap: true }),
      t(1156, 396 + k * 62 + 19, 560, 24, s, { fs: T.body, c: "#C4CDD6", nowrap: true }),
    ]),
    r(1108, 396 + items.length * 62, 600, 1, { fill: "#232A34" }),

    t(MX, H - 74, 520, 18, FOOTER, { fs: T.tiny, c: "#4A5666", nowrap: true }),
  ];
}

/* ── Logos ───────────────────────────────────────────────────── */

export const LOGO: Record<string, string> = {
  bestune: "/taajeer/logos/bestune.png",
  b212: "/taajeer/logos/212.png",
  souq: "/taajeer/logos/motorsouq.png",
  taajeer: "/taajeer/logos/taajeer.png",

  emotionMark: "/taajeer/brand/emotion-e-dark.png",
  emotionLockup: "/taajeer/brand/emotion-lockup.png",

  changan: "/taajeer/logos/changan.png",
  geely: "/taajeer/logos/geely.png",
  toyota: "/taajeer/logos/toyota.png",
  rivian: "/taajeer/logos/rivian.png",
  hongqi: "/taajeer/logos/hongqi.png",
  tank300: "/taajeer/logos/tank300.png",
  petromin: "/taajeer/logos/petromin.png",
  jeep: "/taajeer/logos/jeep.png",
  ineos: "/taajeer/logos/ineos.png",
  defender: "/taajeer/logos/defender.png",
  aljomaih: "/taajeer/logos/aljomaih.png",
  alj: "/taajeer/logos/alj.png",
  aljazirahFord: "/taajeer/logos/aljazirah-ford.png",
  carmax: "/taajeer/logos/carmax.png",
  syarah: "/taajeer/logos/syarah.png",
  jetour: "/taajeer/logos/jetour.png",
};

/**
 * Natural aspect (w/h) per mark, plus an optical multiplier — a long wordmark set
 * at the same box height as a square emblem always reads bigger, so a row of
 * mixed logos needs correcting by eye, not by box.
 */
const LOGO_META: Record<string, { ar: number; k?: number }> = {
  bestune: { ar: 2.308, k: 1.0 },
  b212: { ar: 2.303, k: 0.9 },
  souq: { ar: 1.864, k: 1.15 },
  taajeer: { ar: 2.78, k: 0.92 },
  emotionMark: { ar: 0.817, k: 1.0 },
  emotionLockup: { ar: 1.761, k: 1.0 },

  changan: { ar: 1.159, k: 1.1 },
  geely: { ar: 6.05, k: 0.62 },
  toyota: { ar: 6.05, k: 0.62 },
  rivian: { ar: 5.0, k: 0.66 },
  hongqi: { ar: 1.923, k: 0.95 },
  tank300: { ar: 0.785, k: 1.2 },
  petromin: { ar: 2.502, k: 0.95 },
  jeep: { ar: 2.5, k: 0.95 },
  ineos: { ar: 10.0, k: 0.5 },
  defender: { ar: 13.31, k: 0.42 },
  aljomaih: { ar: 1.944, k: 1.0 },
  alj: { ar: 5.449, k: 0.66 },
  aljazirahFord: { ar: 4.303, k: 0.75 },
  carmax: { ar: 5.125, k: 0.66 },
  syarah: { ar: 2.184, k: 1.0 },
  jetour: { ar: 6.141, k: 0.62 },
};

/** A logo placed by optical height, so the .pptx picture lands where the browser draws it. */
export function mark(key: string, x: number, y: number, h: number, al: "l" | "c" | "r" = "l") {
  const m = LOGO_META[key] ?? { ar: 3, k: 1 };
  const oh = h * (m.k ?? 1);
  const ow = oh * m.ar;
  const ox = al === "l" ? x : al === "r" ? x - ow : x - ow / 2;
  return i(ox, y + (h - oh) / 2, ow, oh, LOGO[key] ?? key, { fit: "contain", al: "l" });
}
