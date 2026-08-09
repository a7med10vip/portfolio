import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

const tokens: { token: keyof typeof radius; use: string }[] = [
  { token: "xs",   use: "Badges, chips, tags صغيرة" },
  { token: "sm",   use: "Inputs صغيرة، code blocks" },
  { token: "md",   use: "الأزرار، الـ inputs الافتراضية" },
  { token: "lg",   use: "Cards، modals، containers" },
  { token: "xl",   use: "Hero cards، feature blocks" },
  { token: "2xl",  use: "Phone chrome، large containers" },
  { token: "full", use: "Avatars، pills، OTP boxes (دائري)" },
];

export default function RadiusSection() {
  return (
    <section id="radius" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="05"
        eyebrow="نظام الانحناءات"
        title="الانحناءات"
        description="7 مستويات من 6 بكسل إلى دائري كامل."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 16,
        }}
      >
        {tokens.map((t) => {
          const r = radius[t.token];
          const displayR = r === 9999 ? "∞" : `${r}px`;
          return (
            <div
              key={t.token}
              style={{
                background: colors.surface.white,
                border: `1px solid ${colors.border.soft}`,
                borderRadius: 16,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: r,
                  background: colors.brand.green,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: fonts.latin,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                {displayR}
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: fonts.latin,
                    fontSize: 12,
                    fontWeight: 700,
                    color: colors.ink.black,
                  }}
                >
                  {t.token}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 11,
                    color: colors.ink.muted,
                    marginTop: 4,
                    lineHeight: 1.4,
                  }}
                >
                  {t.use}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
