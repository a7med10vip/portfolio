import { Send, Clock, ShieldCheck, MessageCircle, Search, MoreVertical, AlertTriangle } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow } from "../tokens";
import { AdminShell, card, StatusPill } from "./_admin/AdminShell";

/* A03 · مراقبة المحادثات — قراءة + تدخل الإدارة كطرف ثالث */

const chats = [
  { id: "#4821", a: "محمد", b: "نورة", lastMsg: "أتفق معك، وأرى أننا جاهزون...", time: "10:34", duration: "متبقٍ 28 يوم", flagged: false, active: true },
  { id: "#4790", a: "خالد", b: "سارة", lastMsg: "ما رأيك في الأهداف العائلية؟", time: "09:12", duration: "متبقٍ 12 يوم", flagged: false },
  { id: "#4762", a: "فهد", b: "ريم", lastMsg: "كانت رسالة محجوبة...", time: "أمس", duration: "متبقٍ 5 أيام", flagged: true },
  { id: "#4731", a: "عبدالله", b: "لطيفة", lastMsg: "اتفقنا، شكراً", time: "أمس", duration: "انتهت", flagged: false },
  { id: "#4702", a: "بدر", b: "أمل", lastMsg: "السلام عليكم...", time: "29 مايو", duration: "متبقٍ 18 يوم", flagged: false },
];

const messages = [
  { from: "them", text: "السلام عليكم، شكراً لتواصلك.", time: "10:02" },
  { from: "me", text: "وعليكم السلام، تشرفت.", time: "10:04" },
  { from: "them", text: "ما رأيك في السكن بعد الزواج؟", time: "10:05" },
  { from: "admin", text: "تنبيه من الإدارة: التزموا بالضوابط — لا تتبادلوا وسائل تواصل خارجية.", time: "10:06" },
  { from: "me", text: "أفضّل سكن مستقل يحفظ خصوصية الأسرة.", time: "10:07" },
];

function ChatRow({ c, active }: { c: (typeof chats)[number]; active?: boolean }) {
  return (
    <div style={{ padding: "14px 14px", borderInlineStart: `3px solid ${active ? colors.brand.green : "transparent"}`, background: active ? colors.brand.greenSoft : "transparent", borderBottom: `1px solid ${colors.border.soft}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: radius.md, background: c.flagged ? colors.accent.redSoft : colors.brand.greenSoft, color: c.flagged ? colors.accent.red : colors.brand.green, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
        {c.a[0]}{c.b[0]}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>
            مشروع خطبة <span style={{ fontFamily: fonts.latin }}>{c.id}</span>
          </div>
          <span style={{ fontFamily: fonts.latin, fontSize: 10.5, color: colors.ink.muted }}>{c.time}</span>
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginTop: 2 }}>{c.a} ↔ {c.b}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
          {c.flagged && <AlertTriangle size={12} color={colors.accent.red} />}
          <span style={{ fontFamily: fonts.body, fontSize: 11.5, color: c.flagged ? colors.accent.red : colors.ink.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{c.lastMsg}</span>
        </div>
      </div>
    </div>
  );
}

export default function A03ChatMonitor() {
  return (
    <AdminShell active="chats" title="مراقبة المحادثات" breadcrumb={["لوحة التحكم", "مراقبة المحادثات"]}>
      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 16 }}>
        {/* list */}
        <div style={{ ...card, padding: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: 14, borderBottom: `1px solid ${colors.border.soft}` }}>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }} />
              <input style={{ width: "100%", height: 38, paddingInlineStart: 34, background: colors.surface.page, border: `1px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, color: colors.ink.body, outline: "none", direction: "rtl" }} placeholder="ابحث برقم المشروع أو الاسم..." />
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              <span style={{ padding: "4px 10px", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11, fontWeight: 700, background: colors.brand.green, color: "#fff" }}>الكل · 186</span>
              <span style={{ padding: "4px 10px", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11, fontWeight: 600, background: colors.surface.page, color: colors.ink.body }}>مُبلَّغ عنها · 4</span>
              <span style={{ padding: "4px 10px", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11, fontWeight: 600, background: colors.surface.page, color: colors.ink.body }}>منتهية · 24</span>
            </div>
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            {chats.map((c) => <ChatRow key={c.id} c={c} active={c.active} />)}
          </div>
        </div>

        {/* preview */}
        <div style={{ ...card, padding: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${colors.border.soft}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black }}>مشروع خطبة #4821</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
                <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>محمد الأحمدي ↔ نورة العتيبي</span>
                <StatusPill kind="success" label="نشطة" />
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted }}><Clock size={12} /> متبقٍ 28 يوم</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ height: 34, padding: "0 12px", background: colors.surface.white, color: colors.ink.body, border: `1px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 12, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}><Clock size={13} /> تمديد</button>
              <button style={{ height: 34, padding: "0 12px", background: colors.surface.white, color: colors.accent.red, border: `1px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>إنهاء المحادثة</button>
              <button style={{ width: 34, height: 34, background: colors.surface.white, color: colors.ink.body, border: `1px solid ${colors.border.default}`, borderRadius: radius.md, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><MoreVertical size={14} /></button>
            </div>
          </div>

          <div style={{ flex: 1, background: colors.surface.page, padding: 18, display: "flex", flexDirection: "column", gap: 10, height: 380, overflow: "hidden" }}>
            {messages.map((m, i) => {
              if (m.from === "admin") {
                return (
                  <div key={i} style={{ alignSelf: "center", background: colors.accent.amberSoft, border: `1px solid ${colors.accent.amber}55`, borderRadius: radius.md, padding: "8px 14px", maxWidth: "80%" }}>
                    <div style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.accent.amber, marginBottom: 2 }}>الإدارة · تدخّل</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.body }}>{m.text}</div>
                  </div>
                );
              }
              const mine = m.from === "me";
              return (
                <div key={i} style={{ alignSelf: mine ? "flex-end" : "flex-start", maxWidth: "70%" }}>
                  <div style={{ background: mine ? colors.brand.green : colors.surface.white, color: mine ? "#fff" : colors.ink.body, border: mine ? "none" : `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: "9px 14px", fontFamily: fonts.body, fontSize: 13, lineHeight: 1.6, boxShadow: shadow.sm }}>{m.text}</div>
                  <div style={{ fontFamily: fonts.latin, fontSize: 10, color: colors.ink.soft, marginTop: 3, textAlign: mine ? "left" : "right" }}>{m.time}</div>
                </div>
              );
            })}
          </div>

          <div style={{ padding: "12px 16px", borderTop: `1px solid ${colors.border.soft}`, background: colors.accent.amberSoft, display: "flex", alignItems: "center", gap: 10 }}>
            <ShieldCheck size={17} color={colors.accent.amber} />
            <input style={{ flex: 1, height: 40, padding: "0 14px", background: colors.surface.white, border: `1.5px solid ${colors.accent.amber}55`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, color: colors.ink.body, outline: "none", direction: "rtl" }} placeholder="رسالة من الإدارة كطرف ثالث..." />
            <button style={{ height: 40, padding: "0 18px", background: colors.accent.amber, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><Send size={14} /> تدخّل</button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
