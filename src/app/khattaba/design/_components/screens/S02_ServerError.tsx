import { SystemScreen } from "./_system/SystemScreen";

/* S02 · 500 — خطأ في الخادم */
export default function S02ServerError() {
  return (
    <SystemScreen
      patternId="kh-500"
      eyebrow="خطأ في الخادم"
      title="حدث خطأ غير متوقّع"
      body="نعتذر — تعطّل مؤقت في الخادم. فريقنا التقني تنبّه تلقائياً ويعمل على حلّه. حاول مرة أخرى بعد لحظات."
      image="/khattaba/sys-500.png"
      primaryLabel="إعادة المحاولة"
      secondaryLabel="العودة للرئيسية"
    />
  );
}
