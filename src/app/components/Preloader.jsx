"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
CustomEase.create("smooth", "0.76, 0, 0.24, 1");

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%<>/\\[]{}~^*";

function HackText({ lines, delay = 0, style = {}, align = "left" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Build spans for each char
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

    // Animate each char: fade in with glitch flickers then resolve
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

  const R = 95;
  const CIRC = 2 * Math.PI * R;

  // Initial spin + load phase
  useEffect(() => {
    const tl = gsap.timeline();

    gsap.set(circleTrackRef.current, {
      opacity: 0,
      strokeDasharray: CIRC,
      strokeDashoffset: CIRC,
    });
    gsap.set(circleProgressRef.current, {
      opacity: 0,
      strokeDashoffset: CIRC,
    });

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
            CIRC - (v / 100) * CIRC;
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

  // Enter phase
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
    tl.to(
      [circleTrackRef.current, circleProgressRef.current],
      { attr: { r: 68 }, duration: 0.5, ease: "smooth" },
      "-=0.1"
    );
    tl.to(logoRef.current, { opacity: 0, scale: 0.8, duration: 0.3, ease: "smooth" });
    tl.fromTo(
      enterRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.35, ease: "smooth" },
      "-=0.15"
    );
  }, [phase]);

  const handleCircleHover = (enter) => {
    if (phase !== "enter") return;
    gsap.to([circleTrackRef.current, circleProgressRef.current], {
      attr: { r: enter ? 50 : 68 },
      duration: 0.35,
      ease: "smooth",
    });
  };

  const handleEnterClick = () => {
    if (phase !== "enter") return;
    setPhase("authorized");

    const tl = gsap.timeline();

    // --- Phase 1: fade out circle UI ---
    tl.to(enterRef.current, { opacity: 0, duration: 0.25, ease: "smooth" });
    tl.to(logoRef.current, { opacity: 0, duration: 0.2, ease: "smooth" }, "-=0.1");
    tl.to(
      [circleTrackRef.current, circleProgressRef.current],
      { opacity: 0, duration: 0.4, ease: "smooth" }
    );
    tl.fromTo(
      authRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "smooth" }
    );

    // --- Phase 2: window contracts, margin reveals, frame meta + hack text fire on contraction complete ---
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

    // Frame meta container fades in as window finishes contracting
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

    // --- Phase 3: velocity wipe bar sweeps across, THEN hack text fires after bar exits ---
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

        // Subtle velocity: just a gentle width breath + single soft shadow
        const vel = Math.min(t * 2, 1) * (1 - Math.max(0, (t - 0.55) / 0.45));
        const barW = 14 + vel * 6;
        const shadowAlpha = 0.10 + vel * 0.08;

        if (wipeBarRef.current) {
          wipeBarRef.current.style.left = x - barW + "px";
          wipeBarRef.current.style.width = barW + "px";
          wipeBarRef.current.style.boxShadow = `-${barW * 1.4}px 0 ${barW * 2}px 1px rgba(255,255,255,${shadowAlpha})`;
        }

        // Erase fill tracks the bar's leading edge directly — no lag
        if (wipeRef.current) {
          wipeRef.current.style.transform = `scaleX(${Math.min(ease, 1)})`;
        }

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          // Bar has fully exited — fade it out
          if (wipeBarRef.current) {
            wipeBarRef.current.style.transition = "opacity 0.15s ease";
            wipeBarRef.current.style.opacity = "0";
          }

          // Bar done — hack text already fired on window contraction complete
        }
      };

      requestAnimationFrame(step);
    }, "+=0.5");

    // --- Phase 4: window expands back to full, then overlay fades ---
    // We add a delay here to let the wipe + hack text breathe before expanding
    tl.to(innerWindowRef.current, {
      margin: "0px",
      duration: 1.2,
      ease: "hop",
      delay: 1.8, // wipe (~0.82s) + breath (0.32s) + hack text settling (~0.6s)
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
      {/* Frame meta — white margin area with hacking text */}
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
        {/* Top-left */}
        <div style={{ position: "absolute", top: "1.6vh", left: "1.5vw" }}>
          {showFrameMeta ? (
            <HackText lines={["GURSHAAN GILL", "PORTFOLIO"]} delay={0} />
          ) : (
            <div style={{ fontSize: "9px", lineHeight: 1.9, color: "transparent" }}>
              <div>GURSHAAN GILL</div>
              <div>PORTFOLIO</div>
            </div>
          )}
        </div>

        {/* Top-center */}
        <div
          style={{
            position: "absolute",
            top: "1.6vh",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          {showFrameMeta ? (
            <HackText
              lines={["TORONTO GMT -5", "43.6532°N, 79.3832°W"]}
              delay={120}
              align="center"
            />
          ) : (
            <div style={{ fontSize: "9px", lineHeight: 1.9, color: "transparent" }}>
              <div>TORONTO GMT -5</div>
              <div>43.6532°N, 79.3832°W</div>
            </div>
          )}
        </div>

        {/* Top-right */}
        <div style={{ position: "absolute", top: "1.6vh", right: "1.5vw" }}>
          {showFrameMeta ? (
            <HackText
              lines={["TORONTO, ON", "OVERVIEW: 01 PROJECTS"]}
              delay={240}
              align="right"
              style={{ textAlign: "right" }}
            />
          ) : (
            <div style={{ fontSize: "9px", lineHeight: 1.9, color: "transparent", textAlign: "right" }}>
              <div>TORONTO, ON</div>
              <div>OVERVIEW: 01 PROJECTS</div>
            </div>
          )}
        </div>

        {/* Bottom-left */}
        <div style={{ position: "absolute", bottom: "1.6vh", left: "1.5vw" }}>
          {showFrameMeta ? (
            <HackText lines={["GURSHAAN GILL", "PORTFOLIO"]} delay={360} />
          ) : (
            <div style={{ fontSize: "9px", lineHeight: 1.9, color: "transparent" }}>
              <div>GURSHAAN GILL</div>
              <div>PORTFOLIO</div>
            </div>
          )}
        </div>

        {/* Bottom-center-left */}
        <div style={{ position: "absolute", bottom: "1.6vh", left: "20vw" }}>
          {showFrameMeta ? (
            <HackText lines={["OVERVIEW:", "01 PROJECTS"]} delay={440} />
          ) : (
            <div style={{ fontSize: "9px", lineHeight: 1.9, color: "transparent" }}>
              <div>OVERVIEW:</div>
              <div>01 PROJECTS</div>
            </div>
          )}
        </div>

        {/* Bottom strip — right side */}
        <div
          style={{
            position: "absolute",
            bottom: "1.6vh",
            left: "50%",
            right: "1.5vw",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
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
        style={{
          position: "absolute",
          inset: 0,
          margin: 0,
          background: "#0a0a0a",
          overflow: "hidden",
          zIndex: 3,
        }}
      >
        {/* Eraser — black fill that expands left→right behind the bar */}
        <div
          ref={wipeRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#0a0a0a",
            zIndex: 9,
            opacity: 1,
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />

        {/* Velocity wipe bar */}
        <div
          ref={wipeBarRef}
          style={{
            position: "absolute",
            top: 0,
            left: "-80px",
            width: "14px",
            height: "100%",
            background: "#ffffff",
            zIndex: 10,
            opacity: 0,
          }}
        />

        {/* READY */}
        <div
          ref={readyRef}
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            fontSize: "17px",
            letterSpacing: "0.1em",
            color: "#fff",
            opacity: 0,
          }}
        >
          READY
        </div>

        {/* Percent */}
        <div
          ref={percentRef}
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            fontSize: "17px",
            letterSpacing: "0.1em",
            color: "#fff",
            opacity: 0,
          }}
        >
          0
        </div>

        {/* Name */}
        <div
          ref={nameRef}
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "2rem",
            fontSize: "20px",
            fontWeight: "600",
            letterSpacing: "0.1em",
            color: "#fff",
            opacity: 0,
            lineHeight: 1.2,
          }}
        >
          <div>GURSHAAN GILL</div>
          <div>PORTFOLIO</div>
        </div>

        {/* AUTHORIZED ACCESS */}
        <div
          ref={authRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "#fff",
            opacity: 0,
            textAlign: "center",
            lineHeight: 1.6,
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          AUTHORIZED ACCESS
        </div>

        {/* Center: SVG circle + GG + ENTER */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: phase === "enter" ? "pointer" : "default",
          }}
          onClick={handleEnterClick}
          onMouseEnter={() => handleCircleHover(true)}
          onMouseLeave={() => handleCircleHover(false)}
        >
          <div style={{ position: "relative", width: 220, height: 220 }}>
            <svg
              width="220"
              height="220"
              viewBox="0 0 220 220"
              style={{
                position: "absolute",
                inset: 0,
                transform: "rotate(-90deg)",
              }}
            >
              <circle
                ref={circleTrackRef}
                cx="110"
                cy="110"
                r={R}
                fill="none"
                stroke="#2a2a2a"
                strokeWidth="1.5"
                opacity="0"
              />
              <circle
                ref={circleProgressRef}
                cx="110"
                cy="110"
                r={R}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeDasharray={CIRC}
                strokeDashoffset={CIRC}
                strokeLinecap="round"
                opacity="0"
              />
            </svg>

            {/* Logo */}
            <div
              ref={logoRef}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/logo.png"
                alt="GG"
                style={{
                  width: "36px",
                  height: "36px",
                  objectFit: "contain",
                  filter: "invert(1)",
                }}
              />
            </div>

            {/* ENTER */}
            <div
              ref={enterRef}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                letterSpacing: "0.25em",
                color: "#fff",
                opacity: 0,
              }}
            >
              ENTER
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}