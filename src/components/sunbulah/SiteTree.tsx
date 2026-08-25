"use client";

import { useState } from "react";
import { NODE_COLOR, NODE_LABEL, SITE_TREE, type TreeNode } from "@/app/sunbulah/data";
import { S, D, LINE, MONO } from "./theme";

/**
 * الموقع كشجرة، بفروعه الموجودة والمفقودة معًا.
 *
 * قائمة الصفحات تقول اثنتين وعشرين صفحة ولا تقول أين الفراغ. الشجرة تقوله:
 * فرع المنتجات ثقيل باثنتي عشرة ورقة، وفرع العلامات — وهو ما قامت عليه
 * المجموعة — بلا جذع أصلًا.
 */
export default function SiteTree() {
  const [open, setOpen] = useState<Set<string>>(new Set(["/", "/products.html", "/brands.html", "/careers.html"]));
  const toggle = (p: string) =>
    setOpen((s) => {
      const n = new Set(s);
      n.has(p) ? n.delete(p) : n.add(p);
      return n;
    });

  const counts = countStates(SITE_TREE);

  return (
    <div className="max-w-4xl mx-auto">
      {/* المفتاح */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-9">
        {(Object.keys(NODE_LABEL) as (keyof typeof NODE_LABEL)[]).map((k) => (
          <span key={k} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11.5px]"
            style={{ border: `1px solid ${NODE_COLOR[k]}44`, color: D }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: NODE_COLOR[k] }} />
            {NODE_LABEL[k]}
            <span className="ltr" style={{ color: NODE_COLOR[k] }}>{counts[k] ?? 0}</span>
          </span>
        ))}
      </div>

      <div className="rounded-[20px] px-5 py-6 md:px-8 md:py-8" style={{ border: `1px solid ${LINE}`, background: "#fff" }}>
        {SITE_TREE.map((n) => (
          <Branch key={n.path} node={n} depth={0} open={open} toggle={toggle} last />
        ))}
      </div>
    </div>
  );
}

function Branch({ node, depth, open, toggle, last }: {
  node: TreeNode; depth: number; open: Set<string>; toggle: (p: string) => void; last: boolean;
}) {
  const kids = node.children ?? [];
  const isOpen = open.has(node.path);
  const c = NODE_COLOR[node.state];

  return (
    <div style={{ position: "relative" }}>
      <div className="flex items-start gap-2.5 py-1.5" style={{ paddingRight: depth ? 22 : 0 }}>
        {/* وصلة الفرع */}
        {depth > 0 && (
          <>
            <span aria-hidden style={{
              position: "absolute", right: 8, top: 0,
              height: last ? 17 : "100%", width: 1, background: LINE,
            }} />
            <span aria-hidden style={{
              position: "absolute", right: 8, top: 17, width: 13, height: 1, background: LINE,
            }} />
          </>
        )}

        <button
          onClick={() => kids.length && toggle(node.path)}
          className="flex items-start gap-2.5 text-right flex-1 min-w-0"
          style={{ cursor: kids.length ? "pointer" : "default" }}
        >
          <span className="shrink-0 mt-[7px] rounded-sm" style={{ width: 9, height: 9, background: c }} />
          <span className="min-w-0 flex-1">
            <span className="flex items-baseline gap-2 flex-wrap">
              <span className="text-[13.5px]" style={{ color: D, textDecoration: node.state === "missing" ? "line-through" : "none", opacity: node.state === "missing" ? .55 : 1 }}>
                {node.label}
              </span>
              <span className="text-[11px] ltr" style={{ color: D, opacity: .38, fontFamily: MONO }}>{node.path}</span>
              {kids.length > 0 && (
                <span className="text-[10.5px] px-1.5 rounded ltr" style={{ background: `${S}12`, color: S }}>
                  {isOpen ? "−" : "+"}{kids.length}
                </span>
              )}
            </span>
            {node.note && (
              <span className="block text-[11.5px] mt-1 leading-loose" style={{ color: c }}>{node.note}</span>
            )}
          </span>
        </button>
      </div>

      {isOpen && kids.map((k, i) => (
        <Branch key={k.path} node={k} depth={depth + 1} open={open} toggle={toggle} last={i === kids.length - 1} />
      ))}
    </div>
  );
}

function countStates(nodes: TreeNode[], acc: Record<string, number> = {}) {
  for (const n of nodes) {
    acc[n.state] = (acc[n.state] ?? 0) + 1;
    if (n.children) countStates(n.children, acc);
  }
  return acc;
}
