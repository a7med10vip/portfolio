import { Camera, BadgeCheck, Crown, User, Check } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

const AVATARS = {
  m1: { src: "/avatars/saudi-male.jpeg",    label: "رجل · بنظارة",   gender: "male"   as const },
  m2: { src: "/avatars/saudi-male-2.jpeg",  label: "رجل · بلحية",    gender: "male"   as const },
  f1: { src: "/khattaba/avatars/niqab-woman-brown.png", label: "امرأة · هادئة", gender: "female" as const },
  f2: { src: "/khattaba/avatars/niqab-woman-blue.png", label: "امرأة · مبتسمة", gender: "female" as const },
};

const sizes = [
  { px: 24, label: "xs · 24", fontSize: 10 },
  { px: 32, label: "sm · 32", fontSize: 12 },
  { px: 40, label: "md · 40", fontSize: 15 },
  { px: 48, label: "lg · 48", fontSize: 18 },
  { px: 64, label: "xl · 64", fontSize: 24 },
  { px: 96, label: "2xl · 96", fontSize: 36 },
];

const colorOptions = [
  { color: colors.brand.green, label: "م" },
  { color: colors.accent.purple, label: "ن" },
  { color: colors.accent.blue, label: "خ" },
  { color: colors.accent.amber, label: "س" },
  { color: colors.accent.red, label: "أ" },
  { color: colors.ink.body, label: "ر" },
];

function PhotoAvatar({ size, src }: { size: number; src: string }) {
  return (
    <img
      src={src}
      alt="Avatar"
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        background: colors.surface.page,
        flexShrink: 0,
        display: "block",
      }}
    />
  );
}

function InitialAvatar({ size, color, label }: { size: number; color: string; label: string }) {
  const fs = sizes.find((s) => s.px === size)?.fontSize ?? 15;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.heading,
        fontSize: fs,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {label}
    </div>
  );
}

function StatusDot({ status }: { status: "online" | "offline" | "busy" }) {
  const map = { online: colors.brand.green, offline: colors.ink.soft, busy: colors.accent.amber };
  return (
    <span
      style={{
        position: "absolute",
        bottom: 0,
        insetInlineEnd: 0,
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: map[status],
        border: `2px solid ${colors.surface.white}`,
      }}
    />
  );
}

function BadgeOverlay({ icon: Icon, color }: { icon: typeof Camera; color: string }) {
  return (
    <span
      style={{
        position: "absolute",
        bottom: -2,
        insetInlineEnd: -2,
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: color,
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: `2px solid ${colors.surface.white}`,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Icon size={11} fill="#fff" strokeWidth={2.5} />
    </span>
  );
}

function AvatarPicker() {
  const items = [
    { ...AVATARS.m1, selected: true },
    { ...AVATARS.m2, selected: false },
    { ...AVATARS.f1, selected: false },
    { ...AVATARS.f2, selected: false },
  ];
  return (
    <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
      {items.map((a) => (
        <div key={a.src} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div
            style={{
              position: "relative",
              padding: 4,
              borderRadius: "50%",
              border: a.selected ? `3px solid ${colors.brand.green}` : `3px solid transparent`,
              background: a.selected ? colors.brand.greenSoft : "transparent",
              cursor: "pointer",
            }}
          >
            <PhotoAvatar size={88} src={a.src} />
            {a.selected && (
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  insetInlineEnd: 0,
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: colors.brand.green,
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `3px solid ${colors.surface.white}`,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                <Check size={14} strokeWidth={3} />
              </span>
            )}
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.black }}>
              {a.label}
            </div>
            {a.selected && (
              <div style={{ fontFamily: fonts.body, fontSize: 10, color: colors.brand.green, marginTop: 2 }}>
                المختارة الآن
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function AvatarGroup() {
  return (
    <div style={{ display: "inline-flex" }}>
      {Object.values(AVATARS).map((a, i) => (
        <div key={a.src} style={{ marginInlineStart: i === 0 ? 0 : -12, border: `2px solid ${colors.surface.white}`, borderRadius: "50%" }}>
          <PhotoAvatar size={40} src={a.src} />
        </div>
      ))}
      <div
        style={{
          marginInlineStart: -12,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: colors.surface.page,
          color: colors.ink.body,
          border: `2px solid ${colors.surface.white}`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fonts.latin,
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        +18
      </div>
    </div>
  );
}

function IllustratedAvatar({ gender }: { gender: "male" | "female" }) {
  const bg = gender === "male" ? colors.accent.blue : colors.accent.purple;
  return (
    <div
      style={{
        width: 96,
        height: 96,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${bg}30, ${bg}10)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `2px solid ${bg}40`,
        position: "relative",
      }}
    >
      <User size={42} color={bg} strokeWidth={1.5} />
      <span
        style={{
          position: "absolute",
          bottom: 2,
          fontFamily: fonts.latin,
          fontSize: 9,
          fontWeight: 700,
          color: bg,
        }}
      >
        {gender === "male" ? "♂" : "♀"}
      </span>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: 16, padding: 20 }}>
      <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.ink.body, marginBottom: 16 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

export default function AvatarsSection() {
  return (
    <section id="avatars" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="19"
        eyebrow="الصور الرمزية"
        title="الأفاتارات"
        description="أربع صور كرتونية جاهزة (رجلان وامرأتان) يختار العضو منها. لا صور حقيقية."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card title="نمط أساسي · المختار يحدّد بصرياً">
          <AvatarPicker />
          <div
            style={{
              marginTop: 18,
              padding: 12,
              background: colors.brand.greenSoft,
              border: `1px solid ${colors.brand.green}30`,
              borderRadius: 10,
              fontFamily: fonts.body,
              fontSize: 12,
              color: colors.ink.body,
              lineHeight: 1.7,
            }}
          >
            صور كرتونية بأسلوب Memoji — العضو يختار الصورة الأقرب لشخصيته أثناء التسجيل، ويمكنه تغييرها لاحقاً من ملفه.
          </div>
        </Card>

        <Card title="الأحجام الستة">
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            {sizes.map((s) => (
              <div key={s.px} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <PhotoAvatar size={s.px} src={AVATARS.m1.src} />
                <span style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 600, color: colors.ink.muted }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="بديل · حروف ملوّنة (لو رفض العضو اختيار صورة)">
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {colorOptions.map((o) => (
              <InitialAvatar key={o.color} size={64} color={o.color} label={o.label} />
            ))}
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card title="مع مؤشّر الحضور">
            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
              {[
                { status: "online" as const, label: "متصل",     src: AVATARS.m1.src },
                { status: "busy" as const,   label: "مشغول",     src: AVATARS.f1.src },
                { status: "offline" as const, label: "غير متصل", src: AVATARS.m2.src },
              ].map((s) => (
                <div key={s.status} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ position: "relative" }}>
                    <PhotoAvatar size={64} src={s.src} />
                    <StatusDot status={s.status} />
                  </div>
                  <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>{s.label}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="مع شارة جانبية">
            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ position: "relative" }}>
                  <PhotoAvatar size={64} src={AVATARS.f2.src} />
                  <BadgeOverlay icon={BadgeCheck} color={colors.accent.blue} />
                </div>
                <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>موثّق</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ position: "relative" }}>
                  <PhotoAvatar size={64} src={AVATARS.m2.src} />
                  <BadgeOverlay icon={Crown} color={colors.accent.amber} />
                </div>
                <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>مميّز</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ position: "relative" }}>
                  <PhotoAvatar size={64} src={AVATARS.f1.src} />
                  <BadgeOverlay icon={Camera} color={colors.ink.body} />
                </div>
                <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>صور موثّقة</span>
              </div>
            </div>
          </Card>
        </div>

        <Card title="مجموعة أفاتارات مكدّسة">
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <AvatarGroup />
            <div>
              <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.ink.black }}>
                22 عضواً نشطون الآن
              </div>
              <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, marginTop: 2 }}>
                من نفس مدينتك تقريباً
              </div>
            </div>
          </div>
        </Card>

        <Card title="بديل ثالث · أيقونة محايدة بدون هوية">
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <IllustratedAvatar gender="male" />
            <IllustratedAvatar gender="female" />
            <div style={{ flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.ink.muted, lineHeight: 1.7 }}>
              تظهر قبل قبول التواصل — لإخفاء أي تفاصيل بصرية حتى الموافقة المتبادلة.
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
