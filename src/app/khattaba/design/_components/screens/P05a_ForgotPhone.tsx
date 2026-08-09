import { Send, ArrowRight } from "@/app/khattaba/design/_components/icons";
import { colors, fonts } from "../tokens";
import { AuthShell, AuthHeader, Field, PhoneInput, PrimaryButton } from "./_auth/AuthShell";

/* P05a · نسيت كلمة المرور — إدخال الجوال */
export default function P05aForgotPhone() {
  return (
    <AuthShell>
      <AuthHeader title="استعادة كلمة المرور" subtitle="أدخل رقم جوالك المسجّل وسنرسل لك رمز التحقق." />
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <Field label="رقم الجوال"><PhoneInput /></Field>
        <PrimaryButton><Send size={18} /> إرسال الرمز</PrimaryButton>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, color: colors.brand.green, cursor: "pointer" }}>
          <ArrowRight size={16} /> العودة لتسجيل الدخول
        </div>
      </div>
    </AuthShell>
  );
}
