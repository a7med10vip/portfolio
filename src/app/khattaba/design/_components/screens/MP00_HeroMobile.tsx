import { Crown, UserPlus, ChevronLeft } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";

/* MP00 · هيرو الهبوط (موبايل) — صورة full-bleed
 * النص في الفراغ العلوي · زرّان في الفراغ السفلي. Flat: لا gradient. */

export default function MP00HeroMobile() {
  return (
    <MobileScreen bg={palette.purple[800]} padTop={0}>
      {/* full-bleed scene */}
      <img
        src="/khattaba/hero-mobile.png"
        alt="زوجان يتصفّحان المنصة — ملفات موثّقة تحت إشراف الإدارة"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
      />

      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* النص — الفراغ العلوي */}
        <div style={{ padding: "60px 26px 0" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 13px", background: "rgba(251,192,226,0.12)", border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11.5, fontWeight: 700, color: colors.brand.highlight }}>
            <Crown size={13} /> منصة وساطة الزواج الأولى في السعودية
          </span>

          <h1 style={{ fontFamily: fonts.hero, fontSize: 32, fontWeight: 700, lineHeight: 1.32, color: "#fff", margin: "16px 0 0" }}>
            وساطة زواجٍ <span style={{ color: colors.brand.highlight }}>آمنة وشرعية</span>، تحت إشراف الإدارة
          </h1>
        </div>

        {/* الزرّان — الفراغ السفلي */}
        <div style={{ padding: "0 24px 40px", display: "flex", flexDirection: "column", gap: 12 }}>
          <button style={{ width: "100%", height: 54, background: colors.brand.highlight, color: palette.purple[800], border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <UserPlus size={18} /> سجّل الآن
          </button>
          <button style={{ width: "100%", height: 54, background: "rgba(255,255,255,0.08)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            كيف تعمل المنصة <ChevronLeft size={18} />
          </button>
        </div>
      </div>
    </MobileScreen>
  );
}
