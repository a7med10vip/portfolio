import { Moon, Heart, Baby, Award, GraduationCap, Briefcase, Wallet, Banknote, Car, ShieldCheck, Scale, Globe, Pencil, Settings } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { ProfileView, type FullProfile } from "./_core/ProfileView";

/* P08a · ملفي الشخصي — عرض */
const me: FullProfile = {
  id: "#KH-2087",
  name: "محمد",
  age: 32,
  city: "جدة",
  tribe: "حرب",
  branch: "بني سالم",
  avatarIndex: 0,
  online: true,
  tags: ["زواج تقليدي"],
  about: "موظف حكومي، أبحث عن زوجة صالحة من عائلة محترمة لبناء بيت مستقر قائم على الدين والمودة.",
  quickFacts: [
    { icon: Heart, label: "الحالة", value: "أعزب" },
    { icon: GraduationCap, label: "المؤهل", value: "بكالوريوس" },
    { icon: Briefcase, label: "الوظيفة", value: "مهندس" },
    { icon: Globe, label: "الجنسية", value: "سعودي" },
  ],
  sections: [
    { title: "الدين والقيم", items: [
      { icon: Moon, label: "مستوى التدين", value: "ملتزم" },
      { icon: ShieldCheck, label: "الصلاة", value: "يومياً" },
      { icon: Award, label: "درجة الوسامة", value: "8 / 10" },
      { icon: Globe, label: "العِرق", value: "أسمر" },
    ] },
    { title: "العمل والوضع المادي", items: [
      { icon: Briefcase, label: "بيئة العمل", value: "غير مختلط" },
      { icon: Wallet, label: "الحالة المادية", value: "مقتدر" },
      { icon: Banknote, label: "مستوى الراتب", value: "16,000 – 20,000" },
      { icon: Car, label: "يقود سيارة", value: "نعم" },
    ] },
    { title: "الزواج والأسرة", items: [
      { icon: Scale, label: "نوع الزواج المطلوب", value: "زواج تقليدي" },
      { icon: Baby, label: "مشروع الإنجاب", value: "في أقرب وقت" },
      { icon: Heart, label: "يقبل الزواج من غير سعودية", value: "لا" },
      { icon: Wallet, label: "نفقة سابقة", value: "لا يوجد" },
    ] },
  ],
};

export default function P08aMyProfile() {
  return (
    <ProfileView
      p={me}
      active={null}
      own
      ownActions={
        <>
          <button style={{ height: 50, background: colors.brand.highlight, color: palette.purple[800], border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Pencil size={16} /> تعديل الملف
          </button>
          <button style={{ height: 44, background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Settings size={15} /> الإعدادات
          </button>
        </>
      }
    />
  );
}
