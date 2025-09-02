"use client";
import { useRevealer } from "../hooks/useRevealer";

const Studio = () => {
    useRevealer();
    
    return (
        <>
            <div className="revealer"></div>
            <div className="studio">
                <div className="col">
                    <h2>My Story</h2>
                </div>
                <div className="col">
                    <h2>Hey there! I'm Gurshaan Gill. Living in Toronto, where I spend my time turning <span>ideas</span> into an <span>impactful</span> experience and reality. 
                        Basically, I like technology. For the past couple years, I've been exploring various <span>programming langauges, data structures, web development,
                        3d rendering, AI, etc...</span> Currently, my focus is to explore the big ideas in conneting <span>technology</span> and <span>medience</span>.
                    </h2>
                </div>
            </div>
            <div className="skillpage">
                <div className="skills">
                    <h2>Skills</h2>
                </div>
                <div className="table">
                    <div className="first-skill"><h2>Web Development</h2></div>
                    <div className="skill-item"><h2>UI/UX Design</h2></div>
                    <div className="skill-item"><h2>NEXTJS</h2></div>
                    <div className="skill-item"><h2>OpenCV</h2></div>
                    <div className="skill-item"><h2>Java</h2></div>
                    <div className="skill-item"><h2>C++</h2></div>
                    <div className="skill-item"><h2>Blender</h2></div>
                    <div className="skill-item"><h2>3D Modeling</h2></div>
                    <div className="skill-item"><h2>3D Animation</h2></div>
                    <div className="skill-item"><h2>Product Design</h2></div>
                    <div className="skill-item"><h2>3D Visualization</h2></div>
                    <div className="skill-item"><h2>React</h2></div>

                    <div className="skill-item"><h2>Web Development</h2></div>
                    <div className="skill-item"><h2>UI/UX Design</h2></div>
                    <div className="skill-item"><h2>NEXTJS</h2></div>
                    <div className="skill-item"><h2>OpenCV</h2></div>
                    <div className="skill-item"><h2>Java</h2></div>
                    <div className="skill-item"><h2>C++</h2></div>
                    <div className="skill-item"><h2>Blender</h2></div>
                    <div className="skill-item"><h2>3D Modeling</h2></div>
                    <div className="skill-item"><h2>3D Animation</h2></div>
                    <div className="skill-item"><h2>Product Design</h2></div>
                    <div className="skill-item"><h2>3D Visualization</h2></div>
                    <div className="skill-item"><h2>React</h2></div>

                </div>
            </div>
        </>
    )
}

export default Studio;