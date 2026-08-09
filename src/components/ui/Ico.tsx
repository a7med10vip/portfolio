/* The star ornaments in /public/icons are flat black-on-transparent, so they
   are used as masks rather than <img> — one file paints white on the gradient
   band, ink on the mint one, mint on the dark one. */

export type IcoName = "star-1" | "star-2" | "star-3";

export const STARS: IcoName[] = ["star-1", "star-2", "star-3"];

export default function Ico({
  name,
  size = "1em",
  color = "currentColor",
  opacity = 1,
}: {
  name: IcoName;
  size?: string | number;
  color?: string;
  opacity?: number;
}) {
  return (
    <span
      aria-hidden
      className="inline-block shrink-0"
      style={{
        width: size,
        height: size,
        background: color,
        opacity,
        WebkitMaskImage: `url(/icons/${name}.png)`,
        maskImage: `url(/icons/${name}.png)`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
