import { Activity, Users, Wallet, Heart, Download, Calendar } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { AdminShell, card, KpiCard } from "./_admin/AdminShell";

/* A05 · التقارير — رسوم بيانية + تصدير */

function Bars({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const W = 540, H = 180, P = 8;
  const bw = (W - P * 2) / data.length - 6;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none">
      {data.map((v, i) => {
        const h = (v / max) * (H - P * 2);
        return <rect key={i} x={P + i * (bw + 6)} y={H - P - h} width={bw} height={h} fill={color} rx={4} opacity={i === data.length - 1 ? 1 : 0.7} />;
      })}
    </svg>
  );
}

function LineChart({ points, color }: { points: number[]; color: string }) {
  const max = Math.max(...points), min = Math.min(...points);
  const W = 540, H = 180, P = 10;
  const step = (W - P * 2) / (points.length - 1);
  const d = points.map((v, i) => `${i === 0 ? "M" : "L"} ${P + i * step} ${H - P - ((v - min) / (max - min || 1)) * (H - P * 2)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none">
      <path d={d + ` L ${P + (points.length - 1) * step} ${H - P} L ${P} ${H - P} Z`} fill={`${color}1A`} />
      <path d={d} stroke={color} strokeWidth={2.4} fill="none" />
    </svg>
  );
}

function Donut({ values, colors: cs }: { values: number[]; colors: string[] }) {
  const total = values.reduce((a, b) => a + b, 0);
  const R = 64, C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <svg viewBox="0 0 180 180" width={180} height={180}>
      <circle cx={90} cy={90} r={R} fill="none" stroke={colors.border.soft} strokeWidth={22} />
      {values.map((v, i) => {
        const len = (v / total) * C;
        const dash = `${len} ${C - len}`;
        const off = -acc;
        acc += len;
        return <circle key={i} cx={90} cy={90} r={R} fill="none" stroke={cs[i]} strokeWidth={22} strokeDasharray={dash} strokeDashoffset={off} transform="rotate(-90 90 90)" />;
      })}
      <text x={90} y={86} textAnchor="middle" fontFamily={fonts.heading} fontSize="22" fontWeight={700} fill={colors.ink.black}>تقسيم</text>
      <text x={90} y={108} textAnchor="middle" fontFamily={fonts.body} fontSize="11" fill={colors.ink.muted}>الإيرادات</text>
    </svg>
  );
}

function ChartCard({ title, sub, children, action }: { title: string; sub: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div style={{ ...card, padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black, margin: 0 }}>{title}</h3>
          <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, margin: "4px 0 0" }}>{sub}</p>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export default function A05Reports() {
  return (
    <AdminShell active="reports" title="التقارير والإحصائيات" breadcrumb={["لوحة التحكم", "التقارير"]}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["اليوم", "هذا الأسبوع", "الشهر", "آخر 30 يوم", "السنة"].map((t, i) => (
            <span key={t} style={{ padding: "8px 14px", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12.5, fontWeight: i === 2 ? 700 : 500, background: i === 2 ? colors.brand.green : colors.surface.white, color: i === 2 ? "#fff" : colors.ink.body, border: `1px solid ${i === 2 ? colors.brand.green : colors.border.default}`, cursor: "pointer" }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ height: 38, padding: "0 14px", background: colors.surface.white, color: colors.ink.body, border: `1px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><Calendar size={14} /> فترة مخصصة</button>
          <button style={{ height: 38, padding: "0 14px", background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><Download size={14} /> تصدير PDF</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 16 }}>
        <KpiCard icon={Users} label="أعضاء جدد" value="312" trend="+18%" color={colors.brand.green} />
        <KpiCard icon={Wallet} label="إيرادات الشهر" value="68K ر.س" trend="+24%" color={colors.accent.purple} />
        <KpiCard icon={Activity} label="محادثات نشطة" value="186" trend="+8%" color={colors.accent.blue} />
        <KpiCard icon={Heart} label="زواج مكتمل" value="14" trend="+3" color={colors.accent.amber} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <ChartCard title="نمو الأعضاء" sub="آخر 12 شهر"><LineChart points={[180, 195, 220, 250, 280, 310, 340, 390, 420, 455, 490, 532]} color={colors.brand.green} /></ChartCard>
        <ChartCard title="الإيرادات الشهرية" sub="ر.س"><Bars data={[42, 48, 51, 55, 49, 62, 58, 65, 60, 68, 72, 81]} color={colors.accent.purple} /></ChartCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <ChartCard title="توزيع الإيرادات حسب النوع" sub="آخر 30 يوم">
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Donut values={[58, 22, 12, 8]} colors={[colors.brand.green, colors.accent.purple, colors.accent.blue, colors.accent.amber]} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { c: colors.brand.green, l: "اشتراك", v: "58%" },
                { c: colors.accent.purple, l: "اتفاقية جدية", v: "22%" },
                { c: colors.accent.blue, l: "تواصل جاد (محفظة)", v: "12%" },
                { c: colors.accent.amber, l: "أخرى", v: "8%" },
              ].map((r) => (
                <div key={r.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.body }}><span style={{ width: 10, height: 10, borderRadius: 2, background: r.c }} /> {r.l}</span>
                  <span style={{ fontFamily: fonts.latin, fontSize: 12, fontWeight: 700, color: colors.ink.black }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
        <ChartCard title="معدّل الإبلاغات في الشات" sub="آخر 14 يوم"><Bars data={[3, 5, 2, 4, 6, 3, 2, 4, 7, 3, 2, 1, 4, 2]} color={colors.accent.red} /></ChartCard>
      </div>
    </AdminShell>
  );
}
