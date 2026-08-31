"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import AngularTechMark from "./AngularTechMark";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
CustomEase.create("smooth", "0.76, 0, 0.24, 1");

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%<>/\\[]{}~^*";

// Solid ring resting radius
const R_SOLID_REST = 95;
// Dashed ring resting radius (bigger)
const R_DASHED_REST = 118;
// On hover: solid expands, dashed shrinks; they swap
const R_SOLID_HOVER = 118;
const R_DASHED_HOVER = 95;

function HackText({ lines, delay = 0, style = {}, align = "left" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    lines.forEach((line, li) => {
      const lineEl = el.children[li];
      if (!lineEl) return;
      lineEl.innerHTML = "";
      [...line].forEach((ch) => {
        const span = document.createElement("span");
        span.style.cssText = "display:inline;color:#111;opacity:0;";
        span.dataset.final = ch;
        span.textContent =
          ch === " "
            ? "\u00A0"
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        lineEl.appendChild(span);
      });
    });

    const allSpans = Array.from(el.querySelectorAll("span"));
    allSpans.forEach((span, i) => {
      const resolveAt = delay + i * 28 + Math.random() * 18;
      const maxFlickers = 4 + Math.floor(Math.random() * 5);
      let flickers = 0;

      const flicker = () => {
        if (flickers === 0) {
          span.style.opacity = "1";
          span.style.color = "#777";
        }
        if (flickers < maxFlickers) {
          span.textContent =
            span.dataset.final === " "
              ? "\u00A0"
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          flickers++;
          setTimeout(flicker, 28 + Math.random() * 32);
        } else {
          span.textContent =
            span.dataset.final === " " ? "\u00A0" : span.dataset.final;
          span.style.color = "#111";
        }
      };

      setTimeout(flicker, resolveAt);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: '"Helvetica", sans-serif',
        fontSize: "9px",
        fontWeight: 600,
        letterSpacing: "-0.04rem",
        lineHeight: 1.9,
        textAlign: align,
        ...style,
      }}
    >
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const circleTrackRef = useRef(null);
  const circleProgressRef = useRef(null);
  const circleDashedRef = useRef(null);
  const logoRef = useRef(null);
  const nameRef = useRef(null);
  const percentRef = useRef(null);
  const readyRef = useRef(null);
  const enterRef = useRef(null);
  const authRef = useRef(null);
  const innerWindowRef = useRef(null);
  const frameMetaRef = useRef(null);

  const [phase, setPhase] = useState("spin");
  const [showFrameMeta, setShowFrameMeta] = useState(false);
  // ENTER text is only clickable once it has finished fading in. Stays false
  // through the percent-counter / logo phase so the user can't click during
  // the loading ring.
  const [enterReady, setEnterReady] = useState(false);

  // Initial spin + load phase
  useEffect(() => {
    const tl = gsap.timeline();

    gsap.set(circleTrackRef.current, {
      opacity: 0,
      strokeDasharray: 1,
      strokeDashoffset: 1,
    });
    gsap.set(circleProgressRef.current, {
      opacity: 0,
      strokeDasharray: 1,
      strokeDashoffset: 1,
    });
    gsap.set(circleDashedRef.current, { opacity: 0 });

    tl.to(circleTrackRef.current, {
      opacity: 1,
      strokeDashoffset: 0,
      duration: 0.9,
      ease: "power2.inOut",
      delay: 0.3,
      onComplete: () => setPhase("loading"),
    });

    tl.to(circleProgressRef.current, { opacity: 1, duration: 0.25, ease: "smooth" });

    tl.fromTo(
      nameRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "smooth" },
      "-=0.2"
    );

    // Track the progress SVG container so we can rotate it. The fill's
    // starting point sits at the top of the un-rotated ring (12 o'clock after
    // the static -90deg SVG rotation). Rotating the whole group moves that
    // start point around the circle.
    const progressGroup = circleProgressRef.current?.parentNode;

    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      // Mild acceleration: starts moving right away, speeds up toward the end.
      // power2.in is gentler than power3.in so the fill is visibly progressing
      // within the first ~0.2s instead of crawling.
      duration: 2.2,
      ease: "power2.in",
      onUpdate: () => {
        const v = Math.round(counter.val);
        if (percentRef.current) percentRef.current.textContent = v;
        if (circleProgressRef.current) {
          // pathLength=1 normalizes the dash math: 1 = full ring, 0 = empty.
          circleProgressRef.current.style.strokeDashoffset = 1 - v / 100;
        }
        // Drift the fill's start point downward over time: rotates from 0deg
        // (start at top) to ~120deg (start lower-right) by completion. Linear
        // mapping so the start point is in motion from frame one, paired with
        // the accelerating fill, so the start point keeps pace with the drawing.
        if (progressGroup) {
          const drift = Math.min(counter.val / 100, 1);
          const driftAngle = drift * 120;
          progressGroup.style.transform = `rotate(${driftAngle}deg)`;
        }
      },
      onComplete: () => setPhase("enter"),
    });

    tl.fromTo(
      percentRef.current,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.3, ease: "smooth" },
      "-=2.2"
    );
  }, []);

  // Enter phase. Shrink solid ring, show ENTER + dashed ring
  useEffect(() => {
    if (phase !== "enter") return;
    const tl = gsap.timeline();

    tl.to(percentRef.current, { opacity: 0, y: -8, duration: 0.25, ease: "smooth" });

    tl.fromTo(
      readyRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.3, ease: "smooth" },
      "-=0.1"
    );

    // Solid ring shrinks to resting radius
    tl.to(
      [circleTrackRef.current, circleProgressRef.current],
      { attr: { r: R_SOLID_REST }, duration: 0.5, ease: "smooth" },
      "-=0.1"
    );

    tl.to(logoRef.current, { opacity: 0, scale: 0.8, duration: 0.3, ease: "smooth" });

    // ENTER text fades in
    tl.fromTo(
      enterRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.35, ease: "smooth", onComplete: () => setEnterReady(true) },
      "-=0.15"
    );

    // Dashed ring fades in slightly after ENTER
    tl.fromTo(
      circleDashedRef.current,
      { opacity: 0, attr: { r: R_DASHED_REST + 10 } },
      { opacity: 1, attr: { r: R_DASHED_REST }, duration: 0.5, ease: "smooth" },
      "-=0.2"
    );
  }, [phase]);

  const handleCircleHover = (enter) => {
    if (phase !== "enter" || !enterReady) return;
    const r = enter ? R_SOLID_HOVER : R_SOLID_REST;

    // Both solid rings use pathLength=1, so the dash math is decoupled from
    // the actual circumference; the ring stays perfectly closed at any radius.
    gsap.to(circleTrackRef.current, {
      attr: { r },
      duration: 0.4,
      ease: "smooth",
    });
    gsap.to(circleProgressRef.current, {
      attr: { r },
      duration: 0.4,
      ease: "smooth",
    });
    gsap.to(circleDashedRef.current, {
      attr: { r: enter ? R_DASHED_HOVER : R_DASHED_REST },
      duration: 0.4,
      ease: "smooth",
    });
  };

  const handleEnterClick = () => {
    if (phase !== "enter" || !enterReady) return;
    setPhase("authorized");
    setEnterReady(false);

    const tl = gsap.timeline();

    tl.to(enterRef.current, { opacity: 0, duration: 0.25, ease: "smooth" });
    tl.to(logoRef.current, { opacity: 0, duration: 0.2, ease: "smooth" }, "-=0.1");
    tl.to(
      [circleTrackRef.current, circleProgressRef.current, circleDashedRef.current],
      { opacity: 0, duration: 0.4, ease: "smooth" }
    );
    tl.fromTo(
      authRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "smooth" }
    );

    tl.to(
      innerWindowRef.current,
      {
        margin: "8vh 8vw",
        duration: 1.1,
        ease: "hop",
        onComplete: () => setShowFrameMeta(true),
      },
      "+=0.5"
    );

    tl.fromTo(
      frameMetaRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "smooth" },
      "-=0.3"
    );

    tl.to(
      [readyRef.current, nameRef.current, authRef.current],
      { opacity: 0, duration: 0.3 },
      "-=1.1"
    );

    tl.add(() => {
      // ASCII beach wave: same grow/shimmer/shrink glyphs as the card
      // ripple, sweeping from the bottom-left corner to the top-right.
      const container = innerWindowRef.current;
      if (!container) return;

      const WAVE_CHARS = "+*×·:.~^#%=<>/\\";
      const WAVE_FONT = '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace';
      const SWEEP_FRAMES = 60; // frames for the front to cross the screen
      const HOLD_FRAMES = 26; // how long each glyph lingers before receding

      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;z-index:10;pointer-events:none;";
      container.appendChild(canvas);
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // adaptive gap so glyph count stays bounded on any screen
      const gap = Math.max(9, Math.ceil(Math.sqrt((width * height) / 6000)));
      const maxDistance = Math.hypot(width, height) || 1;
      const glyphs = [];
      for (let x = 0; x <= width; x += gap) {
        for (let y = 0; y <= height; y += gap) {
          // distance from the bottom-left corner drives the wave front
          const dist = Math.hypot(x, height - y) / maxDistance;
          const maxSize = 9 + Math.random() * 5;
          glyphs.push({
            x,
            y,
            char: WAVE_CHARS[Math.floor(Math.random() * WAVE_CHARS.length)],
            size: 0,
            maxSize,
            minSize: maxSize * 0.5,
            growStep: 1.6 + Math.random() * 1,
            shimmerSpeed: 0.02 + Math.random() * 0.05,
            delay: dist * SWEEP_FRAMES + Math.random() * 14,
            hold: HOLD_FRAMES + Math.random() * 14,
            isReverse: false,
            isShimmer: false,
            alpha: 0.35 + Math.random() * 0.45,
          });
        }
      }

      let frameCount = 0;
      const step = () => {
        frameCount += 1;
        ctx.clearRect(0, 0, width, height);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#fff";

        let alive = false;
        const buckets = new Map();

        for (const g of glyphs) {
          const local = frameCount - g.delay;
          if (local < 0) {
            alive = true;
            continue;
          }
          if (local <= g.hold) {
            // wave front: grow, then shimmer while it holds
            if (g.size >= g.maxSize) g.isShimmer = true;
            if (g.isShimmer) {
              if (g.size >= g.maxSize) g.isReverse = true;
              else if (g.size <= g.minSize) g.isReverse = false;
              g.size += g.isReverse ? -g.shimmerSpeed * 10 : g.shimmerSpeed * 10;
            } else {
              g.size += g.growStep;
            }
            alive = true;
          } else if (g.size > 0) {
            // wave passed: recede
            g.size -= 1.2;
            alive = true;
          }

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
          ctx.font = `${size}px ${WAVE_FONT}`;
          for (const g of bucket) {
            ctx.globalAlpha = g.alpha * Math.min(1, g.size / g.maxSize);
            ctx.fillText(g.char, g.x, g.y);
          }
        });
        ctx.globalAlpha = 1;

        if (alive) {
          requestAnimationFrame(step);
        } else {
          canvas.remove();
        }
      };

      requestAnimationFrame(step);
    }, "+=0.5");

    tl.to(innerWindowRef.current, {
      margin: "0px",
      duration: 1.2,
      ease: "hop",
      delay: 1.8,
    });

    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.4,
        ease: "smooth",
        onComplete: () => {
          setPhase("done");
          if (onComplete) onComplete();
        },
      },
      "-=0.2"
    );
  };

  if (phase === "done") return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#f0ede6",
        pointerEvents: "all",
      }}
    >
      {/* Frame meta */}
      <div
        ref={frameMetaRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          pointerEvents: "none",
          zIndex: 4,
        }}
      >
        <div style={{ position: "absolute", top: "1.6vh", left: "1.5vw" }}>
          {showFrameMeta ? (
            <HackText lines={["GURSHAAN GILL", "PORTFOLIO"]} delay={0} />
          ) : (
            <div style={{ fontFamily: '"Helvetica", sans-serif', fontSize: "9px", fontWeight: 600, letterSpacing: "-0.04rem", lineHeight: 1.9, color: "transparent" }}>
              <div>GURSHAAN GILL</div><div>PORTFOLIO</div>
            </div>
          )}
        </div>

        <div style={{ position: "absolute", top: "1.6vh", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          {showFrameMeta ? (
            <HackText lines={["TORONTO GMT -5", "43.6532°N, 79.3832°W"]} delay={120} align="center" />
          ) : (
            <div style={{ fontFamily: '"Helvetica", sans-serif', fontSize: "9px", fontWeight: 600, letterSpacing: "-0.04rem", lineHeight: 1.9, color: "transparent" }}>
              <div>TORONTO GMT -5</div><div>43.6532°N, 79.3832°W</div>
            </div>
          )}
        </div>

        <div style={{ position: "absolute", top: "1.6vh", right: "1.5vw" }}>
          {showFrameMeta ? (
            <HackText lines={["TORONTO, ON", "OVERVIEW: 01 PROJECTS"]} delay={240} align="right" style={{ textAlign: "right" }} />
          ) : (
            <div style={{ fontFamily: '"Helvetica", sans-serif', fontSize: "9px", fontWeight: 600, letterSpacing: "-0.04rem", lineHeight: 1.9, color: "transparent", textAlign: "right" }}>
              <div>TORONTO, ON</div><div>OVERVIEW: 01 PROJECTS</div>
            </div>
          )}
        </div>

        <div style={{ position: "absolute", bottom: "1.6vh", left: "1.5vw" }}>
          {showFrameMeta ? (
            <HackText lines={["GURSHAAN GILL", "PORTFOLIO"]} delay={360} />
          ) : (
            <div style={{ fontFamily: '"Helvetica", sans-serif', fontSize: "9px", fontWeight: 600, letterSpacing: "-0.04rem", lineHeight: 1.9, color: "transparent" }}>
              <div>GURSHAAN GILL</div><div>PORTFOLIO</div>
            </div>
          )}
        </div>

        <div style={{ position: "absolute", bottom: "1.6vh", left: "20vw" }}>
          {showFrameMeta ? (
            <HackText lines={["OVERVIEW:", "01 PROJECTS"]} delay={440} />
          ) : (
            <div style={{ fontFamily: '"Helvetica", sans-serif', fontSize: "9px", fontWeight: 600, letterSpacing: "-0.04rem", lineHeight: 1.9, color: "transparent" }}>
              <div>OVERVIEW:</div><div>01 PROJECTS</div>
            </div>
          )}
        </div>

        <div style={{ position: "absolute", bottom: "1.6vh", left: "50%", right: "1.5vw", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          {showFrameMeta ? (
            <>
              <HackText lines={["60.0–250.0 HZ"]} delay={300} />
              <HackText lines={["BOOT COMPLETE / EXECUTE PROGRAM"]} delay={200} align="center" />
              <HackText lines={["EXIT LOADER → HOME"]} delay={100} align="right" style={{ textAlign: "right" }} />
            </>
          ) : (
            <>
              <div style={{ fontFamily: '"Helvetica", sans-serif', fontSize: "9px", fontWeight: 600, letterSpacing: "-0.04rem", color: "transparent" }}>60.0–250.0 HZ</div>
              <div style={{ fontFamily: '"Helvetica", sans-serif', fontSize: "9px", fontWeight: 600, letterSpacing: "-0.04rem", color: "transparent" }}>BOOT COMPLETE / EXECUTE PROGRAM</div>
              <div style={{ fontFamily: '"Helvetica", sans-serif', fontSize: "9px", fontWeight: 600, letterSpacing: "-0.04rem", color: "transparent" }}>EXIT LOADER → HOME</div>
            </>
          )}
        </div>

        {/* Right-side angular system mark */}
        <div
          style={{
            position: "absolute",
            top: "8vh",
            right: 0,
            bottom: "8vh",
            width: "8vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "42vh",
              height: "min(7.5vh, 6.5vw)",
              flex: "0 0 auto",
              transform: "rotate(90deg)",
              transformOrigin: "center",
            }}
          >
            <AngularTechMark color="#111" />
          </div>
        </div>
      </div>

      {/* Main black inner window */}
      <div
        ref={innerWindowRef}
        style={{ position: "absolute", inset: 0, margin: 0, background: "#0a0a0a", overflow: "hidden", zIndex: 3 }}
      >
        {/* READY */}
        <div ref={readyRef} style={{ position: "absolute", top: "2rem", left: "2rem", fontFamily: '"Helvetica", sans-serif', fontSize: "17px", fontWeight: 600, letterSpacing: "-0.04rem", color: "#fff", opacity: 0 }}>
          READY
        </div>

        {/* Percent */}
        <div ref={percentRef} style={{ position: "absolute", top: "2rem", left: "2rem", fontFamily: '"Helvetica", sans-serif', fontSize: "17px", fontWeight: 600, letterSpacing: "-0.04rem", color: "#fff", opacity: 0 }}>
          0
        </div>

        {/* Name */}
        <div ref={nameRef} style={{ position: "absolute", bottom: "2rem", left: "2rem", fontFamily: '"Helvetica", sans-serif', fontSize: "20px", fontWeight: 600, letterSpacing: "-0.04rem", color: "#fff", opacity: 0, lineHeight: 1.2 }}>
          <div>GURSHAAN GILL</div>
          <div>PORTFOLIO</div>
        </div>

        {/* AUTHORIZED ACCESS */}
        <div ref={authRef} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: '"Helvetica", sans-serif', fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", color: "#fff", opacity: 0, textAlign: "center", lineHeight: 1.6, zIndex: 5, pointerEvents: "none" }}>
          AUTHORIZED ACCESS
        </div>

        {/* Circle + click zone, restricted to 260×260 hit area */}
        <div
          style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {/* Hit area. Only the circle zone is clickable */}
          <div
            style={{
              position: "relative",
              width: 260,
              height: 260,
              cursor: phase === "enter" && enterReady ? "pointer" : "default",
              borderRadius: "50%",
            }}
            onClick={handleEnterClick}
            onMouseEnter={() => handleCircleHover(true)}
            onMouseLeave={() => handleCircleHover(false)}
          >
            <svg
              width="260"
              height="260"
              viewBox="0 0 260 260"
              style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
            >
              {/* Dashed outer ring */}
              <circle
                ref={circleDashedRef}
                cx="130"
                cy="130"
                r={R_DASHED_REST}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0"
              />

              {/* Solid track */}
              <circle
                ref={circleTrackRef}
                cx="130"
                cy="130"
                r={R_SOLID_REST}
                fill="none"
                stroke="#2a2a2a"
                strokeWidth="1.5"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                opacity="0"
              />

              {/* Solid progress, wrapped in a group so we can rotate the
                  fill's starting point around the circle during loading. */}
              <g
                style={{
                  transformOrigin: "130px 130px",
                  transition: "none",
                }}
              >
                <circle
                  ref={circleProgressRef}
                  cx="130"
                  cy="130"
                  r={R_SOLID_REST}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  strokeLinecap="round"
                  opacity="0"
                />
              </g>
            </svg>

            {/* Logo */}
            <div ref={logoRef} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src="/logo.png"
                alt="GG"
                style={{ width: "36px", height: "36px", objectFit: "contain", filter: "invert(1)" }}
              />
            </div>

            {/* ENTER */}
            <div ref={enterRef} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: '"Helvetica", sans-serif', fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", color: "#fff", opacity: 0 }}>
              ENTER
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}