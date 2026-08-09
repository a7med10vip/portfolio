import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import BrowserChrome from "../chrome/BrowserChrome";
import PhoneChrome from "../chrome/PhoneChrome";
import { colors, fonts } from "../tokens";
import { MessageCircle } from "@/app/khattaba/design/_components/icons";
import type { Group, Screen } from "./canvasLayout";
import { renderScreen } from "../screens/registry";
import { useComments } from "./CommentsContext";

type Data = { screen: Screen; group: Group };

function ScreenNode({ data }: NodeProps<Data>) {
  const { screen, group } = data;
  const Chrome = screen.kind === "desktop" ? BrowserChrome : PhoneChrome;
  const { open, countFor } = useComments();
  const count = countFor(screen.code);

  return (
    <div style={{ position: "relative" }}>
      {/* Floating label above the chrome */}
      <div
        style={{
          position: "absolute",
          top: -32,
          right: 0,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: fonts.body,
          fontSize: 12,
          color: "rgba(255,255,255,0.65)",
          direction: "rtl",
        }}
      >
        <span
          style={{
            fontFamily: fonts.latin,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1.5,
            padding: "3px 8px",
            borderRadius: 6,
            background: `${group.color}33`,
            color: group.color,
            border: `1px solid ${group.color}55`,
          }}
        >
          {screen.code}
        </span>
        <span style={{ fontWeight: 500, color: "rgba(255,255,255,0.92)" }}>{screen.title}</span>
        <button
          className="nopan nodrag"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); open(screen.code); }}
          title="أضف / اعرض ملاحظة"
          style={{
            display: "inline-flex", alignItems: "center", gap: 5, cursor: "pointer",
            fontFamily: fonts.body, fontSize: 11, fontWeight: 700, lineHeight: 1,
            padding: "4px 9px", borderRadius: 999,
            color: count > 0 ? "#fff" : "rgba(255,255,255,0.8)",
            background: count > 0 ? colors.brand.green : "rgba(255,255,255,0.12)",
            border: count > 0 ? "none" : "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <MessageCircle size={12} />
          {count > 0 ? count : "ملاحظة"}
        </button>
      </div>

      <Chrome height={screen.height}>{renderScreen(screen)}</Chrome>

      {/* Hidden handles let edges connect to any side */}
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <Handle type="source" position={Position.Right} style={handleStyle} />
      <Handle type="target" position={Position.Top} id="top" style={handleStyle} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={handleStyle} />
    </div>
  );
}

const handleStyle = { opacity: 0, pointerEvents: "none" as const };

export default memo(ScreenNode);
