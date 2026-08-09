import { colors, fonts } from "../tokens";

type Props = {
  code: string;
  title: string;
  description?: string;
  kind: "desktop" | "mobile";
};

export default function ScreenPlaceholder({ code, title, description, kind }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.surface.page,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: kind === "mobile" ? 24 : 48,
        gap: 16,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(135deg, transparent 0 16px, rgba(0,0,0,0.015) 16px 32px)",
        }}
      />
      <div
        style={{
          fontFamily: fonts.latin,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 2,
          color: colors.brand.green,
          padding: "6px 12px",
          background: colors.brand.greenSoft,
          borderRadius: 999,
          zIndex: 1,
        }}
      >
        {code} · PLACEHOLDER
      </div>
      <h2
        style={{
          fontFamily: fonts.heading,
          fontSize: kind === "mobile" ? 24 : 40,
          fontWeight: 700,
          color: colors.ink.black,
          margin: 0,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: kind === "mobile" ? 13 : 16,
            color: colors.ink.muted,
            margin: 0,
            textAlign: "center",
            maxWidth: 480,
            lineHeight: 1.7,
            zIndex: 1,
          }}
        >
          {description}
        </p>
      )}
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 11,
          color: colors.ink.soft,
          marginTop: 8,
          padding: "8px 16px",
          background: colors.surface.white,
          border: `1px dashed ${colors.border.strong}`,
          borderRadius: 8,
          zIndex: 1,
        }}
      >
        قيد التصميم — سيتم استبدالها بالشاشة الفعلية
      </div>
    </div>
  );
}
