import { Search, SlidersHorizontal, Heart, BadgeCheck, MapPin } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader, HeaderBellAvatar, MobileTabs } from "./_mobile/MobileApp";

/* MP06 · البحث والتصفّح (موبايل) */
const profiles = [
  { name: "نورة العتيبي", age: 27, city: "الرياض", tribe: "عتيبة", avatar: "/khattaba/avatars/niqab-woman-brown.png", tag: undefined as string | undefined, marital: "عزباء", edu: "بكالوريوس" },
  { name: "سارة الغامدي", age: 25, city: "جدة", tribe: "غامد", avatar: "/khattaba/avatars/niqab-woman-blue.png", tag: undefined, marital: "عزباء", edu: "ماجستير" },
  { name: "ريم القحطاني", age: 30, city: "الدمام", tribe: "قحطان", avatar: "/khattaba/avatars/niqab-woman-brown.png", tag: "تقبل المسيار", marital: "مطلّقة", edu: "ثانوي" },
  { name: "لطيفة الحربي", age: 29, city: "مكة", tribe: "حرب", avatar: "/khattaba/avatars/niqab-woman-blue.png", tag: undefined, marital: "عزباء", edu: "بكالوريوس" },
];

export default function MP06BrowseMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader right={<HeaderBellAvatar />} />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "14px 16px 10px" }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: colors.ink.black, margin: 0 }}>تصفّح</h1>
          <p style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginTop: 3 }}>١٢٤ عضوة متاحة</p>
        </div>

        <div style={{ display: "flex", gap: 8, padding: "0 16px 12px" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }} />
            <input style={{ width: "100%", height: 42, paddingInlineStart: 34, paddingInlineEnd: 12, background: "#fff", border: `1px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 12.5, outline: "none", direction: "rtl" }} placeholder="ابحث..." />
          </div>
          <button style={{ width: 42, height: 42, background: "#fff", color: colors.ink.body, border: `1px solid ${colors.border.default}`, borderRadius: radius.md, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><SlidersHorizontal size={15} /></button>
        </div>

        <div style={{ flex: 1, padding: "0 16px 12px", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
          {profiles.map((p) => (
            <div key={p.name} style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 12, display: "flex", alignItems: "center", gap: 12, boxShadow: shadow.sm }}>
              <img src={p.avatar} alt={p.name} style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>{p.name} · {p.age}</span>
                  <BadgeCheck size={12} color={colors.brand.green} />
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, marginTop: 2 }}><MapPin size={10} /> {p.city} · {p.tribe}</div>
                <div style={{ fontFamily: fonts.body, fontSize: 10.5, color: colors.ink.muted, marginTop: 2 }}>{p.marital} · {p.edu}</div>
                {p.tag && <span style={{ display: "inline-block", padding: "2px 7px", background: colors.brand.highlightSoft, color: colors.brand.greenDark, borderRadius: 4, fontFamily: fonts.body, fontSize: 9.5, fontWeight: 700, marginTop: 4, border: `1px solid ${colors.brand.highlight}` }}>{p.tag}</span>}
              </div>
              <button style={{ width: 38, height: 38, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Heart size={15} /></button>
            </div>
          ))}
        </div>
      </div>
      <MobileTabs active="search" />
    </MobileScreen>
  );
}
