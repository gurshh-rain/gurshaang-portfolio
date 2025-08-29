"use client";

import { useRevealer } from "./hooks/useRevealer";

export default function Home() {
  useRevealer();

  return (
  <>
    <div className="revealer"></div>
    <div className="home">
      <div className="header">
        <h1>gurshaan.</h1>
      </div>

      <div className="hero-img">
        <img src="/hero2.jpg" alt="hero-img"/>
      </div>
    </div>
  
  
  </>
    
  );
}
 