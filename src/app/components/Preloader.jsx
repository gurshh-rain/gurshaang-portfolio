"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
CustomEase.create("smooth", "0.76, 0, 0.24, 1");

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%<>/\\[]{}~^*";

// Solid ring resting radius
const R_SOLID_REST = 95;
// Dashed ring resting radius (bigger)
const R_DASHED_REST = 118;
// On hover: solid expands, dashed shrinks — they swap
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
        fontSize: "9px",
        letterSpacing: "0.1em",
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
  const wipeRef = useRef(null);
  const wipeBarRef = useRef(null);
  const innerWindowRef = useRef(null);
  const frameMetaRef = useRef(null);

  const [phase, setPhase] = useState("spin");
  const [showFrameMeta, setShowFrameMeta] = useState(false);

  const CIRC_SOLID = 2 * Math.PI * R_SOLID_REST;
  const CIRC_DASHED = 2 * Math.PI * R_DASHED_REST;

  // Initial spin + load phase
  useEffect(() => {
    const tl = gsap.timeline();

    gsap.set(circleTrackRef.current, {
      opacity: 0,
      strokeDasharray: CIRC_SOLID,
      strokeDashoffset: CIRC_SOLID,
    });
    gsap.set(circleProgressRef.current, {
      opacity: 0,
      strokeDashoffset: CIRC_SOLID,
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

    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 2.2,
      ease: "power1.inOut",
      onUpdate: () => {
        const v = Math.round(counter.val);
        if (percentRef.current) percentRef.current.textContent = v;
        if (circleProgressRef.current) {
          circleProgressRef.current.style.strokeDashoffset =
            CIRC_SOLID - (v / 100) * CIRC_SOLID;
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

  // Enter phase — shrink solid ring, show ENTER + dashed ring
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
      { opacity: 1, scale: 1, duration: 0.35, ease: "smooth" },
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
    if (phase !== "enter") return;
    gsap.to([circleTrackRef.current, circleProgressRef.current], {
      attr: { r: enter ? R_SOLID_HOVER : R_SOLID_REST },
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
    if (phase !== "enter") return;
    setPhase("authorized");

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
      gsap.set(wipeBarRef.current, { opacity: 1 });
      gsap.set(wipeRef.current, { scaleX: 0, transformOrigin: "left center" });

      const container = innerWindowRef.current;
      const totalW = container.offsetWidth + 30;
      const wipeDur = 820;
      let startTs = null;

      const step = (ts) => {
        if (!startTs) startTs = ts;
        const t = Math.min((ts - startTs) / wipeDur, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const x = ease * totalW;

        const vel = Math.min(t * 2, 1) * (1 - Math.max(0, (t - 0.55) / 0.45));
        const barW = 14 + vel * 6;
        const shadowAlpha = 0.10 + vel * 0.08;

        if (wipeBarRef.current) {
          wipeBarRef.current.style.left = x - barW + "px";
          wipeBarRef.current.style.width = barW + "px";
          wipeBarRef.current.style.boxShadow = `-${barW * 1.4}px 0 ${barW * 2}px 1px rgba(255,255,255,${shadowAlpha})`;
        }

        if (wipeRef.current) {
          wipeRef.current.style.transform = `scaleX(${Math.min(ease, 1)})`;
        }

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          if (wipeBarRef.current) {
            wipeBarRef.current.style.transition = "opacity 0.15s ease";
            wipeBarRef.current.style.opacity = "0";
          }
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
            <div style={{ fontSize: "9px", lineHeight: 1.9, color: "transparent" }}>
              <div>GURSHAAN GILL</div><div>PORTFOLIO</div>
            </div>
          )}
        </div>

        <div style={{ position: "absolute", top: "1.6vh", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          {showFrameMeta ? (
            <HackText lines={["TORONTO GMT -5", "43.6532°N, 79.3832°W"]} delay={120} align="center" />
          ) : (
            <div style={{ fontSize: "9px", lineHeight: 1.9, color: "transparent" }}>
              <div>TORONTO GMT -5</div><div>43.6532°N, 79.3832°W</div>
            </div>
          )}
        </div>

        <div style={{ position: "absolute", top: "1.6vh", right: "1.5vw" }}>
          {showFrameMeta ? (
            <HackText lines={["TORONTO, ON", "OVERVIEW: 01 PROJECTS"]} delay={240} align="right" style={{ textAlign: "right" }} />
          ) : (
            <div style={{ fontSize: "9px", lineHeight: 1.9, color: "transparent", textAlign: "right" }}>
              <div>TORONTO, ON</div><div>OVERVIEW: 01 PROJECTS</div>
            </div>
          )}
        </div>

        <div style={{ position: "absolute", bottom: "1.6vh", left: "1.5vw" }}>
          {showFrameMeta ? (
            <HackText lines={["GURSHAAN GILL", "PORTFOLIO"]} delay={360} />
          ) : (
            <div style={{ fontSize: "9px", lineHeight: 1.9, color: "transparent" }}>
              <div>GURSHAAN GILL</div><div>PORTFOLIO</div>
            </div>
          )}
        </div>

        <div style={{ position: "absolute", bottom: "1.6vh", left: "20vw" }}>
          {showFrameMeta ? (
            <HackText lines={["OVERVIEW:", "01 PROJECTS"]} delay={440} />
          ) : (
            <div style={{ fontSize: "9px", lineHeight: 1.9, color: "transparent" }}>
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
              <div style={{ fontSize: "9px", color: "transparent" }}>60.0–250.0 HZ</div>
              <div style={{ fontSize: "9px", color: "transparent" }}>BOOT COMPLETE / EXECUTE PROGRAM</div>
              <div style={{ fontSize: "9px", color: "transparent" }}>EXIT LOADER → HOME</div>
            </>
          )}
        </div>
      </div>

      {/* Main black inner window */}
      <div
        ref={innerWindowRef}
        style={{ position: "absolute", inset: 0, margin: 0, background: "#0a0a0a", overflow: "hidden", zIndex: 3 }}
      >
        {/* Eraser */}
        <div
          ref={wipeRef}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "#0a0a0a", zIndex: 9, opacity: 1, transform: "scaleX(0)", transformOrigin: "left center" }}
        />

        {/* Velocity wipe bar */}
        <div
          ref={wipeBarRef}
          style={{ position: "absolute", top: 0, left: "-80px", width: "14px", height: "100%", background: "#ffffff", zIndex: 10, opacity: 0 }}
        />

        {/* READY */}
        <div ref={readyRef} style={{ position: "absolute", top: "2rem", left: "2rem", fontSize: "17px", letterSpacing: "0.1em", color: "#fff", opacity: 0 }}>
          READY
        </div>

        {/* Percent */}
        <div ref={percentRef} style={{ position: "absolute", top: "2rem", left: "2rem", fontSize: "17px", letterSpacing: "0.1em", color: "#fff", opacity: 0 }}>
          0
        </div>

        {/* Name */}
        <div ref={nameRef} style={{ position: "absolute", bottom: "2rem", left: "2rem", fontSize: "20px", fontWeight: "600", letterSpacing: "0.1em", color: "#fff", opacity: 0, lineHeight: 1.2 }}>
          <div>GURSHAAN GILL</div>
          <div>PORTFOLIO</div>
        </div>

        {/* AUTHORIZED ACCESS */}
        <div ref={authRef} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", letterSpacing: "0.2em", color: "#fff", opacity: 0, textAlign: "center", lineHeight: 1.6, zIndex: 5, pointerEvents: "none" }}>
          AUTHORIZED ACCESS
        </div>

        {/* Circle + click zone — restricted to 260×260 hit area */}
        <div
          style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {/* Hit area — only the circle zone is clickable */}
          <div
            style={{
              position: "relative",
              width: 260,
              height: 260,
              cursor: phase === "enter" ? "pointer" : "default",
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
                opacity="0"
              />

              {/* Solid progress */}
              <circle
                ref={circleProgressRef}
                cx="130"
                cy="130"
                r={R_SOLID_REST}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeDasharray={CIRC_SOLID}
                strokeDashoffset={CIRC_SOLID}
                strokeLinecap="round"
                opacity="0"
              />
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
            <div ref={enterRef} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", letterSpacing: "0.25em", color: "#fff", opacity: 0 }}>
              ENTER
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}