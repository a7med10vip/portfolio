import { BadgeCheck, Wallet, Download, FileText, Headset } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader, MobileTabs } from "./_mobile/MobileApp";
import { DotPattern } from "./_marketing/deco";

/* MP19 · الاشتراك (موبايل) */
export default function MP19SubscriptionMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader back title="اشتراكي" />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ margin: "14px 16px", background: "#2A1322", borderRadius: radius["2xl"], padding: "20px 22px", color: "#fff", position: "relative", overflow: "hidden", textAlign: "center" }}>
          <DotPattern id="kh-mp19-dots" color="#FFFFFF" opacity={0.06} gap={22} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <img src="/khattaba/membership-card.png" alt="بطاقة العضوية المميزة — اشتراك نشط وموثّق" style={{ width: "100%", maxWidth: 230, height: "auto", display: "block", margin: "0 auto 10px" }} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: colors.brand.highlight, color: palette.purple[800], borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11, fontWeight: 700, marginBottom: 10 }}>
              <BadgeCheck size={12} weight="fill" /> اشتراك نشط
            </span>
            <h2 style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>ساري حتى إتمام <span style={{ color: colors.brand.highlight }}>أول</span> زواج</h2>
            <p style={{ fontFamily: fonts.body, fontSize: 11.5, color: palette.purple[200], margin: 0, lineHeight: 1.7 }}>لا تجديد ولا تواريخ انتهاء — يستمر طوال رحلتك.</p>
          </div>
        </div>

        <div style={{ padding: "0 16px" }}>
          <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div>
              <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>تاريخ التفعيل</div>
              <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black, marginTop: 2 }}>12 يناير 2026</div>
            </div>
            <BadgeCheck size={20} color={colors.brand.green} />
          </div>
          <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div>
              <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>الرسوم المدفوعة</div>
              <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black, marginTop: 2 }}>1,500 ر.س</div>
            </div>
            <Wallet size={20} color={colors.brand.green} />
          </div>
        </div>

        {/* invoices */}
        <div style={{ flex: 1, padding: "10px 16px", overflow: "hidden" }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>الفواتير</h3>
          <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <FileText size={18} color={colors.brand.green} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: colors.ink.black }}>اشتراك التفعيل</div>
              <div style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted, marginTop: 2 }}>12 يناير · <span style={{ fontFamily: fonts.latin }}>TXN-2026-000087</span></div>
            </div>
            <button style={{ width: 32, height: 32, borderRadius: 8, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Download size={13} /></button>
          </div>
        </div>

        <div style={{ padding: "0 16px 14px" }}>
          <button style={{ width: "100%", height: 44, background: colors.surface.white, color: colors.brand.green, border: `1.5px solid ${colors.brand.green}40`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Headset size={15} /> سؤال عن اشتراكي
          </button>
        </div>
      </div>
      <MobileTabs active={null} />
    </MobileScreen>
  );
}
