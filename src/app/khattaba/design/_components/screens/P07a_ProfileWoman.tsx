import { Moon, Heart, Baby, Users, GraduationCap, Briefcase, Wallet, Home, Eye, ShieldCheck, ChefHat, Globe, BadgeCheck } from "@/app/khattaba/design/_components/icons";
import { ProfileView, type FullProfile } from "./_core/ProfileView";

/* P07a · صفحة البروفايل — رجل يشاهد بروفايل امرأة (حقول المرأة من العرض) */
const profile: FullProfile = {
  id: "#KH-1042",
  name: "نورة",
  age: 27,
  city: "الرياض",
  tribe: "عتيبة",
  branch: "الروقة",
  avatarIndex: 1,
  online: true,
  state: "engaged",
  tags: ["تقبل المسيار"],
  about: "أبحث عن شريك حياة ملتزم من عائلة كريمة، يقدّر الاستقرار والاحترام المتبادل، ويسعى لبناء أسرة هادئة قائمة على التفاهم.",
  quickFacts: [
    { icon: Heart, label: "الحالة", value: "عزباء" },
    { icon: GraduationCap, label: "المؤهل", value: "بكالوريوس" },
    { icon: Briefcase, label: "الوظيفة", value: "معلمة" },
    { icon: Globe, label: "الجنسية", value: "سعودية" },
  ],
  sections: [
    {
      title: "الدين والقيم",
      items: [
        { icon: Moon, label: "مستوى التدين", value: "محافظة" },
        { icon: ShieldCheck, label: "الصلاة", value: "يومياً" },
        { icon: ShieldCheck, label: "نوع الحجاب", value: "محجبة" },
        { icon: ShieldCheck, label: "نوع العباءة", value: "عباءة كتف سوداء" },
      ],
    },
    {
      title: "الأسرة والزواج",
      items: [
        { icon: Users, label: "ولي الأمر", value: "والدي" },
        { icon: Eye, label: "الشوفة الشرعية", value: "نعم يوجد" },
        { icon: Baby, label: "مشروع الإنجاب", value: "في أقرب وقت" },
        { icon: Home, label: "مكان العيش بعد الزواج", value: "سكن مستقل" },
      ],
    },
    {
      title: "العمل والوضع المادي",
      items: [
        { icon: Briefcase, label: "بيئة العمل", value: "غير مختلط" },
        { icon: Wallet, label: "الحالة المادية", value: "ميسورة الحال" },
        { icon: ChefHat, label: "الطبخ", value: "تجيد · متنوع" },
        { icon: Globe, label: "العِرق", value: "أبيض" },
      ],
    },
  ],
};

export default function P07aProfileWoman() {
  return <ProfileView p={profile} active="browse" />;
}
