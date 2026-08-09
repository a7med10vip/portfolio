import { Save } from "@/app/khattaba/design/_components/icons";
import { Field, AuthShell, AuthHeader, PasswordInput, PrimaryButton, OtpBoxes, ResendLink } from "./_auth/AuthShell";

/* P05b · نسيت كلمة المرور — OTP + كلمة مرور جديدة */
export default function P05bForgotReset() {
  return (
    <AuthShell>
      <AuthHeader title="رمز التحقق وكلمة جديدة" subtitle="أدخل الرمز المُرسل إلى جوالك، ثم اختر كلمة مرور جديدة." />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <OtpBoxes filled={4} />
          <ResendLink />
        </div>
        <Field label="كلمة المرور الجديدة"><PasswordInput /></Field>
        <Field label="تأكيد كلمة المرور"><PasswordInput /></Field>
        <PrimaryButton><Save size={18} /> حفظ كلمة المرور</PrimaryButton>
      </div>
    </AuthShell>
  );
}
