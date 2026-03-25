"use client";

const row1 = ["التسويق بالأداء", "تحسين محركات البحث", "تطوير الويب", "الذكاء الاصطناعي", "إعلانات جوجل", "تطبيقات الجوال", "تحليل البيانات"];
const row2 = ["تطوير الواجهات", "البرمجة", "استراتيجية العلامة التجارية", "إعلانات ميتا", "إدارة المحتوى", "اختراق النمو", "تصميم المنتجات"];

function Row({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items, ...items, ...items];
  const animClass = direction === "left" ? "animate-[ml_60s_linear_infinite]" : "animate-[mr_60s_linear_infinite]";

  return (
    <div className="flex overflow-hidden">
      <div className={`flex gap-5 shrink-0 ${animClass}`} style={{ willChange: "transform" }}>
        {doubled.map((s, i) => (
          <span key={i} className="contents">
            <span className="ar-heading shrink-0 text-base md:text-lg px-5 md:px-6 py-2 md:py-2.5 rounded-full whitespace-nowrap" style={{ background: "#4FFFB0", color: "#0A0A0A", fontWeight: 400 }}>{s}</span>
            <span className="flex items-center text-xl md:text-2xl shrink-0" style={{ color: "#fff" }}>✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeBandAr() {
  return (
    <div className="relative" dir="ltr" style={{ background: "#0A0A0A", padding: "60px 0", overflow: "hidden" }}>
      <style>{`
        @keyframes ml { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes mr { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>

      {/* Edge shadows */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #0A0A0A, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #0A0A0A, transparent)" }} />

      <div className="flex flex-col gap-4">
        <Row items={row1} direction="left" />
        <Row items={row2} direction="right" />
      </div>
    </div>
  );
}
