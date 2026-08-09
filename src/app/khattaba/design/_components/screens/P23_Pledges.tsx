import { FileSignature, ShieldCheck, Check, PenTool, BookOpen, BadgeCheck, Wallet, Shield } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, palette, space } from "../tokens";
import { MarketingPage, wrap } from "./_marketing/Shell";
import { DotPattern, FloralScatter } from "./_marketing/deco";

/* P23 · الإقرارات والتعهدات — منقولة حرفياً من العرض (Section 11، أسطر 1211-1240) */

const pledges = [
  {
    icon: BookOpen,
    when: "أولاً · قبل التسجيل",
    title: "التعهد والإقرار قبل التسجيل",
    body: "أقسم بالله العلي العظيم، وأنا بكامل أهليتي الشرعية والنظامية، بأن انضمامي إلى منصة خطابة السعودية الأولى إنما هو لغرض الزواج الشرعي الجاد فقط، وليس لأي غرض آخر يخالف الأنظمة أو الآداب أو سياسات المنصة. كما أتعهد التزاماً قطعياً ونهائياً بالامتثال الكامل لجميع الشروط والأحكام والسياسات والأنظمة والتعليمات المعمول بها داخل المنصة، وأقر بتحملي لكافة المسؤوليات والآثار المترتبة على أي مخالفة تصدر مني، سواء كانت مباشرة أو غير مباشرة. والله خير الشاهدين على ما أقول.",
    signed: true,
  },
  {
    icon: BadgeCheck,
    when: "ثانياً · بعد التسجيل",
    title: "الإقرار بصحة البيانات بعد التسجيل",
    body: "أقر أنا الموقع أدناه، وبكامل أهليتي المعتبرة شرعاً ونظاماً، بأن جميع البيانات والمعلومات والمستندات المدخلة في حسابي لدى منصة خطابة السعودية الأولى صحيحة وسليمة ومطابقة للواقع دون أي تزوير أو تضليل أو إخفاء لأي معلومات جوهرية. كما أتحمل كامل المسؤولية الشرعية والنظامية والقانونية تجاه أي بيانات غير صحيحة أو مضللة، ويحق لإدارة المنصة، دون أدنى اعتراض مني، اتخاذ ما تراه مناسباً من إجراءات، بما في ذلك إيقاف الحساب أو شطب العضوية أو الحرمان من خدمات المنصة بشكل دائم، دون تحملها لأي مسؤولية تجاه ذلك.",
    signed: true,
  },
  {
    icon: Shield,
    when: "ثالثاً · قبول السياسات",
    title: "إقرار وتعهد بإخلاء المسؤولية",
    body: "أقر إقراراً صريحاً ونهائياً بأنني قد اطّلعت اطلاعاً تاماً على كافة سياسات وشروط وأحكام منصة خطابة السعودية الأولى، وفهمتها فهماً كاملاً نافياً للجهالة، وأوافق عليها موافقة كاملة دون قيد أو شرط. كما أقر بأن اختياري للطرف الآخر وقرار الارتباط أو الاستمرار أو الانسحاب من أي مشروع خطبة أو زواج يتم بإرادتي الشخصية المنفردة ودون أي تأثير أو توجيه أو ضمان من إدارة المنصة أو منسوبيها. وأقر كذلك بأن دور المنصة يقتصر على التوفيق والتعارف بين الأطراف فقط، ولا تتحمل إدارة المنصة أو ملاكها أو موظفوها أي مسؤولية شرعية أو قانونية أو اجتماعية أو مالية أو نفسية أو أسرية تنشأ، بشكل مباشر أو غير مباشر، نتيجة أي تواصل أو اتفاق أو تعامل أو علاقة تتم بين الأعضاء داخل المنصة أو خارجها. كما أتعهد بعدم الرجوع على المنصة أو المطالبة بأي تعويض أو مساءلة مهما كان نوعها أو سببها مستقبلاً.",
    signed: true,
  },
  {
    icon: Wallet,
    when: "رابعاً · قبل دخول مشروع الخطبة",
    title: "إقرار وتعهد بسداد عمولة المنصة بعد الملكة",
    body: "أقسم بالله العلي العظيم، وأتعهد تعهداً ملزماً ونهائياً، بأنه في حال إتمام الملكة (عقد القران) بيني وبين الطرف الآخر الذي تم التعارف عليه عن طريق منصة خطابة السعودية الأولى، فإنني ألتزم بسداد أتعاب وعمولة المنصة المالية كاملة دون تأخير أو مماطلة وأوافق على تحويل مبلغ وقدره (يُحدد المبلغ من طرف إدارة المنصة) إلى الحساب الرسمي المعتمد الخاص بالشركة، وذلك فور إتمام عقد القران. كما أقر بأن هذا التعهد ملزم لي شرعاً ونظاماً، والله على ما أقول شهيد. أوافق وألتزم بما ورد أعلاه.",
    signed: false,
  },
];

function PledgeCard({ p, idx }: { p: (typeof pledges)[number]; idx: number }) {
  const Icon = p.icon;
  return (
    <div style={{ background: colors.surface.white, border: `1px solid ${p.signed ? colors.brand.green : colors.border.soft}`, borderRadius: radius.xl, padding: 30, boxShadow: shadow.sm, position: "relative", overflow: "hidden" }}>
      {p.signed && (
        <span style={{ position: "absolute", top: 18, insetInlineStart: 24, display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", background: colors.brand.greenSoft, color: colors.brand.green, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11, fontWeight: 700 }}>
          <Check size={12} strokeWidth={3} /> موقَّع
        </span>
      )}
      <div style={{ display: "flex", gap: 16, marginBottom: 18, alignItems: "flex-start" }}>
        <div style={{ width: 56, height: 56, borderRadius: radius.lg, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={26} color={colors.brand.green} />
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ fontFamily: fonts.latin, fontSize: 11, fontWeight: 700, color: colors.brand.green, letterSpacing: 1 }}>{`0${idx + 1}`} · {p.when}</span>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.ink.black, margin: "5px 0 0" }}>{p.title}</h3>
        </div>
      </div>

      <p style={{ fontFamily: fonts.body, fontSize: 14.5, lineHeight: 2.05, color: colors.ink.body, margin: "0 0 22px" }}>{p.body}</p>

      <div style={{ background: colors.surface.page, border: `1.5px dashed ${p.signed ? colors.brand.green : colors.border.strong}`, borderRadius: radius.md, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <PenTool size={16} color={p.signed ? colors.brand.green : colors.ink.muted} />
          {p.signed ? (
            <svg width="160" height="44" viewBox="0 0 160 44"><path d="M 10 30 Q 22 6, 36 30 T 78 22 Q 98 6, 124 28 Q 142 38, 154 22" stroke={palette.purple[800]} strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
          ) : (
            <span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.muted }}>اضغط للتوقيع الإلكتروني</span>
          )}
        </div>
        {p.signed ? (
          <div style={{ textAlign: "end" }}>
            <div style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.ink.black }}>محمد الأحمدي · #KH-2087</div>
            <div style={{ fontFamily: fonts.latin, fontSize: 11, color: colors.ink.muted, marginTop: 2 }}>29-05-2026 11:42</div>
          </div>
        ) : (
          <button style={{ height: 40, padding: "0 18px", background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <PenTool size={14} /> وقّع الآن
          </button>
        )}
      </div>
    </div>
  );
}

export default function P23Pledges() {
  return (
    <MarketingPage active={null}>
      {/* hero */}
      <section style={{ background: palette.purple[800], position: "relative", overflow: "hidden", padding: `${space[16]}px 0 ${space[20]}px` }}>
        <DotPattern id="kh-pledge-dots" color="#FFFFFF" opacity={0.05} gap={28} />

      <FloralScatter scale={0.9} mirror />
        <div style={{ ...wrap, position: "relative", zIndex: 1, textAlign: "center", maxWidth: 720 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", background: "rgba(251,192,226,0.10)", border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: colors.brand.highlight, marginBottom: 18 }}>
            <FileSignature size={14} /> القسم الحادي عشر
          </span>
          <h1 style={{ fontFamily: fonts.hero, fontSize: 44, fontWeight: 700, color: "#fff", margin: "0 0 14px", lineHeight: 1.3 }}>الإقرارات والتعهدات</h1>
          <p style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 1.9, color: palette.purple[200], margin: 0 }}>
            ثلاث وثائق رسمية يوقّعها العضو إلكترونياً في لحظات مختلفة من رحلته — تُحفَظ في سجل المراجعة وتُعتمد كسندات تنظيمية.
          </p>
        </div>
      </section>

      {/* pledges */}
      <section style={{ background: colors.surface.white, padding: `${space[16]}px 0 ${space[20]}px` }}>
        <div style={{ ...wrap, maxWidth: 920, display: "flex", flexDirection: "column", gap: 22 }}>
          {pledges.map((p, i) => <PledgeCard key={p.title} p={p} idx={i} />)}

          <div style={{ background: colors.brand.greenSoft, border: `1px solid ${colors.brand.green}30`, borderRadius: radius.lg, padding: "18px 22px", display: "flex", gap: 12, marginTop: 8 }}>
            <ShieldCheck size={20} color={colors.brand.green} style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontFamily: fonts.body, fontSize: 13.5, lineHeight: 1.8, color: colors.ink.body, margin: 0 }}>
              تحتفظ إدارة منصة خطابة السعودية الأولى بجميع التعهدات والإقرارات والسجلات الإلكترونية، ولها الحق بطباعتها رسمياً واعتمادها كسندات تنظيمية وإدارية عند الحاجة.
            </p>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
