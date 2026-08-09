import { colors, fonts } from "../../_components/tokens";

type Props = {
  num: string;
  eyebrow: string;
  title: string;
  description?: string;
  accentColor?: string;
};

export default function SectionHeader({
  num, eyebrow, title, description, accentColor = colors.brand.green,
}: Props) {
  return (
    <header style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: 11,
            fontWeight: 700,
            color: accentColor,
            padding: "2px 8px",
            background: `${accentColor}14`,
            borderRadius: 6,
          }}
        >
          {num}
        </span>
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: 12,
            fontWeight: 600,
            color: colors.ink.muted,
          }}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        style={{
          fontFamily: fonts.heading,
          fontSize: 30,
          fontWeight: 600,
          color: colors.ink.black,
          margin: 0,
          lineHeight: 1.3,
          letterSpacing: 0,
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: 14,
            color: colors.ink.muted,
            margin: 0,
            lineHeight: 1.7,
            maxWidth: 640,
          }}
        >
          {description}
        </p>
      )}
    </header>
  );
}
