import { LogIn } from "@/app/khattaba/design/_components/icons";
import { colors, fonts } from "../tokens";
import { AuthShell, AuthHeader, Field, PhoneInput, PasswordInput, PrimaryButton, AltLink } from "./_auth/AuthShell";

/* P04 · تسجيل الدخول */
export default function P04Login() {
  return (
    <AuthShell>
      <AuthHeader title="تسجيل الدخول" subtitle="أدخل بياناتك للوصول إلى حسابك." />
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <Field label="رقم الجوال"><PhoneInput /></Field>
        <Field label="كلمة المرور"><PasswordInput /></Field>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: fonts.body, fontSize: 13, color: colors.ink.body, cursor: "pointer" }}>
            <span style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${colors.border.strong}` }} />
            تذكّرني
          </label>
          <span style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.brand.green, cursor: "pointer" }}>نسيت كلمة المرور؟</span>
        </div>

        <PrimaryButton><LogIn size={18} /> دخول</PrimaryButton>
        <AltLink text="ليس لديك حساب؟" link="سجّل الآن" />
      </div>
    </AuthShell>
  );
}
