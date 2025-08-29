"use client";
import Link from "next/link"
import { useRevealer } from "../hooks/useRevealer";

const Render = () => {
    useRevealer();
    return (
        <>
            <div className="ggill">
                <h1>3D RENDERING</h1>
                <h1 className="descrip">Other works of rendering and product advertisments.</h1>
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

export default Render;