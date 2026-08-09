import { SystemScreen } from "./_system/SystemScreen";

/* S01 · 404 — الصفحة غير موجودة */
export default function S01NotFound() {
  return (
    <SystemScreen
      patternId="kh-404"
      eyebrow="خطأ 404"
      title="هذه الصفحة غير موجودة"
      body="يبدو أن الرابط الذي اتبعته قديم أو محذوف. يمكنك العودة للرئيسية أو البحث عن ما تريد."
      image="/khattaba/sys-404.png"
      primaryLabel="العودة للرئيسية"
      secondaryLabel="تواصل مع الدعم"
    />
  );
}
