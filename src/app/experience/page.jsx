"use client";
import { useRevealer } from "../hooks/useRevealer";
import { useEffect } from "react";
import AsciiGlitchRipple from "../components/AsciiGlitchRipple";
import GooeyTextReveal from "../components/GooeyTextReveal";


const Experience = () => {
    useRevealer();

    useEffect(() => {
        const heading = document.querySelector(".experience h1");
        const sub = document.querySelector(".experience .placeholder-list");
        if (heading && sub) {
            setTimeout(() => {
                heading.classList.add("visible");
                sub.classList.add("visible");
            }, 1350);
        }
    }, []);

    const experiences = [
        {
            role: "Co-founder / CTO / Growth",
            org: "Phydata [On-site/Remote] | Agentic AI, Git/GitHub",
            period: "July 2026 – Present",
            desc: [
                "Building and shipping Phydata with a team of five from Waterloo/MIT, creating the next generation of tactile data for physical AI.",
                "Designed and shipped end-to-end agentic AI workflows that autonomously curate, format, and programmatically publish targeted content on X, eliminating manual overhead and optimizing social media reach."
            ]
        },
        {
            role: "ML / Computer Vision Contributor",
            org: "Roboflow [Remote] | Computer vision, Data augmentation, VLMs",
            period: "May 2026 – Present",
            desc: [
                "Built and deployed end-to-end computer vision projects spanning object detection, image classification, and robotics.",
                "Designed data pipelines covering dataset collection, annotation, augmentation, and evaluation for production-ready models.",
                "Explored zero-shot labeling, vision-language models (VLMs), and automated dataset-generation techniques."
            ]
        },
        {
            role: "Frontend Developer",
            org: "FirstOpz [Remote] | TypeScript, Web Development",
            period: "Feb 2026 – June 2026",
            desc: [
                "Built and shipped FirstOpz’s public waitlist landing page from scratch, translating the platform’s resume-free, skills-based value proposition into a clear, conversion-focused signup flow for its Wave 1 launch.",
                "Implemented responsive, mobile-first layouts with real-time form validation in HTML, CSS, and TypeScript/React, growing the early-access list to 100+ student sign-ups in one month."
            ]
        },
        {
            role: "Incoming",
            org: "Watanomous",
            period: "Incoming",
            desc: []
        }
    ];

    return (
        <>
            <div className="revealer"></div>
            <div className="experience">
                <GooeyTextReveal>
                    <h1>experience.</h1>
                </GooeyTextReveal>
                <hr></hr>
                <style dangerouslySetInnerHTML={{
                    __html: `
                        .experience-grid {
                            display: grid;
                            grid-template-columns: 1fr 520px;
                            gap: 2em;
                            width: 100%;
                        }
                        @media (max-width: 1000px) {
                            .experience-grid {
                                grid-template-columns: 1fr;
                            }
                            .experience-img-wrap {
                                display: none;
                            }
                        }
                        .experience-img-wrap {
                            height: 100%;
                        }
                        .experience-img-wrap img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            object-position: top;
                        }
                    `
                }} />
                <div className="experience-grid">
                    <ul className="placeholder-list">
                        {experiences.map((item, index) => (
                            <li key={index} className="placeholder-item">
                                <div className="placeholder-meta">
                                    <span className="placeholder-period">{item.period}</span>
                                    <span className="placeholder-index">
                                        {`N°${String(index + 1).padStart(3, "0")}`}
                                    </span>
                                </div>
                                <div className="placeholder-body">
                                    <h2>
                                        <AsciiGlitchRipple as="span">{item.role.toUpperCase()}</AsciiGlitchRipple>
                                    </h2>
                                    <GooeyTextReveal mode="scroll" start="top 85%" delay={0.05}>
                                        <h3>{item.org}</h3>
                                        {Array.isArray(item.desc) && item.desc.length > 0 ? (
                                            <ul className="experience-bullets">
                                                {item.desc.map((point, i) => (
                                                    <li key={i}>{point}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            !Array.isArray(item.desc) && item.desc && <p>{item.desc}</p>
                                        )}
                                    </GooeyTextReveal>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="experience-img-wrap">
                        <img src="hero2.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Experience;
