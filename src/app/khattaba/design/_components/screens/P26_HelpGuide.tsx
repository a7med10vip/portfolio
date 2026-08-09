import { UserPlus, Search, Send, CreditCard, Settings, Headset, Download, ChevronLeft, FileText, BookOpen } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, space } from "../tokens";
import { MarketingPage, MarketingCta, PageHero, wrap } from "./_marketing/Shell";
import { SectionLabel } from "./_marketing/deco";

/* P26 · دليل الاستخدام (Help Center)
 * (مطابق لسطر 1080 في العرض: دليل إلكتروني وورقي يشمل التسجيل والبحث والتقديم والدفع وإدارة الحساب والدعم) */

const guides = [
  { icon: UserPlus, title: "التسجيل", desc: "كيف تنشئ حسابك وتعبئ نماذج التسجيل وترفق الإقرارات.", color: colors.brand.green, items: ["إنشاء حساب جديد", "اختيار الأفاتار", "نموذج التسجيل التفصيلي", "التحقق برمز OTP"] },
  { icon: Search, title: "البحث والتصفّح", desc: "استخدم الفلاتر الذكية للوصول للطرف الأنسب.", color: colors.accent.purple, items: ["الفلاتر المتقدمة", "وسوم المسيار والمعدد", "حفظ التفضيلات"] },
  { icon: Send, title: "التقديم على بروفايل", desc: "إرسال طلب التواصل وانتظار رد الطرف الآخر.", color: colors.accent.blue, items: ["إرسال طلب تواصل", "صلاحية العرض 72 ساعة", "التمديد التلقائي مرتين"] },
  { icon: CreditCard, title: "الدفع والمحفظة", desc: "وسائل الدفع المعتمدة وإدارة محفظتك داخل التطبيق.", color: colors.accent.amber, items: ["Apple Pay · Visa · مدى", "رسوم الاشتراك المخصّصة", "المبالغ المحجوزة والاسترداد"] },
  { icon: Settings, title: "إدارة الحساب", desc: "تعديل بياناتك وضبط الخصوصية والإشعارات.", color: colors.brand.green, items: ["تعديل البيانات", "تغيير الأفاتار", "إعدادات الإشعارات", "إخفاء الحساب مؤقتاً"] },
  { icon: Headset, title: "التواصل مع الدعم", desc: "كيف تصل لفريق الدعم في أي وقت.", color: colors.accent.red, items: ["نموذج اتصل بنا", "الواتساب الرسمي", "البريد الإلكتروني", "ساعات العمل"] },
];

export default function P26HelpGuide() {
  return (
    <MarketingPage active={null}>
      <PageHero
        eyebrow="دليل الاستخدام"
        title="كل ما تحتاجه في مكان واحد"
        subtitle="دلائل مختصرة وعملية لكل خطوة في رحلتك على المنصة — متاحة إلكترونياً ومتوفّرة كذلك بنسخة ورقية."
      />

      {/* downloads strip */}
      <section style={{ background: colors.surface.white, padding: `${space[8]}px 0` }}>
        <div style={{ ...wrap, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <button style={{ height: 48, padding: "0 22px", background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Download size={16} /> تحميل الدليل الإلكتروني (PDF)
          </button>
          <button style={{ height: 48, padding: "0 22px", background: colors.surface.white, color: colors.brand.green, border: `1.5px solid ${colors.brand.green}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <FileText size={16} /> طلب نسخة ورقية
          </button>
        </div>
      </section>

      {/* guide categories */}
      <section style={{ background: colors.surface.white, padding: `${space[12]}px 0 ${space[20]}px` }}>
        <div style={wrap}>
          <div style={{ textAlign: "center", marginBottom: space[12] }}>
            <SectionLabel center>محاور الدليل</SectionLabel>
            <h2 style={{ fontFamily: fonts.heading, fontSize: 36, fontWeight: 700, color: colors.ink.black, margin: 0 }}>ستة محاور رئيسية</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {guides.map((g) => {
              const Icon = g.icon;
              return (
                <div key={g.title} style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.xl, padding: 26, boxShadow: shadow.sm, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ width: 50, height: 50, borderRadius: radius.lg, background: `${g.color}14`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={24} color={g.color} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: colors.ink.black, margin: "0 0 6px" }}>{g.title}</h3>
                    <p style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.muted, margin: 0, lineHeight: 1.8 }}>{g.desc}</p>
                  </div>
                  <div style={{ borderTop: `1px solid ${colors.border.soft}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                    {g.items.map((it) => (
                      <div key={it} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.body }}>
                        <BookOpen size={13} color={g.color} /> {it}
                      </div>
                    ))}
                  </div>
                  <button style={{ marginTop: 4, height: 40, background: "transparent", color: g.color, border: `1.5px solid ${g.color}30`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    اقرأ هذا الفصل <ChevronLeft size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <MarketingCta title="ما زلت تحتاج مساعدة؟" subtitle="فريق الدعم جاهز لمساعدتك في أي خطوة." />
    </MarketingPage>
  );
}
