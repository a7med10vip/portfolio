import type { CSSProperties } from "react";
import { colors, fonts } from "../../tokens";

/* Flat decorative primitives for the Marketing pages.
 * No gradient fills / no glow — discrete shapes only, per the brand system. */

export function DotPattern({
  id,
  color = "#FFFFFF",
  opacity = 0.1,
  gap = 26,
  dot = 1.6,
  style,
}: {
  id: string;
  color?: string;
  opacity?: number;
  gap?: number;
  dot?: number;
  style?: CSSProperties;
}) {
  return (
    <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", ...style }}>
      <defs>
        <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse">
          <circle cx={dot} cy={dot} r={dot} fill={color} opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function SectionLabel({ children, center, onDark }: { children: React.ReactNode; center?: boolean; onDark?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: center ? "center" : "flex-start", marginBottom: 14 }}>
      <span style={{ width: 28, height: 3, background: colors.brand.highlight, borderRadius: 2 }} />
      <span style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, letterSpacing: 1, color: onDark ? colors.brand.highlight : colors.brand.green }}>
        {children}
      </span>
    </div>
  );
}

/* ───────── موتيفات الأزهار (تحلّ محل الدوائر الصلبة في الزوايا) ─────────
 * أزهار مسطّحة أنيقة بلون هادئ وشفافية واطية + ورقة خضراء خفيفة — لا gradient
 * ولا glow، تماشياً مع نظام العلامة. تُوزَّع في الزوايا بعيداً عن النص. */

export function Blossom({ size = 120, color = "#FBC0E2", opacity = 0.12, petals = 6 }: { size?: number; color?: string; opacity?: number; petals?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden style={{ display: "block" }}>
      <g opacity={opacity}>
        {/* بتلات خارجية */}
        {Array.from({ length: petals }).map((_, i) => (
          <ellipse key={`o${i}`} cx="50" cy="24" rx="12.5" ry="24" fill={color} transform={`rotate(${(360 / petals) * i} 50 50)`} />
        ))}
        {/* بتلات داخلية مزاحة لإحساس الوردة */}
        {Array.from({ length: petals }).map((_, i) => (
          <ellipse key={`i${i}`} cx="50" cy="34" rx="7.5" ry="15" fill={color} opacity={0.85} transform={`rotate(${(360 / petals) * i + 180 / petals} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="8.5" fill={color} />
      </g>
    </svg>
  );
}

export function Leaf({ size = 60, color = "#6FD180", opacity = 0.12, rotate = 0 }: { size?: number; color?: string; opacity?: number; rotate?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden style={{ display: "block", transform: `rotate(${rotate}deg)` }}>
      <path d="M50 95 C26 72 26 38 50 8 C74 38 74 72 50 95 Z" fill={color} opacity={opacity} />
      <path d="M50 88 L50 22" stroke={color} strokeWidth="2" opacity={opacity * 0.9} fill="none" />
    </svg>
  );
}

/* طبقة زخرفية تملأ القسم وتوزّع باقة أزهار في الزوايا (تنزف خارج الحواف).
 * scale لتصغيرها على الموبايل · mirror لعكس الاتجاه بين الأقسام. */
export function FloralScatter({ scale = 1, mirror = false, petalColor = "#FBC0E2", leafColor = "#6FD180" }: { scale?: number; mirror?: boolean; petalColor?: string; leafColor?: string }) {
  const s = (n: number) => Math.round(n * scale);
  const startKey = mirror ? "insetInlineEnd" : "insetInlineStart";
  const endKey = mirror ? "insetInlineStart" : "insetInlineEnd";
  const pos = (top: number | null, bottom: number | null, side: "start" | "end", off: number): CSSProperties => ({
    position: "absolute",
    ...(top !== null ? { top: s(top) } : {}),
    ...(bottom !== null ? { bottom: s(bottom) } : {}),
    [side === "start" ? startKey : endKey]: s(off),
  });
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {/* زاوية علوية: زهرة كبيرة تنزف للخارج + ورقة */}
      <div style={pos(-46, null, "end", -38)}><Blossom size={s(184)} color={petalColor} opacity={0.13} /></div>
      <div style={pos(96, null, "end", 96)}><Blossom size={s(82)} color={petalColor} opacity={0.1} /></div>
      <div style={pos(58, null, "end", 8)}><Leaf size={s(60)} color={leafColor} opacity={0.12} rotate={mirror ? 40 : -40} /></div>
      {/* زاوية سفلية مقابلة: عنقود أصغر */}
      <div style={pos(null, -52, "start", -42)}><Blossom size={s(150)} color={petalColor} opacity={0.1} /></div>
      <div style={pos(null, 60, "start", 70)}><Blossom size={s(58)} color={petalColor} opacity={0.09} /></div>
      <div style={pos(null, 40, "start", 18)}><Leaf size={s(48)} color={leafColor} opacity={0.1} rotate={mirror ? -150 : 150} /></div>
    </div>
  );
}

/* اسم العلامة كنص (بدل صورة اللوجو/المربع الأسود) — اعتماد العميل:
 * «منصة خطّابة» باللون الوردي العريض + «السعودية الأولى» بالأسود (أو أبيض على الغامق). */
export function BrandWordmark({ onDark = false, size = "md" }: { onDark?: boolean; size?: "sm" | "md" | "lg" }) {
  const s = size === "lg" ? { a: 24, b: 13 } : size === "sm" ? { a: 15, b: 9.5 } : { a: 19, b: 11 };
  return (
    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.12, direction: "rtl" }}>
      <span style={{ fontFamily: fonts.heading, fontSize: s.a, fontWeight: 800, color: "#F258B4", letterSpacing: 0 }}>منصة خطّابة</span>
      <span style={{ fontFamily: fonts.body, fontSize: s.b, fontWeight: 700, color: onDark ? "rgba(255,255,255,0.92)" : colors.ink.black }}>السعودية الأولى</span>
    </div>
  );
}

export function AvatarLetter({ letter, color, size = 48 }: { letter: string; color: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.heading,
        fontSize: size * 0.42,
        fontWeight: 700,
        color: "#fff",
        flexShrink: 0,
      }}
    >
      {letter}
    </div>
  );
}
