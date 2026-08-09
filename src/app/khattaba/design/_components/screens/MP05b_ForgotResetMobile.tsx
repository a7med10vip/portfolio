import { Save, Eye } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen, PurpleBackdrop } from "./_mobile/MobileShell";
import { mInputBase, MField, MPrimaryButton } from "./_mobile/MobileApp";

/* MP05b · نسيت كلمة المرور · OTP + كلمة جديدة (موبايل) */
export default function MP05bForgotResetMobile() {
  return (
    <MobileScreen padTop={0}>
      <div style={{ background: palette.purple[800], padding: "60px 24px 30px", position: "relative", overflow: "hidden", borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
        <PurpleBackdrop id="kh-mp05b-dots" />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>رمز التحقق وكلمة جديدة</h1>
          <p style={{ fontFamily: fonts.body, fontSize: 12, color: palette.purple[200], marginTop: 6 }}>أدخل الرمز المُرسل واختر كلمة مرور جديدة</p>
        </div>
      </div>
      <div style={{ flex: 1, padding: "24px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", gap: 8, direction: "ltr", justifyContent: "center" }}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const f = i < 4, focus = i === 4;
            return <div key={i} style={{ width: 44, height: 54, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.latin, fontSize: 22, fontWeight: 700, color: colors.ink.black, background: "#fff", border: `2px solid ${f || focus ? colors.brand.green : colors.border.default}`, borderRadius: radius.lg, boxShadow: focus ? `0 0 0 3px ${colors.brand.greenSoft}` : "none" }}>{f ? "•" : ""}</div>;
          })}
        </div>
        <div style={{ textAlign: "center", fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>
          لم يصلك الرمز؟ <span style={{ color: colors.brand.green, fontWeight: 700 }}>إعادة الإرسال</span>
        </div>
        <MField label="كلمة المرور الجديدة">
          <div style={{ position: "relative" }}>
            <input type="password" style={{ ...mInputBase, paddingInlineEnd: 36 }} placeholder="••••••••" />
            <Eye size={16} style={{ position: "absolute", insetInlineEnd: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }} />
          </div>
        </MField>
        <MField label="تأكيد كلمة المرور">
          <div style={{ position: "relative" }}>
            <input type="password" style={{ ...mInputBase, paddingInlineEnd: 36 }} placeholder="••••••••" />
            <Eye size={16} style={{ position: "absolute", insetInlineEnd: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }} />
          </div>
        </MField>
        <MPrimaryButton><Save size={16} /> حفظ كلمة المرور</MPrimaryButton>
      </div>
    </MobileScreen>
  );
}
