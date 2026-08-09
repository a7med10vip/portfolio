import { Heart, Flag, MapPin, BadgeCheck, Moon, ShieldCheck, GraduationCap, Briefcase, Eye, Users, Baby, Quote } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader } from "./_mobile/MobileApp";

/* MP07 · بروفايل عضو (موبايل · امرأة) */
const facts = [
  { icon: Heart, label: "الحالة", value: "عزباء" },
  { icon: GraduationCap, label: "المؤهل", value: "بكالوريوس" },
  { icon: Briefcase, label: "الوظيفة", value: "معلمة" },
  { icon: Moon, label: "التدين", value: "محافظة" },
  { icon: ShieldCheck, label: "الحجاب", value: "محجبة" },
  { icon: Eye, label: "الشوفة", value: "نعم يوجد" },
  { icon: Users, label: "ولي الأمر", value: "والدي" },
  { icon: Baby, label: "الإنجاب", value: "في أقرب وقت" },
];

export default function MP07ProfileMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader back />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* purple hero */}
        <div style={{ background: palette.purple[800], padding: "20px 20px 24px", borderBottomLeftRadius: 22, borderBottomRightRadius: 22, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ position: "relative", marginBottom: 12 }}>
            <img src="/khattaba/avatars/niqab-woman-brown.png" alt="نورة" style={{ width: 92, height: 92, borderRadius: "50%", objectFit: "cover", border: `3px solid rgba(255,255,255,0.2)`, display: "block" }} />
            <span style={{ position: "absolute", bottom: 2, insetInlineEnd: 2, width: 22, height: 22, borderRadius: "50%", background: colors.brand.green, display: "inline-flex", alignItems: "center", justifyContent: "center", border: `2px solid ${palette.purple[800]}` }}><BadgeCheck size={11} color="#fff" /></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <h1 style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>نورة · 27</h1>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: fonts.body, fontSize: 10.5, fontWeight: 700, color: colors.brand.highlight }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: colors.brand.highlight }} /> متاحة</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, fontFamily: fonts.body, fontSize: 11.5, color: palette.purple[200], marginTop: 6 }}><MapPin size={11} /> الرياض · عتيبة · <span style={{ fontFamily: fonts.latin }}>#KH-1042</span></div>
          <span style={{ marginTop: 10, padding: "4px 12px", background: "rgba(251,192,226,0.12)", border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 10.5, fontWeight: 700, color: colors.brand.highlight }}>تقبل المسيار</span>
        </div>

        {/* about */}
        <div style={{ padding: "16px 16px 8px" }}>
          <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 14 }}>
            <Quote size={16} color={colors.brand.green} />
            <p style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.85, color: colors.ink.body, margin: "5px 0 0" }}>
              أبحث عن شريك حياة ملتزم من عائلة كريمة، يقدّر الاستقرار والاحترام المتبادل.
            </p>
          </div>
        </div>

        {/* facts grid */}
        <div style={{ padding: "0 16px 12px", flex: 1, overflow: "hidden" }}>
          <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {facts.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={13} color={colors.brand.green} /></div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: fonts.body, fontSize: 9.5, color: colors.ink.muted }}>{f.label}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 11.5, fontWeight: 700, color: colors.ink.black }}>{f.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* sticky bottom actions */}
      <div style={{ padding: "10px 16px 22px", borderTop: `1px solid ${colors.border.soft}`, background: "#fff", display: "flex", gap: 8 }}>
        <button style={{ width: 50, height: 48, background: "#fff", color: colors.accent.red, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Flag size={16} /></button>
        <button style={{ flex: 1, height: 48, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}><Heart size={16} /> أتقدم بطلب الخطبة</button>
      </div>
    </MobileScreen>
  );
}
