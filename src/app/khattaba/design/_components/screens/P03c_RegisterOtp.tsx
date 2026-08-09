import { Send, Check } from "@/app/khattaba/design/_components/icons";
import { colors, fonts } from "../tokens";
import { AuthShell, AuthHeader, AuthStepper, PrimaryButton, OtpBoxes, ResendLink } from "./_auth/AuthShell";

/* P03c · التسجيل — Step 3 · التحقق من رقم الجوال (OTP) + الموافقة */
export default function P03cRegisterOtp() {
  return (
    <AuthShell>
      <AuthStepper current={2} />
      <AuthHeader title="تأكيد رقم الجوال" subtitle="أدخل رمز التحقق المُرسل إلى ‎+966 55 *** ** 67" />
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <OtpBoxes filled={3} />
          <ResendLink />
        </div>

        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: fonts.body, fontSize: 13.5, lineHeight: 1.6, color: colors.ink.body, cursor: "pointer" }}>
          <span style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${colors.brand.green}`, background: colors.brand.green, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
            <Check size={12} color="#fff" strokeWidth={3} />
          </span>
          <span>أوافق على <span style={{ color: colors.brand.green, fontWeight: 700 }}>الشروط والأحكام</span> و<span style={{ color: colors.brand.green, fontWeight: 700 }}>سياسة الخصوصية وسرية المعلومات</span>.</span>
        </label>

        <PrimaryButton><Send size={18} /> تأكيد وإرسال الطلب</PrimaryButton>
      </div>
    </AuthShell>
  );
}
