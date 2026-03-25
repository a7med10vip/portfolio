"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Calendar, TrendingUp, ArrowLeft } from "lucide-react";
/* eslint-disable @next/next/no-img-element */

gsap.registerPlugin(ScrollTrigger);

type Experience = {
  role: string;
  company: string;
  location: string;
  flag: string;
  period: string;
  type: string;
  active: boolean;
  color: string;
  description: string;
  achievements: string[];
  tools: string[];
  toolIcons: string[];
};

const experiences = [
  {
    role: "مسؤول تسويق رقمي",
    company: "Elite Marketing Services",
    location: "الدوحة، قطر",
    flag: "\u0642\u0637",
    period: "أغسطس 2025 – مارس 2026",
    type: "دوام كامل",
    active: false,
    color: "#FF4D4D",
    description: "أدرت ونفّذت استراتيجيات تسويق رقمي لمحفظة عملاء متنوعة عبر قطاعات متعددة في منطقة الشرق الأوسط.",
    achievements: [
      "أدرت وحسّنت حملات PPC عبر Google Ads و Meta Ads و TikTok Ads, تحسين ROAS وتقليل CPA",
      "نفّذت تدقيقات تحسين محركات البحث تقنية وتحسين صفحات لرفع ترتيب البحث والظهور العضوي",
      "بنيت تقارير أداء باستخدام GA4 و Google Tag Manager مع توصيات استراتيجية مبنية على البيانات",
    ],
    tools: ["Google Ads", "Meta Ads", "TikTok Ads", "GA4", "GTM", "SEMrush", "Search Console", "WordPress"],
    toolIcons: [
      "/ext/google-ads-icon.png",
      "https://cdn.simpleicons.org/meta/0081FB",
      "https://cdn.simpleicons.org/tiktok/000000",
      "/ext/google-analytics.png",
      "/ext/gtm.svg",
      "/ext/semrush.png",
      "/ext/gsc.png",
      "/ext/wordpress.svg",
    ],
  },
  {
    role: "مدير منتجات رقمية",
    company: "Omnis Media Group",
    location: "دبي، الإمارات",
    flag: "\u0625\u0645",
    period: "أغسطس 2025 – مارس 2026",
    type: "دوام كامل",
    active: false,
    color: "#FF8C00",
    description: "مستشار استراتيجية رقمية رئيسي لمجموعة Omnis Media, الرائدة في ابتكارات تقنية التسويق في الشرق الأوسط ومنظّمة Mobile Developers Week، مؤتمر تقني دولي بارز في مركز أبوظبي للطاقة بحضور أكثر من 3,000 شخص و60+ متحدثاً دولياً.",
    achievements: [
      "قدّمت استشارات للقيادة العليا حول الاستراتيجية الرقمية ونمو مبيعات التذاكر واستقطاب الجمهور لـ MDW 2025",
      "قُدت تطوير منصات مدعومة بالذكاء الاصطناعي باستخدام React و Next.js و Firebase, من الاستراتيجية إلى الإطلاق",
      "حققت نمواً عبر التسويق بالأداء وتحسين محركات البحث التقني وتحسين تجربة المستخدم عبر جميع المنصات المُدارة",
    ],
    tools: ["React", "Next.js", "Firebase", "AI", "Google Ads", "Search Console", "GA4"],
    toolIcons: [
      "/ext/react.svg",
      "/ext/nextjs.svg",
      "/ext/firebase.svg",
      "/ext/openai.png",
      "/ext/google-ads-icon.png",
      "/ext/gsc.png",
      "/ext/google-analytics.png",
    ],
  },
  {
    role: "أخصائي تسويق رقمي ومشاريع ويب",
    company: "شركة عز الآفاق",
    location: "المملكة العربية السعودية",
    flag: "\u0633\u0639",
    period: "يناير 2024 – يوليو 2025",
    type: "دوام كامل",
    active: false,
    color: "#E67E22",
    description: "قُدت حملات التسويق الرقمي وتصميم المواقع وتحسين محركات البحث لحسابات عملاء عالية القيمة عبر قطاعات الضيافة والرعاية الصحية والأغذية.",
    achievements: [
      "طوّرت أنظمة ويب متكاملة باستخدام WordPress و APIs مخصصة لتحسين الوظائف وتفاعل المستخدمين",
      "أدرت حملات Google Ads و Meta Ads و TikTok Ads لتحقيق عائد قابل للقياس للعملاء",
      "بنيت صفحات هبوط عالية التحويل محسّنة لتوليد العملاء المحتملين وتقليل تكلفة الاكتساب",
      "نفّذت تتبع GA4 و GTM لمراقبة سلوك المستخدمين وأداء الحملات",
    ],
    tools: ["Google Ads", "WordPress", "GA4", "GTM", "Meta Ads", "TikTok Ads", "Search Console", "SEMrush"],
    toolIcons: [
      "/ext/google-ads-icon.png",
      "/ext/wordpress.svg",
      "/ext/google-analytics.png",
      "/ext/gtm.svg",
      "https://cdn.simpleicons.org/meta/0081FB",
      "https://cdn.simpleicons.org/tiktok/000000",
      "/ext/gsc.png",
      "/ext/semrush.png",
    ],
  },
  {
    role: "رئيس تحسين محركات البحث وتطوير الويب",
    company: "مجلة Finance & Business",
    location: "الإمارات (عن بُعد)",
    flag: "\u0625\u0645",
    period: "2024 – فبراير 2025",
    type: "عقد",
    active: false,
    color: "#00BFFF",
    description: "بنيت وأدرت الحضور الرقمي الكامل لمنصة Finance & Business, منصة تحريرية إماراتية رائدة لقادة الأعمال.",
    achievements: [
      "نفّذت استراتيجية تحسين محركات البحث شاملة (On-Page, Off-Page, Technical). ترتيب ضمن أفضل 10 نتائج في Google خلال 8 أشهر",
      "دمجت أدوات تحليلات وأتمتة لتتبع سلوك المستخدمين وتوجيه القرارات التحريرية",
      "أدرت استراتيجية محتوى حققت نمواً عضوياً مستداماً لكلمات مفتاحية تنافسية في المالية",
    ],
    tools: ["WordPress", "SEO", "GA4", "Search Console"],
    toolIcons: [
      "/ext/wordpress.svg",
      "/ext/semrush.png",
      "/ext/google-analytics.png",
      "/ext/gsc.png",
    ],
  },
  {
    role: "أخصائي تحسين محركات البحث",
    company: "بن غاطي للاستثمارات",
    location: "الإمارات (عن بُعد)",
    flag: "\u0625\u0645",
    period: "ديسمبر 2022 – أغسطس 2023",
    type: "عقد · 9 أشهر",
    active: false,
    color: "#A855F7",
    description: "تعاونت ضمن فريق تحسين محركات البحث لتنفيذ استراتيجيات رفعت ترتيب كلمات مفتاحية عالية القيمة في قطاع العقارات الفاخرة بدبي.",
    achievements: [
      "نفّذت استراتيجية تحسين محركات البحث رفعت ترتيب كلمات مفتاحية عالية القيمة في سوق العقارات الإماراتي",
      "راقبت وأعددت تقارير الأداء باستخدام Google Analytics و Search Console",
      "قدّمت رؤى استراتيجية للتحسين المستمر لظهور البحث العضوي",
    ],
    tools: ["SEO", "GA4", "Search Console", "GTM"],
    toolIcons: [
      "/ext/semrush.png",
      "/ext/google-analytics.png",
      "/ext/gsc.png",
      "/ext/gtm.svg",
    ],
  },
  {
    role: "مستشار استراتيجية رقمية ومطور شامل",
    company: "عمل حر",
    location: "عن بُعد · عالمياً",
    flag: "\u0639\u0627",
    period: "2020 – الآن",
    type: "عمل حر",
    active: true,
    color: "#4FFFB0",
    description: "أقدّم حلولاً رقمية شاملة عبر مصر والسعودية والإمارات وعُمان لعملاء في الرعاية الصحية والعقارات والضيافة والتجارة الإلكترونية.",
    achievements: [
      "الرعاية الصحية: منظومات رقمية كاملة لأم الحمام (الرياض)، مستشفى عبيد، الرقي الطبي، عيادة RM (مكة)",
      "العقارات: تحسين محركات البحث وتسويق أداء لـ BinGhatti و Evolution Dubai و بن لادن الإمارات",
      "تطبيقات الهاتف: بنيت تطبيق معصوب السلطان بـ Flutter, روبوت محادثة ذكي، إدارة 5 فروع، تم الإطلاق في أقل من شهر",
      "الضيافة: تسليم منصة Wejhat MGT ومواقع متعددة لقطاع الخدمات في الخليج",
      "قيد التنفيذ: تطبيق مغاسل B2B/B2C، منصة تعليمية بالذكاء الاصطناعي، مسار (مشروع شخصي)، ومركز تدريب تمريض RMC",
    ],
    tools: ["Flutter", "React", "Next.js", "Firebase", "WordPress", "Google Ads", "Meta Ads", "TikTok Ads", "GA4", "GTM", "SEMrush", "Search Console", "AI"],
    toolIcons: [
      "/ext/flutter.svg",
      "/ext/react.svg",
      "/ext/nextjs.svg",
      "/ext/firebase.svg",
      "/ext/wordpress.svg",
      "/ext/google-ads-icon.png",
      "https://cdn.simpleicons.org/meta/0081FB",
      "https://cdn.simpleicons.org/tiktok/000000",
      "/ext/google-analytics.png",
      "/ext/gtm.svg",
      "/ext/semrush.png",
      "/ext/gsc.png",
      "/ext/openai.png",
    ],
  },
] satisfies Experience[];

type KeyClient = {
  name: string;
  logo: string;
  work: string;
  flag: string;
};

/* Key clients */
const keyClients = [
  { name: "Ooredoo", logo: "/logos/ooredoo.png", work: "تدقيق تحسين محركات البحث تقني", flag: "\u0642\u0637" },
  { name: "QNB", logo: "/logos/qnb.png", work: "تحليل UX", flag: "\u0642\u0637" },
  { name: "Amazon Egypt", logo: "/logos/amazon.svg", work: "استراتيجية محتوى تحسين محركات البحث", flag: "\u0645\u0635" },
  { name: "Saudi Arabian Airlines", logo: "/ext/saudia.svg", work: "تحليل SWOT والمنافسين", flag: "\u0633\u0639" },
  { name: "BinGhatti", logo: "/logos/binghatti.png", work: "تحسين محركات البحث وحضور رقمي", flag: "\u0625\u0645" },
  { name: "Chelsea FC", logo: "/logos/chelsea.png", work: "تحسين UX", flag: "\u0628\u0631" },
  { name: "Elite Marketing", logo: "/ext/elite-qatar.png", work: "تسويق أداء", flag: "\u0642\u0637" },
  { name: "Omnis Media", logo: "/ext/omnes.svg", work: "تطوير منصة AI", flag: "\u0625\u0645" },
  { name: "RM Clinic", logo: "/ext/rmclinic.png", work: "منظومة رقمية كاملة", flag: "\u0633\u0639" },
  { name: "Finance & Business", logo: "/ext/finance-business.png", work: "تحسين محركات البحث ومنصة ويب", flag: "\u0625\u0645" },
  { name: "MDW", logo: "/ext/mdw.png", work: "استراتيجية رقمية للفعاليات", flag: "\u0625\u0645" },
  { name: "Maasob Al-Sultan", logo: "/ext/masoub.png", work: "تطبيق Flutter", flag: "\u0633\u0639" },
  { name: "CarTech", logo: "/logos/cartech.png", work: "تسويق رقمي", flag: "\u0645\u0635" },
  { name: "Advert on Click", logo: "/ext/advertonclick.svg", work: "حملات أداء", flag: "\u0645\u0635" },
  { name: "Omnes Influencers", logo: "/ext/omnes-influencers.svg", work: "منصة مؤثرين", flag: "\u0625\u0645" },
  { name: "Kadana", logo: "/1.svg", work: "بحث سوقي واستراتيجية", flag: "\u0633\u0639" },
] satisfies KeyClient[];

export default function ExperienceAr() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".exp-card-ar").forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1, duration: 1.5, ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      }

      const clientRow1 = sectionRef.current?.querySelector(".client-row-1-ar") as HTMLElement;
      if (clientRow1) {
        const w = clientRow1.scrollWidth / 2;
        gsap.to(clientRow1, { x: -w, duration: 30, ease: "none", repeat: -1 });
      }

      const clientRow2 = sectionRef.current?.querySelector(".client-row-2-ar") as HTMLElement;
      if (clientRow2) {
        const w = clientRow2.scrollWidth / 2;
        gsap.set(clientRow2, { x: -w });
        gsap.to(clientRow2, { x: 0, duration: 30, ease: "none", repeat: -1 });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden"
      style={{ background: "#0A0A0A", padding: "100px 24px" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #4FFFB0 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="ar-script text-xl md:text-2xl mb-3" style={{ color: "#4FFFB0" }}>المسيرة المهنية</p>
          <h2 className="ar-heading text-3xl md:text-4xl" style={{ color: "#fff" }}>أين صنعت الأثر</h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line - desktop */}
          <div
            ref={lineRef}
            className="hidden md:block absolute right-1/2 translate-x-1/2 top-0 bottom-0 w-[2px] origin-top"
            style={{ background: "linear-gradient(to bottom, #4FFFB0, rgba(79,255,176,0.1))" }}
          />

          {/* Mobile line */}
          <div
            className="md:hidden absolute right-5 top-0 bottom-0 w-[2px]"
            style={{ background: "linear-gradient(to bottom, #4FFFB0, rgba(79,255,176,0.1))" }}
          />

          <div className="flex flex-col gap-12 md:gap-16">
            {experiences.map((exp, i) => {
              const isRight = i % 2 === 0;
              return (
                <div key={i} className="exp-card-ar opacity-0 relative">
                  {/* Desktop layout */}
                  <div className="hidden md:grid grid-cols-[1fr_60px_1fr] items-start">
                    {/* Right content (RTL) */}
                    <div className={isRight ? "" : "order-3"}>
                      <ExperienceCardAr exp={exp} variant={i % 2 === 0 ? "white" : "green"} />
                    </div>

                    {/* Center dot */}
                    <div className="flex justify-center order-2 pt-6">
                      <div className="relative">
                        <div
                          className="w-5 h-5 rounded-full border-[3px] z-10 relative"
                          style={{
                            background: exp.active ? "#4FFFB0" : "#0A0A0A",
                            borderColor: "#4FFFB0",
                            boxShadow: exp.active ? "0 0 20px rgba(79,255,176,0.5)" : "none",
                          }}
                        />
                        {exp.active && (
                          <div className="absolute inset-0 w-5 h-5 rounded-full animate-ping opacity-30"
                            style={{ background: "#4FFFB0" }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Empty side */}
                    <div className={isRight ? "order-3" : ""} />
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden relative pr-14">
                    <div className="absolute right-[12px] top-6">
                      <div
                        className="w-4 h-4 rounded-full border-[2px]"
                        style={{
                          background: exp.active ? "#4FFFB0" : "#0A0A0A",
                          borderColor: "#4FFFB0",
                          boxShadow: exp.active ? "0 0 15px rgba(79,255,176,0.4)" : "none",
                        }}
                      />
                    </div>
                    <ExperienceCardAr exp={exp} variant={i % 2 === 0 ? "white" : "green"} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Clients Section */}
        <div className="mt-24 -mx-6 px-0">
          <div className="text-center mb-10 px-6">
            <p className="ar-script text-base md:text-lg mb-3" style={{ color: "#4FFFB0" }}>موثوق من قبل</p>
            <h3 className="ar-heading text-2xl md:text-3xl" style={{ color: "#fff" }}>أبرز العملاء</h3>
          </div>

          {/* Row 1 - moves left */}
          <div className="relative overflow-hidden mb-8" dir="ltr">
            <div className="absolute left-0 top-0 bottom-0 w-28 z-10" style={{ background: "linear-gradient(to right, #0A0A0A, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-28 z-10" style={{ background: "linear-gradient(to left, #0A0A0A, transparent)" }} />
            <div dir="ltr" className="client-row-1-ar flex items-center gap-17" style={{ width: "max-content" }}>
              {[...keyClients.slice(0, 8), ...keyClients.slice(0, 8)].map((client, i) => (
                <img
                  key={i}
                  src={client.logo}
                  alt={client.name}
                  className="object-contain flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300"
                  style={{ filter: client.name === "Chelsea FC" ? "none" : "brightness(0) invert(1)", height: "50px", width: "120px" }}
                />
              ))}
            </div>
          </div>

          {/* Row 2 - moves right */}
          <div className="relative overflow-hidden" dir="ltr">
            <div className="absolute left-0 top-0 bottom-0 w-28 z-10" style={{ background: "linear-gradient(to right, #0A0A0A, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-28 z-10" style={{ background: "linear-gradient(to left, #0A0A0A, transparent)" }} />
            <div dir="ltr" className="client-row-2-ar flex items-center gap-17" style={{ width: "max-content" }}>
              {[...keyClients.slice(8), ...keyClients.slice(8)].map((client, i) => (
                <img
                  key={i}
                  src={client.logo}
                  alt={client.name}
                  className="object-contain flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300"
                  style={{ filter: client.name === "Chelsea FC" ? "none" : "brightness(0) invert(1)", height: "50px", width: "120px" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCardAr({ exp, variant }: { exp: typeof experiences[0]; variant: "white" | "green" }) {
  const isWhite = variant === "white";
  const bg = isWhite ? "#fff" : "#4FFFB0";
  const textColor = "#0A0A0A";
  const subtleText = "#0A0A0A";
  const achieveText = "#0A0A0A";
  const badgeBg = isWhite ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.1)";
  const badgeBorder = isWhite ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.15)";
  const pillColor = exp.color;

  return (
    <div
      className="rounded-[20px] p-6 md:p-7 transition-all duration-300 group"
      style={{ background: bg, border: "none" }}
    >
      {/* Top row */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="ar-body text-xs font-medium" style={{ color: subtleText }}>{exp.company}</span>
        <span className="ar-body text-[10px] px-2 py-0.5 rounded-full font-semibold"
          style={{ background: badgeBg, color: textColor, border: `1px solid ${badgeBorder}` }}
        >
          {exp.active ? "الحالي" : exp.type}
        </span>
      </div>

      {/* Role */}
      <h3 className="ar-heading text-xl md:text-2xl mb-2" style={{ color: textColor, lineHeight: 1.5 }}>{exp.role}</h3>

      {/* Location + Period */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="ar-body flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: isWhite ? `${pillColor}15` : "#fff", color: isWhite ? pillColor : "#0A0A0A", border: isWhite ? `1px solid ${pillColor}30` : "1px solid #e0e0e0" }}>
          <MapPin size={10} /> {exp.location}
        </span>
        <span className="ar-body flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: isWhite ? `${pillColor}15` : "#fff", color: isWhite ? pillColor : "#0A0A0A", border: isWhite ? `1px solid ${pillColor}30` : "1px solid #e0e0e0" }}>
          <Calendar size={10} /> {exp.period}
        </span>
      </div>

      {/* Description */}
      <p className="ar-body text-sm leading-relaxed mb-5" style={{ color: subtleText }}>{exp.description}</p>

      {/* Achievements */}
      <div className="flex flex-col gap-2 mb-5">
        {exp.achievements.map((a, j) => (
          <div key={j} className="flex items-start gap-2">
            <TrendingUp size={12} className="mt-0.5 flex-shrink-0" style={{ color: textColor }} />
            <span className="ar-body text-xs" style={{ color: achieveText }}>{a}</span>
          </div>
        ))}
      </div>

      {/* Tools */}
      <div className="flex items-center gap-3 flex-wrap mb-5">
        {exp.toolIcons.map((icon, j) => (
          <div key={j} className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "#fff", border: "1px solid #e0e0e0" }}>
              <img src={icon} alt={exp.tools[j]} width={16} height={16} className="object-contain" />
            </div>
            <span className="text-[9px] font-medium" style={{ color: subtleText }}>{exp.tools[j]}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <a href="#contact" className="ar-body inline-flex items-center gap-2 h-10 px-6 rounded-full text-xs font-bold transition-all duration-200 hover:-translate-y-0.5" style={{ background: isWhite ? "#4FFFB0" : "#fff", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "3px 3px 0px 0px #0A0A0A" }}>
        لنتحدث <ArrowLeft size={13} />
      </a>
    </div>
  );
}
