import { colors, fonts, shadow } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

const levels: { name: string; value: string; use: string }[] = [
  { name: "L0 · None", value: shadow.none, use: "flat surfaces، الحدود فقط" },
  { name: "L1 · Subtle", value: shadow.sm, use: "Cards الافتراضية" },
  { name: "L2 · Soft",   value: shadow.md, use: "Hover states، dropdowns" },
  { name: "L3 · Strong", value: shadow.lg, use: "Modals، popovers" },
  { name: "Hero · Offset", value: shadow.hero, use: "CTAs مميزة (3D feel)" },
  { name: "Focus · Ring",  value: shadow.focus, use: "Focused inputs (accessibility)" },
];

export default function ShadowsSection() {
  return (
    <section id="shadows" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="06"
        eyebrow="مستويات الارتفاع"
        title="الظلال"
        description="6 مستويات. استخدم أقل ظل ممكن."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
      >
        {levels.map((l) => (
          <div
            key={l.name}
            style={{
              padding: 32,
              background: colors.surface.page,
              borderRadius: 16,
              border: `1px solid ${colors.border.soft}`,
            }}
          >
            <div
              style={{
                width: "100%",
                height: 120,
                background: colors.surface.white,
                borderRadius: 12,
                boxShadow: l.value === "none" ? undefined : l.value,
                border: l.value === "none" ? `1px solid ${colors.border.default}` : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: fonts.latin,
                fontSize: 12,
                fontWeight: 700,
                color: colors.ink.black,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{l.name}</div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: colors.ink.muted,
                    marginTop: 4,
                    fontFamily: fonts.body,
                  }}
                >
                  {l.use}
                </div>
              </div>
            </div>
            <div
              style={{
                fontFamily: fonts.latin,
                fontSize: 10,
                fontWeight: 600,
                color: colors.ink.muted,
                marginTop: 14,
                padding: 8,
                background: colors.surface.white,
                borderRadius: 6,
                wordBreak: "break-all",
                lineHeight: 1.5,
                border: `1px solid ${colors.border.soft}`,
              }}
            >
              {l.value === "none" ? "—" : l.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
