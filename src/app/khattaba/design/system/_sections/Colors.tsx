import { colors, fonts, palette, type PaletteName, type PaletteShade } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

type Row = {
  name: PaletteName;
  label: string;
  description: string;
  semantic: string;
};

const rows: Row[] = [
  { name: "purple", label: "الأساسي · وردي",  description: "هوية العلامة (الدرجة 400 = ‎#F258B4‎) — للأزرار والعناوين واللمسات البطولية. الدرجات الغامقة 700–900 للنصوص.", semantic: "علامة" },
  { name: "green",  label: "الثانوي · أخضر",  description: "اللون الثانوي (الدرجة 500 = ‎#29A631‎) — للحالات الإيجابية واللمسات والـ accents.", semantic: "إجراء" },
  { name: "blue",   label: "معلوماتي",  description: "للمعلومات والروابط الثانوية والحالات الجارية.", semantic: "معلومة" },
  { name: "amber",  label: "تنبيه",     description: "للحالات المعلقة (طلب بانتظار المراجعة).", semantic: "بانتظار" },
  { name: "red",    label: "خطأ",       description: "للأخطاء والحظر والإبلاغ والرفض.", semantic: "حرج" },
  { name: "gray",   label: "محايد",     description: "للنصوص الثانوية والحدود والخلفيات الخفيفة.", semantic: "محايد" },
];

const shades: PaletteShade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function isLight(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

export default function ColorsSection() {
  return (
    <section id="colors" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="02"
        eyebrow="نظام الألوان"
        title="الألوان"
        description="الوردي ‎#F258B4‎ هو هوية العلامة الأساسية، والأخضر ‎#29A631‎ لونها الثانوي للّمسات والحالات الإيجابية — مع درجات كاملة لكلٍّ منهما."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {rows.map((row) => {
          const base = palette[row.name][500];
          return (
            <div
              key={row.name}
              style={{
                background: colors.surface.white,
                border: `1px solid ${colors.border.soft}`,
                borderRadius: 20,
                padding: 24,
                display: "grid",
                gridTemplateColumns: "240px 1fr",
                gap: 24,
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: base,
                      border: `1px solid ${colors.border.soft}`,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: fonts.heading,
                        fontSize: 18,
                        fontWeight: 700,
                        color: colors.ink.black,
                      }}
                    >
                      {row.label}
                    </div>
                    <div
                      style={{
                        fontFamily: fonts.body,
                        fontSize: 11,
                        fontWeight: 500,
                        color: colors.ink.muted,
                      }}
                    >
                      {row.semantic}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 12,
                    color: colors.ink.muted,
                    lineHeight: 1.6,
                  }}
                >
                  {row.description}
                </div>
                <div
                  style={{
                    fontFamily: fonts.latin,
                    fontSize: 11,
                    fontWeight: 600,
                    color: colors.ink.body,
                    marginTop: 10,
                    padding: "4px 8px",
                    background: colors.surface.page,
                    borderRadius: 6,
                    display: "inline-block",
                  }}
                >
                  Base: {base}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(10, 1fr)",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: `1px solid ${colors.border.soft}`,
                }}
              >
                {shades.map((shade) => {
                  const hex = palette[row.name][shade];
                  const textColor = isLight(hex) ? "#0A0A0A" : "#fff";
                  const isBase = shade === 500;
                  return (
                    <div
                      key={shade}
                      style={{
                        background: hex,
                        padding: "16px 8px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                        position: "relative",
                        minHeight: 78,
                      }}
                    >
                      {isBase && (
                        <span
                          style={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            fontSize: 9,
                            fontWeight: 700,
                            color: textColor,
                            background: `${textColor}22`,
                            padding: "1px 5px",
                            borderRadius: 4,
                          }}
                        >
                          ●
                        </span>
                      )}
                      <div
                        style={{
                          fontFamily: fonts.latin,
                          fontSize: 12,
                          fontWeight: 700,
                          color: textColor,
                        }}
                      >
                        {shade}
                      </div>
                      <div
                        style={{
                          fontFamily: fonts.latin,
                          fontSize: 9,
                          fontWeight: 500,
                          color: textColor,
                          opacity: 0.7,
                        }}
                      >
                        {hex.replace("#", "")}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Usage rules */}
      <div
        style={{
          marginTop: 32,
          background: colors.surface.white,
          border: `1px solid ${colors.border.soft}`,
          borderRadius: 20,
          padding: 24,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}
      >
        <UsageBlock
          color={colors.brand.green}
          title="قواعد الاستخدام · ✅"
          items={[
            "الوردي الأساسي للـ CTAs الرئيسية فقط — زر واحد لكل شاشة",
            "الأخضر الثانوي للحالات الإيجابية (قبول/نجاح/دفع ناجح)",
            "خلفية الصفحات بيضاء أو رمادية فاتحة (gray-50)",
            "النصوص العادية بـ ink-black (#0A0A0A)، الثانوية بـ gray-500",
            "الحدود بـ gray-200 (1.5px)",
            "Tints بنسبة 10-18% للخلفيات الملونة",
          ]}
        />
        <UsageBlock
          color={colors.accent.red}
          title="ممنوع · ❌"
          items={[
            "Gradients على خلفيات الصفحات",
            "خلفيات داكنة كاملة (cinematic feel)",
            "أكثر من زر بلون primary في الـ viewport الواحد",
            "خلط ألوان accent متعددة في نفس البطاقة",
            "استخدام shade 500 للـ backgrounds الكبيرة",
            "صور حقيقية للأشخاص في أي مكان",
          ]}
        />
      </div>
    </section>
  );
}

function UsageBlock({ color, title, items }: { color: string; title: string; items: string[] }) {
  return (
    <div>
      <h3
        style={{
          fontFamily: fonts.heading,
          fontSize: 15,
          fontWeight: 700,
          color,
          margin: 0,
          marginBottom: 12,
        }}
      >
        {title}
      </h3>
      <ul style={{ margin: 0, paddingInlineStart: 18, display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item) => (
          <li
            key={item}
            style={{
              fontFamily: fonts.body,
              fontSize: 13,
              color: colors.ink.body,
              lineHeight: 1.6,
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
