import { ArrowLeft, Eye, ChevronDown, Check } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { mInputBase, MField, MPrimaryButton } from "./_mobile/MobileApp";
import { AvatarPicker } from "./_auth/AuthShell";

/* MP03a · التسجيل · بيانات + أفاتار + كلمة مرور (موبايل) */
export default function MP03aRegisterMobile() {
  return (
    <MobileScreen padTop={50}>
      {/* compact stepper */}
      <div style={{ padding: "14px 18px 6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginBottom: 10 }}>
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: colors.brand.green, color: "#fff", fontFamily: fonts.latin, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>1</span>
          <span style={{ fontWeight: 700, color: colors.brand.green }}>البيانات</span>
          <span style={{ flex: 1, height: 2, background: colors.border.default, margin: "0 4px" }} />
          <span>التفضيلات</span>
          <span style={{ flex: 1, height: 2, background: colors.border.default, margin: "0 4px" }} />
          <span>التحقق</span>
        </div>
        <h1 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.ink.black, margin: 0 }}>إنشاء حساب</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 4 }}>ابدأ بإدخال بياناتك الأساسية.</p>
      </div>

      <div style={{ flex: 1, overflow: "hidden", padding: "10px 18px 14px", display: "flex", flexDirection: "column", gap: 12 }}>
        <AvatarPicker selected={0} />

        <MField label="الاسم الكامل"><input style={mInputBase} placeholder="مثال: محمد الأحمدي" /></MField>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <MField label="الجنس">
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ flex: 1, height: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, background: colors.brand.greenSoft, color: colors.brand.greenDark, border: `1.5px solid ${colors.brand.green}` }}>ذكر</div>
              <div style={{ flex: 1, height: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, background: "#fff", color: colors.ink.body, border: `1.5px solid ${colors.border.default}` }}>أنثى</div>
            </div>
          </MField>
          <MField label="العمر">
            <div style={{ position: "relative" }}>
              <select style={{ ...mInputBase, appearance: "none", paddingInlineEnd: 32 }}><option>٣٢ سنة</option></select>
              <ChevronDown size={14} style={{ position: "absolute", insetInlineEnd: 10, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
            </div>
          </MField>
          <MField label="الجنسية">
            <div style={{ position: "relative" }}>
              <select style={{ ...mInputBase, appearance: "none", paddingInlineEnd: 32 }}><option>سعودي</option></select>
              <ChevronDown size={14} style={{ position: "absolute", insetInlineEnd: 10, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
            </div>
          </MField>
          <MField label="المدينة">
            <div style={{ position: "relative" }}>
              <select style={{ ...mInputBase, appearance: "none", paddingInlineEnd: 32 }}><option>جدة</option></select>
              <ChevronDown size={14} style={{ position: "absolute", insetInlineEnd: 10, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
            </div>
          </MField>
          <MField label="المؤهل">
            <div style={{ position: "relative" }}>
              <select style={{ ...mInputBase, appearance: "none", paddingInlineEnd: 32 }}><option>بكالوريوس</option></select>
              <ChevronDown size={14} style={{ position: "absolute", insetInlineEnd: 10, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
            </div>
          </MField>
          <MField label="الوظيفة"><input style={mInputBase} defaultValue="مهندس" /></MField>
        </div>

        <MField label="رقم الجوال" hint="السعودية فقط · يبدأ بـ 5">
          <div style={{ position: "relative" }}>
            <input style={{ ...mInputBase, paddingInlineStart: 82 }} placeholder="5XXXXXXXX" />
            <div style={{ position: "absolute", top: 0, right: 0, height: "100%", padding: "0 12px", display: "flex", alignItems: "center", gap: 5, borderInlineEnd: `1.5px solid ${colors.border.default}`, background: colors.surface.page, borderTopRightRadius: radius.md, borderBottomRightRadius: radius.md, fontFamily: fonts.latin, fontSize: 12, fontWeight: 700 }}>
              <span>🇸🇦</span><span>+966</span>
            </div>
          </div>
        </MField>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <MField label="كلمة المرور">
            <div style={{ position: "relative" }}>
              <input type="password" style={{ ...mInputBase, paddingInlineEnd: 32 }} placeholder="••••••••" />
              <Eye size={14} style={{ position: "absolute", insetInlineEnd: 10, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }} />
            </div>
          </MField>
          <MField label="تأكيد كلمة المرور">
            <div style={{ position: "relative" }}>
              <input type="password" style={{ ...mInputBase, paddingInlineEnd: 32 }} placeholder="••••••••" />
              <Eye size={14} style={{ position: "absolute", insetInlineEnd: 10, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }} />
            </div>
          </MField>
        </div>
      </div>

      <div style={{ padding: "10px 18px 22px", background: "#fff", borderTop: `1px solid ${colors.border.soft}` }}>
        <MPrimaryButton>التالي <ArrowLeft size={17} /></MPrimaryButton>
      </div>
    </MobileScreen>
  );
}
