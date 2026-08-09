import type { CSSProperties } from "react";
import { Mail } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { SystemScreen } from "./_system/SystemScreen";

const inp: CSSProperties = { flex: 1, height: 44, padding: "0 14px", background: colors.surface.white, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, color: colors.ink.body, outline: "none", direction: "rtl" };

/* S04 · ميزة قادمة */
export default function S04ComingSoon() {
  return (
    <SystemScreen
      patternId="kh-soon"
      eyebrow="ميزة قادمة"
      title="هذه الميزة قيد التطوير"
      body="نعمل على إطلاق ميزة جديدة قريباً ضمن مراحل المنصة المستقبلية. سجّل بريدك لنُشعرك أول من يتلقى الخبر."
      image="/khattaba/sys-coming-soon.png"
      primaryLabel="إشعاري عند الإطلاق"
      secondaryLabel="العودة للرئيسية"
      extra={
        <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Mail size={16} style={{ position: "absolute", insetInlineStart: 14, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }} />
            <input style={{ ...inp, paddingInlineStart: 40 }} placeholder="you@example.com" />
          </div>
        </div>
      }
    />
  );
}
