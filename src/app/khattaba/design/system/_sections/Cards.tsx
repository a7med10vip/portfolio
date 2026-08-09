import { MapPin, Users, ShieldCheck, Heart, TrendingUp, MessageCircle, Wallet, Clock, BadgeCheck, Crown } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

function Avatar({ color = colors.brand.green, label = "أ", photo }: { color?: string; label?: string; photo?: string }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={label}
        width={64}
        height={64}
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          objectFit: "cover",
          background: colors.surface.page,
          boxShadow: `0 4px 12px rgba(0,0,0,0.10)`,
          flexShrink: 0,
          display: "block",
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.heading,
        fontSize: 26,
        fontWeight: 700,
        color: "#fff",
        boxShadow: "none",
        flexShrink: 0,
      }}
    >
      {label}
    </div>
  );
}

function ProfileCard({ name, age, city, color, verified, premium, photo }: { name: string; age: number; city: string; color: string; verified?: boolean; premium?: boolean; photo?: string }) {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        padding: 20,
        boxShadow: shadow.sm,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        position: "relative",
      }}
    >
      {premium && (
        <span
          style={{
            position: "absolute",
            top: 12,
            insetInlineStart: 12,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "3px 9px",
            background: colors.accent.amber,
            color: "#fff",
            borderRadius: radius.xs,
            fontFamily: fonts.body,
            fontSize: 10,
            fontWeight: 700,
          }}
        >
          <Crown size={10} fill="#fff" /> مميّز
        </span>
      )}
      <Avatar color={color} label={name[0]} photo={photo} />
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black }}>{name}</span>
          {verified && <BadgeCheck size={14} color={colors.brand.green} fill={colors.brand.greenSoft} />}
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginTop: 2 }}>
          {age} سنة · سعودي/ة
        </div>
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 4, color: colors.ink.muted, fontSize: 11 }}>
        <MapPin size={11} /> <span>{city}</span>
      </div>
      <button
        style={{
          width: "100%",
          padding: "10px 16px",
          background: colors.brand.green,
          color: "#fff",
          border: "none",
          borderRadius: radius.md,
          fontFamily: fonts.body,
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginTop: 4,
        }}
      >
        <Heart size={14} /> أرغب في التواصل
      </button>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend, color }: { icon: any; label: string; value: string; trend?: string; color: string }) {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: `${color}14`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={20} color={color} />
        </div>
        {trend && (
          <span
            style={{
              fontFamily: fonts.latin,
              fontSize: 11,
              fontWeight: 700,
              color: colors.brand.green,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 8px",
              background: colors.brand.greenSoft,
              borderRadius: 6,
            }}
          >
            <TrendingUp size={11} /> {trend}
          </span>
        )}
      </div>
      <div>
        <div style={{ fontFamily: fonts.heading, fontSize: 32, fontWeight: 700, color: colors.ink.black, lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.muted, marginTop: 4 }}>{label}</div>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, color, title, body }: { icon: any; color: string; title: string; body: string }) {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        padding: 24,
        display: "flex",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: `${color}14`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={22} color={color} />
      </div>
      <div>
        <div style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: colors.ink.black, marginBottom: 6 }}>
          {title}
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.muted, lineHeight: 1.7 }}>{body}</div>
      </div>
    </div>
  );
}

function PhaseCard({ num, label, color, items }: { num: number; label: string; color: string; items: string[] }) {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        overflow: "hidden",
        display: "flex",
      }}
    >
      <div
        style={{
          width: 120,
          padding: 24,
          background: color,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <div style={{ fontFamily: fonts.heading, fontSize: 36, fontWeight: 700 }}>0{num}</div>
        <div style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, marginTop: 4, textAlign: "center" }}>{label}</div>
      </div>
      <div style={{ flex: 1, padding: 18, display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <span style={{ color, marginTop: 6 }}>•</span>
            <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.body, lineHeight: 1.6 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CardsSection() {
  return (
    <section id="cards" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="09"
        eyebrow="بطاقات العرض"
        title="البطاقات"
        description="أربعة أنواع: بروفايل، إحصائية، معلومة، مرحلة."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {/* Profile cards */}
        <div>
          <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.ink.body, marginBottom: 14 }}>
            بطاقات البروفايل
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            <ProfileCard name="محمد" age={32} city="الرياض" color={colors.brand.green} verified photo="/avatars/saudi-male.jpeg" />
            <ProfileCard name="نورة" age={28} city="الرياض" color={colors.accent.purple} verified photo="/khattaba/avatars/niqab-woman-brown.png" />
            <ProfileCard name="خالد" age={35} city="الدمام" color={colors.accent.blue} verified premium photo="/avatars/saudi-male-2.jpeg" />
            <ProfileCard name="سارة" age={26} city="جدة" color={colors.accent.amber} photo="/khattaba/avatars/niqab-woman-blue.png" />
          </div>
          <div
            style={{
              marginTop: 12,
              padding: 12,
              background: colors.brand.greenSoft,
              borderRadius: 10,
              fontFamily: fonts.body,
              fontSize: 12,
              color: colors.ink.body,
              border: `1px solid ${colors.brand.green}30`,
              lineHeight: 1.6,
            }}
          >
            الأفاتارات صور كرتونية (Memoji-style) مولّدة من خصائص العضو، أو حروف ملوّنة كبديل. لا تُستخدم صور حقيقية أبداً.
          </div>
        </div>

        {/* Stat cards */}
        <div>
          <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.ink.body, marginBottom: 14 }}>
            Stat Cards · Dashboard
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            <StatCard icon={Users} label="الأعضاء النشطين" value="2,458" trend="+12%" color={colors.brand.green} />
            <StatCard icon={MessageCircle} label="المحادثات الجارية" value="186" trend="+8%" color={colors.accent.purple} />
            <StatCard icon={Wallet} label="إيرادات الشهر" value="48K" trend="+24%" color={colors.accent.blue} />
            <StatCard icon={Clock} label="طلبات معلّقة" value="34" color={colors.accent.amber} />
          </div>
        </div>

        {/* Info cards */}
        <div>
          <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.ink.body, marginBottom: 14 }}>
            Info Cards · الميزات
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <InfoCard
              icon={ShieldCheck}
              color={colors.brand.green}
              title="مراجعة يدوية"
              body="كل تسجيل يمر على إدارة المنصة قبل التفعيل — لا قبول تلقائي، لا حسابات وهمية."
            />
            <InfoCard
              icon={MessageCircle}
              color={colors.accent.purple}
              title="شات مراقب"
              body="فلترة محتوى تلقائية + تدخل أدمن كطرف ثالث في غرف المحادثة عند الحاجة."
            />
          </div>
        </div>

        {/* Phase cards */}
        <div>
          <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.ink.body, marginBottom: 14 }}>
            Phase Cards · المراحل
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <PhaseCard
              num={1}
              label="التصميم"
              color={colors.brand.green}
              items={[
                "تصميم كامل لجميع صفحات الموقع",
                "تصميم لوحة التحكم الإدارية",
                "اعتماد الهوية البصرية",
              ]}
            />
            <PhaseCard
              num={2}
              label="التطوير"
              color={colors.accent.purple}
              items={["تحويل التصميم إلى كود Next.js", "بناء API + قاعدة البيانات", "ربط الخدمات الخارجية"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
