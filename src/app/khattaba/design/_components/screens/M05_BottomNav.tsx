import { Bell, Home, Search, Heart, MessageCircle, User, BadgeCheck, MapPin } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { FloralScatter } from "./_marketing/deco";

/* M05 · Bottom Navigation — عرض على شاشة الرئيسية */

const tabs = [
  { icon: Home, label: "الرئيسية", active: true },
  { icon: Search, label: "البحث" },
  { icon: Heart, label: "طلباتي", badge: 3 },
  { icon: MessageCircle, label: "الشات" },
  { icon: User, label: "حسابي" },
];

export default function M05BottomNav() {
  return (
    <MobileScreen>
      {/* header */}
      <div style={{ padding: "0 20px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted }}>صباح الخير</div>
          <div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.black, marginTop: 2 }}>محمد الأحمدي</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ width: 38, height: 38, borderRadius: radius.md, background: colors.surface.page, border: `1px solid ${colors.border.default}`, position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <Bell size={16} color={colors.ink.body} />
            <span style={{ position: "absolute", top: -3, left: -3, minWidth: 16, height: 16, padding: "0 4px", background: colors.accent.red, color: "#fff", borderRadius: 999, fontSize: 9, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", border: `2px solid #fff`, fontFamily: fonts.latin }}>5</span>
          </button>
          <img src="/avatars/saudi-male.jpeg" alt="حسابي" style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover" }} />
        </div>
      </div>

      {/* brand banner */}
      <div style={{ margin: "0 20px 16px", position: "relative", overflow: "hidden", background: palette.purple[800], borderRadius: radius.xl, padding: 18, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
        <FloralScatter scale={0.55} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.brand.highlight, marginBottom: 4 }}>طلبات نشطة</div>
          <div style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: "#fff" }}>3 مشاريع خطبة</div>
          <div style={{ fontFamily: fonts.body, fontSize: 11, color: palette.purple[200], marginTop: 4 }}>2 محادثة جارية · طلب معلّق</div>
        </div>
        <div style={{ position: "relative", zIndex: 1, width: 56, height: 56, borderRadius: "50%", background: colors.brand.highlight, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Heart size={26} color={palette.purple[800]} fill={palette.purple[800]} />
        </div>
      </div>

      {/* suggestions */}
      <div style={{ padding: "0 20px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black, margin: 0 }}>اقتراحات اليوم</h3>
          <span style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.brand.green }}>عرض الكل</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { name: "نورة العتيبي", meta: "27 · الرياض · عتيبة", avatar: "/khattaba/avatars/niqab-woman-brown.png" },
            { name: "سارة الغامدي", meta: "25 · جدة · غامد", avatar: "/khattaba/avatars/niqab-woman-blue.png" },
          ].map((p) => (
            <div key={p.name} style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 12, display: "flex", alignItems: "center", gap: 10, boxShadow: shadow.sm }}>
              <img src={p.avatar} alt={p.name} style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover" }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>{p.name}</span>
                  <BadgeCheck size={13} color={colors.brand.green} />
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginTop: 2 }}><MapPin size={11} /> {p.meta}</div>
              </div>
              <button style={{ height: 34, padding: "0 12px", background: colors.brand.greenSoft, color: colors.brand.green, border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 12, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}><Heart size={13} /> تواصل</button>
            </div>
          ))}
        </div>
      </div>

      {/* bottom nav */}
      <div style={{ background: "#fff", borderTop: `1px solid ${colors.border.soft}`, padding: "8px 10px 22px", display: "flex", justifyContent: "space-around" }}>
        {tabs.map(({ icon: Icon, label, active, badge }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "6px 10px", position: "relative" }}>
            <div style={{ position: "relative" }}>
              <Icon size={22} color={active ? colors.brand.green : colors.ink.muted} fill={active ? colors.brand.greenSoft : "transparent"} />
              {badge && (
                <span style={{ position: "absolute", top: -4, insetInlineEnd: -4, minWidth: 16, height: 16, padding: "0 4px", background: colors.accent.red, color: "#fff", borderRadius: 999, fontSize: 9, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.latin }}>{badge}</span>
              )}
            </div>
            <span style={{ fontFamily: fonts.body, fontSize: 10, fontWeight: active ? 700 : 500, color: active ? colors.brand.green : colors.ink.muted }}>{label}</span>
          </div>
        ))}
      </div>
    </MobileScreen>
  );
}
