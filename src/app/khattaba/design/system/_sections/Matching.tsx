import { Heart, BadgeCheck, ShieldCheck, MapPin, Check, X, Crown, Sparkles, FileSignature, MessageCircle, CheckCircle2, XCircle, Send } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

function CompatibilityMeter() {
  const score = 87;
  const r = 70;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const breakdowns = [
    { label: "العمر", value: 95, color: colors.brand.green },
    { label: "المدينة", value: 100, color: colors.brand.green },
    { label: "المؤهل", value: 78, color: colors.accent.blue },
    { label: "التفضيلات", value: 82, color: colors.accent.purple },
    { label: "نمط الحياة", value: 70, color: colors.accent.amber },
  ];

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <div style={{ position: "relative", width: 180, height: 180, flexShrink: 0 }}>
        <svg width="180" height="180" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r={r} stroke={colors.border.default} strokeWidth="10" fill="none" />
          <defs>
            <linearGradient id="compGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={colors.brand.green} />
              <stop offset="1" stopColor={colors.accent.purple} />
            </linearGradient>
          </defs>
          <circle
            cx="90"
            cy="90"
            r={r}
            stroke="url(#compGrad)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform="rotate(-90 90 90)"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontFamily: fonts.heading, fontSize: 44, fontWeight: 700, color: colors.ink.black, lineHeight: 1 }}>
            <span style={{ fontFamily: fonts.latin }}>{score}</span>
            <span style={{ fontSize: 22, color: colors.ink.muted }}>%</span>
          </span>
          <span
            style={{
              fontFamily: fonts.body,
              fontSize: 11,
              fontWeight: 600,
              color: colors.brand.green,
              marginTop: 4,
            }}
          >
            نسبة التوافق
          </span>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <div style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black }}>
            توافق قوي
          </div>
          <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 4, lineHeight: 1.6 }}>
            بناءً على البيانات والتفضيلات الموثّقة من الطرفين
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
          {breakdowns.map((b) => (
            <div key={b.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.body }}>{b.label}</span>
                <span style={{ fontFamily: fonts.latin, fontSize: 11, fontWeight: 700, color: b.color }}>{b.value}%</span>
              </div>
              <div style={{ height: 5, background: colors.surface.page, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${b.value}%`, height: "100%", background: b.color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectTimeline() {
  type StepStatus = "done" | "active" | "pending";
  const steps: { icon: any; label: string; date?: string; status: StepStatus; color: string }[] = [
    { icon: Send, label: "إرسال طلب التواصل", date: "12 يناير", status: "done", color: colors.brand.green },
    { icon: CheckCircle2, label: "قبول الطرف الآخر", date: "13 يناير", status: "done", color: colors.brand.green },
    { icon: MessageCircle, label: "الشات المراقب", date: "13 يناير · 18 يوم متبقي", status: "active", color: colors.brand.green },
    { icon: FileSignature, label: "اتفاقية ما قبل الواتساب", status: "pending", color: colors.ink.soft },
    { icon: Heart, label: "التواصل الجاد + رسوم", status: "pending", color: colors.ink.soft },
    { icon: Sparkles, label: "إتمام أو إنهاء المشروع", status: "pending", color: colors.ink.soft },
  ];

  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        padding: 24,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: colors.ink.black }}>
            مشروع خطبة #2487
          </div>
          <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 4 }}>
            بدأ في 12 يناير 2026 · مع نورة الشهري
          </div>
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 12px",
            background: colors.brand.greenSoft,
            color: colors.brand.greenDark,
            border: `1px solid ${colors.brand.green}40`,
            borderRadius: radius.full,
            fontFamily: fonts.body,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: colors.brand.green }} /> نشط
        </span>
      </div>

      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {/* Connecting line */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            height: 3,
            background: colors.border.default,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 24,
            insetInlineStart: 24,
            width: "42%",
            height: 3,
            background: colors.brand.green,
            zIndex: 0,
          }}
        />

        {steps.map((step, i) => {
          const Icon = step.icon;
          const isDone = step.status === "done";
          const isActive = step.status === "active";
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, position: "relative", zIndex: 1 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: isDone || isActive ? step.color : colors.surface.white,
                  color: isDone || isActive ? "#fff" : colors.ink.soft,
                  border: isActive ? `4px solid ${step.color}30` : isDone ? "none" : `2px solid ${colors.border.default}`,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "none",
                }}
              >
                <Icon size={20} strokeWidth={isDone ? 2.5 : 2} />
              </div>
              <div style={{ textAlign: "center", padding: "0 8px" }}>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 11,
                    fontWeight: isActive ? 700 : isDone ? 600 : 500,
                    color: isActive ? colors.brand.green : isDone ? colors.ink.body : colors.ink.muted,
                    lineHeight: 1.4,
                  }}
                >
                  {step.label}
                </div>
                {step.date && (
                  <div style={{ fontFamily: fonts.latin, fontSize: 9, fontWeight: 600, color: colors.ink.muted, marginTop: 4 }}>
                    {step.date}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProfileColumn({ name, initial, color, age, city, verified, premium, attrs, photo }: { name: string; initial: string; color: string; age: number; city: string; verified?: boolean; premium?: boolean; attrs: { label: string; value: string }[]; photo?: string }) {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div style={{ position: "relative" }}>
        {photo ? (
          <img
            src={photo}
            alt={name}
            width={80}
            height={80}
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              objectFit: "cover",
              background: colors.surface.page,
              boxShadow: `0 4px 12px rgba(0,0,0,0.10)`,
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${color}, ${color}cc)`,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.heading,
              fontSize: 32,
              fontWeight: 700,
              boxShadow: "none",
            }}
          >
            {initial}
          </div>
        )}
        {premium && (
          <span
            style={{
              position: "absolute",
              top: -4,
              insetInlineEnd: -4,
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: colors.accent.amber,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${colors.surface.white}`,
            }}
          >
            <Crown size={12} fill="#fff" />
          </span>
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.black }}>{name}</span>
          {verified && <BadgeCheck size={16} color={colors.brand.green} fill={colors.brand.greenSoft} />}
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 4, display: "inline-flex", alignItems: "center", gap: 4 }}>
          <span>{age} سنة</span>
          <span>·</span>
          <MapPin size={11} />
          <span>{city}</span>
        </div>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 0, marginTop: 8 }}>
        {attrs.map((a, i) => (
          <div
            key={a.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: i < attrs.length - 1 ? `1px solid ${colors.border.soft}` : "none",
            }}
          >
            <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>{a.label}</span>
            <span style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.black }}>{a.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonView() {
  const attrs1 = [
    { label: "الجنسية", value: "سعودي" },
    { label: "المدينة", value: "الرياض" },
    { label: "المؤهل", value: "ماجستير" },
    { label: "العمل", value: "مهندس برمجيات" },
    { label: "الحالة الاجتماعية", value: "أعزب" },
  ];
  const attrs2 = [
    { label: "الجنسية", value: "سعودية" },
    { label: "المدينة", value: "الرياض" },
    { label: "المؤهل", value: "بكالوريوس" },
    { label: "العمل", value: "طبيبة أسنان" },
    { label: "الحالة الاجتماعية", value: "آنسة" },
  ];

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "stretch" }}>
        <ProfileColumn name="محمد" initial="م" color={colors.brand.green} age={32} city="الرياض" verified attrs={attrs1} photo="/avatars/saudi-male.jpeg" />
        {/* Spacer column for the compatibility chip is the middle child below */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 4px",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${colors.brand.green}, ${colors.accent.purple})`,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              fontFamily: fonts.heading,
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            87%
          </div>
        </div>
        <ProfileColumn name="نورة" initial="ن" color={colors.accent.purple} age={28} city="الرياض" verified premium attrs={attrs2} photo="/khattaba/avatars/niqab-woman-brown.png" />
      </div>
    </div>
  );
}

function TrustScoreBadge() {
  const criteria = [
    { label: "رقم الجوال موثّق", done: true },
    { label: "البريد الإلكتروني موثّق", done: true },
    { label: "الهوية الوطنية مرفوعة", done: true },
    { label: "اعتماد الإدارة", done: true },
    { label: "العائلة شاهدة", done: false },
    { label: "مرجع شخصي", done: false },
  ];
  const done = criteria.filter((c) => c.done).length;
  const total = criteria.length;
  const level = done >= 5 ? "ذهبي" : done >= 3 ? "فضي" : "برونزي";
  const levelColor = done >= 5 ? colors.accent.amber : done >= 3 ? colors.ink.muted : "#A0563B";

  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: 320,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${levelColor}, ${levelColor}cc)`,
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 16px ${levelColor}40`,
          }}
        >
          <ShieldCheck size={28} fill="#fff" strokeWidth={1.8} />
        </div>
        <div>
          <div style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: colors.ink.black }}>
            مستوى ثقة <span style={{ color: levelColor }}>{level}</span>
          </div>
          <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 2 }}>
            <span style={{ fontFamily: fonts.latin, fontWeight: 700 }}>{done}</span> من <span style={{ fontFamily: fonts.latin, fontWeight: 700 }}>{total}</span> معايير
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {criteria.map((c) => (
          <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: c.done ? colors.brand.green : "transparent",
                color: c.done ? "#fff" : colors.ink.soft,
                border: c.done ? "none" : `1.5px dashed ${colors.border.strong}`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {c.done ? <Check size={11} strokeWidth={3} /> : <X size={10} strokeWidth={2.5} />}
            </span>
            <span style={{ fontFamily: fonts.body, fontSize: 12, color: c.done ? colors.ink.body : colors.ink.muted, fontWeight: c.done ? 600 : 500 }}>
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatchCard() {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        padding: 18,
        position: "relative",
        overflow: "hidden",
        width: 320,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 14,
          insetInlineStart: 14,
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          padding: "3px 10px",
          background: `linear-gradient(135deg, ${colors.brand.green}, ${colors.brand.greenDark})`,
          color: "#fff",
          borderRadius: radius.full,
          fontFamily: fonts.body,
          fontSize: 11,
          fontWeight: 600,
          boxShadow: "none",
        }}
      >
        <Sparkles size={11} fill="#fff" /> اقتراح ذكي
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 10 }}>
        <div style={{ position: "relative" }}>
          <img
            src="/khattaba/avatars/niqab-woman-blue.png"
            alt="ريم"
            width={80}
            height={80}
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              objectFit: "cover",
              background: colors.surface.page,
              boxShadow: `0 4px 12px rgba(0,0,0,0.10)`,
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -6,
              insetInlineEnd: -6,
              padding: "3px 9px",
              background: `linear-gradient(135deg, ${colors.brand.green}, ${colors.brand.greenDark})`,
              color: "#fff",
              borderRadius: 999,
              fontFamily: fonts.latin,
              fontSize: 12,
              fontWeight: 700,
              border: `2px solid ${colors.surface.white}`,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            92%
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.black }}>ريم</span>
            <BadgeCheck size={14} color={colors.brand.green} fill={colors.brand.greenSoft} />
          </div>
          <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 2 }}>
            30 سنة · جدة · ماجستير
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          padding: 10,
          background: colors.brand.greenSoft,
          border: `1px solid ${colors.brand.green}30`,
          borderRadius: 8,
          fontFamily: fonts.body,
          fontSize: 11,
          color: colors.ink.body,
          lineHeight: 1.6,
          display: "flex",
          gap: 6,
        }}
      >
        <Sparkles size={12} color={colors.brand.green} style={{ flexShrink: 0, marginTop: 2 }} />
        <span>
          <strong>سبب الاقتراح:</strong> توافق في المؤهل والقيم، ومدينة قريبة من تفضيلاتك.
        </span>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          style={{
            flex: 1,
            padding: "9px",
            background: "transparent",
            color: colors.ink.body,
            border: `1.5px solid ${colors.border.default}`,
            borderRadius: radius.md,
            fontFamily: fonts.body,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          تخطّي
        </button>
        <button
          style={{
            flex: 2,
            padding: "9px",
            background: colors.brand.green,
            color: "#fff",
            border: "none",
            borderRadius: radius.md,
            fontFamily: fonts.body,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            boxShadow: "none",
          }}
        >
          <Heart size={12} /> أرغب بالتواصل
        </button>
      </div>
    </div>
  );
}

function Showcase({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: 20, padding: 24 }}>
      <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.ink.body, marginBottom: 14 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

export default function MatchingSection() {
  return (
    <section id="matching" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="24"
        eyebrow="جوهر المنتج"
        title="مكونات المواءمة"
        description="ما يميّز منصة المواءمة — توافق، رحلة، مقارنة، ثقة، اقتراحات."
        accentColor={colors.brand.green}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Showcase title="Compatibility Meter · نسبة التوافق + breakdown">
          <CompatibilityMeter />
        </Showcase>

        <Showcase title="مشروع خطبة Timeline · مراحل الرحلة">
          <ProjectTimeline />
        </Showcase>

        <Showcase title="Comparison View · مقارنة بروفايلين جنب بعض">
          <ComparisonView />
        </Showcase>

        <div style={{ display: "grid", gridTemplateColumns: "auto auto 1fr", gap: 20, alignItems: "start" }}>
          <Showcase title="Trust Score Badge">
            <TrustScoreBadge />
          </Showcase>
          <Showcase title="Match Card · suggested">
            <MatchCard />
          </Showcase>
        </div>
      </div>
    </section>
  );
}
