"use client";

import { useEffect } from "react";
import { useRevealer } from "./hooks/useRevealer";

export default function Home() {
  useRevealer();

  useEffect(() => {
    const header = document.querySelector(".header h1");
    if (header) {
      setTimeout(() => {
        header.classList.add("visible");
      }, 1450); // delay for smoothness
    }
  }, []);

  return (
    <>
      <div className="revealer"></div>

      <div id="container3D"></div>
      <div className="home">
        <div className="header">
          <h1>gurshaan.</h1>
        </div>

        <div className="hero-img">
          <img src="/hero2.jpg" alt="hero-img" />
        </div>
      </div>
    </>
  );
}
