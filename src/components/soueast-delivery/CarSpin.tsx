"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SPIN_CARS, SPIN_ORIGIN, type SpinCar } from "@/app/soueast-delivery/data";
import { G, D, LINE } from "./theme";

/* Constants carried over from the production viewer, where they were measured
   rather than picked. */
/** Drag distance, in fractions of the stage width, that completes one turn. */
const DRAG_TURNS = 1.15;
/**
 * Idle rotation, in frames of the sequence per second.
 *
 * The showroom viewer runs this at 30, where the car is the whole screen and
 * somebody is being shown it. On a page being read, a turntable at 30 pulls the
 * eye off the paragraph beside it, so this one turns at a little over a third
 * of that: one revolution in about six seconds.
 */
const IDLE_FPS = 12;
/** How fast a flick decays, per frame at 60Hz. */
const FRICTION = 0.94;
const MIN_VELOCITY = 0.02;
/** The S06 turntable was cropped through its own baked shadow; dissolve the last rows. */
const CUT_SHADOW_FADE = 0.055;

/**
 * One box for every car, sized to hold the tallest of them once each is scaled
 * to its real height. Fixed rather than following the frame, so switching model
 * rescales the car without the section shuffling underneath it.
 */
const STAGE_ASPECT = 2.5616;

/**
 * How wide each car is drawn, as a percentage of that stage, and the vertical
 * nudge that puts every car's wheels on the same line.
 *
 * Not one number for all of them: each set is cropped tight to its own car, so
 * drawing every frame at the same width made a 4,616mm S06 and a 4,810mm S08
 * come out the same length. These are the values the production hero ships.
 */
const GEOMETRY: Record<string, { width: number; bottom: number; thumb: string }> = {
  s06: { width: 89.6, bottom: 0.1, thumb: "/soueast-delivery/models/car-s06.webp" },
  s07: { width: 81.3, bottom: 2.8, thumb: "/soueast-delivery/models/car-s07.webp" },
  s08dm: { width: 84.5, bottom: -3.2, thumb: "/soueast-delivery/models/car-s08.webp" },
  s09: { width: 88.0, bottom: 0.0, thumb: "/soueast-delivery/models/car-s09.webp" },
};

/** Every car fits inside the stage at 1.0; above it the tallest crop stands proud. */
const CAR_SCALE = 1.0;

/**
 * Bytes this page is willing to pull from the dealership's CDN in one visit.
 *
 * The small tier is 720px wide and about 25 KB a frame; the large one is 2,400px
 * and about 190 KB. A whole colour is therefore either 1.8 MB or 13.6 MB, which
 * is why the large tier is fetched only when the stage is actually big enough to
 * show the difference, and only after the small one has the car turning.
 */
const BUDGET = 34_000_000;
let spent = 0;

/** Native width of each tier, so the canvas is never asked to upscale. */
const TIER_WIDTH = { sm: 720, lg: 2400 } as const;

/**
 * Frames already fetched this visit, keyed by car and colour.
 *
 * Without this, going back to a colour re-downloads seventy-two stills that are
 * in the browser cache anyway, and the car disappears while it happens.
 */
const CACHE = new Map<string, (HTMLImageElement | null)[]>();
const ckey = (car: string, colour: string, tier: "sm" | "lg" = "sm") =>
  tier === "sm" ? `${car}/${colour}` : `${car}/${colour}/lg`;

/** Frame one of every colour, fetched once the current set is complete. */
const primed = new Set<string>();

const localSrc = (car: string, colour: string, i: number) =>
  `/soueast-delivery/spin/${car}-${colour}/${String(i).padStart(2, "0")}.webp`;
const cdnSrc = (car: string, colour: string, tier: "sm" | "lg", i: number) =>
  `${SPIN_ORIGIN}/${car}/${colour}/${tier}/${String(i).padStart(4, "0")}.webp`;

/** Is this screen big enough that the small tier would show as soft? */
function wantsLargeTier(cssWidth: number) {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && /^(slow-2g|2g|3g)$/.test(conn.effectiveType)) return false;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  return cssWidth * dpr > TIER_WIDTH.sm * 1.25;
}

export default function CarSpin() {
  const [carId, setCarId] = useState("s09");
  const car = useMemo(() => SPIN_CARS.find((c) => c.id === carId)!, [carId]);
  const [colour, setColour] = useState(car.colors[0].id);
  const [pct, setPct] = useState(0);
  const [budgetHit, setBudgetHit] = useState(false);
  const [sharpening, setSharpening] = useState(false);
  const [dragging, setDragging] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  /**
   * The frames live in a ref, not in state.
   *
   * They were state once, and the paint loop set a frame counter sixty times a
   * second alongside it. That is sixty React renders a second over a subtree
   * with seventy-two images in it, which is what made the turntable stutter and
   * then hang. Nothing the animation touches goes through React now: the loop
   * reads refs and draws, and React only hears about the loading percentage.
   */
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  /** The same frames at 2,400px, where they have arrived. */
  const sharpRef = useRef<(HTMLImageElement | null)[]>([]);
  /** Set whenever something the loop draws has changed underneath it. */
  const dirty = useRef(true);
  const carRef = useRef(car);
  const pos = useRef(0);
  const velocity = useRef(0);
  const idle = useRef(true);
  const inView = useRef(false);
  const readyRef = useRef(0);

  carRef.current = car;

  /* Switching model resets the paint to that model's first, which is the one on
     the floor in Jeddah. */
  useEffect(() => setColour(car.colors[0].id), [car]);

  /* ── loading ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    let cancelled = false;
    const k = ckey(car.id, colour);
    const lgKey = ckey(car.id, colour, "lg");
    const isLocal = car.local === colour;
    const src = (c: SpinCar, col: string, tier: "sm" | "lg", i: number) =>
      tier === "sm" && c.local === col ? localSrc(c.id, col, i) : cdnSrc(c.id, col, tier, i);

    const small = CACHE.get(k) ?? new Array(car.frames + 1).fill(null);
    CACHE.set(k, small);
    const large = CACHE.get(lgKey) ?? new Array(car.frames + 1).fill(null);
    CACHE.set(lgKey, large);

    /* Point the loop at the new set without clearing it first: a colour already
       fetched appears instantly, and one that is not keeps the previous car on
       screen until its own first frame lands. The large tier wins where it
       exists, which is what makes the upgrade a swap rather than a reload. */
    if (large.some(Boolean)) sharpRef.current = large;
    else sharpRef.current = [];
    if (small.some(Boolean)) framesRef.current = small;
    readyRef.current = small.filter(Boolean).length;
    setPct(Math.round((readyRef.current / car.frames) * 100));

    if (!isLocal && spent > BUDGET) {
      setBudgetHit(true);
      return;
    }
    setBudgetHit(false);

    let sinceReport = 0;
    const load = (tier: "sm" | "lg", i: number) => {
      const target = CACHE.get(tier === "sm" ? k : lgKey)!;
      if (target[i]) return Promise.resolve();
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src(car, colour, tier, i);
        /* decode() keeps the first paint of each frame off the main thread, so
           stepping through the spin never stutters on first pass. */
        img.decode().then(
          () => {
            target[i] = img;
            if (!(tier === "sm" && isLocal)) spent += tier === "sm" ? 25_000 : 190_000;
            if (!cancelled) {
              if (tier === "sm") {
                framesRef.current = target;
                readyRef.current = target.filter(Boolean).length;
                if (++sinceReport >= 8 || readyRef.current >= car.frames) {
                  sinceReport = 0;
                  setPct(Math.round((readyRef.current / car.frames) * 100));
                }
              } else {
                sharpRef.current = target;
              }
              dirty.current = true;
            }
            resolve();
          },
          () => resolve(),
        );
      });
    };

    /** Fetch one colour of one car at the small tier, for the swatch previews. */
    const prime = (c: SpinCar, col: string) => {
      const pk = ckey(c.id, col);
      if (!CACHE.has(pk)) CACHE.set(pk, new Array(c.frames + 1).fill(null));
      const target = CACHE.get(pk)!;
      if (target[1]) return Promise.resolve();
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = c.local === col ? localSrc(c.id, col, 1) : cdnSrc(c.id, col, "sm", 1);
        img.decode().then(() => { target[1] = img; resolve(); }, () => resolve());
      });
    };

    (async () => {
      /* Frame one alone, ahead of the rest. */
      await load("sm", 1);
      /* Then every sixth: twelve steps already read as rotation. */
      const coarse: number[] = [];
      for (let i = 7; i <= car.frames; i += 6) coarse.push(i);
      await Promise.all(coarse.map((i) => load("sm", i)));
      if (cancelled) return;
      /* Then the rest, four at a time. */
      const rest: number[] = [];
      for (let i = 2; i <= car.frames; i++) if (!small[i]) rest.push(i);
      for (let i = 0; i < rest.length; i += 4) {
        if (cancelled) return;
        await Promise.all(rest.slice(i, i + 4).map((n) => load("sm", n)));
      }
      setPct(100);

      /* The car is now turning. Everything after this is quality and can take
         as long as it likes. */
      if (!cancelled && wantsLargeTier(stageRef.current?.clientWidth ?? 0) && spent < BUDGET) {
        setSharpening(true);
        /* Two at a time: these are 190 KB each and the point is that the
           turntable keeps running smoothly while they arrive. */
        const order: number[] = [];
        for (let i = 1; i <= car.frames; i += 6) order.push(i);
        for (let i = 1; i <= car.frames; i++) if (!order.includes(i)) order.push(i);
        for (let i = 0; i < order.length; i += 2) {
          if (cancelled) return;
          await Promise.all(order.slice(i, i + 2).map((n) => load("lg", n)));
        }
        if (!cancelled) setSharpening(false);
      }

      /* And finally one still of every other colour, so a swatch never opens
         on nothing. */
      for (const c of SPIN_CARS) {
        for (const col of c.colors) {
          if (cancelled) return;
          if (primed.has(ckey(c.id, col.id))) continue;
          primed.add(ckey(c.id, col.id));
          await prime(c, col.id);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [car, colour]);

  /* ── painting ──────────────────────────────────────────────────────────── */
  const lastDrawn = useRef(-1);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const c = carRef.current;
    if (!canvas) return;

    const n = c.frames;
    const idx = ((Math.round(pos.current) % n) + n) % n;
    /* Twelve frames a second change; sixty redraws a second is fifty-eight of
       them repainting a picture that has not moved. Scaling a 2,400px still
       into the canvas that often is what made this hang. */
    if (idx === lastDrawn.current && !dirty.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* This turntable was shot the other way round, so playing the frames in file
       order sends the car left when the hand goes right. */
    const fileIdx = c.reverse ? n - idx : idx + 1;
    let img = sharpRef.current[fileIdx] ?? framesRef.current[fileIdx] ?? null;
    if (!img) {
      /* Fall back to the nearest frame that has arrived, so a partly loaded set
         still turns rather than blinking to nothing. */
      const near = (a: number) =>
        sharpRef.current[a] ?? framesRef.current[a] ?? null;
      for (let d = 1; d <= n && !img; d++) {
        img = near(((fileIdx - 1 + d) % n) + 1) ?? near(((fileIdx - 1 - d + n * 2) % n) + 1);
      }
    }
    if (!img) return;

    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (!cssW || !cssH) return;
    /* Never ask the canvas to hold more pixels than the frame actually has:
       upscaling a 720px still into a 2,800px backing store costs the memory and
       buys nothing but a softer picture. */
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(Math.min(cssW * dpr, img.naturalWidth));
    const h = Math.round((w / img.naturalWidth) * img.naturalHeight);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, w, h);
    /* The canvas is already the car's own box at that car's own aspect, so the
       frame fills it exactly. */
    ctx.drawImage(img, 0, 0, w, h);

    if (c.cropShadow) {
      /* The bottom row of every frame in this set still carries the baked
         shadow, cropped through rather than cleared, so it ends in a hard grey
         band across the full width. Dissolve the last few percent. */
      const band = h * CUT_SHADOW_FADE;
      const y = h - band;
      const grad = ctx.createLinearGradient(0, y, 0, h);
      grad.addColorStop(0, "rgba(255,255,255,0)");
      grad.addColorStop(1, "rgba(255,255,255,1)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, y, w, band + 1);
    }

    lastDrawn.current = idx;
    dirty.current = false;
  }, []);

  /* ── the loop ──────────────────────────────────────────────────────────── */
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      if (Math.abs(velocity.current) > MIN_VELOCITY) {
        pos.current += velocity.current;
        velocity.current *= Math.pow(FRICTION, dt * 60);
      } else if (idle.current && inView.current && !calm && readyRef.current > 6) {
        pos.current += IDLE_FPS * dt;
      }
      paint();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paint]);

  /* Only turn while somebody can see it. */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    const ro = new ResizeObserver(() => (dirty.current = true));
    ro.observe(el);
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  /* ── the hand ──────────────────────────────────────────────────────────── */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let id: number | null = null;
    let lastX = 0;
    let lastT = 0;
    let resume = 0;

    const down = (e: PointerEvent) => {
      id = e.pointerId;
      el.setPointerCapture(id);
      lastX = e.clientX;
      lastT = performance.now();
      velocity.current = 0;
      idle.current = false;
      window.clearTimeout(resume);
      setDragging(true);
    };
    const move = (e: PointerEvent) => {
      if (id !== e.pointerId) return;
      const dx = e.clientX - lastX;
      const t = performance.now();
      const step = (dx / (el.clientWidth * DRAG_TURNS)) * carRef.current.frames;
      pos.current += step;
      if (t > lastT) velocity.current = step / Math.max((t - lastT) / 16.7, 0.5);
      lastX = e.clientX;
      lastT = t;
    };
    const up = () => {
      id = null;
      setDragging(false);
      /* Idle rotation resumes only after the flick has died, so it never fights
         the hand that just let go. */
      resume = window.setTimeout(() => (idle.current = true), 1600);
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      window.clearTimeout(resume);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, []);

  const isLocal = car.local === colour;
  const geo = GEOMETRY[car.id] ?? { width: 88, bottom: 0, thumb: "" };

  return (
    <div className="w-full">
      {/* The stage is fixed. The car inside it is not. */}
      <div
        ref={stageRef}
        className="relative w-full select-none mx-auto"
        style={{
          aspectRatio: String(STAGE_ASPECT),
          cursor: dragging ? "grabbing" : "grab",
          touchAction: "pan-y",
          maxHeight: "56vh",
        }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: `${geo.width * CAR_SCALE}%`,
            bottom: `${geo.bottom}%`,
            aspectRatio: String(car.aspect),
          }}
        >
          <canvas ref={canvasRef} className="w-full h-full block" style={{ touchAction: "pan-y" }} />
        </div>

        {pct === 0 && !budgetHit && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-3">
              <ThreeBars />
              <span className="text-[11px] font-bold" style={{ color: D }}>
                LOADING THE TURNTABLE
              </span>
            </div>
          </div>
        )}

        {budgetHit && (
          <div className="absolute inset-0 grid place-items-center">
            <button
              onClick={() => {
                spent = 0;
                setBudgetHit(false);
                setColour((c) => c);
              }}
              className="heading text-[13px] px-5 py-3 rounded-full"
              style={{ border: `1px solid ${G}`, color: G, background: "#fff" }}
            >
              6 MB pulled this visit, tap to keep going
            </button>
          </div>
        )}
      </div>

      {/* progress */}
      <div className="h-[3px] w-full rounded-full overflow-hidden mt-2" style={{ background: `${G}1A` }}>
        <div className="h-full transition-all duration-300" style={{ width: `${pct}%`, background: G }} />
      </div>

      {/* the lineup, as cards rather than names */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-14 max-w-3xl mx-auto">
        {SPIN_CARS.map((c) => {
          const on = c.id === carId;
          return (
            <button
              key={c.id}
              onClick={() => setCarId(c.id)}
              className="group rounded-[16px] px-3 pt-3 pb-3.5 transition-all"
              style={{
                border: `1.5px solid ${on ? G : LINE}`,
                background: "#fff",
              }}
            >
              <span className="block relative w-full" style={{ aspectRatio: "2.6" }}>
                <img
                  src={GEOMETRY[c.id]?.thumb}
                  alt={`Soueast ${c.name}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-[1.04]"
                  style={{ objectFit: "contain" }}
                />
              </span>
              <span className="heading block text-[14px] mt-2" style={{ color: on ? G : D }}>
                {c.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* paint */}
      <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
        {car.colors.map((c) => (
          <button
            key={c.id}
            onClick={() => setColour(c.id)}
            title={c.name}
            aria-label={c.name}
            className="rounded-full transition-all"
            style={{
              width: c.id === colour ? 30 : 24,
              height: c.id === colour ? 30 : 24,
              background: c.swatch,
              border: c.id === colour ? `2px solid ${G}` : "1px solid rgba(10,10,10,.14)",
              outline: c.id === colour ? `2px solid #fff` : "none",
              outlineOffset: -4,
            }}
          />
        ))}
      </div>

      <p className="text-center text-[12px] mt-5" style={{ color: D }}>
        <span className="heading">{car.colors.find((c) => c.id === colour)?.name}</span>
        {" · "}
        {isLocal ? <>72 frames held in this page</> : <>72 frames from the dealership&apos;s own storage</>}
        {pct < 100 && ` · ${pct}%`}
        {pct === 100 && sharpening && (
          <span style={{ color: G }}>{" · loading the 2,400px set"}</span>
        )}
        {" · drag it"}
      </p>
    </div>
  );
}

/** The Soueast mark, as a loading meter. */
function ThreeBars() {
  return (
    <svg width="34" height="42" viewBox="0 0 100 125" aria-hidden>
      {[0, 49, 98].map((y, i) => (
        <rect key={y} y={y} width="100" height="27" fill={G}>
          <animate attributeName="opacity" values="0.15;1;0.15" dur="1.4s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
        </rect>
      ))}
    </svg>
  );
}
