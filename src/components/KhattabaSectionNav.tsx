"use client";

import { useEffect, useRef, useState } from "react";
/* eslint-disable @next/next/no-img-element */

const NAV_W = 240;
const TIP_W = 320;

const NAV_ITEMS: { id: string; label: string; color: string; tourDesc: string }[] = [
  { id: "section-01", label: "ملخص المشروع", color: "#30c280",
    tourDesc: "نظرة موجزة على المشروع والعميل والقيمة الإجمالية والمدة الزمنية." },
  { id: "section-02", label: "الحزمة التقنية", color: "#3B82F6",
    tourDesc: "خمسة محاور تقنية تغطي الواجهة الأمامية والخلفية وتطبيق الجوال والخدمات والأمان." },
  { id: "section-03", label: "خريطة الصفحات", color: "#8B5CF6",
    tourDesc: "هيكل صفحات الموقع ولوحة التحكم وتطبيق الجوال." },
  { id: "section-04", label: "سير العمل", color: "#F59E0B",
    tourDesc: "رحلة المستخدم من التسجيل حتى التوصيل عبر الإدارة في 12 مرحلة." },
  { id: "section-05", label: "المراحل والدفعات", color: "#EF4444",
    tourDesc: "خمس مراحل تنفيذية متسلسلة على مدار 12 أسبوعاً مع توزيع الدفعات." },
  { id: "section-06", label: "الترتيب الزمني", color: "#0A0A0A",
    tourDesc: "خط زمني Gantt للمشروع مع تداخل مرحلتي الواجهة والخلفية." },
  { id: "section-07", label: "ترحيل البيانات", color: "#10B981",
    tourDesc: "خطة ترحيل بيانات الأعضاء من النظام القديم إلى الجديد." },
  { id: "section-08", label: "قاعدة البيانات", color: "#0EA5E9",
    tourDesc: "هيكل قاعدة البيانات وأهم الجداول والعلاقات بينها." },
  { id: "section-09", label: "المتطلبات الإضافية", color: "#A855F7",
    tourDesc: "اثنان وعشرون متطلباً وميزة تفصيلية مطلوبة في المنصة والتطبيق." },
  { id: "section-10", label: "الإقرارات والتعهدات", color: "#F97316",
    tourDesc: "الإقرارات والتعهدات المطلوبة من الأعضاء قبل التسجيل وبعده." },
  { id: "section-11", label: "نماذج التسجيل", color: "#EC4899",
    tourDesc: "أسئلة نماذج التسجيل للرجل والمرأة جنباً إلى جنب." },
  { id: "section-12", label: "المراحل المستقبلية", color: "#6366F1",
    tourDesc: "أعمال ومراحل غير مشمولة في العقد الحالي يمكن تنفيذها لاحقاً." },
];

const DRAG_NOTE = {
  title: "ادفع القائمة لأي مكان",
  desc: "اسحب رأس القائمة (الصورة + الاسم) وضعها في المكان اللي يناسبك أثناء القراءة — يمين أو يسار أو فوق أو تحت. هتفتكر مكانها.",
};

export default function KhattabaSectionNav() {
  const [active, setActive] = useState<string>("section-01");
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [tourIdx, setTourIdx] = useState<number | null>(null);
  const [tipPos, setTipPos] = useState<{ x: number; y: number; placement: "left" | "right" } | null>(null);
  const dragOffset = useRef<{ x: number; y: number } | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const TOUR_LEN = NAV_ITEMS.length + 1;

  useEffect(() => {
    let initial: { x: number; y: number } | null = null;
    try {
      const saved = localStorage.getItem("kh-nav-pos");
      if (saved) initial = JSON.parse(saved);
    } catch {}
    if (!initial) {
      const h = navRef.current?.offsetHeight ?? 540;
      initial = {
        x: 16,
        y: Math.max(16, window.innerHeight / 2 - h / 2),
      };
    }
    const h = navRef.current?.offsetHeight ?? 540;
    initial.x = Math.max(8, Math.min(window.innerWidth - NAV_W - 8, initial.x));
    initial.y = Math.max(8, Math.min(window.innerHeight - h - 8, initial.y));
    setPos(initial);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[id^='section-']");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let done = false;
    try { done = localStorage.getItem("kh-tour-done") === "1"; } catch {}
    if (done) return;
    const t = setTimeout(() => setTourIdx(0), 1200);
    return () => clearTimeout(t);
  }, []);

  const finishTour = () => {
    setTourIdx(null);
    try { localStorage.setItem("kh-tour-done", "1"); } catch {}
  };
  const nextTour = () => {
    if (tourIdx === null) return;
    if (tourIdx >= TOUR_LEN - 1) finishTour();
    else setTourIdx(tourIdx + 1);
  };

  useEffect(() => {
    if (tourIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finishTour();
      else if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Enter") nextTour();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourIdx]);

  useEffect(() => {
    if (tourIdx === null || !navRef.current) {
      setTipPos(null);
      return;
    }
    const computePos = () => {
      const isDrag = tourIdx === NAV_ITEMS.length;
      const target = isDrag
        ? navRef.current?.querySelector<HTMLElement>("[data-drag-handle]")
        : navRef.current?.querySelector<HTMLElement>(`[data-nav-item="${NAV_ITEMS[tourIdx].id}"]`);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const placeRight = rect.left < TIP_W + 32;
      const x = placeRight ? rect.right + 16 : rect.left - TIP_W - 16;
      const y = rect.top + rect.height / 2;
      setTipPos({ x, y, placement: placeRight ? "right" : "left" });
    };
    const raf = requestAnimationFrame(computePos);
    window.addEventListener("resize", computePos);
    window.addEventListener("scroll", computePos, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", computePos);
      window.removeEventListener("scroll", computePos);
    };
  }, [tourIdx, pos]);

  const tourHighlightId = tourIdx !== null && tourIdx < NAV_ITEMS.length ? NAV_ITEMS[tourIdx].id : null;
  const isDragStep = tourIdx !== null && tourIdx === NAV_ITEMS.length;
  const tourTitle = isDragStep
    ? DRAG_NOTE.title
    : tourIdx !== null
      ? NAV_ITEMS[tourIdx].label
      : "";
  const tourDesc = isDragStep
    ? DRAG_NOTE.desc
    : tourIdx !== null
      ? NAV_ITEMS[tourIdx].tourDesc
      : "";
  const tourColor = isDragStep
    ? "#30c280"
    : tourIdx !== null
      ? NAV_ITEMS[tourIdx].color
      : "#30c280";

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pos) return;
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    document.body.style.userSelect = "none";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragOffset.current || !navRef.current) return;
    const h = navRef.current.offsetHeight;
    const nextX = Math.max(8, Math.min(window.innerWidth - NAV_W - 8, e.clientX - dragOffset.current.x));
    const nextY = Math.max(8, Math.min(window.innerHeight - h - 8, e.clientY - dragOffset.current.y));
    setPos({ x: nextX, y: nextY });
  };

  const onPointerUp = () => {
    if (dragOffset.current) {
      dragOffset.current = null;
      setDragging(false);
      document.body.style.userSelect = "";
      try { localStorage.setItem("kh-nav-pos", JSON.stringify(pos)); } catch {}
    }
  };

  return (
    <>
      <aside
        ref={navRef}
        aria-label="قائمة التنقل بين الأقسام"
        dir="rtl"
        className="fixed z-[65] hidden xl:flex flex-col rounded-[18px] overflow-hidden"
        style={{
          width: NAV_W,
          left: pos?.x,
          top: pos?.y,
          visibility: pos ? "visible" : "hidden",
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: dragging ? "0 18px 50px rgba(0,0,0,0.18)" : "0 12px 40px rgba(0,0,0,0.08)",
          transition: dragging ? "none" : "box-shadow 250ms ease",
          fontFamily: "'Ahmed Sans', sans-serif",
        }}
      >
        <div
          data-drag-handle
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="px-4 pt-4 pb-3 flex flex-col gap-2 select-none"
          style={{
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            cursor: dragging ? "grabbing" : "grab",
            touchAction: "none",
          }}
        >
          <div className="flex items-center justify-between">
            <img
              src="/myphoto-profile.png"
              alt="Ahmed Ali"
              className="object-cover rounded-full pointer-events-none"
              style={{ height: 32, width: 32, border: "2px solid #30c280" }}
              draggable={false}
            />
            <div className="flex flex-col items-end">
              <span style={{ fontSize: 12, fontWeight: 700, color: "#0A0A0A", lineHeight: 1.2 }}>
                خطابة السعودية الأولى
              </span>
              <span style={{ fontSize: 10, color: "rgba(0,0,0,0.5)" }}>
                الملحق (أ) · 12 قسم
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 pt-1.5" style={{ opacity: 0.35 }}>
            <span className="block rounded-full" style={{ width: 3, height: 3, background: "#0A0A0A" }} />
            <span className="block rounded-full" style={{ width: 3, height: 3, background: "#0A0A0A" }} />
            <span className="block rounded-full" style={{ width: 3, height: 3, background: "#0A0A0A" }} />
            <span className="block rounded-full" style={{ width: 3, height: 3, background: "#0A0A0A" }} />
            <span className="block rounded-full" style={{ width: 3, height: 3, background: "#0A0A0A" }} />
          </div>
        </div>

        <div className="p-1.5 flex flex-col gap-0.5">
          {NAV_ITEMS.map((item, i) => {
            const isActive = active === item.id;
            const isTourHighlighted = tourHighlightId === item.id;
            const showAccent = isActive || isTourHighlighted;
            return (
              <button
                key={item.id}
                data-nav-item={item.id}
                onClick={() => handleClick(item.id)}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] text-right cursor-pointer border-0 relative"
                style={{
                  background: isTourHighlighted
                    ? `${item.color}30`
                    : isActive
                      ? `${item.color}1c`
                      : "transparent",
                  transition: "background 350ms cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: isTourHighlighted ? `0 0 0 2px ${item.color}` : "none",
                }}
                onMouseEnter={(e) => { if (!showAccent) e.currentTarget.style.background = "rgba(0,0,0,0.03)"; }}
                onMouseLeave={(e) => { if (!showAccent) e.currentTarget.style.background = "transparent"; }}
                aria-label={item.label}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className="block rounded-full flex-shrink-0"
                  style={{
                    width: showAccent ? 8 : 5,
                    height: showAccent ? 8 : 5,
                    background: item.color,
                    boxShadow: showAccent ? `0 0 0 3px ${item.color}33` : "none",
                    opacity: showAccent ? 1 : 0.55,
                    transition: "all 350ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
                <span
                  style={{
                    color: showAccent ? "#0A0A0A" : "rgba(0,0,0,0.35)",
                    fontWeight: showAccent ? 700 : 500,
                    fontSize: 11,
                    width: 18,
                    fontVariantNumeric: "tabular-nums",
                    transition: "color 350ms",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="truncate flex-1"
                  style={{
                    color: showAccent ? "#0A0A0A" : "rgba(0,0,0,0.55)",
                    fontWeight: showAccent ? 700 : 500,
                    fontSize: 12,
                    transition: "color 350ms",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {tourIdx !== null && (
        <div
          className="hidden xl:block fixed inset-0 z-[55]"
          style={{
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: "opacity 400ms ease",
          }}
          aria-hidden
        />
      )}

      {tourIdx !== null && tipPos && (
        <div
          dir="rtl"
          className="hidden xl:flex fixed z-[70] flex-col rounded-[18px] overflow-hidden"
          style={{
            width: TIP_W,
            left: tipPos.x,
            top: tipPos.y,
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.99)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
            transition: "left 400ms cubic-bezier(0.4, 0, 0.2, 1), top 400ms cubic-bezier(0.4, 0, 0.2, 1)",
            fontFamily: "'Ahmed Sans', sans-serif",
          }}
          role="dialog"
          aria-label="جولة تعريفية"
        >
          <span
            aria-hidden
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              [tipPos.placement === "left" ? "right" : "left"]: -8,
              width: 14,
              height: 14,
              background: "rgba(255,255,255,0.99)",
              transform: "translateY(-50%) rotate(45deg)",
              borderTop: tipPos.placement === "right" ? "1px solid rgba(0,0,0,0.08)" : "none",
              borderLeft: tipPos.placement === "right" ? "1px solid rgba(0,0,0,0.08)" : "none",
              borderBottom: tipPos.placement === "left" ? "1px solid rgba(0,0,0,0.08)" : "none",
              borderRight: tipPos.placement === "left" ? "1px solid rgba(0,0,0,0.08)" : "none",
            } as React.CSSProperties}
          />

          <div className="h-1 w-full" style={{ background: "rgba(0,0,0,0.05)" }}>
            <div
              className="h-full"
              style={{
                width: `${((tourIdx + 1) / TOUR_LEN) * 100}%`,
                background: tourColor,
                transition: "width 400ms cubic-bezier(0.4, 0, 0.2, 1), background 400ms",
              }}
            />
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="block w-2.5 h-2.5 rounded-full" style={{ background: tourColor }} />
              <span style={{ fontSize: 10, color: "rgba(0,0,0,0.45)", fontWeight: 700, letterSpacing: 1 }}>
                {isDragStep ? "نصيحة" : `الخطوة ${String(tourIdx + 1).padStart(2, "0")} من ${String(TOUR_LEN).padStart(2, "0")}`}
              </span>
            </div>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0A0A0A", lineHeight: 1.3, marginBottom: 6 }}>
              {tourTitle}
            </h3>
            <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "rgba(0,0,0,0.65)", marginBottom: 16 }}>
              {tourDesc}
            </p>

            <button
              onClick={nextTour}
              className="w-full py-2.5 rounded-full cursor-pointer border-0"
              style={{
                background: tourColor,
                color: tourColor === "#0A0A0A" ? "#fff" : "#0A0A0A",
                boxShadow: `0 4px 16px ${tourColor}55`,
                fontSize: 12,
                fontWeight: 700,
                transition: "background 350ms, box-shadow 350ms, transform 200ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {tourIdx >= TOUR_LEN - 1 ? "تمام، فهمت" : "التالي ←"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
