"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const pills = [
  { label: "Google Ads", bg: "#34A853", color: "#fff", icon: "https://cdn.simpleicons.org/googleads/ffffff" },
  { label: "Meta Ads", bg: "#0081FB", color: "#fff", icon: "https://cdn.simpleicons.org/meta/ffffff" },
  { label: "TikTok", bg: "#000", color: "#fff", icon: "https://cdn.simpleicons.org/tiktok/ffffff" },
  { label: "Instagram", bg: "#E4405F", color: "#fff", icon: "https://cdn.simpleicons.org/instagram/ffffff" },
  { label: "SEO", bg: "#4FFFB0", color: "#0A0A0A", icon: "" },
  { label: "React", bg: "#222", color: "#61DAFB", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { label: "Flutter", bg: "#02569B", color: "#fff", icon: "https://cdn.simpleicons.org/flutter/ffffff" },
  { label: "Next.js", bg: "#fff", color: "#000", icon: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { label: "Firebase", bg: "#FFCA28", color: "#0A0A0A", icon: "https://cdn.simpleicons.org/firebase/000000" },
  { label: "AI", bg: "#4FFFB0", color: "#0A0A0A", icon: "/ext/openai.png" },
  { label: "WordPress", bg: "#21759B", color: "#fff", icon: "https://cdn.simpleicons.org/wordpress/ffffff" },
  { label: "Supabase", bg: "#3FCF8E", color: "#fff", icon: "https://cdn.simpleicons.org/supabase/ffffff" },
  { label: "LinkedIn", bg: "#0A66C2", color: "#fff", icon: "/ext/linkedin-icon.png" },
  { label: "Snapchat", bg: "#FFFC00", color: "#000", icon: "https://cdn.simpleicons.org/snapchat/000000" },
  { label: "Analytics", bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", icon: "https://cdn.simpleicons.org/googleanalytics/ffffff" },
  { label: "Strategy", bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", icon: "" },
  { label: "Automation", bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", icon: "" },
  { label: "Performance", bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", icon: "" },
  { label: "Development", bg: "#4FFFB0", color: "#0A0A0A", icon: "" },
  { label: "Branding", bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", icon: "" },
  { label: "Facebook", bg: "#1877F2", color: "#fff", icon: "https://cdn.simpleicons.org/facebook/ffffff" },
  { label: "TypeScript", bg: "#3178C6", color: "#fff", icon: "https://cdn.simpleicons.org/typescript/ffffff" },
  { label: "Tailwind", bg: "#06B6D4", color: "#fff", icon: "https://cdn.simpleicons.org/tailwindcss/ffffff" },
  { label: "Google", bg: "#fff", color: "#000", icon: "/ext/google.svg" },
  { label: "Zapier", bg: "#FF4A00", color: "#fff", icon: "https://cdn.simpleicons.org/zapier/ffffff" },
  { label: "Figma", bg: "#F24E1E", color: "#fff", icon: "https://cdn.simpleicons.org/figma/ffffff" },
  { label: "Slack", bg: "#4A154B", color: "#fff", icon: "https://cdn.simpleicons.org/slack/ffffff" },
  { label: "GitHub", bg: "#222", color: "#fff", icon: "https://cdn.simpleicons.org/github/ffffff" },
  { label: "Notion", bg: "#fff", color: "#000", icon: "https://cdn.simpleicons.org/notion/000000" },
  { label: "Vercel", bg: "#000", color: "#fff", icon: "https://cdn.simpleicons.org/vercel/ffffff" },
  { label: "Stripe", bg: "#635BFF", color: "#fff", icon: "https://cdn.simpleicons.org/stripe/ffffff" },
  { label: "Shopify", bg: "#96BF48", color: "#fff", icon: "https://cdn.simpleicons.org/shopify/ffffff" },
  { label: "Twitter/X", bg: "#000", color: "#fff", icon: "https://cdn.simpleicons.org/x/ffffff" },
  { label: "YouTube", bg: "#FF0000", color: "#fff", icon: "https://cdn.simpleicons.org/youtube/ffffff" },
  { label: "WhatsApp", bg: "#25D366", color: "#fff", icon: "https://cdn.simpleicons.org/whatsapp/ffffff" },
  { label: "Growth", bg: "#4FFFB0", color: "#0A0A0A", icon: "" },
  { label: "UX Design", bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", icon: "" },
  { label: "Conversion", bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", icon: "" },
];

export default function FallingTextSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  // Trigger on scroll
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.05 });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Physics
  useEffect(() => {
    if (!started || !containerRef.current) return;

    const container = containerRef.current;
    const { Engine, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter;

    const width = container.offsetWidth;
    const height = container.offsetHeight;
    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = 1.2;

    // Walls
    const wo = { isStatic: true, render: { fillStyle: "transparent" } };
    World.add(engine.world, [
      Bodies.rectangle(width / 2, height + 30, width + 100, 60, wo),
      Bodies.rectangle(width / 2, -300, width + 100, 60, wo),
      Bodies.rectangle(-30, height / 2, 60, height + 600, wo),
      Bodies.rectangle(width + 30, height / 2, 60, height + 600, wo),
    ]);

    // Create pill elements + bodies
    const pairs: { el: HTMLDivElement; body: Matter.Body }[] = [];

    pills.forEach((pill, i) => {
      const el = document.createElement("div");
      el.style.cssText = `position:absolute;left:0;top:0;z-index:10;pointer-events:auto;cursor:grab;user-select:none;display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border-radius:9999px;font-size:1rem;font-weight:600;white-space:nowrap;background:${pill.bg};color:${pill.color};box-shadow:0 2px 8px rgba(0,0,0,0.2);will-change:transform;backface-visibility:hidden;-webkit-backface-visibility:hidden;`;

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

      // Measure after append
      const elW = el.offsetWidth;
      const elH = el.offsetHeight;

      const x = 80 + Math.random() * (width - 160);
      const y = -(10 + i * 12);

      const body = Bodies.rectangle(x, y, elW, elH, {
        restitution: 0.3,
        frictionAir: 0.04,
        friction: 0.4,
        render: { fillStyle: "transparent" },
        chamfer: { radius: elH / 2 },
      });

      Body.setVelocity(body, { x: (Math.random() - 0.5) * 2, y: 2 + Math.random() * 3 });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.03);

      World.add(engine.world, body);
      pairs.push({ el, body });
    });

    // Mouse
    const mouse = Mouse.create(container);
    const mc = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.8, render: { visible: false } },
    });

    // Don't block scroll
    const wheelFn = (mouse as unknown as Record<string, unknown>).mousewheel as EventListener;
    if (wheelFn && mouse.element) {
      mouse.element.removeEventListener("wheel", wheelFn);
      mouse.element.removeEventListener("DOMMouseScroll", wheelFn);
    }

    World.add(engine.world, mc);

    // Run physics at higher rate
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
      {/* Shiny heading */}
      <div className="flex items-center justify-center gap-4 md:gap-6" style={{ paddingTop: "60px", paddingBottom: "16px" }}>
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
        <h2
          className="heading text-center"
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
          Built Different
        </h2>
        <style>{`@keyframes shineMove { 0% { background-position: 100% 0; } 50% { background-position: -100% 0; } 100% { background-position: 100% 0; } }`}</style>
      </div>
      {/* Falling pills */}
      <div
        ref={containerRef}
        style={{ height: "450px", position: "relative", overflow: "hidden" }}
      />
    </div>
  );
}
