import { ChevronDown, Info, X, Filter, Check } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

function Showcase({ title, children, cols = 1 }: { title: string; children: React.ReactNode; cols?: number }) {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: 20,
        padding: 24,
      }}
    >
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 13,
          fontWeight: 600,
          color: colors.ink.body,
          marginBottom: 14,
        }}
      >
        {title}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 20 }}>{children}</div>
    </div>
  );
}

function AccordionItem({ question, answer, open }: { question: string; answer?: string; open?: boolean }) {
  return (
    <div
      style={{
        border: `1px solid ${open ? colors.brand.green : colors.border.soft}`,
        borderRadius: radius.md,
        background: open ? colors.brand.greenTint : colors.surface.white,
        overflow: "hidden",
      }}
    >
      <button
        style={{
          width: "100%",
          padding: "16px 18px",
          background: "transparent",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          fontFamily: fonts.heading,
          fontSize: 14,
          fontWeight: 700,
          color: colors.ink.black,
          textAlign: "start",
        }}
      >
        <span>{question}</span>
        <ChevronDown
          size={16}
          color={open ? colors.brand.green : colors.ink.muted}
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        />
      </button>
      {open && answer && (
        <div
          style={{
            padding: "0 18px 16px",
            fontFamily: fonts.body,
            fontSize: 13,
            color: colors.ink.body,
            lineHeight: 1.8,
            borderTop: `1px solid ${colors.brand.green}30`,
            paddingTop: 14,
            marginTop: 4,
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}

function Tooltip({ side, label }: { side: "top" | "bottom" | "right" | "left"; label: string }) {
  const offset = 10;
  const tooltipStyle: React.CSSProperties = {
    position: "absolute",
    background: colors.ink.black,
    color: "#fff",
    padding: "5px 10px",
    borderRadius: 6,
    fontFamily: fonts.body,
    fontSize: 11,
    fontWeight: 600,
    whiteSpace: "nowrap",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 1,
  };
  const positions: Record<typeof side, React.CSSProperties> = {
    top:    { ...tooltipStyle, bottom: `calc(100% + ${offset}px)`, left: "50%", transform: "translateX(-50%)" },
    bottom: { ...tooltipStyle, top:    `calc(100% + ${offset}px)`, left: "50%", transform: "translateX(-50%)" },
    right:  { ...tooltipStyle, top: "50%", transform: "translateY(-50%)", left: `calc(100% + ${offset}px)` },
    left:   { ...tooltipStyle, top: "50%", transform: "translateY(-50%)", right: `calc(100% + ${offset}px)` },
  };
  return (
    <div style={{ position: "relative", display: "inline-block", margin: "32px 56px" }}>
      <button
        style={{
          width: 40,
          height: 40,
          background: colors.surface.white,
          border: `1px solid ${colors.border.default}`,
          borderRadius: 10,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: colors.ink.body,
        }}
      >
        <Info size={18} />
      </button>
      <div style={positions[side]}>
        {label}
        <Arrow side={side} />
      </div>
    </div>
  );
}

function Arrow({ side }: { side: "top" | "bottom" | "right" | "left" }) {
  const arrow: React.CSSProperties = {
    position: "absolute",
    width: 0,
    height: 0,
    border: "5px solid transparent",
  };
  if (side === "top")    return <div style={{ ...arrow, top: "100%", left: "50%", transform: "translateX(-50%)", borderTopColor: colors.ink.black }} />;
  if (side === "bottom") return <div style={{ ...arrow, bottom: "100%", left: "50%", transform: "translateX(-50%)", borderBottomColor: colors.ink.black }} />;
  if (side === "right")  return <div style={{ ...arrow, top: "50%", right: "100%", transform: "translateY(-50%)", borderRightColor: colors.ink.black }} />;
  return                       <div style={{ ...arrow, top: "50%", left: "100%", transform: "translateY(-50%)", borderLeftColor: colors.ink.black }} />;
}

function MobileDrawer() {
  return (
    <div
      style={{
        position: "relative",
        background: "rgba(10,10,10,0.55)",
        borderRadius: radius.lg,
        height: 540,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          background: colors.surface.white,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: 20,
          paddingBottom: 28,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {/* Drag handle */}
        <div
          style={{
            width: 40,
            height: 4,
            background: colors.border.strong,
            borderRadius: 2,
            margin: "0 auto",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.black, margin: 0 }}>
            الفلاتر
          </h3>
          <button
            style={{
              width: 32,
              height: 32,
              background: colors.surface.page,
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              color: colors.ink.body,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div>
          <div style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body, marginBottom: 8 }}>
            المدينة
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["الرياض", "جدة", "الدمام", "مكة"].map((c, i) => (
              <span
                key={c}
                style={{
                  padding: "5px 12px",
                  background: i === 0 ? colors.brand.green : colors.surface.page,
                  color: i === 0 ? "#fff" : colors.ink.body,
                  border: i === 0 ? "none" : `1px solid ${colors.border.default}`,
                  borderRadius: radius.full,
                  fontFamily: fonts.body,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body }}>
              العمر
            </span>
            <span style={{ fontFamily: fonts.latin, fontSize: 12, fontWeight: 700, color: colors.brand.green }}>
              22 - 35
            </span>
          </div>
          <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
            <div style={{ position: "absolute", left: 0, right: 0, height: 5, background: colors.border.default, borderRadius: 3 }} />
            <div style={{ position: "absolute", left: "10%", right: "30%", height: 5, background: colors.brand.green, borderRadius: 3 }} />
            <div style={{ position: "absolute", left: "10%", width: 18, height: 18, borderRadius: "50%", background: "#fff", border: `3px solid ${colors.brand.green}`, transform: "translateX(-50%)" }} />
            <div style={{ position: "absolute", left: "70%", width: 18, height: 18, borderRadius: "50%", background: "#fff", border: `3px solid ${colors.brand.green}`, transform: "translateX(-50%)" }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            style={{
              flex: 1,
              padding: "14px 0",
              background: "transparent",
              color: colors.ink.body,
              border: `1.5px solid ${colors.border.default}`,
              borderRadius: radius.md,
              fontFamily: fonts.body,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            مسح
          </button>
          <button
            style={{
              flex: 2,
              padding: "14px 0",
              background: colors.brand.green,
              color: "#fff",
              border: "none",
              borderRadius: radius.md,
              fontFamily: fonts.body,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "none",
            }}
          >
            تطبيق (3)
          </button>
        </div>
      </div>
    </div>
  );
}

function SidePanel() {
  return (
    <div
      style={{
        position: "relative",
        background: "rgba(10,10,10,0.55)",
        borderRadius: radius.lg,
        height: 380,
        overflow: "hidden",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          background: colors.surface.white,
          width: 280,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxShadow: "8px 0 24px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black }}>
            <Filter size={16} color={colors.brand.green} />
            تصفية متقدمة
          </span>
          <button
            style={{
              width: 28,
              height: 28,
              background: colors.surface.page,
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              color: colors.ink.muted,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={14} />
          </button>
        </div>

        {[
          { label: "موثّق فقط", on: true },
          { label: "مع صورة هوية", on: false },
          { label: "نشط آخر 7 أيام", on: true },
        ].map((o) => (
          <label key={o.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.body }}>{o.label}</span>
            <span
              style={{
                width: 40,
                height: 22,
                borderRadius: 999,
                background: o.on ? colors.brand.green : colors.border.strong,
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: o.on ? 2 : 20,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                }}
              />
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

const sampleFaq = [
  {
    q: "هل المنصة معتمدة من الجهات الرسمية؟",
    a: "نعم، شركة خطابة السعودية الأولى للتجارة (ذ.م.م) مسجلة رسمياً بسجل تجاري رقم 1010158509، ونلتزم بأنظمة المملكة العربية السعودية بما فيها نظام حماية البيانات الشخصية (PDPL).",
    open: true,
  },
  { q: "كم تبلغ رسوم الاشتراك في المنصة؟", open: false },
  { q: "هل يمكنني استرداد المبلغ في حال عدم الاتفاق؟", open: false },
  { q: "كيف يتم التحقق من بيانات الأعضاء؟", open: false },
];

export default function OverlaysSection() {
  return (
    <section id="overlays" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="18"
        eyebrow="الطبقات والتفاعلات"
        title="التفاعلات والـ Overlays"
        description="Accordion، Tooltip، Bottom Drawer، و Side Panel."
        accentColor={colors.accent.blue}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Showcase title="Accordion · FAQ pattern">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {sampleFaq.map((f, i) => (
              <AccordionItem key={i} question={f.q} answer={f.a} open={f.open} />
            ))}
          </div>
        </Showcase>

        <Showcase title="Tooltip · 4 positions">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
              placeItems: "center",
              padding: 20,
              background: colors.surface.page,
              borderRadius: radius.md,
            }}
          >
            <Tooltip side="top" label="تلميح أعلى" />
            <Tooltip side="bottom" label="تلميح أسفل" />
            <Tooltip side="right" label="تلميح يمين" />
            <Tooltip side="left" label="تلميح يسار" />
          </div>
        </Showcase>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Showcase title="Bottom Drawer · Mobile filters">
            <MobileDrawer />
          </Showcase>
          <Showcase title="Side Panel · Desktop tools">
            <SidePanel />
          </Showcase>
        </div>
      </div>
    </section>
  );
}
