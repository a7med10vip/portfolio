import { Search, Filter, MoreVertical, ChevronLeft, ChevronRight, ArrowUpDown, Download, Check, Clock, Ban, BadgeCheck, X } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

type Row = {
  id: string;
  name: string;
  initial: string;
  initialColor: string;
  photo?: string;
  city: string;
  age: number;
  status: "active" | "pending" | "banned" | "verified";
  joined: string;
  payment: string;
};

const rows: Row[] = [
  { id: "KH1-00428", name: "محمد الأحمدي",  initial: "م", initialColor: colors.brand.green,   photo: "/avatars/saudi-male.jpeg",     city: "الرياض",  age: 32, status: "verified", joined: "12 يناير 2026", payment: "2,400 ر.س" },
  { id: "KH1-00429", name: "نورة الشهري",   initial: "ن", initialColor: colors.accent.purple, photo: "/khattaba/avatars/niqab-woman-brown.png", city: "جدة",     age: 28, status: "active",   joined: "14 يناير 2026", payment: "1,800 ر.س" },
  { id: "KH1-00430", name: "خالد العتيبي",  initial: "خ", initialColor: colors.accent.blue,   photo: "/avatars/saudi-male-2.jpeg",   city: "الدمام",  age: 35, status: "pending",  joined: "20 يناير 2026", payment: "—" },
  { id: "KH1-00431", name: "سارة القحطاني", initial: "س", initialColor: colors.accent.amber,  photo: "/khattaba/avatars/niqab-woman-blue.png", city: "مكة",     age: 26, status: "verified", joined: "22 يناير 2026", payment: "3,000 ر.س" },
  { id: "KH1-00432", name: "أحمد البلوي",   initial: "أ", initialColor: colors.brand.green,   photo: "/avatars/saudi-male.jpeg",     city: "تبوك",    age: 30, status: "banned",   joined: "28 يناير 2026", payment: "—" },
  { id: "KH1-00433", name: "منى الشمري",    initial: "م", initialColor: colors.accent.red,    photo: "/khattaba/avatars/niqab-woman-brown.png", city: "حائل",    age: 27, status: "active",   joined: "02 فبراير 2026", payment: "1,500 ر.س" },
];

const statusConfig = {
  active:   { icon: Check,       label: "نشط",         color: colors.brand.green },
  pending:  { icon: Clock,       label: "بانتظار المراجعة", color: colors.accent.amber },
  banned:   { icon: Ban,         label: "محظور",       color: colors.accent.red },
  verified: { icon: BadgeCheck,  label: "موثّق",       color: colors.accent.blue },
};

function StatusPill({ status }: { status: Row["status"] }) {
  const { icon: Icon, label, color } = statusConfig[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 9px",
        background: `${color}14`,
        color,
        border: `1px solid ${color}40`,
        borderRadius: radius.full,
        fontFamily: fonts.body,
        fontSize: 11,
        fontWeight: 700,
      }}
    >
      <Icon size={10} />
      {label}
    </span>
  );
}

function Avatar({ label, color, photo }: { label: string; color: string; photo?: string }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={label}
        width={32}
        height={32}
        style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", flexShrink: 0, display: "block" }}
      />
    );
  }
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.heading,
        fontSize: 13,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {label}
    </div>
  );
}

function FilterDrawer() {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        width: 280,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black }}>
          الفلاتر
        </span>
        <button style={{ background: "transparent", border: "none", fontFamily: fonts.body, fontSize: 11, color: colors.brand.green, fontWeight: 700, cursor: "pointer" }}>
          مسح الكل
        </button>
      </div>

      {/* Status filter */}
      <div>
        <div style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body, marginBottom: 8 }}>
          الحالة
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {(["active", "pending", "verified", "banned"] as const).map((s) => {
            const cfg = statusConfig[s];
            return (
              <label key={s} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: fonts.body, fontSize: 13, color: colors.ink.body, cursor: "pointer" }}>
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    border: `2px solid ${s === "active" || s === "verified" ? cfg.color : colors.border.strong}`,
                    background: s === "active" || s === "verified" ? cfg.color : "transparent",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {(s === "active" || s === "verified") && <Check size={11} color="#fff" strokeWidth={3} />}
                </span>
                {cfg.label}
              </label>
            );
          })}
        </div>
      </div>

      {/* Age range */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body }}>
            العمر
          </span>
          <span style={{ fontFamily: fonts.latin, fontSize: 11, fontWeight: 700, color: colors.ink.body }}>
            22 - 38
          </span>
        </div>
        <div style={{ position: "relative", height: 24, display: "flex", alignItems: "center" }}>
          <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: colors.border.default, borderRadius: 2 }} />
          <div style={{ position: "absolute", left: "12%", right: "20%", height: 4, background: colors.brand.green, borderRadius: 2 }} />
          <div style={{ position: "absolute", left: "12%", width: 16, height: 16, borderRadius: "50%", background: "#fff", border: `3px solid ${colors.brand.green}`, transform: "translateX(-50%)", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }} />
          <div style={{ position: "absolute", left: "80%", width: 16, height: 16, borderRadius: "50%", background: "#fff", border: `3px solid ${colors.brand.green}`, transform: "translateX(-50%)", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }} />
        </div>
      </div>

      {/* City */}
      <div>
        <div style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body, marginBottom: 8 }}>
          المدينة
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["الرياض", "جدة", "الدمام", "مكة", "المدينة"].map((c, i) => (
            <span
              key={c}
              style={{
                padding: "4px 10px",
                background: i < 2 ? colors.brand.greenSoft : colors.surface.page,
                color: i < 2 ? colors.brand.greenDark : colors.ink.body,
                border: i < 2 ? `1px solid ${colors.brand.green}40` : `1px solid ${colors.border.default}`,
                borderRadius: radius.full,
                fontFamily: fonts.body,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Active filters count */}
      <button
        style={{
          background: colors.brand.green,
          color: "#fff",
          border: "none",
          padding: "11px 16px",
          borderRadius: radius.md,
          fontFamily: fonts.body,
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          marginTop: 4,
          boxShadow: "none",
        }}
      >
        تطبيق الفلاتر (3)
      </button>
    </div>
  );
}

function Table() {
  return (
    <div
      style={{
        flex: 1,
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.lg,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: `1px solid ${colors.border.soft}`,
          display: "flex",
          gap: 12,
          alignItems: "center",
          background: colors.surface.page,
        }}
      >
        <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
          <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }} />
          <input
            style={{
              width: "100%",
              height: 36,
              paddingInlineStart: 34,
              paddingInlineEnd: 12,
              background: colors.surface.white,
              border: `1px solid ${colors.border.default}`,
              borderRadius: radius.sm,
              fontFamily: fonts.body,
              fontSize: 13,
              outline: "none",
            }}
            placeholder="بحث بالاسم أو رقم العضوية..."
          />
        </div>
        <button
          style={{
            padding: "8px 14px",
            background: colors.surface.white,
            border: `1px solid ${colors.border.default}`,
            borderRadius: radius.sm,
            fontFamily: fonts.body,
            fontSize: 12,
            fontWeight: 600,
            color: colors.ink.body,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Filter size={13} /> فلتر
        </button>
        <button
          style={{
            padding: "8px 14px",
            background: colors.surface.white,
            border: `1px solid ${colors.border.default}`,
            borderRadius: radius.sm,
            fontFamily: fonts.body,
            fontSize: 12,
            fontWeight: 600,
            color: colors.ink.body,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Download size={13} /> تصدير
        </button>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: fonts.latin, fontSize: 11, fontWeight: 600, color: colors.ink.muted }}>
          {rows.length} من 1,247 عضو
        </span>
      </div>

      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "40px minmax(220px,1.4fr) 130px 90px 130px 170px 130px 40px",
          padding: "12px 24px",
          background: colors.surface.page,
          borderBottom: `1px solid ${colors.border.soft}`,
          fontFamily: fonts.body,
          fontSize: 11,
          fontWeight: 600,
          color: colors.ink.muted,
          alignItems: "center",
        }}
      >
        <div>
          <span style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${colors.border.strong}`, display: "inline-block" }} />
        </div>
        <div>العضو</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
          ID <ArrowUpDown size={11} />
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
          العمر <ArrowUpDown size={11} />
        </div>
        <div>المدينة</div>
        <div>الحالة</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
          الدفعة <ArrowUpDown size={11} />
        </div>
        <div />
      </div>

      {/* Rows */}
      <div>
        {rows.map((row, i) => (
          <div
            key={row.id}
            style={{
              display: "grid",
              gridTemplateColumns: "40px minmax(220px,1.4fr) 130px 90px 130px 170px 130px 40px",
              padding: "16px 24px",
              borderBottom: i < rows.length - 1 ? `1px solid ${colors.border.soft}` : "none",
              alignItems: "center",
              fontFamily: fonts.body,
              fontSize: 13,
              color: colors.ink.body,
            }}
          >
            <div>
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  border: `2px solid ${i === 1 ? colors.brand.green : colors.border.strong}`,
                  background: i === 1 ? colors.brand.green : "transparent",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i === 1 && <Check size={11} color="#fff" strokeWidth={3} />}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar label={row.initial} color={row.initialColor} photo={row.photo} />
              <div>
                <div style={{ fontWeight: 600, color: colors.ink.black }}>{row.name}</div>
                <div style={{ fontSize: 11, color: colors.ink.muted, marginTop: 1 }}>{row.joined}</div>
              </div>
            </div>
            <div style={{ fontFamily: fonts.latin, fontWeight: 600 }}>{row.id}</div>
            <div style={{ fontFamily: fonts.latin }}>{row.age}</div>
            <div>{row.city}</div>
            <div><StatusPill status={row.status} /></div>
            <div style={{ fontFamily: fonts.latin, fontWeight: 600 }}>{row.payment}</div>
            <div>
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
                  borderRadius: 6,
                }}
              >
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk actions bar (shown when row selected) */}
      <div
        style={{
          padding: "12px 24px",
          background: colors.brand.greenSoft,
          borderTop: `1px solid ${colors.brand.green}40`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.brand.greenDark }}>
          محدد: 1 عضو
        </span>
        <div style={{ flex: 1 }} />
        <button style={bulkBtn(colors.accent.blue)}>تعديل</button>
        <button style={bulkBtn(colors.accent.amber)}>تعليق</button>
        <button style={bulkBtn(colors.accent.red)}>حظر</button>
        <button
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: colors.brand.greenDark,
            padding: "6px 8px",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <X size={14} />
        </button>
      </div>

      {/* Pagination */}
      <div
        style={{
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `1px solid ${colors.border.soft}`,
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>
          عرض
          <select
            style={{
              padding: "4px 10px",
              border: `1px solid ${colors.border.default}`,
              borderRadius: 6,
              fontFamily: fonts.latin,
              fontSize: 12,
              background: colors.surface.white,
              cursor: "pointer",
            }}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          من 1,247 عضو
        </div>
        <div style={{ display: "inline-flex", gap: 4 }}>
          <button style={pgBtn(false)}><ChevronRight size={13} /></button>
          {[1, 2, 3, "...", 125].map((n, i) => (
            <button key={i} style={pgBtn(n === 2)}>{n}</button>
          ))}
          <button style={pgBtn(false)}><ChevronLeft size={13} /></button>
        </div>
      </div>
    </div>
  );
}

const bulkBtn = (color: string): React.CSSProperties => ({
  padding: "6px 12px",
  background: color,
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontFamily: fonts.body,
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
});

const pgBtn = (active: boolean): React.CSSProperties => ({
  minWidth: 32,
  height: 32,
  padding: "0 10px",
  background: active ? colors.brand.green : colors.surface.white,
  color: active ? "#fff" : colors.ink.body,
  border: `1px solid ${active ? colors.brand.green : colors.border.default}`,
  borderRadius: 6,
  fontFamily: fonts.latin,
  fontSize: 12,
  fontWeight: active ? 700 : 500,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

export default function DataTableSection() {
  return (
    <section id="datatable" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="16"
        eyebrow="بيانات الإدارة"
        title="جداول البيانات"
        description="جدول كامل بفلاتر وبحث وإجراءات جماعية."
        accentColor={colors.accent.amber}
      />

      <div style={{ display: "flex", gap: 20 }}>
        <FilterDrawer />
        <Table />
      </div>
    </section>
  );
}
