'use client';

import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';

interface FallingItem {
  label: string;
  type: 'text' | 'icon';
  bg: string;
  color: string;
  iconUrl?: string;
  size?: number;
}

const items: FallingItem[] = [
  { label: "Performance Marketing", type: "text", bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" },
  { label: "SEO", type: "text", bg: "#4FFFB0", color: "#0A0A0A" },
  { label: "Strategy", type: "text", bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" },
  { label: "AI", type: "text", bg: "#4FFFB0", color: "#0A0A0A" },
  { label: "Analytics", type: "text", bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" },
  { label: "Automation", type: "text", bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" },
  { label: "Development", type: "text", bg: "#4FFFB0", color: "#0A0A0A" },
  { label: "Google", type: "icon", bg: "#fff", color: "", iconUrl: "https://cdn.simpleicons.org/google/4285F4", size: 48 },
  { label: "Meta", type: "icon", bg: "#0081FB", color: "", iconUrl: "https://cdn.simpleicons.org/meta/ffffff", size: 48 },
  { label: "TikTok", type: "icon", bg: "#000", color: "", iconUrl: "https://cdn.simpleicons.org/tiktok/ffffff", size: 48 },
  { label: "Instagram", type: "icon", bg: "#E4405F", color: "", iconUrl: "https://cdn.simpleicons.org/instagram/ffffff", size: 48 },
  { label: "React", type: "icon", bg: "#222", color: "", iconUrl: "https://cdn.simpleicons.org/react/61DAFB", size: 48 },
  { label: "Flutter", type: "icon", bg: "#02569B", color: "", iconUrl: "https://cdn.simpleicons.org/flutter/ffffff", size: 48 },
  { label: "Firebase", type: "icon", bg: "#FFCA28", color: "", iconUrl: "https://cdn.simpleicons.org/firebase/ffffff", size: 48 },
  { label: "Next.js", type: "icon", bg: "#fff", color: "", iconUrl: "https://cdn.simpleicons.org/nextdotjs/000000", size: 48 },
  { label: "WordPress", type: "icon", bg: "#21759B", color: "", iconUrl: "https://cdn.simpleicons.org/wordpress/ffffff", size: 48 },
  { label: "LinkedIn", type: "icon", bg: "#0A66C2", color: "", iconUrl: "https://cdn.simpleicons.org/linkedin/ffffff", size: 48 },
  { label: "Snapchat", type: "icon", bg: "#FFFC00", color: "", iconUrl: "https://cdn.simpleicons.org/snapchat/000000", size: 48 },
];

export default function FallingText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!started || !containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter;

    const width = container.offsetWidth;
    const height = container.offsetHeight;
    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = 2;

    const render = Render.create({
      element: canvasRef.current,
      engine,
      options: { width, height, background: 'transparent', wireframes: false },
    });

    // Walls
    const w = { isStatic: true, render: { fillStyle: 'transparent' } };
    World.add(engine.world, [
      Bodies.rectangle(width / 2, height + 30, width + 100, 60, w),
      Bodies.rectangle(width / 2, -200, width + 100, 60, w),
      Bodies.rectangle(-30, height / 2, 60, height + 400, w),
      Bodies.rectangle(width + 30, height / 2, 60, height + 400, w),
    ]);

    // Create elements + bodies
    const pairs: { el: HTMLDivElement; body: Matter.Body }[] = [];

    items.forEach((item, i) => {
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.zIndex = '10';
      el.style.pointerEvents = 'auto';
      el.style.cursor = 'grab';
      el.style.userSelect = 'none';

      if (item.type === 'icon') {
        el.style.width = '48px';
        el.style.height = '48px';
        el.style.borderRadius = '50%';
        el.style.background = item.bg;
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.3)';
        el.innerHTML = `<img src="${item.iconUrl}" alt="${item.label}" style="width:22px;height:22px;" />`;
      } else {
        el.style.padding = '8px 18px';
        el.style.borderRadius = '9999px';
        el.style.background = item.bg;
        el.style.color = item.color;
        el.style.fontSize = '0.85rem';
        el.style.fontWeight = '600';
        el.style.whiteSpace = 'nowrap';
        el.textContent = item.label;
      }

      container.appendChild(el);

      const elW = item.type === 'icon' ? 48 : el.offsetWidth || 100;
      const elH = item.type === 'icon' ? 48 : el.offsetHeight || 32;
      const x = 60 + Math.random() * (width - 120);
      const y = -(20 + i * 25);

      const isCircle = item.type === 'icon';
      const body = isCircle
        ? Bodies.circle(x, y, 24, { restitution: 0.5, frictionAir: 0.01, friction: 0.2, render: { fillStyle: 'transparent' } })
        : Bodies.rectangle(x, y, elW, elH, { restitution: 0.5, frictionAir: 0.01, friction: 0.2, render: { fillStyle: 'transparent' }, chamfer: { radius: elH / 2 } });

      Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: 5 + Math.random() * 5 });

      World.add(engine.world, body);
      pairs.push({ el, body });
    });

    // Mouse
    const mouse = Mouse.create(container);
    const mc = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.8, render: { visible: false } },
    });

    // Don't interfere with page scroll
    const wheelHandler = (mouse as unknown as Record<string, unknown>).mousewheel as EventListener;
    if (wheelHandler && mouse.element) {
      mouse.element.removeEventListener("wheel", wheelHandler);
      mouse.element.removeEventListener("DOMMouseScroll", wheelHandler);
    }

    World.add(engine.world, mc);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    let raf: number;
    const loop = () => {
      pairs.forEach(({ body, el }) => {
        el.style.left = `${body.position.x}px`;
        el.style.top = `${body.position.y}px`;
        el.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      Render.stop(render);
      Runner.stop(runner);
      pairs.forEach(({ el }) => el.remove());
      if (render.canvas && canvasRef.current) {
        canvasRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [started]);

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }}>
      <div ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
    </div>
  );
}
