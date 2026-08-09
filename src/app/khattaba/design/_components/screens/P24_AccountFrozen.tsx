import { PauseCircle, Clock, Headset, RefreshCw, Heart, BarChart3 } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette, space } from "../tokens";
import { CoreShell, coreWrap } from "./_core/CoreShell";
import { DotPattern, FloralScatter } from "./_marketing/deco";

/* P24 · تجميد الحساب التلقائي
 * (مطابق لسياسة العرض سطر 1165: تجاهل 3 عروض زواج → تجميد العضوية وإخفاؤها) */

const reasons = [
  { icon: Heart, text: "تم تجاهل 3 طلبات تواصل خلال الأسابيع الأخيرة" },
  { icon: Clock, text: "آخر تفاعل: قبل 14 يوماً" },
  { icon: BarChart3, text: "خفض الظهور لباقي الأعضاء حتى رفع التجميد" },
];

export default function P24AccountFrozen() {
  return (
    <CoreShell active={null}>
      <div style={{ ...coreWrap, padding: `${space[8]}px 28px ${space[12]}px`, maxWidth: 880 }}>
        {/* hero */}
        <div style={{ position: "relative", overflow: "hidden", background: palette.purple[800], borderRadius: radius["2xl"], padding: 36, color: "#fff", marginBottom: 22, display: "grid", gridTemplateColumns: "1fr 200px", gap: 28, alignItems: "center" }}>
          <DotPattern id="kh-frozen-dots" color="#FFFFFF" opacity={0.05} gap={28} />

      <FloralScatter scale={0.85} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px", background: colors.accent.amber, color: "#fff", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12, fontWeight: 700, marginBottom: 14 }}>
              <PauseCircle size={13} /> تجميد تلقائي
            </span>
            <h2 style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>تم تجميد حسابك مؤقتاً</h2>
            <p style={{ fontFamily: fonts.body, fontSize: 14.5, lineHeight: 1.85, color: palette.purple[200], margin: 0, maxWidth: 460 }}>
              لم نلاحظ تفاعلاً مع طلبات الخطبة الواردة. لحماية تجربة باقي الأعضاء، تم إخفاء بروفايلك تلقائياً وفق سياسة المنصة.
            </p>
          </div>
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 130, height: 130 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px dashed rgba(251,192,226,0.4)" }} />
              <div style={{ position: "absolute", inset: 14, borderRadius: "50%", background: colors.accent.amber, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 30px rgba(0,0,0,0.25)" }}>
                <PauseCircle size={50} color="#fff" />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 18 }}>
          <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 24 }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: colors.ink.black, margin: "0 0 16px" }}>تفاصيل التجميد</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {reasons.map((r, i) => {
                const Icon = r.icon;
                return (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 36, height: 36, borderRadius: radius.md, background: colors.accent.amberSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={16} color={colors.accent.amber} />
                    </div>
                    <span style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.body, lineHeight: 1.7 }}>{r.text}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ background: colors.surface.page, borderRadius: radius.md, padding: "14px 18px", marginTop: 18, fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.8, color: colors.ink.muted }}>
              تُحدد مدة التجميد من الإدارة. يبقى اشتراكك سارياً، ولا تُحتسب فترة التجميد ضمن أي رسوم.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 22 }}>
              <h3 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black, margin: "0 0 10px" }}>كيف ترفع التجميد؟</h3>
              <p style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 1.85, color: colors.ink.muted, margin: "0 0 16px" }}>تواصل مع إدارة المنصة وأبدِ استعدادك للتفاعل مع الطلبات الواردة، وستُعيد الإدارة تفعيل حسابك بعد المراجعة.</p>
              <button style={{ width: "100%", height: 48, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                <RefreshCw size={16} /> طلب رفع التجميد
              </button>
              <button style={{ width: "100%", height: 44, background: "transparent", color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Headset size={15} /> تواصل مع الدعم
              </button>
            </div>
          </div>
        </div>
      </div>
    </CoreShell>
  );
}
