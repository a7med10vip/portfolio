"use client";

import { G, D } from "./theme";

/**
 * The one button on this page.
 *
 * Every link that leaves the document uses it, filled or outlined. Two shapes,
 * no third: a page that invents a new button for each context stops looking
 * designed and starts looking assembled.
 */
export default function Btn({
  href,
  children,
  fill = false,
  small = false,
}: {
  href: string;
  children: React.ReactNode;
  fill?: boolean;
  small?: boolean;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-2 rounded-full transition-all duration-200"
      style={{
        padding: small ? "8px 14px" : "12px 20px",
        fontSize: small ? 12 : 13.5,
        background: fill ? G : "#fff",
        color: fill ? "#fff" : D,
        border: `1.5px solid ${fill ? G : G}`,
        lineHeight: 1,
      }}
    >
      <span>{children}</span>
      <span
        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
        style={{ color: fill ? "#fff" : G, fontSize: small ? 12 : 14 }}
        aria-hidden
      >
        ↗
      </span>
    </a>
  );
}
