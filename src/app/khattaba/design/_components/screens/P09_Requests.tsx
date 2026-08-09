import { Clock, Check, X, MessageCircle, Hourglass } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, space } from "../tokens";
import { CoreShell, coreWrap } from "./_core/CoreShell";

/* P09 · طلبات الخطبة — وارد/صادر، حالات، عرض صالح 72 ساعة قابل للتمديد مرتين */

const avatars = ["/avatars/saudi-male.jpeg", "/khattaba/avatars/niqab-woman-brown.png", "/avatars/saudi-male-2.jpeg", "/khattaba/avatars/niqab-woman-blue.png"];
type Status = "pending" | "accepted" | "rejected";
const statusMeta: Record<Status, { label: string; color: string; bg: string }> = {
  pending: { label: "معلّق", color: colors.accent.amber, bg: colors.accent.amberSoft },
  accepted: { label: "مقبول", color: colors.brand.green, bg: colors.brand.greenSoft },
  rejected: { label: "مرفوض", color: colors.accent.red, bg: colors.accent.redSoft },
};

const incoming = [
  { name: "نورة", meta: "27 سنة · الرياض", avatar: 1, status: "pending" as Status, time: "متبقٍ ٥٢ ساعة · قابل للتمديد (٠/٢)", project: "#KH-1042" },
  { name: "ريم", meta: "30 سنة · الدمام", avatar: 3, status: "pending" as Status, time: "متبقٍ ١٨ ساعة · تم التمديد (١/٢)", project: "#KH-1071" },
  { name: "الجوهرة", meta: "28 سنة · الرياض", avatar: 1, status: "accepted" as Status, time: "مشروع خطبة #4821 · الشات متاح", project: "#KH-1149" },
  { name: "شهد", meta: "24 سنة · جدة", avatar: 3, status: "rejected" as Status, time: "انتهت صلاحية العرض", project: "#KH-1162" },
];

function Tab({ label, count, active }: { label: string; count: number; active?: boolean }) {
  return (
    <div style={{ padding: "14px 20px", fontFamily: fonts.body, fontSize: 14.5, fontWeight: active ? 700 : 500, color: active ? colors.brand.green : colors.ink.muted, borderBottom: `2px solid ${active ? colors.brand.green : "transparent"}`, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
      {label}
      <span style={{ minWidth: 20, height: 20, padding: "0 6px", borderRadius: 999, background: active ? colors.brand.green : colors.surface.sunken, color: active ? "#fff" : colors.ink.muted, fontFamily: fonts.latin, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{count}</span>
    </div>
  );
}

function RequestRow({ r }: { r: (typeof incoming)[number] }) {
  const s = statusMeta[r.status];
  return (
    <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: "18px 22px", display: "flex", alignItems: "center", gap: 18, boxShadow: shadow.sm }}>
      <img src={avatars[r.avatar]} alt={r.name} style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black }}>{r.name}</span>
          <span style={{ padding: "3px 10px", borderRadius: radius.full, background: s.bg, color: s.color, fontFamily: fonts.body, fontSize: 11, fontWeight: 700 }}>{s.label}</span>
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.muted, marginTop: 4 }}>{r.meta}</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: fonts.body, fontSize: 12, color: r.status === "rejected" ? colors.accent.red : colors.ink.muted, marginTop: 6 }}>
          {r.status === "accepted" ? <MessageCircle size={13} color={colors.brand.green} /> : <Clock size={13} />}
          {r.time}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        {r.status === "pending" && (
          <>
            <button style={{ height: 40, padding: "0 18px", background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><Check size={15} /> قبول</button>
            <button style={{ width: 40, height: 40, background: colors.surface.white, color: colors.accent.red, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><X size={16} /></button>
          </>
        )}
        {r.status === "accepted" && (
          <button style={{ height: 40, padding: "0 18px", background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><MessageCircle size={15} /> بدء الشات</button>
        )}
        {r.status === "rejected" && (
          <button style={{ height: 40, padding: "0 18px", background: colors.surface.white, color: colors.ink.muted, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>إزالة</button>
        )}
      </div>
    </div>
  );
}

export default function P09Requests() {
  return (
    <CoreShell active="requests">
      <div style={{ ...coreWrap, maxWidth: 860, padding: `${space[8]}px 28px ${space[12]}px` }}>
        <h1 style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 700, color: colors.ink.black, margin: "0 0 6px" }}>سجل طلبات الخطبة</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.muted, margin: "0 0 18px" }}>كل عرض صالح ٧٢ ساعة وقابل للتمديد مرتين كحد أقصى.</p>

        <div style={{ display: "flex", gap: 4, borderBottom: `1px solid ${colors.border.soft}`, marginBottom: 22 }}>
          <Tab label="الواردة" count={3} active />
          <Tab label="الصادرة" count={2} />
          <Tab label="منتهية" count={5} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {incoming.map((r) => (
            <RequestRow key={r.project} r={r} />
          ))}
        </div>
      </div>
    </CoreShell>
  );
}
