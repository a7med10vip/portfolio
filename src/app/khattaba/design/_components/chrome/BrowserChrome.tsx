import { ReactNode } from "react";
import { colors, canvas, radius } from "../tokens";

type Props = {
  url?: string;
  children: ReactNode;
  width?: number;
  height?: number;
};

export default function BrowserChrome({
  url = "kh1-ksa.com.sa",
  children,
  width = canvas.screen.desktop.w,
  height = canvas.screen.desktop.h,
}: Props) {
  const barH = canvas.chrome.desktopBar;

  return (
    <div
      style={{
        width,
        minHeight: height + barH,
        background: colors.surface.white,
        borderRadius: radius.lg,
        boxShadow: "0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.04)",
        overflow: "hidden",
        border: `1px solid ${colors.border.soft}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: barH,
          background: "#F4F4F5",
          borderBottom: `1px solid ${colors.border.soft}`,
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <span style={dot("#FF5F57")} />
          <span style={dot("#FEBC2E")} />
          <span style={dot("#28C840")} />
        </div>
        <div
          style={{
            flex: 1,
            background: colors.surface.white,
            borderRadius: 6,
            height: 22,
            margin: "0 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            color: colors.ink.muted,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            border: `1px solid ${colors.border.soft}`,
          }}
        >
          {url}
        </div>
      </div>
      <div
        style={{
          minHeight: height,
          width: "100%",
          background: colors.surface.white,
          direction: "rtl",
        }}
      >
        {children}
      </div>
    </div>
  );
}

const dot = (color: string) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: color,
  display: "inline-block",
});
