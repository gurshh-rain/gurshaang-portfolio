"use client";

import { useEffect, useState } from "react";

/**
 * Light/dark toggle. Initial state comes from the SSR-rendered
 * <html data-theme="...">, so server and client agree and there's no
 * hydration mismatch. On click we flip the attribute (instant repaint),
 * persist to a cookie (so the next SSR also reflects the choice), and
 * mirror to localStorage as a backup.
 *
 * Rendered as a <div role="button"> rather than a real <button>: native
 * buttons inherit user-agent / Tailwind preflight styles (gray pill
 * background, system text color) that are stubborn to override. A div
 * has no such defaults, so the icon renders truly bare.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Sync with the actual DOM attribute on mount, in case the cookie /
    // SSR path put us somewhere different than the useState default.
    const current =
      document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";

    // Smoothly cross-fade between themes using the View Transitions API
    // (Chrome / Edge / Safari 18+). On browsers without support, fall back
    // to a brief CSS opacity fade so the swap is never jarring.
    const apply = () => {
      document.documentElement.setAttribute("data-theme", next);
      document.cookie = `theme=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      try {
        localStorage.setItem("theme", next);
      } catch {
        // localStorage can throw in private modes, so fail silently.
      }
      setTheme(next);
    };

    if (
      typeof document !== "undefined" &&
      typeof document.startViewTransition === "function"
    ) {
      document.startViewTransition(apply);
    } else {
      // Fallback: fade the body, swap, fade back in.
      const body = document.body;
      body.style.transition = "opacity 0.18s ease";
      body.style.opacity = "0";
      window.setTimeout(() => {
        apply();
        body.style.opacity = "1";
      }, 180);
    }
  };

  // Keyboard activation for the role="button" div (Enter / Space).
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  // Until mounted, render the icon that matches the SSR'd theme so the
  // first paint and the hydrated output look identical.
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <div
      role="button"
      tabIndex={0}
      className="theme-toggle"
      onClick={toggle}
      onKeyDown={onKeyDown}
      aria-label={label}
      title={label}
      suppressHydrationWarning
    >
      {isDark ? (
        // Sun icon. Click to go light
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          suppressHydrationWarning
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // Moon icon. Click to go dark
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          suppressHydrationWarning
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </div>
  );
}
