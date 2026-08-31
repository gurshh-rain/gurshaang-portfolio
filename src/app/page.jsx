"use client";

import { useEffect } from "react";
import { usePreloaderDone } from "./components/PreloaderContext";

export default function Home() {
  const preloaderDone = usePreloaderDone();

  useEffect(() => {
    if (!preloaderDone) return;

    const nameLetters = document.querySelectorAll(".header h1 .letter");
    const taglineLetters = document.querySelectorAll(".header .tagline .letter");
    const img = document.querySelector(".hero-img");

    if (img) img.classList.add("visible");

    nameLetters.forEach((letter, i) => {
      setTimeout(() => letter.classList.add("visible"), i * 50);
    });

    // tagline starts at the same time as the name but uses a tighter stagger
    // so the whole sentence doesn't take too long
    const taglineStagger = 12;
    taglineLetters.forEach((letter, i) => {
      setTimeout(() => letter.classList.add("visible"), i * taglineStagger);
    });
  }, [preloaderDone]); // fires exactly when preloader signals done

  return (
    <>
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
          <p className="tagline">
            {"tron @ waterloo | building w physical ai, computer vision, and agents".split("").map((char, i) => (
              <span key={i} className="letter">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>

        <div className="hero-img">
          <img src="/hero.png?v=2" alt="hero-img" />
        </div>
      </div>
    </>
  );
}