import { useEffect, useRef, useState } from "react";

type PixelPortraitProps = {
  src: string;
  alt: string;
};

type Particle = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
};

const SPRING = 0.085;
const FRICTION = 0.78;
const REPEL_RADIUS = 92;
const REPEL_FORCE = 7.2;
const RETURN_FORCE = 0.018;
const IDLE_DRIFT = 0.22;

export function PixelPortrait({ src, alt }: PixelPortraitProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let started = false;
    let stop: (() => void) | undefined;

    const start = () => {
      if (started) return;
      started = true;
      stop = runPixelEngine(wrap, canvas, src, setReady);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(wrap);

    return () => {
      observer.disconnect();
      stop?.();
    };
  }, [reducedMotion, src]);

  return (
    <div className="card overflow-hidden rounded-2xl">
      <div
        ref={wrapRef}
        className="relative aspect-9/16 w-full bg-[#0a0a0a]"
      >
        <img
          src={src}
          alt={alt}
          width={576}
          height={1024}
          loading="lazy"
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            ready && !reducedMotion ? "opacity-0" : "opacity-100"
          }`}
        />
        {!reducedMotion ? (
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 h-full w-full touch-none ${
              ready ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          />
        ) : null}
      </div>
    </div>
  );
}

function runPixelEngine(
  wrap: HTMLDivElement,
  canvas: HTMLCanvasElement,
  src: string,
  setReady: (ready: boolean) => void,
) {

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return undefined;

    const pointer = { x: -9999, y: -9999, active: false };
    const particles: Particle[] = [];
    let raf = 0;
    let disposed = false;
    let gap = 5;

    const image = new Image();
    image.src = src;

    const sample = () => {
      if (disposed || !image.naturalWidth) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      if (width < 8 || height < 8) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const source = document.createElement("canvas");
      source.width = width;
      source.height = height;
      const sourceCtx = source.getContext("2d", { willReadFrequently: true });
      if (!sourceCtx) return;

      sourceCtx.drawImage(image, 0, 0, width, height);
      const { data } = sourceCtx.getImageData(0, 0, width, height);

      gap = width < 360 ? 6 : 5;
      particles.length = 0;

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const i = (y * width + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 40) continue;

          particles.push({
            ox: x,
            oy: y,
            x,
            y,
            vx: 0,
            vy: 0,
            color: `rgb(${r},${g},${b})`,
          });
        }
      }

      setReady(true);
    };

    const draw = () => {
      if (disposed) return;

      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, width, height);

      const radius = REPEL_RADIUS;
      const radiusSq = radius * radius;
      const size = Math.max(2, gap - 1);

      for (const p of particles) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distSq = dx * dx + dy * dy;

        if (pointer.active && distSq < radiusSq && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = ((radius - dist) / radius) * REPEL_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        } else {
          p.vx += (p.ox - p.x) * SPRING;
          p.vy += (p.oy - p.y) * SPRING;
          p.vy += Math.sin((p.ox + p.oy) * 0.04 + performance.now() * 0.0014) * IDLE_DRIFT * RETURN_FORCE * 40;
        }

        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, size, size);
      }

      raf = requestAnimationFrame(draw);
    };

    const toLocal = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onMove = (event: PointerEvent) => {
      pointer.active = true;
      toLocal(event);
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onDown = (event: PointerEvent) => {
      pointer.active = true;
      toLocal(event);
      const burst = 18;
      for (const p of particles) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < 140) {
          const force = ((140 - dist) / 140) * burst;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }
    };

    const onReady = () => {
      sample();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    image.addEventListener("load", onReady);
    if (image.complete) onReady();

    const observer = new ResizeObserver(() => {
      sample();
    });
    observer.observe(wrap);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointercancel", onLeave);

  return () => {
    disposed = true;
    cancelAnimationFrame(raf);
    observer.disconnect();
    image.removeEventListener("load", onReady);
    canvas.removeEventListener("pointermove", onMove);
    canvas.removeEventListener("pointerdown", onDown);
    canvas.removeEventListener("pointerleave", onLeave);
    canvas.removeEventListener("pointercancel", onLeave);
  };
}
