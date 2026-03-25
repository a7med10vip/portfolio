"use client";

import { useRef } from "react";
import { motion, useInView, type Variant } from "framer-motion";

type AnimateProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "fade" | "scale" | "blur";
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  style?: React.CSSProperties;
};

const variants: Record<string, { hidden: Variant; visible: Variant }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -30, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92, filter: "blur(4px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
};

export default function Animate({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.15,
  style,
}: AnimateProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  const v = variants[variant];

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={v}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* Stagger container for children */
export function AnimateStagger({
  children,
  className,
  stagger = 0.08,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimateItem({
  children,
  className,
  variant = "fadeUp",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  style?: React.CSSProperties;
}) {
  const v = variants[variant];
  return (
    <motion.div
      className={className}
      style={style}
      variants={v}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
