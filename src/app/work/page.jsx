"use client";
import Link from "next/link"
import { useRevealer } from "../hooks/useRevealer";
import { useState } from "react";


const Work = () => {
    useRevealer();

    const [visible, setVisible] = useState(true);

  function close() {
    setVisible(false);
  }
    return (
        <>
            <div className="revealer"></div>
            <div className="work">
                <h1>selected work.</h1>
                <hr></hr>
                <div className="projects">
                <table>
                    <tr>
                        <th>project</th>
                        <th>title</th>
                        <th>year</th>
                    </tr>
                    <tr className="tg">
                        <td>N°001</td>
                        <td>GURSHAAN GILL PORTFOLIO</td>
                        <td>2025</td>
                    </tr>
                    <tr className="tg">
                        <td>N°002</td>
                        <td>3D RENDERING</td>
                        <td>2015-CURRENT</td>
                    </tr>
                    <tr className="tg">
                        <td>N°003</td>
                        <td>FACE RECONGNITION</td>
                        <td>2024</td>
                    </tr>
                    <tr className="tg">
                        <td>N°004</td>
                        <td>TRADER.AI</td>
                        <td>2025</td>
                    </tr>
                    
                    </table>
                </div>

            </div>

            <div className={visible ? "container" : "container hidden"}>
                <div className="popUp">
                    <button className="btn" onClick={close}>CLOSE</button>
                    <div className="ggill">
                        <h1>GURSHAAN GILL PORTFOLIO 025</h1>
                        <h1 className="descrip">Personal portfolio website for Gurshaan Gill, showcasing my work and skills.</h1>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Work;