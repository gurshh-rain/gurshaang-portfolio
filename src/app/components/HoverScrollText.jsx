"use client";

import { useMemo } from "react";

const HoverScrollText = ({ children }) => {
  const chars = useMemo(() => children.toString().split(""), [children]);

  return (
    <span className="hover-wave">
      <span className="hover-wave-inner">
        <span className="hover-wave-line">
          {chars.map((char, i) => (
            <span
              key={i}
              className="hover-wave-char"
              style={{ transitionDelay: `${i * 0.02}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
        <span className="hover-wave-line">
          {chars.map((char, i) => (
            <span
              key={`dup-${i}`}
              className="hover-wave-char"
              style={{ transitionDelay: `${i * 0.02}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
};

export default HoverScrollText;
