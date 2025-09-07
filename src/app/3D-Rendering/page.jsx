"use client";
import { useState } from "react";
import { useRevealer } from "../hooks/useRevealer";

const images = [
  { src: "slide-1.jpg", title: "SHATTERED", className: "" },
  { src: "slide-2.jpg", title: "HEY", className: "" },
  { src: "slide-3.jpg", title: "NEON DREAMS", className: "tall" },
  { src: "slide-12.jpg", title: "DATASTREAM", className: "tall" },
  { src: "slide-5.jpg", title: "MIDNIGHT RUSH", className: "" },
  { src: "slide-6.jpg", title: "PRISM", className: "tall" },
  { src: "slide-7.jpg", title: "SHINKAI", className: "" },
  { src: "slide-8.jpg", title: "MATRIX", className: "tall" },
  { src: "slide-9.jpg", title: "CHAINED", className: "" },
  { src: "hero.jpg", title: "CHAIN", className: "" },
  { src: "slide-10.jpg", title: "SPECTRA", className: "tall" },
  { src: "slide-11.jpg", title: "404 ERROR", className: "" },
  { src: "slide-12.jpg", title: "GTR QUADRANT", className: "tall" },
  { src: "slide-13.jpg", title: "ABYSS", className: "" },
  
  { src: "slide-1.jpg", title: "SHATTERED", className: "" },
  { src: "slide-2.jpg", title: "HEY", className: "" },
  { src: "slide-3.jpg", title: "NEON DREAMS", className: "tall" },
  { src: "slide-7.jpg", title: "DATASTREAM", className: "tall" },
  { src: "slide-5.jpg", title: "MIDNIGHT RUSH", className: "" },
  { src: "slide-6.jpg", title: "PRISM", className: "tall" },
  { src: "slide-7.jpg", title: "SHINKAI", className: "" },
  { src: "slide-8.jpg", title: "MATRIX", className: "tall" },
  { src: "slide-9.jpg", title: "CHAINED", className: "" },
  { src: "hero.jpg", title: "CHAIN", className: "" },
  { src: "slide-10.jpg", title: "SPECTRA", className: "tall" },
  { src: "slide-11.jpg", title: "404 ERROR", className: "" },
  { src: "slide-12.jpg", title: "GTR QUADRANT", className: "tall" },
  { src: "slide-13.jpg", title: "ABYSS", className: "" },
];

const Render = () => {
  useRevealer();

  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: "" });

  const handleMouseMove = (e) => {
    setTooltip((prev) => ({
      ...prev,
      x: e.clientX + 15,
      y: e.clientY + 15,
    }));
  };

  return (
    <>
      <div className="revealer"></div>
      <div className="title3D">
        <h1>3D RENDERS</h1>
        <h2>Here are some of my highlighted 3D projects.</h2>
      </div>

      <div className="gallery">
        {images.map((img, i) => (
          <div
            key={i}
            className={`image-container ${img.className}`}
            onMouseEnter={() =>
              setTooltip({ visible: true, x: 0, y: 0, text: img.title })
            }
            onMouseLeave={() =>
              setTooltip({ visible: false, x: 0, y: 0, text: "" })
            }
            onMouseMove={handleMouseMove}
          >
            <img src={img.src} alt={img.title} />
          </div>
        ))}
      </div>

      {tooltip.visible && (
        <div
          className="tooltip"
          style={{
            top: tooltip.y,
            left: tooltip.x,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  );
};

export default Render;
