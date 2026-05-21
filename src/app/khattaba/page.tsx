"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Heart, Shield, Smartphone, Globe, Code2, Database, Server, Lock,
  Layers, Cloud, Bell, MessageCircle, CreditCard, Eye, Search,
  Users, UserPlus, UserCheck, FileText, ClipboardList, ScrollText,
  Activity, BarChart3, Settings, Filter, Ban, FileSignature,
  CheckCircle2, XCircle, Clock, ArrowRight, ArrowLeft, ArrowDown,
  Send, KeyRound, Phone, Mail, Wallet,
  Wrench, ListChecks, Hash, MapPin,
  Sparkles, Bookmark, Home, LogIn, RefreshCw,
  Pause, UserCog, Edit3, UserSearch, AlertTriangle, BadgeCheck,
  AlertCircle, BellRing, Wifi, StickyNote, Fingerprint, ShieldCheck,
  BookOpen, HeartCrack, Baby, Pill, Gavel, Car, Briefcase, Award,
  Banknote, ChefHat, Hourglass,
  type LucideIcon,
} from "lucide-react";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";
import KhattabaSectionNav from "@/components/KhattabaSectionNav";
import KhattabaChat from "@/components/KhattabaChat";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════ PALETTE ═══════════ */
const G = "#30c280";
const D = "#0A0A0A";
const R = "#EF4444";
const A = "#F59E0B";
const B = "#3B82F6";
const P = "#8B5CF6";

/* ═══════════ HELPER COMPONENTS ═══════════ */

function SectionHead({
  eyebrow, children, color = G, subtitle, light,
}: { eyebrow: string; children: React.ReactNode; color?: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="text-center mb-12">
      <p className="ar-heading text-lg mb-3" style={{ color }}>{eyebrow}</p>
      <h2 className="ar-heading text-4xl md:text-5xl mb-4" style={{ color: light ? "#fff" : D }}>
        {children}
      </h2>
      {subtitle && (
        <p className="text-sm max-w-2xl mx-auto ar-body" style={{ color: light ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

type Phase = {
  num: number;
  label: string;
  color: string;
  duration: string;
  payment: string;
  items: string[];
};

function PhaseCard({ p }: { p: Phase }) {
  return (
    <div
      className="ph-item rounded-[24px] overflow-hidden"
      style={{ border: `2px solid ${p.color}25`, boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}
    >
      <div className="flex flex-col md:flex-row">
        <div
          className="md:w-[220px] flex-shrink-0 p-8 flex flex-col items-center justify-center text-center"
          style={{ background: p.color }}
        >
          <div className="text-[9px] font-bold tracking-[3px] uppercase mb-1" style={{ color: "rgba(0,0,0,0.4)" }}>
            المرحلة
          </div>
          <div className="ar-heading text-5xl mb-2" style={{ color: D }}>
            0{p.num}
          </div>
          <div className="ar-heading text-base mb-3 px-2" style={{ color: D }}>
            {p.label}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-2" style={{ background: "rgba(0,0,0,0.08)" }}>
            <Clock size={11} color={D} />
            <span className="text-[11px] font-bold" style={{ color: D }}>{p.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.08)" }}>
            <Wallet size={11} color={D} />
            <span className="text-[11px] font-bold" style={{ color: D }}>{p.payment}</span>
          </div>
        </div>
        <div className="flex-1 p-6 bg-white">
          <div className="text-[10px] font-bold tracking-[2px] uppercase mb-3" style={{ color: p.color }}>
            المخرجات
          </div>
          <div className="flex flex-col gap-2">
            {p.items.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <CheckCircle2 size={16} color={p.color} className="flex-shrink-0 mt-0.5" />
                <span className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KhattabaScopeDoc() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeStack, setActiveStack] = useState<"front" | "back" | "mobile" | "services" | "security">("front");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ph-hero",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.3 }
      );
      gsap.utils.toArray<HTMLElement>(".ph-slide").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });
      gsap.utils.toArray<HTMLElement>(".ph-stagger").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll(".ph-item"),
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".ph-bar").forEach((el) => {
        const v = parseFloat(el.getAttribute("data-val") || "0");
        gsap.fromTo(
          el,
          { width: "0%" },
          { width: `${v}%`, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══ DATA ═══ */

  const goals: { icon: LucideIcon; text: string }[] = [
    { icon: Sparkles, text: "بناء منصة إلكترونية حديثة وآمنة تليق بكونها الأولى من نوعها في السعودية" },
    { icon: Smartphone, text: "توفير تجربة مستخدم سلسة ومتوافقة مع الأجهزة المختلفة (ويب + موبايل)" },
    { icon: Shield, text: "حماية خصوصية وبيانات المستخدمين وفقاً لنظام PDPL" },
    { icon: MessageCircle, text: "نظام شات مراقب يضمن أمان التواصل بين الأطراف" },
    { icon: CreditCard, text: "ربط آمن مع بوابة دفع إلكترونية معتمدة" },
    { icon: Search, text: "تهيئة المنصة لمحركات البحث (SEO) لضمان الظهور في النتائج الأولى" },
  ];

  const stack = {
    front: {
      label: "الواجهة الأمامية",
      sub: "Frontend",
      icon: Code2,
      color: G,
      items: [
        { tech: "Next.js 15", use: "إطار العمل الرئيسي مع Server-Side Rendering و App Router" },
        { tech: "TypeScript", use: "لغة البرمجة مع Type Safety للأمان والصيانة" },
        { tech: "Tailwind CSS v4", use: "إطار التصميم الحديث مع دعم كامل لاتجاه RTL" },
        { tech: "shadcn/ui", use: "مكونات واجهة مستخدم جاهزة ومخصصة" },
        { tech: "TanStack Query", use: "إدارة طلبات البيانات مع التخزين المؤقت" },
        { tech: "Zustand", use: "إدارة الحالة خفيفة الوزن" },
        { tech: "Zod", use: "التحقق من صحة البيانات المدخلة" },
        { tech: "next-intl", use: "دعم التعريب واتجاه RTL" },
      ],
    },
    back: {
      label: "الخدمات الخلفية",
      sub: "Backend",
      icon: Server,
      color: B,
      items: [
        { tech: "Next.js API + tRPC", use: "واجهات برمجة التطبيقات مع Type Safety كامل" },
        { tech: "Drizzle ORM", use: "ORM حديث وخفيف للتعامل مع قاعدة البيانات" },
        { tech: "PostgreSQL", use: "قاعدة بيانات علائقية قوية وموثوقة" },
        { tech: "Better Auth", use: "نظام مصادقة حديث ومرن" },
        { tech: "Inngest", use: "وظائف خلفية مجدولة (إشعارات، فلترة، تنظيف)" },
      ],
    },
    mobile: {
      label: "تطبيق الجوال",
      sub: "Mobile App",
      icon: Smartphone,
      color: P,
      items: [
        { tech: "Flutter 3.x", use: "إطار تطوير تطبيقات متعددة المنصات (iOS + Android)" },
        { tech: "Riverpod", use: "إدارة الحالة بنمط reactive" },
        { tech: "Dio", use: "عميل HTTP متقدم" },
        { tech: "Firebase Cloud Messaging", use: "إشعارات فورية للمستخدمين" },
      ],
    },
    services: {
      label: "الخدمات والتكاملات",
      sub: "Services",
      icon: Cloud,
      color: A,
      items: [
        { tech: "Unifonic", use: "رسائل التحقق OTP (مزود سعودي معتمد)" },
        { tech: "Tap Payments / Paymob", use: "بوابة الدفع الإلكترونية" },
        { tech: "Salam Cloud", use: "استضافة سحابية سعودية محلية" },
        { tech: "Sentry", use: "تتبع الأخطاء ومراقبة الأداء" },
        { tech: "Plausible Analytics", use: "تحليلات متوافقة مع PDPL" },
      ],
    },
    security: {
      label: "الأمان والحماية",
      sub: "Security",
      icon: Lock,
      color: R,
      items: [
        { tech: "HTTPS / TLS 1.3", use: "تشفير جميع الاتصالات بين العميل والخادم" },
        { tech: "AES-256", use: "تشفير البيانات الحساسة في قاعدة البيانات" },
        { tech: "XSS · CSRF · SQL Injection", use: "حماية مدمجة عبر تقنيات Next.js" },
        { tech: "Rate Limiting", use: "حماية نقاط API من الاستغلال" },
        { tech: "Helmet.js", use: "تأمين HTTP Headers" },
        { tech: "Daily Backups", use: "نسخ احتياطية يومية تلقائية لقاعدة البيانات" },
        { tech: "Audit Log", use: "سجل مراجعة لتتبع عمليات الوصول للبيانات الحساسة" },
        { tech: "WAF", use: "Web Application Firewall على مستوى الاستضافة" },
      ],
    },
  } as const;

  const publicPages: { code: string; page: string; desc: string; icon: LucideIcon }[] = [
    { code: "P01", page: "الرئيسية", desc: "عرض تعريفي بالمنصة مع إحصائيات وقصص نجاح ودعوة للتسجيل", icon: Home },
    { code: "P02", page: "من نحن", desc: "نبذة عن الشركة ورؤيتها ورسالتها والسجل التجاري والتراخيص", icon: FileText },
    { code: "P03", page: "التسجيل", desc: "نموذج تسجيل متعدد الخطوات مع OTP للتحقق من الجوال", icon: UserPlus },
    { code: "P04", page: "تسجيل الدخول", desc: "تسجيل الدخول عبر رقم الجوال وكلمة المرور", icon: LogIn },
    { code: "P05", page: "استعادة كلمة المرور", desc: "إعادة تعيين كلمة المرور عبر رمز OTP", icon: RefreshCw },
    { code: "P06", page: "البحث والتصفح", desc: "تصفح بروفايلات الطرف الآخر مع فلاتر متقدمة (الجنسية، المدينة، العمر، القبيلة، الحالة الاجتماعية، المؤهل)", icon: Search },
    { code: "P07", page: "صفحة البروفايل", desc: "عرض تفاصيل بروفايل عضو محدد (أفاتار جاهز فقط، بدون صور حقيقية) مع زر طلب تواصل", icon: UserCheck },
    { code: "P08", page: "ملفي الشخصي", desc: "تعديل البيانات الشخصية وإعدادات الحساب · اختيار أفاتار من مجموعة جاهزة داخل المنصة (لا تُرفع صور حقيقية)", icon: Users },
    { code: "P09", page: "طلبات التواصل", desc: "عرض طلبات التواصل المرسلة والمستلمة وحالة كل طلب", icon: Send },
    { code: "P10", page: "الشات المراقب", desc: "غرفة محادثة نصية مراقبة بمدة 15 دقيقة مع فلترة محتوى", icon: MessageCircle },
    { code: "P11", page: "بوابة الدفع", desc: "صفحة الدفع الإلكتروني عبر Tap أو Paymob", icon: CreditCard },
    { code: "P12", page: "سياسة الخصوصية", desc: "سياسة جمع ومعالجة البيانات متوافقة مع PDPL", icon: Shield },
    { code: "P13", page: "الشروط والأحكام", desc: "شروط الاشتراك والاستخدام والاسترداد", icon: ScrollText },
    { code: "P14", page: "سياسة الاستخدام", desc: "سياسة استخدام المنصة وإخلاء المسؤولية", icon: ScrollText },
    { code: "P15", page: "آلية الخطبة", desc: "آلية مشروع الخطبة والخطوات المتبعة", icon: Heart },
    { code: "P16", page: "اتصل بنا", desc: "نموذج تواصل مع الإدارة + معلومات الاتصال", icon: Phone },
    { code: "P17", page: "الأسئلة الشائعة", desc: "أسئلة شائعة مع إجابات قابلة للطي (Accordion)", icon: ClipboardList },
  ];

  const adminPages: { code: string; page: string; desc: string; icon: LucideIcon }[] = [
    { code: "A01", page: "لوحة التحكم الرئيسية", desc: "إحصائيات عامة: عدد الأعضاء، الطلبات النشطة، الإيرادات، الأعضاء الجدد", icon: BarChart3 },
    { code: "A02", page: "إدارة الأعضاء والصلاحيات", desc: "قائمة الأعضاء مع بحث وفلترة وتعديل وحظر وتفعيل وحذف · صلاحيات أدمن متعددة (Super Admin / Moderator / Support) لكل دور صفحات وأدوات مخصصة", icon: Users },
    { code: "A03", page: "مراقبة المحادثات", desc: "عرض جميع المحادثات الجارية والمنتهية مع إمكانية القراءة والتدخل", icon: Eye },
    { code: "A04", page: "إدارة المدفوعات", desc: "عرض سجل المدفوعات وحالتها (مكتمل، معلق، فاشل)", icon: Wallet },
    { code: "A05", page: "التقارير والإحصائيات", desc: "تقارير الأعضاء والنشاط والإيرادات مع رسوم بيانية", icon: Activity },
    { code: "A06", page: "إدارة الكلمات المحظورة", desc: "إضافة وتعديل وحذف الكلمات والأنماط المحظورة في الشات", icon: Ban },
    { code: "A07", page: "إعدادات المنصة", desc: "إعدادات عامة: مدة الشات، أسعار الخدمات، محتوى الرسائل", icon: Settings },
    { code: "A08", page: "إدارة المحتوى", desc: "تعديل محتوى الصفحات الثابتة (من نحن، السياسات، إلخ)", icon: FileText },
    { code: "A09", page: "سجل المراجعة", desc: "سجل مراجعة لجميع العمليات الحساسة على المنصة", icon: FileSignature },
  ];

  const mobileExtras: { title: string; desc: string; icon: LucideIcon }[] = [
    { title: "Splash Screen", desc: "شاشة تعريفية عند فتح التطبيق", icon: Sparkles },
    { title: "Onboarding", desc: "ثلاث شاشات تشرح كيفية استخدام المنصة", icon: Bookmark },
    { title: "Bottom Navigation", desc: "تنقل سريع: الرئيسية، البحث، طلباتي، الشات، حسابي", icon: Layers },
    { title: "Push Notifications", desc: "إشعارات فورية لطلبات التواصل والرسائل الجديدة", icon: Bell },
    { title: "تحديث تلقائي", desc: "تحديثات مستقبلية عبر CodePush أو ما يعادله", icon: RefreshCw },
  ];

  const journey: { step: number; phase: string; desc: string; icon: LucideIcon }[] = [
    { step: 1, phase: "الوصول", desc: "يدخل المستخدم الموقع أو التطبيق ويضغط (تسجيل جديد). الأعضاء القدامى تصلهم رسالة واتساب عند إطلاق التطبيق ويُطلب منهم إعادة التسجيل من جديد.", icon: Globe },
    { step: 2, phase: "التسجيل", desc: "يملأ نموذج التسجيل الكامل. التوثيق برفع الهوية اختياري لا إجباري.", icon: UserPlus },
    { step: 3, phase: "التحقق", desc: "يستلم رمز OTP على جواله ويدخله للتحقق من الرقم.", icon: KeyRound },
    { step: 4, phase: "رفع الطلب للإدارة", desc: "يصل الطلب لإدارة المنصة لتقييم العضو يدوياً وتحديد قيمة رسوم الاشتراك المخصصة له (سعر متغير من شخص لآخر).", icon: ShieldCheck },
    { step: 5, phase: "القبول والدفع", desc: "بعد القبول يُطلب من العضو سداد المبلغ الذي حددته الإدارة عبر Apple Pay أو Visa أو مدى — ثم يُفعّل حسابه.", icon: CreditCard },
    { step: 6, phase: "التصفح والبحث", desc: "يتصفح بروفايلات الطرف الآخر ويستخدم الفلاتر للبحث.", icon: Search },
    { step: 7, phase: "طلب التواصل", desc: "يضغط (أرغب في التواصل) على بروفايل معين، يصل إشعار للطرف الآخر عبر الإيميل والجوال والواتساب.", icon: Send },
    { step: 8, phase: "المراجعة", desc: "الطرف الآخر يراجع البروفايل ويقرر (قبول أو رفض). للعرض مدة 72 ساعة قابلة للتمديد مرتين.", icon: Eye },
    { step: 9, phase: "الشات المراقب", desc: "تُفتح غرفة شات بمعرّف بصيغة (مشروع خطبة #رقم) — لا يوجد ليميت زمني افتراضي، الإدارة تتحكم في المدة (مثلاً 30 أو 60 يوماً) ولها صلاحية التدخل في الرسائل كطرف ثالث.", icon: MessageCircle },
    { step: 10, phase: "اتفاقية الجدية", desc: "قبل الانتقال إلى الواتساب: تُعرض اتفاقية إلكترونية مع توقيع رقمي + يُدفع مبلغ منفصل تحدده الإدارة (قابل للاسترداد ضمن شروط الاتفاقية).", icon: FileSignature },
    { step: 11, phase: "التواصل الجاد", desc: "بعد الاقتناع من الطرفين عبر الواتساب: يدفع كل طرف مبلغاً تحدده الإدارة يدوياً. يُحجز المبلغ في محفظته داخل التطبيق.", icon: Wallet },
    { step: 12, phase: "إتمام أو فشل المشروع", desc: "عند إتمام الزواج: تُحصّل المنصة عمولتها. عند فشل المشروع: ترجع مبالغ مشروع الخطبة إلى محفظة كل عضو. الاشتراك ساري حتى إتمام أول زواج.", icon: Heart },
  ];

  const chatFilters: { item: string; icon: LucideIcon }[] = [
    { item: "حجب أرقام الهواتف بجميع صيغها (05xxxxxxxx، +966، إلخ)", icon: Phone },
    { item: "حجب عناوين البريد الإلكتروني (أي نص يحتوي على @)", icon: Mail },
    { item: "حجب حسابات التواصل الاجتماعي (Instagram، Snapchat، Twitter، TikTok)", icon: Hash },
    { item: "حجب الروابط (URLs) بجميع صيغها", icon: Globe },
    { item: "حجب الكلمات الجنسية الصريحة (قاموس عربي وإنجليزي)", icon: Ban },
    { item: "حجب عبارات التطرف الديني", icon: Shield },
    { item: "تظهر رسالة تحذيرية للمرسل ويُسجل الحدث في سجل المراجعة عند المخالفة", icon: FileSignature },
  ];

  const chatEnd: { title: string; desc: string; color: string; icon: LucideIcon }[] = [
    { title: "انتهاء المدة المحددة", desc: "تنتهي الغرفة عند انتهاء المدة التي حددتها الإدارة، مع إمكانية تمديدها مرة أخرى من لوحة التحكم بدون حد أعلى.", color: A, icon: Clock },
    { title: "الانتقال للاتفاقية", desc: "بعد الاقتناع من الطرفين يُعرض نموذج اتفاقية إلكترونية + توقيع + رسوم منفصلة قبل الانتقال للواتساب.", color: G, icon: FileSignature },
    { title: "الإبلاغ", desc: "أي من الطرفين يضغط (إبلاغ) فتتجمد المحادثة ويصل إشعار للأدمن فوراً.", color: R, icon: XCircle },
  ];

  const paymentRules: { title: string; body: string; icon: LucideIcon; color: string }[] = [
    {
      title: "لا اشتراك إلا بعد القبول",
      body: "لا توجد رسوم اشتراك عند التسجيل. الرسوم تُحدَّد فقط بعد قبول العضوية من إدارة المنصة، والمبلغ متغير من شخص لآخر ويحدد يدوياً.",
      icon: ShieldCheck,
      color: G,
    },
    {
      title: "لا رسوم على التواصل",
      body: "لا تُفرض أي رسوم عند إرسال طلب تواصل مع الطرف الآخر أو قبوله. التواصل داخل التطبيق متاح ضمن الاشتراك.",
      icon: MessageCircle,
      color: B,
    },
    {
      title: "اتفاقية ما قبل الواتساب",
      body: "قبل الانتقال للواتساب: يُعرض على الطرفين توقيع اتفاقية رقمية + يُدفع مبلغ منفصل تحدده الإدارة. هذا المبلغ قابل للاسترداد ضمن شروط الاتفاقية.",
      icon: FileSignature,
      color: P,
    },
    {
      title: "مبلغ التواصل الجاد",
      body: "عند تأكيد الجدية من الطرفين عبر الواتساب: يدفع كل طرف مبلغاً تحدده الإدارة يدوياً ويُحجز في محفظته داخل التطبيق.",
      icon: Wallet,
      color: A,
    },
    {
      title: "سياسة الاسترداد",
      body: "لا توجد سياسة استرداد عامة. الاستثناء الوحيد: عند فشل مشروع الخطبة تعود مبالغ مشروع الخطبة إلى محفظة كل عضو داخل التطبيق.",
      icon: RefreshCw,
      color: R,
    },
    {
      title: "مدة الاشتراك",
      body: "الاشتراك ساري حتى إتمام أول زواج للعضو. إذا لم يتم الزواج يبقى الرصيد متاحاً في المحفظة.",
      icon: Clock,
      color: G,
    },
    {
      title: "تمديد فترة الشات",
      body: "لا يوجد ليميت زمني افتراضي على غرف الشات. إدارة المنصة تتحكم في المدة وقابليتها للتمديد (مثلاً 30 أو 60 يوماً) لكل غرفة على حدة.",
      icon: Hourglass,
      color: B,
    },
    {
      title: "طرق الدفع المعتمدة",
      body: "Apple Pay · Visa · مدى — جميعها متكاملة مع بوابة دفع سعودية معتمدة.",
      icon: CreditCard,
      color: P,
    },
  ];

  const phases: {
    num: number;
    label: string;
    color: string;
    duration: string;
    payment: string;
    items: string[];
  }[] = [
    {
      num: 1,
      label: "التصميم (UI/UX)",
      color: G,
      duration: "أسبوعان · الأسبوع 1 إلى 2",
      payment: "3,000 ريال (15%)",
      items: [
        "تصميم كامل لجميع صفحات الموقع (17 صفحة) بصيغة Figma أو Adobe XD",
        "تصميم كامل لجميع شاشات لوحة التحكم الإدارية (9 شاشات)",
        "تصميم كامل لشاشات تطبيق الجوال (Splash, Onboarding, جميع الشاشات الرئيسية)",
        "تصميم متجاوب (Responsive) يعمل على جميع أحجام الشاشات",
        "اعتماد الهوية البصرية الحالية للمنصة مع تحديثها لتناسب التصميم الحديث",
        "اعتماد العميل النهائي على التصميم قبل الانتقال للمرحلة التالية",
      ],
    },
    {
      num: 2,
      label: "تطوير الواجهة الأمامية ولوحة التحكم",
      color: B,
      duration: "3 أسابيع · الأسبوع 3 إلى 5",
      payment: "5,000 ريال (25%)",
      items: [
        "تحويل التصميم المعتمد إلى كود Next.js 15 كامل الاستجابة",
        "بناء جميع صفحات الموقع (P01 إلى P17) بتقنية Server-Side Rendering",
        "بناء لوحة التحكم الإدارية (A01 إلى A09) بواجهة حديثة",
        "تهيئة دعم RTL الكامل للغة العربية",
        "تهيئة SEO الأساسية (Meta Tags, Open Graph, Sitemap, Robots.txt)",
      ],
    },
    {
      num: 3,
      label: "الخدمات الخلفية وربط الأنظمة",
      color: P,
      duration: "3 أسابيع · الأسبوع 5 إلى 7",
      payment: "5,000 ريال (25%)",
      items: [
        "بناء قاعدة البيانات (PostgreSQL) مع جميع الجداول والعلاقات",
        "بناء جميع واجهات API عبر tRPC مع Type Safety كامل",
        "ربط نظام المصادقة (Better Auth) مع تسجيل الدخول عبر رقم الجوال",
        "ربط خدمة OTP عبر Unifonic",
        "ربط بوابة الدفع (Tap أو Paymob) مع احتساب ضريبة القيمة المضافة تلقائياً",
        "بناء نظام الشات المراقب مع فلترة المحتوى",
        "بناء نظام الإشعارات (Push Notifications + SMS)",
        "ترحيل بيانات الأعضاء النشطين من قاعدة البيانات القديمة",
        "إعداد سجل المراجعة (Audit Log) للعمليات الحساسة",
        "تطبيق متطلبات PDPL التقنية (تشفير، موافقات، حذف بيانات)",
      ],
    },
    {
      num: 4,
      label: "تطبيق الجوال (Flutter)",
      color: A,
      duration: "3 أسابيع · الأسبوع 7 إلى 10",
      payment: "5,000 ريال (25%)",
      items: [
        "تطوير تطبيق Flutter كامل لنظامي iOS و Android",
        "جميع شاشات الموقع متاحة في التطبيق بتصميم محسّن للموبايل",
        "ربط التطبيق بنفس قاعدة البيانات و API مشتركة مع الموقع (Real-time Sync)",
        "ربط إشعارات Push عبر Firebase Cloud Messaging",
        "نظام الشات المراقب متاح داخل التطبيق بنفس القواعد",
        "دعم كامل لاتجاه RTL واللغة العربية",
        "تحسين الأداء للأجهزة المحمولة ذات المواصفات المنخفضة",
      ],
    },
    {
      num: 5,
      label: "الاختبار والإطلاق",
      color: R,
      duration: "أسبوعان · الأسبوع 11 إلى 12",
      payment: "2,000 ريال (10%)",
      items: [
        "اختبار شامل لجميع الوظائف على الموقع والتطبيق (Functional Testing)",
        "اختبار التوافق مع المتصفحات المختلفة (Chrome, Safari, Firefox, Edge)",
        "اختبار التطبيق على أجهزة متنوعة (iOS + Android) بأحجام شاشات مختلفة",
        "اختبار الأمان الأساسي (OWASP Top 10 Checklist)",
        "اختبار الأداء تحت الضغط (Load Testing)",
        "إعداد بيئة الإنتاج (Production) على الاستضافة السعودية",
        "إعداد إعادة التوجيه 301 من النطاق القديم kh1-ksa.sa",
        "نشر التطبيق على App Store و Google Play Store",
        "تسجيل فيديو تدريبي شامل للوحة التحكم الإدارية",
        "تسليم كود المصدر كاملاً للعميل",
        "بدء فترة الضمان والدعم الفني (3 أشهر)",
      ],
    },
  ];

  // Gantt-style timeline: which weeks each phase covers (1..12)
  const ganttRows: { label: string; color: string; from: number; to: number }[] = [
    { label: "التصميم", color: G, from: 1, to: 2 },
    { label: "الواجهة", color: B, from: 3, to: 5 },
    { label: "الخلفية", color: P, from: 5, to: 7 },
    { label: "التطبيق", color: A, from: 7, to: 10 },
    { label: "الإطلاق", color: R, from: 11, to: 12 },
  ];

  const dbTables: { table: string; desc: string; color: string }[] = [
    { table: "users", desc: "بيانات الأعضاء (الاسم، الجنس، العمر، الجنسية، المدينة، الحالة، المؤهل، الوظيفة، الوصف، الأفاتار المختار، الإعدادات)", color: G },
    { table: "sessions / otps", desc: "جلسات المصادقة وتوكنات OTP", color: B },
    { table: "profiles", desc: "بروفايلات الأعضاء التفصيلية (القبيلة، الفرع، تقبل التعدد/المسيار، شروط خاصة)", color: G },
    { table: "connection_requests", desc: "طلبات التواصل بين الأعضاء (الحالة: معلق، مقبول، مرفوض)", color: A },
    { table: "chat_sessions", desc: "جلسات الشات المراقبة (الأطراف، وقت البدء، وقت الانتهاء، الحالة)", color: P },
    { table: "chat_messages", desc: "رسائل الشات (المرسل، النص الأصلي، النص المفلتر، الحالة)", color: P },
    { table: "transactions", desc: "المعاملات المالية (المبلغ، الحالة، رقم المرجع، بوابة الدفع)", color: B },
    { table: "subscriptions", desc: "الاشتراكات (النوع، تاريخ البدء، تاريخ الانتهاء، الحالة)", color: B },
    { table: "banned_patterns", desc: "الكلمات والأنماط المحظورة في الشات", color: R },
    { table: "notifications", desc: "الإشعارات (Push, SMS) المرسلة للأعضاء", color: A },
    { table: "audit_logs", desc: "سجل المراجعة للعمليات الحساسة", color: R },
    { table: "platform_settings", desc: "إعدادات المنصة القابلة للتعديل من لوحة التحكم", color: D },
    { table: "admin_users / roles", desc: "حسابات الأدمن وأدوارهم (Super Admin / Moderator / Support) مع صلاحيات مفصلة لكل دور", color: B },
    { table: "avatars", desc: "مكتبة الأفاتارات الجاهزة داخل المنصة (لا تُرفع صور حقيقية من الأعضاء)", color: G },
  ];

  const operationalTerms: {
    title: string;
    body: string;
    badge: string;
    badgeColor: string;
    icon: LucideIcon;
  }[] = [
    {
      title: "الضريبة على القيمة المالية",
      body: "السعر الإجمالي 20,000 ريال سعودي نهائي ولا تُضاف إليه ضريبة قيمة مضافة.",
      badge: "بدون VAT",
      badgeColor: G,
      icon: Wallet,
    },
    {
      title: "حسابات النشر على المتاجر",
      body: "حساب Apple Developer ($99/سنة) وحساب Google Play Console ($25 لمرة واحدة): على العميل فتحهما وتسجيل بياناته الرسمية، ويتم نشر التطبيق من خلالهما باسم الشركة.",
      badge: "على العميل",
      badgeColor: B,
      icon: Smartphone,
    },
    {
      title: "الخدمات الخارجية المتكررة",
      body: "اشتراكات Unifonic (رسوم OTP) و Tap/Paymob (نسبة كل عملية دفع) و Salam Cloud (الاستضافة الشهرية) و Sentry: على حساب العميل بشكل مباشر، بدون أي وسيط.",
      badge: "على العميل",
      badgeColor: B,
      icon: Cloud,
    },
    {
      title: "ملكية الكود المصدري",
      body: "يتم تسليم الكود المصدري كاملاً للعميل عبر مستودع GitHub خاص ينتقل لملكيته بعد التسليم النهائي.",
      badge: "تسليم كامل",
      badgeColor: G,
      icon: Code2,
    },
    {
      title: "النسخ الاحتياطية والتخزين",
      body: "يتم تخزين النسخ الاحتياطية في موقعين منفصلين: Google Drive للبيانات و GitHub للكود، لضمان الاستعادة السريعة في أي ظرف.",
      badge: "Drive + GitHub",
      badgeColor: G,
      icon: Database,
    },
    {
      title: "بيئات التشغيل",
      body: "يتم تجهيز بيئة Production فقط على الاستضافة السعودية. لا يتضمن نطاق العقد إعداد بيئة Staging مستقلة.",
      badge: "Production فقط",
      badgeColor: A,
      icon: Server,
    },
    {
      title: "سياسة التأخير في المراجعات",
      body: "في حال تأخر العميل في اعتماد مخرجات أي مرحلة (تصميم، مراجعة، اختبار) يمتد الجدول الزمني تلقائياً بنفس فترة التأخير دون أي رسوم إضافية.",
      badge: "Timeline يمتد",
      badgeColor: A,
      icon: Clock,
    },
    {
      title: "الضمان والدعم الفني (3 أشهر)",
      body: "تشمل فترة الضمان إصلاح أي أخطاء أو مشاكل تقنية تظهر بعد الإطلاق دون مقابل. لا تشمل تطوير مزايا جديدة أو تعديلات على نطاق العمل المعتمد، فتُقدّم كأعمال إضافية باتفاق منفصل.",
      badge: "أخطاء فقط",
      badgeColor: R,
      icon: Shield,
    },
  ];

  const futurePhases: { feature: string; estimate: string }[] = [
    { feature: "ربط نفاذ الوطني للتحقق من الهوية (يتطلب موافقة NIC + رسوم اشتراك سنوية + 1 إلى 3 ريال لكل تحقق)", estimate: "8 إلى 12 أسبوعاً" },
    { feature: "نظام اشتراكات متعدد المستويات (Basic, Premium, VIP) مع ميزات مختلفة لكل مستوى", estimate: "2 إلى 3 أسابيع" },
    { feature: "دعم إضافة لغة إنجليزية للمنصة والتطبيق", estimate: "1 إلى 2 أسبوع" },
    { feature: "نظام توصيات ذكي يقترح بروفايلات متوافقة بناءً على معايير الذكاء الاصطناعي", estimate: "2 إلى 4 أسابيع" },
    { feature: "تقارير وإحصائيات متقدمة مع تصدير PDF/Excel", estimate: "1 إلى 2 أسبوع" },
    { feature: "تطبيق خاص بالأدمن (Flutter) لمراقبة المنصة من الجوال", estimate: "3 إلى 4 أسابيع" },
  ];

  /* ═══ ADDITIONAL FEATURES (20 ITEMS) ═══ */
  type FeatureBlock = { subtitle?: string; bullets: (string | { text: string; sub?: string[] })[] };
  type AdditionalFeature = { ordinal: string; title: string; icon: LucideIcon; color: string; sections: FeatureBlock[] };

  const additionalFeatures: AdditionalFeature[] = [
    {
      ordinal: "أولاً",
      title: "المحفظة المالية للعضو",
      icon: Wallet,
      color: G,
      sections: [
        {
          bullets: [
            "إنشاء محفظة مالية لكل عضو داخل المنصة.",
            "يتم حجز مبلغ مالي تحدده إدارة المنصة قبل الدخول في مشروع الخطبة.",
            {
              text: "في حال فشل مشروع الخطبة:",
              sub: [
                "لا يتم فك الحجز تلقائياً.",
                "يجب أن يطلب العضو فك الحجز بنفسه.",
                "بعد فك الحجز يصبح المبلغ متاحاً لتصرفه.",
              ],
            },
          ],
        },
      ],
    },
    {
      ordinal: "ثانياً",
      title: "الحسابات الراكدة",
      icon: Pause,
      color: A,
      sections: [
        {
          subtitle: "آلية الحساب الراكد",
          bullets: [
            "إذا لم يقم العضو بتسجيل الدخول لمدة 365 يوم:",
            "يتحول الحساب إلى “حساب راكد”.",
            "لا يظهر في نتائج البحث أو الأعضاء النشطين.",
            "ينتقل إلى قائمة “الأعضاء الراكدين”.",
          ],
        },
        {
          subtitle: "الإشعارات قبل الركود",
          bullets: [
            {
              text: "إرسال تنبيه للعضو قبل اكتمال السنة:",
              sub: ["3 أشهر", "أو وفق مدد قابلة للتعديل من الإدارة."],
            },
          ],
        },
        {
          subtitle: "زر تنشيط الحساب من الأدمن",
          bullets: [
            "زر مباشر في داشبورد الإدارة يحدّث حالة العضو إلى “نشِط” ويعيد ضبط آخر دخول.",
            "يُستخدم عند الخمول لفترة طويلة بالتنسيق مع العضو عبر الواتساب لمنع انتقاله للحسابات الراكدة.",
          ],
        },
      ],
    },
    {
      ordinal: "ثالثاً",
      title: "التحكم بحساب العضو",
      icon: UserCog,
      color: B,
      sections: [
        {
          bullets: [
            "إمكانية دخول إدارة المنصة إلى حساب العضو بتفويض منه.",
            "يظهر آخر ظهور وكأن العضو هو من قام بالدخول بنفسه.",
            {
              text: "الهدف:",
              sub: ["المحافظة على نشاط الحساب.", "منع انتقاله للحسابات الراكدة."],
            },
            "هناك حسابات اخر دخول لها من شهور او أكثر وهم متواصلين معنا ولكن لا يدخلون الحساب لذلك مهم جدا مع اطلاق النسخة الجديد والتطبيق يتم التحكم في حساباتهم لكي يتم وضع له اخر دخول مثلا منذ 5 أيام او 20 يوم حسب ما ترا المنصة.",
            "وهذا الامر راح يكون بالتنسيق معهم عبر الواتساب.",
          ],
        },
      ],
    },
    {
      ordinal: "رابعاً",
      title: "مراجعة تحديثات بيانات العضو",
      icon: Edit3,
      color: P,
      sections: [
        {
          subtitle: "عند تعديل البيانات (بعد قبول العضوية)",
          bullets: [
            "أي تعديل على البيانات الحساسة بعد الموافقة على العضوية يرفع طلباً إلى الإدارة للمراجعة قبل النشر.",
            "تعديلات البيانات غير الحساسة (الوصف، الصور، التفضيلات العامة) تنشر مباشرة.",
          ],
        },
        {
          subtitle: "الإجراءات",
          bullets: [
            "يتم تحويل التعديل إلى الإدارة للمراجعة.",
            {
              text: "للإدارة صلاحية:",
              sub: ["الموافقة", "الرفض", "التعديل"],
            },
          ],
        },
        {
          subtitle: "المتطلب التقني",
          bullets: [
            "تظليل أو تلوين النصوص الجديدة المعدلة.",
            "تمييز الإضافات الجديدة عن البيانات السابقة.",
          ],
        },
      ],
    },
    {
      ordinal: "خامساً",
      title: "سجل زيارات ملف العضو",
      icon: Eye,
      color: G,
      sections: [
        {
          subtitle: "إمكانية الاطلاع على الزوار",
          bullets: [
            {
              text: "يستطيع العضو رؤية:",
              sub: [
                "من زار ملفه",
                "التاريخ",
                "الوقت",
                "صورة الحساب الذي رأى حسابه ويمكن أيضا هو الدخول على حسابه ليراه.",
              ],
            },
          ],
        },
        {
          subtitle: "المدد الزمنية وضوابط سجل زيارات حسابات الأعضاء",
          bullets: [
            {
              text: "يسمح بما يلي:",
              sub: [
                "الرجال يشاهدون حسابات النساء",
                "النساء يشاهدن حسابات الرجال",
              ],
            },
            {
              text: "ولا يسمح بما يلي:",
              sub: ["الرجال يشاهدون الرجال", "النساء يشاهدن النساء"],
            },
            {
              text: "سجل المدة الزمنية لأخر زيارة:",
              sub: ["اخر 90 يوم", "اخر 180 يوم"],
            },
          ],
        },
      ],
    },
    {
      ordinal: "سادساً",
      title: "كشف الحسابات المكررة",
      icon: UserSearch,
      color: R,
      sections: [
        {
          subtitle: "الهدف",
          bullets: [
            {
              text: "كشف الأعضاء الذين:",
              sub: ["يتم رفضهم", "ثم يعيدون التسجيل برقم جديد"],
            },
          ],
        },
        {
          subtitle: "آلية الكشف",
          bullets: [
            {
              text: "مطابقة البيانات الثابتة التي يصعب تغييرها مثل:",
              sub: ["العمر", "المدينة", "المواصفات", "الحالة الاجتماعية", "الصفات الأساسية"],
            },
          ],
        },
        {
          subtitle: "الإجراءات",
          bullets: [
            {
              text: "عند اكتشاف تطابق:",
              sub: [
                "تعليق التسجيل مؤقتاً.",
                "التواصل مع العضو للتحقق.",
              ],
            },
            {
              text: "إذا لم يثبت اختلافه:",
              sub: ["يتم تجاهل الطلب.", "تحويله إلى “مهمل”."],
            },
          ],
        },
      ],
    },
    {
      ordinal: "سابعاً",
      title: "التنبيه بعدم التوافق",
      icon: AlertTriangle,
      color: A,
      sections: [
        {
          subtitle: "فكرة الميزة",
          bullets: [
            "عند تقدم عضو لعضوة (أو العكس):",
            "يظهر تنبيه استباقي.",
          ],
        },
        {
          subtitle: "مثال التنبيه",
          bullets: [
            "“المعلومات المتوفرة في حسابك ليست من المواصفات المفضلة لدى الطرف الآخر، هل ترغب بالاستمرار؟”",
          ],
        },
        {
          subtitle: "ملاحظات",
          bullets: ["التنبيه لا يمنع التقديم.", "مجرد إشعار توعوي فقط."],
        },
      ],
    },
    {
      ordinal: "ثامناً",
      title: "آلية تسجيل ونشر الحساب",
      icon: FileSignature,
      color: B,
      sections: [
        {
          subtitle: "خطوات النشر · إرسال الطلب",
          bullets: [
            {
              text: "بعد إرسال الطلب:",
              sub: ["لا ينشر مباشرة.", "يتم مراجعته وتقييمه من الإدارة."],
            },
            "التوثيق برفع الهوية الوطنية اختياري وليس إجبارياً عند التسجيل.",
          ],
        },
        {
          subtitle: "صلاحيات الإدارة",
          bullets: [
            {
              text: "يحق للإدارة:",
              sub: [
                "تعديل جميع الحقول.",
                "تقييم العضو وتحديد قيمة الاشتراك يدوياً (السعر متغير من شخص لآخر).",
                "اعتماد أو رفض الطلب.",
              ],
            },
          ],
        },
        {
          subtitle: "بعد الموافقة",
          bullets: [
            "يرسل إشعار قبول للعضو.",
            "يُطلب منه سداد المبلغ المحدد له تحديداً من طرف إدارة المنصة (يختلف من عضو لآخر).",
          ],
        },
        {
          subtitle: "مدة السداد",
          bullets: [
            "انتظار 7 أيام فقط.",
            {
              text: "بعدها:",
              sub: [
                "يلغى الطلب.",
                "يحفظ بالأرشيف لمدة 90 يوم.",
                "ثم يحذف نهائياً.",
                "إضافة رقم الجوال والبريد الالكتروني إلى البلاك ليست.",
              ],
            },
          ],
        },
        {
          subtitle: "رفع الحظر من البلاك ليست",
          bullets: [
            "إمكانية رفع الحظر عن رقم الجوال إذا تواصل العضو/العضوة مع الإدارة عبر الواتساب وطلب السماح له بالتسجيل مرة أخرى.",
            "يتم تقدير الطلب من طرف الإدارة قبل الموافقة على إعادة التسجيل.",
          ],
        },
        {
          subtitle: "الفاتورة الإلكترونية",
          bullets: [
            {
              text: "يتم إصدار فاتورة تشمل:",
              sub: ["اسم العضو", "بياناته", "مدة الاشتراك", "الرسوم"],
            },
          ],
        },
        {
          subtitle: "الرفض",
          bullets: [
            "في حال الرفض: يحفظ الطلب في “الطلبات المرفوضة”.",
            "مع توضيح سبب الرفض.",
          ],
        },
      ],
    },
    {
      ordinal: "تاسعاً",
      title: "البحث الآلي نيابة عن العضو",
      icon: Search,
      color: G,
      sections: [
        {
          subtitle: "الميزة",
          bullets: ["إضافة زر: “طلب البحث نيابة عني”"],
        },
        {
          subtitle: "آلية العمل",
          bullets: [
            {
              text: "تقوم المنصة:",
              sub: [
                "بتحليل مواصفات العضو.",
                "مطابقتها مع قاعدة البيانات.",
                "ترشيح الحسابات المناسبة آلياً.",
              ],
            },
          ],
        },
        {
          subtitle: "يشمل",
          bullets: [
            "الرجال الباحثين عن زوجة.",
            "النساء الباحثات عن زوج مناسب.",
          ],
        },
        {
          subtitle: "الرسوم",
          bullets: [
            "إصدار فاتورة إلكترونية لخدمة البحث بعد ان تقوم أدارة المنصة بتحديد مقدار الرسوم.",
          ],
        },
      ],
    },
    {
      ordinal: "عاشراً",
      title: "حالات العضوية",
      icon: BadgeCheck,
      color: P,
      sections: [
        {
          bullets: [
            "وضع كلمة “مخطوبة” امام العضوة التي مجرد ما تدخل مشروع الخطبة، وينفك عنها لو فشل المشروع.",
            "وضع كلمة “خاطب حالياً” امام العضو مجرد ما يدخل مشروع الخطبة وينفك عنه لو فشل المشروع.",
          ],
        },
        {
          subtitle: "للعضوة",
          bullets: [
            {
              text: "تظهر الحالات التالية:",
              sub: ["مخطوبة", "متزوجة"],
            },
          ],
        },
        {
          subtitle: "للعضو",
          bullets: [
            {
              text: "تظهر الحالات:",
              sub: ["خاطب حالياً", "متزوج"],
            },
          ],
        },
        {
          subtitle: "تحديث الحالة",
          bullets: ["تتغير تلقائياً حسب حالة مشروع الخطبة."],
        },
      ],
    },
    {
      ordinal: "الحادي عشر",
      title: "مراقبة السلوك والمخالفات",
      icon: AlertCircle,
      color: R,
      sections: [
        {
          subtitle: "سجل المخالفات",
          bullets: ["وجود سجل خاص بالمخالفات داخل حساب العضو."],
        },
        {
          subtitle: "الإجراءات",
          bullets: [
            "إشعار العضو بالمخالفة.",
            "حفظ المخالفات بالسجل.",
            {
              text: "إمكانية إرسال نسخة:",
              sub: ["بالبريد الإلكتروني", "أو واتساب"],
            },
          ],
        },
        {
          subtitle: "العقوبات",
          bullets: [
            "شطب العضوية.",
            "عدم استرجاع الرسوم في حال المخالفة.",
          ],
        },
      ],
    },
    {
      ordinal: "الثاني عشر",
      title: "إشعارات التواصل الدورية",
      icon: BellRing,
      color: A,
      sections: [
        {
          subtitle: "نص الإشعار",
          bullets: [
            {
              text: "تذكير العضو بما يلي:",
              sub: [
                "تحديث البيانات",
                "تحديث الحالة الاجتماعية",
                "تعديل الرغبات والشروط",
              ],
            },
          ],
        },
        {
          subtitle: "وسائل الإرسال",
          bullets: ["البريد الإلكتروني", "واتساب", "الرسائل النصية"],
        },
        {
          subtitle: "الجدولة",
          bullets: [
            "كل 90 يوم.",
            {
              text: "مع إمكانية:",
              sub: ["التعديل", "الإيقاف", "التفعيل", "تخصيص أعضاء معينين"],
            },
          ],
        },
      ],
    },
    {
      ordinal: "الثالث عشر",
      title: "كشف الأعضاء المتصلين حالياً",
      icon: Wifi,
      color: B,
      sections: [
        {
          bullets: [
            "إمكانية مشاهدة الأعضاء الأون لاين حالياً.",
            "متاحة فقط للإدارة.",
          ],
        },
      ],
    },
    {
      ordinal: "الرابع عشر",
      title: "الملاحظات الداخلية",
      icon: StickyNote,
      color: G,
      sections: [
        {
          subtitle: "ميزة الملاحظات",
          bullets: ["إضافة أيقونة ملاحظات داخل ملف العضو."],
        },
        {
          subtitle: "خصائصها",
          bullets: [
            "كتابة ملاحظات داخلية.",
            "رفع صور من الاستديو.",
            "مرجع لسلوك العضو.",
          ],
        },
        {
          subtitle: "الصلاحيات",
          bullets: ["تظهر للإدارة فقط.", "مخفية عن العضو."],
        },
      ],
    },
    {
      ordinal: "الخامس عشر",
      title: "الدخول السريع",
      icon: Fingerprint,
      color: P,
      sections: [
        {
          subtitle: "دعم",
          bullets: ["البصمة", "التعرف على الوجه", "الرقم السري"],
        },
      ],
    },
    {
      ordinal: "السادس عشر",
      title: "وسائل الدفع الإلكتروني",
      icon: CreditCard,
      color: G,
      sections: [
        {
          subtitle: "الوسائل المعتمدة",
          bullets: ["Apple Pay", "Visa", "مدى"],
        },
      ],
    },
    {
      ordinal: "السابع عشر",
      title: "صلاحيات الإدارة",
      icon: ShieldCheck,
      color: B,
      sections: [
        {
          bullets: [
            {
              text: "إمكانية منح الموظفين صلاحيات مختلفة مثل:",
              sub: [
                "مراجعة الطلبات",
                "إدارة الأعضاء",
                "متابعة المخالفات",
                "الاطلاع المالي",
                "إدارة المحتوى",
              ],
            },
          ],
        },
      ],
    },
    {
      ordinal: "الثامن عشر",
      title: "دليل استخدام التطبيق والموقع",
      icon: BookOpen,
      color: A,
      sections: [
        {
          subtitle: "توفير",
          bullets: ["دليل إلكتروني", "دليل ورقي"],
        },
        {
          subtitle: "يشمل",
          bullets: [
            "طريقة التسجيل",
            "البحث",
            "التقديم",
            "الدفع",
            "إدارة الحساب",
            "التواصل مع الدعم",
          ],
        },
      ],
    },
    {
      ordinal: "التاسع عشر",
      title: "التقدم لخطبة عضوة أول مرة أو إعادة التقدم بعد الرفض",
      icon: Heart,
      color: R,
      sections: [
        {
          bullets: [
            "وضع نظام آلي يرد على الخاطب الراغب بالانتظار أو في حال حاول التقدم لخطبة عضوة سبق وأن تقدم لها.",
          ],
        },
        {
          subtitle: "الإجراء",
          bullets: [
            "في حال أراد العضو التقدم لعضوة أول مرة فإن لم يكن هناك طلب قائم فإن الطلب يُرسل، أما في حال وجود طلب (عضو متقدم لها) فإنه يرد عليه النظام بأنه “العضوة مخطوبة حالياً، في حال رغبتكم بالانتظار نأمل...” يحدد له آلية معينة للانتظار بشرط لا يتجاوز طلبات الانتظار أكثر من طلب، ويتم إرسال له إشعار عبر الإيميل أو الواتساب بأن العضوة جاهزة لو حاب التقدم لها، وينفك الطلب عندما تتحول حالة العضوة إلى “تزوجت”.",
            "عضو تقدم لعضوة ورفضته أول مرة، في حال رأى أنه محتاج التقدم لها مرة أخرى ولم يقتنع بالرد الآلي يتم إبلاغه عبر إشعار في التطبيق: “في حال رغبتكم بالتقدم لها مرة أخرى نأمل التواصل مع إدارة المنصة لمساعدتك”.",
          ],
        },
      ],
    },
    {
      ordinal: "العشرون",
      title: "دخول التطبيق · تسجيل الزوار",
      icon: LogIn,
      color: G,
      sections: [
        {
          bullets: [
            "يمكن الدخول إلى التطبيق واستخدام “المتابعة كزائر” بشرط لا يمكنه الاستفادة من الخدمات باستثناء مراسلة إدارة المنصة والاطلاع على حسابات الأعضاء ومشاركة الحسابات والتطبيق فقط.",
          ],
        },
      ],
    },
    {
      ordinal: "الواحد والعشرون",
      title: "نظام آلية التعامل مع عروض الزواج بين العضو والعضوة",
      icon: Heart,
      color: R,
      sections: [
        {
          subtitle: "تقديم العرض",
          bullets: [
            "يتقدم العضو بطلب الزواج للعضوة عبر التطبيق.",
            "يصل الطلب للعضوة مع إشعار عبر الإيميل + الجوال + الواتساب.",
            "العرض ساري لمدة 72 ساعة من لحظة وصوله.",
          ],
        },
        {
          subtitle: "آلية التمديد",
          bullets: [
            "في حال عدم الرد خلال 72 ساعة: يصل إشعار للعضو بعدم الرد + خيار التمديد.",
            "يحق للعضو تمديد الطلب مرة أخرى بنفس المدة (72 ساعة).",
            "إذا انتهت مدة التمديد دون رد: يمكن التمديد للمرة الأخيرة (72 ساعة ثالثة).",
            "إذا لم ترد العضوة نهائياً بعد التمديدات الثلاثة: يصل إشعار للمنصة بأن العضوة (الاسم/الرقم) لم ترد على العرض.",
          ],
        },
        {
          subtitle: "تسجيل عدم التعاون",
          bullets: [
            "يُقيّد في سجل العضوة أن العضو (اسمه/رقمه) تقدم لها رغم تمديد العرض 3 مرات تذكير دون رد.",
            "تظهر للإدارة قائمة (آلية أو عند الطلب) بالأعضاء/العضوات الذين لا يردون على عروض الزواج.",
          ],
        },
        {
          subtitle: "التجميد التلقائي",
          bullets: [
            "في حال أن العضو/ة لم ترد على عروض الزواج أكثر من 3 طلبات مختلفة: يرشّح النظام تجميد العضوية وإخفاءها مع إشعار مسبق.",
            "في حال استمر التجاهل: تُصدر المنصة أمراً تقنياً بتجميد العضوية وإخفائها لمدة تحددها إدارة المنصة، مع إشعار العضو/ة بهذا الإجراء.",
          ],
        },
        {
          subtitle: "سجل سلوك التعاون",
          bullets: [
            "سجل خاص لكل عضو/ة يوضح سلوك التعاون مع المنصة في الرد على العروض والموافقة.",
            "يُستخدم لتقييم جدية العضو/ة للزواج واتخاذ قرار لاحقاً بشأن احتمال شطب العضوية والاعتذار له لعدم التعاون.",
          ],
        },
      ],
    },
    {
      ordinal: "الثاني والعشرون",
      title: "اتفاقية وتوقيع ما قبل الانتقال للواتساب",
      icon: FileSignature,
      color: P,
      sections: [
        {
          subtitle: "آلية الاتفاقية",
          bullets: [
            "قبل الانتقال للواتساب: يُعرض على الطرفين نموذج اتفاقية إلكترونية + توقيع رقمي.",
            "يُحدَّد مبلغ من المنصة (منفصل عن مبلغ التواصل الجاد) يدفعه كل طرف.",
            "هذا المبلغ قابل للاسترداد ضمن شروط الاتفاقية.",
          ],
        },
        {
          subtitle: "الهدف",
          bullets: [
            "ضمان جدية الطرفين قبل الانتقال لوسيلة تواصل خارج المنصة.",
            "حماية الطرفين بسند إلكتروني موقّع عند نشوء أي خلاف.",
          ],
        },
      ],
    },
  ];

  /* ═══ DECLARATIONS & COMMITMENTS ═══ */
  type Declaration = { ordinal: string; title: string; body: string; color: string; icon: LucideIcon; note?: string };

  const declarations: Declaration[] = [
    {
      ordinal: "أولاً",
      title: "التعهد والإقرار قبل التسجيل",
      icon: FileSignature,
      color: G,
      body:
        "أقسم بالله العلي العظيم، وأنا بكامل أهليتي الشرعية والنظامية، بأن انضمامي إلى منصة خطابة السعودية الأولى إنما هو لغرض الزواج الشرعي الجاد فقط، وليس لأي غرض آخر يخالف الأنظمة أو الآداب أو سياسات المنصة. كما أتعهد التزاماً قطعياً ونهائياً بالامتثال الكامل لجميع الشروط والأحكام والسياسات والأنظمة والتعليمات المعمول بها داخل المنصة، وأقر بتحملي لكافة المسؤوليات والآثار المترتبة على أي مخالفة تصدر مني، سواء كانت مباشرة أو غير مباشرة. والله خير الشاهدين على ما أقول.",
    },
    {
      ordinal: "ثانياً",
      title: "الإقرار بصحة البيانات بعد التسجيل",
      icon: BadgeCheck,
      color: B,
      body:
        "أقر أنا الموقع أدناه، وبكامل أهليتي المعتبرة شرعاً ونظاماً، بأن جميع البيانات والمعلومات والمستندات المدخلة في حسابي لدى منصة خطابة السعودية الأولى صحيحة وسليمة ومطابقة للواقع دون أي تزوير أو تضليل أو إخفاء لأي معلومات جوهرية. كما أتحمل كامل المسؤولية الشرعية والنظامية والقانونية تجاه أي بيانات غير صحيحة أو مضللة، ويحق لإدارة المنصة، دون أدنى اعتراض مني، اتخاذ ما تراه مناسباً من إجراءات، بما في ذلك إيقاف الحساب أو شطب العضوية أو الحرمان من خدمات المنصة بشكل دائم، دون تحملها لأي مسؤولية تجاه ذلك.",
    },
    {
      ordinal: "ثالثاً",
      title: "إقرار وتعهد بإخلاء المسؤولية",
      icon: Shield,
      color: P,
      body:
        "أقر إقراراً صريحاً ونهائياً بأنني قد اطّلعت اطلاعاً تاماً على كافة سياسات وشروط وأحكام منصة خطابة السعودية الأولى، وفهمتها فهماً كاملاً نافياً للجهالة، وأوافق عليها موافقة كاملة دون قيد أو شرط. كما أقر بأن اختياري للطرف الآخر وقرار الارتباط أو الاستمرار أو الانسحاب من أي مشروع خطبة أو زواج يتم بإرادتي الشخصية المنفردة ودون أي تأثير أو توجيه أو ضمان من إدارة المنصة أو منسوبيها. وأقر كذلك بأن دور المنصة يقتصر على التوفيق والتعارف بين الأطراف فقط، ولا تتحمل إدارة المنصة أو ملاكها أو موظفوها أي مسؤولية شرعية أو قانونية أو اجتماعية أو مالية أو نفسية أو أسرية تنشأ، بشكل مباشر أو غير مباشر، نتيجة أي تواصل، أو اتفاق أو تعامل أو علاقة تتم بين الأعضاء داخل المنصة أو خارجها. كما أتعهد بعدم الرجوع على المنصة أو المطالبة بأي تعويض أو مساءلة مهما كان نوعها أو سببها مستقبلاً.",
    },
    {
      ordinal: "رابعاً",
      title: "إقرار وتعهد بسداد عمولة المنصة بعد الملكة",
      icon: Wallet,
      color: A,
      note: "يؤخذ هذا الإقرار قبل دخول مشروع الخطبة أو المحادثات الخاصة.",
      body:
        "أقسم بالله العلي العظيم، وأتعهد تعهداً ملزماً ونهائياً، بأنه في حال إتمام الملكة (عقد القران) بيني وبين الطرف الآخر الذي تم التعارف عليه عن طريق منصة خطابة السعودية الأولى، فإنني ألتزم بسداد أتعاب وعمولة المنصة المالية كاملة دون تأخير أو مماطلة وأوافق على تحويل مبلغ وقدره (يُحدد المبلغ من طرف إدارة المنصة) إلى الحساب الرسمي المعتمد الخاص بالشركة، وذلك فور إتمام عقد القران. كما أقر بأن هذا التعهد ملزم لي شرعاً ونظاماً، والله على ما أقول شهيد. أوافق وألتزم بما ورد أعلاه.",
    },
  ];

  const declarationNotes: string[] = [
    "تقوم إدارة منصة خطابة السعودية الأولى بالاحتفاظ بجميع التعهدات والإقرارات والسجلات الإلكترونية والورقية والرجوع إليها عند الحاجة.",
    "تقوم الإدارة بوضع الأتمتة المناسبة لطباعة هذه التعهدات رسمياً وإرفاق شعار وبيانات الشركة واعتمادها كسندات تنظيمية وإدارية متى ما دعت الحاجة للرجوع إليها.",
    "يكون كل تعهد أو إقرار مذيلاً باسم العضو الثلاثي أو الثنائي، ورقم الجوال، والبريد الإلكتروني، وأي بيانات تعريفية تراها إدارة المنصة لازمة.",
    "يحق لإدارة المنصة تعديل أو تحديث أو إعادة صياغة أي بند أو سياسة أو إجراء تنظيمي متى ما اقتضت المصلحة التنظيمية أو القانونية ذلك، ويُعد استمرار العضو في استخدام المنصة موافقة ضمنية على تلك التعديلات.",
    "وضع أيقونة الغرض منها أخذ توقيع العضو إلكترونياً أمام الوثيقة أو الإقرار الذي نحتاج التوقيع عليه من طرف العضو.",
  ];

  /* ═══ REGISTRATION FIELDS — MAN ═══ */
  type FieldType = "text" | "choice" | "scale" | "yesno" | "conditional";
  type RegField = {
    label: string;
    type: FieldType;
    icon: LucideIcon;
    color: string;
    options?: string[];
    note?: string;
    sub?: { label: string; options?: string[]; note?: string }[];
  };

  const manFields: RegField[] = [
    {
      label: "هل أنت متزوج؟ عدد الزوجات التي على ذمتك",
      type: "text",
      icon: Heart,
      color: G,
      note: "هل يوجد أطفال؟ كم عددهم من الأولى / من الثانية / التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "كم مرة تزوجت؟",
      type: "conditional",
      icon: HeartCrack,
      color: A,
      options: ["مرة واحدة", "مرتين", "ثلاث مرات"],
      sub: [
        { label: "سبب الانفصال (كتابة 500 حرف)" },
        { label: "هل يوجد أطفال؟ كم عددهم وما أعمارهم (كتابة 500 حرف)" },
      ],
    },
    {
      label: "كم مضى على انفصالك؟",
      type: "text",
      icon: Clock,
      color: B,
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "مدى استعدادك للزواج",
      type: "choice",
      icon: Heart,
      color: G,
      options: ["أرغب بالزواج بأسرع وقت ممكن", "أحتاج لبعض الوقت", "ليس في عجلة من أمري"],
      note: "السبب (كتابة 500 حرف)",
    },
    {
      label: "هل تقبل بالزواج من أجنبية (غير سعودية)؟",
      type: "yesno",
      icon: Globe,
      color: P,
      options: ["لا", "نعم"],
      sub: [
        {
          label: "حدد نوع الجنسية",
          options: ["كويتية", "بحرينية", "إماراتية", "قطرية", "عُمانية", "سورية", "يمنية", "مصرية", "أردنية"],
          note: "تفضّلها من مواليد السعودية أو مقيمة",
        },
      ],
    },
    {
      label: "درجة الوسامة (المستوى من 1 إلى 10)",
      type: "scale",
      icon: Award,
      color: G,
    },
    {
      label: "مستوى التدين",
      type: "choice",
      icon: Shield,
      color: B,
      options: ["ملتزم", "محافظ", "وسطي", "متفتح", "متحرر"],
      note: "السبب (كتابة 500 حرف)",
    },
    {
      label: "الصلاة والعبادة · هل تصلي؟",
      type: "choice",
      icon: Sparkles,
      color: A,
      options: ["أسبوعياً", "يومياً", "أحياناً", "في المناسبات الدينية", "لا أصلي"],
      note: "السبب (كتابة 500 حرف)",
    },
    {
      label: "مشروع الإنجاب",
      type: "choice",
      icon: Baby,
      color: P,
      options: ["حسب الظروف", "بعد سنة", "في أقرب وقت", "لا أريد إنجاب"],
      note: "السبب (كتابة 500 حرف)",
    },
    {
      label: "نوع العرق",
      type: "choice",
      icon: Users,
      color: G,
      options: ["أبيض", "أسمر", "مختلط (الأب / الأم)"],
      note: "التفاصيل",
    },
    {
      label: "العمل أو الدراسة",
      type: "choice",
      icon: Briefcase,
      color: B,
      options: [
        "نعم أريد إكمال الدراسة",
        "لا، ليس لدي رغبة",
        "حسب الظروف",
        "أفكر بالتقاعد",
        "أفكر بالانتقال إلى عمل آخر",
      ],
      note: "التفاصيل",
    },
    {
      label: "هل عليك إيقاف خدمات؟",
      type: "yesno",
      icon: Ban,
      color: R,
      options: ["لا يوجد", "نعم يوجد"],
      note: "السبب (كتابة 500 حرف)",
    },
    {
      label: "الحالة المادية",
      type: "choice",
      icon: Wallet,
      color: G,
      options: ["ميسور الحال", "مقتدر", "غني", "مستثمر", "تاجر", "صاحب أملاك"],
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "نأمل تحديد مستوى الراتب",
      type: "choice",
      icon: Banknote,
      color: B,
      options: [
        "من 4,000 إلى 10,000",
        "من 11,000 إلى 15,000",
        "من 16,000 إلى 20,000",
        "من 21,000 إلى 25,000",
        "من 26,000 إلى 35,000",
      ],
      note: "هل يوجد دخل آخر؟ (كتابة 500 حرف)",
    },
    {
      label: "نوع الزواج المطلوب",
      type: "choice",
      icon: ScrollText,
      color: P,
      options: [
        "زواج تقليدي (زواج عادي) معلن من جميع الأطراف بعلم العائلة والموثق عبر ناجز والمستوفي لجميع حقوق المرأة",
        "زواج بشروط خاصة (زواج المسيار): يُتفق على شروطه بين الزوجين كل حسب ظروفه (المبيت، النفقة، إلخ) ويمكن تسجيل العقد في ناجز أو خارج ناجز",
      ],
    },
    {
      label: "هل تقود سيارة؟",
      type: "yesno",
      icon: Car,
      color: G,
      options: ["نعم", "لا"],
      note: "اذكر التفاصيل",
    },
    {
      label: "طبيعة بيئة العمل",
      type: "choice",
      icon: Briefcase,
      color: A,
      options: ["مختلط", "غير مختلط", "مختلط · قسم خاص للرجال"],
    },
    {
      label: "هل تتعاطى أدوية معينة؟",
      type: "yesno",
      icon: Pill,
      color: R,
      options: ["لا", "نعم"],
      note: "اذكر تفاصيل الأدوية",
    },
    {
      label: "هل سبق وأن صدر في حقك حكم قضائي؟",
      type: "yesno",
      icon: Gavel,
      color: R,
      options: ["لا", "نعم"],
      note: "اذكر نوع الحكم وتفاصيله",
    },
    {
      label: "هل عليك مصاريف نفقة من طلقتك السابقة؟",
      type: "yesno",
      icon: Wallet,
      color: A,
      options: ["لا", "نعم"],
      note: "اذكر تفاصيل النفقة",
    },
    {
      label: "هل تعول أحداً من الأسرة (أبناء، أب، أم، إخوة، أخوات قُصّر)؟",
      type: "yesno",
      icon: Users,
      color: B,
      options: ["لا", "نعم"],
      note: "اذكر تفاصيل النفقة",
    },
    {
      label: "الملاحظات (اختياري)",
      type: "text",
      icon: StickyNote,
      color: G,
    },
  ];

  const womanFields: RegField[] = [
    {
      label: "كم مرة تزوجتِ؟",
      type: "conditional",
      icon: HeartCrack,
      color: A,
      options: ["مرة واحدة", "مرتين", "ثلاث مرات"],
      sub: [
        { label: "سبب الانفصال (كتابة 500 حرف)" },
        { label: "هل يوجد أطفال؟ كم عددهم وما أعمارهم (كتابة 500 حرف)" },
      ],
    },
    {
      label: "كم مضى على انفصالك؟",
      type: "text",
      icon: Clock,
      color: B,
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "مدى استعدادك للزواج",
      type: "choice",
      icon: Heart,
      color: G,
      options: ["أرغب بالزواج بأسرع وقت ممكن", "أحتاج لبعض الوقت", "ليس في عجلة من أمري"],
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "درجة الجمال (المستوى من 1 إلى 10)",
      type: "scale",
      icon: Award,
      color: P,
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "مستوى التدين",
      type: "choice",
      icon: Shield,
      color: B,
      options: ["ملتزمة", "محافظة", "وسطية", "متفتحة", "متحررة"],
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "الصلاة والعبادة · (أصلي)",
      type: "choice",
      icon: Sparkles,
      color: A,
      options: ["أسبوعياً", "يومياً", "أحياناً", "في المناسبات الدينية", "أبداً"],
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "نوع الحجاب",
      type: "choice",
      icon: Shield,
      color: G,
      options: ["نقاب", "برقع", "محجبة", "سفور", "شيلة فوق الرأس", "خمار"],
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "نوع لبس العباءة",
      type: "choice",
      icon: Shield,
      color: P,
      options: [
        "عباءة رأس سوداء",
        "عباءة كتف سوداء واسعة",
        "عباءة كتف سوداء ضيقة",
        "عباءة سوداء مفتوحة",
        "عباءة كتف ملونة مفتوحة",
        "عباءة كتف ملونة",
        "بدون عباءة",
      ],
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "هل يوجد شوفة شرعية؟",
      type: "yesno",
      icon: Eye,
      color: B,
      options: ["نعم يوجد", "لا يوجد"],
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "من هو ولي أمرك؟",
      type: "choice",
      icon: Users,
      color: A,
      options: ["والدي", "ابني", "أخي", "عمي"],
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "مشروع الإنجاب",
      type: "choice",
      icon: Baby,
      color: P,
      options: ["حسب الظروف", "بعد سنة", "في أقرب وقت", "لا أريد إنجاب"],
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "العِرق",
      type: "choice",
      icon: Users,
      color: G,
      options: ["أبيض", "أسمر", "مختلط (الأب / الأم / الجدة / الجد)"],
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "مكان العيش بعد الزواج",
      type: "choice",
      icon: Home,
      color: B,
      options: [
        "أقبل العيش مع أهلي",
        "أقبل العيش مع أهله (أهل الزوج)",
        "لدي سكن خاص فيني",
        "يوفر لي سكن مستقل",
        "في منزل أهله مؤقتاً + سكن مؤقت نجتمع أسبوعياً",
      ],
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "العمل أو الدراسة",
      type: "choice",
      icon: Briefcase,
      color: B,
      options: [
        "نعم أريد",
        "ليس لدي رغبة",
        "حسب الظروف",
        "أفكر بالتقاعد",
        "أفكر بالدراسة / العمل لاحقاً",
      ],
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "هل يوجد عليك إيقاف خدمات؟",
      type: "yesno",
      icon: Ban,
      color: R,
      options: ["لا", "نعم"],
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "الحالة المادية",
      type: "choice",
      icon: Wallet,
      color: G,
      options: ["ميسورة الحال", "مقتدرة", "غنية", "مستثمرة", "صاحبة أملاك", "وريثة"],
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "نأمل تحديد مستوى الراتب",
      type: "choice",
      icon: Banknote,
      color: B,
      options: [
        "من 4,000 إلى 10,000",
        "من 11,000 إلى 15,000",
        "من 16,000 إلى 20,000",
        "من 21,000 إلى 25,000",
        "من 26,000 إلى 35,000",
        "غير موظفة",
      ],
      note: "هل يوجد دخل آخر؟ (كتابة 500 حرف)",
    },
    {
      label: "هل تقبلين الانتقال إلى مدينة أخرى؟",
      type: "text",
      icon: MapPin,
      color: A,
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "هل تقودين سيارة وهل تفكرين بقيادة السيارة مستقبلاً؟",
      type: "text",
      icon: Car,
      color: G,
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "هل تجيدين الطبخ؟ (نبذة عن أنواع الطبخ)",
      type: "text",
      icon: ChefHat,
      color: A,
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "نوع بيئة العمل",
      type: "choice",
      icon: Briefcase,
      color: B,
      options: ["مختلط", "غير مختلط", "مختلط · قسم خاص للنساء", "لا يوجد"],
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "هل تتعاطين أدوية؟",
      type: "text",
      icon: Pill,
      color: R,
      note: "التفاصيل (كتابة 500 حرف)",
    },
    {
      label: "نوع الزواج المطلوب",
      type: "choice",
      icon: ScrollText,
      color: P,
      options: [
        "أقبل بزوج معدد",
        "أقبل بزوج معدد بشرط",
        "أقبل زواج المسيار (شروط خاصة) بشرط",
      ],
      note:
        "في حال اختيار العضوة أحد هذه الخيارات: تظهر بجانب اسم حسابها وسم مرئي للأعضاء بصيغة (تقبل زواج المسيار / تقبل معدد / تقبل معدد بشروط) حسب اختيارها. الزواج بشروط يتفق عليها الطرفان كل حسب ظروفه مثل عدم الالتزام بالمبيت اليومي أو توفير سكن أو نفقة وأي شروط أخرى يتفق عليها الطرفان، ويمكن تسجيل الزواج في أبشر أو خارج أبشر. (كتابة 500 حرف)",
    },
    {
      label: "هل ترغبين بزوج غير سعودي؟",
      type: "yesno",
      icon: Globe,
      color: B,
      options: ["لا", "نعم"],
      sub: [
        {
          label: "حددي الجنسيات المقبولة",
          options: [
            "إماراتي",
            "كويتي",
            "بحريني",
            "قطري",
            "عُماني",
            "يمني",
            "أردني",
            "فلسطيني",
            "لبناني",
            "سوري",
            "عراقي",
            "مصري",
            "سوداني",
            "ليبي",
            "تونسي",
            "جزائري",
            "مغربي",
            "موريتاني",
            "صومالي",
            "جيبوتي",
            "قُمري (جزر القمر)",
          ],
          note: "تفضّلينه من مواليد السعودية أو مقيماً فيها (اختياري)",
        },
      ],
    },
    {
      label: "هل سبق وأن صدر في حقك حكم قضائي؟",
      type: "yesno",
      icon: Gavel,
      color: R,
      options: ["لا", "نعم"],
      note: "اذكري نوع الحكم وتفاصيله (كتابة 500 حرف)",
    },
    {
      label: "الملاحظات (اختياري)",
      type: "text",
      icon: StickyNote,
      color: G,
      note: "أي ملاحظات تودين إضافتها لإدارة المنصة أو للطرف الآخر (كتابة 500 حرف)",
    },
  ];

  /* ═══ RENDER ═══ */

  const stackEntries = Object.entries(stack) as [keyof typeof stack, (typeof stack)[keyof typeof stack]][];
  const activeStackData = stack[activeStack];

  return (
    <ArabicTailProcessor>
      <div ref={ref} style={{ background: "#fff", color: D, fontFamily: "'Ahmed Sans', sans-serif" }}>
        <KhattabaSectionNav />
        <KhattabaChat />

        {/* ═══ HERO ═══ */}
        <section
          className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
          style={{ background: "#fff" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[320px] pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${G}18 0%, transparent 70%)` }}
          />

          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
            <div className="ph-hero opacity-0 text-center mb-4" style={{ paddingTop: 40 }}>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold"
                style={{ background: `${G}18`, color: D, border: `1px solid ${G}` }}
              >
                <FileText size={12} color={D} /> الملحق (أ) · الإصدار 1.0 · سري وخاص
              </span>
            </div>

            <div className="ph-hero opacity-0 text-center mb-4">
              <h1 className="ar-heading" style={{ fontSize: "clamp(36px, 8vw, 78px)", lineHeight: 1.25, color: D }}>
                مسار العمل <span style={{ color: G }}>التفصيلي</span>
              </h1>
            </div>

            <div className="ph-hero opacity-0 text-center mb-6">
              <p className="ar-body text-lg md:text-xl" style={{ color: "rgba(0,0,0,0.55)" }}>
                منصة خطابة السعودية الأولى · تطوير مستمر للموقع القائم وإطلاق تطبيق جوال جديد للعملاء
              </p>
              <p className="text-xl font-bold mt-2 ar-heading" style={{ color: D }}>
                kh1-ksa.com.sa
              </p>
            </div>

            {/* From / To */}
            <div className="ph-hero opacity-0 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 w-full max-w-2xl">
              <div className="rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>إعداد المطور</p>
                <p className="text-[14px] font-bold ar-body">أحمد علي</p>
                <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>Full-Stack Digital Strategist</p>
                <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>hello@ahmedali.online</p>
              </div>
              <div
                className="rounded-[16px] p-5"
                style={{ background: "#fff", border: `2px solid ${G}`, boxShadow: `3px 3px 0px 0px ${D}` }}
              >
                <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>العميل</p>
                <p className="text-[14px] font-bold ar-body">شركة خطابة السعودية الأولى للتجارة (ذ.م.م)</p>
                <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>سجل تجاري: 1010158509</p>
                <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>المملكة العربية السعودية · العربية (RTL)</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="ph-hero opacity-0 mb-10 w-full max-w-3xl">
              <div
                className="flex items-stretch justify-center"
                style={{
                  background: "#fff",
                  border: "1px solid #E8E8E8",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                }}
              >
                {[
                  { n: "12", l: "أسبوع تنفيذ" },
                  { n: "5", l: "مراحل" },
                  { n: "26", l: "شاشة موقع وأدمن" },
                  { n: "20K", l: "ريال إجمالي" },
                  { n: "3 أشهر", l: "ضمان ودعم" },
                ].map((s, i) => (
                  <div
                    key={s.l}
                    className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative"
                    style={{ borderRight: i > 0 ? "1px solid #F0F0F0" : "none" }}
                  >
                    <span className="ar-heading" style={{ fontSize: 24, lineHeight: 1, color: D }}>{s.n}</span>
                    <span className="text-[9px] font-bold mt-1 ar-body text-center" style={{ color: "rgba(0,0,0,0.35)" }}>{s.l}</span>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Scope intro card */}
            <div
              className="ph-hero opacity-0 rounded-[16px] p-6 mb-6 max-w-3xl w-full relative overflow-hidden"
              style={{ background: "#fff", border: "1px solid #EBEBEB" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `${G}10` }}>
                  <FileText size={18} color={G} />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>نطاق الوثيقة</p>
                  <p className="text-[13px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>
                    تهدف هذه الوثيقة إلى توضيح النطاق التفصيلي والمنهجية المتبعة في تطوير منصة خطابة السعودية الأولى، وهي منصة قائمة وتعمل بالفعل، نقوم بتطويرها المستمر وترقية بنيتها التقنية، إلى جانب إطلاق تطبيق جوال جديد للعملاء. المنصة عبارة عن خدمة وساطة زواج إلكترونية تستهدف السوق السعودي، وتعمل كوسيط آمن وموثوق يربط الراغبين في الزواج وفق ضوابط شرعية ونظامية.
                  </p>
                </div>
              </div>
            </div>

            <div className="ph-hero opacity-0 flex flex-col items-center gap-2 mt-4">
              <div
                style={{
                  width: 24,
                  height: 38,
                  border: "1.5px solid rgba(0,0,0,0.14)",
                  borderRadius: 12,
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 5,
                }}
              >
                <div
                  style={{
                    width: 3,
                    height: 6,
                    borderRadius: 2,
                    background: G,
                    animation: "mouseScroll 1.6s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          </div>
          <style>{`@keyframes mouseScroll{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
        </section>

        {/* ═══ PROJECT SUMMARY ═══ */}
        <section id="section-01" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
          <div className="max-w-5xl mx-auto">
            <SectionHead eyebrow="القسم الأول" subtitle="معلومات تعريفية موجزة عن المشروع كما وردت في الملحق (أ)">
              ملخص <span style={{ color: G }}>المشروع</span>
            </SectionHead>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ph-stagger">
              {[
                { label: "اسم المشروع", val: "منصة خطابة السعودية الأولى", icon: Heart, color: G },
                { label: "العميل", val: "شركة خطابة السعودية الأولى للتجارة (ذات مسؤولية محدودة) · سجل تجاري 1010158509", icon: FileSignature, color: B },
                { label: "المطور", val: "أحمد علي · hello@ahmedali.online", icon: Code2, color: P },
                { label: "نوع المشروع", val: "تطوير مستمر للموقع الحالي وترقية بنيته التقنية + إطلاق تطبيق جوال جديد للعملاء", icon: Layers, color: A },
                { label: "السوق المستهدف", val: "المملكة العربية السعودية", icon: MapPin, color: R },
                { label: "اللغة", val: "العربية (RTL)", icon: Globe, color: G },
                { label: "المدة الزمنية", val: "12 أسبوعاً (3 أشهر)", icon: Clock, color: B },
                { label: "القيمة الإجمالية", val: "20,000 ريال سعودي", icon: Wallet, color: G },
              ].map((row) => (
                <div
                  key={row.label}
                  className="ph-item rounded-[16px] p-5 flex items-center gap-4"
                  style={{ background: "#fff", border: "1px solid #EBEBEB" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${row.color}12` }}
                  >
                    <row.icon size={18} color={row.color} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: row.color }}>
                      {row.label}
                    </p>
                    <p className="text-[13px] ar-body font-bold" style={{ color: D }}>
                      {row.val}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ VISION & GOALS ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-5xl mx-auto">
            <SectionHead eyebrow="الرؤية والأهداف" subtitle="ما الذي ستحققه المنصة بعد الإطلاق · ستة أهداف محورية">
              لماذا <span style={{ color: G }}>هذه المنصة</span>
            </SectionHead>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ph-stagger">
              {goals.map((g, i) => (
                <div
                  key={g.text}
                  className="ph-item rounded-[20px] p-6"
                  style={{ background: "#fff", border: "1px solid #EBEBEB", boxShadow: "0 1px 12px rgba(0,0,0,0.03)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: `${G}12` }}
                    >
                      <g.icon size={20} color={G} />
                    </div>
                    <span className="ar-heading text-3xl" style={{ color: `${G}40` }}>
                      0{i + 1}
                    </span>
                  </div>
                  <p className="text-[13px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.7)" }}>
                    {g.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TECH STACK — TABBED ═══ */}
        <section id="section-02" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead
              eyebrow="القسم الثاني"
              color={G}
              light
              subtitle="حزمة تقنية حديثة تضمن الأداء العالي والأمان والقابلية للتوسع · مقسمة على خمسة محاور"
            >
              التقنيات <span style={{ color: G }}>المستخدمة</span>
            </SectionHead>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {stackEntries.map(([key, group]) => {
                const Icon = group.icon;
                const isActive = activeStack === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveStack(key)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[12px] font-bold transition-all"
                    style={{
                      background: isActive ? group.color : "rgba(255,255,255,0.04)",
                      color: isActive ? D : "rgba(255,255,255,0.7)",
                      border: `1px solid ${isActive ? group.color : "rgba(255,255,255,0.1)"}`,
                      cursor: "pointer",
                    }}
                  >
                    <Icon size={14} />
                    <span className="ar-body">{group.label}</span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{
                        background: isActive ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.06)",
                        color: isActive ? D : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {group.items.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active stack panel */}
            <div
              className="rounded-[24px] p-8 md:p-10 transition-all"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${activeStackData.color}30`,
              }}
            >
              <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: `${activeStackData.color}18` }}
                  >
                    <activeStackData.icon size={26} color={activeStackData.color} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[3px] uppercase mb-1" style={{ color: activeStackData.color }}>
                      {activeStackData.sub}
                    </p>
                    <h3 className="ar-heading text-2xl" style={{ color: "#fff" }}>
                      {activeStackData.label}
                    </h3>
                  </div>
                </div>
                <div className="text-[11px] ar-body" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {activeStackData.items.length} تقنية
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeStackData.items.map((it) => (
                  <div
                    key={it.tech}
                    className="rounded-[14px] p-4 flex items-start gap-3"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                      style={{ background: activeStackData.color }}
                    />
                    <div>
                      <p className="text-[13px] font-bold mb-1" style={{ color: "#fff", fontFamily: "system-ui" }}>
                        {it.tech}
                      </p>
                      <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {it.use}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ WHO USES WHAT ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "80px 24px 0", background: "#fff" }}>
          <div className="max-w-5xl mx-auto">
            <SectionHead
              eyebrow="من يستخدم ماذا"
              subtitle="ثلاث منصات مترابطة، كل طرف يدخل من بوابته الخاصة على نفس قاعدة البيانات الموحدة"
            >
              المنصات <span style={{ color: G }}>والمستخدمون</span>
            </SectionHead>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 ph-stagger">
              {[
                {
                  who: "العملاء",
                  whoSub: "الراغبون في الزواج",
                  uses: "الموقع الإلكتروني",
                  desc: "تصفح، تسجيل، طلبات تواصل، شات مراقب، دفع، كل ذلك من خلال متصفح الويب.",
                  icon: Users,
                  color: G,
                },
                {
                  who: "العملاء",
                  whoSub: "الراغبون في الزواج",
                  uses: "تطبيق الجوال (جديد)",
                  desc: "نفس وظائف الموقع بتجربة محسّنة للجوال + إشعارات فورية + واجهة Onboarding.",
                  icon: Smartphone,
                  color: P,
                },
                {
                  who: "الشركة",
                  whoSub: "مالك المنصة وفريقه",
                  uses: "لوحة التحكم الإدارية",
                  desc: "إدارة الأعضاء، مراقبة المحادثات، المدفوعات، التقارير، الإعدادات، جزء من الموقع نفسه.",
                  icon: Settings,
                  color: B,
                },
              ].map((p) => (
                <div
                  key={p.uses}
                  className="ph-item rounded-[18px] p-6"
                  style={{ background: "#fff", border: `1.5px solid ${p.color}30`, boxShadow: `3px 3px 0px 0px ${p.color}25` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: `${p.color}12` }}
                    >
                      <p.icon size={22} color={p.color} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-wider uppercase" style={{ color: p.color }}>
                        {p.who}
                      </p>
                      <p className="text-[10px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>
                        {p.whoSub}
                      </p>
                    </div>
                  </div>
                  <h4 className="ar-heading text-lg mb-2" style={{ color: D }}>
                    {p.uses}
                  </h4>
                  <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SITEMAP — CENTERPIECE ═══ */}
        <section id="section-03" className="ph-slide opacity-0" style={{ padding: "60px 24px 100px", background: "#fff" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead
              eyebrow="القسم الثالث"
              subtitle="هيكل الصفحات والمحتوى · الموقع (واجهة عامة + داشبورد إدارة) + تطبيق الجوال"
            >
              خريطة <span style={{ color: G }}>الموقع</span>
            </SectionHead>

            {/* Tree-style root */}
            <div className="ph-stagger">
              <div className="flex justify-center mb-6">
                <div
                  className="ph-item inline-flex items-center gap-3 px-8 py-4 rounded-full ar-heading text-xl"
                  style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}` }}
                >
                  <Globe size={20} />
                  منصة خطابة السعودية الأولى
                </div>
              </div>

              <div className="flex justify-center mb-2">
                <div className="w-[3px] h-8" style={{ background: G }} />
              </div>

              <div className="hidden md:flex justify-center mb-2">
                <div className="h-[3px] rounded-full" style={{ width: "55%", background: `linear-gradient(90deg, ${G}30, ${G}, ${G}30)` }} />
              </div>

              {/* Two main pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {[
                  {
                    label: "الموقع الإلكتروني",
                    sub: "kh1-ksa.com.sa · تطوير مستمر",
                    icon: Globe,
                    color: G,
                    nested: [
                      { code: "P01 إلى P17", text: "الواجهة العامة (17 صفحة)", icon: Users },
                      { code: "A01 إلى A09", text: "داشبورد الإدارة (9 شاشات)", icon: Settings },
                    ],
                  },
                  {
                    label: "تطبيق الجوال",
                    sub: "iOS + Android · إطلاق جديد",
                    icon: Smartphone,
                    color: P,
                    nested: [
                      { code: "P01 إلى P17", text: "نفس صفحات الموقع بتصميم محمول", icon: Layers },
                      { code: "+5", text: "Splash · Onboarding · Bottom Nav · Push · CodePush", icon: Sparkles },
                    ],
                  },
                ].map((b) => (
                  <div key={b.label} className="ph-item flex flex-col items-center">
                    <div className="hidden md:block w-[3px] h-6 mb-2" style={{ background: b.color }} />
                    <div
                      className="w-full rounded-[20px] p-6"
                      style={{ background: "#fff", border: `1.5px solid ${b.color}`, boxShadow: `3px 3px 0px 0px ${b.color}40` }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center"
                          style={{ background: `${b.color}15` }}
                        >
                          <b.icon size={22} color={b.color} />
                        </div>
                        <div>
                          <p className="ar-heading text-lg" style={{ color: D }}>
                            {b.label}
                          </p>
                          <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.45)" }}>
                            {b.sub}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {b.nested.map((n) => (
                          <div
                            key={n.text}
                            className="flex items-start gap-3 p-3 rounded-xl"
                            style={{ background: `${b.color}06`, border: `1px solid ${b.color}15` }}
                          >
                            <n.icon size={14} color={b.color} className="flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-bold mb-0.5" style={{ color: b.color, fontFamily: "system-ui" }}>
                                {n.code}
                              </p>
                              <p className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.65)" }}>
                                {n.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Public pages grid */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-7 rounded-full" style={{ background: G }} />
                  <h3 className="ar-heading text-2xl">3.1 صفحات الموقع · الواجهة العامة</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ph-stagger">
                  {publicPages.map((p) => (
                    <div
                      key={p.code}
                      className="ph-item rounded-[14px] p-4 flex items-start gap-3 transition-all hover:-translate-y-0.5"
                      style={{ background: "#fff", border: "1px solid #EBEBEB", boxShadow: "0 1px 8px rgba(0,0,0,0.02)" }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${G}10` }}
                      >
                        <p.icon size={16} color={G} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                            style={{ background: D, color: G, fontFamily: "system-ui" }}
                          >
                            {p.code}
                          </span>
                          <span className="text-[13px] ar-body font-bold" style={{ color: D }}>
                            {p.page}
                          </span>
                        </div>
                        <p className="text-[10px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin pages */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-7 rounded-full" style={{ background: B }} />
                  <h3 className="ar-heading text-2xl">3.2 لوحة التحكم الإدارية</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ph-stagger">
                  {adminPages.map((p) => (
                    <div
                      key={p.code}
                      className="ph-item rounded-[14px] p-4 flex items-start gap-3"
                      style={{ background: "#fff", border: `1px solid ${B}25` }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${B}10` }}
                      >
                        <p.icon size={16} color={B} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                            style={{ background: B, color: "#fff", fontFamily: "system-ui" }}
                          >
                            {p.code}
                          </span>
                          <span className="text-[13px] ar-body font-bold" style={{ color: D }}>
                            {p.page}
                          </span>
                        </div>
                        <p className="text-[10px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile extras */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-7 rounded-full" style={{ background: P }} />
                  <h3 className="ar-heading text-2xl">3.3 شاشات تطبيق الجوال (Flutter)</h3>
                </div>
                <p className="text-[12px] ar-body mb-6" style={{ color: "rgba(0,0,0,0.5)" }}>
                  يحتوي التطبيق على نفس صفحات الموقع الإلكتروني (P01 إلى P17) بتصميم متوافق مع الأجهزة المحمولة، بالإضافة إلى:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 ph-stagger">
                  {mobileExtras.map((m) => (
                    <div
                      key={m.title}
                      className="ph-item rounded-[14px] p-4 text-center"
                      style={{ background: `${P}06`, border: `1px solid ${P}25` }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                        style={{ background: `${P}15` }}
                      >
                        <m.icon size={16} color={P} />
                      </div>
                      <p className="text-[12px] font-bold ar-body mb-1" style={{ color: D }}>
                        {m.title}
                      </p>
                      <p className="text-[10px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
                        {m.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ USER JOURNEY — 12 STEPS ═══ */}
        <section id="section-04" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-5xl mx-auto">
            <SectionHead
              eyebrow="القسم الرابع · سير العمل"
              subtitle="رحلة المستخدم من لحظة الوصول حتى إتمام التوصيل عبر الإدارة · اثنتا عشرة مرحلة"
            >
              رحلة <span style={{ color: G }}>المستخدم</span>
            </SectionHead>

            <div className="relative">
              {/* Vertical connector line */}
              <div
                className="absolute right-[27px] md:right-1/2 md:translate-x-1/2 top-0 bottom-0 w-[2px] hidden sm:block"
                style={{ background: `linear-gradient(180deg, ${G}, ${G}30)` }}
              />

              <div className="flex flex-col gap-5 ph-stagger relative z-10">
                {journey.map((j, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <div
                      key={j.step}
                      className={`ph-item flex flex-col sm:flex-row items-stretch gap-4 ${isLeft ? "sm:flex-row-reverse" : ""}`}
                    >
                      <div className={`flex-1 ${isLeft ? "sm:text-left" : "sm:text-right"}`}>
                        <div
                          className="rounded-[16px] p-5 inline-block max-w-full"
                          style={{
                            background: "#fff",
                            border: "1px solid #EBEBEB",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                          }}
                        >
                          <p className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: G }}>
                            المرحلة {String(j.step).padStart(2, "0")}
                          </p>
                          <p className="ar-heading text-lg mb-2" style={{ color: D }}>
                            {j.phase}
                          </p>
                          <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
                            {j.desc}
                          </p>
                        </div>
                      </div>

                      {/* Center node */}
                      <div className="flex sm:flex-col items-center justify-center sm:w-[56px] flex-shrink-0">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center"
                          style={{
                            background: "#fff",
                            border: `3px solid ${G}`,
                            boxShadow: `0 4px 16px ${G}30`,
                          }}
                        >
                          <j.icon size={20} color={G} />
                        </div>
                      </div>

                      <div className="hidden sm:block flex-1" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ MONITORED CHAT SYSTEM ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-5xl mx-auto">
            <SectionHead eyebrow="4.2 · قلب النظام" subtitle="غرفة محادثة آمنة بمدة مرنة تتحكم بها الإدارة · فلترة محتوى تلقائية + تدخل إداري كطرف ثالث في الرسائل">
              نظام الشات <span style={{ color: G }}>المراقب</span>
            </SectionHead>

            {/* Top three pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 ph-stagger">
              {[
                { title: "مدة المحادثة", val: "مرنة · تحدّدها الإدارة", desc: "لا ليميت زمني افتراضي · يمكن للإدارة تحديد المدة وتمديدها (مثلاً 30 أو 60 يوماً) لكل غرفة على حدة.", icon: Clock, color: G },
                { title: "معرّف الشات", val: "مشروع خطبة #رقم", desc: "كل غرفة شات تأخذ رقماً مرجعياً تلقائياً للرجوع إليها من الإدارة والطرفين.", icon: Hash, color: B },
                { title: "تدخل الإدارة", val: "طرف ثالث في الرسائل", desc: "الإدارة تقرأ المحادثة لحظياً ولها صلاحية إرسال رسائل والتدخل بين الطرفين متى لزم.", icon: Eye, color: P },
              ].map((c) => (
                <div
                  key={c.title}
                  className="ph-item rounded-[20px] p-6 text-center"
                  style={{ background: "#fff", border: `1.5px solid ${c.color}30`, boxShadow: `3px 3px 0px 0px ${c.color}25` }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: `${c.color}12` }}
                  >
                    <c.icon size={20} color={c.color} />
                  </div>
                  <p className="text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: c.color }}>
                    {c.title}
                  </p>
                  <p className="ar-heading text-2xl mb-2" style={{ color: D }}>{c.val}</p>
                  <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Content filter */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${R}12` }}
                >
                  <Filter size={18} color={R} />
                </div>
                <h3 className="ar-heading text-xl">آلية فلترة المحتوى</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ph-stagger">
                {chatFilters.map((f) => (
                  <div
                    key={f.item}
                    className="ph-item rounded-[14px] p-4 flex items-start gap-3"
                    style={{ background: `${R}06`, border: `1px solid ${R}20` }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${R}12` }}
                    >
                      <f.icon size={14} color={R} />
                    </div>
                    <span className="text-[12px] ar-body leading-relaxed flex-1 mt-1.5" style={{ color: "rgba(0,0,0,0.65)" }}>
                      {f.item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* End scenarios */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${A}12` }}
                >
                  <ListChecks size={18} color={A} />
                </div>
                <h3 className="ar-heading text-xl">سيناريوهات انتهاء المحادثة</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ph-stagger">
                {chatEnd.map((s) => (
                  <div
                    key={s.title}
                    className="ph-item rounded-[16px] p-5"
                    style={{ background: "#fff", border: `1px solid ${s.color}30` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${s.color}12` }}
                      >
                        <s.icon size={18} color={s.color} />
                      </div>
                      <h4 className="ar-heading text-base" style={{ color: D }}>
                        {s.title}
                      </h4>
                    </div>
                    <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ PAYMENT QUESTIONS ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-4xl mx-auto">
            <SectionHead
              eyebrow="4.3 · نظام الدفع"
              subtitle="القواعد المعتمدة لرسوم وعمولات المنصة · جميعها قابلة للتعديل لاحقاً من لوحة التحكم دون أي تعديلات برمجية"
            >
              نظام <span style={{ color: G }}>الدفع المعتمد</span>
            </SectionHead>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ph-stagger">
              {paymentRules.map((r, i) => (
                <div
                  key={r.title}
                  className="ph-item rounded-[18px] p-6"
                  style={{ background: "#fff", border: `1px solid ${r.color}25`, boxShadow: "0 1px 12px rgba(0,0,0,0.03)" }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${r.color}12` }}
                    >
                      <r.icon size={18} color={r.color} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: r.color }}>
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="text-[14px] ar-body font-bold" style={{ color: D }}>
                        {r.title}
                      </p>
                    </div>
                  </div>
                  <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>
                    {r.body}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="mt-8 rounded-[16px] p-5 flex items-start gap-3"
              style={{ background: `${G}08`, border: `1px solid ${G}25` }}
            >
              <Sparkles size={16} color={G} className="flex-shrink-0 mt-1" />
              <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.7)" }}>
                <strong style={{ color: G }}>ملاحظة: </strong>
                جميع المبالغ والمدد والقواعد أعلاه قابلة للتعديل من لوحة التحكم الإدارية، ويتم تحديدها يدوياً لكل عضو/غرفة دون الحاجة لأي تعديل برمجي.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ PHASES ═══ */}
        <section id="section-05" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-5xl mx-auto">
            <SectionHead
              eyebrow="القسم الخامس"
              subtitle="خمس مراحل متسلسلة على مدار 12 أسبوعاً · مع توزيع الدفعات والمخرجات لكل مرحلة"
            >
              المراحل التفصيلية <span style={{ color: G }}>والمخرجات</span>
            </SectionHead>

            <div className="flex flex-col gap-6 ph-stagger">
              {phases.map((p) => (
                <PhaseCard key={p.num} p={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ OPERATIONAL TERMS ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead
              eyebrow="بنود إضافية"
              subtitle="توضيحات تشغيلية وتعاقدية مكمّلة لنطاق العمل · تحدد المسؤوليات المالية والتقنية بين الطرفين"
            >
              الشروط <span style={{ color: G }}>التشغيلية</span>
            </SectionHead>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ph-stagger">
              {operationalTerms.map((t) => (
                <div
                  key={t.title}
                  className="ph-item rounded-[18px] p-6 flex flex-col"
                  style={{ background: "#fff", border: "1px solid #EBEBEB", boxShadow: "0 1px 12px rgba(0,0,0,0.03)" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: `${t.badgeColor}12` }}
                    >
                      <t.icon size={18} color={t.badgeColor} />
                    </div>
                    <span
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold"
                      style={{ background: `${t.badgeColor}12`, color: t.badgeColor }}
                    >
                      {t.badge}
                    </span>
                  </div>
                  <h4 className="ar-heading text-lg mb-2" style={{ color: D }}>
                    {t.title}
                  </h4>
                  <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                    {t.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Summary footer */}
            <div
              className="mt-8 rounded-[18px] p-6 flex items-start gap-4"
              style={{ background: `${G}06`, border: `1px solid ${G}25` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${G}15` }}
              >
                <FileSignature size={18} color={G} />
              </div>
              <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.7)" }}>
                <strong style={{ color: G }}>ملاحظة: </strong>
                هذه البنود مكمّلة لما ورد في المراحل والمخرجات أعلاه، وتُعتبر جزءاً لا يتجزأ من العقد. أي تغيير على نطاق العمل أو المسؤوليات المالية يستلزم اتفاقاً كتابياً منفصلاً بين الطرفين.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ TIMELINE / GANTT ═══ */}
        <section id="section-06" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead
              eyebrow="القسم السادس"
              color={G}
              light
              subtitle="التوزيع الزمني للمشروع على مدار 12 أسبوعاً · مع التداخل بين مرحلتي الواجهة والخلفية"
            >
              المخطط <span style={{ color: G }}>الزمني</span>
            </SectionHead>

            <div
              className="rounded-[24px] p-6 md:p-10"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Week header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-[110px] flex-shrink-0" />
                <div className="flex-1 grid grid-cols-12 gap-1">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => (
                    <div
                      key={w}
                      className="text-center text-[10px] font-bold py-1"
                      style={{ color: "rgba(255,255,255,0.4)", fontFamily: "system-ui" }}
                    >
                      W{w}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rows */}
              <div className="flex flex-col gap-3">
                {ganttRows.map((r) => (
                  <div key={r.label} className="flex items-center gap-2">
                    <div className="w-[110px] flex-shrink-0 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                      <span className="text-[12px] font-bold ar-body" style={{ color: "#fff" }}>
                        {r.label}
                      </span>
                    </div>
                    <div className="flex-1 grid grid-cols-12 gap-1 relative">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => {
                        const active = w >= r.from && w <= r.to;
                        return (
                          <div
                            key={w}
                            className="h-8 rounded-md transition-all"
                            style={{
                              background: active ? r.color : "rgba(255,255,255,0.04)",
                              border: active ? `1px solid ${r.color}` : "1px solid rgba(255,255,255,0.04)",
                              opacity: active ? 1 : 1,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-8 pt-6 flex flex-wrap items-center justify-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {ganttRows.map((r) => (
                  <div key={r.label} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ background: r.color }} />
                    <span className="text-[11px] ar-body" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {r.label} · من أسبوع {r.from} إلى {r.to}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ DATA MIGRATION ═══ */}
        <section id="section-07" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
          <div className="max-w-5xl mx-auto">
            <SectionHead
              eyebrow="القسم السابع"
              subtitle="ترحيل بيانات الأعضاء النشطين من قاعدة بيانات الموقع القديم (kh1-ksa.sa) إلى المنصة الجديدة"
            >
              ترحيل <span style={{ color: G }}>البيانات</span>
            </SectionHead>

            {/* Migration flow */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 ph-stagger">
              {[
                { num: "01", title: "الاستخراج", desc: "استخراج البيانات من قاعدة البيانات القديمة (.NET / SQL Server) عبر script مخصص", icon: Database, color: B },
                { num: "02", title: "التنظيف والتحويل", desc: "تنظيف البيانات وتحويلها لتتوافق مع هيكل قاعدة البيانات الجديدة (PostgreSQL)", icon: Wrench, color: A },
                { num: "03", title: "الاستيراد", desc: "استيراد البيانات المنظفة إلى المنصة الجديدة", icon: ArrowDown, color: P },
                { num: "04", title: "التحقق", desc: "التحقق من سلامة البيانات المُرحّلة عبر مقارنة تلقائية", icon: CheckCircle2, color: G },
              ].map((s) => (
                <div
                  key={s.num}
                  className="ph-item rounded-[16px] p-5 relative overflow-hidden"
                  style={{ background: "#fff", border: "1px solid #EBEBEB" }}
                >
                  <span
                    className="absolute top-3 left-4 ar-heading text-4xl"
                    style={{ color: `${s.color}15` }}
                  >
                    {s.num}
                  </span>
                  <div className="relative z-10">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: `${s.color}12` }}
                    >
                      <s.icon size={18} color={s.color} />
                    </div>
                    <p className="ar-heading text-base mb-2" style={{ color: D }}>
                      {s.title}
                    </p>
                    <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Two important notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className="rounded-[18px] p-6"
                style={{ background: `${A}08`, border: `1px solid ${A}30` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${A}15` }}>
                    <KeyRound size={18} color={A} />
                  </div>
                  <h4 className="ar-heading text-base">إعادة تعيين كلمات المرور</h4>
                </div>
                <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>
                  نظراً لاختلاف خوارزميات تشفير كلمات المرور بين النظام القديم والجديد، سيحتاج جميع الأعضاء المُرحّلين لإعادة تعيين كلمة المرور عند أول دخول للمنصة الجديدة عبر OTP. سيتم إرسال رسالة SMS جماعية لإعلامهم بالانتقال.
                </p>
              </div>

              <div
                className="rounded-[18px] p-6"
                style={{ background: `${G}08`, border: `1px solid ${G}30` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${G}15` }}>
                    <ArrowLeft size={18} color={G} />
                  </div>
                  <h4 className="ar-heading text-base">إعادة التوجيه 301</h4>
                </div>
                <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>
                  سيتم إعداد إعادة توجيه 301 دائمة من النطاق القديم (kh1-ksa.sa) إلى النطاق الجديد (kh1-ksa.com.sa) للحفاظ على ترتيب محركات البحث وتوجيه الزوار القدامى تلقائياً.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ DATABASE SCHEMA ═══ */}
        <section id="section-08" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-5xl mx-auto">
            <SectionHead
              eyebrow="القسم الثامن"
              subtitle="الجداول الرئيسية في قاعدة بيانات PostgreSQL · اثنا عشر جدولاً مرتبطة بعلاقات منظمة"
            >
              هيكل <span style={{ color: G }}>قاعدة البيانات</span>
            </SectionHead>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ph-stagger">
              {dbTables.map((t) => (
                <div
                  key={t.table}
                  className="ph-item rounded-[14px] p-4 flex items-start gap-3"
                  style={{ background: "#fff", border: "1px solid #EBEBEB" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${t.color}12` }}
                  >
                    <Database size={16} color={t.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[13px] font-bold mb-1"
                      style={{ color: D, fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
                    >
                      {t.table}
                    </p>
                    <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ADDITIONAL FEATURES (20) ═══ */}
        <section id="section-09" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-5xl mx-auto">
            <SectionHead
              eyebrow="القسم التاسع"
              subtitle="اثنان وعشرون متطلباً وميزة تفصيلية مطلوبة في المنصة والتطبيق كما وردت في وثيقة العميل وتحديثاتها"
            >
              المتطلبات والخصائص <span style={{ color: G }}>الإضافية</span>
            </SectionHead>

            <div className="flex flex-col gap-4 ph-stagger">
              {additionalFeatures.map((f) => (
                <div
                  key={f.ordinal}
                  className="ph-item rounded-[20px] overflow-hidden"
                  style={{ border: "1px solid #EBEBEB", background: "#fff", boxShadow: "0 2px 16px rgba(0,0,0,0.03)" }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div
                      className="md:w-[200px] flex-shrink-0 p-6 flex flex-col items-center justify-center text-center"
                      style={{ background: `${f.color}10`, borderLeft: `4px solid ${f.color}` }}
                    >
                      <div className="text-[9px] font-bold tracking-[3px] uppercase mb-1" style={{ color: f.color }}>
                        {f.ordinal}
                      </div>
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center my-2"
                        style={{ background: `${f.color}18` }}
                      >
                        <f.icon size={22} color={f.color} />
                      </div>
                      <h3 className="ar-heading text-[15px] leading-tight" style={{ color: D }}>
                        {f.title}
                      </h3>
                    </div>

                    <div className="flex-1 p-6">
                      {f.sections.map((sec, i) => (
                        <div key={i} className={i < f.sections.length - 1 ? "mb-5 pb-5" : ""} style={i < f.sections.length - 1 ? { borderBottom: "1px dashed #F0F0F0" } : undefined}>
                          {sec.subtitle && (
                            <p className="text-[11px] font-bold tracking-wider mb-3" style={{ color: f.color }}>
                              {sec.subtitle}
                            </p>
                          )}
                          <ul className="flex flex-col gap-2">
                            {sec.bullets.map((b, j) => {
                              if (typeof b === "string") {
                                return (
                                  <li key={j} className="flex items-start gap-2.5">
                                    <span className="w-1.5 h-1.5 mt-2 rounded-full flex-shrink-0" style={{ background: f.color }} />
                                    <span className="text-[12.5px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.72)" }}>
                                      {b}
                                    </span>
                                  </li>
                                );
                              }
                              return (
                                <li key={j} className="flex flex-col gap-2">
                                  <div className="flex items-start gap-2.5">
                                    <span className="w-1.5 h-1.5 mt-2 rounded-full flex-shrink-0" style={{ background: f.color }} />
                                    <span className="text-[12.5px] ar-body leading-relaxed font-bold" style={{ color: D }}>
                                      {b.text}
                                    </span>
                                  </div>
                                  {b.sub && (
                                    <ul className="mr-4 flex flex-col gap-1.5">
                                      {b.sub.map((s, k) => (
                                        <li key={k} className="flex items-start gap-2">
                                          <span className="text-[10px] mt-1.5 flex-shrink-0" style={{ color: f.color }}>•</span>
                                          <span className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                                            {s}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ DECLARATIONS & COMMITMENTS ═══ */}
        <section id="section-10" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-4xl mx-auto">
            <SectionHead
              eyebrow="القسم العاشر"
              subtitle="الإقرارات والتعهدات المطلوبة من أعضاء المنصة قبل التسجيل وبعد الموافقة على شروط الانضمام"
            >
              الإقرارات <span style={{ color: G }}>والتعهدات</span>
            </SectionHead>

            <div className="flex flex-col gap-5 ph-stagger">
              {declarations.map((d) => (
                <div
                  key={d.ordinal}
                  className="ph-item rounded-[22px] p-7 md:p-9"
                  style={{
                    background: "#fff",
                    border: "1px solid #EBEBEB",
                    borderTop: `4px solid ${d.color}`,
                    boxShadow: "0 2px 16px rgba(0,0,0,0.03)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${d.color}15` }}
                    >
                      <d.icon size={20} color={d.color} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold tracking-[2px] uppercase mb-1" style={{ color: d.color }}>
                        {d.ordinal}
                      </p>
                      <h3 className="ar-heading text-lg md:text-xl" style={{ color: D }}>
                        {d.title}
                      </h3>
                    </div>
                  </div>

                  {d.note && (
                    <p
                      className="text-[11px] ar-body mb-4 px-3 py-2 rounded-lg inline-block"
                      style={{ background: `${d.color}10`, color: d.color }}
                    >
                      {d.note}
                    </p>
                  )}

                  <p className="text-[13.5px] ar-body leading-[2.1]" style={{ color: "rgba(0,0,0,0.78)" }}>
                    {d.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Important notes */}
            <div className="mt-10 rounded-[20px] p-6 md:p-8" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${A}15` }}>
                  <AlertCircle size={18} color={A} />
                </div>
                <h4 className="ar-heading text-lg">ملاحظات هامة</h4>
              </div>
              <ul className="flex flex-col gap-3">
                {declarationNotes.map((n, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                      style={{ background: G, color: D }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[12.5px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.72)" }}>
                      {n}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ═══ REGISTRATION FIELDS — SIDE BY SIDE ═══ */}
        <section id="section-11" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-7xl mx-auto">
            <SectionHead
              eyebrow="القسم الحادي عشر"
              subtitle="نماذج التسجيل للرجل والمرأة جنباً إلى جنب · الأسئلة الكاملة كما وردت في وثيقة العميل"
            >
              نماذج <span style={{ color: G }}>التسجيل</span>
            </SectionHead>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ph-stagger">
              {([
                { title: "نموذج تسجيل الرجل", subtitle: `${manFields.length} سؤالاً`, accent: B, icon: Users, fields: manFields },
                { title: "نموذج تسجيل المرأة", subtitle: `${womanFields.length} سؤالاً`, accent: P, icon: Heart, fields: womanFields },
              ] as const).map((col) => (
                <div
                  key={col.title}
                  className="ph-item rounded-[24px] overflow-hidden flex flex-col"
                  style={{ background: "#fff", border: "1px solid #EBEBEB", boxShadow: "0 2px 16px rgba(0,0,0,0.03)" }}
                >
                  <div
                    className="px-6 py-5 flex items-center gap-3 sticky top-0 z-10"
                    style={{ background: `${col.accent}10`, borderBottom: `2px solid ${col.accent}` }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: col.accent }}>
                      <col.icon size={18} color="#fff" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold tracking-[2px] uppercase mb-0.5" style={{ color: col.accent }}>
                        {col.subtitle}
                      </p>
                      <h3 className="ar-heading text-lg" style={{ color: D }}>
                        {col.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-3">
                    {col.fields.map((f, idx) => (
                      <div
                        key={idx}
                        className="rounded-[14px] p-4 flex flex-col gap-2.5"
                        style={{ background: "#FAFAFA", border: "1px solid #F0F0F0" }}
                      >
                        <div className="flex items-start gap-2.5">
                          <span
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                            style={{ background: col.accent, color: "#fff" }}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <div className="flex-1 min-w-0 pt-0.5">
                            <p className="text-[12.5px] ar-body font-bold leading-relaxed" style={{ color: D }}>
                              {f.label}
                            </p>
                          </div>
                          <f.icon size={14} color={col.accent} className="flex-shrink-0 mt-1" />
                        </div>

                        {f.options && (
                          <div className="flex flex-wrap gap-1.5">
                            {f.options.map((opt, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded-full text-[10.5px] ar-body"
                                style={{ background: "#fff", color: "rgba(0,0,0,0.65)", border: "1px solid rgba(0,0,0,0.08)" }}
                              >
                                {opt}
                              </span>
                            ))}
                          </div>
                        )}

                        {f.sub && (
                          <div className="flex flex-col gap-2 pr-3 mr-3" style={{ borderRight: `2px solid ${col.accent}30` }}>
                            {f.sub.map((s, i) => (
                              <div key={i}>
                                <p className="text-[11.5px] ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>
                                  {s.label}
                                </p>
                                {s.options && (
                                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                                    {s.options.map((o, j) => (
                                      <span
                                        key={j}
                                        className="px-2 py-0.5 rounded-full text-[10px] ar-body"
                                        style={{ background: `${col.accent}10`, color: col.accent }}
                                      >
                                        {o}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                {s.note && (
                                  <p className="text-[10px] ar-body italic mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>
                                    {s.note}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {f.note && (
                          <p className="text-[10.5px] ar-body italic" style={{ color: "rgba(0,0,0,0.45)" }}>
                            {f.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FUTURE PHASES ═══ */}
        <section id="section-12" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-5xl mx-auto">
            <SectionHead
              eyebrow="القسم الثاني عشر"
              subtitle="الأعمال التالية غير مشمولة في العقد الحالي ويمكن تنفيذها في مراحل مستقبلية باتفاق منفصل"
            >
              المراحل <span style={{ color: G }}>المستقبلية</span>
            </SectionHead>

            <div className="flex flex-col gap-3 ph-stagger">
              {futurePhases.map((f, i) => (
                <div
                  key={f.feature}
                  className="ph-item rounded-[14px] p-5 flex flex-col md:flex-row md:items-center gap-4"
                  style={{ background: "#fff", border: "1px solid #EBEBEB" }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                      style={{ background: D, color: "#fff" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[13px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.7)" }}>
                      {f.feature}
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold flex-shrink-0 self-start md:self-auto"
                    style={{ background: G, color: D, border: `1px solid ${D}` }}
                  >
                    <Clock size={11} color={D} />
                    {f.estimate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CLOSING ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="ar-heading text-lg mb-3" style={{ color: G }}>الخلاصة</p>
              <h2 className="ar-heading text-3xl md:text-4xl mb-5">ملاحظة <span style={{ color: G }}>ختامية</span></h2>
            </div>

            <div
              className="rounded-[20px] p-8 md:p-10 mb-10"
              style={{ background: "#fff", border: "1px solid #EBEBEB", boxShadow: "0 2px 16px rgba(0,0,0,0.03)" }}
            >
              <p className="text-[14px] ar-body leading-[2]" style={{ color: D }}>
                تُعتبر هذه الوثيقة جزءاً لا يتجزأ من عقد تطوير منصة خطابة السعودية الأولى، وأي تعديل عليها يتطلب موافقة كتابية من الطرفين.
              </p>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <div
                className="rounded-[20px] p-8 text-center"
                style={{ background: "#fff", border: "1px solid #EBEBEB" }}
              >
                <p className="text-[10px] font-bold tracking-[2px] uppercase mb-3" style={{ color: G }}>
                  الطرف الأول · العميل
                </p>
                <p className="ar-heading text-lg mb-6" style={{ color: D }}>
                  شركة خطابة السعودية الأولى للتجارة (ذ.م.م)
                </p>
                <div
                  className="h-12 rounded-lg mb-2"
                  style={{ borderBottom: "2px dashed rgba(0,0,0,0.15)" }}
                />
                <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>
                  التوقيع
                </p>
              </div>
              <div
                className="rounded-[20px] p-8 text-center"
                style={{ background: "#fff", border: `2px solid ${G}`, boxShadow: `3px 3px 0px 0px ${D}` }}
              >
                <p className="text-[10px] font-bold tracking-[2px] uppercase mb-3" style={{ color: G }}>
                  الطرف الثاني · المطور
                </p>
                <p className="ar-heading text-lg mb-6" style={{ color: D }}>
                  أحمد علي
                </p>
                <div
                  className="h-12 rounded-lg mb-2"
                  style={{ borderBottom: `2px dashed ${G}` }}
                />
                <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>
                  التوقيع
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "60px 24px 80px", background: "#fff" }}>
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="rounded-[24px] p-10 md:p-14 mb-8"
              style={{ background: "#fff", border: "1px solid #EBEBEB" }}
            >
              <img
                src="/myphoto-profile.png"
                alt="Ahmed Ali"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-6"
                style={{ border: `3px solid ${G}` }}
              />
              <h3 className="ar-heading text-3xl mb-3">شكراً لثقتكم</h3>
              <p className="text-[12px] ar-body mb-8" style={{ color: "rgba(0,0,0,0.5)" }}>
                لأي استفسار حول الوثيقة أو نطاق العمل، يسعدني الرد مباشرة.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <a
                  href="https://wa.me/201011648156"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold"
                  style={{
                    background: G,
                    color: D,
                    border: `2px solid ${D}`,
                    boxShadow: `4px 4px 0px 0px ${D}`,
                    textDecoration: "none",
                  }}
                >
                  <MessageCircle size={16} /> تواصل عبر واتساب
                </a>
                <a
                  href="mailto:hello@ahmedali.online"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold"
                  style={{
                    background: "#fff",
                    color: D,
                    border: `2px solid ${D}`,
                    boxShadow: `4px 4px 0px 0px ${D}`,
                    textDecoration: "none",
                  }}
                >
                  أرسل إيميل <ArrowRight size={14} />
                </a>
              </div>
              <div className="w-full h-px mb-6" style={{ background: "#F0F0F0" }} />
              <p className="text-[14px] font-bold">أحمد علي</p>
              <p className="text-[12px] ar-body" style={{ color: G }}>Full-Stack Digital Strategist</p>
              <p className="text-[12px] ar-body mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>
                hello@ahmedali.online · ahmedali.online
              </p>
            </div>

            <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.2)" }}>
              الملحق (أ) · الإصدار 1.1 · سري وخاص · &copy; {new Date().getFullYear()} مُعد لشركة خطابة السعودية الأولى للتجارة (ذ.م.م)
            </p>
          </div>
        </section>
      </div>
    </ArabicTailProcessor>
  );
}
