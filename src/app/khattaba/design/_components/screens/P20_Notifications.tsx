import { Heart, MessageCircle, BadgeCheck, AlertTriangle, FileSignature, Wallet, Settings, Check } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, space } from "../tokens";
import { CoreShell, coreWrap } from "./_core/CoreShell";

/* P20 · مركز الإشعارات */

type NotifKind = "request" | "chat" | "system" | "warn" | "agreement" | "wallet";

const meta: Record<NotifKind, { icon: typeof Heart; color: string; bg: string; tag: string }> = {
  request: { icon: Heart, color: colors.brand.green, bg: colors.brand.greenSoft, tag: "طلب تواصل" },
  chat: { icon: MessageCircle, color: colors.accent.purple, bg: colors.accent.purpleSoft, tag: "محادثة" },
  system: { icon: BadgeCheck, color: colors.accent.blue, bg: colors.accent.blueSoft, tag: "نظام" },
  warn: { icon: AlertTriangle, color: colors.accent.amber, bg: colors.accent.amberSoft, tag: "تنبيه" },
  agreement: { icon: FileSignature, color: colors.brand.green, bg: colors.brand.greenSoft, tag: "اتفاقية" },
  wallet: { icon: Wallet, color: colors.accent.amber, bg: colors.accent.amberSoft, tag: "محفظة" },
};

const notifs: { kind: NotifKind; title: string; body: string; time: string; unread?: boolean }[] = [
  { kind: "request", title: "طلب تواصل جديد من نورة", body: "ترغب نورة (#KH-1042) في التواصل معك · العرض صالح 72 ساعة.", time: "قبل 5 دقائق", unread: true },
  { kind: "chat", title: "رسالة جديدة في مشروع خطبة #4821", body: "نورة: ما رأيك في السكن بعد الزواج؟", time: "قبل 12 دقيقة", unread: true },
  { kind: "warn", title: "تنبيه: حُجبت رسالتك في الشات", body: "تم رصد رقم هاتف في رسالتك في مشروع #4821 — يُمنع تبادل وسائل التواصل الخارجية.", time: "قبل 35 دقيقة", unread: true },
  { kind: "agreement", title: "انتهت مدة الشات — اتفاقية الجدية متاحة", body: "اضغط هنا للانتقال إلى اتفاقية الجدية الرقمية ودفع الرسوم المنفصلة.", time: "قبل ساعة" },
  { kind: "system", title: "تم قبول طلب اشتراكك", body: "حدّدت الإدارة رسومك المخصّصة 1,500 ر.س — فعّل حسابك.", time: "أمس 11:20" },
  { kind: "wallet", title: "تم إيداع 1,200 ر.س في محفظتك", body: "استرداد مبلغ مشروع خطبة #4612 بعد فشل المشروع.", time: "20 أبريل" },
];

function Tab({ label, count, active }: { label: string; count?: number; active?: boolean }) {
  return (
    <div style={{ padding: "12px 18px", fontFamily: fonts.body, fontSize: 13.5, fontWeight: active ? 700 : 500, color: active ? colors.brand.green : colors.ink.muted, borderBottom: `2px solid ${active ? colors.brand.green : "transparent"}`, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
      {label}{count !== undefined && <span style={{ padding: "1px 8px", borderRadius: 999, background: active ? colors.brand.green : colors.surface.sunken, color: active ? "#fff" : colors.ink.muted, fontFamily: fonts.latin, fontSize: 10.5, fontWeight: 700 }}>{count}</span>}
    </div>
  );
}

export default function P20Notifications() {
  return (
    <CoreShell active={null}>
      <div style={{ ...coreWrap, padding: `${space[8]}px 28px ${space[12]}px`, maxWidth: 840 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18 }}>
          <div>
            <h1 style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 700, color: colors.ink.black, margin: 0 }}>الإشعارات</h1>
            <p style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.muted, margin: "6px 0 0" }}>عرض كل ما يتعلق بطلباتك ومحادثاتك واشتراكك.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ height: 40, padding: "0 14px", background: colors.surface.white, color: colors.brand.green, border: `1px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><Check size={14} /> تحديد الكل كمقروء</button>
            <button style={{ width: 40, height: 40, background: colors.surface.white, color: colors.ink.body, border: `1px solid ${colors.border.default}`, borderRadius: radius.md, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Settings size={15} /></button>
          </div>
        </div>

        <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, overflow: "hidden" }}>
          <div style={{ display: "flex", borderBottom: `1px solid ${colors.border.soft}`, padding: "0 8px" }}>
            <Tab label="الكل" count={24} active />
            <Tab label="غير مقروءة" count={3} />
            <Tab label="الطلبات" count={8} />
            <Tab label="المحادثات" count={6} />
            <Tab label="النظام" count={10} />
          </div>

          <div>
            {notifs.map((n, i) => {
              const m = meta[n.kind];
              const Icon = m.icon;
              return (
                <div key={i} style={{ padding: "16px 22px", display: "flex", gap: 14, alignItems: "flex-start", borderBottom: i === notifs.length - 1 ? "none" : `1px solid ${colors.border.soft}`, background: n.unread ? `${colors.brand.green}05` : "transparent", position: "relative" }}>
                  {n.unread && <span style={{ position: "absolute", top: "50%", insetInlineStart: 8, transform: "translateY(-50%)", width: 6, height: 6, borderRadius: "50%", background: colors.brand.green }} />}
                  <div style={{ width: 40, height: 40, borderRadius: radius.md, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} color={m.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ padding: "2px 8px", borderRadius: radius.xs, background: m.bg, color: m.color, fontFamily: fonts.body, fontSize: 10.5, fontWeight: 700 }}>{m.tag}</span>
                      <span style={{ fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, color: colors.ink.black }}>{n.title}</span>
                    </div>
                    <p style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 1.7, color: colors.ink.muted, margin: "5px 0 0" }}>{n.body}</p>
                  </div>
                  <span style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, flexShrink: 0, whiteSpace: "nowrap" }}>{n.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </CoreShell>
  );
}
