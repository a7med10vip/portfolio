import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { manFields, womanFields, type RegField, type RegSub } from "./_auth/registrationFields";
import { DotPattern, BrandWordmark } from "./_marketing/deco";

/* MP03b/bw · استبيان التسجيل (موبايل · رجل/امرأة) — مطابق لوثيقة العميل */

const inputSm: CSSProperties = {
  width: "100%",
  minHeight: 36,
  padding: "8px 12px",
  fontFamily: fonts.body,
  fontSize: 12,
  color: colors.ink.body,
  background: "#fff",
  border: `1.5px solid ${colors.border.default}`,
  borderRadius: radius.md,
  outline: "none",
  direction: "rtl",
  resize: "none",
};

function Chips({ options, accent }: { options: string[]; accent: string }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
      {options.map((o) => (
        <span key={o} style={{ padding: "5px 10px", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 10.5, color: colors.ink.body, background: "#fff", border: `1px solid ${colors.border.default}`, lineHeight: 1.5 }}>{o}</span>
      ))}
    </div>
  );
}

function SubBlock({ sub, accent }: { sub: RegSub; accent: string }) {
  return (
    <div style={{ borderInlineStart: `2px solid ${accent}40`, paddingInlineStart: 10, display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
      <span style={{ fontFamily: fonts.body, fontSize: 10.5, fontWeight: 600, color: colors.ink.body }}>{sub.label}</span>
      {sub.options && <Chips options={sub.options} accent={accent} />}
      {sub.note ? <input style={inputSm} placeholder={sub.note} /> : !sub.options && <textarea style={{ ...inputSm, minHeight: 44 }} placeholder="اكتب هنا..." />}
    </div>
  );
}

function QCard({ index, field, accent }: { index: number; field: RegField; accent: string }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.md, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <span style={{ width: 22, height: 22, borderRadius: 6, background: accent, color: "#fff", fontFamily: fonts.latin, fontSize: 10, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <p style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.ink.black, margin: "1px 0 0", lineHeight: 1.55 }}>{field.label}</p>
      </div>

      {field.type === "scale" ? (
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <span key={n} style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${colors.border.default}`, fontFamily: fonts.latin, fontSize: 11, fontWeight: 700, color: colors.ink.body, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{n}</span>
          ))}
        </div>
      ) : field.type === "text" ? (
        <textarea style={{ ...inputSm, minHeight: 50 }} placeholder={field.note ?? "اكتب هنا..."} />
      ) : (
        <>
          {field.options && <Chips options={field.options} accent={accent} />}
          {field.note && <input style={inputSm} placeholder={field.note} />}
        </>
      )}

      {field.sub?.map((s, i) => <SubBlock key={i} sub={s} accent={accent} />)}
    </div>
  );
}

function Questionnaire({ gender, fields }: { gender: "man" | "woman"; fields: RegField[] }) {
  const accent = gender === "man" ? colors.accent.blue : colors.accent.purple;
  return (
    <MobileScreen padTop={0}>
      {/* purple compact header */}
      <div style={{ background: palette.purple[800], padding: "60px 16px 16px", position: "relative", overflow: "hidden" }}>
        <DotPattern id={`kh-mp03${gender}-dots`} color="#FFFFFF" opacity={0.06} gap={20} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <BrandWordmark onDark size="sm" />
            <span style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: "#fff" }}>إنشاء حساب</span>
          </div>
          <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.08)", padding: 3, borderRadius: radius.full, border: "1px solid rgba(255,255,255,0.14)" }}>
            {([["man", "رجل"], ["woman", "امرأة"]] as const).map(([g, l]) => (
              <span key={g} style={{ padding: "4px 12px", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: g === gender ? palette.purple[800] : "rgba(255,255,255,0.8)", background: g === gender ? colors.brand.highlight : "transparent" }}>{l}</span>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 6, color: "#fff", fontFamily: fonts.body, fontSize: 10.5 }}>
          <span style={{ width: 18, height: 18, borderRadius: "50%", background: colors.brand.green, fontFamily: fonts.latin, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9.5 }}>✓</span><span>البيانات</span>
          <span style={{ flex: 1, height: 2, background: colors.brand.green, margin: "0 3px" }} />
          <span style={{ width: 18, height: 18, borderRadius: "50%", background: colors.brand.highlight, color: palette.purple[800], fontFamily: fonts.latin, fontWeight: 700, fontSize: 9.5, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>2</span>
          <span style={{ fontWeight: 700, color: colors.brand.highlight }}>التفضيلات</span>
          <span style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.18)", margin: "0 3px" }} />
          <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,0.18)", fontFamily: fonts.latin, fontSize: 9.5 }}>3</span>
          <span style={{ color: palette.purple[200] }}>التحقق</span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "hidden", padding: "14px 14px 12px", background: colors.surface.page }}>
        <h1 style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: colors.ink.black, margin: 0 }}>استبيان التسجيل</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, margin: "4px 0 12px", lineHeight: 1.6 }}>
          أجب بدقة لمساعدة الإدارة في الترشيح · <span style={{ color: accent, fontWeight: 700 }}>نموذج {gender === "man" ? "الرجل" : "المرأة"} · {fields.length} سؤال</span>
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {fields.map((f, i) => <QCard key={i} index={i} field={f} accent={accent} />)}
        </div>
      </div>

      <div style={{ padding: "10px 16px 22px", background: "#fff", borderTop: `1px solid ${colors.border.soft}`, display: "grid", gridTemplateColumns: "0.6fr 1fr", gap: 8 }}>
        <button style={{ height: 46, background: "transparent", color: colors.brand.green, border: `1.5px solid ${colors.brand.green}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5 }}><ArrowRight size={15} /> السابق</button>
        <button style={{ height: 46, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5 }}>التالي · التحقق <ArrowLeft size={15} /></button>
      </div>
    </MobileScreen>
  );
}

export function MP03bManMobile() { return <Questionnaire gender="man" fields={manFields} />; }
export function MP03bwWomanMobile() { return <Questionnaire gender="woman" fields={womanFields} />; }
