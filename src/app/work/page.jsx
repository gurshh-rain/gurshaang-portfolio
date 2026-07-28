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
                        <tr
                        className="tg"
                        >
                        <td>N°001</td>
                        <td><HoverScrollText>GURSHAAN GILL PORTFOLIO</HoverScrollText></td>
                        <td>2025</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={handleNavigation("/3D-Rendering")}
                        >
                        <td>N°002</td>
                        <td><HoverScrollText>3D RENDERING</HoverScrollText></td>
                        <td>2015-CURRENT</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={() => window.location.href="https://firstopz.ca"}
                        >
                        <td>N°003</td>
                        <td><HoverScrollText>FIRSTOPZ</HoverScrollText></td>
                        <td>2025-CURRENT</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={() => window.location.href="https://dylanngo.vercel.app"}
                        >
                        <td>N°004</td>
                        <td><HoverScrollText>DYLAN NGO PORTFOLIO</HoverScrollText></td>
                        <td>2025</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={handleNavigation("/robotic-arm")}
                        >
                        <td>N°005</td>
                        <td><HoverScrollText>SURGICAL ARM</HoverScrollText></td>
                        <td>2026-CURRENT</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={() => window.location.href="https://github.com/gurshh-rain/Modelling-LSTM-Random-Forest-and-XGBoost-to-Forecast-RUL-Metrics-of-NASA-Turbofan-Jet-Engines"}
                        >
                        <td>N°006</td>
                        <td><HoverScrollText>MODELLING LSTM RANDOM FOREST AND XGBOOST TO FORECAST RUL METRICS OF NASA TURBOFAN JET ENGINES</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={() => window.location.href="https://github.com/gurshh-rain/Multi-Temporal-Land-Cover-Classification-and-Deforestation-Detection-via-Convolutional-Neural-Networ"}
                        >
                        <td>N°007</td>
                        <td><HoverScrollText>MULTI TEMPORAL LAND COVER CLASSIFICATION AND DEFORESTATION DETECTION VIA CONVOLUTIONAL NEURAL NETWOR</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={() => window.location.href="https://github.com/gurshh-rain/tribe-v2-interactive-brain-viewer-with-user-engagement-tracking"}
                        >
                        <td>N°008</td>
                        <td><HoverScrollText>TRIBE V2 INTERACTIVE BRAIN VIEWER WITH USER ENGAGEMENT TRACKING</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={() => window.location.href="https://github.com/gurshh-rain/gesture-controlled-computer"}
                        >
                        <td>N°009</td>
                        <td><HoverScrollText>GESTURE CONTROLLED COMPUTER</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={() => window.location.href="https://github.com/gurshh-rain/computer-vision-virtual-paint"}
                        >
                        <td>N°010</td>
                        <td><HoverScrollText>COMPUTER VISION VIRTUAL PAINT</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={() => window.location.href="https://github.com/gurshh-rain/realtime-sign-language-interpreter"}
                        >
                        <td>N°011</td>
                        <td><HoverScrollText>REALTIME SIGN LANGUAGE INTERPRETER</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={() => window.location.href="https://github.com/gurshh-rain/Gradient-Based-Auto-Tuning-of-PID-Controller-Gains-via-Numerical-Optimization"}
                        >
                        <td>N°012</td>
                        <td><HoverScrollText>GRADIENT BASED AUTO TUNING OF PID CONTROLLER GAINS VIA NUMERICAL OPTIMIZATION</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={() => window.location.href="https://github.com/gurshh-rain/ML-Algorithms-Python-Implementation"}
                        >
                        <td>N°013</td>
                        <td><HoverScrollText>ML ALGORITHMS PYTHON IMPLEMENTATION</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={() => window.location.href="https://github.com/gurshh-rain/parking-lot-space-counter"}
                        >
                        <td>N°014</td>
                        <td><HoverScrollText>PARKING LOT SPACE COUNTER</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={handleNavigation("/nvidia")}
                        >
                        <td>N°015</td>
                        <td><HoverScrollText>NVIDIA 3090 PRODUCT RENDER</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={() => window.location.href="https://github.com/gurshh-rain/Diabetes-Disease-Progression-Prediction-with-Gradient-Boosting"}
                        >
                        <td>N°016</td>
                        <td><HoverScrollText>DIABETES DISEASE PROGRESSION PREDICTION WITH GRADIENT BOOSTING</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={() => window.location.href="https://github.com/gurshh-rain/ML-Framework-Cardiovascular-Risk-Assessment-Comparing-Logitic-Regression-Random-Forest-XGBoost"}
                        >
                        <td>N°017</td>
                        <td><HoverScrollText>ML FRAMEWORK CARDIOVASCULAR RISK ASSESSMENT COMPARING LOGITIC REGRESSION RANDOM FOREST XGBOOST</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr
                        className="tg"
                        onClick={() => window.location.href="https://framelyai.vercel.app"}
                        >
                        <td>N°018</td>
                        <td><HoverScrollText>FRAMELYAI</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr
                        className="tg"
                        >
                        <td>N°019</td>
                        <td><HoverScrollText>QUADPOD ROBOT</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr
                        className="tg"
                        >
                        <td>N°020</td>
                        <td><HoverScrollText>BIONIC HAND</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr
                        className="tg"
                        >
                        <td>N°021</td>
                        <td><HoverScrollText>FOOTBALL HEATMAP GENERATOR</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr
                        className="tg"
                        >
                        <td>N°022</td>
                        <td><HoverScrollText>CUSTOM RAG PIPELINE</HoverScrollText></td>
                        <td>2026</td>
                        </tr>
                    </tbody>
                    </table>
                </div>

            </div>
            
        </>
    )
}

export default Work;