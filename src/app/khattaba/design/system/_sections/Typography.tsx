import { colors, fonts, productFonts } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

type Family = {
  cssVar: string;
  display: string;
  use: string;
  weights: { label: string; weight: number }[];
  sample: string;
};

const families: Family[] = [
  {
    cssVar: productFonts.identityArabic,
    display: "IBM Plex Sans Arabic",
    use: "خط الهوية العربية للمنتج · كل النصوص العربية في المنصة",
    weights: [
      { label: "Light", weight: 300 },
      { label: "Regular", weight: 400 },
      { label: "Medium", weight: 500 },
      { label: "SemiBold", weight: 600 },
      { label: "Bold", weight: 700 },
    ],
    sample: "منصة موثوقة · مراقبة · شرعية",
  },
  {
    cssVar: productFonts.identityLatin,
    display: "Poppins",
    use: "للأرقام والنصوص الإنجليزية داخل المنصة",
    weights: [
      { label: "Regular", weight: 400 },
      { label: "Medium", weight: 500 },
      { label: "SemiBold", weight: 600 },
      { label: "Bold", weight: 700 },
    ],
    sample: "KH1 — KSA · 2026",
  },
];

type ScaleRow = {
  name: string;
  px: number;
  lh: number;
  family: string;
  weight: number;
  use: string;
};

const scale: ScaleRow[] = [
  { name: "Display",  px: 72, lh: 1.2,  family: productFonts.identityArabic, weight: 700, use: "للـ Hero فقط" },
  { name: "H1",       px: 48, lh: 1.25, family: productFonts.identityArabic, weight: 700, use: "عناوين الصفحات" },
  { name: "H2",       px: 36, lh: 1.3,  family: productFonts.identityArabic, weight: 700, use: "عناوين الأقسام" },
  { name: "H3",       px: 24, lh: 1.4,  family: productFonts.identityArabic, weight: 600, use: "عناوين فرعية" },
  { name: "H4",       px: 20, lh: 1.4,  family: productFonts.identityArabic, weight: 600, use: "عناوين فرعية صغيرة" },
  { name: "Body L",   px: 17, lh: 1.7,  family: productFonts.identityArabic, weight: 400, use: "فقرات تعريفية" },
  { name: "Body",     px: 15, lh: 1.7,  family: productFonts.identityArabic, weight: 400, use: "النصوص الافتراضية" },
  { name: "Body S",   px: 13, lh: 1.6,  family: productFonts.identityArabic, weight: 400, use: "ملاحظات وشروحات" },
  { name: "Caption",  px: 11, lh: 1.5,  family: productFonts.identityArabic, weight: 500, use: "تسميات وملصقات" },
  { name: "Micro",    px: 10, lh: 1.4,  family: productFonts.identityArabic, weight: 600, use: "أرقام صغيرة" },
];

export default function TypographySection() {
  return (
    <section id="typography" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="03"
        eyebrow="نظام الخطوط"
        title="الخطوط"
        description="خطّان فقط للمنتج: IBM Plex Sans Arabic للعربية، Poppins للإنجليزية والأرقام."
      />

      {/* Font families showcase */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
        {families.map((f) => (
          <div
            key={f.display}
            style={{
              background: colors.surface.white,
              border: `1px solid ${colors.border.soft}`,
              borderRadius: 20,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 13,
                    fontWeight: 600,
                    color: colors.brand.green,
                  }}
                >
                  {f.display}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 12,
                    color: colors.ink.muted,
                    marginTop: 4,
                    lineHeight: 1.6,
                  }}
                >
                  {f.use}
                </div>
              </div>
              <span
                style={{
                  fontFamily: fonts.latin,
                  fontSize: 64,
                  fontWeight: 700,
                  color: colors.ink.black,
                  lineHeight: 1,
                  fontStyle: "normal",
                }}
              >
                Aa
              </span>
            </div>

            <div
              style={{
                fontFamily: f.cssVar,
                fontSize: 28,
                fontWeight: 500,
                color: colors.ink.black,
                lineHeight: 1.4,
                padding: "12px 0",
                borderTop: `1px solid ${colors.border.soft}`,
                borderBottom: `1px solid ${colors.border.soft}`,
              }}
            >
              {f.sample}
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {f.weights.map((w) => (
                <div key={w.label}>
                  <div
                    style={{
                      fontFamily: f.cssVar,
                      fontWeight: w.weight,
                      fontSize: 20,
                      color: colors.ink.body,
                    }}
                  >
                    Aa
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.latin,
                      fontSize: 11,
                      fontWeight: 500,
                      color: colors.ink.muted,
                      marginTop: 2,
                    }}
                  >
                    {w.label} · {w.weight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Type scale */}
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
            سلّم المقاسات · 10 أحجام
          </span>
        </div>
        <div>
          {scale.map((row, i) => (
            <div
              key={row.name}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 80px 1fr 200px",
                gap: 24,
                padding: "20px 24px",
                alignItems: "center",
                borderBottom: i < scale.length - 1 ? `1px solid ${colors.border.soft}` : "none",
              }}
            >
              <div>
                <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>
                  {row.name}
                </div>
                <div
                  style={{
                    fontFamily: fonts.latin,
                    fontSize: 11,
                    fontWeight: 500,
                    color: colors.ink.muted,
                    marginTop: 2,
                  }}
                >
                  {row.px}/{row.lh}
                </div>
              </div>
              <div
                style={{
                  fontFamily: fonts.latin,
                  fontSize: 11,
                  fontWeight: 600,
                  color: colors.ink.muted,
                  padding: "3px 8px",
                  background: colors.surface.page,
                  borderRadius: 6,
                  textAlign: "center",
                }}
              >
                {row.weight}
              </div>
              <div
                style={{
                  fontFamily: row.family,
                  fontSize: row.px,
                  fontWeight: row.weight,
                  color: colors.ink.black,
                  lineHeight: row.lh,
                }}
              >
                أبجد هوز حطي كلمن
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 12,
                  color: colors.ink.muted,
                  lineHeight: 1.5,
                }}
              >
                {row.use}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arabic-specific rules */}
      <div
        style={{
          marginTop: 28,
          background: colors.brand.greenSoft,
          border: `1px solid ${colors.brand.green}40`,
          borderRadius: 16,
          padding: 20,
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
        }}
      >
        <span style={{ fontSize: 22 }}>🇸🇦</span>
        <div>
          <div
            style={{
              fontFamily: fonts.heading,
              fontSize: 15,
              fontWeight: 700,
              color: colors.ink.black,
              marginBottom: 6,
            }}
          >
            قواعد عربية أساسية
          </div>
          <ul
            style={{
              margin: 0,
              paddingInlineStart: 18,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              fontFamily: fonts.body,
              fontSize: 13,
              color: colors.ink.body,
              lineHeight: 1.7,
            }}
          >
            <li>line-height عربي = 1.6 على الأقل (الحروف العربية أطول من اللاتينية)</li>
            <li><code>letter-spacing: 0</code> دائماً — العربية لا تستفيد من الـ tracking</li>
            <li>تفعيل ligatures عربية: <code>font-feature-settings: &quot;rlig&quot; 1, &quot;calt&quot; 1</code></li>
            <li>الأرقام دائماً بـ Inter (ليست عربية الشكل)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
