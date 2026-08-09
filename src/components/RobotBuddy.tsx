"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";

const SIZE = 290;
/* the gap in the hero's left column — viewport units so it lands in the same
   spot at any width, and so the first paint needs no measuring pass */
const HOME = { left: "4.5vw", top: "12vh" };
/* below this a pointer drag is a click, not a move */
const DRAG_SLOP = 4;

export default function RobotBuddy() {
  const [data, setData] = useState<object | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [hidden, setHidden] = useState(false);
  const [dragging, setDragging] = useState(false);

  /* fetched, not imported — keeps ~60KB of JSON out of the JS bundle */
  useEffect(() => {
    let alive = true;
    fetch("/lottie/robot.json")
      .then((r) => r.json())
      .then((json) => alive && setData(json))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  /* the chat owns visibility: gone while it's open, back when it closes */
  useEffect(() => {
    const onState = (e: Event) => setHidden(!!(e as CustomEvent).detail?.open);
    window.addEventListener("askahmed:state", onState);
    return () => window.removeEventListener("askahmed:state", onState);
  }, []);

  const drag = useRef({ active: false, moved: false, dx: 0, dy: 0, x0: 0, y0: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    /* read the live box, so the first drag picks up from the vw/vh home */
    const box = e.currentTarget.getBoundingClientRect();
    drag.current = {
      active: true,
      moved: false,
      dx: e.clientX - box.left,
      dy: e.clientY - box.top,
      x0: e.clientX,
      y0: e.clientY,
    };
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active) return;
    /* a few px of travel is a shaky click, not an intent to move it */
    if (!d.moved && Math.hypot(e.clientX - d.x0, e.clientY - d.y0) < DRAG_SLOP) return;
    d.moved = true;
    setDragging(true);
    setPos({
      x: Math.min(Math.max(e.clientX - d.dx, 8), window.innerWidth - SIZE - 8),
      y: Math.min(Math.max(e.clientY - d.dy, 8), window.innerHeight - SIZE - 8),
    });
  }, []);

  const onPointerUp = useCallback(() => {
    const wasDrag = drag.current.moved;
    drag.current.active = false;
    setDragging(false);
    if (!wasDrag) {
      setHidden(true);
      window.dispatchEvent(new Event("askahmed:open"));
    }
  }, []);

  if (!data) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Ask Ahmed's AI assistant"
      data-testid="robot-buddy"
      className="hidden lg:block fixed z-[96] select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setHidden(true);
          window.dispatchEvent(new Event("askahmed:open"));
        }
      }}
      style={{
        left: pos ? pos.x : HOME.left,
        top: pos ? pos.y : HOME.top,
        width: SIZE,
        height: SIZE,
        cursor: dragging ? "grabbing" : "grab",
        touchAction: "none",
        opacity: hidden ? 0 : 1,
        transform: hidden ? "scale(0.6)" : dragging ? "scale(1.06)" : "scale(1)",
        pointerEvents: hidden ? "none" : "auto",
        transition: dragging
          ? "transform 0.15s ease"
          : "opacity 0.25s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        filter: "drop-shadow(0 14px 26px rgba(4,50,58,0.18))",
      }}
    >
      <Lottie animationData={data} loop autoplay style={{ width: "100%", height: "100%", pointerEvents: "none" }} />
    </div>
  );
}
