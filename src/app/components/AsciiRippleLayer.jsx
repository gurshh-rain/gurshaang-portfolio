"use client";

import { useEffect, useRef } from "react";

// Which elements get the ripple. Add `data-ascii-ripple` to opt-in any element.
const TARGET_SELECTOR = ".project-card, .placeholder-item, .contact-row, [data-ascii-ripple]";
const CHARACTERS = "+*×·:.~^#%=<>/\\";
const GAP = 7; // px between characters (denser grid)
const RIPPLE_FRAMES = 24; // frames for the ripple front to sweep center -> edge
const FONT = '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace';

// appear -> grows to maxSize with distance-based delay, then shimmers;
// disappear -> shrinks back to 0.
function createGlyph(x, y, delay) {
  const maxSize = 5 + Math.random() * 2.5;
  return {
    x,
    y,
    char: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
    size: 0,
    maxSize,
    minSize: maxSize * 0.5,
    growStep: 1 + Math.random() * 0.7,
    shimmerSpeed: 0.02 + Math.random() * 0.05,
    delay,
    // per-glyph random offsets so neither the appear ripple nor the
    // release is a perfect circle
    inJitter: Math.random() * RIPPLE_FRAMES * 0.9,
    outJitter: Math.random() * RIPPLE_FRAMES * 0.9,
    counter: 0,
    isIdle: false,
    isReverse: false,
    isShimmer: false,
    alpha: 0.35 + Math.random() * 0.45,
  };
}

function glyphAppear(g) {
  g.isIdle = false;
  if (g.counter <= g.delay + g.inJitter) {
    g.counter += 1;
    return;
  }
  if (g.size >= g.maxSize) g.isShimmer = true;
  if (g.isShimmer) {
    // oscillate between min and max
    if (g.size >= g.maxSize) g.isReverse = true;
    else if (g.size <= g.minSize) g.isReverse = false;
    g.size += g.isReverse ? -g.shimmerSpeed * 10 : g.shimmerSpeed * 10;
  } else {
    g.size += g.growStep;
  }
}

function glyphDisappear(g) {
  // distance-based delay on the way out plus per-glyph jitter, so the
  // "unripple" releases from the center but with a ragged, organic edge
  if (g.counter <= g.delay + g.outJitter) {
    g.counter += 1;
    if (g.size > 0) {
      g.isIdle = false;
      // keep the shimmer "shake" alive while this glyph waits its turn
      if (g.isShimmer) {
        if (g.size >= g.maxSize) g.isReverse = true;
        else if (g.size <= g.minSize) g.isReverse = false;
        g.size += g.isReverse ? -g.shimmerSpeed * 10 : g.shimmerSpeed * 10;
      }
    }
    return;
  }
  g.isShimmer = false;
  if (g.size <= 0) {
    g.isIdle = true;
    return;
  }
  g.size -= 0.8;
}

export default function AsciiRippleLayer() {
  const active = useRef(new Map());
  const frame = useRef(0);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const buildGlyphs = (state) => {
      const glyphs = [];
      const cx = state.width / 2;
      const cy = state.height / 2;
      const maxDistance = Math.hypot(cx, cy) || 1;
      // adapt the gap on very large cards so glyph count stays bounded
      const estimate = (state.width / GAP) * (state.height / GAP);
      const gap = estimate > 3000 ? Math.ceil(Math.sqrt((state.width * state.height) / 3000)) : GAP;
      // include the edges so the ripple covers the full card
      for (let x = 0; x <= state.width; x += gap) {
        for (let y = 0; y <= state.height; y += gap) {
          // distance from center drives the ripple delay (like trybull),
          // normalized so the sweep always finishes in RIPPLE_FRAMES
          const delay = (Math.hypot(x - cx, y - cy) / maxDistance) * RIPPLE_FRAMES;
          glyphs.push(createGlyph(x, y, delay));
        }
      }
      state.glyphs = glyphs;
    };

    const sizeCanvas = (state) => {
      const rect = state.target.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      // ignore no-op resizes so the ResizeObserver can't feedback-loop
      if (width === state.width && height === state.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = width;
      state.height = height;
      state.canvas.width = Math.round(width * dpr);
      state.canvas.height = Math.round(height * dpr);
      state.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGlyphs(state);
    };

    const removeState = (target) => {
      const state = active.current.get(target);
      if (!state) return;
      state.resizeObserver.disconnect();
      state.canvas.remove();
      active.current.delete(target);
    };

    const step = (state) => {
      const { ctx, glyphs } = state;
      ctx.clearRect(0, 0, state.width, state.height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";

      let allIdle = true;

      // bucket glyphs by integer font size; setting ctx.font is the
      // most expensive canvas state change, so do it once per size
      const buckets = new Map();
      for (const g of glyphs) {
        if (state.phase === "appear") glyphAppear(g);
        else glyphDisappear(g);

        if (!g.isIdle) allIdle = false;
        if (g.size <= 0.1) continue;

        const size = Math.round(g.size);
        let bucket = buckets.get(size);
        if (!bucket) {
          bucket = [];
          buckets.set(size, bucket);
        }
        bucket.push(g);
      }

      buckets.forEach((bucket, size) => {
        ctx.font = `${size}px ${FONT}`;
        for (const g of bucket) {
          ctx.globalAlpha = g.alpha * Math.min(1, g.size / g.maxSize);
          ctx.fillText(g.char, g.x, g.y);
        }
      });
      ctx.globalAlpha = 1;

      return allIdle;
    };

    const tick = () => {
      const removals = [];

      active.current.forEach((state, target) => {
        if (!target.isConnected) {
          removals.push(target);
          return;
        }
        const allIdle = step(state);
        if (state.phase === "disappear" && allIdle) removals.push(target);
      });

      removals.forEach(removeState);

      if (active.current.size) {
        frame.current = requestAnimationFrame(tick);
      } else {
        frame.current = 0;
      }
    };

    const ensureLoop = () => {
      if (!frame.current) frame.current = requestAnimationFrame(tick);
    };

    const setPhase = (state, phase) => {
      if (state.phase === phase) return;
      state.phase = phase;
      // restart the distance-delay counters so both the ripple in
      // and the release out sweep from the center
      for (const g of state.glyphs) g.counter = 0;
    };

    const enter = (event) => {
      const target = event.target.closest?.(TARGET_SELECTOR);
      if (!target || target.contains(event.relatedTarget)) return;

      const existing = active.current.get(target);
      if (existing) {
        setPhase(existing, "appear");
        ensureLoop();
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.className = "ascii-ripple-canvas";
      canvas.setAttribute("aria-hidden", "true");
      // inline styles so the canvas can never affect layout,
      // even if the stylesheet hasn't applied yet
      canvas.style.position = "absolute";
      canvas.style.inset = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.zIndex = "0";
      canvas.style.pointerEvents = "none";
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      target.appendChild(canvas);

      const state = {
        target,
        canvas,
        ctx,
        glyphs: [],
        phase: "appear",
        width: 0,
        height: 0,
        resizeObserver: new ResizeObserver(() => sizeCanvas(state)),
      };

      state.resizeObserver.observe(target);
      sizeCanvas(state);
      active.current.set(target, state);
      ensureLoop();
    };

    const leave = (event) => {
      const target = event.target.closest?.(TARGET_SELECTOR);
      if (!target || target.contains(event.relatedTarget)) return;
      const state = active.current.get(target);
      if (state) setPhase(state, "disappear");
    };

    document.addEventListener("pointerover", enter);
    document.addEventListener("pointerout", leave);

    return () => {
      document.removeEventListener("pointerover", enter);
      document.removeEventListener("pointerout", leave);
      if (frame.current) cancelAnimationFrame(frame.current);
      active.current.forEach((state) => {
        state.resizeObserver.disconnect();
        state.canvas.remove();
      });
      active.current.clear();
    };
  }, []);

  return null;
}
