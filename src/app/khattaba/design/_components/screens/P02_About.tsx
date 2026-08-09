import { Target, Flag, Heart, ShieldCheck, Lock, Crown, ClipboardCheck, MessageCircle, Quote } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, space, palette } from "../tokens";
import { MarketingPage, MarketingCta, PageHero, wrap } from "./_marketing/Shell";
import { DotPattern, SectionLabel, FloralScatter, BrandWordmark } from "./_marketing/deco";

/* P02 · من نحن — نسخة إبداعية
 * Hero · الرؤية/الرسالة · بيان العلامة · قيمنا · كيف نحمي رحلتك · CTA */

function VisionMission() {
  const cards = [
    { icon: Target, label: "الرؤية", title: "المنصة الأولى الموثوقة", body: "أن نكون المنصة الأولى والموثوقة لوساطة الزواج في السعودية، بمعايير أمان وخصوصية تليق بحساسية هذه الرحلة." },
    { icon: Flag, label: "الرسالة", title: "تعارفٌ آمن بغرض الزواج", body: "تسهيل التعارف بغرض الزواج ضمن إطار آمن وشرعي يحفظ خصوصية الطرفين، تحت إشراف مباشر من إدارة المنصة." },
  ];
  return (
    <section style={{ background: colors.surface.white, padding: `${space[20]}px 0 ${space[16]}px` }}>
      <div style={{ ...wrap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} style={{ position: "relative", background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.xl, padding: "40px 32px 32px", boxShadow: shadow.sm }}>
              <div style={{ position: "absolute", top: 0, insetInlineStart: 32, insetInlineEnd: 32, height: 3, background: colors.brand.highlight, borderRadius: 2 }} />
              <div style={{ width: 60, height: 60, borderRadius: radius.lg, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <Icon size={30} color={colors.brand.green} />
              </div>
              <span style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.brand.green }}>{c.label}</span>
              <h3 style={{ fontFamily: fonts.heading, fontSize: 24, fontWeight: 700, color: colors.ink.black, margin: "6px 0 12px" }}>{c.title}</h3>
              <p style={{ fontFamily: fonts.body, fontSize: 15, lineHeight: 1.9, color: colors.ink.muted, margin: 0 }}>{c.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section style={{ background: colors.surface.white, padding: `${space[8]}px 0 ${space[20]}px` }}>
      <div style={wrap}>
        <div style={{ position: "relative", overflow: "hidden", background: palette.purple[800], borderRadius: radius["2xl"], padding: "56px 56px" }}>
          <DotPattern id="kh-about-statement" color="#FFFFFF" opacity={0.05} gap={28} />

      <FloralScatter scale={1.0} mirror />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
            <Quote size={40} color={colors.brand.highlight} />
            <p style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 500, lineHeight: 1.7, color: "#fff", margin: "16px 0 0" }}>
              منصة وساطة زواج آمنة وشرعية، تربط الراغبين تحت إشراف الإدارة{" "}
              <span style={{ color: colors.brand.highlight }}>دون إغفال للخصوصية.</span>
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 24 }}>
              <BrandWordmark onDark size="md" />
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const values = [
  { icon: Heart, label: "إنسانية", desc: "نخدم رحلة شخصية حساسة — الزواج — باحترام كامل." },
  { icon: ShieldCheck, label: "موثوقية", desc: "كل قرار وكل خطوة تعزّز ثقة المستخدم في المنصة." },
  { icon: Lock, label: "خصوصية", desc: "بدون صور حقيقية، وبيانات محمية وفق نظام PDPL." },
  { icon: Crown, label: "احترافية", desc: "مظهر وتجربة يليقان بالأولى من نوعها في المملكة." },
];

function Values() {
  return (
    <section style={{ background: colors.surface.page, padding: `${space[20]}px 0` }}>
      <div style={wrap}>
        <div style={{ textAlign: "center", marginBottom: space[16] }}>
          <SectionLabel center>قيمنا</SectionLabel>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 38, fontWeight: 700, color: colors.ink.black, margin: 0 }}>أربعة أركان توجّه كل تفصيلة</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.label} style={{ position: "relative", background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.xl, padding: "44px 24px 26px", boxShadow: shadow.sm, marginTop: 28, textAlign: "center" }}>
                <div style={{ position: "absolute", top: -28, insetInlineStart: "50%", transform: "translateX(-50%)", width: 60, height: 60, borderRadius: "50%", background: colors.brand.green, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 0 6px ${colors.surface.page}` }}>
                  <Icon size={28} color="#fff" />
                </div>
                <h3 style={{ fontFamily: fonts.heading, fontSize: 19, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>{v.label}</h3>
                <p style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 1.8, color: colors.ink.muted, margin: 0 }}>{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const protections = [
  { icon: ClipboardCheck, title: "مراجعة يدوية", body: "كل تسجيل يمر على إدارة المنصة قبل التفعيل — لا قبول تلقائي، ولا حسابات وهمية." },
  { icon: MessageCircle, title: "شات مراقب", body: "فلترة محتوى تلقائية مع إمكانية تدخّل الأدمن كطرف ثالث في غرف المحادثة عند الحاجة." },
];

function Protections() {
  return (
    <section style={{ background: colors.surface.white, padding: `${space[20]}px 0` }}>
      <div style={wrap}>
        <div style={{ textAlign: "center", marginBottom: space[16] }}>
          <SectionLabel center>طبقتا حماية</SectionLabel>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 38, fontWeight: 700, color: colors.ink.black, margin: 0 }}>كيف نحمي رحلتك</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {protections.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.xl, padding: 32, display: "flex", gap: 18, boxShadow: shadow.sm }}>
                <div style={{ width: 56, height: 56, borderRadius: radius.lg, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={28} color={colors.brand.green} />
                </div>
                <div>
                  <h3 style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: colors.ink.black, margin: "2px 0 8px" }}>{p.title}</h3>
                  <p style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 1.8, color: colors.ink.muted, margin: 0 }}>{p.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function P02About() {
  return (
    <MarketingPage active="about">
      <PageHero eyebrow="من نحن" title="من نحن" subtitle="منصة وساطة زواج آمنة وشرعية، تربط الراغبين تحت إشراف الإدارة دون إغفال للخصوصية." />
      <VisionMission />
      <Statement />
      <Values />
      <Protections />
      <MarketingCta />
    </MarketingPage>
  );
}
