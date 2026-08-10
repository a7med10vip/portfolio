"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

/* Every pill carries its platform's official brand colour, and `fg` is picked
   per pill for contrast against it — the old list hard-coded the same dark ink
   on all of them, so TikTok, Vercel and GitHub had near-black labels on
   near-black fills. `icon` is a simple-icons slug (or a local path for the
   multicolour marks); the icon is fetched in the pill's own `fg` so the mark
   and the label always match. */
const INK = "#04323A";   // site ink, for light fills
const SNOW = "#FFFFFF";  // for dark and saturated fills

/* Non-platform chips use the site palette rather than a brand colour: mint for
   the things Ahmed sells, a faint ink wash for the supporting skills. */
const MINT = "#CFF7EE";
const WASH = "rgba(207,247,238,0.14)";
const WASH_INK = "rgba(207,247,238,0.92)";

const pills = [
  // Paid media
  { label: "Google Ads", bg: "#34A853", fg: SNOW, icon: "googleads" },
  { label: "Meta Ads", bg: "#0081FB", fg: SNOW, icon: "meta" },
  { label: "TikTok", bg: "#1A1A1A", fg: SNOW, icon: "tiktok" },
  { label: "Snapchat", bg: "#FFE94D", fg: "#1A1A1A", icon: "snapchat" },
  { label: "Analytics", bg: "#E37400", fg: SNOW, icon: "googleanalytics" },

  // Social
  { label: "Instagram", bg: "#E4405F", fg: SNOW, icon: "instagram" },
  { label: "Facebook", bg: "#1877F2", fg: SNOW, icon: "facebook" },
  { label: "LinkedIn", bg: "#FFFFFF", fg: "#0A66C2", icon: "/icons/linkedin.png" },
  { label: "YouTube", bg: "#FF0000", fg: SNOW, icon: "youtube" },
  { label: "WhatsApp", bg: "#25D366", fg: SNOW, icon: "whatsapp" },
  { label: "Twitter/X", bg: "#1A1A1A", fg: SNOW, icon: "x" },

  // Stack
  { label: "React", bg: "#61DAFB", fg: INK, icon: "react" },
  { label: "Next.js", bg: "#1A1A1A", fg: SNOW, icon: "nextdotjs" },
  { label: "TypeScript", bg: "#3178C6", fg: SNOW, icon: "typescript" },
  { label: "Tailwind", bg: "#06B6D4", fg: SNOW, icon: "tailwindcss" },
  { label: "Flutter", bg: "#0175C2", fg: SNOW, icon: "flutter" },
  { label: "Firebase", bg: "#FFCA28", fg: "#1A1A1A", icon: "firebase" },
  { label: "Supabase", bg: "#3FCF8E", fg: INK, icon: "supabase" },
  { label: "WordPress", bg: "#21759B", fg: SNOW, icon: "wordpress" },
  { label: "Vercel", bg: "#1A1A1A", fg: SNOW, icon: "vercel" },
  { label: "GitHub", bg: "#1A1A1A", fg: SNOW, icon: "github" },

  // Tools
  { label: "Figma", bg: "#F24E1E", fg: SNOW, icon: "figma" },
  { label: "Slack", bg: "#4A154B", fg: SNOW, icon: "fa-brands fa-slack" },
  { label: "Notion", bg: "#FFFFFF", fg: "#1A1A1A", icon: "notion" },
  { label: "Zapier", bg: "#FF4A00", fg: SNOW, icon: "zapier" },
  { label: "Stripe", bg: "#635BFF", fg: SNOW, icon: "stripe" },
  { label: "Shopify", bg: "#7AB55C", fg: SNOW, icon: "shopify" },
  { label: "Google", bg: "#FFFFFF", fg: "#1A1A1A", icon: "/ext/google.svg" },

  // What Ahmed sells
  { label: "SEO", bg: MINT, fg: INK, icon: "" },
  { label: "AI", bg: MINT, fg: INK, icon: "/icons/openai-ink.png" },
  { label: "Development", bg: MINT, fg: INK, icon: "" },
  { label: "Growth", bg: MINT, fg: INK, icon: "" },

  // Supporting skills
  { label: "Strategy", bg: WASH, fg: WASH_INK, icon: "" },
  { label: "Automation", bg: WASH, fg: WASH_INK, icon: "" },
  { label: "Performance", bg: WASH, fg: WASH_INK, icon: "" },
  { label: "Branding", bg: WASH, fg: WASH_INK, icon: "" },
  { label: "UX Design", bg: WASH, fg: WASH_INK, icon: "" },
  { label: "Conversion", bg: WASH, fg: WASH_INK, icon: "" },
];

/* simple-icons serves a mark in any hex, so the icon inherits the pill's `fg`
   instead of being pinned to white or black in the URL. */
function iconUrl(icon: string, fg: string) {
  if (!icon) return "";
  if (icon.startsWith("/")) return icon;
  return `https://cdn.simpleicons.org/${icon}/${fg.replace("#", "")}`;
}

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
      /* The hairline reads as an edge on the white and mint fills, and
         disappears into the dark ones — one rule covers both. */
      el.style.cssText = `position:absolute;left:0;top:0;z-index:10;pointer-events:auto;cursor:grab;user-select:none;display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border-radius:9999px;font-size:1rem;font-weight:600;white-space:nowrap;background:${pill.bg};color:${pill.fg};border:1px solid rgba(207,247,238,0.18);will-change:transform;backface-visibility:hidden;-webkit-backface-visibility:hidden;`;

      /* Three simple-icons slugs were withdrawn on trademark requests and
         404'd. Marks now come from three places: the CDN, a local file, or a
         Font Awesome glyph — whichever the brand still has. */
      if (pill.icon.startsWith("fa-")) {
        const ico = document.createElement("i");
        ico.className = pill.icon;
        ico.setAttribute("aria-hidden", "true");
        ico.style.cssText = `font-size:16px;line-height:1;flex-shrink:0;color:${pill.fg};`;
        el.appendChild(ico);
      } else {
        const src = iconUrl(pill.icon, pill.fg);
        if (src) {
          const img = document.createElement("img");
          img.src = src;
          img.alt = "";
          img.style.cssText = "width:18px;height:18px;flex-shrink:0;";
          el.appendChild(img);
        }
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
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 px-5" style={{ paddingTop: "60px", paddingBottom: "16px" }}>
        <span
          style={{
            fontSize: "clamp(2.5rem, 11vw, 9.5rem)",
            lineHeight: 1,
            backgroundImage: "linear-gradient(100deg, #FFFFFF 0%, #FFFFFF 38%, #CFF7EE 45%, #6FD8C4 50%, #CFF7EE 55%, #FFFFFF 62%, #FFFFFF 100%)",
            backgroundSize: "260% 100%",
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
            fontSize: "clamp(2.5rem, 11vw, 9.5rem)",
            letterSpacing: "-2px",
            backgroundImage: "linear-gradient(100deg, #FFFFFF 0%, #FFFFFF 38%, #CFF7EE 45%, #6FD8C4 50%, #CFF7EE 55%, #FFFFFF 62%, #FFFFFF 100%)",
            backgroundSize: "260% 100%",
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
