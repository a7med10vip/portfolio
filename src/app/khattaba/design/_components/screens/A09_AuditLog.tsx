import { FileSignature, Download, Filter, ChevronLeft, ChevronRight } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { AdminShell, card, StatusPill, Table } from "./_admin/AdminShell";

/* A09 · سجل المراجعة — جميع العمليات الحساسة */

const logs = [
  { time: "29 مايو 11:22", who: "أحمد", role: "Super Admin", action: "قبول العضوية", target: "#KH-2087 محمد", severity: "info" as const, ip: "92.118.4.21" },
  { time: "29 مايو 11:08", who: "هاني", role: "Moderator", action: "حجب رسالة (رقم هاتف)", target: "مشروع خطبة #4762", severity: "warn" as const, ip: "92.118.4.18" },
  { time: "29 مايو 10:45", who: "أحمد", role: "Super Admin", action: "تحديد رسوم الاشتراك 1,500 ر.س", target: "#KH-2087", severity: "info" as const, ip: "92.118.4.21" },
  { time: "29 مايو 09:32", who: "النظام", role: "System", action: "تمديد مدة المحادثة → 60 يوم", target: "مشروع خطبة #4790", severity: "info" as const, ip: "—" },
  { time: "28 مايو 18:10", who: "هاني", role: "Moderator", action: "حظر عضو", target: "#KH-2208 فهد", severity: "danger" as const, ip: "92.118.4.18" },
  { time: "28 مايو 16:55", who: "أحمد", role: "Super Admin", action: "تعديل الكلمات المحظورة", target: "نمط Regex جديد", severity: "info" as const, ip: "92.118.4.21" },
  { time: "28 مايو 14:20", who: "ليلى", role: "Support", action: "إعادة ضبط آخر دخول", target: "#KH-1042 نورة", severity: "neutral" as const, ip: "92.118.4.30" },
  { time: "28 مايو 11:00", who: "أحمد", role: "Super Admin", action: "حذف حساب نهائي", target: "#KH-0918", severity: "danger" as const, ip: "92.118.4.21" },
];

const severityLabel: Record<string, string> = { info: "معلومة", warn: "تحذير", danger: "حرج", neutral: "روتيني" };
const roleColor: Record<string, string> = { "Super Admin": colors.brand.green, Moderator: colors.accent.purple, Support: colors.accent.blue, System: colors.ink.muted };

export default function A09AuditLog() {
  const rows = logs.map((l) => [
    <span key="t" style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>{l.time}</span>,
    (
      <div key="w" style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>{l.who}</span>
        <span style={{ fontFamily: fonts.body, fontSize: 10.5, color: roleColor[l.role], fontWeight: 700 }}>{l.role}</span>
      </div>
    ),
    <span key="a" style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.body }}>{l.action}</span>,
    <span key="g" style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.body }}>{l.target}</span>,
    <StatusPill key="s" kind={l.severity} label={severityLabel[l.severity]} />,
    <span key="i" style={{ fontFamily: fonts.latin, fontSize: 11.5, color: colors.ink.muted }}>{l.ip}</span>,
  ]);

  return (
    <AdminShell active="audit" title="سجل المراجعة" breadcrumb={["لوحة التحكم", "سجل المراجعة"]}>
      <div style={{ ...card, padding: 18, marginBottom: 16, display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["الكل", "Super Admin", "Moderator", "Support", "System"].map((t, i) => (
            <span key={t} style={{ padding: "8px 14px", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12.5, fontWeight: i === 0 ? 700 : 500, background: i === 0 ? colors.brand.green : colors.surface.white, color: i === 0 ? "#fff" : colors.ink.body, border: `1px solid ${i === 0 ? colors.brand.green : colors.border.default}`, cursor: "pointer" }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ height: 38, padding: "0 14px", background: colors.surface.white, color: colors.ink.body, border: `1px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><Filter size={14} /> فلتر بالعملية</button>
          <button style={{ height: 38, padding: "0 14px", background: colors.surface.white, color: colors.ink.body, border: `1px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><FileSignature size={14} /> تصدير السجل</button>
          <button style={{ height: 38, padding: "0 14px", background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><Download size={14} /> تنزيل CSV</button>
        </div>
      </div>

      <Table columns={["الوقت", "الأدمن", "الإجراء", "الهدف", "التصنيف", "IP"]} rows={rows as unknown as (string | React.ReactNode)[][]} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.muted }}>
        <span>عرض 1–8 من 1,284 سجلاً</span>
        <div style={{ display: "inline-flex", gap: 4 }}>
          <button style={{ width: 32, height: 32, background: colors.surface.white, border: `1px solid ${colors.border.default}`, borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><ChevronRight size={13} /></button>
          {[1, 2, 3, "…", 161].map((n, i) => (
            <button key={i} style={{ minWidth: 32, height: 32, padding: "0 10px", background: n === 1 ? colors.brand.green : colors.surface.white, color: n === 1 ? "#fff" : colors.ink.body, border: `1px solid ${n === 1 ? colors.brand.green : colors.border.default}`, borderRadius: 8, fontFamily: fonts.latin, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{n}</button>
          ))}
          <button style={{ width: 32, height: 32, background: colors.surface.white, border: `1px solid ${colors.border.default}`, borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><ChevronLeft size={13} /></button>
        </div>
      </div>
    </AdminShell>
  );
}
