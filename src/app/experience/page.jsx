"use client";
import { useRevealer } from "../hooks/useRevealer";
import { useEffect } from "react";
import HoverScrollText from "../components/HoverScrollText";


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

    // Placeholder experience entries — to be replaced with real ones
    const experiences = [
        {
            role: "Mechatronics Engineering Student",
            org: "University of Waterloo",
            period: "Sep 2026 – Apr 2031",
            desc: "Placeholder for upcoming undergraduate studies in Mechatronics Engineering. Coursework, design teams, and research interests to be detailed."
        },
        {
            role: "Personal Project — Robotics & AI",
            org: "Independent",
            period: "2024 – Present",
            desc: "Placeholder for self-directed work spanning ROS 2 robotics, computer vision, and agentic AI systems. See the projects page for the current list of builds."
        },
        {
            role: "Placeholder Role",
            org: "Placeholder Organization",
            period: "Month Year – Month Year",
            desc: "Placeholder entry — replace with a real co-op, internship, research position, or club role. Include scope, tools used, and outcomes."
        },
        {
            role: "Placeholder Role",
            org: "Placeholder Organization",
            period: "Month Year – Month Year",
            desc: "Placeholder entry — replace with a real co-op, internship, research position, or club role. Include scope, tools used, and outcomes."
        }
    ];

    return (
        <>
            <div className="revealer"></div>
            <div className="experience">
                <h1>experience.</h1>
                <hr></hr>
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
                                    <HoverScrollText>{item.role.toUpperCase()}</HoverScrollText>
                                </h2>
                                <h3>{item.org}</h3>
                                <p>{item.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Experience;
