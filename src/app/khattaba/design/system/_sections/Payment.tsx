import { Wallet, TrendingUp, TrendingDown, Download, ArrowDownLeft, ArrowUpRight, Check, Hash, Receipt } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

function PaymentCard({ logo, logoStyle, bg, label, last4, selected, dark, invertLogo }: {
  logo: string;
  logoStyle?: React.CSSProperties;
  bg: string;
  label: string;
  last4?: string;
  selected?: boolean;
  dark?: boolean;
  invertLogo?: boolean;
}) {
  const textColor = dark ? "#fff" : colors.ink.body;
  const subColor = dark ? "rgba(255,255,255,0.7)" : colors.ink.muted;
  return (
    <div
      style={{
        padding: 18,
        background: bg,
        color: textColor,
        borderRadius: radius.lg,
        border: `2px solid ${selected ? colors.brand.green : "transparent"}`,
        cursor: "pointer",
        position: "relative",
        minHeight: 96,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 1px 3px rgba(15,15,15,0.04)",
      }}
    >
      {selected && (
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: colors.brand.green,
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 12,
            insetInlineStart: 12,
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          <Check size={13} strokeWidth={3} />
        </span>
      )}

      <img
        src={logo}
        alt={label}
        style={{
          height: 28,
          width: "auto",
          objectFit: "contain",
          filter: invertLogo ? "brightness(0) invert(1)" : undefined,
          alignSelf: "flex-end",
          ...logoStyle,
        }}
      />

      <div style={{ direction: "rtl" }}>
        <div style={{ fontFamily: fonts.body, fontSize: 12, color: subColor }}>{label}</div>
        {last4 && (
          <div style={{ fontFamily: fonts.latin, fontSize: 14, fontWeight: 600, marginTop: 2, letterSpacing: 2 }}>
            •••• {last4}
          </div>
        )}
      </div>
    </div>
  );
}

function ApplePayCard({ selected }: { selected?: boolean }) {
  return (
    <PaymentCard
      logo="/payment/apple-pay.svg"
      bg="#000"
      label="Apple Pay · Touch ID"
      selected={selected}
      dark
      invertLogo
      logoStyle={{ height: 32 }}
    />
  );
}

function VisaCard({ last4 = "4218", selected }: { last4?: string; selected?: boolean }) {
  return (
    <PaymentCard
      logo="/payment/visa.png"
      bg="linear-gradient(135deg, #1A1F71, #4361EE)"
      label="بطاقة فيزا"
      last4={last4}
      selected={selected}
      dark
      invertLogo
      logoStyle={{ height: 24 }}
    />
  );
}

function MastercardCard({ last4 = "5421", selected }: { last4?: string; selected?: boolean }) {
  return (
    <PaymentCard
      logo="/payment/mastercard.svg"
      bg="linear-gradient(135deg, #1F2937, #374151)"
      label="بطاقة ماستركارد"
      last4={last4}
      selected={selected}
      dark
      logoStyle={{ height: 32 }}
    />
  );
}

function MadaCard({ selected }: { selected?: boolean }) {
  return (
    <div
      style={{
        padding: 18,
        background: "#FFFFFF",
        border: selected ? `2px solid ${colors.brand.green}` : `2px solid ${colors.border.default}`,
        borderRadius: radius.lg,
        cursor: "pointer",
        position: "relative",
        minHeight: 96,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 1px 3px rgba(15,15,15,0.04)",
      }}
    >
      {selected && (
        <span
          style={{
            width: 22, height: 22, borderRadius: "50%",
            background: colors.brand.green, color: "#fff",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            position: "absolute", top: 12, insetInlineStart: 12,
          }}
        >
          <Check size={13} strokeWidth={3} />
        </span>
      )}
      <img src="/payment/mada.png" alt="مدى" style={{ height: 22, width: "auto", alignSelf: "flex-end", objectFit: "contain" }} />
      <div style={{ direction: "rtl" }}>
        <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>بطاقة مدى</div>
        <div style={{ fontFamily: fonts.latin, fontSize: 14, fontWeight: 600, color: colors.ink.body, marginTop: 2, letterSpacing: 2 }}>
          •••• 8814
        </div>
      </div>
    </div>
  );
}

function WalletCard() {
  return (
    <div
      style={{
        padding: 24,
        background: `linear-gradient(135deg, ${colors.ink.black}, #1A1A1A)`,
        color: "#fff",
        borderRadius: radius.lg,
        position: "relative",
        overflow: "hidden",
        minHeight: 160,
      }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <div style={{ fontFamily: fonts.body, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>الرصيد المتاح</div>
            <div style={{ fontFamily: fonts.heading, fontSize: 32, fontWeight: 700, marginTop: 4, lineHeight: 1 }}>
              <span style={{ fontFamily: fonts.latin }}>1,250</span> <span style={{ fontSize: 18, opacity: 0.7 }}>ر.س</span>
            </div>
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: colors.brand.green,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Wallet size={20} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div>
            <div style={{ fontFamily: fonts.body, fontSize: 11, color: "rgba(255,255,255,0.5)" }}>محجوز</div>
            <div style={{ fontFamily: fonts.latin, fontSize: 16, fontWeight: 600, marginTop: 2 }}>
              500 <span style={{ fontSize: 11, opacity: 0.7 }}>ر.س</span>
            </div>
          </div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.15)" }} />
          <div>
            <div style={{ fontFamily: fonts.body, fontSize: 11, color: "rgba(255,255,255,0.5)" }}>متاح للسحب</div>
            <div style={{ fontFamily: fonts.latin, fontSize: 16, fontWeight: 600, marginTop: 2 }}>
              750 <span style={{ fontSize: 11, opacity: 0.7 }}>ر.س</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Tx = { type: "in" | "out"; label: string; date: string; amount: number; meta?: string };

const txs: Tx[] = [
  { type: "out", label: "رسوم اشتراك سنوي", date: "24 فبراير", amount: 1800, meta: "مدفوع" },
  { type: "in",  label: "استرداد مشروع خطبة #2412", date: "12 فبراير", amount: 500, meta: "تمت إعادته" },
  { type: "out", label: "اتفاقية ما قبل الواتساب", date: "08 فبراير", amount: 250 },
  { type: "out", label: "رسوم تواصل جاد", date: "01 فبراير", amount: 500 },
];

function TransactionList() {
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
          padding: "14px 18px",
          borderBottom: `1px solid ${colors.border.soft}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: colors.surface.page,
        }}
      >
        <span style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>
          آخر المعاملات
        </span>
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
          عرض الكل
        </button>
      </div>
      <div>
        {txs.map((t, i) => (
          <div
            key={i}
            style={{
              padding: "14px 18px",
              display: "grid",
              gridTemplateColumns: "36px 1fr auto",
              gap: 12,
              alignItems: "center",
              borderBottom: i < txs.length - 1 ? `1px solid ${colors.border.soft}` : "none",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: t.type === "in" ? colors.brand.greenSoft : colors.accent.redSoft,
                color: t.type === "in" ? colors.brand.green : colors.accent.red,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {t.type === "in" ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
            </div>
            <div>
              <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.ink.black }}>
                {t.label}
              </div>
              <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, marginTop: 2 }}>
                {t.date} {t.meta && `· ${t.meta}`}
              </div>
            </div>
            <div
              style={{
                fontFamily: fonts.latin,
                fontSize: 14,
                fontWeight: 700,
                color: t.type === "in" ? colors.brand.green : colors.ink.black,
              }}
            >
              {t.type === "in" ? "+" : "−"}
              {t.amount} <span style={{ fontFamily: fonts.body, fontSize: 11, opacity: 0.6, fontWeight: 500 }}>ر.س</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Receipt2() {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        overflow: "hidden",
        boxShadow: shadow.md,
        maxWidth: 360,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: 20,
          background: colors.brand.green,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <Check size={28} color="#fff" strokeWidth={3} />
        </div>
        <div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700 }}>تم الدفع بنجاح</div>
        <div style={{ fontFamily: fonts.latin, fontSize: 24, fontWeight: 700, marginTop: 8 }}>
          1,800 <span style={{ fontSize: 13, opacity: 0.8 }}>ر.س</span>
        </div>
      </div>

      {/* Details */}
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { label: "رقم الفاتورة", value: "#INV-2026-0428", icon: Hash },
          { label: "تاريخ", value: "24 فبراير 2026 · 14:32" },
          { label: "طريقة الدفع", value: "بطاقة فيزا •••• 4218" },
          { label: "العضو", value: "محمد الأحمدي · KH1-00428" },
          { label: "البند", value: "رسوم اشتراك سنوي" },
        ].map((row) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>{row.label}</span>
            <span style={{ fontFamily: row.value.match(/^#|^[\d•]/) ? fonts.latin : fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.black, textAlign: "end" }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div style={{ padding: "0 20px", borderTop: `1px dashed ${colors.border.strong}`, paddingTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>المجموع الفرعي</span>
          <span style={{ fontFamily: fonts.latin, fontSize: 13, color: colors.ink.body }}>1,800.00 ر.س</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>ضريبة القيمة المضافة</span>
          <span style={{ fontFamily: fonts.latin, fontSize: 13, color: colors.ink.body }}>0.00 ر.س</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: `1px solid ${colors.border.soft}` }}>
          <span style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black }}>الإجمالي</span>
          <span style={{ fontFamily: fonts.latin, fontSize: 18, fontWeight: 700, color: colors.brand.green }}>1,800 ر.س</span>
        </div>
      </div>

      {/* Download */}
      <div style={{ padding: 20 }}>
        <button
          style={{
            width: "100%",
            padding: "12px",
            background: colors.surface.page,
            color: colors.ink.body,
            border: `1.5px solid ${colors.border.default}`,
            borderRadius: radius.md,
            fontFamily: fonts.body,
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Download size={14} /> تنزيل الفاتورة PDF
        </button>
      </div>
    </div>
  );
}

function Showcase({ title, children, cols = 1 }: { title: string; children: React.ReactNode; cols?: number | string }) {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: 20,
        padding: 24,
      }}
    >
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 13,
          fontWeight: 600,
          color: colors.ink.body,
          marginBottom: 14,
        }}
      >
        {title}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: typeof cols === "number" ? `repeat(${cols}, 1fr)` : cols, gap: 16 }}>{children}</div>
    </div>
  );
}

export default function PaymentSection() {
  return (
    <section id="payment" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="20"
        eyebrow="الدفع والمحفظة"
        title="الدفع والمحفظة"
        description="Apple Pay · Visa · مدى · Mastercard، محفظة، وتصميم الفواتير."
        accentColor={colors.accent.amber}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Payment methods */}
        <Showcase title="بطاقات الدفع · 4 خيارات" cols={4}>
          <ApplePayCard selected />
          <VisaCard last4="4218" />
          <MadaCard />
          <MastercardCard last4="5421" />
        </Showcase>

        {/* Wallet + Transactions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Showcase title="Wallet Card · with held balance">
            <WalletCard />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
              <button
                style={{
                  padding: "10px 12px",
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
                }}
              >
                <ArrowDownLeft size={14} /> سحب
              </button>
              <button
                style={{
                  padding: "10px 12px",
                  background: "transparent",
                  color: colors.ink.body,
                  border: `1.5px solid ${colors.border.default}`,
                  borderRadius: radius.md,
                  fontFamily: fonts.body,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                طلب فك حجز
              </button>
            </div>
          </Showcase>

          <Showcase title="Transaction History">
            <TransactionList />
          </Showcase>
        </div>

        {/* Receipt */}
        <Showcase title="Receipt / Invoice · post-payment confirmation">
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
            <Receipt2 />
            <div style={{ flex: 1, padding: 20 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "4px 12px",
                  background: colors.brand.greenSoft,
                  color: colors.brand.greenDark,
                  borderRadius: radius.full,
                  fontFamily: fonts.body,
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                <Receipt size={12} /> تصميم الفاتورة
              </div>
              <h3 style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: colors.ink.black, margin: 0, marginBottom: 10 }}>
                فاتورة إلكترونية متوافقة مع PDPL
              </h3>
              <p style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.muted, lineHeight: 1.8 }}>
                الفاتورة تُولّد تلقائياً بعد كل عملية دفع ناجحة وتُرسل بالبريد الإلكتروني + متاحة للتنزيل من حساب العضو.
                تشمل: رقم الفاتورة الفريد، التاريخ والوقت، طريقة الدفع، البنود، الضريبة (لا توجد على الخدمة الحالية)، والإجمالي.
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingInlineStart: 18,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  fontFamily: fonts.body,
                  fontSize: 12,
                  color: colors.ink.body,
                  lineHeight: 1.7,
                  marginTop: 14,
                }}
              >
                <li>تصدير PDF متوافق طباعياً</li>
                <li>دعم اللغتين العربية والإنجليزية</li>
                <li>QR code للتحقق من صحة الفاتورة</li>
                <li>الاحتفاظ بنسخة 5 سنوات (PDPL requirement)</li>
              </ul>
            </div>
          </div>
        </Showcase>
      </div>
    </section>
  );
}
