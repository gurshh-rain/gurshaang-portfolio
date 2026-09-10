"use client";

import { useMemo } from "react";

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function parallelogramPath({ x = 0, y, w, h, slant }) {
  // y is the top-left corner. The right side is shifted down by `slant`.
  const p1 = `${x},${y}`;
  const p2 = `${x + w},${y + slant}`;
  const p3 = `${x + w},${y + slant + h}`;
  const p4 = `${x},${y + h}`;
  return `M ${p1} L ${p2} L ${p3} L ${p4} Z`;
}

function generateShapes({
  count = 12,
  viewW = 90,
  viewH = 320,
  slant = 24,
  minH = 12,
  maxH = 22,
  minW = 28,
  maxW = 90,
  minGap = 8,
  maxGap = 16,
  seed = 1987,
}) {
  const rand = mulberry32(seed);
  const shapes = [];
  const margin = 18;

  let y = margin;
  for (let i = 0; i < count; i++) {
    if (y > viewH - margin) break;

    const h = minH + rand() * (maxH - minH);
    const w = minW + rand() * (maxW - minW);
    const gap = minGap + rand() * (maxGap - minGap);

    if (y + h + slant > viewH - margin) break;

    shapes.push({
      path: parallelogramPath({ y, w, h, slant }),
      cutout: null,
    });

    y += h + slant + gap;
  }

  return shapes;
}

/**
 * A sci-fi / brutalist vertical barcode strip.
 * Built from thick, slanted parallelograms instead of thin lines,
 * matching the angular graphic marks in the reference images.
 */
export default function DiagonalBarcode({
  count = 12,
  opacity = 0.9,
  color = "#111",
}) {
  const shapes = useMemo(
    () => generateShapes({ count }),
    [count]
  );

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 90 320"
      preserveAspectRatio="xMidYMid meet"
      style={{ opacity, overflow: "visible" }}
    >
      {shapes.map((shape, i) => (
        <path
          key={i}
          d={shape.path}
          fill={color}
        />
      ))}
    </svg>
  );
}
