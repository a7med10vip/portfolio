import type { ReactNode } from "react";
import { ArrowRight } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../tokens";
import { DotPattern } from "../_marketing/deco";

/* Shared system error/state template — clean centered layout (no purple panel). */

export function SystemScreen({
  patternId,
  eyebrow,
  title,
  body,
  icon,
  image,
  accentColor,
  primaryLabel,
  secondaryLabel,
  extra,
}: {
  patternId: string;
  eyebrow: string;
  title: string;
  body: string;
  icon?: ReactNode;
  image?: string;
  accentColor?: string;
  primaryLabel: string;
  secondaryLabel?: string;
  extra?: ReactNode;
}) {
  return (
    <div style={{ width: "100%", height: "100%", background: colors.surface.page, fontFamily: fonts.body, display: "flex", alignItems: "center", justifyContent: "center", padding: 48, position: "relative", overflow: "hidden" }}>
      {/* subtle background motif */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
        <DotPattern id={`${patternId}-bg`} color="#0A0A0A" opacity={0.025} gap={30} />
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 540, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        {/* illustration */}
        {image ? (
          <img src={image} alt={title} style={{ width: 300, maxWidth: "72%", height: "auto", display: "block", marginBottom: 32 }} />
        ) : (
          icon && (
            <div style={{ width: 96, height: 96, borderRadius: "50%", background: accentColor ?? colors.brand.green, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, boxShadow: "0 14px 34px rgba(42,19,34,0.18)" }}>
              {icon}
            </div>
          )
        )}

        <span style={{ display: "inline-block", padding: "6px 14px", background: colors.brand.highlightSoft, border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.brand.greenDark, marginBottom: 16 }}>{eyebrow}</span>
        <h1 style={{ fontFamily: fonts.hero, fontSize: 40, fontWeight: 700, color: colors.ink.black, margin: "0 0 14px", lineHeight: 1.25 }}>{title}</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 1.9, color: colors.ink.muted, margin: "0 0 28px", maxWidth: 460 }}>{body}</p>

        {extra && <div style={{ width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", alignItems: "center" }}>{extra}</div>}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button style={{ height: 52, padding: "0 28px", background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
            {primaryLabel} <ArrowRight size={17} />
          </button>
          {secondaryLabel && (
            <button style={{ height: 52, padding: "0 24px", background: colors.surface.white, color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>{secondaryLabel}</button>
          )}
        </div>
      </div>
    </div>
  );
}
