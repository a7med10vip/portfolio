import { Filter, Plus, Eye, MoreVertical, ChevronLeft, ChevronRight, Download } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { AdminShell, card, StatusPill, Table } from "./_admin/AdminShell";

/* A02a · إدارة الأعضاء — قائمة + بحث + فلترة */

const members = [
  { name: "محمد الأحمدي", id: "#KH-2087", avatar: "/avatars/saudi-male.jpeg", status: "active", fee: "1,500 ر.س", last: "اليوم 11:22", joined: "12 يناير 2026" },
  { name: "نورة العتيبي", id: "#KH-1042", avatar: "/khattaba/avatars/niqab-woman-brown.png", status: "active", fee: "1,200 ر.س", last: "اليوم 10:08", joined: "5 فبراير 2026" },
  { name: "خالد الدوسري", id: "#KH-2154", avatar: "/avatars/saudi-male-2.jpeg", status: "pending", fee: "—", last: "—", joined: "اليوم" },
  { name: "ريم القحطاني", id: "#KH-1071", avatar: "/khattaba/avatars/niqab-woman-blue.png", status: "active", fee: "1,800 ر.س", last: "أمس 18:45", joined: "20 يناير 2026" },
  { name: "فهد الحربي", id: "#KH-2208", avatar: "/avatars/saudi-male.jpeg", status: "banned", fee: "—", last: "قبل أسبوع", joined: "8 ديسمبر 2025" },
  { name: "لطيفة الغامدي", id: "#KH-1090", avatar: "/khattaba/avatars/niqab-woman-brown.png", status: "rejected", fee: "—", last: "—", joined: "3 مارس 2026" },
];

const statusMap = {
  active: { kind: "success" as const, label: "نشط" },
  pending: { kind: "warn" as const, label: "بانتظار المراجعة" },
  banned: { kind: "danger" as const, label: "محظور" },
  rejected: { kind: "neutral" as const, label: "مرفوض" },
};

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <span style={{ padding: "8px 14px", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12.5, fontWeight: active ? 700 : 500, background: active ? colors.brand.green : colors.surface.white, color: active ? "#fff" : colors.ink.body, border: `1px solid ${active ? colors.brand.green : colors.border.default}`, cursor: "pointer" }}>{label}</span>
  );
}

export default function A02aMembersList() {
  const rows = members.map((m) => [
    (
      <div key="n" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src={m.avatar} alt={m.name} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
        <div>
          <div style={{ fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, color: colors.ink.black }}>{m.name}</div>
          <div style={{ fontFamily: fonts.latin, fontSize: 11, color: colors.ink.muted }}>{m.id}</div>
        </div>
      </div>
    ),
    <StatusPill key="s" kind={statusMap[m.status as keyof typeof statusMap].kind} label={statusMap[m.status as keyof typeof statusMap].label} />,
    <span key="f" style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.body }}>{m.fee}</span>,
    <span key="l" style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.muted }}>{m.last}</span>,
    <span key="j" style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.muted }}>{m.joined}</span>,
    (
      <div key="a" style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
        <button style={{ width: 32, height: 32, borderRadius: 8, background: colors.surface.page, color: colors.ink.body, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Eye size={14} /></button>
        <button style={{ width: 32, height: 32, borderRadius: 8, background: colors.surface.page, color: colors.ink.body, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><MoreVertical size={14} /></button>
      </div>
    ),
  ] as const);

  return (
    <AdminShell active="members" title="إدارة الأعضاء" breadcrumb={["لوحة التحكم", "إدارة الأعضاء"]}>
      <div style={{ ...card, padding: 18, marginBottom: 16, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <FilterChip label="الكل · 2,458" active />
          <FilterChip label="نشط · 2,186" />
          <FilterChip label="بانتظار المراجعة · 28" />
          <FilterChip label="محظور · 42" />
          <FilterChip label="مرفوض · 202" />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ height: 38, padding: "0 14px", background: colors.surface.white, color: colors.ink.body, border: `1px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><Filter size={14} /> فلاتر إضافية</button>
          <button style={{ height: 38, padding: "0 14px", background: colors.surface.white, color: colors.ink.body, border: `1px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><Download size={14} /> تصدير</button>
          <button style={{ height: 38, padding: "0 14px", background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><Plus size={14} /> إضافة أدمن</button>
        </div>
      </div>

      <Table columns={["العضو", "الحالة", "رسوم الاشتراك", "آخر دخول", "تاريخ الانضمام", "إجراءات"]} rows={rows as unknown as (string | React.ReactNode)[][]} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.muted }}>
        <span>عرض 1–6 من 2,458 عضواً</span>
        <div style={{ display: "inline-flex", gap: 4 }}>
          <button style={{ width: 32, height: 32, background: colors.surface.white, border: `1px solid ${colors.border.default}`, borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><ChevronRight size={13} /></button>
          {[1, 2, 3, "…", 410].map((n, i) => (
            <button key={i} style={{ minWidth: 32, height: 32, padding: "0 10px", background: n === 1 ? colors.brand.green : colors.surface.white, color: n === 1 ? "#fff" : colors.ink.body, border: `1px solid ${n === 1 ? colors.brand.green : colors.border.default}`, borderRadius: 8, fontFamily: fonts.latin, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{n}</button>
          ))}
          <button style={{ width: 32, height: 32, background: colors.surface.white, border: `1px solid ${colors.border.default}`, borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><ChevronLeft size={13} /></button>
        </div>
      </div>
    </AdminShell>
  );
}
