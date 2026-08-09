import { ArrowLeft } from "@/app/khattaba/design/_components/icons";
import { inputBase, AuthShell, AuthHeader, AuthStepper, AvatarPicker, Field, PhoneInput, PasswordInput, SelectInput, Segmented, PrimaryButton, AltLink } from "./_auth/AuthShell";
import { colors } from "../tokens";

/* P03a · التسجيل — Step 1 · البيانات الشخصية + الأفاتار + كلمة المرور */
export default function P03aRegisterInfo() {
  return (
    <AuthShell>
      <AuthStepper current={0} />
      <AuthHeader title="إنشاء حساب" subtitle="ابدأ بإدخال بياناتك الأساسية." />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <AvatarPicker selected={0} />

        <div style={{ height: 1, background: colors.border.soft, margin: "2px 0" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="هل أنت صاحب الطلب؟" hint="إلزامي"><Segmented options={["نعم", "لا"]} active={0} /></Field>
          <Field label="صلة القرابة بصاحب الطلب"><SelectInput options={["أنا صاحب الطلب", "الأب", "الأم", "الأخ", "الأخت", "الابن", "العم / الخال", "أخرى"]} /></Field>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="الاسم حسب الهوية" hint="لا يظهر للأعضاء — للتحقق فقط"><input style={inputBase} placeholder="الاسم كما في الهوية" /></Field>
          <Field label="الجنس"><Segmented options={["ذكر", "أنثى"]} active={0} /></Field>
          <Field label="العمر"><SelectInput options={["٢٥ سنة", "٢٦ سنة", "٢٧ سنة", "٢٨ سنة"]} /></Field>
          <Field label="الجنسية"><SelectInput options={["سعودي", "سعودية", "خليجي", "خليجية", "عربي", "عربية", "أخرى"]} /></Field>
          <Field label="المدينة"><SelectInput options={["الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر", "الأحساء", "القطيف", "الطائف", "تبوك", "بريدة", "حائل", "أبها", "خميس مشيط", "نجران", "جازان", "ينبع", "الجبيل", "عرعر", "سكاكا", "الباحة", "أخرى (اكتب)"]} /></Field>
          <Field label="الحالة الاجتماعية"><SelectInput options={["أعزب", "عزباء", "مطلق", "مطلقة", "أرمل", "أرملة"]} /></Field>
          <Field label="المؤهل التعليمي"><SelectInput options={["ثانوي", "دبلوم", "بكالوريوس", "ماجستير", "دكتوراه"]} /></Field>
          <Field label="الوظيفة"><input style={inputBase} placeholder="مثال: مهندس برمجيات" /></Field>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="رقم الجوال" hint="السعودية فقط · يبدأ بـ 5"><PhoneInput /></Field>
          <Field label="البريد الإلكتروني"><input style={{ ...inputBase, direction: "ltr", textAlign: "right" }} type="email" placeholder="you@example.com" /></Field>
        </div>

        <Field label="نبذة عنك (الوصف)" hint="تعريف مختصر يظهر في ملفك">
          <textarea style={{ ...inputBase, height: 80, padding: 14, resize: "none", lineHeight: 1.7 }} placeholder="اكتب نبذة موجزة عن نفسك..." />
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="كلمة المرور"><PasswordInput /></Field>
          <Field label="تأكيد كلمة المرور"><PasswordInput /></Field>
        </div>

        <PrimaryButton>التالي <ArrowLeft size={18} /></PrimaryButton>
        <AltLink text="لديك حساب بالفعل؟" link="تسجيل الدخول" />
      </div>
    </AuthShell>
  );
}
