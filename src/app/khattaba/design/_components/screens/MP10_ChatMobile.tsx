import { ShieldCheck, Flag, Clock, Send, ChevronRight, MoreVertical } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";

/* MP10 · الشات المراقب (موبايل) */
type Msg = { from: "me" | "them" | "admin"; text: string; time: string };
const msgs: Msg[] = [
  { from: "them", text: "السلام عليكم، شكراً لتواصلك.", time: "10:02" },
  { from: "me", text: "وعليكم السلام، تشرفت.", time: "10:04" },
  { from: "them", text: "ما رأيك في السكن بعد الزواج؟", time: "10:05" },
  { from: "admin", text: "تنبيه: التزموا بالضوابط — لا تتبادلوا وسائل تواصل خارجية.", time: "10:06" },
  { from: "me", text: "أفضّل سكن مستقل يحفظ خصوصية الأسرة.", time: "10:07" },
];

export default function MP10ChatMobile() {
  return (
    <MobileScreen padTop={50} bg={colors.surface.page}>
      {/* header */}
      <div style={{ height: 64, background: "#fff", borderBottom: `1px solid ${colors.border.soft}`, padding: "0 12px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <button style={{ width: 34, height: 34, borderRadius: 8, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><ChevronRight size={15} /></button>
        <img src="/khattaba/avatars/niqab-woman-brown.png" alt="نورة" style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover" }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>نورة</div>
          <div style={{ fontFamily: fonts.body, fontSize: 10.5, color: colors.brand.green, fontWeight: 600 }}>مشروع خطبة #4821</div>
        </div>
        <button style={{ width: 32, height: 32, borderRadius: 8, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Flag size={14} color={colors.accent.red} /></button>
        <button style={{ width: 32, height: 32, borderRadius: 8, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><MoreVertical size={14} /></button>
      </div>

      {/* meta bar */}
      <div style={{ background: colors.brand.greenSoft, padding: "6px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.brand.greenDark, flexShrink: 0 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><ShieldCheck size={12} /> محادثة مراقبة</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Clock size={12} /> متبقٍ ٢٨ يوم</span>
      </div>

      {/* messages */}
      <div style={{ flex: 1, padding: 14, display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
        <div style={{ alignSelf: "center", padding: "4px 12px", background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted }}>
          يُمنع تبادل معلومات التواصل الخارجية
        </div>
        {msgs.map((m, i) => {
          if (m.from === "admin") {
            return (
              <div key={i} style={{ alignSelf: "center", background: colors.accent.amberSoft, border: `1px solid ${colors.accent.amber}55`, borderRadius: radius.md, padding: "7px 12px", maxWidth: "84%" }}>
                <div style={{ fontFamily: fonts.body, fontSize: 9.5, fontWeight: 700, color: colors.accent.amber, marginBottom: 2 }}>الإدارة · تدخّل</div>
                <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.body, lineHeight: 1.6 }}>{m.text}</div>
              </div>
            );
          }
          const mine = m.from === "me";
          return (
            <div key={i} style={{ alignSelf: mine ? "flex-end" : "flex-start", maxWidth: "78%" }}>
              <div style={{ background: mine ? colors.brand.green : "#fff", color: mine ? "#fff" : colors.ink.body, border: mine ? "none" : `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: "9px 13px", fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.6, boxShadow: shadow.sm }}>{m.text}</div>
              <div style={{ fontFamily: fonts.latin, fontSize: 9.5, color: colors.ink.soft, marginTop: 3, textAlign: mine ? "left" : "right" }}>{m.time}</div>
            </div>
          );
        })}
      </div>

      {/* input */}
      <div style={{ padding: "10px 12px 22px", background: "#fff", borderTop: `1px solid ${colors.border.soft}`, display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <input style={{ flex: 1, height: 42, padding: "0 14px", background: colors.surface.page, border: `1px solid ${colors.border.default}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 13, outline: "none", direction: "rtl" }} placeholder="اكتب رسالتك..." />
        <button style={{ width: 42, height: 42, background: colors.brand.green, color: "#fff", border: "none", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Send size={16} /></button>
      </div>
    </MobileScreen>
  );
}
