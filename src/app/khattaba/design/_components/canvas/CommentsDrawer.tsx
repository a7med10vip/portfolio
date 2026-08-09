"use client";

import { useState } from "react";
import { colors } from "../tokens";
import { screens } from "./canvasLayout";
import { useComments } from "./CommentsContext";

const FONT = "'Ahmed Sans', sans-serif";

function timeLabel(iso: string) {
  try {
    return new Intl.DateTimeFormat("ar-SA", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
  } catch {
    return "";
  }
}

export default function CommentsDrawer() {
  const { active, close, commentsFor, add, ready } = useComments();
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState(false);

  if (!active) return null;
  const screen = screens.find((s) => s.code === active);
  const list = commentsFor(active);

  const submit = async () => {
    if (!body.trim() || sending) return;
    setSending(true); setErr(false);
    const ok = await add(active, author, body);
    setSending(false);
    if (ok) setBody("");
    else setErr(true);
  };

  return (
    <div
      dir="rtl"
      style={{
        position: "absolute", top: 0, insetInlineEnd: 0, bottom: 0, width: 372, maxWidth: "92vw", zIndex: 20,
        background: "#fff", borderInlineStart: `1px solid ${colors.border.soft}`,
        boxShadow: "-14px 0 40px rgba(20,15,25,0.18)", display: "flex", flexDirection: "column", fontFamily: FONT,
      }}
    >
      {/* header */}
      <div style={{ background: colors.brand.greenDark, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
          <span style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 1, color: colors.brand.highlight }}>
            {active} · ملاحظات
          </span>
          <span style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {screen?.title ?? active}
          </span>
        </div>
        <button onClick={close} aria-label="إغلاق" style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(255,255,255,0.14)", border: "none", color: "#fff", fontSize: 18, cursor: "pointer", flexShrink: 0, lineHeight: 1 }}>×</button>
      </div>

      {/* thread */}
      <div style={{ flex: 1, overflowY: "auto", padding: 18, background: colors.surface.page, display: "flex", flexDirection: "column", gap: 12 }}>
        {list.length === 0 ? (
          <div style={{ margin: "auto", textAlign: "center", color: colors.ink.muted, fontFamily: FONT, fontSize: 13.5, lineHeight: 1.8, maxWidth: 240 }}>
            <div style={{ fontSize: 30, marginBottom: 8 }}>🌸</div>
            لا توجد ملاحظات على هذه الشاشة بعد.<br />اكتب ملاحظتك بالأسفل وستُحفظ ليراجعها الفريق.
          </div>
        ) : (
          list.map((c) => (
            <div key={c.id} style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: 14, padding: "12px 14px", boxShadow: "0 2px 8px rgba(20,15,25,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ width: 26, height: 26, borderRadius: "50%", background: colors.brand.greenSoft, color: colors.brand.green, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                  {(c.author?.trim()?.[0] ?? "ع")}
                </span>
                <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>{c.author?.trim() || "العميل"}</span>
                <span style={{ marginInlineStart: "auto", fontFamily: FONT, fontSize: 11, color: colors.ink.soft }}>{timeLabel(c.created_at)}</span>
              </div>
              <p style={{ fontFamily: FONT, fontSize: 13.5, lineHeight: 1.75, color: colors.ink.body, margin: 0, whiteSpace: "pre-wrap" }}>{c.body}</p>
            </div>
          ))
        )}
      </div>

      {/* composer */}
      <div style={{ borderTop: `1px solid ${colors.border.soft}`, padding: 14, background: "#fff", display: "flex", flexDirection: "column", gap: 9 }}>
        {!ready && (
          <span style={{ fontFamily: FONT, fontSize: 11.5, color: colors.accent.amber, fontWeight: 600 }}>
            ⚠️ لم يُفعّل التخزين بعد — لن تُحفظ الملاحظة حتى يُجهّز الجدول.
          </span>
        )}
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="اسمك (اختياري)"
          style={{ width: "100%", height: 38, padding: "0 12px", boxSizing: "border-box", fontFamily: FONT, fontSize: 13, color: colors.ink.body, background: colors.surface.page, border: `1px solid ${colors.border.default}`, borderRadius: 10, outline: "none", direction: "rtl" }}
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="اكتب ملاحظتك على هذه الشاشة…"
          rows={3}
          style={{ width: "100%", padding: "10px 12px", boxSizing: "border-box", fontFamily: FONT, fontSize: 13.5, lineHeight: 1.7, color: colors.ink.body, background: colors.surface.page, border: `1px solid ${colors.border.default}`, borderRadius: 10, outline: "none", resize: "none", direction: "rtl" }}
        />
        {err && <span style={{ fontFamily: FONT, fontSize: 12, color: colors.accent.red }}>تعذّر الحفظ — حاول مرة أخرى.</span>}
        <button
          onClick={submit}
          disabled={!body.trim() || sending}
          style={{ height: 44, background: body.trim() && !sending ? colors.brand.green : colors.border.strong, color: "#fff", border: "none", borderRadius: 11, fontFamily: FONT, fontSize: 14.5, fontWeight: 700, cursor: body.trim() && !sending ? "pointer" : "default", transition: "background .15s" }}
        >
          {sending ? "…جارٍ الحفظ" : "إرسال الملاحظة"}
        </button>
      </div>
    </div>
  );
}
