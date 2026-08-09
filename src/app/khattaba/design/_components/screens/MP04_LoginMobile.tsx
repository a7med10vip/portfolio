import { LogIn, Eye, ArrowRight } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen, PurpleBackdrop } from "./_mobile/MobileShell";
import { BrandWordmark } from "./_marketing/deco";
import { mInputBase, MField, MPrimaryButton } from "./_mobile/MobileApp";

/* MP04 · تسجيل الدخول (موبايل) */
export default function MP04LoginMobile() {
  return (
    <MobileScreen padTop={0}>
      {/* purple top */}
      <div style={{ background: palette.purple[800], padding: "70px 24px 60px", position: "relative", overflow: "hidden", borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
        <PurpleBackdrop id="kh-mp04-dots" dotsOpacity={0.07} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}><BrandWordmark onDark size="lg" /></div>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>أهلاً بعودتك</h1>
          <p style={{ fontFamily: fonts.body, fontSize: 13, color: palette.purple[200], marginTop: 8 }}>سجّل الدخول للوصول إلى حسابك</p>
        </div>
      </div>

      <div style={{ flex: 1, padding: "26px 24px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        <MField label="رقم الجوال">
          <div style={{ position: "relative" }}>
            <input style={{ ...mInputBase, paddingInlineStart: 82 }} placeholder="5XXXXXXXX" />
            <div style={{ position: "absolute", top: 0, right: 0, height: "100%", padding: "0 12px", display: "flex", alignItems: "center", gap: 5, borderInlineEnd: `1.5px solid ${colors.border.default}`, background: colors.surface.page, borderTopRightRadius: radius.md, borderBottomRightRadius: radius.md, fontFamily: fonts.latin, fontSize: 12, fontWeight: 700 }}>
              <span>🇸🇦</span><span>+966</span>
            </div>
          </div>
        </MField>
        <MField label="كلمة المرور">
          <div style={{ position: "relative" }}>
            <input type="password" style={{ ...mInputBase, paddingInlineEnd: 40 }} defaultValue="" placeholder="••••••••" />
            <Eye size={17} style={{ position: "absolute", insetInlineEnd: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
          </div>
        </MField>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: fonts.body, fontSize: 12 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 7, color: colors.ink.body }}>
            <span style={{ width: 17, height: 17, borderRadius: 5, border: `2px solid ${colors.border.strong}` }} />
            تذكّرني
          </label>
          <span style={{ color: colors.brand.green, fontWeight: 700 }}>نسيت كلمة المرور؟</span>
        </div>

        <MPrimaryButton><LogIn size={17} /> دخول</MPrimaryButton>

        <div style={{ textAlign: "center", fontFamily: fonts.body, fontSize: 13, color: colors.ink.muted, marginTop: 8 }}>
          ليس لديك حساب؟ <span style={{ color: colors.brand.green, fontWeight: 700 }}>سجّل الآن</span>
        </div>
      </div>
    </MobileScreen>
  );
}
