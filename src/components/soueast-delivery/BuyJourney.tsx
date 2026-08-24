"use client";

import { JOURNEY } from "@/app/soueast-delivery/data";
import { G, D, LINE, MONO, tc } from "./theme";

/**
 * The six steps, all of them readable at once.
 *
 * An earlier version pinned this and revealed one step at a time as the page
 * scrolled. It looked well and it hid five sixths of the argument at any moment,
 * which for a handover document is the wrong trade: somebody reading this needs
 * to be able to see the whole chain and point at the middle of it.
 */
export default function BuyJourney() {
  return (
    <div className="relative max-w-6xl mx-auto">
      {JOURNEY.map((s, i) => (
        <div key={s.n} className="sd-item relative grid gap-8 lg:grid-cols-[1fr_460px] items-center" style={{ paddingBottom: 34 }}>
          <div className={`flex gap-6 ${i % 2 ? "lg:order-2" : ""}`}>
            <span
              className="heading shrink-0 grid place-items-center rounded-full"
              style={{ width: 44, height: 44, background: G, color: "#fff", fontSize: 16 }}
            >
              {s.n}
            </span>
            <div className="min-w-0 pb-2">
              <h4 className="heading mb-3" style={{ fontSize: 26, color: D, lineHeight: 1.24 }}>
                {tc(s.title)}
              </h4>
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: D }}>
                {s.body}
              </p>
              <p className="text-[12.5px] leading-relaxed" style={{ color: D }}>
                {s.fn && (
                  <span
                    className="inline-block mr-2 px-2 py-1 rounded-md"
                    style={{ background: G, color: "#fff", fontFamily: MONO, fontSize: 11 }}
                  >
                    {s.fn}
                  </span>
                )}
                {s.mechanism}
              </p>
            </div>
          </div>

          <div className={i % 2 ? "lg:order-1" : ""}>
            <div className="rounded-[20px] overflow-hidden" style={{ border: `1px solid ${LINE}`, background: "#fff" }}>
              <Stage step={i} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** One drawing per step. Step four is the one the section exists for. */
function Stage({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 420 300" style={{ width: "100%", display: "block" }}>
      {step === 0 && (
        <g>
          <rect x="150" y="34" width="120" height="176" rx="16" fill="#fff" stroke={LINE} />
          <rect x="168" y="60" width="84" height="8" rx="4" fill={G} />
          <rect x="168" y="78" width="60" height="8" rx="4" fill={LINE} />
          <text x="210" y="140" textAnchor="middle" fontSize="10.5" fill={G} fontFamily={MONO}>
            utm_source=snapchat
          </text>
          <text x="210" y="160" textAnchor="middle" fontSize="10.5" fill={D} fontFamily={MONO}>
            /ar/models
          </text>
          <path d="M 210 176 L 210 208" stroke={G} strokeWidth="1.4" strokeDasharray="3 3" />
          <rect x="140" y="216" width="140" height="30" rx="9" fill={D} />
          <text x="210" y="236" textAnchor="middle" fontSize="10" fill="#fff" fontFamily={MONO}>
            visitor_attribution
          </text>
          <text x="210" y="272" textAnchor="middle" fontSize="11" fill={D}>
            before a single question is asked
          </text>
        </g>
      )}
      {step === 1 && (
        <g>
          <rect x="34" y="36" width="188" height="38" rx="13" fill="#fff" stroke={LINE} />
          <text x="54" y="60" fontSize="12" fill={D}>كام قسط الـ S09؟</text>
          <rect x="196" y="96" width="190" height="58" rx="13" fill={G} />
          <text x="291" y="120" textAnchor="middle" fontSize="13" fill="#fff" className="heading">
            1,739 SAR / month
          </text>
          <text x="291" y="140" textAnchor="middle" fontSize="10" fill="#fff">
            price sheet, row 6
          </text>
          <rect x="34" y="184" width="352" height="76" rx="15" fill="#fff" stroke={G} strokeDasharray="4 4" />
          <text x="210" y="214" textAnchor="middle" fontSize="12" fill={D}>
            the model supplies the sentence
          </text>
          <text x="210" y="238" textAnchor="middle" fontSize="12" fill={G} className="heading">
            the repository supplies the number
          </text>
        </g>
      )}
      {step === 2 && (
        <g>
          <rect x="92" y="26" width="236" height="212" rx="16" fill="#fff" stroke={LINE} />
          <rect x="92" y="26" width="236" height="104" rx="16" fill={`${G}12`} />
          <text x="210" y="86" textAnchor="middle" fontSize="14" fill={D} className="heading">
            Soueast S09
          </text>
          <text x="114" y="158" fontSize="11" fill={D} fontFamily={MONO}>
            LB37822Z1NW014392
          </text>
          <text x="114" y="178" fontSize="11" fill={D}>
            Mountain Green · 106,900 SAR
          </text>
          <rect x="114" y="192" width="192" height="30" rx="9" fill={G} />
          <text x="210" y="212" textAnchor="middle" fontSize="11" fill="#fff">
            Reserve this car
          </text>
          <text x="210" y="266" textAnchor="middle" fontSize="11" fill={D}>
            one VIN, not one model
          </text>
        </g>
      )}
      {step === 3 && (
        <g>
          <rect x="18" y="26" width="152" height="58" rx="13" fill="#fff" stroke={LINE} />
          <text x="94" y="52" textAnchor="middle" fontSize="12" fill={D} className="heading">The showroom</text>
          <text x="94" y="70" textAnchor="middle" fontSize="10" fill={D}>across the desk</text>
          <rect x="250" y="26" width="152" height="58" rx="13" fill="#fff" stroke={LINE} />
          <text x="326" y="52" textAnchor="middle" fontSize="12" fill={D} className="heading">The website</text>
          <text x="326" y="70" textAnchor="middle" fontSize="10" fill={D}>at midnight</text>
          <path d="M 94 84 C 94 134, 190 132, 210 152" fill="none" stroke={G} strokeWidth="1.8" />
          <path d="M 326 84 C 326 134, 230 132, 210 152" fill="none" stroke={G} strokeWidth="1.8" />
          <rect x="118" y="154" width="184" height="42" rx="21" fill={D} />
          <text x="210" y="181" textAnchor="middle" fontSize="13" fill="#fff" fontFamily={MONO}>
            reserve_unit()
          </text>
          <text x="210" y="228" textAnchor="middle" fontSize="11.5" fill={D}>
            one lock and the floor holds the same key
          </text>
          <text x="210" y="258" textAnchor="middle" fontSize="16" fill={G} className="heading">
            stock 6 → 5, in that second
          </text>
        </g>
      )}
      {step === 4 && (
        <g>
          <rect x="108" y="26" width="204" height="54" rx="15" fill="#fff" stroke={G} />
          <text x="210" y="56" textAnchor="middle" fontSize="19" fill={D} className="heading" fontFamily={MONO}>
            6d 22:14:07
          </text>
          <text x="210" y="74" textAnchor="middle" fontSize="10" fill={D}>
            the hold, counting down
          </text>
          {["Deposit", "Balance", "Purchase order", "Handover"].map((s, i) => (
            <g key={s}>
              <circle cx={66 + i * 96} cy={142} r="10" fill={i === 0 ? G : "#fff"} stroke={i === 0 ? G : LINE} strokeWidth="1.4" />
              <text x={66 + i * 96} y={172} textAnchor="middle" fontSize="10" fill={D}>
                {s}
              </text>
              {i < 3 && <line x1={76 + i * 96} y1={142} x2={152 + i * 96} y2={142} stroke={LINE} strokeWidth="1.4" />}
            </g>
          ))}
          <text x="210" y="222" textAnchor="middle" fontSize="11.5" fill={D}>
            nobody has to remember to release it
          </text>
          <text x="210" y="252" textAnchor="middle" fontSize="12" fill={G} fontFamily={MONO}>
            expire-store-holds · every 5 minutes
          </text>
        </g>
      )}
      {step === 5 && (
        <g>
          <rect x="140" y="24" width="140" height="36" rx="11" fill={D} />
          <text x="210" y="47" textAnchor="middle" fontSize="11" fill="#fff" fontFamily={MONO}>
            one row
          </text>
          {["Stock", "The customer", "The salesperson", "The digest"].map((s, i) => {
            const x = 26 + i * 96;
            return (
              <g key={s}>
                <path d={`M 210 62 C 210 116, ${x + 38} 116, ${x + 38} 162`} fill="none" stroke={G} strokeWidth="1.4" />
                <rect x={x} y={164} width={76} height={48} rx={11} fill="#fff" stroke={LINE} />
                <text x={x + 38} y={193} textAnchor="middle" fontSize="9.5" fill={D}>
                  {s}
                </text>
              </g>
            );
          })}
          <text x="210" y="252" textAnchor="middle" fontSize="13" fill={G} className="heading">
            nobody reconciles anything
          </text>
        </g>
      )}
    </svg>
  );
}
