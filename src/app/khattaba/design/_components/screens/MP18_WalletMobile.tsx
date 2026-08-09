import { Wallet, Lock, ArrowDownLeft, ArrowUpRight, RefreshCw, Download } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader, HeaderBellAvatar, MobileTabs } from "./_mobile/MobileApp";
import { DotPattern, FloralScatter } from "./_marketing/deco";

/* MP18 · محفظتي (موبايل) */
const tx = [
  { kind: "in" as const, label: "إيداع · تواصل جاد", amount: "+1,200", date: "اليوم 11:22" },
  { kind: "out" as const, label: "اشتراك التفعيل", amount: "−1,500", date: "29 مايو" },
  { kind: "refund" as const, label: "استرداد #4612", amount: "+1,200", date: "20 أبريل" },
];

export default function MP18WalletMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader right={<HeaderBellAvatar />} />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* balance card */}
        <div style={{ margin: "14px 16px", background: palette.purple[800], borderRadius: radius["2xl"], padding: 20, position: "relative", overflow: "hidden", color: "#fff" }}>
          <DotPattern id="kh-mp18-dots" color="#FFFFFF" opacity={0.06} gap={22} />

      <FloralScatter scale={0.55} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "rgba(251,192,226,0.12)", border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 10.5, fontWeight: 700, color: colors.brand.highlight }}>
                <Wallet size={11} /> محفظتي
              </span>
              <button style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.10)", color: "#fff", border: "1px solid rgba(255,255,255,0.18)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Download size={14} /></button>
            </div>
            <div style={{ fontFamily: fonts.body, fontSize: 11, color: palette.purple[200] }}>الرصيد الإجمالي</div>
            <div style={{ fontFamily: fonts.heading, fontSize: 30, fontWeight: 700, marginTop: 3 }}>3,200 <span style={{ fontSize: 14, color: palette.purple[200] }}>ر.س</span></div>
            <div style={{ display: "flex", gap: 14, marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              <div>
                <div style={{ fontFamily: fonts.body, fontSize: 10, color: palette.purple[200] }}>متاح للسحب</div>
                <div style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 700, color: "#fff", marginTop: 2 }}>1,200 ر.س</div>
              </div>
              <div style={{ width: 1, background: "rgba(255,255,255,0.15)" }} />
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: fonts.body, fontSize: 10, color: palette.purple[200] }}><Lock size={10} /> محجوز</div>
                <div style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 700, color: colors.brand.highlight, marginTop: 2 }}>2,000 ر.س</div>
              </div>
            </div>
            <button style={{ width: "100%", marginTop: 14, height: 42, background: colors.brand.highlight, color: palette.purple[800], border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <ArrowDownLeft size={15} /> سحب الرصيد المتاح
            </button>
          </div>
        </div>

        {/* held */}
        <div style={{ padding: "0 16px" }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>المبالغ المحجوزة</h3>
          <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 12, display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center" }}><Lock size={15} color={colors.brand.green} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: colors.ink.black }}>تواصل جاد · مشروع #4821</div>
              <div style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted, marginTop: 1 }}>منذ 12 يوم</div>
            </div>
            <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.brand.green }}>1,200 ر.س</div>
          </div>
          <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 12, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center" }}><Lock size={15} color={colors.brand.green} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: colors.ink.black }}>اتفاقية الجدية · #4790</div>
              <div style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted, marginTop: 1 }}>منذ 25 يوم</div>
            </div>
            <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.brand.green }}>800 ر.س</div>
          </div>
        </div>

        {/* transactions */}
        <div style={{ padding: "12px 16px", flex: 1, overflow: "hidden" }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>المعاملات الأخيرة</h3>
          <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 4 }}>
            {tx.map((t, i) => {
              const Icon = t.kind === "in" ? ArrowDownLeft : t.kind === "out" ? ArrowUpRight : RefreshCw;
              const c = t.kind === "in" ? colors.brand.green : t.kind === "out" ? colors.ink.body : colors.accent.purple;
              return (
                <div key={i} style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: i === tx.length - 1 ? "none" : `1px solid ${colors.border.soft}` }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: `${c}14`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={13} color={c} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: fonts.body, fontSize: 11.5, fontWeight: 700, color: colors.ink.black }}>{t.label}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 9.5, color: colors.ink.muted, marginTop: 1 }}>{t.date}</div>
                  </div>
                  <div style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: c }}>{t.amount} ر.س</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <MobileTabs active={null} />
    </MobileScreen>
  );
}
