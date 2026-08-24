"use client";

/**
 * Soueast's own brand strip, run full-bleed as a rule between sections.
 *
 * It arrives 25:1 and orange with its own transparency, so it needs no tinting
 * and no container: the page's white shows through it as the artwork intends.
 */
export default function BrandBand({ height = 26 }: { height?: number }) {
  return (
    <div
      aria-hidden
      className="w-full select-none"
      style={{
        height,
        backgroundImage: "url('/soueast-delivery/brand/soueast-material.svg')",
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
        backgroundPosition: "center",
      }}
    />
  );
}
