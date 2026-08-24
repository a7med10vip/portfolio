"use client";

import { useState } from "react";
import { D, LINE, MONO } from "./theme";

/**
 * A screenshot in browser chrome, or, where the screen is behind a staff
 * sign-in and nothing was captured, an honest gap rather than an invention.
 */
export default function Shot({
  name,
  caption,
  host,
  mobile = false,
  pending,
}: {
  name: string;
  caption?: string;
  host?: string;
  mobile?: boolean;
  pending?: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = `/soueast-delivery/shots/${pending ? "drop" : "live"}/${name}.${pending ? "png" : "webp"}`;

  if (mobile) {
    return (
      <figure className="m-0">
        <div
          className="overflow-hidden mx-auto"
          style={{ width: 232, borderRadius: 26, border: `7px solid ${D}`, background: D }}
        >
          {failed ? (
            <Gap label={pending ?? name} tall />
          ) : (
            <img src={src} alt={caption ?? name} loading="lazy" decoding="async" onError={() => setFailed(true)}
              style={{ display: "block", width: "100%" }} />
          )}
        </div>
        {caption && (
          <figcaption className="text-center text-[11px] mt-3" style={{ color: D }}>
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="m-0">
      <div
        className="overflow-hidden"
        style={{ borderRadius: 14, border: `1px solid ${LINE}`, background: "#fff" }}
      >
        <div className="flex items-center gap-1.5 px-3.5" style={{ height: 30, borderBottom: `1px solid #F4F4F4` }}>
          {["#E8E8E8", "#EFEFEF", "#F4F4F4"].map((c) => (
            <span key={c} style={{ width: 7, height: 7, borderRadius: 99, background: c }} />
          ))}
          {host && (
            <span className="ml-2.5 text-[9.5px] truncate" style={{ color: D, fontFamily: MONO }}>
              {host}
            </span>
          )}
        </div>
        {failed ? (
          <Gap label={pending ?? name} />
        ) : (
          <img src={src} alt={caption ?? name} loading="lazy" decoding="async" onError={() => setFailed(true)}
            style={{ display: "block", width: "100%" }} />
        )}
      </div>
      {caption && (
        <figcaption className="text-[11px] mt-3" style={{ color: D }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Gap({ label, tall }: { label: string; tall?: boolean }) {
  return (
    <div
      className="grid place-items-center px-6 text-center"
      style={{ aspectRatio: tall ? "0.46" : "1.6", background: "#fff" }}
    >
      <div>
        <p className="text-[10px] font-bold mb-1.5" style={{ color: D }}>
          BEHIND A STAFF SIGN-IN
        </p>
        <p className="text-[11px]" style={{ color: D, fontFamily: MONO }}>
          {label}
        </p>
      </div>
    </div>
  );
}
