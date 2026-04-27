"use client";
import { useRevealer } from "../hooks/useRevealer";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./robotic-arm.module.css";

const RoboticArm = () => {
    useRevealer();
    const router = useTransitionRouter();
    const pathname = usePathname();
    const heroRef = useRef(null);
    const cursorRef = useRef(null);
    const [cursorText, setCursorText] = useState("");
    const [cursorVisible, setCursorVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const els = document.querySelectorAll(`.${styles.reveal}`);
        els.forEach((el, i) => {
            setTimeout(() => el.classList.add(styles.visible), 1400 + i * 120);
        });

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });

        const handleMouseMove = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = e.clientX + "px";
                cursorRef.current.style.top  = e.clientY + "px";
            }
        };
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    function triggerPageTransition() {
        document.documentElement.animate([
            { clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)" },
            { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" }
        ], {
            duration: 2000,
            easing: "cubic-bezier(0.9, 0, 0.1, 1)",
            pseudoElement: "::view-transition-new(root)",
        });
    }

    const handleNavigation = (path) => (e) => {
        if (path === pathname) { e.preventDefault(); return; }
        router.push(path, { onTransitionReady: triggerPageTransition });
    };

    return (
        <>
            <div className="revealer" />

            {/* Custom cursor */}
            <div
                ref={cursorRef}
                className={`${styles.cursor} ${cursorVisible ? styles.cursorActive : ""}`}
            >
                {cursorText}
            </div>

            <main className={styles.main}>

                {/* ── HERO ── */}
                <section className={styles.hero} ref={heroRef}>
                    <div
                        className={styles.heroMedia}
                        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
                    >
                        <video
                            src="/SurgicalArm/0001-0157.mp4"
                            autoPlay muted loop playsInline
                            className={styles.heroVideo}
                        />
                        <div className={styles.heroOverlay} />
                    </div>

                    <div className={styles.heroContent}>
                        <p className={`${styles.heroEyebrow} ${styles.reveal}`}>
                            2026 - CURRENT
                        </p>
                        <h1 className={`${styles.heroTitle} ${styles.reveal}`}>
                            <span className={styles.heroLine}>SURGICAL</span>
                            <span className={`${styles.heroLine} ${styles.heroLineItalic}`}>
                                Robotic Arm
                            </span>
                        </h1>
                        <div className={`${styles.heroDivider} ${styles.reveal}`} />
                        <p className={`${styles.heroSub} ${styles.reveal}`}>
                            A precision-engineered 6-DOF robotic arm designed for surgical assistance. Designed in Fusion 360, Animated in Blender.
                        </p>
                    </div>

                    <div className={`${styles.scrollHint} ${styles.reveal}`}>
                        <span>SCROLL</span>
                        <div className={styles.scrollLine} />
                    </div>
                </section>

                {/* ── META STRIP ── */}
                <section className={`${styles.metaStrip} ${styles.reveal}`}>
                    {[
                        ["TOOLS",  "Fusion 360 · Blender"],
                        ["STATUS", "Completed"],
                        ["YEAR",   "2026 — Current"],
                    ].map(([label, value]) => (
                        <div key={label} className={styles.metaItem}>
                            <span className={styles.metaLabel}>{label}</span>
                            <span className={styles.metaValue}>{value}</span>
                        </div>
                    ))}
                </section>

                {/* ── BODY COPY 01 ── */}
                <section className={styles.body}>
                    <div className={`${styles.bodyIndex} ${styles.reveal}`}>01</div>
                    <div className={styles.bodyText}>
                        <h2 className={`${styles.bodyHeading} ${styles.reveal}`}>
                            The Problem
                        </h2>
                        <p className={`${styles.bodyCopy} ${styles.reveal}`}>
                            Existing surgical robotics platforms are cost-prohibitive and
                            architecturally rigid. This project explores a modular, open-architecture
                            alternative. Built for surgical contexts.
                        </p>
                        <p className={`${styles.bodyCopy} ${styles.reveal}`}>
                            The arm achieves <strong>±0.1 mm</strong> positional repeatability across
                            its full 6-degree-of-freedom.
                        </p>
                    </div>
                </section>

                {/* ── IMAGE 1 — full bleed ── */}
                <section
                    className={`${styles.imageFullBleed} ${styles.reveal}`}
                    onMouseEnter={() => { setCursorText("VIEW"); setCursorVisible(true); }}
                    onMouseLeave={() => { setCursorText(""); setCursorVisible(false); }}
                >
                    <img
                        src="/SurgicalArm/Surgical-Arm.png"
                        alt="Surgical arm render — front view"
                        className={styles.imageFullBleedImg}
                    />
                    <div className={styles.imageCaption}>
                        <span>FIG. 01</span>
                        <span>Front elevation — full assembly</span>
                    </div>
                </section>

                {/* ── BODY COPY 02 ── */}
                <section className={styles.body}>
                    <div className={`${styles.bodyIndex} ${styles.reveal}`}>02</div>
                    <div className={styles.bodyText}>
                        <h2 className={`${styles.bodyHeading} ${styles.reveal}`}>
                            Design & Engineering
                        </h2>
                        <p className={`${styles.bodyCopy} ${styles.reveal}`}>
                            Force-sensing resistors embedded at the end-effector close a haptic
                            feedback loop, giving the operator tactile awareness of tissue contact
                            pressure in real time. A 6-DOF robotic arm effectively simulates a human
                            arm, allowing for the freedom of movement in a 3D space.
                        </p>
                    </div>
                </section>

                {/* ── VIDEO 2 ── */}
                <section className={`${styles.videoSection} ${styles.reveal}`}>
                    <div className={styles.videoSectionHeader}>
                        <span className={styles.videoSectionIndex}>VID. 02</span>
                        <div className={styles.videoSectionLine} />
                        <span className={styles.videoSectionLabel}>End-effector motion study</span>
                    </div>
                    <div className={styles.videoSectionWrap}>
                        <video
                            src="/SurgicalArm/0001-0100.mp4"
                            autoPlay muted loop playsInline
                            className={styles.videoSectionVideo}
                        />
                    </div>
                </section>

                {/* ── SPLIT: image + specs ── */}
                <section className={`${styles.split} ${styles.reveal}`}>
                    <div
                        className={styles.splitImage}
                        onMouseEnter={() => { setCursorText("VIEW"); setCursorVisible(true); }}
                        onMouseLeave={() => { setCursorText(""); setCursorVisible(false); }}
                    >
                        <img
                            src="/SurgicalArm/Surgical-Arm2.png"
                            alt="Surgical arm render — joint detail"
                            className={styles.splitImg}
                        />
                        <div className={styles.imageCaption}>
                            <span>FIG. 02</span>
                            <span>Joint 4–6 detail</span>
                        </div>
                    </div>
                    <div className={styles.splitSpecs}>
                        <h3 className={styles.specsTitle}>Specifications</h3>
                        <ul className={styles.specsList}>
                            {[
                                ["Degrees of Freedom", "6-DOF"],
                                ["Reach",              "650 mm"],
                                ["Joint Drive",        "Harmonic"],
                                ["Control",            "C++ / ROS 2"],
                                ["Sensing",            "FSR + IMU"],
                                ["Material",           "AL6061 / PEEK"],
                            ].map(([k, v]) => (
                                <li key={k} className={styles.specsItem}>
                                    <span className={styles.specsKey}>{k}</span>
                                    <span className={styles.specsDot} />
                                    <span className={styles.specsVal}>{v}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ── FOOTER NAV ── */}
                <section className={`${styles.footerNav} ${styles.reveal}`}>
                    <span className={styles.footerLabel}>NEXT PROJECT</span>
                    <span
                        className={styles.footerNext}
                        onClick={handleNavigation("/work")}
                    >
                        View All Work →
                    </span>
                </section>

            </main>
        </>
    );
};

export default RoboticArm;