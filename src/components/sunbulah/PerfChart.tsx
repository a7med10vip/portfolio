"use client";

import {
  Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, XAxis, YAxis,
} from "recharts";
import { LAZY_CHART, PERF_CHART } from "@/app/sunbulah/data";
import { S, S_SOFT, D, LINE, MONO } from "./theme";

/** الأرقام نفسها التي في الجدول، مرسومة، لأن الفارق يُرى أسرع مما يُقرأ. */
export default function PerfChart() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Panel title="زمن الاستجابة" note="أقل أفضل · مللي ثانية">
        <ResponsiveContainer width="100%" height={215}>
          <BarChart data={PERF_CHART} layout="vertical" margin={{ top: 4, right: 56, bottom: 4, left: 4 }}>
            <CartesianGrid horizontal={false} stroke={LINE} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="metric" width={92} axisLine={false} tickLine={false}
              tick={{ fill: D, fontSize: 12, fontFamily: "'Ahmed Sans', sans-serif" }} orientation="right" />
            <Bar dataKey="almarai" fill={`${S_SOFT}44`} radius={[4, 4, 4, 4]} barSize={13} />
            <Bar dataKey="sunbulah" fill={S} radius={[4, 4, 4, 4]} barSize={13}>
              <LabelList dataKey="sunbulah" position="right"
                style={{ fill: D, fontSize: 11, fontFamily: MONO }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <Legend />
      </Panel>

      <Panel title="الصور المحمّلة تحميلًا مؤجلًا" note="من إجمالي صور الصفحة">
        <ResponsiveContainer width="100%" height={215}>
          <BarChart data={LAZY_CHART} margin={{ top: 22, right: 8, bottom: 4, left: 4 }}>
            <CartesianGrid vertical={false} stroke={LINE} />
            <XAxis dataKey="name" axisLine={false} tickLine={false}
              tick={{ fill: D, fontSize: 12, fontFamily: "'Ahmed Sans', sans-serif" }} />
            <YAxis hide domain={[0, 60]} />
            <Bar dataKey="total" fill={LINE} radius={[5, 5, 0, 0]} barSize={46} />
            <Bar dataKey="loaded" fill={S} radius={[5, 5, 0, 0]} barSize={46}
              // نفس الموضع فوق العمود الرمادي، فيُقرأ كجزء من الكل
              style={{ transform: "translateX(0)" }}>
              {LAZY_CHART.map((e, i) => <Cell key={i} fill={e.loaded === 0 ? "#B4231E" : S} />)}
              <LabelList dataKey="loaded" position="top" style={{ fill: D, fontSize: 12, fontFamily: MONO }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-[11.5px] text-center mt-1" style={{ color: D, opacity: .55 }}>
          العمود الفاتح إجمالي الصور، والداكن ما يُحمَّل مؤجلًا. صفر من ثلاث وعشرين.
        </p>
      </Panel>
    </div>
  );
}

function Panel({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] p-6" style={{ border: `1px solid ${LINE}`, background: "#fff" }}>
      <div className="flex items-baseline justify-between mb-5">
        <p className="ar-heading text-[16px]" style={{ color: D }}>{title}</p>
        <p className="text-[11px]" style={{ color: D, opacity: .5 }}>{note}</p>
      </div>
      {children}
    </div>
  );
}

function Legend() {
  return (
    <div className="flex items-center justify-center gap-5 mt-3">
      {[["السنبلة", S], ["المراعي", `${S_SOFT}66`]].map(([l, c]) => (
        <span key={l} className="inline-flex items-center gap-2 text-[11.5px]" style={{ color: D, opacity: .7 }}>
          <span style={{ width: 11, height: 11, borderRadius: 3, background: c }} /> {l}
        </span>
      ))}
    </div>
  );
}
