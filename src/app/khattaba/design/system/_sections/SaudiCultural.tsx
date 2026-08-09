import { Search, Check, X, MapPin, Phone, CreditCard, AlertCircle } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

function HijriGregorianCalendar() {
  const days = ["أحد", "إثن", "ثلا", "أرب", "خمي", "جمع", "سبت"];
  // Mock: February 2026 (gregorian) corresponds to Sha'ban 1447 (hijri approximately)
  const gregorianDates = Array.from({ length: 35 }, (_, i) => i - 2);
  const hijriDates = Array.from({ length: 35 }, (_, i) => i + 3); // mock
  const today = 18;
  const selected = 24;

  return (
    <div
      style={{
        width: 340,
        background: colors.surface.white,
        border: `1px solid ${colors.border.default}`,
        borderRadius: radius.lg,
        padding: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* Toggle */}
      <div
        style={{
          display: "inline-flex",
          padding: 4,
          background: colors.surface.page,
          borderRadius: radius.full,
          marginBottom: 14,
        }}
      >
        <button
          style={{
            padding: "6px 14px",
            background: colors.brand.green,
            color: "#fff",
            border: "none",
            borderRadius: radius.full,
            fontFamily: fonts.body,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          هجري
        </button>
        <button
          style={{
            padding: "6px 14px",
            background: "transparent",
            color: colors.ink.muted,
            border: "none",
            borderRadius: radius.full,
            fontFamily: fonts.body,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ميلادي
        </button>
      </div>

      {/* Month header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <button style={navBtn()}>›</button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black }}>
            شعبان 1447 هـ
          </div>
          <div style={{ fontFamily: fonts.latin, fontSize: 11, color: colors.ink.muted, marginTop: 2 }}>
            فبراير 2026 م
          </div>
        </div>
        <button style={navBtn()}>‹</button>
      </div>

      {/* Days */}
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
        {gregorianDates.map((g, i) => {
          const h = hijriDates[i];
          if (g < 1 || g > 28) return <div key={i} />;
          const isToday = g === today;
          const isSelected = g === selected;
          return (
            <button
              key={i}
              style={{
                aspectRatio: "1",
                background: isSelected ? colors.brand.green : "transparent",
                color: isSelected ? "#fff" : isToday ? colors.brand.green : colors.ink.body,
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 0,
                padding: "4px 0",
              }}
            >
              <span style={{ fontFamily: fonts.latin, fontSize: 13, fontWeight: isSelected || isToday ? 700 : 500, lineHeight: 1 }}>
                {h}
              </span>
              <span
                style={{
                  fontFamily: fonts.latin,
                  fontSize: 8,
                  opacity: isSelected ? 0.7 : 0.45,
                  lineHeight: 1,
                  marginTop: 2,
                }}
              >
                {g}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected date display */}
      <div
        style={{
          marginTop: 14,
          padding: "10px 12px",
          background: colors.brand.greenSoft,
          border: `1px solid ${colors.brand.green}40`,
          borderRadius: 8,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 600, color: colors.brand.greenDark }}>
            هجري
          </div>
          <div style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: colors.ink.black, marginTop: 2 }}>
            8 شعبان 1447
          </div>
        </div>
        <div>
          <div style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 600, color: colors.brand.greenDark }}>
            ميلادي
          </div>
          <div style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: colors.ink.black, marginTop: 2 }}>
            24 فبراير 2026
          </div>
        </div>
      </div>
    </div>
  );
}

const navBtn = (): React.CSSProperties => ({
  width: 28,
  height: 28,
  background: colors.surface.page,
  border: `1px solid ${colors.border.default}`,
  borderRadius: 6,
  fontSize: 16,
  color: colors.ink.body,
  cursor: "pointer",
});

function CitySelector() {
  const regions = [
    { name: "الوسطى", cities: ["الرياض", "الخرج", "المجمعة"], featured: ["الرياض"] },
    { name: "الغربية", cities: ["جدة", "مكة", "المدينة المنورة", "الطائف"], featured: ["جدة", "مكة"] },
    { name: "الشرقية", cities: ["الدمام", "الخبر", "الأحساء", "الجبيل"], featured: ["الدمام"] },
    { name: "الشمالية", cities: ["تبوك", "حائل", "عرعر"], featured: [] },
    { name: "الجنوبية", cities: ["أبها", "خميس مشيط", "نجران", "جازان"], featured: [] },
  ];
  const selected = "الرياض";

  return (
    <div
      style={{
        width: 420,
        background: colors.surface.white,
        border: `1px solid ${colors.border.default}`,
        borderRadius: radius.lg,
        padding: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* Search */}
      <div style={{ position: "relative", marginBottom: 14 }}>
        <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }} />
        <input
          style={{
            width: "100%",
            height: 40,
            paddingInlineStart: 36,
            paddingInlineEnd: 12,
            background: colors.surface.page,
            border: `1px solid ${colors.border.default}`,
            borderRadius: 8,
            fontFamily: fonts.body,
            fontSize: 13,
            outline: "none",
          }}
          placeholder="ابحث عن مدينة..."
        />
      </div>

      {/* Most popular */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body, marginBottom: 8 }}>
          الأكثر شيوعاً
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["الرياض", "جدة", "الدمام", "مكة"].map((c) => (
            <button
              key={c}
              style={{
                padding: "6px 12px",
                background: c === selected ? colors.brand.green : colors.brand.greenSoft,
                color: c === selected ? "#fff" : colors.brand.greenDark,
                border: c === selected ? "none" : `1px solid ${colors.brand.green}40`,
                borderRadius: radius.full,
                fontFamily: fonts.body,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {c === selected && <Check size={11} />}
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* By region */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 280, overflowY: "auto", paddingInlineEnd: 4 }}>
        {regions.map((region) => (
          <div key={region.name}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <MapPin size={11} color={colors.ink.muted} />
              <span style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.ink.body, letterSpacing: 0.5 }}>
                المنطقة {region.name}
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, paddingInlineStart: 17 }}>
              {region.cities.map((c) => {
                const isFeatured = region.featured.includes(c);
                return (
                  <button
                    key={c}
                    style={{
                      padding: "4px 10px",
                      background: isFeatured ? colors.surface.page : "transparent",
                      color: isFeatured ? colors.ink.black : colors.ink.body,
                      border: `1px solid ${isFeatured ? colors.border.strong : colors.border.soft}`,
                      borderRadius: radius.sm,
                      fontFamily: fonts.body,
                      fontSize: 12,
                      fontWeight: isFeatured ? 600 : 500,
                      cursor: "pointer",
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneField({ state, value, message }: { state: "default" | "valid" | "invalid" | "checking"; value?: string; message?: string }) {
  const isValid = state === "valid";
  const isInvalid = state === "invalid";
  const isChecking = state === "checking";
  const borderColor = isValid ? colors.brand.green : isInvalid ? colors.accent.red : colors.border.default;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body }}>
        رقم الجوال السعودي
      </label>
      <div style={{ position: "relative" }}>
        <input
          defaultValue={value}
          placeholder="5XXXXXXXX"
          style={{
            width: "100%",
            height: 48,
            paddingInlineStart: 16,
            paddingInlineEnd: 80,
            background: colors.surface.white,
            border: `1.5px solid ${borderColor}`,
            borderRadius: radius.md,
            fontFamily: fonts.latin,
            fontSize: 15,
            color: colors.ink.body,
            outline: "none",
            boxShadow: isValid || isInvalid ? `0 0 0 3px rgba(15,15,15,0.06)` : "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            insetInlineEnd: 12,
            top: "50%",
            transform: "translateY(-50%)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: fonts.latin,
            fontSize: 13,
            fontWeight: 700,
            color: colors.ink.body,
          }}
        >
          {isValid && (
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: colors.brand.green, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={13} strokeWidth={3} />
            </span>
          )}
          {isInvalid && (
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: colors.accent.red, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <X size={13} strokeWidth={3} />
            </span>
          )}
          {isChecking && (
            <span style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${colors.border.default}`, borderTopColor: colors.brand.green, animation: "spin 0.8s linear infinite" }} />
          )}
          <span>🇸🇦 +966</span>
        </div>
      </div>
      {message && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: fonts.body,
            fontSize: 11,
            color: isValid ? colors.brand.green : isInvalid ? colors.accent.red : colors.ink.muted,
            fontWeight: 600,
          }}
        >
          {isValid && <Check size={11} />}
          {isInvalid && <AlertCircle size={11} />}
          {message}
        </div>
      )}
      <style>{`@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function NIDField({ state, value, message }: { state: "default" | "valid" | "invalid"; value?: string; message?: string }) {
  const isValid = state === "valid";
  const isInvalid = state === "invalid";
  const borderColor = isValid ? colors.brand.green : isInvalid ? colors.accent.red : colors.border.default;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body }}>
        رقم الهوية الوطنية
      </label>
      <div style={{ position: "relative" }}>
        <input
          defaultValue={value}
          placeholder="1XXXXXXXXX"
          style={{
            width: "100%",
            height: 48,
            paddingInlineStart: 16,
            paddingInlineEnd: 48,
            background: colors.surface.white,
            border: `1.5px solid ${borderColor}`,
            borderRadius: radius.md,
            fontFamily: fonts.latin,
            fontSize: 15,
            letterSpacing: 1,
            color: colors.ink.body,
            outline: "none",
            boxShadow: isValid || isInvalid ? `0 0 0 3px rgba(15,15,15,0.06)` : "none",
          }}
        />
        {(isValid || isInvalid) && (
          <span
            style={{
              position: "absolute",
              insetInlineEnd: 12,
              top: "50%",
              transform: "translateY(-50%)",
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: isValid ? colors.brand.green : colors.accent.red,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isValid ? <Check size={13} strokeWidth={3} /> : <X size={13} strokeWidth={3} />}
          </span>
        )}
      </div>
      {message && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: fonts.body,
            fontSize: 11,
            color: isValid ? colors.brand.green : colors.accent.red,
            fontWeight: 600,
          }}
        >
          {isValid && <Check size={11} />}
          {isInvalid && <AlertCircle size={11} />}
          {message}
        </div>
      )}
    </div>
  );
}

function Showcase({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: 20, padding: 24 }}>
      <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.ink.body, marginBottom: 14 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

export default function SaudiCulturalSection() {
  return (
    <section id="saudi-cultural" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="23"
        eyebrow="مكونات سعودية"
        title="خاص بالسعودية"
        description="تقويم هجري، اختيار المدن، تحقق من الجوال والهوية."
        accentColor={colors.brand.green}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "start" }}>
          <Showcase title="Hijri/Gregorian Calendar · dual">
            <HijriGregorianCalendar />
          </Showcase>

          <Showcase title="City Selector · بحث + مناطق">
            <CitySelector />
          </Showcase>
        </div>

        <Showcase title="Saudi Phone Validator · 4 states">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <PhoneField state="default" />
            <PhoneField state="checking" value="55123" message="جاري التحقق من الرقم..." />
            <PhoneField state="valid" value="551234567" message="رقم صحيح ومتاح للتسجيل" />
            <PhoneField state="invalid" value="07123" message="رقم غير صحيح · يجب أن يبدأ بـ 5" />
          </div>
        </Showcase>

        <Showcase title="National ID Validator · Luhn algorithm check">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <NIDField state="valid" value="1075834928" message="رقم هوية صحيح" />
            <NIDField state="invalid" value="1075834921" message="رقم غير صحيح · check digit لا يطابق" />
          </div>
          <div
            style={{
              marginTop: 16,
              padding: 14,
              background: colors.brand.greenSoft,
              border: `1px solid ${colors.brand.green}40`,
              borderRadius: radius.md,
              fontFamily: fonts.body,
              fontSize: 12,
              color: colors.ink.body,
              lineHeight: 1.7,
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
            }}
          >
            <CreditCard size={16} color={colors.brand.green} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong>التحقق المحلي بدون API:</strong> نستخدم خوارزمية Luhn modulus 11 للتحقق من الـ check digit في رقم الهوية السعودية. هذا يضمن صحة التنسيق قبل إرسال أي طلب للسيرفر.
            </div>
          </div>
        </Showcase>
      </div>
    </section>
  );
}
