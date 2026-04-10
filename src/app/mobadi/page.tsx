"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Layers, Globe, ShoppingBag, Smartphone, Database, Shield,
  CheckCircle2, Clock, Code2, BarChart3, Users, Zap,
  MessageCircle, ArrowRight, ExternalLink, Eye, FileText,
  Target, TrendingUp, Palette, Bot, CreditCard, Play,
  Upload, Award, GraduationCap, MonitorSmartphone, KeyRound,
  Video, Settings, FolderTree,
  type LucideIcon,
} from "lucide-react";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";

gsap.registerPlugin(ScrollTrigger);

const G = "#4FFFB0";
const D = "#0A0A0A";
const O = "#FF5E00";
const R = "#EF4444";
const A = "#F59E0B";
const P = "#5227FF";
const B = "#3B82F6";

export default function MoBadiArchitecture() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ph-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.3 });
      gsap.utils.toArray<HTMLElement>(".ph-slide").forEach((el) => {
        gsap.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".ph-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".ph-item"), { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  function PhaseCard({ num, label, color, duration, items, white }: { num: number; label: string; color: string; duration: string; items: string[]; white?: boolean }) {
    const fg = white ? "#fff" : D;
    const sub = white ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
    return (
      <div className="ph-item rounded-[24px] overflow-hidden" style={{ border: `2px solid ${color}25`, boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[200px] flex-shrink-0 p-8 flex flex-col items-center justify-center text-center" style={{ background: color }}>
            <div className="text-[9px] font-bold tracking-[3px] uppercase mb-1" style={{ color: sub }}>المرحلة</div>
            <div className="ar-heading text-5xl mb-2" style={{ color: fg }}>{num}</div>
            <div className="ar-heading text-base mb-2" style={{ color: fg }}>{label}</div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: white ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)" }}>
              <Clock size={11} color={fg} />
              <span className="text-[11px] font-bold" style={{ color: fg }}>{duration}</span>
            </div>
          </div>
          <div className="flex-1 p-6 bg-white">
            <div className="flex flex-col gap-2">
              {items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <CheckCircle2 size={16} color={color} className="flex-shrink-0 mt-0.5" />
                  <span className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ArabicTailProcessor>
    <div ref={ref} style={{ background: "#fff", color: D, fontFamily: "'Ahmed Sans', sans-serif" }}>

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${G}18 0%, transparent 70%)` }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
          <div className="ph-hero opacity-0 text-center mb-4" style={{ paddingTop: 40 }}>
            <p className="text-[13px] font-bold tracking-wider" style={{ color: "rgba(0,0,0,0.3)" }}>أبريل 2025 · الإصدار 1.0</p>
          </div>

          <div className="ph-hero opacity-0 text-center mb-4">
            <h1 className="ar-heading" style={{ fontSize: "clamp(36px, 8vw, 80px)", lineHeight: 1.3, color: D }}>
              وثيقة البنية التقنية
            </h1>
          </div>

          <div className="ph-hero opacity-0 text-center mb-6">
            <p className="ar-body text-lg md:text-xl" style={{ color: "rgba(0,0,0,0.5)" }}>منصة بورتفوليو وكورسات متكاملة</p>
            <p className="text-2xl font-bold mt-2 ar-heading" style={{ color: G }}>MO BADI</p>
          </div>

          {/* من / إلى */}
          <div className="ph-hero opacity-0 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 w-full max-w-xl">
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>مقدم من</p>
              <p className="text-[14px] font-bold ar-body">Ahmed Ali</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>Full-Stack Digital Strategist</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>hello@ahmedali.online</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `2px solid ${G}`, boxShadow: `3px 3px 0px 0px ${D}` }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>مقدم إلى</p>
              <p className="text-[14px] font-bold ar-body">MO BADI</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>مصمم جرافيك ومتخصص UI/UX</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>منصة ثنائية اللغة عربي + إنجليزي</p>
            </div>
          </div>

          {/* إحصائيات */}
          <div className="ph-hero opacity-0 mb-10 w-full max-w-2xl">
            <div className="flex items-stretch justify-center" style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              {[{ n: "17", l: "سكشن بورتفوليو" }, { n: "6", l: "مراحل تطوير" }, { n: "40", l: "يوم حد أقصى" }, { n: "+7", l: "جداول بيانات" }].map((s, i) => (
                <div key={s.l} className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative" style={{ borderRight: i > 0 ? "1px solid #F0F0F0" : "none" }}>
                  <span className="ar-heading" style={{ fontSize: 28, lineHeight: 1, color: D }}>{s.n}</span>
                  <span className="text-[9px] font-bold mt-1 ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>{s.l}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
                </div>
              ))}
            </div>
          </div>

          {/* ما هي المنصة */}
          <div className="ph-hero opacity-0 rounded-[16px] p-6 text-center mb-6 max-w-2xl" style={{ background: `${G}08`, border: `1px solid ${G}20` }}>
            <p className="text-[13px] ar-body font-medium leading-relaxed" style={{ color: D }}>
              <strong style={{ color: G }}>ما هذه الوثيقة؟</strong> MO BADI يحتاج شيئين على دومين واحد: بورتفوليو يجذب عملاء ومنصة كورسات تعلّم الطلاب. هذه الوثيقة ترسم كل صفحة، كل جدول في قاعدة البيانات، كل مسار مستخدم، وكل أداة في الـ Tech Stack — بدون أي مفاجآت أثناء البناء.
            </p>
          </div>

          {/* مواصفات المشروع */}
          <div className="ph-hero opacity-0 w-full max-w-2xl mb-10">
            <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
              {[
                { label: "نوع المنصة", value: "بورتفوليو + منصة كورسات (دومين واحد)" },
                { label: "اللغات", value: "عربي + إنجليزي — دعم كامل لـ RTL" },
                { label: "مرجع التصميم", value: "Folioblox Framer Template" },
                { label: "المصادقة", value: "OTP عبر الهاتف (Twilio + Supabase Auth)" },
                { label: "قاعدة البيانات", value: "Supabase (PostgreSQL + Storage + Auth + RLS)" },
                { label: "الدفع", value: "PayMob (بطاقات + وسائل دفع محلية)" },
                { label: "استضافة الفيديو", value: "Bunny.net (بث HLS + روابط موقعة)" },
                { label: "النشر", value: "Vercel (Edge Functions + CDN)" },
              ].map((row, i) => (
                <div key={row.label} className="flex" style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: "1px solid #F3F4F6" }}>
                  <span className="w-[140px] md:w-[180px] flex-shrink-0 text-[11px] font-bold p-3 px-4 ar-body" style={{ color: D }}>{row.label}</span>
                  <span className="flex-1 text-[11px] p-3 px-4 ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ph-hero opacity-0 flex flex-col items-center gap-2">
            <div style={{ width: 24, height: 38, border: "1.5px solid rgba(0,0,0,0.14)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: G, animation: "mouseScroll 1.6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
        <style>{`@keyframes mouseScroll{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
      </section>

      {/* ═══ نظام التصميم ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: O }}>نظام التصميم</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-4">مستخرج من <span style={{ color: O }}>Figma</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>كل لون، وزن خط، ونصف قطر زاوية موثّق هنا — عشان البناء يطابق التصميم بكسل ببكسل.</p>
          </div>

          {/* ألوان */}
          <div className="mb-10">
            <h3 className="ar-heading text-xl mb-6">الألوان</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 ph-stagger">
              {[
                { name: "داكن", hex: "#0D0D0D" },
                { name: "فاتح", hex: "#F2F2F2" },
                { name: "أبيض", hex: "#FFFFFF" },
                { name: "برتقالي", hex: "#FF5E00" },
                { name: "رمادي", hex: "#757575" },
                { name: "حدود", hex: "#E5E7EB" },
                { name: "أسود", hex: "#000000" },
              ].map((c) => (
                <div key={c.name} className="ph-item rounded-[16px] overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
                  <div style={{ background: c.hex, height: 56 }} />
                  <div className="p-3">
                    <p className="text-[12px] font-bold ar-body">{c.name}</p>
                    <p className="text-[10px]" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "monospace" }}>{c.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* الخطوط */}
          <div className="mb-10">
            <h3 className="ar-heading text-xl mb-6">الخطوط — Inter</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ph-stagger">
              {[
                { el: "عنوان رئيسي", weight: "ExtraBold 800", size: "58px" },
                { el: "عنوان فرعي", weight: "ExtraBold 800", size: "40-48px" },
                { el: "نص أساسي", weight: "Regular 400", size: "14-15px" },
                { el: "نص الأزرار", weight: "Bold 700", size: "13-14px" },
                { el: "سعر الباقة", weight: "Bold 700", size: "56px" },
                { el: "تسمية القسم", weight: "Bold 700", size: "16px" },
              ].map((t) => (
                <div key={t.el} className="ph-item flex items-center gap-4 p-4 rounded-[14px]" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                  <span className="text-[13px] font-bold ar-body flex-1">{t.el}</span>
                  <span className="text-[11px]" style={{ color: "rgba(0,0,0,0.4)", fontFamily: "monospace" }}>{t.weight} · {t.size}</span>
                </div>
              ))}
            </div>
          </div>

          {/* أنماط المكونات */}
          <div>
            <h3 className="ar-heading text-xl mb-6">أنماط المكونات</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ph-stagger">
              {[
                { text: "الأزرار: شكل حبة دواء سوداء (#0D0D0D) مع أيقونة سهم برتقالي دائري", icon: Zap },
                { text: "الكارتات: زوايا خارجية 30px / خلفية #F2F2F2 / كارت داخلي أبيض 20px", icon: Layers },
                { text: "طبقات الصور: تدرج CSS من شفاف إلى أسود (أسفل 500px)", icon: Eye },
                { text: "تسميات الأقسام: نص برتقالي Bold صغير فوق عنوان ExtraBold داكن كبير", icon: Palette },
                { text: "الهيرو: زوايا سفلية 60px مع خلفية داكنة #0D0D0D", icon: MonitorSmartphone },
                { text: "شريط اللوجوهات: تمرير أفقي لا نهائي مع حواف متلاشية", icon: TrendingUp },
              ].map((p) => (
                <div key={p.text} className="ph-item flex items-start gap-3 p-4 rounded-[14px]" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                  <p.icon size={16} color={O} className="flex-shrink-0 mt-0.5" />
                  <span className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.55)" }}>{p.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ التقنيات ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>التقنيات</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-4" style={{ color: "#fff" }}>الأدوات <span style={{ color: G }}>المستخدمة</span></h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10 ph-stagger">
            {[
              { name: "Next.js 15", icon: "nextdotjs/white", desc: "SSR + App Router" },
              { name: "TypeScript", icon: "typescript", desc: "أمان الأنواع" },
              { name: "Tailwind CSS", icon: "tailwindcss", desc: "تنسيق سريع" },
              { name: "Supabase", icon: "supabase", desc: "قاعدة بيانات + مصادقة" },
              { name: "PayMob", icon: "", fallback: "/paymob.png", desc: "بوابة الدفع" },
              { name: "Twilio", icon: "", fallback: "https://avatars.githubusercontent.com/u/109142?s=280&v=4", desc: "رسائل OTP" },
              { name: "Framer Motion", icon: "framer", desc: "حركات وانتقالات" },
              { name: "Vercel", icon: "vercel/white", desc: "استضافة ونشر" },
              { name: "Cloudinary", icon: "cloudinary", desc: "صور CDN" },
              { name: "Bunny.net", icon: "bunnydotnet", desc: "بث الفيديو" },
              { name: "shadcn/ui", icon: "shadcnui/white", desc: "مكونات أساسية" },
              { name: "Zustand", icon: "", fallback: "/zustand.png", desc: "إدارة الحالة" },
            ].map((t) => (
              <div key={t.name} className="ph-item flex items-center gap-4 p-4 rounded-[16px]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {t.icon ? (
                  <img src={`https://cdn.simpleicons.org/${t.icon}`} alt={t.name} width={24} height={24} style={{ width: 24, height: 24 }} />
                ) : t.fallback ? (
                  <img src={t.fallback} alt={t.name} width={24} height={24} style={{ width: 24, height: 24, borderRadius: 4 }} />
                ) : (
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: `${G}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: G }}>{t.name.charAt(0)}</div>
                )}
                <div>
                  <div className="text-[13px] font-bold" style={{ color: "#fff" }}>{t.name}</div>
                  <div className="text-[10px] ar-body" style={{ color: "rgba(255,255,255,0.3)" }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* لماذا Supabase */}
          <div className="rounded-[20px] p-7" style={{ background: `${G}08`, border: `1px solid ${G}20` }}>
            <h3 className="ar-heading text-lg mb-4" style={{ color: "#fff" }}>لماذا Supabase؟</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "بيانات الكورسات علاقتها ببعض: كورسات ← وحدات ← دروس ← مهام ← تسليمات ← شهادات",
                "Row Level Security يحمي المحتوى — الطالب يشوف بس اللي دفع فيه",
                "المصادقة بالهاتف جاهزة عبر Twilio بدون خدمة إضافية",
                "PostgreSQL يوفر استعلامات JOIN للوحة التحكم والتحليلات",
                "التخزين يتعامل مع رفع الفيديو والملفات بروابط موقّعة",
                "الاشتراكات الفورية لتحديثات التقدم والإشعارات",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.2)" }}>
                  <CheckCircle2 size={14} color={G} className="flex-shrink-0 mt-0.5" />
                  <span className="text-[11px] ar-body" style={{ color: "rgba(255,255,255,0.6)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ هيكل الصفحات ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>البنية</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-4">هيكل <span style={{ color: G }}>الصفحات</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ph-stagger">
            {/* عام */}
            <div className="ph-item rounded-[24px] overflow-hidden" style={{ border: `2px solid ${G}25` }}>
              <div className="p-5 text-center" style={{ background: G }}>
                <Globe size={24} color={D} className="mx-auto mb-2" />
                <h3 className="ar-heading text-base" style={{ color: D }}>البورتفوليو العام</h3>
              </div>
              <div className="p-5 flex flex-col gap-2">
                {[
                  { route: "/", page: "الرئيسية — البورتفوليو كامل (17 سكشن)" },
                  { route: "/projects", page: "كل المشاريع — معرض قابل للفلترة" },
                  { route: "/projects/[slug]", page: "دراسة حالة بالصور والأدوات" },
                  { route: "/courses", page: "كتالوج الكورسات مع الأسعار" },
                  { route: "/courses/[slug]", page: "صفحة هبوط الكورس" },
                  { route: "/about", page: "صفحة عنّي مفصّلة" },
                  { route: "/contact", page: "نموذج تواصل + روابط سوشيال" },
                ].map((r) => (
                  <div key={r.route} className="p-3 rounded-xl" style={{ background: "#FAFAFA" }}>
                    <p className="text-[11px] font-bold" style={{ color: G, fontFamily: "monospace" }}>{r.route}</p>
                    <p className="text-[10px] mt-0.5 ar-body" style={{ color: "rgba(0,0,0,0.45)" }}>{r.page}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* منصة التعلم */}
            <div className="ph-item rounded-[24px] overflow-hidden" style={{ border: `2px solid ${B}25` }}>
              <div className="p-5 text-center" style={{ background: B }}>
                <GraduationCap size={24} color="#fff" className="mx-auto mb-2" />
                <h3 className="ar-heading text-base" style={{ color: "#fff" }}>منصة التعلم</h3>
              </div>
              <div className="p-5 flex flex-col gap-2">
                {[
                  { route: "/learn", page: "كورساتي، التقدم، الشهادات" },
                  { route: "/learn/[slug]", page: "لوحة الكورس — قائمة الوحدات" },
                  { route: "/learn/.../[lessonId]", page: "مشغل الفيديو + PDF + ملاحظات" },
                  { route: "/learn/.../task", page: "تسليم المهمة النهائية" },
                  { route: "/account", page: "الملف الشخصي، اللغة، الفواتير" },
                  { route: "/certificates/[id]", page: "عرض الشهادة العام" },
                ].map((r) => (
                  <div key={r.route} className="p-3 rounded-xl" style={{ background: "#FAFAFA" }}>
                    <p className="text-[11px] font-bold" style={{ color: B, fontFamily: "monospace" }}>{r.route}</p>
                    <p className="text-[10px] mt-0.5 ar-body" style={{ color: "rgba(0,0,0,0.45)" }}>{r.page}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* لوحة الإدارة */}
            <div className="ph-item rounded-[24px] overflow-hidden" style={{ border: `2px solid ${P}25` }}>
              <div className="p-5 text-center" style={{ background: P }}>
                <Settings size={24} color="#fff" className="mx-auto mb-2" />
                <h3 className="ar-heading text-base" style={{ color: "#fff" }}>لوحة الإدارة</h3>
              </div>
              <div className="p-5 flex flex-col gap-2">
                {[
                  { route: "/admin", page: "إحصائيات: طلاب، إيرادات، تسليمات" },
                  { route: "/admin/courses", page: "إنشاء / تعديل / نشر الكورسات" },
                  { route: "/admin/.../lessons", page: "إضافة/ترتيب دروس، رفع فيديو" },
                  { route: "/admin/submissions", page: "مراجعة، قبول/رفض + ملاحظات" },
                  { route: "/admin/students", page: "قائمة، بحث، تفاصيل التسجيل" },
                  { route: "/admin/certificates", page: "سجل الشهادات، إلغاء، إعادة إصدار" },
                ].map((r) => (
                  <div key={r.route} className="p-3 rounded-xl" style={{ background: "#FAFAFA" }}>
                    <p className="text-[11px] font-bold" style={{ color: P, fontFamily: "monospace" }}>{r.route}</p>
                    <p className="text-[10px] mt-0.5 ar-body" style={{ color: "rgba(0,0,0,0.45)" }}>{r.page}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ مسارات المستخدم ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>رحلة المستخدم</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-4" style={{ color: "#fff" }}>المسارات <span style={{ color: G }}>الأساسية</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(255,255,255,0.35)" }}>إيش يصير لما طالب يسجل؟ يدفع؟ يتعلم؟ يسلّم واجب؟ ياخذ شهادة؟ كل خطوة هنا.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: KeyRound, title: "تسجيل الدخول بالهاتف", color: G, steps: ["المستخدم يدخل رقم هاتفه في صفحة /auth", "الواجهة الخلفية تطلب OTP من Supabase عبر Twilio", "المستخدم يدخل الرمز المكون من 6 أرقام", "Supabase يتحقق ويعيد الجلسة — المستخدم مسجل", "مستخدم جديد؟ ملف شخصي يتنشأ تلقائياً", "توجيه إلى /learn أو /courses"] },
              { icon: CreditCard, title: "التسجيل والدفع", color: P, steps: ["الطالب يزور صفحة الكورس — محتوى عام", "يضغط \"سجّل الآن\" — فحص مصادقة", "جلسة دفع PayMob تتنشأ عبر API", "الطالب يدفع في صفحة PayMob", "Webhook يُبلّغ النظام بنجاح الدفع", "سجل تسجيل يتنشأ في Supabase", "الطالب يوصل لمحتوى الكورس فوراً"] },
              { icon: Play, title: "مسار التعلم", color: B, steps: ["الطالب يفتح لوحة الكورس — يشوف الوحدات", "الدروس المقفلة تظهر بأيقونة قفل", "يفتح درس — الفيديو يتحمل عبر Bunny.net", "ملفات PDF قابلة للتحميل أسفل الفيديو", "مشاهدة 90%+ = الدرس يتسجل مكتمل", "شريط التقدم يتحدث عبر الوحدة والكورس", "كل الدروس تمت؟ المهمة النهائية تنفتح"] },
              { icon: Award, title: "المهمة والشهادة", color: A, steps: ["الطالب يقرأ المهمة ويرفع ملفاته", "حالة التسليم → قيد المراجعة", "المدرب يراجع في /admin/submissions", "يقبل أو يرفض مع ملاحظات مكتوبة", "عند القبول → Edge Function تولّد PDF الشهادة", "الشهادة برمز تحقق فريد (UUID)", "رسالة SMS للطالب: شهادتك جاهزة", "التحقق العام في /verify/[code]"] },
            ].map((flow) => (
              <div key={flow.title} className="rounded-[24px] p-7" style={{ background: "#fff" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${flow.color}12` }}>
                    <flow.icon size={18} color={flow.color} />
                  </div>
                  <h3 className="ar-heading text-base">{flow.title}</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {flow.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg" style={{ background: "#FAFAFA" }}>
                      <span className="text-[10px] font-bold w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${flow.color}15`, color: D }}>{i + 1}</span>
                      <span className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.55)" }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ قاعدة البيانات ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>قاعدة البيانات</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-4">مخطط <span style={{ color: G }}>Supabase</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ph-stagger">
            {[
              { name: "profiles", color: G, cols: ["id (uuid PK) → مرتبط بـ auth.users", "phone (unique) — رقم الهاتف المحقق", "full_name — اسم العرض", "avatar_url — صورة الملف الشخصي", 'locale — "ar" أو "en"', 'role — "student" | "instructor" | "admin"'] },
              { name: "courses", color: P, cols: ["id, slug (unique) — معرف URL", "title_ar / title_en — عناوين ثنائية", "description_ar / description_en — وصف ثنائي", "thumbnail_url — صورة غلاف الكورس", "price, currency — السعر والعملة (SAR/USD/EGP)", "is_published — مسودة أم منشور"] },
              { name: "modules + lessons", color: B, cols: ["module: course_id, title_ar/en, order", "lesson: module_id, title_ar/en", "video_url — رابط Bunny.net موقّع", "pdf_url — رابط Supabase Storage موقّع", "duration_seconds — مدة الفيديو", "is_preview — معاينة مجانية قبل التسجيل"] },
              { name: "enrollments + progress", color: A, cols: ["user_id, course_id, payment_id", "enrolled_at — تاريخ التسجيل", "completed_at — يتعبأ عند إصدار الشهادة", "lesson_progress: user_id, lesson_id", "completed_at — لكل درس على حدة"] },
              { name: "tasks + submissions", color: O, cols: ["task: course_id, title, description", "allowed_file_types — أنواع الملفات المسموحة", "submission: user_id, task_id, file_url", 'status — "pending" | "approved" | "rejected"', "feedback — ملاحظات المدرب", "submitted_at, reviewed_at — التواريخ"] },
              { name: "certificates + payments", color: G, cols: ["cert: user_id, course_id, unique_code", "pdf_url — ملف الشهادة في Storage", "issued_at — تاريخ الإصدار", "payment: paymob_order_id, amount, currency", 'status — "pending" | "succeeded" | "failed"'] },
            ].map((table) => (
              <div key={table.name} className="ph-item rounded-[20px] overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
                <div className="px-6 py-4 flex items-center gap-3" style={{ background: `${table.color}08`, borderBottom: `2px solid ${table.color}` }}>
                  <Database size={16} color={table.color} />
                  <span className="text-[14px] font-bold" style={{ fontFamily: "monospace" }}>{table.name}</span>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  {table.cols.map((col) => (
                    <div key={col} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: table.color }} />
                      <span className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.55)" }}>{col}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ سكاشن البورتفوليو ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>البورتفوليو</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-4"><span style={{ color: G }}>17</span> سكشن مرسوم</h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>الصفحة الرئيسية هي البورتفوليو. الزائر يمر على 17 سكشن مصمم لتحويله من متصفح إلى عميل أو طالب.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ph-stagger">
            {[
              { n: "01", name: "شريط التنقل", desc: "ثابت، لوجو، قائمة موبايل، مبدّل لغة، زر CTA" },
              { n: "02", name: "الهيرو", desc: "خلفية داكنة، اسم البراند، 4 مهارات مرقمة (#01-#04)" },
              { n: "03", name: "العلامات التجارية", desc: "شريط لوجوهات العملاء — تمرير لا نهائي" },
              { n: "04", name: "عنّي مختصر", desc: "سكشن داكن، نبذة، 3 صور مشاريع" },
              { n: "05", name: "مشاريع مميزة", desc: "3 كارتات — صورة، عنوان، وصف، زر عرض" },
              { n: "06", name: "نهج العمل", desc: "4 صور كاملة: استراتيجية، تصميم، أنظمة، اتساق" },
              { n: "07", name: "الخدمات", desc: "3 كارتات طويلة: هوية بصرية، استراتيجية براند، استشارات" },
              { n: "08", name: "شريط CTA", desc: 'سكشن داكن: "خلّنا نحيي براندك" + زر تواصل' },
              { n: "09", name: "خطوات العمل", desc: "5 خطوات: اكتشاف ← استراتيجية ← تصميم ← تسليم ← دعم مستمر" },
              { n: "10", name: "معرض إضافي", desc: "سلايدر صور دائري — المزيد من الأعمال" },
              { n: "11", name: "مشاريع أخرى", desc: "سلايدر أفقي بأسهم التنقل" },
              { n: "12", name: "التخصصات", desc: "3 كارتات صور مع تدرج + نص" },
              { n: "13", name: "الباقات", desc: "3 كارتات: مبتدئ / محترف / مؤسسات — مع ميزات وCTA" },
              { n: "14", name: "أسئلة شائعة", desc: "أكورديون — 5 أسئلة بأنيميشن فتح/إغلاق" },
              { n: "15", name: "القيم", desc: "الرسالة / الرؤية / القيم / فلسفة التصميم — أكورديون" },
              { n: "16", name: "عنّي", desc: "سكشن السيرة + فيديو مضمن (تشغيل تلقائي صامت)" },
              { n: "17", name: "الفوتر", desc: "لوجو، شعار، قائمة روابط، أيقونات سوشيال، نص البراند الكبير" },
            ].map((s) => (
              <div key={s.n} className="ph-item rounded-[16px] p-5 flex gap-4" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <span className="ar-heading text-2xl" style={{ color: `${G}20` }}>{s.n}</span>
                <div className="flex-1">
                  <h4 className="text-[13px] font-bold ar-body mb-1">{s.name}</h4>
                  <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.45)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ثنائي اللغة ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "80px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>ثنائي اللغة</p>
            <h2 className="ar-heading text-4xl md:text-5xl">عربي + <span style={{ color: G }}>إنجليزي</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ph-stagger">
            {[
              { icon: Globe, text: "next-intl للتوجيه: /en/ و /ar/ مع اكتشاف اللغة تلقائياً" },
              { icon: Target, text: "اللغة الافتراضية: عربي — الجمهور المستهدف منطقة الشرق الأوسط" },
              { icon: Layers, text: 'RTL يتطبق تلقائياً لما اللغة = عربي عبر dir="rtl"' },
              { icon: Database, text: "كل النصوص مخزنة بصيغة title_ar / title_en في Supabase" },
              { icon: Video, text: "فيديوهات الكورسات ممكن يكون لها مسارات عربي/إنجليزي منفصلة" },
              { icon: Award, text: "الشهادات تتولّد بلغة المستخدم المفضلة" },
            ].map((item) => (
              <div key={item.text} className="ph-item flex items-start gap-3 p-4 rounded-[14px]" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                <item.icon size={16} color={G} className="flex-shrink-0 mt-0.5" />
                <span className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.55)" }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* استراتيجية الخطوط */}
          <div className="mt-10">
            <h3 className="ar-heading text-xl mb-6">استراتيجية الخطوط</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ph-stagger">
              {[
                { label: "إنجليزي", font: "Inter", note: "نفس نظام التصميم — كل الأوزان من 400 إلى 800" },
                { label: "عربي", font: "IBM Plex Arabic", note: "يتوافق مع أوزان Inter للتناسق ثنائي اللغة" },
                { label: "التحميل", font: "next/font", note: "بدون أي إزاحة في التخطيط — الخطوط محملة مسبقاً" },
                { label: "RTL", font: "Tailwind Plugin", note: "تعديلات المسافات لـ RTL تتطبق تلقائياً" },
              ].map((f) => (
                <div key={f.label} className="ph-item flex items-center gap-4 p-4 rounded-[14px]" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                  <span className="text-[10px] font-bold tracking-[2px] uppercase w-16 flex-shrink-0" style={{ color: G }}>{f.label}</span>
                  <div>
                    <p className="text-[13px] font-bold">{f.font}</p>
                    <p className="text-[10px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>{f.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ خطة التطوير ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>التنفيذ</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-4">خطة <span style={{ color: G }}>التطوير</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>40 يوم حد أقصى من شاشة فاضية لمنصة شغّالة. كل مرحلة تنتهي بحاجة تقدر تشوفها وتجربها.</p>
          </div>
          <div className="flex flex-col gap-6 ph-stagger">
            <PhaseCard num={1} label="الأساسات" color={G} duration="الأسبوع 1-2" items={["إعداد مشروع Next.js 15 مع TypeScript + Tailwind", "مشروع Supabase: مصادقة، مخطط قاعدة البيانات، مساحات التخزين", "إعداد next-intl: توجيه عربي/إنجليزي، دعم RTL", "تطبيق نظام التصميم: الألوان، الخطوط، المكونات الأساسية", "شريط التنقل + الفوتر"]} />
            <PhaseCard num={2} label="البورتفوليو" color={O} duration="الأسبوع 3-4" items={["سكشن الهيرو مع الحركات (Framer Motion)", "كل الـ 17 سكشن حسب تصميم Figma", "ربط Supabase CMS: المشاريع، الخدمات، العملاء", "تحسين الصور عبر Cloudinary", "استجابة كاملة للموبايل — كل السكاشن"]} />
            <PhaseCard num={3} label="المصادقة والدفع" color={P} duration="الأسبوع 5" white items={["مسار تسجيل دخول OTP بالهاتف (Twilio + Supabase)", "صفحة الملف الشخصي", "ربط PayMob: دفع، webhooks، تسجيل بالكورس", "صفحات هبوط الكورسات (عامة)"]} />
            <PhaseCard num={4} label="منصة التعلم" color={B} duration="الأسبوع 6-7" white items={["لوحة الكورس (/learn/[slug])", "مشغّل الدروس: فيديو (Bunny.net HLS) + عارض PDF", "تتبع تقدم الدروس", "فتح الدروس بالتسلسل", "مسار تسليم المهمة النهائية"]} />
            <PhaseCard num={5} label="الإدارة والشهادات" color={A} duration="الأسبوع 8" items={["لوحة المدرب: مراجعة التسليمات", "قبول / رفض مع ملاحظات", "توليد شهادة PDF ديناميكية (Edge Function)", "إشعار SMS عند إصدار الشهادة", "صفحة التحقق العامة من الشهادة"]} />
            <PhaseCard num={6} label="الإطلاق" color={G} duration="الأسبوع 9" items={["فحص الأداء (Lighthouse 90+)", "SEO: meta tags, og:image, sitemap, schema.org", "اختبار كل المتصفحات + RTL", "تحليلات (Vercel Analytics + Supabase)", "نشر على Vercel + دومين + SSL"]} />
          </div>
        </div>
      </section>

      {/* ═══ هيكل المجلدات ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>الكود</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-4" style={{ color: "#fff" }}>هيكل <span style={{ color: G }}>المجلدات</span></h2>
          </div>
          <div className="rounded-[20px] p-6 md:p-8 overflow-x-auto" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <pre style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, lineHeight: 2, fontFamily: "monospace", margin: 0, whiteSpace: "pre-wrap", direction: "ltr", textAlign: "left" }}>{`mobadi/
├── app/
│   ├── [locale]/
│   │   ├── (portfolio)/
│   │   │   ├── page.tsx              ← الرئيسية (البورتفوليو كامل)
│   │   │   ├── projects/
│   │   │   ├── courses/
│   │   │   └── contact/
│   │   ├── (platform)/
│   │   │   ├── learn/
│   │   │   ├── account/
│   │   │   └── certificates/
│   │   └── admin/
│   │       ├── courses/
│   │       ├── submissions/
│   │       └── students/
│   └── api/
│       ├── auth/send-otp/
│       ├── payments/create-checkout/
│       ├── webhooks/paymob/
│       └── certificates/generate/
├── components/
│   ├── portfolio/       ← كل سكاشن البورتفوليو
│   ├── platform/        ← واجهة منصة التعلم
│   ├── ui/              ← مكونات نظام التصميم
│   └── layout/          ← التنقل + الفوتر
├── lib/
│   ├── supabase/        ← العميل + الأنواع
│   ├── paymob/          ← مساعدات الدفع
│   ├── certificate/     ← توليد PDF
│   └── i18n/            ← إعداد next-intl
├── messages/
│   ├── ar.json          ← الترجمة العربية
│   └── en.json          ← الترجمة الإنجليزية
└── supabase/
    ├── migrations/      ← ملفات SQL
    └── functions/       ← Edge Functions`}</pre>
          </div>
        </div>
      </section>

      {/* ═══ المتغيرات البيئية ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>الإعدادات</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-4">المتغيرات <span style={{ color: G }}>البيئية</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>كل مفتاح API وسر تحتاجه المنصة — مرتبة حسب الخدمة.</p>
          </div>
          <div className="flex flex-col gap-3 ph-stagger">
            {[
              { v: "NEXT_PUBLIC_SUPABASE_URL", svc: "Supabase", pub: true },
              { v: "NEXT_PUBLIC_SUPABASE_ANON_KEY", svc: "Supabase", pub: true },
              { v: "SUPABASE_SERVICE_ROLE_KEY", svc: "Supabase", pub: false },
              { v: "TWILIO_ACCOUNT_SID", svc: "Twilio", pub: false },
              { v: "TWILIO_AUTH_TOKEN", svc: "Twilio", pub: false },
              { v: "TWILIO_VERIFY_SID", svc: "Twilio", pub: false },
              { v: "PAYMOB_API_KEY", svc: "PayMob", pub: false },
              { v: "PAYMOB_HMAC_SECRET", svc: "PayMob", pub: false },
              { v: "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", svc: "Cloudinary", pub: true },
              { v: "BUNNY_CDN_KEY", svc: "Bunny.net", pub: false },
              { v: "NEXT_PUBLIC_APP_URL", svc: "التطبيق", pub: true },
              { v: "NEXT_PUBLIC_DEFAULT_LOCALE", svc: "i18n", pub: true },
            ].map((e) => (
              <div key={e.v} className="ph-item flex items-center gap-4 p-4 rounded-[14px]" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                <span className="text-[11px] font-bold flex-1" style={{ fontFamily: "monospace", color: D }}>{e.v}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: e.pub ? `${G}15` : `${R}12`, color: e.pub ? D : R }}>{e.pub ? "عام" : "سيرفر"}</span>
                <span className="text-[10px] hidden md:block" style={{ color: "rgba(0,0,0,0.35)" }}>{e.svc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ الاستثمار ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>الاستثمار</p>
            <h2 className="ar-heading text-4xl md:text-5xl" style={{ color: "#fff" }}>تكلفة <span style={{ color: G }}>المشروع</span></h2>
          </div>

          <div className="rounded-[24px] p-10 text-center mb-6" style={{ background: G, border: `2px solid ${D}` }}>
            <div className="ar-heading" style={{ fontSize: "clamp(48px, 10vw, 72px)", lineHeight: 1, color: D }}>2,500 <span className="text-2xl">ر.س</span></div>
            <p className="text-[13px] font-bold mt-3 ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>المنصة كاملة — بورتفوليو + كورسات + إدارة + شهادات</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 ph-stagger">
            <div className="ph-item rounded-[16px] p-5 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="ar-heading text-2xl mb-1" style={{ color: "#fff" }}>50%</div>
              <p className="text-[11px] ar-body" style={{ color: "rgba(255,255,255,0.4)" }}>قبل البدء</p>
              <p className="text-[12px] font-bold mt-1" style={{ color: G }}>1,250 ر.س</p>
            </div>
            <div className="ph-item rounded-[16px] p-5 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="ar-heading text-2xl mb-1" style={{ color: "#fff" }}>50%</div>
              <p className="text-[11px] ar-body" style={{ color: "rgba(255,255,255,0.4)" }}>عند التسليم</p>
              <p className="text-[12px] font-bold mt-1" style={{ color: G }}>1,250 ر.س</p>
            </div>
            <div className="ph-item rounded-[16px] p-5 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="ar-heading text-2xl mb-1" style={{ color: "#fff" }}>40</div>
              <p className="text-[11px] ar-body" style={{ color: "rgba(255,255,255,0.4)" }}>يوم حد أقصى</p>
              <p className="text-[12px] font-bold mt-1" style={{ color: G }}>تسليم كامل</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ الختام ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "80px 24px 60px", background: "#fff" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-[24px] p-10 md:p-14 mb-8" style={{ border: "1px solid #EBEBEB" }}>
            <img src="/ahmed.jpeg" alt="Ahmed Ali" className="w-24 h-24 rounded-full object-cover mx-auto mb-6" style={{ border: `3px solid ${G}` }} />
            <h3 className="ar-heading text-3xl mb-6">شكراً لثقتكم</h3>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold" style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}`, textDecoration: "none" }}>
                <MessageCircle size={16} /> واتساب
              </a>
              <a href="mailto:hello@ahmedali.online" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold" style={{ background: "#fff", color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}`, textDecoration: "none" }}>
                إيميل <ArrowRight size={14} />
              </a>
            </div>
            <div className="w-full h-px mb-6" style={{ background: "#F0F0F0" }} />
            <p className="text-[14px] font-bold">Ahmed Ali</p>
            <p className="text-[12px] ar-body" style={{ color: G }}>Full-Stack Digital Strategist</p>
            <p className="text-[12px] ar-body mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>hello@ahmedali.online · ahmedali.online</p>
          </div>
          <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.15)" }}>&copy; {new Date().getFullYear()} Ahmed Ali. مُعد خصيصاً لـ MO BADI.</p>
        </div>
      </section>
    </div>
    </ArabicTailProcessor>
  );
}
