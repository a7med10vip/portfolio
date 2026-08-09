import {
  Heart, Search, MessageCircle, User, Home, Bell, Settings, Phone, Mail,
  MapPin, Calendar, Clock, Wallet, CreditCard, Shield, ShieldCheck, Lock,
  BadgeCheck, Crown, Send, Eye, EyeOff, Check, X, Plus, Minus, ChevronLeft,
  ChevronRight, ChevronDown, ChevronUp, ArrowLeft, ArrowRight, Filter,
  Trash2, Edit3, Download, Upload, Camera, Image, FileText, Users, UserPlus,
  UserCheck, UserX, Ban, AlertTriangle, Info, CheckCircle2, AlertCircle,
  Star, Sparkles, Activity, BarChart3, TrendingUp, type LucideIcon,
} from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

const groups: { title: string; icons: { Icon: LucideIcon; name: string }[] }[] = [
  {
    title: "الأساسية · Common",
    icons: [
      { Icon: Home, name: "Home" }, { Icon: Search, name: "Search" }, { Icon: Bell, name: "Bell" },
      { Icon: Settings, name: "Settings" }, { Icon: User, name: "User" }, { Icon: Users, name: "Users" },
      { Icon: MessageCircle, name: "Message" }, { Icon: Send, name: "Send" },
    ],
  },
  {
    title: "الحساب · Account",
    icons: [
      { Icon: UserPlus, name: "Add" }, { Icon: UserCheck, name: "Verified" }, { Icon: UserX, name: "Remove" },
      { Icon: BadgeCheck, name: "Badge" }, { Icon: Crown, name: "Premium" }, { Icon: Lock, name: "Lock" },
      { Icon: Eye, name: "Eye" }, { Icon: EyeOff, name: "Eye Off" },
    ],
  },
  {
    title: "التواصل · Contact",
    icons: [
      { Icon: Phone, name: "Phone" }, { Icon: Mail, name: "Mail" }, { Icon: MapPin, name: "Location" },
      { Icon: Heart, name: "Heart" }, { Icon: Calendar, name: "Calendar" }, { Icon: Clock, name: "Clock" },
    ],
  },
  {
    title: "المال · Payment",
    icons: [
      { Icon: Wallet, name: "Wallet" }, { Icon: CreditCard, name: "Card" }, { Icon: TrendingUp, name: "Trend" },
      { Icon: BarChart3, name: "Stats" }, { Icon: Activity, name: "Activity" },
    ],
  },
  {
    title: "الأمان · Security",
    icons: [
      { Icon: Shield, name: "Shield" }, { Icon: ShieldCheck, name: "Verified" }, { Icon: Ban, name: "Ban" },
      { Icon: AlertTriangle, name: "Warning" }, { Icon: AlertCircle, name: "Alert" }, { Icon: CheckCircle2, name: "Check" },
      { Icon: Info, name: "Info" },
    ],
  },
  {
    title: "الإجراءات · Actions",
    icons: [
      { Icon: Plus, name: "Add" }, { Icon: Minus, name: "Remove" }, { Icon: Check, name: "Check" },
      { Icon: X, name: "Close" }, { Icon: Edit3, name: "Edit" }, { Icon: Trash2, name: "Delete" },
      { Icon: Filter, name: "Filter" }, { Icon: Download, name: "Download" }, { Icon: Upload, name: "Upload" },
      { Icon: Camera, name: "Camera" }, { Icon: Image, name: "Image" }, { Icon: FileText, name: "File" },
    ],
  },
  {
    title: "التنقل · Navigation",
    icons: [
      { Icon: ArrowRight, name: "→ (rtl)" }, { Icon: ArrowLeft, name: "← (rtl)" },
      { Icon: ChevronRight, name: ">" }, { Icon: ChevronLeft, name: "<" },
      { Icon: ChevronDown, name: "↓" }, { Icon: ChevronUp, name: "↑" },
    ],
  },
  {
    title: "متفرقات · Misc",
    icons: [
      { Icon: Star, name: "Star" }, { Icon: Sparkles, name: "Sparkles" },
    ],
  },
];

function IconCell({ Icon, name }: { Icon: LucideIcon; name: string }) {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.md,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        transition: "all 0.15s",
      }}
    >
      <Icon size={22} color={colors.ink.body} strokeWidth={1.75} />
      <div
        style={{
          fontFamily: fonts.latin,
          fontSize: 10,
          fontWeight: 600,
          color: colors.ink.muted,
          textAlign: "center",
        }}
      >
        {name}
      </div>
    </div>
  );
}

export default function IconsSection() {
  return (
    <section id="icons" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="13"
        eyebrow="مكتبة الأيقونات"
        title="الأيقونات"
        description="مكتبة Lucide بسمك خط 1.75 وحجم افتراضي 20 بكسل."
      />

      {/* Size showcase */}
      <div
        style={{
          background: colors.surface.white,
          border: `1px solid ${colors.border.soft}`,
          borderRadius: 20,
          padding: 24,
          marginBottom: 20,
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 16,
        }}
      >
        {[
          { size: 14, label: "Small · 14px", use: "inline في النصوص" },
          { size: 16, label: "Default · 16px", use: "أزرار وbadges" },
          { size: 20, label: "Medium · 20px", use: "navbar/sidebar" },
          { size: 24, label: "Large · 24px", use: "section headers" },
          { size: 32, label: "XL · 32px", use: "empty states" },
        ].map((s) => (
          <div
            key={s.size}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              padding: 16,
              background: colors.surface.page,
              borderRadius: radius.md,
            }}
          >
            <Heart size={s.size} color={colors.brand.green} strokeWidth={1.75} />
            <div style={{ fontFamily: fonts.latin, fontSize: 11, fontWeight: 700, color: colors.ink.black }}>
              {s.label}
            </div>
            <div style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted }}>
              {s.use}
            </div>
          </div>
        ))}
      </div>

      {/* Icon groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {groups.map((g) => (
          <div key={g.title}>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 13,
                fontWeight: 600,
                color: colors.ink.body,
                marginBottom: 14,
              }}
            >
              {g.title} · {g.icons.length}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, 1fr)",
                gap: 10,
              }}
            >
              {g.icons.map((i) => (
                <IconCell key={i.name} Icon={i.Icon} name={i.name} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
