import { Heart, ShieldCheck, Lock, Sparkles } from "@/app/khattaba/design/_components/icons";
import { colors, fonts } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

const attributes = [
  { icon: Heart,        label: "إنسانية",  desc: "نخدم رحلة شخصية حساسة — الزواج", color: colors.accent.red },
  { icon: ShieldCheck,  label: "موثوقية",  desc: "كل قرار تصميمي يعزّز ثقة المستخدم", color: colors.brand.green },
  { icon: Lock,         label: "خصوصية",   desc: "بدون صور حقيقية · بيانات محمية",     color: colors.accent.blue },
  { icon: Sparkles,     label: "احترافية", desc: "مظهر يليق بالأولى من نوعها",        color: colors.brand.purple },
];

export default function BrandSection() {
  return (
    <section id="brand" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="01"
        eyebrow="هوية العلامة"
        title="الهوية"
        description="الأركان الأربعة التي توجّه كل قرار تصميمي في المنصة."
      />

      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            background: colors.brand.purple,
            borderRadius: 20,
            padding: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 320,
            border: `1px solid ${colors.border.soft}`,
          }}
        >
          <img
            src="/brand/khattaba-logo-white.png"
            alt="خطابة السعودية الأولى"
            style={{ width: 240, height: 240, objectFit: "contain", display: "block" }}
          />
        </div>
      </div>

      {/* Brand statement strip */}
      <div
        style={{
          background: colors.brand.purple,
          borderRadius: 20,
          padding: "28px 32px",
          marginBottom: 32,
          color: "#fff",
        }}
      >
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: 12,
            fontWeight: 600,
            color: colors.brand.highlight,
          }}
        >
          بيان العلامة
        </span>
        <p
          style={{
            fontFamily: fonts.heading,
            fontSize: 22,
            fontWeight: 500,
            lineHeight: 1.7,
            marginTop: 8,
            marginBottom: 0,
            color: "#fff",
          }}
        >
          منصة وساطة زواج آمنة وشرعية، تربط الراغبين تحت إشراف الإدارة <span style={{ color: colors.brand.highlight }}>دون إغفال للخصوصية.</span>
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        {attributes.map((attr) => {
          const Icon = attr.icon;
          return (
            <div
              key={attr.label}
              style={{
                background: colors.surface.white,
                border: `1px solid ${colors.border.soft}`,
                borderRadius: 16,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: `${attr.color}14`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={20} color={attr.color} />
              </div>
              <div
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 16,
                  fontWeight: 700,
                  color: colors.ink.black,
                }}
              >
                {attr.label}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 13,
                  color: colors.ink.muted,
                  lineHeight: 1.6,
                }}
              >
                {attr.desc}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
