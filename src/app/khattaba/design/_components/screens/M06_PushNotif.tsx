import { Heart, MessageCircle, BadgeCheck } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";

/* M06 · Push Notifications — showcase على lock screen مبسط */

const notifs = [
  { icon: Heart, color: colors.brand.green, title: "طلب تواصل جديد", body: "نورة (#KH-1042) تقدّمت بطلب خطبة · صالح 72 ساعة", time: "الآن" },
  { icon: MessageCircle, color: colors.accent.purple, title: "رسالة جديدة في مشروع خطبة #4821", body: "نورة: ما رأيك في السكن بعد الزواج؟", time: "قبل 5 دقائق" },
  { icon: BadgeCheck, color: colors.accent.amber, title: "تم قبول طلب اشتراكك", body: "حدّدت الإدارة رسوم اشتراكك المخصّصة — فعّل حسابك للبدء.", time: "قبل ساعة" },
];

export default function M06PushNotif() {
  return (
    <MobileScreen bg={palette.purple[800]} padTop={0}>
      <img src="/khattaba/lock-nature.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(42,19,34,0.45)" }} />

      {/* Date/time header (lock screen feel) */}
      <div style={{ position: "relative", zIndex: 1, padding: "70px 24px 14px", textAlign: "center" }}>
        <div style={{ fontFamily: fonts.body, fontSize: 13, color: palette.purple[200] }}>الأربعاء، 29 مايو</div>
        <div style={{ fontFamily: fonts.heading, fontSize: 56, fontWeight: 700, color: "#fff", letterSpacing: -1, marginTop: 4 }}>10:42</div>
      </div>

      {/* notifications stack */}
      <div style={{ position: "relative", zIndex: 1, padding: "20px 16px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: palette.purple[200], paddingInlineStart: 8, marginBottom: 4 }}>الإشعارات</div>
        {notifs.map((n, i) => {
          const Icon = n.icon;
          return (
            <div key={i} style={{ background: "rgba(255,255,255,0.94)", backdropFilter: "blur(10px)", borderRadius: radius.lg, padding: "12px 14px", display: "flex", gap: 12, boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `${n.color}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={18} color={n.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <img src="/brand/khattaba-logo-white.png" alt="" style={{ width: 14, height: 14, padding: 2, background: "#2A1322", boxSizing: "border-box", borderRadius: 3, objectFit: "contain" }} />
                    <span style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.ink.muted }}>خطّابة السعودية الأولى</span>
                  </div>
                  <span style={{ fontFamily: fonts.body, fontSize: 10.5, color: colors.ink.muted }}>{n.time}</span>
                </div>
                <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black, marginTop: 4 }}>{n.title}</div>
                <div style={{ fontFamily: fonts.body, fontSize: 12, lineHeight: 1.6, color: colors.ink.body, marginTop: 2 }}>{n.body}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* swipe hint */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 24px 40px", textAlign: "center" }}>
        <div style={{ width: 130, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.4)", margin: "0 auto 8px" }} />
        <div style={{ fontFamily: fonts.body, fontSize: 11, color: palette.purple[200] }}>اسحب لفتح الإشعار</div>
      </div>
    </MobileScreen>
  );
}
