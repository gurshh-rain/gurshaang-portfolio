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
                        onClick={() => window.location.href=""}
                        >
                        <td>N°006</td>
                        <td><HoverScrollText>GESTURE CONTROLLED COMPUTER</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr 
                        className="tg" 
                        onClick={() => window.location.href=""}
                        >
                        <td>N°007</td>
                        <td><HoverScrollText>V6 ENGINE</HoverScrollText></td>
                        <td>2026</td>
                        </tr>
                        

                        <tr 
                        className="tg" 
                        onClick={handleNavigation("/nvidia")}
                        >
                        <td>N°008</td>
                        <td><HoverScrollText>NVIDIA 3090 PRODUCT RENDER</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr 
                        className="tg" 
                        onClick={() => window.location.href=""}
                        >
                        <td>N°009</td>
                        <td><HoverScrollText>OBJECT TRACKING ROBOT</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr 
                        className="tg" 
                        onClick={() => window.location.href=""}
                        >
                        <td>N°010</td>
                        <td><HoverScrollText>BASIC SIGN LANGUAGE DETECTOR</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr 
                        className="tg" 
                        onClick={() => window.location.href=""}
                        >
                        <td>N°011</td>
                        <td><HoverScrollText>VIRTUAL PAINT</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr 
                        className="tg" 
                        onClick={() => window.location.href=""}
                        >
                        <td>N°012</td>
                        <td><HoverScrollText>ROBOTIC ARM</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr 
                        className="tg" 
                        onClick={() => window.location.href=""}
                        >
                        <td>N°013</td>
                        <td><HoverScrollText>BRAIN TUMOR CLASSIFICATION MODEL</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr 
                        className="tg" 
                        onClick={() => window.location.href=""}
                        >
                        <td>N°014</td>
                        <td><HoverScrollText>PID AUTO TUNER</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr 
                        className="tg" 
                        onClick={() => window.location.href=""}
                        >
                        <td>N°015</td>
                        <td><HoverScrollText>ROAD SEGMENTATION</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr 
                        className="tg" 
                        onClick={() => window.location.href=""}
                        >
                        <td>N°016</td>
                        <td><HoverScrollText>CANCER GROWTH PREDICTION MODEL</HoverScrollText></td>
                        <td>2026</td>
                        </tr>

                        <tr 
                        className="tg" 
                        onClick={() => window.location.href=""}
                        >
                        <td>N°017</td>
                        <td><HoverScrollText>STOCK PRICE PREDICTOR</HoverScrollText></td>
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