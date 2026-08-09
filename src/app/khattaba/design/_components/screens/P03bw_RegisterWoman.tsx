import { Questionnaire } from "./_auth/Questionnaire";

/* P03bw · التسجيل — استبيان المرأة · الصفحة 1 (المعلومات الأساسية).
 * الاستبيان مُقسَّم على صفحات: P03bw · P03bw2 · P03bw3 · P03bw4 */
export default function P03bwRegisterWoman() {
  return <Questionnaire gender="woman" stepIndex={0} />;
}
