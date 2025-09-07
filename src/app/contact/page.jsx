"use client";
import { useRevealer } from "../hooks/useRevealer";
import Link from "next/link";
import { useEffect } from "react";
import HoverScrollText from "../components/HoverScrollText";

const Contact = () => {
    useRevealer();
    useEffect(() => {
        const cont = document.querySelectorAll(".contact");
        if (cont) {
            for(let i = 0; i < cont.length; i++){
                setTimeout(() => {
                cont[i].classList.add("visible");
                }, 1350); 
            }
        }
    }, []);
    return (
        <>
            <div className="revealer"></div>
            <div className="contact">
                <div className="col">
                    <h2>Contact Me</h2>
                </div>
                <div className="col">
                    <h2>Avaliable for freelance.</h2>
                    <div className="contact-copy">
                        <h2>Collaborations / Freelance</h2>
                        <h2>gurshaan1124@gmail.com</h2>
                    </div>
                    <div className="contact-copy">
                        <h2>Inquiries</h2>
                        <h2>support@gmail.com</h2>
                    </div>
                    <div className="contact-copy">
                        <h2>BLANKWEAR</h2>
                        <h2>blank@gmail.com</h2>
                    </div>
                </div>
                <div className="contact-img">
                    <img src="hero3.jpg" alt="contact-img"/>
                </div>
            </div>
            
            <footer className="contact-bottom">
                <div className="center">
                    <div className="socials">
                        <Link href="https://www.artstation.com/gurshh">
                            <HoverScrollText>artstation</HoverScrollText>
                        </Link>
                    </div>
                    <div className="socials">
                        <Link href="https://www.instagram.com/gurshhhh_">
                            <HoverScrollText>instagram</HoverScrollText>
                        </Link>
                    </div>
                    <div className="socials">
                        <Link href="https://www.artstation.com/gurshh">
                            <HoverScrollText>twitter</HoverScrollText>
                        </Link>
                    </div>
                    <div className="socials">
                        <Link href="https://github.com/gurshh-rain?tab=repositories">
                            <HoverScrollText>artstation</HoverScrollText>
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Contact;