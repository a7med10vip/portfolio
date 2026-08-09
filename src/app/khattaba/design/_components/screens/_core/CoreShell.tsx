import type { CSSProperties, ReactNode } from "react";
import { Bell, Heart, BadgeCheck, MapPin, GraduationCap, Briefcase, Eye, Moon } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow } from "../../tokens";
import { BrandWordmark } from "../_marketing/deco";

/* App chrome for authenticated Core screens — top navbar matching the design system. */

export type CoreNav = "home" | "browse" | "requests" | "chat" | "wallet" | null;

const links: { key: CoreNav; label: string }[] = [
  { key: "home", label: "الرئيسية" },
  { key: "browse", label: "تصفّح" },
  { key: "requests", label: "طلباتي" },
  { key: "chat", label: "الشات" },
  { key: "wallet", label: "محفظتي" },
];

export function CoreNavbar({ active = null }: { active?: CoreNav }) {
  return (
    <header style={{ height: 66, background: colors.surface.white, borderBottom: `1px solid ${colors.border.soft}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0 }}>
      <BrandWordmark size="md" />

      <nav style={{ display: "flex", gap: 26, fontFamily: fonts.body, fontSize: 14 }}>
        {links.map((l) => (
          <span key={l.key} style={{ position: "relative", padding: "4px 0", color: l.key === active ? colors.brand.green : colors.ink.body, fontWeight: l.key === active ? 700 : 500, cursor: "pointer" }}>
            {l.label}
            {l.key === active && <span style={{ position: "absolute", bottom: -6, insetInlineStart: "50%", transform: "translateX(50%)", width: 22, height: 3, background: colors.brand.green, borderRadius: 2 }} />}
          </span>
        ))}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button style={{ width: 38, height: 38, borderRadius: radius.md, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" }}>
          <Bell size={16} color={colors.ink.body} />
          <span style={{ position: "absolute", top: -3, left: -3, minWidth: 16, height: 16, padding: "0 4px", background: colors.accent.red, color: "#fff", borderRadius: 999, fontSize: 9, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", border: `2px solid ${colors.surface.white}`, fontFamily: fonts.latin }}>
            3
          </span>
        </button>
        <img src="/avatars/saudi-male.jpeg" alt="حسابي" style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: `2px solid ${colors.border.default}`, cursor: "pointer" }} />
      </div>
    </header>
  );
}

export function CoreShell({ active = null, children }: { active?: CoreNav; children: ReactNode }) {
  return (
    <div style={{ width: "100%", minHeight: "100%", background: colors.surface.page, fontFamily: fonts.body, display: "flex", flexDirection: "column" }}>
      <CoreNavbar active={active} />
      {children}
    </div>
  );
}

export const coreWrap: CSSProperties = { maxWidth: 1180, margin: "0 auto", padding: "0 28px", width: "100%" };

/* Memoji profile card used in the browse grid. */
const avatarByIndex = ["/avatars/saudi-male.jpeg", "/khattaba/avatars/niqab-woman-brown.png", "/avatars/saudi-male-2.jpeg", "/khattaba/avatars/niqab-woman-blue.png"];

/* حالة العضوية — تتغيّر تلقائياً حسب حالة مشروع الخطبة:
 * available (متاح/ة) · engaged (مخطوبة/خاطب حالياً) · married (متزوجة/متزوج). */
export type MemberState = "available" | "engaged" | "married";

export function stateBadge(state: MemberState | undefined, female: boolean): { label: string; fg: string; bg: string; bd: string } | null {
  if (!state || state === "available") return null;
  if (state === "engaged")
    return { label: female ? "مخطوبة" : "خاطب حالياً", fg: colors.accent.amber, bg: colors.accent.amberSoft, bd: `${colors.accent.amber}55` };
  return { label: female ? "متزوجة" : "متزوج", fg: colors.accent.green, bg: colors.accent.greenSoft, bd: `${colors.accent.green}55` };
}

export type Profile = {
  id: string;
  name: string;
  age: number;
  city: string;
  tribe: string;
  marital: string;
  education: string;
  job: string;
  religiosity: string;
  desc: string;
  avatarIndex: number;
  verified?: boolean;
  online?: boolean;
  tag?: string;
  state?: MemberState;
};

function MetaItem({ icon: Icon, value }: { icon: typeof Heart; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
      <Icon size={14} color={colors.brand.green} style={{ flexShrink: 0 }} />
      <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.body, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</span>
    </div>
  );
}

export function ProfileCard({ p }: { p: Profile }) {
  const verified = p.verified ?? true;
  const sb = stateBadge(p.state, p.avatarIndex % 2 === 1);
  return (
    <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, overflow: "hidden", boxShadow: shadow.sm, display: "flex", flexDirection: "column" }}>
      {/* header band */}
      <div style={{ height: 58, background: colors.brand.greenSoft, position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "10px 12px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: fonts.body, fontSize: 10.5, fontWeight: 700, color: p.online ? colors.brand.green : colors.ink.muted }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: p.online ? colors.brand.green : colors.ink.soft }} /> {p.online ? "متاحة" : "غير متصلة"}
        </span>
        <span style={{ fontFamily: fonts.latin, fontSize: 10.5, fontWeight: 700, color: colors.ink.muted, direction: "ltr" }}>{p.id}</span>
      </div>

      {/* avatar overlapping */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 18px 18px", marginTop: -38 }}>
        <div style={{ position: "relative" }}>
          <img src={avatarByIndex[p.avatarIndex % avatarByIndex.length]} alt={p.name} style={{ width: 76, height: 76, borderRadius: "50%", objectFit: "cover", background: colors.surface.white, border: `3px solid ${colors.surface.white}`, boxShadow: shadow.sm }} />
          {verified && (
            <span style={{ position: "absolute", bottom: 0, insetInlineEnd: 0, width: 22, height: 22, borderRadius: "50%", background: colors.brand.green, display: "inline-flex", alignItems: "center", justifyContent: "center", border: `2px solid ${colors.surface.white}` }}>
              <BadgeCheck size={12} color="#fff" />
            </span>
          )}
        </div>

        <div style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: colors.ink.black, marginTop: 10 }}>{p.name} · {p.age}</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 4, color: colors.ink.muted, fontSize: 12, fontFamily: fonts.body, marginTop: 3 }}>
          <MapPin size={12} /> {p.city} · {p.tribe}
        </div>

        {sb && (
          <span style={{ marginTop: 9, padding: "3px 13px", background: sb.bg, color: sb.fg, border: `1px solid ${sb.bd}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: sb.fg }} /> {sb.label}
          </span>
        )}

        {p.tag && (
          <span style={{ marginTop: 10, padding: "4px 12px", background: colors.brand.highlightSoft, color: colors.brand.greenDark, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11, fontWeight: 700, border: `1px solid ${colors.brand.highlight}` }}>{p.tag}</span>
        )}

        {/* meta */}
        <div style={{ width: "100%", marginTop: 14, paddingTop: 14, borderTop: `1px solid ${colors.border.soft}`, display: "flex", flexDirection: "column", gap: 9 }}>
          <MetaItem icon={Heart} value={p.marital} />
          <MetaItem icon={GraduationCap} value={p.education} />
          <MetaItem icon={Briefcase} value={p.job} />
          <MetaItem icon={Moon} value={`التدين: ${p.religiosity}`} />
        </div>

        <p style={{ width: "100%", margin: "12px 0 0", fontFamily: fonts.body, fontSize: 12, lineHeight: 1.7, color: colors.ink.muted, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {p.desc}
        </p>

        {/* actions */}
        <div style={{ width: "100%", display: "flex", gap: 8, marginTop: 16 }}>
          <button style={{ flex: 1, height: 42, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Heart size={14} /> أتقدم بطلب الخطبة
          </button>
          <button style={{ width: 44, height: 42, background: colors.surface.white, color: colors.brand.green, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} title="عرض الملف">
            <Eye size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
