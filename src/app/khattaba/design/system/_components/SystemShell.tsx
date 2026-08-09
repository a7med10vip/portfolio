"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Palette, Type, Box, CornerDownRight, Layers, MousePointerClick, Edit3, Square, Tag, Navigation, Bell, Sparkles, MessageCircle, ShieldCheck, Home, Table, CalendarDays, ChevronsUpDown, UserCircle, Wallet, Smile, BarChart3, Globe, Heart, FileCheck, Activity, Menu, X } from "@/app/khattaba/design/_components/icons";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";
import { colors, fonts } from "../../_components/tokens";

type SectionLink = { id: string; label: string; icon: typeof Palette };
type SectionGroup = { title?: string; items: SectionLink[] };

const groups: SectionGroup[] = [
  {
    title: "الأساسيات",
    items: [
      { id: "brand",      label: "الهوية",       icon: Sparkles },
      { id: "colors",     label: "الألوان",      icon: Palette },
      { id: "typography", label: "الخطوط",       icon: Type },
      { id: "spacing",    label: "المسافات",     icon: Box },
      { id: "radius",     label: "الانحناءات",   icon: CornerDownRight },
      { id: "shadows",    label: "الظلال",       icon: Layers },
    ],
  },
  {
    title: "المكونات",
    items: [
      { id: "buttons",    label: "الأزرار",      icon: MousePointerClick },
      { id: "inputs",     label: "الحقول",       icon: Edit3 },
      { id: "cards",      label: "البطاقات",     icon: Square },
      { id: "badges",     label: "الشارات",      icon: Tag },
      { id: "navigation", label: "التنقل",       icon: Navigation },
      { id: "feedback",   label: "التنبيهات",    icon: Bell },
      { id: "icons",      label: "الأيقونات",    icon: Sparkles },
      { id: "chat",       label: "المحادثة",     icon: MessageCircle },
    ],
  },
  {
    title: "متقدمة",
    items: [
      { id: "datatable",     label: "جداول البيانات", icon: Table },
      { id: "form-advanced", label: "حقول متقدّمة",   icon: CalendarDays },
      { id: "overlays",      label: "Overlays",       icon: ChevronsUpDown },
      { id: "avatars",       label: "الأفاتارات",     icon: UserCircle },
      { id: "payment",       label: "الدفع والمحفظة", icon: Wallet },
    ],
  },
  {
    title: "حصرية",
    items: [
      { id: "chat-extras",     label: "إضافات الشات",       icon: Smile },
      { id: "charts",          label: "الرسوم البيانية",    icon: BarChart3 },
      { id: "saudi-cultural",  label: "خاص بالسعودية",      icon: Globe },
      { id: "matching",        label: "مكونات المواءمة",    icon: Heart },
      { id: "forms-smart",     label: "نماذج ذكية",         icon: FileCheck },
      { id: "notifications",   label: "الإشعارات والنشاط",  icon: Activity },
    ],
  },
  {
    title: "المرجع",
    items: [
      { id: "guidelines", label: "الإرشادات", icon: ShieldCheck },
    ],
  },
];

const links: SectionLink[] = groups.flatMap((g) => g.items);

export default function SystemShell({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string>("brand");
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    for (const l of links) {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const sidebarContent = (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <Link
          href="/khattaba/design"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            fontWeight: 600,
            color: colors.ink.muted,
            textDecoration: "none",
            padding: "4px 0",
          }}
        >
          <ArrowRight size={12} style={{ transform: "rotate(180deg)" }} />
          <span>العودة للوحة</span>
        </Link>
        <h1
          style={{
            fontFamily: fonts.heading,
            fontSize: 20,
            fontWeight: 700,
            color: colors.ink.black,
            margin: 0,
          }}
        >
          نظام التصميم
        </h1>
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: 11,
            fontWeight: 600,
            color: colors.brand.green,
          }}
        >
          KH1 · الإصدار 0.2
        </span>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {groups.map((group) => (
          <div key={group.title} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {group.title && (
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 11,
                  fontWeight: 700,
                  color: colors.ink.soft,
                  padding: "0 12px",
                  marginBottom: 4,
                }}
              >
                {group.title}
              </div>
            )}
            {group.items.map((link) => {
              const Icon = link.icon;
              const active = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setNavOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 12px",
                    borderRadius: 8,
                    textDecoration: "none",
                    color: active ? colors.brand.green : colors.ink.body,
                    background: active ? colors.brand.greenSoft : "transparent",
                    fontSize: 13,
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  <Icon size={15} />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        ))}
      </nav>
    </>
  );

  return (
    <ArabicTailProcessor>
      <div
        dir="rtl"
        style={{
          minHeight: "100vh",
          background: colors.surface.page,
          fontFamily: fonts.body,
        }}
        className="system-shell ar-rtl"
      >
        {/* Mobile top bar */}
        <div
          className="system-mobile-bar"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 30,
            background: colors.surface.white,
            borderBottom: `1px solid ${colors.border.soft}`,
            padding: "12px 16px",
            display: "none",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black }}>
              نظام التصميم
            </span>
            <span style={{ fontFamily: fonts.body, fontSize: 10, fontWeight: 700, color: colors.brand.green, padding: "2px 6px", background: colors.brand.greenSoft, borderRadius: 4 }}>
              KH1
            </span>
          </div>
          <button
            onClick={() => setNavOpen(!navOpen)}
            style={{
              width: 36,
              height: 36,
              background: colors.surface.page,
              border: `1px solid ${colors.border.default}`,
              borderRadius: 8,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.ink.body,
              cursor: "pointer",
            }}
          >
            {navOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div style={{ display: "flex", minHeight: "100vh" }}>
          {/* Desktop sticky sidebar */}
          <aside
            className="system-sidebar"
            style={{
              width: 240,
              flexShrink: 0,
              padding: "24px 16px",
              borderLeft: `1px solid ${colors.border.soft}`,
              background: colors.surface.white,
              height: "100vh",
              position: "sticky",
              top: 0,
              display: "flex",
              flexDirection: "column",
              gap: 20,
              overflowY: "auto",
            }}
          >
            {sidebarContent}
          </aside>

          {/* Mobile drawer */}
          {navOpen && (
            <div
              className="system-mobile-drawer"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 40,
                background: "rgba(10,10,10,0.45)",
                display: "none",
              }}
              onClick={() => setNavOpen(false)}
            >
              <aside
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: 280,
                  height: "100vh",
                  background: colors.surface.white,
                  padding: "20px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  overflowY: "auto",
                  marginInlineStart: "auto",
                  boxShadow: "-8px 0 32px rgba(0,0,0,0.15)",
                }}
              >
                {sidebarContent}
              </aside>
            </div>
          )}

          {/* Main content */}
          <main
            className="system-main"
            style={{
              flex: 1,
              padding: "40px 48px 96px",
              maxWidth: 1180,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 56,
              minWidth: 0,
            }}
          >
            <header
              style={{
                paddingBottom: 24,
                borderBottom: `1px solid ${colors.border.soft}`,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <Link
                href="/khattaba/design"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: colors.ink.muted,
                  textDecoration: "none",
                }}
              >
                <Home size={12} />
                <span>لوحة التصميم</span>
                <span>·</span>
                <span style={{ color: colors.brand.green }}>نظام التصميم</span>
              </Link>
              <h1
                className="system-hero"
                style={{
                  fontFamily: fonts.hero,
                  fontSize: 56,
                  fontWeight: 700,
                  color: colors.ink.black,
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                نظام التصميم <span style={{ color: colors.brand.green }}>الكامل</span>
              </h1>
              <p
                style={{
                  fontFamily: fonts.body,
                  fontSize: 14,
                  color: colors.ink.muted,
                  lineHeight: 1.65,
                  maxWidth: 640,
                  margin: 0,
                }}
              >
                مرجع موحّد لكل ما يحتاجه المطوّر والمصمّم لبناء واجهات منصة خطابة السعودية الأولى — ألوان، خطوط، مكونات، وأنماط.
              </p>
            </header>

            {children}
          </main>
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1023px) {
          .system-sidebar { display: none !important; }
          .system-mobile-bar { display: flex !important; }
          .system-mobile-drawer { display: block !important; }
          .system-main { padding: 24px 20px 80px !important; gap: 44px !important; }
          .system-hero { font-size: 40px !important; }
        }
        @media (max-width: 640px) {
          .system-main { padding: 20px 16px 64px !important; gap: 40px !important; }
          .system-hero { font-size: 32px !important; }
        }
      `}</style>
    </ArabicTailProcessor>
  );
}
