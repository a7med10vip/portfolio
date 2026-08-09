import { BadgeCheck, Heart, Clock, FileText, Wallet, Download, ChevronLeft, Headset, Calendar, Lock, MessageCircle, ShieldCheck } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, palette, space } from "../tokens";
import { CoreShell, coreWrap } from "./_core/CoreShell";
import { DotPattern, FloralScatter } from "./_marketing/deco";

/* P19 · الاشتراك — ساري حتى أول زواج (مطابق لقاعدة العرض) */

const phases = [
  { icon: BadgeCheck, label: "تم القبول", date: "12 يناير 2026", done: true },
  { icon: Wallet, label: "دفع الرسوم", date: "12 يناير 2026", done: true },
  { icon: Heart, label: "تفعيل الاشتراك", date: "12 يناير 2026", done: true, active: true },
  { icon: BadgeCheck, label: "إتمام الزواج", date: "—", done: false },
];

const subTx = [
  { label: "اشتراك التفعيل", amount: "1,500 ر.س", date: "12 يناير 2026", ref: "TXN-2026-000087" },
];

export default function P19Subscription() {
  return (
    <CoreShell active={null}>
      <div style={{ ...coreWrap, padding: `${space[8]}px 28px ${space[12]}px`, maxWidth: 980 }}>
        {/* status hero */}
        <div style={{ position: "relative", overflow: "hidden", background: "#2A1322", borderRadius: radius["2xl"], padding: 36, color: "#fff", marginBottom: 22 }}>
          <DotPattern id="kh-sub-dots" color="#FFFFFF" opacity={0.05} gap={28} />

      <FloralScatter scale={0.85} />

          {/* active badge */}
          <div style={{ position: "absolute", top: 28, insetInlineStart: 36, zIndex: 2, display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", background: colors.brand.highlight, color: palette.purple[800], borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700 }}>
            <ShieldCheck size={14} weight="fill" /> اشتراك نشط
          </div>

          <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 0.95fr", alignItems: "center", gap: 32 }}>
            {/* text */}
            <div>
              <h2 style={{ fontFamily: fonts.heading, fontSize: 30, fontWeight: 700, color: "#fff", margin: "0 0 12px", lineHeight: 1.35 }}>اشتراكك ساري حتى إتمام <span style={{ color: colors.brand.highlight }}>أول</span> زواج</h2>
              <p style={{ fontFamily: fonts.body, fontSize: 14.5, lineHeight: 1.85, color: palette.purple[200], margin: 0, maxWidth: 480 }}>
                لا تجديد ولا تواريخ انتهاء — تستمر العضوية فعّالة طوال رحلتك. إذا لم يتم الزواج يبقى الرصيد متاحاً في محفظتك داخل التطبيق.
              </p>
              <div style={{ display: "flex", gap: 28, marginTop: 24, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.12)", flexWrap: "wrap" }}>
                {[
                  { icon: Calendar, label: "تاريخ التفعيل", value: "12 يناير 2026" },
                  { icon: Wallet, label: "الرسوم المدفوعة", value: "1,500 ر.س", note: "مخصّصة من الإدارة" },
                  { icon: Clock, label: "مدة العضوية", value: "غير محدودة" },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                      <Icon size={17} color={colors.brand.highlight} />
                      <div>
                        <div style={{ fontFamily: fonts.body, fontSize: 11, color: palette.purple[200] }}>{s.label}</div>
                        <div style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 700, color: "#fff", marginTop: 3 }}>{s.value}</div>
                        {s.note && <div style={{ fontFamily: fonts.body, fontSize: 10.5, fontWeight: 500, color: palette.purple[200], marginTop: 1 }}>{s.note}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* membership card visual */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/khattaba/membership-card.png" alt="بطاقة العضوية المميزة — اشتراك موثّق ونشط" style={{ width: "100%", maxWidth: 380, height: "auto", display: "block" }} />
            </div>
          </div>

          {/* trust strip */}
          <div style={{ position: "relative", zIndex: 1, marginTop: 26, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.12)", display: "flex", justifyContent: "center", gap: 26, flexWrap: "wrap" }}>
            {[
              { icon: Lock, label: "خصوصية تامة" },
              { icon: MessageCircle, label: "تواصل آمن" },
              { icon: ShieldCheck, label: "تحت إشراف الإدارة" },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <span key={t.label} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: "#fff" }}>
                  <Icon size={16} color={colors.brand.highlight} /> {t.label}
                </span>
              );
            })}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 18 }}>
          {/* journey */}
          <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 24, boxShadow: shadow.sm }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: colors.ink.black, margin: "0 0 18px" }}>رحلة عضويتك</h3>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", insetInlineStart: 21, top: 22, bottom: 22, width: 2, background: colors.border.default }} />
              {phases.map((p) => {
                const Icon = p.icon;
                const color = p.active ? colors.brand.highlight : p.done ? colors.brand.green : colors.surface.sunken;
                return (
                  <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18, position: "relative" }}>
                    <div style={{ position: "relative", zIndex: 1, width: 44, height: 44, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 0 5px ${colors.surface.white}`, flexShrink: 0 }}>
                      <Icon size={20} color={p.done ? "#fff" : colors.ink.muted} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 700, color: p.done ? colors.ink.black : colors.ink.muted }}>{p.label}{p.active && <span style={{ fontSize: 11, fontWeight: 700, color: colors.brand.green, marginInlineStart: 8 }}>· الحالة الحالية</span>}</div>
                      <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginTop: 2 }}>{p.date}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* invoice + help */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 22, boxShadow: shadow.sm }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <h3 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black, margin: 0 }}>الفواتير</h3>
                <FileText size={18} color={colors.brand.green} />
              </div>
              {subTx.map((t) => (
                <div key={t.ref} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: `1px solid ${colors.border.soft}` }}>
                  <div>
                    <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>{t.label}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, marginTop: 2 }}>{t.date} · <span style={{ fontFamily: fonts.latin }}>{t.ref}</span></div>
                  </div>
                  <button style={{ width: 34, height: 34, borderRadius: 8, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Download size={14} color={colors.ink.body} /></button>
                </div>
              ))}
              <div style={{ marginTop: 8, paddingTop: 14, borderTop: `1px solid ${colors.border.soft}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>المجموع المدفوع</span>
                <span style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.brand.green }}>1,500 ر.س</span>
              </div>
            </div>

            <div style={{ background: palette.purple[800], borderRadius: radius.lg, padding: 22, color: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <Headset size={18} color={colors.brand.highlight} />
                <h4 style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: "#fff", margin: 0 }}>سؤال عن اشتراكك؟</h4>
              </div>
              <p style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.8, color: palette.purple[200], margin: "0 0 14px" }}>الإدارة جاهزة لتوضيح أي تفاصيل تتعلق بالاشتراك والرسوم.</p>
              <button style={{ width: "100%", height: 42, background: colors.brand.highlight, color: palette.purple[800], border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>تواصل مع الدعم <ChevronLeft size={15} /></button>
            </div>
          </div>
        </div>
      </div>
    </CoreShell>
  );
}
