import { CircleCheck, BadgeCheck, Wallet, MessageCircle, Search, Calendar, Confetti } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette, space } from "../tokens";
import { CoreShell, coreWrap } from "./_core/CoreShell";
import { DotPattern, FloralScatter } from "./_marketing/deco";

/* P22 · نتيجة مشروع الخطبة — إتمام الزواج (الخطوة 12 في العرض) */

const summary = [
  { icon: Calendar, label: "مدة المشروع", value: "47 يوماً" },
  { icon: MessageCircle, label: "غرفة المحادثة", value: "مشروع خطبة #4821" },
  { icon: Wallet, label: "عمولة المنصة", value: "200 ر.س" },
  { icon: BadgeCheck, label: "حالة الاشتراك", value: "ساري لأي مشروع لاحق" },
];

export default function P22ProjectResult() {
  return (
    <CoreShell active={null}>
      <div style={{ ...coreWrap, padding: `${space[8]}px 28px ${space[12]}px`, maxWidth: 860 }}>
        {/* hero */}
        <div style={{ position: "relative", overflow: "hidden", background: palette.purple[800], borderRadius: radius["2xl"], padding: 40, color: "#fff", marginBottom: 22, textAlign: "center" }}>
          <DotPattern id="kh-result-dots" color="#FFFFFF" opacity={0.06} gap={28} />

      <FloralScatter scale={0.85} mirror />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ position: "relative", width: 112, height: 112, margin: "0 auto 18px" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px dashed rgba(251,192,226,0.45)" }} />
              <div style={{ position: "absolute", inset: 12, borderRadius: "50%", background: colors.brand.highlight, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 14px 36px rgba(0,0,0,0.25)" }}>
                <BadgeCheck size={48} color={palette.purple[800]} weight="fill" />
              </div>
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "rgba(251,192,226,0.12)", border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.brand.highlight, marginBottom: 14 }}>
              <Confetti size={13} /> ألف مبروك · إتمام الزواج
            </span>
            <h1 style={{ fontFamily: fonts.hero, fontSize: 36, fontWeight: 700, color: "#fff", margin: "0 0 12px", lineHeight: 1.3 }}>اكتمل مشروع الخطبة بنجاح</h1>
            <p style={{ fontFamily: fonts.body, fontSize: 15, lineHeight: 1.9, color: palette.purple[200], margin: "0 auto", maxWidth: 480 }}>
              نسأل الله أن يبارك لكما ويبارك عليكما ويجمع بينكما في خير. تم توثيق إتمام مشروع خطبة #4821 رسمياً عبر المنصة.
            </p>
          </div>
        </div>

        {/* summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 22 }}>
          {summary.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: radius.md, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} color={colors.brand.green} />
                </div>
                <div>
                  <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted }}>{s.label}</div>
                  <div style={{ fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, color: colors.ink.black, marginTop: 3 }}>{s.value}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* wallet result */}
        <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 24, marginBottom: 22 }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: colors.ink.black, margin: "0 0 14px", display: "inline-flex", alignItems: "center", gap: 8 }}><Wallet size={18} color={colors.brand.green} /> ملخّص المحفظة</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${colors.border.soft}` }}>
              <span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.body }}>المبالغ المحجوزة لمشروع #4821</span>
              <span style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>2,000 ر.س</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${colors.border.soft}` }}>
              <span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.body }}>عمولة المنصة (مستحقة)</span>
              <span style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.accent.red }}>−200 ر.س</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: `2px solid ${colors.brand.green}`, marginTop: 4 }}>
              <span style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>مُستحَق للمحفظة</span>
              <span style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: colors.brand.green }}>+1,800 ر.س</span>
            </div>
          </div>
        </div>

        {/* actions */}
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ flex: 1, height: 52, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Wallet size={17} /> فتح محفظتي
          </button>
          <button style={{ flex: 1, height: 52, background: colors.surface.white, color: colors.brand.green, border: `1.5px solid ${colors.brand.green}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <CircleCheck size={17} /> تنزيل شهادة الإتمام
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 18 }}>
          <button style={{ height: 44, padding: "0 22px", background: "transparent", color: colors.ink.muted, border: "none", fontFamily: fonts.body, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Search size={14} /> العودة للتصفّح
          </button>
        </div>
      </div>
    </CoreShell>
  );
}
