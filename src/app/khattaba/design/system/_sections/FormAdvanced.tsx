import { ChevronLeft, ChevronRight, Plus, X, Check } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

function Showcase({ title, children, cols = 1 }: { title: string; children: React.ReactNode; cols?: number }) {
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

function Calendar() {
  const days = ["أحد", "إثن", "ثلا", "أرب", "خمي", "جمع", "سبت"];
  const dates = Array.from({ length: 35 }, (_, i) => i - 2); // some empty cells at start
  const today = 18;
  const selected = 24;
  return (
    <div
      style={{
        width: 320,
        background: colors.surface.white,
        border: `1px solid ${colors.border.default}`,
        borderRadius: radius.lg,
        padding: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, padding: "0 4px" }}>
        <button
          style={{
            width: 28,
            height: 28,
            background: colors.surface.page,
            border: `1px solid ${colors.border.default}`,
            borderRadius: 6,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.ink.body,
          }}
        >
          <ChevronRight size={14} />
        </button>
        <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>
          فبراير 2026
        </div>
        <button
          style={{
            width: 28,
            height: 28,
            background: colors.surface.page,
            border: `1px solid ${colors.border.default}`,
            borderRadius: 6,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.ink.body,
          }}
        >
          <ChevronLeft size={14} />
        </button>
      </div>

      {/* Day labels */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
        {days.map((d) => (
          <div
            key={d}
            style={{
              fontFamily: fonts.body,
              fontSize: 10,
              fontWeight: 700,
              color: colors.ink.muted,
              textAlign: "center",
              padding: "6px 0",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {dates.map((d, i) => {
          if (d < 1 || d > 28) return <div key={i} />;
          const isToday = d === today;
          const isSelected = d === selected;
          return (
            <button
              key={i}
              style={{
                aspectRatio: "1",
                background: isSelected ? colors.brand.green : "transparent",
                color: isSelected ? "#fff" : isToday ? colors.brand.green : colors.ink.body,
                border: "none",
                borderRadius: 8,
                fontFamily: fonts.latin,
                fontSize: 12,
                fontWeight: isSelected || isToday ? 700 : 500,
                cursor: "pointer",
                position: "relative",
              }}
            >
              {d}
              {isToday && !isSelected && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 2,
                    insetInlineStart: "50%",
                    transform: "translateX(50%)",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: colors.brand.green,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: `1px solid ${colors.border.soft}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>
          24 فبراير 2026
        </span>
        <button
          style={{
            padding: "6px 12px",
            background: colors.brand.green,
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontFamily: fonts.body,
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          تأكيد
        </button>
      </div>
    </div>
  );
}

function DateInput({ value, placeholder }: { value?: string; placeholder?: string }) {
  return (
    <div
      style={{
        height: 48,
        padding: "0 16px",
        background: colors.surface.white,
        border: `1.5px solid ${value ? colors.brand.green : colors.border.default}`,
        borderRadius: radius.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: fonts.body,
        fontSize: 14,
        color: value ? colors.ink.body : colors.ink.placeholder,
        cursor: "pointer",
      }}
    >
      <span>{value || placeholder}</span>
      <span style={{ fontSize: 16 }}>📅</span>
    </div>
  );
}

function SingleSlider({ value }: { value: number }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body }}>
          المسافة المفضّلة
        </span>
        <span style={{ fontFamily: fonts.latin, fontSize: 12, fontWeight: 700, color: colors.brand.green }}>
          {value} كم
        </span>
      </div>
      <div style={{ position: "relative", height: 24, display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: 6, background: colors.border.default, borderRadius: 3 }} />
        <div style={{ position: "absolute", left: 0, width: `${value}%`, height: 6, background: colors.brand.green, borderRadius: 3 }} />
        <div
          style={{
            position: "absolute",
            left: `${value}%`,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#fff",
            border: `3px solid ${colors.brand.green}`,
            transform: "translateX(-50%)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        />
      </div>
    </div>
  );
}

function RangeSlider({ from, to }: { from: number; to: number }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body }}>
          نطاق العمر
        </span>
        <span style={{ fontFamily: fonts.latin, fontSize: 12, fontWeight: 700, color: colors.brand.green }}>
          {from} - {to} سنة
        </span>
      </div>
      <div style={{ position: "relative", height: 24, display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: 6, background: colors.border.default, borderRadius: 3 }} />
        <div style={{ position: "absolute", left: `${from}%`, right: `${100 - to}%`, height: 6, background: colors.brand.green, borderRadius: 3 }} />
        <div style={knob(from)} />
        <div style={knob(to)} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontFamily: fonts.latin, fontSize: 10, color: colors.ink.muted }}>
        <span>18</span>
        <span>30</span>
        <span>50</span>
        <span>70+</span>
      </div>
    </div>
  );
}

const knob = (pos: number): React.CSSProperties => ({
  position: "absolute",
  left: `${pos}%`,
  width: 20,
  height: 20,
  borderRadius: "50%",
  background: "#fff",
  border: `3px solid ${colors.brand.green}`,
  transform: "translateX(-50%)",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
});

function ProgressBar({ value, label, variant = "default" }: { value: number; label: string; variant?: "default" | "thick" | "stepped" }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.body, fontWeight: 600 }}>{label}</span>
        <span style={{ fontFamily: fonts.latin, fontSize: 12, fontWeight: 700, color: colors.brand.green }}>{value}%</span>
      </div>
      {variant === "stepped" ? (
        <div style={{ display: "flex", gap: 4 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 8,
                borderRadius: 4,
                background: i <= Math.ceil(value / 20) ? colors.brand.green : colors.border.default,
              }}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            height: variant === "thick" ? 12 : 6,
            background: colors.surface.page,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${value}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${colors.brand.green}, ${colors.brand.greenDark})`,
              borderRadius: 10,
              transition: "width 0.3s",
            }}
          />
        </div>
      )}
    </div>
  );
}

function CircularProgress({ value, label }: { value: number; label: string }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ position: "relative", width: 88, height: 88, flexShrink: 0 }}>
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={r} stroke={colors.border.default} strokeWidth="6" fill="none" />
          <circle
            cx="44"
            cy="44"
            r={r}
            stroke={colors.brand.green}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform="rotate(-90 44 44)"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: fonts.latin,
            fontSize: 18,
            fontWeight: 700,
            color: colors.ink.black,
          }}
        >
          {value}%
        </div>
      </div>
      <div>
        <div style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black }}>
          {label}
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 4 }}>
          أضف 4 حقول لتكتمل
        </div>
      </div>
    </div>
  );
}

function TagsInput() {
  const tags = ["القراءة", "السفر", "الرياضة", "الطبخ"];
  return (
    <div
      style={{
        minHeight: 56,
        padding: 10,
        background: colors.surface.white,
        border: `1.5px solid ${colors.brand.green}`,
        borderRadius: radius.md,
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        alignItems: "center",
        boxShadow: `0 0 0 3px rgba(15,15,15,0.06)`,
      }}
    >
      {tags.map((t) => (
        <span
          key={t}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 8px 5px 12px",
            background: colors.brand.greenSoft,
            color: colors.brand.greenDark,
            border: `1px solid ${colors.brand.green}40`,
            borderRadius: radius.full,
            fontFamily: fonts.body,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {t}
          <button
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: colors.brand.green,
              color: "#fff",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={11} />
          </button>
        </span>
      ))}
      <input
        style={{
          flex: 1,
          minWidth: 120,
          height: 28,
          padding: "0 8px",
          background: "transparent",
          border: "none",
          fontFamily: fonts.body,
          fontSize: 13,
          color: colors.ink.body,
          outline: "none",
        }}
        placeholder="أضف اهتماماً..."
      />
    </div>
  );
}

function SuggestionPills() {
  const suggestions = ["التطوع", "العمل الخيري", "الفن", "الموسيقى", "البرمجة", "التصوير"];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
      <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, padding: "4px 0", width: "100%" }}>
        اقتراحات:
      </span>
      {suggestions.map((s) => (
        <button
          key={s}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 10px",
            background: colors.surface.page,
            color: colors.ink.body,
            border: `1px dashed ${colors.border.strong}`,
            borderRadius: radius.full,
            fontFamily: fonts.body,
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          <Plus size={11} /> {s}
        </button>
      ))}
    </div>
  );
}

export default function FormAdvancedSection() {
  return (
    <section id="form-advanced" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="17"
        eyebrow="حقول متقدّمة"
        title="حقول متقدّمة"
        description="منتقي التاريخ، شريط النطاق، مؤشرات التقدّم، ومدخل الوسوم."
        accentColor={colors.accent.purple}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Date Picker */}
        <Showcase title="Date Picker · Calendar">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <div style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body, marginBottom: 6 }}>
                  تاريخ الميلاد
                </div>
                <DateInput value="24 / فبراير / 2026" />
              </div>
              <div>
                <div style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body, marginBottom: 6 }}>
                  تاريخ الميلاد (فارغ)
                </div>
                <DateInput placeholder="اختر التاريخ" />
              </div>
              <div
                style={{
                  padding: 14,
                  background: colors.brand.greenSoft,
                  border: `1px solid ${colors.brand.green}40`,
                  borderRadius: radius.md,
                  fontFamily: fonts.body,
                  fontSize: 12,
                  color: colors.ink.body,
                  lineHeight: 1.7,
                }}
              >
                💡 الـ calendar يفتح كـ popover أسفل الحقل. التواريخ بالميلادي مع دعم الهجري اختيارياً.
              </div>
            </div>
            <Calendar />
          </div>
        </Showcase>

        {/* Sliders */}
        <Showcase title="Range Sliders · Single & Dual">
          <SingleSlider value={45} />
          <RangeSlider from={22} to={38} />
        </Showcase>

        {/* Progress */}
        <Showcase title="Progress Indicators · 4 variants">
          <ProgressBar value={62} label="إكمال البروفايل" />
          <ProgressBar value={85} label="رفع الملفات" variant="thick" />
          <ProgressBar value={60} label="خطوات التسجيل" variant="stepped" />
          <CircularProgress value={62} label="إكمال الملف الشخصي" />
        </Showcase>

        {/* Tags input */}
        <Showcase title="Tags Input · multi-select chips with suggestions">
          <div>
            <div style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body, marginBottom: 6 }}>
              الاهتمامات
            </div>
            <TagsInput />
            <SuggestionPills />
          </div>
        </Showcase>
      </div>
    </section>
  );
}
