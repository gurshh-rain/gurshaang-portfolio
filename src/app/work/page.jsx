"use client";

import { useRevealer } from "../hooks/useRevealer";
import { useEffect, useRef, useState } from "react";
import GooeyTextReveal from "../components/GooeyTextReveal";

const Work = () => {
    useRevealer();

    useEffect(() => {
        const work = document.querySelector(".work h1");
        const grids = document.querySelectorAll(".project-grid");

        if (work && grids.length) {
            setTimeout(() => {
                work.classList.add("visible");
                grids.forEach((grid) => grid.classList.add("visible"));
            }, 1350);
        }
    }, []);

    const categoryRefs = useRef({});
    const [activeCategory, setActiveCategory] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveCategory(entry.target.dataset.category);
                    }
                });
            },
            { rootMargin: "-30% 0px -50% 0px" }
        );

        Object.values(categoryRefs.current).forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToCategory = (name) => {
        const el = categoryRefs.current[name];
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const categories = [
        {
            name: "Computer Vision",
            projects: [
                {
                    url: "https://github.com/gurshh-rain/Multi-Temporal-Land-Cover-Classification-and-Deforestation-Detection-via-Convolutional-Neural-Networ",
                    title: "Multi-Temporal Land-Cover Classification and Deforestation Detection via Convolutional Neural Networks",
                    desc: "CNN-based classification of EuroSAT satellite imagery with temporal change detection to automatically flag forest-to-non-forest conversion across two time points."
                },
                {
                    url: "https://github.com/gurshh-rain/Sign-Language-Model-V2-CNN",
                    title: "A Convolutional Neural Network for American Sign Language Alphabet Classification",
                    desc: "PyTorch CNN trained to classify static ASL alphabet images, exploring architectural trade-offs and data augmentation for robust sign recognition."
                },
                {
                    url: "https://github.com/gurshh-rain/assembly-line-real-time-fastener-monitoring",
                    title: "Real-Time Fastener State Monitoring on an Assembly Line using YOLOv8 and ByteTrack",
                    desc: "Computer vision pipeline that detects and tracks fasteners on a live assembly line using YOLOv8 object detection combined with ByteTrack multi-object tracking."
                },
                {
                    url: "https://github.com/gurshh-rain/realtime-sign-language-interpreter",
                    title: "Real-Time Sign Language Interpretation from Webcam Video",
                    desc: "Translates sign language gestures captured from a webcam into text in real time using a custom computer vision and classification pipeline."
                },
                {
                    url: "https://github.com/gurshh-rain/gesture-controlled-computer",
                    title: "Markerless Hand-Gesture Control of a Personal Computer using MediaPipe and OpenCV",
                    desc: "Enables cursor control and system shortcuts through natural hand gestures tracked via MediaPipe hands and processed with OpenCV."
                },
                {
                    url: "https://github.com/gurshh-rain/computer-vision-virtual-paint",
                    title: "Air-Gesture Virtual Painting with OpenCV and MediaPipe Hand Tracking",
                    desc: "An air-drawing application that lets users paint on a digital canvas using finger gestures captured through a standard webcam."
                }
            ]
        },
        {
            name: "Robotics",
            projects: [
                {
                    url: "",
                    title: "Quadpod Robot — Full Design, Build, and Training",
                    desc: "Designed and 3D-printed a custom quadruped chassis and leg assemblies from scratch, engineering synchronized multi-servo gait control that achieved stable standing and coordinated walking across all four legs. Implemented autonomous obstacle avoidance by streaming live ultrasonic distance readings into the robot’s control loop in real time, enabling collision-free navigation with zero manual input. Deployed C++ control loops powered by real-time IMU tilt correction and ultrasonic distance telemetry."
                },
                {
                    url: "https://github.com/gurshh-rain/Gradient-Based-Auto-Tuning-of-PID-Controller-Gains-via-Numerical-Optimization",
                    title: "Gradient-Based Auto-Tuning of PID Controller Gains via Numerical Optimization",
                    desc: "Implementation of a PID controller from scratch with automated gain tuning using gradient descent and numerically estimated gradients, optimizing a loss that balances tracking error and overshoot."
                },
                {
                    url: "https://github.com/gurshh-rain/autonomous-maze-navigation-slam-nav2",
                    title: "Autonomous Maze Navigation for a LiDAR-Equipped ROS 2 Robot using SLAM and Nav2",
                    desc: "Real-time mapping and path planning for a LiDAR-equipped differential robot in ROS 2, visualized live in RViz2 with simultaneous localization and mapping."
                },
                {
                    url: "https://github.com/gurshh-rain/6dof-robotic-arm-simulation-yolo-integration",
                    title: "Vision-Guided 6-DOF Robotic Arm Simulation with YOLO Object Detection in Gazebo",
                    desc: "Simulation of a six-degree-of-freedom robotic arm integrated with a YOLOv8 perception pipeline for pick-and-place tasks in the Gazebo physics engine."
                },
                {
                    url: "https://github.com/gurshh-rain/ros2-fleet-manager",
                    title: "A ROS 2 Fleet Management Framework for Multi-Robot Warehouse Coordination",
                    desc: "Software framework for orchestrating teams of ROS 2 mobile robots, handling task allocation, navigation coordination, and inter-robot communication."
                },
                {
                    url: "",
                    title: "ROS2 Lidar Room Scanning Bot + Computer Vision Sensing (YOLO)",
                    desc: "Developed an autonomous ROS 2 mobile robot that generated real-time 3D spatial scans and target object classifications by integrating 2D/3D LiDAR SLAM, YOLO computer vision detection nodes, and spatial coordinate transforms."
                }
            ]
        },
        {
            name: "Machine Learning",
            projects: [
                {
                    url: "https://github.com/gurshh-rain/Modelling-LSTM-Random-Forest-and-XGBoost-to-Forecast-RUL-Metrics-of-NASA-Turbofan-Jet-Engines",
                    title: "Predictive Maintenance of Turbofan Jet Engines via Ensemble Sequence Modelling",
                    desc: "Comparative study of LSTM, Random Forest, and XGBoost ensembles for Remaining Useful Life prediction on the NASA C-MAPSS benchmark dataset."
                },
                {
                    url: "https://github.com/gurshh-rain/Predicting-Neuro-iEEG-Data-Comparing-XGBoost-And-Transformer-Architectures-",
                    title: "Neural Signal Prediction from Intracranial EEG: A Comparative Study of XGBoost and Transformer Architectures",
                    desc: "Benchmarking gradient-boosted trees against Transformer-based sequence models for forecasting intracranial electrophysiological signals in neuroscience."
                },
                {
                    url: "https://github.com/gurshh-rain/Brain-Functional-Connectivity-During-AI-Assisted-Essay-Writing",
                    title: "Functional Connectivity Analysis of EEG During AI-Assisted Composition",
                    desc: "Investigates how student brain functional connectivity shifts when writing essays with generative-AI assistance, leveraging open EEG datasets and signal processing methods."
                },
                {
                    url: "https://github.com/gurshh-rain/ML-Framework-Cardiovascular-Risk-Assessment-Comparing-Logitic-Regression-Random-Forest-XGBoost",
                    title: "A Machine Learning Framework for Cardiovascular Risk Assessment Across Logistic Regression, Random Forest, and XGBoost",
                    desc: "End-to-end pipeline for clinical cardiovascular risk prediction comparing three model families on standard feature pipelines and evaluation metrics."
                },
                {
                    url: "https://github.com/gurshh-rain/Diabetes-Disease-Progression-Prediction-with-Gradient-Boosting",
                    title: "Modelling Diabetes Disease Progression with Gradient Boosting Regressors",
                    desc: "Predicts quantitative diabetes progression using gradient-boosted regression, with feature analysis and hyperparameter tuning for clinical interpretability."
                },
                {
                    url: "https://github.com/gurshh-rain/Time-Series-Forecasting-of-Household-Power-Usage",
                    title: "Time-Series Forecasting of Residential Energy Consumption Using Tuned XGBoost Models",
                    desc: "Forecasts household electricity demand from historical time-series data using feature-engineered, hyperparameter-optimized XGBoost regression."
                },
                {
                    url: "https://github.com/gurshh-rain/ML-Algorithms-Python-Implementation",
                    title: "Foundational Machine Learning Algorithms Implemented from Scratch in Python",
                    desc: "A pedagogical library of classical ML algorithms implemented line-by-line in NumPy, with documented derivations of their underlying mathematics."
                },
                {
                    url: "",
                    title: "Protein Folding Trajectory Model",
                    desc: "Protein folding trajectory analysis and prediction pipeline combining computer-vision and LLM-based approaches."
                }
            ]
        },
        {
            name: "Agentic / Applied AI",
            projects: [
                {
                    url: "https://github.com/gurshh-rain/tribe-v2-interactive-brain-viewer-with-user-engagement-tracking",
                    title: "Interactive 3D Visualization of Meta's TRIBE v2 Brain Model with Engagement Analytics",
                    desc: "An interactive viewer for Meta's TRIBE v2 foundation brain model, augmented with user-engagement tracking to study how humans explore neural representations."
                },
                {
                    url: "https://github.com/gurshh-rain/Semantic-Book-Recommendations-from-Reading-History",
                    title: "Semantic Book Recommendations from Reading History via Sentence Embeddings",
                    desc: "Content-based recommender that maps books to embedding space using the Google Books API and sentence-transformer models to suggest semantically similar titles."
                },
                {
                    url: "https://github.com/gurshh-rain/agentic-research-search",
                    title: "A Multi-Agent Research Pipeline for Claim Clustering and Contradiction Detection",
                    desc: "Agentic system that goes beyond single-source fact-checking by clustering claims across documents and explicitly surfacing inter-source contradictions."
                },
                {
                    url: "",
                    title: "Framelyai — Behavioral Interview Analyzer",
                    desc: "Built a web platform that analyzes eye contact, posture, facial expressions, and filler-word usage in real time during mock behavioral interviews, combining computer-vision tracking with live speech transcription and LLM grading against the STAR framework."
                },
                {
                    url: "",
                    title: "Ascend Job Search Agent",
                    desc: "Job-search automation agent that leverages computer vision and LLMs to streamline application workflows."
                }
            ]
        },
        {
            name: "Research Papers",
            projects: [
                {
                    url: "",
                    title: "Soon to come",
                    desc: "Research publications currently in preparation will be shared here."
                }
            ]
        }
    ];

    return (
        <>
            <div className="revealer"></div>
            <div className="work">
                <GooeyTextReveal>
                    <h1>selected work.</h1>
                </GooeyTextReveal>
                <div className="img-container">
                    <img
                        src="hero4.jpg"
                        alt=""
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                    />
                </div>
                <hr></hr>
                <div className="projects">
                    <nav className="project-category-nav">
                        {categories.map((category) => (
                            <button
                                key={category.name}
                                className={`project-category-link ${activeCategory === category.name ? "active" : ""}`}
                                onClick={() => scrollToCategory(category.name)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </nav>

                    {categories.map((category) => (
                        <div
                            key={category.name}
                            ref={(el) => { categoryRefs.current[category.name] = el; }}
                            data-category={category.name}
                            className="project-section"
                        >
                            <div className="project-section-header">
                                <GooeyTextReveal mode="scroll" start="top 85%">
                                    <h2>{category.name}</h2>
                                </GooeyTextReveal>
                            </div>
                            <div className="project-grid">
                                {category.projects.map((project, index) => (
                                    <GooeyTextReveal
                                        key={project.title}
                                        mode="scroll"
                                        start="top 85%"
                                        delay={0.05}
                                    >
                                        <div
                                            className="project-card"
                                            style={{ cursor: project.url ? "pointer" : "default" }}
                                            onClick={project.url ? () => window.open(project.url, "_blank") : undefined}
                                        >
                                            <span className="project-card-index">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <h3 className="project-card-title">{project.title}</h3>
                                            <p className="project-card-desc">{project.desc}</p>
                                        </div>
                                    </GooeyTextReveal>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                    .work {
                        padding: 8em 3em;
                    }
                    @media (max-width: 768px) {
                        .work {
                            padding: 6em 1.5em;
                        }
                    }
                    .img-container img:hover {
                        filter: none;
                    }
                    .project-category-nav {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.75em;
                        padding: 0 1em 1.5em;
                        margin-bottom: 0.5em;
                        border-bottom: 1px solid color-mix(in srgb, var(--fg) 12%, transparent);
                    }
                    .project-category-link {
                        font-family: "Helvetica", Arial, sans-serif;
                        font-size: 12px;
                        font-weight: 600;
                        letter-spacing: 0.1em;
                        text-transform: uppercase;
                        color: var(--fg);
                        background: transparent;
                        border: 1px solid color-mix(in srgb, var(--fg) 25%, transparent);
                        border-radius: 9999px;
                        padding: 0.55em 1.2em;
                        cursor: pointer;
                        appearance: none;
                        -webkit-appearance: none;
                        line-height: 1;
                        text-decoration: none;
                        transition: color 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
                    }
                    .project-category-link:hover:not(.active) {
                        border-color: var(--fg);
                        color: var(--fg);
                        background-color: transparent;
                    }
                    .project-category-link.active {
                        background-color: var(--fg);
                        border-color: var(--fg);
                        color: var(--bg);
                    }
                `
            }} />
        </>
    );
};

export default Work;
