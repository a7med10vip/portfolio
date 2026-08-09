import { FileText, Edit3, Eye, Clock, Globe } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { AdminShell, card, StatusPill } from "./_admin/AdminShell";

/* A08 · إدارة محتوى الصفحات الثابتة */

const pages = [
  { code: "P01", title: "الصفحة الرئيسية", updated: "اليوم 09:12", status: "success" as const, sub: "هيرو، الركائز، آلية الخطبة، CTA" },
  { code: "P02", title: "من نحن", updated: "أمس 14:20", status: "success" as const, sub: "الرؤية والرسالة + قيمنا + الحماية" },
  { code: "P15", title: "آلية الخطبة", updated: "25 مايو", status: "success" as const, sub: "8 خطوات + ضوابط" },
  { code: "P17", title: "الأسئلة الشائعة", updated: "20 مايو", status: "warn" as const, sub: "8 أسئلة + إجابات" },
  { code: "P12", title: "سياسة الخصوصية وسرية المعلومات", updated: "15 مايو", status: "success" as const, sub: "PDPL" },
  { code: "P13", title: "الشروط والأحكام", updated: "15 مايو", status: "success" as const, sub: "شروط الاشتراك والاسترداد" },
  { code: "P14", title: "سياسة الاستخدام وإخلاء المسؤولية", updated: "15 مايو", status: "success" as const, sub: "إخلاء المسؤولية" },
  { code: "P16", title: "اتصل بنا", updated: "10 مايو", status: "success" as const, sub: "نموذج تواصل + معلومات" },
];

export default function A08Content() {
  return (
    <AdminShell active="content" title="إدارة المحتوى" breadcrumb={["لوحة التحكم", "إدارة المحتوى"]}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {pages.map((p) => (
          <div key={p.code} style={{ ...card, padding: 20, display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 50, height: 50, borderRadius: radius.md, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <FileText size={22} color={colors.brand.green} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black }}>{p.title}</span>
                <span style={{ fontFamily: fonts.latin, fontSize: 10.5, fontWeight: 700, color: colors.brand.green, padding: "2px 7px", background: colors.brand.greenSoft, borderRadius: 5 }}>{p.code}</span>
                <StatusPill kind={p.status} label={p.status === "warn" ? "بمراجعة" : "منشور"} />
              </div>
              <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 4 }}>{p.sub}</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginTop: 6 }}>
                <Clock size={11} /> آخر تحديث: {p.updated}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ width: 36, height: 36, borderRadius: 8, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} title="معاينة"><Eye size={14} color={colors.ink.body} /></button>
              <button style={{ width: 36, height: 36, borderRadius: 8, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} title="فتح في الموقع"><Globe size={14} color={colors.ink.body} /></button>
              <button style={{ height: 36, padding: "0 14px", background: colors.brand.green, color: "#fff", border: "none", borderRadius: 8, fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><Edit3 size={13} /> تعديل</button>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
