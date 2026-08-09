"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import RotatingText from "../ui/RotatingText";
/* eslint-disable @next/next/no-img-element */

/* ------------------------------------------------------------------
   Arabic mirror of the English hero. Every `left` in the stage became a
   `right` and vice versa — for absolutely positioned boxes inside a
   fixed-width canvas that is a true horizontal mirror, and it leaves each
   element's own contents (text, logos) unflipped.

   The hero is authored on a fixed 1520 x 880 design canvas.
   `u(px)` converts a design pixel into a real length via --u, the
   stage's single scale knob. It is deliberately NOT em-based: em
   would resolve against each element's own font-size and drift.
------------------------------------------------------------------ */
const u = (px: number) => `calc(var(--u) * ${px})`;

/* Brand palette — deep teal + pale mint */
const TEAL = "#004D5A";
const MINT = "#CFF7EE";
const TEAL_MID = "#00A99B";
const TEAL_SOFT = "#6FD8C4";
const INK = "#04323A";
const MUTED = "#5B7B84";

const DISPLAY = "'Ahmed Serif Display', serif";
/* The decorative tails. ArabicTailProcessor only walks h1-h6 and .ar-heading,
   so none of the hero's display text qualified — and wrapping words after
   mount would re-measure pills that are already positioned on a fixed grid.
   Declaring the features here puts the swash in on the first paint instead. */
const SWASH = '"ss01" 1, "swsh" 1, "salt" 1, "calt" 1, "liga" 1, "rlig" 1';

/* Flat teal, not the five-stop gradient it used to be — the marquee band it
   sits above is flat now too, and the two read as one language this way. */
const G_PILL = "#004D5A";
/* Flat mint, not the two-stop gradient it used to be — the pill and the
   marquee band beside it are flat now too. */
const G_BADGE = MINT;
const G_DOT = "linear-gradient(135deg,#5FDCC6 0%,#004D5A 100%)";

/* the eye sits in the pill's badge; masked rather than <img> so it inherits
   whatever gradient the element behind it is painted with */
const EYE_MASK = {
  WebkitMaskImage: "url(/ext/eye.png)",
  maskImage: "url(/ext/eye.png)",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
} as const;

/* Two words each, and close in length, so the slot's width barely moves as
   they cycle — single words left the pill visibly breathing. */
const ROTATING = ["أثر ملموس", "نمو مستدام", "حضور رقمي", "استراتيجية واضحة", "ابتكار عملي", "نتائج مقاسة"];

const clients = [
  { name: "Ooredoo", src: "/logos/ooredoo.png", h: 30 },
  { name: "QNB", src: "/logos/qnb.png", h: 30 },
  { name: "Amazon", src: "/logos/amazon.svg", h: 28 },
  { name: "BinGhatti", src: "/logos/binghatti.png", h: 42 },
  { name: "Dunkin'", src: "/logos/dunkin.png", h: 30 },
  { name: "Geely", src: "/logos/geely.png", h: 54 },
];

/* x, y, diameter, colour — the confetti of small dots framing the art */
const confetti: [number, number, number, string][] = [
  [92, 604, 20, TEAL],
  [120, 650, 11, TEAL_MID],
  [44, 734, 32, TEAL_SOFT],
  [150, 782, 14, TEAL],
  [1466, 722, 30, TEAL_MID],
  [1500, 686, 14, TEAL],
  [1392, 780, 12, TEAL_SOFT],
  [1246, 760, 12, TEAL],
];

/* Four rows of equal height, separated by one uniform gap, so the whole
   stack reads as evenly spaced. CYn is each row's centreline. */
const ROW_H = 148;
const ROW_GAP = 36;
const ROW1_T = 44;
const ROW2_T = ROW1_T + ROW_H + ROW_GAP;   // 228
const ROW3_T = ROW2_T + ROW_H + ROW_GAP;   // 412
const ROW4_T = ROW3_T + ROW_H + ROW_GAP;   // 596
const CY1 = ROW1_T + ROW_H / 2;            // 118
const CY2 = ROW2_T + ROW_H / 2;            // 302
const CY3 = ROW3_T + ROW_H / 2;            // 486
const CY4 = ROW4_T + ROW_H / 2;            // 670

/* Circle diameter is set off ROW_H, not chosen freely: a badge riding a band's
   centreline only clears the band's rounded cap if it is smaller than the band
   is tall. 130 against a 148 band leaves 9px of dark showing all the way round. */
const BADGE_D = 130;
const BADGE_STEP = 114;         // 16px of overlap, like the reference cluster
const BADGE_INSET = (ROW_H - BADGE_D) / 2;

/* lays a run of equal circles along one centreline */
const badgeLine = (items, x0, cy) =>
  items.map((c, i) => ({ ...c, x: x0 + i * BADGE_STEP, cy, d: BADGE_D }));

/* row 1 — channels, parked at the end of the top band.
   The band runs to BAND1_R; three circles only clear the white pill because
   of the extra length, so the two numbers move together. */
const BAND1_L = 252;
const BAND1_R = 1462;

const topRow = [
  { src: "/logos/google-cloud.png", alt: "Google Cloud", fill: false, k: 0.62 },
  { src: "/logos/tiktok-logo.png", alt: "TikTok", fill: false, k: 0.62 },
  { src: "/logos/google-logo.png", alt: "Google", fill: false, k: 0.62 },
];

const topBadges = badgeLine(
  topRow,
  /* right-aligned inside the band, BADGE_INSET clear of its cap */
  BAND1_R - BADGE_INSET - BADGE_D - (topRow.length - 1) * BADGE_STEP,
  CY1
);

/* row 4 — portrait first, then the stack he works in.
   `fill` images bleed to the circle edge (the ChatGPT mark keeps its green). */
const cluster = badgeLine(
  [
    { src: "/ahmed.jpeg", alt: "Ahmed Ali", fill: true },
    { src: "/logos/gemini.png", alt: "Google Gemini", fill: false, k: 0.62 },
    { src: "/logos/chatgpt.jpg", alt: "ChatGPT", fill: true },
    { src: "/logos/react-logo.png", alt: "React", fill: false, k: 0.62 },
    { src: "/ext/google-analytics.png", alt: "Google Analytics", fill: false },
  ],
  /* centred in the 672→1312 band */
  672 + (640 - (4 * BADGE_STEP + BADGE_D)) / 2,
  CY4
);

/* shared type ramp for the three headline pills */
const pillType = {
  fontFamily: DISPLAY,
  fontFeatureSettings: SWASH,
  fontWeight: 700,
  fontSize: u(62),
  /* Arabic display glyphs are taller in the line box than the Latin
     face this grid was drawn for. */
  lineHeight: 1.75,
  letterSpacing: "0",
  whiteSpace: "nowrap" as const,
};

export default function HeroAr() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(".hs-anim", { opacity: 1 });
        return;
      }

      /* held until the preloader's iris opens, so the reveal lands on a hero
         that is still building itself rather than one already settled */
      const tl = gsap.timeline({ paused: true, delay: 0.1 });
      const start = () => tl.play();
      window.addEventListener("preloader:done", start, { once: true });
      /* if the preloader never mounts (or dies), don't hold the hero hostage */
      const failsafe = setTimeout(start, 4000);
      cleanups.push(() => {
        window.removeEventListener("preloader:done", start);
        clearTimeout(failsafe);
      });

      tl.fromTo(
        ".hs-band",
        { scaleX: 0, opacity: 1 },
        { scaleX: 1, duration: 0.95, ease: "expo.out", stagger: 0.1 }
      )
        .fromTo(
          ".hs-pill",
          { y: 46, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", stagger: 0.12 },
          "-=0.75"
        )
        .fromTo(
          ".hs-badge",
          { scale: 0.4, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)", stagger: 0.09 },
          "-=0.55"
        )
        .fromTo(
          ".hs-dot",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2.2)",
            stagger: { each: 0.045, from: "random" },
          },
          "-=0.5"
        )
        .fromTo(
          ".hs-side",
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.09 },
          "-=0.6"
        );
    }, root);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative overflow-hidden bg-white"
      style={{ minHeight: "100svh" }}
    >
      {/* ============================== DESKTOP STAGE ============================== */}
      <div
        className="hidden lg:flex items-center justify-center w-full"
        style={{ minHeight: "100svh", paddingTop: "70px" }}
      >
        <div
          data-stage="1"
          className="relative"
          style={{
            ["--u" as string]: "min(0.0625vw, 0.095vh, 1px)",
            width: u(1520),
            height: u(880),
          }}
        >
          {/* ---------- confetti dots ---------- */}
          {confetti.map(([x, y, d, c], i) => (
            <span
              key={i}
              className="hs-anim hs-dot absolute rounded-full"
              style={{ right: u(x), top: u(y), width: u(d), height: u(d), background: c }}
            />
          ))}

          {/* ================= ROW 1 — "Digital" ================= */}
          <div
            className="hs-anim hs-band absolute"
            style={{
              right: u(BAND1_L),
              top: u(44),
              width: u(BAND1_R - BAND1_L),
              height: u(148),
              borderRadius: u(74),
              background: TEAL,
              transformOrigin: "right center",
            }}
          />
          <div
            className="hs-anim hs-pill absolute flex items-center"
            style={{
              right: u(246),
              top: u(44),
              height: u(148),
              padding: `0 ${u(58)}`,
              borderRadius: u(74),
              background: "#fff",
              border: `${u(3)} solid ${TEAL}`,
              boxShadow: `0 ${u(10)} ${u(30)} rgba(0,77,90,0.10)`,
            }}
          >
            <span style={{ ...pillType, fontSize: u(54), color: INK }}>تطوير الأعمال ونمو الإيرادات</span>
          </div>
          {topBadges.map((c) => (
            <div
              key={c.alt}
              className="hs-anim hs-badge absolute flex items-center justify-center overflow-hidden"
              style={{
                right: u(c.x),
                top: u(c.cy - c.d / 2),
                width: u(c.d),
                height: u(c.d),
                borderRadius: "50%",
                background: "#fff",
                border: `${u(5)} solid ${TEAL}`,
                boxShadow: `0 ${u(12)} ${u(28)} rgba(4,50,58,0.18)`,
              }}
            >
              <img
                src={c.src}
                alt={c.alt}
                style={
                  c.fill
                    ? { width: "100%", height: "100%", objectFit: "cover" }
                    : { width: u(c.d * (c.k ?? 0.48)), height: u(c.d * (c.k ?? 0.48)), objectFit: "contain" }
                }
              />
            </div>
          ))}

          {/* ================= ROW 2 — rotating word ================= */}
          <div
            className="hs-anim hs-pill absolute flex items-center justify-center"
            style={{
              left: u(665),
              top: u(ROW2_T),
              height: u(148),
              padding: `0 ${u(130)}`,
              borderRadius: u(74),
              background: G_PILL,
              boxShadow: `0 ${u(14)} ${u(34)} rgba(0,77,90,0.26)`,
            }}
          >
            {/* flex, not baseline: RotatingText's root is an overflow-hidden
                inline-block, so its baseline is its bottom edge and baseline
                alignment would ride the word up out of the pill's centre */}
            <span className="rt-center flex items-center justify-center" style={{ ...pillType, color: "#fff" }}>
              <RotatingText
                texts={ROTATING}
                mainClassName="rt-center overflow-hidden"
                rotationInterval={2400}
              />
            </span>

            {/* the concave "bite" fanning out of the pill's right end */}
            <svg
              viewBox="0 0 180 72"
              className="absolute pointer-events-none"
              style={{ left: u(-20), top: u(38), width: u(140), height: u(72) }}
            >
              {/* mirrored inside the viewBox, not on the element — GSAP owns
                  this node's transform and would overwrite an outer flip */}
              <g transform="translate(180,0) scale(-1,1)">
              <defs>
                <linearGradient id="hs-fan" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#004D5A" stopOpacity="0" />
                  <stop offset="45%" stopColor="#4FB9AE" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#CFF7EE" />
                </linearGradient>
              </defs>
              <path
                d="M0 0 C50 0 72 8 98 22 C124 36 150 36 180 36 C150 36 124 36 98 50 C72 64 50 72 0 72 Z"
                fill="url(#hs-fan)"
              />
              </g>
            </svg>

            {/* white badge with the gradient core, biting into the pill */}
            <div
              className="hs-badge absolute flex items-center justify-center"
              style={{
                left: u(-108),
                top: u(-6),
                width: u(160),
                height: u(160),
                borderRadius: "50%",
                background: "#fff",
                border: `${u(5)} solid ${TEAL}`,
                boxShadow: `0 ${u(14)} ${u(34)} rgba(4,50,58,0.15)`,
              }}
            >
              {/* eye glyph, masked so it carries the same gradient the dot had */}
              <span
                style={{
                  width: u(108),
                  height: u(56),
                  background: G_DOT,
                  display: "block",
                  ...EYE_MASK,
                }}
              />
            </div>
          </div>

          {/* mint speech bubble — availability */}
          <svg
            className="hs-anim hs-badge absolute"
            viewBox="0 0 80 40"
            /* scaleX flips the shape itself — the mirror moved where it sits,
               not which way it points. */
            style={{ right: u(1040), top: u(CY2 + 64), width: u(80), height: u(40) }}
          >
            <g transform="translate(80,0) scale(-1,1)">
              <path
                d="M30 0 H80 V4 C76 18 54 32 10 39 C3 40 0 36 5 32 C20 24 27 12 30 0 Z"
                fill={MINT}
              />
            </g>
          </svg>
          <div
            className="hs-anim hs-badge absolute"
            style={{
              right: u(986),
              top: u(CY2 - 72),
              width: u(356),
              height: u(144),
              borderRadius: u(72),
              background: MINT,
              boxShadow: `0 ${u(14)} ${u(34)} rgba(0,169,155,0.20)`,
            }}
          >
            <div
              className="absolute flex items-center"
              style={{
                right: u(30),
                top: u(34),
                width: u(296),
                height: u(76),
                borderRadius: u(38),
                background: "#fff",
                padding: `0 ${u(22)}`,
                gap: u(14),
              }}
            >
              <span
                className="relative inline-flex items-center"
                style={{ width: u(46), height: u(28) }}
              >
                <span
                  className="absolute rounded-full"
                  style={{ left: 0, width: u(28), height: u(28), background: TEAL_MID }}
                />
                <span
                  className="absolute rounded-full"
                  style={{
                    right: u(18),
                    width: u(28),
                    height: u(28),
                    background: TEAL,
                    border: `${u(2.5)} solid #fff`,
                  }}
                />
              </span>
              <span className="flex flex-col" style={{ gap: u(3) }}>
                <span
                  className="inline-flex items-center"
                  style={{ gap: u(7), fontSize: u(20), fontWeight: 700, color: INK, lineHeight: 1.1 }}
                >
                  {/* one solid dot — the second copy behind it was a halo
                      scaling to 2.4x on a loop, which read as a neon ping */}
                  <span className="relative inline-flex" style={{ width: u(10), height: u(10) }}>
                    <span className="absolute inset-0 rounded-full" style={{ background: TEAL_MID }} />
                  </span>
                  متاح للعمل
                </span>
                <span style={{ fontSize: u(13), color: MUTED, lineHeight: 1.1 }}>
                  جدة · عن بُعد · الشرق الأوسط
                </span>
              </span>
            </div>
          </div>

          {/* ================= ROW 3 — "منتجات رقمية تنمو وتستمر" ================= */}
          <div
            className="hs-anim hs-band absolute"
            style={{
              right: u(196),
              top: u(ROW3_T),
              width: u(1144),
              height: u(148),
              borderRadius: u(74),
              background: TEAL,
              transformOrigin: "right center",
            }}
          />
          <div
            className="hs-anim hs-badge absolute flex items-center justify-center"
            style={{
              right: u(300),
              top: u(CY3 - 86),
              width: u(172),
              height: u(172),
              borderRadius: "50%",
              background: G_BADGE,
              border: `${u(5)} solid ${TEAL}`,
              boxShadow: `0 ${u(16)} ${u(36)} rgba(0,77,90,0.22)`,
            }}
          >
            <img
              src="/logos/ai-robot.png"
              alt="AI"
              style={{
                width: u(94),
                height: u(94),
                objectFit: "contain",
                // knocked out to the site ink, not white — the disc behind it
                // is mint now, and white-on-mint left the robot barely there
                filter: "brightness(0) saturate(100%) invert(13%) sepia(31%) saturate(1444%) hue-rotate(148deg) brightness(94%) contrast(97%)",
              }}
            />
          </div>
          {/* right-anchored so the pill grows leftwards inside the band */}
          <div
            className="hs-anim hs-pill absolute flex items-center"
            style={{
              left: u(180),
              top: u(ROW3_T),
              height: u(148),
              padding: `0 ${u(54)}`,
              borderRadius: u(74),
              background: "#fff",
              border: `${u(3)} solid ${TEAL}`,
              boxShadow: `0 ${u(10)} ${u(30)} rgba(0,77,90,0.10)`,
            }}
          >
            <span style={{ ...pillType, color: INK }}>
              منتجات رقمية تنمو وتستمر
            </span>
          </div>

          {/* connector: node → dashed route → arrow into the circle cluster */}
          <span
            className="hs-anim hs-dot absolute rounded-full"
            style={{
              right: u(1360),
              top: u(CY3 - 14),
              width: u(28),
              height: u(28),
              background: TEAL,
              border: `${u(6)} solid ${MINT}`,
            }}
          />
          <svg
            className="hs-anim hs-dot absolute pointer-events-none"
            viewBox="0 0 360 250"
            fill="none"
            /* Same for the dashed connector: its arrowhead pointed the wrong way. */
            style={{ right: u(1140), top: u(CY3 - 12), width: u(360), height: u(250) }}
          >
            <g transform="translate(360,0) scale(-1,1)">
            <path
              d="M234 12 H340 Q360 12 360 32 V176 Q360 196 340 196 H196"
              stroke={TEAL}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="2 9"
              style={{ animation: "hero-dash 1.6s linear infinite" }}
            />
            <path
              d="M210 187 L194 196 L210 205"
              stroke={TEAL}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            </g>
          </svg>

          {/* ================= ROW 4 — the badge line ================= */}
          <div
            className="hs-anim hs-band absolute"
            style={{
              right: u(672),
              top: u(ROW4_T),
              width: u(640),
              height: u(148),
              borderRadius: u(74),
              background: TEAL,
              transformOrigin: "right center",
            }}
          />
          {cluster.map((c) => (
            <div
              key={c.alt}
              className="hs-anim hs-badge absolute flex items-center justify-center overflow-hidden"
              style={{
                right: u(c.x),
                top: u(c.cy - c.d / 2),
                width: u(c.d),
                height: u(c.d),
                borderRadius: "50%",
                background: "#fff",
                border: `${u(5)} solid ${TEAL}`,
                boxShadow: `0 ${u(12)} ${u(28)} rgba(4,50,58,0.18)`,
              }}
            >
              <img
                src={c.src}
                alt={c.alt}
                style={
                  c.fill
                    ? { width: "100%", height: "100%", objectFit: "cover" }
                    : { width: u(c.d * (c.k ?? 0.48)), height: u(c.d * (c.k ?? 0.48)), objectFit: "contain" }
                }
              />
            </div>
          ))}

          {/* ================= LEFT COLUMN — the positioning line ================= */}
          <p
            className="hs-anim hs-side absolute"
            style={{
              right: u(196),
              top: u(600),
              width: u(430),
              fontSize: u(18),
              lineHeight: 1.7,
              color: MUTED,
            }}
          >
            تسويق بالأداء، وتطوير منتجات، وتكامل ذكاء اصطناعي.
            <span style={{ color: INK, fontWeight: 700 }}> +5 سنوات </span>من صناعة النمو
            في مصر وقطر والسعودية والإمارات. أبني أنظمة تحوّل الزيارة إلى عميل،
            والعميل إلى نمو متراكم يُقاس بالأرقام لا بالانطباعات. من أول سطر
            استراتيجية إلى آخر سطر كود، كل شيء يُدار تحت سقف واحد.
          </p>

          {/* ================= CLIENT LOGOS ================= */}
          <div
            className="hs-anim hs-side absolute flex items-center justify-center"
            style={{ left: 0, top: u(792), width: "100%", gap: u(78) }}
          >
            {clients.map((c) => (
              <img
                key={c.name}
                src={c.src}
                alt={c.name}
                className="transition-opacity duration-300 hover:!opacity-100"
                style={{
                  height: u(c.h),
                  width: "auto",
                  maxWidth: u(150),
                  objectFit: "contain",
                  filter: c.keepColor ? "none" : "brightness(0)",
                  opacity: c.keepColor ? 0.8 : 0.36,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ============================== MOBILE / TABLET ============================== */}
      <div className="lg:hidden relative px-5 sm:px-8 pt-28 pb-14">
        <span className="hs-anim hs-dot absolute rounded-full" style={{ left: 14, top: 150, width: 14, height: 14, background: TEAL }} />
        <span className="hs-anim hs-dot absolute rounded-full" style={{ right: 18, top: 118, width: 10, height: 10, background: TEAL_MID }} />
        <span className="hs-anim hs-dot absolute rounded-full" style={{ left: 20, bottom: 56, width: 20, height: 20, background: TEAL_MID }} />
        <span className="hs-anim hs-dot absolute rounded-full" style={{ right: 26, bottom: 230, width: 16, height: 16, background: TEAL }} />

        <div className="relative max-w-[560px] mx-auto">
          {/* availability bubble */}
          <div
            className="hs-anim hs-badge inline-flex items-center gap-2.5 rounded-full ps-2 pe-4 py-2 mb-6"
            style={{ background: MINT }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5">
              <span className="relative inline-flex w-2 h-2">
                <span className="absolute inset-0 rounded-full" style={{ background: TEAL_MID }} />
              </span>
              <span className="text-[12px] font-bold" style={{ color: INK }}>متاح للعمل</span>
            </span>
            <span className="text-[12px] font-bold" style={{ color: TEAL }}>جدة · عن بُعد</span>
          </div>

          {/* headline pills */}
          <div className="space-y-3 mb-8">
            <div
              className="hs-anim hs-pill inline-flex items-center rounded-full px-6 py-3.5 bg-white"
              style={{ border: `2px solid ${TEAL}`, boxShadow: "0 8px 22px rgba(0,77,90,0.10)" }}
            >
              <span
                style={{ fontFamily: DISPLAY, fontFeatureSettings: SWASH, fontWeight: 700, fontSize: "clamp(26px,6.4vw,40px)", lineHeight: 1.3, color: INK }}
              >
                تطوير الأعمال ونمو الإيرادات
              </span>
            </div>

            <div className="flex items-center gap-3 ms-5 sm:ms-8">
              <div
                className="hs-anim hs-pill inline-flex items-center justify-center rounded-full px-7 py-3.5"
                style={{ background: G_PILL, boxShadow: "0 10px 26px rgba(0,77,90,0.26)" }}
              >
                <span
                  className="rt-center flex items-center justify-center"
                  style={{ fontFamily: DISPLAY, fontFeatureSettings: SWASH, fontWeight: 700, fontSize: "clamp(30px,8vw,46px)", lineHeight: 1.5, color: "#fff" }}
                >
                  <RotatingText texts={ROTATING} mainClassName="rt-center overflow-hidden" rotationInterval={2400} />
                </span>
              </div>
              <span
                className="hs-anim hs-badge shrink-0 flex items-center justify-center rounded-full bg-white"
                style={{ width: 58, height: 58, boxShadow: "0 10px 24px rgba(4,50,58,0.14)" }}
              >
                <span className="block" style={{ width: 38, height: 20, background: G_DOT, ...EYE_MASK }} />
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="hs-anim hs-badge shrink-0 flex items-center justify-center rounded-full"
                style={{ width: 58, height: 58, background: G_BADGE, border: `3px solid ${TEAL}`, boxShadow: "0 10px 24px rgba(0,77,90,0.18)" }}
              >
                <svg viewBox="0 0 48 48" fill="none" style={{ width: 28, height: 28 }}>
                  <circle cx="24" cy="24" r="17" stroke="#fff" strokeWidth="2.4" opacity="0.55" />
                  <circle cx="24" cy="24" r="10.5" stroke="#fff" strokeWidth="2.4" opacity="0.8" />
                  <circle cx="24" cy="24" r="4" fill="#fff" />
                  <path d="M24 24L40 8" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M34 8h6v6" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div
                className="hs-anim hs-pill inline-flex items-center rounded-full px-5 py-3.5 bg-white"
                style={{ border: `2px solid ${TEAL}`, boxShadow: "0 8px 22px rgba(0,77,90,0.10)" }}
              >
                <span
                  style={{ fontFamily: DISPLAY, fontFeatureSettings: SWASH, fontWeight: 700, fontSize: "clamp(26px,6.6vw,40px)", lineHeight: 1.3, color: INK }}
                >
                  منتجات رقمية تنمو وتستمر
                </span>
              </div>
            </div>
          </div>

          {/* circles strip */}
          <div className="hs-anim hs-badge relative inline-flex items-center rounded-full mb-8" style={{ background: TEAL, padding: 4 }}>
            <span className="block overflow-hidden rounded-full" style={{ width: 62, height: 62, border: "3px solid #fff" }}>
              <img src="/ahmed.jpeg" alt="Ahmed Ali" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </span>
            <span className="relative flex items-center justify-center rounded-full -ms-2" style={{ width: 62, height: 62, background: MINT, border: "3px solid #fff" }}>
              <span className="absolute rounded-full" style={{ width: 34, height: 34, border: "3px solid #fff" }} />
            </span>
            <span className="relative flex items-center justify-center rounded-full -ms-2" style={{ width: 62, height: 62, background: "#fff", border: `3px solid ${TEAL}` }}>
              <svg viewBox="0 0 64 64" fill="none" style={{ width: 34, height: 34 }}>
                <path d="M8 50C22 50 20 14 34 14C46 14 44 42 56 42" stroke={TEAL} strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="56" cy="42" r="5" fill={TEAL} />
              </svg>
            </span>
          </div>

          {/* copy */}
          <p className="hs-anim hs-side ar-body text-[15px] leading-[2] mb-10" style={{ color: MUTED }}>
            تسويق بالأداء، وتطوير منتجات، وتكامل ذكاء اصطناعي.
            <span style={{ color: INK, fontWeight: 700 }}> +5 سنوات </span>من صناعة النمو
            في مصر وقطر والسعودية والإمارات. أبني أنظمة تحوّل الزيارة إلى عميل،
            والعميل إلى نمو متراكم يُقاس بالأرقام لا بالانطباعات. من أول سطر
            استراتيجية إلى آخر سطر كود، كل شيء يُدار تحت سقف واحد.
          </p>

          {/* logos */}
          <div className="hs-anim hs-side flex flex-wrap items-center gap-x-8 gap-y-5">
            {clients.map((c) => (
              <img
                key={c.name}
                src={c.src}
                alt={c.name}
                style={{
                  height: c.h,
                  width: "auto",
                  maxWidth: 110,
                  objectFit: "contain",
                  filter: c.keepColor ? "none" : "brightness(0)",
                  opacity: c.keepColor ? 0.8 : 0.36,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
