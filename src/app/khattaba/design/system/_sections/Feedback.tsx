import { CheckCircle2, AlertCircle, Info, AlertTriangle, X, Inbox, Bell } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

function Toast({ variant, title, body }: { variant: "success" | "error" | "info" | "warning"; title: string; body: string }) {
  const map = {
    success: { icon: CheckCircle2, color: colors.brand.green },
    error: { icon: AlertCircle, color: colors.accent.red },
    info: { icon: Info, color: colors.accent.blue },
    warning: { icon: AlertTriangle, color: colors.accent.amber },
  } as const;
  const { icon: Icon, color } = map[variant];
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderInlineStart: `4px solid ${color}`,
        borderRadius: radius.md,
        padding: "14px 16px",
        boxShadow: shadow.lg,
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        minWidth: 320,
        maxWidth: 420,
      }}
    >
      <Icon size={20} color={color} style={{ flexShrink: 0, marginTop: 2 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>
          {title}
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 4, lineHeight: 1.6 }}>
          {body}
        </div>
      </div>
      <button
        style={{
          width: 24,
          height: 24,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: colors.ink.soft,
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

function AlertBanner({ variant, title, body }: { variant: "success" | "error" | "info" | "warning"; title: string; body: string }) {
  const map = {
    success: { icon: CheckCircle2, color: colors.brand.green, bg: colors.brand.greenSoft },
    error: { icon: AlertCircle, color: colors.accent.red, bg: colors.accent.redSoft },
    info: { icon: Info, color: colors.accent.blue, bg: colors.accent.blueSoft },
    warning: { icon: AlertTriangle, color: colors.accent.amber, bg: colors.accent.amberSoft },
  } as const;
  const { icon: Icon, color, bg } = map[variant];
  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${color}40`,
        borderRadius: radius.md,
        padding: "14px 18px",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
      }}
    >
      <Icon size={20} color={color} style={{ flexShrink: 0, marginTop: 1 }} />
      <div>
        <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color }}>
          {title}
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.body, marginTop: 4, lineHeight: 1.7 }}>
          {body}
        </div>
      </div>
    </div>
  );
}

function Modal() {
  return (
    <div
      style={{
        position: "relative",
        background: "rgba(10,10,10,0.55)",
        padding: 40,
        borderRadius: radius.lg,
        minHeight: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 440,
          background: colors.surface.white,
          borderRadius: radius.lg,
          padding: 28,
          boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: colors.accent.redSoft,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AlertTriangle size={22} color={colors.accent.red} />
          </div>
          <button
            style={{
              width: 28,
              height: 28,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: colors.ink.muted,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={16} />
          </button>
        </div>
        <h3 style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: colors.ink.black, margin: 0 }}>
          تأكيد حظر العضو
        </h3>
        <p style={{ fontFamily: fonts.body, fontSize: 14, color: colors.ink.muted, marginTop: 8, lineHeight: 1.7 }}>
          سيتم حظر <strong style={{ color: colors.ink.black }}>محمد الأحمدي</strong> وإضافة رقمه إلى البلاك ليست.
          الإجراء غير قابل للتراجع تلقائياً.
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
          <button
            style={{
              padding: "10px 20px",
              background: "transparent",
              color: colors.ink.body,
              border: `1.5px solid ${colors.border.default}`,
              borderRadius: radius.md,
              fontFamily: fonts.body,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            إلغاء
          </button>
          <button
            style={{
              padding: "10px 20px",
              background: colors.accent.red,
              color: "#fff",
              border: "none",
              borderRadius: radius.md,
              fontFamily: fonts.body,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "none",
            }}
          >
            تأكيد الحظر
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        padding: 48,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: colors.surface.page,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Inbox size={32} color={colors.ink.soft} />
      </div>
      <div>
        <div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.black }}>
          لا توجد طلبات بعد
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.muted, marginTop: 6, maxWidth: 320 }}>
          عندما يرسل لك أحد الأعضاء طلب تواصل، سيظهر هنا. تصفّح البروفايلات لتبدأ.
        </div>
      </div>
      <button
        style={{
          padding: "10px 20px",
          background: colors.brand.green,
          color: "#fff",
          border: "none",
          borderRadius: radius.md,
          fontFamily: fonts.body,
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "none",
        }}
      >
        ابدأ التصفّح
      </button>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div style={skel(64, 64, "50%")} />
      <div style={skel(120, 16)} />
      <div style={skel(80, 12)} />
      <div style={skel(140, 36, 12)} />
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

function skel(w: number, h: number, r: number | string = 6): React.CSSProperties {
  return {
    width: w,
    height: h,
    borderRadius: r,
    background: "linear-gradient(90deg, #F4F4F5 0%, #EAEAEC 50%, #F4F4F5 100%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s ease-in-out infinite",
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.ink.body, marginBottom: 14 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

export default function FeedbackSection() {
  return (
    <section id="feedback" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="12"
        eyebrow="رسائل التنبيه"
        title="التنبيهات"
        description="إشعارات فورية، تنبيهات داخل الصفحة، نوافذ تأكيد، وحالات فارغة."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <Block title="Toast Notifications · 4 variants">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Toast variant="success" title="تم إرسال طلب التواصل" body="سيصل إشعار للطرف الآخر خلال دقائق عبر الواتساب." />
            <Toast variant="error" title="فشل الدفع" body="حدث خطأ أثناء معالجة البطاقة. يرجى المحاولة مرة أخرى." />
            <Toast variant="warning" title="رسالة تحتوي على محتوى محظور" body="تم حظر الرسالة وإشعار الإدارة. يرجى مراعاة قواعد المحادثة." />
            <Toast variant="info" title="تحديث جديد متاح" body="تم تحديث آلية البحث — جرّب الفلاتر الجديدة." />
          </div>
        </Block>

        <Block title="Alert Banners · داخل الصفحات">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <AlertBanner
              variant="warning"
              title="حسابك بانتظار المراجعة"
              body="ستصلك رسالة على الجوال عند انتهاء المراجعة. متوسط الوقت: 24-48 ساعة."
            />
            <AlertBanner
              variant="info"
              title="ميزة جديدة: فلتر القبيلة"
              body="أصبح بإمكانك تضييق البحث حسب القبيلة والفرع — جرّبها من قسم البحث."
            />
            <AlertBanner
              variant="error"
              title="تنبيه: محاولة دخول مشبوهة"
              body="رصدنا محاولة دخول من جهاز جديد. إذا لم تكن أنت، غيّر كلمة المرور فوراً."
            />
          </div>
        </Block>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <Block title="Modal · القرارات الحرجة">
            <Modal />
          </Block>

          <Block title="Empty State">
            <EmptyState />
          </Block>
        </div>

        <Block title="Skeleton Loader · أثناء التحميل">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </Block>
      </div>
    </section>
  );
}
