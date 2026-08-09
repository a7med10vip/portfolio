import { Wallet, Lock, ArrowDownLeft, ArrowUpRight, RefreshCw, Download, Info } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, palette, space } from "../tokens";
import { CoreShell, coreWrap } from "./_core/CoreShell";
import { DotPattern, FloralScatter } from "./_marketing/deco";

/* P18 · محفظتي — الرصيد والمبالغ المحجوزة والمعاملات (مطابق لنموذج المحفظة في العرض) */

const holds = [
  { label: "مبلغ التواصل الجاد", project: "مشروع خطبة #4821 · نورة العتيبي", amount: "1,200 ر.س", since: "منذ 12 يوم" },
  { label: "اتفاقية الجدية", project: "مشروع خطبة #4790 · سارة الغامدي", amount: "800 ر.س", since: "منذ 25 يوم" },
];

const tx = [
  { kind: "in" as const, label: "إيداع · رسوم التواصل الجاد", amount: "+1,200 ر.س", date: "اليوم 11:22", ref: "TXN-2026-004818" },
  { kind: "out" as const, label: "اشتراك التفعيل", amount: "−1,500 ر.س", date: "29 مايو · 10:42", ref: "TXN-2026-004821" },
  { kind: "in" as const, label: "اتفاقية الجدية · مشروع #4790", amount: "+800 ر.س", date: "5 مايو · 14:18", ref: "TXN-2026-004790" },
  { kind: "refund" as const, label: "استرداد · فشل مشروع #4612", amount: "+1,200 ر.س", date: "20 أبريل · 09:00", ref: "TXN-2026-004612" },
];

export default function P18Wallet() {
  return (
    <CoreShell active="wallet">
      <div style={{ ...coreWrap, padding: `${space[8]}px 28px ${space[12]}px` }}>
        {/* balance card */}
        <div style={{ position: "relative", overflow: "hidden", background: palette.purple[800], borderRadius: radius["2xl"], padding: 32, color: "#fff", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 28, alignItems: "center", marginBottom: 22 }}>
          <DotPattern id="kh-wallet-dots" color="#FFFFFF" opacity={0.05} gap={28} />

      <FloralScatter scale={0.85} mirror />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", background: "rgba(251,192,226,0.10)", border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.brand.highlight, marginBottom: 14 }}>
              <Wallet size={13} /> محفظتي
            </div>
            <div style={{ fontFamily: fonts.body, fontSize: 13, color: palette.purple[200] }}>الرصيد الإجمالي</div>
            <div style={{ fontFamily: fonts.heading, fontSize: 42, fontWeight: 700, color: "#fff", marginTop: 4, lineHeight: 1 }}>3,200 <span style={{ fontSize: 18, color: palette.purple[200], marginInlineStart: 4 }}>ر.س</span></div>
            <div style={{ display: "flex", gap: 14, marginTop: 18 }}>
              <div>
                <div style={{ fontFamily: fonts.body, fontSize: 11, color: palette.purple[200] }}>متاح للسحب</div>
                <div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: "#fff", marginTop: 2 }}>1,200 ر.س</div>
              </div>
              <div style={{ width: 1, background: "rgba(255,255,255,0.15)" }} />
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: fonts.body, fontSize: 11, color: palette.purple[200] }}><Lock size={11} /> محجوز في مشاريع</div>
                <div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.brand.highlight, marginTop: 2 }}>2,000 ر.س</div>
              </div>
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            <button style={{ height: 48, background: colors.brand.highlight, color: palette.purple[800], border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <ArrowDownLeft size={17} /> سحب الرصيد المتاح
            </button>
            <button style={{ height: 44, background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Download size={15} /> كشف الحساب
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 18 }}>
          {/* held amounts */}
          <div>
            <h3 style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: colors.ink.black, margin: "0 0 12px" }}>المبالغ المحجوزة</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {holds.map((h) => (
                <div key={h.project} style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 18, display: "flex", alignItems: "center", gap: 14, boxShadow: shadow.sm }}>
                  <div style={{ width: 44, height: 44, borderRadius: radius.md, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Lock size={20} color={colors.brand.green} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, color: colors.ink.black }}>{h.label}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginTop: 3 }}>{h.project}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.soft, marginTop: 3 }}>{h.since}</div>
                  </div>
                  <div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.brand.green, flexShrink: 0 }}>{h.amount}</div>
                </div>
              ))}
            </div>

            <div style={{ background: colors.accent.amberSoft, border: `1px solid ${colors.accent.amber}40`, borderRadius: radius.md, padding: "12px 16px", display: "flex", alignItems: "flex-start", gap: 10, marginTop: 14 }}>
              <Info size={15} color={colors.accent.amber} style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontFamily: fonts.body, fontSize: 12, lineHeight: 1.7, color: colors.ink.body, margin: 0 }}>
                المبالغ المحجوزة تُسترد تلقائياً للمحفظة عند فشل المشروع. عند إتمام الزواج تُحصّل المنصة عمولتها وفق شروط الاتفاقية.
              </p>
            </div>
          </div>

          {/* transactions */}
          <div>
            <h3 style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: colors.ink.black, margin: "0 0 12px" }}>المعاملات الأخيرة</h3>
            <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 6 }}>
              {tx.map((t, i) => {
                const Icon = t.kind === "in" ? ArrowDownLeft : t.kind === "out" ? ArrowUpRight : RefreshCw;
                const color = t.kind === "in" ? colors.brand.green : t.kind === "out" ? colors.ink.body : colors.accent.purple;
                return (
                  <div key={i} style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, borderBottom: i === tx.length - 1 ? "none" : `1px solid ${colors.border.soft}` }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: `${color}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={15} color={color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: colors.ink.black }}>{t.label}</div>
                      <div style={{ fontFamily: fonts.body, fontSize: 10.5, color: colors.ink.muted, marginTop: 2 }}>{t.date} · <span style={{ fontFamily: fonts.latin }}>{t.ref}</span></div>
                    </div>
                    <div style={{ fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, color, flexShrink: 0 }}>{t.amount}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </CoreShell>
  );
}
