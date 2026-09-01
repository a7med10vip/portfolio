"use client";

import { PATHS, TARGET_MINUTES } from "@/app/fodi-cgm/data";
import { P, PD, O, LINE, RULE, OK, WARN, BLOCK, STATUS } from "./theme";

/**
 * الفجوة، مرسومة.
 *
 * التقرير كله يدور حول رقم واحد: الهدف خمس دقائق. المسافة بين هذا الهدف وبين
 * ما يعطيه كل مزود فعليا هي القرار. المقياس لوغاريتمي لأن المدى يمتد من دقيقة
 * إلى ثلاث ساعات، وعلى مقياس خطي تنسحق الدقيقة والخمس دقائق في نقطة واحدة.
 */
const MAX = 180;
const pos = (m: number) => (Math.log(m) / Math.log(MAX)) * 100;

const TICKS = [
  { m: 1, l: "دقيقة" },
  { m: 5, l: "5 دقائق" },
  { m: 30, l: "نصف ساعة" },
  { m: 90, l: "ساعة ونصف" },
  { m: 180, l: "3 ساعات" },
];

export default function LatencyRuler() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* منطقة الهدف */}
      <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
        <span className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full ar-body text-[12.5px]"
          style={{ background: `${OK}14`, color: OK }}>
          <span style={{ width: 9, height: 9, borderRadius: 99, background: OK }} />
          الهدف: قراءة عمرها بين دقيقة و{TARGET_MINUTES} دقائق
        </span>
      </div>

      <div className="rounded-[20px] px-5 py-8 sm:px-9" style={{ border: `1px solid ${LINE}` }}>
        {/* المحور */}
        <div className="relative mb-9" style={{ height: 30 }}>
          <div className="absolute" style={{ right: 0, left: 0, top: 13, height: 1, background: LINE }} />
          {/* نطاق الهدف */}
          <div className="absolute rounded-full"
            style={{ right: 0, width: `${pos(TARGET_MINUTES)}%`, top: 11, height: 5, background: `${OK}55` }} />
          {TICKS.map((t) => (
            <span key={t.m} className="absolute ar-body text-[10.5px] whitespace-nowrap"
              style={{ right: `${pos(t.m)}%`, top: 22, transform: "translateX(50%)", color: PD, opacity: .5 }}>
              {t.l}
            </span>
          ))}
          {TICKS.map((t) => (
            <span key={"d" + t.m} className="absolute rounded-full"
              style={{ right: `${pos(t.m)}%`, top: 10, width: 5, height: 5, transform: "translateX(50%)",
                background: t.m <= TARGET_MINUTES ? OK : `${PD}33` }} />
          ))}
        </div>

        {/* صف لكل مسار */}
        <div className="space-y-1">
          {PATHS.map((p) => {
            const st = STATUS[p.status];
            const known = p.minutes !== null;
            const inTarget = known && p.minutes! <= TARGET_MINUTES;
            const c = inTarget ? OK : p.minutes && p.minutes >= 90 ? BLOCK : WARN;
            return (
              <div key={p.key} className="py-4" style={{ borderTop: `1px solid ${RULE}` }}>
                <div className="flex items-baseline justify-between gap-3 mb-3 flex-wrap">
                  <span className="flex items-baseline gap-2.5 min-w-0">
                    <span className="ar-heading text-[15px]" style={{ color: PD }}>{p.provider}</span>
                    <span className="ltr text-[11px]" style={{ color: PD, opacity: .4 }}>{p.latin}</span>
                  </span>
                  <span className="ar-body text-[12.5px]" style={{ color: known ? c : PD, opacity: known ? 1 : .5 }}>
                    {p.latency}
                  </span>
                </div>

                <div className="relative" style={{ height: 22 }}>
                  <div className="absolute rounded-full" style={{ right: 0, left: 0, top: 9, height: 4, background: RULE }} />
                  {known ? (
                    <>
                      {/* المسافة من الهدف إلى موضع هذا المزود */}
                      <div className="absolute rounded-full"
                        style={{ right: 0, width: `${pos(p.minutes!)}%`, top: 9, height: 4, background: `${c}44` }} />
                      <span className="absolute rounded-full"
                        style={{ right: `${pos(p.minutes!)}%`, top: 4, width: 14, height: 14,
                          transform: "translateX(50%)", background: c, border: "2px solid #fff" }} />
                    </>
                  ) : (
                    /* زمن غير معروف: شرطات حقيقية لا تدرج لوني */
                    <div className="absolute flex gap-1.5" style={{ right: 0, left: "42%", top: 9 }}>
                      {Array.from({ length: 22 }, (_, k) => (
                        <span key={k} style={{ width: 6, height: 4, borderRadius: 2, background: `${PD}26` }} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-start justify-between gap-4 mt-2.5 flex-wrap">
                  <p className="ar-body text-[12px] leading-loose flex-1 min-w-[240px]" style={{ color: PD, opacity: .72 }}>
                    {p.note}
                  </p>
                  <span className="ar-body text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={{ background: `${st.c}14`, color: st.c }}>
                    {st.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="ar-body text-[12.5px] text-center mt-6 leading-loose" style={{ color: PD, opacity: .65 }}>
        المقياس لوغاريتمي. أقرب مسار رسمي متاح اليوم يبعد عن الهدف بتسعين دقيقة،
        وأبعده بثلاث ساعات. والمسار الوحيد القريب من الهدف يحتاج اتفاقا لم يبدأ بعد.
      </p>
    </div>
  );
}
