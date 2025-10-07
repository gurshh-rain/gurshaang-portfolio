"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Home() {

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let counter = 0;

    const interval = setInterval(() => {
      counter++;
      setProgress(counter);

      if (counter >= 100) {
        clearInterval(interval);

        // Push up the revealer
        gsap.to(".revealer", {
          y: "-100%",
          duration: 1.25,
          ease: "power3.inOut",
        });
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const letters = document.querySelectorAll(".header .letter");
    const img = document.querySelector(".hero-img");

    if (letters.length && img) {
      setTimeout(() => {
        letters.forEach((letter, i) => {
          setTimeout(() => {
            letter.classList.add("visible");
          }, i * 50);
        });
        img.classList.add("visible");
      }, 2700);
    }
  }, []);

  return (
    <>
      {}
      <div className="revealer">
        <div className="loading-content">
          <h1>{progress}%</h1>
          <div
            className="loading-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {}
      <div id="container3D"></div>
      <div className="home">
        <div className="header">
          <h1>
            {"gurshaan.".split("").map((char, i) => (
              <span key={i} className="letter">
                {char}
              </span>
            ))}
          </h1>
        </div>

        <div className="hero-img">
          <img src="/hero.jpg" alt="hero-img" />
        </div>
      </div>
    </>
  );
}
