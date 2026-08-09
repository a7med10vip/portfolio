import type { CSSProperties, ReactNode } from "react";
import { ShieldCheck, Phone, Mail, Instagram, Heart, UserPlus, Headset, Check } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, space, palette } from "../../tokens";
import { DotPattern, FloralScatter, BrandWordmark } from "./deco";

/* Shared chrome for every Marketing page (P01, P02, P15, P17, P16, P12-14).
 * Navbar + Footer live here so all public pages stay identical. */

export const wrap: CSSProperties = { maxWidth: 1120, margin: "0 auto", padding: "0 48px" };

export type MarketingKey = "home" | "about" | "how" | "faq" | "contact" | null;

const navLinks: { label: string; key: MarketingKey }[] = [
  { label: "الرئيسية", key: "home" },
  { label: "من نحن", key: "about" },
  { label: "آلية الخطبة", key: "how" },
  { label: "الأسئلة الشائعة", key: "faq" },
  { label: "اتصل بنا", key: "contact" },
];

export function MarketingNav({ active = null }: { active?: MarketingKey }) {
  return (
    <header
      style={{
        height: 76,
        background: colors.surface.white,
        borderBottom: `1px solid ${colors.border.soft}`,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ ...wrap, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <BrandWordmark size="md" />

        <nav style={{ display: "flex", gap: 28, fontFamily: fonts.body, fontSize: 14 }}>
          {navLinks.map((l) => (
            <span
              key={l.key}
              style={{
                color: l.key === active ? colors.brand.green : colors.ink.body,
                fontWeight: l.key === active ? 700 : 500,
                cursor: "pointer",
              }}
            >
              {l.label}
            </span>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            style={{
              height: 42,
              padding: "0 18px",
              background: "transparent",
              color: colors.ink.body,
              border: "none",
              fontFamily: fonts.body,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              borderRadius: radius.md,
            }}
          >
            تسجيل الدخول
          </button>
          <button
            style={{
              height: 42,
              padding: "0 22px",
              background: colors.brand.green,
              color: "#fff",
              border: "none",
              fontFamily: fonts.body,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              borderRadius: radius.md,
            }}
          >
            سجّل الآن
          </button>
        </div>
      </div>
    </header>
  );
}

const footerCols = [
  { title: "المنصة", links: ["من نحن", "آلية الخطبة", "الأسئلة الشائعة", "اتصل بنا"] },
  { title: "القانوني", links: ["سياسة الخصوصية وسرية المعلومات", "الشروط والأحكام", "سياسة الاستخدام وإخلاء المسؤولية"] },
];

export function MarketingFooter() {
  return (
    <footer style={{ background: palette.purple[900], color: "#fff", paddingTop: space[16] }}>
      <div style={wrap}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40, paddingBottom: space[12] }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <BrandWordmark size="md" onDark />
            </div>
            <p style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", margin: 0, maxWidth: 300 }}>
              منصة وساطة زواج آمنة وشرعية، تربط الراغبين تحت إشراف الإدارة دون إغفال للخصوصية.
            </p>
          </div>

          {footerCols.map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((l) => (
                  <span key={l} style={{ fontFamily: fonts.body, fontSize: 14, color: "rgba(255,255,255,0.65)", cursor: "pointer" }}>
                    {l}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>تواصل</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: fonts.body, fontSize: 14, color: "rgba(255,255,255,0.65)" }}>
                <Phone size={15} /> 920 000 000
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: fonts.body, fontSize: 14, color: "rgba(255,255,255,0.65)" }}>
                <Mail size={15} /> info@kh1-ksa.com.sa
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: fonts.body, fontSize: 14, color: "rgba(255,255,255,0.65)" }}>
                <Instagram size={15} /> @khattaba
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.10)",
            padding: "20px 0 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <span style={{ fontFamily: fonts.body, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>© 2026 خطّابة السعودية الأولى · جميع الحقوق محفوظة</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: fonts.body, fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
            <ShieldCheck size={14} color={colors.brand.highlight} />
            متوافقة مع نظام حماية البيانات الشخصية (PDPL)
          </span>
        </div>
      </div>
    </footer>
  );
}

/* Branded purple header band for inner marketing pages. */
export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section style={{ background: palette.purple[800], position: "relative", overflow: "hidden", padding: `${space[16]}px 0` }}>
      <DotPattern id="kh-pagehero-dots" color="#FFFFFF" opacity={0.05} gap={30} />
      <FloralScatter />
      <div style={{ ...wrap, position: "relative", zIndex: 1, textAlign: "center" }}>
        {eyebrow && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "7px 16px",
              background: "rgba(251,192,226,0.10)",
              border: `1px solid ${colors.brand.highlight}`,
              borderRadius: radius.full,
              fontFamily: fonts.body,
              fontSize: 13,
              fontWeight: 700,
              color: colors.brand.highlight,
              marginBottom: 18,
            }}
          >
            {eyebrow}
          </span>
        )}
        <h1 style={{ fontFamily: fonts.hero, fontSize: 46, fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.3 }}>{title}</h1>
        {subtitle && (
          <p style={{ fontFamily: fonts.body, fontSize: 17, color: palette.purple[200], margin: "16px auto 0", maxWidth: 620, lineHeight: 1.8 }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

/* Shared two-column CTA band (approved on P01). */
export function MarketingCta({
  title = "ابدأ رحلتك نحو الزواج",
  subtitle = "التسجيل سهل، والمراجعة يدوية لضمان جدية كل عضو.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section style={{ background: colors.surface.white, padding: `${space[12]}px 0 ${space[20]}px` }}>
      <div style={wrap}>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: radius["2xl"], padding: "76px 56px", textAlign: "center" }}>
          {/* full-bleed background image */}
          <img
            src="/khattaba/cta-couple.png"
            alt="زوجان سعوديان يتواصلان عبر المنصة في أجواء هادئة"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          {/* purple scrim for legibility (flat, no gradient) */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(42,19,34,0.84)" }} />
          <DotPattern id="kh-cta-dots" color="#FFFFFF" opacity={0.06} gap={28} />

          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "rgba(251,192,226,0.10)", border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.brand.highlight, marginBottom: 16 }}>
              <Heart size={13} weight="fill" /> ابدأ اليوم
            </span>
            <h2 style={{ fontFamily: fonts.heading, fontSize: 36, fontWeight: 700, color: "#fff", margin: "0 0 12px", lineHeight: 1.3 }}>{title}</h2>
            <p style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 1.8, color: palette.purple[200], margin: "0 0 28px", maxWidth: 480 }}>{subtitle}</p>
            <div style={{ display: "flex", gap: 12, marginBottom: 22, justifyContent: "center", flexWrap: "wrap" }}>
              <button style={{ height: 54, padding: "0 32px", background: colors.brand.highlight, color: palette.purple[800], border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
                <UserPlus size={18} /> سجّل الآن
              </button>
              <button style={{ height: 54, padding: "0 26px", background: "rgba(255,255,255,0.10)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Headset size={18} /> تواصل معنا
              </button>
            </div>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
              {["سهولة التسجيل", "بدون التزام", "مراجعة يدوية"].map((t) => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: fonts.body, fontSize: 13, color: "#fff" }}>
                  <Check size={14} color={colors.brand.highlight} strokeWidth={3} /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MarketingPage({ active = null, children }: { active?: MarketingKey; children: ReactNode }) {
  return (
    <div style={{ width: "100%", background: colors.surface.white, overflow: "hidden", fontFamily: fonts.body }}>
      <MarketingNav active={active} />
      {children}
      <MarketingFooter />
    </div>
  );
}
