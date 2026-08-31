"use client";

import { useRevealer } from "../hooks/useRevealer";
import { useEffect, useState } from "react";
import GooeyTextReveal from "../components/GooeyTextReveal";

const Resume = () => {
    useRevealer();

    useEffect(() => {
        const heading = document.querySelector(".resume h1");
        const lists = document.querySelectorAll(".resume .placeholder-list");

        if (heading && lists.length) {
            setTimeout(() => {
                heading.classList.add("visible");
                lists.forEach((list) => list.classList.add("visible"));
            }, 1350);
        }
    }, []);

    const sectionStyle = {
        fontSize: "1.2em",
        fontWeight: 700,
        marginTop: "0.5em",
        marginBottom: "0.2em",
        lineHeight: 1.1,
    };

    const headerStyle = {
        marginBottom: "0.25em",
        display: "flex",
        flexDirection: "column",
        gap: "0.35em",
    };

    const experiences = [
        {
            role: "Co-founder / CTO / Growth",
            org: "phydata [On-site/Remote] | Agentic AI, Git/GitHub",
            period: "July 2026 – Present",
            bullets: [
                "Built and shipped phydata with a team of five from Waterloo/MIT, creating the next generation of tactile data for physical AI.",
                "Designed and engineered end-to-end agentic AI workflows that leverage autonomous decision-making to curate, format, and programmatically publish targeted content on X (Twitter), eliminating manual overhead and optimizing social media reach.",
            ],
        },
        {
            role: "ML / Computer Vision Contributor",
            org: "Roboflow [Remote] | Computer vision, Data augmentation, VLMs",
            period: "May 2026 – Present",
            bullets: [
                "Built and deployed end-to-end computer vision projects spanning object detection, image classification, and robotics.",
                "Designed data pipelines covering dataset collection, annotation, augmentation, and evaluation for production-ready models.",
                "Explored zero-shot labeling, vision-language models (VLMs), and automated dataset-generation techniques.",
            ],
        },
        {
            role: "Frontend Developer",
            org: "FirstOpz [Remote] | TypeScript, Web Development",
            period: "Feb 2026 – June 2026",
            bullets: [
                "Built and shipped FirstOpz’s public waitlist landing page from scratch, translating the platform’s resume-free, skills-based value proposition into a clear, conversion-focused signup flow for its Wave 1 launch.",
                "Implemented responsive, mobile-first layouts with real-time form validation in HTML, CSS, and TypeScript/React, growing the early-access list to 100+ student sign-ups in one month.",
            ],
        },
        {
            role: "Incoming",
            org: "Watanomous [On-site]",
            period: "Incoming",
            bullets: [
                "Working on reinforcement-learning training for Waterloo’s first humanoid robot.",
            ],
        },
    ];

    const categories = ["All", "Computer Vision", "Robotics", "Machine Learning", "Agentic / Applied AI", "CAD / Design", "Research"];

    const [activeCategory, setActiveCategory] = useState("All");

    const projects = [
        {
            title: "Land Cover Classification and Deforestation Detection from Satellite Imagery via CNN",
            category: "Computer Vision",
            org: "Python, CNNs, PyTorch",
            period: "Month Year",
            bullets: [
                "Trained a custom CNN to classify Sentinel-2 satellite patches into 10 land-use categories (e.g., Forest, Residential, Industrial) on the EuroSAT benchmark, then repurposed it as a change-detection tool.",
                "Tiled large GeoTIFF satellite images and classified each tile at two time points, flagging patches that transitioned from Forest to non-forest, human-associated classes to surface candidate deforestation events."
            ]
        },
        {
            title: "Real-Time Fastener State Monitoring on an Assembly Line using YOLOv8 and ByteTrack",
            category: "Computer Vision",
            org: "Python, YOLOv8, ByteTrack",
            period: "",
            bullets: [
                "Computer vision pipeline that detects and tracks fasteners on a live assembly line using YOLOv8 object detection combined with ByteTrack multi-object tracking."
            ]
        },
        {
            title: "Real-Time Sign Language Interpretation from Webcam Video",
            category: "Computer Vision",
            org: "Python, OpenCV, MediaPipe",
            period: "",
            bullets: [
                "Translates sign language gestures captured from a webcam into text in real time using a custom computer vision and classification pipeline."
            ]
        },
        {
            title: "Markerless Hand-Gesture Control of a Personal Computer using MediaPipe and OpenCV",
            category: "Computer Vision",
            org: "Python, MediaPipe, OpenCV",
            period: "",
            bullets: [
                "Enables cursor control and system shortcuts through natural hand gestures tracked via MediaPipe hands and processed with OpenCV."
            ]
        },
        {
            title: "Air-Gesture Virtual Painting with OpenCV and MediaPipe Hand Tracking",
            category: "Computer Vision",
            org: "Python, OpenCV, MediaPipe",
            period: "",
            bullets: [
                "An air-drawing application that lets users paint on a digital canvas using finger gestures captured through a standard webcam."
            ]
        },
        {
            title: "Quadpod Robot: Full Design, Build, and Training",
            category: "Robotics",
            org: "CAD, 3D Printing, Arduino/C++, NVIDIA Isaac Sim",
            period: "",
            bullets: [
                "Designed and 3D-printed a custom quadruped chassis and leg assemblies from scratch, engineering synchronized multi-servo gait control that achieved stable standing and coordinated walking across all four legs. Implemented autonomous obstacle avoidance by streaming live ultrasonic distance readings into the robot’s control loop in real time, enabling collision-free navigation with zero manual input. Deployed C++ control loops powered by real-time IMU tilt correction and ultrasonic distance telemetry."
            ]
        },
        {
            title: "Gradient-Based Auto-Tuning of PID Controller Gains via Numerical Optimization",
            category: "Robotics",
            org: "Python, Numerical Optimization",
            period: "",
            bullets: [
                "Implementation of a PID controller from scratch with automated gain tuning using gradient descent and numerically estimated gradients, optimizing a loss that balances tracking error and overshoot."
            ]
        },
        {
            title: "Autonomous Maze Navigation for a LiDAR-Equipped ROS 2 Robot using SLAM and Nav2",
            category: "Robotics",
            org: "ROS2, Gazebo, Nav2, C++",
            period: "",
            bullets: [
                "Real-time mapping and path planning for a LiDAR-equipped differential robot in ROS 2, visualized live in RViz2 with simultaneous localization and mapping."
            ]
        },
        {
            title: "Vision-Guided 6-DOF Robotic Arm Simulation with YOLO Object Detection in Gazebo",
            category: "Robotics",
            org: "ROS2, Gazebo, YOLO, MoveIt2",
            period: "",
            bullets: [
                "Simulation of a six-degree-of-freedom robotic arm integrated with a YOLOv8 perception pipeline for pick-and-place tasks in the Gazebo physics engine."
            ]
        },
        {
            title: "A ROS 2 Fleet Management Framework for Multi-Robot Warehouse Coordination",
            category: "Robotics",
            org: "ROS2, Gazebo, C++, Python",
            period: "",
            bullets: [
                "Software framework for orchestrating teams of ROS 2 mobile robots, handling task allocation, navigation coordination, and inter-robot communication."
            ]
        },
        {
            title: "ROS2 Lidar Room Scanning Bot + Computer Vision Sensing (YOLO)",
            category: "Robotics",
            org: "ROS2, Gazebo, Nav2, C++, Python",
            period: "",
            bullets: [
                "Developed an autonomous ROS 2 mobile robot that generated real-time 3D spatial scans and target object classifications by integrating 2D/3D LiDAR SLAM, YOLO computer vision detection nodes, and spatial coordinate transforms."
            ]
        },
        {
            title: "Predictive Maintenance of Turbofan Jet Engines via Ensemble Sequence Modelling",
            category: "Machine Learning",
            org: "Python, PyTorch",
            period: "",
            bullets: [
                "Comparative study of LSTM, Random Forest, and XGBoost ensembles for Remaining Useful Life prediction on the NASA C-MAPSS benchmark dataset."
            ]
        },
        {
            title: "Neural Signal Prediction from Intracranial EEG: A Comparative Study of XGBoost and Transformer Architectures",
            category: "Machine Learning",
            org: "Python, XGBoost, Transformers",
            period: "",
            bullets: [
                "Benchmarking gradient-boosted trees against Transformer-based sequence models for forecasting intracranial electrophysiological signals in neuroscience."
            ]
        },
        {
            title: "Functional Connectivity Analysis of EEG During AI-Assisted Composition",
            category: "Machine Learning",
            org: "Python, Signal Processing",
            period: "",
            bullets: [
                "Investigates how student brain functional connectivity shifts when writing essays with generative-AI assistance, leveraging open EEG datasets and signal processing methods."
            ]
        },
        {
            title: "A Machine Learning Framework for Cardiovascular Risk Assessment Across Logistic Regression, Random Forest, and XGBoost",
            category: "Machine Learning",
            org: "Python, scikit-learn",
            period: "",
            bullets: [
                "End-to-end pipeline for clinical cardiovascular risk prediction comparing three model families on standard feature pipelines and evaluation metrics."
            ]
        },
        {
            title: "Modelling Diabetes Disease Progression with Gradient Boosting Regressors",
            category: "Machine Learning",
            org: "Python, XGBoost",
            period: "",
            bullets: [
                "Predicts quantitative diabetes progression using gradient-boosted regression, with feature analysis and hyperparameter tuning for clinical interpretability."
            ]
        },
        {
            title: "Time-Series Forecasting of Residential Energy Consumption Using Tuned XGBoost Models",
            category: "Machine Learning",
            org: "Python, XGBoost",
            period: "",
            bullets: [
                "Forecasts household electricity demand from historical time-series data using feature-engineered, hyperparameter-optimized XGBoost regression."
            ]
        },
        {
            title: "Foundational Machine Learning Algorithms Implemented from Scratch in Python",
            category: "Machine Learning",
            org: "Python, NumPy",
            period: "",
            bullets: [
                "A pedagogical library of classical ML algorithms implemented line-by-line in NumPy, with documented derivations of their underlying mathematics."
            ]
        },
        {
            title: "Spatiotemporal Protein Folding Trajectory Modeling with Deep Learning",
            category: "Research",
            org: "Python, Computer Vision, LLMs",
            period: "",
            bullets: [
                "Protein folding trajectory analysis and prediction pipeline combining computer-vision and LLM-based approaches. <em>(soon to come)</em>"
            ]
        },
        {
            title: "Interactive 3D Visualization of Meta's TRIBE v2 Brain Model with Engagement Analytics",
            category: "Agentic / Applied AI",
            org: "Python, Three.js, React",
            period: "",
            bullets: [
                "An interactive viewer for Meta's TRIBE v2 foundation brain model, augmented with user-engagement tracking to study how humans explore neural representations."
            ]
        },
        {
            title: "Semantic Book Recommendations from Reading History via Sentence Embeddings",
            category: "Agentic / Applied AI",
            org: "Python, Google Books API, sentence-transformers",
            period: "",
            bullets: [
                "Content-based recommender that maps books to embedding space using the Google Books API and sentence-transformer models to suggest semantically similar titles."
            ]
        },
        {
            title: "A Multi-Agent Research Pipeline for Claim Clustering and Contradiction Detection",
            category: "Agentic / Applied AI",
            org: "Python, LangChain, LLMs",
            period: "",
            bullets: [
                "Agentic system that goes beyond single-source fact-checking by clustering claims across documents and explicitly surfacing inter-source contradictions."
            ]
        },
        {
            title: "Framelyai: Behavioral Interview Analyzer",
            category: "Agentic / Applied AI",
            org: "Python, Computer Vision, LLMs, REST APIs",
            period: "",
            bullets: [
                "Built a web platform that analyzes eye contact, posture, facial expressions, and filler-word usage in real time during mock behavioral interviews, combining computer-vision tracking with live speech transcription and LLM grading against the STAR framework."
            ]
        },
        {
            title: "Ascend Job Search Agent",
            category: "Agentic / Applied AI",
            org: "Python, Computer Vision, LLMs, REST APIs",
            period: "",
            bullets: [
                "Job-search automation agent that leverages computer vision and LLMs to streamline application workflows."
            ]
        },
        {
            title: "V6 Engine from Scratch: CAD Model",
            category: "CAD / Design",
            org: "SolidWorks / Fusion 360",
            period: "",
            bullets: [
                "From-scratch CAD model of a V6 internal combustion engine, including block, heads, crankshaft, and valvetrain assemblies."
            ]
        }
    ];

    const visibleProjects = activeCategory === "All"
        ? projects
        : projects.filter((p) => p.category === activeCategory);

    const renderItem = (item, index) => (
        <li key={index} className="placeholder-item">
            <div className="placeholder-meta">
                {item.period && (
                    <span className="placeholder-period">{item.period}</span>
                )}
                <span className="placeholder-index">
                    {`N°${String(index + 1).padStart(3, "0")}`}
                </span>
            </div>
            <GooeyTextReveal mode="scroll" start="top 85%" delay={0.05}>
                <div className="placeholder-body">
                    <h2>{item.role || item.title}</h2>
                    {item.org && <h3>{item.org}</h3>}
                    {item.bullets && item.bullets.length > 0 && (
                        <ul className="experience-bullets">
                            {item.bullets.map((point, i) => (
                                <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
                            ))}
                        </ul>
                    )}
                </div>
            </GooeyTextReveal>
        </li>
    );

    return (
        <>
            <div className="revealer"></div>
            <style dangerouslySetInnerHTML={{
                __html: `
                    .resume h1 {
                        font-size: 4em;
                    }
                    .resume hr {
                        margin: 0.35em 0;
                    }
                    .resume .placeholder-list {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 0.5em;
                        align-items: start;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                    .resume-top {
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        gap: 1.5em;
                    }
                    .resume-ascii-art {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 75%;
                        width: auto;
                        max-width: calc(50% - 0.5em);
                        aspect-ratio: 1;
                        transform: translateX(-50%);
                        overflow: hidden;
                        border: 1px solid color-mix(in srgb, var(--fg) 12%, transparent);
                        background: #050505;
                    }
                    .resume-ascii-art img {
                        width: 100%;
                        height: 100%;
                        display: block;
                        object-fit: cover;
                        object-position: center 61%;
                    }
                    @media (max-width: 900px) {
                        .resume .placeholder-list {
                            grid-template-columns: 1fr;
                        }
                        .resume-ascii-art {
                            display: none;
                        }
                    }
                    .resume .placeholder-item {
                        display: flex;
                        flex-direction: column;
                        gap: 0.45em;
                        padding: 0.75em;
                        border: 1px solid color-mix(in srgb, var(--fg) 12%, transparent);
                    }
                    .resume .placeholder-item:last-child {
                        border-bottom: 1px solid color-mix(in srgb, var(--fg) 12%, transparent);
                    }
                    .resume .placeholder-meta {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        gap: 0.35em;
                    }
                    .resume .placeholder-period {
                        font-size: 0.65em;
                    }
                    .resume .placeholder-index {
                        font-size: 0.6em;
                    }
                    .resume .placeholder-body h2 {
                        font-size: 0.95em;
                    }
                    .resume .placeholder-body h3 {
                        font-size: 0.75em;
                        margin-top: 0.1em;
                    }
                    .resume .placeholder-body .experience-bullets {
                        margin-top: 0.3em;
                        display: flex;
                        flex-direction: column;
                        gap: 0.15em;
                    }
                    .resume .placeholder-body .experience-bullets li {
                        font-size: 0.75em;
                        line-height: 1.3;
                        padding-left: 0.9em;
                    }
                    .resume .placeholder-body .experience-bullets li::before {
                        content: "•";
                        position: absolute;
                        left: 0;
                    }
                    .resume-header a {
                        display: inline;
                        color: var(--fg);
                        text-decoration: underline;
                        text-underline-offset: 0.15em;
                    }
                    .resume-header p {
                        display: block;
                        font-size: 0.85em;
                        opacity: 0.85;
                        line-height: 1.4;
                    }
                    .resume-category-nav {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.5em;
                        padding: 0.5em 0 1em;
                    }
                    .resume-category-link {
                        font-family: "Helvetica", Arial, sans-serif;
                        font-size: 11px;
                        font-weight: 600;
                        letter-spacing: 0.05em;
                        text-transform: uppercase;
                        color: var(--fg);
                        background: transparent;
                        border: 1px solid color-mix(in srgb, var(--fg) 25%, transparent);
                        border-radius: 9999px;
                        padding: 0.45em 1em;
                        cursor: pointer;
                        transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
                    }
                    .resume-category-link:hover:not(.active) {
                        border-color: var(--fg);
                        color: var(--fg);
                        background-color: transparent;
                    }
                    .resume-category-link.active {
                        background-color: var(--fg);
                        border-color: var(--fg);
                        color: var(--bg);
                    }
                `
            }} />
            <div className="experience resume">
                <GooeyTextReveal>
                    <h1>resume.</h1>
                </GooeyTextReveal>
                <hr></hr>

                <div className="resume-top">
                <div className="resume-header" style={headerStyle}>
                    <h2 style={{ fontSize: "2.2em", fontWeight: 700, lineHeight: 1.1 }}>
                        Gurshaan Gill
                    </h2>
                    <p>
                        <a href="tel:647-561-9192">647-561-9192</a>
                        {" | "}
                        <a href="mailto:gurshaan.gill@uwaterloo.ca">
                            gurshaan.gill@uwaterloo.ca
                        </a>
                        {" | "}
                        <a href="https://linkedin.com/in/gurshaangill" target="_blank" rel="noopener noreferrer">
                            linkedin.com/in/gurshaangill
                        </a>
                        {" | "}
                        <a href="https://github.com/gurshh-rain" target="_blank" rel="noopener noreferrer">
                            github.com/gurshh-rain
                        </a>
                    </p>
                </div>

                <GooeyTextReveal delay={0.05}>
                    <h2 style={sectionStyle}>education.</h2>
                </GooeyTextReveal>
                <ul className="placeholder-list">
                    <li className="placeholder-item">
                        <div className="placeholder-meta">
                            <span className="placeholder-period">Expected 2026 – 2031</span>
                            <span className="placeholder-index">N°001</span>
                        </div>
                        <GooeyTextReveal mode="scroll" start="top 85%" delay={0.05}>
                            <div className="placeholder-body">
                                <h2>University of Waterloo</h2>
                                <h3>Bachelor of Applied Science in Mechatronics Engineering</h3>
                            </div>
                        </GooeyTextReveal>
                    </li>
                </ul>

                <GooeyTextReveal delay={0.05}>
                    <h2 style={sectionStyle}>technical skills.</h2>
                </GooeyTextReveal>
                <ul className="placeholder-list">
                    <li className="placeholder-item">
                        <div className="placeholder-meta">
                            <span className="placeholder-index">N°001</span>
                        </div>
                        <GooeyTextReveal mode="scroll" start="top 85%" delay={0.05}>
                            <div className="placeholder-body">
                                <h2>Technical Skills</h2>
                                <ul className="experience-bullets">
                                <li>
                                    <strong>Languages:</strong> Python, C++, Java, TypeScript, HTML/CSS
                                </li>
                                <li>
                                    <strong>ML &amp; Computer Vision:</strong> PyTorch, scikit-learn, OpenCV, MediaPipe, Ultralytics YOLO, Claude Code, Agentic AI, Pandas, NumPy, SciPy, Matplotlib, Seaborn
                                </li>
                                <li>
                                    <strong>Tools &amp; Platforms:</strong> ROS2, Gazebo, MoveIt2, Nav2, Isaac Sim, MATLAB, Git/GitHub, Arduino, Google Colab/Jupyter, REST APIs, Roboflow
                                </li>
                                <li>
                                    <strong>CAD:</strong> SolidWorks, Fusion 360, Blender
                                </li>
                            </ul>
                        </div>
                    </GooeyTextReveal>
                    </li>
                </ul>
                <div className="resume-ascii-art">
                    <img src="/ascii-art-3.png" alt="ASCII artwork of an industrial robotic arm" />
                </div>
                </div>

                <GooeyTextReveal delay={0.05}>
                    <h2 style={sectionStyle}>experience.</h2>
                </GooeyTextReveal>
                <ul className="placeholder-list">
                    {experiences.map(renderItem)}
                </ul>

                <GooeyTextReveal delay={0.05}>
                    <h2 style={sectionStyle}>research / certifications.</h2>
                </GooeyTextReveal>
                <ul className="placeholder-list">
                    <li className="placeholder-item">
                        <div className="placeholder-meta">
                            <span className="placeholder-index">N°001</span>
                        </div>
                        <GooeyTextReveal mode="scroll" start="top 85%" delay={0.05}>
                            <div className="placeholder-body">
                                <h2>Research Paper</h2>
                                <h3>Explanation drift for confidence-based prediction of individual model errors under distribution shift across linear, tree-based, and neural tabular models (TabPFN)</h3>
                            </div>
                        </GooeyTextReveal>
                    </li>
                    <li className="placeholder-item">
                        <div className="placeholder-meta">
                            <span className="placeholder-index">N°002</span>
                        </div>
                        <GooeyTextReveal mode="scroll" start="top 85%" delay={0.05}>
                            <div className="placeholder-body">
                                <h2>NVIDIA Certification</h2>
                                <h3>Software-in-the-Loop Testing for Robots With OpenUSD, Isaac Sim, and ROS</h3>
                            </div>
                        </GooeyTextReveal>
                    </li>
                    <li className="placeholder-item">
                        <div className="placeholder-meta">
                            <span className="placeholder-index">N°003</span>
                        </div>
                        <GooeyTextReveal mode="scroll" start="top 85%" delay={0.05}>
                            <div className="placeholder-body">
                                <h2>Spatiotemporal Protein Folding Trajectory Modeling with Deep Learning</h2>
                                <h3><em>(soon to come)</em></h3>
                            </div>
                        </GooeyTextReveal>
                    </li>
                </ul>

                <GooeyTextReveal delay={0.05}>
                    <h2 style={sectionStyle}>projects.</h2>
                </GooeyTextReveal>
                <nav className="resume-category-nav">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`resume-category-link ${activeCategory === category ? "active" : ""}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </nav>
                <ul className="placeholder-list">
                    {visibleProjects.map(renderItem)}
                </ul>
            </div>
        </>
    );
};

export default Resume;
