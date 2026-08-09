import { Heart, MessageCircle, BadgeCheck, AlertTriangle, FileSignature, Wallet, Check } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader, MobileTabs } from "./_mobile/MobileApp";

/* MP20 · مركز الإشعارات (موبايل) */
type Kind = "request" | "chat" | "warn" | "agreement" | "system" | "wallet";
const meta: Record<Kind, { icon: typeof Heart; color: string; bg: string }> = {
  request: { icon: Heart, color: colors.brand.green, bg: colors.brand.greenSoft },
  chat: { icon: MessageCircle, color: colors.accent.purple, bg: colors.accent.purpleSoft },
  warn: { icon: AlertTriangle, color: colors.accent.amber, bg: colors.accent.amberSoft },
  agreement: { icon: FileSignature, color: colors.brand.green, bg: colors.brand.greenSoft },
  system: { icon: BadgeCheck, color: colors.accent.blue, bg: colors.accent.blueSoft },
  wallet: { icon: Wallet, color: colors.accent.amber, bg: colors.accent.amberSoft },
};

const items: { kind: Kind; title: string; body: string; time: string; unread?: boolean }[] = [
  { kind: "request", title: "طلب تواصل جديد من نورة", body: "ترغب نورة في التواصل · صالح 72 ساعة.", time: "قبل 5د", unread: true },
  { kind: "chat", title: "رسالة جديدة · مشروع #4821", body: "نورة: ما رأيك في السكن بعد الزواج؟", time: "قبل 12د", unread: true },
  { kind: "warn", title: "حُجبت رسالتك في الشات", body: "تم رصد رقم هاتف — يُمنع تبادل التواصل الخارجي.", time: "قبل 35د", unread: true },
  { kind: "agreement", title: "اتفاقية الجدية متاحة", body: "انتهت مدة الشات — انتقل للاتفاقية الرقمية.", time: "قبل ساعة" },
  { kind: "system", title: "تم قبول طلب اشتراكك", body: "حدّدت الإدارة رسومك 1,500 ر.س — فعّل حسابك.", time: "أمس" },
  { kind: "wallet", title: "إيداع 1,200 ر.س في محفظتك", body: "استرداد مبلغ مشروع #4612.", time: "20 أبريل" },
];

export default function MP20NotifsMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader back title="الإشعارات" right={<button style={{ height: 32, padding: "0 12px", background: colors.brand.greenSoft, color: colors.brand.green, border: `1px solid ${colors.brand.green}30`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}><Check size={12} /> الكل</button>} />

      <div style={{ display: "flex", gap: 4, padding: "8px 12px", borderBottom: `1px solid ${colors.border.soft}`, overflow: "hidden" }}>
        {[
          { label: "الكل", count: 24, active: true },
          { label: "غير مقروءة", count: 3 },
          { label: "الطلبات", count: 8 },
          { label: "المحادثات", count: 6 },
        ].map((t) => (
          <span key={t.label} style={{ padding: "6px 12px", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11, fontWeight: t.active ? 700 : 500, background: t.active ? colors.brand.green : "transparent", color: t.active ? "#fff" : colors.ink.body, border: `1px solid ${t.active ? colors.brand.green : colors.border.default}`, flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 4 }}>
            {t.label} <span style={{ fontFamily: fonts.latin, fontSize: 9.5 }}>{t.count}</span>
          </span>
        ))}
      </div>

      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {items.map((n, i) => {
          const m = meta[n.kind];
          const Icon = m.icon;
          return (
            <div key={i} style={{ padding: "12px 16px", display: "flex", gap: 10, borderBottom: `1px solid ${colors.border.soft}`, background: n.unread ? `${colors.brand.green}06` : "#fff", position: "relative" }}>
              {n.unread && <span style={{ position: "absolute", top: "50%", insetInlineStart: 6, transform: "translateY(-50%)", width: 5, height: 5, borderRadius: "50%", background: colors.brand.green }} />}
              <div style={{ width: 36, height: 36, borderRadius: 9, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={16} color={m.color} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
                  <span style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: colors.ink.black, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.title}</span>
                  <span style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted, flexShrink: 0 }}>{n.time}</span>
                </div>
                <p style={{ fontFamily: fonts.body, fontSize: 11.5, lineHeight: 1.6, color: colors.ink.muted, margin: "3px 0 0" }}>{n.body}</p>
              </div>
            </div>
          );
        })}
      </div>
      <MobileTabs active={null} />
    </MobileScreen>
  );
}
