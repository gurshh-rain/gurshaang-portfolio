"use client";
import { useRevealer } from "../hooks/useRevealer";
import { useEffect } from "react";
import styles from "./Studio.module.css";

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
            <div className={styles.ani}>
                <div className={styles.studio}>
                    <div className={styles.headerRow}>
                        <p className={styles.aboutTag}>@My Story</p>
                        <h2 className={styles.brief}>
                            Hey there. I'm Gurshaan Gill — a Mechatronics
                            Engineering student at the <span>University of
                            Waterloo</span> (Tron '31), splitting time between{" "}
                            <span>Toronto</span> and <span>Waterloo</span>.
                            I like making things that actually move, think, and
                            work in the real world — spanning{" "}
                            <span>robotics</span>, <span>controls</span>,{" "}
                            <span>computer vision</span>, and{" "}
                            <span>agentic AI</span>. My work ranges from
                            ROS 2 fleets and LiDAR-based SLAM to EEG
                            neuroscience and multi-agent research pipelines,
                            with a focus on building{" "}
                            <span>from first principles</span> rather than
                            relying on black-box tools.
                        </h2>
                    </div>

                    <div className={styles.aboutImgWrap}>
                        <img
                            src="hero3.jpg"
                            className={styles.aboutImg}
                            alt="Gurshaan Gill"
                        />
                        <span className={styles.imgLabel}>Toronto, CA</span>
                    </div>

                    <div className={styles.skillpage}>
                        <div className={styles.skillsHeader}>
                            <h2>Skills</h2>
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
                                    className={`${styles.skillItem} ${i === 0 ? styles.firstSkill : ""}`}
                                >
                                    <span>{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Studio;