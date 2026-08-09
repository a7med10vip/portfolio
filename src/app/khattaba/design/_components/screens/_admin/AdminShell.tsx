import type { CSSProperties, ReactNode } from "react";
import { BarChart3, Users, MessageCircle, Wallet, Activity, Ban, Settings, FileText, FileSignature, Bell, Search, ChevronLeft } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow } from "../../tokens";
import { BrandWordmark } from "../_marketing/deco";

/* Admin chrome — RTL sidebar (right) + topbar + content. Items match the proposal A01–A09 + system Navigation. */

export type AdminKey = "dashboard" | "members" | "chats" | "payments" | "reports" | "banned" | "settings" | "content" | "audit" | null;

const sidebarItems: { key: AdminKey; icon: typeof BarChart3; label: string; badge?: number }[] = [
  { key: "dashboard", icon: BarChart3, label: "لوحة التحكم" },
  { key: "members", icon: Users, label: "الأعضاء", badge: 28 },
  { key: "chats", icon: MessageCircle, label: "المحادثات" },
  { key: "payments", icon: Wallet, label: "المدفوعات" },
  { key: "reports", icon: Activity, label: "التقارير" },
  { key: "banned", icon: Ban, label: "الكلمات المحظورة" },
  { key: "settings", icon: Settings, label: "الإعدادات" },
  { key: "content", icon: FileText, label: "إدارة المحتوى" },
  { key: "audit", icon: FileSignature, label: "سجل المراجعة" },
];

function Sidebar({ active }: { active: AdminKey }) {
  return (
    <aside style={{ width: 248, flexShrink: 0, background: colors.surface.white, borderInlineEnd: `1px solid ${colors.border.soft}`, display: "flex", flexDirection: "column", padding: "20px 14px" }}>
      <div style={{ padding: "0 10px 18px 10px", borderBottom: `1px solid ${colors.border.soft}`, marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
        <div>
          <BrandWordmark size="sm" />
          <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, marginTop: 3 }}>لوحة الإدارة</div>
        </div>
      </div>
      {sidebarItems.map(({ key, icon: Icon, label, badge }) => {
        const isActive = key === active;
        return (
          <div key={String(key)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: radius.sm, background: isActive ? colors.brand.greenSoft : "transparent", color: isActive ? colors.brand.greenDark : colors.ink.body, fontFamily: fonts.body, fontSize: 13.5, fontWeight: isActive ? 700 : 500, cursor: "pointer", marginBottom: 2 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <Icon size={16} color={isActive ? colors.brand.green : colors.ink.muted} /> {label}
            </span>
            {badge && (
              <span style={{ padding: "2px 7px", background: isActive ? colors.brand.green : colors.surface.page, color: isActive ? "#fff" : colors.ink.muted, fontFamily: fonts.latin, fontSize: 10.5, fontWeight: 700, borderRadius: 999 }}>{badge}</span>
            )}
          </div>
        );
      })}
    </aside>
  );
}

function Topbar({ title, breadcrumb, role = "Super Admin" }: { title: string; breadcrumb?: string[]; role?: string }) {
  return (
    <header style={{ height: 64, background: colors.surface.white, borderBottom: `1px solid ${colors.border.soft}`, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
      <div>
        <h1 style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.black, margin: 0 }}>{title}</h1>
        {breadcrumb && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginTop: 2 }}>
            {breadcrumb.map((b, i) => (
              <span key={b} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: i === breadcrumb.length - 1 ? colors.ink.body : colors.ink.muted, fontWeight: i === breadcrumb.length - 1 ? 700 : 500 }}>{b}</span>
                {i < breadcrumb.length - 1 && <ChevronLeft size={11} />}
              </span>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }} />
          <input style={{ width: 280, height: 38, paddingInlineStart: 36, paddingInlineEnd: 14, background: colors.surface.page, border: `1px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, color: colors.ink.body, outline: "none", direction: "rtl" }} placeholder="ابحث في الأعضاء، المعاملات..." />
        </div>
        <button style={{ width: 38, height: 38, borderRadius: radius.md, background: colors.surface.page, border: `1px solid ${colors.border.default}`, position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Bell size={16} color={colors.ink.body} />
          <span style={{ position: "absolute", top: -3, left: -3, minWidth: 16, height: 16, padding: "0 4px", background: colors.accent.red, color: "#fff", borderRadius: 999, fontSize: 9, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", border: `2px solid ${colors.surface.white}`, fontFamily: fonts.latin }}>
            5
          </span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 10px", border: `1px solid ${colors.border.default}`, borderRadius: radius.md }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: colors.brand.green, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.heading, fontSize: 13, fontWeight: 700 }}>أ</div>
          <div>
            <div style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: colors.ink.black }}>أحمد</div>
            <div style={{ fontFamily: fonts.body, fontSize: 10, color: colors.brand.green, fontWeight: 700 }}>{role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function AdminShell({ active, title, breadcrumb, role, children }: { active: AdminKey; title: string; breadcrumb?: string[]; role?: string; children: ReactNode }) {
  return (
    <div style={{ width: "100%", minHeight: "100%", background: colors.surface.page, fontFamily: fonts.body, display: "flex" }}>
      <Sidebar active={active} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar title={title} breadcrumb={breadcrumb} role={role} />
        <div style={{ flex: 1, padding: 28, overflow: "hidden" }}>{children}</div>
      </div>
    </div>
  );
}

export const card: CSSProperties = { background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, boxShadow: shadow.sm };

/* KPI card */
export function KpiCard({ icon: Icon, label, value, trend, color }: { icon: typeof BarChart3; label: string; value: string; trend?: string; color: string }) {
  return (
    <div style={{ ...card, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: 42, height: 42, borderRadius: radius.md, background: `${color}14`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={20} color={color} />
        </div>
        {trend && (
          <span style={{ fontFamily: fonts.latin, fontSize: 11, fontWeight: 700, color: colors.brand.green, display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", background: colors.brand.greenSoft, borderRadius: 6 }}>{trend}</span>
        )}
      </div>
      <div>
        <div style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 700, color: colors.ink.black, lineHeight: 1 }}>{value}</div>
        <div style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.muted, marginTop: 5 }}>{label}</div>
      </div>
    </div>
  );
}

/* Table */
export function Table({ columns, rows }: { columns: string[]; rows: (string | ReactNode)[][] }) {
  return (
    <div style={{ ...card, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns.length}, 1fr)`, padding: "14px 22px", background: colors.surface.page, borderBottom: `1px solid ${colors.border.soft}`, fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.ink.muted }}>
        {columns.map((c) => <div key={c}>{c}</div>)}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: `repeat(${columns.length}, 1fr)`, padding: "14px 22px", borderBottom: i === rows.length - 1 ? "none" : `1px solid ${colors.border.soft}`, fontFamily: fonts.body, fontSize: 13, color: colors.ink.body, alignItems: "center" }}>
          {r.map((cell, j) => <div key={j} style={{ minWidth: 0 }}>{cell}</div>)}
        </div>
      ))}
    </div>
  );
}

export function StatusPill({ kind, label }: { kind: "success" | "warn" | "danger" | "neutral" | "info"; label: string }) {
  const map = {
    success: { c: colors.brand.green, b: colors.brand.greenSoft },
    warn: { c: colors.accent.amber, b: colors.accent.amberSoft },
    danger: { c: colors.accent.red, b: colors.accent.redSoft },
    neutral: { c: colors.ink.muted, b: colors.surface.page },
    info: { c: colors.accent.blue, b: colors.accent.blueSoft },
  } as const;
  const m = map[kind];
  return <span style={{ display: "inline-flex", padding: "3px 10px", borderRadius: radius.full, background: m.b, color: m.c, fontFamily: fonts.body, fontSize: 11.5, fontWeight: 700 }}>{label}</span>;
}
