"use client";
import { useRevealer } from "../hooks/useRevealer";
import Link from "next/link";
import { useEffect, useState } from "react";
import HoverScrollText from "../components/HoverScrollText";


const Contact = () => {
    useRevealer();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const cont = document.querySelectorAll(".contact");
        if (cont) {
            for (let i = 0; i < cont.length; i++) {
                setTimeout(() => {
                    cont[i].classList.add("visible");
                }, 1350);
            }
        }
        const radioButtons = document.querySelectorAll('input[type="radio"][name="What can I do for you?"], input[type="radio"][name="budget"], input[type="radio"][name="deadline"]');
        let lastChecked = null;

        radioButtons.forEach(radio => {
        radio.addEventListener('click', function() {
            if (this === lastChecked) {
                this.checked = false;
                lastChecked = null;
            } else {
                lastChecked = this;
            }
            });
        });
    }, []);
    return (
        <>
            <div className="revealer"></div>
            <div className="contact">
                <div className="col">
                    <h2>Contact Me</h2>

                </div>
                <div className="col">
                    <h2>Available for hire/freelance.</h2>
                    <div className="contact-copy">
                        <h2>Collaborations / Freelance</h2>
                        <h2>gurshaan1124@gmail.com</h2>
                    </div>
                    <div className="contact-copy">
                    <button onClick={() => setIsOpen(true)}>
                        <HoverScrollText>Let's Collaborate!</HoverScrollText>
                    </button>
                    </div>
                </div>
                <div className="contact-img">
                    <img src="hero3.jpg" alt="contact-img" />
                </div>
            </div>

            <div className={`popup ${isOpen ? "open" : ""}`}>
                <div className="popup-content">
                    <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
                    <h2>Lets Collaborate!</h2>
                    <hr></hr>
                    <form action="https://formspree.io/f/mgvlrzgr"
                     method="POST" >
                    <p>
                        <h3 className="popup-form">01 // What can I do for you?</h3>
                            <input type="radio" name="What can I do for you?" value="Web Design/Development"/>
                            <label>Web Design/Development</label>
                            <br></br>
                            <input type="radio" name="What can I do for you?" value="3D Rendering/Art"/>
                            <label>3D Rendering/Art</label>
                            <br></br>
                            <input type="radio" name="What can I do for you?" value="Product Design/Animation"/>
                            <label>Product Design/Animation</label>
                        <hr></hr>
                        <h3 className="popup-form">02 // Budget in CAD</h3>
                            <input type="radio" name="budget" value="Under $200"/>
                            <label>Under $200</label>
                            <br></br>
                            <input type="radio" name="budget" value="$200-$500"/>
                            <label>$200-$500</label>
                            <br></br>
                            <input type="radio" name="budget" value="$500-$1k"/>
                            <label>$500-$1k</label>
                            <br></br>
                            <input type="radio" name="budget" value="$1k+"/>
                            <label>$1k+</label>
                        <hr></hr>
                        <h3 className="popup-form">03 // Your Name</h3>
                            <input type="text" name="name" placeholder="Enter name"/>
                        <hr></hr>
                        <h3 className="popup-form">04 // Your Email</h3>
                            <input type="text" name="email" placeholder="Enter email"/>
                        <hr></hr>
                        <h3 className="popup-form">05 // Project Details</h3>
                            <p className="details">Your Project, Goals, Success Criteria</p>
                            <input type="text" name="details" placeholder="Enter details"/>
                        <hr></hr>
                        <h3 className="popup-form">06 // When would you like to start?</h3>
                            <input type="date" name="startDate" placeholder="Enter email"/>
                        <hr></hr>
                        <h3 className="popup-form">07 // Do you have a deadline</h3>
                            <input type="radio" name="deadline" value="Yes"/>
                            <label>Yes</label>
                            <br></br>
                            <input type="radio" name="deadline" value="No, I'm in no rush"/>
                            <label>No, I'm in no rush</label>
                            <br></br>
                            <input type="radio" name="deadline" value="No deadline, but asap please"/>
                            <label>No deadline, but asap please</label>
                        <hr></hr>
                        <button type="submit">
                            <HoverScrollText>Send Request</HoverScrollText>
                        </button>

                    </p>
                    </form>
                </div>
            </div>

            <footer className="contact-bottom">
                <div className="center">
                    <div className="socials">
                        <Link href="https://www.linkedin.com/in/gurshaan-gill-5b48603a4/">
                            <HoverScrollText>linkedin</HoverScrollText>
                        </Link>
                    </div>
                    <div className="socials">
                        <Link href="https://www.instagram.com/gurshhhh_">
                            <HoverScrollText>instagram</HoverScrollText>
                        </Link>
                    </div>
                    <div className="socials">
                        <Link href="https://github.com/gurshh-rain?tab=repositories">
                            <HoverScrollText>github</HoverScrollText>
                        </Link>
                    </div>
                    <div className="socials">
                        <Link href="https://www.artstation.com/gurshh">
                            <HoverScrollText>artstation</HoverScrollText>
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Contact;
