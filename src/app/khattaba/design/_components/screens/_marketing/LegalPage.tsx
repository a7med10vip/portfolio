import { AlertTriangle } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, space } from "../../tokens";
import { MarketingPage, PageHero, wrap } from "./Shell";

/* Shared template for legal pages (P12 الخصوصية · P13 الشروط · P14 الاستخدام).
 * نص الأقسام وصفي ومبدئي — تُعتمد الصياغة القانونية النهائية من الجهة المختصة. */

export type LegalSection = { heading: string; body: string[] };

function Notice() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "16px 20px",
        background: colors.accent.amberSoft,
        border: `1px solid ${colors.accent.amber}55`,
        borderRadius: radius.md,
        marginBottom: space[10],
      }}
    >
      <AlertTriangle size={18} color={colors.accent.amber} style={{ flexShrink: 0, marginTop: 2 }} />
      <p style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 1.7, color: colors.ink.body, margin: 0 }}>
        النص أدناه نموذجي لأغراض التصميم فقط — تُعتمد الصياغة القانونية النهائية من الجهة المختصة قبل النشر.
      </p>
    </div>
  );
}

export function LegalPage({
  active,
  eyebrow,
  title,
  lastUpdated,
  sections,
}: {
  active?: "home" | "about" | "how" | "faq" | "contact" | null;
  eyebrow: string;
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}) {
  return (
    <MarketingPage active={active ?? null}>
      <PageHero eyebrow={eyebrow} title={title} subtitle={`آخر تحديث: ${lastUpdated}`} />

      <section style={{ background: colors.surface.white, padding: `${space[16]}px 0 ${space[20]}px` }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: "1fr 260px", gap: 48, alignItems: "start" }}>
          {/* Content */}
          <div>
            <Notice />
            <div style={{ display: "flex", flexDirection: "column", gap: space[10] }}>
              {sections.map((s, i) => (
                <div key={s.heading}>
                  <h2 style={{ fontFamily: fonts.heading, fontSize: 24, fontWeight: 700, color: colors.ink.black, margin: "0 0 14px", display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{ fontFamily: fonts.latin, fontSize: 16, fontWeight: 700, color: colors.brand.green }}>{i + 1}.</span>
                    {s.heading}
                  </h2>
                  {s.body.map((p, j) => (
                    <p key={j} style={{ fontFamily: fonts.body, fontSize: 15, lineHeight: 2, color: colors.ink.muted, margin: "0 0 12px" }}>{p}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* TOC */}
          <aside
            style={{
              background: colors.surface.page,
              border: `1px solid ${colors.border.soft}`,
              borderRadius: radius.lg,
              padding: 20,
            }}
          >
            <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black, marginBottom: 14 }}>محتويات الصفحة</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {sections.map((s, i) => (
                <span
                  key={s.heading}
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 13,
                    fontWeight: i === 0 ? 700 : 500,
                    color: i === 0 ? colors.brand.green : colors.ink.muted,
                    padding: "8px 10px",
                    borderRadius: radius.sm,
                    background: i === 0 ? colors.brand.greenSoft : "transparent",
                    cursor: "pointer",
                    display: "flex",
                    gap: 8,
                  }}
                >
                  <span style={{ fontFamily: fonts.latin, opacity: 0.6 }}>{i + 1}.</span>
                  {s.heading}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </MarketingPage>
  );
}
