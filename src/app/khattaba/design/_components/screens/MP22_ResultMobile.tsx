import { BadgeCheck, Wallet, Confetti, CircleCheck, Search } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader } from "./_mobile/MobileApp";
import { DotPattern } from "./_marketing/deco";

/* MP22 · نتيجة مشروع الخطبة (موبايل) */
export default function MP22ResultMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader back title="نتيجة المشروع" />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* hero */}
        <div style={{ margin: "14px 16px", background: palette.purple[800], borderRadius: radius["2xl"], padding: 22, position: "relative", overflow: "hidden", textAlign: "center", color: "#fff" }}>
          <DotPattern id="kh-mp22-dots" color="#FFFFFF" opacity={0.06} gap={22} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ position: "relative", width: 96, height: 96, margin: "0 auto 12px" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px dashed rgba(251,192,226,0.45)" }} />
              <div style={{ position: "absolute", inset: 11, borderRadius: "50%", background: colors.brand.highlight, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 28px rgba(0,0,0,0.25)" }}>
                <BadgeCheck size={40} color={palette.purple[800]} weight="fill" />
              </div>
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", background: "rgba(251,192,226,0.12)", border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.brand.highlight, marginBottom: 10 }}>
              <Confetti size={12} /> ألف مبروك
            </span>
            <h1 style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>اكتمل المشروع بنجاح</h1>
            <p style={{ fontFamily: fonts.body, fontSize: 11.5, color: palette.purple[200], margin: 0, lineHeight: 1.7 }}>نسأل الله أن يبارك لكما ويجمع بينكما في خير.</p>
          </div>
        </div>

        {/* summary */}
        <div style={{ padding: "0 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { l: "مدة المشروع", v: "47 يوم" },
            { l: "غرفة", v: "#4821" },
            { l: "عمولة المنصة", v: "200 ر.س" },
            { l: "حالة الاشتراك", v: "ساري" },
          ].map((s) => (
            <div key={s.l} style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: "10px 12px" }}>
              <div style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted }}>{s.l}</div>
              <div style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: colors.ink.black, marginTop: 2 }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* wallet result */}
        <div style={{ padding: "12px 16px", flex: 1, overflow: "hidden" }}>
          <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 14 }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Wallet size={14} color={colors.brand.green} /> ملخّص المحفظة
            </h3>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${colors.border.soft}`, fontFamily: fonts.body, fontSize: 12 }}>
              <span style={{ color: colors.ink.body }}>المبالغ المحجوزة</span><span style={{ fontWeight: 700, color: colors.ink.black }}>2,000 ر.س</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${colors.border.soft}`, fontFamily: fonts.body, fontSize: 12 }}>
              <span style={{ color: colors.ink.body }}>عمولة المنصة</span><span style={{ fontWeight: 700, color: colors.accent.red }}>−200 ر.س</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", marginTop: 4, borderTop: `2px solid ${colors.brand.green}` }}>
              <span style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>مُستحَق للمحفظة</span>
              <span style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.brand.green }}>+1,800 ر.س</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "10px 16px 22px", background: "#fff", borderTop: `1px solid ${colors.border.soft}`, display: "flex", flexDirection: "column", gap: 8 }}>
        <button style={{ height: 48, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}><Wallet size={16} /> فتح محفظتي</button>
        <button style={{ height: 44, background: "#fff", color: colors.brand.green, border: `1.5px solid ${colors.brand.green}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}><CircleCheck size={15} /> شهادة الإتمام</button>
      </div>
    </MobileScreen>
  );
}
