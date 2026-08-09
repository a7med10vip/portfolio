import { colors, fonts, space } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

const tokens: { token: keyof typeof space; use: string }[] = [
  { token: 1,  use: "Inline icon gaps" },
  { token: 2,  use: "Tight pill/chip padding" },
  { token: 3,  use: "Button icon→text spacing" },
  { token: 4,  use: "Default input padding" },
  { token: 5,  use: "Card inner gaps" },
  { token: 6,  use: "Card padding (small)" },
  { token: 8,  use: "Card padding (default)" },
  { token: 10, use: "Section spacing inside cards" },
  { token: 12, use: "Large card padding" },
  { token: 16, use: "Between major UI blocks" },
  { token: 20, use: "Section padding (mobile)" },
  { token: 24, use: "Section padding (desktop)" },
  { token: 28, use: "Hero section padding" },
];

export default function SpacingSection() {
  return (
    <section id="spacing" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="04"
        eyebrow="سلّم المسافات"
        title="المسافات"
        description="13 قيمة مبنية على شبكة 8 بكسل."
      />

      <div
        style={{
          background: colors.surface.white,
          border: `1px solid ${colors.border.soft}`,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 24px",
            borderBottom: `1px solid ${colors.border.soft}`,
            background: colors.surface.page,
          }}
        >
          <span
            style={{
              fontFamily: fonts.body,
              fontSize: 13,
              fontWeight: 600,
              color: colors.ink.body,
            }}
          >
            13 قيمة · شبكة 8 بكسل
          </span>
        </div>
        {tokens.map((t, i) => {
          const value = space[t.token];
          return (
            <div
              key={t.token}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 80px 1fr 220px",
                gap: 24,
                padding: "16px 24px",
                alignItems: "center",
                borderBottom: i < tokens.length - 1 ? `1px solid ${colors.border.soft}` : "none",
              }}
            >
              <div
                style={{
                  fontFamily: fonts.latin,
                  fontSize: 13,
                  fontWeight: 700,
                  color: colors.ink.black,
                }}
              >
                space.{t.token}
              </div>
              <div
                style={{
                  fontFamily: fonts.latin,
                  fontSize: 12,
                  fontWeight: 600,
                  color: colors.ink.muted,
                  padding: "4px 10px",
                  background: colors.surface.page,
                  borderRadius: 6,
                  textAlign: "center",
                }}
              >
                {value}px
              </div>
              <div style={{ display: "flex", alignItems: "center", height: 24 }}>
                <div
                  style={{
                    width: value,
                    height: 12,
                    background: colors.brand.green,
                    borderRadius: 3,
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 12,
                  color: colors.ink.muted,
                  textAlign: "left",
                }}
              >
                {t.use}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
