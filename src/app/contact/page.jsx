"use client";
import { useRevealer } from "../hooks/useRevealer";
import Link from "next/link";
import { useEffect } from "react";

const Contact = () => {
    useRevealer();
    return (
        <>
            <div className="revealer"></div>
            <div className="contact">
                <div className="col">
                    <h2>Contact Me</h2>
                </div>
                <div className="col">
                    <div className="contact-copy">
                        <h2>Collaborations</h2>
                        <h2>gurshaan1124@gmail.com</h2>
                    </div>
                    <div className="contact-copy">
                        <h2>Inquiries</h2>
                        <h2>support@gmail.com</h2>
                    </div>
                </div>
                <div className="contact-img">
                    <img src="hero.jpg" alt="contact-img"/>
                </div>
            </div>
            
            <footer className="contact-bottom">
                <div className="center">
                    <div className="socials">
                        <Link href="https://www.artstation.com/gurshh">artstation</Link>
                    </div>
                    <div className="socials">
                        <Link href="https://www.instagram.com/gurshhhh_">instagram</Link>
                    </div>
                    <div className="socials">
                        <Link href="https://www.artstation.com/gurshh">twitter</Link>
                    </div>
                    <div className="socials">
                        <Link href="https://github.com/gurshh-rain?tab=repositories">github</Link>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Contact;