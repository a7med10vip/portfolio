"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, ArrowUpLeft } from "lucide-react";
/* eslint-disable @next/next/no-img-element */

gsap.registerPlugin(ScrollTrigger);

/* Same named ramp as every section. */
const TEAL = "#004D5A";
const MINT = "#CFF7EE";
const WASH = "#F4FBF9";

const toolLogos: Record<string, { icon: string; color: string }> = {
  "Flutter": { icon: "/ext/flutter.svg", color: "#02569B" },
  "AI": { icon: "/ext/openai.png", color: "#10A37F" },
  "Payment": { icon: "/ext/visa-logo.png", color: "#1A1F71" },
  "Firebase": { icon: "/ext/firebase.svg", color: "#FFCA28" },
  "Events": { icon: "/ext/google.svg", color: "#4285F4" },
  "Google Ads": { icon: "/ext/google-ads-icon.png", color: "#4285F4" },
  "Strategy": { icon: "/ext/trello.svg", color: "#0079BF" },
  "WordPress": { icon: "/ext/wordpress.svg", color: "#21759B" },
  "SEO": { icon: "/ext/semrush.png", color: "#FF642D" },
  "GA4": { icon: "/ext/gtm.svg", color: "#4285F4" },
  "React": { icon: "/ext/react.svg", color: "#61DAFB" },
  "Next.js": { icon: "/ext/nextjs.svg", color: "#ffffff" },
  "Booking": { icon: "/ext/flaticon-seo.png", color: "#fff" },
  "SEO Strategy": { icon: "/ext/semrush.png", color: "#FF642D" },
  "Real Estate": { icon: "/ext/google-ads-icon.png", color: "#4285F4" },
  "Content": { icon: "/ext/flaticon-social.png", color: "#fff" },
  "Analytics": { icon: "/ext/google-analytics.png", color: "#E37400" },
  "UX Research": { icon: "/ext/figma.svg", color: "#F24E1E" },
  "E-commerce": { icon: "/ext/flaticon-target.png", color: "#4285F4" },
  "Optimization": { icon: "/ext/gsc.png", color: "#4285F4" },
  "Market Research": { icon: "/ext/google.svg", color: "#4285F4" },
  "UX Strategy": { icon: "/ext/figma.svg", color: "#A259FF" },
  "Growth Planning": { icon: "/ext/trello.svg", color: "#0079BF" },
  "Hospitality": { icon: "/ext/flaticon-photo.png", color: "#FF9800" },
};

const countryFlags: Record<string, { flag: string; name: string }> = {
  "KSA": { flag: "🇸🇦", name: "السعودية" },
  "UAE": { flag: "🇦🇪", name: "الإمارات" },
  "UK": { flag: "🇬🇧", name: "بريطانيا" },
};

const projects = [
  {
    category: "استراتيجية وتجربة مستخدم",
    title: "الخطوط السعوديــــة",
    client: "السعودية · المملكة العربية السعودية",
    year: "2023",
    country: "KSA",
    logo: "/ext/saudia.svg",
    logoSize: "65px",
    desc: "تحليل شامل للمنافسين وتقييم SWOT ودراسة تجربة المستخدم للموقع الرسمي للخطوط السعودية. قدمت رؤى استراتيجية حول المسارات الدولية الرئيسية وتوصيات تحسين تجربة المستخدم.",
    results: ["تحليل المنافسين والفرص", "تحسين تجربة الاستخدام", "استراتيجية الكلمات المفتاحية"],
    tags: ["UX Research", "SEO Strategy", "Analytics", "Market Research"],
    accent: "#CFF7EE",
    link: null as string | null,
    image: "/ext/saudia-plane.png",
  },
  {
    category: "تجربة مستخدم ونمو",
    title: "QNB · بنك قطر الوطني",
    client: "مجموعة QNB · قطر",
    year: "2023",
    country: "UAE",
    logo: "/logos/qnb.png",
    logoSize: "35px",
    desc: "تحليل وتحسين تجربة المستخدم لتطبيق الخدمات المصرفية الرسمي لـ QNB. ركزت على تبسيط رحلة المستخدم وتقليل نقاط الاحتكاك وزيادة توليد العملاء المحتملين.",
    results: ["تحسين تجربة التطبيق", "استراتيجية جذب العملاء", "تحسين رحلة المستخدم"],
    tags: ["UX Research", "Analytics", "Optimization", "Market Research"],
    accent: "#CFF7EE",
    link: null,
    image: "/projects/qnb.webp",
  },
  {
    category: "تحسين تجربة المستخدم",
    title: "متجر تشيلســــي",
    client: "نادي تشيلسي · بريطانيا",
    year: "2023",
    country: "UK",
    logo: "/logos/chelsea.png",
    logoNoFilter: true,
    desc: "توصيات تحسين تجربة المستخدم للمتجر الإلكتروني الرسمي لنادي تشيلسي. تحليل رحلة المستخدم وتقديم تحسينات عملية لتحسين معدل التحويل.",
    results: ["تحسين تجربة المتجر", "رفع معدل التحويل", "علامة تجارية عالمية"],
    tags: ["UX Research", "E-commerce", "Optimization", "Analytics", "GA4"],
    accent: "#CFF7EE",
    link: "https://store.chelseafc.com/en/",
    image: "/projects/chealse.webp",
  },
  {
    category: "تحسين محركات البحث",
    title: "محمد بن غاطي",
    client: "بن غاطي للاستثمارات · دبي",
    year: "2024",
    country: "UAE",
    logo: "/ext/binghatti-white.png",
    desc: "استراتيجية تحسين محركات البحث وإدارة الحضور الرقمي لواحد من أبرز مطوري العقارات الفاخرة في دبي. رفعت ترتيب الكلمات المفتاحية عالية القيمة في سوق الإمارات.",
    results: ["تحسين محركات البحث للعقارات", "وصول في سوق الإمارات", "كلمات مفتاحية عالية القيمة"],
    tags: ["SEO Strategy", "GA4", "Content", "Analytics"],
    accent: "#CFF7EE",
    link: "https://www.binghatti.com/en/",
    image: "/projects/binghatti.webp",
  },
  {
    category: "استراتيجية فعاليات",
    title: "أسبوع مطوري الهواتـــف",
    client: "مركز أبوظبي للطاقة",
    year: "2025",
    country: "UAE",
    logo: "/ext/mdw.png",
    desc: "مستشار استراتيجية رقمية لهذا المؤتمر التقني الدولي البارز في مركز أبوظبي للطاقة. ساهمت في حملات نمو مبيعات التذاكر واستقطاب الجمهور والاستراتيجية الرقمية الكاملة.",
    results: ["+3,000 حضور", "+60 متحدث دولي", "برعاية رسمية من أبوظبي"],
    tags: ["Events", "Google Ads", "Strategy"],
    accent: "#CFF7EE",
    link: "https://mobiledevelopersweek.com/",
    image: "/projects/mdw.webp",
  },
  {
    category: "منصة ذكاء اصطناعي",
    title: "Omnis Media AI",
    client: "أومنس ميديا · دبي",
    year: "2026",
    country: "UAE",
    logo: "/ext/omnes.svg",
    desc: "قدت تطوير منصة إعلام رقمي مدعومة بالذكاء الاصطناعي لرائدة ابتكارات تكنولوجيا التسويق بالشرق الأوسط. بنيت بـ React و Next.js و Firebase مع أتمتة ذكية وتحليلات لحظية.",
    results: ["منصة ذكاء اصطناعي", "تقنية تسويقية متقدمة", "تطوير وإطلاق شامل"],
    tags: ["React", "Next.js", "Firebase", "AI", "Analytics", "Optimization"],
    accent: "#CFF7EE",
    link: "https://arab-marketing-net-web-app.web.app/",
    image: "/projects/omnis.webp",
  },
  {
    category: "تطبيق موبايل",
    title: "تطبيق معصـــوب السلطـــان",
    client: "سلسلة مطاعم · جدة",
    year: "2026",
    country: "KSA",
    logo: "/ext/masoub.png",
    desc: "تطبيق Flutter متكامل لسلسلة مطاعم رائدة في جدة. شات بوت ذكي، نظام ولاء عملاء، إدارة 5 فروع، لوحات أداء لحظية، وبوابات دفع متكاملة. صُمم وطُور وأُطلق على المتاجر في أقل من شهر.",
    results: ["تم الإطلاق في < شهر", "٥ فروع متصلة", "على App Store و Google Play"],
    tags: ["Flutter", "AI", "Payment", "Firebase", "Analytics"],
    accent: "#CFF7EE",
    link: null,
    image: "/projects/maasob.webp",
    appStore: "https://apps.apple.com/ca/app/%D9%85%D8%B9%D8%B5%D9%88%D8%A8-%D8%A7%D9%84%D8%B3%D9%84%D8%B7%D8%A7%D9%86/id6757263587",
    playStore: "https://play.google.com/store/apps/details?id=com.masoubalsultan.app",
  },
  {
    category: "تحسين محركات البحث ومنصة ويب",
    title: "Finance & Business UAE",
    client: "منصة تحريرية إماراتية",
    year: "2025",
    country: "UAE",
    logo: "/ext/finance-business.png",
    desc: "بنيت وأدرت الحضور الرقمي الكامل من الصفر. تطوير الموقع، استراتيجية SEO شاملة، دمج التحليلات، واستراتيجية المحتوى. حققت ترتيب ضمن أفضل ١٠ في جوجل خلال ٨ شهور فقط.",
    results: ["ضمن أفضل ١٠ في ٨ شهور", "منظومة رقمية كاملة", "شركاء علامات كبرى"],
    tags: ["WordPress", "SEO", "GA4", "Analytics", "Optimization", "SEO Strategy"],
    accent: "#CFF7EE",
    link: "https://financebusinessuae.com",
    image: "/projects/fnb.webp",
  },
];

export default function ProjectsAr() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".proj-header-ar", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });

      const mm = gsap.matchMedia();

      /* Desktop: the cards stack, each sliding up over the one before it while
         that one settles back — the same deck as the English build. It is also
         what gives the image panel a height to measure against: without a
         fixed-height parent, `lg:h-full` on the image resolved against nothing
         and every panel came out a different size. */
      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".proj-item-ar");
        if (!cards.length) return;

        cards.forEach((card, i) => {
          gsap.set(card, { transformOrigin: "top center", force3D: true, zIndex: i + 1 });
          gsap.set(card, i === 0 ? { yPercent: 0, opacity: 1 } : { yPercent: 108, opacity: 1 });
        });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: {
            trigger: stackRef.current,
            start: "top top+=96",
            end: () => `+=${Math.max(1, cards.length - 1) * window.innerHeight * 0.7}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        cards.slice(1).forEach((card, i) => {
          const previous = cards[i];
          if (previous) tl.to(previous, { scale: 0.96, y: -18 }, i);
          tl.to(card, { yPercent: 0, scale: 1, y: 0 }, i);
        });
      });

      /* Below lg it is a plain column again. */
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>(".proj-item-ar").forEach((el) => {
          gsap.set(el, { clearProps: "all" });
          gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" style={{ background: "#fff", padding: "100px 0" }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="proj-header-ar opacity-0 text-center mb-14">
          <p className="ar-script text-xl md:text-2xl mb-3" style={{ color: "#004D5A" }}>التأثيــر</p>
          <h2 className="ar-heading text-3xl md:text-4xl" style={{ color: "#04323A" }}>المشاريـــع المميــزة</h2>
        </div>

        <div
          ref={stackRef}
          className="relative lg:min-h-[var(--deck-h)]"
          style={{ ["--deck-h" as string]: `${projects.length * 78}vh` } as React.CSSProperties}
        >
        <div className="flex flex-col gap-8 lg:block lg:sticky lg:top-24 lg:h-[78vh]">
          {projects.map((project, i) => {
            const isEven = i % 2 === 0;
            const isGreen = i % 2 === 0;
            const cardBg = isGreen ? MINT : WASH;
            const cardText = "#04323A";
            const cardMuted = isGreen ? "rgba(4,50,58,0.5)" : "rgba(4,50,58,0.45)";
            const flag = countryFlags[project.country];
            return (
              <div key={project.title} className="proj-item-ar opacity-0 rounded-[28px] overflow-hidden lg:absolute lg:inset-0 lg:opacity-100" style={{ background: cardBg, border: `2px solid ${TEAL}`, boxShadow: `6px 6px 0px 0px ${TEAL}` }}>
                <div className={`flex flex-col h-full ${isEven ? "lg:flex-row-reverse" : "lg:flex-row"}`} style={{ minHeight: "500px" }}>
                  <div className="flex-shrink-0 relative overflow-hidden lg:h-full" style={{ background: "#04323A" }}>
                    {project.image && <img src={project.image} alt={project.title} className="block w-full h-auto lg:w-auto lg:h-full" />}
                    <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-[11px] font-bold ar-body" style={{ background: "rgba(4,50,58,0.5)", backdropFilter: "blur(8px)", color: "#CFF7EE" }}>{project.year}</div>
                    {flag && <div className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold ar-body" style={{ background: "rgba(4,50,58,0.5)", backdropFilter: "blur(8px)", color: "#fff" }}><span className="text-base">{flag.flag}</span>{flag.name}</div>}
                    <div className="absolute bottom-5 right-5 px-3 py-1.5 rounded-full text-[11px] font-semibold ar-body" style={{ background: isGreen ? "#fff" : "#CFF7EE", color: "#04323A" }}>{project.category}</div>
                  </div>

                  <div className="flex-1 min-w-0 p-8 md:p-10 flex flex-col justify-between" style={{ color: cardText }}>
                    <div>
                      {project.logo && <img src={project.logo} alt="" className="mb-3 object-contain" style={{ height: project.logoSize || "50px", width: "auto", maxWidth: "160px", filter: (project as unknown as { logoNoFilter?: boolean }).logoNoFilter ? "none" : "brightness(0)" }} />}
                      <p className="text-xs mb-2 ar-body" style={{ color: cardMuted }}>{project.client}</p>
                      <h3 className="ar-heading text-2xl md:text-3xl mb-4" style={{ color: cardText }}>{project.title}</h3>
                      <p className="text-sm leading-relaxed mb-6 ar-body" style={{ color: cardMuted }}>{project.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.results.map(r => (
                          <div key={r} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "#fff", border: `1.5px solid ${TEAL}`, boxShadow: `2px 2px 0px 0px ${TEAL}` }}>
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: isGreen ? "#04323A" : "#CFF7EE" }} />
                            <span className="text-xs font-medium ar-body" style={{ color: cardText }}>{r}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {project.tags.map(tag => {
                          const tool = toolLogos[tag];
                          return (
                            <div key={tag} className="flex flex-col items-center gap-1.5">
                              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#fff", border: `1.5px solid ${TEAL}` }}>
                                {tool ? <img src={tool.icon} alt={tag} width={20} height={20} /> : <span className="text-xs font-bold" style={{ color: "#CFF7EE" }}>{tag[0]}</span>}
                              </div>
                              <span className="text-[10px] font-medium" style={{ color: cardText }}>{tag}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-6">
                      {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-10 px-6 rounded-full text-xs font-bold ar-body" style={{ background: isGreen ? "#fff" : "#CFF7EE", color: "#04323A", border: "2px solid #004D5A", boxShadow: "3px 3px 0px 0px #004D5A" }}>زيارة الموقع <ExternalLink size={12} /></a>}
                      {(project as unknown as { playStore?: string }).playStore && (
                        <a href={(project as unknown as { playStore?: string }).playStore as string} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 h-11 px-4 rounded-xl" style={{ background: "#fff", border: `1.5px solid ${TEAL}`, boxShadow: `2px 2px 0px 0px ${TEAL}` }}>
                          <svg width="20" height="22" viewBox="0 0 512 512"><path fill="#2196F3" d="M48 59.49v393a17 17 0 0 0 27.24 13.6l383-196.49a17 17 0 0 0 0-27.21L75.24 45.89A17 17 0 0 0 48 59.49z"/><path fill="#4CAF50" d="M48 59.49v393l240-196.5z"/><path fill="#FFC107" d="M288 256l-240 196.5 383-196.5z"/><path fill="#F44336" d="M288 256L48 59.49l240 196.5z"/></svg>
                          <div className="text-right"><span className="block text-[8px] leading-none" style={{ color: "#aaa" }}>حمّله من</span><span className="block text-sm font-semibold leading-tight" style={{ color: "#fff" }}>جوجل بلاي</span></div>
                        </a>
                      )}
                      {(project as unknown as { appStore?: string }).appStore && (
                        <a href={(project as unknown as { appStore?: string }).appStore as string} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 h-11 px-4 rounded-xl" style={{ background: "#fff", border: `1.5px solid ${TEAL}`, boxShadow: `2px 2px 0px 0px ${TEAL}` }}>
                          <svg width="18" height="22" viewBox="0 0 384 512" fill="#fff"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                          <div className="text-right"><span className="block text-[8px] leading-none" style={{ color: "#aaa" }}>حمّله من</span><span className="block text-sm font-semibold leading-tight" style={{ color: "#fff" }}>آب ستور</span></div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>

        <div className="text-center mt-14">
          <a href="#contact" className="inline-flex items-center gap-2 h-12 px-8 rounded-full text-sm font-bold ar-body" style={{ background: "#CFF7EE", color: "#04323A", border: "2px solid #004D5A", boxShadow: "4px 4px 0px 0px #004D5A" }}>
            ابدأ مشروع <ArrowUpLeft size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
