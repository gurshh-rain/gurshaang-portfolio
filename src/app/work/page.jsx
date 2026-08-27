"use client";
import Link from "next/link"
import { useRevealer } from "../hooks/useRevealer";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import HoverScrollText from "../components/HoverScrollText";


const Work = () => {
    useRevealer();

    useEffect(() => {
        const work = document.querySelector(".work h1");
        const table = document.querySelector(".project-display");

        if (work && table) {
          setTimeout(() => {
            work.classList.add("visible");
            table.classList.add("visible");
          }, 1350);
        }
      }, []);

          const router = useTransitionRouter();
    const pathname = usePathname();

    function triggerPageTransition(){
        document.documentElement.animate([
            {
                clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)"
            },
            {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
            }
        ], {
            duration: 2000,
            easing: "cubic-bezier(0.9, 0, 0.1, 1)",
            pseudoElement: "::view-transition-new(root)",
        });
    }
    const handleNavigation = (path) => (e) => {
        if(path === pathname){
            e.preventDefault();
            return;
        }

        router.push(path, {
            onTransitionReady: triggerPageTransition,
        });
    };

    // Academic GitHub projects
    const projects = [
        {
            url: "https://github.com/gurshh-rain/Modelling-LSTM-Random-Forest-and-XGBoost-to-Forecast-RUL-Metrics-of-NASA-Turbofan-Jet-Engines",
            title: "Predictive Maintenance of Turbofan Jet Engines via Ensemble Sequence Modelling",
            desc: "Comparative study of LSTM, Random Forest, and XGBoost ensembles for Remaining Useful Life prediction on the NASA C-MAPSS benchmark dataset."
        },
        {
            url: "https://github.com/gurshh-rain/Multi-Temporal-Land-Cover-Classification-and-Deforestation-Detection-via-Convolutional-Neural-Networ",
            title: "Multi-Temporal Land-Cover Classification and Deforestation Detection via Convolutional Neural Networks",
            desc: "CNN-based classification of EuroSAT satellite imagery with temporal change detection to automatically flag forest-to-non-forest conversion across two time points."
        },
        {
            url: "https://github.com/gurshh-rain/Gradient-Based-Auto-Tuning-of-PID-Controller-Gains-via-Numerical-Optimization",
            title: "Gradient-Based Auto-Tuning of PID Controller Gains via Numerical Optimization",
            desc: "Implementation of a PID controller from scratch with automated gain tuning using gradient descent and numerically estimated gradients, optimizing a loss that balances tracking error and overshoot."
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
            url: "https://github.com/gurshh-rain/tribe-v2-interactive-brain-viewer-with-user-engagement-tracking",
            title: "Interactive 3D Visualization of Meta's TRIBE v2 Brain Model with Engagement Analytics",
            desc: "An interactive viewer for Meta's TRIBE v2 foundation brain model, augmented with user-engagement tracking to study how humans explore neural representations."
        },
        {
            url: "https://github.com/gurshh-rain/Sign-Language-Model-V2-CNN",
            title: "A Convolutional Neural Network for American Sign Language Alphabet Classification",
            desc: "PyTorch CNN trained to classify static ASL alphabet images, exploring architectural trade-offs and data augmentation for robust sign recognition."
        },
        {
            url: "https://github.com/gurshh-rain/Semantic-Book-Recommendations-from-Reading-History",
            title: "Semantic Book Recommendations from Reading History via Sentence Embeddings",
            desc: "Content-based recommender that maps books to embedding space using the Google Books API and sentence-transformer models to suggest semantically similar titles."
        },
        {
            url: "https://github.com/gurshh-rain/ML-Algorithms-Python-Implementation",
            title: "Foundational Machine Learning Algorithms Implemented from Scratch in Python",
            desc: "A pedagogical library of classical ML algorithms implemented line-by-line in NumPy, with documented derivations of their underlying mathematics."
        },
        {
            url: "https://github.com/gurshh-rain/agentic-research-search",
            title: "A Multi-Agent Research Pipeline for Claim Clustering and Contradiction Detection",
            desc: "Agentic system that goes beyond single-source fact-checking by clustering claims across documents and explicitly surfacing inter-source contradictions."
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
    ];

    return (
        <>
            <div className="revealer"></div>
            <div className="work">
                <h1>selected work.</h1>
                <div className="img-container">
                    <img src="hero4.jpg"/>
                </div>
                <hr></hr>
                <div className="projects">
                <table className="project-display">
                    <thead>
                        <tr>
                        <th>project</th>
                        <th>title</th>
                        <th>year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr
                                key={index}
                                className="tg"
                                title={project.desc}
                                onClick={() => window.location.href = project.url}
                            >
                                <td>{`N°${String(index + 1).padStart(3, "0")}`}</td>
                                <td>
                                    <HoverScrollText>{project.title.toUpperCase()}</HoverScrollText>
                                    <span className="project-desc">{project.desc}</span>
                                </td>
                                <td>2026</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>

            </div>

        </>
    )
}

export default Work;
