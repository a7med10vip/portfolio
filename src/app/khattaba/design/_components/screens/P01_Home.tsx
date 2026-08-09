import {
  ShieldCheck,
  Scale,
  Eye,
  Crown,
  UserPlus,
  ClipboardCheck,
  Search,
  Handshake,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ImageOff,
  MessageCircle,
  Check,
  X,
  Lock,
} from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, space, palette } from "../tokens";
import { MarketingPage, MarketingCta, wrap } from "./_marketing/Shell";
import { DotPattern, SectionLabel, FloralScatter } from "./_marketing/deco";

/* P01 · الصفحة الرئيسية (Marketing) — نسخة إبداعية موسّعة
 * Hero · ضمانات · لماذا خطّابة السعودية الأولى · الفرق · خصوصيتك · آلية الخطبة · أسئلة · CTA
 * Flat فقط: لا gradient ولا glow. */

/* ───────── Hero ───────── */

function HeroComposition() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img
        src="/khattaba/hero-web-desktop.png"
        alt="أعضاء موثّقون تحت مراجعة وإشراف الإدارة — خصوصية تامة بدون صور حقيقية"
        style={{ width: "100%", maxWidth: 620, height: "auto", display: "block" }}
      />
    </div>
  );
}

function Hero() {
  return (
    <section style={{ background: palette.purple[800], position: "relative", overflow: "hidden", padding: `${space[20]}px 0 ${space[28]}px` }}>
      <DotPattern id="kh-hero-dots" color="#FFFFFF" opacity={0.05} gap={30} />

      <FloralScatter scale={1.0} />


      <div style={{ ...wrap, position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.04fr 0.96fr", gap: 56, alignItems: "center" }}>
        <div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 16px", background: "rgba(251,192,226,0.10)", border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.brand.highlight }}>
            <Crown size={14} /> منصة خطّابة السعودية الأولى
          </span>

          <h1 style={{ fontFamily: fonts.hero, fontSize: 34, fontWeight: 700, lineHeight: 1.45, color: "#fff", margin: `${space[5]}px 0 ${space[4]}px` }}>
            أول <span style={{ color: colors.brand.highlight }}>(منصة وساطة) إلكترونية ذكية</span> آمنة وشرعية تحت إشراف فريق متخصص لعرض بيانات الراغبين بالخطبة والزواج (رجال/نساء)
          </h1>

          <p style={{ fontFamily: fonts.body, fontSize: 18, lineHeight: 1.85, color: palette.purple[200], margin: 0, maxWidth: 500 }}>
            نربط الراغبين في الزواج بخصوصية تامة — دون صور حقيقية، وبمراجعة يدوية لكل عضو قبل التفعيل.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: space[8] }}>
            <button style={{ height: 54, padding: "0 30px", background: colors.brand.highlight, color: palette.purple[800], border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <UserPlus size={18} /> سجّل الآن
            </button>
            <button style={{ height: 54, padding: "0 28px", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
              كيف تعمل المنصة <ChevronLeft size={18} />
            </button>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: space[8], flexWrap: "wrap" }}>
            {[{ icon: ShieldCheck, label: "آمنة" }, { icon: Scale, label: "شرعية" }, { icon: Eye, label: "موثوقة" }].map(({ icon: Icon, label }) => (
              <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: "#fff" }}>
                <Icon size={15} color={colors.brand.highlight} /> {label}
              </span>
            ))}
          </div>
        </div>

        <HeroComposition />
      </div>
    </section>
  );
}

/* ───────── Guarantees strip ───────── */

const guarantees = [
  { icon: ClipboardCheck, title: "مراجعة يدوية", sub: "قبل تفعيل أي حساب" },
  { icon: ImageOff, title: "بدون صور حقيقية", sub: "خصوصية كاملة" },
  { icon: MessageCircle, title: "شات مراقب", sub: "فلترة وتدخّل عند الحاجة" },
  { icon: ShieldCheck, title: "متوافقة مع PDPL", sub: "حماية بياناتك" },
];

function Guarantees() {
  return (
    <section style={{ background: colors.surface.white, padding: `0 0 ${space[16]}px` }}>
      <div style={wrap}>
        <div style={{ marginTop: -56, position: "relative", zIndex: 2, background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.xl, boxShadow: shadow.lg, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", overflow: "hidden" }}>
          {guarantees.map((g, i) => {
            const Icon = g.icon;
            return (
              <div key={g.title} style={{ display: "flex", alignItems: "center", gap: 14, padding: "24px 22px", borderInlineStart: i === 0 ? "none" : `1px solid ${colors.border.soft}` }}>
                <div style={{ width: 46, height: 46, borderRadius: radius.md, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={22} color={colors.brand.green} />
                </div>
                <div>
                  <div style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black }}>{g.title}</div>
                  <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 2 }}>{g.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────── Pillars (redesigned — medallion cards) ───────── */

const pillars = [
  { n: "01", icon: ShieldCheck, title: "آمنة", intro: "أمانك يبدأ من أول خطوة.", points: ["مراجعة يدوية لكل حساب", "لا حسابات وهمية ولا قبول تلقائي"] },
  { n: "02", icon: Scale, title: "شرعية", intro: "ضوابط واضحة تحفظ القيم.", points: ["إطار شرعي للتواصل", "حدود واضحة بين الطرفين"] },
  { n: "03", icon: Eye, title: "موثوقة", intro: "إشراف لا ينقطع.", points: ["فلترة محتوى تلقائية", "تدخّل الإدارة عند الحاجة"] },
];

function Pillars() {
  return (
    <section style={{ background: colors.surface.white, padding: `${space[16]}px 0 ${space[20]}px` }}>
      <div style={wrap}>
        <div style={{ textAlign: "center", marginBottom: space[16] }}>
          <SectionLabel center>لماذا خطّابة السعودية الأولى؟</SectionLabel>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 38, fontWeight: 700, color: colors.ink.black, margin: 0 }}>ثلاث ركائز تحكم كل تفصيلة</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} style={{ position: "relative", background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.xl, padding: "52px 28px 28px", boxShadow: shadow.sm, marginTop: 28 }}>
                {/* top accent */}
                <div style={{ position: "absolute", top: 0, insetInlineStart: 28, insetInlineEnd: 28, height: 3, background: colors.brand.highlight, borderRadius: 2 }} />
                {/* medallion */}
                <div style={{ position: "absolute", top: -28, insetInlineStart: "50%", transform: "translateX(-50%)", width: 64, height: 64, borderRadius: "50%", background: colors.brand.green, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 0 6px ${colors.surface.white}, 0 8px 20px rgba(42,19,34,0.18)` }}>
                  <Icon size={30} color="#fff" />
                </div>
                <span style={{ position: "absolute", insetInlineEnd: 20, top: 14, fontFamily: fonts.latin, fontSize: 40, fontWeight: 800, color: colors.surface.sunken, lineHeight: 1 }}>{p.n}</span>

                <h3 style={{ fontFamily: fonts.heading, fontSize: 24, fontWeight: 700, color: colors.ink.black, margin: "0 0 6px", textAlign: "center" }}>{p.title}</h3>
                <p style={{ fontFamily: fonts.body, fontSize: 14, color: colors.ink.muted, margin: "0 0 18px", textAlign: "center" }}>{p.intro}</p>

                <div style={{ borderTop: `1px solid ${colors.border.soft}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                  {p.points.map((pt) => (
                    <div key={pt} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 22, height: 22, borderRadius: "50%", background: colors.brand.greenSoft, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check size={13} color={colors.brand.green} strokeWidth={3} />
                      </span>
                      <span style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.body }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────── Why different (comparison) ───────── */

const otherSide = [
  "غياب التحقق الحقيقي من الهوية والبيانات، مما قد يفتح المجال للتلاعب أو انتحال الشخصية.",
  "نقل معلومات خاصة وصور وأرقام بشكل غير آمن بين الأطراف.",
  "ضعف الخصوصية وانتشار السمعة أو المعلومات الشخصية داخل نطاق اجتماعي واسع.",
  "الاعتماد على الاجتهاد الشخصي والخبرة الفردية دون وجود معايير واضحة أو توثيق.",
  "احتمالية وجود معلومات غير دقيقة أو مبالغ فيها عن الطرف الآخر.",
  "غياب التوثيق القانوني أو الرقابي في حال حدوث نزاعات أو إساءة استخدام.",
  "الاستغلال المادي من بعض الوسطاء عبر طلب مبالغ غير واضحة أو متكررة.",
  "تأخر الوصول إلى التوافق المناسب بسبب محدودية دائرة المعارف والعلاقات.",
  "تعرض بعض المستفيدين للابتزاز العاطفي أو المالي نتيجة ضعف الحماية والإجراءات.",
  "عدم وجود تقييمات أو سجل موثوق يوضح مصداقية الوسيط أو جودة الخدمة.",
  "صعوبة متابعة الحالات وتنظيم الطلبات بشكل احترافي.",
  "احتمالية تدخل أطراف متعددة بشكل غير منظم مما يسبب سوء فهم أو نقل معلومات خاطئة.",
  "ضعف العدالة والشفافية في عرض الخيارات بين الأطراف.",
  "محدودية التوافق الفكري والاجتماعي بسبب ضيق نطاق البحث التقليدي.",
  "غياب الأنظمة التقنية التي تحفظ الحقوق وتراقب جودة التواصل بين الأطراف.",
];
const otherSummary =
  "الأساليب التقليدية القديمة في التوفيق والزواج أصبحت تواجه تحديات متزايدة تتعلق بالخصوصية، ودقة المعلومات، وموثوقية الوسطاء، إضافة إلى غياب التحقق والتوثيق والتنظيم المهني، مما يجعل الحاجة ملحّة إلى حلول أكثر أمانًا واحترافية تحفظ خصوصية الأطراف وترفع جودة التوافق والثقة.";

const khSide = [
  "رفع مستوى الأمان والخصوصية مقارنة بالطرق التقليدية.",
  "التحقق من بيانات الأعضاء وتقليل الحسابات غير الجادة أو الوهمية.",
  "توفير بيئة منظمة تحفظ الاحترام والسرية بين الأطراف.",
  "تسهيل الوصول إلى فرص توافق مناسبة وفق معايير واضحة ومحددة.",
  "تقليل العشوائية والاعتماد على الاجتهادات الفردية.",
  "وجود أنظمة وإجراءات تقنية تساعد على حفظ الحقوق وتنظيم التواصل.",
  "تسريع عملية البحث والتوافق عبر أدوات تقنية ذكية.",
  "إمكانية إدارة الطلبات والمتابعة بشكل احترافي ومنظم.",
  "توفير سجل موثق للحالات والإجراءات بدلاً من الأساليب الشفهية القديمة.",
  "تقليل احتمالية الاستغلال المالي أو نقل المعلومات الشخصية بشكل غير آمن.",
  "إتاحة خيارات بحث أوسع تتجاوز حدود العلاقات التقليدية الضيقة.",
  "تعزيز الجدية والالتزام من خلال الأنظمة والسياسات المنظمة للمنصة.",
  "تحسين جودة التوافق الاجتماعي والفكري من خلال البيانات والمعايير الدقيقة.",
  "دعم تجربة أكثر راحة ومرونة للأعضاء مع إمكانية المتابعة الإلكترونية.",
  "رفع مستوى الثقة والشفافية بين جميع الأطراف المشاركة.",
];
const khSummary =
  "توفر المنصات التقنية الحديثة بيئة أكثر أمانًا واحترافية لتنظيم مشاريع الزواج والتوفيق، من خلال التحقق من البيانات، وحفظ الخصوصية، وتحسين جودة التوافق، إضافة إلى تسهيل الإجراءات والمتابعة عبر أنظمة تقنية موثوقة تقلل من العشوائية والمخاطر التقليدية.";

function WhyDifferent() {
  return (
    <section style={{ background: colors.surface.page, padding: `${space[20]}px 0` }}>
      <div style={{ ...wrap, maxWidth: 940 }}>
        <div style={{ textAlign: "center", marginBottom: space[12] }}>
          <SectionLabel center>الفرق واضح</SectionLabel>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 38, fontWeight: 700, color: colors.ink.black, margin: 0 }}>لماذا تختلف منصة خطّابة السعودية الأولى؟</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Others */}
          <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.xl, padding: 32 }}>
            <div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.muted, marginBottom: 20 }}>الطرق التقليدية</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {otherSide.map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", background: colors.accent.redSoft, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <X size={14} color={colors.accent.red} strokeWidth={2.5} />
                  </span>
                  <span style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 1.7, color: colors.ink.muted }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${colors.border.soft}` }}>
              <div style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: colors.accent.red, marginBottom: 6 }}>الملخص</div>
              <p style={{ fontFamily: fonts.body, fontSize: 13.5, lineHeight: 1.85, color: colors.ink.muted, margin: 0 }}>{otherSummary}</p>
            </div>
          </div>

          {/* Khattaba */}
          <div style={{ position: "relative", overflow: "hidden", background: palette.purple[800], borderRadius: radius.xl, padding: 32 }}>
            <DotPattern id="kh-diff-dots" color="#FFFFFF" opacity={0.05} gap={24} />
            <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              
              <span style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: "#fff" }}>مع خطّابة السعودية الأولى</span>
            </div>
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              {khSide.map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", background: colors.brand.highlight, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Check size={14} color={palette.purple[800]} strokeWidth={3} />
                  </span>
                  <span style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 1.7, fontWeight: 500, color: "#fff" }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ position: "relative", zIndex: 1, marginTop: 22, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.15)" }}>
              <div style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: colors.brand.highlight, marginBottom: 6 }}>الملخص</div>
              <p style={{ fontFamily: fonts.body, fontSize: 13.5, lineHeight: 1.85, color: "rgba(255,255,255,0.9)", margin: 0 }}>{khSummary}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Privacy spotlight ───────── */

const privacyPoints = [
  { icon: ImageOff, title: "بدون صور حقيقية", body: "أفاتارات أو حروف ملوّنة فقط — لا تُعرض صورك أبدًا." },
  { icon: Lock, title: "بيانات محمية", body: "تخزين ومعالجة وفق نظام حماية البيانات الشخصية (PDPL)." },
  { icon: ClipboardCheck, title: "مراجعة يدوية", body: "كل حساب يُراجع قبل التفعيل لمنع الحسابات الوهمية." },
  { icon: MessageCircle, title: "شات مراقب", body: "فلترة تلقائية وإمكانية تدخّل الإدارة كطرف ثالث." },
];

function PrivacySpotlight() {
  return (
    <section style={{ background: colors.surface.white, padding: `${space[20]}px 0` }}>
      <div style={{ ...wrap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
        {/* text */}
        <div>
          <SectionLabel>خصوصيتك أولًا</SectionLabel>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 36, fontWeight: 700, color: colors.ink.black, margin: "0 0 14px" }}>صُمّمت لتحمي خصوصيتك</h2>
          <p style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 1.85, color: colors.ink.muted, margin: "0 0 28px", maxWidth: 460 }}>
            في رحلة حساسة كالزواج، الخصوصية ليست خيارًا. بنينا كل تفصيلة في المنصة لتحمي بياناتك وهويتك.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {privacyPoints.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} style={{ display: "flex", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: radius.md, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={20} color={colors.brand.green} />
                  </div>
                  <div>
                    <div style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black, marginBottom: 4 }}>{p.title}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 1.7, color: colors.ink.muted }}>{p.body}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* visual */}
        <div style={{ position: "relative", alignSelf: "stretch", borderRadius: radius["2xl"], overflow: "hidden", minHeight: 420, boxShadow: shadow.lg }}>
          <img
            src="/khattaba/privacy-couple.png"
            alt="زوجان يتصفّحان المنصة بخصوصية في أمسية هادئة"
            style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{ position: "absolute", insetInlineStart: 16, bottom: 16, display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", background: palette.purple[800], borderRadius: radius.full, color: "#fff", fontFamily: fonts.body, fontSize: 12, fontWeight: 700 }}>
            <ShieldCheck size={14} color={colors.brand.highlight} /> متوافق مع PDPL
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── How it works (connected) ───────── */

const steps = [
  { icon: UserPlus, title: "سجّل وأنشئ ملفك", body: "بياناتك وتفضيلات الطرف الآخر." },
  { icon: ClipboardCheck, title: "مراجعة وتفعيل", body: "الإدارة تراجع طلبك يدويًا." },
  { icon: Search, title: "تصفّح وأرسل طلب", body: "اختر من يناسبك وأرسل تواصل." },
  { icon: Handshake, title: "تواصل مُدار", body: "محادثة مراقبة حتى الاتفاق." },
];

function HowItWorks() {
  return (
    <section style={{ background: colors.surface.page, padding: `${space[20]}px 0` }}>
      <div style={wrap}>
        <div style={{ textAlign: "center", marginBottom: space[12] }}>
          <SectionLabel center>آلية الخطبة</SectionLabel>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 38, fontWeight: 700, color: colors.ink.black, margin: 0 }}>أربع خطوات حتى الاتفاق</h2>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 27, insetInlineStart: "12%", insetInlineEnd: "12%", height: 2, background: colors.border.default, borderRadius: 2 }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10 }}>
                  <div style={{ position: "relative", zIndex: 1, width: 56, height: 56, borderRadius: "50%", background: colors.brand.green, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 0 8px ${colors.surface.page}` }}>
                    <Icon size={26} color="#fff" />
                    <span style={{ position: "absolute", top: -4, insetInlineEnd: -4, width: 24, height: 24, borderRadius: "50%", background: colors.brand.highlight, color: palette.purple[800], fontFamily: fonts.latin, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {i + 1}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: colors.ink.black, margin: "6px 0 0" }}>{s.title}</h3>
                  <p style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 1.7, color: colors.ink.muted, margin: 0, maxWidth: 200 }}>{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── FAQ teaser ───────── */

const faqTeaser = [
  { q: "هل تُستخدم صور حقيقية للأعضاء؟", a: "لا إطلاقًا — تُعرض أفاتارات أو حروف ملوّنة فقط، حفاظًا على خصوصية الجميع." },
  { q: "كيف يتم قبول التسجيل؟", a: "كل تسجيل يمر على مراجعة يدوية من الإدارة قبل التفعيل — لا قبول تلقائي." },
  { q: "هل المحادثات مراقبة؟", a: "نعم، مع فلترة محتوى تلقائية وإمكانية تدخّل الإدارة كطرف ثالث عند الحاجة." },
];

function FaqTeaser() {
  return (
    <section style={{ background: colors.surface.white, padding: `${space[20]}px 0` }}>
      <div style={{ ...wrap, maxWidth: 780 }}>
        <div style={{ textAlign: "center", marginBottom: space[12] }}>
          <SectionLabel center>أسئلة شائعة</SectionLabel>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 38, fontWeight: 700, color: colors.ink.black, margin: 0 }}>إجابات سريعة</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {faqTeaser.map((f, i) => {
            const open = i === 0;
            return (
              <div key={f.q} style={{ background: colors.surface.white, border: `1px solid ${open ? colors.brand.green : colors.border.soft}`, borderRadius: radius.lg, overflow: "hidden", boxShadow: open ? shadow.sm : "none" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 22px" }}>
                  <span style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black }}>{f.q}</span>
                  <span style={{ width: 30, height: 30, borderRadius: "50%", background: open ? colors.brand.green : colors.surface.page, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {open ? <ChevronUp size={15} color="#fff" /> : <ChevronDown size={15} color={colors.ink.muted} />}
                  </span>
                </div>
                {open && <div style={{ padding: "0 22px 20px" }}><p style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 1.85, color: colors.ink.muted, margin: 0 }}>{f.a}</p></div>}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 28 }}>
          <button style={{ height: 48, padding: "0 26px", background: "transparent", color: colors.brand.green, border: `1.5px solid ${colors.brand.green}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
            عرض كل الأسئلة <ChevronLeft size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default function P01Home() {
  return (
    <MarketingPage active="home">
      <Hero />
      <Guarantees />
      <Pillars />
      <WhyDifferent />
      <PrivacySpotlight />
      <HowItWorks />
      <FaqTeaser />
      <MarketingCta />
    </MarketingPage>
  );
}
