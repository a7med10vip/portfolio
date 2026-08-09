import { Info, Save, X, Lock, CreditCard, ArrowRight, ChevronDown, SlidersHorizontal, Upload, ShieldCheck, BadgeCheck, FileCheck } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader, MobileTabs, mInputBase, MField, MPrimaryButton } from "./_mobile/MobileApp";
import { AvatarPicker } from "./_auth/AuthShell";

/* MP08b · تعديل الملف (موبايل) */
export function MP08bEditMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader back title="تعديل الملف" />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ background: colors.accent.amberSoft, border: `1px solid ${colors.accent.amber}55`, borderInline: 0, padding: "10px 16px", display: "flex", gap: 8 }}>
          <Info size={14} color={colors.accent.amber} style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.body, margin: 0, lineHeight: 1.6 }}>التعديلات الحساسة تخضع لمراجعة الإدارة قبل النشر.</p>
        </div>
        <div style={{ flex: 1, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12, overflow: "hidden" }}>
          <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 14 }}>
            <AvatarPicker selected={0} />
          </div>
          <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <MField label="الاسم"><input style={mInputBase} defaultValue="محمد الأحمدي" /></MField>
            <MField label="العمر"><div style={{ position: "relative" }}><select style={{ ...mInputBase, appearance: "none", paddingInlineEnd: 30 }}><option>٣٢ سنة</option></select><ChevronDown size={13} style={{ position: "absolute", insetInlineEnd: 9, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }} /></div></MField>
            <MField label="المدينة"><input style={mInputBase} defaultValue="جدة" /></MField>
            <MField label="القبيلة"><input style={mInputBase} defaultValue="حرب" /></MField>
          </div>
          <MField label="نبذة عنك">
            <textarea style={{ ...mInputBase, height: 70, padding: 12, resize: "none", lineHeight: 1.7 }} defaultValue="موظف حكومي، أبحث عن زوجة صالحة..." />
          </MField>
        </div>
        <div style={{ padding: "10px 16px 22px", background: "#fff", borderTop: `1px solid ${colors.border.soft}`, display: "flex", gap: 8 }}>
          <button style={{ flex: 1, height: 48, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Save size={15} /> حفظ</button>
          <button style={{ width: 60, height: 48, background: "#fff", color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><X size={15} /></button>
        </div>
      </div>
    </MobileScreen>
  );
}

/* MP25 · رفع الهوية (اختياري · موبايل) */
export function MP25IdUploadMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader back title="توثيق الهوية" />
      <div style={{ flex: 1, padding: "16px 18px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", background: colors.brand.highlightSoft, border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.brand.greenDark, alignSelf: "flex-start", marginBottom: 10 }}><BadgeCheck size={12} /> اختياري</span>
        <h1 style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: colors.ink.black, margin: 0 }}>توثيق إضافي</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 4, lineHeight: 1.8 }}>رفع الهوية اختياري ويزيد ثقة الأعضاء. الصورة تُعرض على الإدارة فقط.</p>

        <div style={{ marginTop: 16, padding: 24, border: `2px dashed ${colors.brand.green}55`, borderRadius: radius.lg, background: colors.brand.greenSoft, textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}><Upload size={24} color={colors.brand.green} /></div>
          <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>اضغط لاختيار الصورة</div>
          <div style={{ fontFamily: fonts.body, fontSize: 10.5, color: colors.ink.muted, marginTop: 4 }}>PNG / JPG / PDF · حد أقصى 5MB</div>
        </div>

        <div style={{ marginTop: 14, background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.md, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <FileCheck size={16} color={colors.brand.green} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.ink.black }}>national-id.jpg</div>
            <div style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted, marginTop: 1 }}>2.3 MB · جاهز</div>
          </div>
          <button style={{ width: 28, height: 28, borderRadius: 7, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><X size={12} /></button>
        </div>

        <div style={{ marginTop: 12, background: palette.purple[800], borderRadius: radius.lg, padding: 14, color: "#fff", display: "flex", gap: 10 }}>
          <ShieldCheck size={16} color={colors.brand.highlight} style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontFamily: fonts.body, fontSize: 11, lineHeight: 1.7, color: palette.purple[200], margin: 0 }}>الصورة محمية ومشفّرة وفق نظام PDPL، لا تُعرض لأي عضو.</p>
        </div>
      </div>
      <div style={{ padding: "10px 18px 22px", background: "#fff", borderTop: `1px solid ${colors.border.soft}`, display: "flex", gap: 8 }}>
        <MPrimaryButton><Upload size={15} /> إرسال للمراجعة</MPrimaryButton>
      </div>
    </MobileScreen>
  );
}

/* MP06b · فلاتر البحث (موبايل · bottom sheet) */
export function MP06bFiltersMobile() {
  return (
    <MobileScreen padTop={50} bg="rgba(26,11,21,0.55)">
      {/* darkened backdrop with sheet at bottom */}
      <div style={{ flex: 1 }} />
      <div style={{ background: "#fff", borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: "16px 18px 24px", display: "flex", flexDirection: "column", maxHeight: "82%", boxShadow: "0 -20px 60px rgba(0,0,0,0.25)" }}>
        <div style={{ width: 42, height: 5, background: colors.border.strong, borderRadius: 3, margin: "0 auto 14px" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black, margin: 0, display: "inline-flex", alignItems: "center", gap: 7 }}><SlidersHorizontal size={16} color={colors.brand.green} /> الفلاتر</h2>
          <span style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.ink.muted }}>مسح الكل</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { label: "الجنسية", v: "سعودية" },
            { label: "المدينة", v: "الكل" },
            { label: "العمر", v: "٢٢ - ٣٥" },
            { label: "القبيلة", v: "الكل" },
            { label: "الحالة الاجتماعية", v: "عزباء" },
            { label: "المؤهل", v: "بكالوريوس" },
            { label: "نوع الزواج", v: "الكل" },
          ].map((f) => (
            <div key={f.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: colors.surface.page, borderRadius: radius.md, border: `1px solid ${colors.border.soft}` }}>
              <span style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.body }}>{f.label}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: colors.ink.black }}>{f.v} <ChevronDown size={13} color={colors.ink.muted} /></span>
            </div>
          ))}
        </div>
        <button style={{ marginTop: 16, height: 50, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700 }}>تطبيق الفلاتر · 48 نتيجة</button>
      </div>
    </MobileScreen>
  );
}

/* MP11b · بيانات البطاقة (موبايل) */
export function MP11bPayCardMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader back title="بيانات البطاقة" right={<span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.brand.green }}><Lock size={11} /> آمن</span>} />
      <div style={{ flex: 1, padding: "16px 18px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        <MField label="رقم البطاقة">
          <div style={{ position: "relative" }}>
            <input style={{ ...mInputBase, paddingInlineStart: 40, fontFamily: fonts.latin, direction: "ltr", textAlign: "right" }} defaultValue="4242 4242 4242 4242" />
            <CreditCard size={16} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }} />
          </div>
        </MField>
        <MField label="الاسم على البطاقة"><input style={{ ...mInputBase, fontFamily: fonts.latin, textAlign: "right" }} defaultValue="MOHAMMED ALAHMADI" /></MField>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <MField label="الانتهاء"><input style={{ ...mInputBase, fontFamily: fonts.latin, textAlign: "center" }} defaultValue="08 / 28" /></MField>
          <MField label="CVV"><input style={{ ...mInputBase, fontFamily: fonts.latin, textAlign: "center" }} defaultValue="•••" /></MField>
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>
          <Lock size={12} color={colors.brand.green} /> بياناتك مشفّرة ولا تُخزَّن على خوادمنا.
        </div>
      </div>
      <div style={{ padding: "10px 18px 22px", background: "#fff", borderTop: `1px solid ${colors.border.soft}` }}>
        <button style={{ width: "100%", height: 52, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
          <Lock size={16} /> ادفع 1,500 ر.س <ArrowRight size={15} />
        </button>
      </div>
    </MobileScreen>
  );
}
