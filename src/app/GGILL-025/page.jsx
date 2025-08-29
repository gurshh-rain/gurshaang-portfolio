"use client";
import Link from "next/link"
import { useRevealer } from "../hooks/useRevealer";

const Ggill = () => {
    useRevealer();
    return (
        <>
            <div className="ggill">
                <h1>GURSHAAN GILL PORTFOLIO 025</h1>
                <h1 className="descrip">Personal portfolio website for Gurshaan Gill, showcasing my work and skills.</h1>
            </div>
            <div className="image-slider">
                <img src="hero.jpg" className="first"></img>
                <img src="hero.jpg"></img>
                <img src="hero.jpg"></img>
                <img src="hero.jpg"></img>
                <img src="hero.jpg"></img>
            </div>
        </>
    )
}

export default Ggill;