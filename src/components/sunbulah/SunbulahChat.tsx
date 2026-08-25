"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaComments, FaXmark, FaPaperPlane, FaCircleCheck, FaListCheck,
  FaChartColumn, FaLightbulb, FaSitemap, FaArrowLeftLong,
} from "react-icons/fa6";
import { S, S_SOFT, MINT, D, LINE } from "./theme";

type Message = { role: "user" | "assistant"; content: string };

const QUICK = [
  "إيه أخطر ملاحظة في التدقيق؟",
  "ليه بوابة التوظيف مش شغالة؟",
  "الموقع ماشي على إيه؟",
  "إيه اللي شغال كويس عندهم؟",
  "أبدأ منين لو عندي يوم واحد؟",
  "إيه وضع العلامات الأربع؟",
];

const NUDGES = [
  "عندك سؤال عن التدقيق؟ أنا هنا.",
  "تحب أشرحلك أي ملاحظة بالتفصيل؟",
  "اسألني عن أي رقم في الوثيقة ومن فين جه.",
];

const OPENING =
  "أهلًا. أنا مرشد وثيقة تدقيق الحضور الرقمي لمجموعة السنبلة. اسألني عن أي ملاحظة أو رقم فيها وهقولك اتقاس إزاي.";

function format(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, '<code style="font-size:.94em;direction:ltr;display:inline-block">$1</code>')
    .replace(/(hello@ahmedali\.online)/g,
      '<a href="mailto:$1" style="color:#A8842C;font-weight:700;text-decoration:underline">$1</a>')
    .replace(/\n/g, "<br>")
    .replace(/(<br>)+$/g, "")
    .trim();
}

/** نغمة قصيرة عند وصول ردّ، بلا ملف صوت. */
function ping() {
  try {
    const Ctx = window.AudioContext || (window as unknown as Record<string, typeof AudioContext>).webkitAudioContext;
    const ctx = new Ctx();
    const t = ctx.currentTime;
    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    const g = ctx.createGain();
    o1.connect(g); o2.connect(g); g.connect(ctx.destination);
    o1.type = "sine"; o2.type = "sine";
    o1.frequency.setValueAtTime(587, t);
    o2.frequency.setValueAtTime(784, t + 0.09);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.05, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
    o1.start(t); o2.start(t + 0.09);
    o1.stop(t + 0.45); o2.stop(t + 0.45);
  } catch { /* الصوت رفاهية، لا يعطّل شيئًا */ }
}

/** ما يستطيع المرشد الحديث فيه، معروضًا قبل أن يبدأ أحد الكتابة. */
const TOPICS = [
  { i: FaListCheck, t: "الملاحظات الثلاث عشرة", d: "كل واحدة، وكيف قيست، وكم تكلّف" },
  { i: FaSitemap, t: "خريطة الموقع", d: "الصفحات القائمة، والفروع المفقودة" },
  { i: FaChartColumn, t: "المقارنة بالنظير", d: "الأرقام أمام المراعي، وأين تتقدّم السنبلة" },
  { i: FaCircleCheck, t: "ما يعمل جيدًا", d: "ستة أسس قائمة يُبنى عليها" },
  { i: FaLightbulb, t: "الخطة والتطوير", d: "ما يُصلَح في يوم، وما يحتاج إعادة بناء" },
];

export default function SunbulahChat() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [msgs, setMsgs] = useState<Message[]>([{ role: "assistant", content: OPENING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [nudge, setNudge] = useState<string | null>(null);
  const [everOpened, setEverOpened] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  /* لمسة واحدة بعد أن يكون الزائر قد قرأ شيئًا، ثم تصمت. */
  useEffect(() => {
    if (everOpened) return;
    let i = 0;
    const show = () => {
      if (everOpened || i >= NUDGES.length) return;
      setNudge(NUDGES[i++]);
      window.setTimeout(() => setNudge(null), 7000);
    };
    const first = window.setTimeout(show, 14000);
    const rep = window.setInterval(show, 42000);
    return () => { window.clearTimeout(first); window.clearInterval(rep); };
  }, [everOpened]);

  const send = useCallback(async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    setInput("");
    setNudge(null);
    const next: Message[] = [...msgs, { role: "user", content: q }];
    setMsgs(next);
    setBusy(true);
    try {
      const res = await fetch("/api/chat/sunbulah", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-20) }) });
      const data = await res.json();
      setMsgs([...next, { role: "assistant", content: data.reply ?? "معلش، جرّب تاني." }]);
      ping();
    } catch {
      setMsgs([...next, { role: "assistant", content: "الاتصال وقع. جرّب تاني بعد لحظة." }]);
    } finally {
      setBusy(false);
    }
  }, [busy, msgs]);

  return (
    <>
      {/* الفقاعة */}
      {!open && (
        <div className="fixed bottom-6 left-6 z-[97] flex items-end gap-3" dir="rtl">
          <button
            onClick={() => { setOpen(true); setEverOpened(true); setNudge(null); }}
            aria-label="افتح مرشد الوثيقة"
            className="relative grid place-items-center rounded-full transition-transform hover:scale-105 active:scale-95"
            style={{ width: 58, height: 58, background: S }}
          >
            <FaComments size={22} color="#fff" />
            <span className="absolute rounded-full"
              style={{ top: -2, right: -2, width: 14, height: 14, background: MINT, border: "2px solid #fff" }} />
          </button>

          {nudge && (
            <div className="max-w-[240px] rounded-2xl px-4 py-3 text-[12.5px] leading-loose"
              style={{ background: "#fff", border: `1px solid ${LINE}`, color: D }}>
              {nudge}
            </div>
          )}
        </div>
      )}

      {/* اللوحة */}
      {open && (
        <div className="fixed bottom-6 left-6 z-[97] flex flex-col sb-chat" dir="rtl"
          style={{
            width: "min(392px, calc(100vw - 32px))", height: "min(586px, calc(100vh - 96px))",
            background: "#fff", border: `1px solid ${LINE}`, borderRadius: 22, overflow: "hidden" }}>
          <header className="flex items-center justify-between px-4 shrink-0"
            style={{ height: 62, background: D }}>
            <div className="flex items-center gap-3 min-w-0">
              <img src="/ahmed.jpeg" alt="أحمد علي" width={36} height={36}
                style={{ width: 36, height: 36, borderRadius: 12, objectFit: "cover", flexShrink: 0 }} />
              <div className="min-w-0">
                <p className="ar-heading text-[14px] truncate" style={{ color: "#fff" }}>أحمد علي</p>
                <p className="ar-body text-[10.5px] truncate" style={{ color: "#fff", opacity: .6 }}>
                  مرشد وثيقة التدقيق، يجيب منها فقط
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="إغلاق"
              className="grid place-items-center rounded-full transition-colors"
              style={{ width: 32, height: 32, background: "rgba(255,255,255,.1)" }}>
              <FaXmark size={15} color="#fff" />
            </button>
          </header>

          {!started ? (
            <div className="flex-1 overflow-y-auto px-6 py-7" style={{ background: "#fff" }}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <img src="/ahmed.jpeg" alt="أحمد علي"
                  style={{ width: 62, height: 62, borderRadius: 20, objectFit: "cover" }} />
                <span style={{ width: 1, height: 34, background: LINE }} />
                <img src="/sunbulah/brand/group.webp" alt="مجموعة السنبلة"
                  style={{ width: 92, height: "auto" }} />
              </div>

              <p className="ar-heading text-[19px] text-center mb-3" style={{ color: D, lineHeight: 1.5 }}>
                أهلًا، أنا أحمد
              </p>
              <p className="ar-body text-[13px] leading-loose text-center mb-7" style={{ color: D, opacity: .75 }}>
                أعددت هذه الوثيقة عن موقع مجموعة السنبلة من الخارج، دون تكليف ودون وصول إلى أي
                نظام. هذا المرشد يجيب من داخلها فقط، ويقول لك عن كل رقم كيف قيس.
              </p>

              <p className="ar-body text-[11.5px] mb-3" style={{ color: S }}>ما يمكن أن نتحدث فيه</p>
              <div className="space-y-2 mb-7">
                {TOPICS.map((t) => (
                  <div key={t.t} className="flex items-start gap-3 px-4 py-3 rounded-[13px]"
                    style={{ border: `1px solid ${LINE}` }}>
                    <span className="grid place-items-center rounded-lg shrink-0 mt-0.5"
                      style={{ width: 30, height: 30, background: `${S}12`, color: S }}>
                      <t.i size={13} />
                    </span>
                    <span className="min-w-0">
                      <span className="ar-heading block text-[13.5px]" style={{ color: D }}>{t.t}</span>
                      <span className="ar-body block text-[11.5px] mt-0.5" style={{ color: D, opacity: .6 }}>{t.d}</span>
                    </span>
                  </div>
                ))}
              </div>

              <button onClick={() => setStarted(true)}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full ar-body text-[13.5px]"
                style={{ background: S, color: "#fff" }}>
                ابدأ المحادثة
                <FaArrowLeftLong size={12} />
              </button>
              <p className="ar-body text-[11px] text-center mt-4" style={{ color: D, opacity: .45 }}>
                لا يذكر أسعارًا ولا نطاق عمل. الوثيقة بلا تسعير عمدًا.
              </p>
            </div>
          ) : (
          <div ref={bodyRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3.5" style={{ background: "#FDFCFA" }}>
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
                <div className="max-w-[86%] px-4 py-3 text-[13.5px] leading-loose"
                  style={{
                    background: m.role === "user" ? D : "#fff",
                    color: m.role === "user" ? "#fff" : D,
                    border: m.role === "user" ? "none" : `1px solid ${LINE}`,
                    borderRadius: m.role === "user" ? "18px 18px 18px 6px" : "18px 18px 6px 18px" }}
                  dangerouslySetInnerHTML={{ __html: format(m.content) }} />
              </div>
            ))}
            {busy && (
              <div className="flex justify-end">
                <div className="px-4 py-3.5 rounded-[18px]" style={{ background: "#fff", border: `1px solid ${LINE}` }}>
                  <span className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="block rounded-full"
                        style={{ width: 6, height: 6, background: S, animation: `sbDot 1.1s ${i * 0.16}s infinite ease-in-out` }} />
                    ))}
                  </span>
                </div>
              </div>
            )}
          </div>

          )}

          {started && msgs.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0" style={{ background: "#FDFCFA" }}>
              {QUICK.map((q) => (
                <button key={q} onClick={() => send(q)}
                  className="text-[11.5px] px-3 py-1.5 rounded-full transition-colors"
                  style={{ border: `1px solid ${S}44`, color: D, background: "#fff" }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {started && (
          <form onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 px-4 shrink-0"
            style={{ height: 66, borderTop: `1px solid ${LINE}`, background: "#fff" }}>
            <input value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="اسأل عن أي ملاحظة أو رقم…"
              className="flex-1 outline-none text-[13.5px] px-3 py-2.5 rounded-full"
              style={{ background: "#FDFCFA", border: `1px solid ${LINE}`, color: D }} />
            <button type="submit" disabled={busy || !input.trim()} aria-label="إرسال"
              className="grid place-items-center rounded-full shrink-0 transition-opacity"
              style={{ width: 40, height: 40, background: S, opacity: busy || !input.trim() ? .4 : 1 }}>
              <FaPaperPlane size={14} color="#fff" style={{ transform: "scaleX(-1)" }} />
            </button>
          </form>
          )}

          <style>{`
            @keyframes sbDot { 0%,80%,100% { transform: translateY(0); opacity:.4 } 40% { transform: translateY(-5px); opacity:1 } }
            @media (max-width: 520px) { .sb-chat { bottom: 12px !important; left: 12px !important; right: 12px !important; width: auto !important; } }
          `}</style>
        </div>
      )}
    </>
  );
}
