import { Send, ArrowRight } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen, PurpleBackdrop } from "./_mobile/MobileShell";
import { BrandWordmark } from "./_marketing/deco";
import { mInputBase, MField, MPrimaryButton } from "./_mobile/MobileApp";

/* MP05a · نسيت كلمة المرور · إدخال الجوال (موبايل) */
export default function MP05aForgotPhoneMobile() {
  return (
    <MobileScreen padTop={0}>
      <div style={{ background: palette.purple[800], padding: "60px 24px 36px", position: "relative", overflow: "hidden", borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
        <PurpleBackdrop id="kh-mp05a-dots" />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}><BrandWordmark onDark size="lg" /></div>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 21, fontWeight: 700, color: "#fff", margin: 0 }}>استعادة كلمة المرور</h1>
          <p style={{ fontFamily: fonts.body, fontSize: 12, color: palette.purple[200], marginTop: 6 }}>أدخل رقم جوالك وسنرسل لك رمز التحقق</p>
        </div>
      </div>
      <div style={{ flex: 1, padding: "28px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
        <MField label="رقم الجوال">
          <div style={{ position: "relative" }}>
            <input style={{ ...mInputBase, paddingInlineStart: 82 }} placeholder="5XXXXXXXX" />
            <div style={{ position: "absolute", top: 0, right: 0, height: "100%", padding: "0 12px", display: "flex", alignItems: "center", gap: 5, borderInlineEnd: `1.5px solid ${colors.border.default}`, background: colors.surface.page, borderTopRightRadius: radius.md, borderBottomRightRadius: radius.md, fontFamily: fonts.latin, fontSize: 12, fontWeight: 700 }}>
              <span>🇸🇦</span><span>+966</span>
            </div>
          </div>
        </MField>
        <MPrimaryButton><Send size={16} /> إرسال الرمز</MPrimaryButton>
        <div style={{ textAlign: "center", fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.brand.green, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 4 }}>
          <ArrowRight size={14} /> العودة لتسجيل الدخول
        </div>
      </div>
    </MobileScreen>
  );
}
