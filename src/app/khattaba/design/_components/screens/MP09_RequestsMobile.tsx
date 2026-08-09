import { Check, X, MessageCircle, Clock } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader, HeaderBellAvatar, MobileTabs } from "./_mobile/MobileApp";

/* MP09 · طلبات الخطبة (موبايل) */
type Status = "pending" | "accepted" | "rejected";
const statusMap: Record<Status, { label: string; color: string; bg: string }> = {
  pending: { label: "معلّق", color: colors.accent.amber, bg: colors.accent.amberSoft },
  accepted: { label: "مقبول", color: colors.brand.green, bg: colors.brand.greenSoft },
  rejected: { label: "مرفوض", color: colors.accent.red, bg: colors.accent.redSoft },
};

const reqs = [
  { name: "نورة العتيبي", meta: "27 · الرياض", avatar: "/khattaba/avatars/niqab-woman-brown.png", status: "pending" as Status, time: "متبقٍ ٥٢س" },
  { name: "ريم القحطاني", meta: "30 · الدمام", avatar: "/khattaba/avatars/niqab-woman-blue.png", status: "pending" as Status, time: "متبقٍ ١٨س · مدّد 1/2" },
  { name: "الجوهرة الدوسري", meta: "28 · الرياض", avatar: "/khattaba/avatars/niqab-woman-brown.png", status: "accepted" as Status, time: "مشروع #4821" },
  { name: "شهد الغامدي", meta: "24 · جدة", avatar: "/khattaba/avatars/niqab-woman-blue.png", status: "rejected" as Status, time: "انتهت الصلاحية" },
];

export default function MP09RequestsMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader right={<HeaderBellAvatar />} />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "14px 16px 8px" }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: colors.ink.black, margin: 0 }}>سجل طلبات الخطبة</h1>
          <p style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginTop: 3 }}>كل عرض صالح ٧٢س قابل للتمديد مرتين</p>
        </div>

        <div style={{ display: "flex", gap: 4, padding: "0 16px", borderBottom: `1px solid ${colors.border.soft}` }}>
          {[
            { label: "الواردة", count: 3, active: true },
            { label: "الصادرة", count: 2 },
            { label: "منتهية", count: 5 },
          ].map((t) => (
            <div key={t.label} style={{ padding: "12px 14px", fontFamily: fonts.body, fontSize: 13, fontWeight: t.active ? 700 : 500, color: t.active ? colors.brand.green : colors.ink.muted, borderBottom: `2px solid ${t.active ? colors.brand.green : "transparent"}`, display: "inline-flex", alignItems: "center", gap: 6 }}>
              {t.label}
              <span style={{ padding: "1px 7px", borderRadius: 999, background: t.active ? colors.brand.green : colors.surface.sunken, color: t.active ? "#fff" : colors.ink.muted, fontFamily: fonts.latin, fontSize: 10.5, fontWeight: 700 }}>{t.count}</span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
          {reqs.map((r) => {
            const s = statusMap[r.status];
            return (
              <div key={r.name} style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 12, display: "flex", alignItems: "center", gap: 12 }}>
                <img src={r.avatar} alt={r.name} style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontFamily: fonts.heading, fontSize: 13.5, fontWeight: 700, color: colors.ink.black }}>{r.name}</span>
                    <span style={{ padding: "2px 8px", borderRadius: 999, background: s.bg, color: s.color, fontFamily: fonts.body, fontSize: 9.5, fontWeight: 700 }}>{s.label}</span>
                  </div>
                  <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, marginTop: 2 }}>{r.meta}</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: fonts.body, fontSize: 10.5, color: r.status === "rejected" ? colors.accent.red : colors.ink.muted, marginTop: 4 }}><Clock size={11} /> {r.time}</div>
                </div>
                {r.status === "pending" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <button style={{ width: 36, height: 32, background: colors.brand.green, color: "#fff", border: "none", borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Check size={14} /></button>
                    <button style={{ width: 36, height: 32, background: "#fff", color: colors.accent.red, border: `1.5px solid ${colors.border.default}`, borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><X size={14} /></button>
                  </div>
                )}
                {r.status === "accepted" && (
                  <button style={{ width: 40, height: 40, background: colors.brand.green, color: "#fff", border: "none", borderRadius: 10, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><MessageCircle size={16} /></button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <MobileTabs active="requests" />
    </MobileScreen>
  );
}
