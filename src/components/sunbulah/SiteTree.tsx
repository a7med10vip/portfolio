"use client";

import { useMemo, useState } from "react";
import {
  NODE_COLOR, NODE_LABEL, PAGE_GROUPS, type NodeState, type PageNode,
} from "@/app/sunbulah/data";
import { S, D, LINE, RULE, ZEBRA } from "./theme";
import { TREE_ICON } from "./icons";

/**
 * صفحات الموقع مجموعة بالوظيفة، لا كشجرة متشعبة.
 *
 * الشجرة السابقة كانت تعرض البنية وتخفي المعنى، وتطول حتى تمل. المجموعات
 * تعرض المعنى في نظرة: شريط المنتجات أخضر بالكامل، وشريط العلامات ليس فيه
 * أخضر واحد. والفلتر يجعل السؤال «أرني المعطل فقط» ضغطة واحدة.
 */
const STATES: NodeState[] = ["ok", "thin", "orphan", "missing", "broken"];

export default function SiteMap() {
  const [filter, setFilter] = useState<NodeState | "all">("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    PAGE_GROUPS.forEach((g) => g.pages.forEach((p) => { c[p.state] = (c[p.state] ?? 0) + 1; }));
    return c;
  }, []);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const shown = PAGE_GROUPS.map((g) => ({
    ...g,
    pages: filter === "all" ? g.pages : g.pages.filter((p) => p.state === filter),
  }));
  const visible = shown.reduce((a, g) => a + g.pages.length, 0);

  return (
    <div className="max-w-5xl mx-auto">
      {/* الفلتر */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        <Pill active={filter === "all"} onClick={() => setFilter("all")} colour={S} label="الكل" count={total} />
        {STATES.map((k) => (
          <Pill key={k} active={filter === k} onClick={() => setFilter(k)}
            colour={NODE_COLOR[k]} label={NODE_LABEL[k]} count={counts[k] ?? 0} state={k} />
        ))}
      </div>
      <p className="ar-body text-[12px] text-center mb-10" style={{ color: D, opacity: .55 }}>
        {filter === "all"
          ? `${total} صفحة، منها ${counts.missing ?? 0} غير موجودة أصلا`
          : `${visible} من ${total} صفحة`}
      </p>

      {/* المجموعات */}
      <div className="grid gap-4 lg:grid-cols-2">
        {shown.map((g) => {
          if (!g.pages.length) return null;
          const all = PAGE_GROUPS.find((x) => x.key === g.key)!.pages;
          return (
            <section key={g.key} className="sb-item rounded-[18px] overflow-hidden"
              style={{ border: `1px solid ${LINE}`, background: "#fff" }}>
              <header className="px-5 py-4" style={{ background: ZEBRA, borderBottom: `1px solid ${RULE}` }}>
                <div className="flex items-baseline justify-between gap-3 mb-3">
                  <h4 className="ar-heading text-[16px]" style={{ color: D }}>{g.label}</h4>
                  <span className="ar-body text-[12px] ltr" style={{ color: S }}>{all.length}</span>
                </div>
                {/* شريط يلخص مزيج الحالات في المجموعة قبل قراءة أي اسم */}
                <div className="flex rounded-full overflow-hidden mb-3" style={{ height: 5 }}>
                  {STATES.map((k) => {
                    const n = all.filter((p) => p.state === k).length;
                    if (!n) return null;
                    return <span key={k} style={{ width: `${(n / all.length) * 100}%`, background: NODE_COLOR[k] }} />;
                  })}
                </div>
                <p className="ar-body text-[12px] leading-loose" style={{ color: D, opacity: .68 }}>{g.verdict}</p>
              </header>

              <div className="px-5 py-4 flex flex-wrap gap-2">
                {g.pages.map((p) => <Chip key={p.path} page={p} />)}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function Pill({ active, onClick, colour, label, count, state }: {
  active: boolean; onClick: () => void; colour: string; label: string; count: number; state?: NodeState;
}) {
  const Icon = state ? TREE_ICON[state] : null;
  return (
    <button onClick={onClick}
      className="inline-flex items-center gap-2 px-4 rounded-full ar-body text-[12px] transition-colors"
      style={{
        minHeight: 44,
        background: active ? colour : "#fff",
        color: active ? "#fff" : D,
        border: `1px solid ${active ? colour : LINE}`,
      }}>
      {Icon && <Icon size={12} color={active ? "#fff" : colour} />}
      {label}
      <span className="ltr" style={{ opacity: active ? .85 : .5, fontWeight: 600 }}>{count}</span>
    </button>
  );
}

function Chip({ page }: { page: PageNode }) {
  const [open, setOpen] = useState(false);
  const c = NODE_COLOR[page.state];
  const Icon = TREE_ICON[page.state];
  const gone = page.state === "missing";
  return (
    <span className="relative inline-block">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 px-3.5 rounded-lg ar-body text-[12.5px] text-right"
        style={{
          minHeight: 44,
          background: `${c}0F`,
          color: D,
          border: `1px solid ${c}33`,
          textDecoration: gone ? "line-through" : "none",
          opacity: gone ? .75 : 1,
        }}>
        <Icon size={11} color={c} />
        {page.label}
      </button>
      {open && (
        <span className="absolute z-40 block text-right ar-body"
          style={{
            bottom: "calc(100% + 8px)", right: 0, width: 250, background: "#fff",
            border: `1px solid ${LINE}`, borderRadius: 12, padding: "12px 14px",
          }}>
          <span className="block text-[11px] ltr mb-1.5" style={{ color: D, opacity: .5, direction: "ltr", textAlign: "left" }}>
            {page.path}
          </span>
          <span className="block text-[11.5px] mb-1" style={{ color: c }}>{NODE_LABEL[page.state]}</span>
          {page.note && (
            <span className="block text-[12px] leading-loose" style={{ color: D, opacity: .75 }}>{page.note}</span>
          )}
        </span>
      )}
    </span>
  );
}
