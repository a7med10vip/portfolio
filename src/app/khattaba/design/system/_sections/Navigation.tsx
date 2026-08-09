import { Heart, Home, Search, MessageCircle, User, Wallet, BarChart3, Users, Settings, FileText, Bell, ChevronLeft, ChevronRight } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";
import { BrandWordmark } from "../../_components/screens/_marketing/deco";

function TopNavbar() {
  return (
    <div
      style={{
        height: 72,
        background: colors.surface.white,
        borderBottom: `1px solid ${colors.border.soft}`,
        padding: "0 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: radius.lg,
        border: `1px solid ${colors.border.soft}`,
        overflow: "hidden",
      }}
    >
      {/* Logo (RTL: visually right) */}
      <BrandWordmark size="md" />

      {/* Nav links */}
      <nav style={{ display: "flex", gap: 24, fontFamily: fonts.body, fontSize: 14 }}>
        {["الرئيسية", "تصفّح", "طلباتي", "الشات", "محفظتي"].map((l, i) => (
          <span
            key={l}
            style={{
              color: i === 0 ? colors.brand.green : colors.ink.body,
              fontWeight: i === 0 ? 700 : 500,
              cursor: "pointer",
              position: "relative",
              padding: "4px 0",
            }}
          >
            {l}
            {i === 0 && (
              <span
                style={{
                  position: "absolute",
                  bottom: -8,
                  insetInlineStart: "50%",
                  transform: "translateX(50%)",
                  width: 24,
                  height: 3,
                  background: colors.brand.green,
                  borderRadius: 2,
                }}
              />
            )}
          </span>
        ))}
      </nav>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          style={{
            width: 38,
            height: 38,
            borderRadius: radius.md,
            background: colors.surface.page,
            border: `1px solid ${colors.border.default}`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Bell size={16} color={colors.ink.body} />
          <span
            style={{
              position: "absolute",
              top: -3,
              left: -3,
              minWidth: 16,
              height: 16,
              padding: "0 4px",
              background: colors.accent.red,
              color: "#fff",
              borderRadius: 999,
              fontSize: 9,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 0 2px ${colors.surface.white}`,
            }}
          >
            3
          </span>
        </button>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors.accent.purple}, ${colors.accent.purple}cc)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: fonts.heading,
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          م
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  const items = [
    { icon: BarChart3, label: "لوحة التحكم", active: true },
    { icon: Users, label: "الأعضاء", badge: 28 },
    { icon: MessageCircle, label: "المحادثات" },
    { icon: Wallet, label: "المدفوعات" },
    { icon: FileText, label: "التقارير" },
    { icon: Settings, label: "الإعدادات" },
  ];
  return (
    <div
      style={{
        width: 240,
        height: 380,
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <div style={{ padding: "8px 12px 16px", borderBottom: `1px solid ${colors.border.soft}`, marginBottom: 8 }}>
        <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>
          لوحة الإدارة
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 500, color: colors.ink.muted, marginTop: 2 }}>
          إدارة المنصة
        </div>
      </div>
      {items.map(({ icon: Icon, label, active, badge }) => (
        <div
          key={label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 12px",
            borderRadius: radius.sm,
            background: active ? colors.brand.greenSoft : "transparent",
            color: active ? colors.brand.greenDark : colors.ink.body,
            fontFamily: fonts.body,
            fontSize: 13,
            fontWeight: active ? 700 : 500,
            cursor: "pointer",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <Icon size={16} />
            {label}
          </span>
          {badge && (
            <span
              style={{
                padding: "2px 7px",
                background: active ? colors.brand.green : colors.surface.page,
                color: active ? "#fff" : colors.ink.muted,
                fontFamily: fonts.latin,
                fontSize: 10,
                fontWeight: 700,
                borderRadius: 999,
              }}
            >
              {badge}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function BottomTabs() {
  const items = [
    { icon: Home, label: "الرئيسية", active: true },
    { icon: Search, label: "تصفّح" },
    { icon: Heart, label: "طلباتي", badge: 3 },
    { icon: MessageCircle, label: "الشات" },
    { icon: User, label: "حسابي" },
  ];
  return (
    <div
      style={{
        width: 390,
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderTop: `1px solid ${colors.border.default}`,
        borderRadius: radius.lg,
        padding: "10px 12px 18px",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {items.map(({ icon: Icon, label, active, badge }) => (
        <div
          key={label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            padding: "6px 12px",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <div style={{ position: "relative" }}>
            <Icon size={22} color={active ? colors.brand.green : colors.ink.muted} fill={active ? colors.brand.greenSoft : "transparent"} />
            {badge && (
              <span
                style={{
                  position: "absolute",
                  top: -4,
                  insetInlineEnd: -4,
                  minWidth: 16,
                  height: 16,
                  padding: "0 4px",
                  background: colors.accent.red,
                  color: "#fff",
                  borderRadius: 999,
                  fontSize: 9,
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {badge}
              </span>
            )}
          </div>
          <span
            style={{
              fontFamily: fonts.body,
              fontSize: 10,
              fontWeight: active ? 700 : 500,
              color: active ? colors.brand.green : colors.ink.muted,
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function Breadcrumb() {
  const parts = ["الرئيسية", "إدارة الأعضاء", "محمد الأحمدي"];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 16px",
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.md,
        fontFamily: fonts.body,
        fontSize: 13,
      }}
    >
      {parts.map((p, i) => (
        <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              color: i === parts.length - 1 ? colors.ink.black : colors.ink.muted,
              fontWeight: i === parts.length - 1 ? 700 : 500,
              cursor: i === parts.length - 1 ? "default" : "pointer",
            }}
          >
            {p}
          </span>
          {i < parts.length - 1 && <ChevronLeft size={12} color={colors.ink.soft} />}
        </span>
      ))}
    </div>
  );
}

function Stepper() {
  const steps = [
    { num: 1, label: "البيانات", state: "done" },
    { num: 2, label: "التفضيلات", state: "done" },
    { num: 3, label: "OTP", state: "active" },
    { num: 4, label: "المراجعة", state: "pending" },
  ];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "20px 28px",
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
      }}
    >
      {steps.map((s, i) => {
        const isDone = s.state === "done";
        const isActive = s.state === "active";
        const bg = isDone ? colors.brand.green : isActive ? colors.brand.green : colors.surface.page;
        const fg = isDone || isActive ? "#fff" : colors.ink.muted;
        return (
          <div key={s.num} style={{ display: "flex", alignItems: "center", flex: i === steps.length - 1 ? 0 : 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: bg,
                  color: fg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: fonts.latin,
                  fontSize: 13,
                  fontWeight: 700,
                  border: isActive ? `3px solid ${colors.brand.greenSoft}` : "none",
                  boxShadow: "none",
                }}
              >
                {isDone ? "✓" : s.num}
              </div>
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: 11,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? colors.brand.green : isDone ? colors.ink.body : colors.ink.muted,
                  whiteSpace: "nowrap",
                }}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: isDone ? colors.brand.green : colors.border.default,
                  margin: "0 8px",
                  marginTop: -22,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Tabs() {
  const tabs = ["النشطة", "المنتهية", "المرفوضة"];
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        padding: "0 8px",
        display: "flex",
        gap: 4,
      }}
    >
      {tabs.map((t, i) => (
        <div
          key={t}
          style={{
            padding: "16px 20px",
            fontFamily: fonts.body,
            fontSize: 14,
            fontWeight: i === 0 ? 700 : 500,
            color: i === 0 ? colors.brand.green : colors.ink.muted,
            borderBottom: i === 0 ? `2px solid ${colors.brand.green}` : "2px solid transparent",
            cursor: "pointer",
          }}
        >
          {t} {i === 0 && <span style={{ color: colors.ink.muted, marginInlineStart: 6, fontFamily: fonts.latin, fontSize: 11 }}>(28)</span>}
        </div>
      ))}
    </div>
  );
}

function Pagination() {
  return (
    <div style={{ display: "inline-flex", gap: 4 }}>
      <button
        style={{
          width: 36,
          height: 36,
          background: colors.surface.white,
          border: `1px solid ${colors.border.default}`,
          borderRadius: radius.sm,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <ChevronRight size={14} color={colors.ink.body} />
      </button>
      {[1, 2, 3, "...", 12].map((n, i) => (
        <button
          key={i}
          style={{
            minWidth: 36,
            height: 36,
            padding: "0 10px",
            background: n === 2 ? colors.brand.green : colors.surface.white,
            color: n === 2 ? "#fff" : colors.ink.body,
            border: `1px solid ${n === 2 ? colors.brand.green : colors.border.default}`,
            borderRadius: radius.sm,
            fontFamily: fonts.latin,
            fontSize: 13,
            fontWeight: n === 2 ? 700 : 500,
            cursor: "pointer",
          }}
        >
          {n}
        </button>
      ))}
      <button
        style={{
          width: 36,
          height: 36,
          background: colors.surface.white,
          border: `1px solid ${colors.border.default}`,
          borderRadius: radius.sm,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <ChevronLeft size={14} color={colors.ink.body} />
      </button>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.ink.body, marginBottom: 14 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

export default function NavigationSection() {
  return (
    <section id="navigation" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="11"
        eyebrow="عناصر التنقل"
        title="التنقل"
        description="ستة أنماط للتنقل، كلها مهيّأة لاتجاه RTL."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <Block title="Top Navbar · Desktop">
          <TopNavbar />
        </Block>

        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 24 }}>
          <Block title="Admin Sidebar">
            <Sidebar />
          </Block>
          <Block title="Mobile Bottom Tabs">
            <BottomTabs />
          </Block>
        </div>

        <Block title="Breadcrumb">
          <Breadcrumb />
        </Block>

        <Block title="Multi-step Stepper">
          <Stepper />
        </Block>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <Block title="Tabs">
            <Tabs />
          </Block>
          <Block title="Pagination · RTL reversed">
            <Pagination />
          </Block>
        </div>
      </div>
    </section>
  );
}
