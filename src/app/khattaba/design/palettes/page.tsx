import type { CSSProperties } from "react";

/* صفحة مقارنة لوحات الألوان — 5 اقتراحات جنب بعض بأزرار حيّة (hover) وعناصر
 * واقعية، عشان العميل/أحمد يختار. كلها محتفظة بروح الوردي #F258B4 + الأخضر
 * #29A631 اللي طلبهم العميل، بس متوازنة بطرق مختلفة تحلّ التنافر. */

export const metadata = {
  title: "لوحات الألوان — خطّابة السعودية الأولى | Ahmed Ali",
  robots: { index: false, follow: false },
};

type Palette = {
  id: string;
  name: string;
  tagline: string;
  recommended?: boolean;
  pri: string;      // اللون الأساسي (أزرار)
  priH: string;     // hover
  priSoft: string;  // tint
  sec: string;      // الثانوي
  secH: string;
  secSoft: string;
  ink: string;      // نص أساسي
  muted: string;    // نص ثانوي
  bd: string;       // حدود
  soft: string;     // خلفية ناعمة
  darkPanel: string; // لوحة غامقة
  onDark: string;    // لمسة على الغامق
};

const palettes: Palette[] = [
  {
    id: "p5", name: "متوازن — وردي + أخضر", tagline: "ألوان العميل حرفياً، لكن على خلفية بيضاء نظيفة ومساحات واسعة — لون واحد جريء لكل عنصر يُلغي التنافر.",
    recommended: true,
    pri: "#F258B4", priH: "#D63E9C", priSoft: "#FDEAF5",
    sec: "#2FA94A", secH: "#228039", secSoft: "#E7F6EA",
    ink: "#211826", muted: "#6B6573", bd: "#ECE6EE", soft: "#FBF7FA",
    darkPanel: "#2A1322", onDark: "#FBC0E2",
  },
  {
    id: "p1", name: "وردي قائد", tagline: "الوردي هو نجم الواجهة — أزرار ولمسات. الأخضر للحالات الإيجابية فقط. نصوص رمادي غامق نظيف.",
    pri: "#E13C97", priH: "#BD2179", priSoft: "#FCEAF4",
    sec: "#29A631", secH: "#1F8527", secSoft: "#E6F6E9",
    ink: "#1F1726", muted: "#6E6877", bd: "#ECE7EF", soft: "#FBF6FA",
    darkPanel: "#3A1030", onDark: "#F9B6DC",
  },
  {
    id: "p2", name: "أخضر قائد — ثقة", tagline: "الأخضر أساسي (إحساس الثقة والحلال المناسب للزواج)، والوردي لمسة رومانسية للقلوب والتمييز.",
    pri: "#1F8527", priH: "#186A20", priSoft: "#E7F4E9",
    sec: "#F258B4", secH: "#D63E9C", secSoft: "#FDEAF5",
    ink: "#15211A", muted: "#5E6B61", bd: "#E5EEE6", soft: "#F4FAF5",
    darkPanel: "#10301A", onDark: "#9FE6AE",
  },
  {
    id: "p3", name: "محايد راقٍ", tagline: "أسود مائل للأوبرجين كأساس، والوردي والأخضر مجرد «مجوهرات» صغيرة — أهدأ وأفخم خيار.",
    pri: "#2B2230", priH: "#15101A", priSoft: "#F1EFF3",
    sec: "#29A631", secH: "#1F8527", secSoft: "#E6F6E9",
    ink: "#1C1820", muted: "#6E6A73", bd: "#EAE7EC", soft: "#FAF8FB",
    darkPanel: "#1C1622", onDark: "#F258B4",
  },
  {
    id: "p4", name: "روزي مكتوم + سيج", tagline: "نسخة منخفضة التشبّع: وردي ترابي (دستي روز) + أخضر زيتوني (سيج) — متناغمين وناعمين للعين.",
    pri: "#C76198", priH: "#A84A7E", priSoft: "#F7EDF3",
    sec: "#5E9E6A", secH: "#4A8255", secSoft: "#EDF4EE",
    ink: "#2A2430", muted: "#7A7580", bd: "#EBE6EC", soft: "#FAF7FA",
    darkPanel: "#322031", onDark: "#E9AECE",
  },
];

const FONT_BODY = "'Ahmed Sans', system-ui, sans-serif";
const FONT_HEAD = "'Ahmed Serif Display', 'Ahmed Sans', serif";

const css = `
.pal-grid{ display:grid; grid-template-columns: repeat(5, minmax(280px, 1fr)); gap:20px; }
@media (max-width: 1500px){ .pal-grid{ grid-template-columns: repeat(3, 1fr);} }
@media (max-width: 980px){ .pal-grid{ grid-template-columns: repeat(2, 1fr);} }
@media (max-width: 640px){ .pal-grid{ grid-template-columns: 1fr;} }

.pal-btn{ transition: background .15s ease, transform .12s ease, box-shadow .15s ease; cursor:pointer; border:none; }
.pal-btn:active{ transform: translateY(1px); }
.pal-pri{ background: var(--pri); color:#fff; }
.pal-pri:hover{ background: var(--priH); box-shadow: 0 8px 20px var(--priSoft); }
.pal-sec{ background: transparent; color: var(--pri); border:1.5px solid var(--pri); }
.pal-sec:hover{ background: var(--priSoft); }
.pal-succ{ background: var(--sec); color:#fff; }
.pal-succ:hover{ background: var(--secH); }
.pal-chip{ border:1.5px solid var(--bd); color: var(--ink); background:#fff; cursor:pointer; transition: all .15s ease; }
.pal-chip:hover{ border-color: var(--pri); color: var(--pri); background: var(--priSoft); }
.pal-card{ transition: box-shadow .2s ease, transform .2s ease; }
.pal-card:hover{ box-shadow: 0 14px 34px rgba(20,15,25,.10); transform: translateY(-3px); }
.pal-link{ color: var(--pri); cursor:pointer; font-weight:700; }
.pal-link:hover{ text-decoration: underline; }
.pal-swatch{ transition: transform .15s ease; }
.pal-swatch:hover{ transform: scale(1.06); }
`;

function Swatch({ hex, label }: { hex: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
      <div className="pal-swatch" style={{ width: 44, height: 44, borderRadius: 11, background: hex, border: "1px solid rgba(0,0,0,0.06)" }} />
      <span style={{ fontFamily: "var(--font-poppins), monospace", fontSize: 9.5, fontWeight: 600, color: "#9A949F", letterSpacing: 0.3 }}>{hex}</span>
      <span style={{ fontFamily: FONT_BODY, fontSize: 10, color: "#9A949F" }}>{label}</span>
    </div>
  );
}

function PaletteCard({ p }: { p: Palette }) {
  const vars = {
    "--pri": p.pri, "--priH": p.priH, "--priSoft": p.priSoft,
    "--sec": p.sec, "--secH": p.secH, "--secSoft": p.secSoft,
    "--ink": p.ink, "--bd": p.bd,
  } as CSSProperties;

  return (
    <div
      className="pal-card"
      style={{
        ...vars,
        background: "#fff",
        border: `1px solid ${p.bd}`,
        borderRadius: 22,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {p.recommended && (
        <span style={{ position: "absolute", insetInlineEnd: 16, top: 16, zIndex: 2, fontFamily: FONT_BODY, fontSize: 11, fontWeight: 700, color: "#fff", background: p.pri, padding: "4px 12px", borderRadius: 999 }}>
          مُقترَح ✦
        </span>
      )}

      {/* header */}
      <div style={{ padding: "22px 22px 16px" }}>
        <h2 style={{ fontFamily: FONT_HEAD, fontSize: 21, fontWeight: 700, color: p.ink, margin: 0, lineHeight: 1.3 }}>{p.name}</h2>
        <p style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: p.muted, margin: "8px 0 0", lineHeight: 1.7, minHeight: 64 }}>{p.tagline}</p>
      </div>

      {/* swatches */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 6, padding: "0 22px 20px", borderBottom: `1px solid ${p.bd}` }}>
        <Swatch hex={p.pri} label="أساسي" />
        <Swatch hex={p.priH} label="hover" />
        <Swatch hex={p.sec} label="ثانوي" />
        <Swatch hex={p.ink} label="نص" />
      </div>

      {/* live components */}
      <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 16, background: p.soft, flex: 1 }}>
        {/* buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button className="pal-btn pal-pri" style={{ height: 46, borderRadius: 12, fontFamily: FONT_BODY, fontSize: 14.5, fontWeight: 700 }}>
            إنشاء حساب جديد
          </button>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <button className="pal-btn pal-sec" style={{ height: 42, borderRadius: 12, fontFamily: FONT_BODY, fontSize: 13.5, fontWeight: 700 }}>
              تسجيل الدخول
            </button>
            <button className="pal-btn pal-succ" style={{ height: 42, borderRadius: 12, fontFamily: FONT_BODY, fontSize: 13.5, fontWeight: 700 }}>
              قبول الطلب ✓
            </button>
          </div>
          <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: p.muted, textAlign: "center" }}>مرّر الماوس على الأزرار لرؤية الـ hover</span>
        </div>

        {/* chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["الرياض", "ماجستير", "قبيلي", "غير مدخن"].map((c) => (
            <span key={c} className="pal-chip" style={{ padding: "7px 13px", borderRadius: 999, fontFamily: FONT_BODY, fontSize: 12 }}>{c}</span>
          ))}
        </div>

        {/* mini profile card */}
        <div style={{ background: "#fff", border: `1px solid ${p.bd}`, borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: p.priSoft, color: p.pri, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_HEAD, fontSize: 20, fontWeight: 700 }}>م</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 15, fontWeight: 700, color: p.ink }}>عضوة · F1715</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: p.muted }}>الرياض · 43 سنة · ماجستير</div>
            </div>
            <span style={{ width: 30, height: 30, borderRadius: "50%", background: p.secSoft, color: p.sec, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>♥</span>
          </div>
          {/* compatibility bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontFamily: FONT_BODY, fontSize: 11.5, color: p.muted }}>نسبة التوافق</span>
              <span style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: 12, fontWeight: 700, color: p.pri }}>92%</span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: p.priSoft, overflow: "hidden" }}>
              <div style={{ width: "92%", height: "100%", borderRadius: 999, background: p.pri }} />
            </div>
          </div>
          {/* badges */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontFamily: FONT_BODY, fontSize: 10.5, fontWeight: 700, color: p.sec, background: p.secSoft, padding: "3px 9px", borderRadius: 999 }}>موثّقة ✓</span>
            <span style={{ fontFamily: FONT_BODY, fontSize: 10.5, fontWeight: 700, color: "#B45309", background: "#FEF3C7", padding: "3px 9px", borderRadius: 999 }}>بانتظار المراجعة</span>
            <span style={{ fontFamily: FONT_BODY, fontSize: 10.5, fontWeight: 700, color: p.pri, background: p.priSoft, padding: "3px 9px", borderRadius: 999 }}>مميّزة</span>
          </div>
        </div>

        {/* dark panel sample */}
        <div style={{ position: "relative", background: p.darkPanel, borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 700, color: p.onDark }}>قسم بطولي / Hero</span>
          <span style={{ fontFamily: FONT_HEAD, fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.5 }}>
            خطبة آمنة وشرعية <span style={{ color: p.onDark }}>تحفظ خصوصيتك</span>
          </span>
          <a className="pal-link" style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: p.onDark, marginTop: 2 }}>ابدأ الآن ←</a>
        </div>
      </div>
    </div>
  );
}

export default function PalettesPage() {
  return (
    <main dir="rtl" style={{ background: "#F7F5F8", minHeight: "100vh", padding: "48px 32px 80px", fontFamily: FONT_BODY }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div style={{ maxWidth: 1640, margin: "0 auto" }}>
        <header style={{ marginBottom: 36, maxWidth: 820 }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 700, letterSpacing: 1, color: "#F258B4" }}>منصة خطّابة السعودية الأولى · اختيار الهوية اللونية</span>
          <h1 style={{ fontFamily: FONT_HEAD, fontSize: 38, fontWeight: 700, color: "#1C1820", margin: "10px 0 0", lineHeight: 1.25 }}>اختر لوحة الألوان</h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: "#6E6A73", margin: "12px 0 0", lineHeight: 1.8 }}>
            ألوان العميل (<b style={{ color: "#F258B4" }}>#F258B4</b> وردي + <b style={{ color: "#29A631" }}>#29A631</b> أخضر) متنافرة إذا استُخدمت بالوزن نفسه.
            هذه خمس معالجات تحتفظ بروح اللونين لكنها توازن بينهما بطرق مختلفة. كل بطاقة بأزرار حيّة (جرّب الـ hover) وبطاقات وعناصر واقعية من المنصة.
            <br />أخبرني برقم أو اسم ما يناسبك لأطبّقه على جميع الشاشات فوراً.
          </p>
        </header>

        <div className="pal-grid">
          {palettes.map((p) => (
            <PaletteCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
