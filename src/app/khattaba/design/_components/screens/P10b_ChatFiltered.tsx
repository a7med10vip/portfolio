import { AlertTriangle } from "@/app/khattaba/design/_components/icons";
import { colors, fonts } from "../tokens";
import { ChatScreen, type Msg } from "./_core/ChatShell";

/* P10b · الشات المراقب — تحذير حجب محتوى مخالف */
const messages: Msg[] = [
  { from: "them", text: "كان حديثاً طيباً، أرتاح للتواصل معك أكثر.", time: "10:31" },
  { from: "me", text: "وأنا كذلك، تواصلي معي على ٠٥٥١٢٣٤٥٦٧", time: "10:33", blocked: true },
];

const banner = (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 18px", background: colors.accent.redSoft, borderTop: `1px solid ${colors.accent.red}40` }}>
    <AlertTriangle size={17} color={colors.accent.red} style={{ flexShrink: 0, marginTop: 1 }} />
    <p style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.7, color: colors.ink.body, margin: 0 }}>
      تم حجب رقم هاتف — يُمنع تبادل وسائل التواصل الخارجية داخل المنصة. تكرار المخالفة قد يوقف حسابك، وقد سُجّل الحدث في سجل المراجعة.
    </p>
  </div>
);

export default function P10bChatFiltered() {
  return <ChatScreen messages={messages} durationLabel="متبقٍ ٢٨ يوم" banner={banner} />;
}
