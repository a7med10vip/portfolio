"use client";

import {
  Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, XAxis, YAxis,
} from "recharts";
import { S, S_SOFT, D, LINE } from "./theme";

const FONT = "'Ahmed Sans', sans-serif";

/** الأرقام نفسها التي في الجدول، مرسومة، لأن الفارق يرى أسرع مما يقرأ. */
const SPEED = [
  { metric: "حتى يبدأ الرد", السنبلة: 0.87, المراعي: 0.46 },
  { metric: "حتى تكتمل الصفحة", السنبلة: 3.7, المراعي: 2.7 },
];

const IMAGES = [
  { metric: "إجمالي صور الصفحة", السنبلة: 23, المراعي: 54 },
  { metric: "ما يؤجل تحميله", السنبلة: 0, المراعي: 46 },
];

export default function PerfChart() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Panel title="سرعة الموقع" note="بالثواني · الأقل أفضل">
        <Columns data={SPEED} max={4.4} suffix=" ث" />
      </Panel>
      <Panel title="تحميل الصور" note="عدد الصور · الأكثر تأجيلا أفضل">
        <Columns data={IMAGES} max={64} />
      </Panel>
    </div>
  );
}

function Columns({ data, max, suffix = "" }: { data: Record<string, string | number>[]; max: number; suffix?: string }) {
  return (
    <ResponsiveContainer width="100%" height={244}>
      <BarChart data={data} margin={{ top: 28, right: 8, bottom: 4, left: 8 }} barGap={10}>
        <CartesianGrid vertical={false} stroke={LINE} />
        <XAxis
          dataKey="metric"
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={{ fill: D, fontSize: 12.5, fontFamily: FONT }}
          height={34}
        />
        <YAxis hide domain={[0, max]} />
        <Legend
          verticalAlign="top"
          align="center"
          height={26}
          iconType="circle"
          iconSize={9}
          wrapperStyle={{ fontSize: 12, fontFamily: FONT, color: D, direction: "rtl" }}
        />
        <Bar dataKey="السنبلة" fill={S} radius={[6, 6, 0, 0]} maxBarSize={54}>
          <LabelList dataKey="السنبلة" position="top" offset={8}
            formatter={(v: React.ReactNode) => `${v}${suffix}`}
            style={{ fill: S, fontSize: 12.5, fontFamily: FONT, fontWeight: 600 }} />
        </Bar>
        <Bar dataKey="المراعي" fill={`${S_SOFT}55`} radius={[6, 6, 0, 0]} maxBarSize={54}>
          <LabelList dataKey="المراعي" position="top" offset={8}
            formatter={(v: React.ReactNode) => `${v}${suffix}`}
            style={{ fill: D, fontSize: 12.5, fontFamily: FONT, opacity: .6 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function Panel({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] p-6" style={{ border: `1px solid ${LINE}`, background: "#fff" }}>
      <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
        <p className="ar-heading text-[16px]" style={{ color: D }}>{title}</p>
        <p className="ar-body text-[11.5px]" style={{ color: D, opacity: .55 }}>{note}</p>
      </div>
      {children}
    </div>
  );
}
