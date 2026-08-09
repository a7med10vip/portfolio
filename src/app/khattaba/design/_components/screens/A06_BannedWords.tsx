import { Phone, Mail, Hash, Globe, Ban, Shield, Plus, Search, Pencil, Trash2 } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { AdminShell, card, StatusPill, Table } from "./_admin/AdminShell";

/* A06 · إدارة الكلمات والأنماط المحظورة في الشات (مطابق لـ chatFilters في العرض) */

const categories = [
  { icon: Phone, label: "أرقام الهواتف", count: 12, color: colors.accent.amber },
  { icon: Mail, label: "البريد الإلكتروني", count: 3, color: colors.accent.blue },
  { icon: Hash, label: "حسابات السوشيال", count: 18, color: colors.accent.purple },
  { icon: Globe, label: "الروابط (URLs)", count: 6, color: colors.brand.green },
  { icon: Ban, label: "ألفاظ صريحة", count: 142, color: colors.accent.red },
  { icon: Shield, label: "تطرّف ديني", count: 24, color: palette800() },
];

function palette800() { return "#2A1322"; }

const items = [
  { kind: "نمط (Regex)", value: "/\\b0?5\\d{8}\\b/", category: "أرقام الهواتف", hits: 482, status: "success" as const },
  { kind: "نمط (Regex)", value: "/\\S+@\\S+\\.\\S+/", category: "البريد الإلكتروني", hits: 91, status: "success" as const },
  { kind: "نمط (Regex)", value: "/(instagram|snap|tiktok|twitter)\\.com\\/[a-z0-9._-]+/", category: "حسابات السوشيال", hits: 217, status: "success" as const },
  { kind: "نمط (Regex)", value: "/https?:\\/\\/\\S+/", category: "الروابط", hits: 88, status: "success" as const },
  { kind: "كلمة", value: "كلمة محظورة #1", category: "ألفاظ صريحة", hits: 36, status: "success" as const },
  { kind: "كلمة", value: "عبارة محظورة #1", category: "تطرّف ديني", hits: 14, status: "warn" as const },
];

const statusLabel: Record<string, string> = { success: "نشط", warn: "مراجعة" };

export default function A06BannedWords() {
  const rows = items.map((it) => [
    <span key="k" style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>{it.kind}</span>,
    <span key="v" style={{ fontFamily: fonts.latin, fontSize: 12.5, fontWeight: 700, color: colors.ink.black, background: colors.surface.page, padding: "3px 8px", borderRadius: 6, direction: "ltr", display: "inline-block" }}>{it.value}</span>,
    <span key="c" style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.body }}>{it.category}</span>,
    <span key="h" style={{ fontFamily: fonts.latin, fontSize: 12, fontWeight: 700, color: colors.brand.green }}>{it.hits}</span>,
    <StatusPill key="s" kind={it.status} label={statusLabel[it.status]} />,
    (
      <div key="a" style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
        <button style={{ width: 30, height: 30, borderRadius: 7, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Pencil size={13} color={colors.ink.body} /></button>
        <button style={{ width: 30, height: 30, borderRadius: 7, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Trash2 size={13} color={colors.accent.red} /></button>
      </div>
    ),
  ]);

  return (
    <AdminShell active="banned" title="الكلمات والأنماط المحظورة" breadcrumb={["لوحة التحكم", "الكلمات المحظورة"]}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 18 }}>
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} style={{ ...card, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: radius.md, background: `${c.color}14`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={16} color={c.color} />
              </div>
              <div>
                <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted }}>{c.label}</div>
                <div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.black, marginTop: 2 }}>{c.count}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ ...card, padding: 18, marginBottom: 16, display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
          <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }} />
          <input style={{ width: "100%", height: 40, paddingInlineStart: 36, background: colors.surface.page, border: `1px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, color: colors.ink.body, outline: "none", direction: "rtl" }} placeholder="ابحث في الكلمات والأنماط..." />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ height: 40, padding: "0 16px", background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><Plus size={15} /> إضافة كلمة / نمط</button>
        </div>
      </div>

      <Table columns={["النوع", "القيمة", "الفئة", "عدد الحجوبات", "الحالة", "إجراءات"]} rows={rows as unknown as (string | React.ReactNode)[][]} />
    </AdminShell>
  );
}
