import { ChevronDown, ChevronUp, Headset, Phone, Mail } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, space, palette } from "../tokens";
import { MarketingPage, MarketingCta, PageHero, wrap } from "./_marketing/Shell";
import { DotPattern } from "./_marketing/deco";

/* P17 · الأسئلة الشائعة — نسخة إبداعية
 * Hero · أكورديون (يمين) + كارت دعم بنفسجي (يسار) · CTA */

const faqs = [
  { q: "هل تُستخدم صور حقيقية للأعضاء؟", a: "لا. المنصة لا تستخدم صورًا حقيقية إطلاقًا — تُعرض أفاتارات أو حروف ملوّنة فقط، حفاظًا على خصوصية الجميع." },
  { q: "كيف يتم قبول التسجيل؟", a: "كل تسجيل يمر على مراجعة يدوية من إدارة المنصة قبل التفعيل — لا قبول تلقائي ولا حسابات وهمية." },
  { q: "هل المحادثات مراقبة؟", a: "نعم، مع فلترة محتوى تلقائية للكلمات المحظورة، وإمكانية تدخّل الإدارة كطرف ثالث في غرف المحادثة عند الحاجة." },
  { q: "هل بياناتي الشخصية محمية؟", a: "نعم، المنصة ملتزمة بنظام حماية البيانات الشخصية (PDPL) في تخزين ومعالجة بياناتك." },
  { q: "هل الاشتراك مدفوع؟", a: "التسجيل متاح، ويُفعّل الحساب عبر اشتراك بعد قبول الإدارة لطلبك." },
  { q: "ماذا لو رُفض طلبي؟", a: "يصلك إشعار يوضّح سبب الرفض، مع إمكانية تعديل بياناتك وإعادة التقديم لاحقًا." },
  { q: "ما مدة المحادثة المتاحة؟", a: "لكل محادثة مدة محددة قبل اتخاذ القرار، حفاظًا على جدية الطرفين." },
  { q: "هل يمكن استرداد الاشتراك؟", a: "تخضع عمليات الاسترداد للشروط الموضّحة في صفحة الشروط والأحكام." },
];

function FaqItem({ q, a, open }: { q: string; a: string; open?: boolean }) {
  return (
    <div style={{ background: colors.surface.white, border: `1px solid ${open ? colors.brand.green : colors.border.soft}`, borderRadius: radius.lg, overflow: "hidden", boxShadow: open ? shadow.sm : "none" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 22px", cursor: "pointer" }}>
        <span style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black }}>{q}</span>
        <span style={{ width: 30, height: 30, borderRadius: "50%", background: open ? colors.brand.green : colors.surface.page, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {open ? <ChevronUp size={15} color="#fff" /> : <ChevronDown size={15} color={colors.ink.muted} />}
        </span>
      </div>
      {open && <div style={{ padding: "0 22px 20px" }}><p style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 1.9, color: colors.ink.muted, margin: 0 }}>{a}</p></div>}
    </div>
  );
}

function SupportCard() {
  return (
    <div style={{ position: "relative", overflow: "hidden", background: palette.purple[800], borderRadius: radius.xl, padding: 32 }}>
      <DotPattern id="kh-faq-support" color="#FFFFFF" opacity={0.05} gap={26} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ width: 56, height: 56, borderRadius: radius.lg, background: colors.brand.highlight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
          <Headset size={28} color={palette.purple[800]} />
        </div>
        <h3 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>لم تجد إجابتك؟</h3>
        <p style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 1.8, color: palette.purple[200], margin: "0 0 22px" }}>فريق الدعم جاهز للإجابة على كل استفساراتك خلال يوم عمل.</p>
        <button style={{ width: "100%", height: 50, background: colors.brand.highlight, color: palette.purple[800], border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 20 }}>
          تواصل مع الدعم
        </button>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 18 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: fonts.body, fontSize: 14, color: "#fff" }}>
            <Phone size={15} color={colors.brand.highlight} /> 920 000 000
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: fonts.body, fontSize: 14, color: "#fff" }}>
            <Mail size={15} color={colors.brand.highlight} /> info@kh1-ksa.com.sa
          </span>
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <section style={{ background: colors.surface.white, padding: `${space[20]}px 0` }}>
      <div style={{ ...wrap, display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 28, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {faqs.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} open={i === 0} />
          ))}
        </div>
        <SupportCard />
      </div>
    </section>
  );
}

export default function P17Faq() {
  return (
    <MarketingPage active="faq">
      <PageHero eyebrow="الأسئلة الشائعة" title="الأسئلة الشائعة" subtitle="إجابات سريعة على أكثر ما يسأل عنه أعضاء المنصة." />
      <Body />
      <MarketingCta />
    </MarketingPage>
  );
}
