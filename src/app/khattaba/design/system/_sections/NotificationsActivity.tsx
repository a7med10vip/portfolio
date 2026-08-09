import { Bell, Heart, MessageCircle, Wallet, UserCheck, ShieldAlert, FileSignature, Settings, MoreHorizontal, Ban, Edit3, LogIn } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

type NotifVariant = "request" | "message" | "payment" | "system" | "verified" | "warning";

const variantConfig: Record<NotifVariant, { icon: any; color: string }> = {
  request:  { icon: Heart, color: colors.brand.green },
  message:  { icon: MessageCircle, color: colors.accent.purple },
  payment:  { icon: Wallet, color: colors.accent.blue },
  verified: { icon: UserCheck, color: colors.brand.green },
  system:   { icon: Settings, color: colors.ink.muted },
  warning:  { icon: ShieldAlert, color: colors.accent.red },
};

type NotifItem = {
  variant: NotifVariant;
  title: string;
  body: string;
  time: string;
  unread?: boolean;
};

const notifs: NotifItem[] = [
  { variant: "request",  title: "طلب تواصل جديد", body: "نورة الشهري ترغب بالتواصل معك",                       time: "منذ 3 دقائق", unread: true },
  { variant: "message",  title: "رسالة جديدة",     body: "رسالة من نورة في مشروع خطبة #2487",                  time: "منذ 12 دقيقة", unread: true },
  { variant: "verified", title: "تم توثيق حسابك",   body: "تم اعتماد بياناتك من إدارة المنصة",                    time: "منذ ساعة", unread: true },
  { variant: "payment",  title: "تأكيد دفعة",       body: "تم استلام مبلغ 1,800 ر.س — فاتورة #INV-0428",         time: "منذ 3 ساعات" },
  { variant: "system",   title: "تحديث إعدادات",   body: "تم تحديث إعدادات الإشعارات بنجاح",                     time: "أمس · 18:32" },
  { variant: "warning",  title: "محاولة دخول مشبوهة", body: "تم رصد محاولة دخول من جهاز جديد · iPhone 15",      time: "أمس · 09:15" },
];

function NotifRow({ n, inDropdown }: { n: NotifItem; inDropdown?: boolean }) {
  const { icon: Icon, color } = variantConfig[n.variant];
  return (
    <div
      style={{
        padding: inDropdown ? "12px 14px" : "14px 18px",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        background: n.unread ? colors.brand.greenTint : "transparent",
        borderInlineStart: n.unread ? `3px solid ${colors.brand.green}` : "3px solid transparent",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: `${color}14`,
          color,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={16} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <span
            style={{
              fontFamily: fonts.heading,
              fontSize: 13,
              fontWeight: 700,
              color: colors.ink.black,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {n.title}
          </span>
          {n.unread && <span style={{ width: 7, height: 7, borderRadius: "50%", background: colors.brand.green, flexShrink: 0, marginTop: 5 }} />}
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, marginTop: 2, lineHeight: 1.5 }}>
          {n.body}
        </div>
        <div style={{ fontFamily: fonts.latin, fontSize: 10, fontWeight: 600, color: colors.ink.soft, marginTop: 4 }}>
          {n.time}
        </div>
      </div>
    </div>
  );
}

function NotifDropdown() {
  return (
    <div
      style={{
        width: 380,
        background: colors.surface.white,
        border: `1px solid ${colors.border.default}`,
        borderRadius: radius.lg,
        boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 18px",
          borderBottom: `1px solid ${colors.border.soft}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: colors.surface.page,
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <Bell size={16} color={colors.ink.body} />
          <span style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>
            الإشعارات
          </span>
          <span
            style={{
              padding: "2px 7px",
              background: colors.accent.red,
              color: "#fff",
              borderRadius: 999,
              fontFamily: fonts.latin,
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            3
          </span>
        </div>
        <button
          style={{
            background: "transparent",
            border: "none",
            fontFamily: fonts.body,
            fontSize: 11,
            color: colors.brand.green,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          تحديد الكل كمقروء
        </button>
      </div>
      <div style={{ maxHeight: 420, overflowY: "auto" }}>
        {notifs.slice(0, 5).map((n, i) => (
          <div key={i} style={{ borderBottom: i < 4 ? `1px solid ${colors.border.soft}` : "none" }}>
            <NotifRow n={n} inDropdown />
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "10px 14px",
          background: colors.surface.page,
          borderTop: `1px solid ${colors.border.soft}`,
          textAlign: "center",
        }}
      >
        <button
          style={{
            background: "transparent",
            border: "none",
            fontFamily: fonts.body,
            fontSize: 12,
            color: colors.brand.green,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          عرض كل الإشعارات →
        </button>
      </div>
    </div>
  );
}

function NotifListPage() {
  const groups: { label: string; items: NotifItem[] }[] = [
    { label: "اليوم", items: notifs.slice(0, 3) },
    { label: "أمس", items: notifs.slice(3, 5) },
    { label: "هذا الأسبوع", items: [notifs[5]] },
  ];
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          borderBottom: `1px solid ${colors.border.default}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.black, margin: 0 }}>
            مركز الإشعارات
          </h3>
          <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 2 }}>
            <span style={{ fontFamily: fonts.latin, fontWeight: 700, color: colors.accent.red }}>3</span> غير مقروءة
          </div>
        </div>
        <div style={{ display: "inline-flex", gap: 6 }}>
          {["الكل", "الطلبات", "المحادثات", "النظام"].map((t, i) => (
            <button
              key={t}
              style={{
                padding: "6px 14px",
                background: i === 0 ? colors.brand.green : colors.surface.page,
                color: i === 0 ? "#fff" : colors.ink.body,
                border: i === 0 ? "none" : `1px solid ${colors.border.default}`,
                borderRadius: radius.full,
                fontFamily: fonts.body,
                fontSize: 12,
                fontWeight: i === 0 ? 700 : 500,
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        {groups.map((g) => (
          <div key={g.label}>
            <div
              style={{
                padding: "10px 20px",
                background: colors.surface.page,
                borderBottom: `1px solid ${colors.border.soft}`,
                fontFamily: fonts.body,
                fontSize: 12,
                fontWeight: 600,
                color: colors.ink.body,
              }}
            >
              {g.label}
            </div>
            {g.items.map((n, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${colors.border.soft}` }}>
                <NotifRow n={n} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

type ActivityItem = { icon: any; color: string; title: string; sub: string; time: string };

const activities: ActivityItem[] = [
  { icon: Heart,         color: colors.brand.green,   title: "أرسلت طلب تواصل لـ نورة الشهري",       sub: "مشروع خطبة #2487",      time: "منذ 5 دقائق" },
  { icon: MessageCircle, color: colors.accent.purple, title: "بدأت محادثة جديدة في مشروع #2487",      sub: "نورة الشهري",            time: "منذ 12 دقيقة" },
  { icon: Wallet,        color: colors.accent.blue,   title: "تم دفع رسوم اتفاقية ما قبل الواتساب",   sub: "500 ر.س · فاتورة #IN-0429", time: "منذ ساعة" },
  { icon: UserCheck,     color: colors.brand.green,   title: "تم اعتماد بياناتك من الإدارة",          sub: "حسابك أصبح نشطاً وموثّقاً", time: "منذ 4 ساعات" },
  { icon: Edit3,         color: colors.accent.amber,  title: "حدّثت معلومات بروفايلك",                sub: "تم تعديل: المؤهل، الوظيفة", time: "أمس · 14:32" },
  { icon: LogIn,         color: colors.ink.muted,     title: "سجّلت دخولاً جديداً",                   sub: "من iPhone 15 Pro · الرياض", time: "أمس · 09:15" },
];

function ActivityTimeline() {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        padding: 24,
      }}
    >
      <div style={{ marginBottom: 18 }}>
        <h3 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black, margin: 0 }}>
          سجل نشاطك
        </h3>
        <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 4 }}>
          آخر 7 أيام
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            insetInlineStart: 19,
            top: 14,
            bottom: 14,
            width: 2,
            background: colors.border.default,
          }}
        />
        {activities.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={i} style={{ display: "flex", gap: 16, paddingBottom: i < activities.length - 1 ? 20 : 0 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: colors.surface.white,
                  border: `2px solid ${a.color}`,
                  color: a.color,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  zIndex: 1,
                }}
              >
                <Icon size={16} />
              </div>
              <div style={{ flex: 1, paddingTop: 8 }}>
                <div style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>
                  {a.title}
                </div>
                <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 3, lineHeight: 1.5 }}>
                  {a.sub}
                </div>
                <div style={{ fontFamily: fonts.latin, fontSize: 10, fontWeight: 600, color: colors.ink.soft, marginTop: 4 }}>
                  {a.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type AuditEntry = {
  actor: string;
  actorRole: string;
  action: string;
  target: string;
  time: string;
  ip: string;
  severity: "info" | "warning" | "critical";
};

const audits: AuditEntry[] = [
  { actor: "أحمد علي", actorRole: "Super Admin", action: "حظر عضو", target: "خالد العتيبي · KH1-00430", time: "24 فبراير · 14:32:18", ip: "176.45.12.88", severity: "critical" },
  { actor: "نورة المنصور", actorRole: "Moderator", action: "اعتماد طلب تسجيل", target: "محمد الأحمدي · KH1-00428", time: "24 فبراير · 12:08:44", ip: "176.45.12.21", severity: "info" },
  { actor: "أحمد علي", actorRole: "Super Admin", action: "تعديل صلاحيات", target: "حساب أدمن: نورة المنصور",  time: "23 فبراير · 18:22:01", ip: "176.45.12.88", severity: "warning" },
  { actor: "Support Team", actorRole: "Support", action: "تدخل في محادثة", target: "مشروع خطبة #2487", time: "23 فبراير · 16:45:12", ip: "176.45.12.45", severity: "warning" },
];

function AuditLog() {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${colors.border.default}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black, margin: 0 }}>
            سجل المراجعة (Audit Log)
          </h3>
          <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, marginTop: 2 }}>
            كل الإجراءات الحساسة على المنصة
          </div>
        </div>
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: 11,
            fontWeight: 600,
            color: colors.brand.green,
            padding: "3px 10px",
            background: colors.brand.greenSoft,
            borderRadius: 6,
          }}
        >
          سجل دائم
        </span>
      </div>
      <div>
        {audits.map((a, i) => {
          const sevColor =
            a.severity === "critical" ? colors.accent.red : a.severity === "warning" ? colors.accent.amber : colors.accent.blue;
          return (
            <div
              key={i}
              style={{
                padding: "14px 20px",
                display: "grid",
                gridTemplateColumns: "4px 1fr 200px 120px 36px",
                gap: 16,
                alignItems: "center",
                borderBottom: i < audits.length - 1 ? `1px solid ${colors.border.soft}` : "none",
              }}
            >
              <div style={{ width: 4, height: 32, background: sevColor, borderRadius: 2 }} />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>{a.actor}</span>
                  <span
                    style={{
                      fontFamily: fonts.latin,
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: 1,
                      color: colors.ink.muted,
                      padding: "1px 6px",
                      background: colors.surface.page,
                      borderRadius: 4,
                    }}
                  >
                    {a.actorRole}
                  </span>
                </div>
                <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.body, marginTop: 3 }}>
                  <strong>{a.action}</strong> · {a.target}
                </div>
              </div>
              <div style={{ fontFamily: fonts.latin, fontSize: 11, color: colors.ink.muted }}>
                <div>{a.time}</div>
                <div style={{ marginTop: 2, opacity: 0.7 }}>IP: {a.ip}</div>
              </div>
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: 10,
                  fontWeight: 700,
                  textAlign: "center",
                  padding: "3px 8px",
                  background: `${sevColor}14`,
                  color: sevColor,
                  borderRadius: 6,
                  border: `1px solid ${sevColor}40`,
                }}
              >
                {a.severity === "critical" ? "حرج" : a.severity === "warning" ? "تحذير" : "معلومة"}
              </span>
              <button style={{ width: 28, height: 28, background: "transparent", border: "none", cursor: "pointer", color: colors.ink.muted, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <MoreHorizontal size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PresenceList() {
  const users = [
    { name: "نورة", color: colors.accent.purple, status: "online" as const,  photo: "/khattaba/avatars/niqab-woman-brown.png" },
    { name: "محمد", color: colors.brand.green,   status: "online" as const,  photo: "/avatars/saudi-male.jpeg" },
    { name: "سارة", color: colors.accent.amber,  status: "online" as const,  photo: "/khattaba/avatars/niqab-woman-blue.png" },
    { name: "خالد", color: colors.accent.blue,   status: "away" as const,    photo: "/avatars/saudi-male-2.jpeg" },
    { name: "ريم",  color: colors.accent.red,    status: "offline" as const, photo: "/khattaba/avatars/niqab-woman-brown.png" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {users.map((u) => {
        const statusColor = u.status === "online" ? colors.brand.green : u.status === "away" ? colors.accent.amber : colors.ink.soft;
        const statusLabel = u.status === "online" ? "متصل الآن" : u.status === "away" ? "بعيد منذ 12 دقيقة" : "غير متصل · آخر ظهور قبل ساعتين";
        return (
          <div key={u.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              {u.photo ? (
                <img
                  src={u.photo}
                  alt={u.name}
                  width={40}
                  height={40}
                  style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${u.color}, ${u.color}cc)`,
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fonts.heading,
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  {u.name[0]}
                </div>
              )}
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  insetInlineEnd: 0,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: statusColor,
                  border: `2px solid ${colors.surface.white}`,
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>{u.name}</div>
              <div style={{ fontFamily: fonts.body, fontSize: 11, color: statusColor, fontWeight: 600 }}>{statusLabel}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RealtimeCounter() {
  return (
    <div
      style={{
        background: colors.brand.purple,
        color: "#fff",
        padding: 24,
        borderRadius: radius.lg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: colors.brand.highlight,
            }}
          />
          <span style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: "#fff" }}>
            يتحدّث الآن مباشرة
          </span>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {[
            { label: "متصلون الآن", value: "147" },
            { label: "محادثات جارية", value: "32" },
            { label: "طلبات جديدة اليوم", value: "18" },
          ].map((m) => (
            <div key={m.label}>
              <div style={{ fontFamily: fonts.heading, fontSize: 36, fontWeight: 700, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                <span style={{ fontFamily: fonts.latin }}>{m.value}</span>
              </div>
              <div style={{ fontFamily: fonts.body, fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
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

export default function NotificationsActivitySection() {
  return (
    <section id="notifications" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="26"
        eyebrow="الإشعارات والنشاط"
        title="الإشعارات والنشاط"
        description="Dropdown، صفحة قائمة، Timeline، سجل مراجعة، ومؤشرات حضور."
        accentColor={colors.accent.amber}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "start" }}>
          <Showcase title="Bell Dropdown · من الـ navbar">
            <NotifDropdown />
          </Showcase>
          <Showcase title="Activity Timeline · سجل نشاط المستخدم">
            <ActivityTimeline />
          </Showcase>
        </div>

        <Showcase title="Notification List Page · صفحة كاملة">
          <NotifListPage />
        </Showcase>

        <Showcase title="Audit Log Entry · للأدمن - immutable record">
          <AuditLog />
        </Showcase>

        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "start" }}>
          <Showcase title="Live Presence · مع pulse animation">
            <div style={{ minWidth: 280 }}>
              <PresenceList />
            </div>
          </Showcase>
          <Showcase title="Real-time Counter · يتحدّث تلقائياً">
            <RealtimeCounter />
          </Showcase>
        </div>
      </div>
    </section>
  );
}
