import type { ReactNode } from "react";
import { colors, fonts, radius } from "../../tokens";
import { DotPattern, FloralScatter } from "../_marketing/deco";

/* Mobile screen wrappers — content sits inside PhoneChrome (390×844). Status bar overlay is part of the chrome. */

export function MobileScreen({ children, bg = colors.surface.white, padTop = 56 }: { children: ReactNode; bg?: string; padTop?: number }) {
  return (
    <div style={{ width: "100%", height: "100%", background: bg, fontFamily: fonts.body, paddingTop: padTop, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      {children}
    </div>
  );
}

export function PurpleBackdrop({ id, dotsOpacity = 0.07 }: { id: string; dotsOpacity?: number }) {
  return (
    <>
      <DotPattern id={id} color="#FFFFFF" opacity={dotsOpacity} gap={26} />
      <FloralScatter scale={0.6} />
    </>
  );
}

export function PageDots({ active, count = 3 }: { active: number; count?: number }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} style={{ width: i === active ? 22 : 8, height: 8, borderRadius: 999, background: i === active ? colors.brand.green : colors.border.strong, transition: "all 0.2s" }} />
      ))}
    </div>
  );
}

export function MobileButton({ children, variant = "primary", onMint }: { children: ReactNode; variant?: "primary" | "ghost"; onMint?: boolean }) {
  if (variant === "ghost") {
    return (
      <button style={{ width: "100%", height: 50, background: "transparent", color: onMint ? "rgba(255,255,255,0.85)" : colors.ink.muted, border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{children}</button>
    );
  }
  return (
    <button style={{ width: "100%", height: 52, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>{children}</button>
  );
}
