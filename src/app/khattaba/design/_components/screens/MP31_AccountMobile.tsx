import { BadgeCheck, ChevronLeft, User, Wallet, Heart, Eye, Bell, Settings, BookOpen, Shield, LogOut, Pencil, MapPin, FileText } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader, MobileTabs } from "./_mobile/MobileApp";
import { FloralScatter } from "./_marketing/deco";

/* MP31 · حسابي (قائمة · موبايل) */

type MenuItem = { icon: typeof User; label: string; color: string; sub?: string };
const groups: { title: string; items: MenuItem[] }[] = [
  {
    title: "الحساب",
    items: [
      { icon: User, label: "ملفي الشخصي", color: colors.brand.green },
      { icon: BadgeCheck, label: "الاشتراك", color: colors.accent.purple, sub: "ساري" },
      { icon: Wallet, label: "محفظتي", color: colors.accent.amber, sub: "3,200 ر.س" },
    ],
  },
  {
    title: "النشاط",
    items: [
      { icon: Heart, label: "طلبات الخطبة", color: colors.brand.green, sub: "3" },
      { icon: Eye, label: "من زار ملفي", color: colors.accent.blue, sub: "42" },
      { icon: Bell, label: "الإشعارات", color: colors.accent.amber, sub: "5" },
    ],
  },
  {
    title: "التطبيق",
    items: [
      { icon: Settings, label: "الإعدادات", color: colors.ink.body },
      { icon: BookOpen, label: "دليل الاستخدام", color: colors.ink.body },
      { icon: Shield, label: "الخصوصية والشروط", color: colors.ink.body },
      { icon: FileText, label: "التعهدات والإقرارات", color: colors.ink.body },
    ],
  },
];

export default function MP31AccountMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* user card */}
        <div style={{ margin: "14px 16px 0", background: palette.purple[800], borderRadius: radius.xl, padding: 18, display: "flex", alignItems: "center", gap: 14, position: "relative", overflow: "hidden" }}>
          <FloralScatter scale={0.55} mirror />
          <div style={{ position: "relative", zIndex: 1 }}>
            <img src="/avatars/saudi-male.jpeg" alt="محمد" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.2)" }} />
            <span style={{ position: "absolute", bottom: 0, insetInlineEnd: 0, width: 20, height: 20, borderRadius: "50%", background: colors.brand.green, display: "inline-flex", alignItems: "center", justifyContent: "center", border: `2px solid ${palette.purple[800]}` }}><BadgeCheck size={10} color="#fff" /></span>
          </div>
          <div style={{ flex: 1, position: "relative", zIndex: 1, color: "#fff", minWidth: 0 }}>
            <div style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700 }}>محمد الأحمدي</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: fonts.body, fontSize: 11, color: palette.purple[200], marginTop: 2 }}>
              <MapPin size={10} /> جدة · <span style={{ fontFamily: fonts.latin }}>#KH-2087</span>
            </div>
            <span style={{ display: "inline-block", padding: "2px 10px", background: "rgba(251,192,226,0.14)", border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 10, fontWeight: 700, color: colors.brand.highlight, marginTop: 6 }}>زواج تقليدي</span>
          </div>
          <button style={{ width: 34, height: 34, borderRadius: 8, background: colors.brand.highlight, color: palette.purple[800], border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}><Pencil size={14} /></button>
        </div>

        {/* groups */}
        <div style={{ flex: 1, overflow: "hidden", padding: "16px 16px 12px", display: "flex", flexDirection: "column", gap: 14 }}>
          {groups.map((g) => (
            <div key={g.title}>
              <div style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.ink.muted, paddingInlineStart: 4, marginBottom: 6, letterSpacing: 0.5 }}>{g.title}</div>
              <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, overflow: "hidden" }}>
                {g.items.map((it, i) => (
                  <div key={it.label} style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, borderBottom: i === g.items.length - 1 ? "none" : `1px solid ${colors.border.soft}`, cursor: "pointer" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${it.color}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><it.icon size={15} color={it.color} /></div>
                    <span style={{ flex: 1, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>{it.label}</span>
                    {it.sub && <span style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: it.color === colors.ink.body ? colors.ink.muted : it.color, padding: "2px 9px", background: it.color === colors.ink.body ? colors.surface.page : `${it.color}14`, borderRadius: 999 }}>{it.sub}</span>}
                    <ChevronLeft size={14} color={colors.ink.muted} />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* logout */}
          <button style={{ background: "#fff", border: `1px solid ${colors.accent.red}30`, borderRadius: radius.lg, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, color: colors.accent.red, cursor: "pointer", justifyContent: "center" }}>
            <LogOut size={16} />
            <span style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700 }}>تسجيل الخروج</span>
          </button>

          <div style={{ fontFamily: fonts.latin, fontSize: 10, color: colors.ink.soft, textAlign: "center", paddingTop: 4 }}>الإصدار 1.0.0 · خطّابة السعودية الأولى © 2026</div>
        </div>
      </div>
      <MobileTabs active="account" />
    </MobileScreen>
  );
}
