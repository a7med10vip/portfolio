import { ChatScreen, type Msg } from "./_core/ChatShell";

/* P10a · الشات المراقب — محادثة نشطة */
const messages: Msg[] = [
  { from: "them", text: "السلام عليكم، شكراً لتواصلك. أحب أتعرف أكثر على طبيعة شخصيتك.", time: "10:02" },
  { from: "me", text: "وعليكم السلام، تشرفت. أنا شخص هادئ أقدّر الاستقرار والحياة العائلية.", time: "10:04" },
  { from: "them", text: "جميل. ما رأيك في السكن بعد الزواج؟", time: "10:05" },
  { from: "me", text: "أفضّل سكن مستقل يحفظ خصوصية الأسرة، مع قرب من الأهل.", time: "10:07" },
  { from: "them", text: "نتفق في هذه النقطة. والعمل؟ هل تمانع استمراري في عملي؟", time: "10:09" },
  { from: "me", text: "إطلاقاً، أحترم طموحك ما دام في بيئة مناسبة.", time: "10:10" },
];

export default function P10aChatActive() {
  return <ChatScreen messages={messages} durationLabel="متبقٍ ٢٨ يوم" />;
}
