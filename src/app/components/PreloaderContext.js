"use client";

import { createContext, useContext } from "react";

export const PreloaderContext = createContext(false);

export function usePreloaderDone() {
  return useContext(PreloaderContext);
}