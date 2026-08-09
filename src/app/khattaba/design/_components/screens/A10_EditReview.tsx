import { Edit3, Check, X, Eye, ArrowLeft, ArrowRight, Clock } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow } from "../tokens";
import { AdminShell, card, StatusPill } from "./_admin/AdminShell";

/* A10 · مراجعة تحديثات بيانات العضو
 * (مطابق لسطر 640 في العرض: تعديل البيانات الحساسة بعد الموافقة على العضوية يرفع طلباً للإدارة) */

const reviews = [
  {
    member: "محمد الأحمدي",
    id: "#KH-2087",
    avatar: "/avatars/saudi-male.jpeg",
    time: "اليوم 11:22",
    field: "الوظيفة",
    oldVal: "مهندس",
    newVal: "مهندس برمجيات أول · شركة سابك",
    severity: "info" as const,
    label: "غير حساس",
    auto: true,
  },
  {
    member: "نورة العتيبي",
    id: "#KH-1042",
    avatar: "/khattaba/avatars/niqab-woman-brown.png",
    time: "اليوم 09:18",
    field: "الحالة الاجتماعية",
    oldVal: "عزباء",
    newVal: "مطلّقة",
    severity: "danger" as const,
    label: "حساس · يحتاج مراجعة",
    auto: false,
  },
  {
    member: "خالد الدوسري",
    id: "#KH-2154",
    avatar: "/avatars/saudi-male-2.jpeg",
    time: "أمس 17:30",
    field: "مستوى التدين",
    oldVal: "وسطي",
    newVal: "ملتزم",
    severity: "warn" as const,
    label: "حساس · يحتاج مراجعة",
    auto: false,
  },
  {
    member: "ريم القحطاني",
    id: "#KH-1071",
    avatar: "/khattaba/avatars/niqab-woman-blue.png",
    time: "أمس 14:05",
    field: "المدينة",
    oldVal: "الدمام",
    newVal: "الرياض",
    severity: "danger" as const,
    label: "حساس · يحتاج مراجعة",
    auto: false,
  },
];

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return <span style={{ padding: "8px 14px", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12.5, fontWeight: active ? 700 : 500, background: active ? colors.brand.green : colors.surface.white, color: active ? "#fff" : colors.ink.body, border: `1px solid ${active ? colors.brand.green : colors.border.default}`, cursor: "pointer" }}>{label}</span>;
}

export default function A10EditReview() {
  return (
    <AdminShell active="members" title="مراجعة تعديلات الأعضاء" breadcrumb={["الأعضاء", "طلبات التعديل"]}>
      <div style={{ ...card, padding: 18, marginBottom: 16, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <FilterChip label="الكل · 12" active />
          <FilterChip label="حساس · 8" />
          <FilterChip label="غير حساس · 4" />
          <FilterChip label="بانتظار · 12" />
          <FilterChip label="معتمد · 38" />
          <FilterChip label="مرفوض · 4" />
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.muted, display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Clock size={13} /> آخر تحديث: قبل دقيقتين
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {reviews.map((r, i) => (
          <div key={i} style={{ background: colors.surface.white, border: `1px solid ${r.severity === "danger" ? colors.accent.red + "30" : colors.border.soft}`, borderRadius: radius.lg, boxShadow: shadow.sm, overflow: "hidden" }}>
            <div style={{ padding: "14px 22px", display: "flex", alignItems: "center", gap: 14, borderBottom: `1px solid ${colors.border.soft}`, background: r.severity === "danger" ? colors.accent.redSoft : colors.surface.page }}>
              <img src={r.avatar} alt={r.member} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>{r.member}</span>
                  <span style={{ fontFamily: fonts.latin, fontSize: 11, color: colors.ink.muted }}>{r.id}</span>
                  <StatusPill kind={r.severity} label={r.label} />
                  {r.auto && <StatusPill kind="info" label="منشور تلقائياً" />}
                </div>
                <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 3, display: "inline-flex", alignItems: "center", gap: 5 }}>
                  <Edit3 size={12} /> طلب تعديل · <span style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.ink.body }}>{r.field}</span> · {r.time}
                </div>
              </div>
              <button style={{ width: 34, height: 34, borderRadius: 8, background: colors.surface.white, color: colors.ink.body, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Eye size={14} /></button>
            </div>

            <div style={{ padding: "18px 22px", display: "grid", gridTemplateColumns: "1fr 30px 1fr", gap: 16, alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.ink.muted, marginBottom: 6 }}>القيمة الحالية</div>
                <div style={{ padding: "12px 16px", background: colors.surface.page, border: `1px dashed ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.muted, textDecoration: "line-through" }}>{r.oldVal}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ArrowLeft size={20} color={colors.brand.green} />
              </div>
              <div>
                <div style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.brand.green, marginBottom: 6 }}>القيمة المقترحة</div>
                <div style={{ padding: "12px 16px", background: colors.brand.greenSoft, border: `1.5px solid ${colors.brand.green}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, color: colors.brand.greenDark }}>{r.newVal}</div>
              </div>
            </div>

            {!r.auto && (
              <div style={{ padding: "14px 22px", borderTop: `1px solid ${colors.border.soft}`, background: colors.surface.page, display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button style={{ height: 40, padding: "0 16px", background: colors.surface.white, color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><Edit3 size={13} /> تعديل</button>
                <button style={{ height: 40, padding: "0 16px", background: colors.surface.white, color: colors.accent.red, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><X size={14} /> رفض</button>
                <button style={{ height: 40, padding: "0 18px", background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><Check size={14} /> موافقة ونشر <ArrowRight size={13} /></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
