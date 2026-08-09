import { Check, X, Eye, Lock, Camera, Globe, Accessibility, Languages } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

type Rule = { text: string; explanation?: string };

const dos: Rule[] = [
  { text: "خلفية بيضاء أو رمادية فاتحة جداً (gray-50)", explanation: "تعطي إحساس premium ونظيف" },
  { text: "زر primary واحد فقط لكل شاشة (الأخضر)", explanation: "يوجّه المستخدم لأهم action" },
  { text: "Avatars بحرف واحد ملوّن (initial)", explanation: "خصوصية + جمالية متّسقة" },
  { text: "RTL في كل مكان، حتى الأسهم والأيقونات", explanation: "الجمهور 100% سعودي/عربي" },
  { text: "line-height عربي ≥ 1.6", explanation: "الحروف العربية أطول من اللاتينية" },
  { text: "Focus state واضح على كل interactive element", explanation: "للوصولية وحقوق المستخدم" },
  { text: "WCAG AA contrast (4.5:1 للنصوص)", explanation: "يقرأه الجميع بدون مشقة" },
  { text: "Skeleton loaders بدلاً من spinners الكبيرة", explanation: "تجربة أسرع perceptually" },
];

const donts: Rule[] = [
  { text: "صور حقيقية لأشخاص في أي مكان", explanation: "ضوابط شرعية + خصوصية" },
  { text: "Gradients على خلفيات الصفحات", explanation: "غير متسق مع الـ premium feel" },
  { text: "Dark mode على المنتج الفعلي (للآن)", explanation: "الجمهور المستهدف يفضّل light" },
  { text: "أكثر من 2 أكسنت لون في نفس الـ viewport", explanation: "يربك المستخدم بصرياً" },
  { text: "Hover effects ثقيلة على الموبايل", explanation: "لا يوجد hover حقيقي على touch" },
  { text: "نصوص أصغر من 13px للـ body", explanation: "صعب القراءة على الموبايل" },
  { text: "Modals متداخلة (modal فوق modal)", explanation: "anti-pattern معروف" },
  { text: "إخفاء معلومات مهمة خلف tooltip فقط", explanation: "لا تظهر على touch devices" },
];

type GuideBlock = { icon: any; title: string; color: string; body: string };

const principles: GuideBlock[] = [
  {
    icon: Lock,
    title: "الخصوصية أولاً",
    color: colors.accent.purple,
    body: "نتعامل مع بيانات حساسة جداً (بحث عن شريك حياة). كل قرار تصميمي يجب أن يقلّل تعرّض البيانات للأطراف غير المعنية. لا نعرض رقم جوال، لا بريد، لا صور.",
  },
  {
    icon: Camera,
    title: "بدون وجوه حقيقية",
    color: colors.accent.red,
    body: "في كل المنصة (موقع + تطبيق + إدارة): لا نسمح برفع صور شخصية حقيقية. البديل: avatars ملوّنة بالحرف الأول أو illustrated avatars محدّدة الهوية (ذكر/أنثى).",
  },
  {
    icon: Languages,
    title: "RTL ليس اختياراً",
    color: colors.brand.green,
    body: "كل العناصر — text, icons, arrows, gradients, animations — مصممة من البداية للـ RTL. الأسهم تنعكس تلقائياً، الـ padding يستخدم inset-inline-start بدلاً من left/right.",
  },
  {
    icon: Accessibility,
    title: "الوصولية",
    color: colors.accent.blue,
    body: "كل interactive element له focus state مرئي + label واضح للـ screen readers. Contrast 4.5:1 minimum للنصوص. حجم touch target ≥ 44×44 px.",
  },
  {
    icon: Eye,
    title: "Mobile-first",
    color: colors.accent.amber,
    body: "نصمم للموبايل أولاً (390×844)، ثم نعدّل للـ desktop. أكثر من 70% من المستخدمين سيكونون على الجوال. كل interaction يجب أن يعمل بإصبع واحد.",
  },
  {
    icon: Globe,
    title: "محتوى عربي native",
    color: colors.ink.body,
    body: "النصوص العربية مكتوبة من شخص عربي، ليست translations حرفية. نستخدم العبارات الشائعة في السعودية تحديداً (مثلاً: مشروع خطبة، الطرف الآخر، رسوم اشتراك).",
  },
];

function RuleList({ rules, type }: { rules: Rule[]; type: "do" | "dont" }) {
  const isDo = type === "do";
  const color = isDo ? colors.brand.green : colors.accent.red;
  const Icon = isDo ? Check : X;
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${color}30`,
        borderRadius: radius.lg,
        padding: 24,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `${color}14`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={20} color={color} strokeWidth={3} />
        </div>
        <div>
          <div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color }}>
            {isDo ? "القواعد المطلوبة" : "الممنوعات"}
          </div>
          <div style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 500, color: colors.ink.muted, marginTop: 2 }}>
            {rules.length} بنود
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {rules.map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: color,
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              <Icon size={12} strokeWidth={3} />
            </div>
            <div>
              <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.ink.black, lineHeight: 1.5 }}>
                {r.text}
              </div>
              {r.explanation && (
                <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, marginTop: 3 }}>
                  {r.explanation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GuidelinesSection() {
  return (
    <section id="guidelines" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="27"
        eyebrow="مبادئ التصميم"
        title="الإرشادات"
        description="قواعد جوهرية تحكم كل قرار تصميمي."
      />

      {/* Principles */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
        {principles.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              style={{
                background: colors.surface.white,
                border: `1px solid ${colors.border.soft}`,
                borderRadius: radius.lg,
                padding: 22,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${p.color}14`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={22} color={p.color} />
              </div>
              <div>
                <div style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black }}>
                  {p.title}
                </div>
                <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, lineHeight: 1.7, marginTop: 6 }}>
                  {p.body}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Do's & Don'ts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <RuleList rules={dos} type="do" />
        <RuleList rules={donts} type="dont" />
      </div>

      {/* Closing */}
      <div
        style={{
          marginTop: 40,
          background: colors.ink.black,
          color: "#fff",
          borderRadius: radius.lg,
          padding: 32,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 12,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            نهاية الوثيقة · الإصدار 0.2
          </div>
          <h3
            style={{
              fontFamily: fonts.heading,
              fontSize: 28,
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.4,
              maxWidth: 600,
              marginInline: "auto",
            }}
          >
            نظام تصميم حي — كل ما يُضاف من شاشات جديدة، يجب أن يحترم هذه القواعد.
          </h3>
          <p style={{ fontFamily: fonts.body, fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 12 }}>
            للأسئلة أو الاقتراحات على النظام · hello@ahmedali.online
          </p>
        </div>
      </div>
    </section>
  );
}
