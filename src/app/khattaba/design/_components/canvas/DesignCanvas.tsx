"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  useReactFlow,
  type NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import { Palette, ChevronDown } from "@/app/khattaba/design/_components/icons";
import { colors } from "../tokens";
import { buildCanvas, groups, screens } from "./canvasLayout";
import ScreenNode from "./ScreenNode";
import GroupLabel from "./GroupLabel";
import { CommentsProvider } from "./CommentsContext";
import CommentsDrawer from "./CommentsDrawer";

const nodeTypes: NodeTypes = {
  screen: ScreenNode,
  groupLabel: GroupLabel,
};

const FONT = "'Ahmed Sans', sans-serif";

/* منيو تنقّل تفاعلي: الأقسام تتفتح على شاشاتها، والنقر يطير للكانفس على
 * القسم/الشاشة ويقرّب لها لحد ما المحتوى يبان. */
function CanvasMenu() {
  const { fitView } = useReactFlow();
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const activeGroups = useMemo(() => groups.filter((g) => screens.some((s) => s.groupId === g.id)), []);

  const flyGroup = (gid: string) => {
    const ids = screens.filter((s) => s.groupId === gid).map((s) => ({ id: s.code }));
    if (ids.length) fitView({ nodes: ids, duration: 700, padding: 0.16, maxZoom: 0.55 });
  };
  const flyScreen = (code: string) => fitView({ nodes: [{ id: code }], duration: 700, padding: 0.3, maxZoom: 1.15 });

  return (
    <div style={{ width: 268, background: "#fff", borderRadius: 16, border: `1px solid ${colors.border.soft}`, boxShadow: "0 12px 34px rgba(0,0,0,0.22)", overflow: "hidden", direction: "rtl", fontFamily: FONT }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "13px 16px", background: colors.brand.green, border: "none", cursor: "pointer" }}
      >
        <span style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 700, color: "#fff" }}>التنقّل بين الأقسام</span>
        <span style={{ display: "inline-flex", transform: open ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform .2s", color: "#fff" }}>
          <ChevronDown size={16} />
        </span>
      </button>

      {open && (
        <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {activeGroups.map((g) => {
            const gs = screens.filter((s) => s.groupId === g.id);
            const isExp = expanded === g.id;
            return (
              <div key={g.id} style={{ borderTop: `1px solid ${colors.border.soft}` }}>
                <button
                  onClick={() => { setExpanded(isExp ? null : g.id); flyGroup(g.id); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: isExp ? `${g.color}12` : "#fff", border: "none", cursor: "pointer", textAlign: "right" }}
                >
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: g.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontFamily: FONT, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>{g.ar}</span>
                  <span style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: 11, fontWeight: 700, color: g.color, background: `${g.color}16`, borderRadius: 999, padding: "1px 8px" }}>{gs.length}</span>
                  <span style={{ display: "inline-flex", transform: isExp ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform .2s", color: colors.ink.soft }}>
                    <ChevronDown size={14} />
                  </span>
                </button>
                {isExp && (
                  <div style={{ background: colors.surface.page, paddingBottom: 4 }}>
                    {gs.map((s) => (
                      <button
                        key={s.code}
                        onClick={() => flyScreen(s.code)}
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "7px 14px 7px 12px", background: "transparent", border: "none", cursor: "pointer", textAlign: "right" }}
                      >
                        <span style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: 9.5, fontWeight: 700, color: g.color, background: "#fff", border: `1px solid ${g.color}40`, borderRadius: 5, padding: "2px 6px", minWidth: 34, textAlign: "center", flexShrink: 0 }}>{s.code}</span>
                        <span style={{ flex: 1, fontFamily: FONT, fontSize: 12, fontWeight: 500, color: colors.ink.body, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Inner() {
  const { nodes, edges } = useMemo(() => buildCanvas(), []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.15, maxZoom: 0.4, minZoom: 0.02 }}
      minZoom={0.02}
      maxZoom={1.5}
      proOptions={{ hideAttribution: true }}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={true}
      panOnDrag
      panOnScroll
      zoomOnScroll={false}
      zoomOnPinch
      zoomOnDoubleClick
      onlyRenderVisibleElements
      defaultEdgeOptions={{ type: "smoothstep" }}
    >
      <Background
        variant={BackgroundVariant.Dots}
        gap={28}
        size={1.4}
        color="rgba(255,255,255,0.10)"
      />
      <Controls
        showInteractive={false}
        style={{
          background: "#22262E",
          border: `1px solid rgba(255,255,255,0.08)`,
          borderRadius: 8,
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          color: "#fff",
        }}
      />
      <MiniMap
        pannable
        zoomable
        nodeColor={(n) => {
          if (n.type === "groupLabel") {
            const g = groups.find((g) => `group-${g.id}` === n.id);
            return g?.color ?? colors.ink.soft;
          }
          return colors.brand.highlight;
        }}
        maskColor="rgba(0,0,0,0.55)"
        nodeBorderRadius={4}
        style={{
          background: "#22262E",
          border: `1px solid rgba(255,255,255,0.08)`,
          borderRadius: 8,
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}
      />
      <Panel position="top-left">
        <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
          <div
            style={{
              background: colors.surface.white,
              border: `1px solid ${colors.border.soft}`,
              borderRadius: 12,
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              direction: "rtl",
              fontFamily: "'Ahmed Sans', sans-serif",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            <span style={{ fontSize: 18 }}>🎨</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: colors.ink.black }}>
                KH1 Design Board
              </span>
              <span style={{ fontSize: 10, fontWeight: 600, color: colors.ink.muted, letterSpacing: 1 }}>
                {screens.length} SCREENS · {groups.filter((g) => screens.some((s) => s.groupId === g.id)).length} GROUPS · v0.3
              </span>
            </div>
          </div>
          <Link
            href="/khattaba/design/system"
            style={{
              background: colors.brand.green,
              color: "#fff",
              borderRadius: 12,
              padding: "0 18px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Ahmed Sans', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}
          >
            <Palette size={16} />
            <span>Design System</span>
          </Link>
        </div>
      </Panel>

      <Panel position="top-right">
        <CanvasMenu />
      </Panel>
    </ReactFlow>
      <CommentsDrawer />
    </div>
  );
}

export default function DesignCanvas() {
  return (
    <ReactFlowProvider>
      <CommentsProvider>
        <Inner />
      </CommentsProvider>
    </ReactFlowProvider>
  );
}
