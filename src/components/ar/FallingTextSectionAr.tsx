"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

/* Same palette and structure as the English band: each pill carries its
   platform's official brand colour with `fg` picked per pill for contrast,
   and the icon is fetched in that same `fg` so mark and label always match.
   Grouped the same way — paid media, social, stack, tools, then the
   non-platform chips on the site's own colours. */
const INK = "#04323A";
const SNOW = "#FFFFFF";
const MINT = "#CFF7EE";
const WASH = "rgba(0,77,90,0.08)";
const WASH_INK = "rgba(4,50,58,0.68)";

const pills = [
  // Paid media
  { label: "إعلانات جوجل", bg: "#34A853", fg: SNOW, icon: "googleads" },
  { label: "إعلانات ميتا", bg: "#0081FB", fg: SNOW, icon: "meta" },
  { label: "إعلانات تيك توك", bg: "#1A1A1A", fg: SNOW, icon: "tiktok" },
  { label: "سناب شات", bg: "#FFE94D", fg: "#1A1A1A", icon: "snapchat" },
  { label: "التحليلات", bg: "#E37400", fg: SNOW, icon: "googleanalytics" },

  // Social
  { label: "إنستغرام", bg: "#E4405F", fg: SNOW, icon: "instagram" },
  { label: "فيسبوك", bg: "#1877F2", fg: SNOW, icon: "facebook" },
  { label: "لينكدإن", bg: "#0A66C2", fg: SNOW, icon: "linkedin" },
  { label: "يوتيوب", bg: "#FF0000", fg: SNOW, icon: "youtube" },
  { label: "واتساب", bg: "#25D366", fg: SNOW, icon: "whatsapp" },

  // Stack
  { label: "تطوير الواجهات", bg: "#61DAFB", fg: INK, icon: "react" },
  { label: "تطوير الويب", bg: "#1A1A1A", fg: SNOW, icon: "nextdotjs" },
  { label: "البرمجة", bg: "#3178C6", fg: SNOW, icon: "typescript" },
  { label: "التصميم", bg: "#06B6D4", fg: SNOW, icon: "tailwindcss" },
  { label: "تطبيقات الجوال", bg: "#0175C2", fg: SNOW, icon: "flutter" },
  { label: "قواعد البيانات", bg: "#FFCA28", fg: "#1A1A1A", icon: "firebase" },
  { label: "البنية السحابية", bg: "#3FCF8E", fg: INK, icon: "supabase" },
  { label: "إدارة المحتوى", bg: "#21759B", fg: SNOW, icon: "wordpress" },
  { label: "الاستضافة", bg: "#1A1A1A", fg: SNOW, icon: "vercel" },
  { label: "إدارة الأكواد", bg: "#1A1A1A", fg: SNOW, icon: "github" },

  // Tools
  { label: "تصميم الواجهات", bg: "#F24E1E", fg: SNOW, icon: "figma" },
  { label: "أتمتة العمليات", bg: "#FF4A00", fg: SNOW, icon: "zapier" },
  { label: "بوابات الدفع", bg: "#635BFF", fg: SNOW, icon: "stripe" },
  { label: "جوجل", bg: "#FFFFFF", fg: "#1A1A1A", icon: "/ext/google.svg" },

  // What Ahmed sells
  { label: "تحسين محركات البحث", bg: MINT, fg: INK, icon: "" },
  { label: "الذكاء الاصطناعي", bg: MINT, fg: INK, icon: "openai" },
  { label: "التطوير", bg: MINT, fg: INK, icon: "" },
  { label: "النمو", bg: MINT, fg: INK, icon: "" },

  // Supporting skills
  { label: "الاستراتيجية", bg: WASH, fg: WASH_INK, icon: "" },
  { label: "الأتمتة", bg: WASH, fg: WASH_INK, icon: "" },
  { label: "التسويق بالأداء", bg: WASH, fg: WASH_INK, icon: "" },
  { label: "الهوية البصرية", bg: WASH, fg: WASH_INK, icon: "" },
  { label: "تجربة المستخدم", bg: WASH, fg: WASH_INK, icon: "" },
  { label: "تحسين التحويل", bg: WASH, fg: WASH_INK, icon: "" },
];

/* simple-icons serves a mark in any hex, so the icon inherits the pill's `fg`
   instead of being pinned to white or black in the URL. */
function iconUrl(icon: string, fg: string) {
  if (!icon) return "";
  if (icon.startsWith("/")) return icon;
  return `https://cdn.simpleicons.org/${icon}/${fg.replace("#", "")}`;
}

export default function FallingTextSectionAr() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.05 });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || !containerRef.current) return;

    const container = containerRef.current;
    const { Engine, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter;

    const width = container.offsetWidth;
    const height = container.offsetHeight;
    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = 1.2;

    const wo = { isStatic: true, render: { fillStyle: "transparent" } };
    World.add(engine.world, [
      Bodies.rectangle(width / 2, height + 30, width + 100, 60, wo),
      Bodies.rectangle(width / 2, -300, width + 100, 60, wo),
      Bodies.rectangle(-30, height / 2, 60, height + 600, wo),
      Bodies.rectangle(width + 30, height / 2, 60, height + 600, wo),
    ]);

    const pairs: { el: HTMLDivElement; body: Matter.Body }[] = [];

    pills.forEach((pill, i) => {
      const el = document.createElement("div");
      el.style.cssText = `position:absolute;left:0;top:0;z-index:10;pointer-events:auto;cursor:grab;user-select:none;display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border-radius:9999px;font-size:1rem;font-weight:600;white-space:nowrap;background:${pill.bg};color:${pill.fg};border:1px solid rgba(4,50,58,0.10);will-change:transform;backface-visibility:hidden;-webkit-backface-visibility:hidden;font-family:'Ahmed Sans',sans-serif;`;

      const src = iconUrl(pill.icon, pill.fg);
      if (src) {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
        img.style.cssText = "width:18px;height:18px;flex-shrink:0;";
        el.appendChild(img);
      }

      const txt = document.createElement("span");
      txt.textContent = pill.label;
      el.appendChild(txt);

      container.appendChild(el);

      const elW = el.offsetWidth;
      const elH = el.offsetHeight;

      const x = 80 + Math.random() * (width - 160);
      const y = -(10 + i * 12);

      const body = Bodies.rectangle(x, y, elW, elH, {
        restitution: 0.3, frictionAir: 0.04, friction: 0.4,
        render: { fillStyle: "transparent" },
        chamfer: { radius: elH / 2 },
      });

      Body.setVelocity(body, { x: (Math.random() - 0.5) * 2, y: 2 + Math.random() * 3 });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.03);

      World.add(engine.world, body);
      pairs.push({ el, body });
    });

    const mouse = Mouse.create(container);
    const mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.8, render: { visible: false } } });

    const wheelFn = (mouse as unknown as Record<string, unknown>).mousewheel as EventListener;
    if (wheelFn && mouse.element) {
      mouse.element.removeEventListener("wheel", wheelFn);
      mouse.element.removeEventListener("DOMMouseScroll", wheelFn);
    }

    World.add(engine.world, mc);

    const runner = Runner.create({ delta: 1000 / 120 });
    Runner.run(runner, engine);

    let raf: number;
    const loop = () => {
      pairs.forEach(({ body, el }) => {
        el.style.transform = `translate3d(${body.position.x}px, ${body.position.y}px, 0) translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      Runner.stop(runner);
      pairs.forEach(({ el }) => el.remove());
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [started]);

  return (
    <div style={{ background: "#fff", position: "relative" }}>
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 px-5" style={{ paddingTop: "60px", paddingBottom: "16px" }}>
        <h2
          className="ar-heading text-center"
          style={{
            fontSize: "clamp(2.5rem, 11vw, 9.5rem)",
            letterSpacing: "-2px",
            backgroundImage: "linear-gradient(90deg, #004D5A 0%, #00A99B 40%, #6FD8C4 50%, #00A99B 60%, #004D5A 100%)",
            backgroundSize: "400% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shineMove 12s ease-in-out infinite",
          }}
        >
          أصنع الفارق
        </h2>
        <span
          style={{
            fontSize: "clamp(2.5rem, 11vw, 9.5rem)",
            lineHeight: 1,
            backgroundImage: "linear-gradient(90deg, #004D5A 0%, #00A99B 40%, #6FD8C4 50%, #00A99B 60%, #004D5A 100%)",
            backgroundSize: "400% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shineMove 12s ease-in-out infinite",
          }}
        >
          ✨
        </span>
        <style>{`@keyframes shineMove { 0% { background-position: 100% 0; } 50% { background-position: -100% 0; } 100% { background-position: 100% 0; } }`}</style>
      </div>
      <div ref={containerRef} style={{ height: "450px", position: "relative", overflow: "hidden" }} />
    </div>
  );
}
