import { UserPlus, Smartphone, ClipboardCheck, CreditCard, Search, Heart, MessageCircle, Handshake, Clock, Filter, ShieldCheck } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, space, palette } from "../tokens";
import { MarketingPage, MarketingCta, PageHero, wrap } from "./_marketing/Shell";
import { SectionLabel } from "./_marketing/deco";

/* P15 · آلية الخطبة — نسخة إبداعية
 * Hero · timeline من 8 خطوات بعُقد medallion · ضوابط · CTA */

const steps = [
  { icon: UserPlus, title: "التسجيل", body: "أدخل بياناتك الشخصية الأساسية وحدّد تفضيلات الطرف الآخر." },
  { icon: Smartphone, title: "التحقق", body: "تأكيد رقم جوالك عبر رمز تحقق (OTP) يصلك في رسالة." },
  { icon: ClipboardCheck, title: "المراجعة اليدوية", body: "تراجع الإدارة طلبك يدويًا قبل التفعيل — لا قبول تلقائي ولا حسابات وهمية." },
  { icon: CreditCard, title: "التفعيل والاشتراك", body: "بعد القبول، فعّل حسابك عبر الاشتراك لتبدأ التصفّح والتواصل." },
  { icon: Search, title: "التصفّح والبحث", body: "استعرض الملفات المتوافقة مع تفضيلاتك ضمن ضوابط واضحة." },
  { icon: Heart, title: "طلب التواصل", body: "أرسل طلب تواصل لمن يناسبك، وانتظر موافقة الطرف الآخر." },
  { icon: MessageCircle, title: "المحادثة المُدارة", body: "محادثة مراقبة لمدة محددة مع فلترة محتوى تلقائية." },
  { icon: Handshake, title: "الاتفاق", body: "عند التوافق، تُوثّق الخطوة وتُختتم رحلة التعارف عبر المنصة." },
];

function Timeline() {
  return (
    <section style={{ background: colors.surface.white, padding: `${space[20]}px 0` }}>
      <div style={{ ...wrap, maxWidth: 820 }}>
        <div style={{ textAlign: "center", marginBottom: space[16] }}>
          <SectionLabel center>الرحلة خطوة بخطوة</SectionLabel>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 38, fontWeight: 700, color: colors.ink.black, margin: 0 }}>من التسجيل حتى الاتفاق</h2>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", insetInlineStart: 27, top: 28, bottom: 28, width: 2, background: colors.border.default }} />
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: i === steps.length - 1 ? 0 : 24, position: "relative" }}>
                <div style={{ position: "relative", zIndex: 1, width: 56, height: 56, borderRadius: "50%", background: colors.brand.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 0 0 6px ${colors.surface.white}` }}>
                  <Icon size={26} color="#fff" />
                  <span style={{ position: "absolute", top: -4, insetInlineEnd: -4, width: 24, height: 24, borderRadius: "50%", background: colors.brand.highlight, color: palette.purple[800], fontFamily: fonts.latin, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {i + 1}
                  </span>
                </div>
                <div style={{ flex: 1, background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: "18px 24px", boxShadow: shadow.sm }}>
                  <h3 style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: colors.ink.black, margin: "0 0 6px" }}>{s.title}</h3>
                  <p style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 1.8, color: colors.ink.muted, margin: 0 }}>{s.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const rules = [
  { icon: Clock, title: "مدة محددة", body: "لكل محادثة مدة محددة قبل اتخاذ القرار، حفاظًا على الجدية." },
  { icon: Filter, title: "فلترة المحتوى", body: "فلترة تلقائية للكلمات المحظورة داخل غرف المحادثة." },
  { icon: ShieldCheck, title: "إشراف الإدارة", body: "إمكانية تدخّل الإدارة كطرف ثالث في أي محادثة عند الحاجة." },
];

function Rules() {
  return (
    <section style={{ background: colors.surface.page, padding: `${space[20]}px 0` }}>
      <div style={wrap}>
        <div style={{ textAlign: "center", marginBottom: space[16] }}>
          <SectionLabel center>ضوابط المنصة</SectionLabel>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 38, fontWeight: 700, color: colors.ink.black, margin: 0 }}>قواعد تحفظ جدية الرحلة</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {rules.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} style={{ position: "relative", background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.xl, padding: "44px 26px 26px", boxShadow: shadow.sm, marginTop: 28, textAlign: "center" }}>
                <div style={{ position: "absolute", top: -28, insetInlineStart: "50%", transform: "translateX(-50%)", width: 60, height: 60, borderRadius: "50%", background: colors.brand.green, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 0 6px ${colors.surface.page}` }}>
                  <Icon size={28} color="#fff" />
                </div>
                <h3 style={{ fontFamily: fonts.heading, fontSize: 19, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>{r.title}</h3>
                <p style={{ fontFamily: fonts.body, fontSize: 13.5, lineHeight: 1.8, color: colors.ink.muted, margin: 0 }}>{r.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function P15HowItWorks() {
  return (
    <MarketingPage active="how">
      <PageHero eyebrow="آلية الخطبة" title="كيف تعمل المنصة؟" subtitle="من التسجيل حتى الاتفاق — رحلة واضحة وآمنة خطوة بخطوة." />
      <Timeline />
      <Rules />
      <MarketingCta title="جاهز للخطوة الأولى؟" subtitle="التسجيل سهل، والمراجعة يدوية لضمان الجدية." />
    </MarketingPage>
  );
}
