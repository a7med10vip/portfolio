import { Wallet, TrendingUp, RefreshCw, Clock, Download, Eye } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { AdminShell, KpiCard, StatusPill, Table } from "./_admin/AdminShell";

/* A04 · إدارة المدفوعات — KPIs + جدول المعاملات (مكتمل/معلق/فاشل) */

const tx = [
  { ref: "TXN-2026-004821", member: "محمد الأحمدي #KH-2087", type: "اشتراك", amount: "1,500 ر.س", method: "Apple Pay", status: "success" as const, date: "29 مايو · 10:42" },
  { ref: "TXN-2026-004820", member: "نورة العتيبي #KH-1042", type: "اتفاقية جدية", amount: "800 ر.س", method: "Visa", status: "success" as const, date: "29 مايو · 09:18" },
  { ref: "TXN-2026-004819", member: "خالد الدوسري #KH-2154", type: "اشتراك", amount: "2,000 ر.س", method: "مدى", status: "warn" as const, date: "29 مايو · 08:30" },
  { ref: "TXN-2026-004818", member: "ريم القحطاني #KH-1071", type: "تواصل جاد (محفظة)", amount: "1,200 ر.س", method: "Visa", status: "success" as const, date: "28 مايو · 17:55" },
  { ref: "TXN-2026-004817", member: "فهد الحربي #KH-2208", type: "اشتراك", amount: "1,800 ر.س", method: "Apple Pay", status: "danger" as const, date: "28 مايو · 14:20" },
  { ref: "TXN-2026-004816", member: "لطيفة الغامدي #KH-1090", type: "استرداد محفظة", amount: "1,200 ر.س", method: "محفظة", status: "info" as const, date: "28 مايو · 11:05" },
];

const statusLabel: Record<string, string> = { success: "مكتمل", warn: "معلّق", danger: "فاشل", info: "مرتجع للمحفظة" };

export default function A04Payments() {
  const rows = tx.map((t) => [
    <span key="r" style={{ fontFamily: fonts.latin, fontSize: 12, fontWeight: 700, color: colors.ink.black }}>{t.ref}</span>,
    <span key="m" style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.body }}>{t.member}</span>,
    <span key="t" style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.body }}>{t.type}</span>,
    <span key="a" style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>{t.amount}</span>,
    <span key="md" style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.muted }}>{t.method}</span>,
    <StatusPill key="s" kind={t.status} label={statusLabel[t.status]} />,
    <span key="d" style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted }}>{t.date}</span>,
    (
      <div key="x" style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
        <button style={{ width: 30, height: 30, borderRadius: 7, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Eye size={13} color={colors.ink.body} /></button>
        <button style={{ width: 30, height: 30, borderRadius: 7, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Download size={13} color={colors.ink.body} /></button>
      </div>
    ),
  ]);

  return (
    <AdminShell active="payments" title="إدارة المدفوعات" breadcrumb={["لوحة التحكم", "إدارة المدفوعات"]}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 18 }}>
        <KpiCard icon={Wallet} label="إيرادات اليوم" value="18,400 ر.س" trend="+24%" color={colors.brand.green} />
        <KpiCard icon={TrendingUp} label="مكتمل" value="186" color={colors.brand.green} />
        <KpiCard icon={Clock} label="معلّق" value="9" color={colors.accent.amber} />
        <KpiCard icon={RefreshCw} label="فاشل / مرتجع" value="4" color={colors.accent.red} />
      </div>
      <Table columns={["المرجع", "العضو", "النوع", "المبلغ", "الطريقة", "الحالة", "التاريخ", "إجراءات"]} rows={rows as unknown as (string | React.ReactNode)[][]} />
    </AdminShell>
  );
}
