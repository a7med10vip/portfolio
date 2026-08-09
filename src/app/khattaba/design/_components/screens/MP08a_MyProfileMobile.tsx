import { Pencil, Settings, BadgeCheck, Heart, GraduationCap, Briefcase, MapPin, Moon, Award, Wallet } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader, MobileTabs } from "./_mobile/MobileApp";

/* MP08a · ملفي الشخصي (موبايل) */
const facts = [
  { icon: Heart, label: "الحالة", value: "أعزب" },
  { icon: GraduationCap, label: "المؤهل", value: "بكالوريوس" },
  { icon: Briefcase, label: "الوظيفة", value: "مهندس" },
  { icon: Moon, label: "التدين", value: "ملتزم" },
  { icon: Award, label: "الوسامة", value: "8/10" },
  { icon: Wallet, label: "الحالة المادية", value: "مقتدر" },
];

export default function MP08aMyProfileMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader title="ملفي الشخصي" right={<button style={{ width: 36, height: 36, borderRadius: radius.md, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Settings size={15} /></button>} />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ background: palette.purple[800], padding: "22px 20px 24px", textAlign: "center", borderBottomLeftRadius: 22, borderBottomRightRadius: 22 }}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: 10 }}>
            <img src="/avatars/saudi-male.jpeg" alt="محمد" style={{ width: 88, height: 88, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(255,255,255,0.2)" }} />
            <span style={{ position: "absolute", bottom: 2, insetInlineEnd: 2, width: 22, height: 22, borderRadius: "50%", background: colors.brand.green, display: "inline-flex", alignItems: "center", justifyContent: "center", border: `2px solid ${palette.purple[800]}` }}><BadgeCheck size={11} color="#fff" /></span>
          </div>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>محمد الأحمدي · 32</h1>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: fonts.body, fontSize: 11.5, color: palette.purple[200], marginTop: 4 }}>
            <MapPin size={11} /> جدة · حرب · <span style={{ fontFamily: fonts.latin }}>#KH-2087</span>
          </div>
          <div style={{ marginTop: 10 }}>
            <span style={{ padding: "3px 11px", background: "rgba(251,192,226,0.12)", border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 10.5, fontWeight: 700, color: colors.brand.highlight }}>زواج تقليدي</span>
          </div>

          <button style={{ width: "100%", height: 44, marginTop: 16, background: colors.brand.highlight, color: palette.purple[800], border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            <Pencil size={15} /> تعديل الملف
          </button>
        </div>

        <div style={{ flex: 1, padding: "14px 16px", overflow: "hidden" }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black, margin: "0 0 10px" }}>الحقائق الأساسية</h3>
          <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {facts.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} style={{ display: "flex", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={13} color={colors.brand.green} /></div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: fonts.body, fontSize: 9.5, color: colors.ink.muted }}>{f.label}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 11.5, fontWeight: 700, color: colors.ink.black }}>{f.value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ background: colors.brand.greenSoft, border: `1px solid ${colors.brand.green}30`, borderRadius: radius.lg, padding: "12px 14px", marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>اشتراك العضوية</div>
              <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black, marginTop: 2 }}>ساري حتى أول زواج</div>
            </div>
            <BadgeCheck size={22} color={colors.brand.green} />
          </div>
        </div>
      </div>
      <MobileTabs active="account" />
    </MobileScreen>
  );
}
