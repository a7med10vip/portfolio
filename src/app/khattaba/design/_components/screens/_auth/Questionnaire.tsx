import { ArrowLeft, ArrowRight, Check } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, space, palette } from "../../tokens";
import { DotPattern, BrandWordmark } from "../_marketing/deco";
import { AuthStepper } from "./AuthShell";
import { stepsFor, type RegField, type RegSub } from "./registrationFields";

/* استبيان التسجيل (حسب الجنس) — مُقسَّم على صفحات/خطوات بدل شاشة واحدة طويلة.
 * كل قيمة لـ stepIndex تعرض صفحة واحدة من الـ wizard. */

const inputSm = (): React.CSSProperties => ({
  width: "100%",
  minHeight: 40,
  padding: "10px 14px",
  fontFamily: fonts.body,
  fontSize: 13,
  color: colors.ink.body,
  background: colors.surface.white,
  border: `1.5px solid ${colors.border.default}`,
  borderRadius: radius.md,
  outline: "none",
  direction: "rtl",
  resize: "none",
});

function Chips({ options }: { options: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((o) => (
        <span key={o} style={{ padding: "8px 14px", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.body, background: colors.surface.white, border: `1.5px solid ${colors.border.default}`, cursor: "pointer", lineHeight: 1.5 }}>
          {o}
        </span>
      ))}
    </div>
  );
}

function SubBlock({ sub, accent }: { sub: RegSub; accent: string }) {
  return (
    <div style={{ borderInlineStart: `2px solid ${accent}40`, paddingInlineStart: 14, display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 600, color: colors.ink.body }}>{sub.label}</span>
      {sub.options && <Chips options={sub.options} />}
      {sub.note ? (
        <input style={inputSm()} placeholder={sub.note} />
      ) : (
        !sub.options && <textarea style={{ ...inputSm(), minHeight: 56 }} placeholder="اكتب هنا..." />
      )}
    </div>
  );
}

function QuestionCard({ index, field, accent }: { index: number; field: RegField; accent: string }) {
  return (
    <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 18, display: "flex", flexDirection: "column", gap: 12, boxShadow: shadow.sm }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ width: 26, height: 26, borderRadius: 8, background: accent, color: "#fff", fontFamily: fonts.latin, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <p style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 700, color: colors.ink.black, margin: "3px 0 0", lineHeight: 1.6 }}>{field.label}</p>
      </div>

      {field.type === "readonly" ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: fonts.latin, fontSize: 15, fontWeight: 700, color: colors.ink.body, background: colors.surface.page, border: `1.5px dashed ${colors.border.strong}`, borderRadius: radius.md, padding: "8px 16px", letterSpacing: 1 }}>
            {field.value}
          </span>
          {field.note && <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>{field.note}</span>}
        </div>
      ) : field.type === "short" ? (
        <input style={inputSm()} placeholder={field.placeholder ?? "اكتب هنا..."} />
      ) : field.type === "scale" ? (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <span key={n} style={{ width: 34, height: 34, borderRadius: "50%", border: `1.5px solid ${colors.border.default}`, fontFamily: fonts.latin, fontSize: 13, fontWeight: 700, color: colors.ink.body, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              {n}
            </span>
          ))}
        </div>
      ) : field.type === "text" ? (
        <textarea style={{ ...inputSm(), minHeight: 56 }} placeholder={field.note ?? "اكتب هنا..."} />
      ) : (
        <>
          {field.options && <Chips options={field.options} />}
          {field.note && <input style={inputSm()} placeholder={field.note} />}
        </>
      )}

      {field.sub?.map((s, i) => (
        <SubBlock key={i} sub={s} accent={accent} />
      ))}
    </div>
  );
}

/* شريط تقدّم صفحات الاستبيان (داخلي) — يميّز الصفحة الحالية من إجمالي الصفحات. */
function PageStepper({ titles, current, accent }: { titles: string[]; current: number; accent: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
      {titles.map((t, i) => {
        const done = i < current;
        const active = i === current;
        const bg = done ? accent : active ? accent : colors.surface.white;
        const fg = done || active ? "#fff" : colors.ink.muted;
        return (
          <div key={t} style={{ display: "flex", alignItems: "center", flex: i === titles.length - 1 ? 0 : 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.latin, fontSize: 12, fontWeight: 700, border: active ? `3px solid ${accent}33` : done ? "none" : `1.5px solid ${colors.border.default}` }}>
                {done ? <Check size={14} strokeWidth={3} /> : i + 1}
              </div>
              <span style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: active ? 700 : 500, color: active ? accent : done ? colors.ink.body : colors.ink.muted, whiteSpace: "nowrap" }}>{t}</span>
            </div>
            {i < titles.length - 1 && <div style={{ flex: 1, height: 2, background: done ? accent : colors.border.default, margin: "0 8px", marginTop: -20 }} />}
          </div>
        );
      })}
    </div>
  );
}

export function Questionnaire({ gender, stepIndex = 0 }: { gender: "man" | "woman"; stepIndex?: number }) {
  const accent = gender === "man" ? colors.accent.blue : colors.accent.purple;
  const steps = stepsFor(gender);
  const idx = Math.max(0, Math.min(stepIndex, steps.length - 1));
  const step = steps[idx];
  const isFirst = idx === 0;
  const isLast = idx === steps.length - 1;

  return (
    <div style={{ width: "100%", background: colors.surface.page, fontFamily: fonts.body }}>
      {/* branded top bar */}
      <div style={{ position: "relative", overflow: "hidden", background: palette.purple[800], padding: "20px 0" }}>
        <DotPattern id="kh-q-dots" color="#FFFFFF" opacity={0.05} gap={28} />
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <BrandWordmark onDark size="sm" />
            <span style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: "#fff" }}>إنشاء حساب</span>
          </div>
          {/* gender toggle */}
          <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.08)", padding: 4, borderRadius: radius.full, border: "1px solid rgba(255,255,255,0.14)" }}>
            {([["man", "رجل"], ["woman", "امرأة"]] as const).map(([g, label]) => (
              <span key={g} style={{ padding: "6px 16px", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: g === gender ? palette.purple[800] : "rgba(255,255,255,0.8)", background: g === gender ? colors.brand.highlight : "transparent" }}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* body */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: `${space[10]}px 32px ${space[12]}px` }}>
        <AuthStepper current={1} />

        <div style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontFamily: fonts.latin, fontSize: 12, fontWeight: 700, color: accent, background: `${accent}14`, padding: "3px 10px", borderRadius: radius.full }}>
              الخطوة {idx + 1} من {steps.length}
            </span>
            <span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.muted }}>
              استبيان · <span style={{ color: accent, fontWeight: 700 }}>نموذج {gender === "man" ? "الرجل" : "المرأة"}</span>
            </span>
          </div>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 700, color: colors.ink.black, margin: 0 }}>{step.title}</h1>
          <p style={{ fontFamily: fonts.body, fontSize: 14, color: colors.ink.muted, margin: "6px 0 0", lineHeight: 1.7 }}>{step.subtitle}</p>
        </div>

        <PageStepper titles={steps.map((s) => s.title)} current={idx} accent={accent} />

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {step.fields.map((f, i) => (
            <QuestionCard key={i} index={i} field={f} accent={accent} />
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "0.6fr 1fr", gap: 12, marginTop: 24 }}>
          <button style={{ height: 52, background: "transparent", color: isFirst ? colors.ink.soft : colors.brand.green, border: `1.5px solid ${isFirst ? colors.border.default : colors.brand.green}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <ArrowRight size={18} /> السابق
          </button>
          <button style={{ height: 52, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {isLast ? "إنهاء · التحقق" : "التالي"} <ArrowLeft size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
