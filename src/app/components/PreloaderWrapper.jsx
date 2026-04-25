"use client";

import { useState } from "react";
import Preloader from "./Preloader";
import Nav from "./Nav";
import { PreloaderContext } from "./PreloaderContext";

export default function PreloaderWrapper({ children }) {
  const [done, setDone] = useState(false);

  return (
    <PreloaderContext.Provider value={done}>
      {!done && <Preloader onComplete={() => setDone(true)} />}
      <Nav />
      <div style={{ visibility: done ? "visible" : "hidden" }}>
        {children}
      </div>
    </PreloaderContext.Provider>
  );
}