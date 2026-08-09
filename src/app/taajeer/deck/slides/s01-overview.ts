/** Cover, contents, and section 01 — Overview. */

import { BRAND, C, CW, H, MX, S, T, W } from "../tokens";
import { i, r, t, type Slide } from "../types";
import {
  barsH, chip, display, divider, eyebrow, frame, ghost, label, mark,
  photo, rule, softCard, standfirst, statTile, takeaway, vrule,
} from "../kit";

const CH = "01 · Overview";

/* ════════════════════════════════════════════════════════ 1 — COVER */

export const cover: Slide = {
  id: "cover",
  nav: "Cover",
  chapter: "Cover",
  bg: C.dark,
  els: [
    // A full-bleed photograph, dimmed by a flat scrim — the deck opens on the
    // road these three brands are actually fighting on.
    i(0, 0, W, H, "/taajeer/img/ksa-desert-drive.jpg", { fit: "cover" }),
    r(0, 0, W, H, { fill: "#0B0E13CC" }),

    mark("emotionLockup", MX, 54, 62, "l"),
    mark("taajeer", W - MX, 56, 56, "r"),
    r(MX, 148, CW, 1, { fill: "#FFFFFF26" }),

    ...eyebrow(MX, 372, "Social Media Strategy  ·  Creative Proposal", "#7FB3D5"),
    t(MX, 414, 1500, 400, [
      { t: "A unified social strategy\nfor three brands,\n" },
      { t: "one group", c: "#FFFFFF", i: true },
      { t: "." },
    ], { fs: 104, ff: "c", c: "#FFFFFF", lh: 112, ls: -2 }),

    // The colour code is introduced here, before a word of strategy is read.
    ...[BRAND.bestune, BRAND.b212, BRAND.souq].flatMap((b, k) => {
      const x = MX + k * 566;
      const c = ["#C7CCD2", "#3E9E7C", "#4FA3DE"][k]; // legible against the dark
      return [
        r(x, 872, 44, 3, { fill: c }),
        t(x, 896, 400, 30, b.name, { fs: T.h4, ff: "c", c: "#FFFFFF", nowrap: true }),
        t(x, 934, 440, 24, ["FAW family SUVs & sedans", "Retro heritage off-roader", "Multi-brand dealer, 7 branches"][k], {
          fs: T.small,
          fw: "l",
          c: "#8FA3B5",
          nowrap: true,
        }),
      ];
    }),

    r(MX, 1006, CW, 1, { fill: "#FFFFFF1F" }),
    t(MX, 1026, 600, 20, "July 2026  ·  V1", { fs: T.micro, fw: "b", c: "#FFFFFF", nowrap: true }),
    t(W - MX - 900, 1026, 900, 20, "Copyright © Emotion Group. All rights reserved.", {
      fs: T.tiny, fw: "l", c: "#5D6B7A", al: "r", nowrap: true,
    }),
  ],
};

/* ════════════════════════════════════════════════════════ 2 — CONTENTS */

const TOC: [string, string, string, string, string][] = [
  ["01", "Overview", "Portfolio map, market moment & the strategic thesis", "compass", "#003C60"],
  ["02", "Research", "Audit, listening, competitors & benchmarks — per brand", "search", "#1F242B"],
  ["03", "Approach & Methodology", "How we work: one model, three priorities", "layers", "#00543C"],
  ["04", "Target Audience", "Who each brand is really talking to", "users", "#0C6CB4"],
  ["05", "Social Media Strategy", "Archetypes, positioning, pillars & tone", "flag", "#003C60"],
  ["06", "Channels Strategy", "Every platform, every brand, mapped", "megaphone", "#1F242B"],
];

const ICONKEY: Record<string, string> = {
  "#003C60": "taajeer",
  "#1F242B": "bestune",
  "#00543C": "b212",
  "#0C6CB4": "souq",
};

export const contents: Slide = {
  id: "contents",
  n: 2,
  nav: "Contents",
  chapter: "Cover",
  els: [
    ...frame("Contents", 2),
    display([{ t: "What's " }, { t: "inside", c: BRAND.taajeer.ink, i: true }], 128),

    ...TOC.flatMap(([num, name, blurb, icon, colour], k) => {
      const col = k % 3;
      const row = Math.floor(k / 3);
      const w = 536;
      const x = MX + col * 580;
      const y = 300 + row * 322;
      const h = 276;
      return [
        ...softCard(x, y, w, h, { line: C.rule }),
        ghost(x + w - 30, y + 4, num, colour + "1A", 120),
        ...chip(x + 34, y + 40, icon, ICONKEY[colour], { size: 50, bg: colour + "14" }),
        t(x + 34, y + 118, w - 68, 44, name, { fs: T.h3, ff: "c", c: C.ink, lh: 40, ls: -0.5, nowrap: true }),
        t(x + 34, y + 172, w - 92, 78, blurb, { fs: T.small, fw: "l", c: C.body, lh: 26 }),
        r(x + 34, y + h - 38, 30, 3, { fill: colour }),
      ];
    }),
  ],
};

/* ════════════════════════════════════════════════════════ 3 — DIVIDER */

export const div01: Slide = {
  id: "div-01",
  nav: "01 — Overview",
  chapter: CH,
  bg: C.dark,
  els: divider(
    "01",
    "Overview",
    "the thesis",
    "Portfolio map, market moment\n& the strategic thesis.",
    [
      "Three brands, one group, zero shared content",
      "The Chinese shift already happened",
      "Same group. Three different games.",
      "This category is won on content",
    ],
    "#4FA3DE",
  ),
};

/* ════════════════════════════════════════════════════════ 4 — THE PORTFOLIO */

const PORTFOLIO = [
  {
    b: BRAND.bestune, key: "bestune", icon: "users",
    handle: "@bestune_sa",
    desc: "FAW passenger-vehicle franchise — SUVs and sedans.",
    verdict: "The portfolio's largest account.",
    stats: [["32K", "Followers"], ["2,217", "Posts"]],
  },
  {
    b: BRAND.b212, key: "b212", icon: "mountain",
    handle: "@212_saudi",
    desc: "BAW retro off-road 4×4 franchise.",
    verdict: "The newest account, the strongest story.",
    stats: [["Smallest", "Footprint"], ["Richest", "Heritage"]],
  },
  {
    b: BRAND.souq, key: "souq", icon: "store",
    handle: "@motorsouq_sa",
    desc: "Multi-brand dealer — seven physical branches.",
    verdict: "A sales channel, not a brand voice.",
    stats: [["78K", "On X"], ["≈0", "Engagement"]],
  },
];

export const portfolio: Slide = {
  id: "portfolio",
  n: 4,
  nav: "The portfolio",
  chapter: CH,
  els: [
    ...frame(CH, 4),
    display([{ t: "Three brands, one group,\n" }, { t: "zero shared content", c: S.neg, i: true }], 128, { fs: 58 }),
    standfirst(
      "Taajeer Group runs three separate accounts as if they were three unrelated companies — while two of them share the same hotline.",
      304,
      1150,
    ),

    ...PORTFOLIO.flatMap(({ b, key, icon, handle, desc, verdict, stats }, k) => {
      const x = MX + k * 580;
      const y = 412;
      const w = 536;
      const h = 452;
      return [
        ...softCard(x, y, w, h, { line: b.edge, tab: b.ink }),
        ...chip(x + 34, y + 40, icon, key, { size: 48, bg: b.tint }),
        mark(key, x + w - 34, y + 44, 40, "r"),

        t(x + 34, y + 122, w - 68, 34, handle, { fs: T.h4, ff: "c", fw: "b", c: b.ink, nowrap: true }),
        t(x + 34, y + 168, w - 68, 58, desc, { fs: T.small, fw: "l", c: C.body, lh: 25 }),

        rule(x + 34, y + 248, w - 68, C.rule),
        t(x + 34, y + 274, w - 68, 60, verdict, { fs: T.body, ff: "c", fw: "b", c: C.ink, lh: 26 }),

        ...stats.flatMap(([v, cap], j) => [
          t(x + 34 + j * 156, y + 352, 150, 34, v, { fs: 28, ff: "c", c: b.ink, ls: -0.5, nowrap: true }),
          r(x + 34 + j * 156, y + 392, 24, 2, { fill: b.ink }),
          label(x + 34 + j * 156, y + 406, 150, cap, C.muted, { fs: T.tiny }),
        ]),
      ];
    }),

    // Bestune and Motor Souq answer the same phone. The bracket links those two
    // and is deliberately broken over 212's column, which does not.
    r(380, 894, 1, 26, { fill: C.faint }),
    r(1540, 894, 1, 26, { fill: C.faint }),
    r(380, 920, 366, 1, { fill: C.faint }),
    r(1174, 920, 366, 1, { fill: C.faint }),
    ...chip(746, 902, "phone", "muted", { size: 36, bg: C.wash }),
    t(790, 908, 384, 24, "Same hotline · 800 749 8888", { fs: T.small, fw: "b", c: C.muted, nowrap: true }),
  ],
};

/* ════════════════════════════════════════════════════════ 5 — THE MARKET MOMENT */

/** Weekly hours per user, Saudi platforms. Lifted off the source deck's chart,
 *  which shipped with an unlabelled axis. TikTok's 34h 48m is stated on p.28. */
const TIME_SPENT = [
  { name: "TikTok", value: 34.8, vlabel: "34h 48m", c: C.ink },
  { name: "Platform 2", value: 11.4, vlabel: "11h 24m", c: "#CFD5DC" },
  { name: "Platform 3", value: 9.5, vlabel: "9h 30m", c: "#CFD5DC" },
  { name: "Platform 4", value: 8.2, vlabel: "8h 12m", c: "#CFD5DC" },
  { name: "Platform 5", value: 6.4, vlabel: "6h 24m", c: "#CFD5DC" },
  { name: "Platform 6", value: 5.2, vlabel: "5h 12m", c: "#CFD5DC" },
];

export const marketMoment: Slide = {
  id: "market-moment",
  n: 5,
  nav: "The market moment",
  chapter: CH,
  els: [
    ...frame(CH, 5),
    display([{ t: "The Chinese shift already happened.\n" }, { t: "The content shift didn't", c: S.neg, i: true }, { t: "." }], 128, { fs: 54 }),
    standfirst(
      "The Saudi buyer no longer sees Chinese brands as a budget alternative — yet these brands still speak in the language of the spec sheet.",
      292,
      1040,
    ),

    // Left: the two proof points that the shift already landed.
    ...softCard(MX, 404, 500, 232, { line: C.rule }),
    ...statTile(MX + 32, 436, 420, "5th", "Largest export market", { fs: 72 }),
    t(MX + 32, 556, 436, 64, "Saudi Arabia is now the world's 5th-largest market for Chinese cars — projected to cross 30% of new-car sales by end-2026.", {
      fs: T.micro, fw: "l", c: C.body, lh: 22,
    }),

    ...softCard(MX, 660, 500, 232, { line: C.rule }),
    ...statTile(MX + 32, 692, 420, "APEAL '25", "Direct cross-shop", { fs: 46 }),
    t(MX + 32, 792, 436, 64, "J.D. Power 2025 placed Chinese brands in direct competition with Japanese and Korean rivals on design and cabin tech.", {
      fs: T.micro, fw: "l", c: C.body, lh: 22,
    }),

    // Right: where the category is actually decided.
    ...softCard(MX + 552, 404, CW - 552, 488, { line: C.rule }),
    ...chip(MX + 584, 436, "play", "ink", { size: 42, bg: C.wash }),
    t(MX + 638, 444, 700, 28, "Weekly time spent per user — Saudi platforms", {
      fs: T.body, ff: "c", fw: "b", c: C.ink, nowrap: true,
    }),
    ...barsH(MX + 584, 512, CW - 616, TIME_SPENT, { rowH: 26, gap: 22, labelW: 130 }),
    r(MX + 584, 812, CW - 616, 1, { fill: C.rule }),
    t(MX + 584, 836, 900, 24, "TikTok leads — and all three brands are dormant on it.", {
      fs: T.small, fw: "b", c: C.ink, nowrap: true,
    }),

    ...takeaway(
      936,
      "The takeaway",
      "The shift in buying behaviour is complete. The shift in content has not begun. That gap is the opportunity.",
    ),
  ],
};

/* ════════════════════════════════════════════════════════ 6 — THREE GAMES */

const GAMES = [
  {
    b: BRAND.bestune, key: "bestune", icon: "shield-check", n: "01",
    game: "The family-trust game",
    body: "SUVs and sedans for the family that cross-shops the Creta and the Camry. The game: justify the price gap over the lower Chinese tier — SAR 83K against 40–45K — anchored by a 5-year / 150,000 km warranty and FAW's 68-year story.",
  },
  {
    b: BRAND.b212, key: "b212", icon: "mountain", n: "02",
    game: "The identity & adventure game",
    body: "Not a family car — an enthusiast's tool. It sells heritage (a 1960s military model) and off-road capability, not practicality. The game: own the retro off-roader conversation before Tank 300 locks it down.",
  },
  {
    b: BRAND.souq, key: "souq", icon: "hand-coins", n: "03",
    game: "Not a brand game at all",
    body: "A retail entity. The game is different: not personality-building, but converting purchase intent into sales — and activating an under-used asset (seven branches) that feeds the sister brands.",
  },
];

export const threeGames: Slide = {
  id: "three-games",
  n: 6,
  nav: "Three different games",
  chapter: CH,
  els: [
    ...frame(CH, 6),
    display([{ t: "Same group.\n" }, { t: "Three completely different games", c: BRAND.b212.ink, i: true }, { t: "." }], 128, { fs: 54 }),
    standfirst("The greatest risk in this portfolio is marketing all three brands in the same voice. They are not copies.", 292, 1120),

    ...GAMES.flatMap(({ b, key, icon, n, game, body }, k) => {
      const x = MX + k * 580;
      const y = 400;
      const w = 536;
      const h = 442;
      return [
        ...softCard(x, y, w, h, { line: b.edge, fill: b.tint, shadow: false }),
        ghost(x + w - 30, y + 14, n, "#FFFFFF", 100),
        ...chip(x + 34, y + 40, icon, key, { size: 48, bg: C.white }),
        mark(key, x + w - 34, y + 44, 40, "r"),
        t(x + 34, y + 118, w - 68, 86, game, { fs: 28, ff: "c", c: b.ink, lh: 36, ls: -0.4 }),
        r(x + 34, y + 216, 30, 2, { fill: b.ink }),
        t(x + 34, y + 244, w - 74, 180, body, { fs: T.small, fw: "l", c: C.body, lh: 27 }),
      ];
    }),

    ...takeaway(
      896,
      "The insight",
      "Three games demand three content strategies. The adventure tone that fits 212 undermines the reassurance Bestune is built on. Unified in management — never in message.",
      { h: 84 },
    ),
  ],
};

/* ════════════════════════════════════════════════════════ 7 — WON ON CONTENT */

const PROOF = [
  {
    logoKey: "jetour", iconKey: "ink", icon: "trending-up",
    claim: "Won on content, not spec",
    body: "Despite an entry price higher than several rivals, Jetour led Chinese-brand sales in the UAE in 2024 by selling a journey, not a car.",
    c: C.ink, tint: C.wash,
  },
  {
    logoKey: "tank300", iconKey: "ink", icon: "mountain",
    claim: "Proof, not price ads",
    body: "Tank is locking down the KSA off-road conversation through community content and desert capability — not price advertising.",
    c: C.ink, tint: C.wash,
  },
  {
    logoKey: null, iconKey: "neg", icon: "trending-down",
    claim: "Static in a video market",
    body: "All three brands spend their energy on static offer posts, in a market watching vertical video 34 hours a week. That gap is ours.",
    c: S.neg, tint: S.negTint,
  },
];

export const wonOnContent: Slide = {
  id: "won-on-content",
  n: 7,
  nav: "Won on content",
  chapter: CH,
  els: [
    ...frame(CH, 7),
    display([{ t: "This category is won on " }, { t: "content", c: BRAND.souq.ink, i: true }, { t: ",\nnot spec sheets." }], 128, { fs: 54 }),
    standfirst(
      "Every Chinese brand in the Saudi market says the same thing — price, warranty, specs. The winning brand won't be the one with the best specs; it will be the one with the best story.",
      292,
      1180,
    ),

    ...PROOF.flatMap(({ logoKey, iconKey, icon, claim, body, c, tint }, k) => {
      const x = MX + k * 580;
      const y = 430;
      const w = 536;
      const h = 396;
      return [
        ...softCard(x, y, w, h, { fill: tint, line: k === 2 ? "#EBD3CF" : C.rule, shadow: false }),
        ...chip(x + 34, y + 38, icon, iconKey, { size: 48, bg: C.white }),
        logoKey
          ? mark(logoKey, x + w - 34, y + 42, 40, "r")
          : t(x + w - 214, y + 48, 180, 28, "Bestune · 212 · Motor Souq", { fs: T.tiny, fw: "b", c: c, al: "r", caps: true, ls: 1, nowrap: true }),
        t(x + 34, y + 118, w - 68, 78, claim, { fs: 28, ff: "c", c: C.ink, lh: 35, ls: -0.4 }),
        r(x + 34, y + 208, 30, 2, { fill: c }),
        t(x + 34, y + 236, w - 74, 140, body, { fs: T.small, fw: "l", c: C.body, lh: 27 }),
      ];
    }),

    ...takeaway(
      886,
      "The principle",
      "Everything that follows rests on one idea: stop selling specs, and start building three stories.",
    ),
  ],
};

export const section01: Slide[] = [cover, contents, div01, portfolio, marketMoment, threeGames, wonOnContent];
