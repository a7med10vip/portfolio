"use client";

/* The signature builder: pick a company, fill in four fields, watch the card
   render, copy it straight into Gmail or Outlook. */

import { useEffect, useMemo, useRef, useState } from "react";

import { BRANDS, type Brand } from "@/lib/signature/brands";
import { FIELD_MAX, type Person } from "@/lib/signature/card";
import { buildSignatureHtml } from "@/lib/signature/html";

const INK = "#04323A";
const TEAL = "#004D5A";
const MINT = "#CFF7EE";
const MUTED = "#71717A";
const WASH = "#FAFAFA";

/** Pasted signatures have to point somewhere stable — not at a preview
    deployment, and not at localhost. */
const SIGNATURE_ORIGIN = "https://www.ahmedali.online";

/* Each tile is a slice of that brand's own card, so the choice is made by
   looking at the thing you are about to get. */
const MARKS: Record<string, string> = {
  emotion: "/signature/marks/emotion.png",
  vertex: "/signature/marks/vertex.png",
};

type Fields = Omit<Person, "brand">;
const EMPTY: Fields = { name: "", title: "", phone: "", email: "" };

export default function SignatureBuilder({ initialBrand }: { initialBrand?: string }) {
  const [brandKey, setBrandKey] = useState<string | null>(initialBrand ?? null);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState<"html" | "code" | null>(null);
  const [showCode, setShowCode] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOrigin(process.env.NODE_ENV === "production" ? SIGNATURE_ORIGIN : window.location.origin);
  }, []);

  // ?brand=vertex lets a card be handed straight to someone, picker skipped.
  useEffect(() => {
    if (initialBrand) return;
    const wanted = new URLSearchParams(window.location.search).get("brand");
    if (wanted && BRANDS[wanted]) setBrandKey(wanted);
  }, [initialBrand]);

  const brand: Brand | null = brandKey ? BRANDS[brandKey] : null;

  const complete = useMemo(
    () => Object.values(fields).every((value) => value.trim().length > 0),
    [fields]
  );

  /* Every keystroke would otherwise address a new image. Settling first keeps
     the preview from rendering a card per character. */
  const [settled, setSettled] = useState<Person | null>(null);
  useEffect(() => {
    if (!complete || !brand) {
      setSettled(null);
      return;
    }
    const timer = setTimeout(
      () =>
        setSettled({
          brand: brand.key,
          name: fields.name.trim(),
          title: fields.title.trim(),
          phone: fields.phone.trim(),
          email: fields.email.trim(),
        }),
      450
    );
    return () => clearTimeout(timer);
  }, [fields, complete, brand]);

  const html = useMemo(
    () => (settled && brand && origin ? buildSignatureHtml(brand, settled, origin) : ""),
    [settled, brand, origin]
  );

  // Poppins and Bebas carry Latin only, so Arabic would come out as empty
  // boxes. Say so here rather than letting the render fail.
  const nonLatin = useMemo(
    () => Object.values(fields).some((value) => /[^\u0020-\u024F\u2000-\u206F]/.test(value)),
    [fields]
  );

  async function copySignature() {
    if (!html) return;
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([html], { type: "text/plain" }),
        }),
      ]);
      setCopied("html");
      setTimeout(() => setCopied(null), 2400);
    } catch {
      // Safari and older browsers refuse ClipboardItem outside a trusted path;
      // selecting the rendered card lets the user copy it by hand.
      const node = previewRef.current;
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }

  async function copyCode() {
    if (!html) return;
    await navigator.clipboard.writeText(html);
    setCopied("code");
    setTimeout(() => setCopied(null), 2400);
  }

  /* ---------------------------------------------------------------- picker */
  if (!brand) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-5"
        style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="picker-title"
      >
        <div
          className="w-full max-w-lg rounded-[24px] p-7 md:p-8"
          style={{ background: "#fff", border: `2px solid ${TEAL}`, boxShadow: `6px 6px 0px 0px ${TEAL}` }}
        >
          <h2 id="picker-title" className="heading text-2xl mb-1.5" style={{ color: INK, lineHeight: 1.3 }}>
            Which company?
          </h2>
          <p className="text-sm mb-6" style={{ color: MUTED }}>
            Pick the company you work for, and we&apos;ll build your signature on its card.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.values(BRANDS).map((b) => (
              <button
                key={b.key}
                type="button"
                onClick={() => setBrandKey(b.key)}
                className="group rounded-2xl overflow-hidden text-left cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: `2px solid ${TEAL}` }}
              >
                {/* A plain img on purpose: the optimiser caches by URL, so a
                    re-cropped tile under the same name would keep serving the
                    old one. These are small and already the right size. */}
                <img
                  src={MARKS[b.key]}
                  alt={b.label}
                  width={600}
                  height={500}
                  className="block w-full h-auto"
                />
                <span className="block px-4 py-3" style={{ background: "#fff" }}>
                  <span className="block text-sm font-bold" style={{ color: INK }}>
                    {b.label}
                  </span>
                  <span className="block text-[11px]" style={{ color: MUTED }}>
                    {b.tagline}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- fields */
  const FIELD_LIST: Array<{ key: keyof Fields; label: string; placeholder: string; type: string; hint?: string }> = [
    { key: "name", label: "Full name", placeholder: "Your full name", type: "text", hint: "Shown in capitals, the way the artwork sets it" },
    { key: "title", label: "Job title", placeholder: "Your job title", type: "text" },
    { key: "phone", label: "Phone", placeholder: brand.phonePlaceholder, type: "tel" },
    { key: "email", label: "Email", placeholder: brand.emailPlaceholder, type: "email" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2">
        <div className="rounded-[20px] p-6 md:p-7" style={{ background: WASH, border: `2px solid ${TEAL}` }}>
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h2 className="heading text-xl" style={{ color: INK, lineHeight: 1.35 }}>
              Your details
            </h2>
            <button
              type="button"
              onClick={() => setBrandKey(null)}
              className="text-[11px] font-bold px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap"
              style={{ background: MINT, color: INK, border: `1.5px solid ${TEAL}` }}
            >
              {brand.label} · change
            </button>
          </div>
          <p className="text-sm mb-6" style={{ color: MUTED }}>
            The card builds itself as you type.
          </p>

          <div className="flex flex-col gap-4">
            {FIELD_LIST.map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-bold mb-2" style={{ color: INK }}>
                  {f.label}
                </label>
                <input
                  type={f.type}
                  value={fields[f.key]}
                  maxLength={FIELD_MAX}
                  placeholder={f.placeholder}
                  onChange={(e) => setFields({ ...fields, [f.key]: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ background: "#fff", border: `2px solid ${TEAL}`, color: INK }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = `3px 3px 0px 0px ${TEAL}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = "none";
                  }}
                />
                {f.hint && (
                  <p className="text-[11px] mt-1.5" style={{ color: MUTED }}>
                    {f.hint}
                  </p>
                )}
              </div>
            ))}
          </div>

          {nonLatin && (
            <p
              className="mt-4 text-xs rounded-xl px-3 py-2.5"
              style={{ background: "#fff", border: `1.5px solid ${TEAL}`, color: INK }}
            >
              The artwork&apos;s typeface only carries Latin letters — Arabic and other scripts
              won&apos;t render on the card.
            </p>
          )}

          <button
            type="button"
            onClick={copySignature}
            disabled={!html || nonLatin}
            className="mt-6 inline-flex items-center justify-center gap-2 h-12 w-full rounded-full text-base font-bold cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: copied === "html" ? MINT : TEAL,
              color: copied === "html" ? INK : "#fff",
              border: `2px solid ${TEAL}`,
            }}
          >
            {copied === "html" ? (
              <>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M4 10l4 4 8-8" stroke={INK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Copied — now paste it in your mail settings
              </>
            ) : (
              "Copy signature"
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowCode((v) => !v)}
            disabled={!html}
            className="mt-2 w-full text-xs font-bold py-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: TEAL }}
          >
            {showCode ? "Hide HTML" : "Need the HTML instead?"}
          </button>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="rounded-[20px] p-6 md:p-7 h-full" style={{ background: MINT, border: `2px solid ${TEAL}` }}>
          <h2 className="heading text-xl mb-1.5" style={{ color: INK, lineHeight: 1.35 }}>
            Preview
          </h2>
          <p className="text-sm mb-5" style={{ color: MUTED }}>
            Exactly what lands at the bottom of your email.
          </p>

          <div className="rounded-2xl p-4 overflow-x-auto" style={{ background: "#fff", border: `1.5px solid ${TEAL}` }}>
            {html ? (
              <div ref={previewRef} dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <div
                className="flex items-center justify-center text-center text-sm px-6"
                style={{ height: 175, color: MUTED }}
              >
                Fill in all four fields and your card appears here.
              </div>
            )}
          </div>

          {showCode && html && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold" style={{ color: INK }}>
                  HTML — for Outlook&apos;s signature editor
                </span>
                <button
                  type="button"
                  onClick={copyCode}
                  className="text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer"
                  style={{ background: "#fff", color: TEAL, border: `1.5px solid ${TEAL}` }}
                >
                  {copied === "code" ? "Copied" : "Copy code"}
                </button>
              </div>
              <pre
                className="text-[10px] leading-relaxed p-3 rounded-xl overflow-x-auto"
                style={{ background: "#fff", border: `1.5px solid ${TEAL}`, color: INK, maxHeight: 220 }}
              >
                {html}
              </pre>
            </div>
          )}

          <ol className="mt-5 text-sm space-y-2" style={{ color: INK }}>
            <li>
              <strong>1.</strong> Fill in your details, then hit <strong>Copy signature</strong>.
            </li>
            <li>
              <strong>2.</strong> Gmail: Settings → See all settings → Signature → paste.
            </li>
            <li>
              <strong>3.</strong> Outlook: Settings → Mail → Compose and reply → paste.
            </li>
            <li>
              <strong>4.</strong> Send yourself a test mail and check the images load.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
