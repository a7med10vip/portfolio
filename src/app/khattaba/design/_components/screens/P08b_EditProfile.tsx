import { Info, Save, X } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, space } from "../tokens";
import { CoreShell, coreWrap } from "./_core/CoreShell";
import { AvatarPicker, Field, SelectInput, inputBase } from "./_auth/AuthShell";

/* P08b · ملفي الشخصي — تعديل البيانات + الأفاتار + الإعدادات */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 24, boxShadow: shadow.sm }}>
      <h3 style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: colors.ink.black, margin: "0 0 18px" }}>{title}</h3>
      {children}
    </div>
  );
}

function Toggle({ label, on }: { label: string; on: boolean }) {
  return (
    <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
      <span style={{ fontFamily: fonts.body, fontSize: 14, color: colors.ink.body, fontWeight: 500 }}>{label}</span>
      <span style={{ width: 44, height: 24, borderRadius: 999, background: on ? colors.brand.green : colors.border.strong, position: "relative", flexShrink: 0 }}>
        <span style={{ position: "absolute", top: 2, left: on ? 2 : 22, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.15)" }} />
      </span>
    </label>
  );
}

export default function P08bEditProfile() {
  return (
    <CoreShell active={null}>
      <div style={{ ...coreWrap, maxWidth: 860, padding: `${space[8]}px 28px ${space[12]}px` }}>
        <h1 style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 700, color: colors.ink.black, margin: "0 0 6px" }}>تعديل الملف</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.muted, margin: "0 0 20px" }}>حدّث بياناتك وصورتك الرمزية وإعدادات حسابك.</p>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 18px", background: colors.accent.amberSoft, border: `1px solid ${colors.accent.amber}55`, borderRadius: radius.md, marginBottom: 22 }}>
          <Info size={18} color={colors.accent.amber} style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.7, color: colors.ink.body, margin: 0 }}>
            <b>جميع التعديلات بلا استثناء تخضع لمراجعة الإدارة قبل النشر.</b> يُسجَّل تاريخ آخر تحديث على ملفك بعد الموافقة، ويُحفظ سجلّ بكل طلبات التعديل (المقبولة والمرفوضة).
          </p>
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginBottom: 22 }}>
          <span>آخر تحديث مُعتمَد: <b style={{ color: colors.ink.body }}>—</b></span>
          <span style={{ color: colors.brand.green, fontWeight: 700, cursor: "pointer" }}>· عرض سجلّ التعديلات</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card title="الصورة الرمزية"><AvatarPicker selected={0} /></Card>

          <Card title="البيانات الأساسية">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="الاسم الكامل"><input style={inputBase} defaultValue="محمد الأحمدي" /></Field>
              <Field label="العمر"><SelectInput options={["٣٢ سنة", "٣٣ سنة", "٣٤ سنة"]} /></Field>
              <Field label="المدينة"><SelectInput options={["جدة", "الرياض", "الدمام", "مكة"]} /></Field>
              <Field label="القبيلة"><input style={inputBase} defaultValue="حرب" /></Field>
              <Field label="الفرع"><input style={inputBase} defaultValue="بني سالم" /></Field>
              <Field label="المؤهل"><SelectInput options={["بكالوريوس", "ماجستير", "دكتوراه"]} /></Field>
              <Field label="الوظيفة"><input style={inputBase} defaultValue="مهندس" /></Field>
              <Field label="الحالة الاجتماعية"><SelectInput options={["أعزب", "مطلّق", "أرمل"]} /></Field>
            </div>
            <div style={{ marginTop: 16 }}>
              <Field label="نبذة عنك">
                <textarea style={{ ...inputBase, height: 90, padding: 14, resize: "none", lineHeight: 1.7 }} defaultValue="موظف حكومي، أبحث عن زوجة صالحة من عائلة محترمة لبناء بيت مستقر." />
              </Field>
            </div>
          </Card>

          <Card title="الإعدادات">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Toggle label="إشعارات الجوال" on />
              <Toggle label="إشعارات البريد الإلكتروني" on={false} />
              <Toggle label="إظهار آخر ظهور للأعضاء" on />
              <Toggle label="إخفاء حسابي مؤقتاً" on={false} />
            </div>
          </Card>

          <div style={{ display: "flex", gap: 12, justifyContent: "flex-start" }}>
            <button style={{ height: 50, padding: "0 32px", background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Save size={17} /> حفظ التغييرات
            </button>
            <button style={{ height: 50, padding: "0 26px", background: "transparent", color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <X size={17} /> إلغاء
            </button>
          </div>
        </div>
      </div>
    </CoreShell>
  );
}
