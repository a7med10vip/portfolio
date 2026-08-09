import { ReactNode } from "react";
import { colors, canvas } from "../tokens";
import { CellSignal, WifiFull, Battery } from "../icons";

type Props = {
  children: ReactNode;
  width?: number;
  height?: number;
};

export default function PhoneChrome({
  children,
  width = canvas.screen.mobile.w,
  height = canvas.screen.mobile.h,
}: Props) {
  const bezel = canvas.chrome.phoneBezel;
  const notchH = canvas.chrome.phoneNotch;
  const frameW = width + bezel * 2;
  const frameH = height + bezel * 2;

  return (
    <div
      style={{
        width: frameW,
        height: frameH,
        background: "#1A1A1A",
        borderRadius: 56,
        padding: bezel,
        boxShadow:
          "0 30px 80px rgba(0,0,0,0.20), 0 8px 24px rgba(0,0,0,0.10), inset 0 0 0 2px #2a2a2a",
        position: "relative",
      }}
    >
      <div
        style={{
          width,
          height,
          background: colors.surface.white,
          borderRadius: 44,
          overflow: "hidden",
          direction: "rtl",
          position: "relative",
        }}
      >
        {/* Dynamic Island notch */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 110,
            height: notchH,
            background: "#0A0A0A",
            borderRadius: notchH / 2,
            zIndex: 50,
          }}
        />
        {/* Status bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 50,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 28px 0",
            fontSize: 13,
            fontWeight: 600,
            color: colors.ink.black,
            zIndex: 49,
            direction: "ltr",
          }}
        >
          <span style={{ fontFamily: "var(--font-poppins), 'Poppins', system-ui, sans-serif", fontWeight: 700 }}>9:41</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <CellSignal size={15} color={colors.ink.black} weight="fill" />
            <WifiFull size={15} color={colors.ink.black} weight="fill" />
            <Battery size={17} color={colors.ink.black} weight="fill" />
          </span>
        </div>
        {/* Content area */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
