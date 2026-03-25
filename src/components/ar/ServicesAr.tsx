"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BarChart3, Search, Code2, Bot, LineChart, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type ServiceItem = {
  num: string;
  Icon: typeof BarChart3;
  title: string;
  desc: string;
  tools: string[];
  variant: "green" | "white";
  imageSrc: string;
  imageAlt: string;
};

const services = [
  {
    num: "01",
    Icon: BarChart3,
    title: "التسويق بالأداء",
    desc: "حملات مبنية على البيانات عبر جوجل وميتا وتيك توك تحقق أعلى عائد استثماري وتوسّع الإيرادات. أُدير ميزانيات إعلانية تصل إلى +15 ألف دولار شهرياً مع تتبع وتحسين كامل.",
    tools: ["إعلانات جوجل", "إعلانات ميتا", "إعلانات تيك توك", "إعلانات سناب شات"],
    variant: "green",
    imageSrc: "/services/16.png",
    imageAlt: "رسم توضيحي يمثل التسويق بالأداء ونمو الحملات",
  },
  {
    num: "02",
    Icon: Search,
    title: "تحسين محركات البحث",
    desc: "تدقيق تقني، استراتيجية كلمات مفتاحية، تحسين داخلي وخارجي، وبناء روابط تدفع الظهور العضوي. حققت ترتيباً ضمن أفضل 10 نتائج في 8 أشهر.",
    tools: ["تدقيق تقني", "تحسين داخلي", "تحسين خارجي", "تحسين محلي"],
    variant: "white",
    imageSrc: "/services/14.png",
    imageAlt: "رسم توضيحي يمثل تحسين محركات البحث والنمو العضوي",
  },
  {
    num: "03",
    Icon: Code2,
    title: "تطوير المواقع والتطبيقات",
    desc: "تطبيقات متكاملة بأحدث الأطر البرمجية, من صفحات الهبوط إلى منصات معقدة ببوابات دفع وقواعد بيانات لحظية وتكامل ذكاء اصطناعي. تم نشرها على متجر آبل وجوجل بلاي.",
    tools: ["تطوير الواجهات", "تطوير الويب", "تطبيقات الجوال", "قواعد البيانات", "البنية السحابية"],
    variant: "green",
    imageSrc: "/services/16.png",
    imageAlt: "رسم توضيحي يمثل تطوير المواقع والتطبيقات",
  },
  {
    num: "04",
    Icon: Bot,
    title: "الذكاء الاصطناعي والأتمتة",
    desc: "روبوتات محادثة ذكية، أتمتة سير العمل، ومنتجات مدعومة بالذكاء الاصطناعي توفر الوقت وتفتح إمكانيات جديدة.",
    tools: ["روبوتات ذكية", "أتمتة العمليات", "تكامل الأنظمة", "ذكاء اصطناعي"],
    variant: "white",
    imageSrc: "/services/15.png",
    imageAlt: "رسم توضيحي يمثل دمج الذكاء الاصطناعي والأتمتة",
  },
  {
    num: "05",
    Icon: LineChart,
    title: "البيانات والتحليلات",
    desc: "إعداد تحليلات جوجل وإدارة العلامات وتتبع التحويلات ولوحات التقارير. بنية تحليلية كاملة تحوّل البيانات الخام إلى رؤى نمو قابلة للتنفيذ.",
    tools: ["تحليلات جوجل", "إدارة العلامات", "لوحات التقارير", "أدوات مشرفي المواقع"],
    variant: "green",
    imageSrc: "/services/16.png",
    imageAlt: "رسم توضيحي يمثل لوحات البيانات وأنظمة التحليلات",
  },
  {
    num: "06",
    Icon: Rocket,
    title: "استراتيجية رقمية شاملة",
    desc: "من الفكرة إلى المنتج الحي, ربط التسويق والمنتج والتقنية في خطة متماسكة واحدة. استراتيجية، بناء، إطلاق، نمو. الكل تحت سقف واحد.",
    tools: ["الاستراتيجية", "الهوية", "تجربة المستخدم", "النمو"],
    variant: "white",
    imageSrc: "/services/13.png",
    imageAlt: "رسم توضيحي يمثل الاستراتيجية الرقمية الشاملة",
  },
] satisfies ServiceItem[];

function ServiceArtwork({ service }: { service: ServiceItem }) {
  return (
    <div className="group/art relative w-full max-w-[390px] aspect-square overflow-hidden mx-auto">
      <div className="absolute inset-0">
        <Image
          src={service.imageSrc}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 768px) 82vw, 28vw"
          className="object-contain"
          priority={service.num === "01"}
        />
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: ServiceItem }) {
  const isGreen = service.variant === "green";
  const bg = isGreen ? "#4FFFB0" : "#fff";
  const textColor = "#0A0A0A";
  const mutedColor = isGreen ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.45)";
  const pillBg = isGreen ? "rgba(0,0,0,0.08)" : "rgba(79,255,176,0.15)";
  const pillColor = isGreen ? "#0A0A0A" : "#0A0A0A";
  const numColor = isGreen ? "rgba(0,0,0,0.08)" : "rgba(79,255,176,0.15)";

  return (
    <div
      className="rounded-[24px] p-8 md:p-14 relative overflow-hidden flex flex-col justify-center"
      style={{ background: bg, minHeight: "70vh" }}
    >
      <span
        className="ar-heading absolute top-5 left-8 text-[92px] md:text-[132px] leading-none pointer-events-none select-none"
        style={{ color: numColor }}
      >
        {service.num}
      </span>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center relative z-10 h-full">
        {/* Content side — 3 cols */}
        <div className="md:col-span-3">
          {/* Icon + number */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: isGreen ? "rgba(0,0,0,0.08)" : "rgba(79,255,176,0.15)" }}
            >
              <service.Icon size={22} style={{ color: textColor }} />
            </div>
            <span className="ar-body text-sm font-bold" style={{ color: mutedColor }}>{service.num}</span>
          </div>

          {/* Title */}
          <h3 className="ar-heading text-3xl md:text-4xl mb-4" style={{ color: textColor }}>
            {service.title}
          </h3>

          {/* Description */}
          <p className="ar-body text-sm md:text-base leading-relaxed mb-6" style={{ color: mutedColor }}>
            {service.desc}
          </p>

          {/* Tools */}
          <div className="flex flex-wrap gap-2 mb-6">
            {service.tools.map(t => (
              <span key={t} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: pillBg, color: pillColor }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Left side (RTL) — art — 2 cols */}
        <div className="md:col-span-2 flex flex-col items-center justify-center">
          <ServiceArtwork service={service} />
        </div>
      </div>
    </div>
  );
}

export default function ServicesAr() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-header-ar",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      const cardShells = gsap.utils.toArray<HTMLElement>(".service-card-shell-ar");

      cardShells.forEach((card, index) => {
        gsap.set(card, {
          transformOrigin: "top center",
          force3D: true,
          zIndex: index + 1,
        });

        if (index === 0) {
          gsap.set(card, { yPercent: 0, y: 0, scale: 1, rotateX: 0 });
          return;
        }

        gsap.set(card, {
          yPercent: 115,
          y: 0,
          scale: 1,
          rotateX: 0,
        });
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
        scrollTrigger: {
          trigger: stackRef.current,
          start: "top top+=110",
          end: () => `+=${Math.max(1, cardShells.length - 1) * window.innerHeight * 0.65}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      cardShells.slice(1).forEach((card, index) => {
        const previousCard = cardShells[index];

        if (previousCard) {
          timeline.to(
            previousCard,
            {
              scale: 0.97,
              y: -16,
            },
            index
          );
        }

        timeline.to(
          card,
          {
            yPercent: 0,
            y: 0,
            scale: 1,
          },
          index
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" style={{ background: "#0A0A0A" }}>
      {/* Header */}
      <div className="services-header-ar text-center pt-24 pb-10 px-6 opacity-0">
        <p className="ar-script text-xl md:text-2xl mb-3" style={{ color: "#4FFFB0" }}>الخدمات</p>
        <h2 className="ar-heading text-3xl md:text-4xl" style={{ color: "#fff" }}>خبرات تصنع الفارق</h2>
      </div>

      <div
        ref={stackRef}
        className="max-w-6xl mx-auto px-4 md:px-6 pb-24 relative"
        style={{ minHeight: `calc(${services.length * 72}vh)` }}
      >
        <div
          className="sticky"
          style={{
            top: "110px",
            height: "72vh",
          }}
        >
          <div className="relative h-full overflow-hidden">
            {services.map((service, index) => (
              <div
                key={service.num}
                className="service-card-shell-ar absolute inset-0"
                style={{
                  zIndex: index + 1,
                }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
