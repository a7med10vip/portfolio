import { Search, Phone, Mail, Upload, ChevronDown, Check } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

const inputBase: React.CSSProperties = {
  height: 48,
  padding: "0 16px",
  fontFamily: fonts.body,
  fontSize: 15,
  color: colors.ink.body,
  background: colors.surface.white,
  border: `1.5px solid ${colors.border.default}`,
  borderRadius: radius.md,
  outline: "none",
  width: "100%",
  direction: "rtl",
};

function Field({ label, children, hint, error }: { label: string; children: React.ReactNode; hint?: string; error?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body }}>{label}</label>
      {children}
      {hint && !error && (
        <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>{hint}</span>
      )}
      {error && (
        <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.accent.red, fontWeight: 600 }}>{error}</span>
      )}
    </div>
  );
}

function Showcase({ title, children, cols = 2 }: { title: string; children: React.ReactNode; cols?: number }) {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: 20,
        padding: 24,
      }}
    >
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 13,
          fontWeight: 600,
          color: colors.ink.body,
          marginBottom: 14,
        }}
      >
        {title}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 20 }}>{children}</div>
    </div>
  );
}

export default function InputsSection() {
  return (
    <section id="inputs" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="08"
        eyebrow="حقول النماذج"
        title="الحقول"
        description="كل عناصر النماذج بحالاتها الأربع (افتراضي، نشط، خطأ، معطّل)."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Text inputs */}
        <Showcase title="Text Inputs">
          <Field label="الاسم الكامل" hint="كما هو في الهوية الوطنية">
            <input style={inputBase} placeholder="مثال: محمد الأحمدي" defaultValue="" />
          </Field>
          <Field label="الاسم الكامل · Focused">
            <input
              style={{
                ...inputBase,
                borderColor: colors.brand.green,
                boxShadow: `0 0 0 3px rgba(15,15,15,0.06)`,
              }}
              defaultValue="محمد الأحمدي"
            />
          </Field>
          <Field label="البريد الإلكتروني · Error" error="صيغة البريد غير صحيحة">
            <input
              style={{ ...inputBase, borderColor: colors.accent.red }}
              defaultValue="ahmed@example"
            />
          </Field>
          <Field label="رقم العضوية · Disabled">
            <input
              style={{ ...inputBase, background: colors.surface.page, color: colors.ink.muted, cursor: "not-allowed" }}
              defaultValue="KH1-2026-00428"
              disabled
            />
          </Field>
        </Showcase>

        {/* Specialized inputs */}
        <Showcase title="Specialized Inputs">
          <Field label="رقم الجوال" hint="السعودية فقط · يبدأ بـ 5">
            <div style={{ position: "relative" }}>
              <input
                style={{ ...inputBase, paddingInlineStart: 64 }}
                placeholder="5XXXXXXXX"
                defaultValue="551234567"
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  height: "100%",
                  padding: "0 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  borderInlineEnd: `1.5px solid ${colors.border.default}`,
                  background: colors.surface.page,
                  borderTopRightRadius: radius.md,
                  borderBottomRightRadius: radius.md,
                  fontFamily: fonts.latin,
                  fontSize: 13,
                  fontWeight: 700,
                  color: colors.ink.body,
                }}
              >
                <span>🇸🇦</span>
                <span>+966</span>
              </div>
            </div>
          </Field>
          <Field label="البحث">
            <div style={{ position: "relative" }}>
              <Search
                size={16}
                style={{ position: "absolute", insetInlineStart: 14, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }}
              />
              <input style={{ ...inputBase, paddingInlineStart: 40 }} placeholder="ابحث بالاسم أو رقم العضوية..." />
            </div>
          </Field>
        </Showcase>

        {/* OTP */}
        <Showcase title="OTP Input · 6 digits" cols={1}>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, direction: "ltr" }}>
            {[1, 2, 3, 4, 5, 6].map((i, idx) => {
              const filled = idx < 3;
              const focused = idx === 3;
              return (
                <input
                  key={i}
                  defaultValue={filled ? String(i + 2) : ""}
                  maxLength={1}
                  style={{
                    width: 56,
                    height: 64,
                    textAlign: "center",
                    fontFamily: fonts.latin,
                    fontSize: 24,
                    fontWeight: 700,
                    color: colors.ink.black,
                    background: colors.surface.white,
                    border: `2px solid ${focused ? colors.brand.green : filled ? colors.brand.green : colors.border.default}`,
                    borderRadius: radius.lg,
                    boxShadow: focused ? `0 0 0 3px rgba(15,15,15,0.06)` : "none",
                    outline: "none",
                  }}
                />
              );
            })}
          </div>
        </Showcase>

        {/* Select + Textarea */}
        <Showcase title="Select & Textarea">
          <Field label="الجنسية">
            <div style={{ position: "relative" }}>
              <select style={{ ...inputBase, appearance: "none", paddingInlineEnd: 40, cursor: "pointer" }}>
                <option>سعودي</option>
                <option>خليجي</option>
                <option>عربي</option>
              </select>
              <ChevronDown
                size={16}
                style={{
                  position: "absolute",
                  insetInlineEnd: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: colors.ink.muted,
                  pointerEvents: "none",
                }}
              />
            </div>
          </Field>
          <Field label="نبذة عن نفسي" hint="بحد أقصى 500 حرف">
            <textarea
              style={{
                ...inputBase,
                height: 100,
                padding: 14,
                resize: "none",
                lineHeight: 1.7,
              }}
              defaultValue="أبحث عن شريكة حياة من عائلة كريمة، ملتزمة وذات أخلاق عالية..."
            />
          </Field>
        </Showcase>

        {/* Checkboxes, radios, toggles */}
        <Showcase title="Selection Controls">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body, marginBottom: 4 }}>
              Checkbox
            </div>
            <Choice type="checkbox" checked label="أوافق على الشروط والأحكام" />
            <Choice type="checkbox" label="اشترك في القائمة البريدية" />
            <Choice type="checkbox" disabled label="معطّل" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body, marginBottom: 4 }}>
              Radio
            </div>
            <Choice type="radio" checked label="ذكر" />
            <Choice type="radio" label="أنثى" />
          </div>
        </Showcase>

        <Showcase title="Toggle Switch">
          <ToggleRow label="إشعارات الجوال" on />
          <ToggleRow label="إشعارات البريد الإلكتروني" on={false} />
          <ToggleRow label="إظهار آخر دخول للأعضاء" on />
          <ToggleRow label="ميزة مدفوعة (معطّلة)" on={false} disabled />
        </Showcase>

        <Showcase title="File Upload" cols={1}>
          <div
            style={{
              border: `2px dashed ${colors.border.strong}`,
              borderRadius: radius.lg,
              padding: 32,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              background: colors.surface.page,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: colors.brand.greenSoft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Upload size={24} color={colors.brand.green} />
            </div>
            <div
              style={{
                fontFamily: fonts.heading,
                fontSize: 16,
                fontWeight: 700,
                color: colors.ink.black,
              }}
            >
              اسحب الهوية الوطنية هنا أو اضغط للاختيار
            </div>
            <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>
              PNG, JPG, PDF · بحد أقصى 5MB · اختياري
            </div>
          </div>
        </Showcase>
      </div>
    </section>
  );
}

function Choice({ type, checked, label, disabled }: { type: "checkbox" | "radio"; checked?: boolean; label: string; disabled?: boolean }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: fonts.body,
        fontSize: 14,
        color: disabled ? colors.ink.soft : colors.ink.body,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: type === "radio" ? "50%" : 6,
          border: `2px solid ${checked ? colors.brand.green : colors.border.strong}`,
          background: checked ? colors.brand.green : "transparent",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {checked && type === "checkbox" && <Check size={12} color="#fff" strokeWidth={3} />}
        {checked && type === "radio" && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
      </span>
      {label}
    </label>
  );
}

function ToggleRow({ label, on, disabled }: { label: string; on: boolean; disabled?: boolean }) {
  return (
    <label
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span style={{ fontFamily: fonts.body, fontSize: 14, color: colors.ink.body, fontWeight: 500 }}>{label}</span>
      <span
        style={{
          width: 44,
          height: 24,
          borderRadius: 999,
          background: on ? colors.brand.green : colors.border.strong,
          position: "relative",
          transition: "all 0.2s",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: on ? 2 : 22,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
            transition: "all 0.2s",
          }}
        />
      </span>
    </label>
  );
}
