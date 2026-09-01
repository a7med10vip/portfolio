"use client";

import { useState } from "react";
import { P, PD, O, LINE, OK, WARN, STATUS } from "./theme";

/**
 * البنية الهجينة، مرسومة بدل أن تُشرح.
 *
 * الفكرة كلها أن المصادر الأربعة تختلف في مسارها ولا تختلف داخل التطبيق: كلها
 * تنتهي عند محرك واحد يوحد شكل البيانات. رسم يدوي لا مكتبة، فالعقد أربع ولا
 * تتحرك، ومحرك التخطيط يكلف أكثر مما يعطي.
 */
type Focus = null | "health" | "dexcom" | "abbott" | "sibionics";

const SOURCES = [
  { k: "health", n: "آبل هيلث وهيلث كونكت", route: "طبقة النظام", y: 40, status: "ok" as const, phase: "المرحلة 1" },
  { k: "dexcom", n: "دكسكوم", route: "واجهة مباشرة", y: 132, status: "ok" as const, phase: "المرحلة 2" },
  { k: "abbott", n: "أبوت ليبري", route: "عبر Junction", y: 224, status: "partial" as const, phase: "المرحلة 3" },
  { k: "sibionics", n: "سايبيونكس", route: "SDK أو OEM", y: 316, status: "partial" as const, phase: "المرحلة 4" },
];

export default function ArchitectureMap() {
  const [focus, setFocus] = useState<Focus>(null);
  const dim = (k: string) => (focus && focus !== k ? 0.16 : 1);

  return (
    <div className="max-w-4xl mx-auto" onMouseLeave={() => setFocus(null)}>
      <svg viewBox="0 0 820 400" className="w-full h-auto" role="img"
        aria-label="أربعة مصادر بيانات تنتهي عند محرك جلوكوز واحد داخل FODI">
        <defs>
          <marker id="fodi-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill={P} />
          </marker>
        </defs>

        {SOURCES.map((s) => {
          const c = STATUS[s.status].c;
          return (
            <g key={s.k} onMouseEnter={() => setFocus(s.k as Focus)}
              style={{ opacity: dim(s.k), transition: "opacity .3s", cursor: "pointer" }}>
              {/* المصدر */}
              <rect x={520} y={s.y} width={280} height={64} rx={14} fill="#fff" stroke={LINE} />
              <rect x={520} y={s.y} width={4} height={64} rx={2} fill={c} />
              <text x={776} y={s.y + 26} textAnchor="end" fontSize="15" fill={PD} className="ar-heading">{s.n}</text>
              <text x={776} y={s.y + 47} textAnchor="end" fontSize="11.5" fill={PD} opacity="0.55" className="ar-body">
                {s.route}
              </text>
              <text x={536} y={s.y + 47} fontSize="10.5" fill={c} className="ar-body">{s.phase}</text>

              {/* الوصلة إلى المحرك */}
              <path d={`M 516 ${s.y + 32} C 430 ${s.y + 32}, 400 200, 330 200`}
                fill="none" stroke={P} strokeWidth="1.5" markerEnd="url(#fodi-arrow)"
                strokeDasharray={s.status === "partial" ? "5 4" : "none"} />
            </g>
          );
        })}

        {/* المحرك */}
        <g>
          <rect x={40} y={148} width={286} height={104} rx={18} fill={PD} />
          <text x={183} y={186} textAnchor="middle" fontSize="17" fill="#fff" className="ar-heading">
            محرك الجلوكوز في FODI
          </text>
          <text x={183} y={210} textAnchor="middle" fontSize="11.5" fill="#fff" opacity="0.6" className="ar-body">
            نموذج واحد لكل المصادر
          </text>
          <text x={183} y={232} textAnchor="middle" fontSize="11" fill={O} className="ar-body">
            القراءة · المصدر · عمرها
          </text>
        </g>

        {/* المتصل غير المتصل */}
        <g opacity="0.75">
          <text x={776} y={378} textAnchor="end" fontSize="11" fill={PD} opacity="0.55" className="ar-body">
            الخط المتصل: مسار متاح اليوم
          </text>
          <text x={776} y={396} textAnchor="end" fontSize="11" fill={PD} opacity="0.55" className="ar-body">
            الخط المتقطع: مسار يحتاج اتفاقا
          </text>
        </g>
      </svg>

      <p className="ar-body text-[12.5px] text-center mt-4" style={{ color: PD, opacity: .6 }}>
        مرر على أي مصدر لعزل مساره. المصادر تختلف خارج التطبيق، ولا تختلف داخله.
      </p>
    </div>
  );
}
