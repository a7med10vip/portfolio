import type { CSSProperties } from "react";
import { Trash2, X, AlertTriangle } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow } from "../tokens";
import { AdminShell, card } from "./_admin/AdminShell";

const inp: CSSProperties = { height: 42, padding: "0 14px", width: "100%", background: colors.surface.white, border: `1.5px solid ${colors.accent.red}`, borderRadius: radius.md, fontFamily: fonts.latin, fontSize: 14, color: colors.ink.body, outline: "none", direction: "rtl", textAlign: "center", letterSpacing: 2 };

export default function AM02DeleteModal() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <AdminShell active="members" title="إدارة الأعضاء" breadcrumb={["الأعضاء", "محمد الأحمدي"]}>
        <div style={{ ...card, padding: 28, opacity: 0.45 }}>
          <div style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black }}>محمد الأحمدي · #KH-2087</div>
        </div>
      </AdminShell>
      <div style={{ position: "absolute", inset: 0, background: "rgba(26,11,21,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 480, background: colors.surface.white, borderRadius: radius.xl, boxShadow: shadow.lg, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", borderBottom: `1px solid ${colors.border.soft}` }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: radius.md, background: colors.accent.redSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Trash2 size={20} color={colors.accent.red} />
              </div>
              <div>
                <h3 style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.black, margin: 0 }}>حذف الحساب نهائياً</h3>
                <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, margin: "3px 0 0" }}>محمد الأحمدي · #KH-2087</p>
              </div>
            </div>
            <button style={{ width: 32, height: 32, borderRadius: radius.md, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={15} /></button>
          </div>

          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 12, padding: "14px 18px", background: colors.accent.redSoft, border: `1px solid ${colors.accent.red}40`, borderRadius: radius.md }}>
              <AlertTriangle size={18} color={colors.accent.red} style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.8, color: colors.ink.body, margin: 0 }}>
                هذا الإجراء <b style={{ color: colors.accent.red }}>لا يمكن التراجع عنه</b>. سيتم حذف بيانات العضو ومحادثاته وطلباته نهائياً، ويُحفظ سجل بسبب الحذف في سجل المراجعة.
              </p>
            </div>

            <div>
              <label style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 600, color: colors.ink.body, marginBottom: 6, display: "block" }}>
                للتأكيد، اكتب <b style={{ fontFamily: fonts.latin, color: colors.accent.red }}>DELETE</b> في الحقل أدناه
              </label>
              <input style={inp} placeholder="DELETE" />
            </div>

            <div>
              <label style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 600, color: colors.ink.body, marginBottom: 6, display: "block" }}>سبب الحذف</label>
              <textarea style={{ height: 72, padding: 12, width: "100%", background: colors.surface.white, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.body, outline: "none", direction: "rtl", resize: "none", lineHeight: 1.7 }} placeholder="اكتب سبب الحذف للسجل..." />
            </div>
          </div>

          <div style={{ padding: "16px 24px", borderTop: `1px solid ${colors.border.soft}`, display: "flex", justifyContent: "flex-start", gap: 10 }}>
            <button style={{ height: 44, padding: "0 24px", background: colors.accent.red, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}><Trash2 size={15} /> حذف نهائي</button>
            <button style={{ height: 44, padding: "0 22px", background: "transparent", color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>إلغاء</button>
          </div>
        </div>
      </div>
    </div>
  );
}
