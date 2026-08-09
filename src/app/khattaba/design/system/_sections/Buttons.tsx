import { Heart, Send, Loader2, ArrowLeft, Trash2, Plus } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

type BtnSize = "sm" | "md" | "lg";

const sizeMap: Record<BtnSize, { h: number; px: number; fs: number; gap: number; icon: number }> = {
  sm: { h: 36, px: 16, fs: 13, gap: 6, icon: 14 },
  md: { h: 44, px: 22, fs: 14, gap: 8, icon: 16 },
  lg: { h: 52, px: 28, fs: 16, gap: 10, icon: 18 },
};

function baseBtn(size: BtnSize): React.CSSProperties {
  const s = sizeMap[size];
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    height: s.h,
    padding: `0 ${s.px}px`,
    fontFamily: fonts.body,
    fontSize: s.fs,
    fontWeight: 700,
    borderRadius: radius.md,
    border: "none",
    cursor: "pointer",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
  };
}

type BtnProps = { size?: BtnSize; label: string; icon?: React.ReactNode; disabled?: boolean; loading?: boolean };

const Primary = ({ size = "md", label, icon, disabled, loading }: BtnProps) => (
  <button
    style={{
      ...baseBtn(size),
      background: disabled ? colors.border.strong : colors.brand.green,
      color: "#fff",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
      boxShadow: "none",
    }}
  >
    {loading ? (
      <Loader2 size={sizeMap[size].icon} style={{ animation: "spin 1s linear infinite" }} />
    ) : (
      icon
    )}
    {label}
  </button>
);

const Secondary = ({ size = "md", label, icon }: BtnProps) => (
  <button
    style={{
      ...baseBtn(size),
      background: "transparent",
      color: colors.brand.green,
      border: `1.5px solid ${colors.brand.green}`,
    }}
  >
    {icon}
    {label}
  </button>
);

const Tertiary = ({ size = "md", label, icon }: BtnProps) => (
  <button
    style={{
      ...baseBtn(size),
      background: "transparent",
      color: colors.ink.body,
    }}
  >
    {icon}
    {label}
  </button>
);

const Destructive = ({ size = "md", label, icon }: BtnProps) => (
  <button
    style={{
      ...baseBtn(size),
      background: colors.accent.red,
      color: "#fff",
      boxShadow: "none",
    }}
  >
    {icon}
    {label}
  </button>
);

const IconOnly = ({ size = 40, icon, variant = "primary" }: { size?: number; icon: React.ReactNode; variant?: "primary" | "ghost" | "destructive" }) => {
  const bg = variant === "primary" ? colors.brand.green : variant === "ghost" ? colors.surface.page : colors.accent.red;
  const col = variant === "ghost" ? colors.ink.body : "#fff";
  return (
    <button
      style={{
        width: size,
        height: size,
        background: bg,
        color: col,
        border: variant === "ghost" ? `1px solid ${colors.border.default}` : "none",
        borderRadius: radius.md,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {icon}
    </button>
  );
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gap: 24,
        padding: "20px 24px",
        alignItems: "center",
        borderBottom: `1px solid ${colors.border.soft}`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.heading,
          fontSize: 14,
          fontWeight: 700,
          color: colors.ink.black,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>{children}</div>
    </div>
  );
}

export default function ButtonsSection() {
  return (
    <section id="buttons" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="07"
        eyebrow="أزرار التفاعل"
        title="الأزرار"
        description="أربع أنواع × ثلاثة أحجام. زر أساسي واحد فقط لكل شاشة."
      />

      <div
        style={{
          background: colors.surface.white,
          border: `1px solid ${colors.border.soft}`,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <Row label="Primary · 3 sizes">
          <Primary size="sm" label="حفظ" />
          <Primary size="md" label="أرغب في التواصل" icon={<Heart size={16} />} />
          <Primary size="lg" label="سجّل الآن" icon={<Send size={18} />} />
        </Row>

        <Row label="Secondary · Outlined">
          <Secondary size="md" label="إلغاء" />
          <Secondary size="md" label="عرض التفاصيل" icon={<ArrowLeft size={16} />} />
          <Secondary size="lg" label="استئناف لاحقاً" />
        </Row>

        <Row label="Tertiary · Ghost">
          <Tertiary size="md" label="تخطّي" />
          <Tertiary size="md" label="رجوع" icon={<ArrowLeft size={16} />} />
        </Row>

        <Row label="Destructive">
          <Destructive size="md" label="حذف الحساب" icon={<Trash2 size={16} />} />
          <Destructive size="sm" label="حظر" />
        </Row>

        <Row label="States">
          <Primary size="md" label="جاهز" />
          <Primary size="md" label="جاري الحفظ..." loading />
          <Primary size="md" label="معطل" disabled />
        </Row>

        <Row label="Icon-only · 3 sizes">
          <IconOnly size={36} icon={<Plus size={16} />} variant="primary" />
          <IconOnly size={40} icon={<Heart size={18} />} variant="primary" />
          <IconOnly size={48} icon={<Send size={20} />} variant="primary" />
          <IconOnly size={40} icon={<ArrowLeft size={18} />} variant="ghost" />
          <IconOnly size={40} icon={<Trash2 size={18} />} variant="destructive" />
        </Row>

        <div style={{ padding: "20px 24px" }}>
          <Row label="Full-width">
            <button
              style={{
                ...baseBtn("lg"),
                width: "100%",
                background: colors.brand.green,
                color: "#fff",
              }}
            >
              <Send size={18} /> أرسل الطلب للإدارة
            </button>
          </Row>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
