import { FileSignature, PenTool, Wallet, ArrowLeft } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { ChatScreen, type Msg } from "./_core/ChatShell";

/* P10c · الشات المراقب — انتهاء المدة + اتفاقية الجدية قبل الواتساب */
const messages: Msg[] = [
  { from: "them", text: "كان تعارفاً موفقاً، وأرى توافقاً بيننا بإذن الله.", time: "أمس" },
  { from: "me", text: "أتفق معك، وأرى أننا جاهزون للخطوة التالية.", time: "أمس" },
];

const agreement = (
  <div style={{ alignSelf: "stretch", marginTop: 8, background: colors.surface.white, border: `1px solid ${colors.brand.green}40`, borderRadius: radius.lg, padding: 26, textAlign: "center", boxShadow: "0 8px 24px rgba(42,19,34,0.08)" }}>
    <div style={{ width: 60, height: 60, borderRadius: "50%", background: colors.brand.greenSoft, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
      <FileSignature size={28} color={colors.brand.green} />
    </div>
    <h3 style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>انتهت مدة المحادثة</h3>
    <p style={{ fontFamily: fonts.body, fontSize: 13.5, lineHeight: 1.8, color: colors.ink.muted, margin: "0 auto 18px", maxWidth: 440 }}>
      للانتقال إلى التواصل الجاد عبر الواتساب، يوقّع الطرفان <b style={{ color: colors.ink.body }}>اتفاقية الجدية</b> رقمياً، وتُدفع رسوم منفصلة تحددها الإدارة (قابلة للاسترداد ضمن شروط الاتفاقية).
    </p>
    <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: colors.surface.page, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body }}><PenTool size={13} color={colors.brand.green} /> توقيع رقمي</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: colors.surface.page, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body }}><Wallet size={13} color={colors.brand.green} /> رسوم تحددها الإدارة</span>
    </div>
    <button style={{ height: 50, padding: "0 30px", background: palette.purple[800], color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      الانتقال لاتفاقية الجدية <ArrowLeft size={17} />
    </button>
  </div>
);

export default function P10cChatEnded() {
  return <ChatScreen messages={messages} durationLabel="انتهت المدة" ended>{agreement}</ChatScreen>;
}
