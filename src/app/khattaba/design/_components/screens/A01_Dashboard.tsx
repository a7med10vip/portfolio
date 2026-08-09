import { Users, MessageCircle, Wallet, UserPlus, TrendingUp, Eye, Check, X } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { AdminShell, KpiCard, card, StatusPill } from "./_admin/AdminShell";

/* A01 · لوحة التحكم — KPIs + رسوم + قائمة المراجعة + النشاط */

function LineChart({ points, color }: { points: number[]; color: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const W = 540, H = 160, P = 10;
  const step = (W - P * 2) / (points.length - 1);
  const d = points.map((v, i) => `${i === 0 ? "M" : "L"} ${P + i * step} ${H - P - ((v - min) / (max - min || 1)) * (H - P * 2)}`).join(" ");
  const area = d + ` L ${P + (points.length - 1) * step} ${H - P} L ${P} ${H - P} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none">
      <path d={area} fill={`${color}1A`} />
      <path d={d} stroke={color} strokeWidth={2.2} fill="none" />
      {points.map((v, i) => (
        <circle key={i} cx={P + i * step} cy={H - P - ((v - min) / (max - min || 1)) * (H - P * 2)} r={3} fill="#fff" stroke={color} strokeWidth={2} />
      ))}
    </svg>
  );
}

function Chart({ title, sub, color, points }: { title: string; sub: string; color: string; points: number[] }) {
  return (
    <div style={{ ...card, padding: 22 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black, margin: 0 }}>{title}</h3>
          <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, margin: "4px 0 0" }}>{sub}</p>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: fonts.latin, fontSize: 11, fontWeight: 700, color: colors.brand.green, padding: "3px 8px", background: colors.brand.greenSoft, borderRadius: 6 }}>
          <TrendingUp size={11} /> +18%
        </span>
      </div>
      <LineChart points={points} color={color} />
    </div>
  );
}

const pending = [
  { name: "ماجد العتيبي", meta: "32 سنة · جدة", date: "اليوم 10:42", avatar: "/avatars/saudi-male.jpeg" },
  { name: "هند الدوسري", meta: "26 سنة · الرياض", date: "اليوم 09:18", avatar: "/khattaba/avatars/niqab-woman-brown.png" },
  { name: "عبدالله الحربي", meta: "35 سنة · الدمام", date: "أمس 19:30", avatar: "/avatars/saudi-male-2.jpeg" },
  { name: "ريم القحطاني", meta: "29 سنة · مكة", date: "أمس 14:05", avatar: "/khattaba/avatars/niqab-woman-blue.png" },
];

const activity = [
  { text: "تم قبول العضو محمد الأحمدي وتحديد رسوم الاشتراك 1,500 ر.س", time: "10:42", kind: "success" as const },
  { text: "تم حجب رسالة في مشروع خطبة #4821 (رقم هاتف)", time: "09:55", kind: "warn" as const },
  { text: "تمديد مدة الشات لمشروع خطبة #4790 إلى 60 يوم", time: "09:12", kind: "info" as const },
  { text: "فشلت محاولة دفع للعضو #KH-1058", time: "08:30", kind: "danger" as const },
];

export default function A01Dashboard() {
  return (
    <AdminShell active="dashboard" title="لوحة التحكم" breadcrumb={["الرئيسية", "لوحة التحكم"]}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 18 }}>
        <KpiCard icon={Users} label="الأعضاء النشطين" value="2,458" trend="+12%" color={colors.brand.green} />
        <KpiCard icon={MessageCircle} label="المحادثات الجارية" value="186" trend="+8%" color={colors.accent.purple} />
        <KpiCard icon={Wallet} label="إيرادات الشهر" value="68K" trend="+24%" color={colors.accent.blue} />
        <KpiCard icon={UserPlus} label="بانتظار المراجعة" value="28" color={colors.accent.amber} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
        <Chart title="نمو الأعضاء" sub="آخر 7 أيام" color={colors.brand.green} points={[120, 145, 138, 172, 168, 195, 220]} />
        <Chart title="الإيرادات اليومية (ر.س)" sub="آخر 7 أيام" color={colors.accent.purple} points={[8200, 9100, 7800, 11200, 10500, 12800, 14500]} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16 }}>
        <div style={{ ...card, padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black, margin: 0 }}>بانتظار المراجعة</h3>
            <span style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.brand.green, cursor: "pointer" }}>عرض الكل</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pending.map((m) => (
              <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: `1px solid ${colors.border.soft}`, borderRadius: radius.md }}>
                <img src={m.avatar} alt={m.name} style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, color: colors.ink.black }}>{m.name}</div>
                  <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted }}>{m.meta} · {m.date}</div>
                </div>
                <button style={{ width: 32, height: 32, borderRadius: 8, background: colors.brand.green, color: "#fff", border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Check size={14} /></button>
                <button style={{ width: 32, height: 32, borderRadius: 8, background: colors.surface.white, color: colors.accent.red, border: `1.5px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={14} /></button>
                <button style={{ width: 32, height: 32, borderRadius: 8, background: colors.surface.white, color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Eye size={14} /></button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...card, padding: 22 }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black, margin: "0 0 14px" }}>النشاط الأخير</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {activity.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", paddingBottom: 12, borderBottom: i === activity.length - 1 ? "none" : `1px solid ${colors.border.soft}` }}>
                <StatusPill kind={a.kind} label="•" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.7, color: colors.ink.body }}>{a.text}</div>
                  <div style={{ fontFamily: fonts.latin, fontSize: 10.5, color: colors.ink.muted, marginTop: 3 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
