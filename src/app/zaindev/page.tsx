"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Building2, Globe, ShoppingBag, Smartphone, Wrench, Brain,
  AlertTriangle, CheckCircle2, XCircle, Clock, Shield, Search,
  BarChart3, Users, Star, Zap, MessageCircle, ArrowRight,
  ExternalLink, Eye, FileText, Layers, Target, TrendingUp,
  Bot, Calculator, MapPin, Bell, PenTool, Calendar,
  Server, Code2, Palette, Megaphone, Hammer, ThermometerSun,
  type LucideIcon,
} from "lucide-react";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════ COLORS — SAME AS PORTFOLIO ═══════════ */
const G = "#4FFFB0";
const D = "#0A0A0A";
const R = "#EF4444";
const A = "#F59E0B";
const P = "#5227FF";
const B = "#3B82F6";

export default function ZainDevProposal() {
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

  /* ═══ DATA ═══ */

  const zynqorePages: { page: string; score: string; note: string }[] = [
    { page: "الرئيسية", score: "3", note: "المحتوى يعتمد على JS بالكامل (CSR) — محركات البحث لا تراه" },
    { page: "من نحن", score: "2", note: "شبه فارغة. لا قصة، لا فريق، لا إنجازات" },
    { page: "الخدمات", score: "2", note: "عنوان + حقل تتبع فقط. لا قائمة خدمات أو تفاصيل" },
    { page: "الحلول", score: "4", note: "محتوى عام بدون تفاصيل أو أمثلة حقيقية" },
    { page: "خطط الأسعار", score: "1", note: "عنوان وCTA فقط. لا باقات، لا أسعار" },
    { page: "المشاريع", score: "1", note: "البورتفوليو فارغ 100%" },
    { page: "الوظائف", score: "1", note: "0 وظيفة. فلتر بدون محتوى" },
    { page: "التذاكر", score: "4", note: "نموذج موجود. يحتاج ربط Backend فعلي" },
    { page: "تواصل معنا", score: "5", note: "نموذج جيد لكن بيانات التواصل وهمية" },
    { page: "إضافة مشروع", score: "6", note: "أفضل صفحة — نموذج شامل" },
    { page: "السياسات", score: "1", note: "تعرض جاري التحميل + سياسات شحن لشركة خدمات!" },
  ];

  const zaindevPages: { page: string; score: string; note: string }[] = [
    { page: "الرئيسية", score: "4", note: "قسم المتجر مكرر 5 مرات بنفس النص!" },
    { page: "من نحن", score: "5", note: "محتوى جيد لكن كل الصور Freepik" },
    { page: "الخدمات", score: "6", note: "هيكل ممتاز (7 تصنيفات، 40+ خدمة). يحتاج تفاصيل وأسعار" },
    { page: "الاستشارات", score: "6", note: "صفحة جيدة بنموذج + FAQ. الصور Freepik" },
    { page: "المتجر", score: "2", note: "منتجات بصور فكتور وأسعار غير حقيقية" },
    { page: "التطبيق", score: "2", note: "6 ميزات لكن روابط التطبيق وهمية" },
    { page: "خريطة التغطية", score: "2", note: "صورة Freepik وليست خريطة حقيقية" },
    { page: "الشركاء", score: "1", note: "قسم شركاء بدون أي لوجوهات فعلية" },
  ];

  const storeCheckout: { item: string; score: string; note: string }[] = [
    { item: "طرق الدفع", score: "1", note: "tabby, tamara, stc pay كلها وهمية 100%! لا يوجد ربط فعلي" },
    { item: "تأكيد الطلب", score: "1", note: "لا يوجد إيصال أو تأكيد عبر إيميل أو SMS أو WhatsApp" },
    { item: "كود خصم", score: "1", note: "غير موجود نهائياً" },
    { item: "تسجيل دخول", score: "1", note: "لا يوجد نظام حسابات عملاء أو سجل طلبات" },
    { item: "الأمان", score: "2", note: "بادج الدفع آمن وهمي لأن الدفع لا يعمل أصلاً" },
  ];

  const seoData = [
    { item: "Meta Title", z: "⚠️ عام", zd: "✅ موجود لكن طويل" },
    { item: "Meta Description", z: "❌ غير موجود", zd: "⚠️ عام" },
    { item: "Open Graph", z: "❌ غير موجود", zd: "❌ غير موجود" },
    { item: "Sitemap.xml", z: "❌ غير موجود", zd: "⚠️ غير مؤكد" },
    { item: "Schema Markup", z: "❌ غير موجود", zd: "❌ غير موجود" },
    { item: "Rendering", z: "❌ CSR فقط", zd: "⚠️ CSR" },
    { item: "Analytics", z: "❌ غير موجود", zd: "❌ غير موجود" },
    { item: "SSL", z: "✅ HTTPS", zd: "✅ HTTPS" },
  ];

  function ScoreBox({ score }: { score: string }) {
    const n = parseInt(score);
    const c = n >= 7 ? G : n >= 4 ? A : R;
    return <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ar-heading text-base" style={{ background: `${c}15`, color: c }}>{score}</span>;
  }

  function PhaseCard({ num, label, color, duration, items }: { num: number; label: string; color: string; duration: string; items: string[] }) {
    return (
      <div className="rounded-[24px] overflow-hidden" style={{ border: `2px solid ${color}25`, boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[200px] flex-shrink-0 p-8 flex flex-col items-center justify-center text-center" style={{ background: color }}>
            <div className="text-[9px] font-bold tracking-[3px] uppercase mb-1" style={{ color: "rgba(0,0,0,0.4)" }}>المرحلة</div>
            <div className="ar-heading text-5xl mb-2" style={{ color: D }}>{num}</div>
            <div className="ar-heading text-base mb-2" style={{ color: D }}>{label}</div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.08)" }}>
              <Clock size={11} color={D} />
              <span className="text-[11px] font-bold" style={{ color: D }}>{duration}</span>
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
            <p className="text-[13px] font-bold tracking-wider" style={{ color: "rgba(0,0,0,0.3)" }}>أبريل 2026</p>
          </div>

          <div className="ph-hero opacity-0 text-center mb-4">
            <h1 className="ar-heading" style={{ fontSize: "clamp(36px, 8vw, 80px)", lineHeight: 1.3, color: D }}>عرض فني ومالي متكامل</h1>
          </div>

          <div className="ph-hero opacity-0 text-center mb-6">
            <p className="ar-body text-lg md:text-xl" style={{ color: "rgba(0,0,0,0.5)" }}>التحول الرقمي الشامل لشركة زين التنموية</p>
            <p className="text-xl font-bold mt-2 ar-heading" style={{ color: G }}>Zain Development</p>
          </div>

          {/* From / To */}
          <div className="ph-hero opacity-0 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 w-full max-w-xl">
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>مقدم من</p>
              <p className="text-[14px] font-bold ar-body">Ahmed Ali</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>Full-Stack Digital Strategist</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>+5 سنوات خبرة في الخليج</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `2px solid ${G}`, boxShadow: `3px 3px 0px 0px ${D}` }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>مقدم إلى</p>
              <p className="text-[14px] font-bold ar-body">شركة زين التنموية</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>الأحساء • المنطقة الشرقية</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>0547302222</p>
            </div>
          </div>

          {/* Stats */}
          <div className="ph-hero opacity-0 mb-10 w-full max-w-xl">
            <div className="flex items-stretch justify-center" style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              {[{ n: "4", l: "مراحل" }, { n: "10", l: "أسابيع" }, { n: "2", l: "موقعين" }].map((s, i) => (
                <div key={s.l} className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative" style={{ borderRight: i > 0 ? "1px solid #F0F0F0" : "none" }}>
                  <span className="ar-heading" style={{ fontSize: 32, lineHeight: 1, color: D }}>{s.n}</span>
                  <span className="text-[10px] font-bold mt-1 ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>{s.l}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
                </div>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div className="ph-hero opacity-0 rounded-[16px] p-6 text-center mb-10 max-w-2xl" style={{ background: `${G}08`, border: `1px solid ${G}20` }}>
            <p className="text-[13px] ar-body font-medium leading-relaxed" style={{ color: D }}>
              <strong style={{ color: G }}>الهدف:</strong> لما عميل في الأحساء يكتب في جوجل "شركة تكييف" أو "مقاول" — يلاقي زين التنموية في أول النتائج، يدخل موقع يبني ثقة، ويتواصل مباشرة
            </p>
          </div>

          <div className="ph-hero opacity-0 flex flex-col items-center gap-2">
            <div style={{ width: 24, height: 38, border: "1.5px solid rgba(0,0,0,0.14)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: G, animation: "mouseScroll 1.6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
        <style>{`@keyframes mouseScroll{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
      </section>

      {/* ═══ EXECUTIVE SUMMARY ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الأول</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">الملخص التنفيذي</h2>
          </div>
          <div className="rounded-[20px] p-8 md:p-10" style={{ border: "1px solid #EBEBEB" }}>
            <p className="text-[14px] ar-body leading-[2] mb-6" style={{ color: D }}>
              زين التنموية شركة عندها 15 سنة خبرة و500+ مشروع — لكن الموقعين الحاليين ما يعكسوا هالحجم. العميل اللي يزور الموقع اليوم يشوف صور Freepik، بيانات وهمية، ومتجر ما يقبل دفع فعلي. هذا العرض يعالج كل هالمشاكل ويحول الحضور الرقمي لزين إلى أداة تجيب عملاء وتبني ثقة.
            </p>
            <p className="text-[14px] ar-body leading-[2]" style={{ color: "rgba(0,0,0,0.6)" }}>
              حللت الموقعين صفحة صفحة — Zynqore (الحلول التقنية) وZainDev (المقاولات والخدمات) — وفي الصفحات التالية هتشوف التقييم التفصيلي لكل صفحة، المشاكل اللي تأثر على مصداقيتكم، والخطة العملية لإصلاح كل شيء.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ COMPANY ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الثاني</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">فهم <span style={{ color: G }}>الشركة</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ph-stagger">
            {[
              { icon: Hammer, title: "المقاولات العامة", desc: "التطوير العقاري سكني وتجاري" },
              { icon: ThermometerSun, title: "خدمات التكييف", desc: "توريد، تركيب، صيانة، مواسير نحاس" },
              { icon: Wrench, title: "الصيانة الشاملة", desc: "كهرباء، سباكة، تنظيف" },
              { icon: Palette, title: "التصميم والديكور", desc: "التصميم والديكور الداخلي" },
              { icon: Megaphone, title: "التسويق الإلكتروني", desc: "الحلول التقنية عبر Zynqore" },
              { icon: ShoppingBag, title: "التجارة الإلكترونية", desc: "متجر زين للمكيفات" },
            ].map((s) => (
              <div key={s.title} className="ph-item rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${G}10` }}>
                  <s.icon size={18} color={G} />
                </div>
                <h3 className="text-[13px] font-bold ar-body mb-1">{s.title}</h3>
                <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.45)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[16px] p-6 text-center" style={{ background: `${R}08`, border: `1px solid ${R}20` }}>
            <p className="text-[13px] ar-body" style={{ color: D }}>
              <strong style={{ color: R }}>المشكلة:</strong> عميل يبحث عنكم أونلاين يشوف موقع ما يقنعه — صور مش حقيقية، متجر ما يقبل دفع، وبيانات تواصل وهمية. هذا يكلفكم عملاء كل يوم.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ ZYNQORE ANALYSIS ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الثالث</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-3" style={{ color: "#fff" }}>تحليل موقع <span style={{ color: G }}>Zynqore</span></h2>
            <p className="text-sm ar-body" style={{ color: "rgba(255,255,255,0.4)" }}>tech-pearl-rho.vercel.app</p>
          </div>

          {/* Overall score */}
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="md:w-[240px] flex-shrink-0 rounded-[24px] p-8 flex flex-col items-center justify-center" style={{ background: R }}>
              <p className="text-[10px] font-bold tracking-[3px] uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>التقييم العام</p>
              <div className="ar-heading" style={{ fontSize: 72, lineHeight: 1, color: "#fff" }}>2.7</div>
              <p className="text-[12px] font-bold mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>من 10</p>
              <div className="w-full h-1.5 rounded-full mt-4" style={{ background: "rgba(255,255,255,0.15)" }}>
                <div className="h-full rounded-full" style={{ width: "27%", background: "#fff" }} />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 ph-stagger">
              {[
                { title: "أزمة هوية", desc: 'ثلاثة أسماء مختلفة في موقع واحد: Zain Tech + Zynqore + زين التنموية', icon: AlertTriangle, color: R },
                { title: "استضافة مجانية", desc: "vercel.app بدلاً من tech.zaindev.com.sa — يفقد المصداقية", icon: Globe, color: A },
                { title: "بيانات وهمية", desc: "هاتف +966 11 123 4567 وبريد info@zynqore.com — غير حقيقية", icon: Shield, color: R },
              ].map((item) => (
                <div key={item.title} className="ph-item rounded-[16px] p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <item.icon size={20} color={item.color} className="mb-3" />
                  <h4 className="text-[13px] font-bold mb-1" style={{ color: "#fff" }}>{item.title}</h4>
                  <p className="text-[11px] ar-body" style={{ color: "rgba(255,255,255,0.4)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Page ratings with progress bars */}
          <div className="rounded-[24px] p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="ar-heading text-xl mb-8" style={{ color: "#fff" }}>تقييم الصفحات</h3>
            <div className="flex flex-col gap-5 ph-stagger">
              {zynqorePages.map((p) => {
                const n = parseInt(p.score);
                const c = n >= 7 ? G : n >= 4 ? A : R;
                return (
                  <div key={p.page} className="ph-item">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] font-bold" style={{ color: "#fff" }}>{p.page}</span>
                      <span className="text-[13px] font-bold" style={{ color: c }}>{p.score}/10</span>
                    </div>
                    <div className="w-full h-2 rounded-full mb-2" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${n * 10}%`, background: c }} />
                    </div>
                    <p className="text-[10px] ar-body" style={{ color: "rgba(255,255,255,0.35)" }}>{p.note}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technical issues */}
          <div className="mt-8 rounded-[20px] p-7" style={{ background: `${R}15`, border: `1px solid ${R}30` }}>
            <h3 className="ar-heading text-lg mb-4" style={{ color: "#fff" }}>مشاكل تقنية حرجة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "الموقع يعتمد على Client-Side Rendering — جوجل لا تقرأ المحتوى",
                "لا يوجد Sitemap.xml أو Robots.txt أو Meta Tags",
                "لا يوجد Google Analytics أو أي أداة تتبع",
                "يحتاج تحويل إلى SSR أو SSG فوراً",
              ].map((issue) => (
                <div key={issue} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.2)" }}>
                  <XCircle size={14} color={R} className="flex-shrink-0 mt-0.5" />
                  <span className="text-[11px] ar-body" style={{ color: "rgba(255,255,255,0.6)" }}>{issue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ZAINDEV ANALYSIS ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الرابع</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-3">تحليل موقع <span style={{ color: G }}>ZainDev</span></h2>
            <p className="text-sm ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>zaindev.com.sa</p>
          </div>

          {/* Overall + Issues side by side */}
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="md:w-[240px] flex-shrink-0 rounded-[24px] p-8 flex flex-col items-center justify-center" style={{ background: A }}>
              <p className="text-[10px] font-bold tracking-[3px] uppercase mb-2" style={{ color: "rgba(0,0,0,0.4)" }}>التقييم العام</p>
              <div className="ar-heading" style={{ fontSize: 72, lineHeight: 1, color: D }}>3.5</div>
              <p className="text-[12px] font-bold mt-1" style={{ color: "rgba(0,0,0,0.5)" }}>من 10</p>
              <div className="w-full h-1.5 rounded-full mt-4" style={{ background: "rgba(0,0,0,0.1)" }}>
                <div className="h-full rounded-full" style={{ width: "35%", background: D }} />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 ph-stagger">
              {[
                { title: "صور وهمية", desc: "كل الصور Freepik — لا صورة حقيقية واحدة للشركة أو مشاريعها", icon: Eye, color: R },
                { title: "محتوى مكرر", desc: "قسم المتجر مكرر 5 مرات بنفس النص حرفياً", icon: Layers, color: A },
                { title: "روابط معطلة", desc: "الفوتر → example.com والتطبيق → # والشركاء فارغ", icon: Globe, color: R },
              ].map((item) => (
                <div key={item.title} className="ph-item rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                  <item.icon size={20} color={item.color} className="mb-3" />
                  <h4 className="text-[13px] font-bold mb-1">{item.title}</h4>
                  <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.45)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Page ratings with progress bars */}
          <div className="rounded-[24px] p-8" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
            <h3 className="ar-heading text-xl mb-8">تقييم الصفحات</h3>
            <div className="flex flex-col gap-5 ph-stagger">
              {zaindevPages.map((p) => {
                const n = parseInt(p.score);
                const c = n >= 7 ? G : n >= 4 ? A : R;
                return (
                  <div key={p.page} className="ph-item">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] font-bold">{p.page}</span>
                      <span className="text-[13px] font-bold" style={{ color: c }}>{p.score}/10</span>
                    </div>
                    <div className="w-full h-2 rounded-full mb-2" style={{ background: "#E5E7EB" }}>
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${n * 10}%`, background: c }} />
                    </div>
                    <p className="text-[10px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>{p.note}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content issues detail */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 ph-stagger">
            {[
              { text: "تقييمات العملاء بأفاتار موحد (businessman avatar)", icon: Users },
              { text: 'خدمة الصيانة تعرض فني "محمد أحمد" بصورة Freepik', icon: Wrench },
              { text: "الإحصائيات (500+ مشروع) تحتاج توثيق", icon: BarChart3 },
              { text: 'رابط "تطوير بواسطة" يشير ل example.com', icon: Code2 },
            ].map((item) => (
              <div key={item.text} className="ph-item flex items-center gap-3 p-4 rounded-[14px]" style={{ background: `${A}08`, border: `1px solid ${A}15` }}>
                <item.icon size={16} color={A} className="flex-shrink-0" />
                <span className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STORE — CHECKOUT CRITICAL ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: R }}>القسم الخامس</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-3" style={{ color: "#fff" }}>تحليل المتجر <span style={{ color: R }}>الإلكتروني</span></h2>
          </div>

          <div className="rounded-[20px] p-7 mb-10" style={{ background: R }}>
            <p className="text-[14px] ar-body font-bold text-center" style={{ color: "#fff" }}>
              ⚠️ تنبيه حرج: صفحة الدفع هي أضعف حلقة. طرق الدفع الثلاث كلها وهمية وغير مربوطة ببوابات دفع فعلية.
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-10 ph-stagger">
            {storeCheckout.map((item) => (
              <div key={item.item} className="ph-item rounded-[14px] p-4 flex items-center gap-4" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <ScoreBox score={item.score} />
                <div className="flex-1">
                  <h4 className="text-[13px] font-bold ar-body">{item.item}</h4>
                  <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.45)" }}>{item.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Missing elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ph-stagger">
            {[
              { title: "عناصر حرجة", color: R, items: ["ربط بوابات دفع فعلية", "نظام تأكيد الطلبات", "نظام إدارة المخزون", "نظام حسابات العملاء", "نظام تتبع الشحنات"] },
              { title: "عناصر مهمة", color: A, items: ["حقل كود خصم", "اختيار طريقة الشحن", "شريط تقدم Checkout", "نظام مراجعات موثقة", "مقارنة منتجات + Wishlist"] },
              { title: "عناصر متقدمة", color: G, items: ["شات بوت AI لاختيار المكيف", "حاسبة اختيار المكيف", "برنامج ولاء ونقاط", "إشعارات انخفاض السعر", "ربط Google Merchant"] },
            ].map((group) => (
              <div key={group.title} className="ph-item rounded-[20px] p-6" style={{ background: "#fff" }}>
                <h4 className="text-[12px] font-bold tracking-wider uppercase mb-4 ar-body" style={{ color: group.color }}>{group.title}</h4>
                {group.items.map((item) => (
                  <div key={item} className="flex items-start gap-2 mb-3">
                    <CheckCircle2 size={14} color={group.color} className="flex-shrink-0 mt-0.5" />
                    <span className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEO ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم السادس</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">تحليل <span style={{ color: G }}>SEO</span></h2>
          </div>
          <div className="overflow-x-auto rounded-[20px] border" style={{ borderColor: "#EBEBEB" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
              <thead>
                <tr style={{ background: D }}>
                  <th style={{ padding: "14px 20px", textAlign: "right", fontSize: 11, fontWeight: 700, color: G, fontFamily: "'Ahmed Sans'" }}>العنصر</th>
                  <th style={{ padding: "14px 20px", textAlign: "center", fontSize: 11, fontWeight: 700, color: G, fontFamily: "'Ahmed Sans'" }}>Zynqore</th>
                  <th style={{ padding: "14px 20px", textAlign: "center", fontSize: 11, fontWeight: 700, color: G, fontFamily: "'Ahmed Sans'" }}>ZainDev</th>
                </tr>
              </thead>
              <tbody>
                {seoData.map((row, i) => (
                  <tr key={row.item} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: "1px solid #F3F4F6" }}>
                    <td style={{ padding: "12px 20px", fontSize: 13, fontWeight: 700, color: D, fontFamily: "'Ahmed Sans'" }}>{row.item}</td>
                    <td style={{ padding: "12px 20px", textAlign: "center", fontSize: 12, color: "rgba(0,0,0,0.6)", fontFamily: "'Ahmed Sans'" }}>{row.z}</td>
                    <td style={{ padding: "12px 20px", textAlign: "center", fontSize: 12, color: "rgba(0,0,0,0.6)", fontFamily: "'Ahmed Sans'" }}>{row.zd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ AI STRATEGY ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم السابع</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>استراتيجية <span style={{ color: G }}>الذكاء الاصطناعي</span></h2>
            <p className="text-sm ar-body max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.35)" }}>عميلك يسأل عن سعر مكيف الساعة 2 الفجر — مين يرد عليه؟ هنا يدخل الذكاء الاصطناعي.</p>
          </div>

          {/* AI Journey — connected flow */}
          <div className="mb-12">
            <div className="hidden md:flex justify-center mb-3">
              <div className="h-[3px] rounded-full" style={{ width: "80%", background: `linear-gradient(90deg, ${G}30, ${G}, ${G}30)` }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ph-stagger">
              {[
                { icon: Bot, num: "01", title: "العميل يسأل", desc: "شات بوت مدرب على كل خدمات زين يرد فوراً 24/7 على الأسعار والمواعيد ويحجز زيارات الفنيين تلقائياً", stat: "-70%", statLabel: "ضغط على الدعم" },
                { icon: Calculator, num: "02", title: "العميل يحسب", desc: "نظام تقدير تكلفة ذكي — العميل يدخل نوع المشروع + المساحة + الموقع ويحصل على تقدير فوري", stat: "3x", statLabel: "تحويل أسرع" },
                { icon: Target, num: "03", title: "النظام يخصص", desc: "عرض خدمات مختلفة حسب موقع الزائر (أحساء/خبر/رياض) وسلوك التصفح — كل زائر يرى ما يناسبه", stat: "+40%", statLabel: "معدل التحويل" },
              ].map((s) => (
                <div key={s.title} className="ph-item rounded-[24px] p-8 relative overflow-hidden" style={{ background: "#fff" }}>
                  <div className="absolute top-4 left-4">
                    <span className="ar-heading text-[56px]" style={{ color: `${G}10` }}>{s.num}</span>
                  </div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${G}12` }}>
                      <s.icon size={26} color={G} />
                    </div>
                    <h3 className="ar-heading text-xl mb-3" style={{ color: D }}>{s.title}</h3>
                    <p className="text-[12px] ar-body leading-relaxed mb-5" style={{ color: "rgba(0,0,0,0.5)" }}>{s.desc}</p>
                    <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid #F0F0F0" }}>
                      <span className="ar-heading text-2xl" style={{ color: G }}>{s.stat}</span>
                      <span className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>{s.statLabel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supporting AI tools */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ph-stagger">
            {[
              { icon: BarChart3, title: "لوحة تحكم ذكية", desc: "تحليلات AI تتنبأ بالطلب الموسمي", benefit: "صيف = تكييف → جهّز المخزون" },
              { icon: Calendar, title: "جدولة ذكية", desc: "توزيع الفنيين حسب الموقع والتخصص", benefit: "تقليل وقت الاستجابة" },
              { icon: PenTool, title: "محتوى AI", desc: "توليد وصف خدمات ومقالات SEO", benefit: "محتوى مستمر بدون تكلفة كاتب" },
            ].map((s) => (
              <div key={s.title} className="ph-item rounded-[16px] p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <s.icon size={18} color={G} />
                  <h4 className="text-[13px] font-bold" style={{ color: "#fff" }}>{s.title}</h4>
                </div>
                <p className="text-[11px] ar-body mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{s.desc}</p>
                <span className="text-[10px] font-bold" style={{ color: G }}>{s.benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GROWTH STRATEGY ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الثامن</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">استراتيجية <span style={{ color: G }}>النمو</span></h2>
            <p className="text-sm ar-body max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.4)" }}>الموقع الحلو بدون استراتيجية = بروشور ما حد يشوفه. هنا الخطة اللي تخلي الناس توصلكم.</p>
          </div>

          <div className="flex flex-col gap-6 ph-stagger">
            {/* Strategy 1 — Identity */}
            <div className="ph-item rounded-[24px] overflow-hidden" style={{ border: `2px solid ${G}25` }}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-[220px] flex-shrink-0 p-8 flex flex-col items-center justify-center text-center" style={{ background: G }}>
                  <Layers size={32} color={D} className="mb-3" />
                  <div className="ar-heading text-xl" style={{ color: D }}>الهوية الموحدة</div>
                  <p className="text-[10px] mt-2" style={{ color: "rgba(0,0,0,0.4)" }}>الركيزة الأولى</p>
                </div>
                <div className="flex-1 p-8 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-[16px] p-5" style={{ background: "#FAFAFA" }}>
                      <p className="text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: G }}>الموقع الرئيسي</p>
                      <p className="text-[14px] font-bold" style={{ fontFamily: "system-ui" }}>zaindev.com.sa</p>
                      <p className="text-[11px] ar-body mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>المقاولات والخدمات</p>
                    </div>
                    <div className="rounded-[16px] p-5" style={{ background: "#FAFAFA" }}>
                      <p className="text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: P }}>الموقع التقني</p>
                      <p className="text-[14px] font-bold" style={{ fontFamily: "system-ui" }}>tech.zaindev.com.sa</p>
                      <p className="text-[11px] ar-body mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>الحلول التقنية</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4 pt-4" style={{ borderTop: "1px solid #F0F0F0" }}>
                    <CheckCircle2 size={14} color={G} />
                    <span className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>لوجو موحد + ألوان موحدة + خطوط موحدة + ربط متبادل</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy 2 — Content */}
            <div className="ph-item rounded-[24px] overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-[220px] flex-shrink-0 p-8 flex flex-col items-center justify-center text-center" style={{ background: "#fff", borderLeft: `4px solid ${P}` }}>
                  <FileText size={32} color={P} className="mb-3" />
                  <div className="ar-heading text-xl" style={{ color: D }}>استراتيجية المحتوى</div>
                  <p className="text-[10px] mt-2" style={{ color: "rgba(0,0,0,0.35)" }}>الركيزة الثانية</p>
                </div>
                <div className="flex-1 p-8 bg-white">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Eye, text: "محتوى احترافي حقيقي (عربي + إنجليزي)" },
                      { icon: Star, text: "تصوير احترافي للمشاريع والفريق" },
                      { icon: Users, text: "تقييمات عملاء حقيقية بصورهم" },
                      { icon: FileText, text: "مدونة بمقالات متخصصة (نصائح تكييف، أخطاء بناء شائعة)" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "#FAFAFA" }}>
                        <item.icon size={16} color={P} className="flex-shrink-0 mt-0.5" />
                        <span className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.55)" }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy 3 — Conversion */}
            <div className="ph-item rounded-[24px] overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-[220px] flex-shrink-0 p-8 flex flex-col items-center justify-center text-center" style={{ background: "#fff", borderLeft: `4px solid ${B}` }}>
                  <TrendingUp size={32} color={B} className="mb-3" />
                  <div className="ar-heading text-xl" style={{ color: D }}>التحويل والنمو</div>
                  <p className="text-[10px] mt-2" style={{ color: "rgba(0,0,0,0.35)" }}>الركيزة الثالثة</p>
                </div>
                <div className="flex-1 p-8 bg-white">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Calendar, text: "نظام حجز مواعيد أونلاين للصيانة والتكييف" },
                      { icon: Calculator, text: "نظام عروض أسعار فوري للخدمات" },
                      { icon: MessageCircle, text: "WhatsApp Business API للتواصل المباشر" },
                      { icon: MapPin, text: "Google My Business لكل منطقة تغطية" },
                      { icon: Target, text: "حملات Google Ads مستهدفة جغرافياً" },
                      { icon: Users, text: "برنامج إحالة عملاء (Referral Program)" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "#FAFAFA" }}>
                        <item.icon size={16} color={B} className="flex-shrink-0 mt-0.5" />
                        <span className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.55)" }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DEVELOPMENT PLAN ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم التاسع</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">خطة <span style={{ color: G }}>التطوير</span></h2>
          </div>
          <div className="flex flex-col gap-6 ph-stagger">
            <PhaseCard num={1} label="الاستراتيجية والهوية" color={G} duration="أسبوعين" items={["توحيد الاسم وتصميم لوجو احترافي موحد", "تحديد Color Palette + Typography + Design System", "ربط الموقع التقني بدومين فرعي tech.zaindev.com.sa", "كتابة محتوى احترافي لكل صفحة", "جمع صور حقيقية + تقييمات عملاء فعلية"]} />
            <PhaseCard num={2} label="تطوير ZainDev" color={B} duration="3 أسابيع" items={["إعادة تصميم الرئيسية وإزالة التكرارات", "صفحة الخدمات بتفاصيل وأسعار", "بورتفوليو مشاريع حقيقي بصور ودراسات حالة", "خريطة تغطية تفاعلية (Google Maps API)", "إصلاح المتجر + بوابات دفع فعلية", "تحسين SEO كامل + Google Analytics"]} />
            <PhaseCard num={3} label="تطوير Zynqore" color={P} duration="3 أسابيع" items={["إعادة بناء كامل بتصميم احترافي مع SSR", "كل الصفحات بمحتوى فعلي", "نظام التذاكر والدعم الفني", "نظام الوظائف والتقديم", "تفعيل ثنائي اللغة فعلياً", "سياسات مناسبة لشركة خدمات"]} />
            <PhaseCard num={4} label="دمج AI + تحسينات" color={A} duration="أسبوعين" items={["AI Chatbot على الموقعين", "نظام تقدير التكلفة الآلي", "تخصيص المحتوى الذكي", "ربط جميع الأنظمة + اختبار شامل + تدريب الفريق"]} />
          </div>
        </div>
      </section>




      {/* ═══ CLOSING ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "80px 24px 60px", background: "#fff" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-[24px] p-10 md:p-14 mb-8" style={{ border: "1px solid #EBEBEB" }}>
            <img src="/ahmed.jpeg" alt="Ahmed Ali" className="w-24 h-24 rounded-full object-cover mx-auto mb-6" style={{ border: `3px solid ${G}` }} />
            <h3 className="ar-heading text-3xl mb-2">شكراً لوقتكم</h3>
            <p className="ar-heading text-lg mb-6" style={{ color: G }}>15 سنة خبرة تستاهل حضور رقمي يليق بيها — وأنا مستعد أبنيه معاكم</p>
            <div className="w-full h-px mb-6" style={{ background: "#F0F0F0" }} />
            <p className="text-[14px] font-bold">Ahmed Ali</p>
            <p className="text-[12px] ar-body" style={{ color: G }}>Full-Stack Digital Strategist</p>
            <p className="text-[12px] ar-body mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>hello@ahmedali.online | ahmedali.online</p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <a href="https://ahmedali.online" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold" style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${D}`, textDecoration: "none" }}>
                الموقع الشخصي <ExternalLink size={14} />
              </a>
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold" style={{ background: "#fff", color: D, border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${D}`, textDecoration: "none" }}>
                واتساب <ArrowRight size={14} />
              </a>
            </div>
          </div>
          <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.15)" }}>&copy; {new Date().getFullYear()} Ahmed Ali. هذا العرض سري وخاص لشركة زين التنموية.</p>
        </div>
      </section>
    </div>
    </ArabicTailProcessor>
  );
}
