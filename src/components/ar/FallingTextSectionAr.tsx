"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const pills = [
  { label: "إعلانات جوجل", bg: "#34A853", color: "#fff", icon: "https://cdn.simpleicons.org/googleads/ffffff" },
  { label: "إعلانات ميتا", bg: "#0081FB", color: "#fff", icon: "https://cdn.simpleicons.org/meta/ffffff" },
  { label: "إعلانات تيك توك", bg: "#000", color: "#fff", icon: "https://cdn.simpleicons.org/tiktok/ffffff" },
  { label: "إنستغرام", bg: "#E4405F", color: "#fff", icon: "https://cdn.simpleicons.org/instagram/ffffff" },
  { label: "تحسين محركات البحث", bg: "#4FFFB0", color: "#0A0A0A", icon: "" },
  { label: "تطوير الواجهات", bg: "#222", color: "#61DAFB", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { label: "تطبيقات الجوال", bg: "#02569B", color: "#fff", icon: "https://cdn.simpleicons.org/flutter/ffffff" },
  { label: "تطوير الويب", bg: "#fff", color: "#000", icon: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { label: "قواعد البيانات", bg: "#FFCA28", color: "#0A0A0A", icon: "https://cdn.simpleicons.org/firebase/000000" },
  { label: "الذكاء الاصطناعي", bg: "#4FFFB0", color: "#0A0A0A", icon: "/ext/openai.png" },
  { label: "إدارة المحتوى", bg: "#21759B", color: "#fff", icon: "https://cdn.simpleicons.org/wordpress/ffffff" },
  { label: "البنية السحابية", bg: "#3FCF8E", color: "#fff", icon: "https://cdn.simpleicons.org/supabase/ffffff" },
  { label: "لينكدإن", bg: "#0A66C2", color: "#fff", icon: "/ext/linkedin-icon.png" },
  { label: "سناب شات", bg: "#FFFC00", color: "#000", icon: "https://cdn.simpleicons.org/snapchat/000000" },
  { label: "التحليلات", bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", icon: "https://cdn.simpleicons.org/googleanalytics/ffffff" },
  { label: "الاستراتيجية", bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", icon: "" },
  { label: "الأتمتة", bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", icon: "" },
  { label: "التسويق بالأداء", bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", icon: "" },
  { label: "التطوير", bg: "#4FFFB0", color: "#0A0A0A", icon: "" },
  { label: "الهوية البصرية", bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", icon: "" },
  { label: "فيسبوك", bg: "#1877F2", color: "#fff", icon: "https://cdn.simpleicons.org/facebook/ffffff" },
  { label: "البرمجة", bg: "#3178C6", color: "#fff", icon: "https://cdn.simpleicons.org/typescript/ffffff" },
  { label: "التصميم", bg: "#06B6D4", color: "#fff", icon: "https://cdn.simpleicons.org/tailwindcss/ffffff" },
  { label: "جوجل", bg: "#fff", color: "#000", icon: "/ext/google.svg" },
  { label: "أتمتة العمليات", bg: "#FF4A00", color: "#fff", icon: "https://cdn.simpleicons.org/zapier/ffffff" },
  { label: "تصميم الواجهات", bg: "#F24E1E", color: "#fff", icon: "https://cdn.simpleicons.org/figma/ffffff" },
  { label: "إدارة الأكواد", bg: "#222", color: "#fff", icon: "https://cdn.simpleicons.org/github/ffffff" },
  { label: "الاستضافة", bg: "#000", color: "#fff", icon: "https://cdn.simpleicons.org/vercel/ffffff" },
  { label: "بوابات الدفع", bg: "#635BFF", color: "#fff", icon: "https://cdn.simpleicons.org/stripe/ffffff" },
  { label: "يوتيوب", bg: "#FF0000", color: "#fff", icon: "https://cdn.simpleicons.org/youtube/ffffff" },
  { label: "واتساب", bg: "#25D366", color: "#fff", icon: "https://cdn.simpleicons.org/whatsapp/ffffff" },
  { label: "النمو", bg: "#4FFFB0", color: "#0A0A0A", icon: "" },
  { label: "تجربة المستخدم", bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", icon: "" },
  { label: "تحسين التحويل", bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", icon: "" },
];

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
      el.style.cssText = `position:absolute;left:0;top:0;z-index:10;pointer-events:auto;cursor:grab;user-select:none;display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border-radius:9999px;font-size:1rem;font-weight:600;white-space:nowrap;background:${pill.bg};color:${pill.color};box-shadow:0 2px 8px rgba(0,0,0,0.2);will-change:transform;backface-visibility:hidden;-webkit-backface-visibility:hidden;font-family:'Ahmed Sans',sans-serif;`;

      if (pill.icon) {
        const img = document.createElement("img");
        img.src = pill.icon;
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
    <div style={{ background: "#0A0A0A", position: "relative" }}>
      <div className="flex items-center justify-center gap-4 md:gap-6" style={{ paddingTop: "60px", paddingBottom: "16px" }}>
        <h2
          className="ar-heading text-center"
          style={{
            fontSize: "clamp(4rem, 11vw, 9.5rem)",
            letterSpacing: "-2px",
            backgroundImage: "linear-gradient(90deg, #444 0%, #999 40%, #fff 50%, #999 60%, #444 100%)",
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
            fontSize: "clamp(4rem, 11vw, 9.5rem)",
            lineHeight: 1,
            backgroundImage: "linear-gradient(90deg, #444 0%, #999 40%, #fff 50%, #999 60%, #444 100%)",
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
