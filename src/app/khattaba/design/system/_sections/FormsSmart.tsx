import { Check, X, AlertCircle, Eye, EyeOff, Loader2, CloudCheck, Cloud, CloudOff, ArrowRight } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

function MultiStepNav() {
  const steps = [
    { num: 1, label: "البيانات الأساسية", sub: "الاسم، العمر، الجنسية", status: "done" as const },
    { num: 2, label: "تفضيلات الطرف الآخر", sub: "المواصفات المطلوبة", status: "done" as const },
    { num: 3, label: "التحقق من الجوال", sub: "إدخال رمز OTP", status: "active" as const },
    { num: 4, label: "مراجعة الإدارة", sub: "بانتظار اعتماد طلبك", status: "pending" as const },
    { num: 5, label: "الدفع والتفعيل", sub: "تحديد المبلغ والدفع", status: "pending" as const },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        padding: 8,
      }}
    >
      {steps.map((s, i) => {
        const isDone = s.status === "done";
        const isActive = s.status === "active";
        const isLast = i === steps.length - 1;
        return (
          <div key={s.num}>
            <div
              style={{
                display: "flex",
                gap: 14,
                padding: 14,
                background: isActive ? colors.brand.greenSoft : "transparent",
                borderRadius: radius.md,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: isDone ? colors.brand.green : isActive ? "#fff" : colors.surface.page,
                  color: isDone ? "#fff" : isActive ? colors.brand.green : colors.ink.muted,
                  border: isActive ? `3px solid ${colors.brand.green}` : isDone ? "none" : `2px solid ${colors.border.default}`,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: fonts.latin,
                  fontSize: 14,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {isDone ? <Check size={16} strokeWidth={3} /> : s.num}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: 14,
                    fontWeight: 700,
                    color: isActive ? colors.brand.greenDark : isDone ? colors.ink.body : colors.ink.muted,
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 11,
                    color: colors.ink.muted,
                    marginTop: 2,
                  }}
                >
                  {s.sub}
                </div>
              </div>
              {isDone && (
                <span style={{ fontFamily: fonts.body, fontSize: 10, fontWeight: 700, color: colors.brand.green, padding: "2px 8px", background: colors.brand.greenSoft, borderRadius: 4 }}>
                  مكتمل
                </span>
              )}
              {isActive && (
                <ArrowRight size={16} color={colors.brand.green} style={{ transform: "rotate(180deg)" }} />
              )}
            </div>
            {!isLast && (
              <div
                style={{
                  marginInlineStart: 25,
                  width: 2,
                  height: 12,
                  background: isDone ? colors.brand.green : colors.border.default,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function PasswordStrength({ level }: { level: 0 | 1 | 2 | 3 | 4 }) {
  const labels = ["ضعيفة جداً", "ضعيفة", "متوسطة", "قوية", "ممتازة"];
  const colors_ = ["#9CA3AF", colors.accent.red, colors.accent.amber, colors.accent.blue, colors.brand.green];
  const value = "Mohamed2026!";
  const criteria = [
    { label: "8 أحرف على الأقل", met: level >= 1 },
    { label: "حرف كبير وحرف صغير", met: level >= 2 },
    { label: "رقم على الأقل", met: level >= 3 },
    { label: "رمز خاص ($, !, @)", met: level >= 4 },
  ];
  return (
    <div>
      <label style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body, display: "block", marginBottom: 6 }}>
        كلمة المرور
      </label>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          defaultValue={value}
          style={{
            width: "100%",
            height: 48,
            paddingInlineStart: 16,
            paddingInlineEnd: 48,
            background: colors.surface.white,
            border: `1.5px solid ${level >= 3 ? colors.brand.green : colors.border.default}`,
            borderRadius: radius.md,
            fontFamily: fonts.latin,
            fontSize: 15,
            color: colors.ink.body,
            outline: "none",
          }}
        />
        <button
          style={{
            position: "absolute",
            insetInlineEnd: 12,
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            color: colors.ink.muted,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Eye size={16} />
        </button>
      </div>

      {/* Strength bars */}
      <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: i <= level ? colors_[level] : colors.border.default,
              transition: "all 0.2s",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>
          القوة:
        </span>
        <span style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors_[level] }}>
          {labels[level]}
        </span>
      </div>

      {/* Criteria */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 12 }}>
        {criteria.map((c) => (
          <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: c.met ? colors.brand.green : "transparent",
                color: c.met ? "#fff" : colors.ink.soft,
                border: c.met ? "none" : `1.5px dashed ${colors.border.strong}`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {c.met ? <Check size={10} strokeWidth={3} /> : <X size={9} strokeWidth={2.5} />}
            </span>
            <span style={{ fontFamily: fonts.body, fontSize: 12, color: c.met ? colors.ink.body : colors.ink.muted }}>
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsernameCheck({ state, value, message }: { state: "default" | "checking" | "available" | "taken"; value?: string; message?: string }) {
  const isAvailable = state === "available";
  const isTaken = state === "taken";
  const isChecking = state === "checking";
  const borderColor = isAvailable ? colors.brand.green : isTaken ? colors.accent.red : colors.border.default;
  return (
    <div>
      <label style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body, display: "block", marginBottom: 6 }}>
        اسم المستخدم
      </label>
      <div style={{ position: "relative" }}>
        <input
          defaultValue={value}
          placeholder="ahmed_ali"
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
            color: colors.ink.body,
            outline: "none",
            boxShadow: isAvailable || isTaken ? `0 0 0 3px rgba(15,15,15,0.06)` : "none",
          }}
        />
        <span
          style={{
            position: "absolute",
            insetInlineEnd: 12,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {isChecking && <Loader2 size={18} color={colors.brand.green} style={{ animation: "spin 0.8s linear infinite" }} />}
          {isAvailable && (
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: colors.brand.green, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={13} strokeWidth={3} />
            </span>
          )}
          {isTaken && (
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: colors.accent.red, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <X size={13} strokeWidth={3} />
            </span>
          )}
        </span>
      </div>
      {message && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: fonts.body,
            fontSize: 11,
            color: isAvailable ? colors.brand.green : isTaken ? colors.accent.red : colors.ink.muted,
            fontWeight: 600,
            marginTop: 6,
          }}
        >
          {message}
        </div>
      )}
      <style>{`@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function ErrorSummary() {
  const errors = [
    { field: "الاسم الكامل", message: "يجب أن يحتوي على اسمك الأول والأخير على الأقل" },
    { field: "تاريخ الميلاد", message: "هذا الحقل مطلوب" },
    { field: "رقم الجوال", message: "صيغة الرقم غير صحيحة — يجب أن يبدأ بـ 5" },
    { field: "كلمة المرور", message: "ضعيفة جداً — أضف رمز خاص ورقم" },
  ];
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${colors.accent.redSoft}, ${colors.accent.red}08)`,
        border: `1px solid ${colors.accent.red}30`,
        borderRadius: radius.lg,
        padding: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: colors.accent.red,
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <AlertCircle size={20} />
        </div>
        <div>
          <div style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.accent.red }}>
            <span style={{ fontFamily: fonts.latin }}>4</span> أخطاء تحتاج للتصحيح
          </div>
          <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 2 }}>
            صحّح الحقول التالية للمتابعة
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {errors.map((e, i) => (
          <div
            key={i}
            style={{
              padding: "10px 12px",
              background: colors.surface.white,
              border: `1px solid ${colors.accent.red}25`,
              borderRadius: radius.md,
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontFamily: fonts.latin,
                fontSize: 10,
                fontWeight: 700,
                color: colors.accent.red,
                padding: "2px 6px",
                background: colors.accent.redSoft,
                borderRadius: 4,
                marginTop: 1,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.ink.black }}>
                {e.field}
              </div>
              <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, marginTop: 2 }}>
                {e.message}
              </div>
            </div>
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: 10,
                fontWeight: 700,
                color: colors.accent.red,
                cursor: "pointer",
              }}
            >
              انتقل ←
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveField({ state, label, value }: { state: "default" | "valid" | "invalid" | "warning"; label: string; value: string }) {
  const colorMap = {
    default: { border: colors.border.default, msg: "" },
    valid: { border: colors.brand.green, msg: "✓ صحيح" },
    invalid: { border: colors.accent.red, msg: "✗ غير صحيح" },
    warning: { border: colors.accent.amber, msg: "⚠️ يحتاج مراجعة" },
  };
  const cfg = colorMap[state];
  return (
    <div>
      <label style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body, display: "block", marginBottom: 6 }}>
        {label}
      </label>
      <input
        defaultValue={value}
        style={{
          width: "100%",
          height: 44,
          padding: "0 14px",
          background: colors.surface.white,
          border: `1.5px solid ${cfg.border}`,
          borderRadius: radius.md,
          fontFamily: fonts.body,
          fontSize: 14,
          outline: "none",
        }}
      />
      {cfg.msg && (
        <div style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 600, marginTop: 4, color: cfg.border }}>
          {cfg.msg}
        </div>
      )}
    </div>
  );
}

function CharCounter() {
  const max = 500;
  const used = 87;
  const percent = (used / max) * 100;
  const isNearLimit = percent > 80;
  return (
    <div>
      <label style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body, display: "block", marginBottom: 6 }}>
        نبذة عن نفسي
      </label>
      <textarea
        style={{
          width: "100%",
          height: 100,
          padding: 14,
          background: colors.surface.white,
          border: `1.5px solid ${colors.border.default}`,
          borderRadius: radius.md,
          fontFamily: fonts.body,
          fontSize: 14,
          color: colors.ink.body,
          outline: "none",
          resize: "none",
          lineHeight: 1.7,
        }}
        defaultValue="أبحث عن شريكة حياة من عائلة كريمة، ملتزمة وذات أخلاق عالية..."
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
        <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>
          أوصِف نفسك بصدق
        </span>
        <span
          style={{
            fontFamily: fonts.latin,
            fontSize: 11,
            fontWeight: 700,
            color: isNearLimit ? colors.accent.amber : colors.ink.muted,
          }}
        >
          {used} / {max}
        </span>
      </div>
    </div>
  );
}

function AutoSave({ state }: { state: "saved" | "saving" | "error" }) {
  const map = {
    saved:  { icon: CloudCheck, color: colors.brand.green, msg: "تم الحفظ تلقائياً" },
    saving: { icon: Cloud, color: colors.accent.blue, msg: "جاري الحفظ..." },
    error:  { icon: CloudOff, color: colors.accent.red, msg: "فشل الحفظ — أعد المحاولة" },
  };
  const { icon: Icon, color, msg } = map[state];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        background: `${color}10`,
        border: `1px solid ${color}30`,
        borderRadius: radius.full,
        fontFamily: fonts.body,
        fontSize: 12,
        fontWeight: 600,
        color,
      }}
    >
      <Icon size={14} style={state === "saving" ? { animation: "pulse 1.5s ease-in-out infinite" } : undefined} />
      <span>{msg}</span>
      {state === "saved" && (
        <span style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted, fontWeight: 500 }}>
          · قبل ثانيتين
        </span>
      )}
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
    </div>
  );
}

function Showcase({ title, children, cols = 1 }: { title: string; children: React.ReactNode; cols?: number }) {
  return (
    <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: 20, padding: 24 }}>
      <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.ink.body, marginBottom: 14 }}>
        {title}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 20 }}>{children}</div>
    </div>
  );
}

export default function FormsSmartSection() {
  return (
    <section id="forms-smart" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="25"
        eyebrow="نماذج ذكية"
        title="نماذج ذكية"
        description="تنقّل متعدد الخطوات، قوة كلمة المرور، تحقق فوري، حفظ تلقائي."
        accentColor={colors.accent.purple}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Showcase title="Multi-Step Form Navigator · مع sub-text وstatus">
          <MultiStepNav />
        </Showcase>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Showcase title="Password Strength · 4 levels">
            <PasswordStrength level={3} />
          </Showcase>
          <Showcase title="Username Availability · 4 states">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <UsernameCheck state="checking" value="ahmed_ali" message="جاري التحقق..." />
              <UsernameCheck state="available" value="mohamed_2026" message="متاح! يمكنك استخدامه" />
              <UsernameCheck state="taken" value="khalid" message="مستخدم بالفعل — جرّب اسم آخر" />
            </div>
          </Showcase>
        </div>

        <Showcase title="Live Field Validation · أثناء الكتابة" cols={2}>
          <LiveField state="valid" label="البريد الإلكتروني" value="ahmed@example.com" />
          <LiveField state="invalid" label="البريد الإلكتروني" value="ahmed@invalid" />
          <LiveField state="warning" label="رقم بطاقة الائتمان" value="4218 1234" />
          <LiveField state="default" label="العنوان" value="" />
        </Showcase>

        <Showcase title="Error Summary Card · في أعلى النموذج">
          <ErrorSummary />
        </Showcase>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 20, alignItems: "start" }}>
          <Showcase title="Character Counter · مع warning">
            <CharCounter />
          </Showcase>
          <Showcase title="Auto-Save Indicator · 3 states">
            <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
              <AutoSave state="saved" />
              <AutoSave state="saving" />
              <AutoSave state="error" />
            </div>
          </Showcase>
        </div>
      </div>
    </section>
  );
}
