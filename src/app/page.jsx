"use client";

import { useEffect } from "react";
import { useRevealer } from "./hooks/useRevealer";

export default function Home() {
  useRevealer();

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
    }, 1500);
  }
}, []);


  return (
    <>
      <div className="revealer"></div>

      <div id="container3D"></div>
      <div className="home">
        <div className="header">
          <h1>
            {"gurshaan.".split("").map((char, i) => (
              <span key={i} className="letter">{char}</span>
            ))}
          </h1>
        </div>

        <div className="hero-img">
          <img src="/hero2.jpg" alt="hero-img" />
        </div>
      </div>
    </>
  );
}
