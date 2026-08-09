import type { ReactNode } from "react";
import { Heart, Flag, MapPin, BadgeCheck, ShieldCheck, Quote, Share, WhatsApp, XLogo, Instagram, LinkSimple } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, palette } from "../../tokens";
import { CoreShell, coreWrap, stateBadge, type CoreNav, type MemberState } from "./CoreShell";
import { FloralScatter } from "../_marketing/deco";

const avatarByIndex = ["/avatars/saudi-male.jpeg", "/khattaba/avatars/niqab-woman-brown.png", "/avatars/saudi-male-2.jpeg", "/khattaba/avatars/niqab-woman-blue.png"];

export type Attr = { icon: typeof Heart; label: string; value: string };
export type Section = { title: string; items: Attr[] };
export type FullProfile = {
  id: string;
  name: string;
  age: number;
  city: string;
  tribe: string;
  branch?: string;
  avatarIndex: number;
  online?: boolean;
  tags?: string[];
  state?: MemberState;
  about: string;
  quickFacts: Attr[];
  sections: Section[];
};

function SectionCard({ title, items }: Section) {
  return (
    <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 24, boxShadow: shadow.sm }}>
      <h3 style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.black, margin: "0 0 16px" }}>{title}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.label} style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: radius.md, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={18} color={colors.brand.green} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted }}>{it.label}</div>
                <div style={{ fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, color: colors.ink.black, marginTop: 2, lineHeight: 1.5 }}>{it.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProfileView({ p, active = "browse", own = false, ownActions }: { p: FullProfile; active?: CoreNav; own?: boolean; ownActions?: ReactNode }) {
  const sb = stateBadge(p.state, p.avatarIndex % 2 === 1);
  return (
    <CoreShell active={active}>
      <div style={{ ...coreWrap, padding: "28px 28px 40px" }}>
        {/* header */}
        <div style={{ position: "relative", overflow: "hidden", background: palette.purple[800], borderRadius: radius.xl, padding: 28, display: "flex", gap: 24, alignItems: "center", marginBottom: 22 }}>
          <FloralScatter scale={0.8} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ position: "relative" }}>
              <img src={avatarByIndex[p.avatarIndex % avatarByIndex.length]} alt={p.name} style={{ width: 108, height: 108, borderRadius: "50%", objectFit: "cover", border: `4px solid rgba(255,255,255,0.15)`, background: "#fff" }} />
              <span style={{ position: "absolute", bottom: 4, insetInlineEnd: 4, width: 26, height: 26, borderRadius: "50%", background: colors.brand.green, display: "inline-flex", alignItems: "center", justifyContent: "center", border: `2px solid ${palette.purple[800]}` }}>
                <BadgeCheck size={14} color="#fff" />
              </span>
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 1, flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h1 style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 700, color: "#fff", margin: 0 }}>{p.name} · {p.age}</h1>
              {sb && (
                <span title="تتحدّث تلقائياً حسب حالة مشروع الخطبة" style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 13px", borderRadius: radius.full, background: sb.fg, color: "#fff", fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} /> {sb.label}
                </span>
              )}
              {p.online && <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.brand.highlight }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: colors.brand.highlight }} /> متاح الآن</span>}
            </div>
            {sb && <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: palette.purple[200], marginTop: 6 }}>تتحدّث حالة العضوية تلقائياً حسب حالة مشروع الخطبة (مخطوبة/خاطب حالياً عند الدخول في مشروع، وتُزال عند فشله، ومتزوج/ة عند إتمامه).</div>}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: palette.purple[200], fontSize: 14, fontFamily: fonts.body, marginTop: 8 }}>
              <MapPin size={14} /> {p.city} · {p.tribe}{p.branch ? ` (${p.branch})` : ""}
              <span style={{ fontFamily: fonts.latin, opacity: 0.7, marginInlineStart: 8 }}>{p.id}</span>
            </div>
            {p.tags && p.tags.length > 0 && (
              <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                {p.tags.map((t) => (
                  <span key={t} style={{ padding: "5px 14px", background: "rgba(251,192,226,0.12)", border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.brand.highlight }}>{t}</span>
                ))}
              </div>
            )}
          </div>
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 10, width: 200 }}>
            {own ? (
              ownActions
            ) : (
              <>
                <button style={{ height: 50, background: colors.brand.highlight, color: palette.purple[800], border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Heart size={17} /> أتقدم بطلب الخطبة
                </button>
                <button style={{ height: 44, background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Flag size={15} /> إبلاغ
                </button>
              </>
            )}
          </div>
        </div>

        {/* body */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 22, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 24, boxShadow: shadow.sm }}>
              <Quote size={26} color={colors.brand.green} />
              <p style={{ fontFamily: fonts.body, fontSize: 15, lineHeight: 2, color: colors.ink.body, margin: "10px 0 0" }}>{p.about}</p>
            </div>
            {p.sections.map((s) => (
              <SectionCard key={s.title} title={s.title} items={s.items} />
            ))}
          </div>

          {/* side */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 22, boxShadow: shadow.sm }}>
              <h3 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black, margin: "0 0 16px" }}>نظرة سريعة</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {p.quickFacts.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: fonts.body, fontSize: 13, color: colors.ink.muted }}><Icon size={15} color={colors.brand.green} /> {f.label}</span>
                      <span style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>{f.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ background: colors.brand.greenSoft, border: `1px solid ${colors.brand.green}30`, borderRadius: radius.lg, padding: 18, display: "flex", gap: 12 }}>
              <ShieldCheck size={20} color={colors.brand.green} style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.7, color: colors.ink.body, margin: 0 }}>
                خصوصية محفوظة — لا تُعرض صور حقيقية، والتواصل يتم داخل المنصة تحت إشراف الإدارة.
              </p>
            </div>

            {/* مشاركة الحساب */}
            <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 18, boxShadow: shadow.sm }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Share size={17} color={colors.brand.green} />
                <h3 style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black, margin: 0 }}>مشاركة الحساب</h3>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {[{ icon: WhatsApp, c: "#25D366" }, { icon: XLogo, c: colors.ink.black }, { icon: Instagram, c: "#E1306C" }, { icon: LinkSimple, c: colors.brand.green }].map(({ icon: Ic, c }, i) => (
                  <span key={i} style={{ flex: 1, height: 40, borderRadius: radius.md, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: colors.surface.page }}>
                    <Ic size={18} color={c} />
                  </span>
                ))}
              </div>
              <p style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, margin: "10px 0 0", lineHeight: 1.6 }}>شارك رابط هذا الحساب عبر وسائل التواصل أو انسخ الرابط مباشرة.</p>
            </div>
          </div>
        </div>
      </div>
    </CoreShell>
  );
}
