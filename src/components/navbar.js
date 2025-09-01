"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import en from "../locales/en.json";
import tr from "../locales/tr.json";

function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("theme");
      const initial = stored === "dark" ? "dark" : "light";
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
    } catch {}
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      window.localStorage.setItem("theme", next);
    } catch {}
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative inline-flex h-9 w-16 items-center rounded-full border cursor-pointer p-1"
      style={{
        backgroundColor: "var(--bg-alt)",
        borderColor: "rgba(0,0,0,0.08)",
      }}
    >
      <SunOutlined className="absolute left-2 text-[12px]" style={{ color: "var(--text)", fontSize: 12, pointerEvents: "none" }} />
      <MoonOutlined className="absolute right-2 text-[12px]" style={{ color: "var(--text)", fontSize: 12, pointerEvents: "none" }} />
      <span
        className="inline-block h-7 w-7 transform rounded-full transition-all"
        style={{
          translate: theme === "dark" ? "32px 0" : "2px 0",
          backgroundColor: "var(--accent)",
        }}
      />
    </button>
  );
}

function LanguageToggle() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("lang");
      const initial = stored === "tr" ? "tr" : "en";
      setLang(initial);
      document.documentElement.setAttribute("lang", initial);
      document.documentElement.setAttribute("data-lang", initial);
    } catch {}
  }, []);

  const toggle = () => {
    const next = lang === "tr" ? "en" : "tr";
    setLang(next);
    try {
      window.localStorage.setItem("lang", next);
      document.cookie = `lang=${next}; path=/; max-age=31536000`;
    } catch {}
    document.documentElement.setAttribute("lang", next);
    document.documentElement.setAttribute("data-lang", next);
    try {
      document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: next } }));
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="relative inline-flex h-9 w-16 items-center rounded-full border cursor-pointer p-1"
      style={{
        backgroundColor: "var(--bg-alt)",
        borderColor: "rgba(0,0,0,0.08)",
      }}
    >
      <span className="absolute left-2" role="img" aria-label="Turkish flag" style={{ pointerEvents: "none" }}>
        <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512" width="16" height="16">
          <g fillRule="nonzero">
            <path fill="#4D4D4D" d="M256 0c70.683 0 134.689 28.664 181.012 74.987C483.336 121.311 512 185.316 512 256c0 70.684-28.664 134.689-74.988 181.013C390.689 483.337 326.683 512 256 512c-70.676 0-134.689-28.663-181.013-74.987C28.664 390.689 0 326.676 0 256c0-70.684 28.664-134.689 74.987-181.013C121.311 28.664 185.316 0 256 0z"/>
            <path fill="#fff" d="M256.001 19.596c65.278 0 124.383 26.467 167.162 69.243 42.777 42.78 69.242 101.884 69.242 167.162s-26.465 124.383-69.245 167.16c-42.776 42.779-101.881 69.245-167.159 69.245-65.278 0-124.383-26.466-167.162-69.242-42.777-42.78-69.243-101.885-69.243-167.163S46.062 131.619 88.839 88.839c42.779-42.776 101.884-69.243 167.162-69.243z"/>
            <path fill="#E30A17" d="M256.001 39.594c119.517 0 216.407 96.887 216.407 216.407 0 119.518-96.89 216.407-216.407 216.407-119.52 0-216.407-96.889-216.407-216.407 0-119.52 96.887-216.407 216.407-216.407z"/>
            <path fill="#fff" d="M280.099 201.21c-18.178-28.707-50.215-47.771-86.708-47.771-56.642 0-102.56 45.918-102.56 102.562 0 56.643 45.918 102.561 102.56 102.561 36.492 0 68.53-19.062 86.708-47.769-15.02 16.73-36.813 27.257-61.067 27.257-45.315 0-82.049-36.735-82.049-82.049 0-45.314 36.734-82.05 82.049-82.05 24.254 0 46.047 10.529 61.067 27.259zm-5.513 54.791l92.768 30.142-57.334-78.913v97.541l57.334-78.913-92.768 30.143z"/>
          </g>
        </svg>
      </span>
      <span className="absolute right-2" role="img" aria-label="United Kingdom flag" style={{ pointerEvents: "none" }}>
        <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512" width="16" height="16">
          <g fillRule="nonzero">
            <path fill="#999" d="M256 0c70.68 0 134.69 28.66 181.01 74.99C483.34 121.31 512 185.32 512 256c0 70.68-28.66 134.69-74.99 181.01C390.69 483.34 326.68 512 256 512c-70.68 0-134.69-28.66-181.01-74.99C28.66 390.69 0 326.68 0 256c0-70.68 28.66-134.69 74.99-181.01C121.31 28.66 185.32 0 256 0z"/>
            <path fill="#fff" d="M256 19.48c65.3 0 124.46 26.48 167.25 69.27l1.09 1.18c42.14 42.71 68.18 101.37 68.18 166.06 0 65.31-26.5 124.46-69.29 167.25l-1.18 1.09c-42.73 42.16-101.4 68.19-166.05 68.19-65.23 0-124.37-26.51-167.18-69.33-42.84-42.74-69.33-101.89-69.33-167.2 0-65.31 26.48-124.45 69.27-167.24C131.55 45.96 190.7 19.48 256 19.48z"/>
            <path fill="#FEFEFE" d="M256 39.59c119.52 0 216.41 96.89 216.41 216.4 0 119.52-96.89 216.42-216.41 216.42-119.51 0-216.4-96.9-216.4-216.42 0-119.51 96.89-216.4 216.4-216.4z"/>
            <path fill="#012169" d="M183.49 179.55V52.05c-41.32 14.7-76.85 41.61-102.27 76.35l102.27 51.15zm0 152.9v127.5c-41.3-14.7-76.82-41.59-102.26-76.35l102.26-51.15zm144.55 0v127.67c41.45-14.63 77.09-41.54 102.61-76.34l-102.61-51.33zm0-152.9V51.88c41.45 14.63 77.11 41.54 102.62 76.35l-102.62 51.32z"/>
            <path fill="#C8102E" d="M448.3 328.16h-48.11l49.35 24.72c3.21-6.41 6.11-13 8.69-19.75l-9.93-4.97zm-9.34-187.76-86.42 43.33h48.11l48.95-24.5c-3.23-6.46-6.79-12.75-10.64-18.83zM212.41 299.26v168.75c14.08 2.87 28.66 4.4 43.59 4.4 14.76 0 29.19-1.49 43.13-4.3V299.26h168.94c2.83-13.98 4.34-28.44 4.34-43.27 0-14.88-1.51-29.42-4.37-43.47H299.13V43.9A217.404 217.404 0 0 0 256 39.59c-14.93 0-29.51 1.54-43.59 4.4v168.53H43.97a217.777 217.777 0 0 0-4.37 43.47c0 14.83 1.51 29.29 4.34 43.27h168.47zM63.12 183.84h48.11l-48.89-24.48c-3.2 6.41-6.11 13.02-8.68 19.76l9.46 4.72zm95.87 144.43h-48.11l-48.57 24.31A216.76 216.76 0 0 0 73 371.52l86.43-43.25h-.44z"/>
          </g>
        </svg>
      </span>
      <span
        className="inline-block h-7 w-7 transform rounded-full transition-all"
        style={{
          translate: lang === "tr" ? "2px 0" : "32px 0",
          backgroundColor: "var(--accent)",
        }}
      />
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const [scrolled, setScrolled] = useState(false);
  const dict = lang === "tr" ? tr : en;

  useEffect(() => {
    try {
      const initial = document.documentElement.getAttribute("data-lang") || window.localStorage.getItem("lang") || "en";
      setLang(initial);
    } catch {}
    const handler = (e) => {
      try {
        setLang(e.detail?.lang || "en");
      } catch {}
    };
    document.addEventListener("langchange", handler);
    return () => document.removeEventListener("langchange", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrolled ? "rgba(var(--bg-main-rgb), 0.72)" : "rgba(var(--bg-main-rgb), 1)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        backdropFilter: "saturate(180%) blur(8px)",
        transition: "background-color 200ms ease, backdrop-filter 200ms ease",
        fontFamily: "var(--font-oswald)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 relative" >
        <div className="flex h-16 items-center justify-between">
          <Link href="/#home" className="brand-link font-semibold tracking-tight text-[1.5rem]">
            <span style={{ color: "var(--accent)" }}>Görkem</span>{" "}
            <span style={{ color: "var(--text)" }}>Kurtkaya</span>
          </Link>

          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            style={{ borderColor: "rgba(0,0,0,0.08)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="var(--text)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="hidden gap-6 md:flex">
            <Link href="/#home" className="nav-link hover:opacity-80 text-[1.2rem]" style={{ color: "var(--text)" }}>
              {dict["nav.home"]}
            </Link>
            <Link href="/#services" className="nav-link hover:opacity-80 text-[1.2rem]" style={{ color: "var(--text)" }}>
              {dict["nav.services"]}
            </Link>
            <Link href="/#projects" className="nav-link hover:opacity-80 text-[1.2rem]" style={{ color: "var(--text)" }}>
              {dict["nav.projects"]}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <Link
              href="/#contact"
              className="rounded-md px-4 py-2 font-medium shadow-sm transition hover:opacity-80 "
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg-main)",
              }}
            >
              {dict["cta.contactMe"]}
            </Link>
          </div>
        </div>
        <div 
          className={`md:hidden border-t nav-mobile absolute left-0 right-0 shadow-lg ${open ? "" : "hidden"}`} 
          style={{ 
            top: "100%", 
            borderColor: "rgba(0,0,0,0.06)",
            backgroundColor: "var(--bg-main)",
            zIndex: 100
          }}
        >
          <div className="flex flex-col gap-1 py-3 text-lg">
            <Link href="/#home" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" style={{ color: "var(--text)" }} onClick={() => setOpen(false)}>{dict["nav.home"]}</Link>
            <Link href="/#services" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" style={{ color: "var(--text)" }} onClick={() => setOpen(false)}>{dict["nav.services"]}</Link>
            <Link href="/#projects" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" style={{ color: "var(--text)" }} onClick={() => setOpen(false)}>{dict["nav.projects"]}</Link>
            <Link href="/#contact" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" style={{ color: "var(--text)" }} onClick={() => setOpen(false)}>{dict["nav.contact"]}</Link>
            <div className="flex items-center gap-3 px-4 pt-2 pb-1">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

