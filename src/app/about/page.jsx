"use client";
import { useRevealer } from "../hooks/useRevealer";
import { useEffect } from "react";
import Link from "next/link";
import styles from "./Studio.module.css";
import GooeyTextReveal from "../components/GooeyTextReveal";

const Studio = () => {
    useRevealer();
    useEffect(() => {
        const ani = document.querySelectorAll(`.${styles.ani}`);
        ani.forEach((el, i) => {
            setTimeout(() => el.classList.add(styles.visible), 1350 + i * 80);
        });
    }, []);

    return (
        <>
            <div className="revealer"></div>
            <div className={styles.studio}>
                <GooeyTextReveal>
                    <h1 className={styles.pageTitle}>about.</h1>
                </GooeyTextReveal>
                <hr className={styles.titleRule} />

                <section className={styles.headerRow}>
                    <GooeyTextReveal mode="scroll" start="top 85%">
                        <p className={styles.aboutTag}>
                            <span className={styles.tagIndex}>01</span>@My Story
                        </p>
                    </GooeyTextReveal>
                    <GooeyTextReveal mode="scroll" start="top 85%" delay={0.05}>
                        <div className={styles.brief}>
                            <p>
                                Hey there. I&apos;m Gurshaan Gill — a Mechatronics
                                Engineering student at the <span>University of
                                Waterloo</span> (Tron &apos;31), splitting time between{" "}
                                <span>Toronto</span> and <span>Waterloo</span>.
                            </p>
                            <p>
                                I build things that move, think, and work in the real
                                world — spanning <span>robotics</span>,{" "}
                                <span>controls</span>, <span>computer vision</span>, and{" "}
                                <span>agentic AI</span>. My work ranges from ROS 2
                                fleets and LiDAR-based SLAM to EEG neuroscience and
                                multi-agent research pipelines, with a focus on building{" "}
                                <span>from first principles</span> rather than relying
                                on black-box tools.
                            </p>
                        </div>
                    </GooeyTextReveal>
                </section>

                <section className={styles.ani}>
                    <div className={styles.aboutImgWrap}>
                        <img
                            src="hero3.jpg"
                            className={styles.aboutImg}
                            alt="Gurshaan Gill"
                        />
                        <span className={styles.imgLabel}>Toronto, CA</span>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionLabel}>
                        <GooeyTextReveal mode="scroll" start="top 85%">
                            <p className={styles.aboutTag}>
                                <span className={styles.tagIndex}>02</span>@Currently
                            </p>
                        </GooeyTextReveal>
                    </div>
                    <GooeyTextReveal mode="scroll" start="top 85%" delay={0.05}>
                        <div className={styles.sectionBody}>
                            <p>
                                Right now, I&apos;m focused on the intersection of{" "}
                                <span>physical AI</span> and <span>agentic systems</span>.
                                I&apos;m building tactile data infrastructure at{" "}
                                <span>Phydata</span>, contributing computer vision
                                workflows at <span>Roboflow</span>, and shipping
                                interfaces that make complex tech feel simple at{" "}
                                <span>FirstOpz</span>.
                            </p>
                            <p>
                                On the side, I keep a growing list of builds on the{" "}
                                <Link href="/work" className={styles.inlineLink}>
                                    work page
                                </Link>{" "}
                                — from ROS 2 fleet coordination and YOLO perception
                                pipelines to EEG analysis and 3D experiments.
                            </p>
                        </div>
                    </GooeyTextReveal>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionLabel}>
                        <GooeyTextReveal mode="scroll" start="top 85%">
                            <p className={styles.aboutTag}>
                                <span className={styles.tagIndex}>03</span>@Approach
                            </p>
                        </GooeyTextReveal>
                    </div>
                    <GooeyTextReveal mode="scroll" start="top 85%" delay={0.05}>
                        <div className={styles.sectionBody}>
                            <p>
                                I care about depth over hype. Whether it&apos;s tuning a
                                PID controller from scratch, implementing an ML algorithm
                                in NumPy, or designing a landing page that converts, I
                                want to understand the system end-to-end before wrapping
                                it in a library.
                            </p>
                            <p>
                                I work across the stack — from embedded ROS nodes and
                                Gazebo simulations to Next.js frontends and agentic
                                pipelines — because the best ideas usually come from
                                seeing the full picture.
                            </p>
                        </div>
                    </GooeyTextReveal>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionLabel}>
                        <GooeyTextReveal mode="scroll" start="top 85%">
                            <p className={styles.aboutTag}>
                                <span className={styles.tagIndex}>04</span>@Education
                            </p>
                        </GooeyTextReveal>
                    </div>
                    <GooeyTextReveal mode="scroll" start="top 85%" delay={0.05}>
                        <div className={styles.sectionBody}>
                            <div className={styles.educationItem}>
                                <h3>BASc, Mechatronics Engineering</h3>
                                <p>University of Waterloo — Tron &apos;31, expected 2031</p>
                            </div>
                        </div>
                    </GooeyTextReveal>
                </section>

                <section className={styles.skillsBlock}>
                    <div className={styles.skillsHeader}>
                        <GooeyTextReveal mode="scroll" start="top 85%">
                            <h2>05 — Skills</h2>
                        </GooeyTextReveal>
                    </div>
                    <div className={styles.skillsGrid}>
                        {[
                            "Python", "C++", "MATLAB", "Java", "TypeScript",
                            "PyTorch", "scikit-learn", "OpenCV", "MediaPipe",
                            "ROS 2", "SLAM", "Nav2", "PID Control", "Gazebo",
                            "Isaac Sim", "MoveIt 2", "Pandas", "NumPy",
                            "Fusion 360", "SOLIDWORKS", "Blender", "ANSYS",
                            "Next.js", "React", "Web Development", "UI/UX Design",
                            "ML Development", "Computer Vision", "3D Modeling", "Agentic AI"
                        ].map((skill, i) => (
                            <div
                                key={skill}
                                data-ascii-ripple
                                className={`${styles.skillItem} ${i === 0 ? styles.firstSkill : ""}`}
                            >
                                <span>{skill}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionLabel}>
                        <GooeyTextReveal mode="scroll" start="top 85%">
                            <p className={styles.aboutTag}>
                                <span className={styles.tagIndex}>06</span>@Contact
                            </p>
                        </GooeyTextReveal>
                    </div>
                    <GooeyTextReveal mode="scroll" start="top 85%" delay={0.05}>
                        <div className={styles.sectionBody}>
                            <p>
                                Open to collaborations, research, and side projects.
                                If you have an idea in mind, reach out directly.
                            </p>
                            <div className={styles.contactLinks}>
                                <a
                                    href="mailto:gurshaan1124@gmail.com"
                                    className={styles.contactPill}
                                >
                                    Email ↗
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/gurshaan-gill-5b48603a4/"
                                    className={styles.contactPill}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    LinkedIn ↗
                                </a>
                                <a
                                    href="https://github.com/gurshh-rain"
                                    className={styles.contactPill}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub ↗
                                </a>
                            </div>
                        </div>
                    </GooeyTextReveal>
                </section>
            </div>
        </>
    );
};

export default Studio;
