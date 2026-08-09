import { Questionnaire } from "./_auth/Questionnaire";

/* P03b · التسجيل — استبيان الرجل · الصفحة 1 (المعلومات الأساسية).
 * الاستبيان مُقسَّم على صفحات: P03b · P03b2 · P03b3 · P03b4 */
export default function P03bRegisterMan() {
  return <Questionnaire gender="man" stepIndex={0} />;
}
