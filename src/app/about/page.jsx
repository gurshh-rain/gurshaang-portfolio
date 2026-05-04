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
                            Hey there. I'm Gurshaan Gill — living in Toronto,
                            turning <span>ideas</span> into{" "}
                            <span>impactful</span> experiences. Programming
                            languages, data structures, web dev, 3D rendering,
                            AI, and beyond. Currently exploring the big ideas in{" "}
                            <span>mechatronics</span>.
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
                                "Web Development", "Fusion 360", "AutoCAD",
                                "UI/UX Design", "Next.js", "OpenCV", "Java", "Product Animation",
                                "C++", "Blender", "3D Modeling", "3D Animation",
                                "Product Design", "3D Visualization", "React", "ML Development", "Simulation", "Python"
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