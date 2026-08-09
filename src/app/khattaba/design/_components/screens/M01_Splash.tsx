import { Heart } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, palette } from "../tokens";
import { MobileScreen, PurpleBackdrop } from "./_mobile/MobileShell";

/* M01 · Splash */
export default function M01Splash() {
  return (
    <MobileScreen bg={palette.purple[800]} padTop={0}>
      <PurpleBackdrop id="kh-splash-dots" />

      {/* ملاحظة تصميم — للمراجعة فقط (ليست جزءاً من الشاشة) */}
      <div style={{ position: "absolute", top: 44, insetInlineStart: 14, insetInlineEnd: 14, zIndex: 5, background: "#FFF8E1", border: "1.5px dashed #F59E0B", borderRadius: 12, padding: "10px 12px", display: "flex", gap: 8, alignItems: "flex-start", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>
        <span style={{ fontSize: 15, lineHeight: 1.2 }}>🎨</span>
        <div style={{ fontFamily: fonts.body, fontSize: 10.5, lineHeight: 1.6, color: "#7A4706" }}>
          <b>ملاحظة تصميم:</b> ألوان قلبَي الشعار (الكبير أزرق + الصغير وردي) متروكة للمصمم لتنفيذها على أصل اللوجو عند مرحلة الفرونت. ↓
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
        <div style={{ position: "relative", width: 160, height: 160, borderRadius: "50%", background: palette.purple[700], border: "1.5px dashed rgba(251,192,226,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/brand/khattaba-logo-white.png" alt="خطّابة السعودية الأولى" style={{ width: 104, height: 104, objectFit: "contain", borderRadius: 22 }} />
        </div>
        <div style={{ fontFamily: fonts.heading, fontSize: 27, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>خطّابة السعودية الأولى</div>
      </div>
      <div style={{ position: "relative", zIndex: 1, padding: "0 24px 50px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: colors.brand.highlight, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Heart size={18} color={palette.purple[800]} fill={palette.purple[800]} />
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 12, color: palette.purple[200] }}>وساطة زواج آمنة وشرعية</div>
      </div>
    </MobileScreen>
  );
}
