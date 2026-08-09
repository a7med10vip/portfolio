import { Moon, Heart, Baby, Award, GraduationCap, Briefcase, Wallet, Banknote, Car, ShieldCheck, Scale, Globe } from "@/app/khattaba/design/_components/icons";
import { ProfileView, type FullProfile } from "./_core/ProfileView";

/* P07b · صفحة البروفايل — امرأة تشاهد بروفايل رجل (حقول الرجل من العرض) */
const profile: FullProfile = {
  id: "#KH-2087",
  name: "محمد",
  age: 32,
  city: "جدة",
  tribe: "حرب",
  branch: "بني سالم",
  avatarIndex: 0,
  online: false,
  state: "engaged",
  tags: ["زواج تقليدي"],
  about: "موظف حكومي، أبحث عن زوجة صالحة من عائلة محترمة لبناء بيت مستقر قائم على الدين والمودة، وأقدّر الجدية والوضوح.",
  quickFacts: [
    { icon: Heart, label: "الحالة", value: "أعزب" },
    { icon: GraduationCap, label: "المؤهل", value: "بكالوريوس" },
    { icon: Briefcase, label: "الوظيفة", value: "مهندس" },
    { icon: Globe, label: "الجنسية", value: "سعودي" },
  ],
  sections: [
    {
      title: "الدين والقيم",
      items: [
        { icon: Moon, label: "مستوى التدين", value: "ملتزم" },
        { icon: ShieldCheck, label: "الصلاة", value: "يومياً" },
        { icon: Award, label: "درجة الوسامة", value: "8 / 10" },
        { icon: Globe, label: "العِرق", value: "أسمر" },
      ],
    },
    {
      title: "العمل والوضع المادي",
      items: [
        { icon: Briefcase, label: "بيئة العمل", value: "غير مختلط" },
        { icon: Wallet, label: "الحالة المادية", value: "مقتدر" },
        { icon: Banknote, label: "مستوى الراتب", value: "16,000 – 20,000" },
        { icon: Car, label: "يقود سيارة", value: "نعم" },
      ],
    },
    {
      title: "الزواج والأسرة",
      items: [
        { icon: Scale, label: "نوع الزواج المطلوب", value: "زواج تقليدي" },
        { icon: Baby, label: "مشروع الإنجاب", value: "في أقرب وقت" },
        { icon: Heart, label: "يقبل الزواج من غير سعودية", value: "لا" },
        { icon: Wallet, label: "نفقة سابقة", value: "لا يوجد" },
      ],
    },
  ],
};

export default function P07bProfileMan() {
  return <ProfileView p={profile} active="browse" />;
}
