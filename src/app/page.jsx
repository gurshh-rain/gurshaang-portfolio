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

       gsap.to("#loader-path", {
          attr: { d: "M0,0 H100 V100 Q50,60 0,100 Z" }, // middle bends inward
          duration: 1.25,
          ease: "power3.inOut",
        });

        gsap.to("#loader-svg", {
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
      }, 2650);
    }
  }, []);

  return (
    <>
      {}
      <svg 
      id="loader-svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
      }}
    >
      <path
        id="loader-path"
        d="M0,0 H100 V100 Q50,100 0,100 Z"
        fill="#000"
      />
      <text
        x="50"
  y="50"
  textAnchor="middle"
  dominantBaseline="middle"
  fill="#fff"
  fontSize="2.2"
        
      >
        {progress}%
      </text>
    </svg>

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
