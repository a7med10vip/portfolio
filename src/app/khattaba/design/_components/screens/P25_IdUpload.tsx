import { Upload, ShieldCheck, BadgeCheck, FileCheck, X, ChevronLeft } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette, space } from "../tokens";
import { CoreShell, coreWrap } from "./_core/CoreShell";
import { DotPattern } from "./_marketing/deco";

/* P25 · رفع الهوية الوطنية (اختياري)
 * (مطابق لسطر 792: التوثيق برفع الهوية اختياري وليس إجبارياً عند التسجيل) */

const benefits = [
  { icon: BadgeCheck, title: "شارة موثّق", body: "تظهر شارة «موثّق» مميّزة على بروفايلك" },
  { icon: ShieldCheck, title: "ثقة أعلى", body: "زيادة في طلبات الخطبة الواردة" },
  { icon: FileCheck, title: "أولوية المراجعة", body: "أسرع في معالجة طلباتك" },
];

export default function P25IdUpload() {
  return (
    <CoreShell active={null}>
      <div style={{ ...coreWrap, padding: `${space[8]}px 28px ${space[12]}px`, maxWidth: 860 }}>
        <div style={{ marginBottom: 22 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", background: colors.brand.highlightSoft, border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.brand.greenDark, marginBottom: 14 }}>
            <BadgeCheck size={13} /> اختياري · ليس إجبارياً
          </span>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 700, color: colors.ink.black, margin: 0 }}>توثيق إضافي بالهوية الوطنية</h1>
          <p style={{ fontFamily: fonts.body, fontSize: 14.5, color: colors.ink.muted, margin: "8px 0 0", lineHeight: 1.8 }}>
            رفع الهوية الوطنية اختياري ويزيد من ثقة الأعضاء بحسابك. لن تُعرض الصورة لأي عضو، وتُستخدم فقط لمراجعة الإدارة.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 18 }}>
          {/* upload */}
          <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 26 }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: colors.ink.black, margin: "0 0 16px" }}>ارفع صورة الهوية</h3>

            <div style={{ border: `2px dashed ${colors.brand.green}55`, borderRadius: radius.lg, padding: 36, background: colors.brand.greenSoft, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(42,19,34,0.08)" }}>
                <Upload size={26} color={colors.brand.green} />
              </div>
              <div style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black }}>اسحب الصورة هنا أو اضغط للاختيار</div>
              <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>PNG / JPG / PDF · بحد أقصى 5MB · صورة واضحة للوجه الأمامي</div>
              <button style={{ height: 42, padding: "0 22px", background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>اختر ملف</button>
            </div>

            {/* uploaded file preview */}
            <div style={{ background: colors.surface.page, border: `1px solid ${colors.border.soft}`, borderRadius: radius.md, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: radius.sm, background: "#fff", border: `1px solid ${colors.border.soft}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FileCheck size={18} color={colors.brand.green} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>national-id.jpg</div>
                <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, marginTop: 2 }}>2.3 MB · جاهز للإرسال</div>
              </div>
              <button style={{ width: 32, height: 32, borderRadius: 8, background: "#fff", border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={14} color={colors.ink.muted} /></button>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
              <button style={{ flex: 1, height: 50, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Upload size={16} /> إرسال للمراجعة
              </button>
              <button style={{ height: 50, padding: "0 22px", background: "transparent", color: colors.ink.muted, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, cursor: "pointer" }}>تخطّي · ليس الآن</button>
            </div>
          </div>

          {/* benefits + privacy */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 22 }}>
              <h3 style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black, margin: "0 0 14px" }}>لماذا تُوثّق؟</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} style={{ display: "flex", gap: 12 }}>
                      <div style={{ width: 34, height: 34, borderRadius: radius.md, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={16} color={colors.brand.green} />
                      </div>
                      <div>
                        <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>{b.title}</div>
                        <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginTop: 2, lineHeight: 1.7 }}>{b.body}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: palette.purple[800], borderRadius: radius.lg, padding: 22, color: "#fff", position: "relative", overflow: "hidden" }}>
              <DotPattern id="kh-id-dots" color="#FFFFFF" opacity={0.05} gap={22} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <ShieldCheck size={18} color={colors.brand.highlight} />
                  <h4 style={{ fontFamily: fonts.heading, fontSize: 14.5, fontWeight: 700, color: "#fff", margin: 0 }}>الخصوصية أولاً</h4>
                </div>
                <p style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.8, color: palette.purple[200], margin: "0 0 14px" }}>
                  الصورة تُعرض على الإدارة فقط ولا تظهر لأي عضو. تُخزَّن مشفّرة وفق نظام حماية البيانات الشخصية (PDPL).
                </p>
                <button style={{ fontFamily: fonts.body, fontSize: 12, color: colors.brand.highlight, background: "transparent", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, padding: 0, fontWeight: 700 }}>
                  اقرأ سياسة الخصوصية وسرية المعلومات <ChevronLeft size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CoreShell>
  );
}
