"use client";
import Link from "next/link"
import { useRevealer } from "../hooks/useRevealer";

const Ggill = () => {
    useRevealer();
    return (
        <>
        <div className="revealer"></div>
            <div className="ggill">
                <h1>GURSHAAN GILL PORTFOLIO 025</h1>
                <h1 className="descrip">Personal portfolio website for Gurshaan Gill, showcasing my work and skills.</h1>
            </div>
            <img src="hero.jpg"></img>
        </>
    )
}

export default Ggill;