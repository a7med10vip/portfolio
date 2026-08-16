"use client";

/* The signature builder: fill in four fields, watch the card render, copy it
   straight into Gmail or Outlook. */

import { useEffect, useMemo, useRef, useState } from "react";

import { FIELD_MAX, SIGNATURE_ORIGIN, type Person } from "@/lib/signature/card";
import { buildSignatureHtml } from "@/lib/signature/html";

const INK = "#04323A";
const TEAL = "#004D5A";
const MINT = "#CFF7EE";
const MUTED = "#71717A";
const WASH = "#FAFAFA";

const FIELDS: Array<{
  key: keyof Person;
  label: string;
  placeholder: string;
  type: string;
  hint?: string;
}> = [
  // Placeholders stay generic: they show the shape of each field without
  // putting a real colleague's name or number in front of everyone.
  { key: "name", label: "Full name", placeholder: "Your full name", type: "text", hint: "Shown in capitals, the way the artwork sets it" },
  { key: "title", label: "Job title", placeholder: "Your job title", type: "text" },
  { key: "phone", label: "Phone", placeholder: "+20 10 12345678", type: "tel" },
  { key: "email", label: "Email", placeholder: "you@emotiongrp.com", type: "email" },
];

const EMPTY: Person = { name: "", title: "", phone: "", email: "" };

export default function SignatureTool() {
  const [person, setPerson] = useState<Person>(EMPTY);
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState<"html" | "code" | null>(null);
  const [showCode, setShowCode] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // In production the card must point at the canonical host, so a signature
  // pasted from a preview deployment doesn't break when that preview expires.
  useEffect(() => {
    setOrigin(process.env.NODE_ENV === "production" ? SIGNATURE_ORIGIN : window.location.origin);
  }, []);

  const complete = useMemo(
    () => Object.values(person).every((value) => value.trim().length > 0),
    [person]
  );

  /* Every keystroke would otherwise address a new image. Settling first keeps
     the preview from rendering a card per character. */
  const [settled, setSettled] = useState<Person | null>(null);
  useEffect(() => {
    if (!complete) {
      setSettled(null);
      return;
    }
    const trimmed = {
      name: person.name.trim(),
      title: person.title.trim(),
      phone: person.phone.trim(),
      email: person.email.trim(),
    };
    const timer = setTimeout(() => setSettled(trimmed), 450);
    return () => clearTimeout(timer);
  }, [person, complete]);

  const html = useMemo(
    () => (settled && origin ? buildSignatureHtml(settled, origin) : ""),
    [settled, origin]
  );

  // Poppins — the artwork's typeface — carries Latin only, so Arabic would come
  // out as empty boxes. Say so here rather than letting the render fail.
  const nonLatin = useMemo(
    () => Object.values(person).some((value) => /[^\u0020-\u024F\u2000-\u206F]/.test(value)),
    [person]
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
      setCopied(null);
      return;
    }
    setTimeout(() => setCopied(null), 2400);
  }

  async function copyCode() {
    if (!html) return;
    await navigator.clipboard.writeText(html);
    setCopied("code");
    setTimeout(() => setCopied(null), 2400);
  }

  const field = (key: keyof Person) => person[key];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* ---- form ---- */}
      <div className="lg:col-span-2">
        <div className="rounded-[20px] p-6 md:p-7" style={{ background: WASH, border: `2px solid ${TEAL}` }}>
          <h2 className="heading text-xl mb-1.5" style={{ color: INK, lineHeight: 1.35 }}>
            Your details
          </h2>
          <p className="text-sm mb-6" style={{ color: MUTED }}>
            The card builds itself as you type.
          </p>

          <div className="flex flex-col gap-4">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-bold mb-2" style={{ color: INK }}>
                  {f.label}
                </label>
                <input
                  type={f.type}
                  value={field(f.key)}
                  maxLength={FIELD_MAX}
                  placeholder={f.placeholder}
                  onChange={(e) => setPerson({ ...person, [f.key]: e.target.value })}
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
              The artwork&apos;s typeface only carries Latin letters — Arabic and other
              scripts won&apos;t render on the card.
            </p>
          )}

          <button
            type="button"
            onClick={copySignature}
            disabled={!html || nonLatin}
            className="mt-6 inline-flex items-center justify-center gap-2 h-12 w-full rounded-full text-base font-bold cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: copied === "html" ? MINT : TEAL, color: copied === "html" ? INK : "#fff", border: `2px solid ${TEAL}` }}
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

      {/* ---- preview ---- */}
      <div className="lg:col-span-3">
        <div className="rounded-[20px] p-6 md:p-7 h-full" style={{ background: MINT, border: `2px solid ${TEAL}` }}>
          <h2 className="heading text-xl mb-1.5" style={{ color: INK, lineHeight: 1.35 }}>
            Preview
          </h2>
          <p className="text-sm mb-5" style={{ color: MUTED }}>
            Exactly what lands at the bottom of your email.
          </p>

          <div
            className="rounded-2xl p-4 overflow-x-auto"
            style={{ background: "#fff", border: `1.5px solid ${TEAL}` }}
          >
            {html ? (
              <div ref={previewRef} dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <div
                className="flex items-center justify-center text-center text-sm px-6"
                style={{ height: 200, color: MUTED }}
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
