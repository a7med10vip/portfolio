"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Sprout, MonitorSmartphone, BrainCircuit, Gauge, Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* Arabic mirror of the English Services section — the same sticker scatter in
   the same retro language: 2px outline, hard offset shadow, no hover motion,
   size varied by column span rather than by removing copy. Only the strings
   and the type classes differ. */
type Fill = "mint" | "paper";

type ServiceItem = {
  Icon: typeof Target;
  title: string;
  desc: string;
  tools: string[];
  fill: Fill;
  span: string;
  rotate: number;
  nudge: number;
  z: number;
};

const services: ServiceItem[] = [
  {
    Icon: Target,
    title: "التسويق بالأداء",
    desc: "حملات مبنية على البيانات عبر جوجل وميتا وتيك توك تحقق أعلى عائد استثماري وتوسّع الإيرادات. أُدير ميزانيات إعلانية تصل إلى +15 ألف دولار شهرياً مع تتبع وتحسين كامل.",
    tools: ["إعلانات جوجل", "إعلانات ميتا", "إعلانات تيك توك", "إعلانات سناب شات"],
    fill: "mint", span: "md:col-span-7", rotate: -1.8, nudge: 0, z: 6,
  },
  {
    Icon: Sprout,
    title: "تحسين محركات البحث",
    desc: "تدقيق تقني، استراتيجية كلمات مفتاحية، تحسين داخلي وخارجي، وبناء روابط تدفع الظهور العضوي. حققت ترتيباً ضمن أفضل 10 نتائج في 8 أشهر.",
    tools: ["تدقيق تقني", "تحسين داخلي", "تحسين خارجي", "تحسين محلي"],
    fill: "paper", span: "md:col-span-5", rotate: 2.1, nudge: 38, z: 5,
  },
  {
    Icon: MonitorSmartphone,
    title: "تطوير المواقع والتطبيقات",
    desc: "تطبيقات متكاملة بأحدث الأطر البرمجية، من صفحات الهبوط إلى منصات معقدة ببوابات دفع وقواعد بيانات لحظية وتكامل ذكاء اصطناعي. تم نشرها على متجر آبل وجوجل بلاي.",
    tools: ["تطوير الواجهات", "تطوير الويب", "تطبيقات الجوال", "قواعد البيانات", "البنية السحابية"],
    fill: "paper", span: "md:col-span-5", rotate: 1.5, nudge: -30, z: 4,
  },
  {
    Icon: BrainCircuit,
    title: "الذكاء الاصطناعي والأتمتة",
    desc: "روبوتات محادثة ذكية، أتمتة سير العمل، ومنتجات مدعومة بالذكاء الاصطناعي توفر الوقت وتفتح إمكانيات جديدة.",
    tools: ["روبوتات ذكية", "أتمتة العمليات", "تكامل الأنظمة", "ذكاء اصطناعي"],
    fill: "mint", span: "md:col-span-7", rotate: -2.3, nudge: 12, z: 3,
  },
  {
    Icon: Gauge,
    title: "البيانات والتحليلات",
    desc: "إعداد تحليلات جوجل وإدارة العلامات وتتبع التحويلات ولوحات التقارير. بنية تحليلية كاملة تحوّل البيانات الخام إلى رؤى نمو قابلة للتنفيذ.",
    tools: ["تحليلات جوجل", "إدارة العلامات", "لوحات التقارير", "أدوات مشرفي المواقع"],
    fill: "paper", span: "md:col-span-6", rotate: 1.7, nudge: -22, z: 2,
  },
  {
    Icon: Compass,
    title: "استراتيجية رقمية شاملة",
    desc: "من الفكرة إلى المنتج الحي، ربط التسويق والمنتج والتقنية في خطة متماسكة واحدة. استراتيجية، بناء، إطلاق، نمو. الكل تحت سقف واحد.",
    tools: ["الاستراتيجية", "الهوية", "تجربة المستخدم", "النمو"],
    fill: "mint", span: "md:col-span-6", rotate: -1.4, nudge: 26, z: 1,
  },
];

const INK = "#04323A";
const MINT = "#CFF7EE";
const CHIP_TILTS = [-3, 2.2, -1.4, 3, -2.4];

/* Mirror of the English set: a bright mint sticker and a black one, each
   carrying its own outline, type and chip colours. */
const fills: Record<Fill, {
  bg: string; title: string; body: string; outline: string; chipBg: string; chipFg: string; icon: string;
}> = {
  mint: {
    bg: MINT, title: INK, body: "rgba(4,50,58,0.70)",
    outline: "#004D5A", chipBg: "#FFFFFF", chipFg: INK, icon: "#004D5A",
  },
  paper: {
    bg: "#FFFFFF", title: INK, body: "#4E717A",
    outline: "#004D5A", chipBg: MINT, chipFg: INK, icon: "#004D5A",
  },
};

function ServiceSticker({ service }: { service: ServiceItem }) {
  const f = fills[service.fill];

  return (
    <article
      className="service-sticker-ar relative rounded-[20px] p-7 md:p-8 h-full opacity-0"
      data-rotate={service.rotate}
      style={{
        background: f.bg,
        border: `2px solid ${f.outline}`,

        zIndex: service.z,
      }}
    >
      <div className="flex flex-col h-full">
        <div
          className="rounded-[13px] flex items-center justify-center mb-5 w-12 h-12"
          style={{ background: f.chipBg, border: `2px solid ${f.outline}` }}
        >
          <service.Icon size={21} strokeWidth={1.9} style={{ color: f.icon }} />
        </div>

        {/* Arabic needs looser leading than the Latin build — 1.22 on the
            heading and 1.68 on the body clipped the descenders here. */}
        <h3 className="ar-heading mb-3" style={{ color: f.title, fontSize: "1.35rem", lineHeight: 1.5 }}>
          {service.title}
        </h3>

        <p className="ar-body mb-6" style={{ color: f.body, fontSize: "0.9375rem", lineHeight: 1.9, maxWidth: "50ch" }}>
          {service.desc}
        </p>

        <div className="flex flex-wrap gap-2.5 mt-auto">
          {service.tools.map((t, i) => (
            <span
              key={t}
              className="ar-body rounded-full font-bold"
              style={{
                background: f.chipBg,
                color: f.chipFg,
                border: `1.5px solid ${f.outline}`,

                transform: `rotate(${CHIP_TILTS[i % CHIP_TILTS.length]}deg)`,
                fontSize: "0.75rem",
                padding: "5px 12px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function ServicesAr() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-header-ar",
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>(".service-sticker-ar");
      cards.forEach((card, i) => {
        const rest = Number(card.dataset.rotate ?? 0);
        gsap.fromTo(
          card,
          { y: 46, opacity: 0, rotate: 0 },
          {
            y: 0, opacity: 1, rotate: rest,
            duration: 0.7, delay: i * 0.09, ease: "back.out(1.4)",
            scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" style={{ background: "#0A0A0A", padding: "100px 0 120px" }}>
      <div className="services-header-ar text-center px-6 mb-14 opacity-0">
        <p className="ar-script text-xl md:text-2xl mb-3" style={{ color: MINT }}>الخدمات</p>
        <h2 className="ar-heading text-3xl md:text-4xl" style={{ color: "#fff" }}>خبرات تصنع الفارق</h2>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-start">
          {services.map(service => (
            <div
              key={service.title}
              className={`${service.span} service-slot-ar`}
              style={{ "--nudge": `${service.nudge}px` } as React.CSSProperties}
            >
              <ServiceSticker service={service} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .service-slot-ar { margin-top: 0; }
        @media (min-width: 768px) {
          .service-slot-ar { margin-top: var(--nudge, 0px); }
        }
        .service-sticker-ar { will-change: transform; }
      `}</style>
    </section>
  );
}
