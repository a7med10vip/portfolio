import { ArrowLeft } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen, PageDots, MobileButton } from "./_mobile/MobileShell";

/* M04 · Onboarding 3 — موثوقة */
export default function M04Onboarding3() {
  return (
    <MobileScreen>
      <div style={{ height: 380, background: "#2A1322", borderBottomLeftRadius: 30, borderBottomRightRadius: 30, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/khattaba/membership-card.png" alt="" style={{ width: "92%", maxWidth: 320, height: "auto", display: "block", position: "relative", zIndex: 1, filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.4))" }} />
      </div>

      <div style={{ flex: 1, padding: "36px 28px 30px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <span style={{ display: "inline-block", padding: "5px 12px", background: colors.brand.highlightSoft, border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11.5, fontWeight: 700, color: colors.brand.greenDark, marginBottom: 14 }}>الركيزة الثالثة</span>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 700, color: colors.ink.black, margin: "0 0 10px" }}>موثوقة · إدارة تراقب</h1>
          <p style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 1.9, color: colors.ink.muted, margin: 0 }}>
            فلترة محتوى تلقائية، وإمكانية تدخّل الإدارة كطرف ثالث في غرف المحادثة عند الحاجة لحماية الطرفين.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <PageDots active={2} />
          <MobileButton>سجّل الآن <ArrowLeft size={17} /></MobileButton>
          <button style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.brand.green, fontWeight: 700, background: "transparent", border: "none", cursor: "pointer" }}>لديك حساب؟ تسجيل الدخول</button>
        </div>
      </div>
    </MobileScreen>
  );
}
