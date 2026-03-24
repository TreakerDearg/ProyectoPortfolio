"use client";

import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Evita problemas con SSR
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleChange = (e) => {
      setIsMobile(e.matches);
    };

    // Set inicial
    setIsMobile(mediaQuery.matches);

    // Listener
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [breakpoint]);

  return isMobile;
}