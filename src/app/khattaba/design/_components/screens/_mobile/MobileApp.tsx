import type { CSSProperties, ReactNode } from "react";
import { ChevronRight, Bell, Home, Search, Heart, MessageCircle, User } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../tokens";
import { BrandWordmark } from "../_marketing/deco";

/* MobileApp shell — header + scrollable content + optional bottom tabs.
 * Used for authenticated app screens (mirrors web Core screens for mobile). */

export type MobileTab = "home" | "search" | "requests" | "chat" | "account" | null;

const tabs: { key: MobileTab; icon: typeof Home; label: string; badge?: number }[] = [
  { key: "home", icon: Home, label: "الرئيسية" },
  { key: "search", icon: Search, label: "البحث" },
  { key: "requests", icon: Heart, label: "طلباتي", badge: 3 },
  { key: "chat", icon: MessageCircle, label: "الشات" },
  { key: "account", icon: User, label: "حسابي" },
];

export function MobileTabs({ active }: { active: MobileTab }) {
  return (
    <div style={{ background: "#fff", borderTop: `1px solid ${colors.border.soft}`, padding: "8px 8px 22px", display: "flex", justifyContent: "space-around", flexShrink: 0 }}>
      {tabs.map(({ key, icon: Icon, label, badge }) => {
        const isActive = key === active;
        return (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "6px 8px" }}>
            <div style={{ position: "relative" }}>
              <Icon size={23} weight={isActive ? "fill" : "bold"} color={isActive ? colors.brand.green : colors.ink.body} />
              {badge && (
                <span style={{ position: "absolute", top: -4, insetInlineEnd: -4, minWidth: 16, height: 16, padding: "0 4px", background: colors.accent.red, color: "#fff", borderRadius: 999, fontSize: 9, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.latin }}>{badge}</span>
              )}
            </div>
            <span style={{ fontFamily: fonts.body, fontSize: 10, fontWeight: isActive ? 700 : 600, color: isActive ? colors.brand.green : colors.ink.body }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function MobileHeader({ title, back = false, right, sticky = true }: { title?: string; back?: boolean; right?: ReactNode; sticky?: boolean }) {
  return (
    <header style={{ height: 56, background: colors.surface.white, borderBottom: `1px solid ${colors.border.soft}`, padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, position: sticky ? "relative" : undefined }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {back && (
          <button style={{ width: 36, height: 36, borderRadius: radius.md, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ChevronRight size={16} color={colors.ink.body} />
          </button>
        )}
        {!back && (
          <BrandWordmark size="sm" />
        )}
        {title && <span style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black }}>{title}</span>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>{right}</div>
    </header>
  );
}

export function HeaderBellAvatar() {
  return (
    <>
      <button style={{ width: 36, height: 36, borderRadius: radius.md, background: colors.surface.page, border: `1px solid ${colors.border.default}`, position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <Bell size={14} color={colors.ink.body} />
        <span style={{ position: "absolute", top: -3, left: -3, minWidth: 15, height: 15, padding: "0 3px", background: colors.accent.red, color: "#fff", borderRadius: 999, fontSize: 9, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", border: `2px solid #fff`, fontFamily: fonts.latin }}>5</span>
      </button>
      <img src="/avatars/saudi-male.jpeg" alt="حسابي" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: `1.5px solid ${colors.border.default}` }} />
    </>
  );
}

export function MobileApp({ active, header, children, padTop = 50 }: { active?: MobileTab; header?: ReactNode; children: ReactNode; padTop?: number }) {
  return (
    <div style={{ width: "100%", height: "100%", background: colors.surface.page, fontFamily: fonts.body, display: "flex", flexDirection: "column", paddingTop: padTop, overflow: "hidden" }}>
      {header}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>{children}</div>
      {active !== undefined && <MobileTabs active={active ?? null} />}
    </div>
  );
}

export function MobileSection({ children, pad = 16 }: { children: ReactNode; pad?: number }) {
  return <div style={{ padding: pad, flex: 1, overflow: "hidden" }}>{children}</div>;
}

export const mInputBase: CSSProperties = {
  height: 46,
  padding: "0 14px",
  fontFamily: fonts.body,
  fontSize: 14,
  color: colors.ink.body,
  background: colors.surface.white,
  border: `1.5px solid ${colors.border.default}`,
  borderRadius: radius.md,
  outline: "none",
  width: "100%",
  direction: "rtl",
};

export function MField({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body }}>{label}</label>
      {children}
      {hint && <span style={{ fontFamily: fonts.body, fontSize: 10.5, color: colors.ink.muted }}>{hint}</span>}
    </div>
  );
}

export function MPrimaryButton({ children }: { children: ReactNode }) {
  return (
    <button style={{ width: "100%", height: 50, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>{children}</button>
  );
}
