"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { DISPLAY, INK, MINT, TEAL } from "./ui/brand";
import Ico, { STARS } from "./ui/Ico";

/* Three marquees fill the screen and run, then tear off sideways — each in the
   direction it was already scrolling, so the exit reads as the same motion
   accelerating rather than a separate transition. The site is behind them. */

type Row = { dir: "l" | "r"; words: string[]; background: string; color: string };

/* Flat fills, not gradients — the hero pill and the marquee band are flat now
   too, and three gradients stacked full-screen was the loudest thing on the
   site before the site had even appeared. */
const BANDS = [
  { dir: "l" as const, background: TEAL, color: "#fff" },
  { dir: "r" as const, background: MINT, color: INK },
  { dir: "l" as const, background: INK, color: MINT },
];

/* The Arabic site translates its terminology throughout — its own marquee band
   says "تطوير الواجهات", not "React" — so the loading screen does too rather
   than dropping the visitor onto Latin words before the page even appears. */
const WORDS: Record<"en" | "ar", string[][]> = {
  en: [
    ["Performance Marketing", "SEO & SEM", "Google Ads", "Meta Ads", "Growth"],
    ["Next.js", "React", "Flutter", "AI Integration", "WordPress"],
    ["Strategy", "Product Design", "Analytics", "Brand", "Ahmed."],
  ],
  ar: [
    ["التسويق بالأداء", "تحسين محركات البحث", "إعلانات جوجل", "إعلانات ميتا", "النمو"],
    ["تطوير الواجهات", "تطبيقات الجوال", "الذكاء الاصطناعي", "إدارة المحتوى", "البرمجة"],
    ["الاستراتيجية", "تصميم المنتجات", "تحليل البيانات", "الهوية", "أحمد."],
  ],
};

/* the from-states have to be written before the browser paints, or the rows
   flash in place for a frame; useEffect is too late for that */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Preloader({ lang = "en" }: { lang?: "en" | "ar" }) {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const isAr = lang === "ar";
  const ROWS: Row[] = BANDS.map((b, i) => ({ ...b, words: WORDS[lang][i] }));

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const finish = () => {
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("preloader:done"));
      setDone(true);
    };

    document.body.style.overflow = "hidden";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(finish, 350);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });

      /* No slide-in: the rows are painted covering the screen from the very
         first frame — that's what kills the white flash — and the marquee
         scroll is already the motion. The timeline only has to get them off. */

      /* they cover the viewport edge to edge, so losing the white behind them
         is invisible — and it's what turns the exit into a reveal */
      tl.set(el, { background: "transparent" }, 1.55);

      /* out — each row keeps its own direction, accelerating away */
      ROWS.forEach((r, i) => {
        tl.to(
          `.pl-row-${i}`,
          { xPercent: r.dir === "l" ? -105 : 105, duration: 0.85, ease: "power3.in" },
          1.58 + i * 0.12
        );
      });

      const rush = () => tl.timeScale(3.5);
      window.addEventListener("pointerdown", rush);
      window.addEventListener("keydown", rush);
      return () => {
        window.removeEventListener("pointerdown", rush);
        window.removeEventListener("keydown", rush);
      };
    }, root);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    /* Forced LTR even on the Arabic page. The rows are flex strips animated
       with a negative translate; under dir="rtl" the flex axis flips, the
       translate runs the wrong way and each strip empties out mid-loop,
       leaving a blank tail. The words still shape correctly — bidi handles
       each phrase internally, only the order of the spans is pinned. */
    <div dir="ltr" ref={root} className="fixed inset-0 z-[10000] overflow-hidden flex flex-col" style={{ background: "#fff" }}>
      <style>{`
        @keyframes pl-l { from { transform: translate3d(0,0,0) } to { transform: translate3d(-33.3333%,0,0) } }
        @keyframes pl-r { from { transform: translate3d(-33.3333%,0,0) } to { transform: translate3d(0,0,0) } }
      `}</style>

      {ROWS.map((r, i) => (
        <div
          key={i}
          className={`pl-row-${i} flex items-center overflow-hidden`}
          style={{ height: "33.34vh", background: r.background, willChange: "transform" }}
        >
          <div
            /* `no-tail` deliberately opts OUT of ArabicTailProcessor. That
               processor wraps tail words in spans after mount, and the swash
               widens every one of them — on a strip that is already animating,
               the re-measure shuffles the words mid-loop. The swash is applied
               straight through font-feature-settings below instead, so it is
               there on the first paint and nothing reflows. */
            className={`flex shrink-0 whitespace-nowrap${isAr ? " no-tail" : ""}`}
            style={{
              gap: "clamp(24px,3.4vw,54px)",
              animation: `pl-${r.dir} ${16 + i * 3}s linear infinite`,
              fontFamily: isAr ? "'Ahmed Serif Display', serif" : DISPLAY,
              /* The same feature set .ar-word-wrap enables, minus the DOM
                 surgery — the font applies these to word-final forms itself. */
              fontFeatureSettings: isAr
                ? '"ss01" 1, "swsh" 1, "salt" 1, "calt" 1, "liga" 1, "rlig" 1'
                : undefined,
              fontWeight: 700,
              /* Arabic glyphs sit taller in the line box; without this the
                 descenders clip against the band edges. */
              lineHeight: isAr ? 1.6 : 1,
              fontSize: "clamp(30px,5.2vw,78px)",
              color: r.color,
              willChange: "transform",
            }}
          >
            {/* tripled so the -33.33% loop is seamless */}
            {[...r.words, ...r.words, ...r.words, ...r.words, ...r.words, ...r.words].map((w, j) => (
              <span key={j} className="flex items-center" style={{ gap: "clamp(24px,3.4vw,54px)" }}>
                {w}
                <Ico name={STARS[j % STARS.length]} size="1.05em" color={r.color} opacity={0.7} />
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
