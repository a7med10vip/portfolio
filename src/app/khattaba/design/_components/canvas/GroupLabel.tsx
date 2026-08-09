import { memo } from "react";
import type { NodeProps } from "reactflow";
import { fonts } from "../tokens";
import type { Group } from "./canvasLayout";

type Data = Group & { count: number };

/* رأس قسم "شيك" — رقم القسم بخط السيريف بلون القسم، شريط لوني رفيع،
 * عنوان عربي + eyebrow لاتيني + سطر تعريفي + عدّاد الشاشات. على خلفية
 * اللوحة الغامقة، بلمسة توهّج خفيفة بلون القسم لتمييزه عن باقي الأقسام. */
function GroupLabel({ data }: NodeProps<Data>) {
  const idx = String(data.order).padStart(2, "0");
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 0,
        direction: "rtl",
        background: "#1B1F26",
        border: `1px solid ${data.color}38`,
        borderRadius: 18,
        boxShadow: `0 10px 34px ${data.color}22, 0 2px 10px rgba(0,0,0,0.35)`,
        minWidth: 440,
        overflow: "hidden",
      }}
    >
      {/* الرقم الكبير + شريط لوني */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "20px 26px",
          background: `linear-gradient(90deg, ${data.color}1F, transparent)`,
        }}
      >
        <span
          style={{
            fontFamily: fonts.latin,
            fontSize: 46,
            fontWeight: 700,
            lineHeight: 1,
            color: data.color,
            letterSpacing: -1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {idx}
        </span>
        <span
          aria-hidden
          style={{
            width: 3,
            alignSelf: "stretch",
            margin: "4px 0",
            borderRadius: 2,
            background: data.color,
          }}
        />
      </div>

      {/* النصوص */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5,
          padding: "18px 22px 18px 26px",
        }}
      >
        <span
          style={{
            fontFamily: fonts.latin,
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: 2.4,
            textTransform: "uppercase",
            color: data.color,
          }}
        >
          {data.icon}&nbsp;&nbsp;{data.en}
        </span>
        <span
          style={{
            fontFamily: fonts.heading,
            fontSize: 23,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.15,
          }}
        >
          {data.ar}
        </span>
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: 12.5,
            fontWeight: 500,
            color: "rgba(255,255,255,0.52)",
            lineHeight: 1.4,
          }}
        >
          {data.tagline}
        </span>
      </div>

      {/* عدّاد الشاشات */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          padding: "0 24px",
          borderInlineStart: `1px solid ${data.color}24`,
          background: `${data.color}10`,
        }}
      >
        <span
          style={{
            fontFamily: fonts.latin,
            fontSize: 26,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {data.count}
        </span>
        <span
          style={{
            fontFamily: fonts.latin,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: 1.5,
            color: data.color,
          }}
        >
          {data.count === 1 ? "SCREEN" : "SCREENS"}
        </span>
      </div>
    </div>
  );
}

export default memo(GroupLabel);
