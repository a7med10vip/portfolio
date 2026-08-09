"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";

interface RotatingTextProps {
  texts: string[];
  mainClassName?: string;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  exit?: TargetAndTransition;
  staggerDuration?: number;
  splitLevelClassName?: string;
  transition?: Transition;
  rotationInterval?: number;
  /** spring used to morph the container between word widths */
  widthTransition?: Transition;
}

export default function RotatingText({
  texts,
  mainClassName = "",
  initial = {
    y: "0.7em",
    opacity: 0,
    filter: "blur(12px)",
    rotateX: -70,
    scale: 0.94,
  },
  animate = {
    y: "0em",
    opacity: 1,
    filter: "blur(0px)",
    rotateX: 0,
    scale: 1,
  },
  exit = {
    y: "-0.5em",
    opacity: 0,
    filter: "blur(10px)",
    rotateX: 55,
    scale: 1.03,
  },
  transition = {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1],
  },
  widthTransition = {
    type: "spring",
    stiffness: 260,
    damping: 30,
    mass: 0.6,
  },
  rotationInterval = 2500,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const widestText = texts.reduce(
    (longest, text) => (text.length > longest.length ? text : longest),
    texts[0] ?? ""
  );

  useEffect(() => {
    if (texts.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [texts.length, rotationInterval]);

  /* Measure the *current* word so the container can morph to it. Runs before
     paint, so the first frame is already the right width (no flash). */
  useLayoutEffect(() => {
    if (measureRef.current) setWidth(measureRef.current.offsetWidth);
  }, [index, texts]);

  /* The hero scales with the viewport and the display font loads late — both
     change the measured width, and a ResizeObserver catches each. */
  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.span
      className={`relative inline-block align-baseline ${mainClassName}`.trim()}
      style={{ perspective: 1200 }}
      animate={width != null ? { width } : undefined}
      initial={false}
      transition={widthTransition}
      aria-live="polite"
    >
      {/* zero-width, in-flow: contributes the line box height only */}
      <span
        aria-hidden
        className="invisible pointer-events-none select-none whitespace-nowrap"
        style={{ display: "block", width: 0, overflow: "hidden" }}
      >
        {widestText}
      </span>

      {/* out of flow, so it keeps its intrinsic width for measuring */}
      <span
        ref={measureRef}
        aria-hidden
        className="invisible pointer-events-none select-none whitespace-nowrap"
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        {texts[index]}
      </span>

      <AnimatePresence initial={false} mode="sync">
        <motion.span
          key={texts[index]}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
          className="absolute inset-0 inline-flex items-center justify-center whitespace-nowrap"
          style={{
            transformOrigin: "50% 100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
