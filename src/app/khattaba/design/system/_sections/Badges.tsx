import { X, Check, BadgeCheck, Ban, Clock, Crown, Heart } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

function StatusBadge({ icon: Icon, label, color }: { icon: any; label: string; color: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 12px",
        background: `${color}14`,
        color,
        border: `1px solid ${color}40`,
        borderRadius: radius.full,
        fontFamily: fonts.body,
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      <Icon size={12} />
      {label}
    </span>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: color,
        display: "inline-block",
        boxShadow: "none",
      }}
    />
  );
}

function DotBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 12px",
        background: colors.surface.white,
        border: `1px solid ${colors.border.default}`,
        borderRadius: radius.full,
        fontFamily: fonts.body,
        fontSize: 12,
        fontWeight: 600,
        color: colors.ink.body,
      }}
    >
      <Dot color={color} /> {label}
    </span>
  );
}

function FilterChip({ label, removable }: { label: string; removable?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: removable ? "5px 8px 5px 12px" : "5px 12px",
        background: colors.brand.greenSoft,
        color: colors.brand.greenDark,
        border: `1px solid ${colors.brand.green}40`,
        borderRadius: radius.full,
        fontFamily: fonts.body,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {label}
      {removable && (
        <button
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: colors.brand.green,
            color: "#fff",
            border: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <X size={11} />
        </button>
      )}
    </span>
  );
}

function Tag({ label, color = colors.ink.muted }: { label: string; color?: string }) {
  return (
    <span
      style={{
        padding: "3px 10px",
        background: `${color}10`,
        color,
        borderRadius: radius.xs,
        fontFamily: fonts.body,
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      {label}
    </span>
  );
}

function NumberBadge({ count, color = colors.accent.red }: { count: number; color?: string }) {
  return (
    <span
      style={{
        minWidth: 20,
        height: 20,
        padding: "0 6px",
        background: color,
        color: "#fff",
        borderRadius: radius.full,
        fontFamily: fonts.latin,
        fontSize: 11,
        fontWeight: 700,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 0 0 2px ${colors.surface.white}`,
      }}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.ink.body, marginBottom: 14 }}>
        {title}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>{children}</div>
    </div>
  );
}

export default function BadgesSection() {
  return (
    <section id="badges" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="10"
        eyebrow="الشارات والوسوم"
        title="الشارات"
        description="حالات وتصنيفات وعدّادات صغيرة."
      />

      <div
        style={{
          background: colors.surface.white,
          border: `1px solid ${colors.border.soft}`,
          borderRadius: 20,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <Row title="Status Badges · مع أيقونة">
          <StatusBadge icon={Check} label="نشط" color={colors.brand.green} />
          <StatusBadge icon={Clock} label="بانتظار المراجعة" color={colors.accent.amber} />
          <StatusBadge icon={BadgeCheck} label="موثّق" color={colors.accent.blue} />
          <StatusBadge icon={Crown} label="Premium" color={colors.accent.purple} />
          <StatusBadge icon={Ban} label="محظور" color={colors.accent.red} />
          <StatusBadge icon={Heart} label="مقبول" color={colors.brand.green} />
        </Row>

        <Row title="Status Dots · بسيطة">
          <DotBadge label="نشط" color={colors.brand.green} />
          <DotBadge label="معلّق" color={colors.accent.amber} />
          <DotBadge label="متصل الآن" color={colors.accent.blue} />
          <DotBadge label="غير متصل" color={colors.ink.soft} />
          <DotBadge label="مبلَّغ عنه" color={colors.accent.red} />
        </Row>

        <Row title="Filter Chips · قابلة للحذف (RTL: X على اليمين)">
          <FilterChip label="الرياض" removable />
          <FilterChip label="25-35 سنة" removable />
          <FilterChip label="سعودية" removable />
          <FilterChip label="بكالوريوس" removable />
          <FilterChip label="موثّقة فقط" removable />
        </Row>

        <Row title="Tags · للتصنيف">
          <Tag label="جامعي" color={colors.accent.blue} />
          <Tag label="موظف حكومي" color={colors.accent.purple} />
          <Tag label="مقيم" color={colors.accent.amber} />
          <Tag label="حاصل على ماجستير" color={colors.brand.green} />
          <Tag label="يقبل التعدد" color={colors.ink.muted} />
        </Row>

        <Row title="Notification Badges · عدّاد">
          <div
            style={{
              position: "relative",
              width: 44,
              height: 44,
              borderRadius: 12,
              background: colors.surface.page,
              border: `1px solid ${colors.border.default}`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Heart size={20} color={colors.ink.body} />
            <span style={{ position: "absolute", top: -6, left: -6 }}>
              <NumberBadge count={3} />
            </span>
          </div>
          <div
            style={{
              position: "relative",
              width: 44,
              height: 44,
              borderRadius: 12,
              background: colors.surface.page,
              border: `1px solid ${colors.border.default}`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BadgeCheck size={20} color={colors.ink.body} />
            <span style={{ position: "absolute", top: -6, left: -6 }}>
              <NumberBadge count={12} color={colors.brand.green} />
            </span>
          </div>
          <div
            style={{
              position: "relative",
              width: 44,
              height: 44,
              borderRadius: 12,
              background: colors.surface.page,
              border: `1px solid ${colors.border.default}`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Clock size={20} color={colors.ink.body} />
            <span style={{ position: "absolute", top: -6, left: -6 }}>
              <NumberBadge count={156} color={colors.accent.amber} />
            </span>
          </div>
        </Row>
      </div>
    </section>
  );
}
