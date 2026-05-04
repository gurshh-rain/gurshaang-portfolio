"use client";
import { useRevealer } from "../hooks/useRevealer";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./nvidia.module.css";

const Nvidia = () => {
    useRevealer();

    const pathname = usePathname();
    const router = useTransitionRouter();

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

    // Reveal observer for .reveal elements
    useEffect(() => {
        const els = document.querySelectorAll('[class*="reveal"]');
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add(styles.visible);
            }),
            { threshold: 0.15 }
        );
        els.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className="revealer" />
            <main className={styles.main}>

                {/* Video pinned to full viewport — sits behind everything */}
                <div className={styles.videoPin}>
                    <video
                        src= "https://w36n5ueyeirjmds2.public.blob.vercel-storage.com/0001-0339.MP4"
                        className={styles.heroVideo}
                        autoPlay muted loop playsInline
                    />
                    <div className={styles.heroText}>
                        <h1>INTRODUCING</h1>
                        <h2>NVIDIA RTX 3090</h2>
                        <h4 className={styles.h4}>Modelled in Fusion | Animated in Blender</h4>
                    </div>
                </div>

                {/* Spacer so the page is tall enough to scroll over the video */}
                <div className={styles.videoSpacer} />

                {/* Content slides up over the video on scroll */}
                <div className={styles.content}>
                    <section className={styles.body}>
                        <div className={`${styles.bodyIndex} ${styles.reveal}`}>02</div>
                        <div className={styles.bodyText}>
                            <h2 className={`${styles.bodyHeading} ${styles.reveal}`}>
                                Design & Engineering
                            </h2>
                            <p className={`${styles.bodyCopy} ${styles.reveal}`}>
                                Using Fusion360, I modeled each individual part of the GPU to allow full control of each
                                part when animating. I created an assembly file to combine all the parts into a singular file.
                                After exporting this file to blender I began on animating. The most important part of this process
                                was to use separate scenes in the same .blend file. This was essential to obtain smooth cuts between scenes.
                                Oftentimes, when animating I begin by visualizing the animation. Thus, I first set up the camera and product animation
                                prior to working on the environment detailing + lighting.
                            </p>
                        </div>
                    </section>
                </div>

            </main>
        </>
    );
};

export default Nvidia;