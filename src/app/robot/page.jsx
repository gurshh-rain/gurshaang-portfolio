"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import "./robot.css";

function RoboticArm({ scrollProgress }) {
  const { scene } = useGLTF("./Robotic-Arm.glb");
  const ref = useRef();

  useFrame(() => {
    if (!ref.current) return;

    // Rotate the model smoothly
    ref.current.rotation.y = Math.PI * 2 * scrollProgress;

    // Move down near end
    ref.current.position.y = -Math.max(0, scrollProgress - 0.8) * 4;
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.4}
      position={[0, -0.5, 0]}
      rotation={[0.2, 0, 0]}
    />
  );
}

export default function Robot() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = window.innerHeight * 2;
      setScrollProgress(Math.min(window.scrollY / maxScroll, 1));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="robot-container">
        {/* Transparent canvas overlay */}
        <Canvas
          camera={{ position: [0, 1, 5], fov: 45 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[2, 4, 5]} intensity={1.5} />
          <Environment preset="studio" />
          <RoboticArm scrollProgress={scrollProgress} />
        </Canvas>

        {/* Text content under robot */}
        <div className="robot-text">
          <h1>3D Robot Design and Simulation</h1>
          <h2>Here are some of my highlighted robot designs.</h2>
        </div>
      </div>

      <section className="scroll-content">
        <p>Scroll down to explore more of the projects...</p>
      </section>
    </>
  );
}
