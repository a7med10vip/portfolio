import { Shield, X, Check } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow } from "../tokens";
import { AdminShell, card } from "./_admin/AdminShell";

/* AM03 · مودال صلاحيات الأدمن — Super Admin / Moderator / Support */

const roles = [
  { key: "super", label: "Super Admin", desc: "صلاحيات كاملة على المنصة" },
  { key: "mod", label: "Moderator", desc: "مراجعة الأعضاء ومحادثات الشات والتدخل" },
  { key: "sup", label: "Support", desc: "دعم العملاء وردود الاستفسارات فقط" },
];

const perms = [
  { label: "قبول/رفض تسجيلات الأعضاء", on: true },
  { label: "تعديل بيانات الأعضاء", on: true },
  { label: "حظر / تنشيط الحسابات", on: true },
  { label: "حذف الحسابات نهائياً", on: false },
  { label: "تحديد رسوم الاشتراك", on: true },
  { label: "إدارة المدفوعات والاسترداد", on: false },
  { label: "قراءة المحادثات", on: true },
  { label: "التدخّل كطرف ثالث في الشات", on: true },
  { label: "إنهاء/تمديد غرفة المحادثة", on: true },
  { label: "تعديل الكلمات المحظورة", on: false },
  { label: "إعدادات المنصة", on: false },
  { label: "تصدير سجل المراجعة", on: false },
];

export default function AM03PermissionsModal() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <AdminShell active="members" title="إدارة الأعضاء" breadcrumb={["الأعضاء", "هاني · Moderator"]}>
        <div style={{ ...card, padding: 28, opacity: 0.45 }}>
          <div style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black }}>إدارة صلاحيات الأدمن</div>
        </div>
      </AdminShell>
      <div style={{ position: "absolute", inset: 0, background: "rgba(26,11,21,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 620, background: colors.surface.white, borderRadius: radius.xl, boxShadow: shadow.lg, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", borderBottom: `1px solid ${colors.border.soft}` }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: radius.md, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Shield size={20} color={colors.brand.green} />
              </div>
              <div>
                <h3 style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.black, margin: 0 }}>صلاحيات الأدمن</h3>
                <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, margin: "3px 0 0" }}>هاني الشمري · admin@kh1-ksa.com.sa</p>
              </div>
            </div>
            <button style={{ width: 32, height: 32, borderRadius: radius.md, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={15} /></button>
          </div>

          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 600, color: colors.ink.body, marginBottom: 8, display: "block" }}>الدور</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {roles.map((r, i) => (
                  <div key={r.key} style={{ padding: 14, borderRadius: radius.md, border: `1.5px solid ${i === 1 ? colors.brand.green : colors.border.default}`, background: i === 1 ? colors.brand.greenSoft : colors.surface.white, cursor: "pointer" }}>
                    <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: i === 1 ? colors.brand.greenDark : colors.ink.black }}>{r.label}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, marginTop: 4, lineHeight: 1.6 }}>{r.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 600, color: colors.ink.body, marginBottom: 10, display: "block" }}>الصلاحيات التفصيلية</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {perms.map((p) => (
                  <label key={p.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: `1px solid ${colors.border.soft}`, borderRadius: radius.md, cursor: "pointer" }}>
                    <span style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${p.on ? colors.brand.green : colors.border.strong}`, background: p.on ? colors.brand.green : "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {p.on && <Check size={12} color="#fff" strokeWidth={3} />}
                    </span>
                    <span style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.body }}>{p.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: "16px 24px", borderTop: `1px solid ${colors.border.soft}`, display: "flex", justifyContent: "flex-start", gap: 10 }}>
            <button style={{ height: 44, padding: "0 24px", background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>حفظ الصلاحيات</button>
            <button style={{ height: 44, padding: "0 22px", background: "transparent", color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>إلغاء</button>
          </div>
        </div>
      </div>
    </div>
  );
}
