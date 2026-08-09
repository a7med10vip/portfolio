import { ShieldCheck, Scale, Eye, Crown, UserPlus, ChevronLeft, BadgeCheck } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen, PurpleBackdrop } from "./_mobile/MobileShell";
import { BrandWordmark } from "./_marketing/deco";

/* MP01 · الصفحة الرئيسية (موبايل · marketing landing) */
export default function MP01HomeMobile() {
  return (
    <MobileScreen padTop={0} bg="#fff">
      {/* purple hero */}
      <div style={{ background: palette.purple[800], padding: "60px 22px 36px", position: "relative", overflow: "hidden", borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
        <PurpleBackdrop id="kh-mp01-dots" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <BrandWordmark onDark size="sm" />
              
            </div>
            <button style={{ height: 32, padding: "0 14px", background: "rgba(255,255,255,0.10)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11.5, fontWeight: 700 }}>دخول</button>
          </div>

          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", background: "rgba(251,192,226,0.10)", border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.brand.highlight, marginBottom: 14 }}>
            <Crown size={11} /> السعودية الأولى
          </span>
          <h1 style={{ fontFamily: fonts.hero, fontSize: 28, fontWeight: 700, lineHeight: 1.3, color: "#fff", margin: 0 }}>
            وساطة زواج <span style={{ color: colors.brand.highlight }}>آمنة وشرعية</span>، تحت إشراف الإدارة
          </h1>
          <p style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 1.85, color: palette.purple[200], marginTop: 12 }}>
            نربط الراغبين في الزواج بخصوصية تامة — دون صور حقيقية، وبمراجعة يدوية لكل عضو.
          </p>

          <button style={{ width: "100%", height: 50, marginTop: 18, background: colors.brand.highlight, color: palette.purple[800], border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            <UserPlus size={16} /> سجّل الآن
          </button>

          <div style={{ display: "flex", gap: 6, marginTop: 14, justifyContent: "center" }}>
            {[{ icon: ShieldCheck, label: "آمنة" }, { icon: Scale, label: "شرعية" }, { icon: Eye, label: "موثوقة" }].map((p) => (
              <span key={p.label} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "5px 10px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 10.5, fontWeight: 600, color: "#fff" }}>
                <p.icon size={11} color={colors.brand.highlight} /> {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* pillars */}
      <div style={{ padding: "28px 20px 20px" }}>
        <h2 style={{ fontFamily: fonts.heading, fontSize: 19, fontWeight: 700, color: colors.ink.black, margin: "0 0 14px", textAlign: "center" }}>لماذا خطّابة السعودية الأولى؟</h2>
        {[
          { icon: ShieldCheck, title: "آمنة", body: "مراجعة يدوية لكل تسجيل · لا حسابات وهمية." },
          { icon: Scale, title: "شرعية", body: "ضوابط واضحة تحفظ القيم." },
          { icon: Eye, title: "موثوقة", body: "شات مراقب وفلترة محتوى." },
        ].map((p) => (
          <div key={p.title} style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 14, display: "flex", gap: 12, marginBottom: 8 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><p.icon size={18} color={colors.brand.green} /></div>
            <div>
              <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>{p.title}</div>
              <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginTop: 2, lineHeight: 1.7 }}>{p.body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* bottom cta */}
      <div style={{ padding: "10px 20px 24px" }}>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: radius.xl, padding: "26px 18px", textAlign: "center", color: "#fff" }}>
          <img src="/khattaba/cta-couple.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(42,19,34,0.82)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>ابدأ رحلتك اليوم</h3>
            <p style={{ fontFamily: fonts.body, fontSize: 12, color: palette.purple[200], marginBottom: 14 }}>التسجيل سهل والمراجعة يدوية.</p>
            <button style={{ width: "100%", height: 44, background: colors.brand.highlight, color: palette.purple[800], border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
              سجّل الآن <ChevronLeft size={15} />
            </button>
          </div>
        </div>
      </div>
    </MobileScreen>
  );
}
