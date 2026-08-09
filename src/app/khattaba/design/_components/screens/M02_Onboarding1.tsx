import { ArrowLeft } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen, PageDots, MobileButton } from "./_mobile/MobileShell";

/* M02 · Onboarding 1 — آمنة */
export default function M02Onboarding1() {
  return (
    <MobileScreen>
      {/* illustration */}
      <div style={{ height: 380, background: palette.purple[800], borderBottomLeftRadius: 30, borderBottomRightRadius: 30, position: "relative", overflow: "hidden" }}>
        <img src="/khattaba/privacy-couple.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(42,19,34,0.5)" }} />
      </div>

      <div style={{ flex: 1, padding: "36px 28px 30px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <span style={{ display: "inline-block", padding: "5px 12px", background: colors.brand.highlightSoft, border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11.5, fontWeight: 700, color: colors.brand.greenDark, marginBottom: 14 }}>الركيزة الأولى</span>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 700, color: colors.ink.black, margin: "0 0 10px" }}>آمنة · بياناتك محمية</h1>
          <p style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 1.9, color: colors.ink.muted, margin: 0 }}>
            كل تسجيل يمرّ على مراجعة يدوية من الإدارة قبل التفعيل — لا حسابات وهمية، وبياناتك محمية وفق نظام PDPL.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <PageDots active={0} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 10 }}>
            <MobileButton variant="ghost">تخطّي</MobileButton>
            <MobileButton>التالي <ArrowLeft size={17} /></MobileButton>
          </div>
        </div>
      </div>
    </MobileScreen>
  );
}
