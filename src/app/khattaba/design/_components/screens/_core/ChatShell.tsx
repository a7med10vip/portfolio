import type { ReactNode } from "react";
import { ShieldCheck, Flag, Clock, Send, MoreVertical, ChevronRight } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow } from "../../tokens";
import { CoreShell, coreWrap } from "./CoreShell";

export type Msg = { from: "me" | "them"; text: string; time: string; blocked?: boolean };

const OTHER = { name: "نورة", avatar: "/khattaba/avatars/niqab-woman-brown.png", project: "مشروع خطبة #4821" };

function MessageBubble({ m }: { m: Msg }) {
  const mine = m.from === "me";
  if (m.blocked) {
    return (
      <div style={{ alignSelf: "flex-end", maxWidth: "72%" }}>
        <div style={{ background: colors.accent.redSoft, border: `1px dashed ${colors.accent.red}`, borderRadius: radius.lg, padding: "12px 16px" }}>
          <div style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.muted, textDecoration: "line-through" }}>{m.text}</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 6, fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.accent.red }}>
            <Flag size={11} /> حُجب — محتوى مخالف
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ alignSelf: mine ? "flex-end" : "flex-start", maxWidth: "72%" }}>
      <div style={{ background: mine ? colors.brand.green : colors.surface.white, color: mine ? "#fff" : colors.ink.body, border: mine ? "none" : `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: "11px 16px", fontFamily: fonts.body, fontSize: 14, lineHeight: 1.7, boxShadow: shadow.sm }}>
        {m.text}
      </div>
      <div style={{ fontFamily: fonts.latin, fontSize: 10.5, color: colors.ink.soft, marginTop: 4, textAlign: mine ? "left" : "right" }}>{m.time}</div>
    </div>
  );
}

export function ChatScreen({ messages, durationLabel, banner, ended, children }: { messages: Msg[]; durationLabel: string; banner?: ReactNode; ended?: boolean; children?: ReactNode }) {
  return (
    <CoreShell active="chat">
      <div style={{ ...coreWrap, maxWidth: 820, padding: "24px 28px 32px" }}>
        <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.xl, overflow: "hidden", boxShadow: shadow.md, display: "flex", flexDirection: "column", height: 720 }}>
          {/* header */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderBottom: `1px solid ${colors.border.soft}`, flexShrink: 0 }}>
            <ChevronRight size={20} color={colors.ink.muted} />
            <img src={OTHER.avatar} alt={OTHER.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black }}>{OTHER.name}</div>
              <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.brand.green, fontWeight: 600 }}>{OTHER.project}</div>
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", background: colors.brand.greenSoft, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11.5, fontWeight: 700, color: colors.brand.greenDark }}>
              <ShieldCheck size={13} /> محادثة مراقبة
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: ended ? colors.accent.red : colors.ink.muted }}>
              <Clock size={13} /> {durationLabel}
            </span>
            <button style={{ width: 34, height: 34, borderRadius: radius.md, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Flag size={15} color={colors.accent.red} /></button>
            <button style={{ width: 34, height: 34, borderRadius: radius.md, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><MoreVertical size={15} color={colors.ink.body} /></button>
          </div>

          {/* messages */}
          <div style={{ flex: 1, overflow: "hidden", background: colors.surface.page, padding: 20, display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
            <div style={{ alignSelf: "center", padding: "5px 14px", background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>
              بدأت المحادثة — يُمنع تبادل معلومات التواصل الخارجية
            </div>
            {messages.map((m, i) => (
              <MessageBubble key={i} m={m} />
            ))}
            {children}
          </div>

          {/* banner + input */}
          {banner}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderTop: `1px solid ${colors.border.soft}`, flexShrink: 0, background: colors.surface.white }}>
            <input
              disabled={ended}
              style={{ flex: 1, height: 46, padding: "0 16px", background: ended ? colors.surface.page : colors.surface.white, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 14, color: colors.ink.body, outline: "none", direction: "rtl" }}
              placeholder={ended ? "انتهت مدة المحادثة" : "اكتب رسالتك..."}
            />
            <button style={{ width: 46, height: 46, borderRadius: "50%", background: ended ? colors.border.strong : colors.brand.green, color: "#fff", border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: ended ? "not-allowed" : "pointer", flexShrink: 0 }}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </CoreShell>
  );
}
