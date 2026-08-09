import { TrendingUp, TrendingDown, MoreVertical, Users, Wallet, MessageCircle, Clock } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

function BarChart() {
  const data = [
    { month: "نوفمبر", value: 120 },
    { month: "ديسمبر", value: 180 },
    { month: "يناير", value: 240 },
    { month: "فبراير", value: 195 },
    { month: "مارس", value: 320 },
    { month: "أبريل", value: 285 },
    { month: "مايو", value: 410 },
  ];
  const max = Math.max(...data.map((d) => d.value));
  const w = 480;
  const h = 240;
  const padding = { top: 20, right: 20, bottom: 40, left: 40 };
  const innerW = w - padding.left - padding.right;
  const innerH = h - padding.top - padding.bottom;
  const barW = innerW / data.length - 12;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ direction: "ltr" }}>
      {/* Y-axis grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((p) => {
        const y = padding.top + innerH * (1 - p);
        return (
          <g key={p}>
            <line x1={padding.left} x2={w - padding.right} y1={y} y2={y} stroke={colors.border.soft} strokeDasharray="2 4" />
            <text x={padding.left - 8} y={y + 3} fontSize="10" fill={colors.ink.muted} textAnchor="end" fontFamily={fonts.latin}>
              {Math.round(max * p)}
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {data.map((d, i) => {
        const x = padding.left + i * (innerW / data.length) + 6;
        const barH = (d.value / max) * innerH;
        const y = padding.top + innerH - barH;
        return (
          <g key={d.month}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              fill={colors.brand.green}
              rx={4}
            />
            <text
              x={x + barW / 2}
              y={y - 6}
              fontSize="10"
              fill={colors.ink.body}
              textAnchor="middle"
              fontFamily={fonts.latin}
              fontWeight="700"
            >
              {d.value}
            </text>
            <text
              x={x + barW / 2}
              y={h - padding.bottom + 14}
              fontSize="10"
              fill={colors.ink.muted}
              textAnchor="middle"
              fontFamily={fonts.body}
            >
              {d.month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function DonutChart() {
  const slices = [
    { label: "الرياض", value: 45, color: colors.brand.green },
    { label: "جدة",   value: 22, color: colors.accent.purple },
    { label: "الدمام", value: 15, color: colors.accent.blue },
    { label: "مكة",   value: 10, color: colors.accent.amber },
    { label: "أخرى",  value: 8,  color: colors.ink.soft },
  ];
  const cx = 100;
  const cy = 100;
  const r = 80;
  const stroke = 28;
  const innerR = r - stroke / 2;
  const c = 2 * Math.PI * innerR;
  let offset = 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
      <svg width="200" height="200" viewBox="0 0 200 200">
        {slices.map((s) => {
          const length = (s.value / 100) * c;
          const dashArray = `${length} ${c - length}`;
          const dashOffset = -offset;
          offset += length;
          return (
            <circle
              key={s.label}
              cx={cx}
              cy={cy}
              r={innerR}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          );
        })}
        <text x={cx} y={cy - 4} fontSize="28" fontWeight="700" textAnchor="middle" fill={colors.ink.black} fontFamily={fonts.latin}>
          1,247
        </text>
        <text x={cx} y={cy + 16} fontSize="11" textAnchor="middle" fill={colors.ink.muted} fontFamily={fonts.body}>
          إجمالي الأعضاء
        </text>
      </svg>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {slices.map((s) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 160 }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: s.color, flexShrink: 0 }} />
            <span style={{ flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.ink.body }}>{s.label}</span>
            <span style={{ fontFamily: fonts.latin, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityHeatmap() {
  const days = ["أحد", "إثن", "ثلا", "أرب", "خمي", "جمع", "سبت"];
  // Generate random-looking intensity (deterministic)
  const data = days.map((d, di) =>
    Array.from({ length: 24 }, (_, hi) => {
      // Peak at evening hours (19-23)
      let base = 0.15;
      if (hi >= 19 && hi <= 23) base = 0.8;
      else if (hi >= 14 && hi <= 18) base = 0.5;
      else if (hi >= 9 && hi <= 13) base = 0.4;
      else if (hi >= 0 && hi <= 6) base = 0.05;
      // Weekend boost
      if (di >= 5) base *= 1.2;
      // Deterministic noise
      const n = ((di * 17 + hi * 31) % 13) / 13;
      return Math.min(1, base + (n - 0.5) * 0.3);
    })
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 4 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingTop: 22 }}>
          {days.map((d) => (
            <div
              key={d}
              style={{
                height: 16,
                fontFamily: fonts.body,
                fontSize: 10,
                color: colors.ink.muted,
                display: "flex",
                alignItems: "center",
                paddingInlineEnd: 4,
              }}
            >
              {d}
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", marginBottom: 4, gap: 3 }}>
            {Array.from({ length: 24 }, (_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontFamily: fonts.latin,
                  fontSize: 9,
                  color: colors.ink.muted,
                  height: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: i % 3 === 0 ? 1 : 0,
                }}
              >
                {i}
              </div>
            ))}
          </div>
          {data.map((row, di) => (
            <div key={di} style={{ display: "flex", gap: 3, marginBottom: 3 }}>
              {row.map((v, hi) => (
                <div
                  key={hi}
                  title={`${days[di]} ${hi}:00 — ${Math.round(v * 100)}%`}
                  style={{
                    flex: 1,
                    aspectRatio: "1",
                    maxHeight: 16,
                    borderRadius: 3,
                    background:
                      v < 0.1
                        ? colors.surface.page
                        : v < 0.3
                        ? `${colors.brand.green}30`
                        : v < 0.55
                        ? `${colors.brand.green}70`
                        : v < 0.8
                        ? colors.brand.green
                        : colors.brand.greenDark,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>
          ذروة النشاط: <strong style={{ color: colors.ink.black }}>المساء (19-23)</strong>
        </span>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted }}>
          <span>قليل</span>
          {[0.1, 0.3, 0.55, 0.8, 1].map((v, i) => (
            <span
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                background:
                  v < 0.1
                    ? colors.surface.page
                    : v < 0.3
                    ? `${colors.brand.green}30`
                    : v < 0.55
                    ? `${colors.brand.green}70`
                    : v < 0.8
                    ? colors.brand.green
                    : colors.brand.greenDark,
              }}
            />
          ))}
          <span>كثير</span>
        </div>
      </div>
    </div>
  );
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 100;
  const h = 28;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return `${x},${y}`;
  });
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`0,${h} ${pts.join(" ")} ${w},${h}`} fill={color} opacity={0.12} />
    </svg>
  );
}

function KPICard({ icon: Icon, label, value, trend, trendValue, sparkline, color }: { icon: any; label: string; value: string; trend: "up" | "down"; trendValue: string; sparkline: number[]; color: string }) {
  const Trend = trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = trend === "up" ? colors.brand.green : colors.accent.red;
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: `${color}14`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={20} color={color} />
        </div>
        <button
          style={{
            width: 28,
            height: 28,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: colors.ink.soft,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MoreVertical size={14} />
        </button>
      </div>
      <div>
        <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, marginBottom: 6 }}>
          {label}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, justifyContent: "space-between" }}>
          <span style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 700, color: colors.ink.black, lineHeight: 1 }}>
            {value}
          </span>
          <Sparkline data={sparkline} color={color} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 10px",
          background: `${trendColor}10`,
          borderRadius: 8,
        }}
      >
        <Trend size={14} color={trendColor} />
        <span style={{ fontFamily: fonts.latin, fontSize: 12, fontWeight: 700, color: trendColor }}>
          {trendValue}
        </span>
        <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>
          مقارنة بالشهر السابق
        </span>
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

export default function ChartsSection() {
  return (
    <section id="charts" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="22"
        eyebrow="رسوم وإحصاءات"
        title="الرسوم البيانية"
        description="رسوم SVG خفيفة للوحة الإدارة والتقارير."
        accentColor={colors.accent.blue}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* KPI Cards */}
        <Showcase title="KPI Cards · مع sparklines و comparison">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            <KPICard
              icon={Users}
              label="الأعضاء الجدد"
              value="284"
              trend="up"
              trendValue="+18%"
              sparkline={[12, 19, 14, 23, 28, 24, 32]}
              color={colors.brand.green}
            />
            <KPICard
              icon={MessageCircle}
              label="المحادثات النشطة"
              value="186"
              trend="up"
              trendValue="+8%"
              sparkline={[8, 12, 10, 14, 11, 15, 18]}
              color={colors.accent.purple}
            />
            <KPICard
              icon={Wallet}
              label="إيرادات الشهر"
              value="48K"
              trend="up"
              trendValue="+24%"
              sparkline={[18, 22, 20, 28, 26, 32, 38]}
              color={colors.accent.blue}
            />
            <KPICard
              icon={Clock}
              label="طلبات معلّقة"
              value="34"
              trend="down"
              trendValue="-12%"
              sparkline={[42, 38, 40, 36, 34, 32, 34]}
              color={colors.accent.amber}
            />
          </div>
        </Showcase>

        {/* Bar Chart */}
        <Showcase title="Bar Chart · نمو الأعضاء شهرياً">
          <BarChart />
        </Showcase>

        {/* Donut */}
        <Showcase title="Donut Chart · توزيع الأعضاء حسب المدينة">
          <DonutChart />
        </Showcase>

        {/* Heatmap */}
        <Showcase title="Activity Heatmap · كثافة الاستخدام (يوم × ساعة)">
          <ActivityHeatmap />
        </Showcase>
      </div>
    </section>
  );
}
