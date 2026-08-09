import { MarkerType, type Node, type Edge } from "reactflow";
import { canvas, colors } from "../tokens";

export type ScreenKind = "desktop" | "mobile";

export type Screen = {
  code: string;
  title: string;
  groupId: GroupId;
  kind: ScreenKind;
  description?: string;
  /* Content height in px (excludes chrome). Overrides the default for tall
   * pages like marketing screens. Falls back to the canvas default per kind. */
  height?: number;
};

export type GroupId =
  | "marketing"
  | "auth"
  | "discover"
  | "connect"
  | "billing"
  | "account"
  | "admin"
  | "mobile"
  | "mobile-app"
  | "system";

export type Group = {
  id: GroupId;
  order: number;
  /** العنوان العربي — يظهر بالخط العريض في رأس القسم */
  ar: string;
  /** العنوان اللاتيني — يظهر كـ eyebrow صغير مُتباعد الحروف */
  en: string;
  /** سطر وصف قصير يميّز دور القسم */
  tagline: string;
  color: string;
  icon: string;
  cols: number;
};

/* الأقسام مُقسّمة بعناوين شيك مميّزة — كل تدفّق وظيفي في قسم مستقل بلونه الخاص.
 * تم تفكيك "التطبيق" الضخم إلى: الاكتشاف · التواصل · الدفع · الحساب. */
export const groups: Group[] = [
  { id: "marketing",  order: 1,  ar: "التعريف بالمنصة",   en: "Marketing & Landing",  tagline: "صفحات الهبوط والتعريف والسياسات", color: "#F258B4",          icon: "✦", cols: 4 },
  { id: "auth",       order: 2,  ar: "التسجيل والمصادقة",  en: "Onboarding & Auth",    tagline: "الخطوات التعريفية وإنشاء الحساب",  color: "#B82680",          icon: "❶", cols: 5 },
  { id: "discover",   order: 3,  ar: "الاكتشاف والملفات",  en: "Discover & Profiles",  tagline: "التصفّح والفلاتر والملفات الشخصية", color: "#29A631",          icon: "◎", cols: 5 },
  { id: "connect",    order: 4,  ar: "التواصل والمحادثة",  en: "Connect & Chat",       tagline: "الطلبات والمحادثة المراقبة والاتفاقيات", color: "#0EA5A5",      icon: "❤", cols: 5 },
  { id: "billing",    order: 5,  ar: "الدفع والاشتراك",    en: "Billing & Wallet",     tagline: "المدفوعات والمحفظة والاشتراك",     color: "#F59E0B",          icon: "❖", cols: 5 },
  { id: "account",    order: 6,  ar: "الحساب والإشعارات",  en: "Account & Alerts",     tagline: "الملف والإشعارات وإدارة الحساب",   color: "#6366F1",          icon: "◔", cols: 5 },
  { id: "admin",      order: 7,  ar: "لوحة التحكم",        en: "Admin Dashboard",      tagline: "إدارة الأعضاء والمراقبة والتقارير", color: "#DA3D9A",          icon: "⬚", cols: 5 },
  { id: "mobile",     order: 8,  ar: "الجوال — حصري",      en: "Mobile-only",          tagline: "شاشات افتتاحية وتعريفية للتطبيق",   color: "#EAB308",          icon: "▢", cols: 6 },
  { id: "mobile-app", order: 9,  ar: "تطبيق الجوال",       en: "Mobile App",           tagline: "نسخ الجوال من شاشات الويب",        color: "#F97316",          icon: "▣", cols: 6 },
  { id: "system",     order: 10, ar: "شاشات النظام",       en: "System States",        tagline: "أخطاء وصيانة وحالات النظام",       color: colors.ink.muted,   icon: "○", cols: 4 },
];

export const screens: Screen[] = [
  /* ─── Group 1 · Marketing (8) ─── */
  { code: "P01", title: "الرئيسية",            groupId: "marketing", kind: "desktop", description: "Hero + تعريف + مقارنة + CTA تسجيل", height: 5280 },
  { code: "P02", title: "من نحن",              groupId: "marketing", kind: "desktop", description: "نبذة + رؤية + رسالة", height: 3017 },
  { code: "P15", title: "آلية الخطبة",         groupId: "marketing", kind: "desktop", description: "الخطوات المتبعة", height: 2958 },
  { code: "P17", title: "الأسئلة الشائعة",     groupId: "marketing", kind: "desktop", description: "Accordion سؤال/جواب", height: 2058 },
  { code: "P16", title: "اتصل بنا",            groupId: "marketing", kind: "desktop", description: "نموذج تواصل + معلومات", height: 1740 },
  { code: "P12", title: "سياسة الخصوصية وسرية المعلومات",      groupId: "marketing", kind: "desktop", description: "PDPL Compliance", height: 2780 },
  { code: "P13", title: "الشروط والأحكام",     groupId: "marketing", kind: "desktop", description: "شروط الاشتراك والاسترداد", height: 2091 },
  { code: "P14", title: "سياسة الاستخدام وإخلاء المسؤولية",     groupId: "marketing", kind: "desktop", description: "إخلاء المسؤولية", height: 4850 },

  /* ─── Group 2 · Auth (9) ─── */
  { code: "P03a", title: "التسجيل · Step 1",   groupId: "auth", kind: "desktop", description: "أفاتار + بيانات + كلمة مرور", height: 1720 },
  /* الاستبيان مُقسَّم على 4 صفحات لكل جنس بدل شاشة واحدة طويلة */
  { code: "P03b",  title: "استبيان رجل · ١ أساسية", groupId: "auth", kind: "desktop", description: "المعلومات الأساسية — رقم الملف/الاسم/الجنسية/القبيلة/المدينة", height: 2720 },
  { code: "P03b2", title: "استبيان رجل · ٢ أوصاف",  groupId: "auth", kind: "desktop", description: "الأوصاف الشخصية — الطول/الوزن/البشرة/التعليم/الصحة/الأبناء", height: 2720 },
  { code: "P03b3", title: "استبيان رجل · ٣ الحالة", groupId: "auth", kind: "desktop", description: "الحالة والتدين والاستعداد للزواج", height: 2760 },
  { code: "P03b4", title: "استبيان رجل · ٤ الزواج", groupId: "auth", kind: "desktop", description: "الوضع المادي ونوع الزواج والمطلوب في الطرف الآخر", height: 3560 },
  { code: "P03bw",  title: "استبيان امرأة · ١ أساسية", groupId: "auth", kind: "desktop", description: "المعلومات الأساسية — رقم الملف/الاسم/الجنسية/القبيلة/المدينة", height: 2820 },
  { code: "P03bw2", title: "استبيان امرأة · ٢ أوصاف",  groupId: "auth", kind: "desktop", description: "الأوصاف الشخصية — الطول/الوزن/البشرة/التعليم/الصحة/الأبناء", height: 3080 },
  { code: "P03bw3", title: "استبيان امرأة · ٣ الحالة", groupId: "auth", kind: "desktop", description: "الحالة والتدين والحجاب والولي والاستعداد", height: 3120 },
  { code: "P03bw4", title: "استبيان امرأة · ٤ الزواج", groupId: "auth", kind: "desktop", description: "الوضع المادي ونوع الزواج والمطلوب في الطرف الآخر", height: 3980 },
  { code: "P03c", title: "التسجيل · OTP",      groupId: "auth", kind: "desktop", description: "التحقق من رقم الجوال", height: 780 },
  { code: "P03d", title: "التسجيل · في انتظار", groupId: "auth", kind: "desktop", description: "بانتظار مراجعة الإدارة", height: 780 },
  { code: "P03e", title: "التسجيل · مقبول",    groupId: "auth", kind: "desktop", description: "قبول + رابط الدفع", height: 940 },
  { code: "P03f", title: "التسجيل · مرفوض",    groupId: "auth", kind: "desktop", description: "سبب الرفض + استئناف", height: 780 },
  { code: "P04",  title: "تسجيل الدخول",       groupId: "auth", kind: "desktop", description: "جوال + كلمة مرور", height: 780 },
  { code: "P05a", title: "نسيت · إدخال الجوال", groupId: "auth", kind: "desktop", description: "Step 1 — استعادة", height: 780 },
  { code: "P05b", title: "نسيت · OTP + كلمة",  groupId: "auth", kind: "desktop", description: "Step 2 — كلمة مرور جديدة", height: 780 },

  /* ─── Group 3 · الاكتشاف والملفات (Discover) ─── */
  { code: "P06a", title: "البحث · Default",    groupId: "discover", kind: "desktop", description: "Grid افتراضي", height: 1205 },
  { code: "P06b", title: "البحث · فلاتر",      groupId: "discover", kind: "desktop", description: "Sidebar فلاتر مفتوحة (القبيلة...)", height: 1320 },
  { code: "P06c", title: "البحث · Empty",      groupId: "discover", kind: "desktop", description: "لا توجد نتائج", height: 1140 },
  { code: "P07a", title: "البروفايل · ♂ → ♀",   groupId: "discover", kind: "desktop", description: "رجل يشاهد بروفايل امرأة", height: 1360 },
  { code: "P07b", title: "البروفايل · ♀ → ♂",   groupId: "discover", kind: "desktop", description: "امرأة تشاهد بروفايل رجل", height: 1360 },
  { code: "P27",  title: "من زار ملفي",           groupId: "discover", kind: "desktop", description: "الجنس المعاكس · 90/180 يوم (سطر 672)", height: 980 },
  { code: "P28",  title: "البحث الآلي نيابة عني",  groupId: "discover", kind: "desktop", description: "تحليل + ترشيحات + فاتورة (سطر 857)", height: 850 },

  /* ─── Group 4 · التواصل والمحادثة (Connect) ─── */
  { code: "P09",  title: "طلبات التواصل",      groupId: "connect", kind: "desktop", description: "وارد + صادر · 72س قابل للتمديد مرتين", height: 807 },
  { code: "P10a", title: "الشات · نشط",        groupId: "connect", kind: "desktop", description: "مشروع خطبة # · محادثة مراقبة", height: 842 },
  { code: "P10b", title: "الشات · مفلتر",      groupId: "connect", kind: "desktop", description: "تحذير حجب محتوى مخالف", height: 842 },
  { code: "P10c", title: "الشات · منتهي",      groupId: "connect", kind: "desktop", description: "انتهاء المدة + اتفاقية الجدية", height: 842 },
  { code: "P21",  title: "اتفاقية الجدية",       groupId: "connect", kind: "desktop", description: "الوثيقة + توقيع رقمي + دفع", height: 960 },
  { code: "P22",  title: "نتيجة المشروع",        groupId: "connect", kind: "desktop", description: "إتمام الزواج + توزيع المحفظة", height: 1040 },

  /* ─── Group 5 · الدفع والاشتراك (Billing) ─── */
  { code: "P11a", title: "الدفع · اختيار",     groupId: "billing", kind: "desktop", description: "Apple Pay · Visa · مدى", height: 608 },
  { code: "P11b", title: "الدفع · بطاقة",      groupId: "billing", kind: "desktop", description: "إدخال بيانات البطاقة", height: 650 },
  { code: "P11c", title: "الدفع · نجاح",        groupId: "billing", kind: "desktop", description: "فاتورة + تأكيد", height: 740 },
  { code: "P11d", title: "الدفع · فشل",         groupId: "billing", kind: "desktop", description: "خطأ + إعادة محاولة + سياسة السداد", height: 880 },
  { code: "P18",  title: "محفظتي",              groupId: "billing", kind: "desktop", description: "الرصيد + المحجوز + المعاملات", height: 760 },
  { code: "P19",  title: "الاشتراك",             groupId: "billing", kind: "desktop", description: "ساري حتى أول زواج + الفواتير", height: 820 },

  /* ─── Group 6 · الحساب والإشعارات (Account) ─── */
  { code: "P08a", title: "ملفي · عرض",         groupId: "account", kind: "desktop", description: "بياناتي الشخصية", height: 1078 },
  { code: "P08b", title: "ملفي · تعديل",        groupId: "account", kind: "desktop", description: "تحديث البيانات + أفاتار + إعدادات", height: 1620 },
  { code: "P20",  title: "مركز الإشعارات",       groupId: "account", kind: "desktop", description: "تبويبات + إجراءات", height: 780 },
  { code: "P24",  title: "تجميد الحساب",         groupId: "account", kind: "desktop", description: "تجميد تلقائي بعد تجاهل 3 طلبات", height: 720 },

  /* ─── ملحقات تنتمي لمجموعات أخرى (تظهر تحت أقسامها) ─── */
  { code: "P23",  title: "التعهدات والإقرارات",  groupId: "marketing", kind: "desktop", description: "4 وثائق رسمية + توقيع رقمي (Section 11)", height: 2570 },
  { code: "P25",  title: "رفع الهوية (اختياري)", groupId: "auth", kind: "desktop", description: "توثيق اختياري · شارة موثّق", height: 820 },
  { code: "P26",  title: "دليل الاستخدام",       groupId: "marketing", kind: "desktop", description: "6 محاور + تحميل (سطر 1080)", height: 2380 },

  /* ─── Group 7 · لوحة التحكم (Admin) ─── */
  { code: "A01",  title: "Dashboard",          groupId: "admin", kind: "desktop", description: "KPIs + رسوم + مراجعة + نشاط", height: 970 },
  { code: "A02a", title: "الأعضاء · قائمة",     groupId: "admin", kind: "desktop", description: "Table + فلترة + Pagination", height: 760 },
  { code: "A02b", title: "الأعضاء · تفاصيل",    groupId: "admin", kind: "desktop", description: "بروفايل + إجراءات + سجل", height: 880 },
  { code: "A03",  title: "مراقبة المحادثات",   groupId: "admin", kind: "desktop", description: "قراءة + تدخّل كطرف ثالث + تمديد", height: 720 },
  { code: "A04",  title: "إدارة المدفوعات",    groupId: "admin", kind: "desktop", description: "اشتراك/اتفاقية/تواصل جاد/استرداد", height: 780 },
  { code: "A05",  title: "التقارير",           groupId: "admin", kind: "desktop", description: "رسوم + Donut + تصدير", height: 960 },
  { code: "A06",  title: "الكلمات المحظورة",   groupId: "admin", kind: "desktop", description: "Regex/كلمات بفئاتها", height: 800 },
  { code: "A07",  title: "إعدادات المنصة",     groupId: "admin", kind: "desktop", description: "مدة الشات/رسوم/قوالب/أمان", height: 1020 },
  { code: "A08",  title: "إدارة المحتوى",      groupId: "admin", kind: "desktop", description: "الصفحات الثابتة", height: 680 },
  { code: "A09",  title: "سجل المراجعة",       groupId: "admin", kind: "desktop", description: "Audit log بالأدوار", height: 860 },
  { code: "AM01", title: "Modal · حظر",        groupId: "admin", kind: "desktop", description: "تأكيد حظر عضو + ملاحظات", height: 800 },
  { code: "AM02", title: "Modal · حذف",        groupId: "admin", kind: "desktop", description: "تأكيد حذف نهائي (DELETE)", height: 800 },
  { code: "AM03", title: "Modal · صلاحيات",    groupId: "admin", kind: "desktop", description: "Super Admin/Moderator/Support", height: 800 },
  { code: "A10",  title: "مراجعة تعديلات الأعضاء", groupId: "admin", kind: "desktop", description: "البيانات الحساسة قبل النشر (سطر 640)", height: 1220 },

  /* ─── Group 8 · الجوال — حصري (Mobile-only) ─── */
  { code: "M01",  title: "Splash",             groupId: "mobile", kind: "mobile", description: "شاشة افتتاحية بالشعار" },
  { code: "M02",  title: "Onboarding 1",       groupId: "mobile", kind: "mobile", description: "آمنة · بياناتك محمية" },
  { code: "M03",  title: "Onboarding 2",       groupId: "mobile", kind: "mobile", description: "شرعية · ضوابط واضحة" },
  { code: "M04",  title: "Onboarding 3",       groupId: "mobile", kind: "mobile", description: "موثوقة · إدارة مراقبة" },
  { code: "M05",  title: "Bottom Nav",         groupId: "mobile", kind: "mobile", description: "Showcase للـ tab bar" },
  { code: "M06",  title: "Push Notif",         groupId: "mobile", kind: "mobile", description: "Showcase للإشعار" },

  /* ─── Group 9 · تطبيق الجوال (Mobile App) ─── */
  { code: "MP00",  title: "📱 الهبوط · Hero",      groupId: "mobile-app", kind: "mobile", description: "هيرو الهبوط — صورة full-bleed + CTA" },
  { code: "MP01",  title: "📱 الرئيسية",          groupId: "mobile-app", kind: "mobile", description: "Marketing home (موبايل)" },
  { code: "MP04",  title: "📱 تسجيل الدخول",      groupId: "mobile-app", kind: "mobile", description: "Login (موبايل)" },
  { code: "MP03a", title: "📱 التسجيل · بيانات",  groupId: "mobile-app", kind: "mobile", description: "أفاتار + بيانات + كلمة مرور" },
  { code: "MP03c", title: "📱 التسجيل · OTP",     groupId: "mobile-app", kind: "mobile", description: "تأكيد + موافقة" },
  { code: "MP06",  title: "📱 التصفّح",            groupId: "mobile-app", kind: "mobile", description: "بحث + كروت + tabs" },
  { code: "MP07",  title: "📱 بروفايل",           groupId: "mobile-app", kind: "mobile", description: "أرغب في التواصل + إبلاغ" },
  { code: "MP08a", title: "📱 ملفي",              groupId: "mobile-app", kind: "mobile", description: "عرض + تعديل" },
  { code: "MP09",  title: "📱 الطلبات",            groupId: "mobile-app", kind: "mobile", description: "72س + تمديد" },
  { code: "MP10",  title: "📱 الشات",              groupId: "mobile-app", kind: "mobile", description: "مشروع خطبة + تدخّل" },
  { code: "MP11",  title: "📱 الدفع",              groupId: "mobile-app", kind: "mobile", description: "Apple Pay/Visa/مدى" },
  { code: "MP18",  title: "📱 المحفظة",            groupId: "mobile-app", kind: "mobile", description: "رصيد + محجوز + معاملات" },
  { code: "MP19",  title: "📱 الاشتراك",           groupId: "mobile-app", kind: "mobile", description: "ساري حتى أول زواج" },
  { code: "MP20",  title: "📱 الإشعارات",          groupId: "mobile-app", kind: "mobile", description: "مركز الإشعارات" },
  { code: "MP22",  title: "📱 نتيجة المشروع",      groupId: "mobile-app", kind: "mobile", description: "إتمام + توزيع المحفظة" },
  { code: "MP05a", title: "📱 نسيت · جوال",        groupId: "mobile-app", kind: "mobile", description: "إدخال الجوال" },
  { code: "MP05b", title: "📱 نسيت · OTP",         groupId: "mobile-app", kind: "mobile", description: "رمز + كلمة جديدة" },
  { code: "MP03d", title: "📱 في انتظار",          groupId: "mobile-app", kind: "mobile", description: "بانتظار مراجعة الإدارة" },
  { code: "MP03e", title: "📱 مقبول",              groupId: "mobile-app", kind: "mobile", description: "قبول + رابط الدفع" },
  { code: "MP03f", title: "📱 مرفوض",              groupId: "mobile-app", kind: "mobile", description: "سبب + إعادة تقديم" },
  { code: "MP11c", title: "📱 الدفع · نجاح",       groupId: "mobile-app", kind: "mobile", description: "فاتورة + تفعيل" },
  { code: "MP11d", title: "📱 الدفع · فشل",        groupId: "mobile-app", kind: "mobile", description: "خطأ + إعادة المحاولة" },
  { code: "MP21",  title: "📱 اتفاقية الجدية",     groupId: "mobile-app", kind: "mobile", description: "وثيقة + توقيع + دفع" },
  { code: "MP24",  title: "📱 تجميد الحساب",       groupId: "mobile-app", kind: "mobile", description: "تجميد تلقائي + استئناف" },
  { code: "MP27",  title: "📱 من زار ملفي",         groupId: "mobile-app", kind: "mobile", description: "زوّار · فلتر زمني" },
  { code: "MP28",  title: "📱 البحث الآلي",         groupId: "mobile-app", kind: "mobile", description: "نيابة عن العضو" },
  { code: "MP08b", title: "📱 تعديل الملف",         groupId: "mobile-app", kind: "mobile", description: "أفاتار + بيانات + إعدادات" },
  { code: "MP25",  title: "📱 رفع الهوية",           groupId: "mobile-app", kind: "mobile", description: "اختياري · شارة موثّق" },
  { code: "MP06b", title: "📱 فلاتر البحث",          groupId: "mobile-app", kind: "mobile", description: "Bottom sheet" },
  { code: "MP11b", title: "📱 الدفع · بطاقة",       groupId: "mobile-app", kind: "mobile", description: "إدخال بيانات البطاقة" },
  { code: "MP30", title: "📱 الرئيسية (داشبورد)",   groupId: "mobile-app", kind: "mobile", description: "ترحيب + مشروع نشط + اقتراحات + نشاط" },
  { code: "MP31", title: "📱 حسابي (قائمة)",        groupId: "mobile-app", kind: "mobile", description: "ملفي/اشتراك/محفظة/إعدادات/خروج" },
  { code: "MP32", title: "📱 الإعدادات",             groupId: "mobile-app", kind: "mobile", description: "إشعارات/خصوصية/أمان/لغة" },
  { code: "MP03b", title: "📱 الاستبيان (رجل)",     groupId: "mobile-app", kind: "mobile", description: "نموذج الرجل الكامل", height: 3200 },
  { code: "MP03bw", title: "📱 الاستبيان (امرأة)",   groupId: "mobile-app", kind: "mobile", description: "نموذج المرأة الكامل", height: 3800 },
  { code: "MP41", title: "📱 لا توجد طلبات",         groupId: "mobile-app", kind: "mobile", description: "حالة فارغة · طلبات" },
  { code: "MP42", title: "📱 لا توجد محادثات",       groupId: "mobile-app", kind: "mobile", description: "حالة فارغة · شات" },
  { code: "MP43", title: "📱 لا توجد إشعارات",       groupId: "mobile-app", kind: "mobile", description: "حالة فارغة · إشعارات" },
  { code: "MP44", title: "📱 المحفظة فارغة",          groupId: "mobile-app", kind: "mobile", description: "حالة فارغة · محفظة" },
  { code: "MP45", title: "📱 مودال إبلاغ/حظر",       groupId: "mobile-app", kind: "mobile", description: "Bottom sheet · سبب + حظر" },
  { code: "MP46", title: "📱 مودال تسجيل الخروج",    groupId: "mobile-app", kind: "mobile", description: "تأكيد centered modal" },
  { code: "MP47", title: "📱 تم إرسال الطلب",        groupId: "mobile-app", kind: "mobile", description: "نجاح · صالح 72س" },

  /* ─── Group 10 · شاشات النظام (System) ─── */
  { code: "S01",  title: "404 · غير موجودة",    groupId: "system", kind: "desktop", description: "Page Not Found" },
  { code: "S02",  title: "500 · خطأ خادم",      groupId: "system", kind: "desktop", description: "Server Error" },
  { code: "S03",  title: "Maintenance",        groupId: "system", kind: "desktop", description: "صيانة مجدولة" },
  { code: "S04",  title: "Coming Soon",        groupId: "system", kind: "desktop", description: "ميزة قادمة" },
];

/* User-flow edges — arrows that visualize the journey on the canvas */
export const flowEdges: { from: string; to: string; label?: string }[] = [
  // Marketing → Auth
  { from: "P01", to: "P03a", label: "تسجيل جديد" },
  { from: "P01", to: "P04",  label: "دخول" },

  // Auth flow
  { from: "P03a", to: "P03b", label: "رجل" },
  { from: "P03a", to: "P03bw", label: "امرأة" },
  { from: "P03b", to: "P03b2", label: "التالي" },
  { from: "P03b2", to: "P03b3", label: "التالي" },
  { from: "P03b3", to: "P03b4", label: "التالي" },
  { from: "P03b4", to: "P03c", label: "إنهاء" },
  { from: "P03bw", to: "P03bw2", label: "التالي" },
  { from: "P03bw2", to: "P03bw3", label: "التالي" },
  { from: "P03bw3", to: "P03bw4", label: "التالي" },
  { from: "P03bw4", to: "P03c", label: "إنهاء" },
  { from: "P03c", to: "P03d", label: "تحقق" },
  { from: "P03d", to: "P03e", label: "قبول" },
  { from: "P03d", to: "P03f", label: "رفض" },
  { from: "P04",  to: "P05a", label: "نسيت" },
  { from: "P05a", to: "P05b", label: "OTP" },
  { from: "P05b", to: "P04",  label: "دخول" },
  { from: "P04",  to: "P06a", label: "دخول ناجح" },
  { from: "P03e", to: "P11a", label: "ادفع لتفعيل" },

  // Core app flow
  { from: "P06a", to: "P06b", label: "فلترة" },
  { from: "P06a", to: "P07a", label: "اختيار" },
  { from: "P07a", to: "P09",  label: "أرغب بالتواصل" },
  { from: "P09",  to: "P10a", label: "قبول" },
  { from: "P10a", to: "P10b", label: "محتوى محظور" },
  { from: "P10a", to: "P10c", label: "انتهاء" },
  { from: "P10c", to: "P11a", label: "اتفاقية + دفع" },
  { from: "P11a", to: "P11b", label: "بطاقة" },
  { from: "P11b", to: "P11c", label: "نجاح" },
  { from: "P11b", to: "P11d", label: "فشل" },
  { from: "P08a", to: "P08b", label: "تعديل" },

  // Marketing → policies
  { from: "P02",  to: "P15",  label: "اقرأ المزيد" },

  // Admin
  { from: "A01",  to: "A02a", label: "الأعضاء" },
  { from: "A01",  to: "A03",  label: "المحادثات" },
  { from: "A01",  to: "A04",  label: "المدفوعات" },
  { from: "A02a", to: "A02b", label: "تفاصيل" },
  { from: "A02b", to: "AM01", label: "حظر" },
  { from: "A02b", to: "AM02", label: "حذف" },
  { from: "A02b", to: "AM03", label: "صلاحيات" },

  // Mobile onboarding
  { from: "M01",  to: "M02",  label: "ابدأ" },
  { from: "M02",  to: "M03",  label: "التالي" },
  { from: "M03",  to: "M04",  label: "التالي" },
  { from: "M04",  to: "P03a", label: "سجّل" },
];

/* ───────── Layout Algorithm ───────── */

const desktopW = canvas.screen.desktop.w;
const mobileW = canvas.screen.mobile.w + canvas.chrome.phoneBezel * 2;
const gap = canvas.spacing.betweenScreens;
const groupGap = canvas.spacing.betweenGroups;
const labelH = canvas.spacing.groupLabelHeight;
const MARGIN_X = 200;

/* Full rendered height of a screen frame (content + chrome). */
function screenHeight(s: Screen): number {
  if (s.kind === "desktop") {
    return (s.height ?? canvas.screen.desktop.h) + canvas.chrome.desktopBar;
  }
  return (s.height ?? canvas.screen.mobile.h) + canvas.chrome.phoneBezel * 2;
}

type LaidOut = { x: number; y: number; w: number; h: number };

export type CanvasBuild = {
  nodes: Node[];
  edges: Edge[];
  bounds: { width: number; height: number };
};

export function buildCanvas(): CanvasBuild {
  const nodes: Node[] = [];
  const positions = new Map<string, LaidOut>();
  let cursorY = 0;

  for (const g of groups) {
    const groupScreens = screens.filter((s) => s.groupId === g.id);
    if (groupScreens.length === 0) continue;

    const w = groupScreens[0].kind === "desktop" ? desktopW : mobileW;

    const groupTop = cursorY;
    nodes.push({
      id: `group-${g.id}`,
      type: "groupLabel",
      position: { x: MARGIN_X, y: groupTop },
      data: { ...g, count: groupScreens.length },
      draggable: false,
      selectable: false,
    });

    const startY = groupTop + labelH;
    let rowY = startY;

    /* Lay out row by row; each row is as tall as its tallest screen so that
     * variable-height frames (e.g. long marketing pages) never overlap. */
    for (let r = 0; r * g.cols < groupScreens.length; r++) {
      const rowScreens = groupScreens.slice(r * g.cols, r * g.cols + g.cols);
      const rowH = Math.max(...rowScreens.map(screenHeight));

      rowScreens.forEach((s, ci) => {
        const x = MARGIN_X + ci * (w + gap);
        const y = rowY;
        positions.set(s.code, { x, y, w, h: screenHeight(s) });

        nodes.push({
          id: s.code,
          type: "screen",
          position: { x, y },
          data: { screen: s, group: g },
          draggable: false,
        });
      });

      rowY += rowH + gap;
    }

    cursorY = rowY - gap + groupGap;
  }

  const edges: Edge[] = flowEdges
    .filter((e) => positions.has(e.from) && positions.has(e.to))
    .map((e) => ({
      id: `${e.from}->${e.to}`,
      source: e.from,
      target: e.to,
      label: e.label,
      type: "smoothstep",
      animated: false,
      style: { stroke: colors.brand.highlight, strokeWidth: 2 },
      labelStyle: { fontFamily: "'Ahmed Sans', sans-serif", fontSize: 12, fontWeight: 700, fill: colors.brand.green },
      labelBgStyle: { fill: colors.brand.highlight },
      labelBgPadding: [6, 8],
      labelBgBorderRadius: 6,
      markerEnd: { type: MarkerType.ArrowClosed, color: colors.brand.highlight, width: 20, height: 20 },
    }));

  const maxX = Math.max(...[...positions.values()].map((p) => p.x + p.w));
  const maxY = cursorY;

  return {
    nodes,
    edges,
    bounds: { width: maxX + MARGIN_X, height: maxY },
  };
}
