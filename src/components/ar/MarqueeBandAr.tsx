"use client";

import { INK, MINT, NIGHT } from "../ui/brand";
import Ico, { STARS } from "../ui/Ico";

const row1 = ["التسويق بالأداء", "تحسين محركات البحث", "تطوير الويب", "الذكاء الاصطناعي", "إعلانات جوجل", "تطبيقات الجوال", "تحليل البيانات"];
const row2 = ["تطوير الواجهات", "البرمجة", "استراتيجية العلامة", "إعلانات ميتا", "إدارة المحتوى", "اختراق النمو", "تصميم المنتجات"];

/* Arabic mirror of the English band: two flat rows on a dark ground running
   opposite ways. */
function Row({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items, ...items, ...items];
  const animClass = direction === "left" ? "animate-[ml_60s_linear_infinite]" : "animate-[mr_60s_linear_infinite]";

  return (
    /* dir="ltr" because the strip is a flex row driven by a negative translate —
       under the page's RTL the axis flips, the animation runs against the order
       and the row empties out mid-loop. The words shape correctly regardless;
       only the order of the spans is pinned. */
    <div className="flex overflow-hidden" dir="ltr">
      <div className={`flex items-center gap-5 shrink-0 ${animClass}`} style={{ willChange: "transform" }}>
        {doubled.map((s, i) => (
          <span key={i} className="contents">
            <span
              className="ar-heading shrink-0 text-base md:text-lg px-5 md:px-6 py-2 md:py-2.5 rounded-full whitespace-nowrap"
              /* Arabic sits taller in the line box than the Latin build's 1 */
              style={{ background: MINT, color: INK, fontWeight: 400, lineHeight: 1.6 }}
            >
              {s}
            </span>
            <span className="flex items-center shrink-0 text-2xl md:text-3xl">
              <Ico name={STARS[i % STARS.length]} size="1.15em" color={MINT} opacity={0.9} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeBandAr() {
  return (
    <div className="relative" style={{ background: NIGHT, padding: "56px 0", overflow: "hidden" }}>
      <style>{`
        @keyframes ml { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes mr { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>

      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${NIGHT}, transparent)` }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, ${NIGHT}, transparent)` }} />

      <div className="flex flex-col gap-4">
        <Row items={row1} direction="left" />
        <Row items={row2} direction="right" />
      </div>
    </div>
  );
}