"use client";

import { useEffect } from "react";
import { usePreloaderDone } from "./components/PreloaderContext";
import GooeyTextReveal from "./components/GooeyTextReveal";

export default function Home() {
  const preloaderDone = usePreloaderDone();

  useEffect(() => {
    if (!preloaderDone) return;

    const letters = document.querySelectorAll(".header .letter");
    const img = document.querySelector(".hero-img");

    if (letters.length && img) {
      letters.forEach((letter, i) => {
        setTimeout(() => {
          letter.classList.add("visible");
        }, i * 50);
      });
      img.classList.add("visible");
      const tagline = document.querySelector(".home .header .tagline");
      if (tagline) {
        setTimeout(() => tagline.classList.add("visible"), letters.length * 50 + 300);
      }
    }
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
          <GooeyTextReveal delay={0.5}>
            <p className="tagline">tron @ waterloo | building w physical ai, computer vision, and agents</p>
          </GooeyTextReveal>
        </div>

        <div className="hero-img">
          <img src="/hero.png?v=2" alt="hero-img" />
        </div>
      </div>
    </>
  );
}