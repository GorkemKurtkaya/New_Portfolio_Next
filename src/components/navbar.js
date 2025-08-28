"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

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
      className="relative inline-flex h-9 w-16 items-center rounded-full border"
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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav
      className="sticky top-0 z-50 relative"
      style={{
        backgroundColor: "var(--bg-main)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        backdropFilter: "saturate(180%) blur(8px)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4">
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
              Home
            </Link>
            <Link href="/#services" className="nav-link hover:opacity-80 text-[1.2rem]" style={{ color: "var(--text)" }}>
              Services
            </Link>
            <Link href="/#projects" className="nav-link hover:opacity-80 text-[1.2rem]" style={{ color: "var(--text)" }}>
              Projects
            </Link>
            <Link href="/#contact" className="nav-link hover:opacity-80 text-[1.2rem]" style={{ color: "var(--text)" }}>
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/#contact"
              className="rounded-md px-4 py-2 font-medium shadow-sm transition"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg-main)",
              }}
            >
              Contact me
            </Link>
          </div>
        </div>
        <div className={`md:hidden border-t collapse nav-mobile absolute left-0 right-0 ${open ? "collapse-open" : "collapse-closed"}`} style={{ top: 64, borderColor: "rgba(0,0,0,0.06)" }}>
          <div className="flex flex-col gap-1 py-3 text-lg">
            <Link href="/#home" className="block px-4 py-2" style={{ color: "var(--text)" }} onClick={() => setOpen(false)}>Home</Link>
            <Link href="/#services" className="block px-4 py-2" style={{ color: "var(--text)" }} onClick={() => setOpen(false)}>Services</Link>
            <Link href="/#projects" className="block px-4 py-2" style={{ color: "var(--text)" }} onClick={() => setOpen(false)}>Projects</Link>
            <Link href="/#contact" className="block px-4 py-2" style={{ color: "var(--text)" }} onClick={() => setOpen(false)}>Contact</Link>
            <div className="flex items-center gap-3 px-1 pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

